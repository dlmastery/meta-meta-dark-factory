#!/usr/bin/env python3
"""Generate a construction-style SDLC artifact bill of materials.

The BOM consolidates the governed artifact catalog with exactly 15
artifact-level QA rubric checks per artifact.
"""

from __future__ import annotations

import csv
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
CATALOG = ROOT / "dark-factory-meta-skills-design" / "03-artifact-catalog.md"
RUBRICS = ROOT / "dark-factory-meta-skills-design" / "artifact-rubric-library"
OUT_DIR = ROOT / "dark-factory-meta-skills-design" / "artifact-bom"
OUT_MD = ROOT / "dark-factory-meta-skills-design" / "40-sdlc-artifact-bill-of-materials-and-rubric-catalog.md"

ZERO_SLOP = "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS"
ZERO_SLOP_MD = f"> **{ZERO_SLOP}**\n> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.\n"


FAMILY_STAGE = {
    "GOV": ("Preconstruction Governance", "Owner brief, permits, code matrix, contracting, risk, responsibilities, and site control plan."),
    "REQ": ("Programming and Requirements", "Architectural programming: room schedule, user needs, constraints, acceptance criteria, and owner signoff."),
    "ARC": ("Design Development and Engineering", "Architectural/structural/MEP drawings, design calculations, interfaces, and safety engineering."),
    "MDA": ("Model and Blueprint Transformation", "Concept drawings to engineering drawings to construction documents, with transformation control."),
    "DDD": ("Domain Blueprint Coordination", "Trade-specific coordination drawings, boundaries, terminology, and integration details."),
    "IMP": ("Construction Execution Package", "Work packages, materials, build configuration, site execution, migration, and backout."),
    "VNV": ("Inspection and Commissioning", "Inspections, test reports, punch-list validation, commissioning, and certificate evidence."),
    "REL": ("Handover, Operations, and Maintenance", "Owner handover binder, operating manuals, training, incident procedures, and maintenance plan."),
    "EVD": ("Inspection Records and Warranty Binder", "Trace records, certificates, provenance, residual risk signoff, and lessons learned."),
}


CONSTRUCTION_ANALOG = {
    "GOV-001": "Owner project brief and construction charter",
    "GOV-002": "Building code and permit applicability matrix",
    "GOV-003": "General contractor / architect / engineer responsibility matrix",
    "GOV-004": "Site risk, safety, and contingency register",
    "GOV-005": "Change order and variation control plan",
    "GOV-006": "Quality inspection and acceptance plan",
    "GOV-007": "Automated equipment / smart-building governance plan",
    "GOV-008": "Master construction sequence and inspection gate plan",
    "GOV-009": "Site work ledger and daily log schema",
    "GOV-010": "Preconstruction feasibility and routing record",
    "GOV-011": "Integrated delivery method plan",
    "REQ-001": "Owner requirements and building program",
    "REQ-002": "Detailed room/function/performance specification",
    "REQ-003": "Performance criteria schedule: load, fire, acoustic, HVAC, safety",
    "REQ-004": "Acceptance walk-through scenarios and punch-list criteria",
    "REQ-005": "Project glossary and drawing legend",
    "REQ-006": "Assumption, constraint, and site condition log",
    "REQ-007": "Owner/stakeholder interview and signoff record",
    "REQ-008": "Work breakdown / room-by-room decomposition record",
    "ARC-001": "Architectural design development package",
    "ARC-002": "Detailed construction drawings and shop drawing basis",
    "ARC-003": "Design decision log and engineering rationale",
    "ARC-004": "Interface specification between trades and systems",
    "ARC-005": "Site utility/data model and phased migration plan",
    "ARC-006": "Life-safety, security, and hazard analysis",
    "ARC-007": "Building monitoring, alarms, and observability plan",
    "MDA-001": "Conceptual massing and owner-use model",
    "MDA-002": "Technology-neutral engineering model",
    "MDA-003": "Construction-ready platform/material model",
    "MDA-004": "Concept-to-engineering-to-construction transformation log",
    "DDD-001": "Trade boundary and coordination map",
    "DDD-002": "Structural/detail invariant and tolerance catalog",
    "DDD-003": "Interface isolation plan for external/legacy systems",
    "IMP-001": "Construction execution plan",
    "IMP-002": "Installed work package / change set",
    "IMP-003": "Materials, suppliers, and build manifest",
    "IMP-004": "Temporary works, site environment, and configuration spec",
    "IMP-005": "Cutover, migration, and backout plan",
    "VNV-001": "Master inspection and commissioning strategy",
    "VNV-002": "Inspection checklists and test procedures",
    "VNV-003": "Inspection/test evidence and signoff package",
    "VNV-004": "Independent holdout inspection scenario report",
    "VNV-005": "Security and life-safety test report",
    "VNV-006": "Load, reliability, and performance commissioning report",
    "VNV-007": "Accessibility and usability inspection report",
    "REL-001": "Move-in / occupancy release plan",
    "REL-002": "Owner release notes and known-issue bulletin",
    "REL-003": "Deployment / installation guide",
    "REL-004": "Operations and facilities runbook",
    "REL-005": "Emergency response and incident guide",
    "REL-006": "Maintenance and repair manual",
    "REL-007": "Owner/operator training package",
    "REL-008": "Emergency drill and operator readiness record",
    "EVD-001": "As-built traceability matrix",
    "EVD-002": "Design review and coordination meeting record",
    "EVD-003": "Inspection scorecard",
    "EVD-004": "Certificate of quality / acceptance",
    "EVD-005": "Material provenance and chain-of-custody record",
    "EVD-006": "Residual risk / exception acceptance",
    "EVD-007": "Inspection gate record",
    "EVD-008": "Owner communication and signoff record",
    "EVD-009": "Handover binder and predecessor recovery record",
    "EVD-010": "Post-project lessons learned and warranty learning record",
}


