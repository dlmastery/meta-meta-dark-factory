# 04. Expert Rubrics

## Scoring Rule

Each selected expert role scores 15 checks. Each check is scored:

- `0` = absent or wrong.
- `1` = weak, vague, or unsupported.
- `2` = acceptable but incomplete.
- `3` = strong, specific, and evidenced.
- `4` = exemplary, traceable, and reusable.

Maximum per expert: 60 points. Convert to percentage for gates.

Default gate: each selected expert must score at least 96 percent unless the governance plan explicitly sets a different threshold.

## Role Selection Rule

Every material artifact uses exactly 3 primary expert reviewers by default:

1. One standards/process reviewer.
2. One domain/design reviewer.
3. One verification/operations reviewer.

Additional reviewers are added for high-risk artifacts.

## 1. Governance and Standards Auditor

Use for process adherence, lifecycle coverage, audit readiness, and stage gates.

1. Correct standards baseline is declared.
2. Applicable standards are tailored with rationale.
3. Required lifecycle process outcomes are represented.
4. Required information items are present or explicitly combined.
5. Exclusions are justified and approved.
6. Artifact ownership is clear.
7. Approval authority is clear.
8. RASCI is consistent with the stage.
9. Change control path is defined.
10. Traceability obligations are defined.
11. Review evidence is complete.
12. Residual risk is recorded.
13. Version and date are present.
14. Audit trail can be followed by a fresh reviewer.
15. No unsupported compliance claims are made.

## 2. Product and Domain Expert

Use for business value, real-world fit, user needs, domain language, and adoption.

1. Business goal is specific.
2. User problem is clear.
3. Stakeholders are identified.
4. Domain terminology is correct.
5. User journeys are realistic.
6. Functional scope is complete enough.
7. Out-of-scope items are explicit.
8. Acceptance criteria match business intent.
9. Edge cases reflect real domain behavior.
10. Regulatory or market constraints are captured.
11. User experience expectations are stated.
12. Business risks are captured.
13. Success metrics are measurable.
14. Maintenance ownership is realistic.
15. The artifact would help a future human owner.

## 3. Requirements and Traceability Lead

Use for SRS, requirements, scenarios, coverage, and bidirectional links.

1. Each requirement is atomic.
2. Each requirement is testable.
3. Requirement priority is clear.
4. Requirement source is recorded.
5. Functional requirements are complete.
6. Non-functional requirements are complete.
7. Constraints are separated from requirements.
8. Assumptions are explicit.
9. Acceptance criteria link to requirements.
10. Requirements link to design elements.
11. Requirements link to tests.
12. Requirements link to implementation where applicable.
13. Deferred requirements are justified.
14. Conflicts and ambiguities are resolved or escalated.
15. Reverse traceability can explain why each artifact exists.

## 3A. Requirements Decomposition Lead

Use for recursive spec decomposition, branch interviews, completeness validation, and requirement-tree quality.

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

## 4. System Architect

Use for HLD, LLD, ADRs, integration design, scalability, and technical fit.

1. Architecture directly serves the requirements.
2. Major components have clear responsibilities.
3. Boundaries and interfaces are explicit.
4. Data flows are described.
5. Failure modes are considered.
6. Scalability trade-offs are analyzed.
7. Reliability trade-offs are analyzed.
8. Security architecture is integrated.
9. Operational concerns are designed in.
10. Alternatives are seriously compared.
11. Decision rationale is specific.
12. Coupling and cohesion are appropriate.
13. Technology choices fit constraints.
14. Design can evolve without excessive rewrite.
15. Architecture is understandable to a new maintainer.

## 5. MDA Model Architect

Use for CIM, PIM, PSM, model transformations, and platform separation.

1. CIM captures business behavior without platform leakage.
2. PIM captures system behavior independent of implementation stack.
3. PSM maps platform choices explicitly.
4. CIM to PIM transformation is traceable.
5. PIM to PSM transformation is traceable.
6. Transformation exceptions are justified.
7. Models use appropriate notation.
8. Model elements map to requirements.
9. Model elements map to design and code.
10. Platform assumptions are explicit.
11. Business logic is not trapped in infrastructure details.
12. Integration points are modeled.
13. Data semantics are modeled.
14. Model drift controls are defined.
15. A future implementation can be regenerated or reasoned from the models.

## 6. DDD and Domain Architecture Critic

Use for bounded contexts, aggregates, invariants, ubiquitous language, and domain integrity.

1. Bounded contexts are named and justified.
2. Ubiquitous language is consistent.
3. Aggregates have clear boundaries.
4. Invariants are explicit.
5. Domain services are not anemic dumping grounds.
6. Value objects and entities are distinguished.
7. Integration boundaries are clear.
8. Anti-corruption layers are used where needed.
9. Business rules are close to the domain model.
10. Cross-context dependencies are controlled.
11. Domain events are considered where useful.
12. Persistence details do not dominate the domain model.
13. Tests cover domain invariants.
14. Terms match stakeholder language.
15. The model reduces future misunderstanding.

