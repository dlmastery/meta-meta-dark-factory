#!/usr/bin/env python3
"""Generate DFMS artifact templates from the governed artifact catalog.

The output is intentionally verbose. Each artifact template is both:
- a fillable standards-mapped template, and
- a realistic miniature example showing how a future factory run should use it.
"""

from __future__ import annotations

import json
import re
import shutil
from dataclasses import dataclass
from pathlib import Path


WORKSPACE = Path(__file__).resolve().parents[2]
CATALOG = WORKSPACE / "dark-factory-meta-skills-design" / "03-artifact-catalog.md"
MATRIX = WORKSPACE / "dark-factory-meta-skills-design" / "35-artifact-specific-critic-panel-matrix.md"
OUT = WORKSPACE / "dark-factory-meta-skills-design" / "artifact-template-library"
SKILL_OUT = Path(r"C:\Users\abhir\.codex\skills\df-artifact-factory\assets\artifact-template-library")
ALLOWED_TARGETS = {
    OUT.resolve(),
    SKILL_OUT.resolve(),
}
ZERO_SLOP = "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS"
ZERO_SLOP_MD = f"> **{ZERO_SLOP}**\n> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.\n\n"
ZERO_SLOP_POLICY = {
    "statement": ZERO_SLOP,
    "strict_compliance": "Mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention.",
    "missing_evidence_rule": "If evidence is missing, mark it as an assumption, risk, open question, or failure.",
}


@dataclass
class Artifact:
    artifact_id: str
    name: str
    basis: str
    required_links: str
    reviewer_hint: str


PREFIX_FAMILY = {
    "GOV": "governance-management",
    "REQ": "requirements-product",
    "ARC": "architecture-design",
    "MDA": "mda-ddd-modeling",
    "DDD": "mda-ddd-modeling",
    "IMP": "implementation-build",
    "VNV": "verification-validation",
    "REL": "release-production-maintenance",
    "EVD": "evidence-certification",
}

FAMILY_METHODS = {
    "GOV": ["ISO/IEC/IEEE 12207 lifecycle governance", "ISO/IEC/IEEE 15289 information-item discipline", "RUP project management and change control", "DFMS engagement governance"],
    "REQ": ["SWEBOK requirements knowledge area", "ISO/IEC/IEEE 29148 requirements engineering", "RUP requirements discipline", "BDD/TDD acceptance modeling"],
    "ARC": ["SWEBOK architecture and design knowledge areas", "RUP analysis and design discipline", "secure-by-design practice", "SRE operability design"],
    "MDA": ["OMG Model Driven Architecture", "CIM/PIM/PSM transformation discipline", "UML/MOF-style model traceability", "DFMS transformation evidence"],
    "DDD": ["Domain-Driven Design strategic and tactical modeling", "bounded context and ubiquitous language discipline", "TDD-backed domain rules", "DFMS model traceability"],
    "IMP": ["SWEBOK construction knowledge area", "RUP implementation discipline", "NIST SSDF secure production practices", "CI/CD and supply-chain evidence"],
    "VNV": ["SWEBOK testing and quality knowledge areas", "ISO verification and validation process thinking", "TDD/BDD evidence loops", "holdout and transfer-test discipline"],
    "REL": ["RUP transition discipline", "SRE production readiness", "incident management and maintenance practice", "human-owned operations handoff"],
    "EVD": ["ISO/IEC/IEEE 15289 record discipline", "DFMS refinery gates and certificates", "bidirectional traceability", "audit-ready evidence management"],
}

