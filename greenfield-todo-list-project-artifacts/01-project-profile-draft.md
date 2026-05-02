# 01. Project Profile Draft

## Project

Name: Todo List App.

Mode: greenfield.

Lifecycle stage: intake.

Status: draft pending customer answers.

## Working Assumptions

These assumptions are placeholders until accepted or replaced.

- Version 1 is a simple personal productivity app.
- Single user.
- No login.
- Browser-based responsive web app.
- Tasks are saved locally in the browser.
- Core task fields: title, completed state, created date.
- Optional fields such as due date, priority, labels, and reminders are not included unless requested.
- Production deployment is not included unless requested.

## Stakeholders

| Role | Draft Owner |
| --- | --- |
| Customer/Product Owner | User |
| End User | Individual todo app user |
| Maintainer | TBD |
| Factory Orchestrator | Codex dark-factory meta-skills |

## Success Criteria

Draft:

- User can add a task quickly.
- User can see active and completed tasks.
- User can mark a task complete.
- User can edit and delete tasks.
- Tasks persist after page refresh.
- The app is understandable without onboarding.

## Open Decisions

| ID | Decision | Why It Matters |
| --- | --- | --- |
| DEC-001 | Local-only or backend sync | Drives architecture, data model, testing, deployment |
| DEC-002 | Login or no login | Drives security and user model |
| DEC-003 | Simple tasks or richer task metadata | Drives scope and UX |
| DEC-004 | Demo or production app | Drives artifacts, testing, SRE handoff |
| DEC-005 | Preferred stack | Drives implementation plan |

## Risk Class

Draft risk: low if local-only demo; medium if backend sync or accounts are required.

