# 01. Meta-Skill Hierarchy

## Design Rule

Codex skills should stay concise and use progressive disclosure. The hierarchy below uses a meta-meta gate, then one orchestrator skill plus focused child skills and reference files. The meta-attractor shapes serious work before the orchestrator decides which child skill instructions and reference files to load.

This avoids one giant skill that pollutes every context window.

## Meta-Meta Entry Skill

### `df-meta-attractor`

Use before ordinary orchestration when Codex must handle serious, ambiguous, standards-based, transcript-derived, best-of-all, reusable factory, or meta-skill work.

Responsibilities:

- Separate durable intent from example workload.
- Produce or update the Attractor Run Record.
- Seed the control graph and work ledger expectations.
- Decide which factory mode and child skills should be used.
- Define anti-overfit, transfer-test, human-decision, traceability, and refinery commitments.
- Hand off to `dark-factory-orchestrator` only when the run field is stable enough to execute, or record a waiver.

Tiny non-factory tasks may bypass this gate only when no project book, standards tailoring, expert debate, traceability, handoff, production readiness, or best-of-all claim is involved.

## Top-Level Orchestrator

### `dark-factory-orchestrator`

Use after `df-meta-attractor` for governed work, or directly only for tiny non-factory tasks. Runs a new project, brownfield change, standards-based SDLC workflow, artifact factory, expert debate workflow, triple review, production handoff, or full dark-factory process.

Responsibilities:

- Identify project mode: greenfield, brownfield, artifact-only, review-only, handoff, recovery, or governance update.
- Load the correct child skills.
- Create the work breakdown and evidence ledger.
- Enforce that no material output is final without governance, rubric review, traceability, and verification.
- Keep the user in a non-technical flow while preserving technical evidence in files.

## Child Skills

| Skill | Role | Trigger Examples |
| --- | --- | --- |
| `df-meta-attractor` | Meta-meta field formation and governed entry gate | "meta meta", "serious factory", "best of all", "transcript", "ambiguous", "do not overfit" |
| `df-governance-mayor` | Process constitution and gatekeeper | "strict process", "RASCI", "governance", "stage gate", "company standards" |
| `df-intake-spec-lab` | Turns raw human intent into usable specs and scenarios | "new project", "requirements", "what/why/how/who/how good", "acceptance criteria" |
| `df-brownfield-recon` | Discovers existing systems safely before change | "existing repo", "brownfield", "legacy", "modify this codebase", "impact analysis" |
| `df-artifact-factory` | Generates and updates standards-based artifacts | "SRS", "HLD", "LLD", "traceability", "runbook", "project book" |
| `df-methodology-blender` | Blends RUP, MDA, DDD, TDD, BDD, Agile, SRE | "RUP", "MDA", "DDD", "TDD", "blend methodologies" |
| `df-swarm-coordination` | Assigns roles, decomposes work, coordinates experts | "multi-agent", "3 experts", "debate", "parallel review" |
| `df-quality-refinery` | Triple-review gate and anti-slop engine | "quality", "rubric", "verify", "expert review", "certify" |
| `df-traceability-evidence` | Bidirectional traceability and certificates | "audit trail", "evidence", "provenance", "requirement to code to test" |
| `df-dashboard-control` | Human dashboard and redo closure controller | "dashboard", "show artifacts", "redo this node", "transitive closure", "what depends on this" |
| `df-context-memory` | Context rot protection and durable knowledge | "large context", "context rot", "handoff", "resume", "memory" |
| `df-human-agent-handoff` | Bidirectional human/agent role swapping | "take over", "hand back", "async review", "human in loop" |
| `df-production-sre-handoff` | Release, operations, SRE, incident readiness | "production", "SRE", "runbook", "maintenance", "handoff" |
| `df-feedback-learning` | Retrospectives, lessons, process improvement | "feedback", "learn", "retrospective", "improve the factory" |

## Reference Files Per Skill

