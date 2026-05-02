# Dashboard Control And Redo Transitive Closure

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

Strict compliance is mandatory. Every dashboard, graph, redo closure, impact, gate, token, and certification claim below must be backed by a file, command result, trace edge, explicit assumption, or residual-risk statement.

## Trigger

The user asked whether the dashboard meta skill was finished and specifically required a dashboard that shows all produced artifacts with the ability to redo a selected node and its transitive closure for changes.

## Honest Status Before This Pass

Not finished. The project had a human review portal and documentation index, but it did not yet have a reusable dashboard-control meta-skill that:

- indexes artifacts, evidence, gates, certificates, tasks, and records as graph nodes;
- distinguishes explicit edges from inferred references;
- lets a selected node become a redo request;
- computes downstream impact closure;
- identifies gates, certificates, tests, and dashboard outputs to refresh;
- links redo to task beads, governance approval, token SWAG, traceability, and Hawkeye.

## Implemented Fix

Added `df-dashboard-control` as a dedicated skill under `codex-skills/df-dashboard-control`.

The skill provides:

- `SKILL.md` with triggers, workflow, edge precedence, redo rules, outputs, and resources.
- `references/dashboard-control-protocol.md`.
- Templates for artifact dashboard index, dashboard-control record, redo node request, and redo impact report.
- `scripts/df_dashboard_control.py` with `build` and `closure` commands.
- Workspace manifest wiring.
- Orchestrator, meta-attractor, and traceability policy hooks.

## Demonstrator Validation

Applied the skill to `example/worlds-best-todo-habits-app/project-book`.

| Output | Path | Result |
| --- | --- | --- |
| Dashboard index | `example/worlds-best-todo-habits-app/project-book/portal/dashboard-control-index.json` | 97 nodes, 318 edges |
| Static dashboard | `example/worlds-best-todo-habits-app/project-book/portal/dashboard-control.html` | generated |
| Redo request | `example/worlds-best-todo-habits-app/project-book/evidence/redo-node-request-prd.json` | created |
| Redo impact report | `example/worlds-best-todo-habits-app/project-book/evidence/redo-impact-prd.json` | 9 impacted nodes for `02-prd.md` |
| Dashboard-control record | `example/worlds-best-todo-habits-app/project-book/evidence/dashboard-control-record.json` | conditional pass |
| Project-book record | `example/worlds-best-todo-habits-app/project-book/16-dashboard-control-redo-record.md` | created |

## RALPH Loop 20

RALPH means Review, Attack, Learn, Patch, Harden. This pass used a compact 20-loop self-audit rather than claiming magical perfection.

| Loop | Critic Attack | Patch Or Status |
| --- | --- | --- |
| 1 | Static portal is readable but not redoable. | Added dashboard-control skill and object model. |
| 2 | Artifact list is not a graph. | Added typed nodes and typed edges. |
| 3 | Edge authority is ambiguous. | Added explicit versus inferred authority. |
| 4 | Closure cannot be guessed from chat. | Added `closure` command. |
| 5 | Redo lacks approval and token control. | Added redo request template and token SWAG requirement. |
| 6 | Changing one artifact should reopen gates/certificates. | Added reopened gate/certificate output fields. |
| 7 | Tests may be skipped during redo. | Added tests-to-rerun output. |
| 8 | Dashboard outputs themselves can become stale. | Added dashboard outputs to refresh in impact reports. |
| 9 | Generated dashboard files polluted future graph builds. | Skipped generated dashboard outputs as authoritative edge sources. |
| 10 | Direction of graph impact was wrong for references. | Added forward/reverse impact semantics. |
| 11 | A design doc referencing PRD should be impacted by PRD change. | Reverse inferred references now drive closure. |
| 12 | Existing graph output can masquerade as explicit truth. | Preserved edge authority and skipped dashboard-generated edge ingestion. |
| 13 | Source request was missing from impact report. | Added `--request` field to closure command. |
| 14 | Traceability skill did not know dashboard/redo nodes. | Added dashboard and redo link classes and done rules. |
| 15 | Orchestrator still routed dashboards to generic portal work. | Added `df-dashboard-control` routing and gate. |
| 16 | Meta-attractor did not require redoable control. | Added dashboard-control commitment before handoff. |
| 17 | Manifest drift could drop the skill. | Added skill and resources to workspace manifests. |
| 18 | Demonstrator lacked instantiated proof. | Generated index, HTML, redo request, impact report, and control record. |
| 19 | Record counts drift after adding evidence. | Rebuilt dashboard index and impact report after record creation. |
| 20 | Formal certification still needs explicit trace promotion. | Marked conditional pass and residual risk. |

## Expert Critic Panel

| Expert | Role Persona | Verdict |
| --- | --- | --- |
| Dashboard Control Architect | Senior product-systems architect responsible for making project books inspectable, navigable, and operationally redoable. Rejects static indexes that cannot compute change impact. | Conditional pass: graph/index/closure exist and run locally. Needs interactive UI for point-and-click node selection if humans require browser-native redo control. |
| Traceability Auditor | ISO/SWEBOK-style evidence auditor responsible for forward/reverse trace, edge authority, and template-versus-proof separation. Rejects ungrounded edge claims. | Conditional pass: explicit/inferred distinction exists. Formal certification requires promoting critical inferred edges into explicit knowledge-graph or trace records. |
| Hawkeye Conformance Auditor | Independent stage/process auditor with veto power over skipped gates, stale evidence, and workflow bypass. Rejects redo from chat memory. | Conditional pass: orchestrator/meta-attractor now block redo-ready claims without dashboard-control evidence or waiver. Runtime enforcement is still policy/script based, not a hard UI lock. |

## New Gate

Dashboard-control gate:

- artifact dashboard index exists;
- graph nodes cover docs, records, evidence, gates, certificates, tasks, and portal outputs;
- explicit and inferred edges are distinguishable;
- selected-node redo request exists;
- transitive impact report exists;
- impacted artifacts, tests, gates, certificates, dashboard outputs, approvals, token SWAG, and redo bead are named;
- Hawkeye and quality refinery must review before closure;
- inferred edges cannot be sole certification proof.

## Residual Risks

- The dashboard is currently static HTML plus command-line closure, not a full interactive browser UI with click-to-redo.
- The filesystem scanner infers useful references, but formal certification still needs explicit trace/knowledge-graph edges for critical dependencies.
- The script is a local validator/control utility. A future runtime could make this a non-bypassable execution kernel gate inside every tool invocation.

## Certification State

Conditional pass for this pass.

Reason: the previously missing dashboard-control meta-skill now exists, is wired into the hierarchy, and was validated on the todo/habits demonstrator. Full pass waits on explicit trace promotion and optional interactive UI.