FAMILY_CANVAS = {
    "GOV": [
        ("Governance Intent", "State the management decision, lifecycle process, authority, and project risk this artifact controls."),
        ("Scope and Tailoring", "Define included/excluded lifecycle areas, method tailoring, waivers, and residual-risk ownership."),
        ("Authority Model", "Name client owner, dark-factory delivery owner, approvers, reviewers, escalation path, and reapproval triggers."),
        ("Token and Change Impact", "Capture token SWAG, iteration boundary, budget assumptions, and change-control thresholds."),
        ("Governance Evidence", "List records, approvals, control graph nodes, ledger items, certificates, and audit links."),
    ],
    "REQ": [
        ("Customer Intent Source", "Link every requirement branch to interview answer IDs, approved assumptions, or source transcript passages."),
        ("Requirement Decomposition", "Break the artifact into capabilities, scenarios, NFRs, edge cases, and independently testable leaves."),
        ("Acceptance Model", "Define acceptance criteria, examples, negative cases, holdouts, and transfer tests."),
        ("Conflict and Completeness Handling", "Record contradictions, completeness score, re-interrogation triggers, and customer approvals."),
        ("Downstream Allocation", "Map requirements to design, tests, operations, support, and project-book records."),
    ],
    "ARC": [
        ("Architecture Context", "State drivers, architecturally significant requirements, constraints, and quality attributes."),
        ("Design Structure", "Describe boundaries, responsibilities, data/control flows, interfaces, and dependency direction."),
        ("Alternatives and Tradeoffs", "Compare viable alternatives, rejected options, decision rationale, reversibility, and consequences."),
        ("Failure, Security, and Operations", "Capture threat boundaries, failure modes, observability, degradation, and rollback considerations."),
        ("Implementation and Verification Hooks", "Map design elements to code modules, tests, migration steps, and acceptance evidence."),
    ],
    "MDA": [
        ("Model Scope", "Define which business concepts, behaviors, constraints, and stakeholders the model covers."),
        ("Model Elements", "List entities, value objects, services, interactions, state, events, constraints, and diagrams."),
        ("Transformation Links", "Trace CIM, PIM, PSM, exceptions, losses, platform decisions, and transformation rationale."),
        ("Model Consistency", "Check terminology, invariants, interfaces, quality attributes, and stakeholder validation."),
        ("Model Verification", "Map model elements to requirements, tests, code, data, and review evidence."),
    ],
    "DDD": [
        ("Domain Discovery", "State domain goals, subdomains, stakeholder language, events, policies, and business rules."),
        ("Bounded Context Design", "Define context boundaries, ownership, context relationships, translations, and integration style."),
        ("Tactical Model", "Describe aggregates, entities, value objects, repositories, services, invariants, and domain events."),
        ("Language and Consistency", "Show how ubiquitous language appears in requirements, APIs, code, tests, and support language."),
        ("Domain Verification", "Map invariants and scenarios to tests, examples, edge cases, and operational monitoring."),
    ],
    "IMP": [
        ("Implementation Scope", "State change set, modules, dependencies, repo conventions, migration impact, and excluded work."),
        ("Build and Configuration", "Capture build path, environment assumptions, config, dependency policy, and automation."),
        ("Secure Construction", "Address input validation, secrets, auth, data handling, dependency risk, and abuse cases."),
        ("Test and Review Evidence", "Map code to requirements, tests, static checks, CI logs, review findings, and fixes."),
        ("Rollback and Maintainability", "Record backout plan, safe-change guidance, known debt, and future maintainer notes."),
    ],
    "VNV": [
        ("Verification Scope", "Define risks, requirements, artifact versions, environments, and excluded areas."),
        ("Test Design", "Specify levels, procedures, data, fixtures, negative cases, edge cases, and accessibility/security/NFR coverage."),
        ("Execution Evidence", "Record commands, logs, screenshots, reports, result interpretation, failures, and rerun instructions."),
        ("Coverage and Gaps", "Map results to requirements, risks, code, design, and residual gaps."),
        ("Exit Decision", "State pass/fail/conditional verdict, fixes, owner, revalidation, and certificate linkage."),
    ],
    "REL": [
        ("Transition Scope", "State release/change scope, audience, environments, timing, dependencies, and readiness assumptions."),
        ("Operational Procedure", "Provide step-by-step deployment, rollback, monitoring, support, and incident response instructions."),
        ("Human Readiness", "Define training, operator signoff, support readiness, customer communication, and escalation."),
        ("Known Issues and Risk", "List residual risks, no-go criteria, accepted limitations, and revalidation triggers."),
        ("Post-Release Learning", "Capture feedback, incidents, metrics, maintenance actions, and project-book updates."),
    ],
    "EVD": [
        ("Evidence Scope", "Define what claim, artifact, change, or gate this record proves."),
        ("Evidence Inventory", "List source files, links, logs, decisions, reviewer records, tests, certificates, hashes, and approvals."),
        ("Trace Closure", "Show forward and reverse links across intent, requirements, design, code, tests, operations, and risks."),
        ("Decision and Residual Risk", "Record verdict, conditions, waivers, residual risk, owner, expiry, and revalidation trigger."),
        ("Replay and Auditability", "Explain how a fresh reviewer can verify, rerun, or resume from this record."),
    ],
}

