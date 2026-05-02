> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# ARC-006 Threat Model Template

Status: template plus fictional worked example.

Template family: `architecture-design`.

Use this template when a DFMS factory run needs `Threat Model` as a governed SDLC artifact. The template is intentionally standards-based, trace-first, and reviewable by an artifact-specific critic panel.

## Standards and Method Anchors

Primary basis from catalog: SSDF, OWASP SAMM.

Family anchors:

- SWEBOK architecture and design knowledge areas
- RUP analysis and design discipline
- secure-by-design practice
- SRE operability design

Global anchors:

- SWEBOK V4 knowledge areas are used as the broad software engineering body-of-knowledge frame.
- ISO/IEC/IEEE 12207 is used as the software lifecycle process anchor.
- ISO/IEC/IEEE 15289 is used as the life-cycle information-item/documentation anchor.
- ISO/IEC/IEEE 29148 is used for requirements artifacts and requirement quality.
- RUP is used as an iterative, risk-driven lifecycle and artifact/work-product inspiration.
- OMG MDA is used for CIM/PIM/PSM and model transformation artifacts.
- DDD is used for ubiquitous language, bounded contexts, aggregates, and domain invariants.
- NIST SSDF is used for secure development and supply-chain overlays.


## Artifact Identity

| Field | Fill |
| --- | --- |
| Artifact ID | ARC-006 |
| Artifact name | Threat Model |
| Project/product | `<project name>` |
| Lifecycle phase | `<inception/elaboration/construction/transition/operation/maintenance>` |
| Control graph node | `<node id>` |
| Work ledger item | `<ledger id>` |
| Version/date | `<version> / <YYYY-MM-DD>` |
| Author | `<agent or human>` |
| Accountable owner | `<human owner>` |
| Approval authority | `<person/role>` |
| Status | `<planned/drafted/reviewing/rework/accepted/deferred/retired>` |

## Consulting-Grade Artifact Contract

Before drafting or accepting this artifact, apply `consulting-grade-artifact-standard.md`. This artifact must behave like a top consulting-company deliverable: a decision aid, evidence carrier, handoff contract, trace object, and quality-gated work product.

Minimum contract:

- State the client/delivery decision this artifact supports and the exact approval authority.
- Identify source-of-truth inputs by answer ID, transcript reference, approved assumption, prior artifact, or standard anchor.
- Replace all fill markers and example-only text with project-specific content before review.
- Include realistic sample rows, diagrams, scenarios, procedures, or tables that show the expected specificity for this artifact type.
- Preserve bidirectional links to the attractor run, control graph node, work-ledger bead, PERT dependency, knowledge-graph node, requirements, decisions, risks, tests, code/design elements, operations records, refinery gate, and quality certificate.
- Define verification evidence, exit criteria, residual risks, revalidation triggers, and human-agent handoff instructions.
- Prove that the artifact passed specialist critic review, adversarial review, five RALPH loops, Hawkeye conformance, and AI judge/jury workflow legality before certification.`n`n## When To Use
Use this artifact when:

- the project risk, contract, lifecycle stage, or handoff requires explicit `Threat Model` evidence;
- downstream artifacts or code depend on this information;
- a future human or agent must be able to inspect, verify, or resume the work;
- the artifact has material impact on scope, quality, production, security, budget, or customer approval.

Tailor or combine only when the combined artifact preserves every required section, trace link, critic review, and evidence item.

## Required Inputs

- Source intent: customer transcript, answer IDs, approved assumptions, or issue/change request.
- Current control graph node and work-ledger item.
- Standards tailoring decision and applicable lifecycle phase.
- Related artifacts: Assets, abuse cases, mitigations, tests.
- Current risks, decisions, open questions, and residual-risk records.
- Required reviewers: Security Engineer, System Architect, Test Lead.

## Required Links

Catalog required links: Assets, abuse cases, mitigations, tests.

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

**Example:** `Threat Model` for CareQueue Pro covers referral intake, nurse review queue, patient reminder workflow, and operations dashboard for three clinics and is owned by the clinic operations product owner with DFMS delivery accountability.

### 2. Source Intent and Scope Boundary

**Fill:**

- source answer IDs or transcript references;
- in-scope items;
- out-of-scope items;
- deferred items;
- assumptions;
- constraints;
- approval state.

**Example:** `INT-ANS-014` says nurses need a same-day triage queue; EHR writeback is out of scope for Pilot Release 0.3.

### Architecture Context

**Fill:** State drivers, architecturally significant requirements, constraints, and quality attributes.

**Example standard:** Provide a filled sample for `assets` with a source answer ID, owner, scope boundary, measurable acceptance evidence, downstream design/test link, and revalidation trigger. Use the worked example file as the minimum specificity bar.

### Design Structure

**Fill:** Describe boundaries, responsibilities, data/control flows, interfaces, and dependency direction.

**Example standard:** Provide a filled sample for `actors` with a source answer ID, owner, scope boundary, measurable acceptance evidence, downstream design/test link, and revalidation trigger. Use the worked example file as the minimum specificity bar.

### Alternatives and Tradeoffs

**Fill:** Compare viable alternatives, rejected options, decision rationale, reversibility, and consequences.

