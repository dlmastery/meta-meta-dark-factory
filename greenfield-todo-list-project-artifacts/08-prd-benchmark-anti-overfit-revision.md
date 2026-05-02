# 08. PRD Benchmark And Anti-Overfit Revision

Revised artifact: `05-product-requirements-document-40-page.md`.

Revision intent: incorporate customer clarification that the "state of art best of best in the world todo and habits list" is an example application for simulation and testing of the meta-skill factory, not the ultimate product.

## Changes Applied

- Renamed the PRD from a todo-list product PRD to a reference todo-and-habits benchmark PRD.
- Reframed the project mode as greenfield benchmark simulation.
- Added explicit anti-overfit rules.
- Added Mode 0: Factory Benchmark / Simulation App.
- Added minimal habit-loop requirements and acceptance criteria.
- Added factory-evaluation requirements separate from product requirements.
- Added traceability rows for habits, factory overfit prevention, and the ambiguous "1,3" instruction.
- Added transfer tests so the process must generalize to another application domain.
- Added risks for overfitting, vague "best of best" scope expansion, ambiguous "1,3", and habit-related behavioral-health claims.
- Updated the Page 40 answer format to ask for benchmark intent, "1,3" clarification, habit scope, and the dimensions of "state of art best of best."

## Current Interpretation

The todo/habits app is a test workload. It should be excellent enough to stress the factory, but the factory must not hard-code its artifacts, templates, validation, or reasoning to this domain.

## Remaining Gate

Customer must clarify:

1. What "1,3" means.
2. Which dimensions define "best of best."
3. Whether habits are in the benchmark thin slice or reserved for a later slice.
4. Whether the benchmark remains local-only or should test backend/sync/production paths.

