# Interrogation Protocol

Use this before artifact expansion, implementation, or brownfield modification when input quality controls downstream quality.

## Round Structure

1. Context round: problem, stakeholders, accountable owner, users, business goal, out-of-scope.
2. Outcome round: success measures, acceptance criteria, state-of-art expectations, benchmark versus product-specific intent.
3. Constraint round: standards, company stack, budget, timeline, compliance, privacy, security, accessibility, data, deployment.
4. Scenario round: happy paths, edge cases, abuse cases, failure modes, holdout candidates, transfer-test candidates.
5. Operations round: production owner, maintenance model, SRE comfort boundary, support, incident learning, handoff needs.
6. Contradiction round: conflicting answers, missing owner, untestable claims, hidden assumptions, risky ambiguity.
7. Approval round: summarized requirement set, unresolved questions, waivers, revalidation triggers, customer or owner approval.

## Answer Capture

Every material answer gets:

- `answer_id`, such as `ANS-001`.
- Source message or transcript line.
- Answer text or summary.
- Confidence: high, medium, low.
- Owner or decision maker.
- Affected requirements, scenarios, risks, artifacts, and work-ledger items.
- Revalidation trigger.

## Scoring

Score 0 to 4 for each:

1. Goal clarity.
2. Scope and out-of-scope.
3. Functional completeness.
4. Non-functional completeness.
5. Security, privacy, and compliance clarity.
6. Operations and handoff clarity.
7. Scenario and acceptance-test readiness.
8. Contradiction resolution.
9. Owner and approval clarity.
10. Traceability readiness.

Default pass: 90 percent for low-risk work, 96 percent for high-risk or governed DFMS work.

## Re-Interrogation Triggers

Re-ask or escalate when:

- A must-have requirement lacks acceptance evidence.
- A customer answer conflicts with another answer, existing artifact, standard, or production boundary.
- Ownership is unclear for production, compliance, security, or irreversible decisions.
- The implementation path requires guessing.
- Holdout or transfer-test coverage is weak for a benchmark or simulation.

## Approval Mechanics

Before artifact expansion for governed work, record:

- Approved requirement set.
- Explicit assumptions.
- Deferred questions and expiry.
- Waivers and residual risk.
- Human owner or delegated approval source.
