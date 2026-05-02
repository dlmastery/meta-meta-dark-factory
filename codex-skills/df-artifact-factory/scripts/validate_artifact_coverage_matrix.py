#!/usr/bin/env python3
"""Validate a DFMS artifact coverage matrix against the artifact catalog."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path


ZERO = "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS"
CATALOG_PATTERN = re.compile(r"^\|\s*((?:GOV|REQ|ARC|MDA|DDD|IMP|VNV|REL|EVD)-\d{3})\s*\|\s*([^|]+?)\s*\|")
ALLOWED_STATUSES = {
    "standalone",
    "combined",
    "partial",
    "not_applicable",
    "deferred",
    "missing",
    "waived",
}
COUNT_KEYS = [
    "standalone",
    "combined",
    "partial",
    "not_applicable",
    "deferred",
    "missing",
    "waived",
]


def parse_catalog(path: Path) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        match = CATALOG_PATTERN.match(line.strip())
        if match:
            rows.append({"id": match.group(1), "artifact": match.group(2).strip()})
    return rows


def has_waiver(entry: dict) -> bool:
    waiver = entry.get("waiver")
    if not isinstance(waiver, dict):
        return False
    required = ["owner", "rationale", "approval", "expiry_or_revalidation", "residual_risk"]
    return all(str(waiver.get(key, "")).strip() for key in required)


def evidence_exists(project_root: Path | None, rel: str) -> bool:
    if project_root is None:
        return True
    return (project_root / rel).exists()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("matrix", type=Path)
    parser.add_argument("--catalog", type=Path, required=True)
    parser.add_argument("--project-root", type=Path)
    parser.add_argument("--mode", choices=["full_saturation", "tailored_with_waivers"])
    args = parser.parse_args()

    catalog = parse_catalog(args.catalog)
    if not catalog:
        print(f"FAIL: no catalog IDs found in {args.catalog}")
        return 1

    matrix = json.loads(args.matrix.read_text(encoding="utf-8"))
    mode = args.mode or matrix.get("artifact_generation_mode")
    failures: list[str] = []

    if matrix.get("zero_slop_policy", {}).get("statement") != ZERO:
        failures.append("matrix missing zero-slop statement")
    if matrix.get("template_only") is not False:
        failures.append("matrix must be instantiated evidence, not a template")
    if mode not in {"full_saturation", "tailored_with_waivers"}:
        failures.append("artifact_generation_mode must be full_saturation or tailored_with_waivers")

    catalog_ids = [item["id"] for item in catalog]
    entries = matrix.get("entries")
    if not isinstance(entries, list):
        failures.append("entries must be a list")
        entries = []
    entry_ids = [entry.get("id") for entry in entries]
    if sorted(entry_ids) != sorted(catalog_ids):
        missing = sorted(set(catalog_ids) - set(entry_ids))
        extra = sorted(set(entry_ids) - set(catalog_ids))
        failures.append(f"matrix must enumerate every catalog ID exactly once; missing={missing}; extra={extra}")

    seen: set[str] = set()
    counts = {key: 0 for key in COUNT_KEYS}
    for entry in entries:
        artifact_id = entry.get("id")
        status = entry.get("status")
        evidence = entry.get("evidence", [])

        if artifact_id in seen:
            failures.append(f"duplicate entry {artifact_id}")
        seen.add(artifact_id)

        if status not in ALLOWED_STATUSES:
            failures.append(f"{artifact_id}: invalid status {status!r}")
            continue
        counts[status] += 1

        if not str(entry.get("artifact", "")).strip():
            failures.append(f"{artifact_id}: missing artifact name")
        if not str(entry.get("next_action", "")).strip():
            failures.append(f"{artifact_id}: missing next_action")

        if status == "standalone":
            if not isinstance(evidence, list) or not evidence:
                failures.append(f"{artifact_id}: standalone requires evidence")
            for rel in evidence or []:
                if not evidence_exists(args.project_root, rel):
                    failures.append(f"{artifact_id}: evidence path not found: {rel}")

        if status in {"combined", "partial", "deferred", "waived"}:
            if mode == "full_saturation":
                failures.append(f"{artifact_id}: {status} blocks full_saturation closure")
            elif not has_waiver(entry):
                failures.append(f"{artifact_id}: {status} requires explicit waiver in tailored_with_waivers mode")

        if status == "not_applicable":
            if not has_waiver(entry):
                failures.append(f"{artifact_id}: not_applicable requires explicit human-approved justification")
            if not evidence:
                failures.append(f"{artifact_id}: not_applicable requires justification evidence")

        if status == "missing":
            failures.append(f"{artifact_id}: missing artifact blocks closure")

    expected_counts = matrix.get("counts", {})
    for key in COUNT_KEYS:
        if expected_counts.get(key) != counts[key]:
            failures.append(f"count mismatch for {key}: expected {counts[key]}, matrix says {expected_counts.get(key)}")
    if expected_counts.get("catalog_total") != len(catalog):
        failures.append(f"catalog_total mismatch: expected {len(catalog)}, matrix says {expected_counts.get('catalog_total')}")

    if failures:
        print("Artifact coverage matrix validation failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print(f"Artifact coverage matrix validation passed in {mode} mode for {len(catalog)} catalog artifacts.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
