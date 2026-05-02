#!/usr/bin/env python3
import json
import sys
from pathlib import Path


MIN_READY_SCORE = 96

PLACEHOLDER_VALUES = {
    "",
    "pending",
    "draft",
    "REL-HND-001",
    "OPS-DRILL-000",
}

APPROVED_DECISIONS = {"approved", "accepted", "pass", "signed_off"}
LIVE_DRILL_STATUSES = {"accepted", "approved", "pass", "complete", "conditional_pass"}
EVIDENCE_FILE_SUFFIXES = {".md", ".json", ".yaml", ".yml", ".py", ".ps1", ".txt", ".csv", ".xlsx", ".docx", ".pptx"}

PRODUCTION_LIST_FIELDS = (
    "deploy_steps",
    "post_deploy_checks",
    "rollback_steps",
    "dashboards",
    "alerts",
    "known_risks",
    "incident_path",
    "support_path",
    "maintenance_notes",
    "training_needed",
    "outage_drill_records",
    "runbook_replay_evidence",
    "operator_signoffs",
)

OUTAGE_LIST_FIELDS = (
    "participants",
    "signals_presented",
    "diagnosis_steps_taken",
    "mitigation_or_rollback_steps",
    "communications",
    "evidence",
)


def list_value(value):
    if value is None:
        return []
    if isinstance(value, list):
        return [item for item in value if item not in ("", None)]
    if value in ("", None):
        return []
    return [value]


def live_string(value):
    return isinstance(value, str) and value.strip() not in PLACEHOLDER_VALUES


def numeric_score(value):
    return isinstance(value, (int, float)) and not isinstance(value, bool) and 0 <= value <= 100


def record_id(item):
    if isinstance(item, dict):
        return str(item.get("id") or item.get("record_id") or "")
    return str(item)


def has_prefix_reference(values, prefix):
    return any(record_id(value).startswith(prefix) for value in list_value(values))


def text_value(value):
    if isinstance(value, str):
        return value
    return json.dumps(value, sort_keys=True)


def production_outage_references(record):
    return [record_id(item) for item in list_value(record.get("outage_drill_records"))]


def production_signoff_values(record, key):
    values = set()
    for signoff in list_value(record.get("operator_signoffs")):
        if isinstance(signoff, dict) and signoff.get(key):
            values.add(str(signoff.get(key)))
    return values


def validate_operator_signoffs(signoffs, problems, label):
    signoff_items = list_value(signoffs)
    if not signoff_items:
        problems.append(f"{label}: missing operator signoff")
        return
    complete_signoff_found = False
    for index, signoff in enumerate(signoff_items, start=1):
        if not isinstance(signoff, dict):
            problems.append(f"{label}: operator_signoffs item {index} must be an object")
            continue
        decision = signoff.get("decision")
        has_person = signoff.get("operator") or signoff.get("approver")
        if has_person and decision in APPROVED_DECISIONS and signoff.get("at"):
            complete_signoff_found = True
    if not complete_signoff_found:
        problems.append(f"{label}: requires at least one approved operator signoff with person and timestamp")


def validate_single_operator_signoff(signoff, problems, label):
    if not isinstance(signoff, dict):
        problems.append(f"{label}: operator_signoff must be an object")
        return
    if signoff.get("required") is not True:
        problems.append(f"{label}: operator_signoff.required must be true")
    if not signoff.get("approver"):
        problems.append(f"{label}: operator_signoff missing approver")
    if signoff.get("decision") not in APPROVED_DECISIONS:
        problems.append(f"{label}: operator_signoff decision must be approved, accepted, pass, or signed_off")
    if not signoff.get("at"):
        problems.append(f"{label}: operator_signoff missing timestamp")


