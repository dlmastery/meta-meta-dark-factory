**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# Not-Applicable Waiver Register

## Purpose

This register is the single human-readable waiver artifact for catalog items that do not apply to the Northstar Daily local-static demonstrator. The waiver is narrow: it does not retire the artifact from DFMS, and it does not apply to any hosted, multi-user, synced, regulated, mobile-packaged, or externally certified version.

## Waiver Standard

An artifact can remain not applicable only when all of these are true:

- the current product has no runtime surface that would exercise the artifact;
- the absence is visible in the artifact coverage matrix;
- a future scope trigger is named;
- the residual risk is accepted for the local-static demonstrator only;
- Hawkeye or a human owner can reopen the artifact when the trigger occurs.

## Waived Catalog Items

| ID | Artifact | Basis | Waiver Rationale | Reopen Trigger |
| --- | --- | --- | --- | --- |
| ARC-004 | Interface/API Specification | ISO, OpenAPI/gRPC/etc. as applicable | Approved not-applicable waiver for the local-static demonstrator boundary. The demonstrator has no backend, API, hosted service, production deployment, or external integration surface. | Any API, sync, plugin, MCP tool, or external integration is added. |
| ARC-007 | Observability Design | SRE | Approved not-applicable waiver for the local-static demonstrator boundary. The demonstrator has no backend, API, hosted service, production deployment, or external integration surface. | Any hosted runtime, telemetry, monitoring, or production reliability target is added. |
| DDD-003 | Anti-Corruption Layer Plan | DDD integration | Approved not-applicable waiver for the local-static demonstrator boundary. The demonstrator has no backend, API, hosted service, production deployment, or external integration surface. | Any external system, imported data source, provider API, or legacy integration enters scope. |
| IMP-005 | Migration and Backout Plan | Release/SRE | Approved not-applicable waiver for the local-static demonstrator boundary. The demonstrator has no backend, API, hosted service, production deployment, or external integration surface. | Any persistent schema migration, cloud storage, or release rollback path enters scope. |
| REL-001 | Release Plan | RUP transition, DevOps | Approved not-applicable waiver for the local-static demonstrator boundary. The demonstrator has no backend, API, hosted service, production deployment, or external integration surface. | Any public release, hosted release, app-store distribution, or customer rollout is planned. |
| REL-003 | Deployment Guide | SRE/operations | Approved not-applicable waiver for the local-static demonstrator boundary. The demonstrator has no backend, API, hosted service, production deployment, or external integration surface. | Any deploy target beyond file-open local use is planned. |
| REL-005 | Incident Response Guide | SRE/security | Approved not-applicable waiver for the local-static demonstrator boundary. The demonstrator has no backend, API, hosted service, production deployment, or external integration surface. | Any hosted service, support obligation, or production incident class enters scope. |
| REL-008 | Outage Drill and Operator Readiness Record | SRE human-owned operations | Approved not-applicable waiver for the local-static demonstrator boundary. The demonstrator has no backend, API, hosted service, production deployment, or external integration surface. | Any operator-owned hosted service or production outage mode enters scope. |

## Residual Risk Acceptance

- Accepted boundary: local-static browser demonstrator used for dark-factory training and evidence inspection.
- Not accepted for: production operation, external certification, legal compliance, regulated data, multi-user collaboration, cloud sync, or hosted reliability claims.
- Owner: human product owner retains approval rights for changing this boundary.
- Expiry: any reopen trigger above expires the waiver immediately.

## Hawkeye Check

Hawkeye must veto any future pass/certificate/closure claim that silently carries these waivers into a product boundary where they no longer apply.
