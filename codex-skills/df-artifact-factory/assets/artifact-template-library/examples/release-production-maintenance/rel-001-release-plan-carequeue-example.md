> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# REL-001 Release Plan Worked Example

Status: fictional training example, not project evidence.

Project: CareQueue Pro.

Release: Pilot Release 0.3.

Scenario: a fictional multi-tenant care-coordination platform for outpatient clinics that manages referral intake, waitlist triage, SMS reminders, escalation tasks, and clinic operations dashboards.

## Example Context

Northstar Clinics pilot network wants a controlled pilot for referral intake, nurse review queue, patient reminder workflow, and operations dashboard for three clinics. The project handles handles PHI-like sensitive health data, clinic staffing decisions, external SMS delivery, and future EHR integration. This example shows the level of specificity expected when instantiating `Release Plan`.

## Example Standards Basis

Catalog basis: RUP transition, DevOps.

Methods/practices used:

- RUP transition discipline
- SRE production readiness
- incident management and maintenance practice
- human-owned operations handoff

## Example Artifact Summary

The `Release Plan` for CareQueue Pro records how the pilot will treat release scope, go/no-go, deployment sequence. It is linked to `INT-ANS-014 -> REQ-032 -> ARC-API-006 -> TST-ACPT-019 -> REL-GO-004` and remains non-authoritative until the real customer approves the project-specific version.

## Example Content Entries

| Field | Example value |
| --- | --- |
| Control graph node | CG-CQ-PILOT-REQ-03 |
| Work ledger item | WL-CQ-REL-001-001 |
| Accountable owner | Maya Patel, fictional clinic operations sponsor |
| Delivery owner | DFMS delivery lead |
| Review panel | Release Manager, SRE Lead, Product Owner mapped to artifact-specific critic seats |
| Primary evidence | interview notes, trace matrix, acceptance tests, review panel, refinery gate |
| Residual risk | PHI-like data handling and SMS delivery require security and operator readiness checks |

## Example Focus Details

- release scope: example value recorded for the CareQueue pilot with owner, trace, evidence, and revalidation trigger.
- go/no-go: example value recorded for the CareQueue pilot with owner, trace, evidence, and revalidation trigger.
- deployment sequence: example value recorded for the CareQueue pilot with owner, trace, evidence, and revalidation trigger.
- rollback: example value recorded for the CareQueue pilot with owner, trace, evidence, and revalidation trigger.
- communication: example value recorded for the CareQueue pilot with owner, trace, evidence, and revalidation trigger.

## Example Trace Slice

| Source | Requirement | Artifact element | Evidence | Status |
| --- | --- | --- | --- | --- |
| INT-ANS-014 | REQ-032 | release scope | TST-ACPT-019 | example only |
| INT-ANS-021 | NFR-SEC-004 | go/no-go | SEC-REV-006 | example only |
| DEC-CQ-003 | ARC-ADR-002 | deployment sequence | REV-REL-001-001 | example only |

## Example Review Notes

- Content authority critic asks whether `release scope` is specific enough to guide downstream work.
- Governance and trace critic asks whether all example claims trace to answer IDs or approved assumptions.
- Verification and handoff critic asks whether a new human can verify this artifact without the original author.

## Example Warning

Do not copy this example into a real project as evidence. Replace it with real source intent, real decisions, real tests, real reviews, and real approvals.
