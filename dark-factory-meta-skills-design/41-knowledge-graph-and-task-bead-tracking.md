**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# Knowledge Graph And Task Bead Tracking

## Purpose

This revision adds a graphified operating model to DFMS. The control graph says how the factory should run. The work ledger says what work exists. The knowledge graph says what the factory knows, why it knows it, how each object is connected, and what proof exists. `TASKS.md` is the strict bead tracker that makes day-to-day execution visible, resumable, and auditable.

The goal is to make a dark-factory run feel like a rigorous outsourcing engagement with an elite delivery firm: every work bead has a scope, owner, state, evidence, checkpoint, token-budget posture, and next bead. Nothing disappears into chat memory.

## Graph Layers

The graph has five cooperating layers:

1. Meta-meta layer: attractor state, selected skills, factory policies, token-budget approvals, change-control posture, and transfer tests.
2. Lifecycle layer: control graph nodes, gates, stage exits, re-entry routes, and governance decisions.
3. Knowledge layer: requirements, answers, assumptions, risks, decisions, artifacts, rubrics, reviewers, RALPH loops, evidence, tests, code changes, handoffs, certificates, and lessons.
4. Execution layer: task beads, work-ledger entries, active owners, blockers, next actions, and checkpoint approvals.
5. Memory layer: context packs, predecessor recovery records, replay drills, institutional lessons, and resume state.

## Required Node Types

Every governed run must support these node types. A run can instantiate only the nodes it needs, but it must not invent untyped objects.

| Node Type | Purpose | Required Links |
| --- | --- | --- |
| `intent` | Human goal, transcript statement, or steering input | `derives_from`, `decomposes_to` |
| `interrogation_answer` | Captured answer with source, confidence, contradiction score, and approval state | `answers`, `derives_from`, `revalidated_by` |
| `requirement` | Functional or business requirement | `derives_from`, `satisfies`, `verifies`, `tracked_by` |
| `nfr` | Quality attribute requirement | `derives_from`, `verifies`, `mitigates`, `tracked_by` |
| `assumption` | Explicit uncertain belief | `derives_from`, `revalidated_by`, `mitigates` |
| `risk` | Delivery, product, technical, safety, privacy, compliance, or operational risk | `raises`, `mitigates`, `owned_by` |
| `decision` | ADR, governance choice, waiver, or tradeoff | `decides`, `supersedes`, `evidenced_by` |
| `control_graph_node` | Lifecycle node or gate from the control graph | `routes_to`, `gated_by`, `tracked_by` |
| `work_ledger_item` | Durable work item record | `tracked_by`, `depends_on`, `evidenced_by` |
| `task_bead` | Smallest governed execution unit | `tracked_by`, `depends_on`, `gated_by`, `evidenced_by`, `next_bead` |
| `artifact` | Project-book artifact, template instance, code-facing document, or handoff package | `satisfies`, `reviewed_by`, `verified_by`, `certified_by` |
| `artifact_template` | Reusable template, not proof | `instantiates`, `guarded_by` |
| `rubric` | Artifact or skill quality rubric | `applies_to`, `scored_by` |
| `expert_role` | Primary author, reviewer, critic, adversary, or approver persona | `owns`, `reviewed_by`, `attacked_by` |
| `review_record` | Primary review, adversarial review, or cross-critique | `reviewed_by`, `finds`, `requires_patch` |
| `ralph_loop` | Review, Attack, Learn, Patch, Harden iteration | `attacks`, `patched_by`, `hardened_by`, `evidenced_by` |
| `evidence` | Test result, review result, transcript excerpt, file, screenshot, log, signed approval, or validator output | `evidences`, `cites` |
| `test` | Verification activity or acceptance scenario | `verifies`, `evidenced_by` |
| `code_change` | Commit, patch, migration, config change, or generated code slice | `implements`, `verifies`, `tracked_by` |
| `handoff` | Human-agent or agent-human transfer record | `hands_off_to`, `resumes_from`, `evidenced_by` |
| `certificate` | Quality, trace, security, release, or handoff certificate | `certifies`, `gated_by`, `evidenced_by` |
| `memory_pack` | Context pack, predecessor recovery note, replay result, or project-book index | `resumes_from`, `learns_from`, `cites` |
| `lesson` | Retrospective improvement that updates skills, rubrics, templates, or governance | `learns_from`, `supersedes`, `tracked_by` |

