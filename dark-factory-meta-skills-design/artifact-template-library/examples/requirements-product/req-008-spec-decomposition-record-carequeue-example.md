> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# REQ-008 Spec Decomposition Record Worked Example

Status: fictional training example, not project evidence.

Project: CareQueue Pro.

Release: Pilot Release 0.3.

Scenario: a fictional multi-tenant care-coordination platform for outpatient clinics that manages referral intake, waitlist triage, SMS reminders, escalation tasks, and clinic operations dashboards.

## Example Context

Northstar Clinics pilot network wants a controlled pilot for referral intake, nurse review queue, patient reminder workflow, and operations dashboard for three clinics. The project handles handles PHI-like sensitive health data, clinic staffing decisions, external SMS delivery, and future EHR integration. This example shows the level of specificity expected when instantiating `Spec Decomposition Record`.

## Example Standards Basis

Catalog basis: ISO/IEC/IEEE 29148, RUP use-case decomposition, Agile story slicing, DDD domain decomposition.

Methods/practices used:

- SWEBOK requirements knowledge area
- ISO/IEC/IEEE 29148 requirements engineering
- RUP requirements discipline
- BDD/TDD acceptance modeling

## Example Artifact Summary

The `Spec Decomposition Record` for CareQueue Pro records how the pilot will treat decomposition tree, parent-child coverage, atomic leaves. It is linked to `INT-ANS-014 -> REQ-032 -> ARC-API-006 -> TST-ACPT-019 -> REL-GO-004` and remains non-authoritative until the real customer approves the project-specific version.

## Example Content Entries

| Field | Example value |
| --- | --- |
| Control graph node | CG-CQ-PILOT-REQ-03 |
| Work ledger item | WL-CQ-REQ-008-001 |
| Accountable owner | Maya Patel, fictional clinic operations sponsor |
| Delivery owner | DFMS delivery lead |
| Review panel | Requirements Decomposition Lead, Product Owner, Verification Lead mapped to artifact-specific critic seats |
| Primary evidence | interview notes, trace matrix, acceptance tests, review panel, refinery gate |
| Residual risk | PHI-like data handling and SMS delivery require security and operator readiness checks |

## Example Focus Details

- decomposition tree: example value recorded for the CareQueue pilot with owner, trace, evidence, and revalidation trigger.
- parent-child coverage: example value recorded for the CareQueue pilot with owner, trace, evidence, and revalidation trigger.
- atomic leaves: example value recorded for the CareQueue pilot with owner, trace, evidence, and revalidation trigger.
- completeness score: example value recorded for the CareQueue pilot with owner, trace, evidence, and revalidation trigger.
- leaf acceptance tests: example value recorded for the CareQueue pilot with owner, trace, evidence, and revalidation trigger.

## Example Trace Slice

| Source | Requirement | Artifact element | Evidence | Status |
| --- | --- | --- | --- | --- |
| INT-ANS-014 | REQ-032 | decomposition tree | TST-ACPT-019 | example only |
| INT-ANS-021 | NFR-SEC-004 | parent-child coverage | SEC-REV-006 | example only |
| DEC-CQ-003 | ARC-ADR-002 | atomic leaves | REV-REQ-008-001 | example only |

## Example Review Notes

- Content authority critic asks whether `decomposition tree` is specific enough to guide downstream work.
- Governance and trace critic asks whether all example claims trace to answer IDs or approved assumptions.
- Verification and handoff critic asks whether a new human can verify this artifact without the original author.

## Example Warning

Do not copy this example into a real project as evidence. Replace it with real source intent, real decisions, real tests, real reviews, and real approvals.
