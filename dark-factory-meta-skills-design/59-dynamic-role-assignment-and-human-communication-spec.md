**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# Dynamic Role Assignment And Human Communication Spec

## Purpose

The transcript asks for elite role panels, hundreds of specialist critics, dynamic role assignment, and human-level communication patterns. This spec consolidates those requirements into one governance rule: roles are selected by task fit, not by a static generic trio.

## Dynamic Role Assignment Protocol

Every material node runs a role-selection preflight:

1. Identify artifact type, lifecycle stage, project domain, risk class, and surface type.
2. Load candidate expert roles from the role roster and artifact critic panel matrix.
3. Score each role against the task using role-specific criteria.
4. Select:
   - one accountable author role;
   - three specialist critic roles;
   - two adversarial critic roles;
   - one Hawkeye auditor when stage/process conformance matters;
   - one human owner or boundary approver when scope, risk, token budget, production, legal, security, privacy, or taste is material.
5. Record why each selected role is necessary and what it can veto.
6. Re-run role selection if the task decomposes into a different domain or risk class.

## Role Persona Contract

Each selected role must declare:

- seniority bar;
- domain expertise;
- decision rights;
- what it protects;
- what it can reject;
- required evidence for pass;
- common slop it detects;
- conflict partner it must challenge;
- handoff note for the next human or agent.

## Meta-Debate Gate

For high-risk artifacts or ambiguous role selection, DFMS must run a role meta-debate before the actual artifact debate.

| Meta-Debate Step | Output |
| --- | --- |
| Candidate proposal | each candidate explains why it is suitable |
| Peer review | candidates challenge each other's fit |
| Assignment decision | moderator selects panel and rationale |
| Bias/fairness check | fairness critic checks whether missing viewpoints could harm users, developers, or operators |
| Escalation | human owner decides if role conflict remains unresolved |

## Human Communication Patterns

Every governed run must support these patterns:

| Pattern | Required Record |
| --- | --- |
| Clarification | question, answer ID, assumption, and trace link |
| Async review | comment, classification, owner, response, incorporation evidence |
| Informal taste check | lightweight decision, confidence, scope, and revalidation trigger |
| Approval gate | exact ask, alternatives, recommendation, evidence, decision |
| Disagreement | options, affected artifacts, expert positions, owner decision, residual risk |
| Human takeover | paused node, files/artifacts touched, pending verification |
| Agent takeover | human changes, rationale, recon result, resumed node |
| Confidence framing | confidence level, uncertainty, missing evidence, next check |
| Production signoff | owner, rollback, observability, incident path, residual risk |
| Training and learning | drill, human performance, gaps, remediation |
| Predecessor recovery | recovered decisions, stale context, replay result |
| Retrospective feedback | lesson, root cause, skill/template/rubric update |

## Anti-Slop Rules

- Do not use "expert" as a generic label.
- Do not let reviewers pass artifacts outside their evidence basis.
- Do not let a role panel omit the user/operator/security/accessibility viewpoint when the artifact affects those concerns.
- Do not treat human silence as approval.
- Do not collapse disagreement into consensus without recording the tradeoff.
- Do not resume human-edited work without recon and re-verification.

## Acceptance Gate

A governed artifact or node cannot pass unless its review record includes:

- selected roles and selection rationale;
- role persona contracts;
- independent review;
- cross-critique;
- adversarial attacks;
- human communication record when human input occurred;
- fix evidence;
- residual risk decision.
