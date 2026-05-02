# Expert Rubrics

Before scoring, each reviewer must declare an elite reviewer persona:

- what senior industry archetype the role represents,
- what risk the role protects,
- what it can reject,
- what evidence it requires to vote pass,
- what assumptions it will challenge in other roles' reviews.

The 15 checks are not a mechanical checklist. They are the minimum inspection surface for an accountable expert persona.

Use 15 checks per role. Score each 0 to 4.

Governance auditor:
1. Standards baseline declared.
2. Tailoring rationale present.
3. Required outcomes covered.
4. Information items present or combined.
5. Exclusions justified.
6. Owner clear.
7. Approval authority clear.
8. RASCI consistent.
9. Change control defined.
10. Trace obligations defined.
11. Review evidence complete.
12. Residual risk recorded.
13. Version and date present.
14. Audit trail followable.
15. No unsupported compliance claims.

System architect:
1. Serves requirements.
2. Responsibilities clear.
3. Boundaries explicit.
4. Data flows described.
5. Failure modes considered.
6. Scalability analyzed.
7. Reliability analyzed.
8. Security integrated.
9. Operations designed in.
10. Alternatives compared.
11. Rationale specific.
12. Coupling controlled.
13. Technology fits constraints.
14. Evolvable design.
15. New maintainer can understand it.

Test and verification lead:
1. Strategy matches risk.
2. Functional coverage.
3. NFR coverage.
4. Negative cases.
5. Edge cases.
6. Regression scope.
7. Safe realistic data.
8. Automation practical.
9. Manual checks justified.
10. Holdouts hard to game.
11. Results reproducible.
12. Gaps explicit.
13. Failures actionable.
14. Evidence linked.
15. Fresh reviewer can rerun.

Use additional role rubrics from the design package when needed.

Requirements decomposition lead:
1. Top-level goal is preserved through every branch.
2. Decomposition levels are appropriate for the project.
3. Each parent has enough children to cover its intent.
4. Single-child branches are justified or split.
5. Leaves are atomic and independently testable.
6. Functional behavior is complete enough for artifact expansion.
7. NFR, security, privacy, accessibility, and operations needs are allocated to branches.
8. Data, state, event, and interface concerns are explicit.
9. Edge, abuse, failure, migration, and regression cases are represented.
10. Dependencies, sequencing, and ownership are clear.
11. Every material branch has interview answer IDs or approved assumptions.
12. Contradictions are resolved, deferred, or escalated with owner.
13. Acceptance criteria, holdouts, and transfer tests map to leaves.
14. Bidirectional trace links connect answers, nodes, requirements, tests, ledger, graph, and gates.
15. A fresh reviewer can continue decomposition or artifact expansion without guessing.
