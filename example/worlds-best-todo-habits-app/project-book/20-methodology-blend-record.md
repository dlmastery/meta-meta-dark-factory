# Methodology Blend Record

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

## Artifact Passport

| Field | Value |
| --- | --- |
| Catalog ID | `GOV-011` |
| Artifact family | Governance and management |
| Project | Northstar Daily todo and habits demonstrator |
| Version | `2026-05-02.1` |
| Status | Standalone draft, not artifact-certified |
| Client decision supported | Which SDLC methods govern this product slice, how they compile into tasks, gates, evidence, and no-skip controls. |
| Human owner | Abhir |
| Agent owner | Codex dark-factory orchestrator |
| Control links | `DFRUN-NORTHSTAR-20260425-001`, `TB-20260502-030`, `records/tpm-flow-ledger.json`, `records/factory-pert-plan.json` |
| Source links | `02-prd.md`, `03-architecture.md`, `04-test-strategy.md`, `05-traceability-matrix.md`, `records/sdlc-stage-coverage-matrix.json` |
| Evidence links | `tests/core.test.cjs`, `tests/browser-wysiwyg.test.cjs`, `tests/accessibility-certification-audit.cjs`, `project-book/evidence/browser-wysiwyg-results.json` |
| Change control | A method addition or removal requires Hawkeye review and updated PERT/task dependencies. |

## Decision Brief

Northstar Daily is not governed by one methodology label. The factory blends multiple methods into one ordered delivery kernel:

- ISO/IEC/IEEE-style lifecycle information discipline for artifact purpose, trace, and tailoring.
- RUP-style inception, elaboration, construction, and transition thinking.
- MDA lineage for business concepts to platform-independent model to local browser implementation.
- DDD for ubiquitous language, bounded contexts, aggregates, and invariants.
- TDD/BDD for executable behavior, scenarios, and regression evidence.
- SRE and security practices where applicable, with local-static tailoring when production concerns are out of scope.
- Hawkeye conformance and quality refinery as no-skip oversight.

The blend is accepted only as a draft compiler map. It is not a claim that every method artifact is complete.

## Method Compiler Table

| Method | Why included | Compiled control graph nodes | Ledger/evidence outputs | Gate |
| --- | --- | --- | --- | --- |
| ISO lifecycle information | Prevents document filler and hidden tailoring. | Intake, requirements, design, implementation, verification, handoff. | Artifact catalog matrix, stage coverage matrix, project-book index. | Hawkeye conformance gate. |
| RUP | Gives an outsourcing-style phase vocabulary with stakeholder checkpoints. | Inception, elaboration, construction, transition. | Charter/PRD, architecture, implementation evidence, handoff/runbook. | Phase exit review with human approval where scope changes. |
| MDA | Forces business-to-platform lineage instead of jumping straight to UI code. | CIM, PIM, PSM, transformation record. | MDA artifacts still missing before this batch. | Model trace and transformation review. |
| DDD | Protects language, invariants, and behavior boundaries for tasks and habits. | Glossary, context map, aggregate catalog. | `21-glossary-ubiquitous-language.md`; context map still missing. | Domain critic review. |
| TDD | Keeps core behavior executable and regression-safe. | Core parser/state/stats test node. | `tests/core.test.cjs`, core output evidence. | Passing unit tests. |
| BDD/scenario testing | Validates user journeys and holdouts beyond function tests. | Scenario matrix, browser journey, holdout report. | `tests/browser-wysiwyg.test.cjs`, scenario evidence. | Scenario/holdout/transfer evidence gate. |
| Material UI standards | Keeps product UI quality concrete, not taste-only. | UI conformance and WYSIWYG validation. | `14-material-ui-standards-conformance-record.md`, screenshots. | Material/UX review gate. |
| SRE/local operations | Defines run, recovery, handoff, and production boundary. | Runbook, release notes, maintenance, outage drill if hosted. | `07-handoff-and-runbook.md`; release notes still missing before this batch. | Ops readiness gate for production expansion. |
| Security/SSDF light | Prevents local app from ignoring privacy, dependencies, and provenance. | Threat model, dependency manifest, provenance. | `23-provenance-record.md`; threat model and dependency manifest still missing before future batch. | Security review gate. |

