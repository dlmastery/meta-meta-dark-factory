**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# Actual Vs Promised Artifact Gap Audit

## Purpose

This audit corrects an overstatement in the todo plus habits demonstrator narrative.

Update after the catalog-coverage RALPH pass: this document is now the first truth-correction audit. The current catalog-level machine-checkable audit is `18-ralph-20-artifact-completeness-audit.md`, backed by `records/artifact-catalog-coverage-matrix.json` and `tests/artifact-catalog-coverage-audit.cjs`.

The project has real artifacts, code, tests, evidence, records, and a portal. It does not have the full "hundreds of artifacts" universe implied by the meta-meta vision. I incorrectly let the language around the demonstrator blur three different things:

- the full meta-meta artifact universe that a mature dark factory should be able to instantiate;
- the product-tailored artifact set selected for this small local-static demonstrator;
- the artifacts that actually exist on disk right now.

That created a trust problem. The corrective rule is simple: expected artifacts are not actual artifacts, templates are not proof, and combined artifacts must be explicitly declared as combined coverage instead of pretending each standalone document exists.

## Actual Inventory On Disk

Before this corrective audit was added, the todo plus habits project contained 17 top-level project-book Markdown documents. After adding this audit and the catalog-coverage RALPH audit, the corrected current inventory is:

| Artifact Area | Actual Count | Location |
| --- | ---: | --- |
| Top-level project-book Markdown documents | 19 | `project-book/*.md` |
| Structured record files | 34 | `project-book/records/*` including `records/TASKS.md` |
| Root evidence files | 42 | `project-book/evidence/*` |
| Portal files | 7 | `project-book/portal/*` |
| Product app files | 3 | `app/index.html`, `app/styles.css`, `app/app.js` |
| Test files | 6 | `tests/*.cjs` |
| Nested browser-profile runtime files | 194 | `project-book/evidence/edge-profile*` |

The nested browser-profile files are runtime noise, not meaningful review artifacts. They must not be counted as SDLC deliverables or evidence of rigor.

## Why The Artifact Set Is Smaller Than The Meta-Meta Vision

### Reason 1: The Demonstrator Was Tailored Down

The artifact BOM says: "Instantiate every artifact required for this product archetype, surfaces, risk profile, and lifecycle slice; do not blindly generate hundreds of irrelevant artifacts."

That was a valid tailoring policy for a small static app, but it conflicts with the user's later expectation that the example should demonstrate the full multi-level artifact system. I should have made the tradeoff explicit and asked whether the todo/habits example should be a small tailored demonstrator or a full artifact-saturation demonstrator.

### Reason 2: Combined Artifacts Were Treated Too Generously

Several artifact classes are embedded inside a few broad documents:

- PRD contains pieces of BRD, SRS, NFR, acceptance criteria, assumptions, and risk.
- Architecture contains pieces of HLD, LLD, domain model, data model, privacy, and security posture.
- Test strategy plus evidence files contain pieces of test plan, test cases, scenario matrix, accessibility, and WYSIWYG proof.
- Handoff and runbook contains pieces of operations, release, maintenance, and human handoff.

Combining can be acceptable in ISO-style information item tailoring, but only if the coverage matrix explicitly says "combined into X" and points to the exact section. This project does not currently provide that level of artifact-by-artifact coverage.

### Reason 3: The Portal Validated Index Freshness, Not Full Catalog Completeness

The portal validator proved that files currently in the project book were indexed. It did not prove that every catalog artifact required by the meta-meta vision was generated.

That is a major difference:

- "All existing files are indexed" passed.
- "All promised artifacts exist" failed. The new catalog coverage validator now exposes that failure rather than hiding it.

### Reason 4: The Interactive Layer Map Mixed Expected And Actual Language

The layer-map page and the document behind it list broad expected outputs. The todo/habits section then lists actual existing files. The separation was not visually strong enough, so it could read like the expected universe had already been generated.

### Reason 5: Certification Language Was Too Strong For The Boundary

Several certificates and audit records certify the bounded local-static slice. They do not certify that the full outsourcing-grade project-book universe exists. The accurate statement is:

> The current todo plus habits demonstrator has a tailored project book, app, tests, portal, and evidence for a local static product slice. It is not a full 63-artifact or hundreds-of-artifacts saturation run.

## Full Catalog Coverage Reality

The DFMS catalog currently defines 63 artifact classes. The todo/habits project has some standalone artifacts, some combined/partial coverage, some not-applicable items, and many missing explicit standalone artifacts.

