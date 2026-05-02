# 20. Ralph Loop Critic Review and Fix Record

Status: fixes applied; patch-level pass.

Date: 2026-04-24.

Meta-meta source: `records/pass20/meta-attractor-record.json`.

## Scope

Ralph loop pass 20 reviewed pass 19 for remaining bypasses against the original transcript goals: meta-meta governance, recursive decomposition, customer interrogation, validation completeness, traceability, negative evidence, and repeated expert review.

## Three Expert Critic Review

### Finding 1: Intake package validation did not invoke decomposition validation

Expert: Requirements Governance Architect.

Severity: P1.

Problem: `validate_intake_package.py` checked answer-to-node cross-links, but it did not run `validate_spec_decomposition.py`. A caller could validate an intake package while the decomposition record itself was structurally invalid.

Fix: `validate_intake_package.py` now imports and runs the decomposition validator before cross-link checks.

### Finding 2: Skipped decomposition levels could still pass silently

Expert: Requirements Decomposition Lead.

Severity: P1.

Problem: A decomposition could jump from `L0` or `L1` directly to `L5`, weakening the required recursive spec development protocol.

Fix: `validate_spec_decomposition.py` now rejects skipped levels unless the child node has an owner-scoped `level_skip` waiver. Added `spec-decomposition-negative-skipped-levels.json`, which the runner confirms is rejected.

### Finding 3: Tree integrity was not fully enforced

Expert: Verification and Traceability Critic.

Severity: P1.

Problem: Parent IDs and child lists were checked in one direction, but a node could claim a parent without the parent listing it, or exist outside the root-reachable tree.

Fix: `validate_spec_decomposition.py` now requires reciprocal parent-child links and root reachability. Added `spec-decomposition-negative-disconnected.json`, which the runner confirms is rejected.

### Finding 4: Positive fixture compressed levels without explicit evidence

Expert: Governance Auditor.

Severity: P2.

Problem: The validation fixture compressed the full L0-L5 taxonomy for compactness, but did not explain that compression.

Fix: The fixture now includes explicit owner-scoped `level_skip` waivers where it compresses L2-L4, and separate negative tests prove silent skipping is rejected.

## Files Changed

- `df-intake-spec-lab/scripts/validate_spec_decomposition.py`
- `df-intake-spec-lab/scripts/validate_intake_package.py`
- `codex-skills/.validation/spec-decomposition-pass.json`
- `codex-skills/.validation/spec-decomposition-negative-skipped-levels.json`
- `codex-skills/.validation/spec-decomposition-negative-disconnected.json`
- `codex-skills/.validation/run_pre17_hardening_checks.ps1`
- `codex-skills/dark-factory-meta-skills-manifest.yaml`
- `dark-factory-meta-skills-design/records/pass20/*`

## Validation Evidence

- Installed and workspace validators compile.
- Full DFMS hardening runner passes.
- Positive spec decomposition fixture passes.
- Intake package pass fixture passes.
- Negative intake package fixture is rejected.
- Negative spec decomposition fixture is rejected.
- Negative skipped-level decomposition fixture is rejected.
- Negative disconnected decomposition fixture is rejected.
- Spec decomposition template fixture is rejected.
- Negative governed-link fixture is rejected.
- Rubric template fixture is rejected.
- Pass 20 merged control-plane records validate.
- Installed and workspace skill bundles match by hash.

## Residual Risks

| Risk | Status |
| --- | --- |
| Fixture uses explicit level-skip waivers for compactness | Open; real governed project records should prefer full L0-L5 expansion unless a waiver is justified. |
| Validators prove structure, not semantic truth | Open; requires real customer answers, domain expert review, and owner approval. |
| Full greenfield project-book rerun | Open. |
| Full brownfield project-book rerun | Open. |
| Runtime UI/dashboard for tree inspection | Open. |

## Verdict

Patch-level pass for Ralph loop pass 20.

Do not claim full DFMS runtime readiness from this record alone.