## Stage Blend

| Stage | Entry criteria | Required method contributions | Exit evidence | No-skip rule |
| --- | --- | --- | --- | --- |
| Intake | Raw human intent exists. | ISO 29148-style elicitation, recursive decomposition, RUP inception. | Interrogation record, spec decomposition, approved assumptions. | No PRD/design expansion without accepted intake or waiver. |
| Product definition | Intake accepted. | BRD/SRS/NFR, BDD scenarios, DDD language. | PRD, trace matrix, acceptance scenarios. | No code claim without testable requirements. |
| Architecture | Requirements baseline exists. | C4/arc42-style design, ADRs, MDA PIM/PSM, DDD boundaries. | Architecture doc, ADRs, model artifacts. | No implementation expansion without design decision trail. |
| Construction | Architecture and plan exist. | TDD, implementation plan, secure coding, dependency discipline. | App files, tests, implementation evidence. | No completion claim without executable tests. |
| Verification | Code and docs are ready for challenge. | TDD, BDD, browser/WYSIWYG, accessibility, scenario/holdout. | Test outputs, screenshots, validation records. | UI work must have browser evidence. |
| Transition/handoff | Verification passes for bounded scope. | RUP transition, SRE runbook, human training, context recovery. | Portal, runbook, context pack, release notes where applicable. | No handoff without next safe action and residual risk state. |
| Change/rework | Human or audit requests change. | Agile iteration, change management, redo closure, trace updates. | Change request, impacted nodes, reopened gates. | No redo from chat memory alone. |

## Project Tailoring

| Concern | Tailoring decision | Rationale | Residual risk |
| --- | --- | --- | --- |
| Production SRE | Tailored out for current local-static demonstrator. | No hosted service, no backend, no alert surface. | Production expansion will need release, deploy, observability, incident, outage drill. |
| API/interface spec | Tailored out for current app. | No public API or backend integration. | Future sync/mobile/integration work reopens API spec. |
| MDA artifacts | Required but not yet generated before this recovery batch. | User requires meta-meta rigor; local app still needs model lineage. | Full saturation remains failed. |
| DDD context map | Required but not yet generated before this recovery batch. | Glossary alone is insufficient for full DDD coverage. | Full saturation remains failed. |
| Artifact certification | Not claimed for this batch. | Draft artifacts need artifact-specific reviews. | Certification blocked until review packages exist. |

## Method-Specific Gates

| Gate | Checks | Current state |
| --- | --- | --- |
| Requirements gate | Interrogation, contradiction handling, completeness score, accepted requirements, trace. | Partial, existing records need artifact-specific review. |
| Architecture gate | ADRs, alternatives, quality scenarios, threat/failure boundaries. | Improved by `22-architecture-decision-records.md`; still draft. |
| Implementation gate | Code exists, core tests pass, browser tests pass, evidence linked. | Achieved for bounded local slice, not production. |
| Verification gate | Unit, static UI, browser/WYSIWYG, accessibility, scenario evidence. | Achieved for bounded local slice, pending full holdout report artifact. |
| Handoff gate | Portal, RASCI, human communication, context pack, next safe action. | Improved by this batch, still not fully certified. |

## Trace Model

| Source | Method output | Downstream dependency |
| --- | --- | --- |
| `02-prd.md` | Requirements and scenarios | Tests, architecture, glossary |
| `03-architecture.md` | Architecture baseline | ADRs, implementation, data model |
| `04-test-strategy.md` | Verification approach | Test procedures, evidence, certificates |
| `records/sdlc-stage-coverage-matrix.json` | Stage coverage | Hawkeye and artifact coverage |
| `records/artifact-catalog-coverage-matrix.json` | Missing artifact truth | Recovery batches and portal state |

## Quality Gate Package

| Gate element | Current state |
| --- | --- |
| Artifact-specific panel | Pending |
| 18 artifact-level rubric | Pending |
| Three 15-check critic rubrics | Pending |
| Two adversarial critics | Pending |
| Five RALPH loops | Pending |
| Certificate | Not issued |

