# Dark Factory Control Console

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

Local browser console for starting, inspecting, resteering, and auditing a DFMS run through the correct control sequence:

1. Meta-meta attractor first.
2. Customer interrogation and contradiction scoring.
3. Engagement/token approval.
4. Meta-skill routing.
5. Artifact and SDLC planning.
6. Expert debate and critic panels.
7. Build/test/evidence planning.
8. Dashboard-control and redo closure.

## Run

```powershell
npm start
```

Open `http://127.0.0.1:4187/`.

## Test

```powershell
npm test
npm run test:browser
```

## What It Invokes

The UI creates governed invocation packets, generated meta-skill contracts, per-stage execution records, starter project-book files, 20-loop RALPH audit records, and run ledger JSON files under `runs/`. It loads local skill metadata from `../codex-skills`, enforces that `df-meta-attractor` is first, and prevents locked child stages from being invoked early.

Codex skills are instruction bundles, not standalone browser functions. The console therefore records skill invocation packets for Codex-mediated execution. Where DFMS has executable tooling, such as `df-dashboard-control/scripts/df_dashboard_control.py`, the server calls it directly through `/api/redo`.

## Agent Interaction Protocol Workbench

The console includes a protocol-aware workflow cockpit for agent-centric execution:

- AG-UI-style event ledger: every run start, stage activation, user answer, user message, gate result, pipeline execution, RALPH audit, and resteer request is persisted in `agui_events`.
- A2UI-style declarative surfaces: the server emits safe data-only surface descriptors for stage reports, customer interrogation, change control, evidence review, and protocol status.
- MCP Apps-style tool/resource manifest: the server exposes tool descriptors with `_meta.ui.resourceUri`, JSON resources, and `ui://` resources so an MCP host can understand how the workflow should be rendered and invoked.
- Ask/resteer anytime panel: humans can interrogate the active agent for blockers, legal next action, audit posture, or change-control routing without leaving the dashboard.

Protocol endpoints:

- `GET /api/runs/:id/protocol`
- `GET /api/runs/:id/truth`
- `POST /api/runs/:id/agent-message`
- `POST /api/runs/:id/goal-ralph`

## Human Project Portal

The portal is per-project, not just global documentation. A human owner can:

- use the agentic command deck to see the active specialist agent, evidence pulse, human handoff state, token posture, validation posture, and next legal action;
- inspect the agent swarm and strict critical path for meta-meta, intake, governance, routing, artifacts, experts, build/test, and dashboard handoff;
- start a governed project from raw intent;
- return later through the project selector;
- inspect current status, validation status, legal next actions, records, project-book artifacts, audit log, and generated meta-skill packet;
- open a change request after reviewing evidence;
- select an impacted artifact/node and compute redo closure;
- reopen the correct downstream stages so artifacts, reviews, tests, handoff, and dashboard evidence cannot be silently skipped.

Change requests write both the change record and a human communication record under `runs/<run-id>/records/`.

## Audit Endpoints

- `GET /api/runs/:id/validate`
- `POST /api/runs/:id/ralph`
- `GET /api/runs/:id/portal`
- `POST /api/runs/:id/change-request`

## Current Boundary

This is a local single-user control console, not yet a multi-user hosted portal with authentication, RBAC, comments, notifications, or durable database storage. It is suitable for guided local project starts, interrogation capture, progress tracking, human resteer/change control, and redo closure against the current project-book.

After RB-09, the console should show public hardening as accepted for the local/public package and move the remaining blocker to `PB-01`: the full hosted product platform spine. That is deliberate. A passing local console and public package do not equal the full outsourcing-replacement product.