def parse_catalog():
    artifacts = []
    section = ""
    for line in CATALOG.read_text(encoding="utf-8").splitlines():
        if line.startswith("## ") and "Artifacts" in line:
            section = line.strip("# ").strip()
        if not re.match(r"^\| [A-Z]+-\d{3} \|", line):
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        prefix = cells[0].split("-")[0]
        artifacts.append(
            {
                "id": cells[0],
                "artifact": cells[1],
                "basis": cells[2],
                "required_links": cells[3],
                "reviewer_hint": cells[4],
                "family": prefix,
                "section": section,
                "stage": FAMILY_STAGE[prefix][0],
                "stage_analogy": FAMILY_STAGE[prefix][1],
                "construction_analog": CONSTRUCTION_ANALOG[cells[0]],
            }
        )
    return artifacts


def rubric_path_for(artifact_id: str, artifact_name: str) -> Path:
    index = json.loads((RUBRICS / "index.json").read_text(encoding="utf-8"))
    for item in index["items"]:
        if item["artifact_id"] == artifact_id:
            return RUBRICS / item["rubric_json"]
    raise KeyError(artifact_id)


def load_15_checks(artifact):
    data = json.loads(rubric_path_for(artifact["id"], artifact["artifact"]).read_text(encoding="utf-8"))
    checks = data["artifact_level_rubric"][:15]
    if len(checks) != 15:
        raise ValueError(f"{artifact['id']} has {len(checks)} checks")
    return checks


