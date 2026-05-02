#!/usr/bin/env python3
import json
import sys
from pathlib import Path


LINK_CLASSES = {
    "derives_from",
    "satisfies",
    "implements",
    "verifies",
    "verified_by",
    "mitigates",
    "decides",
    "supersedes",
    "depends_on",
    "blocks",
    "accepted_by",
    "raises",
    "routes_to",
    "tracked_by",
    "gated_by",
    "refines",
    "owns",
    "reviewed_by",
    "answers",
    "revalidated_by",
}

GROUP_LINK_FIELDS = {
    "requirements",
    "artifacts",
    "decisions",
    "tests",
    "risks",
    "evidence",
    "handoffs",
    "control_graph_nodes",
    "work_ledgers",
    "refinery_gates",
    "attractor_records",
    "spec_decomposition_nodes",
    "interrogation_answers",
}

ALLOWED_LINK_FIELDS = LINK_CLASSES | GROUP_LINK_FIELDS
MATERIAL_PREFIXES = ("REQ-", "ART-", "ADR-", "SDR-", "MBR-", "OPS-DRILL-", "EVD-DEBATE-", "HND-")
CONTROL_PREFIXES = ("CG-", "WL-", "RFG-", "ATTR-")
EVIDENCE_FILE_SUFFIXES = {".md", ".json", ".yaml", ".yml", ".py", ".ps1", ".txt", ".csv", ".xlsx", ".docx", ".pptx"}


def as_list(data):
    return data if isinstance(data, list) else [data]


def read_records(path):
    data = json.loads(Path(path).read_text(encoding="utf-8-sig"))
    records = as_list(data)
    if not all(isinstance(record, dict) for record in records):
        raise ValueError("Trace file must contain a JSON object or array of objects.")
    return records


def get_id(record):
    return record.get("id") or record.get("record_id") or "<unknown>"


def get_links(record):
    merged = {}
    for section in ("links", "trace"):
        value = record.get(section, {})
        if isinstance(value, dict):
            merged.update(value)
    return merged


def list_value(value):
    if value is None:
        return []
    if isinstance(value, list):
        return [item for item in value if item not in ("", None)]
    if value in ("", None):
        return []
    return [value]


def evidence_item_is_file_like(item):
    if not isinstance(item, str):
        return False
    return Path(item.strip()).suffix.lower() in EVIDENCE_FILE_SUFFIXES


def evidence_item_basename(item):
    return Path(item.strip().replace("\\", "/")).name


def has_any(links, names):
    return any(list_value(links.get(name)) for name in names)


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
    for waiver in waivers:
        if waiver_is_complete(waiver, topic):
            return True
    return False


def validate_waivers(record, problems):
    rid = get_id(record)
    waivers = record.get("waivers", [])
    if not isinstance(waivers, list):
        return
    for index, waiver in enumerate(waivers, start=1):
        topic = waiver.get("topic") if isinstance(waiver, dict) else None
        if not topic or not waiver_is_complete(waiver, topic):
            problems.append(f"{rid}: waiver {index} missing topic, owner, reason, revalidation/expiry, or residual risk")


def is_material(record):
    rid = get_id(record)
    return bool(record.get("governed") or record.get("material") or rid.startswith(MATERIAL_PREFIXES))


def require_value(record, key, problems):
    rid = get_id(record)
    if not record.get(key):
        problems.append(f"{rid}: missing {key}")


def require_governed_links(record, links, problems):
    rid = get_id(record)
    if not is_material(record):
        return
    if not has_any(links, ("routes_to", "control_graph_nodes")) and not has_waiver(record, "control_graph"):
        problems.append(f"{rid}: governed/material record missing control graph link")
    if not has_any(links, ("tracked_by", "work_ledgers")) and not has_waiver(record, "work_ledger"):
        problems.append(f"{rid}: governed/material record missing work-ledger link")
    if not has_any(links, ("gated_by", "refinery_gates")) and not has_waiver(record, "refinery_gate"):
        problems.append(f"{rid}: governed/material record missing refinery gate link")


