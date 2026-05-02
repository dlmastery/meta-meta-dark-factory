> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# Consulting-Grade Artifact Standard

Status: mandatory standard for every governed DFMS artifact template and every instantiated project artifact.

This standard is the artifact-quality floor. A DFMS artifact is not accepted because it is long, formal, or standards-themed. It is accepted only when it can help a real client, delivery lead, reviewer, engineer, tester, operator, or auditor make the next correct decision without hidden context.

## Source Anchors

Use these anchors as active design inputs, not name-dropping:

- ISO/IEC/IEEE 29148: requirements artifacts must support iterative and recursive requirements engineering, required information items, required content, and formatting guidance for requirements information items.
- ISO/IEC/IEEE 15289: life-cycle information items must have explicit purpose, content, document type, lifecycle fit, and tailoring rationale.
- ISO/IEC 25010: NFRs, acceptance criteria, design review, test objectives, and quality certificates must map product quality to specified, measured, and evaluated characteristics.
- NIST SSDF and OWASP SAMM: security work must be integrated into the lifecycle, risk-driven, measurable, and evidenced.
- C4 and arc42: architecture artifacts must communicate at the right abstraction level, with context, containers/components when useful, runtime/deployment views, quality scenarios, decisions, risks, and glossary.
- Google SRE: operability artifacts must define user-relevant SLIs/SLOs, measurement windows, alert/use conditions, and error-budget or release consequences.
- SLSA and CycloneDX: build, dependency, release, and provenance artifacts must make source, build, dependency, service, vulnerability, and attestation evidence inspectable.
- CISA Secure by Design: security must be treated as a product and executive ownership concern, not an optional technical appendix.
- OWASP WSTG: web/security testing artifacts must show phase-aware, methodical validation and evidence, not only checklist intent.

## Artifact Passport

Every artifact must start with an artifact passport that includes:

| Field | Requirement |
| --- | --- |
| Artifact identity | Stable ID, title, family, version, status, lifecycle stage, and tailoring state |
| Client decision | The exact client/delivery decision this artifact supports |
| Accountable owner | Human owner, agent owner, approval authority, and handoff route |
| Control links | Attractor run, control graph node, work-ledger bead, PERT dependency, knowledge-graph node |
| Source links | Interview answers, transcript passages, approved assumptions, business decisions, constraints |
| Evidence links | Reviews, tests, code/design links, runtime evidence, certificates, residual risks |
| Change control | Baseline, last change reason, impact scope, token-budget/change approval if iteration expands |

## Mandatory Artifact Sections

Every governed artifact must include these sections, tailored to the artifact type:

1. Executive decision brief: one page or less, stating what is decided, what remains undecided, and who can approve the result.
2. Source-of-truth ledger: exact customer answers, transcript references, assumptions, standards clauses, and prior artifacts used as inputs.
3. Scope model: in-scope, out-of-scope, deferred, non-goals, constraints, and re-entry triggers.
4. Artifact-specific body: structured tables, diagrams, scenarios, contracts, models, or procedures appropriate to the artifact.
5. Options and tradeoffs: alternatives, rejected options, decision rationale, cost/risk/quality consequences, and reversal triggers.
6. Verification model: acceptance criteria, tests, review evidence, scenario evidence, holdouts, transfer checks, or operational drills.
7. Trace model: bidirectional links among intent, requirements, NFRs, risks, decisions, artifacts, code, tests, releases, operations, and certificates.
8. Risk and assumption controls: owner, likelihood/impact, mitigation, evidence, expiration, revalidation trigger, and residual-risk decision.
9. Human-agent handoff: what a human must approve or learn; what a future agent must load first; what cannot be inferred.
10. Quality gate package: artifact-specific 18-point rubric, 3 specialist 15-point critic rubrics, 2 adversarial critics, 5 RALPH loops, failed-point fixes, and certificate status.

## Artifact Family Overlays

### Governance and Management

Artifacts such as project charters, standards tailoring, RASCI, risk, change, quality, AI governance, control graphs, ledgers, attractor records, and method blends must:

- behave like a technical program management control surface, not a narrative;
- define entry/exit gates, dependency order, accountable owners, change authority, budget/token approval points, and no-skip controls;
- include stage-specific Hawkeye conformance checks and AI judge/jury transition verdicts;
- record waivers as risks with human approval, expiry, and revalidation trigger.

### Requirements and Product

BRD, SRS, NFR catalog, acceptance scenarios, glossary, assumptions, interrogation records, and decomposition records must:

- decompose intent recursively from business outcomes to capabilities, scenarios, NFRs, edge cases, and testable leaves;
- record interrogation rounds, answer IDs, contradiction scores, completeness scores, re-interrogation triggers, and approval mechanics;
- require every requirement to be necessary, clear, atomic, feasible, verifiable, prioritized, bounded, and traceable;
- map acceptance examples, negative cases, holdout scenarios, and transfer scenarios before design or code claims can pass.

