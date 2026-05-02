# Product Requirements Document

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

## Product Vision

Northstar Daily helps a single user convert scattered intentions into a realistic day, visible habits, and a shutdown note that improves tomorrow.

## Target User

The initial user is a knowledge worker or founder who juggles work, home, and health commitments and needs one compact place to decide what matters today.

## Core Outcomes

- Capture a task or habit without leaving the keyboard.
- See the true shape of today: tasks, workload, completion, and habit health.
- Plan a realistic work sequence with estimates and overload warnings.
- Track habits using behavior-design cues rather than motivation alone.
- Enter a single-task focus mode.
- Record a shutdown note for learning and continuity.

## Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---:|---|
| `REQ-001` | User can quick-add tasks with title, priority, date, estimate, and tags. | Must | Input `write launch memo p1 today 45m #work` creates an open task with P1, today's date, 45 minutes, and `work` tag. |
| `REQ-002` | User can quick-add habits. | Must | Input starting `habit:` creates a habit with default cue, tiny action, and MAP scores. |
| `REQ-003` | User can view Today, Upcoming, and Inbox task filters. | Must | Filter changes produce visible list changes without reload. |
| `REQ-004` | User can complete and reopen tasks. | Must | Completion changes task status and completion metric. |
| `REQ-005` | User can complete and undo habits for today. | Must | Habit health metric and card state update immediately. |
| `REQ-006` | App displays workload capacity. | Must | Planned minutes are compared to daily capacity and overload changes next action. |
| `REQ-007` | App displays a timeboxed planning sequence. | Should | Open relevant tasks are sorted by priority and shown in start/end order. |
| `REQ-008` | App displays a priority matrix. | Should | Open tasks are placed into Do, Schedule, Delegate, or Drop. |
| `REQ-009` | App supports focus mode. | Should | A selected task appears in focus view and can be completed. |
| `REQ-010` | App supports shutdown notes. | Should | Saved notes appear in review history. |
| `REQ-011` | App supports local export. | Could | Export downloads local JSON state. |
| `REQ-012` | App audits whether today's plan is realistic. | Should | Plan view surfaces capacity, priority, deep-work, and missing-estimate warnings. |
| `REQ-013` | App recommends habit friction levers. | Should | Habit view identifies weakest motivation, ability, or prompt lever for habits. |

## Non-Functional Requirements

| ID | Requirement | Target |
|---|---|---|
| `NFR-001` | No build step for the example. | Static app opens from `index.html`. |
| `NFR-002` | Responsiveness. | Desktop and mobile viewport browser checks pass without horizontal overflow. |
| `NFR-003` | Accessibility basics. | Semantic landmarks, labels, skip link, visible focus states. |
| `NFR-004` | Privacy. | Data remains local in browser storage for this iteration. |
| `NFR-005` | Reliability. | Core behavior tests and browser scenario checks pass. |
| `NFR-006` | Maintainability. | Pure functions are exported for testability. |
| `NFR-007` | Google Material UI standards. | UI uses Material 3 / Material 3 Expressive-aligned tokens for color, typography, shape, motion, state, and accessibility without remote runtime dependencies. |
| `NFR-008` | Human review portal. | Project book exposes a role-based documentation dashboard, machine-readable index, evidence library, diagram atlas, and next-action state for new reviewers. |

## Assumptions

- Single-user local-first app is sufficient for the example iteration.
- The user wants a working demonstrator and project book, not a hosted production service yet.
- Browser local storage is acceptable because no sensitive regulated data is in scope.

## Risks

- "World's best" can become unbounded; this iteration treats it as a world-class product slice with explicit future expansion paths.
- Without real user interviews, persona and workflow choices are informed assumptions. The intake package marks user approval as conditional based on the current request.
- Static local app cannot demonstrate sync, notifications, or integrations. Those are future change-controlled increments.

## Exit Criteria

- Working app exists in `app/`.
- Project-book evidence exists in `project-book/`.
- Core tests pass.
- Browser/WYSIWYG tests pass or record a concrete blocker.
- Plan audit and habit friction insights have unit and browser coverage.
- SDLC, TPM, knowledge graph, meta-meta, and Hawkeye validators pass.
- Material UI conformance, accessibility, and WYSIWYG evidence pass for the bounded static UI.
- Human review portal validation passes for the project-book dashboard and index.
- Residual risks are explicit.
