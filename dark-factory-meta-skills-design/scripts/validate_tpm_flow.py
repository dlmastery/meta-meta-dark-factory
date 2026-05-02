#!/usr/bin/env python3
"""Validate DFMS TPM flow ledger, PERT dependencies, and AI judge/jury gates."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


ZERO_SLOP = "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS"
PASS_STATES = {"accepted", "next_ready", "closed"}
INSTANTIATED_REJECT_MARKERS = {"", "TBD", "pending", "not_evaluated"}


def load_json(path: Path) -> dict[str, Any]:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        raise SystemExit(f"ERROR: cannot read JSON from {path}: {exc}") from exc


def blank(value: Any) -> bool:
    if value is None:
        return True
    if isinstance(value, str):
        return value.strip() == "" or value.strip().lower() in INSTANTIATED_REJECT_MARKERS
    if isinstance(value, (list, tuple, dict, set)):
        return len(value) == 0
    return False


def add(failures: list[str], message: str) -> None:
    failures.append(message)


def validate_jury_record(record: dict[str, Any], step_id: str, allow_template: bool, failures: list[str]) -> None:
    if record.get("zero_slop_policy", {}).get("statement") != ZERO_SLOP:
        add(failures, f"judge/jury record for {step_id} missing zero-slop policy")
    if record.get("template_only") is True and not allow_template:
        add(failures, f"judge/jury record for {step_id} is template_only")
    if record.get("template_marker") is True and not allow_template:
        add(failures, f"judge/jury record for {step_id} still has template_marker")
    if record.get("step_id") and record.get("step_id") != step_id:
        add(failures, f"judge/jury record {record.get('record_id')} step mismatch for {step_id}")

    roles = record.get("roles", {})
    required_roles = [
        "tpm_judge",
        "evidence_clerk",
        "standards_juror",
        "domain_artifact_juror",
        "verification_juror",
        "adversarial_prosecutor",
        "jury_foreperson",
    ]
    for role in required_roles:
        if role not in roles:
            add(failures, f"judge/jury record for {step_id} missing role {role}")

    if allow_template:
        return

    for role in required_roles:
        role_record = roles.get(role, {})
        if blank(role_record.get("persona_contract")):
            add(failures, f"judge/jury role {role} for {step_id} missing persona_contract")

    for role in ("tpm_judge", "evidence_clerk", "standards_juror", "domain_artifact_juror", "verification_juror"):
        vote = roles.get(role, {}).get("vote")
        if vote != "pass":
            add(failures, f"judge/jury role {role} for {step_id} did not vote pass")

    prosecutor = roles.get("adversarial_prosecutor", {})
    if prosecutor.get("stand_down") is not True:
        add(failures, f"adversarial prosecutor for {step_id} has not stood down")

    foreperson = roles.get("jury_foreperson", {})
    if foreperson.get("verdict") != "pass":
        add(failures, f"jury foreperson for {step_id} did not record pass verdict")

    verdict = record.get("verdict", {})
    if verdict.get("outcome") != "pass":
        add(failures, f"judge/jury verdict for {step_id} is not pass")
    if blank(record.get("evidence_reviewed")):
        add(failures, f"judge/jury record for {step_id} missing evidence_reviewed")
    dep = record.get("dependency_check", {})
    for field in ("predecessors_accepted_or_waived", "pert_next_step_valid", "current_bead_matches"):
        if dep.get(field) is not True:
            add(failures, f"judge/jury dependency_check.{field} for {step_id} is not true")


def topo_has_cycle(steps: dict[str, dict[str, Any]]) -> bool:
    visiting: set[str] = set()
    visited: set[str] = set()

    def visit(step_id: str) -> bool:
        if step_id in visiting:
            return True
        if step_id in visited:
            return False
        visiting.add(step_id)
        for successor in steps[step_id].get("successors", []):
            if successor in steps and visit(successor):
                return True
        visiting.remove(step_id)
        visited.add(step_id)
        return False

    return any(visit(step_id) for step_id in steps)


def validate_flow(
    ledger: dict[str, Any],
    pert: dict[str, Any],
    jury_records: dict[str, dict[str, Any]],
    allow_template: bool,
) -> list[str]:
    failures: list[str] = []
    if ledger.get("zero_slop_policy", {}).get("statement") != ZERO_SLOP:
        add(failures, "TPM ledger missing zero-slop policy")
    if pert.get("zero_slop_policy", {}).get("statement") != ZERO_SLOP:
        add(failures, "PERT plan missing zero-slop policy")
    if ledger.get("template_only") is True and not allow_template:
        add(failures, "TPM ledger is template_only")
    if pert.get("template_only") is True and not allow_template:
        add(failures, "PERT plan is template_only")

    steps_list = ledger.get("steps", [])
    pert_nodes_list = pert.get("nodes", [])
    if not isinstance(steps_list, list) or not steps_list:
        add(failures, "TPM ledger steps must be a non-empty list")
        steps_list = []
    if not isinstance(pert_nodes_list, list) or not pert_nodes_list:
        add(failures, "PERT nodes must be a non-empty list")
        pert_nodes_list = []

    steps = {step.get("step_id"): step for step in steps_list if step.get("step_id")}
    if len(steps) != len(steps_list):
        add(failures, "TPM ledger has missing or duplicate step_id")
    pert_nodes = {node.get("step_id"): node for node in pert_nodes_list if node.get("step_id")}

    for step_id in steps:
        if step_id not in pert_nodes:
            add(failures, f"step {step_id} missing from PERT plan")
    for step_id in pert_nodes:
        if step_id not in steps:
            add(failures, f"PERT node {step_id} missing from TPM ledger")

    if topo_has_cycle(steps):
        add(failures, "TPM ledger dependency graph has a cycle")

    if not allow_template:
        current_step = ledger.get("current_step_id")
        if current_step and current_step not in steps and current_step != "RUN-CLOSED":
            add(failures, f"current_step_id {current_step} does not resolve")
        if (
            ledger.get("current_bead_id")
            and ledger.get("current_bead_id") != "RUN-CLOSED"
            and all(step.get("bead_id") != ledger.get("current_bead_id") for step in steps.values())
        ):
            add(failures, f"current_bead_id {ledger.get('current_bead_id')} does not match any step")

    for step_id, step in steps.items():
        state = step.get("state")
        if not allow_template and step.get("template_marker") is True:
            add(failures, f"step {step_id} still has template_marker")
        for field in ("bead_id", "title", "state", "owner", "control_graph_node", "work_ledger_item", "knowledge_graph_node", "gate_id"):
            if blank(step.get(field)):
                add(failures, f"step {step_id} missing {field}")
        for predecessor in step.get("predecessors", []):
            if predecessor not in steps:
                add(failures, f"step {step_id} predecessor {predecessor} does not resolve")
            elif state in PASS_STATES and steps[predecessor].get("state") not in PASS_STATES and not steps[predecessor].get("waiver"):
                add(failures, f"accepted step {step_id} has unmet predecessor {predecessor}")
        for successor in step.get("successors", []):
            if successor not in steps and successor != "RUN-CLOSED":
                add(failures, f"step {step_id} successor {successor} does not resolve")
        if state in PASS_STATES:
            for field in ("outputs", "evidence_provided", "judge_jury_record", "next_step_id"):
                if blank(step.get(field)) and not step.get("closure_rationale"):
                    add(failures, f"accepted step {step_id} missing {field}")
            record_id = step.get("judge_jury_record")
            if record_id in jury_records:
                validate_jury_record(jury_records[record_id], step_id, allow_template, failures)
            else:
                add(failures, f"accepted step {step_id} judge_jury_record {record_id!r} not supplied")
        if state == "blocked":
            blockers = step.get("blockers", [])
            if not blockers:
                add(failures, f"blocked step {step_id} missing blockers")
            for idx, blocker in enumerate(blockers):
                for field in ("owner", "unblock_action", "recheck_date"):
                    if blank(blocker.get(field)):
                        add(failures, f"blocked step {step_id} blocker {idx} missing {field}")
        if state == "waived":
            waiver = step.get("waiver")
            if not waiver:
                add(failures, f"waived step {step_id} missing waiver")
            else:
                for field in ("owner", "rationale", "expiry", "residual_risk", "revalidation_trigger"):
                    if blank(waiver.get(field)):
                        add(failures, f"waived step {step_id} waiver missing {field}")

    if not allow_template:
        critical_path = pert.get("critical_path", [])
        if not critical_path:
            add(failures, "PERT plan missing critical_path")
        for step_id in critical_path:
            if step_id not in steps:
                add(failures, f"critical_path step {step_id} does not resolve")

    return failures


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Validate TPM flow ledger, PERT plan, and AI judge/jury records.")
    parser.add_argument("--ledger", type=Path, required=True)
    parser.add_argument("--pert", type=Path, required=True)
    parser.add_argument("--jury-record", type=Path, action="append", default=[])
    parser.add_argument("--allow-template", action="store_true")
    args = parser.parse_args(argv)

    ledger = load_json(args.ledger)
    pert = load_json(args.pert)
    jury_records: dict[str, dict[str, Any]] = {}
    for path in args.jury_record:
        record = load_json(path)
        jury_records[record.get("record_id", str(path))] = record

    failures = validate_flow(ledger, pert, jury_records, args.allow_template)
    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        return 1
    print(f"PASS: {args.ledger} + {args.pert}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
