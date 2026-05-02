# 18. Recursive Spec Decomposition Critic and Fix Record

Status: fixes applied; ready for next Ralph-loop critic review.

Date: 2026-04-24.

Source requirements checked:

- Transcript line 141 asks for recursive task decomposition guidelines, two-way traceability, strong rubrics, verification, alternative designs, debates, expert roles, and human-level workflow.
- Transcript lines 165-184 describe spec/scenario validation, recursive component breakdown, contracts, topological order, mini-loops, and traceability from spec sections to generated work.
- Transcript lines 227-228 call out recursive decomposition guidelines and human-level cadence as core factory quality controls.
- Earlier review findings required interrogation rounds, answer IDs, contradiction scoring, completeness scoring, re-interrogation, approval mechanics, and trace from answers to requirements.

## Three Expert Critic Review

### Expert 1: Requirements Engineering Lead

Finding: The intake skill had interrogation rounds, but did not force recursive decomposition from high-level goal to atomic, testable leaves.

Risk: A PRD could look complete while hiding compound requirements, missing branches, unallocated NFRs, or unowned policy decisions.

Fix: Added `spec-decomposition-protocol.md`, `spec-decomposition-record.json`, and `validate_spec_decomposition.py`.

### Expert 2: Verification and Completeness Critic

Finding: Completeness was scored at the whole-spec level but not at each branch and leaf.

Risk: A strong overall score could mask one weak branch. Holdouts and transfer tests could be attached late instead of being designed at decomposition time.

Fix: Each node now has a 15-point score set. Leaves require acceptance criteria, validation methods, evidence targets, dependencies, risks, and trace targets. Non-leaf nodes require coverage rationale and re-interrogation triggers.

### Expert 3: Industry SDLC and Traceability Auditor

Finding: Recursive decomposition was not yet a project-book artifact with traceable proof.

Risk: Future sessions could skip decomposition or treat it as informal reasoning, which violates the user's request for standards-based artifacts and auditable evidence.

Fix: Added Spec Decomposition Record to the artifact catalog and project-book sections. Trace schema now recognizes `SDR` and `SDN` IDs, and strict trace validation allows spec decomposition links.

## Improvements Made

| Area | Improvement |
| --- | --- |
| Intake protocol | Added recursive decomposition after interrogation and before artifact expansion. |
| Interviewing | Added branch-level interviews for intent, users, behavior, data/state, NFRs, interfaces, exceptions, contradictions, and approval. |
| Completeness | Added 15-point branch scoring and re-decomposition triggers. |
| Atomic leaves | Leaves must have parent, source answer or assumption, owner, priority, acceptance criteria, validation method, evidence target, dependencies, risks, and trace links. |
| Traceability | Added `SDR` and `SDN` to trace schema and trace validator link fields for decomposition nodes and interrogation answers. |
| Quality review | Added Requirements Decomposition Lead rubric to the installed quality skill and design package. |
| Artifact catalog | Added Spec Decomposition Record as a first-class requirements artifact. |
| Validation | Added positive, negative, and template-rejection checks to the pre-review validation runner. |

## Validation Evidence

- `validate_spec_decomposition.py` accepts `codex-skills\.validation\spec-decomposition-pass.json`.
- `validate_trace_links.py` accepts the same spec decomposition fixture as a project-book artifact wrapper.
- `validate_spec_decomposition.py` rejects `codex-skills\.validation\spec-decomposition-negative.json`.
- `validate_spec_decomposition.py` rejects the blank spec decomposition template.
- `run_pre17_hardening_checks.ps1` now compiles the intake validator and runs the decomposition checks.
- Artifact catalog duplicate-ID validation still passes.

## Residual Risks

| Risk | Status |
| --- | --- |
| Semantic atomicity cannot be fully proven by schema | Open; mitigated by expert rubric and reviewer gate. |
| Real customer interviews still require actual answers | Open; template and validator enforce structure, not business truth. |
| No visual decomposition editor yet | Open; current proof is record-based. |
| No automatic topological planning from decomposition tree yet | Open; tree links to control graph, but scheduling remains a separate orchestration concern. |

## Verdict

Patch-level verdict: accepted for next critic review.

This improves the requirements-development spine of DFMS, but it does not claim complete runtime readiness.
