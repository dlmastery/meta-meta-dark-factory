> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# ARC-005 Data Model and Migration Plan Worked Example

Status: fictional training example, not project evidence.

Project: CareQueue Pro.

Release: Pilot Release 0.3.

Scenario: a fictional multi-tenant care-coordination platform for outpatient clinics that manages referral intake, waitlist triage, SMS reminders, escalation tasks, and clinic operations dashboards.

## Example Context

Northstar Clinics pilot network wants a controlled pilot for referral intake, nurse review queue, patient reminder workflow, and operations dashboard for three clinics. The project handles handles PHI-like sensitive health data, clinic staffing decisions, external SMS delivery, and future EHR integration. This example shows the level of specificity expected when instantiating `Data Model and Migration Plan`.

## Example Standards Basis

Catalog basis: DDD/data architecture.

Methods/practices used:

- SWEBOK architecture and design knowledge areas
- RUP analysis and design discipline
- secure-by-design practice
- SRE operability design

## Example Artifact Summary

The `Data Model and Migration Plan` for CareQueue Pro records how the pilot will treat entities, relationships, migration steps. It is linked to `INT-ANS-014 -> REQ-032 -> ARC-API-006 -> TST-ACPT-019 -> REL-GO-004` and remains non-authoritative until the real customer approves the project-specific version.

## Example Content Entries

| Field | Example value |
| --- | --- |
| Control graph node | CG-CQ-PILOT-REQ-03 |
| Work ledger item | WL-CQ-ARC-005-001 |
| Accountable owner | Maya Patel, fictional clinic operations sponsor |
| Delivery owner | DFMS delivery lead |
| Review panel | Data Architect, Security Engineer, SRE Lead mapped to artifact-specific critic seats |
| Primary evidence | interview notes, trace matrix, acceptance tests, review panel, refinery gate |
| Residual risk | PHI-like data handling and SMS delivery require security and operator readiness checks |

## Example Focus Details

- entities: example value recorded for the CareQueue pilot with owner, trace, evidence, and revalidation trigger.
- relationships: example value recorded for the CareQueue pilot with owner, trace, evidence, and revalidation trigger.
- migration steps: example value recorded for the CareQueue pilot with owner, trace, evidence, and revalidation trigger.
- privacy handling: example value recorded for the CareQueue pilot with owner, trace, evidence, and revalidation trigger.
- reconciliation checks: example value recorded for the CareQueue pilot with owner, trace, evidence, and revalidation trigger.

## Example Trace Slice

| Source | Requirement | Artifact element | Evidence | Status |
| --- | --- | --- | --- | --- |
| INT-ANS-014 | REQ-032 | entities | TST-ACPT-019 | example only |
| INT-ANS-021 | NFR-SEC-004 | relationships | SEC-REV-006 | example only |
| DEC-CQ-003 | ARC-ADR-002 | migration steps | REV-ARC-005-001 | example only |

## Example Review Notes

- Content authority critic asks whether `entities` is specific enough to guide downstream work.
- Governance and trace critic asks whether all example claims trace to answer IDs or approved assumptions.
- Verification and handoff critic asks whether a new human can verify this artifact without the original author.

## Example Warning

Do not copy this example into a real project as evidence. Replace it with real source intent, real decisions, real tests, real reviews, and real approvals.
