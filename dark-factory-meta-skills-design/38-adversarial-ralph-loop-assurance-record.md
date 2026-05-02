# 38. Adversarial RALPH Loop Assurance Record

Status: generated and installed into live skills.

Date: 2026-04-25.

Purpose: make every governed artifact generation resistant to AI slop, generic filler, shallow review, unsupported confidence, and brittle real-world assumptions.

## Core Rule

Every governed DFMS artifact now requires:

- artifact-specific 3-critic primary panel,
- at least 2 adversarial critics,
- at least 5 RALPH loops,
- artifact-specific rubric scoring,
- failed-point fix evidence,
- trace closure,
- refinery gate proof,
- quality certificate.

Tokens remain budgeted and visible, but token minimization is not an acceptance objective. If the user approves governed artifact generation, quality and assurance gates dominate. Token pressure can trigger a client checkpoint, but it cannot reduce review depth.

## Required Adversarial Critics

### Anti-Slop Red Team Critic

Mandate:

- attack generic filler,
- attack unsupported claims,
- attack template residue,
- attack fictional examples treated as evidence,
- attack false certainty,
- attack standards name-dropping,
- attack missing trace,
- attack weak proof.

This critic is not allowed to stand down until every material claim has evidence, owner, trace, and review state.

### Failure-Mode/Reality Critic

Mandate:

- attack real-world failure modes,
- attack edge cases,
- attack operational breakdown,
- attack human adoption weakness,
- attack support ambiguity,
- attack maintainability traps,
- attack embarrassing counterexamples.

This critic is not allowed to stand down until the artifact survives realistic failure and handoff scrutiny.

## RALPH Definition

RALPH means:

| Letter | Phase | Required Behavior |
| --- | --- | --- |
| R | Review | Score artifact-level and critic-seat rubrics; identify defects and evidence gaps |
| A | Attack | Adversarial critics try to break claims, proof, trace, examples, assumptions, and handoff |
| L | Learn | Identify root causes, repeated weakness patterns, and process/template/rubric gaps |
| P | Patch | Update artifact, evidence, trace, decisions, residual risks, or template use |
| H | Harden | Re-run validators, re-review fixes, close or escalate residual risk |

Every artifact must run at least five RALPH loops. More loops are required when:

- P0/P1 findings remain,
- any critical rubric check scores below 4 without owner-approved residual risk,
- adversarial critics have not stood down,
- trace or evidence remains incomplete,
- the artifact still contains generic or placeholder content,
- the artifact cannot be handed to a future human or agent safely.

## Live Skill Enforcement

Installed into `df-quality-refinery`:

- `assets/templates/artifact-ralph-loop-record.json`
- `scripts/validate_artifact_ralph_loop.py`
- updated `assets/templates/artifact-review-panel-record.json`
- updated `assets/templates/rubric-score-record.json`
- updated `assets/templates/refinery-gate-record.yaml`
- updated `assets/templates/quality-certificate.json`
- updated validators and skill workflow

Installed into `df-artifact-factory`:

- artifact generation now requires Artifact Review Panel Record and Artifact RALPH Loop Record.
- artifact quality rules state minimum 2 adversarial critics and 5 RALPH loops.
- token minimization cannot reduce assurance gates.

Installed into `df-swarm-coordination`:

- debate protocol now embeds RALPH for governed artifact review.
- human escalation after 3 failed loops is for visibility and change-control awareness, not permission to skip the minimum 5 loops.

## Pass Gate

A governed artifact cannot pass when:

- fewer than 5 RALPH loops are recorded,
- fewer than 2 adversarial critics are recorded,
- attacks, root causes, patches, fix evidence, or re-review evidence are empty,
- adversarial critics have not stood down or escalated residual risk,
- P0/P1 findings remain,
- critical checks lack score 4 or accepted residual risk,
- the quality certificate lacks RALPH evidence,
- the refinery gate lacks RALPH evidence,
- token savings are used as a reason to reduce review depth.

## Validator Behavior

`validate_artifact_ralph_loop.py` rejects:

- missing artifact identity,
- missing artifact review panel record,
- missing artifact rubric path,
- fewer than 2 adversarial critics,
- fewer than 5 loops,
- pass before loop 5,
- loops without attacks,
- loops without root causes,
- loops without patches,
- loops without fix evidence,
- loops without re-review evidence,
- pass final gate without all required pass booleans.

`validate_artifact_review_panel.py` now rejects:

- missing adversarial critics,
- missing RALPH loop record,
- fewer than 5 required loops,
- adversarial critics without attack mandate, attack questions, red flags, and stand-down evidence.

`score_rubric_matrix.py` now rejects:

- artifact score records without `artifact_ralph_loop_record`,
- artifact score records with `minimum_ralph_loops_completed < 5`.

`validate_refinery_gate.py` now requires:

- `required_checks.adversarial_critics`,
- `required_checks.ralph_loops`,
- `evidence.adversarial_review_records`,
- `evidence.ralph_loop_records`.

`validate_quality_certificate.py` now requires:

- `artifact_review_panel_record`,
- `artifact_ralph_loop_record`,
- at least 2 adversarial critics,
- `minimum_ralph_loops_completed >= 5`,
- `adversarial_critics_stood_down=true` for pass certificates.

## Verdict

The DFMS artifact assurance model now has teeth. Every governed artifact must survive primary expert review, adversarial red-team attack, repeated improvement, validator-backed evidence, and human-visible residual-risk handling before it can be called accepted.

