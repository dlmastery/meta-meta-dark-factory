# 23. Ralph Loop Critic Review and Fix Record

Status: fixes applied; patch-level pass.

Date: 2026-04-25.

Meta-meta source: `records/pass23/meta-attractor-record.json`.

## Scope

Pass 23 reviewed the quality certificate boundary against the original transcript requirements: every stage certificate must be backed by expert review, 15-point rubric evidence, failed-point fix evidence, refinery gate proof, traceability, and residual-risk state. Pass 22 had hardened rubric and refinery gates but left certificate validation as an open residual risk.

## Three Expert Critic Review

### Finding 1: Quality certificates had no executable validator

Expert: Quality Refinery Reviewer.

Severity: P1.

Problem: `quality-certificate.json` existed as a template, but no script rejected template-like, pending, under-reviewed, evidence-empty, or unlinked certificates. A future run could issue a certificate without real proof.

Fix: Added `scripts/validate_quality_certificate.py`. It requires a live certificate ID, artifact, live status, 3 reviewers, score object, panel score record, independent review evidence, cross-critique evidence, failed-point fix evidence, refinery gate link, evidence, residual-risk state, and complete waivers where used.

### Finding 2: Certificate reviewer scores could be disconnected from reviewers

Expert: Requirements Governance Architect.

Severity: P1.

Problem: A certificate could list one set of reviewers and score another set of roles, weakening the proof that the named experts actually accepted the artifact.

Fix: The certificate validator now requires reviewer identities to be unique and requires score keys to match the reviewer list. Missing reviewer scores and scores for unlisted reviewers are rejected.

### Finding 3: Certificate thresholds and scores were not governed

Expert: Verification and Safety Critic.

Severity: P1.

Problem: A pass certificate could carry weak scores or a low `threshold_percent` without a controlled deviation.

Fix: Pass certificates now require every reviewer score to be at least 96 unless there is a complete `threshold_lowering` waiver. The validator also rejects `threshold_percent` below 96 without that waiver.

### Finding 4: Certificate validation was not in the hardening runner or manifest

Expert: Release Readiness Reviewer.

Severity: P2.

Problem: The runner and manifest did not include certificate validation, so future bundle sharing or installation could regress back to template-only certificates.

Fix: The hardening runner now compiles and runs `validate_quality_certificate.py`, validates a positive certificate fixture, and rejects low-score, missing-gate, reviewer-score mismatch, low-threshold, and template certificate cases. The manifest now lists the validator and fixture.

## Files Changed

- `C:\Users\abhir\.codex\skills\df-quality-refinery\SKILL.md`
- `C:\Users\abhir\.codex\skills\df-quality-refinery\scripts\validate_quality_certificate.py`
- `C:\Users\abhir\.codex\skills\df-quality-refinery\assets\templates\quality-certificate.json`
- `codex-skills/df-quality-refinery/SKILL.md`
- `codex-skills/df-quality-refinery/scripts/validate_quality_certificate.py`
- `codex-skills/df-quality-refinery/assets/templates/quality-certificate.json`
- `codex-skills/.validation/quality-certificate-pass.json`
- `codex-skills/.validation/run_pre17_hardening_checks.ps1`
- `codex-skills/dark-factory-meta-skills-manifest.yaml`
- `dark-factory-meta-skills-design/records/pass23/*`

## Validation Evidence

- Installed and workspace validators compile.
- Full DFMS hardening runner passes.
- Quality certificate pass fixture passes.
- Bad certificate low-score fixture is rejected.
- Bad certificate missing-gate fixture is rejected.
- Bad certificate reviewer-score mismatch fixture is rejected.
- Bad certificate low-threshold fixture is rejected.
- Quality certificate template fixture is rejected.
- Existing intake, decomposition, trace, rubric, refinery, and merged-control negative fixtures still reject.
- Pass 23 merged control-plane records validate.
- Installed and workspace quality-certificate validator/template/skill files match by hash.

## Residual Risks

| Risk | Status |
| --- | --- |
| Certificate validator proves structure and evidence linkage, not real-world artifact correctness | Open; real project expert review and simulation remain required. |
| Certificate validator does not fetch and compare the referenced panel score record or refinery gate file | Open; future work should add cross-file certificate validation. |
| Full greenfield project-book rerun | Open. |
| Full brownfield project-book rerun | Open. |
| Runtime UI/dashboard for certificate and gate inspection | Open. |

## Verdict

Patch-level pass for Ralph loop pass 23.

Do not claim full DFMS runtime readiness from this record alone.
