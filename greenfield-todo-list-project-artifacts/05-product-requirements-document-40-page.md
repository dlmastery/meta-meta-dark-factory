# Product Requirements Document: Reference Todo And Habits Benchmark App

Document status: Draft PRD, controlling artifact for intake, validation, and factory simulation.

Project mode: Greenfield benchmark simulation.

Prepared by: Codex dark-factory meta-skills.

Date: 2026-04-24.

Important gate: This PRD is intentionally written before design and implementation. It includes customer interrogation requirements, assumptions, open questions, artifact requirements, traceability expectations, validation gates, and anti-overfit rules. The todo and habits application is a reference benchmark for exercising the meta-skill factory, not the ultimate target product. Final product design cannot proceed until the customer confirms or edits the intake answers.

\pagebreak

## Page 1. Document Control

### Purpose

This PRD defines the expected benchmark product, scope, requirements, validation model, and governance rules for a greenfield todo-and-habits reference application. It is the first controlling artifact. It must guide future SRS, HLD, LLD, ADRs, test plan, implementation, release, and handoff artifacts.

### Version

Version: 0.4 draft, revised after customer selected 1,2,3,4 clarification areas.

Status: customer-interrogation draft with factory operating controls.

Approval state: not approved.

### Ownership

Product owner: customer/user.

Factory owner: Codex dark-factory orchestrator.

Maintainer: to be confirmed.

### Rule

No implementation should begin until this PRD has either:

1. Customer-approved answers to the intake questions.
2. Explicitly accepted assumptions for all unresolved questions.
3. Customer-confirmed benchmark mode, excellence dimensions, habit scope, and backend/sync/production stress path.

\pagebreak

## Page 2. Executive Summary

The requested example product is a "state of art, best of best in the world" todo and habits list application. This is a benchmark application for simulation and testing of the dark-factory meta-skills, not the ultimate product the factory exists to build. The point is to pressure-test the factory on a familiar but deceptively rich domain: tasks, habits, recurrence, streaks, persistence, UX polish, validation, sync, privacy, accessibility, release, SRE handoff, and maintainability.

This PRD therefore has two simultaneous purposes:

1. Define a rigorous reference application.
2. Prove that the meta-skill factory can run a disciplined SDLC without overfitting to this one application.

The first deliverable is a high-quality product and factory definition that can drive standards-based SDLC artifacts, agentic factory execution, and reusable evaluation of the meta-skills themselves.

Customer clarification `1,2,3,4` is interpreted as approval to cover all four outstanding clarification areas:

- Treat the app as a reference benchmark for factory simulation.
- Keep habits in the benchmark scope.
- Define "best of best" across UX, habit science, reliability, architecture, documentation, and factory proof.
- Include backend/sync/production paths as factory stress paths, not just local-only demo behavior.

Draft benchmark target:

- A single-user-first web app with a local-first experience.
- Optional account/login path for sync stress testing.
- Local browser persistence plus backend sync path.
- Core todo features: create, read, update, complete, delete, filter.
- Core habit features: create a habit, mark daily completion, view basic streak state.
- Basic accessibility and maintainability.
- Production-style deployment and SRE handoff artifacts included for simulation.

This benchmark should be broad enough to exercise the factory but still controlled enough to avoid uncontrolled product sprawl.

\pagebreak

## Page 3. Product Vision

The reference app should help a user capture tasks, build habits, and see progress with minimal friction. It should feel fast, clear, trustworthy, and polished enough to test whether the factory can produce high-quality product thinking rather than generic CRUD output.

The benchmark vision has two layers.

Layer 1: product ambition.

- Capture tasks quickly.
- See what is pending.
- Mark work complete.
- Edit mistakes.
- Remove tasks.
- Create habits.
- Mark habit completions.
- See simple streak or consistency feedback.
- Preserve tasks across normal browser refresh.

Layer 2: factory evaluation.

- Demonstrate customer interrogation.
- Demonstrate requirements traceability.
- Demonstrate alternative design decisions.
- Demonstrate NFR handling.
- Demonstrate tests and holdouts.
- Demonstrate handoff and project-book quality.
- Demonstrate that the process generalizes beyond todo/habit apps.

The product should be understandable on first use. The user should not need onboarding, documentation, or training for the core loop.

The long-term vision may include due dates, priorities, labels, recurring tasks, rich habit schedules, streak analytics, collaboration, reminders, mobile apps, integrations, and commercial account management. The benchmark-thin-slice baseline includes only the minimal auth and sync path needed to exercise the factory. Advanced product features remain deferred until the customer confirms them.

\pagebreak

## Page 4. Problem Statement

Users need a simple way to externalize short-term obligations and reinforce repeated behaviors. Without a task and habit system, users rely on memory, scattered notes, messages, calendar entries, or guilt-driven self-tracking that may not support lightweight daily execution.

The problem is not merely "store text." The product must support a small behavioral loop:

1. Remember something.
2. Capture it quickly.
3. See it later.
4. Complete it.
5. Trust that it stays saved.

For the benchmark-thin-slice, the app should optimize for speed, clarity, and evaluation value. It should avoid feature bloat until the core task and habit loops are validated.

If the customer intends this for teams, regulated work, sensitive tasks, behavioral health, coaching, or production use, the problem statement changes. Team or production use introduces identity, sharing, permissions, synchronization, auditability, privacy, operational support, and possibly higher ethical scrutiny.

\pagebreak

## Page 5. Customer Interrogation Protocol

The first step of the project is customer interrogation for spec development and validation. This is not optional, and it is not a one-time checklist. It is a controlled discovery, validation, scoring, and approval protocol.

### Round 1: Discovery

The factory must ask or resolve:

1. Who is the app for?
2. What is the V1 product outcome?
3. Is this a demo, internal tool, or production product?
4. Is login required?
5. Is backend sync required?
6. Is sharing required?
7. Which task fields are required?
8. Which devices matter?
9. What is the preferred stack?
10. Who maintains it after delivery?
11. Is deployment in scope?
12. What artifacts must be delivered?
13. Is this app being used primarily as a benchmark to test the factory?
14. What does "state of art best of best" mean for this benchmark: UX polish, habit science, reliability, architecture, documentation, or all of these?
15. Which requirements are product requirements, and which are factory-evaluation requirements?
16. What should the factory avoid overfitting to in this example?
17. The prior "1,3" shorthand is superseded by the later "1,2,3,4" instruction, interpreted as selecting all four outstanding clarification areas.

### Round 2: Contradiction And Completeness Check

The factory must check answers for contradictions and missing decisions. Examples:

- If the customer asks for cross-device use but rejects backend sync, the factory must flag the conflict.
- If the customer asks for production deployment but does not identify an owner, the factory must block release planning.
- If the customer asks for sensitive tasks but rejects authentication or privacy controls, the factory must escalate.

