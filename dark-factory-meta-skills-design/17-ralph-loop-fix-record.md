# 17. Ralph Loop Fix Record

Status: fixes applied; patch certificate only.

Date: 2026-04-24.

Source: `16-ralph-loop-critic-review.md`.

Pre-review hardening addendum: `17A-pre-review-hardening-record.md`.

## Fix Summary

| Finding | Fix |
| --- | --- |
| P1: Validator can bless templates | Replaced `validate_merged_records.py` so it rejects template paths, placeholder IDs, pending/proposed statuses, blank owners, empty evidence, and missing live next actions. The validator now accepts JSON or text records by structural type, not by loose marker strings. |
| P1: Rubric gate under-enforces expert review | Replaced `score_rubric_matrix.py` and the rubric score template so material review requires at least 3 reviewers, exactly 15 checks per reviewer, rationales, independent review timestamps, cross-critique, synthesis, and failed-point handling. The scorer now reads UTF-8 BOM-safe JSON. |
| P1: Duplicate evidence artifact ID | Changed Retrospective Learning Record from `EVD-008` to `EVD-010` and added artifact catalog ID validators. |
| P2: Methodology blender checklist | Added Methodology Blend Record template and required graph nodes, ledger items, method-specific gates, MDA transformations, DDD checks, TDD/BDD evidence, and refinery evidence. |
| P2: SRE handoff lacks outage-drill proof | Added outage drill/operator readiness record, runbook replay, diagnosis exercise, operator signoff, readiness score, and refinery linkage. |
| P2: Debate is not a governed object | Added Expert Debate Record template and required links to control graph, work ledger, decision record, trace evidence, and refinery gate. |
| P2: Conditional pass overstates readiness | Reworded artifact 15 as patch-level acceptance, not runtime readiness or full skill-system certification. |

## Updated Assets

- `df-meta-attractor\scripts\validate_merged_records.py`
- `df-quality-refinery\scripts\score_rubric_matrix.py`
- `df-quality-refinery\assets\templates\rubric-score-record.json`
- `df-quality-refinery\assets\templates\quality-certificate.json`
- `df-artifact-factory\scripts\validate_artifact_catalog_ids.py`
- `df-methodology-blender\assets\templates\methodology-blend-record.json`
- `df-production-sre-handoff\assets\templates\outage-drill-record.json`
- `df-production-sre-handoff\assets\templates\production-handoff-record.json`
- `df-swarm-coordination\assets\templates\expert-debate-record.json`
- `03-artifact-catalog.md`
- `15-review-finding-fix-record.md`
- `codex-skills\dark-factory-meta-skills-manifest.yaml`

## Validation Evidence

- `validate_merged_records.py` accepts an instantiated Attractor Run Record, Control Graph, Work Ledger, and Refinery Gate set.
- `validate_merged_records.py` rejects the meta-attractor template directory as non-evidence.
- `score_rubric_matrix.py` accepts a 3-reviewer panel with 15 checks per reviewer, independent timestamps, cross-critique, synthesis evidence, and failed-point closure.
- `score_rubric_matrix.py` rejects the rubric template as non-evidence.
- Design artifact catalog duplicate-ID validation passes.
- Installed and workspace skill bundle hashes match for the patched skill directories.
- Installed and workspace Python validator/scorer scripts compile.
- New JSON templates parse cleanly.
- Touched files are ASCII-clean.
- Additional pre-review strict trace simulations and negative tests are recorded in `17A-pre-review-hardening-record.md`.

## Certificate Separation

Patch certificate:

- This pass certifies that the seven Ralph-loop findings were patched at the skill/template/script/document level.

Skill-system certificate:

- Still requires a full rerun of the greenfield benchmark and a brownfield simulation with instantiated records.

Runtime-readiness certificate:

- Still requires a runtime adapter, graph/ledger persistence, digital-twin or sandbox verification harness, and human-facing surface.

## Residual Risks

| Risk | Status |
| --- | --- |
| No full greenfield benchmark rerun after the new validators | Open |
| No brownfield simulation after methodology/SRE/debate records | Open |
| No database-backed work ledger | Open |
| No digital-twin runtime harness | Open |
| No UI/dashboard for human communication records | Open |

## Verdict

Patch-level verdict: accepted for review.

Do not claim full DFMS runtime readiness from this record alone.
