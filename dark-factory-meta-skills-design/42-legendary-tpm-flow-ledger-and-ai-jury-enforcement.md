**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# Legendary TPM Flow Ledger And AI Jury Enforcement

## Purpose

This revision hardens DFMS against the main workflow failure: an AI agent skipping steps, inventing completion, rushing to a pleasing answer, or losing the thread through context rot.

The answer is to make workflow execution a governed state machine with three visible controls:

1. `TASKS.md` bead ledger: the human-readable execution string.
2. TPM flow ledger: the strict machine-readable source of step state, ownership, dependencies, gates, and next action.
3. PERT plan: the dependency network and critical path that says what can start, what is blocked, what is parallelizable, and what must not be skipped.

Then every material transition is judged by an AI professional review court: a TPM Judge, specialist jurors, an adversarial prosecutor, and an evidence clerk. Humans remain boundary owners for scope, production, legal, budget, or irreversible external actions, but routine progress inside approved bounds is not blocked waiting for a human when AI judge/jury gates can verify the work.

## Principle

AI agents are not trusted to remember the process. The process must remember the agents.

No agent may decide "what next" from chat alone. The next step comes from:

- current active bead in `TASKS.md`;
- current step in the TPM flow ledger;
- dependency readiness in the PERT plan;
- knowledge graph links;
- judge/jury verdict for transition.

## Control Stack

| Layer | Artifact | Enforcement Role |
| --- | --- | --- |
| Intent control | Attractor Run Record | Defines approved goal, bounds, token posture, change triggers |
| Dependency control | PERT plan | Prevents starting steps with unmet predecessors |
| Execution control | TPM flow ledger | Tracks state, owner, gates, evidence, and next step |
| Human-readable control | `TASKS.md` | Shows current, queued, blocked, review, accepted, and deferred beads |
| Truth control | Knowledge graph | Links steps to requirements, artifacts, reviews, risks, evidence |
| Review control | AI judge/jury record | Approves or rejects state transitions |
| Acceptance control | Refinery gate and certificate | Prevents fake done |
| Memory control | Context pack and replay drill | Prevents context rot and stale restart |

## Step State Machine

Every material step uses this state machine:

`planned -> ready -> active -> self_check -> judge_review -> jury_review -> rework | accepted -> next_ready | closed`

Exceptional states:

- `blocked`: unmet dependency, missing input, missing approval, failed validator, or unresolved risk.
- `waived`: explicitly skipped with owner, rationale, expiry, residual risk, and revalidation trigger.
- `retired`: replaced by a superseding step.

Required transition gates:

| Transition | Required Proof |
| --- | --- |
| `planned -> ready` | predecessors accepted or waived, inputs available, entry criteria met |
| `ready -> active` | owner assigned, token posture recorded, current bead visible |
| `active -> self_check` | output exists, source links exist, basic validators run |
| `self_check -> judge_review` | self-check evidence recorded and no known missing required field |
| `judge_review -> jury_review` | TPM Judge says dependencies, state, and evidence are coherent |
| `jury_review -> accepted` | specialist jurors pass, adversarial prosecutor stands down or findings are patched |
| `jury_review -> rework` | failed findings create patch beads |
| `accepted -> next_ready` | next step selected from PERT-ready candidates |
| any state -> `blocked` | blocker owner, unblock action, and recheck date recorded |
| any state -> `waived` | waiver owner, expiry, residual risk, and revalidation trigger recorded |

## AI Judge And Jury Model

The AI judge/jury is a governance panel, not a decorative debate.

Required roles:

| Role | Decision Rights |
| --- | --- |
| TPM Judge | Rejects illegal transitions, skipped dependencies, missing owner, missing next step, missing token posture, weak checkpointing |
| Evidence Clerk | Rejects claims without linked evidence, unresolved placeholders, template-as-proof, or stale validation |
| Standards Juror | Rejects lifecycle, ISO/RUP/MDA/DDD/TDD/SRE/SSDF claims that are not mapped to concrete tasks and artifacts |
| Domain/Artifact Juror | Rejects artifacts that do not satisfy the project-specific requirement and artifact-specific rubric |
| Verification Juror | Rejects weak tests, missing acceptance criteria, unverified NFRs, and untested risk mitigations |
| Adversarial Prosecutor | Attempts to prove slop, reward hacking, skipped steps, hidden assumptions, fake completion, or overfit |
| Jury Foreperson | Synthesizes votes, records dissent, and selects accepted/rework/blocked/waived outcome |

Pass rule:

