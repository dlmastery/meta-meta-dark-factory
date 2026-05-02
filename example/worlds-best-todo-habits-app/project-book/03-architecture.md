# Architecture And Design

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

## Architecture Choice

The example uses a static browser architecture:

- `app/index.html`: semantic shell and view containers.
- `app/styles.css`: Material 3 / Material 3 Expressive-aligned token layer, responsive layout, visual states, accessible focus styling.
- `app/app.js`: state model, pure domain functions, rendering, local storage, and event handling.
- `tests/core.test.cjs`: pure behavior tests.
- `tests/browser-wysiwyg.test.cjs`: Playwright scenario and layout checks.
- `project-book/portal/`: static human review dashboard, machine-readable documentation index, and diagram atlas.

## Rationale

A static architecture is the right first slice because the goal is to prove the dark-factory method with a working, inspectable product. It avoids framework and backend setup masking the real assurance workflow.

## Domain Model

| Entity | Key Fields | Notes |
|---|---|---|
| Task | title, project, due, estimate, priority, importance, urgency, tags, status | Supports quick capture, views, workload, focus, and matrix. |
| Habit | name, cue, tinyAction, motivation, ability, prompt, log | Uses behavior-design fields and streak computation. |
| Review | date, note | Preserves shutdown learning. |
| Profile | dailyCapacityMinutes, shutdownTime | Drives workload guard. |

## Design Patterns

- Local-first state persisted in `localStorage`.
- Pure functions exported for testability.
- View state is explicit: `today`, `plan`, `habits`, `focus`, `review`.
- UI styling is driven by Material system tokens for color roles, on-color contrast, typography, shape, elevation, and motion.
- Documentation navigation is externalized into a local static review portal with role-based onboarding and validation.
- Scenario tests operate through the browser UI rather than bypassing it.
- Product completion cannot be claimed from documents alone.

## Security And Privacy

- No network calls.
- No third-party scripts.
- No server persistence.
- No authentication in this iteration because there is no remote account surface.

## Future Architecture Candidates

- IndexedDB for richer offline data.
- Calendar adapter boundary with explicit OAuth threat model.
- Sync backend with account, encryption, conflict handling, and audit trail.
- Native/mobile shell only after responsive browser behavior is stable.
