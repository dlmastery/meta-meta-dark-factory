**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# SDLC Stage Coverage And Testing Assurance

## Purpose

This revision closes the "documentation factory" failure mode. DFMS must not produce a large project book while quietly skipping implementation, execution, testing, browser verification, release readiness, or operational proof.

The rule is simple:

No governed project can exit a lifecycle stage unless the SDLC Stage Coverage Matrix says whether the stage is required, accepted, deferred, waived, or not applicable, and why. For code-producing projects, construction and verification cannot be skipped. For UI-producing projects, WYSIWYG/browser testing cannot be skipped. For scenario-driven products, scenario tests, holdouts, and transfer tests cannot be skipped.

## SDLC Coverage Principle

Every project must declare its project type before tailoring:

- `artifact_only`: documents/templates/process records only.
- `code_producing`: source code, scripts, configuration, migrations, generated code, or app changes are expected.
- `ui_surface`: human-visible UI, WYSIWYG editor, browser app, mobile/responsive page, visual component, or interactive canvas is present.
- `api_surface`: API, integration, webhook, event stream, CLI, or contract is present.
- `data_surface`: database, migration, analytics, model, schema, or data flow is present.
- `production_surface`: deployment, operations, observability, incident response, or production handoff is in scope.

Tailoring may reduce artifacts, but it cannot hide a required stage. A skipped required stage is a waiver with owner, rationale, expiry, residual risk, and revalidation trigger.

## Required SDLC Stages

| Stage | Required For | Hard Exit Evidence |
| --- | --- | --- |
| Meta-Attractor | all governed work | attractor run record, scope mode, anti-overfit, selected skills |
| Engagement Governance | material work | owners, rough token SWAG, checkpoints, change triggers |
| Intake And Interrogation | greenfield, material changes | answer IDs, contradiction checks, approval mechanics |
| Recursive Spec Decomposition | greenfield, material changes | decomposition tree, completeness scores, acceptance leaves |
| Feasibility And Risk | material work | feasibility options, risk register, risk treatments |
| Inception And Charter | project work | charter, scope, RASCI, standards tailoring |
| Architecture And Design | code/API/data/UI/production work | HLD/LLD/ADRs, NFR mapping, design alternatives |
| Planning And PERT | material work | TPM flow, PERT, work packages, dependencies, gates |
| Construction And Implementation | code-producing work | code/config/migration changes, build evidence, review evidence |
| Verification And Validation | all accepted outputs | test evidence, coverage, scenario evidence, trace closure |
| Security And Abuse Testing | security-sensitive, API, data, auth, production | threat validation, abuse cases, findings, mitigations |
| UI/WYSIWYG Browser Testing | UI, editor, browser, visual component | Playwright/browser runs, screenshots, viewport matrix, visual/a11y evidence |
| Performance And Reliability | NFR, production, scaling, latency | load/reliability evidence, SLO checks, capacity assumptions |
| Release And Transition | release/handoff | release plan, deployment guide, rollback, release notes |
| Operations And SRE | production surface | runbooks, observability, incident path, outage drill |
| Maintenance And Brownfield | ongoing systems | impact analysis, regression suite, maintenance guide |
| Retrospective And Learning | all governed work | lessons, skill/template/rubric updates, recurrence prevention |

## Code-Producing Hard Gate

If `code_producing = true`, the run cannot pass with only documents.

Required evidence:

- implementation plan;
- code change set or explicit no-code waiver;
- build/dependency manifest;
- commands used to build/test/lint/typecheck;
- code review or equivalent expert review;
- unit test evidence where applicable;
- integration/contract test evidence where applicable;
- regression evidence for brownfield;
- trace links from requirements and decisions to code and tests;
- failed test/finding handling and patch beads.

If code is not implemented because the current scope is planning-only, the project must be marked `artifact_only` or `planning_phase_only` with a stage-limited closure. It may not claim full product completion.

## Scenario-Based Testing Gate

Scenario tests are required when there are user journeys, acceptance criteria, business workflows, decision rules, or examples.

Required evidence:

- scenario matrix linked to requirements and acceptance criteria;
- positive, negative, edge, and failure scenarios;
- holdout scenarios not used while designing the solution;
- transfer tests that prove the process generalizes beyond one benchmark app;
- executable test evidence or explicit manual test procedure evidence;
- trace from failed scenarios to patch beads;
- residual risk for any deferred scenario.

## WYSIWYG / Browser / Playwright Gate

If a project has a UI, visual app, WYSIWYG editor, canvas, form, dashboard, landing page, browser workflow, or visual component, browser-level evidence is mandatory.

Required evidence:

- Playwright or equivalent browser automation plan;
- desktop and mobile viewport coverage;
- screenshot evidence;
- interaction evidence: click, type, drag/drop, keyboard, focus, navigation, submit, undo/redo as applicable;
- visual non-overlap checks;
- text fit and responsive checks;
- accessibility checks where applicable;
- console/network error check;
- image/canvas/media nonblank check where applicable;
- scenario journey coverage;
- visual regression or screenshot comparison when visual stability matters.

For frontend work, passing unit tests alone is not enough.

## API / Contract Gate

If an API or integration exists:

- contract/spec evidence;
- request/response examples;
- negative/error cases;
- auth/permission behavior;
- backward compatibility check;
- integration or contract tests;
- versioning/migration notes.

## Data And Migration Gate

If data or migrations exist:

- schema/model evidence;
- migration plan;
- rollback/backout plan;
- seed/test data plan;
- privacy/security classification;
- data validation checks;
- migration rehearsal or documented substitute.

## Production Gate

If production or handoff is in scope:

- deployment guide;
- rollback proof;
- observability proof;
- alert/incident path;
- runbook;
- outage drill;
- operator readiness signoff;
- known risks and residual risk acceptance.

## No-Docs-Only Rule

Documentation is accepted as a deliverable only when the selected project mode is `artifact_only`, `planning_phase_only`, or `skill_system_revision`.

A code/app/product claim requires implementation and testing evidence. A UI claim requires browser/WYSIWYG evidence. A production claim requires operations proof. A scenario-driven claim requires scenario test evidence.

## Meta-Skill Enforcement

The following must happen before a governed run can pass:

1. `df-meta-attractor` declares project type flags: `artifact_only`, `code_producing`, `ui_surface`, `api_surface`, `data_surface`, `production_surface`, `brownfield`, `scenario_driven`.
2. `df-methodology-blender` compiles those flags into required methods, stages, tests, and artifacts.
3. `df-governance-mayor` creates and validates the SDLC Stage Coverage Matrix.
4. `dark-factory-orchestrator` refuses construction/verification bypass for any code/app/product run.
5. `df-quality-refinery` refuses a pass certificate if required stage evidence is missing.
6. `df-traceability-evidence` links requirements to code, tests, scenario evidence, browser evidence, release evidence, and operations evidence.
7. `df-context-memory` resumes from stage coverage and kernel next-action state, not chat memory.

## Assurance Statement

DFMS can give a strong process assurance, not a magical "zero mistakes" guarantee:

- Every SDLC stage is explicitly present or explicitly waived.
- Every required testing class is explicitly present or explicitly waived.
- Documentation-only completion is blocked for code/app/product work.
- UI completion is blocked without browser/WYSIWYG evidence.
- Scenario-driven completion is blocked without scenario/holdout/transfer evidence.
- Production completion is blocked without release, rollback, observability, runbook, and drill evidence.
- The execution kernel computes legal next action from ledgers, not memory.

This is the assurance mechanism that keeps a serious software factory from becoming a pile of impressive documents.