ARTIFACT_FOCUS = {
    "GOV-001": ["business case boundaries", "stakeholder map", "success measures", "scope exclusions", "project viability decision"],
    "GOV-002": ["included standards", "excluded standards", "tailoring rationale", "information-item mapping", "waiver policy"],
    "GOV-003": ["accountable owners", "approval authority", "agent/human handoff", "segregation of duties", "escalation path"],
    "GOV-004": ["risk triggers", "probability and impact", "mitigation owner", "contingency", "residual-risk acceptance"],
    "GOV-005": ["change classes", "impact analysis", "approval route", "token re-estimation", "baseline update"],
    "GOV-006": ["quality thresholds", "rubric model", "review cadence", "certificate policy", "defect escape handling"],
    "GOV-007": ["agent authority", "model-use policy", "data exposure", "human override", "monitoring and audit"],
    "GOV-008": ["lifecycle nodes", "gates", "skill routing", "re-entry paths", "evidence outputs"],
    "GOV-009": ["work item schema", "durable state", "owner/status", "evidence pointers", "resume query fields"],
    "GOV-010": ["attractor state", "requirement field", "selected mode", "waivers", "next safe action"],
    "GOV-011": ["method mix", "method conflicts", "graph compilation", "method-specific gates", "evidence commitments"],
    "REQ-001": ["business outcomes", "stakeholder needs", "capability map", "success metrics", "business constraints"],
    "REQ-002": ["functional requirements", "NFR allocation", "interfaces", "acceptance links", "requirement attributes"],
    "REQ-003": ["availability", "performance", "security", "privacy", "operability thresholds"],
    "REQ-004": ["user scenarios", "acceptance criteria", "negative cases", "holdouts", "journey coverage"],
    "REQ-005": ["term definitions", "bounded-context meaning", "aliases", "forbidden synonyms", "code/test naming links"],
    "REQ-006": ["assumption owner", "confidence level", "constraint type", "decision impact", "revalidation trigger"],
    "REQ-007": ["interview rounds", "answer IDs", "contradiction scoring", "approval mechanics", "re-interrogation triggers"],
    "REQ-008": ["decomposition tree", "parent-child coverage", "atomic leaves", "completeness score", "leaf acceptance tests"],
    "ARC-001": ["system boundaries", "logical view", "deployment view", "failure modes", "architecture alternatives"],
    "ARC-002": ["component contracts", "algorithms", "data structures", "API details", "test seams"],
    "ARC-003": ["decision context", "alternatives", "chosen option", "consequences", "reversal conditions"],
    "ARC-004": ["contract schema", "error model", "auth/authz", "versioning", "consumer tests"],
    "ARC-005": ["entities", "relationships", "migration steps", "privacy handling", "reconciliation checks"],
    "ARC-006": ["assets", "actors", "trust boundaries", "abuse cases", "mitigations"],
    "ARC-007": ["SLIs", "logs", "metrics", "traces", "alerts and dashboards"],
    "MDA-001": ["business process", "actors", "business concepts", "constraints", "technology-free behavior"],
    "MDA-002": ["logical services", "platform-neutral interfaces", "behavior model", "quality constraints", "CIM preservation"],
    "MDA-003": ["runtime stack", "module mapping", "deployment units", "config", "platform constraints"],
    "MDA-004": ["mapping table", "transformation rule", "exception", "lost information", "verification evidence"],
    "DDD-001": ["bounded contexts", "context relationships", "upstream/downstream", "translation", "ownership"],
    "DDD-002": ["aggregates", "invariants", "commands", "events", "business-rule tests"],
    "DDD-003": ["external model", "adapter", "translation rule", "contract test", "failure isolation"],
    "IMP-001": ["work packages", "sequencing", "dependencies", "token estimate", "definition of done"],
    "IMP-002": ["changed files", "behavior change", "tests", "review findings", "security impact"],
    "IMP-003": ["dependencies", "lockfiles", "SBOM", "build logs", "license/security checks"],
    "IMP-004": ["environments", "configuration keys", "secrets policy", "validation", "drift control"],
    "IMP-005": ["migration runbook", "dry run", "validation query", "rollback", "cutover window"],
    "VNV-001": ["test levels", "risk coverage", "automation strategy", "manual checks", "exit criteria"],
    "VNV-002": ["preconditions", "test steps", "expected results", "test data", "rerun notes"],
    "VNV-003": ["execution logs", "CI run", "coverage", "flake analysis", "failure triage"],
    "VNV-004": ["hidden scenario", "anti-gaming", "transfer test", "score", "claim supported"],
    "VNV-005": ["security test scope", "findings", "severity", "retest", "residual risk"],
    "VNV-006": ["load model", "SLI results", "capacity", "bottlenecks", "reliability decision"],
    "VNV-007": ["keyboard access", "screen reader", "contrast", "task completion", "state coverage"],
    "REL-001": ["release scope", "go/no-go", "deployment sequence", "rollback", "communication"],
    "REL-002": ["user-facing changes", "known issues", "upgrade notes", "support impact", "risk notes"],
    "REL-003": ["deployment steps", "prechecks", "postchecks", "rollback", "ownership"],
    "REL-004": ["alert response", "dashboard", "diagnosis", "mitigation", "escalation"],
    "REL-005": ["severity", "incident roles", "containment", "communications", "post-incident review"],
    "REL-006": ["code map", "common changes", "regression commands", "operational tasks", "maintenance risks"],
    "REL-007": ["training goals", "walkthrough", "exercises", "comprehension checks", "signoff"],
    "REL-008": ["outage scenario", "operator actions", "timing", "signoff", "learning gaps"],
    "EVD-001": ["trace classes", "forward links", "reverse links", "gaps", "closure status"],
    "EVD-002": ["persona declarations", "independent proposals", "cross critiques", "votes", "dissent"],
    "EVD-003": ["3 reviewers", "15 checks", "scores", "failed points", "fix evidence"],
    "EVD-004": ["artifact verdict", "thresholds", "evidence bundle", "conditions", "expiry"],
    "EVD-005": ["hashes", "commits", "generation logs", "source references", "reproducibility"],
    "EVD-006": ["risk owner", "accepted risk", "mitigation", "expiry", "monitoring"],
    "EVD-007": ["core checks", "test evidence", "trace evidence", "rubric evidence", "gate verdict"],
    "EVD-008": ["async comments", "confidence framing", "disagreement handling", "feedback incorporation", "approval"],
    "EVD-009": ["current node", "predecessor decisions", "evidence index", "replay drill", "next action"],
    "EVD-010": ["lesson", "root cause", "process update", "regression check", "future trigger"],
}

