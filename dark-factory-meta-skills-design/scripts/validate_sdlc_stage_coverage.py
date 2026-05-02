#!/usr/bin/env python3
"""Validate DFMS SDLC stage coverage and testing assurance."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


ZERO_SLOP = "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS"
PASS_STATUSES = {"accepted", "passed", "not_applicable"}
REQUIRED_STAGE_IDS = [
    "meta_attractor",
    "engagement_governance",
    "intake_interrogation",
    "recursive_spec_decomposition",
    "feasibility_risk",
    "inception_charter",
    "architecture_design",
    "planning_pert",
    "construction_implementation",
    "verification_validation",
    "security_abuse_testing",
    "ui_wysiwyg_browser_testing",
    "performance_reliability",
    "release_transition",
    "operations_sre",
    "maintenance_brownfield",
    "retrospective_learning",
]
ALLOWED_STAGE_STATUSES = {"planned", "accepted", "deferred", "waived", "not_applicable"}


def load_json(path: Path) -> dict[str, Any]:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        raise SystemExit(f"ERROR: cannot read JSON from {path}: {exc}") from exc


def blank(value: Any) -> bool:
    if value is None:
        return True
    if isinstance(value, str):
        return value.strip() == "" or value.strip().lower() in {"tbd", "pending", "planned | accepted | deferred | waived | not_applicable"}
    if isinstance(value, (list, tuple, dict, set)):
        return len(value) == 0
    return False


def add(failures: list[str], message: str) -> None:
    failures.append(message)


def waiver_complete(waiver: dict[str, Any] | None) -> bool:
    if not waiver:
        return False
    for field in ("owner", "rationale", "expiry", "residual_risk", "revalidation_trigger"):
        if blank(waiver.get(field)):
            return False
    return True


def stage_passed(stage: dict[str, Any]) -> bool:
    status = stage.get("status")
    if status == "accepted":
        return not blank(stage.get("exit_evidence")) and not blank(stage.get("gate"))
    if status == "not_applicable":
        return not blank(stage.get("rationale")) or waiver_complete(stage.get("waiver"))
    if status == "waived":
        return waiver_complete(stage.get("waiver"))
    return False


def required_testing_from_flags(flags: dict[str, Any]) -> set[str]:
    required: set[str] = set()
    if flags.get("code_producing"):
        required.update({"unit", "integration", "scenario_bdd"})
    if flags.get("ui_surface"):
        required.update({"browser_wysiwyg_playwright", "accessibility_ux"})
    if flags.get("api_surface"):
        required.add("contract_api")
    if flags.get("scenario_driven"):
        required.update({"scenario_bdd", "holdout_transfer"})
    if flags.get("production_surface"):
        required.update({"performance_reliability", "production_drill"})
    if flags.get("brownfield"):
        required.update({"integration", "scenario_bdd"})
    return required


def validate_record(record: dict[str, Any], allow_template: bool = False) -> list[str]:
    failures: list[str] = []
    if record.get("zero_slop_policy", {}).get("statement") != ZERO_SLOP:
        add(failures, "missing or incorrect zero-slop policy")
    if record.get("template_only") is True and not allow_template:
        add(failures, "record is template_only; templates are not proof")
    if record.get("template_marker") is True and not allow_template:
        add(failures, "record still has template_marker")

    flags = record.get("project_type_flags", {})
    if not isinstance(flags, dict):
        add(failures, "project_type_flags must be an object")
        flags = {}
    product_like = any(flags.get(flag) for flag in ("code_producing", "ui_surface", "api_surface", "data_surface", "production_surface"))
    docs_only_mode = any(flags.get(flag) for flag in ("artifact_only", "planning_phase_only", "skill_system_revision"))

    stages_list = record.get("stages", [])
    if not isinstance(stages_list, list) or not stages_list:
        add(failures, "stages must be a non-empty list")
        stages_list = []
    stages = {stage.get("stage_id"): stage for stage in stages_list if stage.get("stage_id")}
    missing = [stage_id for stage_id in REQUIRED_STAGE_IDS if stage_id not in stages]
    for stage_id in missing:
        add(failures, f"missing SDLC stage {stage_id}")

    for stage_id, stage in stages.items():
        status = stage.get("status")
        if status not in ALLOWED_STAGE_STATUSES:
            add(failures, f"stage {stage_id} has invalid status {status!r}")
        if stage.get("required") is True and not stage_passed(stage):
            add(failures, f"required stage {stage_id} is not accepted/waived/not_applicable with evidence")
        if status == "accepted":
            for field in ("owner", "exit_evidence", "gate"):
                if blank(stage.get(field)):
                    add(failures, f"accepted stage {stage_id} missing {field}")
        if status == "waived" and not waiver_complete(stage.get("waiver")):
            add(failures, f"waived stage {stage_id} missing complete waiver")

    if flags.get("code_producing"):
        for stage_id in ("construction_implementation", "verification_validation"):
            if stages.get(stage_id, {}).get("status") != "accepted":
                add(failures, f"code-producing project must accept stage {stage_id}")
    if flags.get("ui_surface") and stages.get("ui_wysiwyg_browser_testing", {}).get("status") != "accepted":
        add(failures, "UI project must accept ui_wysiwyg_browser_testing stage")
    if flags.get("production_surface"):
        for stage_id in ("release_transition", "operations_sre"):
            if stages.get(stage_id, {}).get("status") != "accepted":
                add(failures, f"production project must accept stage {stage_id}")
    if flags.get("scenario_driven"):
        if stages.get("verification_validation", {}).get("status") != "accepted":
            add(failures, "scenario-driven project must accept verification_validation stage")

    testing = record.get("testing_coverage", {})
    if not isinstance(testing, dict):
        add(failures, "testing_coverage must be an object")
        testing = {}
    required_tests = required_testing_from_flags(flags)
    for test_id in required_tests:
        item = testing.get(test_id)
        if not item:
            add(failures, f"missing required testing coverage item {test_id}")
            continue
        if item.get("required") is not True:
            add(failures, f"testing coverage {test_id} must be marked required")
        if blank(item.get("evidence")) and not waiver_complete(item.get("waiver")):
            add(failures, f"testing coverage {test_id} missing evidence or complete waiver")

    docs_gate = record.get("no_docs_only_gate", {})
    if product_like and docs_gate.get("product_completion_claimed") is True:
        if blank(docs_gate.get("implementation_evidence")):
            add(failures, "product completion claimed without implementation evidence")
        if blank(docs_gate.get("test_execution_evidence")):
            add(failures, "product completion claimed without test execution evidence")
    if product_like and docs_gate.get("pass_allowed") is True and (blank(docs_gate.get("implementation_evidence")) or blank(docs_gate.get("test_execution_evidence"))):
        add(failures, "docs-only gate allows pass without implementation/test evidence")
    if not product_like and not docs_only_mode and not allow_template:
        add(failures, "record must declare either product-like flags or docs-only/planning/skill-system mode")

    return failures


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Validate SDLC stage coverage and testing assurance.")
    parser.add_argument("path", type=Path)
    parser.add_argument("--allow-template", action="store_true")
    args = parser.parse_args(argv)

    record = load_json(args.path)
    failures = validate_record(record, allow_template=args.allow_template)
    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        return 1
    print(f"PASS: {args.path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
