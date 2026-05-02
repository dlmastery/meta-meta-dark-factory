#!/usr/bin/env python3
import argparse
import json
import pathlib
import re
import sys

ZERO = "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS"
PLACEHOLDER = re.compile(r"<[^>]+>|TODO|TBD|\\bplaceholder\\b", re.IGNORECASE)


def load_json(path):
    with open(path, "r", encoding="utf-8") as handle:
        return json.load(handle)


def fail(message, failures):
    failures.append(message)


def is_template_like(value):
    if isinstance(value, str):
        return bool(PLACEHOLDER.search(value))
    if isinstance(value, list):
        return any(is_template_like(item) for item in value)
    if isinstance(value, dict):
        return any(is_template_like(item) for item in value.values())
    return False


def main():
    parser = argparse.ArgumentParser(description="Validate a DFMS human review/onboarding portal bundle.")
    parser.add_argument("--project-root", required=True, help="Project root containing project-book.")
    parser.add_argument("--record", required=True, help="Human review portal record JSON path.")
    parser.add_argument("--index", required=True, help="Documentation portal index JSON path.")
    parser.add_argument("--dashboard", required=True, help="Human dashboard HTML path.")
    parser.add_argument("--diagram-atlas", required=True, help="Diagram atlas Markdown path.")
    args = parser.parse_args()

    project_root = pathlib.Path(args.project_root).resolve()
    record_path = pathlib.Path(args.record).resolve()
    index_path = pathlib.Path(args.index).resolve()
    dashboard_path = pathlib.Path(args.dashboard).resolve()
    diagram_path = pathlib.Path(args.diagram_atlas).resolve()
    project_book = project_root / "project-book"
    failures = []

    for required in [project_root, project_book, record_path, index_path, dashboard_path, diagram_path]:
        if not required.exists():
            fail(f"missing required path: {required}", failures)

    if failures:
        print(json.dumps({"status": "fail", "failures": failures}, indent=2))
        return 1

    record = load_json(record_path)
    index = load_json(index_path)
    dashboard = dashboard_path.read_text(encoding="utf-8")
    diagram_atlas = diagram_path.read_text(encoding="utf-8")

    for name, data in [("record", record), ("index", index)]:
        if data.get("zero_slop_policy", {}).get("statement") != ZERO:
            fail(f"{name} missing zero-slop policy", failures)
        if data.get("template_only") is not False:
            fail(f"{name} is template-only or missing template_only=false", failures)
        if is_template_like(data):
            fail(f"{name} contains placeholder-like content", failures)

    if ZERO not in dashboard:
        fail("dashboard missing zero-slop policy", failures)
    if "Fresh Reviewer Start Here" not in dashboard:
        fail("dashboard missing Fresh Reviewer Start Here section", failures)
    if "Role-Based Onboarding" not in dashboard:
        fail("dashboard missing role-based onboarding section", failures)
    if "SDLC Stage Dashboard" not in dashboard:
        fail("dashboard missing SDLC stage dashboard", failures)
    if "Mermaid Diagram Atlas" not in dashboard:
        fail("dashboard missing Mermaid diagram atlas link/section", failures)

    top_level_md = sorted(path for path in project_book.glob("*.md"))
    record_json = sorted((project_book / "records").glob("*.json"))
    evidence_root_files = sorted(path for path in (project_book / "evidence").glob("*") if path.is_file())

    index_text = json.dumps(index, sort_keys=True)
    for path in top_level_md:
        rel = path.relative_to(project_book).as_posix()
        if rel not in index_text and f"../{rel}" not in dashboard:
            fail(f"top-level Markdown not indexed: {rel}", failures)

    for path in record_json:
        rel = path.relative_to(project_book).as_posix()
        if rel not in index_text and f"../{rel}" not in dashboard:
            fail(f"record JSON not indexed: {rel}", failures)

    for path in evidence_root_files:
        rel = path.relative_to(project_book).as_posix()
        if rel not in index_text and f"../{rel}" not in dashboard:
            fail(f"root evidence file not indexed: {rel}", failures)

    mermaid_sources = []
    search_roots = [project_book, project_root.parent.parent / "dark-factory-meta-skills-design"]
    for root in search_roots:
        if root.exists():
            for md_path in root.rglob("*.md"):
                text = md_path.read_text(encoding="utf-8", errors="ignore")
                if "```mermaid" in text:
                    mermaid_sources.append(md_path)
                    if md_path.name not in diagram_atlas and md_path.as_posix() not in diagram_atlas:
                        fail(f"Mermaid source not listed in diagram atlas: {md_path}", failures)

    if not index.get("onboarding_paths"):
        fail("index has no onboarding paths", failures)
    if not index.get("sections"):
        fail("index has no sections", failures)

    result = {
        "status": "fail" if failures else "pass",
        "portal_record": str(record_path),
        "portal_index": str(index_path),
        "dashboard": str(dashboard_path),
        "diagram_atlas": str(diagram_path),
        "counts": {
            "top_level_markdown": len(top_level_md),
            "record_json": len(record_json),
            "root_evidence_files": len(evidence_root_files),
            "mermaid_sources": len(mermaid_sources)
        },
        "failures": failures
    }
    print(json.dumps(result, indent=2))
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
