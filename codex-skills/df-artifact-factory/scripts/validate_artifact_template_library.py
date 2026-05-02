#!/usr/bin/env python3
"""Validate that the DFMS artifact template library is not a hollow bundle."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "assets" / "artifact-template-library"
INDEX = LIB / "index.json"
STANDARD = LIB / "consulting-grade-artifact-standard.md"
SOURCE_MAP = LIB / "research-source-map.md"


REQUIRED_TEMPLATE_MARKERS = [
    "NO AI SLOP ALLOWED AT ALL",
    "## Standards and Method Anchors",
    "## Artifact Identity",
    "## Consulting-Grade Artifact Contract",
    "## Required Inputs",
    "## Required Links",
    "## Fillable Template",
    "### Traceability Map",
    "### Decisions and Alternatives",
    "### Risks, Assumptions, and Constraints",
    "### Artifact-Specific Completion Rubric",
    "### Artifact-Specific Critic Panel",
    "### Evidence Bundle",
    "### Handoff Notes",
    "### Change History",
    "## Worked Mini-Example",
    "## Anti-Patterns To Reject",
]

REQUIRED_STANDARD_MARKERS = [
    "## Source Anchors",
    "## Artifact Passport",
    "## Mandatory Artifact Sections",
    "## Artifact Family Overlays",
    "## Consulting-Grade Rubric",
    "## Rejection Triggers",
]

REQUIRED_SOURCE_MAP_MARKERS = [
    "## Cross-Cutting Anchors",
    "## Artifact Family Mapping",
    "### Governance and Management",
    "### Requirements and Product",
    "### Architecture and Design",
    "### MDA and DDD",
    "### Implementation and Build",
    "### Verification and Validation",
    "### Release, Production, and Maintenance",
    "### Evidence and Certification",
    "## Research Source URLs",
]

WEAK_TEMPLATE_PATTERNS = [
    re.compile(r"(?i)lorem ipsum"),
    re.compile(r"(?i)record how `"),
    re.compile(r"(?i)example value recorded"),
]


def fail(message: str) -> None:
    print(f"FAIL: {message}")
    raise SystemExit(1)


def read_text(path: Path) -> str:
    path = long_path(path)
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return path.read_text(encoding="utf-8-sig")


def long_path(path: Path) -> Path:
    if sys.platform.startswith("win"):
        resolved = str(path.resolve())
        if not resolved.startswith("\\\\?\\"):
            return Path("\\\\?\\" + resolved)
    return path


def path_exists(path: Path) -> bool:
    return long_path(path).exists()


def count_numbered_items(section: str) -> int:
    return len(re.findall(r"(?m)^\d+\.\s+\S", section))


def main() -> int:
    if not path_exists(LIB):
        fail(f"template library missing: {LIB}")
    if not path_exists(INDEX):
        fail(f"index missing: {INDEX}")
    if not path_exists(STANDARD):
        fail(f"consulting standard missing: {STANDARD}")
    if not path_exists(SOURCE_MAP):
        fail(f"research source map missing: {SOURCE_MAP}")

    standard_text = read_text(STANDARD)
    missing_standard = [m for m in REQUIRED_STANDARD_MARKERS if m not in standard_text]
    if missing_standard:
        fail(f"consulting standard missing sections: {missing_standard}")
    source_map_text = read_text(SOURCE_MAP)
    missing_source_map = [m for m in REQUIRED_SOURCE_MAP_MARKERS if m not in source_map_text]
    if missing_source_map:
        fail(f"research source map missing sections: {missing_source_map}")

    data = json.loads(read_text(INDEX))
    if not isinstance(data, list) or len(data) < 50:
        fail("index must be a list with the governed artifact set")

    seen_ids: set[str] = set()
    errors: list[str] = []
    warnings: list[str] = []

    for entry in data:
        artifact_id = entry.get("artifact_id")
        template_path = entry.get("template_path")
        example_path = entry.get("example_path")
        panel_path = entry.get("panel_starter_path")
        family = entry.get("family")

        if not artifact_id or artifact_id in seen_ids:
            errors.append(f"duplicate or missing artifact_id: {artifact_id!r}")
            continue
        seen_ids.add(artifact_id)

        for field_name, rel in [
            ("template_path", template_path),
            ("example_path", example_path),
            ("panel_starter_path", panel_path),
        ]:
            if not rel:
                errors.append(f"{artifact_id}: missing {field_name}")
                continue
            candidate = LIB / rel
            if not path_exists(candidate):
                errors.append(f"{artifact_id}: {field_name} not found: {rel}")

        if not template_path:
            continue

        template_file = LIB / template_path
        if not path_exists(template_file):
            continue
        text = read_text(template_file)

        missing = [m for m in REQUIRED_TEMPLATE_MARKERS if m not in text]
        if missing:
            errors.append(f"{artifact_id}: template missing markers {missing}")

        if f"Artifact ID | {artifact_id}" not in text:
            errors.append(f"{artifact_id}: Artifact Identity table does not pin the correct artifact ID")

        rubric_start = text.find("### Artifact-Specific Completion Rubric")
        panel_start = text.find("### Artifact-Specific Critic Panel")
        if rubric_start == -1 or panel_start == -1 or panel_start <= rubric_start:
            errors.append(f"{artifact_id}: cannot isolate completion rubric section")
        else:
            rubric_section = text[rubric_start:panel_start]
            if count_numbered_items(rubric_section) < 15:
                errors.append(f"{artifact_id}: completion rubric has fewer than 15 checks")

        if "at least 5 RALPH loops" not in text:
            errors.append(f"{artifact_id}: missing 5-RALPH-loop review requirement")
        if "exactly 15 scored checks" not in text:
            errors.append(f"{artifact_id}: missing exact 15-check critic requirement")
        if "Anti-Slop Red Team" not in text or "Failure-Mode/Reality Critic" not in text:
            errors.append(f"{artifact_id}: missing required adversarial critics")
        if "control graph" not in text or "work-ledger" not in text:
            errors.append(f"{artifact_id}: missing control graph/work-ledger enforcement text")
        if family and family not in template_path:
            errors.append(f"{artifact_id}: template path does not match family {family}")

        if example_path:
            example_file = LIB / example_path
            if path_exists(example_file):
                example_text = read_text(example_file)
                if "fictional training example" not in example_text:
                    errors.append(f"{artifact_id}: worked example must be labeled training/example-only")
                if len(example_text.split()) < 120:
                    errors.append(f"{artifact_id}: worked example is too thin")

        for pattern in WEAK_TEMPLATE_PATTERNS:
            if pattern.search(text):
                warnings.append(f"{artifact_id}: weak template phrase found: {pattern.pattern}")

    if errors:
        print("Artifact template library validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        f"Artifact template library validation passed: {len(seen_ids)} indexed artifacts, "
        f"{len(warnings)} weak-phrase warnings."
    )
    for warning in warnings[:20]:
        print(f"WARN: {warning}")
    if len(warnings) > 20:
        print(f"WARN: {len(warnings) - 20} additional warnings omitted.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
