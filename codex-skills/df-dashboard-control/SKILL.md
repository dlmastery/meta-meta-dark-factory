---
name: df-dashboard-control
description: Project-book dashboard and redo-control meta-skill for dark-factory runs. Use when Codex must show all produced artifacts, records, evidence, gates, diagrams, decisions, and tasks in a human-review dashboard; compute transitive downstream impact from a selected node; create a redo/change-impact plan; or regenerate dashboard indexes after artifacts change.
---

## Zero-Slop Compliance

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

Strict compliance is mandatory. Every dashboard, graph, redo impact, and closure claim must be backed by indexed files, typed edges, trace records, or explicit assumptions. If an edge is inferred, mark it as inferred, not authoritative.

# DF Dashboard Control

## Purpose

Make the project book inspectable and redoable. A human owner must be able to see what exists, where it came from, what it depends on, which gates accepted it, what downstream artifacts would be invalidated by a change, and what must be redone.

This skill complements the Human Review and Onboarding Portal. The portal helps humans read the project; this skill adds control-plane behavior: artifact graph, dependency closure, redo request, change-impact report, and next legal redo bead.

Dashboard-control is not completion. A dashboard may prove visibility, dependency knowledge, and redo control; it does not prove that missing artifacts, missing tests, missing implementation, or missing production readiness have been produced.

## Workflow

1. Load the active project-book root, `TASKS.md`, knowledge graph, control graph, trace records, portal index, artifact BOM, quality certificates, and evidence folders when present.
2. In recovery or overclaim-correction mode, build a truth inventory view that marks every node as `working_implementation`, `instantiated_artifact`, `validated_evidence`, `scaffold_only`, `template_only`, `descriptor_only`, `partial`, `missing`, `blocked`, or `waived`; do not let dashboard presence imply artifact completion.
3. Build or refresh an Artifact Dashboard Index using `assets/templates/artifact-dashboard-index.json`.
3. Build typed artifact nodes for Markdown docs, structured records, tests, evidence, diagrams, certificates, gates, source files, and tasks.
4. Build typed edges from explicit graph/trace records first; infer additional edges from stable path references, artifact IDs, requirement IDs, gate IDs, certificate IDs, task beads, and evidence paths.
5. Render or update the dashboard view if requested. The dashboard must show artifacts by lifecycle stage, status, owner, evidence, gate, and next action.
6. When the user selects a node for redo, create a Redo Node Request using `assets/templates/redo-node-request.json`.
7. Compute downstream transitive closure with `scripts/df_dashboard_control.py closure`; never guess manually when an index exists.
8. Produce a Redo Impact Report using `assets/templates/redo-impact-report.json`: impacted nodes, edge reasons, redo order, required reviewers, gates to reopen, tests to rerun, human approvals, token SWAG, and stop conditions.
9. Open or update a task bead for the redo run. A redo cannot start without a bead, owner, gate, evidence target, and change-control state.
10. Send the redo impact report to `df-governance-mayor`, `df-quality-refinery`, `df-traceability-evidence`, and `df-human-agent-handoff` before changing artifacts.

## Edge Priority

Use this precedence when computing closure:

1. Explicit knowledge graph or traceability edges.
2. Explicit dashboard-index edges.
3. Explicit task/control graph dependencies.
4. File references found in artifact text.
5. Inferred ID references.

Inferred edges are useful for review but cannot be used as the only proof for certification. For certification, convert inferred edges into explicit trace or knowledge-graph records.

## Redo Rules

- Redo source node first, then downstream dependents in dependency order.
- Reopen every gate and certificate that directly or transitively depends on the changed node.
- Rerun every test/evidence node reached by the closure, unless a human owner signs a scoped waiver.
- Re-run Hawkeye if any lifecycle stage, requirement, artifact, gate, certificate, or handoff record changes.
- Re-run the Human Review Portal validator when dashboard, portal index, artifact BOM, docs, diagrams, evidence, or next action changes.
- Update `TASKS.md` and the work ledger before starting redo work.
- Record token SWAG and reapproval trigger before material redo expansion.

## Required Outputs

- Artifact Dashboard Index.
- Optional static dashboard HTML.
- Redo Node Request when a node is selected.
- Redo Impact Report with downstream transitive closure.
- Updated task bead and project-book index.
- Quality/refinery/trace/handoff updates after the redo is executed.

## Resources

- `references/dashboard-control-protocol.md`
- `assets/templates/artifact-dashboard-index.json`
- `assets/templates/dashboard-control-record.json`
- `assets/templates/redo-node-request.json`
- `assets/templates/redo-impact-report.json`
- `scripts/df_dashboard_control.py`

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

