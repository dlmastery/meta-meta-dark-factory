# 09. Meta-Skill Self-Application Check

Artifact checked: `05-product-requirements-document-40-page.md`.

Purpose: apply the dark-factory meta-skill process to its own PRD revision.

## Node Contract

What: revise the PRD so the todo/habits app is a benchmark simulation for the factory, not the ultimate target.

Why: the customer clarified that the application is a test workload for proving the meta-skill system. The PRD must avoid overfitting and must become more rigorous.

How: update the controlling PRD with benchmark mode, anti-overfit controls, habit requirements, factory-evaluation requirements, transfer tests, traceability, risks, and clarification gates.

Where: `greenfield-todo-list-project-artifacts/05-product-requirements-document-40-page.md`.

When: before SRS, HLD, ADRs, implementation, or production artifacts.

Who: Codex as artifact author; future reviewers are Product/Domain Expert, Requirements/Traceability Lead, and Governance Auditor.

How good: must preserve 40 page markers, explicitly identify benchmark intent, separate product requirements from factory-evaluation requirements, and leave ambiguous customer signals unresolved instead of guessing.

## Self-Check Results

| Check | Result |
| --- | --- |
| Benchmark intent explicit | Pass |
| Todo/habits not ultimate target | Pass |
| Anti-overfit policy present | Pass |
| Product and factory-evaluation requirements separated | Pass |
| Habit thin-slice added | Pass |
| Transfer test added | Pass |
| Traceability updated | Pass |
| Risks updated | Pass |
| Earlier "1,3" ambiguity resolved by later `1,2,3,4` answer | Pass, superseded by ANS-004 |
| 40 page markers preserved | Pass |

## Remaining Human Clarifications

1. What did "1,3" mean?
2. Should habits remain in the benchmark thin slice?
3. Which dimensions define "state of art best of best" for this benchmark?
4. Should the benchmark remain local-only or include backend/sync/production paths to stress the factory harder?

Gate outcome: revised draft passes self-check, pending human clarification and second critic review.