def render_bom(artifacts):
    lines = [
        ZERO_SLOP_MD,
        "# 40. SDLC Artifact Bill Of Materials And Rubric Catalog",
        "",
        "Status: generated from the governed DFMS artifact catalog and artifact-specific rubric library.",
        "",
        "Purpose: provide a construction-grade artifact bill of materials for DFMS software delivery. This is the software equivalent of a house construction package: owner brief, permits, drawings, engineering calculations, trade coordination, inspections, commissioning, handover binder, and warranty records.",
        "",
        "## Counts",
        "",
        f"- Governed artifact types: {len(artifacts)}",
        f"- Artifact-level rubrics per artifact: 15",
        f"- Total artifact-level rubric checks in this BOM: {len(artifacts) * 15}",
        "- Primary critic seats per artifact: 3",
        f"- Primary critic seats total: {len(artifacts) * 3}",
        "- Required adversarial critics per artifact: at least 2",
        "- Required RALPH loops per artifact: at least 5",
        "",
        "## Construction Analogy",
        "",
        "| DFMS Stage | House Construction Analogy | Artifact Families |",
        "| --- | --- | --- |",
    ]
    for prefix, (stage, analogy) in FAMILY_STAGE.items():
        lines.append(f"| {stage} | {analogy} | `{prefix}` |")
    lines.extend(
        [
            "",
            "## Artifact BOM Register",
            "",
            "| ID | Artifact | DFMS Stage | Construction Analog | Required Links | Review Hint |",
            "| --- | --- | --- | --- | --- | --- |",
        ]
    )
    for a in artifacts:
        lines.append(f"| {a['id']} | {a['artifact']} | {a['stage']} | {a['construction_analog']} | {a['required_links']} | {a['reviewer_hint']} |")

    lines.extend(["", "## Per-Artifact 15-Point Quality Rubrics", ""])
    current_stage = None
    for a in artifacts:
        if a["stage"] != current_stage:
            current_stage = a["stage"]
            lines.extend(["", f"## {current_stage}", ""])
        lines.extend(
            [
                f"### {a['id']} {a['artifact']}",
                "",
                f"- **Construction analog:** {a['construction_analog']}",
                f"- **Basis:** {a['basis']}",
                f"- **Required links:** {a['required_links']}",
                f"- **Reviewer hint:** {a['reviewer_hint']}",
                "- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.",
                "",
                "| # | Rubric | Intent | Required Evidence | Fail If |",
                "| --- | --- | --- | --- | --- |",
            ]
        )
        for idx, check in enumerate(load_15_checks(a), start=1):
            evidence = "; ".join(check["required_evidence"])
            fail_if = "; ".join(check["fail_if"])
            lines.append(f"| {idx} | {check['name']} | {check['intent']} | {evidence} | {fail_if} |")
        lines.append("")
    return "\n".join(lines)


def write_machine_outputs(artifacts):
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    enriched = []
    for a in artifacts:
        item = dict(a)
        item["rubrics_15"] = load_15_checks(a)
        enriched.append(item)
    (OUT_DIR / "artifact-bom-with-15-rubrics.json").write_text(json.dumps({"zero_slop_policy": ZERO_SLOP, "artifacts": enriched}, indent=2), encoding="utf-8")
    with (OUT_DIR / "artifact-bom-register.csv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["id", "artifact", "stage", "construction_analog", "basis", "required_links", "reviewer_hint"])
        writer.writeheader()
        for a in artifacts:
            writer.writerow({key: a[key] for key in writer.fieldnames})
    with (OUT_DIR / "artifact-rubrics-15.csv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["artifact_id", "artifact", "check_number", "rubric", "intent", "required_evidence", "fail_if"])
        writer.writeheader()
        for a in artifacts:
            for idx, check in enumerate(load_15_checks(a), start=1):
                writer.writerow(
                    {
                        "artifact_id": a["id"],
                        "artifact": a["artifact"],
                        "check_number": idx,
                        "rubric": check["name"],
                        "intent": check["intent"],
                        "required_evidence": "; ".join(check["required_evidence"]),
                        "fail_if": "; ".join(check["fail_if"]),
                    }
                )


def main():
    artifacts = parse_catalog()
    if len(artifacts) != 63:
        raise SystemExit(f"Expected 63 artifacts, found {len(artifacts)}")
    OUT_MD.write_text(render_bom(artifacts), encoding="utf-8")
    write_machine_outputs(artifacts)
    print(json.dumps({"status": "generated", "artifacts": len(artifacts), "rubrics_per_artifact": 15, "total_rubrics": len(artifacts) * 15, "markdown": str(OUT_MD), "json": str(OUT_DIR / "artifact-bom-with-15-rubrics.json")}, indent=2))


if __name__ == "__main__":
    main()
