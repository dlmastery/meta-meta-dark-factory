# 21B. Ralph Loop Critic Review and Fix Record

Status: fixes applied; patch-level pass.

Date: 2026-04-24.

Meta-meta source: `records/pass21b/meta-attractor-record.json`.

## Scope

This second pass 21 review checked whether the merged meta-meta control plane itself satisfied the original transcript requirements: every governed node must have what, why, how, where, when, who, how good, expert roles, rubrics, feedback, verification, and traceable evidence. It also checked whether the Attractor, control graph, work ledger, and refinery gate were actually one linked run rather than four individually valid files.

## Three Expert Critic Review

### Finding 1: Attractor records could omit required meta-meta outputs

Expert: Requirements Governance Architect.

Severity: P1.

Problem: `validate_merged_records.py` accepted an Attractor Run Record without the required layer map, node contract, expert debate, human decision points, assumptions, risks, anti-overfit checks, or verdict.

Fix: The validator now rejects attractor records that miss those required outputs. The hardening runner now removes `layer_map` from a copied pass record and confirms rejection.

### Finding 2: Control graph nodes did not enforce the transcript node contract

Expert: System and Workflow Architect.

Severity: P1.

Problem: A control graph node could pass with only label, owner, and evidence. The transcript explicitly requires each node to carry what, why, how, where, when, who, how good, expert roles, rubrics, debate or feedback, and gates.

Fix: The validator now requires every JSON control graph node to include a full `node_contract`, at least three `expert_panel` entries, non-empty `rubrics`, `feedback_loop`, and `gates`. The installed and workspace control graph templates now include those fields.

### Finding 3: Merged records were not required to be a linked set

Expert: Verification and Traceability Critic.

Severity: P1.

Problem: The merged-record validator checked that Attractor, control graph, work ledger, and refinery gate files existed and were individually shaped, but did not require them to reference each other. Four unrelated records could pass as a merged control plane.

Fix: The validator now requires each merged control-plane record ID to be referenced by another merged record. The hardening runner mutates a copied work ledger ID to an orphan value and confirms rejection.

### Finding 4: The hardening runner did not exercise merged-record validation

Expert: Quality Refinery Reviewer.

Severity: P2.

Problem: The runner compiled `validate_merged_records.py`, but did not run it against the active pass records or negative merged-object cases.

Fix: The runner now validates pass 21 merged records and rejects missing attractor outputs, missing node contracts, and orphan control-plane IDs.

## Files Changed

- `C:\Users\abhir\.codex\skills\df-meta-attractor\scripts\validate_merged_records.py`
- `C:\Users\abhir\.codex\skills\df-meta-attractor\assets\templates\control-graph-record.yaml`
- `codex-skills/df-meta-attractor/scripts/validate_merged_records.py`
- `codex-skills/df-meta-attractor/assets/templates/control-graph-record.yaml`
- `codex-skills/.validation/run_pre17_hardening_checks.ps1`
- `dark-factory-meta-skills-design/records/pass21/*`
- `dark-factory-meta-skills-design/records/pass21b/*`

## Validation Evidence

- Installed and workspace validators compile.
- Full DFMS hardening runner passes.
- Existing intake, decomposition, trace, and rubric positive fixtures still pass.
- Existing negative intake, decomposition, trace, and rubric fixtures are still rejected.
- Merged control-plane pass 21 records pass.
- Merged records missing attractor required outputs are rejected.
- Merged records missing node contract are rejected.
- Merged records with orphan control-plane ID are rejected.
- Pass 21B merged control-plane records validate.
- Installed and workspace meta-attractor validator/template hashes match.

## Residual Risks

| Risk | Status |
| --- | --- |
| Validator enforces required fields, not the semantic truth of those fields | Open; expert review and real project simulation remain required. |
| YAML validation is still more structural-text-based than JSON validation | Open; future work should add a YAML parser or require JSON for final gate evidence. |
| Full greenfield project-book rerun | Open. |
| Full brownfield project-book rerun | Open. |
| Runtime UI/dashboard for inspecting node contracts and merged links | Open. |

## Verdict

Patch-level pass for Ralph loop pass 21B.

Do not claim full DFMS runtime readiness from this record alone.
