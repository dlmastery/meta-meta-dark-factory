#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path


PLACEHOLDER_IDS = {
    "ATTR-000",
    "CG-000",
    "WL-000",
    "RFG-000",
}

PLACEHOLDER_VALUES = {
    "",
    "pending",
    "proposed",
    "draft",
    "chaotic|forming|stable|splitting|collapsing|blocked",
    "pending | pass | conditional_pass | fail | escalated",
    "pending | pass | conditional_pass | revise | fail | escalated",
}

REQUIRED_GROUPS = ("attractor", "control_graph", "work_ledger", "refinery_gate")
NODE_CONTRACT_KEYS = ("what", "why", "how", "where", "when", "who", "how_good")
ATTRACTOR_LAYER_KEYS = ("product_specific", "factory_reusable", "meta_meta_governance")
ATTRACTOR_EXPERT_KEYS = (
    "system_theorist",
    "requirements_governance_architect",
    "verification_safety_critic",
    "synthesis",
)


def read_files(target):
    path = Path(target)
    if path.is_dir():
        if "templates" in {part.lower() for part in path.parts}:
            raise ValueError("template directories are not valid evidence; pass instantiated records")
        files = [
            p
            for p in path.rglob("*")
            if p.is_file()
            and p.suffix.lower() in {".json", ".yaml", ".yml", ".md"}
            and "templates" not in {part.lower() for part in p.parts}
        ]
    else:
        if "templates" in {part.lower() for part in path.parts}:
            raise ValueError("template files are not valid evidence; pass instantiated records")
        files = [path]
    return [(p, p.read_text(encoding="utf-8-sig")) for p in files]


def parse_json_or_text(path, text):
    if path.suffix.lower() == ".json":
        return json.loads(text)
    return None


def is_empty_list_value(text, key):
    return re.search(rf"(?m)^\s*{re.escape(key)}:\s*\[\]\s*$", text) is not None


def scalar_value(text, key):
    match = re.search(rf"(?m)^\s*{re.escape(key)}:\s*(.*)$", text)
    if not match:
        return None
    return match.group(1).strip().strip('"')


def non_placeholder(value):
    if value is None:
        return False
    if isinstance(value, str):
        return value.strip() not in PLACEHOLDER_VALUES and value.strip() not in PLACEHOLDER_IDS
    if isinstance(value, list):
        return bool(value)
    if isinstance(value, dict):
        return bool(value)
    return True


def top_value(data, text, key):
    if isinstance(data, dict) and key in data:
        return data.get(key)
    return scalar_value(text, key)


def nested_value(data, keys):
    current = data
    for key in keys:
        if not isinstance(current, dict):
            return None
        current = current.get(key)
    return current


def has_nonempty_list(data, text, key):
    if isinstance(data, dict) and key in data:
        return isinstance(data[key], list) and bool(data[key])
    if is_empty_list_value(text, key):
        return False
    return re.search(rf"(?m)^\s*{re.escape(key)}:\s*$", text) is not None


def validate_node_contract(path, label, contract):
    problems = []
    if not isinstance(contract, dict):
        return [f"{path}: {label} missing node_contract"]
    for key in NODE_CONTRACT_KEYS:
        if not non_placeholder(contract.get(key)):
            problems.append(f"{path}: {label} node_contract missing {key}")
    return problems


def validate_attractor_required_outputs(path, data):
    problems = []
    layer_map = data.get("layer_map")
    if not isinstance(layer_map, dict):
        problems.append(f"{path}: attractor record missing layer_map")
    else:
        for key in ATTRACTOR_LAYER_KEYS:
            if not non_placeholder(layer_map.get(key)):
                problems.append(f"{path}: attractor layer_map missing {key}")
    problems.extend(validate_node_contract(path, "attractor", data.get("node_contract")))
    expert_debate = data.get("expert_debate")
    if not isinstance(expert_debate, dict):
        problems.append(f"{path}: attractor record missing expert_debate")
    else:
        for key in ATTRACTOR_EXPERT_KEYS:
            if not non_placeholder(expert_debate.get(key)):
                problems.append(f"{path}: attractor expert_debate missing {key}")
    for key in ("human_decisions", "assumptions", "risks", "anti_overfit_checks", "verdict"):
        if not non_placeholder(data.get(key)):
            problems.append(f"{path}: attractor record missing live {key}")
    return problems


def validate_control_graph_node_governance(path, index, node):
    label = f"control graph node {index}"
    problems = validate_node_contract(path, label, node.get("node_contract"))
    expert_panel = node.get("expert_panel")
    if not isinstance(expert_panel, list) or len([item for item in expert_panel if item]) < 3:
        problems.append(f"{path}: {label} requires at least 3 expert_panel entries")
    if not non_placeholder(node.get("rubrics")):
        problems.append(f"{path}: {label} missing rubrics")
    if not non_placeholder(node.get("feedback_loop")):
        problems.append(f"{path}: {label} missing feedback_loop")
    if not non_placeholder(node.get("gates")):
        problems.append(f"{path}: {label} missing gates")
    return problems


