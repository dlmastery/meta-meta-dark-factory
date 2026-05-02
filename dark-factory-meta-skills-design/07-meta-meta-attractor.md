# 07. Meta-Meta Attractor Skill

## Purpose

`df-meta-attractor` is the skill above the dark-factory skill hierarchy. It turns broad, contradictory, evolving, or deeply ambitious requirements into a stable field before normal orchestration begins.

It is inspired by StrongDM Attractor's NLSpec-first, pipeline-oriented idea: the specification is strong enough to drive a software factory, and the workflow is explicit enough to be reviewed, versioned, resumed, and tested. In this system, the attractor is not a replacement for `dark-factory-orchestrator`; it is the force that shapes what the orchestrator should do.

## Layer

| Layer | Role |
| --- | --- |
| Product | The app, repo, feature, artifact, or production handoff being built |
| Meta-skill | A reusable dark-factory capability such as intake, traceability, quality, handoff, or SRE |
| Meta-meta skill | The attractor that chooses, constrains, updates, and quality-gates the meta-skills themselves |

## When It Triggers

Use `df-meta-attractor` when:

- The user says "meta-meta", "attractor", "factory above skills", or "make this reusable for all future projects."
- A request mixes product requirements, factory requirements, standards, review findings, and process improvement.
- A benchmark app might overfit the factory.
- A transcript or review exposes a systemic weakness in the skill hierarchy.
- The next output should be a governed run definition, not a direct code change.

## Attractor States

| State | Meaning | Response |
| --- | --- | --- |
| chaotic | Raw intent is broad, contradictory, or under-specified | Build field map and ask smallest needed question |
| forming | Goal is visible but scope or ownership needs work | Create node contract and conditional assumptions |
| stable | Goal, boundaries, routing, gates, and next action are clear | Hand off to orchestrator |
| splitting | Request contains multiple products or governance layers | Split into nodes |
| collapsing | Process is overfitting or over-documenting | Reduce to reusable patterns and evidence |
| blocked | Permission, human decision, or missing artifact prevents progress | Escalate or pause with handoff record |

## Required Output

Every meta-meta run must produce:

- Attractor state summary.
- Requirement field map.
- Product-specific versus reusable-factory distinction.
- Selected child skills and why.
- Lifecycle graph or ordered node list.
- Gates and thresholds.
- Human decision points.
- Traceability and evidence commitments.
- Anti-overfit and transfer-test commitments.
- Next safe action.

## Expert Debate

Three expert lenses are mandatory for material meta-meta decisions:

- System theorist: attractors, recursion, feedback loops, failure modes.
- Requirements/governance architect: standards-mapped controls, skill hierarchy, node contracts.
- Verification/safety critic: proof, gates, anti-overfit checks, residual risk.

They run independent framing, cross-critique, and synthesis. The debate is accepted only if it changes the output or explicitly confirms no change is needed.

## Relationship To Existing Skills

`df-meta-attractor` normally runs before:

- `dark-factory-orchestrator` for full project execution.
- `df-feedback-learning` for process updates.
- `df-artifact-factory` for new controlling artifacts.
- `df-quality-refinery` for certificates.

It should not load the entire skill hierarchy. Its job is compression and routing.

## Best-Of-All Merge Role

The meta-attractor owns the merge boundary between DFMS and external inspirations:

- It may adopt Attractor/Fabro graph discipline as a control graph.
- It may adopt Gas Town durable work state as a work ledger pattern.
- It may adopt Fabro/Gas Town verification integration as a refinery gate.
- It may adopt Octopus Deploy operations ideas as production handoff checks.
- It may adopt Octopus Garden AI rollout thinking as training/support/adoption checks.
- It may adopt Fabriqa/Factory interface and traceability ideas as optional adapters.

It must reject any external pattern that bypasses DFMS standards, traceability, expert review, human ownership, or artifact governance.

## Validation

Acceptance checks:

- A fresh Codex session can understand the goal, scope, selected skills, gates, evidence needs, and next step.
- Benchmark examples remain labeled as examples.
- Customer decisions are not left as open questions.
- Human ownership and production boundaries are explicit.
- The resulting run definition can apply to both greenfield and brownfield work.

## Installed Location

Installed skill path:

`C:\Users\abhir\.codex\skills\df-meta-attractor`