### Round 3: Scenario Validation

The factory must convert answers into 3 to 7 core user journeys and ask the customer to confirm that these journeys represent V1 success. At minimum, the todo portion must validate add, complete, edit, delete, filter, and persistence behavior unless explicitly descoped. For the habit portion, the benchmark must validate create habit, mark completion, show status, preserve history, and explain streak behavior unless explicitly descoped.

### Round 4: Non-Functional Validation

The factory must validate usability, accessibility, performance, reliability, privacy, maintainability, deployment, and handoff expectations. Missing non-functional requirements must be recorded as assumptions, not silently ignored.

### Round 5: Artifact And Standards Validation

The factory must ask which artifacts and standards are required. If the customer does not specify company standards, the factory applies the default meta-skill baseline: PRD, SRS, NFR catalog, traceability matrix, ADRs for major decisions, HLD/LLD as needed, test plan, review scorecards, and handoff notes.

The factory must also ask which artifacts are being evaluated for the meta-skill system itself. For this benchmark, the PRD must evaluate not only whether the app is good, but whether the meta-skill pipeline produces reusable, standards-based, non-overfit artifacts.

### Answer Capture

Every answer must be recorded as one of:

- Customer-confirmed requirement.
- Customer-confirmed constraint.
- Accepted assumption.
- Open question.
- Deferred decision.
- Rejected option.

Each captured answer receives an ID and becomes traceable to requirements, decisions, tests, and artifacts.

The latest customer signal "1,2,3,4" is captured as ANS-004 and interpreted as selecting all four outstanding clarification areas. The prior "1,3" ambiguity is superseded by this broader clarification.

### Intake Scoring

Before design begins, the intake must be scored by three reviewers:

- Product/Domain Expert.
- Requirements/Traceability Lead.
- Governance Auditor.

Default pass threshold: 96 percent for high-rigor factory mode. If the score is lower, the factory must re-interrogate only the weak areas.

### Approval Mechanics

The factory may continue only if the customer answers these questions or accepts stated assumptions.

This requirement is implemented by the `$df-intake-spec-lab` meta-skill.

\pagebreak

## Page 6. Stakeholders

### Primary Stakeholders

Customer/Product Owner:

- Defines product direction.
- Accepts or rejects assumptions.
- Approves scope and trade-offs.

End User:

- Uses the app to manage tasks.
- Needs a simple, reliable task workflow.

Maintainer:

- Owns future changes.
- Needs readable code, clear decisions, and concise handoff notes.

### Factory Roles

Dark Factory Orchestrator:

- Routes work through intake, artifacts, traceability, quality gates, and handoff.

Product/Domain Expert:

- Validates user goals and product usefulness.

Requirements/Traceability Lead:

- Ensures requirements are atomic, testable, and linked.

Governance Auditor:

- Ensures assumptions, risks, and stage gates are explicit.

\pagebreak

## Page 7. RASCI And Bidirectional Handoff

| Area | Responsible | Accountable | Supporting | Consulted | Informed |
| --- | --- | --- | --- | --- | --- |
| Product intent | Product Expert | Customer | Requirements Lead | End User | Factory |
| Requirements | Requirements Lead | Customer | Product Expert | Governance Auditor | Maintainer |
| Architecture | System Architect | Customer or Tech Owner | Security/SRE if needed | Product Expert | Maintainer |
| Implementation | Implementation Agent | Tech Owner | Test Lead | Product Owner | Maintainer |
| Validation | Test Lead | Customer | Requirements Lead | Product Expert | Factory |
| Handoff | Maintainer Lead | Customer | SRE Lead if needed | Implementation Agent | Stakeholders |

Because the accepted benchmark now includes local-first behavior, backend sync, authentication, and production-readiness simulation, this RASCI must assume full accountability for requirements, security, verification, release, operations evidence, and human handoff. If the customer later descopes the benchmark to Mode A only, the artifact set may be formally tailored down through change control.

### Human-Agent Handoff Rules

The project must support bidirectional role swapping at any stage.

Agent to human handoff is required when:

- A customer taste decision is needed.
- A standard, scope, threshold, or risk waiver is needed.
- Expert critics disagree after review loops.
- Production, security, privacy, or irreversible data risk is present.
- Confidence is too low to proceed safely.

Human to agent handoff is required when:

- The customer answers an open question.
- A human edits requirements, artifacts, code, or test expectations.
- A human approves, rejects, or modifies an assumption.
- A human completes a manual decision and asks the factory to continue.

Every handoff must include:

- Current node.
- Current owner.
- Completed work.
- Incomplete work.
- Decisions made.
- Open questions.
- Files and artifacts touched.
- Verification already run.
- Verification still required.
- Next safe action.

After any human edit, the factory must re-run affected traceability, review, and validation gates before continuing.

### Async Feedback Protocol

Every customer or reviewer comment must be classified as one of:

- Clarification.
- Requirement change.
- Defect.
- Preference.
- Risk acceptance.
- Standards decision.
- Production or maintenance decision.

The factory must link each comment to affected requirements, artifacts, tests, risks, and owners. If the comment changes scope, behavior, or quality expectations, it becomes a formal change request and must trigger impact analysis before implementation continues.

### Handoff Replay Test

For any major ownership swap, a fresh reviewer must be able to resume from the handoff record without reading the full chat history. If the reviewer cannot identify current objective, decisions, open risks, touched artifacts, verification state, and next action, the handoff fails.

\pagebreak

## Page 8. Product And Benchmark Modes

The customer must choose the intended product and benchmark mode.

### Mode 0: Factory Benchmark / Simulation App

The todo and habits app is a deliberately chosen reference workload for testing the dark-factory meta-skills. The app should be realistic and high quality, but the primary learning objective is validating the factory process: interrogation, artifacts, traceability, critic review, handoff, context management, and certification.

### Mode A: Local Personal Todo App

No login. Tasks stay in the browser. Best for demos, learning, or lightweight personal use.

### Mode B: Personal Cloud Todo App

Login required. Tasks sync across devices. Requires backend, database, authentication, security review, deployment, and operations artifacts.

### Mode C: Team Todo App

Multiple users share lists. Requires permissions, collaboration model, auditability, conflict handling, and stronger testing.

### Mode D: Production SaaS

External users, reliability expectations, monitoring, incident response, privacy, support, and release management.

Draft decision: Mode 0 benchmark plus Mode B personal cloud and Mode D production-readiness simulation. Mode A local behavior remains as the local-first fallback, but the benchmark must also exercise sync, auth, deployment, observability, and handoff paths.

\pagebreak

## Page 9. Benchmark Thin-Slice Scope

Draft benchmark scope under Mode 0 plus Mode B and Mode D simulation:

