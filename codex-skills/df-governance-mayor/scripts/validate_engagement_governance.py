#!/usr/bin/env python3
import json
import sys
from pathlib import Path


APPROVED = {"approved", "accepted", "pass", "signed_off"}
LIVE_STATUSES = {"approved", "accepted", "active", "pass"}
REQUIRED_CHECKPOINTS = {
    "kickoff",
    "scope_baseline",
    "token_budget",
    "iteration_plan",
    "change_control",
    "acceptance",
    "retrospective",
}
INITIAL_APPROVAL_CHECKPOINTS = {
    "kickoff",
    "scope_baseline",
    "token_budget",
    "iteration_plan",
    "change_control",
}
REQUIRED_IMPACT_FIELDS = {"scope", "tokens", "schedule", "quality", "risk"}


def list_value(value):
    if value is None:
        return []
    if isinstance(value, list):
        return [item for item in value if item not in ("", None)]
    if value in ("", None):
        return []
    return [value]


def non_empty(value):
    if isinstance(value, str):
        return bool(value.strip())
    if isinstance(value, list):
        return bool(list_value(value))
    if isinstance(value, dict):
        return bool(value)
    return value is not None


def approved(decision):
    return decision in APPROVED


def validate_approval(record, problems, label, require_approved=True):
    if not isinstance(record, dict):
        problems.append(f"{label}: approval must be an object")
        return
    if not record.get("approver"):
        problems.append(f"{label}: approval missing approver")
    decision = record.get("decision")
    if require_approved and not approved(decision):
        problems.append(f"{label}: approval decision must be approved, accepted, pass, or signed_off")
    elif not decision:
        problems.append(f"{label}: approval missing decision")
    if not record.get("at"):
        problems.append(f"{label}: approval missing timestamp")


def validate_token_swag(record, problems, label):
    if not isinstance(record, dict):
        problems.append(f"{label}: token_swag must be an object")
        return
    values = []
    for key in ("low", "mid", "high"):
        value = record.get(key)
        if not isinstance(value, int) or value <= 0:
            problems.append(f"{label}: token_swag.{key} must be a positive integer")
        else:
            values.append(value)
    if len(values) == 3 and not (record["low"] <= record["mid"] <= record["high"]):
        problems.append(f"{label}: token_swag must satisfy low <= mid <= high")


def validate_token_budget(record, problems):
    budget = record.get("token_budget")
    if not isinstance(budget, dict):
        problems.append("token_budget must be an object")
        return
    if budget.get("currency") != "tokens":
        problems.append("token_budget.currency must be tokens")
    if budget.get("estimate_class") not in {"rough_swag", "rom", "budgetary"}:
        problems.append("token_budget.estimate_class must be rough_swag, rom, or budgetary")
    validate_token_swag(budget.get("swag"), problems, "token_budget")
    if not list_value(budget.get("assumptions")):
        problems.append("token_budget.assumptions must be non-empty")
    if not list_value(budget.get("exclusions")):
        problems.append("token_budget.exclusions must be non-empty")
    if budget.get("confidence") not in {"low", "medium", "high"}:
        problems.append("token_budget.confidence must be low, medium, or high")
    validate_approval(budget.get("approval"), problems, "token_budget")
    rules = budget.get("reapproval_rules")
    if not isinstance(rules, dict):
        problems.append("token_budget.reapproval_rules must be an object")
        return
    threshold = rules.get("token_delta_percent")
    if not isinstance(threshold, (int, float)) or threshold <= 0 or threshold > 25:
        problems.append("token_budget.reapproval_rules.token_delta_percent must be >0 and <=25")
    if rules.get("scope_change_requires_approval") is not True:
        problems.append("token_budget.reapproval_rules.scope_change_requires_approval must be true")
    if rules.get("iteration_overrun_requires_approval") is not True:
        problems.append("token_budget.reapproval_rules.iteration_overrun_requires_approval must be true")


def validate_checkpoints(record, problems):
    checkpoints = record.get("client_checkpoints")
    if not isinstance(checkpoints, list) or not checkpoints:
        problems.append("client_checkpoints must be a non-empty list")
        return
    by_type = {checkpoint.get("type"): checkpoint for checkpoint in checkpoints if isinstance(checkpoint, dict)}
    missing = sorted(REQUIRED_CHECKPOINTS - set(by_type))
    if missing:
        problems.append(f"client_checkpoints missing {', '.join(missing)}")
    for ctype, checkpoint in by_type.items():
        label = f"client_checkpoints.{ctype}"
        for key in ("purpose", "cadence_or_trigger", "owner"):
            if not non_empty(checkpoint.get(key)):
                problems.append(f"{label}: missing {key}")
        if checkpoint.get("approval_required") is not True:
            problems.append(f"{label}: approval_required must be true")
        validate_approval(
            checkpoint.get("approval"),
            problems,
            label,
            require_approved=ctype in INITIAL_APPROVAL_CHECKPOINTS,
        )
        if not non_empty(checkpoint.get("reapproval_trigger")):
            problems.append(f"{label}: missing reapproval_trigger")


