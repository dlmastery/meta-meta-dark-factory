# 24. Ralph Loop Critic Review and Fix Record

Status: fixes applied; patch-level pass.

Date: 2026-04-25.

Meta-meta source: `records/pass24/meta-attractor-record.json`.

## Scope

Pass 24 reviewed certificate evidence linkage against the original transcript requirements: certificates must be traceable, evidence-backed, and repeatedly verified. Pass 23 added certificate validation, but the certificate could still be validated without fetching and comparing the referenced panel score record and refinery gate file.

## Three Expert Critic Review

### Finding 1: Pass certificates could validate without bundled evidence

Expert: Quality Refinery Reviewer.

Severity: P1.

Problem: `validate_quality_certificate.py` validated certificate fields, but a caller could omit the referenced panel score record and refinery gate file. That left the certificate as a self-asserted summary.

Fix: Pass certificates now require bundle validation with `--panel-score-record` and `--refinery-gate`. An unbundled pass certificate is rejected.

### Finding 2: Certificate panel reference was not compared to the panel file

Expert: Requirements Governance Architect.

Severity: P1.

Problem: The certificate could name `panel_score_record`, reviewers, artifact, and scores without proving they matched the actual panel score file.

Fix: Bundle validation now checks the referenced panel ID, artifact, reviewer roles, panel verdict, and reviewer percentages against the certificate.

### Finding 3: Certificate refinery gate reference was not compared to the gate file

Expert: Verification and Safety Critic.

Severity: P1.

Problem: The certificate could name a refinery gate without proving the gate file had the same ID, passed validation, and mentioned the same artifact, panel score record, and certificate ID.

Fix: Bundle validation now runs the refinery gate validator, compares the gate ID and pass status, and requires the gate file to mention the certificate ID, panel score record ID, and artifact ID.

### Finding 4: Bundle-mode validation was not in the runner

Expert: Release Readiness Reviewer.

Severity: P2.

Problem: The hardening runner validated certificates only in standalone mode, so future regressions could detach certificates from evidence files.

Fix: The runner now validates the positive certificate in bundle mode and rejects unbundled pass, panel-file mismatch, and gate-file mismatch fixtures.

## Files Changed

- `C:\Users\abhir\.codex\skills\df-quality-refinery\SKILL.md`
- `C:\Users\abhir\.codex\skills\df-quality-refinery\scripts\validate_quality_certificate.py`
- `codex-skills/df-quality-refinery/SKILL.md`
- `codex-skills/df-quality-refinery/scripts/validate_quality_certificate.py`
- `codex-skills/.validation/run_pre17_hardening_checks.ps1`
- `dark-factory-meta-skills-design/records/pass24/*`

## Validation Evidence

- Installed and workspace validators compile.
- Full DFMS hardening runner passes.
- Quality certificate bundle pass fixture passes.
- Bad certificate unbundled pass fixture is rejected.
- Bad certificate panel-file mismatch fixture is rejected.
- Bad certificate gate-file mismatch fixture is rejected.
- Existing certificate low-score, missing-gate, reviewer-score mismatch, low-threshold, and template fixtures still reject.
- Existing intake, decomposition, trace, rubric, refinery, and merged-control negative fixtures still reject.
- Pass 24 merged control-plane records validate.
- Installed and workspace quality-certificate validator and skill files match by hash.

## Residual Risks

| Risk | Status |
| --- | --- |
| Bundle validation proves file consistency and structural validity, not real-world artifact correctness | Open; real project expert review and simulation remain required. |
| Refinery gate parser is intentionally small and text-based | Open; future work should replace it with full YAML parsing or JSON gate records. |
| Full greenfield project-book rerun | Open. |
| Full brownfield project-book rerun | Open. |
| Runtime UI/dashboard for certificate and gate inspection | Open. |

## Verdict

Patch-level pass for Ralph loop pass 24.

Do not claim full DFMS runtime readiness from this record alone.
