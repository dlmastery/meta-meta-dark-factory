---
name: df-traceability-evidence
description: Bidirectional traceability and evidence ledger for dark-factory work. Use to link human intent, requirements, standards, models, decisions, code, tests, security findings, operations artifacts, expert reviews, quality certificates, residual risks, and handoff records.
---

## Zero-Slop Compliance

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.


# DF Traceability Evidence

## Purpose

Make every artifact explainable. A fresh reviewer must be able to answer why an item exists, what it satisfies, what verifies it, and what risk remains.

## Workflow

1. Assign stable IDs to requirements, artifacts, decisions, tests, risks, evidence, control graph nodes, work-ledger items, task beads, TPM flow steps, PERT nodes, AI judge/jury records, refinery gates, Hawkeye audits, dashboard nodes, redo requests, redo impact reports, handoffs, and human communication records.
2. Add forward links from intent to requirement, design, implementation, test, release, operations, control graph, work ledger, dashboard index, redo impact report, and refinery artifacts.
3. Add reverse links from code, tests, documents, dashboard nodes, redo reports, gate records, and handoff records back to requirements, decisions, customer answers, and work-ledger items.
4. For graphified runs, create or update the knowledge graph using `assets/templates/knowledge-graph-record.json`; every material object must be a typed node or an owner-scoped waiver.
5. Validate mandatory links using `scripts/validate_trace_links.py` when records exist as JSON.
   Use `--strict` for governed simulations, project-book closure, benchmark claims, or any pass/certificate decision.
   Use repeated `--evidence-file` arguments when artifact, gate, ledger, or handoff evidence names physical files; file-like evidence references must resolve to supplied instantiated files whose contents mention the citing record ID.
6. Validate graphified records using `scripts/validate_knowledge_graph.py`; use `--allow-template` only for reusable template QA.
7. For governed DFMS work, fail the gate if material work is not linked to a control graph node, a work-ledger item, a task bead, a TPM flow step, a PERT node, a knowledge graph node, an AI judge/jury record, and a refinery gate or explicit waiver.
8. For project-book or artifact sets that are redo-ready, fail the gate if the dashboard-control index and redo impact report are not linked to changed nodes, reopened gates/certificates, rerun tests, and redo task beads.
9. For code/product/app work, fail the gate if requirements are not linked to implementation, tests, scenario evidence, and stage coverage; for UI work, fail if UI requirements are not linked to browser/WYSIWYG evidence.
10. Fail the gate if stage/process acceptance is not linked to Hawkeye conformance evidence or explicit waiver.
11. Fail the gate if mandatory trace links are missing without explicit deferral.

## Required Link Classes

- `derives_from`
- `satisfies`
- `implements`
- `verifies`
- `mitigates`
- `decides`
- `supersedes`
- `depends_on`
- `accepted_by`
- `raises`
- `routes_to`
- `tracked_by`
- `gated_by`
- `refines`
- `owns`
- `reviewed_by`
- `answers`
- `revalidated_by`
- `attacked_by`
- `requires_patch`
- `patched_by`
- `hardened_by`
- `certified_by`
- `waived_by`
- `hands_off_to`
- `resumes_from`
- `learns_from`
- `next_bead`
- `flow_step_for`
- `pert_depends_on`
- `transition_judged_by`
- `implemented_by`
- `tested_by`
- `scenario_covers`
- `browser_verified_by`
- `stage_covered_by`
- `audited_by`
- `conformance_verified_by`
- `indexed_by`
- `dashboard_node_for`
- `redo_impacts`
- `redo_reopens`
- `redo_reruns`

## Done Means

- Every requirement has source, priority, status, owner, and verification path.
- Every artifact has standards basis, author, reviewers, trace links, evidence, and residual risk state.
- Every code change has at least one requirement, decision, defect, or maintenance reason.
- Every production package has deployment, rollback, observability, incident, owner, and known-risk links.
- Every governed run has an Attractor Run Record or waiver.
- Every material work item is tracked by a work-ledger entry.
- Every material work item is represented by a `TASKS.md` bead and a knowledge graph node.
- Every material workflow transition is represented by a TPM flow step, PERT dependency node, and AI judge/jury verdict.
- Every required SDLC stage is represented in the SDLC Stage Coverage Matrix.
- Every accepted requirement in a code-producing project is linked to implementation and test evidence.
- Every UI requirement is linked to browser/WYSIWYG evidence or an explicit waiver.
- Every scenario-driven requirement is linked to scenario, holdout, and transfer evidence or an explicit waiver.
- Every material artifact or change maps to a control graph node or waiver.
- Every accepted artifact, code change, release item, or handoff is gated by a refinery gate or justified deferral.
- Every customer interrogation answer that becomes a requirement is traceable from answer to requirement to acceptance evidence.
- Strict validation rejects material records that lack control graph, work-ledger, or refinery gate links unless an owner-scoped waiver is recorded.
- Physical evidence validation rejects file-like evidence references without supplied evidence files or without citing-record IDs in those files.
- Redo-ready project books have a dashboard-control index linked to artifacts, evidence, gates, certificates, task beads, and trace records.
- Every selected-node redo has a redo impact report linked to the selected node, impacted nodes, reopened gates/certificates, tests to rerun, governance approval, and redo task bead.
- Graph validation rejects unresolved edges, orphan material nodes, accepted beads without evidence/gate/next bead, accepted artifacts without rubric/review/RALPH/evidence/certificate, and template-only records presented as proof.
- Step validation rejects accepted flow steps with unmet predecessors, missing judge/jury verdict, missing evidence, missing next step, missing closure rationale, or missing waiver completeness.
- Hawkeye validation rejects stage/process acceptance without conformance audit pass, explicit not-applicable rationale, or complete waiver.

## Resources

- `references/trace-schema.md`
- `references/evidence-schema.md`
- `assets/templates/requirement-record.json`
- `assets/templates/evidence-record.json`
- `assets/templates/knowledge-graph-record.json`
- `scripts/validate_trace_links.py`
- `scripts/validate_knowledge_graph.py`
- Use `df-dashboard-control` for dashboard index and redo impact graph outputs.
