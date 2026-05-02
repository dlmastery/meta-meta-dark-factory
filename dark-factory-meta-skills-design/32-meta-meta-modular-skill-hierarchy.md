# 32. Meta-Meta Modular Skill Hierarchy

Status: explicit hierarchy added.

Date: 2026-04-25.

Purpose: make the DFMS meta-meta skill architecture hierarchical, modular, inspectable, and detailed enough that a future Codex session can instantiate the right factory for a new project, brownfield change, review, handoff, or governance update without relying on conversational memory.

## Design Answer

Yes: DFMS is intended to be modularized as a hierarchy of meta-meta, meta, lifecycle, node, artifact, evidence, and validator modules.

However, the hierarchy must not be implicit. It must be represented as:

- Installed skills with narrow trigger descriptions.
- A routing map that decides which skill activates when.
- A control graph that records the selected run shape.
- Work-ledger items that make every material task durable.
- Refinery gates that decide when a node is accepted or reworked.
- Templates and validators that prevent prose-only governance.
- Project-book records that let humans or new agents resume safely.

## Layered Architecture

| Layer | Name | Responsibility | Examples |
| --- | --- | --- | --- |
| L0 | Meta-meta field layer | Stabilize broad, contradictory, ambitious, or evolving intent before execution | `df-meta-attractor` |
| L1 | Orchestration layer | Select operating mode, route to skills, enforce default gates | `dark-factory-orchestrator` |
| L2 | Engagement and governance layer | Scope baseline, standards tailoring, token budget, change control, phase exits | `df-governance-mayor` |
| L3 | Lifecycle capability layer | Greenfield, brownfield, artifact, review, handoff, recovery, governance update | lifecycle nodes |
| L4 | Specialist skill layer | Intake, methodology, recon, artifacts, swarm, quality, trace, memory, SRE, feedback | `df-*` skills |
| L5 | Node contract layer | Unit of work with what/why/how/where/when/who/how_good | node contracts |
| L6 | Artifact/evidence layer | Standards-mapped artifacts, reviews, certificates, trace records | project book |
| L7 | Deterministic validation layer | Scripts, validators, fixtures, hashes, template rejection, bundle checks | `scripts/*` |
| L8 | External skill supply chain | Discover, evaluate, assure, and adapt public skills | Claude Code skills, Agent Skills, GitHub skill repos |

## L0: Meta-Meta Field Layer

Primary skill: `df-meta-attractor`.

### Responsibilities

- Convert raw user intent into an attractor state.
- Separate durable product requirements from examples, simulations, and benchmark tasks.
- Detect whether the request is chaotic, forming, stable, splitting, collapsing, or blocked.
- Decide whether governed DFMS work is required.
- Prevent overfitting to one example app.
- Select child skills and first node contract.
- Require engagement governance before material token spend.
- Produce or update:
  - Attractor Run Record.
  - Requirement field map.
  - Routing decision.
  - Control graph seed.
  - Open decisions.
  - Anti-overfit commitments.
  - Next safe action.

### Required Elite Expert Panel

Expert roles are full persona contracts, not generic viewpoints. See `34-elite-expert-role-panel-contracts.md`.

| Expert | Checks |
| --- | --- |
| System Theorist and Meta-Architecture Critic | Attractors, recursion, feedback loops, runaway scope, overfit risk, transfer tests |
| Requirements and Governance Architect | Customer intent, interrogation rounds, standards mapping, lifecycle structure, project-book controls |
| Standards, Verification, and Safety Critic | Proof, gates, residual risk, template-versus-evidence separation, auditability |
| Engagement Partner and Token Budget Controller | Required when scope, budget, iteration, approval, or client confidence is material |

### Exit Gate

The meta-meta layer may hand off only when:

- The request is classified.
- Durable intent is separated from example workload.
- The first control graph node exists or is waived.
- The engagement-governance need is decided.
- The next node has a complete contract.

## L1: Orchestration Layer

Primary skill: `dark-factory-orchestrator`.

### Operating Modes

| Mode | Trigger | First Required Child Skill |
| --- | --- | --- |
| Greenfield factory | New app, feature, product, or system | `df-intake-spec-lab` |
| Brownfield factory | Existing repo, bug, refactor, migration, integration | `df-brownfield-recon` |
| Artifact-only factory | PRD, SRS, HLD, trace matrix, runbook, certificate | `df-artifact-factory` |
| Review-only factory | Review artifact, codebase, design, or process | `df-quality-refinery` |
| Handoff factory | Humans must own production or maintenance | `df-production-sre-handoff` |
| Recovery factory | Resume old work or recover context | `df-context-memory` |
| Governance update | Update standards, rubrics, templates, skills | `df-feedback-learning` |