- Add a task.
- View tasks.
- Mark a task complete.
- Reopen a completed task.
- Edit task title.
- Delete a task.
- Filter all, active, and completed tasks.
- Persist tasks after browser refresh.
- Add a habit.
- Mark a habit complete for today.
- View habit completion state.
- Preserve habit completion history after browser refresh.
- Optional account/login path for synced use.
- Sync tasks and habit completions across devices when backend mode is enabled.
- Provide production-style deployment, rollback, observability, and handoff artifacts.
- Present a clean responsive UI.
- Provide basic keyboard and screen-reader support.

V1 should be small enough to build, test, and hand off cleanly while still exercising the factory. The app should favor reliability of the core task and habit loops over advanced features.

The product should not include features simply because other todo or habit apps have them. Every feature must be tied to customer value, factory-evaluation value, and validation scenarios.

Anti-overfit rule: if a requirement would make sense only for this todo/habits example and not as a reusable factory pattern, label it as product-specific. If a requirement tests the factory process, label it as factory-evaluation-specific.

\pagebreak

## Page 10. Out Of Scope For Draft V1

The following are out of scope unless the customer explicitly adds them:

- Team sharing.
- Roles and permissions.
- Push notifications.
- Email reminders.
- Recurring tasks.
- Calendar integration.
- File attachments.
- Natural language task parsing.
- AI task suggestions.
- Full quantified-self analytics.
- Behavioral health claims.
- Medical, therapy, or coaching claims.
- Mobile app store packaging.
- Admin dashboard.
- Payment or billing.
- Full commercial account management beyond the minimal sync identity path.
- Full multi-tenant SaaS production hosting beyond production-readiness simulation.
- Human SRE ownership of a live commercial service.

This out-of-scope list is protective. It keeps the first version focused and prevents hidden architecture commitments.

In scope for the benchmark, despite being outside a simple local demo:

- Minimal account/login path for sync-path validation.
- Backend sync for tasks and habit completions.
- Deployment, rollback, observability, runbook, incident guide, and SRE handoff artifacts for production-readiness simulation.

This benchmark is also not the ultimate product roadmap. It is a test workload for the meta-skill system.

\pagebreak

## Page 11. Assumptions

The current draft assumes:

- The app is for one individual user.
- The app runs in a browser.
- The app stores data locally first and can sync through a backend path for benchmark coverage.
- Authentication is required for the sync path and not required for local-only fallback.
- The local-only fallback may tie data to one browser/device, while the sync path must support cross-device continuity.
- The task title is the only mandatory task field.
- The benchmark includes a minimal habit loop.
- The app is not handling regulated, sensitive, or business-critical data.
- The app is not a commercial SaaS business, but the benchmark includes production-style deployment and SRE handoff artifacts.
- Backend services are included as a stress path for the factory unless later descoped.
- The user values simplicity over advanced planning features.
- The primary purpose is testing and improving the factory process, not declaring a final commercial roadmap.

Each assumption must be accepted, rejected, or replaced by the customer.

\pagebreak

## Page 12. Open Questions

Critical questions:

1. What sync scope is required for the benchmark: tasks only, habits only, or both tasks and habits? Draft answer: both.
2. What identity mechanism should be used for the sync path: email/password, magic link, passkey, local mock auth, or another approach?
3. Should tasks support due dates?
4. Should tasks support priority?
5. Should tasks support labels or categories?
6. Should completed tasks remain visible?
7. Should empty tasks be rejected?
8. Should the app be installable as a PWA?
9. What deployment target should production-readiness simulation assume?
10. What stack should be used?
11. Confirm that the previous "1,3" shorthand is superseded by the later "1,2,3,4" instruction.
12. Habits are included in the benchmark scope.
13. "Best of best" covers usability, depth, habit science, reliability, system design, artifact quality, and factory proof.
14. Which parts of this PRD are product requirements versus factory-evaluation requirements?

Secondary questions:

1. Should task order be manual, newest-first, or oldest-first?
2. Should users be warned before deleting?
3. Should there be undo?
4. Should data export be included?
5. Should the UI have dark mode?
6. Should the benchmark intentionally include one or two higher-complexity features to test the factory?

\pagebreak

## Page 13. Personas

### Persona 1: Individual Planner

Needs a quick place to capture tasks and see what remains. Values speed, clarity, and low friction.

### Persona 2: Busy Knowledge Worker

Juggles small obligations throughout the day. Needs editing, completion, filtering, and persistence.

### Persona 3: Habit Builder

Wants lightweight daily consistency without a heavy quantified-self system. Needs habit creation, daily completion, and simple progress feedback.

### Persona 4: Factory Evaluator

Uses this application to judge whether the meta-skill factory can produce rigorous, reusable, non-overfit artifacts and evidence.

### Persona 5: Future Maintainer

Reads the code later to fix bugs or add features. Needs simple architecture, tests, and clear decisions.

### Persona 6: Product Owner

Wants confidence that the app matches intent. Needs clear requirements, acceptance scenarios, traceability, and a handoff path.

If the customer identifies different personas, the requirements must be updated.

\pagebreak

## Page 14. Primary User Journey

The primary V1 journey:

1. User opens the app.
2. User sees an empty or existing task list.
3. User types a task title.
4. User submits the task.
5. Task appears immediately.
6. User completes the task.
7. User optionally filters active/completed tasks.
8. User refreshes the page.
9. Task state remains correct.

The primary habit journey:

1. User opens the app.
2. User creates a habit such as "Drink water".
3. User marks the habit complete for today.
4. User sees today's completion state.
5. User refreshes the page.
6. Habit state remains correct.

The primary factory-evaluation journey:

1. Factory receives a vague benchmark request.
2. Factory interrogates the customer.
3. Factory creates requirements, scenarios, artifacts, and traceability.
4. Three critics review the PRD.
5. Findings are fixed and recorded.
6. The process remains reusable for other applications.

These journeys are the core acceptance paths. They must work before optional features are considered.

The app should minimize cognitive load. The user should not need to understand data storage, accounts, or settings to use the V1 local app.

\pagebreak

## Page 15. Task Lifecycle

A task may move through these states:

- Created.
- Active.
- Completed.
- Edited.
- Deleted.

Draft lifecycle rules:

- A task starts as active.
- A task must have a non-empty title.
- A completed task can be reopened.
- An edited task keeps its identity.
- A deleted task is removed from the visible list and persistence store.

Open lifecycle decisions:

- Should deletion require confirmation?
- Should there be undo?
- Should completed tasks be archived or only marked complete?
- Should completed tasks preserve completed date?

### Habit Lifecycle

A habit may move through these states:

- Created.
- Active.
- Completed for a date.
- Missed for a date.
- Paused or archived if that feature is retained.
- Deleted.

Draft habit rules:

- A habit starts as active.
- A habit must have a non-empty name.
- A habit can be marked complete for today.
- Habit completion history must persist after refresh.
- Streak language must be factual and not make medical or behavioral-health claims.

