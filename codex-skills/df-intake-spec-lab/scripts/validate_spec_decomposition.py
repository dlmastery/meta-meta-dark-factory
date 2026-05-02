#!/usr/bin/env python3
import json
import sys
from pathlib import Path


REQUIRED_SCORE_KEYS = {
    "intent_preserved",
    "coverage",
    "atomic_testable",
    "functional",
    "nfr_security_ops",
    "data_state_interface",
    "edge_abuse_failure",
    "dependencies_sequence",
    "contradictions",
    "owners_acceptance",
    "scenario_holdout_transfer",
    "traceability",
    "assumptions_waivers",
    "brownfield_regression",
    "fresh_reviewer_ready",
}

LEAF_TYPES = {"acceptance_leaf", "leaf", "requirement"}
NON_LEAF_LEVELS = {"L0", "L1", "L2", "L3", "L4"}
LEVEL_ORDER = {"L0": 0, "L1": 1, "L2": 2, "L3": 3, "L4": 4, "L5": 5}


def list_value(value):
    if value is None:
        return []
    if isinstance(value, list):
        return [item for item in value if item not in ("", None)]
    if value in ("", None):
        return []
    return [value]


def node_id(node):
    return node.get("node_id") or node.get("id") or "<missing-node-id>"


def is_leaf(node):
    return node.get("type") in LEAF_TYPES or node.get("level") == "L5"


def score_percent(scores):
    if not isinstance(scores, dict):
        return 0.0
    total = 0
    possible = len(REQUIRED_SCORE_KEYS) * 4
    for key in REQUIRED_SCORE_KEYS:
        score = scores.get(key)
        if not isinstance(score, int) or score < 0 or score > 4:
            return 0.0
        total += score
    return round((total / possible) * 100, 2)


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


def has_waiver(record, node, topic):
    waivers = []
    if isinstance(record.get("waivers"), list):
        waivers.extend(record["waivers"])
    if isinstance(node.get("waivers"), list):
        waivers.extend(node["waivers"])
    for waiver in waivers:
        if waiver_is_complete(waiver, topic):
            return True
    return False


def validate_waivers(record, nodes, problems):
    for scope, waivers in (("record", record.get("waivers", [])),):
        if isinstance(waivers, list):
            for index, waiver in enumerate(waivers, start=1):
                topic = waiver.get("topic") if isinstance(waiver, dict) else None
                if not topic or not waiver_is_complete(waiver, topic):
                    problems.append(f"{scope}: waiver {index} missing topic, owner, reason, revalidation/expiry, or residual risk")
    for node in nodes:
        nid = node_id(node)
        waivers = node.get("waivers", [])
        if isinstance(waivers, list):
            for index, waiver in enumerate(waivers, start=1):
                topic = waiver.get("topic") if isinstance(waiver, dict) else None
                if not topic or not waiver_is_complete(waiver, topic):
                    problems.append(f"{nid}: waiver {index} missing topic, owner, reason, revalidation/expiry, or residual risk")


def validate_parentage(record, nodes, problems):
    ids = {node_id(node) for node in nodes}
    by_id = {node_id(node): node for node in nodes}
    roots = [node for node in nodes if node.get("parent_id") in (None, "")]
    if len(roots) != 1:
        problems.append(f"record: expected exactly one root node, found {len(roots)}")
    elif roots[0].get("level") != "L0":
        problems.append(f"{node_id(roots[0])}: root node must be level L0")
    for node in nodes:
        nid = node_id(node)
        level = node.get("level")
        if level not in LEVEL_ORDER:
            problems.append(f"{nid}: level must be one of L0..L5")
        parent = node.get("parent_id")
        if parent not in (None, "") and parent not in ids:
            problems.append(f"{nid}: parent_id {parent} does not exist")
        if parent not in (None, "") and parent in by_id and nid not in list_value(by_id[parent].get("children")):
            problems.append(f"{nid}: parent {parent} does not list this node as a child")
        for child in list_value(node.get("children")):
            if child not in ids:
                problems.append(f"{nid}: child {child} does not exist")
    for node in nodes:
        nid = node_id(node)
        for child_id in list_value(node.get("children")):
            child = by_id.get(child_id)
            if child and child.get("parent_id") != nid:
                problems.append(f"{nid}: child {child_id} does not point back to parent")
            if child:
                parent_level = LEVEL_ORDER.get(node.get("level"))
                child_level = LEVEL_ORDER.get(child.get("level"))
                if parent_level is not None and child_level is not None and child_level <= parent_level:
                    problems.append(f"{nid}: child {child_id} must be deeper than parent")
                if parent_level is not None and child_level is not None and child_level != parent_level + 1 and not has_waiver(record, child, "level_skip"):
                    problems.append(f"{child_id}: skipped decomposition levels require waiver topic level_skip")
    if roots:
        reachable = set()
        stack = [node_id(roots[0])]
        while stack:
            current = stack.pop()
            if current in reachable:
                continue
            reachable.add(current)
            current_node = by_id.get(current, {})
            stack.extend(list_value(current_node.get("children")))
        for nid in ids - reachable:
            problems.append(f"{nid}: node is not reachable from root")