## Required Edge Types

The graph uses typed edges so traceability is not a bag of links.

| Edge Type | Meaning |
| --- | --- |
| `derives_from` | Target exists because of source intent, answer, standard, risk, or decision. |
| `decomposes_to` | Source breaks into smaller requirements, artifacts, tasks, or beads. |
| `answers` | An interrogation answer resolves or partially resolves a question. |
| `satisfies` | Artifact, design, or implementation satisfies a requirement or standard obligation. |
| `implements` | Code or configuration implements a requirement or design decision. |
| `verifies` | Test, review, or evidence verifies a requirement, artifact, or gate. |
| `mitigates` | Decision, task, artifact, test, or control mitigates a risk. |
| `raises` | Object introduces or exposes a risk, question, or contradiction. |
| `decides` | Decision record resolves an option, waiver, or governance issue. |
| `supersedes` | New object replaces older object and preserves rationale. |
| `depends_on` | Target cannot proceed without source. |
| `blocks` | Source actively blocks target. |
| `tracked_by` | Object is tracked by a work-ledger item or task bead. |
| `gated_by` | Object requires a gate, review, certificate, approval, or validator. |
| `reviewed_by` | Object was reviewed by named expert role or panel. |
| `attacked_by` | Object was adversarially challenged. |
| `requires_patch` | Review finding demands correction. |
| `patched_by` | Finding or risk was corrected by a patch bead or artifact update. |
| `hardened_by` | RALPH hardening step reduced future recurrence risk. |
| `evidenced_by` | Claim or state is backed by evidence. |
| `certified_by` | Accepted object has a quality or release certificate. |
| `waived_by` | Required control was waived with owner, expiry, rationale, and residual risk. |
| `hands_off_to` | Work state transfers from one owner to another. |
| `resumes_from` | New work resumes from a previous state, context pack, or handoff. |
| `learns_from` | Skill, rubric, template, or process update comes from a lesson. |
| `next_bead` | Execution moves from one bead to the next explicit bead. |

## Task Bead Definition

A task bead is the smallest governed execution unit that can move independently through the factory. It is smaller than a stage, usually smaller than an artifact, and stricter than a chat todo.

Each bead must have:

- Stable bead ID: `TB-YYYYMMDD-NNN` or project-local equivalent.
- One-sentence objective.
- Scope boundary.
- Accountable owner and active owner.
- Source intent or requirement.
- Linked control graph node.
- Linked work-ledger item.
- Linked knowledge graph node.
- Inputs and outputs.
- Token SWAG band where material work is involved.
- State.
- Dependencies and blockers.
- Acceptance gate.
- Evidence required.
- Evidence provided.
- Next bead.
- Re-entry trigger.
- Change-control trigger.
- Residual risk.

## Strict Bead States

| State | Meaning | Exit Requirement |
| --- | --- | --- |
| `queued` | Captured but not ready | Source and owner known |
| `ready` | Can start | Inputs, scope, and gate defined |
| `active` | Currently being worked | One active owner, current evidence path visible |
| `blocked` | Cannot proceed | Blocker, owner, and unblock action recorded |
| `reviewing` | Awaiting expert, human, or validator review | Review panel and rubric linked |
| `rework` | Failed gate or review | Findings linked and patch bead created |
| `hardened` | RALPH fixes applied | Regression, trace, and prevention evidence linked |
| `accepted` | Done for this bead | Gate, evidence, trace, and next bead recorded |
| `deferred` | Intentionally delayed | Owner, rationale, expiry, and revalidation trigger recorded |
| `retired` | Superseded or no longer needed | Superseding bead or decision linked |

No bead is complete because somebody said it is complete. A bead is complete only when the graph shows why it exists, what it changed, who checked it, what evidence supports it, and what happens next.

## TASKS.md Contract