### Orchestrator Guarantees

- Governed work cannot bypass the meta-attractor unless it is explicitly tiny/non-factory work.
- Material work cannot begin without engagement governance or a waiver.
- Every node must have a node contract.
- Every material artifact must enter quality refinery.
- Every code change must trace to requirement, decision, test, and ledger item where applicable.

## L2: Engagement and Governance Layer

Primary skill: `df-governance-mayor`.

### Modules

| Module | Output |
| --- | --- |
| Standards tailoring | Included standards, exclusions, rationale, thresholds |
| Engagement setup | Client owner, delivery owner, checkpoint cadence |
| Token budget | Low/mid/high SWAG, assumptions, exclusions, approval |
| Change control | Scope/token/schedule/quality/risk impact path |
| RASCI | Human/agent accountability and approval authority |
| Phase gate | Exit criteria, evidence, residual risk, decision |

### Token Budget Rule

Token spend is governed like budget. Every material iteration needs:

- Approved objective.
- Rough token range.
- Scope boundary.
- Acceptance criteria.
- Reapproval trigger.
- Change-control path.

## L3: Lifecycle Capability Layer

The lifecycle is modular by stage, not a single waterfall.

| Stage | Node | Primary Child Skills |
| --- | --- | --- |
| -1 | Meta-attractor gate | `df-meta-attractor` |
| -0.5 | Engagement governance gate | `df-governance-mayor` |
| 0 | Intake and spec lab | `df-intake-spec-lab`, `df-swarm-coordination` |
| 1 | Feasibility | `df-governance-mayor`, `df-quality-refinery` |
| 2 | Inception package | `df-artifact-factory`, `df-traceability-evidence` |
| 3 | Architecture lab | `df-methodology-blender`, `df-artifact-factory` |
| 4 | Delivery planning | `df-governance-mayor`, `df-traceability-evidence` |
| 5 | Build loop | implementation plus `df-quality-refinery` |
| 6 | Verification | `df-quality-refinery`, `df-traceability-evidence` |
| 7 | Transition | `df-production-sre-handoff`, `df-human-agent-handoff` |
| 8 | Operation | `df-production-sre-handoff`, `df-context-memory` |
| 9 | Maintenance | `df-brownfield-recon`, `df-feedback-learning` |
| 10 | Retrospective | `df-feedback-learning`, `df-governance-mayor` |

## L4: Specialist Skill Layer

| Skill | Modular Domain | Must Produce |
| --- | --- | --- |
| `df-intake-spec-lab` | Customer interrogation and recursive spec decomposition | Interrogation record, decomposition tree, answer IDs, completeness score |
| `df-brownfield-recon` | Current-state discovery and impact analysis | Repo map, current behavior, drift report, affected artifact list |
| `df-methodology-blender` | Method composition | Methodology blend record, graph nodes, gates, evidence commitments |
| `df-artifact-factory` | SDLC artifact generation | Standards-mapped artifacts and project-book entries |
| `df-swarm-coordination` | Expert debate and role assignment | Debate record, alternatives, critiques, decision, escalation, elite persona contracts |
| `df-quality-refinery` | Review, rubric scoring, adversarial RALPH loops, certificates | Artifact-specific 3-critic panel, at least 2 adversarial critics, artifact-specific rubric, minimum 5 RALPH loops, failed-point fixes, quality certificate |
| `df-traceability-evidence` | Evidence and trace closure | Trace matrix, evidence ledger, done-ness proof |
| `df-human-agent-handoff` | Bidirectional ownership transfer | Handoff record, async review incorporation, takeover/handback proof |
| `df-production-sre-handoff` | Release, operations, maintenance | Runbooks, incident guide, outage drill, operator signoff |
| `df-context-memory` | Context rot prevention | Context pack, predecessor recovery, replay record |
| `df-feedback-learning` | Continuous improvement | Retrospective learning record, updated templates/rubrics/scenarios |

## L5: Universal Node Contract

Every module decomposes into nodes. Every node must declare:

| Field | Required Detail |
| --- | --- |
| `what` | Artifact, decision, code change, validation, or handoff being produced |
| `why` | Risk controlled or value delivered |
| `how` | Method, skill, template, script, standard, and review path |
| `where` | File path, repo area, project-book path, or runtime surface |
| `when` | Lifecycle stage, trigger, cadence, and completion condition |
| `who` | Author, reviewers, accountable owner, human approval authority |
| `how_good` | Rubric, threshold, evidence, residual-risk policy |

Nodes may be nested:

```text
project
  lifecycle stage
    capability node
      work package
        artifact/code/test/handoff leaf
```