def validate_scores(record, node, threshold, problems):
    nid = node_id(node)
    scores = node.get("scores")
    if not isinstance(scores, dict):
        problems.append(f"{nid}: missing scores")
        return
    missing = sorted(REQUIRED_SCORE_KEYS - set(scores))
    if missing:
        problems.append(f"{nid}: missing score keys {', '.join(missing)}")
    for key, value in scores.items():
        if key in REQUIRED_SCORE_KEYS and (not isinstance(value, int) or value < 0 or value > 4):
            problems.append(f"{nid}: score {key} must be integer 0..4")
    percent = score_percent(scores)
    if percent < threshold and not has_waiver(record, node, "decomposition_score"):
        problems.append(f"{nid}: score {percent} below threshold {threshold}")


def validate_trace(record, node, problems):
    nid = node_id(node)
    trace = node.get("trace", {})
    if not isinstance(trace, dict):
        problems.append(f"{nid}: trace must be an object")
        return
    for key in ("requirements", "tests", "control_graph_nodes", "work_ledgers", "refinery_gates"):
        if not list_value(trace.get(key)) and not has_waiver(record, node, key):
            problems.append(f"{nid}: missing trace.{key}")


def validate_leaf(record, node, problems):
    nid = node_id(node)
    if node.get("level") != "L5":
        problems.append(f"{nid}: leaf nodes must be level L5")
    for key in ("owner", "priority", "statement"):
        if not node.get(key):
            problems.append(f"{nid}: missing {key}")
    if not list_value(node.get("source_answer_ids")) and not list_value(node.get("assumption_ids")):
        problems.append(f"{nid}: missing source_answer_ids or assumption_ids")
    for key in ("acceptance_criteria", "validation_methods", "evidence_targets"):
        if not list_value(node.get(key)):
            problems.append(f"{nid}: missing {key}")
    for key in ("dependencies", "risks"):
        if key not in node:
            problems.append(f"{nid}: missing {key}; use [] only when explicitly none")
    validate_trace(record, node, problems)


def validate_non_leaf(record, node, problems):
    nid = node_id(node)
    if node.get("type") in LEAF_TYPES:
        problems.append(f"{nid}: non-leaf node cannot use leaf type {node.get('type')}")
    children = list_value(node.get("children"))
    if not children:
        problems.append(f"{nid}: non-leaf node has no children")
    if len(children) == 1 and not has_waiver(record, node, "single_child_branch"):
        problems.append(f"{nid}: one-child branch requires waiver or further decomposition")
    for key in ("owner", "statement", "coverage_rationale"):
        if not node.get(key):
            problems.append(f"{nid}: missing {key}")
    if not list_value(node.get("source_answer_ids")) and not list_value(node.get("assumption_ids")):
        problems.append(f"{nid}: missing source_answer_ids or assumption_ids")
    if "reinterrogation_triggers" not in node:
        problems.append(f"{nid}: missing reinterrogation_triggers")
    validate_trace(record, node, problems)


def validate_record(record):
    problems = []
    if record.get("id") in (None, "", "SDR-000"):
        problems.append("record: missing live id")
    if record.get("status") not in {"accepted", "approved", "conditional_pass", "reviewing"}:
        problems.append("record: status must be reviewing, conditional_pass, accepted, or approved")
    if not record.get("source_interrogation"):
        problems.append("record: missing source_interrogation")
    for key in ("standard_basis", "reviewers", "evidence", "links"):
        if not record.get(key):
            problems.append(f"record: missing {key}")
    if "residual_risks" not in record and "residual_risk" not in record:
        problems.append("record: missing residual risk state")
    threshold = record.get("threshold_percent", 96)
    if not isinstance(threshold, (int, float)) or threshold < 0 or threshold > 100:
        problems.append("record: threshold_percent must be 0..100")
        threshold = 96
    if threshold < 96 and not has_waiver(record, {}, "threshold_lowering"):
        problems.append("record: threshold_percent below 96 requires waiver topic threshold_lowering")
    nodes = record.get("nodes")
    if not isinstance(nodes, list) or not nodes:
        problems.append("record: nodes must be non-empty")
        return problems
    validate_waivers(record, nodes, problems)
    validate_parentage(record, nodes, problems)
    for node in nodes:
        nid = node_id(node)
        if nid == "<missing-node-id>":
            problems.append("node: missing node_id")
        if not node.get("level"):
            problems.append(f"{nid}: missing level")
        validate_scores(record, node, threshold, problems)
        if is_leaf(node):
            validate_leaf(record, node, problems)
        elif node.get("level") in NON_LEAF_LEVELS:
            validate_non_leaf(record, node, problems)
    approval = record.get("approval", {})
    if not isinstance(approval, dict) or not approval.get("approver") or approval.get("decision") not in {"approved", "conditional_pass", "deferred"}:
        problems.append("record: approval requires approver and decision approved|conditional_pass|deferred")
    return problems


def main(path):
    try:
        record = json.loads(Path(path).read_text(encoding="utf-8-sig"))
    except Exception as exc:
        print(str(exc))
        return 1
    problems = validate_record(record)
    if problems:
        print("\n".join(problems))
        return 1
    print("Spec decomposition record is valid.")
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: validate_spec_decomposition.py spec-decomposition-record.json")
    raise SystemExit(main(sys.argv[1]))