- TPM Judge must pass.
- Evidence Clerk must pass.
- At least three specialist jurors must pass.
- Adversarial Prosecutor must stand down, or every attack must create a rework/patch bead.
- No P0/P1 workflow-fidelity finding can remain open.
- No transition can pass with missing next step unless the run is closed with closure rationale.

## Human Boundary Policy

The user explicitly does not want humans to become the bottleneck for routine workflow. DFMS therefore distinguishes between boundary approval and execution approval.

AI judge/jury may approve routine execution when:

- work is inside approved scope;
- token use is inside approved SWAG band;
- no legal, safety, privacy, production, or irreversible external action is introduced;
- no standards waiver is needed;
- no critical residual risk remains;
- the graph, ledger, PERT plan, evidence, and gates validate.

Human approval is required only when:

- scope or acceptance criteria materially change;
- token budget crosses the approved reapproval trigger;
- production, legal, safety, privacy, security-critical, regulatory, contractual, or irreversible business risk appears;
- a threshold is lowered;
- a waiver carries material residual risk;
- the AI judge/jury deadlocks or cannot establish evidence.

If a human is unavailable, the flow does not invent approval. It can continue only on independent ready steps inside the approved boundary; otherwise it marks a boundary bead as `blocked` or creates a safe preparation bead.

## PERT Requirements

Every governed flow must have:

- step IDs;
- dependency edges;
- earliest-start readiness;
- critical path;
- parallel-ready candidates;
- blocked steps and blocker owners;
- milestones;
- gates;
- re-entry paths;
- transfer tests;
- current step;
- next step candidates.

The PERT plan is not only a chart. It is the legal map of allowed next work.

## Strict Ledger Rules

- No material work starts without a TPM flow step and `TASKS.md` bead.
- No step can be accepted if any predecessor is not accepted or waived.
- No step can be accepted if the judge/jury record is missing.
- No step can be accepted if the knowledge graph lacks links to source, output, evidence, and gate.
- No step can be accepted if the PERT plan has no successor and no closure rationale.
- No step can be silently skipped; skipped means `waived`, with explicit residual risk.
- No agent can self-certify its own output; the AI judge/jury is a separate gate.
- No context resume can choose work from memory; it must load current active bead, flow ledger, PERT plan, and knowledge graph.
- No review can pass if it ignores dependency order, missing evidence, or active blockers.

## Legendary TPM Agent Duties

The TPM agent is responsible for the nervous system of the factory:

- Maintains the flow ledger and PERT network.
- Announces the current bead and only valid next steps.
- Detects skipped predecessors.
- Detects stale active work.
- Detects unclosed review findings.
- Detects hidden work outside approved scope.
- Detects token-budget reapproval triggers.
- Creates blocked, rework, waiver, or change-control beads when needed.
- Forces dependency-aware parallelization instead of free-form jumping.
- Preserves dissent and residual risk.
- Produces daily-style status from the ledger, not from vibes.

## Anti-Gaming Controls

| Failure Mode | Control |
| --- | --- |
| Context rot | Resume from graph, TPM ledger, PERT plan, and `TASKS.md` only |
| Hallucinated completion | Accepted state requires evidence, gate, judge/jury verdict, and graph links |
| Reward hacking | Templates, empty reviews, low-effort scores, and self-certification are rejected |
| Step skipping | PERT validator rejects accepted steps with unmet predecessors |
| Fake review | Judge/jury record requires role contracts, votes, dissent, prosecutor attacks, and evidence |
| Slop artifacts | Artifact-specific rubrics, adversarial critics, RALPH loops, and certificates remain mandatory |
| Human bottleneck | AI judge/jury can approve inside preapproved boundary; humans handle boundary changes |
| Infinite loop | Each rework creates patch bead, re-entry trigger, and pass/fail/waive decision |
| Invisible scope drift | Scope or token drift creates change-control bead |

## Required Templates

This revision adds:

- `tpm-flow-ledger.json`
- `factory-pert-plan.json`
- `ai-judge-jury-record.json`

## Required Validators

This revision adds:

- `validate_tpm_flow.py`: validates TPM ledger, PERT dependencies, current/next step discipline, judge/jury verdicts, template rejection, accepted-step evidence, and waiver completeness.

## Result

DFMS now has a strict TPM operating layer. Agents do not decide what to skip, what to do next, or whether work is done. The ledger, dependency network, graph, evidence, and AI judge/jury decide. This is the core assurance mechanism for preventing agent slop from spoiling the factory.
