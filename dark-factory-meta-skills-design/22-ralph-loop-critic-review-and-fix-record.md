# 22. Ralph Loop Critic Review and Fix Record

Status: fixes applied; patch-level pass.

Date: 2026-04-25.

Meta-meta source: `records/pass22/meta-attractor-record.json`.

## Scope

Pass 22 reviewed the quality-refinery layer against the original transcript requirements: every material artifact must receive expert review, 15-point rubrics, failed-point fixes, refinery gate evidence, traceability, and a certificate boundary. The review focused on whether executable validators could still bless weak quality evidence.

## Three Expert Critic Review

### Finding 1: Rubric threshold could be lowered by caller

Expert: Requirements Governance Architect.

Severity: P1.

Problem: `score_rubric_matrix.py` accepted a command-line threshold below 96 percent. A caller could pass `0` and get a pass verdict for a panel with 0 percent scores, bypassing the selected expert review threshold.

Fix: The scorer now rejects threshold arguments and `threshold_percent` values below 96 unless the record has a complete `threshold_lowering` waiver with topic, owner, reason, revalidation or expiry, and residual risk.

### Finding 2: Failed rubric points did not require fix evidence

Expert: Quality Refinery Reviewer.

Severity: P1.

Problem: A check below 4 only needed `fix_or_risk`. That let unresolved failed points pass as long as the reviewer wrote a risk note and the total score stayed above threshold.

Fix: Any check below 4 now requires `fix_evidence` or `resolution_evidence`, in addition to `fix_or_risk`. The rubric template now includes `fix_evidence`.

### Finding 3: Refinery pass gate accepted failed core checks

Expert: Verification and Safety Critic.

Severity: P1.

Problem: `validate_refinery_gate.py` mostly checked field presence. A gate with `status: pass`, `expert_rubrics: fail`, and empty evidence could still pass if the file was ASCII and structurally shaped.

Fix: The refinery validator now parses status, required checks, evidence sections, and pass-gate arrays. A pass gate requires core checks `attractor_record`, `control_graph`, `work_ledger`, `traceability`, and `expert_rubrics` to be `pass`, plus non-empty rubric, trace, and certificate evidence.

### Finding 4: Refinery gate validation was not exercised by the runner

Expert: Release Readiness Reviewer.

Severity: P2.

Problem: The hardening suite compiled quality-refinery validators but did not run a positive refinery gate fixture or negative pass-gate/template cases.

Fix: The runner now compiles `validate_refinery_gate.py`, validates `refinery-gate-pass.yaml`, rejects a bad pass gate, and rejects the refinery gate template.

## Files Changed

- `C:\Users\abhir\.codex\skills\df-quality-refinery\SKILL.md`
- `C:\Users\abhir\.codex\skills\df-quality-refinery\scripts\score_rubric_matrix.py`
- `C:\Users\abhir\.codex\skills\df-quality-refinery\scripts\validate_refinery_gate.py`
- `C:\Users\abhir\.codex\skills\df-quality-refinery\assets\templates\rubric-score-record.json`
- `codex-skills/df-quality-refinery/SKILL.md`
- `codex-skills/df-quality-refinery/scripts/score_rubric_matrix.py`
- `codex-skills/df-quality-refinery/scripts/validate_refinery_gate.py`
- `codex-skills/df-quality-refinery/assets/templates/rubric-score-record.json`
- `codex-skills/.validation/refinery-gate-pass.yaml`
- `codex-skills/.validation/run_pre17_hardening_checks.ps1`
- `codex-skills/dark-factory-meta-skills-manifest.yaml`
- `dark-factory-meta-skills-design/records/pass22/*`

## Validation Evidence

- Installed and workspace validators compile.
- Full DFMS hardening runner passes.
- Panel rubric pass fixture passes.
- Refinery gate pass fixture passes.
- Low-threshold rubric fixture is rejected.
- Unresolved rubric failed-point fixture is rejected.
- Bad refinery pass fixture is rejected.
- Refinery gate template fixture is rejected.
- Existing intake, decomposition, trace, rubric, and merged-control negative fixtures still reject.
- Pass 22 merged control-plane records validate.
- Installed and workspace quality-refinery files match by hash.

## Residual Risks

| Risk | Status |
| --- | --- |
| Validators prove evidence shape, not real-world truth | Open; full expert review and project simulation remain required. |
| Refinery gate YAML parser is intentionally small | Open; future work should use a full YAML parser or require JSON gate records for final certificates. |
| Quality certificate JSON has a template but not a dedicated validator | Open; next hardening pass should add certificate validation or merge certificate checks into refinery validation. |
| Full greenfield project-book rerun | Open. |
| Full brownfield project-book rerun | Open. |

## Verdict

Patch-level pass for Ralph loop pass 22.

Do not claim full DFMS runtime readiness from this record alone.