def validate_production_handoff(record):
    problems = []
    rid = record.get("id", "")
    label = rid or "production handoff"
    if rid == "REL-HND-001" or not str(rid).startswith("REL-HND-"):
        problems.append(f"{label}: id must be a live REL-HND-* value")
    for key in ("release", "owner", "refinery_gate"):
        if not live_string(record.get(key)):
            problems.append(f"{label}: missing live {key}")
    if not str(record.get("refinery_gate", "")).startswith("RFG-"):
        problems.append(f"{label}: refinery_gate must reference RFG-*")
    for key in PRODUCTION_LIST_FIELDS:
        if not list_value(record.get(key)):
            problems.append(f"{label}: {key} must be non-empty")
    if not has_prefix_reference(record.get("outage_drill_records"), "OPS-DRILL-"):
        problems.append(f"{label}: outage_drill_records must reference OPS-DRILL-*")
    validate_operator_signoffs(record.get("operator_signoffs"), problems, label)
    readiness = record.get("readiness_score")
    if not numeric_score(readiness):
        problems.append(f"{label}: readiness_score must be 0..100")
    elif readiness < MIN_READY_SCORE:
        problems.append(f"{label}: readiness_score {readiness} below {MIN_READY_SCORE}")
    return problems


def validate_outage_drill(record):
    problems = []
    rid = record.get("id", "")
    label = rid or "outage drill"
    if rid == "OPS-DRILL-000" or not str(rid).startswith("OPS-DRILL-"):
        problems.append(f"{label}: id must be a live OPS-DRILL-* value")
    if record.get("status") not in LIVE_DRILL_STATUSES:
        problems.append(f"{label}: status must be accepted, approved, pass, complete, or conditional_pass")
    for key in ("scenario", "system_or_release", "operator", "runbook_used", "time_to_detect", "time_to_mitigate", "refinery_gate"):
        if not live_string(record.get(key)):
            problems.append(f"{label}: missing live {key}")
    if not str(record.get("control_graph_node", "")).startswith(("NODE-", "CG-")):
        problems.append(f"{label}: control_graph_node must reference NODE-* or CG-*")
    if not str(record.get("work_ledger_item", "")).startswith("WL-"):
        problems.append(f"{label}: work_ledger_item must reference WL-*")
    if not str(record.get("refinery_gate", "")).startswith("RFG-"):
        problems.append(f"{label}: refinery_gate must reference RFG-*")
    for key in OUTAGE_LIST_FIELDS:
        if not list_value(record.get(key)):
            problems.append(f"{label}: {key} must be non-empty")
    gaps = list_value(record.get("gaps_found"))
    if gaps and not list_value(record.get("follow_up_work_items")):
        problems.append(f"{label}: gaps_found require follow_up_work_items")
    score = record.get("operator_readiness_score")
    if not numeric_score(score):
        problems.append(f"{label}: operator_readiness_score must be 0..100")
    elif score < MIN_READY_SCORE:
        problems.append(f"{label}: operator_readiness_score {score} below {MIN_READY_SCORE}")
    validate_single_operator_signoff(record.get("operator_signoff"), problems, label)
    return problems


def validate_record(record):
    if not isinstance(record, dict):
        return ["record must be a JSON object"]
    rid = str(record.get("id") or "")
    if rid.startswith("REL-HND-") or "deploy_steps" in record:
        return validate_production_handoff(record)
    if rid.startswith("OPS-DRILL-") or "diagnosis_steps_taken" in record:
        return validate_outage_drill(record)
    return ["record id must identify a production handoff REL-HND-* or outage drill OPS-DRILL-*"]


def read_record_file(path):
    target = Path(path)
    if "templates" in {part.lower() for part in target.parts}:
        raise ValueError("template files are not valid handoff evidence; pass instantiated records")
    return json.loads(target.read_text(encoding="utf-8-sig"))


def load_bundle_record(path, label, problems):
    if not path:
        problems.append(f"{label}: missing bundle record")
        return None
    try:
        record = read_record_file(path)
    except Exception as exc:
        problems.append(f"{label}: could not be read: {exc}")
        return None
    if not isinstance(record, dict):
        problems.append(f"{label}: must be a JSON object")
        return None
    return record


