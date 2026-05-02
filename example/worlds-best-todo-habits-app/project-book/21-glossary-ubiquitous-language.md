# Glossary And Ubiquitous Language

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

## Artifact Passport

| Field | Value |
| --- | --- |
| Catalog ID | `REQ-005` |
| Artifact family | Requirements and product, DDD |
| Project | Northstar Daily todo and habits demonstrator |
| Version | `2026-05-02.1` |
| Status | Standalone draft, not artifact-certified |
| Client decision supported | Establish the product language that requirements, UI, tests, domain model, and future agents must use consistently. |
| Human owner | Abhir |
| Agent owner | Requirements Lead Agent |
| Control links | `DFRUN-NORTHSTAR-20260425-001`, `TB-20260502-030`, `REQ-NORTHSTAR-001` |
| Source links | `02-prd.md`, `03-architecture.md`, `app/app.js`, `tests/core.test.cjs` |
| Evidence links | `tests/core.test.cjs`, `tests/browser-wysiwyg.test.cjs`, `05-traceability-matrix.md` |
| Change control | Any renamed domain term updates PRD, UI text, tests, trace matrix, and future DDD artifacts. |

## Decision Brief

Northstar Daily uses a deliberately small local-first domain language for the current product slice. This glossary prevents future agents from inventing new terms for existing concepts or confusing task management, habit formation, planning, and focus behavior.

This artifact is a draft. It needs DDD critic review before it can be treated as accepted ubiquitous language.

## Bounded Language Areas

| Context | Purpose | Current status |
| --- | --- | --- |
| Daily Planning | Decide whether today is realistic and what sequence to work. | Implemented in UI and `planTasks`. |
| Task Capture | Convert natural text into structured tasks or habits. | Implemented in `parseQuickAdd`. |
| Habit Formation | Track cue, tiny action, motivation, ability, prompt, and streak. | Implemented in habit cards and `habitFrictionInsights`. |
| Focus | Select one task and reduce context switching. | Implemented in focus view. |
| Review | Record shutdown notes and preserve learning. | Implemented in review view. |
| Factory Evidence | Explain the SDLC process and artifacts around the app. | Implemented in project book and portal. |

## Core Terms

| Term | Definition | Source | Use in UI/code/tests | Forbidden or ambiguous meaning |
| --- | --- | --- | --- | --- |
| Northstar Daily | The example todo and habits product built as a dark-factory demonstrator. | `README.md`, `02-prd.md` | App title and project-book title. | Not the final universal DFMS product. |
| Task | A discrete action with title, project, due date, estimate, priority, importance, urgency, tags, and status. | `app/app.js:createTask` | Today, Plan, Focus, Review. | Do not use "todo" when the structured object is meant. |
| Habit | A repeated behavior designed through cue, tiny action, and MAP scores. | `app/app.js:createHabit` | Habits view. | Not a recurring task in the current slice. |
| Cue | The existing context that prompts a habit. | Habit card defaults and PRD. | Habit card body. | Not a notification; no notification system exists. |
| Tiny Action | The smallest visible version of a habit. | Habit card defaults. | Habit card body and friction insight. | Not a full goal. |
| Motivation | One MAP lever measuring desire to perform the habit. | Habit fields. | Habit friction insight. | Not the only success factor. |
| Ability | One MAP lever measuring ease of performing the habit. | Habit fields. | Habit friction insight. | Not user skill certification. |
| Prompt | One MAP lever measuring reliability of a reminder or trigger. | Habit fields. | Habit friction insight. | Not a software push notification in this slice. |
| Streak | Consecutive days, including today, where a habit log contains the date. | `habitStreak` | Habit card metric. | Not a moral judgment or long-term retention proof. |
| Quick Add | A single text input grammar for creating tasks or habits. | `parseQuickAdd` | Header input. | Not natural language AI parsing. |
| Priority | Numeric urgency/importance shortcut from P1 to P4. | `parseQuickAdd`, `createTask` | Task chips, planning order. | Not Eisenhower quadrant by itself. |
| Estimate | Planned minutes for task workload and day sequence. | `createTask`, `calculateStats` | Plan and capacity. | Not measured actual time. |
| Capacity | Daily available planning minutes in the profile. | `profile.dailyCapacityMinutes` | Stats and plan audit. | Not calendar integration. |
| Plan Audit | A set of warnings and suggestions about today's workload quality. | `planAudit` | Plan view. | Not a professional productivity coach. |
| Priority Matrix | Placement of open tasks into Do, Schedule, Delegate, or Drop based on importance and urgency. | `priorityMatrix` | Plan view. | Not project portfolio management. |
| Focus Task | The selected task used in the Focus view. | `focusTaskId` | Focus view. | Not a timer-backed Pomodoro implementation. |
| Shutdown Note | A short review note saved for continuity. | `reviews` state. | Review view. | Not an incident postmortem. |
| Local Storage State | Browser-local serialized app state under `northstar-daily-state-v1`. | `STORAGE_KEY` | Persistence. | Not cloud sync or secure backup. |
| Export | Download of current local JSON state. | App UI. | Header/action control. | Not a signed backup or migration package. |

