#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path


MIN_LOOPS = 5
MIN_ADVERSARIAL_CRITICS = 2
REQUIRED_LOOP_FIELDS = (
    "round",
    "phase",
    "artifact_version_before",
    "review_inputs",
    "primary_critic_findings",
    "adversarial_attacks",
    "root_causes",
    "patches_applied",
    "artifact_version_after",
    "fix_evidence",
    "re_review_evidence",
    "remaining_findings",
    "remaining_risks",
    "verdict",
)


PLACEHOLDER = re.compile(r"^\s*$|\bTBD\b|\bTODO\b|placeholder|example only", re.I)


def blank(value):
    if isinstance(value, str):
        return bool(PLACEHOLDER.search(value))
    if isinstance(value, list):
        return not value or any(blank(item) for item in value)
    return value in (None, {})


def validate_loop(loop, expected_round):
    problems = []
    label = f"loop {expected_round}"
    for field in REQUIRED_LOOP_FIELDS:
        if field not in loop:
            problems.append(f"{label}: missing {field}")
    if loop.get("round") != expected_round:
        problems.append(f"{label}: round must be {expected_round}")
    for field in ("artifact_version_before", "artifact_version_after", "review_inputs", "adversarial_attacks", "root_causes", "patches_applied", "fix_evidence", "re_review_evidence"):
        if blank(loop.get(field)):
            problems.append(f"{label}: {field} must be non-empty and non-placeholder")
    if loop.get("verdict") not in {"revise", "fail", "split", "escalate", "conditional-pass", "pass"}:
        problems.append(f"{label}: invalid verdict")
    if expected_round < MIN_LOOPS and loop.get("verdict") == "pass":
        problems.append(f"{label}: cannot pass before minimum {MIN_LOOPS} loops")
    return problems


def validate(data):
    problems = []
    for field in ("id", "artifact_id", "artifact_name", "artifact_path", "artifact_review_panel_record", "artifact_rubric_path", "control_graph_node", "work_ledger_item"):
        if blank(data.get(field)):
            problems.append(f"missing or placeholder {field}")
    if "token savings cannot reduce required RALPH loops" not in data.get("quality_priority_statement", ""):
        problems.append("quality_priority_statement must state that token savings cannot reduce required RALPH loops")
    adversarial_critics = data.get("adversarial_critics", [])
    if not isinstance(adversarial_critics, list) or len(adversarial_critics) < MIN_ADVERSARIAL_CRITICS:
        problems.append(f"requires at least {MIN_ADVERSARIAL_CRITICS} adversarial critics")
    for idx, critic in enumerate(adversarial_critics, start=1):
        if blank(critic.get("critic_id")):
            problems.append(f"adversarial critic {idx}: missing critic_id")
        if blank(critic.get("attack_focus")):
            problems.append(f"adversarial critic {idx}: missing attack_focus")

    loops = data.get("loops", [])
    if not isinstance(loops, list) or len(loops) < MIN_LOOPS:
        problems.append(f"requires at least {MIN_LOOPS} RALPH loops")
    else:
        for idx, loop in enumerate(loops, start=1):
            problems.extend(validate_loop(loop, idx))

    gate = data.get("final_gate", {})
    if len(loops) >= MIN_LOOPS:
        required_true = (
            "all_minimum_loops_completed",
            "all_p0_p1_findings_resolved",
            "all_failed_rubric_points_resolved_or_accepted",
            "adversarial_critics_stood_down",
            "trace_and_evidence_closed",
        )
        if gate.get("final_verdict") == "pass":
            for field in required_true:
                if gate.get(field) is not True:
                    problems.append(f"pass final_gate requires {field}=true")
            if blank(gate.get("human_owner_approval_or_waiver")):
                problems.append("pass final_gate requires human_owner_approval_or_waiver")
    return problems


def main(path):
    data = json.loads(Path(path).read_text(encoding="utf-8-sig"))
    problems = validate(data)
    if problems:
        print("Artifact RALPH loop validation failed:")
        print("\n".join(problems[:200]))
        if len(problems) > 200:
            print(f"... {len(problems) - 200} more")
        return 1
    print(json.dumps({"status": "pass", "artifact_id": data["artifact_id"], "loops": len(data["loops"]), "adversarial_critics": len(data["adversarial_critics"])}, indent=2))
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: validate_artifact_ralph_loop.py artifact-ralph-loop-record.json")
    raise SystemExit(main(sys.argv[1]))
