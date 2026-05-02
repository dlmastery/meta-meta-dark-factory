---
name: df-artifact-factory
description: Standards-based SDLC artifact generation and maintenance for dark-factory projects. Use to create or update BRD, SRS, NFR catalog, HLD, LLD, ADRs, MDA CIM/PIM/PSM models, DDD maps, test plans, traceability matrices, release notes, runbooks, incident guides, maintenance guides, and quality certificates.
---

## Zero-Slop Compliance

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.


# DF Artifact Factory

## Purpose

Produce a living project book of knowledge, not document filler. Every artifact must be project-specific, standards-mapped, traceable, reviewed, and maintainable by a future human owner.

## Workflow

1. Identify artifact type, lifecycle stage, control graph node, and work-ledger item.
2. If the run is in recovery, frustration, missed-artifact, or overclaim-correction mode, create the Artifact Truth Inventory before drafting new artifacts. It must list every expected artifact, current path, proof class, status, evidence path, reviewer/gate status, downstream dependencies, and whether the item is real, partial, combined, template-only, descriptor-only, missing, blocked, or waived.
3. Read `references/artifact-catalog.md` for required content and reviewers.
4. Create or update an Artifact Catalog Coverage Matrix using `assets/templates/artifact-coverage-matrix.json`. It must enumerate every catalog ID before artifacts are generated and again before closure.
4. Default serious, outsourcing-grade, standards-based, "world's best", "full", certification, all-artifact, or recovery work to `full_saturation`. In this mode, generate every catalog artifact as a standalone artifact unless the human approves an explicit not-applicable justification artifact. Do not infer a smaller set from project size.
5. Read `references/artifact-tailoring.md` only to document explicit human-approved tailoring. Tailoring cannot be silent; it requires waiver owner, rationale, scope, expiry/revalidation trigger, residual risk, and Hawkeye review.
6. For catalog artifacts, require an artifact-specific critic panel from `df-quality-refinery/references/artifact-critic-panel-matrix.md`; the old reviewer list is only the starting hint, not the final panel.
7. Create or update each artifact using the relevant comprehensive template in `assets/artifact-template-library/`; use `assets/templates/` only for low-level record fragments.
8. Apply `assets/artifact-template-library/consulting-grade-artifact-standard.md` and `assets/artifact-template-library/research-source-map.md` before drafting: every artifact must have a client decision purpose, artifact passport, source ledger, artifact-specific body, verification model, trace model, risk controls, handoff route, and quality gate package grounded in the right artifact-family practices.
9. Run `scripts/validate_artifact_template_library.py` when changing the template library; do not publish a bundle where the template library is missing, structurally weak, or drifted from `index.json`.
10. Run `scripts/validate_artifact_coverage_matrix.py` before claiming artifact completeness, handoff readiness, certification readiness, or closure.
11. When the artifact set becomes large enough that a human reviewer could miss context, create or update the Human Review and Onboarding Portal: dashboard, machine-readable index, diagram atlas, role-based reading paths, artifact BOM, gate/certificate map, and next-action panel.
12. Add trace links to source requirements, customer answers, decisions, risks, code, tests, operations artifacts, control graph nodes, work-ledger items, and refinery gates.
13. If the artifact claims implementation, test, UI, scenario, release, or operation completeness, create the relevant execution evidence record: `implementation-execution-record.json`, `scenario-test-matrix.json`, or `wysiwyg-browser-test-record.json`.
14. Send the artifact to `df-quality-refinery` and `df-traceability-evidence`, including a required Artifact Review Panel Record and Artifact RALPH Loop Record.
15. If accepted, update the artifact coverage matrix, project book index, human review portal, work ledger, control graph state, and handoff package.

## Artifact Quality Rules

- Prefer compact, dense, operationally useful artifacts over long generic documents.
- Treat each artifact as a consulting deliverable that must support a client decision, a delivery decision, or an assurance decision; length alone is never evidence of rigor.
- Do not be lazy or make quiet scope assumptions. Serious DFMS runs generate the full catalog by default and ask for explicit waivers only where the human approves a smaller boundary.
- Do not produce an artifact roadmap and imply the artifacts exist. Roadmaps, templates, indexes, and matrices are control artifacts; each product artifact still needs its own instantiated file or explicit waiver.
- Do not call a combined section a standalone artifact unless the coverage matrix marks it as `combined` and names the exact section-level trace, residual risk, and approval owner.
- Do not let sample or fake realistic scenarios pass as product evidence. Samples are examples for how to fill a template, not evidence for the actual product.
- The artifact coverage matrix is a gate, not a nice-to-have. If any catalog ID is missing from the matrix, or any required item is `missing`, `partial`, `combined` without approved section-level trace, or silently deferred, the artifact set is not complete.
- Every artifact must include an artifact passport, source-of-truth ledger, scoped decision brief, artifact-specific body, verification model, trace model, risk/assumption controls, human-agent handoff, and quality gate package.
- Include alternatives and rationale for design artifacts.
- Include exact owners and procedures for production artifacts.
- Include acceptance criteria and verification hooks for requirements artifacts.
- Include implementation and executable verification evidence for code/product/app artifacts; do not let documents substitute for code and tests unless the declared mode is artifact-only or planning-only.
- Include browser/WYSIWYG evidence for UI artifacts and scenario/holdout/transfer evidence for scenario-driven artifacts.
- Preserve open questions, assumptions, deferred items, and residual risks.
- Treat every governed artifact as requiring a specialist 3-critic review panel: content authority, governance/trace, and verification/handoff.
- Treat every governed artifact as requiring at least 2 adversarial critics and at least 5 RALPH loops before acceptance.
- Add risk-based specialist critics when artifact risk exceeds the default three-person panel.
- Do not optimize artifact generation for token minimization. Token use must be transparent and approved, but artifact quality, evidence, and assurance gates are the optimization goal.
- Reject template-body repetition, fake-looking examples, or standards name-dropping. Use the worked example as a specificity benchmark and replace examples with realistic project evidence before review.

