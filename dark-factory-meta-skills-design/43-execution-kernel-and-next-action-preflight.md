**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# Execution Kernel And Next Action Preflight

## Purpose

This revision adds the DFMS execution kernel: a mandatory preflight that cross-checks all workflow control artifacts together and computes the only legal next action.

Before any serious agent continues work, it must load:

- `TASKS.md`
- TPM flow ledger
- PERT dependency plan
- knowledge graph
- SDLC Stage Coverage Matrix
- Hawkeye Conformance Audit Record
- AI judge/jury records
- relevant evidence and gate records

The kernel then answers:

1. Is the run state internally consistent?
2. What bead is active?
3. What step is active?
4. Are dependencies satisfied?
5. Are accepted steps properly judged and evidenced?
6. What is the legal next action?
7. Is the run closed, blocked, or waiting for boundary-human approval?

## Why This Exists

The highest-risk AI workflow failure is not only bad content. It is illegal movement: skipping a predecessor, treating a template as proof, silently accepting work, forgetting a blocker, inventing approval, or choosing a convenient next task from chat memory.

The execution kernel makes those failures visible before work starts.

## Mandatory Start Protocol

Every governed DFMS continuation must begin:

1. Load `TASKS.md`.
2. Load TPM flow ledger.
3. Load PERT plan.
4. Load knowledge graph.
5. Load SDLC Stage Coverage Matrix.
6. Load Hawkeye Conformance Audit Record.
7. Load judge/jury records named by accepted or in-review flow steps.
8. Run `dfms_execution_kernel.py`.
9. If the kernel returns `pass`, execute only the stated legal next action.
10. If the kernel returns `blocked`, create or update a blocked bead.
11. If the kernel returns `closed`, do not continue unless the user explicitly opens a new bead or change request.
12. If the kernel returns `change_control_required`, create a change-control bead before continuing.

## Kernel Invariants

The kernel rejects:

- `TASKS.md` active bead different from TPM ledger current bead.
- TPM ledger current step different from PERT current step.
- accepted TPM step missing judge/jury record.
- accepted TPM step missing evidence.
- accepted TPM step with unmet predecessor.
- accepted bead missing in knowledge graph.
- missing or invalid SDLC Stage Coverage Matrix.
- missing, failing, or stale Hawkeye Conformance Audit Record.
- product/code/UI/scenario/production work missing required stage or testing evidence.
- task bead in ledger missing from `TASKS.md`.
- task bead in ledger missing from knowledge graph.
- active work when run state is closed.
- closed run with active beads.
- templates presented as proof.
- judge/jury record that did not pass.
- adversarial prosecutor not stood down.
- missing next step or closure rationale.

## Next Action Policy

The next action is computed from state:

| Current State | Legal Next Action |
| --- | --- |
| `planned` | move to `ready` only if entry criteria and predecessors are satisfied |
| `ready` | move to `active` and update `TASKS.md` active bead |
| `active` | produce output and move to `self_check` |
| `self_check` | run validators and move to `judge_review` |
| `judge_review` | obtain TPM Judge and Evidence Clerk pass |
| `jury_review` | obtain specialist juror votes, adversarial prosecutor stand-down, foreperson verdict |
| `rework` | execute patch bead |
| `accepted` | activate next PERT-ready successor or close with rationale |
| `blocked` | execute unblock action or wait |
| `waived` | continue only if waiver is complete and unexpired |
| `closed` | stop unless user opens a new bead/change request |

## Transition Request

Any state movement must be represented by a transition request:

- requested transition
- current state
- target state
- reason
- predecessor evidence
- output evidence
- validator evidence
- judge/jury record
- token impact
- boundary-human trigger check
- next step

## Boundary-Human Trigger

The kernel cannot approve a transition if the transition triggers:

- scope change
- acceptance criteria change
- token budget reapproval
- production action
- legal, safety, privacy, security-critical, regulatory, contractual, or irreversible business risk
- standards waiver
- threshold reduction
- unresolved P0/P1 residual risk

It returns `change_control_required` or `human_boundary_required`.

## Required Artifacts

This revision adds:

- `execution-kernel-state.json`
- `workflow-transition-request.json`
- `next-action-report.json`
- `dfms_execution_kernel.py`

## Result

The factory now has a preflight cockpit. The agent must validate the whole workflow state before moving, and the next action is derived from the ledger network rather than from memory, confidence, or convenience.