\pagebreak

## Page 16. Functional Requirements: Core

| ID | Requirement | Priority |
| --- | --- | --- |
| REQ-TODO-001 | User can create a task with a title. | Must |
| REQ-TODO-002 | User can view all tasks. | Must |
| REQ-TODO-003 | User can mark a task complete. | Must |
| REQ-TODO-004 | User can reopen a completed task. | Should |
| REQ-TODO-005 | User can edit a task title. | Must |
| REQ-TODO-006 | User can delete a task. | Must |
| REQ-TODO-007 | User can filter all, active, and completed tasks. | Should |
| REQ-TODO-008 | User can clear completed tasks. | Could |
| REQ-TODO-009 | User cannot save an empty task. | Must |
| REQ-TODO-010 | Task data persists after refresh. | Must |
| REQ-HABIT-001 | User can create a habit with a name. | Must |
| REQ-HABIT-002 | User can view active habits. | Must |
| REQ-HABIT-003 | User can mark a habit complete for today. | Must |
| REQ-HABIT-004 | User can see today's habit completion state. | Must |
| REQ-HABIT-005 | Habit completion history persists after refresh. | Must |
| REQ-HABIT-006 | User can delete or archive a habit. | Should |
| REQ-FACTORY-001 | The project artifacts identify product-specific versus factory-evaluation-specific requirements. | Must |
| REQ-FACTORY-002 | The factory must not overfit templates, validation, or conclusions to this todo/habits benchmark. | Must |

\pagebreak

## Page 17. Functional Requirements: Optional Features

The following are optional until the customer confirms them:

| ID | Requirement | Draft Status |
| --- | --- | --- |
| REQ-OPT-001 | User can add due dates. | Deferred |
| REQ-OPT-002 | User can assign priorities. | Deferred |
| REQ-OPT-003 | User can assign labels. | Deferred |
| REQ-OPT-004 | User can create subtasks. | Deferred |
| REQ-OPT-005 | User can create recurring tasks. | Deferred |
| REQ-OPT-006 | User can search tasks. | Deferred |
| REQ-OPT-007 | User can reorder tasks manually. | Deferred |
| REQ-OPT-008 | User can export tasks. | Deferred |
| REQ-OPT-009 | User can enable dark mode. | Deferred |
| REQ-OPT-010 | User can install the app as a PWA. | Deferred |

\pagebreak

## Page 18. Functional Requirements: Identity And Sync

Draft benchmark decision: identity and sync are included as a factory stress path. Local-only behavior remains as a fallback mode, but the benchmark must exercise the full artifact and validation path for authentication, backend persistence, privacy, deployment, and operations.

Identity requirements:

- User registration or SSO.
- Login/logout.
- Session management.
- Password or external identity provider rules.
- Account deletion.
- Data ownership.

Sync requirements:

- Backend API.
- Database.
- Conflict handling.
- Cross-device consistency.
- Server-side validation.
- Production deployment.
- Monitoring and backup expectations.

Identity and sync are architecture-changing requirements. They require ADRs, threat modeling, test expansion, and production/handoff artifacts.

\pagebreak

## Page 19. Non-Functional Requirements: Usability

| ID | Requirement | Draft Target |
| --- | --- | --- |
| NFR-UX-001 | Core actions are obvious. | Add, complete, edit, delete, filter visible or discoverable. |
| NFR-UX-002 | First use requires no training. | Empty state guides task creation. |
| NFR-UX-003 | UI is responsive. | Works on common desktop and mobile widths. |
| NFR-UX-004 | Feedback is immediate. | Actions visibly update state. |
| NFR-UX-005 | Error messages are clear. | Empty task error is understandable. |

The V1 experience should be calm and direct. It should not feel like a marketing landing page or a heavy enterprise dashboard.

\pagebreak

## Page 20. Non-Functional Requirements: Accessibility

| ID | Requirement | Draft Target |
| --- | --- | --- |
| NFR-A11Y-001 | Controls are keyboard accessible. | User can add, complete, edit, delete, and filter using keyboard. |
| NFR-A11Y-002 | Controls have accessible names. | Inputs and buttons are labeled. |
| NFR-A11Y-003 | Focus is visible. | Keyboard focus can be seen. |
| NFR-A11Y-004 | Color is not the only status signal. | Completed tasks use text or icon treatment as well as color. |
| NFR-A11Y-005 | Layout supports small screens. | No overlapping text or controls. |

Accessibility should be part of V1 quality, not a later patch.

\pagebreak

## Page 21. Non-Functional Requirements: Performance

Draft target:

- Adding, editing, completing, and deleting a task should feel instant for normal personal use.
- Filtering should update immediately for typical list sizes.
- Initial load should be quick for a small local app.

Because backend sync, authentication, and larger histories are included as benchmark stress paths, performance requirements must include both local interaction targets and sync-path targets.

Suggested draft targets:

- Common local actions: under 100 ms perceived response.
- Initial app load: under 2 seconds on a normal connection if deployed.
- List scale: at least 500 local tasks without unusable lag.

\pagebreak

## Page 22. Non-Functional Requirements: Reliability

| ID | Requirement | Draft Target |
| --- | --- | --- |
| NFR-REL-001 | Tasks persist after refresh. | Data remains after normal browser reload. |
| NFR-REL-002 | Invalid input does not corrupt data. | Empty or whitespace-only tasks rejected. |
| NFR-REL-003 | Repeated toggles remain consistent. | Complete/reopen cycles preserve expected state. |
| NFR-REL-004 | Delete is stable. | Deleted tasks do not reappear. |

If local browser storage is used, the PRD must disclose that clearing browser data may remove tasks. If that is unacceptable, backend sync is required.

\pagebreak

## Page 23. Non-Functional Requirements: Security And Privacy

For local-first use:

- Do not send task data to a server.
- Do not log task content externally.
- Do not embed third-party analytics unless approved.
- Do not request unnecessary permissions.
- Treat task text as potentially private.

For backend sync:

- Add authentication.
- Add authorization.
- Add encryption in transit.
- Define data deletion.
- Define backup and retention.
- Add threat model.
- Add security test plan.
- Add incident response requirements.

\pagebreak

## Page 24. Data Requirements

Draft task entity:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | string | Yes | Stable unique task ID |
| title | string | Yes | Trim whitespace; reject empty |
| completed | boolean | Yes | Default false |
| createdAt | datetime | Should | Useful for ordering/debugging |
| updatedAt | datetime | Should | Useful after edits |
| completedAt | datetime | Could | Useful if completion history matters |

Draft habit entity:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | string | Yes | Stable unique habit ID |
| name | string | Yes | Trim whitespace; reject empty |
| active | boolean | Yes | Default true |
| createdAt | datetime | Should | Useful for ordering/debugging |
| completions | date list | Yes | Dates where user marked completion |
| archivedAt | datetime | Could | Needed only if archive is retained |