**Example standard:** Provide a filled sample for `trust boundaries` with a source answer ID, owner, scope boundary, measurable acceptance evidence, downstream design/test link, and revalidation trigger. Use the worked example file as the minimum specificity bar.

### Failure, Security, and Operations

**Fill:** Capture threat boundaries, failure modes, observability, degradation, and rollback considerations.

**Example standard:** Provide a filled sample for `abuse cases` with a source answer ID, owner, scope boundary, measurable acceptance evidence, downstream design/test link, and revalidation trigger. Use the worked example file as the minimum specificity bar.

### Implementation and Verification Hooks

**Fill:** Map design elements to code modules, tests, migration steps, and acceptance evidence.

**Example standard:** Provide a filled sample for `mitigations` with a source answer ID, owner, scope boundary, measurable acceptance evidence, downstream design/test link, and revalidation trigger. Use the worked example file as the minimum specificity bar.


### Traceability Map

| Source | Requirement/decision | Artifact element | Evidence | Status |
| --- | --- | --- | --- | --- |
| `<answer id>` | `<requirement/decision id>` | `<section/table/diagram>` | `<test/review/log/link>` | `<open/pass/rework>` |
| INT-ANS-014 | REQ-032 | `Threat Model` focus: assets | TST-ACPT-019, REV-ARC-006-001 | Example only |

### Decisions and Alternatives

| Decision | Alternatives considered | Chosen option | Rationale | Consequence | Reversal trigger |
| --- | --- | --- | --- | --- | --- |
| `<decision>` | `<options>` | `<chosen>` | `<why>` | `<impact>` | `<trigger>` |
| Example for CareQueue Pro | Manual spreadsheet, queue module, EHR plugin | Queue module | fastest pilot learning with controlled privacy boundary | later EHR adapter needed | pilot rejects duplicate workflow |

### Risks, Assumptions, and Constraints

| ID | Type | Statement | Owner | Mitigation/evidence | Revalidation trigger |
| --- | --- | --- | --- | --- | --- |
| `<risk id>` | `<risk/assumption/constraint>` | `<statement>` | `<owner>` | `<mitigation>` | `<trigger>` |
| RISK-CQ-007 | Risk | SMS delivery delays may affect appointment reminders | SRE lead | delivery telemetry and manual fallback runbook | delivery failure above agreed threshold |

### Artifact-Specific Completion Rubric

Score each item 0 to 4 before expert review.

1. Artifact captures assets with owner, evidence, and trace links.
2. Artifact captures actors with owner, evidence, and trace links.
3. Artifact captures trust boundaries with owner, evidence, and trace links.
4. Artifact captures abuse cases with owner, evidence, and trace links.
5. Artifact captures mitigations with owner, evidence, and trace links.
6. All source intent links are present and bidirectional.
7. All assumptions have owner, confidence, and revalidation trigger.
8. All decisions include alternatives, rationale, and consequences.
9. All evidence is concrete, inspectable, and not merely a template.
10. All residual risks have owner, expiry, and acceptance state.
11. A future human or agent can resume without hidden context.
12. The artifact has version, date, lifecycle stage, and change history.
13. The artifact-specific critic panel is instantiated and linked.
14. The artifact is concise enough to use but complete enough to audit.
15. The artifact avoids unsupported compliance or quality claims.

### Artifact-Specific Critic Panel

Instantiate these critic seats from `35-artifact-specific-critic-panel-matrix.md`.

1. ARC-006-C1 Security Threat Critic: validates assets, actors, trust boundaries, STRIDE/abuse cases, and mitigations.
2. ARC-006-C2 Architecture Risk Critic: validates data/control flows, dependencies, privilege boundaries, and systemic weaknesses.
3. ARC-006-C3 Security Verification Critic: validates tests, scans, abuse simulations, acceptance evidence, and residual risk.

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
| Example review panel | `reviews/arc-006-panel.json` | DFMS quality refinery | artifact-specific critics | example only |

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

- Project: CareQueue Pro (Pilot Release 0.3)
- Scenario: a fictional multi-tenant care-coordination platform for outpatient clinics that manages referral intake, waitlist triage, SMS reminders, escalation tasks, and clinic operations dashboards.
- Customer: Northstar Clinics pilot network.
- Scope slice: referral intake, nurse review queue, patient reminder workflow, and operations dashboard for three clinics.
- Primary risk: handles PHI-like sensitive health data, clinic staffing decisions, external SMS delivery, and future EHR integration.
- Example trace: INT-ANS-014 -> REQ-032 -> ARC-API-006 -> TST-ACPT-019 -> REL-GO-004.
- Artifact-specific focus: assets, actors, trust boundaries, abuse cases, mitigations.
- Example decision: accept this artifact only after the Security Engineer, System Architect, Test Lead panel resolves failed points and links evidence to the refinery gate.

### Example Artifact Snippet

> For CareQueue Pro, the `Threat Model` records that the pilot must support referral intake and nurse triage for three clinics while deferring EHR writeback. The artifact links INT-ANS-014 -> REQ-032 -> ARC-API-006 -> TST-ACPT-019 -> REL-GO-004 and remains conditional until the artifact-specific critic panel confirms `assets`, `actors`, and `trust boundaries` with evidence.

### Example Review Outcome

- Content authority critic: conditional pass pending one fix to `assets`.
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



