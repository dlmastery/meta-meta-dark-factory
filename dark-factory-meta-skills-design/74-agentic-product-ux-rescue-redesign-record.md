# Agentic Product UX Rescue Redesign Record

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

## Status

`accepted_for_local_ui_redesign_slice`

This record covers a local product-console UX redesign only. It does not claim hosted enterprise readiness, external provider orchestration, or full outsourcing-replacement production status.

## Why This Exists

The owner rejected the prior console because it looked like a random dashboard and did not behave like an agentic AI-centric product. The core failure was not missing widgets. The core failure was weak information architecture:

- The first screen did not make the workflow legible.
- The human could not immediately see the legal next action.
- Agent protocol, evidence, graph, and change-control concepts were scattered.
- The UI exposed many internal nouns before the user had a stable mental model.
- Screenshots and tests proved behavior existed, but not that the product journey was understandable.

The redesign therefore treats the console as a supervised factory control room, not as a document dashboard.

## What Was Already Accomplished

| Layer | Evidence-backed status |
| --- | --- |
| Meta-meta sequencing | Local run packets start through `df-meta-attractor` and enforce meta-meta first. |
| No-skip execution | Legal cursor, stage gates, task ledger, and validation endpoints exist in the local runtime. |
| Customer grill | Interrogation questions, answer capture, contradiction/completeness scoring, trace links, and approval gate exist. |
| Artifact factory | Current local engine can generate a large artifact BOM, templates, rubrics, review assignments, and evidence records. |
| Code/test slice | Local generated implementation, unit/scenario/browser/accessibility/security evidence exists for the bounded test package. |
| Human resteer | Change requests reopen downstream stages and preserve approval/evidence records. |
| Truth boundary | Recovery Truth Inventory separates achieved, scaffold-only, descriptor-only, and not-achieved claims. |
| PB-01 runtime spine | Local product platform endpoint, platform comments, capability gates, roles, project spaces, and Platform Spine UI exist. |

## Why The Prior Work Still Did Not Solve The Owner's Ask

The owner does not want a proof pile. The owner wants a product that feels like a better-than-outsourcing SDLC firm:

- Start a project from messy human intent.
- Generate the right project-specific factory, not a generic checklist.
- Interrogate the client until the spec is fit to build.
- Show agent quorum work, conflicts, approvals, and evidence.
- Prevent skipped stages with a visible TPM-grade workflow cursor.
- Produce artifacts, source, tests, browser evidence, handoffs, and change-control closure.
- Let a human return later, inspect everything, ask questions, and resteer any node with transitive downstream impact.

The prior UI had pieces of that system but did not make the product journey self-evident. That was a product failure.

## Redesign Contract

The first viewport must answer these questions without the user reading documentation:

1. What mission is active?
2. Which factory route is selected?
3. What is the only legal next action?
4. What human decision or blocker exists?
5. Which agent/stage owns the next move?
6. Where can the human inspect evidence, graph impact, runtime spine, protocol events, and change control?

## Implemented UX Changes

- Replaced the prior first screen with a guided mission-control surface.
- Added a six-step workflow runway: Set mission, Approve route, Grill spec, Execute skills, Review evidence, Resteer or handoff.
- Added a right-side supervisor pane for legal next action, active agent, evidence, handoff, Hawkeye status, human decision queue, and recovery batches.
- Reduced first-screen cognitive load by moving deeper material into named rooms: Mission Control, Intake And Grill, Evidence Room, Spec Graph, Resteer, Runtime Spine, Agent Protocol.
- Added a Product Rescue Brief on the overview page that states what was achieved, what was missed, and what the owner actually wants.
- Preserved the existing API and DOM contract so the working runtime remains connected.
- Added Playwright assertions for workflow-runway clarity and desktop/mobile horizontal overflow.
- Fixed a mobile overflow defect caused by long evidence record paths.
- Reordered mobile layout so the mission/workflow appears before navigation and ledger material.

## UX Reviewer Panel

| Reviewer | Persona | Non-negotiable | Verdict |
| --- | --- | --- | --- |
| Principal Product Leader | Has launched complex enterprise developer tools and refuses proof theater. | The first screen must show the actual job-to-be-done and next action. | Pass for local slice. |
| Staff UX Architect | Specializes in agentic workflow, progressive disclosure, and operator consoles. | Advanced evidence must be discoverable without drowning first-use comprehension. | Pass with PB-02 caveat. |
| Hawkeye Product Auditor | Audits no-skip workflow, truth boundaries, and test evidence. | No claim may exceed local runtime and Playwright evidence. | Pass for local UI redesign slice. |

## 15-Point UX Acceptance Rubric

| # | Check | Result |
| --- | --- | --- |
| 1 | First viewport names the mission. | Pass |
| 2 | First viewport exposes the current legal next action. | Pass |
| 3 | Workflow order is visible before advanced artifacts. | Pass |
| 4 | Human decision queue is visible. | Pass |
| 5 | Hawkeye audit posture is visible. | Pass |
| 6 | Evidence room remains accessible. | Pass |
| 7 | Spec Graph and redo are separate from intake. | Pass |
| 8 | Runtime platform spine has its own room. | Pass |
| 9 | Agent protocol has its own room. | Pass |
| 10 | Change/resteer has an explicit room. | Pass |
| 11 | The UI does not call local proof a hosted product. | Pass |
| 12 | Desktop browser smoke passes. | Pass |
| 13 | Mobile browser smoke passes. | Pass |
| 14 | Horizontal overflow is rejected by Playwright. | Pass |
| 15 | Long evidence paths wrap instead of breaking layout. | Pass |

## Validation Evidence

- `node --check dark-factory-control-console/server.js`
- `node --check dark-factory-control-console/public/app.js`
- `npm test`
- `npm run test:browser`
- `python dark-factory-meta-skills-design/scripts/validate_tasks_md.py dark-factory-meta-skills-design/TASKS.md`

## Remaining Product Gap

This redesign improves the local product experience. It does not close PB-02:

- Hosted authentication and RBAC remain missing.
- Durable database-backed multi-tenant persistence remains missing.
- External provider orchestration remains local/descriptive.
- Production deployment, support workflow, incident operations, and service-management workflow remain future batches.

## Next Legal Product Batch

PB-02: hosted enterprise runtime and production collaboration substrate.
