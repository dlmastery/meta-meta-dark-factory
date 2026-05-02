#!/usr/bin/env python3
"""Validate meta-meta compiler outputs for product-tailored generated meta-skills."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


ZERO_SLOP = "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS"
SURFACE_FLAGS = (
    "code_producing",
    "ui_surface",
    "api_surface",
    "data_surface",
    "production_surface",
    "brownfield",
    "scenario_driven",
)
RUNTIME_GATES = (
    "tasks_md_validator",
    "tpm_flow_validator",
    "knowledge_graph_validator",
    "sdlc_stage_coverage_validator",
    "execution_kernel",
    "quality_refinery",
    "traceability",
)
COMPILE_OUTPUTS = (
    "product_tailoring_profile",
    "methodology_blend_record",
    "sdlc_stage_coverage_matrix",
    "artifact_bom_tailoring",
    "testing_strategy",
    "tasks_md",
    "tpm_flow_ledger",
    "pert_plan",
    "knowledge_graph",
    "execution_kernel_report",
    "ai_judge_jury_policy",
)


def load_json(path: Path) -> dict[str, Any]:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        raise SystemExit(f"ERROR: cannot read JSON from {path}: {exc}") from exc


def blank(value: Any) -> bool:
    if value is None:
        return True
    if isinstance(value, str):
        return value.strip() == "" or value.strip().lower() in {"tbd", "pending"}
    if isinstance(value, (list, tuple, dict, set)):
        return len(value) == 0
    return False


def add(failures: list[str], message: str) -> None:
    failures.append(message)


def validate_zero_slop(record: dict[str, Any], name: str, failures: list[str], allow_template: bool) -> None:
    if record.get("zero_slop_policy", {}).get("statement") != ZERO_SLOP:
        add(failures, f"{name} missing zero-slop policy")
    if record.get("template_only") is True and not allow_template:
        add(failures, f"{name} is template_only")
    if record.get("template_marker") is True and not allow_template:
        add(failures, f"{name} still has template_marker")


def validate_profile(profile: dict[str, Any], allow_template: bool = False) -> list[str]:
    failures: list[str] = []
    validate_zero_slop(profile, "product_tailoring_profile", failures, allow_template)
    for field in ("profile_id", "run_id", "product_name", "product_archetype", "lifecycle_mode"):
        if blank(profile.get(field)):
            add(failures, f"profile missing {field}")
    flags = profile.get("surface_flags", {})
    if not isinstance(flags, dict):
        add(failures, "profile surface_flags must be object")
        flags = {}
    if not allow_template and not any(flags.get(flag) for flag in SURFACE_FLAGS) and profile.get("lifecycle_mode") not in {"artifact_only", "planning_phase_only", "skill_system_revision"}:
        add(failures, "profile has no product surface flags and is not docs/planning/skill-system mode")
    if blank(profile.get("mandatory_artifact_ids")):
        add(failures, "profile missing mandatory_artifact_ids")
    if blank(profile.get("mandatory_testing_classes")):
        add(failures, "profile missing mandatory_testing_classes")
    if blank(profile.get("human_boundary_triggers")):
        add(failures, "profile missing human_boundary_triggers")
    methodology = profile.get("methodology_blend", {})
    if not isinstance(methodology, dict) or not any(item.get("included") for item in methodology.values() if isinstance(item, dict)):
        add(failures, "profile must include at least one methodology")
    return failures


def validate_contract(contract: dict[str, Any], profile: dict[str, Any], allow_template: bool = False) -> list[str]:
    failures: list[str] = []
    validate_zero_slop(contract, "generated_meta_skill_contract", failures, allow_template)
    generated_skill = contract.get("generated_skill", {})
    for field in ("name", "purpose", "trigger_conditions", "refusal_rules", "product_tailoring_profile", "required_child_skills"):
        if blank(generated_skill.get(field)):
            add(failures, f"generated_skill missing {field}")

    outputs = contract.get("compile_time_outputs", {})
    for output in COMPILE_OUTPUTS:
        if blank(outputs.get(output)):
            add(failures, f"compile_time_outputs missing {output}")

    gates = contract.get("runtime_gates", {})
    for gate in RUNTIME_GATES:
        if gates.get(gate) is not True:
            add(failures, f"runtime gate {gate} must be true")

    surface_map = contract.get("surface_gate_mapping", {})
    flags = profile.get("surface_flags", {})
    for flag in SURFACE_FLAGS:
        mapping = surface_map.get(flag, {})
        if flags.get(flag):
            if mapping.get("required") is not True:
                add(failures, f"surface {flag} must be required in generated contract")
            if blank(mapping.get("gates")):
                add(failures, f"surface {flag} missing gates in generated contract")

    if flags.get("code_producing"):
        gates_text = " ".join(surface_map.get("code_producing", {}).get("gates", []))
        if "implementation" not in gates_text.lower() or "test" not in gates_text.lower():
            add(failures, "code_producing gates must mention implementation and test evidence")
    if flags.get("ui_surface"):
        gates_text = " ".join(surface_map.get("ui_surface", {}).get("gates", []))
        if "browser" not in gates_text.lower() and "playwright" not in gates_text.lower() and "wysiwyg" not in gates_text.lower():
            add(failures, "ui_surface gates must mention browser/Playwright/WYSIWYG evidence")
    if flags.get("scenario_driven"):
        gates_text = " ".join(surface_map.get("scenario_driven", {}).get("gates", []))
        if "holdout" not in gates_text.lower() or "transfer" not in gates_text.lower():
            add(failures, "scenario_driven gates must mention holdout and transfer evidence")
    if flags.get("production_surface"):
        gates_text = " ".join(surface_map.get("production_surface", {}).get("gates", []))
        if "rollback" not in gates_text.lower() or "observability" not in gates_text.lower() or "runbook" not in gates_text.lower():
            add(failures, "production_surface gates must mention rollback, observability, and runbook evidence")

    expert_panel = contract.get("expert_panel", {})
    for field in ("meta_meta_compiler_critic", "product_sdlc_tailoring_critic", "testing_and_release_assurance_critic", "adversarial_generic_process_critic"):
        if blank(expert_panel.get(field)):
            add(failures, f"expert_panel missing {field}")

    acceptance = contract.get("acceptance", {})
    if not allow_template:
        if acceptance.get("compile_time_pass") is not True:
            add(failures, "acceptance.compile_time_pass must be true")
        if acceptance.get("runtime_instantiation_pass") is not True:
            add(failures, "acceptance.runtime_instantiation_pass must be true")
        if blank(acceptance.get("certificate")):
            add(failures, "acceptance missing certificate")
    return failures


def validate_instantiation(instantiation: dict[str, Any], allow_template: bool = False) -> list[str]:
    failures: list[str] = []
    validate_zero_slop(instantiation, "dark_factory_instantiation_record", failures, allow_template)
    records = instantiation.get("instantiated_records", {})
    required = (
        "tasks_md",
        "tpm_flow_ledger",
        "pert_plan",
        "knowledge_graph",
        "sdlc_stage_coverage_matrix",
        "execution_kernel_report",
        "artifact_bom_tailoring",
        "quality_refinery_gate",
        "traceability_matrix",
    )
    for field in required:
        if blank(records.get(field)):
            add(failures, f"instantiated_records missing {field}")
    if blank(instantiation.get("legal_next_action")):
        add(failures, "instantiation missing legal_next_action")
    return failures


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Validate meta-meta generated meta-skill contract.")
    parser.add_argument("--profile", type=Path, required=True)
    parser.add_argument("--contract", type=Path, required=True)
    parser.add_argument("--instantiation", type=Path)
    parser.add_argument("--allow-template", action="store_true")
    args = parser.parse_args(argv)

    profile = load_json(args.profile)
    contract = load_json(args.contract)
    failures = []
    failures.extend(validate_profile(profile, allow_template=args.allow_template))
    failures.extend(validate_contract(contract, profile, allow_template=args.allow_template))
    if args.instantiation:
        failures.extend(validate_instantiation(load_json(args.instantiation), allow_template=args.allow_template))
    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        return 1
    print(f"PASS: {args.contract}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