def validate_iterations(record, problems):
    iterations = record.get("iterations")
    if not isinstance(iterations, list) or not iterations:
        problems.append("iterations must be a non-empty list")
        return
    budget_high = record.get("token_budget", {}).get("swag", {}).get("high")
    total_mid = 0
    for index, iteration in enumerate(iterations, start=1):
        label = f"iterations[{index}]"
        if not isinstance(iteration, dict):
            problems.append(f"{label}: must be an object")
            continue
        for key in ("id", "objective", "client_checkpoint", "control_graph_node", "work_ledger_item", "refinery_gate"):
            if not non_empty(iteration.get(key)):
                problems.append(f"{label}: missing {key}")
        validate_token_swag(iteration.get("token_swag"), problems, label)
        if isinstance(iteration.get("token_swag"), dict) and isinstance(iteration["token_swag"].get("mid"), int):
            total_mid += iteration["token_swag"]["mid"]
        validate_approval(iteration.get("approval"), problems, label)
    if isinstance(budget_high, int) and total_mid > budget_high:
        problems.append("iterations mid-token total exceeds token_budget.swag.high")


def validate_change_control(record, problems):
    control = record.get("change_control")
    if not isinstance(control, dict):
        problems.append("change_control must be an object")
        return
    if control.get("approval_required") is not True:
        problems.append("change_control.approval_required must be true")
    validate_approval(control.get("approval"), problems, "change_control")
    fields = set(list_value(control.get("required_impact_fields")))
    missing = sorted(REQUIRED_IMPACT_FIELDS - fields)
    if missing:
        problems.append(f"change_control.required_impact_fields missing {', '.join(missing)}")
    if not non_empty(control.get("rebaseline_trigger")):
        problems.append("change_control missing rebaseline_trigger")
    for index, request in enumerate(list_value(control.get("change_requests")), start=1):
        if not isinstance(request, dict):
            problems.append(f"change_requests[{index}]: must be an object")
            continue
        label = f"change_requests[{index}]"
        for key in ("id", "description", "token_delta", "impact_analysis"):
            if not non_empty(request.get(key)):
                problems.append(f"{label}: missing {key}")
        impact = request.get("impact_analysis", {})
        if isinstance(impact, dict):
            missing_impact = sorted(REQUIRED_IMPACT_FIELDS - set(impact))
            if missing_impact:
                problems.append(f"{label}: impact_analysis missing {', '.join(missing_impact)}")
        else:
            problems.append(f"{label}: impact_analysis must be an object")
        validate_approval(request.get("approval"), problems, label)


def validate_trace(record, problems):
    trace = record.get("trace") or record.get("links")
    if not isinstance(trace, dict):
        problems.append("trace/links must be an object")
        return
    required = {
        "attractor_record": "ATTR-",
        "control_graph": "CG-",
        "work_ledger": "WL-",
        "refinery_gate": "RFG-",
    }
    for key, prefix in required.items():
        value = trace.get(key)
        if not isinstance(value, str) or not value.startswith(prefix):
            problems.append(f"trace.{key} must reference {prefix}*")


def validate_engagement(record):
    problems = []
    rid = record.get("id", "")
    if not str(rid).startswith("ENG-GOV-"):
        problems.append("id must be ENG-GOV-*")
    if record.get("status") not in LIVE_STATUSES:
        problems.append("status must be approved, accepted, active, or pass")
    if record.get("engagement_model") != "client_dark_factory_outsourcing":
        problems.append("engagement_model must be client_dark_factory_outsourcing")
    for key in ("client_owner", "dark_factory_delivery_owner", "scope_baseline", "standards_baseline"):
        if not non_empty(record.get(key)):
            problems.append(f"missing {key}")
    validate_token_budget(record, problems)
    validate_checkpoints(record, problems)
    validate_iterations(record, problems)
    validate_change_control(record, problems)
    validate_trace(record, problems)
    return problems


def main(path):
    try:
        record = json.loads(Path(path).read_text(encoding="utf-8-sig"))
    except Exception as exc:
        print(str(exc))
        return 1
    if not isinstance(record, dict):
        print("Engagement governance record must be a JSON object.")
        return 1
    problems = validate_engagement(record)
    if problems:
        print("\n".join(problems))
        return 1
    print("Engagement governance record is valid.")
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: validate_engagement_governance.py engagement-governance-record.json")
    raise SystemExit(main(sys.argv[1]))
