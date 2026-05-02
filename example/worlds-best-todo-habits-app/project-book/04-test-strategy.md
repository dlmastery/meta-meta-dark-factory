# Verification And Test Strategy

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

## Test Philosophy

The example app must prove behavior through code and browser execution, not just document intent.

## Test Levels

| Level | Evidence | Coverage |
|---|---|---|
| Unit/domain | `tests/core.test.cjs` | Quick-add parsing, habit streaks, workload metrics, planning order. |
| Reliability/state recovery | `tests/core.test.cjs` | Malformed local-state recovery, bounded numeric fields, invalid dates/tags/status handling. |
| Scenario/BBD | `project-book/evidence/scenario-test-results.json` | Capture, plan, habit, focus, review, overload, and mobile paths. |
| Browser/WYSIWYG | `tests/browser-wysiwyg.test.cjs` | Desktop and mobile rendering, interactions, console errors, overflow risk, screenshots. The test passed after browser-launch permission was granted. |
| Accessibility certification readiness | `tests/accessibility-certification-audit.cjs` | Duplicate IDs, ARIA reference integrity, explicit labels, button names, contrast ratios, skip link behavior, keyboard reachability, ARIA state updates, and touch target sizing. |
| Security abuse | Static review and no-network architecture | XSS prevention through escaping, no external scripts, local-only data. |
| Performance/reliability | Browser test and static app profile | No build step, small local files, no remote dependency. |

## Core Scenarios

| Scenario ID | Scenario | Requirement Links |
|---|---|---|
| `SCN-001` | Quick add P1 task for today and see it in Today. | `REQ-001`, `REQ-003` |
| `SCN-002` | Add a tiny habit and check it today. | `REQ-002`, `REQ-005` |
| `SCN-003` | Planned minutes exceed capacity and next action becomes defer. | `REQ-006` |
| `SCN-004` | Plan view shows timeboxed order and priority matrix. | `REQ-007`, `REQ-008` |
| `SCN-005` | Focus view selects a task and completes it. | `REQ-004`, `REQ-009` |
| `SCN-006` | Save a shutdown note and see it in history. | `REQ-010` |
| `SCN-007` | Mobile viewport has no detected horizontal overflow in critical controls. | `NFR-002`, `NFR-003` |
| `SCN-008` | Plan view shows a plan audit with capacity and focus warnings. | `REQ-012` |
| `SCN-009` | Habit view shows friction insight for weakest behavior lever. | `REQ-013` |
| `SCN-010` | E2E journey changes task completion metric, habit metric, rebalance state, shutdown history, and export download. | `REQ-001`, `REQ-004`, `REQ-005`, `REQ-007`, `REQ-010`, `REQ-011` |

## Holdout And Transfer Tests

| Test ID | Purpose | Expected Result |
|---|---|---|
| `HOLD-001` | Parse mixed order command: `today 15m p2 renew passport #home`. | Title remains `renew passport`, metadata is extracted. |
| `HOLD-002` | Habit streak with a gap yesterday. | Streak returns zero for today unless today was logged. |
| `TRANSFER-001` | Browser test runs on desktop and mobile viewport. | Same app flow passes with no console errors or overflow risk. |

## Exit Criteria

- Unit test pass.
- Browser/WYSIWYG test pass with screenshots.
- Accessibility certification-readiness audit pass.
- Full E2E browser journey proves user outcomes, not only screen visibility.
- Scenario matrix updated with actual evidence.
- Hawkeye audit records testing gate as pass.
