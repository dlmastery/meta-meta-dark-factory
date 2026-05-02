# Requirement Field Model

Use this model to turn broad user intent into a navigable field before project execution.

## Signal Types

| Type | Meaning | Example |
| --- | --- | --- |
| INTENT | Durable user goal | Build a serious dark-factory system. |
| EXAMPLE | Benchmark or simulation workload | Todo and habits app. |
| POLICY | Always-on rule | Every artifact gets expert rubrics. |
| CONSTRAINT | Boundary or limitation | Humans retain production ownership. |
| STANDARD | External method or standard | ISO 12207, RUP, MDA, DDD, TDD. |
| ARTIFACT | Required output | PRD, SRS, HLD, runbook, certificate. |
| QUALITY | Threshold or gate | Three experts, 15-point rubrics. |
| RISK | Failure mode to manage | Overfit, weak handoff, fake traceability. |
| DECISION | Accepted answer | `1,2,3,4` selects all clarification paths. |
| QUESTION | Needed customer input | Preferred stack, maintainer, deployment target. |

## Distinction Rules

- Product-specific requirements describe the current app or codebase.
- Factory requirements describe reusable behavior of the meta-skill system.
- Governance requirements describe permissions, ownership, gates, and approvals.
- Evidence requirements describe how future reviewers know the work is true.
- Benchmark requirements deliberately stress the factory and must not become defaults for all projects.

## Contradiction Checks

Flag contradictions when:

- A feature is both in scope and out of scope.
- A customer answer remains listed as an unanswered question.
- A local-only assumption conflicts with sync or production requirements.
- A benchmark goal is treated as a universal factory rule.
- "Zero mistakes" is written as a guarantee instead of a verification posture.
- Production handoff lacks an owner, rollback, observability, incident path, or residual risk.

## Field Output

For every material run, produce:

| Field | Required Content |
| --- | --- |
| source | User message, transcript line, artifact, code, review, or standard |
| classification | INTENT, EXAMPLE, POLICY, CONSTRAINT, STANDARD, ARTIFACT, QUALITY, RISK, DECISION, QUESTION |
| normalized statement | Clear, testable statement |
| owner | Customer, Codex, human maintainer, reviewer, SRE, security, etc. |
| trace target | Requirement, decision, artifact, risk, test, or handoff |
| status | proposed, accepted, superseded, deferred, blocked |
| revalidation trigger | What makes this item need review again |