## Required Project Book Sections

- Product and business context.
- Artifact generation mode and Artifact Catalog Coverage Matrix covering every catalog ID.
- Attractor Run Record or waiver for governed work.
- Control graph and active node state.
- Work ledger with owner, status, evidence, and next action.
- Requirements and acceptance scenarios.
- Recursive spec decomposition, branch interview evidence, and completeness validation.
- Architecture and decisions.
- Domain model and glossary.
- Implementation and configuration notes.
- Verification evidence.
- Implementation execution evidence.
- Scenario, holdout, transfer, browser/WYSIWYG, and visual testing evidence where applicable.
- Refinery gate records and quality certificates.
- Release and operations state.
- Risks, assumptions, and human decisions.
- Retrospective learning and feedback incorporation records.
- Human review and onboarding portal with all Markdown docs, structured records, evidence, diagrams, role-based onboarding paths, stage-gate status, and next action.

## Resources

- `references/artifact-catalog.md`
- `references/artifact-tailoring.md`
- `assets/artifact-template-library/README.md`
- `assets/artifact-template-library/consulting-grade-artifact-standard.md`
- `assets/artifact-template-library/research-source-map.md`
- `assets/artifact-template-library/index.json`
- `assets/templates/artifact-record.json`
- `assets/templates/decision-record.json`
- `assets/templates/quality-certificate.json`
- `assets/templates/implementation-execution-record.json`
- `assets/templates/scenario-test-matrix.json`
- `assets/templates/wysiwyg-browser-test-record.json`
- `assets/templates/artifact-coverage-matrix.json`
- `scripts/validate_artifact_catalog_ids.py`
- `scripts/validate_artifact_template_library.py`
- `scripts/validate_artifact_coverage_matrix.py`
- `df-meta-attractor/assets/templates/human-review-portal-record.json`
- `df-meta-attractor/assets/templates/documentation-portal-index.json`
- `df-meta-attractor/scripts/validate_human_review_portal.py`

## Agentic AI-Centric App Compliance

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

When a dark-factory task creates or revises any app, portal, workflow console, dashboard, MCP App, A2UI surface, AG-UI runtime, or human review UI, the output must be agentic AI-centric, not a conventional CRUD screen with chat attached.

Mandatory interpretation:

- The UI is a control system for human intent, agent state, proposed actions, evidence, gates, interrupts, provider quorum, trace links, and redo impact.
- Agents must expose structured state through AG-UI-style events: run started, state delta, stage active, provider quorum started, human decision required, human decision recorded, gate passed/blocked, test evidence, redo impact, and handoff.
- Agents must expose A2UI-style declarative surfaces as data that the host renders with native components: scenario/template router, provider quorum board, foundation authoring workbench, human interrupt inbox, stage report, artifact/evidence board, Spec Graph impact explorer, change-control form, and portal status.
- Tools must expose MCP Apps-style UI resources, schemas, permissions, and resources for interactive workflows; text-only tools are insufficient for complex review, approval, and multi-step factory execution.
- Sensitive or material transitions must pause with a human interrupt card that supports approve, edit, reject, and escalate. Approval must be recorded before stage execution proceeds.
- Provider quorum output must be treated as draft evidence only until merged, refined, confirmed, reviewed, and trace-linked.
- Spec Graph identity, upstream/downstream impact, no-duplicate-path reuse rules, and redo transitive closure must be visible before changing requirements, designs, tests, code, or production artifacts.
- Google Material 3-style principles apply to web UI: adaptive layout, accessible contrast, design tokens, native controls, clear state layers, and predictable components. Use tokens/components rather than decorative styling.
- A dashboard is not proof. It is a control and inspection surface. Missing artifacts, missing code, missing tests, or missing runtime behavior remain missing until instantiated and verified.

Reject any app or portal that cannot answer, on screen and via machine-readable state: what is the current legal next action, what is blocked, who must approve, what changed, what artifacts/tests/gates are affected, what evidence exists, what is only a descriptor/template, and what happens if the human resteers now.