Draft storage:

- Local browser storage for instant local-first behavior.
- Server persistence for sync-path benchmark coverage.
- Conflict handling and reconciliation rules to be finalized in ADR-STORAGE-001.

Open decision:

- Should data export or import be included?

\pagebreak

## Page 25. UX Requirements

Draft screen regions:

- Header or title.
- Add-task input.
- Task list.
- Filter controls.
- Optional task counts.
- Empty state.

Task item controls:

- Complete/reopen control.
- Task title.
- Edit control or inline edit.
- Delete control.

UI quality:

- Text must not overlap.
- Controls must be touch-friendly on mobile.
- Focus states must be visible.
- Layout must remain stable when tasks change.

\pagebreak

## Page 26. User Feedback And Error Handling

The app must provide feedback for:

- Task added.
- Task completed.
- Task reopened.
- Task edited.
- Task deleted.
- Habit added.
- Habit completed for today.
- Empty task rejected.
- No tasks match current filter.

The app should avoid noisy notifications for every normal action. Visual state change is enough for most actions.

Errors should be human-readable:

- "Task title cannot be empty."
- "Habit name cannot be empty."
- "Unable to save tasks in this browser."

If local storage fails, the app should tell the user that persistence is unavailable.

\pagebreak

## Page 27. Acceptance Criteria

AC-TODO-001:

Given the user enters a non-empty title, when they submit, then a new active task appears.

AC-TODO-002:

Given an active task exists, when the user marks it complete, then it is visually shown as completed.

AC-TODO-003:

Given a completed task exists, when the user reopens it, then it is active again.

AC-TODO-004:

Given a task exists, when the user edits its title, then the new title is saved.

AC-TODO-005:

Given a task exists, when the user deletes it, then it no longer appears after refresh.

AC-TODO-006:

Given mixed task states, filters show the correct subset.

AC-TODO-007:

Given tasks exist, when the user selects all tasks, then active and completed tasks are visible.

AC-TODO-008:

If clear completed remains in scope, given completed tasks exist, when the user clears completed tasks, then completed tasks are removed and active tasks remain.

AC-TODO-009:

Given the user enters an empty or whitespace-only title, when they submit, then no task is created and a clear validation message is shown.

AC-TODO-010:

Given tasks exist, when the page refreshes, then task titles and completion states remain correct.

AC-HABIT-001:

Given the user enters a non-empty habit name, when they submit, then a new active habit appears.

AC-HABIT-002:

Given an active habit exists, when the user marks it complete for today, then today's completion state is shown.

AC-HABIT-003:

Given a habit was completed today, when the page refreshes, then today's completion state remains visible.

AC-HABIT-004:

Given the user enters an empty or whitespace-only habit name, when they submit, then no habit is created and a clear validation message is shown.

AC-FACTORY-001:

Given a future non-todo benchmark request, when the factory reuses this process, then it preserves interrogation, traceability, review, handoff, and certification without copying todo-specific requirements.

\pagebreak

## Page 28. Acceptance Scenarios

Scenario: Add a task.

- Given the app is open.
- When the user adds "Buy milk".
- Then "Buy milk" appears as active.

Scenario: Reject empty task.

- Given the app is open.
- When the user submits whitespace.
- Then no task is created.
- And a clear validation message appears.

Scenario: Complete and reopen task.

- Given an active task exists.
- When the user completes it.
- Then it appears completed.
- When the user reopens it.
- Then it appears active.

Scenario: Persist task after refresh.

- Given a task exists.
- When the page refreshes.
- Then the task remains.

Scenario: Add and complete a habit.

- Given the app is open.
- When the user adds the habit "Walk".
- Then "Walk" appears as an active habit.
- When the user marks "Walk" complete for today.
- Then today's completion state is shown.

Scenario: Preserve habit completion.

- Given a habit is marked complete for today.
- When the page refreshes.
- Then the habit still shows today's completion state.

Scenario: Reuse factory process on another domain.

- Given the factory has produced this todo/habits PRD.
- When a future benchmark uses a different app domain.
- Then the factory reuses the interrogation, traceability, critic review, handoff, and certification process without copying todo/habit product assumptions.

\pagebreak

## Page 29. Holdout Validation Candidates

The implementation agent and the meta-skill process should not overfit to only visible examples or to the todo/habits domain. Holdout scenarios should include:

- Add task with leading and trailing spaces.
- Try to save an empty task.
- Add multiple tasks quickly.
- Toggle a task complete and active several times.
- Edit a task, refresh, and verify the edit persists.
- Delete a task, refresh, and verify it remains deleted.
- Filter active tasks after several completions.
- Use keyboard only for the core loop.
- Resize to mobile width and verify no overlap.
- Add a habit with leading and trailing spaces.
- Mark a habit complete, refresh, and verify completion persists.
- Attempt to create an empty habit.
- Run a process-level transfer test: apply the same artifact and review protocol to a different example domain.

These become validation scenarios in the dark-factory loop.

### Anti-Overfit Evaluation

The factory must demonstrate:

- Product-specific requirements are clearly labeled.
- Factory-evaluation requirements are clearly labeled.
- Templates do not hard-code todo/habit assumptions.
- Critic rubrics remain reusable for future projects.
- Traceability schema can support another product domain.
- Handoff and context-memory controls are domain independent.

\pagebreak

## Page 30. Bidirectional Traceability Matrix Draft

Traceability must work forward and backward. A reviewer must be able to start from a customer answer, requirement, assumption, risk, artifact, test, or future code change and understand why it exists and what verifies it.

