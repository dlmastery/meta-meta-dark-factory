**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# TASKS

## Project Task Bead Operating Rules

- Every material task must have a bead before work starts.
- Every bead must name source, owner, state, control graph node, work-ledger item, knowledge-graph node, gate, evidence, and next bead or closure rationale.
- A bead cannot move to `accepted` without trace links, evidence, gate result, and next bead or closure rationale.
- A bead cannot move to `rework` without review findings and a patch bead.
- A bead cannot move to `blocked` without unblock owner, unblock action, and recheck date.
- Token-budget, scope, acceptance-criteria, or schedule drift creates a change-control bead.
- Templates are not proof. Instantiated evidence must be linked separately.

## Current Run

| Field | Value |
| --- | --- |
| Run ID | `RUN-000` |
| Attractor Run Record | `ATTR-000` |
| Control Graph | `CG-000` |
| Knowledge Graph | `KG-000` |
| Work Ledger | `WL-000` |
| Engagement Governance | `ENG-000` |
| Token Budget State | `pending` |
| Current Client Checkpoint | `pending` |

## Active Beads

| Bead ID | State | Objective | Owner | Control Node | Work Ledger | KG Node | Inputs | Outputs | Gate | Evidence | Next Bead | Token SWAG | Approval |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `TB-00000000-001` | `active` | Replace with current smallest governed action | Active owner | `CG-NODE-001` | `WL-001` | `KG:TB-00000000-001` | Source docs | Output artifact | `GATE-001` | `EVD-TBD` | `TB-00000000-002` | low/mid/high TBD | pending |

## Ready And Queued Beads

| Bead ID | State | Objective | Owner | Control Node | Work Ledger | KG Node | Inputs | Outputs | Gate | Evidence | Next Bead | Token SWAG | Approval |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `TB-00000000-002` | `queued` | Replace with next governed action | Active owner | `CG-NODE-002` | `WL-002` | `KG:TB-00000000-002` | `TB-00000000-001` | Output TBD | `GATE-002` | required TBD | TBD | low/mid/high TBD | pending |

## Blocked Beads

| Bead ID | State | Objective | Owner | Blocker | Unblock Owner | Unblock Action | Recheck Date | Evidence | Next Bead |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `TB-00000000-003` | `blocked` | Example blocked bead | Active owner | Missing approval | Client owner | Approve or reject checkpoint | YYYY-MM-DD | `EVD-TBD` | TBD |

## Review And Rework Beads

| Bead ID | State | Objective | Owner | Review Panel | Findings | Patch Bead | Gate | Evidence | Next Bead |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `TB-00000000-004` | `reviewing` | Example review bead | Reviewer owner | 3 primary + 2 adversarial critics | `FND-TBD` | `TB-00000000-005` | `GATE-004` | `EVD-TBD` | TBD |

## Accepted Beads

| Bead ID | State | Objective | Owner | Control Node | Work Ledger | KG Node | Outputs | Gate | Evidence | Next Bead | Closure Rationale |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `TB-00000000-000` | `accepted` | Example accepted predecessor | Active owner | `CG-NODE-000` | `WL-000` | `KG:TB-00000000-000` | Output path | `GATE-000:pass` | `EVD-000` | `TB-00000000-001` | Not closed; continues |

## Deferred And Retired Beads

| Bead ID | State | Objective | Owner | Rationale | Superseded By | Expiry | Revalidation Trigger | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `TB-00000000-006` | `deferred` | Example deferred bead | Owner | Out of current scope | TBD | YYYY-MM-DD | Scope reopens | `DEC-TBD` |

## Bead Detail Records

### `TB-00000000-001`

- Objective:
- Scope boundary:
- Source intent:
- Requirement links:
- Interrogation answer links:
- Control graph node:
- Work-ledger item:
- Knowledge-graph node:
- Inputs:
- Outputs:
- Acceptance gate:
- Evidence required:
- Evidence provided:
- Primary critics:
- Adversarial critics:
- RALPH loops:
- Token SWAG:
- Approval state:
- Next bead:
- Re-entry trigger:
- Residual risk:

## Open Approvals

| Approval ID | Bead ID | Approver | Decision Needed | Token/Scope Impact | Due | State |
| --- | --- | --- | --- | --- | --- | --- |
| `APP-000` | `TB-00000000-001` | Client owner | Approve checkpoint | TBD | YYYY-MM-DD | pending |

## Token-Budget Checkpoint Log

| Checkpoint | Bead ID | Low | Mid | High | Assumptions | Approval | Reapproval Trigger |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `CHK-000` | `TB-00000000-001` | TBD | TBD | TBD | TBD | pending | Scope or evidence changes |

## Validator And Evidence Log

| Run | Tool | Target | Result | Evidence | Follow-Up |
| --- | --- | --- | --- | --- | --- |
| `VAL-000` | `validate_tasks_md.py` | `TASKS.md` | pending | TBD | TBD |

## Change Log

| Date | Actor | Bead ID | Change | Rationale | Evidence |
| --- | --- | --- | --- | --- | --- |
| YYYY-MM-DD | Actor | `TB-00000000-001` | Created bead | Initial run setup | `EVD-TBD` |
