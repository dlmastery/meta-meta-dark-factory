# 25. Ralph Loop Critic Review and Fix Record

Status: fixes applied; patch-level pass.

Date: 2026-04-25.

Meta-meta source: `records/pass25/meta-attractor-record.json`.

## Scope

Pass 25 reviewed whether pass 24's certificate bundle validation required evidence in the correct structured fields. The original transcript asks for traceable, auditable stage evidence; an ID appearing somewhere in prose is not enough.

## Three Expert Critic Review

### Finding 1: Certificate bundle validation accepted prose-only evidence mentions

Expert: Traceability and Evidence Critic.

Severity: P1.

Problem: `validate_quality_certificate.py` checked that the refinery gate text mentioned the certificate ID, panel score record ID, and artifact ID somewhere. Those IDs could appear only in `verdict_rationale` while the structured `scope.artifacts`, `evidence.rubric_scorecards`, and `evidence.certificates` lists pointed elsewhere.

Fix: `validate_refinery_gate.py` now exposes structured section-list extraction, and `validate_quality_certificate.py` now requires exact list membership in `scope.artifacts`, `evidence.rubric_scorecards`, and `evidence.certificates`.

### Finding 2: Pass refinery gates could have empty scope

Expert: Requirements Governance Architect.

Severity: P1.

Problem: A refinery gate could say `status: pass` while `scope` contained no work items, artifacts, code changes, or release items. That gives a future reviewer no accountable acceptance boundary.

Fix: `validate_refinery_gate.py` now rejects pass gates unless at least one scoped work item, artifact, code change, or release item is present.

### Finding 3: Pass refinery gates could omit verdict rationale or next action

Expert: Quality Refinery Reviewer.

Severity: P2.

Problem: The validator checked for top-level keys, but not that `verdict_rationale` and `next_action` were meaningful for pass gates.

Fix: Pass gates now require non-empty `verdict_rationale` and `next_action`.

### Finding 4: Structured-evidence and empty-scope regressions were not in the runner

Expert: Verification and Safety Critic.

Severity: P2.

Problem: The hardening suite had mismatch checks but not a case where the expected IDs appeared only in prose, nor a pass gate with empty scope and blank verdict fields.

Fix: The runner now rejects a structured-evidence mismatch fixture and a bad refinery empty-scope fixture.

## Files Changed

- `C:\Users\abhir\.codex\skills\df-quality-refinery\SKILL.md`
- `C:\Users\abhir\.codex\skills\df-quality-refinery\scripts\validate_refinery_gate.py`
- `C:\Users\abhir\.codex\skills\df-quality-refinery\scripts\validate_quality_certificate.py`
- `codex-skills/df-quality-refinery/SKILL.md`
- `codex-skills/df-quality-refinery/scripts/validate_refinery_gate.py`
- `codex-skills/df-quality-refinery/scripts/validate_quality_certificate.py`
- `codex-skills/.validation/run_pre17_hardening_checks.ps1`
- `dark-factory-meta-skills-design/records/pass25/*`

## Validation Evidence

- Installed and workspace validators compile.
- Full DFMS hardening runner passes.
- Quality certificate bundle pass fixture passes.
- Bad certificate gate structured-evidence fixture is rejected.
- Bad refinery empty-scope fixture is rejected.
- Existing certificate, refinery, rubric, intake, decomposition, trace, and merged-control negative fixtures still reject.
- Pass 25 merged control-plane records validate.
- Installed and workspace quality-refinery files match by hash.

## Residual Risks

| Risk | Status |
| --- | --- |
| Refinery gate parser still supports a focused YAML subset rather than full YAML | Open; future work should use a full YAML parser or JSON gate records. |
| Structured evidence validation proves list membership, not real-world artifact correctness | Open; real project expert review and full simulation remain required. |
| Full greenfield project-book rerun | Open. |
| Full brownfield project-book rerun | Open. |
| Runtime UI/dashboard for certificate and gate inspection | Open. |

## Verdict

Patch-level pass for Ralph loop pass 25.

Do not claim full DFMS runtime readiness from this record alone.
