# Handoff And Runbook

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

## Open The App

Open:

`example/worlds-best-todo-habits-app/app/index.html`

## Run Tests

From the project root:

```powershell
node example\worlds-best-todo-habits-app\tests\core.test.cjs
node example\worlds-best-todo-habits-app\tests\browser-wysiwyg.test.cjs
```

## Key Files

- App shell: `app/index.html`
- Styles: `app/styles.css`
- Behavior: `app/app.js`
- Core tests: `tests/core.test.cjs`
- Browser/WYSIWYG tests: `tests/browser-wysiwyg.test.cjs`
- Human review portal: `project-book/portal/index.html`
- Portal machine index: `project-book/portal/portal-data.json`
- Diagram atlas: `project-book/portal/diagrams.md`
- Factory records: `project-book/records/`
- Evidence: `project-book/evidence/`

## Human Takeover Notes

- This is a static app. No backend state exists.
- A new human reviewer should start at `project-book/portal/index.html` before diving into individual artifacts.
- Data persists in local browser storage under `northstar-daily-state-v1`.
- Reset by clearing site data for the local file origin or changing the storage key.
- Future production work must create new factory beads for authentication, sync, calendar integrations, notifications, cloud deployment, security threat modeling, and full accessibility audit.