| Source Item | Requirement Or Decision | Acceptance / Test Evidence | Artifact Links | Risk Links | Status |
| --- | --- | --- | --- | --- | --- |
| ANS-004 Customer selected "1,2,3,4" | Cover all four clarification areas | Intake approval certificate | PRD, Intake Record | Misinterpretation risk reduced | Accepted |
| ANS-001 Product mode | Mode 0 plus Mode B and Mode D simulation | Intake approval certificate | PRD, SRS, HLD | RISK-001, RISK-002 | Accepted |
| ANS-002 Storage model | Local-first plus backend sync, ADR-STORAGE-001 | Persistence and sync scenarios, local and server tests | PRD, SRS, ADR, Test Plan | RISK-001, RISK-004 | Accepted |
| ANS-003 Identity model | Login required for sync path, ADR-IDENTITY-001 | Auth tests required | PRD, SRS, Threat Model | RISK-002 | Accepted |
| REQ-TODO-001 | Create task | AC-TODO-001, browser scenario | PRD, SRS, Test Plan | None known | Draft |
| REQ-TODO-002 | View tasks | AC-TODO-007 | PRD, SRS, Test Plan | None known | Draft |
| REQ-TODO-003 | Complete task | AC-TODO-002 | PRD, SRS, Test Plan | None known | Draft |
| REQ-TODO-004 | Reopen task | AC-TODO-003 | PRD, SRS, Test Plan | None known | Draft |
| REQ-TODO-005 | Edit task | AC-TODO-004 | PRD, SRS, Test Plan | RISK-004 | Draft |
| REQ-TODO-006 | Delete task | AC-TODO-005 | PRD, SRS, Test Plan | RISK-004 | Draft |
| REQ-TODO-007 | Filter tasks | AC-TODO-006 | PRD, SRS, Test Plan | None known | Draft |
| REQ-TODO-008 | Clear completed | AC-TODO-008 if retained | PRD, SRS, Test Plan | Data loss confusion | Deferred |
| REQ-TODO-009 | Reject empty task | AC-TODO-009, empty task scenario | PRD, SRS, Test Plan | Data quality | Draft |
| REQ-TODO-010 | Persist tasks | AC-TODO-010, persistence scenario | PRD, SRS, ADR, Test Plan | RISK-004 | Draft |
| REQ-HABIT-001 | Create habit | AC-HABIT-001, habit creation scenario | PRD, SRS, Test Plan | Data quality | Draft |
| REQ-HABIT-002 | View habits | Habit list scenario | PRD, SRS, Test Plan | None known | Draft |
| REQ-HABIT-003 | Complete habit today | AC-HABIT-002 | PRD, SRS, Test Plan | Streak confusion | Draft |
| REQ-HABIT-004 | Show completion state | AC-HABIT-002 | PRD, SRS, Test Plan | UX ambiguity | Draft |
| REQ-HABIT-005 | Persist habit history | AC-HABIT-003 | PRD, SRS, ADR, Test Plan | RISK-004 | Draft |
| REQ-HABIT-006 | Delete or archive habit | Acceptance to be finalized | PRD, SRS, Test Plan | Data loss confusion | Draft |
| REQ-FACTORY-001 | Separate product and factory requirements | AC-FACTORY-001 | PRD, Project Book, Quality Certificate | RISK-007 | Draft |
| REQ-FACTORY-002 | Avoid overfitting to benchmark | AC-FACTORY-001, transfer test | PRD, Project Book, Retrospective | RISK-007 | Draft |
| REQ-SYNC-001 | Sync tasks and habits across devices | Sync scenario and API tests | PRD, SRS, ADR, HLD, Test Plan | RISK-001, RISK-004 | Draft |
| REQ-AUTH-001 | Authenticate user for sync path | Auth scenario and security tests | PRD, SRS, Threat Model | RISK-002 | Draft |
| REQ-OPS-001 | Produce deployment, rollback, observability, and runbook artifacts | Production readiness review | Release Plan, Runbook, SRE Handoff | RISK-006 | Draft |
| NFR-UX-001 to NFR-UX-005 | Usability | UX review checklist | PRD, SRS, Test Plan | Adoption risk | Draft |
| NFR-A11Y-001 to NFR-A11Y-005 | Accessibility | Keyboard and screen-reader checks | PRD, SRS, Test Plan | RISK-005 | Draft |
| NFR-PERF targets | Performance | Local action timing checks | PRD, SRS, Test Plan | Performance drift | Draft |
| NFR-REL-001 to NFR-REL-004 | Reliability | Refresh, toggle, delete regression tests | PRD, SRS, Test Plan | RISK-004 | Draft |
| HND-001 | Human-agent handoff | Handoff replay test | Handoff Record, Project Book | RISK-006 | Draft |

Traceability is mandatory. Future design, code, tests, and handoff docs must link back to these requirements.

Reverse traceability rule: every future code file, test file, design section, and release note must reference at least one requirement, decision, risk, or customer answer.

\pagebreak

## Page 31. Analytics And Measurement

Product analytics are not required for the benchmark and should not be added without approval. Evidence counters used only for local testing, review, or factory validation are allowed if they do not expose task text or habit names outside the app.

If the customer wants product analytics, define:

- What events are collected.
- Whether task content is excluded.
- Where events are sent.
- How users are informed.
- How data can be deleted.

Possible non-invasive product or evidence metrics:

- Number of tasks created.
- Number of tasks completed.
- Number of habits created.
- Number of habit completions.
- Feature usage counts.
- Local-first and sync-path debug counters.

Privacy principle: never collect task text unless explicitly required and approved.

\pagebreak

## Page 32. Architecture Implications

The following customer decisions drive architecture:

Local-only:

- Static frontend.
- Local browser storage.
- No backend.
- Simple deployment.

Backend sync:

- API.
- Database.
- Authentication.
- Authorization.
- Deployment.
- Monitoring.
- Backup.

Production-readiness simulation:

- CI/CD path.
- Environment configuration.
- Deployment artifact.
- Rollback procedure.
- Observability design.
- Runbook.
- Incident response guide.
- Human SRE handoff.

Team sharing:

- Multi-user model.
- Permissions.
- Shared list ownership.
- Conflict handling.
- Audit and notification rules.

The HLD must account for the accepted benchmark mode: local-first UX, backend sync path, authentication, deployment, observability, and SRE handoff.

Benchmark transfer:

- Architecture decisions must identify which choices are todo/habit-specific.
- Factory process decisions must remain domain independent.
- Any reusable template must be tested against at least one non-todo example before being treated as a meta-skill pattern.

\pagebreak

## Page 33. Technical Constraints

Draft constraints:

- Use a common, maintainable web stack.
- Keep code understandable for future maintainers.
- Include tests for core behavior.
- Avoid unnecessary dependencies.
- Keep backend infrastructure minimal and justified by the accepted sync-path stress test.
- Do not introduce analytics or external data transfer without approval.
- Treat authentication, sync, deployment, observability, and runbook work as benchmark stress-path requirements, not as unlimited SaaS scope.

Open stack decision:

- Plain HTML/CSS/JavaScript.
- React/Vite.
- Next.js.
- Other stack requested by customer.

Recommendation for the accepted benchmark: use a stack that can support local-first UI, tested backend sync, and production-readiness evidence without hiding the implementation behind unnecessary framework complexity. React/Vite plus a small API service is a reasonable default unless the customer chooses another stack.

\pagebreak

## Page 34. Factory-Grade Testing And Validation Strategy

Testing must produce evidence, not just confidence. Every test level must link to requirements and acceptance criteria.

### Required Test Levels

Unit tests:

- Task validation.
- Task state transitions.
- Filtering logic.
- Habit validation.
- Habit completion-state transitions.
- Persistence serialization if separated from UI.

Component or UI tests:

- Add task.
- Reject empty task.
- Edit task.
- Complete and reopen task.
- Delete task.
- Filter tasks.
- Add habit.
- Complete habit for today.
- Preserve habit state after refresh.