## Requirement And Test Term Mapping

| Term | Requirement link | Test or evidence link |
| --- | --- | --- |
| Quick Add | `REQ-001`, `REQ-002` | `tests/core.test.cjs` parser cases |
| Habit Streak | `REQ-005` | `tests/core.test.cjs` habit streak case |
| Workload Capacity | `REQ-006`, `REQ-012` | `tests/core.test.cjs` capacity and plan audit case |
| Timeboxed Plan | `REQ-007` | `tests/core.test.cjs` plan ordering case |
| Habit Friction | `REQ-013` | `tests/core.test.cjs` friction insight case |
| WYSIWYG UI | `NFR-002`, `NFR-003`, `NFR-007` | `tests/browser-wysiwyg.test.cjs`, accessibility evidence |

## Aliases And Normalization Rules

| Alias | Preferred term | Rule |
| --- | --- | --- |
| Todo | Task | Use "task" in code, tests, and artifacts when referring to the structured object. |
| Routine | Habit | Use "habit" unless discussing a cue anchored to an existing routine. |
| Reminder | Prompt | Use "prompt" for behavior design; use "notification" only if future product scope adds software notifications. |
| Day plan | Timeboxed Plan | Use "plan" for the view; use "timeboxed plan" for sequence output. |
| Done | Completed | UI may say "done"; artifacts should define completion as task status `done` or habit log for date. |
| Review note | Shutdown Note | Use shutdown note for current app. |

## Open Language Questions

| Question | Why it matters | Owner | Re-entry trigger |
| --- | --- | --- | --- |
| Should habits become recurring tasks in a future version? | Changes model, UI, tests, and notification assumptions. | Client/Product Authority | Sync, reminders, or calendar integration scope. |
| Should "project" become an entity instead of task text? | Changes data model and planning views. | Product Strategist, Architect | Multi-project filters or collaboration scope. |
| Should focus mode include measured sessions? | Changes time model and analytics. | Product Strategist, Verification Lead | Pomodoro/session feature request. |
| Should local export become signed backup/import? | Changes provenance, security, migration, and recovery artifacts. | Security, SRE, Architect | Data portability or multi-device scope. |

## Human-Agent Handoff

Future agents must load this glossary before renaming UI text, changing parser grammar, extending habits, or creating DDD artifacts. Any new term must include a source, definition, alias rule, forbidden meaning, and trace to requirements/tests.

## Quality Gate Package

| Gate element | Current state |
| --- | --- |
| Artifact-specific panel | Pending |
| 18 artifact-level rubric | Pending |
| Three 15-check critic rubrics | Pending |
| Two adversarial critics | Pending |
| Five RALPH loops | Pending |
| Certificate | Not issued |