| Catalog Area | Explicit Standalone Coverage | Combined Or Partial Coverage | Missing Or Not Applicable |
| --- | --- | --- | --- |
| Governance and management | Engagement governance, task beads, PERT, TPM ledger, Hawkeye audit, standards audit | Project charter, standards tailoring, risk, change, quality, AI governance are spread across summary, PRD, standards audit, and records | Separate RASCI matrix, separate change plan, separate quality management plan, separate AI governance plan, separate methodology blend record |
| Requirements and product | PRD, interrogation record, spec decomposition record | BRD, SRS, NFR catalog, acceptance scenarios, assumptions, glossary are partly embedded | Separate BRD, SRS, NFR catalog, acceptance criteria catalog, glossary, assumption and constraint log |
| Architecture and design | Architecture document | HLD, LLD, data model, threat model, observability, interface/API are partly embedded or not applicable | Separate HLD, LLD, ADR set, data model/migration plan, threat model, observability design; API spec is not applicable to static-only app |
| MDA and DDD | None as standalone | Domain ideas are embedded in architecture and code | CIM, PIM, PSM, model transformation record, bounded context map, aggregate/invariant catalog, anti-corruption layer plan |
| Implementation and build | App code, implementation execution record | Implementation plan and coding standards are implicit | Separate implementation plan, build/dependency manifest, configuration/environment spec, migration/backout plan |
| Verification and validation | Test strategy, automated tests, WYSIWYG evidence, accessibility evidence, scenario evidence | Test cases/procedures and holdout/transfer are partially represented | Separate test case/procedure catalog, security test report, performance/reliability report |
| Release, production, maintenance | Handoff and runbook | Release/operations are explicitly scoped as not production | Separate release plan, release notes, deployment guide, full operations runbook, incident guide, maintenance guide, training package, outage drill |
| Evidence and certification | Traceability matrix, quality gates, certificates, audit panel records, dashboard-control records | Expert debate, rubric scorecard, human communication, context recovery, retrospective are partial | Separate provenance record, residual risk acceptance, human communication record, context pack/predecessor recovery record, retrospective learning record |

## Highest-Severity Findings

### Finding 1: The Demonstrator Was Presented As More Complete Than It Is

- Priority: P1
- Status: confirmed
- Evidence: actual inventory has 17 Markdown docs, not hundreds; artifact BOM explicitly says the run is tailored.
- Fix needed: all portal and layer-map surfaces must label the todo/habits app as a tailored local-static demonstrator, not a full artifact-saturation run.

### Finding 2: No Full Catalog Completeness Gate Was Run

- Priority: P1
- Status: fixed for future checks
- Evidence: validators previously passed indexing, dashboard graph, tests, and selected records; the new `artifact-catalog-coverage-audit.cjs` now compares the project against every one of the 63 artifact catalog classes.
- Fix completed: `records/artifact-catalog-coverage-matrix.json` classifies every catalog artifact as `standalone`, `combined`, `partial`, `not_applicable`, `deferred`, or `missing`.

### Finding 3: Combined Coverage Is Not Trace-Precise Enough

- Priority: P1
- Status: partially fixed
- Evidence: PRD and architecture combine multiple artifact families; the new matrix maps catalog IDs to evidence files, but not exact section anchors.
- Fix needed: split standalone artifacts or add exact section anchors for combined coverage.

### Finding 4: Runtime Browser Profile Files Pollute Evidence

- Priority: P2
- Status: confirmed
- Evidence: 194 nested files under `project-book/evidence/edge-profile*`.
- Fix needed: do not count those files as evidence; move or delete them only after human confirmation because local deletion requires explicit approval.

### Finding 5: The Layer-Map UI Needs Stronger Expected-Versus-Actual Language

- Priority: P2
- Status: fixed
- Evidence: the interactive page now says "63 catalog artifacts" and "todo gaps exposed," and the product layer names the generated subset and missing count.
- Fix completed: L1/L2 are expected classes, L3 is the actual generated subset with catalog gaps.

## Corrected Truth Statement

The truthful status is:

> The todo plus habits app is a bounded local-static demonstrator. It currently has 19 top-level project-book documents after the catalog audit, 34 structured records including the records task ledger, 42 root evidence files, 3 app files, 6 tests, and 7 portal files. It does not have the full standalone 63-artifact catalog or the larger hundreds-of-artifacts saturation pack. The current catalog matrix says 12 standalone, 12 combined, 17 partial, 8 not applicable, 0 deferred, and 14 missing.

## Remediation Plan

| Step | Action | Output |
| --- | --- | --- |
| 1 | Add this truth audit to the project book and portal. | `17-actual-vs-promised-artifact-gap-audit.md` |
| 2 | Update interactive layer-map wording to distinguish expected catalog classes from actual generated files. | revised `interactive-layer-map/app.js` and `index.html` |
| 3 | Add a catalog coverage matrix for all 63 artifact classes. | completed: `records/artifact-catalog-coverage-matrix.json` |
| 4 | Add a validator that fails if a future project claims full catalog coverage without standalone/combined/not-applicable status for every artifact class. | completed: `tests/artifact-catalog-coverage-audit.cjs` |
| 5 | Ask for confirmation before deleting or moving nested browser-profile runtime files. | cleanup bead after approval |
| 6 | If the user's intent is a full saturation demonstrator, open a new token-budgeted change-controlled run to generate the missing explicit artifacts. | new bead and token SWAG |

## 2026-05-03 RB-08 Correction

RB-08 generated standalone artifacts for every previously combined, partial, or missing applicable catalog item in the current 63-artifact DFMS catalog, created a not-applicable waiver register for eight production/API-only surfaces, and produced a consolidated review/rubric/RALPH evidence package. The corrected status is full current-catalog saturation for the local-static demonstrator only: 55 standalone, 8 not applicable with explicit waivers, 0 combined, 0 partial, 0 missing, and 0 deferred. This still does not claim the future larger hundreds-of-artifacts DFMS universe or hosted production readiness.
