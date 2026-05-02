#!/usr/bin/env python3
"""Cross-artifact DFMS execution preflight and next-action kernel."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

from validate_knowledge_graph import validate_record
from validate_hawkeye_conformance import validate_record as validate_hawkeye_record
from validate_sdlc_stage_coverage import validate_record as validate_sdlc_record
from validate_tasks_md import split_row, table_lines_after, validate_tasks
from validate_tpm_flow import validate_flow


PASS_STATES = {"accepted", "next_ready", "closed"}
WORK_STATES = {
    "planned": "move to ready when entry criteria and predecessors are satisfied",
    "ready": "move to active and update TASKS.md active bead",
    "active": "produce output and move to self_check",
    "self_check": "run validators and move to judge_review",
    "judge_review": "obtain TPM Judge and Evidence Clerk pass",
    "jury_review": "obtain juror votes, adversarial stand-down, and foreperson verdict",
    "rework": "execute patch bead",
    "blocked": "execute unblock action or wait",
    "waived": "continue only if waiver is complete and unexpired",
}


def load_json(path: Path) -> dict[str, Any]:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        raise SystemExit(f"ERROR: cannot read JSON from {path}: {exc}") from exc


def table_beads(text: str, section: str) -> list[str]:
    lines = table_lines_after(text, section)
    if len(lines) <= 2:
        return []
    header = split_row(lines[0])
    if "Bead ID" not in header:
        return []
    bead_idx = header.index("Bead ID")
    beads: list[str] = []
    for line in lines[2:]:
        row = split_row(line)
        if len(row) > bead_idx:
            bead = row[bead_idx].strip("`")
            if bead:
                beads.append(bead)
    return beads


def task_bead_nodes(kg: dict[str, Any]) -> set[str]:
    return {node.get("id") for node in kg.get("nodes", []) if node.get("type") == "task_bead"}


def compute_ready_successors(current_step: dict[str, Any], steps: dict[str, dict[str, Any]]) -> list[str]:
    ready: list[str] = []
    for successor_id in current_step.get("successors", []):
        if successor_id == "RUN-CLOSED":
            ready.append(successor_id)
            continue
        successor = steps.get(successor_id)
        if not successor:
            continue
        predecessors = successor.get("predecessors", [])
        if all(steps.get(pred, {}).get("state") in PASS_STATES or steps.get(pred, {}).get("waiver") for pred in predecessors):
            ready.append(successor_id)
    return ready


def build_report(
    tasks_text: str,
    ledger: dict[str, Any],
    pert: dict[str, Any],
    kg: dict[str, Any],
    jury_records: dict[str, dict[str, Any]],
    sdlc_coverage: dict[str, Any] | None = None,
    hawkeye_audit: dict[str, Any] | None = None,
) -> tuple[dict[str, Any], list[str]]:
    failures: list[str] = []
    failures.extend(validate_tasks(tasks_text))
    failures.extend(validate_flow(ledger, pert, jury_records, allow_template=False))
    failures.extend(validate_record(kg, allow_template=False))
    if sdlc_coverage is not None:
        failures.extend(validate_sdlc_record(sdlc_coverage, allow_template=False))
    if hawkeye_audit is not None:
        failures.extend(validate_hawkeye_record(hawkeye_audit, allow_template=False))

    active_beads = table_beads(tasks_text, "## Active Beads")
    accepted_beads = set(table_beads(tasks_text, "## Accepted Beads"))
    kg_beads = task_bead_nodes(kg)
    steps = {step.get("step_id"): step for step in ledger.get("steps", []) if step.get("step_id")}

    current_step_id = ledger.get("current_step_id", "")
    current_bead_id = ledger.get("current_bead_id", "")
    if pert.get("current_step_id") != current_step_id:
        failures.append(f"PERT current_step_id {pert.get('current_step_id')!r} does not match ledger current_step_id {current_step_id!r}")

    if current_step_id == "RUN-CLOSED" or current_bead_id == "RUN-CLOSED":
        if active_beads:
            failures.append("run is closed but TASKS.md has active beads")
    else:
        if len(active_beads) != 1:
            failures.append("non-closed run must have exactly one active bead in TASKS.md")
        elif active_beads[0] != current_bead_id:
            failures.append(f"active TASKS bead {active_beads[0]!r} does not match ledger current_bead_id {current_bead_id!r}")

    for step in steps.values():
        bead_id = step.get("bead_id")
        if bead_id and bead_id != "RUN-CLOSED":
            if bead_id not in kg_beads:
                failures.append(f"ledger bead {bead_id} missing from knowledge graph task_bead nodes")
            if step.get("state") in PASS_STATES and bead_id not in accepted_beads:
                failures.append(f"accepted ledger bead {bead_id} missing from TASKS.md Accepted Beads")

    status = "pass"
    action = ""
    next_step = ""
    next_bead = ""
    blocked_by: list[str] = []

    if failures:
        status = "blocked"
        action = "fix preflight failures before continuing"
        blocked_by = failures
    elif current_step_id == "RUN-CLOSED":
        status = "closed"
        action = "stop; open a new bead or change request before continuing"
    else:
        current_step = steps.get(current_step_id, {})
        state = current_step.get("state", "")
        if state in WORK_STATES:
            action = WORK_STATES[state]
            next_step = current_step_id
            next_bead = current_step.get("bead_id", "")
        elif state in PASS_STATES:
            candidates = compute_ready_successors(current_step, steps)
            if candidates:
                next_step = candidates[0]
                action = f"activate next PERT-ready successor {next_step}" if next_step != "RUN-CLOSED" else "close run with closure rationale"
                next_bead = steps.get(next_step, {}).get("bead_id", "RUN-CLOSED") if next_step != "RUN-CLOSED" else "RUN-CLOSED"
            else:
                status = "blocked"
                action = "no legal successor is ready"
                blocked_by = ["accepted step has no ready successor and no closure path"]
        else:
            status = "blocked"
            action = f"unknown step state {state!r}"
            blocked_by = [action]

    report = {
        "zero_slop_policy": {
            "statement": "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS"
        },
        "template_only": False,
        "kernel_status": status,
        "current_step_id": current_step_id,
        "current_bead_id": current_bead_id,
        "legal_next_action": action,
        "legal_next_step_id": next_step,
        "legal_next_bead_id": next_bead,
        "blocked_reasons": blocked_by,
        "consistency": {
            "tasks_active_beads": active_beads,
            "tasks_accepted_beads": sorted(accepted_beads),
            "ledger_steps": sorted(steps),
            "knowledge_graph_task_beads": sorted(kg_beads),
            "sdlc_coverage_matrix": sdlc_coverage.get("matrix_id") if sdlc_coverage else "",
            "hawkeye_audit": hawkeye_audit.get("audit_id") if hawkeye_audit else "",
        },
    }
    return report, failures


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Run the DFMS execution kernel preflight.")
    parser.add_argument("--tasks-md", type=Path, required=True)
    parser.add_argument("--ledger", type=Path, required=True)
    parser.add_argument("--pert", type=Path, required=True)
    parser.add_argument("--knowledge-graph", type=Path, required=True)
    parser.add_argument("--sdlc-coverage", type=Path)
    parser.add_argument("--hawkeye-audit", type=Path)
    parser.add_argument("--jury-record", type=Path, action="append", default=[])
    parser.add_argument("--write-report", type=Path)
    args = parser.parse_args(argv)

    tasks_text = args.tasks_md.read_text(encoding="utf-8")
    ledger = load_json(args.ledger)
    pert = load_json(args.pert)
    kg = load_json(args.knowledge_graph)
    sdlc_coverage = load_json(args.sdlc_coverage) if args.sdlc_coverage else None
    hawkeye_audit = load_json(args.hawkeye_audit) if args.hawkeye_audit else None
    jury_records = {}
    for path in args.jury_record:
        record = load_json(path)
        jury_records[record.get("record_id", str(path))] = record

    report, failures = build_report(
        tasks_text,
        ledger,
        pert,
        kg,
        jury_records,
        sdlc_coverage=sdlc_coverage,
        hawkeye_audit=hawkeye_audit,
    )
    text = json.dumps(report, indent=2)
    if args.write_report:
        args.write_report.write_text(text + "\n", encoding="utf-8")
    print(text)
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
