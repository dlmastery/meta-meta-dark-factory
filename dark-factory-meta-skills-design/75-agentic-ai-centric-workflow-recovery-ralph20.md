**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# Agentic AI-Centric Workflow Recovery RALPH-20

## Purpose

This record answers the user's core critique: the previous console had many SDLC controls, but the workflow still did not feel like an AI-agent-centric product. It exposed artifacts, panels, and proof fragments before it made the human journey obvious.

The corrected product intent is:

> A prompt-first, task-based, outcome-based, verified-result-based, steerable SDLC factory where the human can see exactly what the agents will do, which agent or service is acting, what is blocked, what proof exists, and how to approve, edit, reject, audit, or resteer at any time.

## Research Grounding

| Source | Key Learning Applied |
| --- | --- |
| AG-UI official docs | Agentic apps need event streams, shared state, interrupts, sub-agents, tool-output streaming, and steering rather than static request/response screens. |
| A2UI official docs | Agent-generated UI should be declarative, streamed, safe, rendered by native client components, and driven by a data model rather than arbitrary generated code. |
| MCP official docs | Model-controlled tools must make exposed tools visible and should include human-in-the-loop controls for operations. |
| MCP Apps official extension | Agent/tool UI should expose interactive resources, bidirectional communication, sandboxing, auditable messages, and user consent boundaries. |
| A2A official specification | Multi-agent systems need capability discovery, delegated task lifecycle, collaboration, and secure exchange without exposing internal state. |

## What Was Accomplished Before This Pass

- Local control console existed and could create governed runs.
- Meta-meta-first sequencing, stage gates, artifact BOM, expert review engine, truth inventory, product platform spine, and Playwright tests existed.
- AG-UI, A2UI, and MCP Apps descriptors were present.
- The app could ask the agent, answer interrogation questions, approve interrupts, run pipeline stages, compute redo closure, record comments, and run RALPH audits.

## Why It Still Missed The User's Real Ask

- The first screen did not clearly explain the agentic operating loop.
- The UI looked like a control dashboard assembled from subsystems, not a single guided product workflow.
- A2A was not a first-class protocol in the runtime contract, so "agent swarm" was visually present but protocol-incomplete.
- Backend services were hidden inside buttons and API routes instead of shown as agent-invoked workflow objects.
- "What happens after my prompt?" was not answered strongly enough.
- Verified result and steering existed in separate panels, but the user had to infer the relationship.

## Fix Implemented In This Pass

- Added a first-screen **Agentic Operating Loop**:
  - Prompt first.
  - Task plan.
  - Agents and backend services.
  - Verified result.
  - Steering.
- Added inline protocol/service rail:
  - AG-UI events.
  - A2UI surfaces.
  - MCP Apps tools.
  - A2A agents.
  - Backend services.
- Added A2A as a first-class backend protocol contract.
- Added A2A delegation map generation with one delegated specialist agent per factory stage.
- Added backend service map generation for agent-invoked services, including bootstrap, protocol state, ask/resteer, interrupts, legal stage invocation, change control, validation, and platform comments.
- Added UI rendering for:
  - A2A delegated agents.
  - Backend service invocation map.
  - First-screen backend service rail.
- Added Playwright assertions for the prompt-first operating loop, A2A visibility, and backend service visibility.
- Applied a post-loop visual hierarchy pass:
  - removed card-inside-card framing from the first screen;
  - narrowed the primary work canvas so the human journey is easier to scan;
  - made the runway, mission, operating loop, composer, and supervisor rail read as separate work surfaces;
  - tightened Material-style type, spacing, hover feedback, and mobile first-viewport order.

## RALPH-20 Review Loops

