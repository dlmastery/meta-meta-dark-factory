#!/usr/bin/env python3
"""Build project-book dashboard indexes and compute redo transitive closures."""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
from collections import defaultdict, deque
from datetime import datetime, timezone
from pathlib import Path


ZERO_SLOP = "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS"
TEXT_SUFFIXES = {".md", ".json", ".yaml", ".yml", ".txt", ".html", ".css", ".js", ".ts", ".tsx", ".jsx", ".cjs", ".mjs"}
NODE_SAFE = re.compile(r"[^A-Za-z0-9]+")


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return path.read_text(encoding="utf-8-sig", errors="replace")


def write_json(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def node_id_for(rel: str) -> str:
    base = NODE_SAFE.sub("-", rel).strip("-").upper()
    return f"NODE-{base}"[:160]


def classify(path: Path, rel: str) -> tuple[str, str]:
    lower = rel.lower().replace("\\", "/")
    if "/evidence/" in f"/{lower}" or lower.startswith("evidence/"):
        if "certificate" in lower:
            return "certificate", "evidence"
        if "gate" in lower:
            return "gate", "evidence"
        if "test" in lower or "output" in lower or "results" in lower or "screenshot" in lower:
            return "evidence", "verification"
        return "evidence", "evidence"
    if "/portal/" in f"/{lower}" or lower.startswith("portal/"):
        return "portal", "portal"
    if "trace" in lower:
        return "trace", "evidence"
    if "test" in lower or "validation" in lower or "qa" in lower:
        return "test", "verification"
    if "architecture" in lower or "design" in lower or "adr" in lower:
        return "artifact", "design"
    if "prd" in lower or "requirement" in lower or "intake" in lower:
        return "artifact", "requirements"
    if "runbook" in lower or "handoff" in lower or "release" in lower or "operation" in lower:
        return "artifact", "operations"
    if "task" in lower or "ledger" in lower or "control" in lower:
        return "task", "governance"
    return "artifact", "project-book"


def title_for(path: Path) -> str:
    if path.suffix.lower() == ".md":
        for line in read_text(path).splitlines():
            if line.startswith("# "):
                return line[2:].strip()
    return path.stem.replace("-", " ").replace("_", " ").title()


def iter_files(root: Path) -> list[Path]:
    skip_dirs = {"node_modules", ".git", "__pycache__", "edge-profile", "edge-profile2", ".playwright"}
    files: list[Path] = []
    for path in root.rglob("*"):
        if any(part in skip_dirs for part in path.parts):
            continue
        if path.is_file():
            files.append(path)
    return sorted(files)


def is_dashboard_generated(rel: str) -> bool:
    normalized = rel.lower().replace("\\", "/")
    return (
        normalized == "portal/dashboard-control-index.json"
        or normalized == "portal/dashboard-control.html"
        or normalized.startswith("evidence/redo-impact-")
    )


def build_index(root: Path, project: str) -> dict:
    root = root.resolve()
    files = iter_files(root)
    nodes = []
    path_to_id: dict[str, str] = {}
    for path in files:
        rel = path.relative_to(root).as_posix()
        node_id = node_id_for(rel)
        kind, stage = classify(path, rel)
        path_to_id[rel.lower()] = node_id
        nodes.append(
            {
                "id": node_id,
                "kind": kind,
                "title": title_for(path),
                "path": rel,
                "stage": stage,
                "status": infer_status(path),
                "owner": "",
                "gate": "",
                "certificate": "",
                "redo_boundary": False,
                "tags": [],
            }
        )

    edges: list[dict] = []
    explicit_edges = load_explicit_edges(root, path_to_id)
    edges.extend(explicit_edges)
    edges.extend(infer_edges_from_text(root, files, path_to_id))
    edges = dedupe_edges(edges)

    return {
        "zero_slop_policy": ZERO_SLOP,
        "dashboard_id": f"DASH-{slug(project)}-{datetime.now().strftime('%Y%m%d')}",
        "project": project,
        "generated_at": utc_now(),
        "source_root": str(root),
        "nodes": nodes,
        "edges": edges,
        "validators": [],
        "open_questions": [],
        "residual_risks": [
            "Text-scanned inferred edges must be converted to explicit trace/knowledge-graph edges before certification."
        ],
    }


def infer_status(path: Path) -> str:
    text = read_text(path)[:4000] if path.suffix.lower() in TEXT_SUFFIXES else ""
    lower = text.lower()
    if '"status": "pass"' in lower or '"overall_status": "passed"' in lower or "status: pass" in lower:
        return "accepted"
    if "conditional pass" in lower or "conditional" in lower:
        return "conditional"
    if "blocked" in lower or "fail" in lower:
        return "blocked"
    return "draft"


def slug(value: str) -> str:
    return NODE_SAFE.sub("-", value.lower()).strip("-") or "project"


def load_explicit_edges(root: Path, path_to_id: dict[str, str]) -> list[dict]:
    edges: list[dict] = []
    for candidate in root.rglob("*.json"):
        if any(part in {"node_modules", "__pycache__", "edge-profile", "edge-profile2"} for part in candidate.parts):
            continue
        rel = candidate.relative_to(root).as_posix()
        if is_dashboard_generated(rel):
            continue
        try:
            data = json.loads(read_text(candidate))
        except Exception:
            continue
        raw_edges = data.get("edges") if isinstance(data, dict) else None
        if not isinstance(raw_edges, list):
            continue
        for edge in raw_edges:
            if not isinstance(edge, dict):
                continue
            source = str(edge.get("source", "")).strip()
            target = str(edge.get("target", "")).strip()
            if not source or not target:
                continue
            edges.append(
                {
                    "source": source,
                    "target": target,
                    "type": str(edge.get("type", "depends_on")),
                    "evidence": rel,
                    "authority": str(edge.get("authority", "explicit")),
                    "reason": str(edge.get("reason", "explicit graph edge")),
                }
            )
    return edges


def infer_edges_from_text(root: Path, files: list[Path], path_to_id: dict[str, str]) -> list[dict]:
    edges: list[dict] = []
    ref_patterns = [
        re.compile(r"[\w./-]+\.(?:md|json|yaml|yml|txt|html|png|jpg|jpeg|svg)", re.I),
        re.compile(r"\b(?:REQ|NFR|ARC|GOV|EVD|REL|VNV|IMP|DDD|MDA|TB|GATE|CERT|VAL)-[A-Z0-9-]+\b", re.I),
    ]
    id_by_token = build_token_index(path_to_id)
    for path in files:
        rel = path.relative_to(root).as_posix()
        source_id = path_to_id.get(rel.lower())
        if not source_id or path.suffix.lower() not in TEXT_SUFFIXES:
            continue
        if is_dashboard_generated(rel):
            continue
        text = read_text(path)
        for pattern in ref_patterns:
            for match in pattern.findall(text):
                target = resolve_reference(match, path_to_id, id_by_token)
                if target and target != source_id:
                    edges.append(
                        {
                            "source": source_id,
                            "target": target,
                            "type": "inferred_reference",
                            "evidence": rel,
                            "authority": "inferred",
                            "reason": f"text reference `{match}`",
                        }
                    )
    return edges


def build_token_index(path_to_id: dict[str, str]) -> dict[str, str]:
    result: dict[str, str] = {}
    for rel, node_id in path_to_id.items():
        stem = Path(rel).stem.upper()
        for token in re.findall(r"\b[A-Z]{2,5}-\d{2,5}(?:-[A-Z0-9]+)?\b", stem):
            result[token] = node_id
    return result


def resolve_reference(ref: str, path_to_id: dict[str, str], id_by_token: dict[str, str]) -> str | None:
    normalized = ref.replace("\\", "/").lower().strip("./")
    if normalized in path_to_id:
        return path_to_id[normalized]
    for rel, node_id in path_to_id.items():
        if rel.endswith(normalized):
            return node_id
    token = ref.upper()
    return id_by_token.get(token)


def dedupe_edges(edges: list[dict]) -> list[dict]:
    seen = set()
    result = []
    for edge in edges:
        key = (edge.get("source"), edge.get("target"), edge.get("type"), edge.get("authority"))
        if key in seen:
            continue
        seen.add(key)
        result.append(edge)
    return result


def compute_closure(index: dict, selected_node: str, force_boundary: bool = False, source_request: str = "") -> dict:
    nodes = {node["id"]: node for node in index.get("nodes", [])}
    if selected_node not in nodes:
        matches = [node["id"] for node in index.get("nodes", []) if selected_node.lower() in node.get("path", "").lower()]
        if len(matches) == 1:
            selected_node = matches[0]
        else:
            raise SystemExit(f"Selected node not found or ambiguous: {selected_node}")

    forward_impact_types = {"reviewed_by", "certified_by", "reopens", "supersedes", "blocks"}
    reverse_impact_types = {"depends_on", "satisfies", "verifies", "documents", "generated_from", "inferred_reference"}
    adjacency: dict[str, list[dict]] = defaultdict(list)
    for edge in index.get("edges", []):
        source = edge.get("source", "")
        target = edge.get("target", "")
        edge_type = edge.get("type")
        if not source or not target:
            continue
        if edge_type in forward_impact_types:
            adjacency[source].append(oriented_impact_edge(edge, source, target, "forward"))
        if edge_type in reverse_impact_types:
            adjacency[target].append(oriented_impact_edge(edge, target, source, "reverse"))

    impacted = []
    edge_reasons = []
    seen = {selected_node}
    queue = deque([selected_node])
    while queue:
        current = queue.popleft()
        impacted.append(current)
        current_node = nodes.get(current, {})
        if current != selected_node and current_node.get("redo_boundary") and not force_boundary:
            continue
        for edge in adjacency.get(current, []):
            target = edge.get("impact_target")
            if not target or target in seen or target not in nodes:
                continue
            seen.add(target)
            queue.append(target)
            edge_reasons.append(edge)

    redo_order = topo_order(impacted, edge_reasons)
    return make_impact_report(index, selected_node, impacted, redo_order, edge_reasons, source_request)


def oriented_impact_edge(edge: dict, impact_source: str, impact_target: str, direction: str) -> dict:
    result = dict(edge)
    result["impact_source"] = impact_source
    result["impact_target"] = impact_target
    result["impact_direction"] = direction
    result["original_source"] = edge.get("source", "")
    result["original_target"] = edge.get("target", "")
    return result


def topo_order(impacted: list[str], edges: list[dict]) -> list[str]:
    impacted_set = set(impacted)
    indegree = {node: 0 for node in impacted}
    outgoing: dict[str, list[str]] = defaultdict(list)
    for edge in edges:
        source = edge.get("impact_source", edge.get("source"))
        target = edge.get("impact_target", edge.get("target"))
        if source in impacted_set and target in impacted_set:
            outgoing[source].append(target)
            indegree[target] += 1
    queue = deque([node for node in impacted if indegree[node] == 0])
    order: list[str] = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for target in outgoing.get(node, []):
            indegree[target] -= 1
            if indegree[target] == 0:
                queue.append(target)
    for node in impacted:
        if node not in order:
            order.append(node)
    return order


def make_impact_report(index: dict, selected_node: str, impacted: list[str], redo_order: list[str], edge_reasons: list[dict], source_request: str = "") -> dict:
    nodes = {node["id"]: node for node in index.get("nodes", [])}
    impacted_nodes = [nodes[node] for node in impacted if node in nodes]
    gates = sorted({node.get("gate") for node in impacted_nodes if node.get("gate")})
    certs = sorted({node.get("certificate") for node in impacted_nodes if node.get("certificate")})
    tests = [node for node in impacted_nodes if node.get("kind") in {"test", "evidence"} or node.get("stage") == "verification"]
    artifacts = [node for node in impacted_nodes if node.get("kind") in {"artifact", "portal", "trace"}]
    dashboard_outputs = [
        node for node in nodes.values()
        if node.get("path") in {"portal/dashboard-control-index.json", "portal/dashboard-control.html"}
    ]
    return {
        "zero_slop_policy": ZERO_SLOP,
        "report_id": f"REDO-IMPACT-{slug(index.get('project', 'project'))}-{datetime.now().strftime('%Y%m%d-%H%M%S')}",
        "project": index.get("project", ""),
        "source_request": source_request,
        "selected_node": selected_node,
        "selected_node_path": nodes[selected_node].get("path", ""),
        "generated_at": utc_now(),
        "closure": {
            "impacted_node_count": len(impacted_nodes),
            "impacted_nodes": impacted_nodes,
            "edge_reasons": edge_reasons,
        },
        "redo_order": [nodes[node] for node in redo_order if node in nodes],
        "gates_to_reopen": gates,
        "certificates_to_reissue": certs,
        "tests_to_rerun": tests,
        "artifacts_to_regenerate": artifacts,
        "dashboard_outputs_to_refresh": dashboard_outputs,
        "human_approvals": [
            "Approve redo scope and token SWAG before material changes.",
            "Approve residual risk for any inferred edge not converted to explicit trace."
        ],
        "required_skills": [
            "df-governance-mayor",
            "df-artifact-factory",
            "df-quality-refinery",
            "df-traceability-evidence",
            "df-human-agent-handoff",
            "df-dashboard-control",
        ],
        "task_bead": {
            "bead_id": f"TB-REDO-{datetime.now().strftime('%Y%m%d-%H%M%S')}",
            "state": "planned",
            "gate": "GATE-REDO-IMPACT",
            "evidence_target": "redo-impact-report.json",
        },
        "assumptions": [],
        "residual_risks": [
            "Closure is only as complete as the dashboard index edges. Inferred edges require human or traceability review."
        ],
    }


def render_html(index: dict, out: Path) -> None:
    stages: dict[str, list[dict]] = defaultdict(list)
    for node in index.get("nodes", []):
        stages[node.get("stage", "unknown")].append(node)
    edge_count = len(index.get("edges", []))
    inferred = sum(1 for edge in index.get("edges", []) if edge.get("authority") == "inferred")
    explicit = edge_count - inferred
    body = [
        "<!doctype html><html><head><meta charset='utf-8'>",
        "<title>DFMS Dashboard Control</title>",
        "<style>body{font-family:Segoe UI,Arial,sans-serif;margin:24px;color:#202124;background:#f8fafc}h1{font-size:28px}h2{margin-top:28px}.meta{display:flex;gap:12px;flex-wrap:wrap}.chip{background:#fff;border:1px solid #d0d7de;border-radius:8px;padding:8px 10px}.node{background:#fff;border:1px solid #d0d7de;border-radius:8px;padding:10px;margin:8px 0}.path{color:#5f6368;font-family:Consolas,monospace;font-size:12px}.status{font-weight:600}.id{font-family:Consolas,monospace;font-size:12px;color:#0b57d0}</style>",
        "</head><body>",
        f"<h1>DFMS Dashboard Control: {html.escape(index.get('project',''))}</h1>",
        "<div class='meta'>",
        f"<div class='chip'>Nodes: {len(index.get('nodes', []))}</div>",
        f"<div class='chip'>Edges: {edge_count}</div>",
        f"<div class='chip'>Explicit edges: {explicit}</div>",
        f"<div class='chip'>Inferred edges: {inferred}</div>",
        f"<div class='chip'>Generated: {html.escape(index.get('generated_at',''))}</div>",
        "</div>",
        "<p>Select a node ID and run the redo closure command from the skill script to produce a change-impact report. Inferred edges are review hints, not certification proof.</p>",
    ]
    for stage in sorted(stages):
        body.append(f"<h2>{html.escape(stage.title())}</h2>")
        for node in sorted(stages[stage], key=lambda item: item.get("path", "")):
            body.append("<div class='node'>")
            body.append(f"<div><span class='id'>{html.escape(node['id'])}</span> <strong>{html.escape(node.get('title',''))}</strong></div>")
            body.append(f"<div class='path'>{html.escape(node.get('path',''))}</div>")
            body.append(f"<div>Status: <span class='status'>{html.escape(node.get('status',''))}</span> Kind: {html.escape(node.get('kind',''))}</div>")
            body.append("</div>")
    body.append("</body></html>")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("\n".join(body), encoding="utf-8")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="cmd", required=True)

    build = sub.add_parser("build", help="Build dashboard index from a project-book root")
    build.add_argument("--root", required=True, type=Path)
    build.add_argument("--project", required=True)
    build.add_argument("--out", required=True, type=Path)
    build.add_argument("--html", type=Path)

    closure = sub.add_parser("closure", help="Compute downstream redo closure")
    closure.add_argument("--index", required=True, type=Path)
    closure.add_argument("--node", required=True)
    closure.add_argument("--out", required=True, type=Path)
    closure.add_argument("--force-boundary", action="store_true")
    closure.add_argument("--request", default="")

    args = parser.parse_args(argv)
    if args.cmd == "build":
        index = build_index(args.root, args.project)
        write_json(args.out, index)
        if args.html:
            render_html(index, args.html)
        print(json.dumps({"status": "pass", "nodes": len(index["nodes"]), "edges": len(index["edges"]), "out": str(args.out)}, indent=2))
        return 0
    if args.cmd == "closure":
        index = json.loads(read_text(args.index))
        report = compute_closure(index, args.node, args.force_boundary, args.request)
        write_json(args.out, report)
        print(json.dumps({"status": "pass", "impacted": report["closure"]["impacted_node_count"], "out": str(args.out)}, indent=2))
        return 0
    return 1


if __name__ == "__main__":
    sys.exit(main())
