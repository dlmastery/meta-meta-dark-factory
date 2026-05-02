# 17A. Pre-Review Hardening Record

Status: applied before the next Ralph-loop critic review.

Date: 2026-04-24.

Purpose: close fixable enforcement gaps before running another expert critic pass.

## Fixes Applied

| Area | Hardening |
| --- | --- |
| Trace validation | Replaced the live trace validator with strict mode support for governed records, UTF-8 BOM-safe JSON, unknown-link rejection, strict reference checks, and inbound/outbound trace checks. |
| Control-plane proof | Material records now fail strict validation if they lack control graph, work-ledger, or refinery gate links, unless an owner-scoped waiver exists. |
| Artifact proof | Material artifacts now require standards basis, reviewers, evidence, residual risk state, and trace links. |
| Pass-gate proof | A pass refinery gate now requires test report, rubric scorecard, and trace report evidence. |
| Simulation fixtures | Added strict greenfield and brownfield trace fixtures that exercise interrogation, methodology blend, expert debate, outage drill, human handoff, ledger, graph, and gate records. |
| Negative testing | Added a governed artifact fixture that must fail when graph, ledger, and gate links are missing. |
| Validation runner | Added `codex-skills\.validation\run_pre17_hardening_checks.ps1` to rerun compile, strict trace, rubric pass, negative trace, and template rejection checks. |

## Validation Evidence

- Installed validator scripts compile.
- Workspace validator scripts compile.
- Strict greenfield trace simulation passes.
- Strict brownfield trace simulation passes.
- Panel rubric pass fixture passes.
- Governed-link negative fixture is rejected.
- Rubric template fixture is rejected.

## Residual Risks

| Risk | Status |
| --- | --- |
| Full greenfield project-book rerun | Partially reduced by strict greenfield trace simulation; still open for complete artifact rerun. |
| Full brownfield project-book rerun | Partially reduced by strict brownfield trace simulation; still open for complete repository simulation. |
| Database-backed ledger persistence | Open. |
| Digital-twin runtime harness | Open. |
| Human-facing communication dashboard | Open. |

## Verdict

Patch-level hardening: accepted for the next critic review.

This record does not claim full DFMS runtime readiness.
