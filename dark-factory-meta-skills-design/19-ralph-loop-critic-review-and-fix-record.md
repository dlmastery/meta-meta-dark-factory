# 19. Ralph Loop Critic Review and Fix Record

Status: fixes applied; patch-level pass.

Date: 2026-04-24.

Meta-meta source: `records/pass19/meta-attractor-record.json`.

## Scope

Ralph loop pass 19 reviewed the recursive spec development work against the original transcript goals: meta-meta governance, meta-skill orchestration, recursive decomposition, customer interviewing, completeness validation, expert review, traceability, standards-based artifacts, negative testing, and no unsupported readiness claims.

## Three Expert Critic Review

### Finding 1: Decomposition validation allowed shallow or under-governed trees

Expert: Requirements Decomposition Lead.

Severity: P1.

Problem: The decomposition validator required leaves to have good fields, but it could treat a childless non-leaf as a leaf and did not require non-leaf branches to carry source answers and trace links.

Fix: `validate_spec_decomposition.py` now requires real leaves to be `L5`, validates node levels and parent-child direction, validates non-leaf answer/assumption sources, and requires trace links for non-leaf branches too.

### Finding 2: Branch interviews were not cross-validated against interrogation answers

Expert: Requirements Governance Architect.

Severity: P1.

Problem: Spec decomposition nodes cited answer IDs, but no package-level validator proved those answer IDs existed in the interrogation record or that answers pointed back to decomposition nodes.

Fix: Added `validate_intake_package.py`, `intake-interrogation-pass.json`, and `intake-interrogation-negative.json`. The package validator checks required interrogation rounds, answer IDs, answer-to-node links, scores, approval, and decomposition-to-answer cross-links.

### Finding 3: Decomposition trace proof was not strict enough

Expert: Verification and Traceability Critic.

Severity: P1.

Problem: The runner checked the decomposition record as a wrapper artifact without strict reference and bidirectional trace validation.

Fix: Added `spec-decomposition-trace-strict-pass.json` and made the runner validate it with `--strict`.

### Finding 4: Meta and meta-meta gates did not explicitly require intake package validation

Expert: Meta-System Architect.

Severity: P2.

Problem: The intake skill knew about decomposition, but the orchestrator and meta-attractor did not explicitly require interrogation plus recursive decomposition package validation before governed artifact expansion.

Fix: Updated `dark-factory-orchestrator` and `df-meta-attractor` so governed artifact expansion requires accepted interrogation, recursive spec decomposition, intake package validation, or an owner-scoped waiver.

### Finding 5: Pass 19 itself needed instantiated control-plane evidence

Expert: Governance Auditor.

Severity: P2.

Problem: A Ralph-loop fix pass that changes meta/meta behavior should itself produce meta-attractor, control graph, work-ledger, and refinery gate records.

Fix: Added `records/pass19` with instantiated Attractor Run Record, Control Graph, Work Ledger, and Refinery Gate records.

## Files Changed

- `df-intake-spec-lab/SKILL.md`
- `df-intake-spec-lab/assets/templates/interrogation-record.json`
- `df-intake-spec-lab/scripts/validate_spec_decomposition.py`
- `df-intake-spec-lab/scripts/validate_intake_package.py`
- `dark-factory-orchestrator/SKILL.md`
- `df-meta-attractor/SKILL.md`
- `codex-skills/.validation/intake-interrogation-pass.json`
- `codex-skills/.validation/intake-interrogation-negative.json`
- `codex-skills/.validation/spec-decomposition-trace-strict-pass.json`
- `codex-skills/.validation/run_pre17_hardening_checks.ps1`
- `codex-skills/.validation/run_dfms_hardening_checks.ps1`
- `dark-factory-meta-skills-design/02-lifecycle-workflow.md`
- `dark-factory-meta-skills-design/records/pass19/*`

## Validation Evidence

- Installed and workspace validators compile.
- Strict greenfield trace simulation passes.
- Strict brownfield trace simulation passes.
- Panel rubric pass fixture passes.
- Spec decomposition pass fixture passes.
- Spec decomposition strict trace fixture passes.
- Intake package pass fixture passes.
- Negative intake package fixture is rejected.
- Negative spec decomposition fixture is rejected.
- Spec decomposition template fixture is rejected.
- Negative governed-link fixture is rejected.
- Rubric template fixture is rejected.
- Pass 19 merged control-plane records validate.
- Installed and workspace skill bundles match by hash.

## Residual Risks

| Risk | Status |
| --- | --- |
| Validators prove structure, not customer truth | Open; requires real customer answers and owner approval per run. |
| Semantic atomicity still needs expert review | Open; mitigated by Requirements Decomposition Lead rubric. |
| Full greenfield project-book rerun | Open. |
| Full brownfield project-book rerun | Open. |
| Runtime UI/dashboard for decomposition and interrogation review | Open. |

## Verdict

Patch-level pass for Ralph loop pass 19.

Do not claim full DFMS runtime readiness from this record alone.