def control_graph_node_ids(control_graph):
    return {str(node.get("id")) for node in control_graph.get("nodes", []) if isinstance(node, dict) and node.get("id")}


def evidence_contains(record, needle):
    return needle in json.dumps(record, sort_keys=True)


def evidence_item_is_file_like(item):
    if not isinstance(item, str):
        return False
    return Path(item.strip()).suffix.lower() in EVIDENCE_FILE_SUFFIXES


def evidence_item_basename(item):
    return Path(item.strip().replace("\\", "/")).name


def read_evidence_files(paths, label, problems):
    if not paths:
        problems.append(f"{label}: production handoff requires --evidence-file bundle evidence")
        return []
    files = []
    for path in paths:
        target = Path(path)
        if "templates" in {part.lower() for part in target.parts}:
            problems.append(f"{label}: evidence file {path} is a template, not instantiated evidence")
            continue
        try:
            text = target.read_text(encoding="utf-8-sig")
        except Exception as exc:
            problems.append(f"{label}: evidence file {path} could not be read: {exc}")
            continue
        files.append((target, text))
    return files


def validate_physical_evidence_bundle(production, drills, work_ledger, evidence_file_paths):
    problems = []
    production_id = production.get("id", "production handoff")
    evidence_files = read_evidence_files(evidence_file_paths, production_id, problems)
    if problems:
        return problems
    basenames = {path.name for path, _text in evidence_files}
    bundle_text = "\n".join([path.name for path, _text in evidence_files] + [text for _path, text in evidence_files])

    for item in list_value(work_ledger.get("evidence_provided")):
        if evidence_item_is_file_like(item):
            basename = evidence_item_basename(item)
            if basename not in basenames:
                problems.append(f"{production_id}: ledger evidence file {basename} was not provided with --evidence-file")

    if str(production_id) not in bundle_text:
        problems.append(f"{production_id}: evidence-file bundle must mention production handoff id")
    for drill in drills:
        drill_id = str(drill.get("id") or "")
        if drill_id and drill_id not in bundle_text:
            problems.append(f"{production_id}: evidence-file bundle must mention outage drill {drill_id}")
    for replay in list_value(production.get("runbook_replay_evidence")):
        replay_id = str(replay).split(":", 1)[0].strip()
        if replay_id and replay_id not in bundle_text:
            problems.append(f"{production_id}: evidence-file bundle must mention runbook replay {replay_id}")
    return problems


