# 21. Ralph Loop Critic Review and Fix Record

Status: fixes applied; patch-level pass.

Date: 2026-04-24.

Meta-meta source: `records/pass21/meta-attractor-record.json`.

## Scope

Ralph loop pass 21 reviewed the pass 20 system against the original transcript goals: serious DFMS work must be governed by meta-meta controls, recursive spec decomposition must be validated before artifact expansion, every customer answer must remain traceable, and waivers must be explicit process evidence rather than convenient escape hatches.

## Three Expert Critic Review

### Finding 1: Waivers were still too cheap

Expert: Requirements Governance Architect.

Severity: P1.

Problem: `validate_spec_decomposition.py` and `validate_trace_links.py` accepted waivers with only topic, owner, and reason. The transcript asks for human-grade control, so a waiver must carry accountable ownership, rationale, expiry or revalidation trigger, and residual risk.

Fix: Both validators now require complete waivers: matching topic, owner, reason, either `expires_at` or `revalidation_trigger`, and either `residual_risk` or `residual_risks`. The decomposition validator also audits record-level and node-level waivers so incomplete waivers cannot hide in accepted records.

### Finding 2: A record could lower its own pass threshold

Expert: Verification and Safety Critic.

Severity: P1.

Problem: Interrogation and decomposition records carried `threshold_percent`, but a record could set the value to a low number and pass. That undermined the "zero mistakes through gates" posture because the artifact could weaken its own gate.

Fix: `validate_spec_decomposition.py` and `validate_intake_package.py` now reject thresholds below 96 percent unless there is a complete `threshold_lowering` waiver. The hardening runner now creates low-threshold negative fixtures and confirms they are rejected.

### Finding 3: Answer-to-node traceability was not exact enough

Expert: Traceability and Evidence Critic.

Severity: P1.

Problem: The intake package validator checked that decomposition node answer IDs existed, and that every answer linked to some known node. It did not require the cited answer to link back to the exact node that cited it.

Fix: `validate_intake_package.py` now enforces exact reciprocal links. If node `SDN-X` cites answer `ANS-Y`, then `ANS-Y.links.spec_decomposition_nodes` must include `SDN-X`.

### Finding 4: Intake waivers were not globally audited

Expert: Governance Auditor.

Severity: P2.

Problem: The intake package validator used waiver completeness for low threshold exceptions, but did not reject unrelated incomplete waivers in the interrogation record.

Fix: `validate_intake_package.py` now audits every interrogation waiver for owner, reason, expiry or revalidation trigger, and residual risk. The hardening runner now creates an incomplete intake waiver fixture and confirms it is rejected.

## Files Changed

- `C:\Users\abhir\.codex\skills\df-intake-spec-lab\scripts\validate_spec_decomposition.py`
- `C:\Users\abhir\.codex\skills\df-intake-spec-lab\scripts\validate_intake_package.py`
- `C:\Users\abhir\.codex\skills\df-traceability-evidence\scripts\validate_trace_links.py`
- `codex-skills/df-intake-spec-lab/scripts/validate_spec_decomposition.py`
- `codex-skills/df-intake-spec-lab/scripts/validate_intake_package.py`
- `codex-skills/df-traceability-evidence/scripts/validate_trace_links.py`
- `codex-skills/.validation/spec-decomposition-pass.json`
- `codex-skills/.validation/run_pre17_hardening_checks.ps1`
- `dark-factory-meta-skills-design/records/pass21/*`

## Validation Evidence

- Installed and workspace validators compile.
- Full DFMS hardening runner passes.
- Positive greenfield and brownfield strict trace simulations pass.
- Panel rubric pass fixture passes.
- Positive spec decomposition fixture passes.
- Spec decomposition wrapper and strict trace fixtures pass.
- Intake package pass fixture passes.
- Negative intake package fixture is rejected.
- Negative spec decomposition fixture is rejected.
- Negative skipped-level decomposition fixture is rejected.
- Negative disconnected decomposition fixture is rejected.
- Low-threshold decomposition fixture is rejected.
- Incomplete waiver decomposition fixture is rejected.
- Low-threshold intake fixture is rejected.
- Incomplete intake waiver fixture is rejected.
- Spec decomposition template fixture is rejected.
- Negative governed-link fixture is rejected.
- Rubric template fixture is rejected.
- Pass 21 merged control-plane records validate.
- Installed and workspace skill bundles match by hash for the touched validators.

## Residual Risks

| Risk | Status |
| --- | --- |
| Validators prove structural integrity, not semantic truth | Open; real customer answers, domain review, and owner approval are still required. |
| JSON validators do not govern every prose-only artifact | Open; prose artifacts still need refinery review until all artifact types have structured schemas. |
| Full greenfield project-book rerun | Open. |
| Full brownfield project-book rerun | Open. |
| Runtime UI/dashboard for waiver, threshold, and trace inspection | Open. |

## Verdict

Patch-level pass for Ralph loop pass 21.

Do not claim full DFMS runtime readiness from this record alone.
