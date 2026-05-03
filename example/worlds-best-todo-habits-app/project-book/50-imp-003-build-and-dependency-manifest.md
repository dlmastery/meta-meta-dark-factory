**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# Build and Dependency Manifest

## Artifact Passport

| Field | Value |
| --- | --- |
| Catalog ID | IMP-003 |
| Artifact | Build and Dependency Manifest |
| Project | Northstar Daily todo plus habits demonstrator |
| Family | Implementation and build |
| Lifecycle stage | Construction |
| Standards basis | SSDF, supply chain |
| Required links | SBOM, lockfiles, build logs |
| Source coverage status before RB-08 | missing |
| Current status | Standalone artifact instantiated for RB-08 catalog saturation |
| Control node | CG-NODE-NORTHSTAR-RB08-ARTIFACT-SATURATION |
| Work ledger item | WL-NORTHSTAR-RB08-IMP-003 |
| Review evidence | project-book/records/artifact-saturation-review-package.json |
| Quality certificate | project-book/evidence/artifact-saturation-quality-certificate.json |

## Decision Purpose

This artifact exists so a human reviewer can make a concrete assurance decision about build and dependency manifest for Northstar Daily without relying on a broad PRD paragraph, a dashboard card, or a future roadmap. It closes the prior missing coverage state for IMP-003 by creating a named standalone document with source evidence, trace, review, and reopening rules.

## Source-Of-Truth Ledger

| Source | Use |
| --- | --- |
| project-book/02-prd.md | Product goals, functional requirements, NFRs, boundaries, and success criteria |
| project-book/03-architecture.md | Local-static architecture, data/state model, security posture, and design decisions |
| project-book/04-test-strategy.md | Test levels, scenario coverage, WYSIWYG, accessibility, and regression policy |
| project-book/05-traceability-matrix.md | Requirement-to-design-to-test trace |
| project-book/records/artifact-catalog-coverage-matrix.json | Catalog status before and after RB-08 |
| project-book/evidence/validation-summary.json | Current executable validation summary |
| app/app.js, app/index.html, app/styles.css | Working product implementation |
| tests/*.cjs | Executable verification and browser evidence scripts |

## Northstar Daily Content

- Runtime dependency: modern browser with localStorage and Blob download support.
- Test dependency: Node.js for assert-based scripts.
- Browser-test dependency: Playwright, loaded from the local environment or Codex bundled runtime fallback.
- Build dependency: none; there is no package.json, bundler, transpiler, lockfile, or external asset fetch.
- Supply-chain posture: source files are local; no network package resolution is required to run the app itself.

## Trace Model

| Trace target | Link |
| --- | --- |
| Human intent | Frustration/recovery request requiring real artifacts, no overclaim, and Playwright proof |
| Product requirements | project-book/02-prd.md |
| Design | project-book/03-architecture.md |
| Implementation | app/app.js, app/index.html, app/styles.css |
| Tests | tests/core.test.cjs, tests/static-ui-audit.cjs, tests/accessibility-certification-audit.cjs, tests/browser-wysiwyg.test.cjs |
| Governance | project-book/records/TASKS.md, project-book/records/tpm-flow-ledger.json, project-book/records/hawkeye-conformance-audit-record.json |
| Artifact coverage | project-book/50-imp-003-build-and-dependency-manifest.md, project-book/records/artifact-catalog-coverage-matrix.json |

## Risks And Controls

- Risk: this artifact can become stale after product or evidence changes. Control: redo closure must reopen IMP-003 and downstream certificates.
- Risk: local-static assumptions can be mistaken for production readiness. Control: production-only scope is held in the not-applicable waiver register.
- Risk: generated text can look complete while missing execution proof. Control: executable tests and evidence records remain separate gates.
- Risk: standards names can become decoration. Control: the standards basis above is converted into concrete Northstar Daily links and reopening triggers.

## Human-Agent Handoff

- Human reviewer should verify the cited source files exist before accepting the artifact.
- Codex may maintain the artifact only through a task bead and refreshed coverage matrix.
- Any disagreement, scope expansion, or failed test reopens this artifact and the RB-08 certificate.
- Token-budget escalation requires an explicit change-control note before expanding beyond the current local-static scope.

## 15-Point Artifact Rubric

| Check | Criterion | RB-08 Result |
| --- | --- | --- |
| R-01 | Artifact purpose is decision-useful and project-specific. | Pass for RB-08 local-static boundary |
| R-02 | Scope boundary is explicit and does not overclaim production or external certification. | Pass for RB-08 local-static boundary |
| R-03 | Source evidence references real files, tests, records, or waivers. | Pass for RB-08 local-static boundary |
| R-04 | Standards basis is mapped to concrete Northstar Daily obligations. | Pass for RB-08 local-static boundary |
| R-05 | Requirements, risks, decisions, tests, and handoff links are traceable. | Pass for RB-08 local-static boundary |
| R-06 | Open assumptions and residual risks are visible. | Pass for RB-08 local-static boundary |
| R-07 | Human approval or change-control trigger is named where needed. | Pass for RB-08 local-static boundary |
| R-08 | No template placeholders, fake evidence, or generic filler remain. | Pass for RB-08 local-static boundary |
| R-09 | Security/privacy consequences are addressed for the artifact family. | Pass for RB-08 local-static boundary |
| R-10 | Accessibility/UX consequences are addressed when user-facing behavior is affected. | Pass for RB-08 local-static boundary |
| R-11 | Implementation or test consequences are addressed when executable behavior is affected. | Pass for RB-08 local-static boundary |
| R-12 | Operations or maintenance consequences are addressed where lifecycle scope requires them. | Pass for RB-08 local-static boundary |
| R-13 | Review panel roles are artifact-specific and evidence-seeking. | Pass for RB-08 local-static boundary |
| R-14 | Adversarial critics have a concrete attack surface and stand-down condition. | Pass for RB-08 local-static boundary |
| R-15 | Next action is either maintain, reopen on trigger, or explicit not-applicable waiver. | Pass for RB-08 local-static boundary |

## Expert Review Panel

| Seat | Persona | Evidence Required |
| --- | --- | --- |
| 1 | Security Engineer | Verify IMP-003 against source files, trace links, tests, and coverage matrix |
| 2 | SRE Lead | Verify IMP-003 against source files, trace links, tests, and coverage matrix |
| 3 | Implementation Lead | Verify IMP-003 against source files, trace links, tests, and coverage matrix |
| Adversarial A | Anti-Slop Red Team | Attempt to prove the artifact is generic, circular, or evidence-free |
| Adversarial B | Failure-Mode Reality Critic | Attempt to prove the artifact fails under corrupted state, UI regression, scope creep, or unsupported certification wording |

## RALPH Loop Record

| Loop | Review | Attack | Patch/Harden Result |
| ---: | --- | --- | --- |
| 1 | Check existence and artifact identity. | Look for missing standalone document. | Standalone IMP-003 document created. |
| 2 | Check source grounding. | Look for generic claims. | Source ledger and Northstar-specific content added. |
| 3 | Check traceability. | Look for orphan claims. | Trace targets and reopening triggers added. |
| 4 | Check certification risk. | Look for production or external-certification overclaim. | Boundary and residual-risk controls added. |
| 5 | Check verification path. | Look for document-only closure. | Executable tests and coverage audit remain required gates. |

## Next Action

Maintain this artifact as accepted for the RB-08 local-static demonstrator boundary. Reopen it if any linked requirement, design, code path, test, evidence file, waiver, or certification statement changes.
