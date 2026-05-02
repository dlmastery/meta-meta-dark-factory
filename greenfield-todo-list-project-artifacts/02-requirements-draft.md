# 02. Requirements Draft

Status: draft pending customer interrogation.

## Functional Requirements

| ID | Requirement | Priority | Acceptance Seed |
| --- | --- | --- | --- |
| REQ-TODO-001 | The user can create a task with a title. | Must | A new task appears in the active list after submission. |
| REQ-TODO-002 | The user can mark a task complete. | Must | Completed task is visually distinct and counted as complete. |
| REQ-TODO-003 | The user can mark a completed task active again. | Should | Reopened task returns to the active list or active state. |
| REQ-TODO-004 | The user can edit a task title. | Must | Updated title persists after saving. |
| REQ-TODO-005 | The user can delete a task. | Must | Deleted task no longer appears after refresh. |
| REQ-TODO-006 | The user can filter all, active, and completed tasks. | Should | Selected filter shows the correct task subset. |
| REQ-TODO-007 | The user can clear completed tasks. | Could | Completed tasks are removed after confirmation or clear action. |
| REQ-TODO-008 | Tasks persist after page refresh. | Must | Tasks remain after reload in the selected storage model. |

## Non-Functional Requirements

| ID | Requirement | Draft Target |
| --- | --- | --- |
| NFR-UX-001 | The app must be simple enough to use without training. | Add, complete, edit, delete visible in first screen. |
| NFR-A11Y-001 | The app should support keyboard and screen-reader basics. | Semantic controls, visible focus, labels. |
| NFR-PERF-001 | The app should feel instant for normal personal use. | Common actions under 100 ms locally. |
| NFR-REL-001 | User task data should not disappear during normal refresh. | Persistence test required. |
| NFR-MAINT-001 | The implementation should be understandable to a future maintainer. | Clear structure, tests, concise docs. |

## Deferred Until Customer Answers

- Authentication.
- Backend sync.
- Multi-user sharing.
- Reminders and notifications.
- Recurring tasks.
- Labels and priorities.
- Mobile app packaging.
- Production hosting and monitoring.

## Intake Validation Status

Blocked pending answers to storage, identity, version 1 scope, stack, and deployment questions.