Browser journey tests:

- Creating tasks.
- Rejecting empty tasks.
- Editing tasks.
- Completing and reopening tasks.
- Deleting tasks.
- Filtering tasks.
- Persistence after refresh.
- Creating and completing a habit.
- Preserving habit completion after refresh.
- Keyboard accessibility.
- Mobile layout sanity.

Accessibility checks:

- Keyboard-only core journey.
- Visible focus.
- Accessible names for inputs and buttons.
- Completed state not conveyed only by color.

Negative and edge tests:

- Whitespace-only task.
- Long task title.
- Multiple rapid adds.
- Repeated complete/reopen toggles.
- Delete followed by refresh.
- Whitespace-only habit.
- Repeated habit completion attempts for the same day.

Holdout tests:

- Kept separate from implementation prompts when running an agentic loop.
- Used by the quality gate to detect overfitting.
- Updated when human feedback reveals missing behavior.

Transfer tests:

- Apply the same PRD artifact schema to a different reference app domain.
- Confirm product-specific requirements do not leak into the new domain.
- Confirm review rubrics, traceability, handoff, and certification remain reusable.

### TDD/BDD Cadence

For implementation, the factory must use a red-green-refactor loop when practical:

1. Convert accepted requirement into failing test or scenario.
2. Implement the smallest passing behavior.
3. Refactor without changing behavior.
4. Run regression suite.
5. Update evidence record.

### Entry Criteria

- Customer has accepted assumptions or answered blocking questions.
- Requirement IDs and acceptance criteria exist.
- Product-specific and factory-evaluation requirements are labeled.
- Storage and identity decisions are made or explicitly deferred.

### Exit Criteria

- All must-have requirements have passing tests.
- All NFR checks have evidence or accepted deferral.
- Holdout scenarios pass.
- Accessibility baseline passes.
- Traceability matrix is complete for implemented scope.
- Transfer test passes or is explicitly deferred with rationale.
- Test evidence is attached to the quality certificate.

\pagebreak

## Page 35. Release And Handoff Requirements

For the local-first fallback:

- Provide run instructions.
- Provide test instructions.
- Provide brief architecture notes.
- Provide known limitations.

For the accepted backend sync and production-readiness simulation path:

- Provide deployment guide.
- Provide rollback procedure.
- Provide environment configuration.
- Provide observability notes.
- Provide incident response notes.
- Provide maintenance guide.

Human handoff must explain:

- What was built.
- What assumptions were used.
- What is not included.
- How to run it.
- How to test it.
- How to change it safely.

\pagebreak

## Page 36. Risks

| ID | Risk | Severity | Mitigation |
| --- | --- | --- | --- |
| RISK-001 | Sync path introduces complexity beyond local app. | High | Use ADR-STORAGE-001 and keep local-first fallback explicit. |
| RISK-002 | Login/auth path expands security obligations. | High | Use ADR-IDENTITY-001, threat model, and security tests. |
| RISK-003 | Todo app grows into project management app. | Medium | Keep V1 scope explicit. |
| RISK-004 | Browser data loss surprises user. | Medium | Disclose local storage limitation or add backend. |
| RISK-005 | Accessibility skipped as "small app." | Medium | Include basic accessibility acceptance criteria. |
| RISK-006 | Handoff weak because app seems simple. | Medium | Require maintainer notes and tests. |
| RISK-007 | Factory overfits to todo/habits benchmark. | High | Label product-specific versus factory-evaluation requirements and run transfer tests. |
| RISK-008 | "State of art best of best" becomes vague scope expansion. | Medium | Define dimensions of excellence and require customer approval before expanding scope. |
| RISK-009 | "1,2,3,4" is over-broadened into uncontrolled scope. | Medium | Treat as factory stress-path approval, not unlimited feature approval. |
| RISK-010 | Habit features imply behavioral-health claims. | High | Keep habit language factual and avoid medical, therapy, or coaching claims unless explicitly governed. |

\pagebreak

## Page 37. Expert Review, Scorecards, And Certificates

This PRD must be reviewed by three expert roles before design proceeds.

Product/Domain Expert:

- Confirms the product goal, scope, personas, journeys, and success criteria.

Requirements/Traceability Lead:

- Confirms requirements are atomic, testable, prioritized, and linked.

Governance Auditor:

- Confirms assumptions, open questions, gates, artifact plan, and approval state are explicit.

### Required Scorecards

Each reviewer must score 15 base checks from 0 to 4. Benchmark-specific supplemental checks are recorded separately and can block approval if they expose overfit or vague ambition.

Product/Domain scorecard:

- Goal clarity.
- User fit.
- Persona quality.
- Scope clarity.
- Out-of-scope clarity.
- V1 value.
- Success metrics.
- Journey quality.
- UX expectations.
- Open question quality.
- Assumption quality.
- Optional feature handling.
- Maintenance relevance.
- Customer approval readiness.
- Product risk coverage.

Requirements/Traceability scorecard:

- Atomic requirements.
- Testable requirements.
- Priority clarity.
- Functional coverage.
- NFR coverage.
- Acceptance criteria coverage.
- Scenario coverage.
- Assumption traceability.
- Decision traceability.
- Risk traceability.
- Artifact traceability.
- Reverse traceability.
- Deferred item handling.
- Ambiguity handling.
- Evidence readiness.

Governance scorecard:

- Standards baseline.
- Tailoring rationale.
- Required artifacts.
- Stage gates.
- RASCI.
- Handoff protocol.
- Change management.
- Review thresholds.
- Certification model.
- Residual risk handling.
- Async feedback loop.
- Context management.
- Versioning.
- Approval authority.
- Audit readiness.

Supplemental benchmark checks:

- Habit benchmark usefulness.
- State-of-art ambition is defined without uncontrolled scope expansion.
- Anti-overfit controls.
- Transfer-test readiness.
- Product-specific and factory-evaluation requirements are separated.

### Certificate Requirement

The PRD cannot move to final SRS/HLD until it has a PRD quality certificate containing:

- Reviewer roles.
- Scores and failed checks.
- Required fixes.
- Evidence links.
- Residual risks.
- Customer approval state.
- Expiration or re-review trigger.

Gate outcome for this revision:

- Conditional draft.
- Not approved for final design until customer questions are answered or assumptions accepted.

\pagebreak

## Page 38. Full Artifact Roadmap And Standards Tailoring

This project must maintain a living project book of knowledge. The todo/habits benchmark may remain small, but the factory process must still prove rigor and generalizability.

### Standards Tailoring