def validate_requirement(record, links, problems):
    rid = get_id(record)
    for key in ("source", "statement", "owner", "status"):
        require_value(record, key, problems)
    if not has_any(links, ("verifies", "verified_by")):
        problems.append(f"{rid}: missing verification link")
    if record.get("from_interrogation") and not has_any(links, ("answers",)):
        problems.append(f"{rid}: missing interrogation answer link")


def validate_artifact(record, links, problems):
    rid = get_id(record)
    if not record.get("standard_basis"):
        problems.append(f"{rid}: missing standard_basis")
    if not record.get("reviewers"):
        problems.append(f"{rid}: missing reviewers")
    if not record.get("evidence"):
        problems.append(f"{rid}: missing evidence")
    if "residual_risk" not in record and "residual_risks" not in record:
        problems.append(f"{rid}: missing residual risk state")
    if not any(list_value(value) for value in links.values()):
        problems.append(f"{rid}: missing trace links")


def validate_work_ledger(record, links, problems):
    rid = get_id(record)
    for key in ("status", "next_action"):
        require_value(record, key, problems)
    if not has_any(links, ("requirements", "artifacts", "decisions", "tests", "evidence", "control_graph_nodes")):
        problems.append(f"{rid}: missing work-ledger trace target")
    if not has_any(links, ("control_graph_nodes", "routes_to")):
        problems.append(f"{rid}: missing control graph node link")
    if not has_any(links, ("gated_by", "refinery_gates")):
        problems.append(f"{rid}: missing refinery gate link")


def validate_control_graph(record, problems):
    rid = get_id(record)
    nodes = record.get("nodes")
    if not isinstance(nodes, list) or not nodes:
        problems.append(f"{rid}: missing control graph nodes")
    edges = record.get("edges")
    if not isinstance(edges, list) or not edges:
        problems.append(f"{rid}: missing control graph edges")


def validate_refinery_gate(record, problems):
    rid = get_id(record)
    if not record.get("status"):
        problems.append(f"{rid}: missing refinery status")
    evidence = record.get("evidence")
    if not isinstance(evidence, dict) or not evidence:
        problems.append(f"{rid}: missing refinery evidence")
        return
    if record.get("status") == "pass":
        for key in ("test_reports", "rubric_scorecards", "trace_reports"):
            if not list_value(evidence.get(key)):
                problems.append(f"{rid}: pass gate missing evidence.{key}")


def validate_specific_record(record, links, problems):
    rid = get_id(record)
    if rid.startswith("REQ-"):
        validate_requirement(record, links, problems)
    elif rid.startswith(("ART-", "SDR-", "MBR-", "OPS-DRILL-", "EVD-DEBATE-", "HND-")):
        validate_artifact(record, links, problems)
    elif rid.startswith("WL-"):
        validate_work_ledger(record, links, problems)
    elif rid.startswith("CG-"):
        validate_control_graph(record, problems)
    elif rid.startswith("RFG-"):
        validate_refinery_gate(record, problems)
    elif rid.startswith("ATTR-"):
        require_value(record, "goal", problems)
    elif rid == "<unknown>":
        problems.append("<unknown>: missing id or record_id")
    elif record.get("type") != "evidence":
        validate_artifact(record, links, problems)


def referenced_ids(links):
    refs = []
    for value in links.values():
        for item in list_value(value):
            if isinstance(item, str) and "-" in item:
                refs.append(item)
    return refs


