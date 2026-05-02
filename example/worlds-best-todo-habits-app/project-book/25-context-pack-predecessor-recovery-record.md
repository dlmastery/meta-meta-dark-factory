# Context Pack And Predecessor Recovery Record

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

## Artifact Passport

| Field | Value |
| --- | --- |
| Catalog ID | `EVD-009` |
| Artifact family | Evidence and certification, context memory |
| Project | Northstar Daily todo and habits demonstrator |
| Version | `2026-05-02.1` |
| Status | Standalone draft, not artifact-certified |
| Client decision supported | Let a new human or agent recover the predecessor state, understand what is real, and continue without hallucinating completion. |
| Human owner | Abhir |
| Agent owner | Context Memory Agent |
| Control links | `DFRUN-NORTHSTAR-20260425-001`, `TB-20260502-030`, `records/knowledge-graph.json`, `records/TASKS.md` |
| Source links | `00-factory-run-summary.md`, `17-actual-vs-promised-artifact-gap-audit.md`, `18-ralph-20-artifact-completeness-audit.md`, `records/artifact-catalog-coverage-matrix.json` |
| Evidence links | `portal/portal-data.json`, `portal/dashboard-control-index.json`, `project-book/evidence/artifact-catalog-coverage-audit-results.json` |
| Change control | Any future continuation must load this record or regenerate it after major artifact, code, test, or portal changes. |

## Decision Brief

This context pack is the recovery start page for Northstar Daily. Its purpose is to stop context rot: a future session must not infer that all artifacts are complete, that draft files are certified, or that the local demonstrator is production-ready.

## Fast Recovery Summary

| Question | Current answer |
| --- | --- |
| What is this project? | Northstar Daily, a local-static todo and habits app used as an example of the dark-factory meta-meta skill system. |
| What is actually implemented? | A browser app in `app/` with quick add, tasks, habits, plan audit, focus mode, shutdown notes, local storage, and export. |
| What is the strongest product evidence? | Core Node tests, browser/WYSIWYG tests, static UI/accessibility audits, screenshots, and project-book evidence. |
| What is not complete? | Full standalone artifact saturation, production SaaS readiness, hosted deployment, full MDA/DDD/release artifact set, and artifact-specific certificates for every catalog item. |
| What must the next agent not claim? | Do not claim all artifacts, production readiness, external certification, or world-best final product. |
| What is the next legal work pattern? | Continue artifact recovery batches from the coverage matrix, update portal/index/tests, then run artifact-specific review packages. |

## Load Order For A New Session

| Order | File | Why |
| ---: | --- | --- |
| 1 | `records/artifact-catalog-coverage-matrix.json` | Truth source for missing/partial/combined artifacts. |
| 2 | `17-actual-vs-promised-artifact-gap-audit.md` | Explains overclaim correction and artifact gap. |
| 3 | `18-ralph-20-artifact-completeness-audit.md` | Prior completeness audit and limitations. |
| 4 | `00-factory-run-summary.md` | Project overview and scope boundary. |
| 5 | `02-prd.md` | Product requirements baseline. |
| 6 | `03-architecture.md` and `22-architecture-decision-records.md` | Architecture and decisions. |
| 7 | `04-test-strategy.md` and `project-book/evidence/*results*` | Verification model and evidence. |
| 8 | `portal/portal-data.json` and `portal/dashboard-control-index.json` | Human portal and redo graph. |
| 9 | `records/TASKS.md`, `records/tpm-flow-ledger.json`, `records/factory-pert-plan.json` | Work order, dependencies, and legal next actions. |
| 10 | Latest change request or task bead | Prevents continuing stale work. |

## Current Proof Classes

| Item | Proof class | Evidence | Trust boundary |
| --- | --- | --- | --- |
| Local app implementation | Working implementation | `app/index.html`, `app/styles.css`, `app/app.js` | Bounded static browser app only. |
| Core behavior | Executable test evidence | `tests/core.test.cjs`, output evidence | Node tests do not cover all UI interactions. |
| Browser UI | WYSIWYG evidence | `tests/browser-wysiwyg.test.cjs`, screenshots | Rerun after UI changes. |
| Artifact coverage | Truth matrix | `records/artifact-catalog-coverage-matrix.json` | Full saturation currently fails. |
| Portal | Indexed review surface | `portal/portal-data.json`, `portal/index.html` | Must refresh after new files. |
| Recovery batch artifacts | Standalone draft artifacts | `19` through `25` Markdown files | Not artifact-certified. |

## Predecessor Decisions

| Decision | Current state | Evidence |
| --- | --- | --- |
| Build local-static first slice | Accepted for bounded demonstrator | `22-architecture-decision-records.md#adr-001-static-local-first-browser-app` |
| Use browser local storage | Accepted for bounded demonstrator | `22-architecture-decision-records.md#adr-002-browser-local-storage-state` |
| Keep domain functions testable | Accepted | `22-architecture-decision-records.md#adr-003-pure-domain-functions-and-node-tests` |
| Keep project-book outside product runtime | Accepted | `22-architecture-decision-records.md#adr-006-project-book-outside-product-runtime` |
| Treat missing artifacts truthfully | Accepted after user challenge | `17-actual-vs-promised-artifact-gap-audit.md` |

## Replay Drill

| Drill step | Expected result | Failure response |
| --- | --- | --- |
| Open coverage matrix | Counts show remaining gaps and no full saturation claim. | Stop and rebuild matrix from catalog. |
| Run artifact coverage audit | Audit passes with truthful gaps. | Fix missing evidence paths/counts before continuing. |
| Run portal index audit | Portal includes new Markdown, records, evidence, and diagrams. | Update portal data before handoff. |
| Run core tests | Core behavior remains green. | Fix code or update evidence before product claims. |
| Inspect latest task bead | Next action is explicit. | Create or update bead before material work. |

## Recovery Warnings

| Warning | Why it matters | Required action |
| --- | --- | --- |
| Draft artifact is not a certified artifact | User demanded reliability, not decorative files. | Run artifact-specific refinery before acceptance. |
| Combined artifact is not standalone saturation | Matrix must not hide missing standalone docs. | Split or get explicit waiver. |
| Local app is not production SaaS | Production artifacts cannot be waived silently. | Open production scope and create release/ops evidence. |
| Portal existence is not project completion | Dashboard can expose gaps, not close them. | Use portal as navigation and redo control only. |
| Previous assistant confidence is not evidence | User explicitly challenged overclaiming. | Use proof paths and validators. |

## Next Safe Actions

| Priority | Action | Acceptance evidence |
| --- | --- | --- |
| 1 | Finish current recovery batch indexing and validation. | Matrix counts updated, portal audit passes, task ledger updated. |
| 2 | Generate remaining missing standalone artifacts: MDA set, DDD context map, dependency manifest, release notes. | Missing count decreases with evidence paths. |
| 3 | Split high-risk combined/partial artifacts into standalone records. | Full saturation moves toward pass without silent waivers. |
| 4 | Run artifact-specific panels and five RALPH loops for each generated artifact. | Panel records, scorecards, refinery gates, certificates. |
| 5 | Refresh dashboard/control graph and redo closure. | Dashboard index rebuilt; selected-node closure works. |

## Quality Gate Package

| Gate element | Current state |
| --- | --- |
| Artifact-specific panel | Pending |
| 18 artifact-level rubric | Pending |
| Three 15-check critic rubrics | Pending |
| Two adversarial critics | Pending |
| Five RALPH loops | Pending |
| Certificate | Not issued |