Every governed run must maintain a `TASKS.md` at the project-book root or skill-design root. It is the human-readable bead ledger.

Required sections:

- Zero-slop banner.
- Project/task bead operating rules.
- Current run header.
- Active bead table.
- Ready/queued bead table.
- Blocked bead table.
- Review/rework bead table.
- Accepted bead table.
- Deferred/retired bead table.
- Bead detail records.
- Change log.
- Open approvals.
- Token-budget checkpoint log.
- Validator and evidence log.

Required table columns:

- `Bead ID`
- `State`
- `Objective`
- `Owner`
- `Control Node`
- `Work Ledger`
- `KG Node`
- `Inputs`
- `Outputs`
- `Gate`
- `Evidence`
- `Next Bead`
- `Token SWAG`
- `Approval`

## Bead Rules

- Every material task must have a bead before work starts.
- One owner can have multiple beads, but each active bead must name a single active owner.
- A bead cannot move to `active` without source, scope, input, output, and gate.
- A bead cannot move to `reviewing` without output and evidence.
- A bead cannot move to `accepted` without trace links, gate result, evidence, and next bead or closure rationale.
- A bead cannot be `blocked` without an unblock owner and next action.
- A bead cannot be `rework` without findings and a patch bead.
- A bead cannot be `hardened` without prevention evidence.
- A bead cannot be deleted; it can be retired with a superseding bead or decision.
- A material token-budget change creates a change-control bead.
- A human checkpoint creates an approval bead.
- A template-generation bead must remain distinct from an instantiated-evidence bead.

## Artifact Bead Specialization

Every artifact-generation bead must link:

- Artifact BOM ID.
- Artifact template path.
- Artifact example path if available.
- Artifact-specific rubric.
- Three primary critic roles.
- At least two adversarial critic roles.
- Minimum five RALPH loops or an explicit risk-owned waiver.
- Review findings.
- Patch records.
- Refinery gate.
- Certificate.
- Bidirectional trace entries.

## Graph Quality Gate

The graph is acceptable only when:

- Node IDs are unique.
- Edge source and target IDs resolve.
- Required node types are represented or waived.
- Accepted task beads have evidence, gate, trace, and next-bead or closure rationale.
- Accepted artifacts link template, instantiated artifact, rubric, reviewer panel, RALPH loop, evidence, and certificate.
- Waivers have owner, rationale, expiry, residual risk, and revalidation trigger.
- No template-only object is counted as evidence.
- No orphan requirement, risk, artifact, bead, or certificate exists.

## Integration With Existing DFMS Objects

- `df-meta-attractor` creates the initial attractor run record, control graph, knowledge graph seed, work ledger, and first `TASKS.md`.
- `df-governance-mayor` enforces bead state transitions, token-budget approvals, and stage-gate movement.
- `df-intake-spec-lab` writes interrogation answers as graph nodes and links them to requirements.
- `df-artifact-factory` creates artifact nodes and bead detail records for templates and instantiated artifacts.
- `df-quality-refinery` creates review, adversarial critic, RALPH, score, and certificate nodes.
- `df-traceability-evidence` validates graph links and rejects orphan claims.
- `df-context-memory` uses graph and bead state for predecessor recovery and fresh-session replay.
- `df-human-agent-handoff` uses beads as handoff units.
- `df-feedback-learning` turns lessons into graph-linked skill updates.

## Validator Commitments

Two validators are added:

- `validate_knowledge_graph.py`: checks graph shape, template-only rejection, node uniqueness, edge resolution, accepted artifact proof, accepted bead proof, and waiver completeness.
- `validate_tasks_md.py`: checks banner, required sections, bead tables, bead IDs, accepted bead evidence, blocked bead unblock ownership, rework patch beads, and next-bead discipline.

These validators are structural gates. They do not replace human or expert review. They prevent missing proof from being quietly accepted.

## Result

This revision converts DFMS from a document-and-ledger system into a graph-backed factory system. The graph makes knowledge explicit. `TASKS.md` makes execution explicit. The bead protocol makes iterative work safe, inspectable, and resumable without relying on memory or trust.
