# Spec Decomposition Protocol

Use this after the first interrogation round and before PRD/SRS expansion, planning, design, or implementation.

## Purpose

Turn raw intent into a recursively decomposed, interview-validated, traceable requirement tree. The tree must show why each requirement exists, which customer answer or assumption produced it, what parent goal it serves, how it will be validated, what remains unknown, and whether the next lifecycle node can proceed without guessing.

## Decomposition Levels

Use these levels unless a project-specific taxonomy is approved:

1. `L0 vision`: business goal, product outcome, or change objective.
2. `L1 capability`: major capability, user value stream, operational capability, or brownfield change area.
3. `L2 journey`: user journey, system workflow, operational workflow, or integration flow.
4. `L3 feature`: user-facing feature, service behavior, admin behavior, data behavior, or policy behavior.
5. `L4 rule`: business rule, domain invariant, data rule, event, error path, security rule, compliance rule, or operational rule.
6. `L5 acceptance leaf`: atomic requirement with acceptance criteria, validation method, evidence target, and trace links.

Stop decomposition only when the node is atomic enough to test or review directly. If one test cannot reasonably prove it, split it.

## Interview on Decomposition

For every material branch, run a branch interview:

1. Intent: what outcome does this branch serve?
2. Users and owners: who benefits, who operates it, who accepts it?
3. Behavior: what should happen, not happen, and fail gracefully?
4. Data and state: what entities, states, transitions, events, and retention rules matter?
5. NFRs: what performance, reliability, security, privacy, accessibility, audit, and support constraints apply?
6. Interfaces: what upstream, downstream, human, or operational dependencies exist?
7. Acceptance: how will this branch be proven with examples, tests, holdouts, transfer tests, review, or drill?
8. Exceptions: what edge, abuse, failure, and migration cases are in scope?
9. Contradictions: what conflicts with another answer, standard, owner decision, or existing system behavior?
10. Approval: what answer, assumption, waiver, or human decision lets this branch proceed?

Every material answer gets an `ANS-*` ID and links to one or more decomposition nodes.

## Completeness Checks

Each non-leaf node must have:

- at least one child,
- coverage rationale explaining why the child set is enough for now,
- explicit excluded or deferred children,
- branch completeness score,
- contradiction score,
- validation-readiness score,
- owner,
- re-interrogation trigger.

Each leaf node must have:

- one parent,
- source answer IDs or assumption IDs,
- owner,
- priority,
- requirement type,
- acceptance criteria,
- validation method,
- evidence target,
- dependencies or an explicit none marker,
- risks or an explicit none marker,
- trace links to requirements, tests, work ledger, control graph, and refinery gate.

## Scoring

Score each branch 0 to 4:

1. Parent intent preserved.
2. Children cover the parent without hiding major scope.
3. Leaves are atomic and testable.
4. Functional coverage is sufficient.
5. NFR/security/ops coverage is sufficient.
6. Data, state, and interface concerns are captured.
7. Edge, abuse, and failure cases are captured.
8. Dependencies and sequence are explicit.
9. Contradictions are resolved, deferred, or escalated.
10. Owners and acceptance authorities are clear.
11. Scenarios, holdouts, and transfer tests are identified.
12. Trace links are present in both directions.
13. Assumptions and waivers have owners and expiry/revalidation triggers.
14. Brownfield behavior, migration, and regression concerns are captured where relevant.
15. A fresh reviewer can continue without guessing.

Default pass: 90 percent for low-risk work, 96 percent for governed DFMS work, high-risk work, brownfield changes, or benchmark claims.

## Re-Decomposition Triggers

Split, re-interview, or escalate when:

- a parent has only one vague child,
- a leaf contains multiple verbs, actors, states, or acceptance paths,
- a leaf has no validation method,
- an NFR applies to multiple branches but has no explicit allocation,
- a customer answer maps to no requirement,
- a requirement maps to no answer, assumption, or standard,
- acceptance requires an unstated policy decision,
- a brownfield branch lacks current-behavior evidence,
- a dependency or interface is named but not owned,
- a reviewer cannot explain how the branch would be proven.

## Approval Mechanics

Before artifact expansion, record:

- decomposition tree version,
- score summary,
- unresolved branch questions,
- re-interrogation actions,
- explicit assumptions and waivers,
- accountable owner approval or conditional approval,
- trace evidence to requirements and validation artifacts.