def classify_record(path, text, data):
    name = path.name.lower()
    if "meta-attractor" in name or "attractor" in name:
        return "attractor"
    if "control-graph" in name or "control_graph" in name:
        return "control_graph"
    if "work-ledger" in name or "work_ledger" in name:
        return "work_ledger"
    if "refinery-gate" in name or "refinery_gate" in name:
        return "refinery_gate"

    if isinstance(data, dict):
        record_id = str(data.get("record_id") or data.get("id") or "")
        if record_id.startswith("ATTR-"):
            return "attractor"
        if record_id.startswith("CG-"):
            return "control_graph"
        if record_id.startswith("WL-"):
            return "work_ledger"
        if record_id.startswith("RFG-"):
            return "refinery_gate"
        if {"nodes", "edges"}.issubset(data.keys()):
            return "control_graph"
        if {"evidence_required", "next_action"}.issubset(data.keys()):
            return "work_ledger"
        if {"required_checks", "verdict_rationale"}.issubset(data.keys()):
            return "refinery_gate"
        if {"selected_skills", "evidence_commitments"}.issubset(data.keys()):
            return "attractor"

    first_id = scalar_value(text, "record_id") or scalar_value(text, "id") or ""
    if first_id.startswith("ATTR-"):
        return "attractor"
    if first_id.startswith("CG-"):
        return "control_graph"
    if first_id.startswith("WL-"):
        return "work_ledger"
    if first_id.startswith("RFG-"):
        return "refinery_gate"
    return None


def validate_attractor(path, text, data):
    problems = []
    if data is None:
        problems.append(f"{path}: attractor record must be JSON")
        return problems
    record_id = data.get("record_id")
    if not non_placeholder(record_id):
        problems.append(f"{path}: attractor record has placeholder or missing record_id")
    for key in ("created_on", "source_signals", "goal", "selected_mode", "selected_skills", "gates", "evidence_commitments", "next_safe_action"):
        if not non_placeholder(data.get(key)):
            problems.append(f"{path}: attractor record missing live {key}")
    if data.get("attractor_state") not in {"stable", "forming"}:
        problems.append(f"{path}: attractor_state must be stable or forming for execution")
    problems.extend(validate_attractor_required_outputs(path, data))
    return problems


def validate_control_graph(path, text):
    problems = []
    if scalar_value(text, "id") in PLACEHOLDER_IDS:
        problems.append(f"{path}: control graph has placeholder id")
    for key in ("name", "goal"):
        if not non_placeholder(scalar_value(text, key)):
            problems.append(f"{path}: control graph missing {key}")
    if "owner: \"\"" in text or "owner:" not in text:
        problems.append(f"{path}: control graph node owner is blank or missing")
    if "evidence_outputs: []" in text:
        problems.append(f"{path}: control graph node has empty evidence_outputs")
    if is_empty_list_value(text, "risks"):
        problems.append(f"{path}: control graph risks are empty")
    for key in ("node_contract", "expert_panel", "rubrics", "feedback_loop"):
        if f"{key}:" not in text:
            problems.append(f"{path}: control graph text record missing {key}")
    return problems


def validate_control_graph_json(path, data):
    problems = []
    if data.get("id") in PLACEHOLDER_IDS:
        problems.append(f"{path}: control graph has placeholder id")
    for key in ("name", "goal"):
        if not non_placeholder(data.get(key)):
            problems.append(f"{path}: control graph missing {key}")
    nodes = data.get("nodes")
    if not isinstance(nodes, list) or not nodes:
        problems.append(f"{path}: control graph nodes are empty")
    else:
        for index, node in enumerate(nodes, start=1):
            if not isinstance(node, dict):
                problems.append(f"{path}: control graph node {index} is not an object")
                continue
            if not non_placeholder(node.get("owner")):
                problems.append(f"{path}: control graph node {index} owner is blank or missing")
            if not non_placeholder(node.get("evidence_outputs") or node.get("evidence")):
                problems.append(f"{path}: control graph node {index} evidence outputs are empty")
            problems.extend(validate_control_graph_node_governance(path, index, node))
    edges = data.get("edges")
    if not isinstance(edges, list) or not edges:
        problems.append(f"{path}: control graph edges are empty")
    if not non_placeholder(data.get("risks")):
        problems.append(f"{path}: control graph risks are empty")
    return problems


def validate_work_ledger(path, text):
    problems = []
    if scalar_value(text, "id") in PLACEHOLDER_IDS:
        problems.append(f"{path}: work ledger has placeholder id")
    for key in ("title", "current_state", "next_action", "revalidation_trigger"):
        if not non_placeholder(scalar_value(text, key)):
            problems.append(f"{path}: work ledger missing {key}")
    for key in ("acceptance_criteria", "evidence_required", "evidence_provided"):
        if is_empty_list_value(text, key):
            problems.append(f"{path}: work ledger has empty {key}")
    if "accountable: \"\"" in text or "responsible: \"\"" in text:
        problems.append(f"{path}: work ledger owner fields are blank")
    return problems