## 7. Test and Verification Lead

Use for test strategy, test plans, holdouts, coverage, V&V, and evidence.

1. Test strategy matches risk.
2. Functional tests cover accepted requirements.
3. NFR tests are represented.
4. Negative cases are included.
5. Edge cases are included.
6. Regression scope is clear.
7. Test data is realistic and safe.
8. Automation plan is practical.
9. Manual verification, if any, is justified.
10. Holdout scenarios cannot be gamed by implementation.
11. Test results are reproducible.
12. Coverage gaps are explicit.
13. Failures produce actionable feedback.
14. Verification evidence is linked to requirements.
15. A fresh reviewer can rerun or inspect the evidence.

## 8. Security, Privacy, and AI Governance Engineer

Use for threat models, secure SDLC, privacy, supply chain, and agent governance.

1. Assets and trust boundaries are identified.
2. Threat actors and abuse cases are considered.
3. Security requirements link to tests.
4. Authentication and authorization are addressed.
5. Data protection and privacy requirements are addressed.
6. Secrets handling is safe.
7. Dependency and supply chain risks are checked.
8. SBOM or dependency manifest is present where needed.
9. Vulnerability handling process is defined.
10. Logging avoids sensitive data leakage.
11. AI/model use is disclosed where relevant.
12. Agent permissions follow least privilege.
13. Human approval is required for high-risk actions.
14. Security exceptions have risk acceptance.
15. The artifact avoids unsupported security claims.

## 9. SRE and Production Handoff Lead

Use for deployment, operability, reliability, runbooks, and human-owned production readiness.

1. Service ownership is clear.
2. Deployment steps are complete.
3. Rollback path is proven or explicitly limited.
4. Configuration requirements are clear.
5. Observability is sufficient.
6. Alerts map to user-impacting failure modes.
7. SLIs and SLOs are defined where needed.
8. Capacity assumptions are stated.
9. Incident response path is clear.
10. Runbooks are actionable under stress.
11. On-call handoff is realistic.
12. Known risks are visible.
13. Support and escalation paths are defined.
14. Maintenance tasks are documented.
15. Humans can operate the system without hidden agent context.

## 10. Brownfield Maintainer

Use for existing systems, code archaeology, safe changes, regression risk, and maintainability.

1. Existing architecture is understood before changes.
2. Existing conventions are followed.
3. Current behavior is characterized.
4. Impact analysis covers likely affected areas.
5. Backward compatibility is considered.
6. Migration risk is considered.
7. Test gaps are identified.
8. Change size is appropriately small.
9. Refactoring is separated from behavior change unless justified.
10. Legacy constraints are respected.
11. Operational history is considered.
12. Existing owner expectations are captured.
13. Documentation is updated where reality changed.
14. Regression evidence is sufficient.
15. Future maintainers can see why the change was made.

## 11. Delivery and Change Manager

Use for sprint cadence, change requests, release coordination, and stakeholder communication.

1. Work is decomposed into manageable slices.
2. Dependencies are explicit.
3. Sequence is justified by risk and value.
4. Change request is clear.
5. Acceptance path is clear.
6. Sprint or iteration boundary is clear.
7. Human review timing is realistic.
8. Blockers have escalation paths.
9. Status reporting is concise and useful.
10. Scope changes are controlled.
11. Release impact is visible.
12. Stakeholders know what decision is needed.
13. Commitments are evidence-based.
14. Lessons learned feed future work.
15. The plan is usable by humans and agents.

## 12. Data and Analytics Architect

Use for data-intensive systems, reporting, telemetry, migrations, and data quality.

1. Data ownership is clear.
2. Data definitions are precise.
3. Source of truth is identified.
4. Schema changes are versioned.
5. Migration strategy is safe.
6. Data quality checks are defined.
7. Retention and deletion rules are addressed.
8. Privacy constraints are addressed.
9. Analytics semantics match domain language.
10. Event and telemetry design is coherent.
11. Backfill and replay risks are considered.
12. Performance implications are considered.
13. Failure and recovery paths are defined.
14. Tests validate critical data transformations.
15. Reports or downstream consumers can trust the data lineage.

## Debate Outcome Labels

| Label | Meaning |
| --- | --- |
| `accept` | Meets threshold and can proceed |
| `revise` | Direction is valid but needs rework |
| `reject` | Wrong or unsafe direction |
| `split` | Work must be decomposed further |
| `defer` | Valid item, not in current scope |
| `escalate` | Human decision required |

## Anti-Slop Tests

Every expert should reject artifacts that show:

- Generic filler without project-specific content.
- Claims without evidence.
- Standards named but not mapped.
- Requirements without tests.
- Tests without requirements.
- Architecture without alternatives.
- Security without threat model.
- Production handoff without rollback and ownership.
- Brownfield change without recon.
- Human handoff that cannot be resumed by a fresh reviewer.
