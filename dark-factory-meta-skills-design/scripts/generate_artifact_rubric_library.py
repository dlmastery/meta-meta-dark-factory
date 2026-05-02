#!/usr/bin/env python3
"""Generate artifact-specific QA rubrics for DFMS governed artifacts.

Each artifact receives:
- 18 artifact-level evaluation checks.
- 3 artifact-specific critic seat rubrics.
- 15 checks per critic seat.

For the current 63-artifact catalog this produces:
- 1,134 artifact-level checks.
- 2,835 critic-seat checks.
- 3,969 total rubric checks.
"""

from __future__ import annotations

import importlib.util
import json
import re
import shutil
import sys
from pathlib import Path


WORKSPACE = Path(__file__).resolve().parents[2]
TEMPLATE_GENERATOR = WORKSPACE / "dark-factory-meta-skills-design" / "scripts" / "generate_artifact_template_library.py"
OUT = WORKSPACE / "dark-factory-meta-skills-design" / "artifact-rubric-library"
SKILL_OUT = Path(r"C:\Users\abhir\.codex\skills\df-quality-refinery\references\artifact-rubric-library")
ALLOWED_TARGETS = {OUT.resolve(), SKILL_OUT.resolve()}
ZERO_SLOP = "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS"
ZERO_SLOP_MD = f"> **{ZERO_SLOP}**\n> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.\n\n"
ZERO_SLOP_POLICY = {
    "statement": ZERO_SLOP,
    "strict_compliance": "Mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention.",
    "missing_evidence_rule": "If evidence is missing, mark it as an assumption, risk, open question, or failure.",
}


def load_template_module():
    spec = importlib.util.spec_from_file_location("artifact_template_generator", TEMPLATE_GENERATOR)
    if spec is None or spec.loader is None:
        raise SystemExit("Cannot load artifact template generator")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


tmpl = load_template_module()


FAMILY_RUBRIC_THEMES = {
    "GOV": [
        "governance authority",
        "standards tailoring",
        "approval control",
        "change and token-budget impact",
        "audit evidence",
        "human-agent accountability",
    ],
    "REQ": [
        "customer intent fidelity",
        "requirements precision",
        "recursive completeness",
        "acceptance testability",
        "contradiction handling",
        "downstream allocation",
    ],
    "ARC": [
        "architectural significance",
        "boundary clarity",
        "tradeoff discipline",
        "failure and security modeling",
        "operability",
        "implementation feasibility",
    ],
    "MDA": [
        "model continuity",
        "transformation integrity",
        "abstraction discipline",
        "traceable mapping",
        "platform rationale",
        "model verification",
    ],
    "DDD": [
        "ubiquitous language",
        "bounded context integrity",
        "aggregate correctness",
        "invariant protection",
        "integration semantics",
        "domain testability",
    ],
    "IMP": [
        "implementation correctness",
        "secure construction",
        "repo convention fit",
        "build reproducibility",
        "regression safety",
        "maintainability",
    ],
    "VNV": [
        "verification strategy",
        "risk coverage",
        "test reproducibility",
        "evidence interpretation",
        "gap handling",
        "exit decision",
    ],
    "REL": [
        "release readiness",
        "operational procedure",
        "rollback and incident response",
        "human training",
        "support readiness",
        "post-release learning",
    ],
    "EVD": [
        "evidence integrity",
        "trace closure",
        "audit replay",
        "residual risk treatment",
        "certificate consistency",
        "future resumption",
    ],
}


