# Skill Routing Map

Use this reference before loading child dark-factory skills.

## Primary Routing

| Need | Skill |
| --- | --- |
| Full governed factory run | `dark-factory-orchestrator` |
| Raw intent to requirements | `df-intake-spec-lab` |
| Standards, stage gates, RASCI, change control | `df-governance-mayor` |
| SDLC artifacts and project book | `df-artifact-factory` |
| Triple review, rubrics, certificate | `df-quality-refinery` |
| Traceability and evidence ledger | `df-traceability-evidence` |
| Existing repo or legacy change | `df-brownfield-recon` |
| Human takeover or handback | `df-human-agent-handoff` |
| Context rot, resumes, project memory | `df-context-memory` |
| RUP, MDA, DDD, TDD, BDD, SRE blend | `df-methodology-blender` |
| Expert debate or decomposition | `df-swarm-coordination` |
| Release, operations, incident, maintenance package | `df-production-sre-handoff` |
| Lessons, review feedback, failed gates | `df-feedback-learning` |

## Meta-Meta Routing Patterns

Use `df-meta-attractor` first when:

- The user asks for the factory itself to improve.
- A request mixes product, process, governance, and benchmark goals.
- A previous artifact review reveals systemic weakness.
- The user says "meta-meta", "attractor", "factory above skills", "requirements gravity", or similar.
- The work must generalize across future projects and brownfield repos.

Then route to:

- `df-feedback-learning` when the result should update skills, templates, rubrics, or lessons.
- `dark-factory-orchestrator` when the result should start or continue a project run.
- `df-artifact-factory` when the result is a new controlling artifact.
- `df-quality-refinery` when the result needs certificate-level review.

## Minimal Loading Rule

Load only the child skill needed for the current node. Do not load every skill because the request is ambitious. The meta-attractor should compress the field, then the orchestrator should expand only the next step.
