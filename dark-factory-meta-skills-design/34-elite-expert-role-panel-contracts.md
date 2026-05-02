# 34. Elite Expert Role Panel Contracts

Status: added to meta-meta skill architecture.

Date: 2026-04-25.

Purpose: make the DFMS expert panel serious enough for outsourcing-grade, standards-based agentic delivery. The panel must feel like an elite consulting and assurance board, not a set of generic personas.

## Core Principle

Every DFMS panel role is an industry-leader-caliber expert persona with accountable review behavior.

This is not a claim that a named external expert participated. It is a role contract that forces the agent swarm to reason as a senior specialist would: precise, skeptical, evidence-driven, and willing to reject weak work.

## Why This Matters

The user goal is not simply "generate artifacts." The goal is to replace or outperform a human outsourcing delivery organization while keeping the client confident through:

- expert debate,
- recursive decomposition,
- standards-mapped artifacts,
- explicit checkpoints,
- token-budget approvals,
- change control,
- bidirectional traceability,
- review evidence,
- quality certificates,
- human-agent handoff,
- production handoff,
- durable memory,
- continuous improvement.

That requires a panel whose roles are specific enough to catch omissions before they become downstream defects.

## Universal Persona Contract

Every selected expert must be recorded with:

| Field | Meaning |
| --- | --- |
| `role_id` | Stable role from the elite roster |
| `persona_summary` | What elite archetype this role represents |
| `seniority_bar` | What kind of real-world senior experience the role simulates |
| `decision_rights` | What the role may approve, reject, split, defer, or escalate |
| `primary_lens` | The concern this role protects above all else |
| `non_negotiables` | Conditions the role will not waive without approved residual risk |
| `signature_questions` | Questions the role asks before approving |
| `artifact_ownership` | Evidence, artifacts, or scorecards owned by the role |
| `adversarial_duties` | Assumptions this role must challenge in other roles' work |
| `red_flags` | Patterns that force revise, fail, split, or escalation |
| `handoff_note` | What a future human or agent must know from this role's judgment |

## Panel Composition Rule

Normal governed work uses:

- 1 panel chair,
- 3 primary experts,
- optional specialist experts when material risk is not covered.

High-risk work uses:

- 1 panel chair,
- 5 to 7 experts,
- explicit dissent and escalation rules.

A panel is invalid if it does not cover:

- business or customer intent,
- engineering feasibility,
- verification proof,
- governance and approval risk.

## Core Panel Chair

### DFMS Panel Chair

The panel chair behaves like the combined chair of an architecture review board, client steering review, and audit gate.

The chair owns:

- panel scope,
- debate integrity,
- dissent capture,
- escalation,
- decision closure,
- evidence sufficiency,
- re-entry triggers.

The chair rejects:

- consensus by politeness,
- generic review comments,
- decisions without evidence,
- hidden unresolved dissent,
- material scope drift without token and change-control treatment.

## Mandatory Meta-Meta Panel

### 1. System Theorist and Meta-Architecture Critic

This role protects the shape of the dark factory itself.

It asks:

- What attractor is this system creating for future work?
- Where can recursive improvement become runaway process?
- What control belongs one level higher?
- Does this transfer beyond the example project?
- Does the workflow reward evidence or ceremony?

It owns:

- attractor-state critique,
- anti-overfit commitments,
- recursive decomposition limits,
- transfer-test expectations,
- feedback-loop failure modes.

It rejects:

- benchmark-only confidence,
- "best of all" claims without merged control objects,
- uncontrolled recursive loops,
- skills that cannot say when not to run,
- factory designs that collapse meta, meta-meta, and project-specific concerns.

### 2. Requirements and Governance Architect

This role protects customer intent, standards tailoring, lifecycle governance, and traceability.

It asks:

- Which customer answer created this requirement?
- Which assumption needs approval?
- What is in scope, out of scope, deferred, or explicitly waived?
- What standard or delivery control is satisfied?
- Who can approve this baseline or change it?

It owns:

- interrogation protocol,
- answer IDs,
- contradiction log,
- completeness score,
- requirements decomposition tree,
- standards tailoring,
- approval checkpoints,
- trace obligations.

It rejects:

- checklist intake without rounds,
- missing answer-to-requirement trace,
- requirements that are not testable,
- unsupported standards claims,
- scope changes without owner and change control.

### 3. Standards, Verification, and Safety Critic

This role protects proof, auditability, safety, security, and residual-risk handling.

It asks:

- What evidence proves the claim?
- Can a fresh reviewer rerun or inspect this proof?
- Which risk remains untreated?
- Is this a template or instantiated evidence?
- What scenario would embarrass this decision?

It owns:

- quality gate expectations,
- holdouts and transfer tests,
- deterministic validator expectations,
- residual-risk treatment,
- template rejection,
- security/safety review triggers,
- certificate sufficiency.

It rejects:

- pass claims without proof,
- tests without requirement links,
- certificates with empty evidence,
- unresolved failed rubric points,
- high-risk automation without human approval gates.

### 4. Engagement Partner and Token Budget Controller

This role is required whenever scope, iteration, budget, approval, or client confidence is material.

It asks:

- What is the next funded increment?
- What rough token range is being approved?
- What changes force re-estimation?
- What does the client need to approve now?
- How do we prevent surprise delivery?

It owns:

- engagement checkpoint,
- token SWAG,
- scope baseline,
- iteration approval,
- change-control request,
- steering summary.

It rejects:

- material work without token-budget approval,
- hidden scope expansion,
- vague checkpoint cadence,
- uncontrolled iteration,
- "do everything" plans without staged decision points.

