#!/usr/bin/env python3
import json
import sys
from pathlib import Path

from validate_spec_decomposition import validate_record as validate_decomposition_record


REQUIRED_ROUNDS = {
    "context",
    "outcome",
    "constraint",
    "scenario",
    "operations",
    "contradiction",
    "approval",
}

REQUIRED_SCORE_KEYS = {
    "goal_clarity",
    "scope",
    "functional_completeness",
    "nonfunctional_completeness",
    "security_privacy_compliance",
    "operations_handoff",
    "scenario_readiness",
    "contradiction_resolution",
    "owner_approval",
    "traceability_readiness",
}


def list_value(value):
    if value is None:
        return []
    if isinstance(value, list):
        return [item for item in value if item not in ("", None)]
    if value in ("", None):
        return []
    return [value]


def read_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8-sig"))


def node_ids(decomposition):
    return {node.get("node_id") for node in decomposition.get("nodes", []) if node.get("node_id")}


def answer_ids(interrogation):
    return {answer.get("answer_id") for answer in interrogation.get("answers", []) if answer.get("answer_id")}


def answers_by_id(interrogation):
    return {answer.get("answer_id"): answer for answer in interrogation.get("answers", []) if answer.get("answer_id")}


def waiver_is_complete(waiver, topic):
    if not isinstance(waiver, dict):
        return False
    if waiver.get("topic") != topic:
        return False
    if not waiver.get("owner") or not waiver.get("reason"):
        return False
    if not waiver.get("revalidation_trigger") and not waiver.get("expires_at"):
        return False
    if "residual_risk" not in waiver and "residual_risks" not in waiver:
        return False
    return True


def has_waiver(record, topic):
    waivers = record.get("waivers", [])
    if not isinstance(waivers, list):
        return False
    return any(waiver_is_complete(waiver, topic) for waiver in waivers)


def validate_waivers(record, problems, label):
    waivers = record.get("waivers", [])
    if waivers in (None, ""):
        return
    if not isinstance(waivers, list):
        problems.append(f"{label}: waivers must be a list")
        return
    for index, waiver in enumerate(waivers, start=1):
        topic = waiver.get("topic") if isinstance(waiver, dict) else None
        if not waiver_is_complete(waiver, topic):
            problems.append(f"{label}: waiver {index} is incomplete")


def score_percent(scores):
    if not isinstance(scores, dict):
        return 0.0
    total = 0
    possible = len(REQUIRED_SCORE_KEYS) * 4
    for key in REQUIRED_SCORE_KEYS:
        value = scores.get(key)
        if not isinstance(value, int) or value < 0 or value > 4:
            return 0.0
        total += value
    return round((total / possible) * 100, 2)


def validate_interrogation(interrogation, decomposition):
    problems = []
    iid = interrogation.get("id", "<unknown>")
    if iid in ("", "ITR-000", "<unknown>"):
        problems.append("interrogation: missing live id")
    if interrogation.get("status") not in {"accepted", "approved", "conditional_pass", "reviewing"}:
        problems.append(f"{iid}: status must be reviewing, conditional_pass, accepted, or approved")
    rounds = {round_item.get("round") for round_item in interrogation.get("rounds", [])}
    missing_rounds = sorted(REQUIRED_ROUNDS - rounds)
    if missing_rounds:
        problems.append(f"{iid}: missing rounds {', '.join(missing_rounds)}")
    answers = interrogation.get("answers", [])
    if not isinstance(answers, list) or not answers:
        problems.append(f"{iid}: answers must be non-empty")
        answers = []
    seen = set()
    nodes = node_ids(decomposition)
    for answer in answers:
        aid = answer.get("answer_id")
        if not aid or aid in {"ANS-001", "ANS-000"}:
            problems.append(f"{iid}: answer missing live answer_id")
        elif aid in seen:
            problems.append(f"{iid}: duplicate answer_id {aid}")
        seen.add(aid)
        for key in ("source_reference", "summary", "owner", "revalidation_trigger"):
            if not answer.get(key):
                problems.append(f"{aid or '<missing-answer>'}: missing {key}")
        if answer.get("confidence") not in {"high", "medium", "low"}:
            problems.append(f"{aid or '<missing-answer>'}: confidence must be high, medium, or low")
        links = answer.get("links", {})
        if not isinstance(links, dict):
            problems.append(f"{aid or '<missing-answer>'}: links must be an object")
            links = {}
        linked_nodes = list_value(links.get("spec_decomposition_nodes"))
        if not linked_nodes:
            problems.append(f"{aid or '<missing-answer>'}: missing links.spec_decomposition_nodes")
        for linked_node in linked_nodes:
            if linked_node not in nodes:
                problems.append(f"{aid or '<missing-answer>'}: links unknown spec decomposition node {linked_node}")
        if not list_value(links.get("requirements")):
            problems.append(f"{aid or '<missing-answer>'}: missing links.requirements")
    scores = interrogation.get("scores")
    missing_scores = sorted(REQUIRED_SCORE_KEYS - set(scores or {}))
    if missing_scores:
        problems.append(f"{iid}: missing score keys {', '.join(missing_scores)}")
    threshold = interrogation.get("threshold_percent", 96)
    if not isinstance(threshold, (int, float)) or threshold < 0 or threshold > 100:
        problems.append(f"{iid}: threshold_percent must be 0..100")
        threshold = 96
    if threshold < 96 and not has_waiver(interrogation, "threshold_lowering"):
        problems.append(f"{iid}: threshold_percent below 96 requires waiver topic threshold_lowering")
    validate_waivers(interrogation, problems, iid)
    if score_percent(scores) < threshold:
        problems.append(f"{iid}: score {score_percent(scores)} below threshold {threshold}")
    approval = interrogation.get("approval", {})
    if not isinstance(approval, dict) or not approval.get("approver") or approval.get("decision") not in {"approved", "conditional_pass", "deferred"}:
        problems.append(f"{iid}: approval requires approver and decision approved|conditional_pass|deferred")
    return problems


def validate_cross_links(interrogation, decomposition):
    problems = []
    answers = answer_ids(interrogation)
    answer_map = answers_by_id(interrogation)
    used_answers = set()
    for node in decomposition.get("nodes", []):
        nid = node.get("node_id", "<missing-node>")
        for aid in list_value(node.get("source_answer_ids")):
            used_answers.add(aid)
            if aid not in answers:
                problems.append(f"{nid}: references missing answer {aid}")
            else:
                links = answer_map[aid].get("links", {})
                linked_nodes = list_value(links.get("spec_decomposition_nodes")) if isinstance(links, dict) else []
                if nid not in linked_nodes:
                    problems.append(f"{nid}: answer {aid} does not link back to this node")
    for aid in answers:
        if aid not in used_answers:
            problems.append(f"{aid}: answer is not used by any decomposition node")
    if decomposition.get("source_interrogation") != interrogation.get("id"):
        problems.append("package: decomposition source_interrogation does not match interrogation id")
    return problems


def main(interrogation_path, decomposition_path):
    try:
        interrogation = read_json(interrogation_path)
        decomposition = read_json(decomposition_path)
    except Exception as exc:
        print(str(exc))
        return 1
    problems = []
    problems.extend(f"decomposition: {problem}" for problem in validate_decomposition_record(decomposition))
    problems.extend(validate_interrogation(interrogation, decomposition))
    problems.extend(validate_cross_links(interrogation, decomposition))
    if problems:
        print("\n".join(problems))
        return 1
    print("Intake package is valid.")
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Usage: validate_intake_package.py interrogation-record.json spec-decomposition-record.json")
    raise SystemExit(main(sys.argv[1], sys.argv[2]))