def slugify(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def parse_critic_cell(cell: str, fallback: str) -> tuple[str, str]:
    if ":" in cell:
        seat, mandate = cell.split(":", 1)
        return seat.strip(), mandate.strip()
    return fallback, cell.strip()


def check(check_id: str, name: str, intent: str, evidence: list[str], fail_if: list[str], severity: str = "major") -> dict:
    return {
        "id": check_id,
        "name": name,
        "severity": severity,
        "score_scale": "0=absent, 1=weak, 2=partial, 3=strong with minor gaps, 4=complete and evidence-backed",
        "intent": intent,
        "required_evidence": evidence,
        "fail_if": fail_if,
    }


def artifact_level_checks(artifact) -> list[dict]:
    prefix = artifact.artifact_id.split("-")[0]
    focus = tmpl.ARTIFACT_FOCUS.get(artifact.artifact_id, ["scope", "owners", "evidence", "risks", "handoff"])
    themes = FAMILY_RUBRIC_THEMES[prefix]
    base = [
        check("A01", "Artifact identity and lifecycle state", f"{artifact.name} declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item.", ["artifact header", "owner/approver fields", "control graph and ledger links"], ["missing owner", "missing lifecycle state", "unlinked node or ledger"], "critical"),
        check("A02", "Source intent and authorization", f"{artifact.name} ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests.", ["answer IDs", "approved assumptions", "source references"], ["unsupported material claim", "unapproved assumption", "missing source trace"], "critical"),
        check("A03", "Scope boundary and tailoring", f"{artifact.name} defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable.", ["scope table", "tailoring note", "deferred list"], ["scope ambiguity", "tailoring without rationale", "deferred work without owner"], "critical"),
    ]
    for idx, item in enumerate(focus, start=4):
        base.append(
            check(
                f"A{idx:02d}",
                f"Artifact-specific focus: {item}",
                f"{artifact.name} addresses `{item}` with enough specificity to guide downstream work, review, and verification.",
                [f"section covering {item}", "owner or accountable role", "linked evidence"],
                [f"{item} is generic", f"{item} lacks evidence", f"{item} lacks owner"],
                "major",
            )
        )
    while len(base) < 9:
        theme = themes[(len(base) - 3) % len(themes)]
        base.append(
            check(
                f"A{len(base)+1:02d}",
                f"Family theme coverage: {theme}",
                f"{artifact.name} handles `{theme}` according to its artifact family obligations.",
                [f"{theme} section", "trace link", "review evidence"],
                [f"{theme} omitted", f"{theme} not traceable", f"{theme} not reviewable"],
            )
        )
    tail = [
        check("A10", "Standards and method mapping", f"{artifact.name} maps named standards and methods to concrete sections, evidence, or justified exclusions.", ["standards mapping", "tailoring rationale", "waivers"], ["standard named without mapping", "unsupported compliance claim"], "critical"),
        check("A11", "Bidirectional traceability", f"{artifact.name} supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable.", ["trace matrix entries", "reverse links", "gap log"], ["one-way trace only", "missing risk/test/design links"], "critical"),
        check("A12", "Decision rationale and alternatives", f"{artifact.name} records material decisions, alternatives considered, rationale, consequences, and reversal triggers.", ["decision table", "alternative analysis", "ADR links"], ["decision without alternatives", "rationale too generic", "no reversal trigger"]),
        check("A13", "Risk, assumption, and residual-risk handling", f"{artifact.name} records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger.", ["risk table", "assumption log", "residual-risk acceptance"], ["risk without owner", "assumption without confidence", "residual risk not accepted"], "critical"),
        check("A14", "Verification and acceptance evidence", f"{artifact.name} defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof.", ["test links", "review evidence", "holdout/transfer evidence"], ["no proof path", "evidence cannot be rerun", "acceptance criteria absent"], "critical"),
        check("A15", "Artifact-specific critic panel instantiated", f"{artifact.name} has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics.", ["artifact review panel record", "critic personas", "cross-critique"], ["generic reviewers only", "missing critic seat", "no cross-critique"], "critical"),
        check("A16", "Handoff and future resumption", f"{artifact.name} includes human handoff, agent handoff, next action, and re-entry triggers so work can continue without hidden context.", ["handoff notes", "project-book index link", "re-entry triggers"], ["handoff missing", "next action unclear", "depends on original author"]),
        check("A17", "Quality certificate readiness", f"{artifact.name} is ready for refinery gate and certificate only when failed rubric points have fixes or accepted residual risk.", ["rubric score record", "fix evidence", "refinery gate"], ["failed point unresolved", "certificate references missing evidence"], "critical"),
        check("A18", "No template residue or unsupported claims", f"{artifact.name} contains no placeholder text, fictional examples as real evidence, generic filler, or claims beyond evidence.", ["placeholder scan", "example-removal note", "claim/evidence review"], ["TBD/TODO remains", "fictional example used as proof", "claim exceeds evidence"], "critical"),
    ]
    return base + tail


def critic_checks(artifact, seat_id: str, mandate: str, critic_index: int) -> list[dict]:
    focus = tmpl.ARTIFACT_FOCUS.get(artifact.artifact_id, ["scope", "owners", "evidence", "risks", "handoff"])
    seat_kind = ["content authority", "governance and trace", "verification and handoff"][critic_index - 1]
    return [
        check("C01", "Persona mandate declared", f"The {seat_id} critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `{artifact.name}`.", ["persona contract", "decision rights", "red flags"], ["generic reviewer", "no decision rights", "no red flags"], "critical"),
        check("C02", "Mandate-specific completeness", f"The critic verifies its mandate: {mandate}", ["mandate review notes", "artifact sections cited"], ["mandate not addressed", "review ignores artifact-specific duties"], "critical"),
        check("C03", "Artifact focus challenge", f"The critic inspects `{focus[0]}` and challenges whether it is concrete, evidenced, and useful.", [f"{focus[0]} evidence", "critic rationale"], [f"{focus[0]} generic", "no challenge recorded"]),
        check("C04", "Secondary focus challenge", f"The critic inspects `{focus[min(1, len(focus)-1)]}` for completeness, trace, and downstream usability.", [f"{focus[min(1, len(focus)-1)]} section", "trace link"], ["secondary focus incomplete", "no downstream allocation"]),
        check("C05", "Tertiary focus challenge", f"The critic inspects `{focus[min(2, len(focus)-1)]}` for risk, edge cases, and acceptance impact.", [f"{focus[min(2, len(focus)-1)]} evidence", "risk/test link"], ["tertiary focus lacks proof", "edge cases ignored"]),
        check("C06", "Standards fit", f"The critic confirms `{artifact.basis}` is applied through concrete artifact content, not name-dropping.", ["standards mapping", "tailoring rationale"], ["standard named but not used", "unsupported compliance claim"], "critical"),
        check("C07", "Trace closure", f"The critic verifies source, forward, reverse, and evidence links relevant to the {seat_kind} lens.", ["trace entries", "reverse links", "evidence links"], ["trace gap", "one-way trace only"], "critical"),
        check("C08", "Evidence sufficiency", f"The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.", ["evidence bundle", "dates/versions", "review notes"], ["template as proof", "stale evidence", "not project-specific"], "critical"),
        check("C09", "Risk and residual-risk treatment", f"The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.", ["risk log", "residual-risk record"], ["risk without owner", "no revalidation trigger"], "critical"),
        check("C10", "Adversarial cross-critique", f"The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.", ["cross-critique entry", "assumption challenged"], ["no adversarial challenge", "dissent erased"]),
        check("C11", "Downstream usability", f"The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.", ["downstream allocation", "handoff note"], ["downstream user must guess", "handoff missing"]),
        check("C12", "Iteration and change control", f"The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.", ["change impact note", "approval log"], ["scope drift hidden", "budget impact ignored"]),
        check("C13", "Failure and edge handling", f"The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `{artifact.name}`.", ["edge case list", "failure-mode notes"], ["happy path only", "contradictions unresolved"]),
        check("C14", "Pass/fail vote integrity", f"The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.", ["15 scored checks", "fix evidence", "vote rationale"], ["score without rationale", "failed point unresolved"], "critical"),
        check("C15", "Specialist escalation judgment", f"The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.", ["specialist decision", "risk rationale"], ["high risk without specialist", "specialist need not assessed"]),
    ]


def rubric_for(artifact) -> dict:
    critics = []
    for index, cell in enumerate(tmpl.critic_rows_for(artifact), start=1):
        seat_id, mandate = parse_critic_cell(cell, f"{artifact.artifact_id}-C{index}")
        critics.append(
            {
                "critic_seat_id": seat_id,
                "seat_kind": ["content_authority", "governance_and_trace", "verification_and_handoff"][index - 1],
                "mandate": mandate,
                "required_check_count": 15,
                "checks": critic_checks(artifact, seat_id, mandate, index),
            }
        )
    artifact_checks = artifact_level_checks(artifact)
    return {
        "zero_slop_policy": ZERO_SLOP_POLICY,
        "artifact_id": artifact.artifact_id,
        "artifact_name": artifact.name,
        "basis": artifact.basis,
        "required_links": artifact.required_links,
        "reviewer_hint": artifact.reviewer_hint,
        "minimum_artifact_level_checks": 15,
        "artifact_level_check_count": len(artifact_checks),
        "critic_seat_count": len(critics),
        "critic_seat_check_count": sum(len(c["checks"]) for c in critics),
        "total_check_count": len(artifact_checks) + sum(len(c["checks"]) for c in critics),
        "score_scale": "0=absent, 1=weak, 2=partial, 3=strong with minor gaps, 4=complete and evidence-backed",
        "pass_policy": {
            "artifact_level_minimum_percent": 96,
            "critic_seat_minimum_percent": 96,
            "critical_check_minimum_score": 4,
            "failed_points_require": "fix evidence or owner-approved residual risk with expiry and revalidation trigger",
        },
        "artifact_level_rubric": artifact_checks,
        "critic_seat_rubrics": critics,
    }


def markdown_for(rubric: dict) -> str:
    lines = [
        ZERO_SLOP_MD.rstrip(),
        "",
        f"# {rubric['artifact_id']} {rubric['artifact_name']} Rubric",
        "",
        "Status: artifact-specific QA rubric.",
        "",
        f"Basis: {rubric['basis']}.",
        "",
        "## Counts",
        "",
        f"- Artifact-level checks: {rubric['artifact_level_check_count']}",
        f"- Critic-seat rubrics: {rubric['critic_seat_count']}",
        f"- Critic-seat checks: {rubric['critic_seat_check_count']}",
        f"- Total checks: {rubric['total_check_count']}",
        "",
        "## Pass Policy",
        "",
        "- Minimum score: 96 percent for artifact-level and each critic-seat score.",
        "- Every critical check must score 4 or have owner-approved residual risk.",
        "- Every failed point needs fix evidence or residual-risk acceptance.",
        "- A pass cannot be issued without trace evidence, refinery gate, and quality certificate linkage.",
        "",
        "## Artifact-Level Rubric",
        "",
    ]
    for item in rubric["artifact_level_rubric"]:
        lines.extend([
            f"### {item['id']} {item['name']}",
            "",
            f"- Severity: `{item['severity']}`",
            f"- Intent: {item['intent']}",
            f"- Required evidence: {', '.join(item['required_evidence'])}.",
            f"- Fail if: {', '.join(item['fail_if'])}.",
            "",
        ])
    lines.append("## Critic-Seat Rubrics")
    lines.append("")
    for critic in rubric["critic_seat_rubrics"]:
        lines.extend([
            f"## {critic['critic_seat_id']}",
            "",
            f"Seat kind: `{critic['seat_kind']}`.",
            "",
            f"Mandate: {critic['mandate']}",
            "",
        ])
        for item in critic["checks"]:
            lines.extend([
                f"### {critic['critic_seat_id']} {item['id']} {item['name']}",
                "",
                f"- Severity: `{item['severity']}`",
                f"- Intent: {item['intent']}",
                f"- Required evidence: {', '.join(item['required_evidence'])}.",
                f"- Fail if: {', '.join(item['fail_if'])}.",
                "",
            ])
    return "\n".join(lines)


def write_library(artifacts, target: Path) -> None:
    resolved = target.resolve()
    if resolved not in ALLOWED_TARGETS:
        raise SystemExit(f"Refusing to rewrite unexpected rubric target: {resolved}")
    if target.exists():
        shutil.rmtree(target)
    target.mkdir(parents=True, exist_ok=True)
    index = []
    totals = {"artifact_level_checks": 0, "critic_seat_checks": 0, "total_checks": 0}
    for artifact in artifacts:
        prefix = artifact.artifact_id.split("-")[0]
        family = tmpl.PREFIX_FAMILY[prefix]
        slug = slugify(artifact.name)
        rubric = rubric_for(artifact)
        md_path = target / family / f"{artifact.artifact_id.lower()}-{slug}-rubric.md"
        json_path = target / family / f"{artifact.artifact_id.lower()}-{slug}-rubric.json"
        md_path.parent.mkdir(parents=True, exist_ok=True)
        md_path.write_text(markdown_for(rubric), encoding="utf-8")
        json_path.write_text(json.dumps(rubric, indent=2), encoding="utf-8")
        totals["artifact_level_checks"] += rubric["artifact_level_check_count"]
        totals["critic_seat_checks"] += rubric["critic_seat_check_count"]
        totals["total_checks"] += rubric["total_check_count"]
        index.append(
            {
                "artifact_id": artifact.artifact_id,
                "artifact_name": artifact.name,
                "family": family,
                "rubric_md": str(Path(family) / md_path.name).replace("\\", "/"),
                "rubric_json": str(Path(family) / json_path.name).replace("\\", "/"),
                "artifact_level_check_count": rubric["artifact_level_check_count"],
                "critic_seat_count": rubric["critic_seat_count"],
                "critic_seat_check_count": rubric["critic_seat_check_count"],
                "total_check_count": rubric["total_check_count"],
            }
        )
    (target / "index.json").write_text(json.dumps({"zero_slop_policy": ZERO_SLOP_POLICY, "items": index, "totals": totals}, indent=2), encoding="utf-8")
    readme = ZERO_SLOP_MD + f"""# DFMS Artifact Rubric Library

Generated artifact-specific quality rubrics for DFMS governed SDLC artifacts.

## Counts

- Governed artifact types: {len(index)}
- Artifact-level checks: {totals['artifact_level_checks']}
- Critic-seat checks: {totals['critic_seat_checks']}
- Total rubric checks: {totals['total_checks']}
- Markdown rubric files: {len(index)}
- JSON rubric files: {len(index)}

## How To Use

1. Select the artifact by ID.
2. Load its JSON rubric for scoring and its Markdown rubric for human-readable review.
3. Score all artifact-level checks.
4. Instantiate the artifact-specific 3-critic panel.
5. Score all 15 checks for each critic seat.
6. Require failed-point fix evidence or owner-approved residual-risk acceptance.
7. Link the completed scores to the Artifact Review Panel Record, Rubric Score Record, Refinery Gate, Trace Evidence, and Quality Certificate.

## Pass Rule

Artifact-level score and every critic-seat score must meet or exceed 96 percent. Critical checks require score 4 unless an explicit residual-risk acceptance exists.
"""
    (target / "README.md").write_text(readme, encoding="utf-8")


def main() -> None:
    artifacts = tmpl.parse_catalog()
    write_library(artifacts, OUT)
    write_library(artifacts, SKILL_OUT)
    total = len(artifacts)
    print(json.dumps({"status": "generated", "artifacts": total, "artifact_level_checks": total * 18, "critic_seat_checks": total * 45, "total_checks": total * 63, "workspace": str(OUT), "installed_skill": str(SKILL_OUT)}, indent=2))


if __name__ == "__main__":
    main()
