# 12. Expert Critic Review: Best-Of-All Merge

Status: critic review.

Date: 2026-04-24.

Scope:

- `00-system-design.md`
- `02-lifecycle-workflow.md`
- `05-traceability-evidence-model.md`
- `11-best-of-all-merged-control-plane.md`
- Installed skill `C:\Users\abhir\.codex\skills\df-meta-attractor`

Verdict: revise before treating the best-of-all merge as fully integrated.

## Findings

### Finding 1: Meta-attractor can still be bypassed

File: `dark-factory-meta-skills-design/00-system-design.md`

Lines: 63-67.

Priority: P1.

The architecture graph has both `Human or Project Request -> dark-factory-orchestrator` and `Human or Project Request -> Meta-Attractor -> dark-factory-orchestrator`. This weakens the merged control-plane claim because serious, ambiguous, or meta-meta work can still bypass the attractor gate. If the direct path is intentional for tiny tasks, it needs an explicit condition. Otherwise all governed DFMS runs should enter through the meta-attractor.

Required fix:

- Replace the unconditional direct edge with a conditional path such as "simple non-factory task only", or remove it and route serious DFMS work through the meta-attractor first.

### Finding 2: Lifecycle workflow does not include the new merged objects

File: `dark-factory-meta-skills-design/02-lifecycle-workflow.md`

Lines: 35-49.

Priority: P1.

The lifecycle stages still move from intake through quality refinery and retrospective, but they do not include the newly merged control graph, work ledger, and refinery gate as first-class lifecycle nodes. This means the best-of-all quality gate in `11-best-of-all-merged-control-plane.md` requires artifacts that the lifecycle does not actually produce.

Required fix:

- Add a Stage -1 or Stage 0 meta-attractor/control-graph stage.
- Add work-ledger creation/update responsibilities across stages.
- Rename or refine Stage 6 so `Quality Refinery` includes the explicit refinery gate record.
- Add acceptance criteria that every lifecycle stage updates ledger and trace records.

### Finding 3: Installed skill lacks templates for the merged objects it now promises

File: `C:\Users\abhir\.codex\skills\df-meta-attractor\SKILL.md`

Lines: 86-93.

Priority: P1.

The installed `df-meta-attractor` skill now advertises best-of-all control graphs, work ledgers, and refinery gates, and its `best-of-all-merge.md` says those objects are required. But the installed skill only exposes `assets/templates/meta-attractor-record.json`; the new `control-graph-record`, `work-ledger-record`, and `refinery-gate-record` templates exist only in the design package. A future Codex session that triggers the installed skill may not know where to find or how to instantiate the required merged objects.

Required fix:

- Copy or recreate the three merged object templates inside the installed skill assets.
- Update `SKILL.md` resource loading to mention the templates explicitly.
- Add a quick validation check that all required best-of-all templates exist.

### Finding 4: Traceability model was not extended for control graph, work ledger, or refinery gate

File: `dark-factory-meta-skills-design/05-traceability-evidence-model.md`

Lines: 177-213.

Priority: P2.

The verification layers and Done Means still describe generic artifacts and code changes, but they do not require control graph links, work-ledger entries, or refinery gate outcomes. This creates a traceability gap: the merged control-plane objects are named elsewhere, but not required by the evidence model that decides whether work is done.

Required fix:

- Add link classes and examples for control graphs, work ledger items, and refinery gate records.
- Update Done Means so material work is not done unless its ledger item, control graph node, and refinery outcome are linked or explicitly waived.
- Add a refinery gate certificate example.

## Three Expert Critic Pass

### Critic 1: System Architecture Reviewer

Score: 51 / 60.

Assessment:

- The merged architecture has the right shape, but the entry path is ambiguous and could bypass the meta-attractor.
- The system now has too many named planes without a fully specified execution sequence.
- The control graph idea is strong and should become the canonical spine.

Blocking concerns:

- Finding 1.
- Finding 2.

### Critic 2: Requirements And Traceability Reviewer

Score: 49 / 60.

Assessment:

- Requirements are well-framed in the new merge artifact, but the lifecycle and trace model have not caught up.
- The new objects have templates, but not all of them are linked into the installed skill.
- "Best-of-all" is not yet fully testable end to end.

Blocking concerns:

- Finding 2.
- Finding 3.
- Finding 4.

### Critic 3: Verification And Operations Reviewer

Score: 50 / 60.

Assessment:

- The refinery gate concept is exactly right, but it needs sharper operational semantics.
- Recovery, ledger, and checkpoint ideas are present but not yet proven by a replay drill.
- Production/adoption records are named, but no merged acceptance certificate exists yet.

Blocking concerns:

- Finding 3.
- Finding 4.

## Positive Findings

- The best-of-all merge did preserve the right boundary: inspiration, not cloning.
- DFMS still keeps standards, traceability, expert debate, handoff, and production ownership as the spine.
- The new templates are a good starting point for a real control graph, work ledger, and refinery gate.
- The merge correctly keeps runtime adapters optional instead of forcing a Fabro/Gas Town-style implementation too early.

## Quality Certificate

Certificate ID: CERT-BEST-OF-ALL-CRITIC-001.

Verdict: revise.

Reason:

The concept is directionally strong, but the merged objects are not yet fully wired through lifecycle, traceability, and the installed skill package.

Required before pass:

1. Route governed DFMS work through the meta-attractor without an unconditional bypass.
2. Update lifecycle stages for control graph, work ledger, and refinery gate.
3. Install required best-of-all templates inside `df-meta-attractor`.
4. Extend the traceability evidence model to include merged objects.