| Standard Or Method | Included? | Reason | Required Artifacts |
| --- | --- | --- | --- |
| ISO/IEC/IEEE 12207:2017 | Yes | Lifecycle process discipline | Plans, requirements, design, V&V, operation, maintenance evidence |
| ISO/IEC/IEEE 15289:2019 | Yes | Information item quality | Artifact content templates and completeness checks |
| RUP | Tailored | Phase discipline | Vision/PRD, use cases, architecture baseline, test plan, transition notes |
| MDA | Conditional | Needed if model-driven artifacts are requested | CIM, PIM, PSM, transformation record |
| DDD | Tailored | Domain language and future maintainability | Glossary, bounded context note, aggregate/invariant catalog if domain grows |
| TDD/BDD | Yes | Executable validation | Acceptance scenarios, tests, holdouts, regression evidence |
| SSDF/OWASP SAMM | Yes for benchmark stress path | Backend/auth/deployment are included for validation | Threat model, security requirements, security test report |
| SRE | Yes for production-readiness simulation | Deployment and handoff artifacts are included for validation | Deployment guide, rollback, observability, runbook, incident guide |
| Anti-overfit benchmark controls | Yes | Ensure this example improves the factory without hard-coding the domain | Product/factory requirement split, transfer test, reusable template review |

### Artifact Catalog By Phase

| Phase | Artifact | Author | Reviewers | Gate |
| --- | --- | --- | --- | --- |
| Intake | Customer interrogation record | Product Expert | Requirements Lead, Governance Auditor | Intake certificate |
| Intake | Project profile | Product Expert | Customer, Governance Auditor | Customer approval |
| Inception | PRD | Product Expert | Product, Requirements, Governance | PRD certificate |
| Inception | Standards tailoring matrix | Governance Auditor | Quality Lead, Customer | Governance certificate |
| Inception | RASCI and handoff plan | Governance Auditor | Customer, Maintainer | Ownership approval |
| Inception | Risk register | Delivery/Governance | Product, SRE/Security if needed | Risk review |
| Inception | Change management plan | Delivery Manager | Governance, Customer | Change control approval |
| Inception | Quality management plan | Quality Lead | Governance, Test | Quality gate approval |
| Inception | Project book index | Context/Memory Lead | Governance, Maintainer | Context replay gate |
| Requirements | SRS | Requirements Lead | Product, Test, Governance | SRS certificate |
| Requirements | NFR catalog | Requirements Lead | SRE, Security, Product | NFR certificate |
| Requirements | Acceptance scenario catalog | Test Lead | Product, Requirements | Scenario certificate |
| Analysis | Traceability matrix | Traceability Lead | Governance, Test | 100 percent mandatory trace gate |
| Elaboration | ADR: storage model | System Architect | Test, Maintainer, Governance | ADR certificate |
| Elaboration | ADR: identity model if needed | System Architect | Security, Product, Governance | ADR certificate |
| Elaboration | HLD | System Architect | Product, Test, SRE/Security if needed | Architecture certificate |
| Elaboration | LLD | Implementation Lead | Architect, Test, Maintainer | Design certificate |
| Elaboration | MDA CIM/PIM/PSM if selected | MDA Architect | Architect, Governance, Test | Model certificate |
| Elaboration | DDD glossary/context map | DDD Critic | Product, Architect | Domain certificate |
| Construction | Implementation plan | Implementation Lead | Delivery, Test, Maintainer | Build readiness |
| Construction | Code and tests | Implementation Lead | Test, Security if needed, Maintainer | Quality certificate |
| Verification | Test plan and evidence | Test Lead | Requirements, Product, Governance | Verification certificate |
| Verification | Benchmark transfer test | Quality Lead | Governance, Traceability, Product | Anti-overfit certificate |
| Verification | Security/threat model if needed | Security Lead | Architect, SRE, Governance | Security certificate |
| Transition | Release notes | Release Lead | Product, Maintainer | Transition gate |
| Transition | Deployment and rollback guide if deployed | SRE Lead | Security, Release, Human Owner | Production readiness |
| Transition | Runbook and incident guide if deployed | SRE Lead | Support, Security, Human Owner | SRE handoff |
| Maintenance | Maintenance guide | Maintainer Lead | Implementation, Test | Handoff replay gate |
| Feedback | Retrospective and lessons learned | Governance/Feedback Lead | Customer, Maintainer | Learning update |

Under the accepted Mode 0 plus Mode B and Mode D simulation decision, the full artifact road is required. If the customer later descopes to Mode A only, the factory may tailor the artifact set down, but only through a recorded change request and updated quality certificate.

No artifact is accepted without reviewer scorecards, trace links, evidence, and residual-risk state.

### Context-Rot Controls

The factory must maintain:

- Project book index.
- Node-local context pack.
- Structured handoff record.
- Decision log with rejected alternatives.
- Evidence ledger.
- Standards baseline version.

Long-running work must refresh context at phase changes, after human edits, after failed gates, and before handoff.

\pagebreak

## Page 39. Customer Approval Checklist

Customer must approve or edit:

- Benchmark intent: confirm this is a factory simulation/reference app, not the ultimate product.
- Product mode: draft answer is Mode 0 benchmark plus Mode B sync path and Mode D production-readiness simulation.
- V1 benchmark-thin-slice scope.
- Out-of-scope list.
- Storage model: draft answer is local-first plus backend sync.
- Identity model: draft answer is login required for the sync path.
- Required task and habit fields.
- Device targets.
- Accessibility expectations.
- Preferred stack.
- Deployment target.
- Maintainer and handoff expectations.
- Whether optional features are deferred.
- Definition of "state of art best of best": draft answer is UX, habit science, reliability, architecture, documentation, and factory proof.
- Interpretation of `1,2,3,4`: draft answer is all four outstanding clarification paths were selected, superseding the earlier `1,3` shorthand.

The factory should present this checklist before moving into SRS and architecture.

\pagebreak

## Page 40. Next Step

The next step is not coding. The next step is customer approval, correction, or tightening of the captured `1,2,3,4` decisions and the remaining product details.

Recommended customer answer format:

1. Benchmark intent: confirm this is a reference simulation app for testing the meta-skill factory.
2. Product mode: approve or edit Mode 0 benchmark plus Mode B sync path plus Mode D production-readiness simulation.
3. `1,2,3,4`: approve or edit the interpretation that all four clarification areas are selected.
4. Login: approve or edit "required only for sync path."
5. Storage: approve or edit "local-first plus backend sync."
6. V1 task fields: title only, or add due date/priority/labels.
7. V1 habit fields: name only, or add schedule/streak/history/notes.
8. Sync scope: tasks, habits, or both.
9. Devices: desktop, mobile, or both.
10. Stack preference.
11. Deployment target for production-readiness simulation.
12. Maintainer.
13. Must-have artifacts.
14. Any company standards.
15. "State of art best of best" dimensions: approve or edit UX, habit science, reliability, architecture, documentation, and factory proof.

When these answers are approved or edited, the factory can produce the final PRD, SRS, HLD, ADRs, test plan, benchmark transfer test, and implementation plan with traceability.