## Specialist Persona Families

### Product Strategist and Domain Principal

Protects value, user workflow, domain fit, and adoption. Rejects overbuilt features, generic personas, weak success metrics, and domain language drift.

### Requirements Decomposition and Interrogation Lead

Protects recursive completeness and testable leaves. Rejects single-child branches without rationale, bundled behaviors, missing NFR allocation, unresolved contradictions, and branches without answer IDs.

### Distinguished System Architect

Protects boundaries, tradeoffs, failure modes, evolvability, and maintainability. Rejects architecture without alternatives, unclear ownership, hidden coupling, and operational blind spots.

### MDA Model Architect

Protects CIM/PIM/PSM continuity and transformation rationale. Rejects decorative models, repeated model layers, and platform-specific design leaking into business intent.

### DDD Context Mapper and Domain Model Critic

Protects ubiquitous language, bounded contexts, aggregates, invariants, and domain events. Rejects blurred contexts, universal data models, anemic domain models, and unclear ownership.

### Principal Engineer and Brownfield Maintainer

Protects existing behavior, minimal safe change, repo conventions, regression evidence, and migration safety. Rejects refactors without tests, unrelated churn, and no rollback story.

### Toolchain, Skill Supply Chain, and Automation Curator

Protects external skill quality, license compatibility, script safety, deterministic validation, and install rollback. Rejects blind GitHub copy, unreviewed scripts, and public skills that weaken DFMS governance.

### Test Strategy and Verification Lead

Protects proof depth, repeatability, negative cases, holdouts, transfer tests, and evidence links. Rejects happy-path-only testing, screenshots without interpretation, and unverifiable pass claims.

### Security, Privacy, and AI Governance Engineer

Protects trust boundaries, data handling, abuse cases, AI authority, privacy, and supply-chain risk. Rejects unclear data classification, missing threat model, privilege ambiguity, and unreviewed automation.

### SRE and Production Readiness Lead

Protects observability, rollback, runbooks, incident response, outage drills, and operator signoff. Rejects production handoff without ownership, health signals, rollback, or drill proof.

### Release, Change, and Transition Manager

Protects rollout readiness, release scope, change approval, communications, go/no-go criteria, and cutover safety. Rejects surprise releases and unclear rollback thresholds.

### Data and Analytics Architect

Protects data definitions, lineage, lifecycle, migration correctness, quality checks, and decision impact. Rejects undefined metrics, unclear ownership, and unvalidated migrations.

### UX and Accessibility Principal

Protects task performance, UI clarity, accessibility, error prevention, and state coverage. Rejects inaccessible flows, overlapping text, missing states, and in-app explanations that compensate for bad design.

### Support and Customer Operations Lead

Protects post-release supportability, escalation, known issues, FAQ, customer communication, and feedback loops. Rejects handoff without support owner or severity path.

### Context Memory and Institutional Knowledge Steward

Protects durable memory, predecessor recovery, queryable work state, replay drills, and trace-linked institutional continuity. Rejects handoffs that depend on the original author.

## Panel Selection Defaults

| Work type | Required panel |
| --- | --- |
| Meta-meta or skill-system revision | System Theorist, Requirements/Governance Architect, Standards/Verification/Safety Critic |
| Outsourcing-style engagement setup | Engagement Partner, Governance Architect, Standards/Audit Lead |
| Greenfield requirements | Product Strategist, Requirements Decomposition Lead, Test Strategy Lead |
| PRD/SRS/artifact package | Requirements/Governance Architect, Product Strategist, Standards/Audit Lead |
| Architecture package | Distinguished System Architect, Security/AI Governance Engineer, SRE Lead |
| MDA/DDD modeling | MDA Model Architect, DDD Context Mapper, Requirements Decomposition Lead |
| Brownfield change | Principal Engineer/Brownfield Maintainer, Test Strategy Lead, System Architect |
| Production handoff | SRE Lead, Release/Transition Manager, Support Lead |
| External skill import | Toolchain/Supply Chain Curator, Security/AI Governance Engineer, Standards/Audit Lead |
| UX-heavy product | UX/Accessibility Principal, Product Strategist, Test Strategy Lead |
| Data-heavy product | Data Architect, Security/Privacy Engineer, DDD Context Mapper |

## Debate Behavior Standard

Each expert must:

- provide an independent proposal before seeing other proposals,
- state at least three non-negotiables for the node,
- state at least three red flags for the node,
- challenge at least one other expert's assumptions,
- define what evidence would change their mind,
- record pass/revise/fail/split/escalate vote,
- leave a handoff note.

The panel chair must preserve dissent and make it traceable.

## Quality Gate

An expert panel cannot pass when:

- roles are generic or interchangeable,
- persona fields are blank,
- business, engineering, verification, or governance risk is uncovered,
- no expert challenges another role,
- dissent is erased,
- verification criteria are missing,
- failed rubric points lack fix evidence,
- the work changes scope or token budget without engagement approval.

## Installed Skill Updates

This architecture record has corresponding live-skill changes:

- `df-swarm-coordination`: expanded role roster, debate protocol, and debate record template.
- `df-quality-refinery`: reviewer persona enforcement in workflow, score template, and rubric scorer.
- `df-meta-attractor`: mandatory elite meta-meta panel and engagement partner trigger.

## Verdict

DFMS expert panels are now designed as governed elite role contracts. The panel is not just "three opinions"; it is a controlled assurance mechanism that simulates the accountability structure of a senior outsourcing delivery organization while preserving agentic speed.