| Loop | Critic Focus | Finding | Fix / Evidence |
| --- | --- | --- | --- |
| 01 | Product journey | User could not tell what to do first. | First-screen operating loop now starts with prompt. |
| 02 | Outcome clarity | Result proof was separated from execution. | Verified-result card appears in the main operating loop. |
| 03 | Steering | Resteer was a tab, not a persistent mental model. | Steering is now one of the five primary loop states. |
| 04 | Protocol completeness | A2A was missing from the runtime contract. | `PROTOCOL_PROFILE.a2a` added. |
| 05 | Agent visibility | Agent swarm did not map to a delegation protocol. | `buildA2aDelegationMap` added. |
| 06 | Backend visibility | Services were invisible API plumbing. | `buildBackendServiceMap` added and rendered. |
| 07 | MCP Apps alignment | Tool/resource UI was present but incomplete for services. | Backend-service MCP Apps tool/resource/UI descriptor added. |
| 08 | A2UI alignment | Required surfaces did not include delegation/services. | `agent-delegation-map` and `backend-service-invocation-rail` added. |
| 09 | AG-UI alignment | User actions needed event-state framing. | Operating loop displays AG-UI event count and state posture. |
| 10 | Human control | Human approvals were not obvious enough from first screen. | Steering card and human decision queue remain visible. |
| 11 | Legal cursor | Users need to know what cannot be skipped. | Task-plan card references legal next task; legal cursor remains in supervisor. |
| 12 | Verification | Visual improvement needed tests. | Playwright test asserts operating loop, A2A, and service rail. |
| 13 | Mobile UX | Operating loop initially landed too low. | Moved operating loop above detailed composer and made mobile loop horizontally scrollable. |
| 14 | Desktop UX | Workflow needed to be visible before details. | Operating loop appears before scenario/form details. |
| 15 | Service trust | Tool calls need guardrails. | Service map includes guardrail per endpoint. |
| 16 | Product honesty | This still is not the hosted enterprise product. | Remaining PB-02 hosted runtime boundary preserved. |
| 17 | Test coverage | Backend contracts needed unit coverage. | Control-console tests assert A2A, service map, and required surfaces. |
| 18 | Browser coverage | WYSIWYG journey needed coverage. | Browser smoke asserts A2A and backend service surfaces. |
| 19 | Documentation | Recovery needed a traceable record. | This RALPH-20 record created. |
| 20 | Closure | Do not declare full-product victory. | Gate remains local product workflow recovery; PB-02 remains open. |

## Verification

- `node --check server.js`
- `node --check public/app.js`
- `npm test`
- `npm run test:browser`
- `python dark-factory-meta-skills-design/scripts/validate_tasks_md.py dark-factory-meta-skills-design/TASKS.md`
- `node dark-factory-meta-skills-design/scripts/validate_public_hardening.cjs .`
- `DFMS_BROWSER_BASE_URL=http://127.0.0.1:4187/ npm run test:browser` after restarting the live local server.
- Live Playwright screenshot audit:
  - `dark-factory-control-console/artifacts/ralph20-agentic-ux-desktop.png`
  - `dark-factory-control-console/artifacts/ralph20-agentic-ux-mobile.png`
  - `dark-factory-control-console/artifacts/browser-console-smoke.png`
  - `dark-factory-control-console/artifacts/browser-console-mobile-start.png`

## Remaining Product Plan

| Product Batch | Outcome | Acceptance Evidence |
| --- | --- | --- |
| PB-02 | Hosted enterprise runtime with auth/RBAC, durable database, project teams, and real deployment. | Auth tests, DB migration tests, access-control tests, deployment runbook, audit export. |
| PB-03 | Real provider orchestration adapters. | Provider health checks, fallback tests, quota/rate-limit behavior, audit of each model/provider output. |
| PB-04 | External MCP/A2A server packaging. | Protocol conformance tests, security review, sandbox tests, client compatibility matrix. |
| PB-05 | Full collaborative workflow product. | Multi-user reviews, comments, notifications, change approvals, reassignment, stage handoff drills. |
| PB-06 | Production SRE and reliability package. | Observability, incident drill, backup/restore, retention policy, chaos/outage proof, operator training. |

## Gate

Status: `pass-with-boundaries`

This pass improves the local product workflow and agentic protocol clarity. It does not claim the full hosted enterprise product is complete.
