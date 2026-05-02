**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# Human-Driven Project Workflow Portal Record

## Purpose

This record upgrades the DFMS control console from a one-way starter UI into a per-project human control portal. The portal lets a human start a governed project, return later, inspect all generated records, see the legal next action, resteer design or scope, open a change request, and force downstream stages back through the meta-meta to meta-skill workflow.

The goal is the outsourcing-style engagement loop requested by the user: a human client can work with a dark-factory delivery organization, review evidence, challenge the direction, request iteration, and get controlled re-entry instead of silent mutation or skipped stages.

## User Workflow

1. Human opens `http://127.0.0.1:4187/`.
2. Human starts a per-project run from raw intent, product type, token SWAG band, and reapproval trigger.
3. `df-meta-attractor` is the first stage and produces the generated project-specific meta-skill contract.
4. Human answers the customer grill; completeness and contradiction gates block advancement until the intake is credible.
5. Human executes the ready pipeline, which materializes stage records, starter project-book artifacts, validation evidence, and RALPH audit evidence.
6. Human returns through the project selector and sees status, validation state, open changes, records, legal next actions, generated meta-skill, invocation packet, and project-book outputs.
7. Human opens a change request from the portal when design, requirements, budget, implementation, testing, or operations direction changes.
8. The server computes redo closure for the selected artifact/node when possible, writes a change request record, writes a human communication record, reopens the target stage and all downstream stages, and sets the run to `change_control`.
9. The only legal next action is to execute the reopened stage pipeline and re-earn artifact, review, test, handoff, and dashboard evidence.

## UI Surfaces Added

- Project selector and project cards for returning to prior runs.
- Human Project Portal metrics: run status, validation status, open changes, record count, accepted-stage ratio.
- Legal Next Actions panel generated from run validation, interrogation state, and change-control state.
- Change Requests panel for opened human-driven re-entry records.
- Resteer Or Change Design form with impact area, target stage, selected artifact/node, token delta, approval owner, requested change, and reason.
- Records And Project Book panel for per-run records and generated markdown artifacts.

## Runtime Contracts

### `GET /api/runs/:id/portal`

Returns a human-readable and machine-checkable portal object:

- zero-slop policy;
- run identity, project type, current stage, active stage, token SWAG;
- progress metrics;
- run stages;
- records and project-book files;
- change requests and human decisions;
- validation findings;
- legal next actions.

### `POST /api/runs/:id/change-request`

Creates a governed change request:

- validates the change title;
- maps impact area to a target stage unless explicitly supplied;
- computes redo closure for the selected node when available;
- writes `CR-*.json`;
- writes `CR-*-human-communication-record.json`;
- stores human decision evidence;
- reopens the target stage and every downstream stage;
- clears stale stage invocations and outputs for reopened stages;
- sets status to `change_control`;
- returns the updated portal and run ledger.

## No-Skip Assurance

The change-control path is deliberately conservative. It does not patch an accepted project in place. It reopens the impacted stage boundary and locks downstream work. This means a design change cannot bypass:

- artifact regeneration;
- traceability updates;
- expert debate;
- critic review;
- test evidence;
- production/SRE handoff;
- dashboard redo closure;
- human communication records.

## Evidence

- `dark-factory-control-console/server.js` now exposes portal and change-request APIs and writes change/handoff evidence.
- `dark-factory-control-console/public/index.html` contains the full workflow UX.
- `dark-factory-control-console/public/app.js` loads project state, refreshes portal state, opens change requests, and preserves the existing factory execution flow.
- `dark-factory-control-console/tests/control-console.test.cjs` asserts portal contract, legal next actions, stage reopening, human communication evidence, and structural validation after change control.
- `dark-factory-control-console/tests/browser-console.test.cjs` drives the browser through project start, interrogation, pipeline execution, RALPH audit, redo closure, human change request, portal `change_control`, and change-list visibility.

## Verification

| Check | Result | Evidence |
| --- | --- | --- |
| Server syntax | pass | `node -c server.js` |
| Browser script syntax | pass | `node --check public/app.js` |
| API/unit regression | pass | `npm test` |
| Browser workflow regression | pass | `npm run test:browser` |
| Live portal endpoint | pass | latest run returned `dfms_human_project_control_portal` |
| Live change-control state | pass | latest browser run returned `change_control`, target stage `stage-04-artifacts`, four accepted predecessor stages, one open change, and validator `pass` |

## Expert Critic Panel

### Critic 1: Enterprise Engagement Partner

- Finding: The portal now supports a credible client/delivery-firm loop because the human can return, inspect evidence, and request controlled re-entry.
- Residual risk: It is still local single-user software without authentication, comments, notifications, or external approval workflow.
- Verdict: Pass for local DFMS control-console scope; not yet an enterprise SaaS engagement portal.

### Critic 2: Legendary TPM / No-Skip Auditor

- Finding: The change request reopens the target stage and all downstream stages, which prevents silent partial updates after a human resteer.
- Residual risk: Reopened stale execution-output ledger entries remain as historical evidence; future runtime can add supersession markers to make stale-vs-current clearer.
- Verdict: Pass for no-skip stage control.

### Critic 3: Product Workflow UX Reviewer

- Finding: The UI now exposes the whole loop: start, select project, grill, execute, inspect, audit, redo, change, and re-enter.
- Residual risk: The UX is operational and Material-inspired, but not yet a fully branded product with role-based collaboration, inline artifact review, or comment threads.
- Verdict: Pass for workflow UX demonstrator; follow-on productization should add collaboration primitives.

## Certification Statement

This update is certified as a local, single-user DFMS project control portal for governed starts, progress inspection, evidence review, RALPH audit, redo closure, and human change-control re-entry.

It is not certified as a hosted multi-tenant enterprise portal, authenticated approval system, or replacement for project-specific code/test execution evidence.