SAMPLE = {
    "project": "CareQueue Pro",
    "summary": "a fictional multi-tenant care-coordination platform for outpatient clinics that manages referral intake, waitlist triage, SMS reminders, escalation tasks, and clinic operations dashboards",
    "customer": "Northstar Clinics pilot network",
    "release": "Pilot Release 0.3",
    "scope": "referral intake, nurse review queue, patient reminder workflow, and operations dashboard for three clinics",
    "risk": "handles PHI-like sensitive health data, clinic staffing decisions, external SMS delivery, and future EHR integration",
    "trace": "INT-ANS-014 -> REQ-032 -> ARC-API-006 -> TST-ACPT-019 -> REL-GO-004",
}

STANDARDS_NOTE = """\
- SWEBOK V4 knowledge areas are used as the broad software engineering body-of-knowledge frame.
- ISO/IEC/IEEE 12207 is used as the software lifecycle process anchor.
- ISO/IEC/IEEE 15289 is used as the life-cycle information-item/documentation anchor.
- ISO/IEC/IEEE 29148 is used for requirements artifacts and requirement quality.
- RUP is used as an iterative, risk-driven lifecycle and artifact/work-product inspiration.
- OMG MDA is used for CIM/PIM/PSM and model transformation artifacts.
- DDD is used for ubiquitous language, bounded contexts, aggregates, and domain invariants.
- NIST SSDF is used for secure development and supply-chain overlays.
"""