def validate_control_plane_bundle(production, drills, control_graph_path, work_ledger_path, refinery_gate_path, evidence_file_paths):
    problems = []
    production_id = production.get("id", "production handoff")
    if not control_graph_path:
        problems.append(f"{production_id}: production handoff requires --control-graph bundle evidence")
    if not work_ledger_path:
        problems.append(f"{production_id}: production handoff requires --work-ledger bundle evidence")
    if not refinery_gate_path:
        problems.append(f"{production_id}: production handoff requires --refinery-gate bundle evidence")
    if problems:
        return problems

    control_graph = load_bundle_record(control_graph_path, f"{production_id}: control graph", problems)
    work_ledger = load_bundle_record(work_ledger_path, f"{production_id}: work ledger", problems)
    refinery_gate = load_bundle_record(refinery_gate_path, f"{production_id}: refinery gate", problems)
    if problems:
        return problems

    control_graph_id = str(control_graph.get("id") or "")
    work_ledger_id = str(work_ledger.get("id") or "")
    refinery_gate_id = str(refinery_gate.get("id") or "")
    if not control_graph_id.startswith("CG-"):
        problems.append(f"{production_id}: control graph bundle must have CG-* id")
    if not work_ledger_id.startswith("WL-"):
        problems.append(f"{production_id}: work ledger bundle must have WL-* id")
    if not refinery_gate_id.startswith("RFG-"):
        problems.append(f"{production_id}: refinery gate bundle must have RFG-* id")
    if work_ledger.get("current_state") not in {"accepted", "pass", "complete"}:
        problems.append(f"{production_id}: work ledger current_state must be accepted, pass, or complete")
    if refinery_gate.get("status") != "pass":
        problems.append(f"{production_id}: refinery gate status must be pass")
    links = control_graph.get("links", {})
    if isinstance(links, dict):
        if links.get("work_ledger") != work_ledger_id:
            problems.append(f"{production_id}: control graph links.work_ledger does not match work ledger bundle")
        if links.get("refinery_gate") != refinery_gate_id:
            problems.append(f"{production_id}: control graph links.refinery_gate does not match refinery gate bundle")
    else:
        problems.append(f"{production_id}: control graph links must be an object")
    if production.get("refinery_gate") != refinery_gate_id:
        problems.append(f"{production_id}: production refinery_gate does not match refinery gate bundle")

    node_ids = control_graph_node_ids(control_graph)
    if not node_ids:
        problems.append(f"{production_id}: control graph bundle has no nodes")
    for drill in drills:
        drill_id = str(drill.get("id") or "")
        node_ref = str(drill.get("control_graph_node") or "")
        if node_ref.startswith("NODE-") and node_ref not in node_ids:
            problems.append(f"{production_id}: outage drill {drill_id} control_graph_node not found in control graph bundle")
        if node_ref.startswith("CG-") and node_ref != control_graph_id:
            problems.append(f"{production_id}: outage drill {drill_id} control_graph_node does not match control graph bundle")
        if drill.get("work_ledger_item") != work_ledger_id:
            problems.append(f"{production_id}: outage drill {drill_id} work_ledger_item does not match work ledger bundle")
        if drill.get("refinery_gate") != refinery_gate_id:
            problems.append(f"{production_id}: outage drill {drill_id} refinery_gate does not match refinery gate bundle")
        if not evidence_contains(work_ledger, drill_id):
            problems.append(f"{production_id}: work ledger bundle must mention outage drill {drill_id}")
    if not evidence_contains(work_ledger, production_id):
        problems.append(f"{production_id}: work ledger bundle must mention production handoff id")
    problems.extend(validate_physical_evidence_bundle(production, drills, work_ledger, evidence_file_paths))
    return problems


def validate_outage_bundle(production, outage_drill_paths, control_graph_path, work_ledger_path, refinery_gate_path, evidence_file_paths):
    problems = []
    production_id = production.get("id", "production handoff")
    references = production_outage_references(production)
    reference_set = set(references)
    if len(reference_set) != len(references):
        problems.append(f"{production_id}: outage_drill_records must be unique")
    if not outage_drill_paths:
        problems.append(f"{production_id}: production handoff requires --outage-drill bundle evidence")
        return problems

    drills = []
    for path in outage_drill_paths:
        try:
            drill = read_record_file(path)
        except Exception as exc:
            problems.append(f"{production_id}: outage drill {path} could not be read: {exc}")
            continue
        drill_problems = validate_outage_drill(drill)
        problems.extend(f"{path}: {problem}" for problem in drill_problems)
        drills.append(drill)

    provided_ids = {str(drill.get("id") or "") for drill in drills}
    for missing in sorted(reference_set - provided_ids):
        problems.append(f"{production_id}: referenced outage drill {missing} was not provided")
    for unexpected in sorted(provided_ids - reference_set):
        problems.append(f"{production_id}: provided outage drill {unexpected} is not referenced by production handoff")

    replay_items = list_value(production.get("runbook_replay_evidence"))
    production_operators = production_signoff_values(production, "operator")
    production_approvers = production_signoff_values(production, "approver")
    production_owner = str(production.get("owner") or "")
    for drill in drills:
        drill_id = str(drill.get("id") or "")
        if drill_id not in reference_set:
            continue
        if drill.get("system_or_release") != production.get("release"):
            problems.append(f"{production_id}: outage drill {drill_id} system_or_release does not match release")
        if drill.get("refinery_gate") != production.get("refinery_gate"):
            problems.append(f"{production_id}: outage drill {drill_id} refinery_gate does not match production handoff")
        if production_operators and drill.get("operator") not in production_operators:
            problems.append(f"{production_id}: outage drill {drill_id} operator is not signed off in production handoff")
        drill_approver = drill.get("operator_signoff", {}).get("approver") if isinstance(drill.get("operator_signoff"), dict) else None
        if drill_approver not in production_approvers and drill_approver != production_owner:
            problems.append(f"{production_id}: outage drill {drill_id} approver is not production owner or production handoff approver")
        if not any(drill_id in text_value(item) for item in replay_items):
            problems.append(f"{production_id}: runbook_replay_evidence must reference outage drill {drill_id}")
    problems.extend(validate_control_plane_bundle(production, drills, control_graph_path, work_ledger_path, refinery_gate_path, evidence_file_paths))
    return problems