| Skill | Reference Files |
| --- | --- |
| `df-governance-mayor` | `references/standards-baseline.md`, `references/rasci.md`, `references/gate-policy.md` |
| `df-intake-spec-lab` | `references/intake-question-bank.md`, `references/spec-quality-rubric.md`, `references/scenario-patterns.md` |
| `df-brownfield-recon` | `references/codebase-recon-playbook.md`, `references/change-impact-template.md`, `references/risk-map.md` |
| `df-artifact-factory` | `references/artifact-catalog.md`, `references/templates/`, `references/artifact-tailoring.md` |
| `df-methodology-blender` | `references/rup.md`, `references/mda.md`, `references/ddd.md`, `references/tdd-bdd.md`, `references/agile-change.md` |
| `df-swarm-coordination` | `references/role-roster.md`, `references/debate-protocol.md`, `references/decomposition-rules.md` |
| `df-quality-refinery` | `references/expert-rubrics.md`, `references/review-thresholds.md`, `references/defect-taxonomy.md` |
| `df-traceability-evidence` | `references/trace-schema.md`, `references/evidence-schema.md`, `references/certificate-template.md` |
| `df-dashboard-control` | `references/dashboard-control-protocol.md`, `assets/templates/artifact-dashboard-index.json`, `assets/templates/redo-impact-report.json`, `scripts/df_dashboard_control.py` |
| `df-context-memory` | `references/context-budgeting.md`, `references/handoff-record.md`, `references/project-book-index.md` |
| `df-human-agent-handoff` | `references/async-review.md`, `references/takeover-protocol.md`, `references/handoff-phrases.md` |
| `df-production-sre-handoff` | `references/release-readiness.md`, `references/sre-runbook.md`, `references/incident-training.md` |
| `df-feedback-learning` | `references/retrospective-loop.md`, `references/standards-watch.md`, `references/quality-metrics.md` |

## Trigger Routing

1. If the request is serious DFMS work, route first to `df-meta-attractor`.
2. If the request mentions a new system, app, product, or idea, route to `greenfield` after the attractor gate.
3. If the request mentions an existing repo, file, incident, bug, or legacy system, route to `brownfield` after the attractor gate.
4. If the request asks for documents or artifacts only, route to `artifact-only` after the attractor gate unless it is a tiny one-off document.
5. If the request asks for review, audit, or certification, route to `review-only`.
6. If the request asks for deployment, operations, production, SRE, or maintenance, route to `handoff`.
7. If the request asks to resume, continue, recover, or use prior context, route to `recovery`.
8. If the request asks to show all artifacts, inspect the project book, redo an artifact/node, or compute change impact/transitive closure, route to `df-dashboard-control` after the attractor/orchestrator gates.
9. If the request changes standards, rubrics, process, or roles, route to `df-meta-attractor` then `governance update`.

## Hierarchy In Practice

### Greenfield Example

User: "Build me a regulated fintech onboarding platform."

Loaded:

- `df-meta-attractor`
- `dark-factory-orchestrator`
- `df-governance-mayor`
- `df-intake-spec-lab`
- `df-methodology-blender`
- `df-artifact-factory`
- `df-swarm-coordination`
- `df-quality-refinery`
- `df-traceability-evidence`
- `df-dashboard-control`

Optional later:

- `df-production-sre-handoff`
- `df-feedback-learning`

### Brownfield Example

User: "Add SSO to this legacy app and produce the handoff docs."

Loaded:

- `df-meta-attractor`
- `dark-factory-orchestrator`
- `df-governance-mayor`
- `df-brownfield-recon`
- `df-artifact-factory`
- `df-swarm-coordination`
- `df-quality-refinery`
- `df-traceability-evidence`
- `df-dashboard-control`
- `df-human-agent-handoff`

### Production Handoff Example

User: "Humans are not ready to let AI own SRE. Prepare production handoff."

Loaded:

- `df-meta-attractor`
- `dark-factory-orchestrator`
- `df-production-sre-handoff`
- `df-artifact-factory`
- `df-traceability-evidence`
- `df-human-agent-handoff`
- `df-feedback-learning`

## Skill Folder Shape

```text
df-meta-attractor/
  SKILL.md
  agents/openai.yaml
  references/
    attractor-loop.md
    requirement-field-model.md
    skill-routing-map.md
    quality-gates.md
    best-of-all-merge.md
  assets/templates/
    meta-attractor-record.json
    control-graph-record.yaml
    work-ledger-record.yaml
    refinery-gate-record.yaml
  scripts/
    validate_merged_records.py

dark-factory-orchestrator/
  SKILL.md
  agents/openai.yaml
  references/
    routing.md
    lifecycle-map.md
    standards-baseline.md
  scripts/
    validate_artifact_record.py
    validate_trace_links.py
    score_rubric_matrix.py
  assets/
    templates/
      artifact-record.yaml
      decision-record.yaml
      review-record.yaml
      handoff-record.yaml
```

Child skills follow the same shape but should only include resources they directly need.

## Instantiation Strategy

Phase 1 installs the meta-attractor, orchestrator, and 4 core child skills:

- `df-meta-attractor`
- `dark-factory-orchestrator`
- `df-governance-mayor`
- `df-artifact-factory`
- `df-quality-refinery`
- `df-traceability-evidence`
- `df-dashboard-control`

Phase 2 adds:

- `df-brownfield-recon`
- `df-human-agent-handoff`
- `df-context-memory`

Phase 3 adds:

- `df-methodology-blender`
- `df-swarm-coordination`
- `df-production-sre-handoff`
- `df-feedback-learning`

This keeps the first usable build small enough to validate without drowning Codex in its own constitution.
