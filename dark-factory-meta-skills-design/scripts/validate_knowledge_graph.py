#!/usr/bin/env python3
"""Validate DFMS knowledge graph records.

This validator is intentionally stricter for instantiated records than for
templates. Use --allow-template only when checking reusable template shape.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


ZERO_SLOP = "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS"
ACCEPTED_STATES = {"accepted", "hardened", "complete", "passed"}
TEMPLATE_MARKERS = {"", "TBD", "TODO", "Replace with real source reference"}
REQUIRED_NODE_TYPES = {
    "intent",
    "requirement",
    "risk",
    "decision",
    "control_graph_node",
    "work_ledger_item",
    "task_bead",
    "artifact",
    "evidence",
    "certificate",
}
REQUIRED_EDGE_TYPES = {
    "derives_from",
    "decomposes_to",
    "satisfies",
    "verifies",
    "tracked_by",
    "gated_by",
    "reviewed_by",
    "evidenced_by",
    "certified_by",
    "next_bead",
}
ACCEPTED_BEAD_REQUIRED_FIELDS = (
    "control_graph_node",
    "work_ledger_item",
    "evidence_provided",
    "gate",
)
ACCEPTED_ARTIFACT_REQUIRED_LINKS = (
    "artifact_template",
    "rubric",
    "review_record",
    "ralph_loop",
    "evidence",
    "certificate",
)


def load_json(path: Path) -> dict[str, Any]:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:  # pragma: no cover - user-facing CLI
        raise SystemExit(f"ERROR: cannot read JSON from {path}: {exc}") from exc


def is_blank(value: Any) -> bool:
    if value is None:
        return True
    if isinstance(value, str):
        return value.strip() in TEMPLATE_MARKERS or value.strip().upper() in TEMPLATE_MARKERS
    if isinstance(value, (list, tuple, set, dict)):
        return len(value) == 0
    return False


def add(failures: list[str], message: str) -> None:
    failures.append(message)


def validate_waivers(record: dict[str, Any], failures: list[str]) -> None:
    for waiver in record.get("waivers", []):
        wid = waiver.get("id", "<missing waiver id>")
        for field in ("owner", "rationale", "expiry", "residual_risk", "revalidation_trigger"):
            if is_blank(waiver.get(field)):
                add(failures, f"waiver {wid} missing {field}")


def edge_index(edges: list[dict[str, Any]]) -> tuple[dict[str, list[dict[str, Any]]], dict[str, list[dict[str, Any]]]]:
    outgoing: dict[str, list[dict[str, Any]]] = {}
    incoming: dict[str, list[dict[str, Any]]] = {}
    for edge in edges:
        outgoing.setdefault(edge.get("source", ""), []).append(edge)
        incoming.setdefault(edge.get("target", ""), []).append(edge)
    return outgoing, incoming


def node_has_edge(
    node_id: str,
    edge_type: str,
    outgoing: dict[str, list[dict[str, Any]]],
    incoming: dict[str, list[dict[str, Any]]],
) -> bool:
    return any(edge.get("type") == edge_type for edge in outgoing.get(node_id, [])) or any(
        edge.get("type") == edge_type for edge in incoming.get(node_id, [])
    )


def validate_record(record: dict[str, Any], allow_template: bool = False) -> list[str]:
    failures: list[str] = []

    policy = record.get("zero_slop_policy", {})
    if policy.get("statement") != ZERO_SLOP:
        add(failures, "zero_slop_policy.statement missing or incorrect")

    if record.get("template_only") is True and not allow_template:
        add(failures, "template_only is true; templates are not instantiated proof")

    for field in ("record_id", "title", "project"):
        if field not in record:
            add(failures, f"missing top-level field {field}")

    nodes = record.get("nodes")
    edges = record.get("edges")
    if not isinstance(nodes, list) or not nodes:
        add(failures, "nodes must be a non-empty list")
        nodes = []
    if not isinstance(edges, list):
        add(failures, "edges must be a list")
        edges = []

    node_ids: set[str] = set()
    duplicate_ids: set[str] = set()
    node_types: set[str] = set()
    for node in nodes:
        node_id = node.get("id")
        node_type = node.get("type")
        if is_blank(node_id):
            add(failures, "node missing id")
            continue
        if node_id in node_ids:
            duplicate_ids.add(node_id)
        node_ids.add(node_id)
        if is_blank(node_type):
            add(failures, f"node {node_id} missing type")
        else:
            node_types.add(node_type)
        if not allow_template and node.get("template_marker") is True:
            add(failures, f"node {node_id} is still marked as template example")
        for field in ("title", "status", "owner"):
            if is_blank(node.get(field)):
                add(failures, f"node {node_id} missing {field}")

    for node_id in sorted(duplicate_ids):
        add(failures, f"duplicate node id {node_id}")

    waivers = record.get("waivers", [])
    waived_types = {waiver.get("node_type") for waiver in waivers if waiver.get("node_type")}
    if not allow_template:
        for required_type in sorted(REQUIRED_NODE_TYPES - waived_types):
            if required_type not in node_types:
                add(failures, f"missing required node type {required_type} without waiver")

    edge_types: set[str] = set()
    for edge in edges:
        edge_id = edge.get("id", "<missing edge id>")
        source = edge.get("source")
        target = edge.get("target")
        edge_type = edge.get("type")
        if is_blank(edge_id):
            add(failures, "edge missing id")
        if is_blank(edge_type):
            add(failures, f"edge {edge_id} missing type")
        else:
            edge_types.add(edge_type)
        if source not in node_ids:
            add(failures, f"edge {edge_id} source {source!r} does not resolve")
        if target not in node_ids:
            add(failures, f"edge {edge_id} target {target!r} does not resolve")
        if not allow_template and edge.get("template_marker") is True:
            add(failures, f"edge {edge_id} is still marked as template example")

    waived_edges = {waiver.get("edge_type") for waiver in waivers if waiver.get("edge_type")}
    if not allow_template:
        for required_type in sorted(REQUIRED_EDGE_TYPES - waived_edges):
            if required_type not in edge_types:
                add(failures, f"missing required edge type {required_type} without waiver")

    outgoing, incoming = edge_index(edges)
    for node in nodes:
        node_id = node.get("id")
        node_type = node.get("type")
        state = str(node.get("state") or node.get("status") or "").lower()
        if not node_id:
            continue
        if node_type in {"requirement", "nfr", "risk", "artifact", "task_bead", "certificate"}:
            if not outgoing.get(node_id) and not incoming.get(node_id):
                add(failures, f"node {node_id} is orphaned")
        if node_type == "task_bead" and state in ACCEPTED_STATES:
            for field in ACCEPTED_BEAD_REQUIRED_FIELDS:
                if is_blank(node.get(field)):
                    add(failures, f"accepted task bead {node_id} missing {field}")
            if is_blank(node.get("next_bead")) and is_blank(node.get("closure_rationale")):
                add(failures, f"accepted task bead {node_id} missing next_bead or closure_rationale")
        if node_type == "artifact" and state in ACCEPTED_STATES:
            for required_link in ACCEPTED_ARTIFACT_REQUIRED_LINKS:
                if not node_has_edge(node_id, required_link if required_link in REQUIRED_EDGE_TYPES else "evidenced_by", outgoing, incoming):
                    add(failures, f"accepted artifact {node_id} missing proof link for {required_link}")

    validate_waivers(record, failures)
    return failures


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Validate a DFMS knowledge graph record.")
    parser.add_argument("path", type=Path)
    parser.add_argument("--allow-template", action="store_true", help="Allow template_only/template_marker records.")
    args = parser.parse_args(argv)

    record = load_json(args.path)
    failures = validate_record(record, allow_template=args.allow_template)
    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        return 1
    print(f"PASS: {args.path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