def validate_bundle(record, outage_drill_paths, control_graph_path, work_ledger_path, refinery_gate_path, evidence_file_paths):
    rid = str(record.get("id") or "")
    if rid.startswith("REL-HND-") or "deploy_steps" in record:
        return validate_outage_bundle(record, outage_drill_paths, control_graph_path, work_ledger_path, refinery_gate_path, evidence_file_paths)
    return []


def parse_args(args):
    usage = (
        "Usage: validate_production_handoff.py production-handoff-or-outage-drill.json "
        "[--outage-drill outage-drill.json ...] [--control-graph control-graph.json] "
        "[--work-ledger work-ledger.json] [--refinery-gate refinery-gate.json] "
        "[--evidence-file artifact-or-report ...]"
    )
    if not args:
        raise ValueError(usage)
    path = args[0]
    outage_drill_paths = []
    control_graph_path = None
    work_ledger_path = None
    refinery_gate_path = None
    evidence_file_paths = []
    index = 1
    while index < len(args):
        arg = args[index]
        if arg == "--outage-drill":
            if index + 1 >= len(args):
                raise ValueError("--outage-drill requires a path")
            outage_drill_paths.append(args[index + 1])
            index += 2
        elif arg == "--control-graph":
            if index + 1 >= len(args):
                raise ValueError("--control-graph requires a path")
            control_graph_path = args[index + 1]
            index += 2
        elif arg == "--work-ledger":
            if index + 1 >= len(args):
                raise ValueError("--work-ledger requires a path")
            work_ledger_path = args[index + 1]
            index += 2
        elif arg == "--refinery-gate":
            if index + 1 >= len(args):
                raise ValueError("--refinery-gate requires a path")
            refinery_gate_path = args[index + 1]
            index += 2
        elif arg == "--evidence-file":
            if index + 1 >= len(args):
                raise ValueError("--evidence-file requires a path")
            evidence_file_paths.append(args[index + 1])
            index += 2
        else:
            raise ValueError(f"unknown argument {arg}")
    return path, outage_drill_paths, control_graph_path, work_ledger_path, refinery_gate_path, evidence_file_paths


def main(path, outage_drill_paths=None, control_graph_path=None, work_ledger_path=None, refinery_gate_path=None, evidence_file_paths=None):
    try:
        record = read_record_file(path)
    except Exception as exc:
        print(str(exc))
        return 1
    outage_drill_paths = outage_drill_paths or []
    evidence_file_paths = evidence_file_paths or []
    problems = validate_record(record)
    problems.extend(validate_bundle(record, outage_drill_paths, control_graph_path, work_ledger_path, refinery_gate_path, evidence_file_paths))
    if problems:
        print("\n".join(problems))
        return 1
    print("Production/SRE handoff evidence is valid.")
    return 0


if __name__ == "__main__":
    try:
        record_path, outage_paths, control_path, ledger_path, gate_path, evidence_paths = parse_args(sys.argv[1:])
    except ValueError as exc:
        raise SystemExit(str(exc))
    raise SystemExit(main(record_path, outage_paths, control_path, ledger_path, gate_path, evidence_paths))