### Architecture and Design

HLD, LLD, ADRs, API specs, data models, threat models, and observability designs must:

- show context, runtime, deployment, dependency, trust-boundary, failure-mode, and operability views appropriate to risk;
- name architecturally significant requirements and quality scenarios that drive the design;
- compare alternatives and document consequences, not just the selected design;
- connect each design element to implementation files, tests, security controls, observability, rollback, and maintenance ownership.

### MDA and DDD

CIM/PIM/PSM, transformation records, bounded context maps, aggregate catalogs, and anti-corruption plans must:

- preserve a clean lineage from business language to conceptual model to platform-independent model to platform-specific implementation;
- identify bounded contexts, language boundaries, invariants, aggregates, policy decisions, and integration seams;
- record transformation rules, model deltas, generated/manual code boundaries, and validation evidence;
- reject model diagrams that cannot be traced to acceptance scenarios, code modules, or tests.

### Implementation and Build

Implementation plans, code change sets, dependency manifests, configuration specs, migrations, and backout plans must:

- map every planned change to requirements, design decisions, test evidence, dependency risk, rollout controls, and rollback/backout procedure;
- separate build, release, and run concerns;
- capture source revision, dependency inventory, SBOM/provenance expectations, configuration ownership, secrets handling, and reproducibility;
- require executable evidence before claiming implementation completeness.

### Verification and Validation

Test strategies, test procedures, automated evidence, holdout reports, security tests, performance/reliability reports, and accessibility/UX validation must:

- map test classes to requirements, NFRs, risks, scenarios, edge cases, threat controls, and user journeys;
- define TDD/BDD cadence, entry criteria, exit criteria, data controls, environment, repeatability, and reviewer ownership;
- include browser/WYSIWYG evidence for UI work, scenario/holdout/transfer proof for scenario-driven work, and accessibility evidence for human-facing UI;
- preserve failures, retries, flakiness, defect links, coverage gaps, residual risks, and retest proof.

### Release, Production, and Maintenance

Release plans, notes, deployment guides, runbooks, incident guides, maintenance guides, training packages, and outage drills must:

- identify release scope, blast radius, deployment order, rollback trigger, monitoring checks, support route, incident roles, and operator readiness;
- define SLO/SLI measurement, alerting, triage, escalation, communication, and post-incident learning;
- include human training verification and outage/incident replay proof before production readiness can pass;
- connect maintenance tasks to known risks, technical debt, dependency updates, and ownership windows.

### Evidence and Certification

Trace matrices, debate records, scorecards, quality certificates, provenance records, residual-risk acceptances, refinery gates, communication records, context packs, and retrospectives must:

- prove work happened; they cannot merely declare that work happened;
- link every pass, waiver, score, or certificate to inspectable evidence and named accountable owners;
- preserve reviewer independence, adversarial attacks, fix loops, standing unresolved objections, and human approvals;
- support predecessor recovery so a new human or agent can replay the decision chain.

## Consulting-Grade Rubric

Every artifact template and instantiated artifact must pass these checks before specialist rubrics are applied:

1. The artifact has a clear client/delivery decision purpose.
2. The artifact is tailored to lifecycle stage, product risk, and project type.
3. The artifact identifies source inputs by stable IDs, not vague memory.
4. The artifact separates facts, assumptions, decisions, open questions, and risks.
5. The artifact uses artifact-specific structure, tables, diagrams, scenarios, or procedures.
6. The artifact includes realistic examples or filled sample rows that demonstrate expected specificity.
7. The artifact contains bidirectional trace links to upstream and downstream work.
8. The artifact names owners, approval authority, and revalidation triggers.
9. The artifact records alternatives and consequences where a decision is involved.
10. The artifact defines verification evidence and exit criteria.
11. The artifact records residual risks and human acceptance requirements.
12. The artifact prevents workflow skipping through control graph, ledger, and gate links.
13. The artifact includes human-agent handoff instructions.
14. The artifact rejects template placeholders as evidence.
15. The artifact avoids compliance claims without mapped controls and evidence.
16. The artifact supports future recovery by a person who did not attend the original work.
17. The artifact is concise enough for operators yet complete enough for audit.
18. The artifact has an explicit RALPH loop, critic panel, rubric score, and certificate path.

## Rejection Triggers

Reject or revise the artifact when any of these appear:

- generic text that could apply to any project;
- standards listed without section-level mapping and evidence hooks;
- examples that are repetitive, fake-looking, or not close to real project data;
- no customer answer IDs or approved assumptions for material claims;
- no negative cases, edge cases, holdouts, or transfer tests where scenarios matter;
- no design alternatives where architecture or product tradeoffs exist;
- no implementation/test/runtime evidence for code, UI, release, or production claims;
- no token-budget/change approval where iteration scope expands;
- no Hawkeye conformance audit or AI judge/jury transition proof for governed stage movement.
