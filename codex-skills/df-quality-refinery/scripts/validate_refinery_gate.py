#!/usr/bin/env python3
import re
import sys
from pathlib import Path


REQUIRED_TOP_LEVEL = {
    "id",
    "status",
    "scope",
    "required_checks",
    "thresholds",
    "evidence",
    "failed_checks",
    "required_fixes",
    "residual_risks",
    "human_decision",
    "verdict_rationale",
    "next_action",
}

REQUIRED_CHECKS = {
    "attractor_record",
    "control_graph",
    "work_ledger",
    "traceability",
    "expert_rubrics",
    "adversarial_critics",
    "ralph_loops",
}

PASS_REQUIRED_EVIDENCE = {
    "rubric_scorecards",
    "trace_reports",
    "certificates",
    "adversarial_review_records",
    "ralph_loop_records",
}

SCOPE_FIELDS = {
    "work_items",
    "artifacts",
    "code_changes",
    "release_items",
}

ALLOWED_STATUSES = {"pending", "pass", "conditional_pass", "revise", "fail", "escalated"}


def top_level_keys(text):
    keys = set()
    for line in text.splitlines():
        if not line.strip() or line.startswith((" ", "-")):
            continue
        match = re.match(r"^([A-Za-z0-9_-]+):", line)
        if match:
            keys.add(match.group(1))
    return keys


def scalar_value(text, key):
    for line in text.splitlines():
        clean = line.lstrip("\ufeff")
        if clean.startswith((" ", "-")):
            continue
        match = re.match(rf"^{re.escape(key)}:\s*(.*)$", clean)
        if match:
            return match.group(1).strip().strip('"')
    return None


def section_body(text, section):
    match = re.search(rf"(?m)^{re.escape(section)}:\s*$", text)
    if not match:
        return ""
    lines = []
    for line in text[match.end() :].splitlines():
        if line and not line.startswith(" "):
            break
        lines.append(line)
    return "\n".join(lines)


def section_scalar(text, section, key):
    body = section_body(text, section)
    for line in body.splitlines():
        match = re.match(rf"^\s{{2}}{re.escape(key)}:\s*(.*)$", line)
        if match:
            return match.group(1).strip().strip('"')
    return None


def list_is_empty(text, key):
    value = scalar_value(text, key)
    return value == "[]"


def section_list_is_empty(text, section, key):
    body = section_body(text, section).splitlines()
    for index, line in enumerate(body):
        match = re.match(rf"^\s{{2}}{re.escape(key)}:\s*(.*)$", line)
        if not match:
            continue
        value = match.group(1).strip().strip('"')
        if value and value != "[]":
            return False
        for next_line in body[index + 1 :]:
            if re.match(r"^\s{2}\S", next_line):
                break
            if re.match(r"^\s{4}-\s+\S", next_line):
                return False
        return True
    return True


def section_list_values(text, section, key):
    body = section_body(text, section).splitlines()
    for index, line in enumerate(body):
        match = re.match(rf"^\s{{2}}{re.escape(key)}:\s*(.*)$", line)
        if not match:
            continue
        value = match.group(1).strip().strip('"')
        if value and value != "[]":
            if value.startswith("[") and value.endswith("]"):
                inner = value[1:-1].strip()
                if not inner:
                    return []
                return [item.strip().strip('"').strip("'") for item in inner.split(",") if item.strip()]
            return [value]
        values = []
        for next_line in body[index + 1 :]:
            if re.match(r"^\s{2}\S", next_line):
                break
            item = re.match(r"^\s{4}-\s+(.+?)\s*$", next_line)
            if item:
                values.append(item.group(1).strip().strip('"').strip("'"))
        return values
    return []


def validate_status(text, problems, allow_pending):
    status = scalar_value(text, "status")
    if not status or "|" in status or status not in ALLOWED_STATUSES:
        problems.append("status must be a live refinery verdict")
    elif status == "pending" and not allow_pending:
        problems.append("status is still pending")
    return status


def validate_required_checks(text, status, problems):
    for check in REQUIRED_CHECKS:
        value = section_scalar(text, "required_checks", check)
        if not value:
            problems.append(f"missing required check {check}")
            continue
        if "|" in value:
            problems.append(f"required check {check} is still a placeholder")
        if value == "fail":
            problems.append(f"required check {check} is fail")
        if status == "pass" and value != "pass":
            problems.append(f"pass gate requires required_checks.{check}=pass")
    for check in ("holdout_scenarios", "transfer_tests", "handoff_replay"):
        value = section_scalar(text, "required_checks", check)
        if value == "pass":
            evidence_key = {
                "holdout_scenarios": "holdout_reports",
                "transfer_tests": "transfer_test_reports",
                "handoff_replay": "review_comments",
            }[check]
            if section_list_is_empty(text, "evidence", evidence_key):
                problems.append(f"required_checks.{check}=pass requires evidence.{evidence_key}")


def validate_pass_evidence(text, status, problems):
    if status != "pass":
        return
    for key in sorted(PASS_REQUIRED_EVIDENCE):
        if section_list_is_empty(text, "evidence", key):
            problems.append(f"pass gate missing evidence.{key}")
    if not list_is_empty(text, "failed_checks"):
        problems.append("pass gate requires failed_checks=[]")
    if not list_is_empty(text, "required_fixes"):
        problems.append("pass gate requires required_fixes=[]")


def validate_pass_scope_and_fields(text, status, problems):
    if status != "pass":
        return
    if not any(section_list_values(text, "scope", key) for key in SCOPE_FIELDS):
        problems.append("pass gate requires at least one scoped work item, artifact, code change, or release item")
    for key in ("verdict_rationale", "next_action"):
        value = scalar_value(text, key)
        if not value or value == "\"\"":
            problems.append(f"pass gate missing {key}")
    human_required = section_scalar(text, "human_decision", "required")
    if human_required == "true":
        approver = section_scalar(text, "human_decision", "approver")
        decision = section_scalar(text, "human_decision", "decision")
        if not approver or decision in (None, "", "pending"):
            problems.append("human_decision.required=true requires approver and non-pending decision")


def main(path, allow_pending=False):
    text = Path(path).read_text(encoding="utf-8-sig")
    keys = top_level_keys(text)
    problems = [f"missing top-level key {key}" for key in sorted(REQUIRED_TOP_LEVEL - keys)]
    status = validate_status(text, problems, allow_pending)
    validate_required_checks(text, status, problems)
    validate_pass_evidence(text, status, problems)
    validate_pass_scope_and_fields(text, status, problems)
    if problems:
        print("\n".join(problems))
        return 1
    print("Refinery gate record has required structure.")
    return 0


if __name__ == "__main__":
    if len(sys.argv) not in (2, 3):
        raise SystemExit("Usage: validate_refinery_gate.py refinery-gate-record.yaml [--allow-pending]")
    raise SystemExit(main(sys.argv[1], len(sys.argv) == 3 and sys.argv[2] == "--allow-pending"))