def validate_work_ledger_json(path, data):
    problems = []
    if data.get("id") in PLACEHOLDER_IDS:
        problems.append(f"{path}: work ledger has placeholder id")
    for key in ("title", "current_state", "next_action", "revalidation_trigger"):
        if not non_placeholder(data.get(key)):
            problems.append(f"{path}: work ledger missing {key}")
    owner = data.get("owner")
    if isinstance(owner, dict):
        if not non_placeholder(owner.get("accountable")) or not non_placeholder(owner.get("responsible")):
            problems.append(f"{path}: work ledger owner fields are blank")
    elif not non_placeholder(owner):
        problems.append(f"{path}: work ledger owner fields are blank")
    for key in ("acceptance_criteria", "evidence_required", "evidence_provided"):
        if not non_placeholder(data.get(key)):
            problems.append(f"{path}: work ledger has empty {key}")
    return problems


def validate_refinery_gate(path, text):
    problems = []
    if scalar_value(text, "id") in PLACEHOLDER_IDS:
        problems.append(f"{path}: refinery gate has placeholder id")
    status = scalar_value(text, "status")
    if status is None or "|" in status or status == "pending":
        problems.append(f"{path}: refinery gate status is not a live verdict")
    for key in ("verdict_rationale", "next_action"):
        if not non_placeholder(scalar_value(text, key)):
            problems.append(f"{path}: refinery gate missing {key}")
    for key in ("test_reports", "rubric_scorecards", "trace_reports", "certificates"):
        if is_empty_list_value(text, key):
            problems.append(f"{path}: refinery gate has empty {key}")
    return problems


def validate_refinery_gate_json(path, data):
    problems = []
    if data.get("id") in PLACEHOLDER_IDS:
        problems.append(f"{path}: refinery gate has placeholder id")
    status = data.get("status")
    if status is None or (isinstance(status, str) and ("|" in status or status == "pending")):
        problems.append(f"{path}: refinery gate status is not a live verdict")
    if not non_placeholder(data.get("verdict_rationale")):
        problems.append(f"{path}: refinery gate missing verdict_rationale")
    if not non_placeholder(data.get("next_action")):
        problems.append(f"{path}: refinery gate missing next_action")
    evidence = data.get("evidence", {})
    if not isinstance(evidence, dict):
        problems.append(f"{path}: refinery gate evidence must be an object")
        return problems
    for key in ("test_reports", "rubric_scorecards", "trace_reports", "certificates"):
        if not non_placeholder(evidence.get(key)):
            problems.append(f"{path}: refinery gate has empty {key}")
    return problems


def record_identifier(data):
    if not isinstance(data, dict):
        return None
    return data.get("record_id") or data.get("id")


def validate_cross_record_links(grouped):
    problems = []
    records = []
    for group, group_files in grouped.items():
        for path, text, data in group_files:
            identifier = record_identifier(data)
            if identifier:
                records.append((group, path, str(identifier), text))
    for group, path, identifier, _text in records:
        other_text = "\n".join(text for _group, other_path, _identifier, text in records if other_path != path)
        if identifier not in other_text:
            problems.append(f"{path}: {group} record id {identifier} is not referenced by another merged control-plane record")
    return problems


def main(target):
    try:
        files = read_files(target)
    except Exception as exc:
        print(str(exc))
        return 1

    grouped = {name: [] for name in REQUIRED_GROUPS}
    for path, text in files:
        data = parse_json_or_text(path, text)
        group = classify_record(path, text, data)
        if group:
            grouped[group].append((path, text, data))

    problems = []
    for group, group_files in grouped.items():
        if not group_files:
            problems.append(f"missing {group} record")

    for path, text, data in grouped["attractor"]:
        problems.extend(validate_attractor(path, text, data))
    for path, text, data in grouped["control_graph"]:
        if isinstance(data, dict):
            problems.extend(validate_control_graph_json(path, data))
        else:
            problems.extend(validate_control_graph(path, text))
    for path, text, data in grouped["work_ledger"]:
        if isinstance(data, dict):
            problems.extend(validate_work_ledger_json(path, data))
        else:
            problems.extend(validate_work_ledger(path, text))
    for path, text, data in grouped["refinery_gate"]:
        if isinstance(data, dict):
            problems.extend(validate_refinery_gate_json(path, data))
        else:
            problems.extend(validate_refinery_gate(path, text))

    problems.extend(validate_cross_record_links(grouped))

    if problems:
        print("\n".join(problems))
        return 1
    print("Merged control-plane records are instantiated and valid.")
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: validate_merged_records.py <record-file-or-directory>")
    raise SystemExit(main(sys.argv[1]))
