**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# Production-Scale Complex Product Simulation Spec

## Purpose

The todo/habits app is useful as an understandable example, but the transcript vision is about serious software delivery. DFMS needs a complex-product simulation that proves the factory does not collapse when backend, API, data, security, UI, operations, and maintenance are all in scope.

## Simulation Archetype

Project: Enterprise Access Review And Evidence Portal.

Why this archetype:

- It resembles security/compliance business software.
- It requires workflow, roles, audit, data, UI, API, and operations.
- It is complex enough to exercise outsourcing-grade artifacts without requiring real sensitive data.

## Required Surfaces

| Surface | Required Evidence |
| --- | --- |
| UI | Material-style dashboard, review queue, evidence drilldown, admin policy editor, responsive/browser tests |
| API | OpenAPI or equivalent contract, auth behavior, error cases, integration tests |
| Data | schema, migrations, seed data, privacy classification, retention, audit log |
| Workflow | assignment, approval, escalation, SLA, reminders, status transitions |
| Security | threat model, abuse cases, permission matrix, secrets handling, vulnerability scan |
| Operations | deployment guide, rollback, observability, alerts, incident guide, outage drill |
| Maintenance | brownfield change simulation, regression evidence, handoff replay |

## Full SDLC Gate Set

The simulation must produce:

1. Attractor Run Record.
2. Engagement governance and token budget.
3. Customer interrogation with answer IDs.
4. Recursive spec decomposition.
5. Standards tailoring matrix.
6. Atomic artifact BOM selection.
7. BRD/SRS/NFR/scenario suite.
8. MDA CIM/PIM/PSM records where useful.
9. DDD bounded context map.
10. Architecture alternatives and ADRs.
11. PERT/work-ledger plan.
12. Implementation plan.
13. Code and migration evidence.
14. Unit, integration, contract, scenario, holdout, transfer, browser, accessibility, security, and performance evidence.
15. Digital-twin-style substitute for external identity providers and notification systems.
16. Quality refinery with artifact-specific critics and adversarial reviewers.
17. Release package.
18. Production/SRE handoff package.
19. Human training and outage drill.
20. Dashboard-control index and redo impact test.
21. Context recovery/replay drill.
22. Retrospective and skill-learning update.

## Holdout And Transfer Requirements

Holdout scenarios must be created after the visible scenarios and kept separate from implementation prompts.

Transfer tests must include at least:

- a different domain vocabulary;
- a different permission model;
- a different UI workflow;
- a different integration failure mode;
- a different production incident.

## Pass Criteria

The simulation passes only when:

- no required SDLC stage is skipped;
- every accepted requirement links to implementation and test evidence;
- UI evidence includes desktop and mobile browser screenshots plus interaction checks;
- API evidence includes negative and permission cases;
- data evidence includes migration rollback;
- security evidence has no unresolved critical/high issues;
- production evidence includes rollback and outage drill;
- handoff replay proves a fresh human or agent can continue from the project book;
- dashboard redo closure identifies downstream impacts for a changed requirement.

## Boundary

This is the next serious demonstration target. The existing todo/habits app remains a bounded, understandable example and cannot alone certify enterprise-scale readiness.