No leaf is accepted without trace, evidence, and owner state.

## L6: Artifact and Evidence Layer

Artifacts are modular records, not monolithic documents.

### Artifact Families

- Governance: charter, standards tailoring, RASCI, risk, change, quality, AI governance.
- Requirements: BRD, SRS, NFRs, scenarios, glossary, assumptions, interrogation, decomposition.
- Architecture: HLD, LLD, ADRs, APIs, data, threat model, observability.
- MDA/DDD: CIM, PIM, PSM, transformation records, bounded contexts, aggregates.
- Implementation: implementation plan, code change set, build/dependency manifest, configs.
- Verification: test strategy, procedures, evidence, holdouts, security, performance, accessibility.
- Release: release plan, notes, deployment guide, runbook, incident guide, maintenance guide.
- Evidence: trace matrix, debate record, rubric scorecards, quality certificate, provenance, residual risk.

### Done Means

An artifact is done only when it has:

- Owner.
- Standards/process basis.
- Forward and reverse trace links.
- Expert debate or waiver.
- Three expert reviews.
- Verification evidence.
- Residual risk.
- Handoff notes.
- Control graph/work ledger/refinery proof where governed.
- Artifact-specific critic panel proof for catalog artifacts.
- Artifact-specific rubric scoring proof for catalog artifacts.
- Adversarial critic proof and minimum 5-loop RALPH proof for governed artifacts.

## L7: Deterministic Validation Layer

The meta-meta system must prefer validators for fragile claims.

### Validator Categories

| Validator | Purpose |
| --- | --- |
| Template rejection | Prove blank templates are not accepted as evidence |
| Rubric scorer | Enforce 3 experts and 15 checks per expert |
| Trace validator | Check mandatory forward and reverse links |
| Engagement validator | Check token SWAG, approvals, checkpoints, change control |
| Bundle drift validator | Ensure installed and workspace skills match |
| Simulation validator | Check greenfield/brownfield transfer and holdout evidence |
| SRE drill validator | Confirm outage drill, incident replay, operator signoff |

## L8: External Skill Supply Chain

External skills are useful but untrusted until adapted.

### Supply Chain Flow

```text
discover -> shortlist -> license check -> script/security review -> fit map
  -> DFMS adaptation -> local tests -> rubric review -> install/sync
  -> regression check -> project-book record
```

### External Skill Acceptance Criteria

An external skill pattern may be imported only when:

- License allows reuse or the pattern is reimplemented cleanly.
- Scripts are reviewed for destructive commands, exfiltration, network use, and dependency risk.
- The trigger description is specific and compatible with Codex skill loading.
- The skill can be mapped to a DFMS lifecycle node.
- Its outputs can be traced, reviewed, and verified.
- It does not weaken engagement governance, token approval, or refinery gates.

## Recursive Decomposition Pattern

Every module should be decomposable through the same pattern:

```text
intent
  -> capability
    -> node
      -> work item
        -> artifact/code/test/handoff leaf
          -> evidence
            -> gate decision
              -> learning update
```

This means the meta-meta system is self-similar: the same control logic works for a full project, a PRD, a code change, a runbook, a skill update, or a review finding.

## Modularity Rules

1. A skill owns one coherent responsibility.
2. A skill may call child skills only through an explicit routing decision.
3. A module must declare inputs, outputs, gates, trace links, and rollback path.
4. A module must be usable independently for artifact-only or review-only work.
5. A module must also compose into greenfield and brownfield flows.
6. A module must not depend on the todo/habits simulation example.
7. A module must expose templates and validators when prose is insufficient.
8. A module must preserve human takeover and handback.
9. A module must record token budget impact when it performs material work.
10. A module must feed lessons into feedback learning after failures or human critique.

## Hierarchy Quality Rubric

| Check | Pass Standard |
| --- | --- |
| Clear layers | L0 through L8 are distinguishable and non-overlapping |
| Clear routing | Every mode has an entry skill and next node |
| Clear ownership | Every node has accountable human/agent role |
| Clear artifacts | Every module produces named outputs |
| Clear gates | Every material output has acceptance/rework criteria |
| Clear evidence | Every claim can be inspected through records |
| Clear decomposition | Nodes recurse down to testable leaves |
| Clear composition | Modules can combine into full greenfield/brownfield flows |
| Clear external skill policy | Public skills are evaluated and adapted, not blindly trusted |
| Clear anti-overfit policy | Simulation apps are test workloads, not product boundaries |

## Verdict

The DFMS design is hierarchical and modular, but this record makes that modularity explicit.

Next hardening step: ensure each installed `df-*` skill includes a matching module contract section with inputs, outputs, gates, trace links, validators, and external-skill adaptation policy.
