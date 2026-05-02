#!/usr/bin/env python3
"""Validate Hawkeye conformance audit records."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


ZERO_SLOP = "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS"
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
REQUIRED_PROCESS_IDS = [
    "meta_meta_compiler",
    "product_tailoring",
    "generated_meta_skill_contract",
    "dark_factory_instantiation",
    "engagement_governance",
    "tasks_md",
    "tpm_flow",
    "pert_plan",
    "knowledge_graph",
    "sdlc_stage_coverage",
    "execution_kernel",
    "ai_judge_jury",
    "artifact_bom_tailoring",
    "quality_refinery",
    "traceability",
    "implementation_gate",
    "testing_gate",
    "handoff_gate",
    "feedback_learning",
]
REQUIRED_AXES = [
    "product_tailoring",
    "stage_coverage",
    "task_discipline",
    "flow_discipline",
    "evidence_discipline",
    "traceability",
    "review_rigor",
    "testing_rigor",
    "change_control",
    "human_boundary",
    "resume_safety",
    "anti_slop",
]
PASSLIKE = {"pass", "waived", "not_applicable"}


def load_json(path: Path) -> dict[str, Any]:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        raise SystemExit(f"ERROR: cannot read JSON from {path}: {exc}") from exc


def blank(value: Any) -> bool:
    if value is None:
        return True
    if isinstance(value, str):
        return value.strip() == "" or " | " in value
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


def check_audit_items(
    failures: list[str],
    items: list[dict[str, Any]],
    required_ids: list[str],
    id_field: str,
    label: str,
    allow_template: bool,
) -> None:
    by_id = {item.get(id_field): item for item in items if item.get(id_field)}
    for required_id in required_ids:
        if required_id not in by_id:
            add(failures, f"missing {label} audit for {required_id}")
            continue
        item = by_id[required_id]
        decision = item.get("decision")
        if allow_template:
            continue
        if decision not in PASSLIKE:
            add(failures, f"{label} {required_id} decision is not pass/waived/not_applicable")
        if decision == "pass" and blank(item.get("evidence")):
            add(failures, f"{label} {required_id} pass missing evidence")
        if decision == "waived" and not waiver_complete(item.get("waiver")):
            add(failures, f"{label} {required_id} waived without complete waiver")
        if decision == "not_applicable" and blank(item.get("rationale")) and blank(item.get("evidence")):
            add(failures, f"{label} {required_id} not_applicable missing rationale/evidence")


def validate_record(record: dict[str, Any], allow_template: bool = False) -> list[str]:
    failures: list[str] = []
    if record.get("zero_slop_policy", {}).get("statement") != ZERO_SLOP:
        add(failures, "missing or incorrect zero-slop policy")
    if record.get("template_only") is True and not allow_template:
        add(failures, "record is template_only")
    if record.get("template_marker") is True and not allow_template:
        add(failures, "record still has template_marker")

    for field in ("audit_id", "run_id", "auditor", "audit_scope", "stage_audits", "process_audits", "conformance_axes"):
        if blank(record.get(field)):
            add(failures, f"missing {field}")

    auditor = record.get("auditor", {})
    for field in ("role_name", "persona_contract", "decision_rights", "independence_rule"):
        if blank(auditor.get(field)):
            add(failures, f"auditor missing {field}")

    scope = record.get("audit_scope", {})
    if not allow_template:
        for field in (
            "product_tailoring_profile",
            "generated_meta_skill_contract",
            "dark_factory_instantiation_record",
            "tasks_md",
            "tpm_flow_ledger",
            "pert_plan",
            "knowledge_graph",
            "sdlc_stage_coverage_matrix",
            "execution_kernel_report",
            "quality_refinery_gate",
            "traceability_record",
        ):
            if blank(scope.get(field)):
                add(failures, f"audit_scope missing {field}")

    check_audit_items(
        failures,
        record.get("stage_audits", []),
        REQUIRED_STAGE_IDS,
        "stage_id",
        "stage",
        allow_template,
    )
    check_audit_items(
        failures,
        record.get("process_audits", []),
        REQUIRED_PROCESS_IDS,
        "process_id",
        "process",
        allow_template,
    )

    axes = record.get("conformance_axes", {})
    for axis in REQUIRED_AXES:
        decision = axes.get(axis)
        if blank(decision):
            add(failures, f"missing conformance axis {axis}")
        elif not allow_template and decision not in PASSLIKE:
            add(failures, f"conformance axis {axis} is not pass/waived/not_applicable")

    if not allow_template:
        unresolved = [
            finding.get("id", "<unknown>")
            for finding in record.get("findings", [])
            if finding.get("severity") in {"P0", "P1"} and finding.get("status") not in {"resolved", "waived"}
        ]
        for finding_id in unresolved:
            add(failures, f"unresolved P0/P1 Hawkeye finding {finding_id}")
        open_vetoes = [veto.get("id", "<unknown>") for veto in record.get("vetoes", []) if veto.get("status") != "resolved"]
        for veto_id in open_vetoes:
            add(failures, f"open Hawkeye veto {veto_id}")
        if record.get("overall_decision") != "pass":
            add(failures, "overall_decision must be pass")
        for field in ("next_action", "signed_by", "signed_at"):
            if blank(record.get(field)):
                add(failures, f"missing {field}")
    return failures


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Validate a Hawkeye conformance audit record.")
    parser.add_argument("path", type=Path)
    parser.add_argument("--allow-template", action="store_true")
    args = parser.parse_args(argv)

    failures = validate_record(load_json(args.path), allow_template=args.allow_template)
    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        return 1
    print(f"PASS: {args.path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
