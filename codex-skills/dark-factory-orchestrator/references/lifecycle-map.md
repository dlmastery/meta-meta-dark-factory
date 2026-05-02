# Lifecycle Map

Each node must declare what, why, how, where, when, who, and how_good.

| Stage | Outputs | Experts |
| --- | --- | --- |
| Meta-attractor | Attractor Run Record, requirement field map, control graph seed, routing decision, waivers | system theorist, requirements/governance, verification critic |
| Intake | project profile, requirements, assumptions, scenarios | product, requirements, governance |
| Feasibility | options, risks, recommendation | domain, architect, delivery |
| Inception | charter, BRD, RASCI, tailoring matrix | product, governance, change |
| Elaboration | HLD, ADRs, NFRs, CIM/PIM, DDD map | architect, DDD, MDA |
| Planning | roadmap, sprint plan, dependency graph | delivery, test, SRE |
| Construction | code, tests, LLD, config, migrations | implementation, test, security |
| Verification | test reports, security report, quality certificates | test, security, governance |
| Transition | release notes, deployment guide, runbooks | SRE, release, product |
| Operation | observability, incident guide, support state | SRE, security, maintainer |
| Maintenance | impact analysis, change request, updated docs | maintainer, architect, test |
| Retrospective | lessons, updated templates, new scenarios | governance, quality, human owner |

Governed runs must keep the Attractor Run Record, control graph, work ledger, trace links, and refinery gate state current at every material stage, or record an explicit waiver with owner, rationale, expiry, and residual risk.