def slugify(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def parse_catalog() -> list[Artifact]:
    artifacts: list[Artifact] = []
    for line in CATALOG.read_text(encoding="utf-8").splitlines():
        if not re.match(r"^\| [A-Z]+-\d{3} \|", line):
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        artifacts.append(Artifact(cells[0], cells[1], cells[2], cells[3], cells[4]))
    return artifacts


def critic_rows_for(artifact: Artifact) -> list[str]:
    matrix = MATRIX.read_text(encoding="utf-8")
    pattern = re.compile(rf"^\| {re.escape(artifact.artifact_id)} [^|]+\|(.+)\|$", re.M)
    match = pattern.search(matrix)
    if not match:
        return [
            "Content authority critic: derive from artifact purpose.",
            "Governance and trace critic: derive from standards and required links.",
            "Verification and handoff critic: derive from evidence and future-use needs.",
        ]
    cells = [cell.strip() for cell in match.group(0).strip("|").split("|")]
    return cells[1:4]


def parse_critic_cell(cell: str, fallback_id: str) -> tuple[str, str]:
    if ":" in cell:
        head, body = cell.split(":", 1)
        return head.strip(), body.strip()
    return fallback_id, cell.strip()


def numbered(items: list[str]) -> str:
    return "\n".join(f"{idx}. {item}" for idx, item in enumerate(items, start=1))


def bullet(items: list[str]) -> str:
    return "\n".join(f"- {item}" for item in items)


def template_for(artifact: Artifact) -> str:
    prefix = artifact.artifact_id.split("-")[0]
    family = PREFIX_FAMILY[prefix]
    focus = ARTIFACT_FOCUS.get(artifact.artifact_id, ["scope", "owners", "evidence", "risks", "handoff"])
    methods = FAMILY_METHODS[prefix]
    canvas = FAMILY_CANVAS[prefix]
    critics = critic_rows_for(artifact)
    artifact_slug = slugify(artifact.name)
    title = f"{artifact.artifact_id} {artifact.name}"

    focus_checks = [
        f"Artifact captures {item} with owner, evidence, and trace links." for item in focus
    ]
    while len(focus_checks) < 15:
        focus_checks.append(
            [
                "All source intent links are present and bidirectional.",
                "All assumptions have owner, confidence, and revalidation trigger.",
                "All decisions include alternatives, rationale, and consequences.",
                "All evidence is concrete, inspectable, and not merely a template.",
                "All residual risks have owner, expiry, and acceptance state.",
                "A future human or agent can resume without hidden context.",
                "The artifact has version, date, lifecycle stage, and change history.",
                "The artifact-specific critic panel is instantiated and linked.",
                "The artifact is concise enough to use but complete enough to audit.",
                "The artifact avoids unsupported compliance or quality claims.",
            ][(len(focus_checks) - len(focus)) % 10]
        )

    canvas_md = "\n".join(
        f"### {name}\n\n**Fill:** {instruction}\n\n**Example:** In {SAMPLE['project']}, record how `{focus[min(i, len(focus)-1)]}` affects {SAMPLE['scope']}.\n"
        for i, (name, instruction) in enumerate(canvas)
    )

    example_entries = [
        f"Project: {SAMPLE['project']} ({SAMPLE['release']})",
        f"Scenario: {SAMPLE['summary']}.",
        f"Customer: {SAMPLE['customer']}.",
        f"Scope slice: {SAMPLE['scope']}.",
        f"Primary risk: {SAMPLE['risk']}.",
        f"Example trace: {SAMPLE['trace']}.",
        f"Artifact-specific focus: {', '.join(focus)}.",
        f"Example decision: accept this artifact only after the {artifact.reviewer_hint} panel resolves failed points and links evidence to the refinery gate.",
    ]

    critic_md = "\n".join(f"{idx}. {critic}" for idx, critic in enumerate(critics, start=1))

    return ZERO_SLOP_MD + f"""# {title} Template

Status: template plus fictional worked example.

Template family: `{family}`.

Use this template when a DFMS factory run needs `{artifact.name}` as a governed SDLC artifact. The template is intentionally standards-based, trace-first, and reviewable by an artifact-specific critic panel.

## Standards and Method Anchors

Primary basis from catalog: {artifact.basis}.

Family anchors:

{bullet(methods)}

Global anchors:

{STANDARDS_NOTE}

## Artifact Identity

| Field | Fill |
| --- | --- |
| Artifact ID | {artifact.artifact_id} |
| Artifact name | {artifact.name} |
| Project/product | `<project name>` |
| Lifecycle phase | `<inception/elaboration/construction/transition/operation/maintenance>` |
| Control graph node | `<node id>` |
| Work ledger item | `<ledger id>` |
| Version/date | `<version> / <YYYY-MM-DD>` |
| Author | `<agent or human>` |
| Accountable owner | `<human owner>` |
| Approval authority | `<person/role>` |
| Status | `<planned/drafted/reviewing/rework/accepted/deferred/retired>` |

## When To Use

Use this artifact when:

- the project risk, contract, lifecycle stage, or handoff requires explicit `{artifact.name}` evidence;
- downstream artifacts or code depend on this information;
- a future human or agent must be able to inspect, verify, or resume the work;
- the artifact has material impact on scope, quality, production, security, budget, or customer approval.

Tailor or combine only when the combined artifact preserves every required section, trace link, critic review, and evidence item.

## Required Inputs

- Source intent: customer transcript, answer IDs, approved assumptions, or issue/change request.
- Current control graph node and work-ledger item.
- Standards tailoring decision and applicable lifecycle phase.
- Related artifacts: {artifact.required_links}.
- Current risks, decisions, open questions, and residual-risk records.
- Required reviewers: {artifact.reviewer_hint}.

## Required Links

Catalog required links: {artifact.required_links}.

Minimum DFMS links:

- customer answer IDs or approved assumptions;
- requirements or change intent;
- decisions and rejected alternatives;
- risks and residual-risk owner;
- related design/code/test/operations artifacts;
- artifact-specific critic panel record;
- rubric score record;
- refinery gate record;
- quality certificate or conditional certificate;
- handoff note and project-book index entry.

## Fillable Template

### 1. Executive Artifact Summary

**Fill:** One dense paragraph explaining what this artifact decides, proves, or enables. Include lifecycle phase, scope boundary, and owner.

**Example:** `{artifact.name}` for {SAMPLE['project']} covers {SAMPLE['scope']} and is owned by the clinic operations product owner with DFMS delivery accountability.

### 2. Source Intent and Scope Boundary

**Fill:**

- source answer IDs or transcript references;
- in-scope items;
- out-of-scope items;
- deferred items;
- assumptions;
- constraints;
- approval state.

**Example:** `INT-ANS-014` says nurses need a same-day triage queue; EHR writeback is out of scope for {SAMPLE['release']}.

{canvas_md}

### Traceability Map

| Source | Requirement/decision | Artifact element | Evidence | Status |
| --- | --- | --- | --- | --- |
| `<answer id>` | `<requirement/decision id>` | `<section/table/diagram>` | `<test/review/log/link>` | `<open/pass/rework>` |
| INT-ANS-014 | REQ-032 | `{artifact.name}` focus: {focus[0]} | TST-ACPT-019, REV-{artifact.artifact_id}-001 | Example only |

### Decisions and Alternatives

| Decision | Alternatives considered | Chosen option | Rationale | Consequence | Reversal trigger |
| --- | --- | --- | --- | --- | --- |
| `<decision>` | `<options>` | `<chosen>` | `<why>` | `<impact>` | `<trigger>` |
| Example for {SAMPLE['project']} | Manual spreadsheet, queue module, EHR plugin | Queue module | fastest pilot learning with controlled privacy boundary | later EHR adapter needed | pilot rejects duplicate workflow |

### Risks, Assumptions, and Constraints

| ID | Type | Statement | Owner | Mitigation/evidence | Revalidation trigger |
| --- | --- | --- | --- | --- | --- |
| `<risk id>` | `<risk/assumption/constraint>` | `<statement>` | `<owner>` | `<mitigation>` | `<trigger>` |
| RISK-CQ-007 | Risk | SMS delivery delays may affect appointment reminders | SRE lead | delivery telemetry and manual fallback runbook | delivery failure above agreed threshold |

### Artifact-Specific Completion Rubric

Score each item 0 to 4 before expert review.

{numbered(focus_checks[:15])}

### Artifact-Specific Critic Panel

Instantiate these critic seats from `35-artifact-specific-critic-panel-matrix.md`.

{critic_md}

Each critic must provide:

- full elite persona contract;
- independent review;
- exactly 15 scored checks;
- adversarial critique of another critic's assumptions;
- failed-point fix evidence;
- pass/revise/fail/split/escalate vote;
- handoff note.

Every governed artifact must also include:

- at least 2 adversarial critics: Anti-Slop Red Team and Failure-Mode/Reality Critic;
- at least 5 RALPH loops: Review, Attack, Learn, Patch, Harden;
- evidence that adversarial critics stood down or escalated unresolved risk;
- proof that token savings were not used to reduce review depth.

### Evidence Bundle

| Evidence item | Path/link | Produced by | Reviewer | Result |
| --- | --- | --- | --- | --- |
| `<evidence>` | `<path>` | `<owner>` | `<critic>` | `<pass/rework>` |
| Example review panel | `reviews/{artifact.artifact_id.lower()}-panel.json` | DFMS quality refinery | artifact-specific critics | example only |

### Handoff Notes

**Human handoff:** `<what the human owner must know, approve, operate, or revisit>`.

**Agent handoff:** `<what the next Codex session must load first, what not to change, and what evidence is authoritative>`.

**Re-entry triggers:** `<conditions that reopen this artifact>`.

### Change History

| Version | Date | Change | Owner | Evidence |
| --- | --- | --- | --- | --- |
| 0.1 | `<YYYY-MM-DD>` | Initial draft | `<owner>` | `<link>` |

## Worked Mini-Example

This example is fictional. It exists to show the expected level of specificity, not to define the future project.

{bullet(example_entries)}

### Example Artifact Snippet

> For {SAMPLE['project']}, the `{artifact.name}` records that the pilot must support referral intake and nurse triage for three clinics while deferring EHR writeback. The artifact links {SAMPLE['trace']} and remains conditional until the artifact-specific critic panel confirms `{focus[0]}`, `{focus[1]}`, and `{focus[2]}` with evidence.

### Example Review Outcome

- Content authority critic: conditional pass pending one fix to `{focus[0]}`.
- Governance and trace critic: revise until answer IDs are linked to all material claims.
- Verification and handoff critic: revise until rerun evidence and handoff notes are complete.

## Anti-Patterns To Reject

- Generic content that could apply to any project.
- Standards named without concrete artifact sections or evidence.
- Example data left in the real artifact.
- Reviewer hints treated as actual completed reviews.
- Pass certificate without artifact-specific critic panel proof.
- Requirements, decisions, or risks without owner and trace.
- Template text used as evidence.
"""


def example_for(artifact: Artifact) -> str:
    focus = ARTIFACT_FOCUS.get(artifact.artifact_id, ["scope", "owners", "evidence", "risks", "handoff"])
    prefix = artifact.artifact_id.split("-")[0]
    methods = FAMILY_METHODS[prefix]
    return ZERO_SLOP_MD + f"""# {artifact.artifact_id} {artifact.name} Worked Example

Status: fictional training example, not project evidence.

Project: {SAMPLE['project']}.

Release: {SAMPLE['release']}.

Scenario: {SAMPLE['summary']}.

## Example Context

{SAMPLE['customer']} wants a controlled pilot for {SAMPLE['scope']}. The project handles {SAMPLE['risk']}. This example shows the level of specificity expected when instantiating `{artifact.name}`.

## Example Standards Basis

Catalog basis: {artifact.basis}.

Methods/practices used:

{bullet(methods)}

## Example Artifact Summary

The `{artifact.name}` for {SAMPLE['project']} records how the pilot will treat {', '.join(focus[:3])}. It is linked to `{SAMPLE['trace']}` and remains non-authoritative until the real customer approves the project-specific version.

## Example Content Entries

| Field | Example value |
| --- | --- |
| Control graph node | CG-CQ-PILOT-REQ-03 |
| Work ledger item | WL-CQ-{artifact.artifact_id}-001 |
| Accountable owner | Maya Patel, fictional clinic operations sponsor |
| Delivery owner | DFMS delivery lead |
| Review panel | {artifact.reviewer_hint} mapped to artifact-specific critic seats |
| Primary evidence | interview notes, trace matrix, acceptance tests, review panel, refinery gate |
| Residual risk | PHI-like data handling and SMS delivery require security and operator readiness checks |

## Example Focus Details

{bullet([f'{item}: example value recorded for the CareQueue pilot with owner, trace, evidence, and revalidation trigger.' for item in focus])}

## Example Trace Slice

| Source | Requirement | Artifact element | Evidence | Status |
| --- | --- | --- | --- | --- |
| INT-ANS-014 | REQ-032 | {focus[0]} | TST-ACPT-019 | example only |
| INT-ANS-021 | NFR-SEC-004 | {focus[min(1, len(focus)-1)]} | SEC-REV-006 | example only |
| DEC-CQ-003 | ARC-ADR-002 | {focus[min(2, len(focus)-1)]} | REV-{artifact.artifact_id}-001 | example only |

## Example Review Notes

- Content authority critic asks whether `{focus[0]}` is specific enough to guide downstream work.
- Governance and trace critic asks whether all example claims trace to answer IDs or approved assumptions.
- Verification and handoff critic asks whether a new human can verify this artifact without the original author.

## Example Warning

Do not copy this example into a real project as evidence. Replace it with real source intent, real decisions, real tests, real reviews, and real approvals.
"""


def panel_stub_for(artifact: Artifact) -> str:
    focus = ARTIFACT_FOCUS.get(artifact.artifact_id, ["scope", "owners", "evidence", "risks", "handoff"])
    critics = []
    for index, cell in enumerate(critic_rows_for(artifact), start=1):
        seat, mandate = parse_critic_cell(cell, f"{artifact.artifact_id}-C{index}")
        critics.append(
            {
                "critic_seat_id": seat,
                "base_persona": "example only - choose the matching elite persona from df-swarm-coordination/references/role-roster.md",
                "persona_summary": f"example only - specialist critic for {artifact.name}",
                "seniority_bar": "example only - senior industry reviewer with authority to reject weak evidence",
                "artifact_specific_mandate": f"example only - {mandate}",
                "decision_rights": ["example only - pass", "revise", "fail", "split", "escalate"],
                "primary_lens": f"example only - {focus[min(index - 1, len(focus)-1)]}",
                "non_negotiables": [
                    "example only - no unsupported claims",
                    "example only - no missing owner or trace",
                    "example only - no pass without concrete evidence",
                ],
                "signature_questions": [
                    f"example only - does this artifact prove {focus[0]}?",
                    "example only - what evidence would change the critic's vote?",
                    "example only - can a future human resume from this record?",
                ],
                "red_flags": [
                    "example only - generic language",
                    "example only - template text treated as proof",
                    "example only - missing failed-point fix evidence",
                ],
                "artifact_checks": [
                    f"example only - verify {item} with owner, trace, and evidence" for item in focus
                ],
                "adversarial_challenge": "example only - challenge another critic's assumption before synthesis",
                "evidence_required_for_pass": [
                    "example only - artifact-specific evidence bundle",
                    "example only - rubric score record",
                    "example only - refinery gate",
                ],
                "independent_review_required": True,
                "handoff_note": "example only - replace with real reviewer handoff note",
            }
        )
    return json.dumps(
        {
            "zero_slop_policy": ZERO_SLOP_POLICY,
            "id": f"EXAMPLE-ONLY-{artifact.artifact_id}-PANEL",
            "artifact_id": artifact.artifact_id,
            "artifact_name": artifact.name,
            "artifact_path": f"example only - project-book/{artifact.artifact_id.lower()}-{slugify(artifact.name)}.md",
            "control_graph_node": "example only - CG-CQ-001",
            "work_ledger_item": f"example only - WL-CQ-{artifact.artifact_id}-001",
            "panel_source": "references/artifact-critic-panel-matrix.md",
            "panel_selection_rationale": "example only - selected from artifact-specific critic matrix",
            "coverage_model": {
                "content_authority": True,
                "governance_and_trace": True,
                "verification_and_handoff": True,
            },
            "critics": critics,
            "adversarial_critics": [
                {
                    "critic_id": "ANTI-SLOP-RED-TEAM",
                    "base_persona": "example only - anti-slop red team critic",
                    "persona_summary": "example only - attacks generic filler, unsupported claims, template residue, false certainty, and evidence mismatch",
                    "seniority_bar": "example only - elite assurance reviewer with authority to block slop",
                    "attack_mandate": "example only - beat the artifact until every claim has evidence",
                    "non_negotiables": [
                        "example only - no generic filler",
                        "example only - no template residue",
                        "example only - no unsupported quality claims",
                    ],
                    "attack_questions": [
                        "example only - what claim is not proven?",
                        "example only - what text could apply to any project?",
                        "example only - what evidence is fake or stale?",
                    ],
                    "red_flags": [
                        "example only - vague confidence",
                        "example only - example data as proof",
                        "example only - missing trace",
                    ],
                    "evidence_required_to_stand_down": [
                        "example only - fixed artifact",
                        "example only - trace evidence",
                        "example only - re-review evidence",
                    ],
                    "independent_review_required": True,
                    "handoff_note": "example only - replace with real adversarial critic handoff",
                },
                {
                    "critic_id": "FAILURE-MODE-REALITY-CRITIC",
                    "base_persona": "example only - failure-mode reality critic",
                    "persona_summary": "example only - attacks real-world failure modes, edge cases, operations, support, adoption, and maintainability",
                    "seniority_bar": "example only - elite production and delivery reviewer with authority to block fragile artifacts",
                    "attack_mandate": "example only - find embarrassing counterexamples and operational breakdowns",
                    "non_negotiables": [
                        "example only - no happy-path-only artifact",
                        "example only - no unowned operational risk",
                        "example only - no handoff that requires the original author",
                    ],
                    "attack_questions": [
                        "example only - how does this fail in production?",
                        "example only - what would support or operations not understand?",
                        "example only - what edge case breaks the claim?",
                    ],
                    "red_flags": [
                        "example only - missing edge cases",
                        "example only - missing operator path",
                        "example only - untested failure mode",
                    ],
                    "evidence_required_to_stand_down": [
                        "example only - failure-mode coverage",
                        "example only - handoff proof",
                        "example only - rerun evidence",
                    ],
                    "independent_review_required": True,
                    "handoff_note": "example only - replace with real failure-mode critic handoff",
                },
            ],
            "minimum_adversarial_critics": 2,
            "minimum_ralph_loops": 5,
            "ralph_loop_record": f"example only - reviews/{artifact.artifact_id.lower()}-ralph-loop.json",
            "specialist_expansion": {
                "needed": False,
                "reason": "example only - add specialists if real project risk requires it",
                "added_critics": [],
            },
            "cross_critique_required": True,
            "rubric_score_record": f"example only - reviews/{artifact.artifact_id.lower()}-rubric.json",
            "refinery_gate": f"example only - gates/{artifact.artifact_id.lower()}-gate.yaml",
            "trace_evidence": [f"example only - trace/{artifact.artifact_id.lower()}-trace.json"],
            "status": "example-only",
        },
        indent=2,
    )


def write_library(artifacts: list[Artifact], target: Path) -> None:
    resolved = target.resolve()
    if resolved not in ALLOWED_TARGETS:
        raise SystemExit(f"Refusing to rewrite unexpected template target: {resolved}")
    if target.exists():
        shutil.rmtree(target)
    target.mkdir(parents=True, exist_ok=True)

    index = []
    for artifact in artifacts:
        prefix = artifact.artifact_id.split("-")[0]
        family = PREFIX_FAMILY[prefix]
        rel_dir = Path(family)
        filename = f"{artifact.artifact_id.lower()}-{slugify(artifact.name)}.md"
        out_path = target / rel_dir / filename
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(template_for(artifact), encoding="utf-8")
        example_path = target / "examples" / rel_dir / f"{artifact.artifact_id.lower()}-{slugify(artifact.name)}-carequeue-example.md"
        example_path.parent.mkdir(parents=True, exist_ok=True)
        example_path.write_text(example_for(artifact), encoding="utf-8")
        panel_path = target / "review-panel-starters" / rel_dir / f"{artifact.artifact_id.lower()}-{slugify(artifact.name)}-panel-example.json"
        panel_path.parent.mkdir(parents=True, exist_ok=True)
        panel_path.write_text(panel_stub_for(artifact), encoding="utf-8")
        index.append(
            {
                "artifact_id": artifact.artifact_id,
                "name": artifact.name,
                "family": family,
                "basis": artifact.basis,
                "required_links": artifact.required_links,
                "reviewer_hint": artifact.reviewer_hint,
                "template_path": str(Path(family) / filename).replace("\\", "/"),
                "example_path": str(Path("examples") / family / example_path.name).replace("\\", "/"),
                "panel_starter_path": str(Path("review-panel-starters") / family / panel_path.name).replace("\\", "/"),
            }
        )

    (target / "index.json").write_text(json.dumps(index, indent=2), encoding="utf-8")
    by_family: dict[str, list[dict]] = {}
    for item in index:
        by_family.setdefault(item["family"], []).append(item)
    family_lines = []
    for family, items in sorted(by_family.items()):
        family_lines.append(f"### {family}\n")
        for item in items:
            family_lines.append(f"- `{item['artifact_id']}` [{item['name']}]({item['template_path']})")
        family_lines.append("")

    readme = ZERO_SLOP_MD + f"""# DFMS Artifact Template Library

Generated from `03-artifact-catalog.md` and `35-artifact-specific-critic-panel-matrix.md`.

This library contains one comprehensive template per governed artifact type. Each template includes fillable sections, standards/method anchors, required trace links, artifact-specific completion rubrics, an artifact-specific 3-critic panel, evidence bundle expectations, handoff notes, and a fictional worked example using `{SAMPLE['project']}`.

## Counts

- Governed artifact types: {len(index)}
- Required primary critic seats: {len(index) * 3}
- Core template files: {len(index)}
- Worked example files: {len(index)}
- Artifact review panel starter files: {len(index)}
- Total generated template assets: {len(index) * 3}

## Standards Anchors

{STANDARDS_NOTE}

## How To Use

1. Select the artifact by ID from `index.json`.
2. Copy or instantiate the core template into the project book.
3. Use the worked example only as a specificity benchmark.
4. Replace all fillable markers with project-specific content.
5. Remove fictional example text from the real artifact or mark it as training-only appendix.
6. Create an Artifact Review Panel Record from the artifact-specific critic matrix.
7. Use the review-panel starter only as a shape example; it intentionally contains "example only" markers and must not pass as real evidence.
8. Run 3 independent 15-check expert reviews.
9. Link the artifact to trace evidence, refinery gate, and quality certificate.

## Template Index

{chr(10).join(family_lines)}
"""
    (target / "README.md").write_text(readme, encoding="utf-8")


def main() -> None:
    artifacts = parse_catalog()
    if len(artifacts) < 60:
        raise SystemExit(f"Expected at least 60 artifacts, found {len(artifacts)}")
    write_library(artifacts, OUT)
    write_library(artifacts, SKILL_OUT)
    print(json.dumps({"status": "generated", "artifacts": len(artifacts), "critic_seats": len(artifacts) * 3, "template_assets": len(artifacts) * 3, "workspace": str(OUT), "installed_skill": str(SKILL_OUT)}, indent=2))


if __name__ == "__main__":
    main()