def validate_record_set(records, strict_references=False, strict_bidirectional=False):
    ids = {get_id(record) for record in records}
    outbound = {}
    inbound = {rid: set() for rid in ids}
    problems = []

    for record in records:
        rid = get_id(record)
        links = get_links(record)
        validate_waivers(record, problems)
        for key in links:
            if key not in ALLOWED_LINK_FIELDS:
                problems.append(f"{rid}: unknown link field {key}")
        validate_specific_record(record, links, problems)
        require_governed_links(record, links, problems)
        outbound[rid] = set(referenced_ids(links))
        for target in outbound[rid]:
            if target in inbound:
                inbound[target].add(rid)
            elif strict_references:
                problems.append(f"{rid}: references missing record {target}")

    if strict_bidirectional:
        for record in records:
            rid = get_id(record)
            if rid.startswith(CONTROL_PREFIXES):
                continue
            if is_material(record) and not outbound.get(rid) and not has_waiver(record, "outbound_trace"):
                problems.append(f"{rid}: missing outbound trace")
            if is_material(record) and not inbound.get(rid) and not has_waiver(record, "inbound_trace"):
                problems.append(f"{rid}: missing inbound trace")

    return problems


def collect_file_like_evidence(record):
    obligations = []
    rid = get_id(record)

    def visit(value):
        if isinstance(value, dict):
            for child in value.values():
                visit(child)
        elif isinstance(value, list):
            for child in value:
                visit(child)
        elif evidence_item_is_file_like(value):
            obligations.append((rid, evidence_item_basename(value)))

    for key in (
        "evidence",
        "evidence_provided",
        "evidence_required",
        "test_reports",
        "rubric_scorecards",
        "trace_reports",
        "certificates",
    ):
        if key in record:
            visit(record.get(key))
    return obligations


def read_evidence_files(paths, problems):
    files = {}
    for path in paths:
        target = Path(path)
        if "templates" in {part.lower() for part in target.parts}:
            problems.append(f"evidence file {path} is a template, not instantiated evidence")
            continue
        try:
            text = target.read_text(encoding="utf-8-sig")
        except Exception as exc:
            problems.append(f"evidence file {path} could not be read: {exc}")
            continue
        files[target.name] = text
    return files


def validate_physical_evidence(records, evidence_file_paths):
    problems = []
    obligations = []
    for record in records:
        obligations.extend(collect_file_like_evidence(record))
    if not obligations:
        return problems
    if not evidence_file_paths:
        problems.append("file-like evidence references require --evidence-file bundle inputs")
        return problems

    evidence_files = read_evidence_files(evidence_file_paths, problems)
    for rid, basename in obligations:
        text = evidence_files.get(basename)
        if text is None:
            problems.append(f"{rid}: evidence file {basename} was not provided with --evidence-file")
        elif rid not in text:
            problems.append(f"{rid}: evidence file {basename} does not mention source record id")
    return problems


def parse_args(args):
    strict_references = False
    strict_bidirectional = False
    evidence_file_paths = []
    index = 0
    while index < len(args):
        arg = args[index]
        if arg == "--strict":
            strict_references = True
            strict_bidirectional = True
            index += 1
        elif arg == "--strict-references":
            strict_references = True
            index += 1
        elif arg == "--strict-bidirectional":
            strict_bidirectional = True
            index += 1
        elif arg == "--evidence-file":
            if index + 1 >= len(args):
                raise ValueError("--evidence-file requires a path")
            evidence_file_paths.append(args[index + 1])
            index += 2
        else:
            raise ValueError(f"unknown argument {arg}")
    return strict_references, strict_bidirectional, evidence_file_paths


def main(path, args):
    try:
        records = read_records(path)
    except Exception as exc:
        print(str(exc))
        return 1
    try:
        strict_references, strict_bidirectional, evidence_file_paths = parse_args(args)
    except ValueError as exc:
        print(str(exc))
        return 1

    problems = validate_record_set(
        records,
        strict_references=strict_references,
        strict_bidirectional=strict_bidirectional,
    )
    problems.extend(validate_physical_evidence(records, evidence_file_paths))
    if problems:
        print("\n".join(problems))
        return 1
    print("Trace links are valid.")
    return 0


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit(
            "Usage: validate_trace_links.py records.json [--strict] "
            "[--strict-references] [--strict-bidirectional] [--evidence-file artifact-or-report ...]"
        )
    raise SystemExit(main(sys.argv[1], sys.argv[2:]))
