# Architecture Decision Records

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

## Artifact Passport

| Field | Value |
| --- | --- |
| Catalog ID | `ARC-003` |
| Artifact family | Architecture and design |
| Project | Northstar Daily todo and habits demonstrator |
| Version | `2026-05-02.1` |
| Status | Standalone draft ADR set, not artifact-certified |
| Client decision supported | Preserve the important architecture choices, alternatives, consequences, and reversal triggers for the bounded local app. |
| Human owner | Abhir |
| Agent owner | System Architect Agent |
| Control links | `DFRUN-NORTHSTAR-20260425-001`, `TB-20260502-030`, `DEC-NORTHSTAR-001` |
| Source links | `02-prd.md`, `03-architecture.md`, `app/index.html`, `app/app.js`, `app/styles.css` |
| Evidence links | `tests/core.test.cjs`, `tests/browser-wysiwyg.test.cjs`, `project-book/evidence/browser-wysiwyg-results.json` |
| Change control | A changed ADR reopens affected requirements, design, code, tests, trace, and portal rows. |

## Decision Register

| ADR | Decision | Status | Primary drivers | Reversal trigger |
| --- | --- | --- | --- | --- |
| `ADR-001` | Use a static local-first browser app for the first demonstrator slice. | Accepted for bounded slice | Fast inspectable example, no backend dependency, low setup friction. | Need collaboration, sync, accounts, notifications, or production SaaS. |
| `ADR-002` | Store state in browser local storage with normalization on load. | Accepted for bounded slice | Local privacy, no backend, repeatable simple persistence. | Sensitive data, multi-device sync, import/export guarantees, schema migration. |
| `ADR-003` | Keep core domain functions pure and exportable for Node tests. | Accepted | Testability, traceable behavior, no browser-only lock-in. | Framework migration with equivalent test seams. |
| `ADR-004` | Use vanilla HTML/CSS/JS instead of a frontend framework. | Accepted for bounded slice | Zero build step, readable code, minimal dependency risk. | Larger component surface, routing, state complexity, team scaling. |
| `ADR-005` | Use Material 3-inspired design tokens without remote runtime dependencies. | Accepted for bounded slice | UI quality with static reliability and no package setup. | Adoption of official component library or design system pipeline. |
| `ADR-006` | Treat factory evidence as adjacent project-book artifacts, not embedded in app runtime. | Accepted | Keep product UX focused while preserving auditability. | Need in-app human review workflow for live factory operations. |

## ADR-001: Static Local-First Browser App

| Field | Value |
| --- | --- |
| Context | The user asked for an easy-to-understand example of the dark-factory meta-skill using a todo and habits app, while also requiring actual code and testing. |
| Forces | Low setup, working UI, local execution, browser/WYSIWYG evidence, no production hosting yet. |
| Options considered | Static local app; hosted backend app; Electron/desktop app; mobile app. |
| Decision | Build the first slice as `app/index.html`, `app/styles.css`, and `app/app.js`, runnable locally without build. |
| Consequences | Very low setup and inspectability; no accounts, sync, server analytics, or production incident surface. |
| Validation | Core tests and browser/WYSIWYG tests exercise the bounded slice. |
| Reversal trigger | Any approved scope that needs sync, collaboration, notifications, identity, analytics, or hosted portal integration. |

## ADR-002: Browser Local Storage State

| Field | Value |
| --- | --- |
| Context | The app must preserve tasks, habits, and reviews in a local-only static environment. |
| Options considered | Local storage; IndexedDB; backend database; file import/export only. |
| Decision | Use `localStorage` key `northstar-daily-state-v1` plus `normalizeState` recovery. |
| Consequences | Simple persistence and local privacy; limited capacity, no encryption, no multi-device continuity. |
| Validation | Normalization tests cover malformed state recovery in `tests/core.test.cjs`. |
| Reversal trigger | Larger data, schema migration, import/export guarantees, or multi-device sync. |

## ADR-003: Pure Domain Functions And Node Tests

| Field | Value |
| --- | --- |
| Context | The factory must prove behavior with executable tests, not only browser inspection. |
| Options considered | Browser-only tests; pure functions exported for Node tests; full test framework. |
| Decision | Keep parsing, state normalization, stats, planning, and habit insights testable from Node. |
| Consequences | Fast regression tests and clear behavior seams; UI-controller behavior still needs browser tests. |
| Validation | `tests/core.test.cjs` imports `app/app.js` and checks parser, habit, stats, audit, plan, and normalization behavior. |
| Reversal trigger | Framework migration must preserve or improve these seams. |

## ADR-004: Vanilla Web Stack

| Field | Value |
| --- | --- |
| Context | A demonstrator should run from the file system and be understandable without package installation. |
| Options considered | Vanilla JS; React/Vite; Svelte; web components. |
| Decision | Use vanilla HTML, CSS, and JavaScript for the first slice. |
| Consequences | Lower dependency and build risk; more manual UI state wiring and less component reuse. |
| Validation | Static UI audit, accessibility audit, browser/WYSIWYG test. |
| Reversal trigger | Repeated UI complexity, component duplication, or need for formal design system components. |

## ADR-005: Material 3-Inspired Static UI

| Field | Value |
| --- | --- |
| Context | The user required Google latest material standards for the app UI. |
| Options considered | Official Material Web components; static Material 3-inspired CSS tokens; custom style without Material mapping. |
| Decision | Use local CSS tokens and component patterns inspired by Material 3 and Material 3 Expressive without remote runtime dependencies. |
| Consequences | Static reliability and no package setup; conformance remains a local interpretation, not official library certification. |
| Validation | `14-material-ui-standards-conformance-record.md`, static UI tests, browser screenshots. |
| Reversal trigger | Need for official Material component behavior, theming, or enterprise design system compliance. |

## ADR-006: Project Book Outside Product Runtime

| Field | Value |
| --- | --- |
| Context | The app is a product demonstrator and the project book is assurance evidence. |
| Options considered | Embed project-book dashboard in app; separate documentation portal; no portal. |
| Decision | Keep product runtime separate and create a project-book portal under `project-book/portal/`. |
| Consequences | Product UI remains focused; reviewers can inspect evidence separately. The app itself does not yet drive the entire meta-meta factory workflow. |
| Validation | `tests/portal-index-audit.cjs`, portal validation evidence. |
| Reversal trigger | Human workflow cockpit requirements for live skill execution and per-project governance. |

## Decision Trace

| Decision | Requirements | Code/evidence | Downstream artifacts |
| --- | --- | --- | --- |
| `ADR-001` | `NFR-001`, `NFR-004`, `NFR-005` | `app/index.html`, browser tests | Runbook, release boundary, production risk |
| `ADR-002` | `NFR-004`, `NFR-006` | `normalizeState`, local storage functions | Data model, migration/backout future work |
| `ADR-003` | `NFR-005`, `NFR-006` | `tests/core.test.cjs` | Test strategy, automated evidence |
| `ADR-004` | `NFR-001`, maintainability assumptions | static app files | Build/dependency manifest |
| `ADR-005` | `NFR-002`, `NFR-003`, `NFR-007` | CSS tokens, browser screenshots | UX/accessibility validation |
| `ADR-006` | `NFR-008` | portal files and tests | Handoff, context pack, dashboard control |

## Quality Gate Package

| Gate element | Current state |
| --- | --- |
| Artifact-specific panel | Pending |
| 18 artifact-level rubric | Pending |
| Three 15-check critic rubrics | Pending |
| Two adversarial critics | Pending |
| Five RALPH loops | Pending |
| Certificate | Not issued |

