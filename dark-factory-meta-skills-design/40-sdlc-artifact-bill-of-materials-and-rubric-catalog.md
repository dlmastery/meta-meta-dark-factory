> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# 40. SDLC Artifact Bill Of Materials And Rubric Catalog

Status: generated from the governed DFMS artifact catalog and artifact-specific rubric library.

Purpose: provide a construction-grade artifact bill of materials for DFMS software delivery. This is the software equivalent of a house construction package: owner brief, permits, drawings, engineering calculations, trade coordination, inspections, commissioning, handover binder, and warranty records.

## Counts

- Governed artifact types: 63
- Artifact-level rubrics per artifact: 15
- Total artifact-level rubric checks in this BOM: 945
- Primary critic seats per artifact: 3
- Primary critic seats total: 189
- Required adversarial critics per artifact: at least 2
- Required RALPH loops per artifact: at least 5

## Construction Analogy

| DFMS Stage | House Construction Analogy | Artifact Families |
| --- | --- | --- |
| Preconstruction Governance | Owner brief, permits, code matrix, contracting, risk, responsibilities, and site control plan. | `GOV` |
| Programming and Requirements | Architectural programming: room schedule, user needs, constraints, acceptance criteria, and owner signoff. | `REQ` |
| Design Development and Engineering | Architectural/structural/MEP drawings, design calculations, interfaces, and safety engineering. | `ARC` |
| Model and Blueprint Transformation | Concept drawings to engineering drawings to construction documents, with transformation control. | `MDA` |
| Domain Blueprint Coordination | Trade-specific coordination drawings, boundaries, terminology, and integration details. | `DDD` |
| Construction Execution Package | Work packages, materials, build configuration, site execution, migration, and backout. | `IMP` |
| Inspection and Commissioning | Inspections, test reports, punch-list validation, commissioning, and certificate evidence. | `VNV` |
| Handover, Operations, and Maintenance | Owner handover binder, operating manuals, training, incident procedures, and maintenance plan. | `REL` |
| Inspection Records and Warranty Binder | Trace records, certificates, provenance, residual risk signoff, and lessons learned. | `EVD` |

## Artifact BOM Register

| ID | Artifact | DFMS Stage | Construction Analog | Required Links | Review Hint |
| --- | --- | --- | --- | --- | --- |
| GOV-001 | Project Charter | Preconstruction Governance | Owner project brief and construction charter | Stakeholders, objectives, scope, constraints | Product Expert, Governance Auditor, Delivery Manager |
| GOV-002 | Standards Tailoring Matrix | Preconstruction Governance | Building code and permit applicability matrix | Standards clauses, included/excluded artifacts, rationale | Governance Auditor, Quality Lead, Human Owner |
| GOV-003 | RASCI Matrix | Preconstruction Governance | General contractor / architect / engineer responsibility matrix | Roles, stages, approval authority | Governance Auditor, Delivery Manager, Human Owner |
| GOV-004 | Risk Register | Preconstruction Governance | Site risk, safety, and contingency register | Requirements, decisions, tests, owners | Delivery Manager, Security Engineer, System Architect |
| GOV-005 | Change Management Plan | Preconstruction Governance | Change order and variation control plan | Change requests, sprints, releases, approvals | Change Manager, Governance Auditor, Product Owner |
| GOV-006 | Quality Management Plan | Preconstruction Governance | Quality inspection and acceptance plan | Rubrics, thresholds, evidence types | Quality Lead, Governance Auditor, Test Lead |
| GOV-007 | AI Governance Plan | Preconstruction Governance | Automated equipment / smart-building governance plan | Agent roles, model use, review gates, monitoring | AI Governance Auditor, Security Engineer, Human Owner |
| GOV-008 | DFMS Control Graph | Preconstruction Governance | Master construction sequence and inspection gate plan | Lifecycle nodes, gates, child skills, human decisions, evidence outputs | Governance Auditor, Delivery Manager, Quality Lead |
| GOV-009 | Work Ledger Schema | Preconstruction Governance | Site work ledger and daily log schema | Requirements, artifacts, tasks, risks, decisions, owners, status | Delivery Manager, Traceability Lead, Maintainer |
| GOV-010 | Attractor Run Record | Preconstruction Governance | Preconstruction feasibility and routing record | Requirement field, routing, stable state, waivers, next safe action | System Theorist, Governance Architect, Verification Critic |
| GOV-011 | Methodology Blend Record | Preconstruction Governance | Integrated delivery method plan | Included methods, graph nodes, ledger items, gates, evidence | Methodology Architect, Governance Auditor, Quality Lead |
| REQ-001 | Business Requirements Document | Programming and Requirements | Owner requirements and building program | Stakeholders, capabilities, business outcomes | Product Expert, Domain Expert, Requirements Lead |
| REQ-002 | Software Requirements Specification | Programming and Requirements | Detailed room/function/performance specification | Functional/NFR requirements, tests, design | Requirements Lead, Test Lead, Governance Auditor |
| REQ-003 | Non-Functional Requirements Catalog | Programming and Requirements | Performance criteria schedule: load, fire, acoustic, HVAC, safety | SLIs/SLOs, threat model, tests, operations | SRE Lead, Security Engineer, System Architect |
| REQ-004 | Acceptance Criteria and Scenarios | Programming and Requirements | Acceptance walk-through scenarios and punch-list criteria | Requirements, tests, holdouts, user journeys | Product Expert, QA Lead, Domain Expert |
| REQ-005 | Glossary and Ubiquitous Language | Programming and Requirements | Project glossary and drawing legend | Domain terms, bounded contexts, APIs | Domain Expert, DDD Critic, Requirements Lead |
| REQ-006 | Assumption and Constraint Log | Programming and Requirements | Assumption, constraint, and site condition log | Decisions, risks, open questions | Requirements Lead, Delivery Manager, Human Owner |
| REQ-007 | Interrogation Record | Programming and Requirements | Owner/stakeholder interview and signoff record | Rounds, answer IDs, contradiction scoring, approval mechanics | Requirements Lead, Product Owner, Governance Auditor |
| REQ-008 | Spec Decomposition Record | Programming and Requirements | Work breakdown / room-by-room decomposition record | Requirement tree, branch interviews, completeness scores, leaf acceptance criteria, trace links, re-interrogation triggers | Requirements Decomposition Lead, Product Owner, Verification Lead |
| ARC-001 | High-Level Design | Design Development and Engineering | Architectural design development package | Requirements, NFRs, ADRs, risks | System Architect, SRE Lead, Security Engineer |
| ARC-002 | Low-Level Design | Design Development and Engineering | Detailed construction drawings and shop drawing basis | Components, APIs, data model, tests | System Architect, Implementation Lead, Test Lead |
| ARC-003 | Architecture Decision Records | Design Development and Engineering | Design decision log and engineering rationale | Alternatives, chosen design, consequences | System Architect, DDD Critic, Governance Auditor |
| ARC-004 | Interface/API Specification | Design Development and Engineering | Interface specification between trades and systems | Requirements, consumers, tests | System Architect, Test Lead, Security Engineer |
| ARC-005 | Data Model and Migration Plan | Design Development and Engineering | Site utility/data model and phased migration plan | Entities, stores, privacy, migrations | Data Architect, Security Engineer, SRE Lead |
| ARC-006 | Threat Model | Design Development and Engineering | Life-safety, security, and hazard analysis | Assets, abuse cases, mitigations, tests | Security Engineer, System Architect, Test Lead |
| ARC-007 | Observability Design | Design Development and Engineering | Building monitoring, alarms, and observability plan | SLIs, logs, metrics, traces, alerts | SRE Lead, System Architect, Test Lead |
| MDA-001 | Computation-Independent Model | Model and Blueprint Transformation | Conceptual massing and owner-use model | Business process, domain goals, glossary | MDA Architect, Domain Expert, Product Expert |
| MDA-002 | Platform-Independent Model | Model and Blueprint Transformation | Technology-neutral engineering model | CIM elements, domain model, interfaces | MDA Architect, System Architect, DDD Critic |
| MDA-003 | Platform-Specific Model | Model and Blueprint Transformation | Construction-ready platform/material model | PIM mappings, stack choices, code modules | MDA Architect, Implementation Lead, SRE Lead |
| MDA-004 | Model Transformation Record | Model and Blueprint Transformation | Concept-to-engineering-to-construction transformation log | CIM->PIM->PSM mappings and exceptions | MDA Architect, Governance Auditor, Test Lead |
| DDD-001 | Bounded Context Map | Domain Blueprint Coordination | Trade boundary and coordination map | Glossary, aggregates, services, integrations | DDD Critic, System Architect, Domain Expert |
| DDD-002 | Aggregate and Invariant Catalog | Domain Blueprint Coordination | Structural/detail invariant and tolerance catalog | Business rules, tests, code | DDD Critic, Test Lead, Implementation Lead |
| DDD-003 | Anti-Corruption Layer Plan | Domain Blueprint Coordination | Interface isolation plan for external/legacy systems | External systems, adapters, contracts | DDD Critic, Security Engineer, System Architect |
| IMP-001 | Implementation Plan | Construction Execution Package | Construction execution plan | Requirements, components, tasks | Implementation Lead, Delivery Manager, Test Lead |
| IMP-002 | Code Change Set | Construction Execution Package | Installed work package / change set | Requirements, designs, tests, reviews | Implementation Lead, Test Lead, Security Engineer |
| IMP-003 | Build and Dependency Manifest | Construction Execution Package | Materials, suppliers, and build manifest | SBOM, lockfiles, build logs | Security Engineer, SRE Lead, Implementation Lead |
| IMP-004 | Configuration and Environment Spec | Construction Execution Package | Temporary works, site environment, and configuration spec | Deploy targets, secrets policy, config tests | SRE Lead, Security Engineer, Implementation Lead |
| IMP-005 | Migration and Backout Plan | Construction Execution Package | Cutover, migration, and backout plan | Data model, deployment, rollback | Data Architect, SRE Lead, Test Lead |
| VNV-001 | Master Test Strategy | Inspection and Commissioning | Master inspection and commissioning strategy | Requirements, risks, coverage targets | Test Lead, Product Expert, Security Engineer |
| VNV-002 | Test Cases and Procedures | Inspection and Commissioning | Inspection checklists and test procedures | Requirements, code paths, scenarios | Test Lead, Domain Expert, Implementation Lead |
| VNV-003 | Automated Test Evidence | Inspection and Commissioning | Inspection/test evidence and signoff package | Test cases, code, build results | Test Lead, Implementation Lead, Quality Lead |
| VNV-004 | Holdout Scenario Report | Inspection and Commissioning | Independent holdout inspection scenario report | Acceptance criteria, runtime logs, scores | QA Lead, Product Expert, Governance Auditor |
| VNV-005 | Security Test Report | Inspection and Commissioning | Security and life-safety test report | Threats, findings, mitigations | Security Engineer, Test Lead, Governance Auditor |
| VNV-006 | Performance/Reliability Report | Inspection and Commissioning | Load, reliability, and performance commissioning report | NFRs, SLIs, capacity assumptions | SRE Lead, Test Lead, System Architect |
| VNV-007 | Accessibility/UX Validation | Inspection and Commissioning | Accessibility and usability inspection report | User journeys, acceptance criteria | UX Expert, Product Expert, Test Lead |
| REL-001 | Release Plan | Handover, Operations, and Maintenance | Move-in / occupancy release plan | Change set, risks, deployment steps | Release Manager, SRE Lead, Product Owner |
| REL-002 | Release Notes | Handover, Operations, and Maintenance | Owner release notes and known-issue bulletin | Features, fixes, risks, known issues | Product Expert, Release Manager, Support Lead |
| REL-003 | Deployment Guide | Handover, Operations, and Maintenance | Deployment / installation guide | Environments, config, rollback | SRE Lead, Security Engineer, Release Manager |
| REL-004 | Operations Runbook | Handover, Operations, and Maintenance | Operations and facilities runbook | Alerts, dashboards, procedures, owners | SRE Lead, Support Lead, Security Engineer |
| REL-005 | Incident Response Guide | Handover, Operations, and Maintenance | Emergency response and incident guide | Failure modes, rollback, escalation | SRE Lead, Security Engineer, Human Owner |
| REL-006 | Maintenance Guide | Handover, Operations, and Maintenance | Maintenance and repair manual | Code map, common changes, tests | Brownfield Maintainer, Implementation Lead, SRE Lead |
| REL-007 | Human Training Package | Handover, Operations, and Maintenance | Owner/operator training package | Project book, runbooks, walkthroughs | Human Owner, Support Lead, Product Expert |
| REL-008 | Outage Drill and Operator Readiness Record | Handover, Operations, and Maintenance | Emergency drill and operator readiness record | Scenario, runbook replay, diagnosis, mitigation, operator signoff | SRE Lead, Human Owner, Support Lead |
| EVD-001 | Bidirectional Traceability Matrix | Inspection Records and Warranty Binder | As-built traceability matrix | Requirements, design, code, tests, operations | Governance Auditor, Requirements Lead, Test Lead |
| EVD-002 | Expert Debate Record | Inspection Records and Warranty Binder | Design review and coordination meeting record | Proposals, critiques, votes, decision | Moderator, Governance Auditor, Human Owner |
| EVD-003 | Rubric Scorecard | Inspection Records and Warranty Binder | Inspection scorecard | Artifact, reviewers, scores, failures | Quality Lead, Governance Auditor, Selected Experts |
| EVD-004 | Quality Certificate | Inspection Records and Warranty Binder | Certificate of quality / acceptance | Artifact, evidence, thresholds, residual risk | Quality Lead, Governance Auditor, Human Owner |
| EVD-005 | Provenance Record | Inspection Records and Warranty Binder | Material provenance and chain-of-custody record | Hashes, commits, logs, prompts if allowed | Governance Auditor, Security Engineer, Release Manager |
| EVD-006 | Residual Risk Acceptance | Inspection Records and Warranty Binder | Residual risk / exception acceptance | Risks, owner, expiration, mitigation | Human Owner, Security Engineer, Delivery Manager |
| EVD-007 | Refinery Gate Record | Inspection Records and Warranty Binder | Inspection gate record | Tests, traceability, rubrics, security, operations, residual risk | Quality Lead, Test Lead, Governance Auditor |
| EVD-008 | Human Communication Record | Inspection Records and Warranty Binder | Owner communication and signoff record | Async comments, confidence framing, taste gates, approval, incorporation evidence | Human Owner, Delivery Manager, Quality Lead |
| EVD-009 | Context Pack and Predecessor Recovery Record | Inspection Records and Warranty Binder | Handover binder and predecessor recovery record | Current node, recovered decisions, drift, replay evidence, next action | Maintainer, Governance Auditor, Human Owner |
| EVD-010 | Retrospective Learning Record | Inspection Records and Warranty Binder | Post-project lessons learned and warranty learning record | Friction, failures, lessons, template/rubric/skill updates | Feedback Lead, Governance Auditor, Human Owner |

## Per-Artifact 15-Point Quality Rubrics


## Preconstruction Governance

### GOV-001 Project Charter

- **Construction analog:** Owner project brief and construction charter
- **Basis:** RUP inception, ISO agreement/project planning
- **Required links:** Stakeholders, objectives, scope, constraints
- **Reviewer hint:** Product Expert, Governance Auditor, Delivery Manager
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Project Charter declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Project Charter ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Project Charter defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: business case boundaries | Project Charter addresses `business case boundaries` with enough specificity to guide downstream work, review, and verification. | section covering business case boundaries; owner or accountable role; linked evidence | business case boundaries is generic; business case boundaries lacks evidence; business case boundaries lacks owner |
| 5 | Artifact-specific focus: stakeholder map | Project Charter addresses `stakeholder map` with enough specificity to guide downstream work, review, and verification. | section covering stakeholder map; owner or accountable role; linked evidence | stakeholder map is generic; stakeholder map lacks evidence; stakeholder map lacks owner |
| 6 | Artifact-specific focus: success measures | Project Charter addresses `success measures` with enough specificity to guide downstream work, review, and verification. | section covering success measures; owner or accountable role; linked evidence | success measures is generic; success measures lacks evidence; success measures lacks owner |
| 7 | Artifact-specific focus: scope exclusions | Project Charter addresses `scope exclusions` with enough specificity to guide downstream work, review, and verification. | section covering scope exclusions; owner or accountable role; linked evidence | scope exclusions is generic; scope exclusions lacks evidence; scope exclusions lacks owner |
| 8 | Artifact-specific focus: project viability decision | Project Charter addresses `project viability decision` with enough specificity to guide downstream work, review, and verification. | section covering project viability decision; owner or accountable role; linked evidence | project viability decision is generic; project viability decision lacks evidence; project viability decision lacks owner |
| 9 | Family theme coverage: human-agent accountability | Project Charter handles `human-agent accountability` according to its artifact family obligations. | human-agent accountability section; trace link; review evidence | human-agent accountability omitted; human-agent accountability not traceable; human-agent accountability not reviewable |
| 10 | Standards and method mapping | Project Charter maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Project Charter supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Project Charter records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Project Charter records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Project Charter defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Project Charter has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### GOV-002 Standards Tailoring Matrix

- **Construction analog:** Building code and permit applicability matrix
- **Basis:** ISO 12207, ISO 15289, company process
- **Required links:** Standards clauses, included/excluded artifacts, rationale
- **Reviewer hint:** Governance Auditor, Quality Lead, Human Owner
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Standards Tailoring Matrix declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Standards Tailoring Matrix ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Standards Tailoring Matrix defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: included standards | Standards Tailoring Matrix addresses `included standards` with enough specificity to guide downstream work, review, and verification. | section covering included standards; owner or accountable role; linked evidence | included standards is generic; included standards lacks evidence; included standards lacks owner |
| 5 | Artifact-specific focus: excluded standards | Standards Tailoring Matrix addresses `excluded standards` with enough specificity to guide downstream work, review, and verification. | section covering excluded standards; owner or accountable role; linked evidence | excluded standards is generic; excluded standards lacks evidence; excluded standards lacks owner |
| 6 | Artifact-specific focus: tailoring rationale | Standards Tailoring Matrix addresses `tailoring rationale` with enough specificity to guide downstream work, review, and verification. | section covering tailoring rationale; owner or accountable role; linked evidence | tailoring rationale is generic; tailoring rationale lacks evidence; tailoring rationale lacks owner |
| 7 | Artifact-specific focus: information-item mapping | Standards Tailoring Matrix addresses `information-item mapping` with enough specificity to guide downstream work, review, and verification. | section covering information-item mapping; owner or accountable role; linked evidence | information-item mapping is generic; information-item mapping lacks evidence; information-item mapping lacks owner |
| 8 | Artifact-specific focus: waiver policy | Standards Tailoring Matrix addresses `waiver policy` with enough specificity to guide downstream work, review, and verification. | section covering waiver policy; owner or accountable role; linked evidence | waiver policy is generic; waiver policy lacks evidence; waiver policy lacks owner |
| 9 | Family theme coverage: human-agent accountability | Standards Tailoring Matrix handles `human-agent accountability` according to its artifact family obligations. | human-agent accountability section; trace link; review evidence | human-agent accountability omitted; human-agent accountability not traceable; human-agent accountability not reviewable |
| 10 | Standards and method mapping | Standards Tailoring Matrix maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Standards Tailoring Matrix supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Standards Tailoring Matrix records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Standards Tailoring Matrix records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Standards Tailoring Matrix defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Standards Tailoring Matrix has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### GOV-003 RASCI Matrix

- **Construction analog:** General contractor / architect / engineer responsibility matrix
- **Basis:** Human-agent accountability
- **Required links:** Roles, stages, approval authority
- **Reviewer hint:** Governance Auditor, Delivery Manager, Human Owner
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | RASCI Matrix declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | RASCI Matrix ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | RASCI Matrix defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: accountable owners | RASCI Matrix addresses `accountable owners` with enough specificity to guide downstream work, review, and verification. | section covering accountable owners; owner or accountable role; linked evidence | accountable owners is generic; accountable owners lacks evidence; accountable owners lacks owner |
| 5 | Artifact-specific focus: approval authority | RASCI Matrix addresses `approval authority` with enough specificity to guide downstream work, review, and verification. | section covering approval authority; owner or accountable role; linked evidence | approval authority is generic; approval authority lacks evidence; approval authority lacks owner |
| 6 | Artifact-specific focus: agent/human handoff | RASCI Matrix addresses `agent/human handoff` with enough specificity to guide downstream work, review, and verification. | section covering agent/human handoff; owner or accountable role; linked evidence | agent/human handoff is generic; agent/human handoff lacks evidence; agent/human handoff lacks owner |
| 7 | Artifact-specific focus: segregation of duties | RASCI Matrix addresses `segregation of duties` with enough specificity to guide downstream work, review, and verification. | section covering segregation of duties; owner or accountable role; linked evidence | segregation of duties is generic; segregation of duties lacks evidence; segregation of duties lacks owner |
| 8 | Artifact-specific focus: escalation path | RASCI Matrix addresses `escalation path` with enough specificity to guide downstream work, review, and verification. | section covering escalation path; owner or accountable role; linked evidence | escalation path is generic; escalation path lacks evidence; escalation path lacks owner |
| 9 | Family theme coverage: human-agent accountability | RASCI Matrix handles `human-agent accountability` according to its artifact family obligations. | human-agent accountability section; trace link; review evidence | human-agent accountability omitted; human-agent accountability not traceable; human-agent accountability not reviewable |
| 10 | Standards and method mapping | RASCI Matrix maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | RASCI Matrix supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | RASCI Matrix records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | RASCI Matrix records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | RASCI Matrix defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | RASCI Matrix has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### GOV-004 Risk Register

- **Construction analog:** Site risk, safety, and contingency register
- **Basis:** ISO risk management, CMMI
- **Required links:** Requirements, decisions, tests, owners
- **Reviewer hint:** Delivery Manager, Security Engineer, System Architect
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Risk Register declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Risk Register ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Risk Register defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: risk triggers | Risk Register addresses `risk triggers` with enough specificity to guide downstream work, review, and verification. | section covering risk triggers; owner or accountable role; linked evidence | risk triggers is generic; risk triggers lacks evidence; risk triggers lacks owner |
| 5 | Artifact-specific focus: probability and impact | Risk Register addresses `probability and impact` with enough specificity to guide downstream work, review, and verification. | section covering probability and impact; owner or accountable role; linked evidence | probability and impact is generic; probability and impact lacks evidence; probability and impact lacks owner |
| 6 | Artifact-specific focus: mitigation owner | Risk Register addresses `mitigation owner` with enough specificity to guide downstream work, review, and verification. | section covering mitigation owner; owner or accountable role; linked evidence | mitigation owner is generic; mitigation owner lacks evidence; mitigation owner lacks owner |
| 7 | Artifact-specific focus: contingency | Risk Register addresses `contingency` with enough specificity to guide downstream work, review, and verification. | section covering contingency; owner or accountable role; linked evidence | contingency is generic; contingency lacks evidence; contingency lacks owner |
| 8 | Artifact-specific focus: residual-risk acceptance | Risk Register addresses `residual-risk acceptance` with enough specificity to guide downstream work, review, and verification. | section covering residual-risk acceptance; owner or accountable role; linked evidence | residual-risk acceptance is generic; residual-risk acceptance lacks evidence; residual-risk acceptance lacks owner |
| 9 | Family theme coverage: human-agent accountability | Risk Register handles `human-agent accountability` according to its artifact family obligations. | human-agent accountability section; trace link; review evidence | human-agent accountability omitted; human-agent accountability not traceable; human-agent accountability not reviewable |
| 10 | Standards and method mapping | Risk Register maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Risk Register supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Risk Register records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Risk Register records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Risk Register defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Risk Register has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### GOV-005 Change Management Plan

- **Construction analog:** Change order and variation control plan
- **Basis:** Agile/RUP/CMMI
- **Required links:** Change requests, sprints, releases, approvals
- **Reviewer hint:** Change Manager, Governance Auditor, Product Owner
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Change Management Plan declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Change Management Plan ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Change Management Plan defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: change classes | Change Management Plan addresses `change classes` with enough specificity to guide downstream work, review, and verification. | section covering change classes; owner or accountable role; linked evidence | change classes is generic; change classes lacks evidence; change classes lacks owner |
| 5 | Artifact-specific focus: impact analysis | Change Management Plan addresses `impact analysis` with enough specificity to guide downstream work, review, and verification. | section covering impact analysis; owner or accountable role; linked evidence | impact analysis is generic; impact analysis lacks evidence; impact analysis lacks owner |
| 6 | Artifact-specific focus: approval route | Change Management Plan addresses `approval route` with enough specificity to guide downstream work, review, and verification. | section covering approval route; owner or accountable role; linked evidence | approval route is generic; approval route lacks evidence; approval route lacks owner |
| 7 | Artifact-specific focus: token re-estimation | Change Management Plan addresses `token re-estimation` with enough specificity to guide downstream work, review, and verification. | section covering token re-estimation; owner or accountable role; linked evidence | token re-estimation is generic; token re-estimation lacks evidence; token re-estimation lacks owner |
| 8 | Artifact-specific focus: baseline update | Change Management Plan addresses `baseline update` with enough specificity to guide downstream work, review, and verification. | section covering baseline update; owner or accountable role; linked evidence | baseline update is generic; baseline update lacks evidence; baseline update lacks owner |
| 9 | Family theme coverage: human-agent accountability | Change Management Plan handles `human-agent accountability` according to its artifact family obligations. | human-agent accountability section; trace link; review evidence | human-agent accountability omitted; human-agent accountability not traceable; human-agent accountability not reviewable |
| 10 | Standards and method mapping | Change Management Plan maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Change Management Plan supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Change Management Plan records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Change Management Plan records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Change Management Plan defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Change Management Plan has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### GOV-006 Quality Management Plan

- **Construction analog:** Quality inspection and acceptance plan
- **Basis:** ISO 12207, CMMI
- **Required links:** Rubrics, thresholds, evidence types
- **Reviewer hint:** Quality Lead, Governance Auditor, Test Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Quality Management Plan declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Quality Management Plan ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Quality Management Plan defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: quality thresholds | Quality Management Plan addresses `quality thresholds` with enough specificity to guide downstream work, review, and verification. | section covering quality thresholds; owner or accountable role; linked evidence | quality thresholds is generic; quality thresholds lacks evidence; quality thresholds lacks owner |
| 5 | Artifact-specific focus: rubric model | Quality Management Plan addresses `rubric model` with enough specificity to guide downstream work, review, and verification. | section covering rubric model; owner or accountable role; linked evidence | rubric model is generic; rubric model lacks evidence; rubric model lacks owner |
| 6 | Artifact-specific focus: review cadence | Quality Management Plan addresses `review cadence` with enough specificity to guide downstream work, review, and verification. | section covering review cadence; owner or accountable role; linked evidence | review cadence is generic; review cadence lacks evidence; review cadence lacks owner |
| 7 | Artifact-specific focus: certificate policy | Quality Management Plan addresses `certificate policy` with enough specificity to guide downstream work, review, and verification. | section covering certificate policy; owner or accountable role; linked evidence | certificate policy is generic; certificate policy lacks evidence; certificate policy lacks owner |
| 8 | Artifact-specific focus: defect escape handling | Quality Management Plan addresses `defect escape handling` with enough specificity to guide downstream work, review, and verification. | section covering defect escape handling; owner or accountable role; linked evidence | defect escape handling is generic; defect escape handling lacks evidence; defect escape handling lacks owner |
| 9 | Family theme coverage: human-agent accountability | Quality Management Plan handles `human-agent accountability` according to its artifact family obligations. | human-agent accountability section; trace link; review evidence | human-agent accountability omitted; human-agent accountability not traceable; human-agent accountability not reviewable |
| 10 | Standards and method mapping | Quality Management Plan maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Quality Management Plan supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Quality Management Plan records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Quality Management Plan records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Quality Management Plan defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Quality Management Plan has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### GOV-007 AI Governance Plan

- **Construction analog:** Automated equipment / smart-building governance plan
- **Basis:** ISO 42001
- **Required links:** Agent roles, model use, review gates, monitoring
- **Reviewer hint:** AI Governance Auditor, Security Engineer, Human Owner
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | AI Governance Plan declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | AI Governance Plan ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | AI Governance Plan defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: agent authority | AI Governance Plan addresses `agent authority` with enough specificity to guide downstream work, review, and verification. | section covering agent authority; owner or accountable role; linked evidence | agent authority is generic; agent authority lacks evidence; agent authority lacks owner |
| 5 | Artifact-specific focus: model-use policy | AI Governance Plan addresses `model-use policy` with enough specificity to guide downstream work, review, and verification. | section covering model-use policy; owner or accountable role; linked evidence | model-use policy is generic; model-use policy lacks evidence; model-use policy lacks owner |
| 6 | Artifact-specific focus: data exposure | AI Governance Plan addresses `data exposure` with enough specificity to guide downstream work, review, and verification. | section covering data exposure; owner or accountable role; linked evidence | data exposure is generic; data exposure lacks evidence; data exposure lacks owner |
| 7 | Artifact-specific focus: human override | AI Governance Plan addresses `human override` with enough specificity to guide downstream work, review, and verification. | section covering human override; owner or accountable role; linked evidence | human override is generic; human override lacks evidence; human override lacks owner |
| 8 | Artifact-specific focus: monitoring and audit | AI Governance Plan addresses `monitoring and audit` with enough specificity to guide downstream work, review, and verification. | section covering monitoring and audit; owner or accountable role; linked evidence | monitoring and audit is generic; monitoring and audit lacks evidence; monitoring and audit lacks owner |
| 9 | Family theme coverage: human-agent accountability | AI Governance Plan handles `human-agent accountability` according to its artifact family obligations. | human-agent accountability section; trace link; review evidence | human-agent accountability omitted; human-agent accountability not traceable; human-agent accountability not reviewable |
| 10 | Standards and method mapping | AI Governance Plan maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | AI Governance Plan supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | AI Governance Plan records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | AI Governance Plan records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | AI Governance Plan defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | AI Governance Plan has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### GOV-008 DFMS Control Graph

- **Construction analog:** Master construction sequence and inspection gate plan
- **Basis:** Attractor/Fabro-inspired workflow-as-code, ISO planning
- **Required links:** Lifecycle nodes, gates, child skills, human decisions, evidence outputs
- **Reviewer hint:** Governance Auditor, Delivery Manager, Quality Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | DFMS Control Graph declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | DFMS Control Graph ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | DFMS Control Graph defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: lifecycle nodes | DFMS Control Graph addresses `lifecycle nodes` with enough specificity to guide downstream work, review, and verification. | section covering lifecycle nodes; owner or accountable role; linked evidence | lifecycle nodes is generic; lifecycle nodes lacks evidence; lifecycle nodes lacks owner |
| 5 | Artifact-specific focus: gates | DFMS Control Graph addresses `gates` with enough specificity to guide downstream work, review, and verification. | section covering gates; owner or accountable role; linked evidence | gates is generic; gates lacks evidence; gates lacks owner |
| 6 | Artifact-specific focus: skill routing | DFMS Control Graph addresses `skill routing` with enough specificity to guide downstream work, review, and verification. | section covering skill routing; owner or accountable role; linked evidence | skill routing is generic; skill routing lacks evidence; skill routing lacks owner |
| 7 | Artifact-specific focus: re-entry paths | DFMS Control Graph addresses `re-entry paths` with enough specificity to guide downstream work, review, and verification. | section covering re-entry paths; owner or accountable role; linked evidence | re-entry paths is generic; re-entry paths lacks evidence; re-entry paths lacks owner |
| 8 | Artifact-specific focus: evidence outputs | DFMS Control Graph addresses `evidence outputs` with enough specificity to guide downstream work, review, and verification. | section covering evidence outputs; owner or accountable role; linked evidence | evidence outputs is generic; evidence outputs lacks evidence; evidence outputs lacks owner |
| 9 | Family theme coverage: human-agent accountability | DFMS Control Graph handles `human-agent accountability` according to its artifact family obligations. | human-agent accountability section; trace link; review evidence | human-agent accountability omitted; human-agent accountability not traceable; human-agent accountability not reviewable |
| 10 | Standards and method mapping | DFMS Control Graph maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | DFMS Control Graph supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | DFMS Control Graph records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | DFMS Control Graph records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | DFMS Control Graph defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | DFMS Control Graph has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### GOV-009 Work Ledger Schema

- **Construction analog:** Site work ledger and daily log schema
- **Basis:** Gas Town-inspired durable work state, CMMI measurement
- **Required links:** Requirements, artifacts, tasks, risks, decisions, owners, status
- **Reviewer hint:** Delivery Manager, Traceability Lead, Maintainer
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Work Ledger Schema declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Work Ledger Schema ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Work Ledger Schema defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: work item schema | Work Ledger Schema addresses `work item schema` with enough specificity to guide downstream work, review, and verification. | section covering work item schema; owner or accountable role; linked evidence | work item schema is generic; work item schema lacks evidence; work item schema lacks owner |
| 5 | Artifact-specific focus: durable state | Work Ledger Schema addresses `durable state` with enough specificity to guide downstream work, review, and verification. | section covering durable state; owner or accountable role; linked evidence | durable state is generic; durable state lacks evidence; durable state lacks owner |
| 6 | Artifact-specific focus: owner/status | Work Ledger Schema addresses `owner/status` with enough specificity to guide downstream work, review, and verification. | section covering owner/status; owner or accountable role; linked evidence | owner/status is generic; owner/status lacks evidence; owner/status lacks owner |
| 7 | Artifact-specific focus: evidence pointers | Work Ledger Schema addresses `evidence pointers` with enough specificity to guide downstream work, review, and verification. | section covering evidence pointers; owner or accountable role; linked evidence | evidence pointers is generic; evidence pointers lacks evidence; evidence pointers lacks owner |
| 8 | Artifact-specific focus: resume query fields | Work Ledger Schema addresses `resume query fields` with enough specificity to guide downstream work, review, and verification. | section covering resume query fields; owner or accountable role; linked evidence | resume query fields is generic; resume query fields lacks evidence; resume query fields lacks owner |
| 9 | Family theme coverage: human-agent accountability | Work Ledger Schema handles `human-agent accountability` according to its artifact family obligations. | human-agent accountability section; trace link; review evidence | human-agent accountability omitted; human-agent accountability not traceable; human-agent accountability not reviewable |
| 10 | Standards and method mapping | Work Ledger Schema maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Work Ledger Schema supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Work Ledger Schema records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Work Ledger Schema records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Work Ledger Schema defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Work Ledger Schema has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### GOV-010 Attractor Run Record

- **Construction analog:** Preconstruction feasibility and routing record
- **Basis:** StrongDM Attractor-inspired governed entry
- **Required links:** Requirement field, routing, stable state, waivers, next safe action
- **Reviewer hint:** System Theorist, Governance Architect, Verification Critic
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Attractor Run Record declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Attractor Run Record ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Attractor Run Record defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: attractor state | Attractor Run Record addresses `attractor state` with enough specificity to guide downstream work, review, and verification. | section covering attractor state; owner or accountable role; linked evidence | attractor state is generic; attractor state lacks evidence; attractor state lacks owner |
| 5 | Artifact-specific focus: requirement field | Attractor Run Record addresses `requirement field` with enough specificity to guide downstream work, review, and verification. | section covering requirement field; owner or accountable role; linked evidence | requirement field is generic; requirement field lacks evidence; requirement field lacks owner |
| 6 | Artifact-specific focus: selected mode | Attractor Run Record addresses `selected mode` with enough specificity to guide downstream work, review, and verification. | section covering selected mode; owner or accountable role; linked evidence | selected mode is generic; selected mode lacks evidence; selected mode lacks owner |
| 7 | Artifact-specific focus: waivers | Attractor Run Record addresses `waivers` with enough specificity to guide downstream work, review, and verification. | section covering waivers; owner or accountable role; linked evidence | waivers is generic; waivers lacks evidence; waivers lacks owner |
| 8 | Artifact-specific focus: next safe action | Attractor Run Record addresses `next safe action` with enough specificity to guide downstream work, review, and verification. | section covering next safe action; owner or accountable role; linked evidence | next safe action is generic; next safe action lacks evidence; next safe action lacks owner |
| 9 | Family theme coverage: human-agent accountability | Attractor Run Record handles `human-agent accountability` according to its artifact family obligations. | human-agent accountability section; trace link; review evidence | human-agent accountability omitted; human-agent accountability not traceable; human-agent accountability not reviewable |
| 10 | Standards and method mapping | Attractor Run Record maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Attractor Run Record supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Attractor Run Record records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Attractor Run Record records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Attractor Run Record defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Attractor Run Record has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### GOV-011 Methodology Blend Record

- **Construction analog:** Integrated delivery method plan
- **Basis:** RUP/MDA/DDD/TDD/SRE compiler
- **Required links:** Included methods, graph nodes, ledger items, gates, evidence
- **Reviewer hint:** Methodology Architect, Governance Auditor, Quality Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Methodology Blend Record declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Methodology Blend Record ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Methodology Blend Record defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: method mix | Methodology Blend Record addresses `method mix` with enough specificity to guide downstream work, review, and verification. | section covering method mix; owner or accountable role; linked evidence | method mix is generic; method mix lacks evidence; method mix lacks owner |
| 5 | Artifact-specific focus: method conflicts | Methodology Blend Record addresses `method conflicts` with enough specificity to guide downstream work, review, and verification. | section covering method conflicts; owner or accountable role; linked evidence | method conflicts is generic; method conflicts lacks evidence; method conflicts lacks owner |
| 6 | Artifact-specific focus: graph compilation | Methodology Blend Record addresses `graph compilation` with enough specificity to guide downstream work, review, and verification. | section covering graph compilation; owner or accountable role; linked evidence | graph compilation is generic; graph compilation lacks evidence; graph compilation lacks owner |
| 7 | Artifact-specific focus: method-specific gates | Methodology Blend Record addresses `method-specific gates` with enough specificity to guide downstream work, review, and verification. | section covering method-specific gates; owner or accountable role; linked evidence | method-specific gates is generic; method-specific gates lacks evidence; method-specific gates lacks owner |
| 8 | Artifact-specific focus: evidence commitments | Methodology Blend Record addresses `evidence commitments` with enough specificity to guide downstream work, review, and verification. | section covering evidence commitments; owner or accountable role; linked evidence | evidence commitments is generic; evidence commitments lacks evidence; evidence commitments lacks owner |
| 9 | Family theme coverage: human-agent accountability | Methodology Blend Record handles `human-agent accountability` according to its artifact family obligations. | human-agent accountability section; trace link; review evidence | human-agent accountability omitted; human-agent accountability not traceable; human-agent accountability not reviewable |
| 10 | Standards and method mapping | Methodology Blend Record maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Methodology Blend Record supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Methodology Blend Record records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Methodology Blend Record records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Methodology Blend Record defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Methodology Blend Record has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |


## Programming and Requirements

### REQ-001 Business Requirements Document

- **Construction analog:** Owner requirements and building program
- **Basis:** ISO information item, RUP business modeling
- **Required links:** Stakeholders, capabilities, business outcomes
- **Reviewer hint:** Product Expert, Domain Expert, Requirements Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Business Requirements Document declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Business Requirements Document ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Business Requirements Document defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: business outcomes | Business Requirements Document addresses `business outcomes` with enough specificity to guide downstream work, review, and verification. | section covering business outcomes; owner or accountable role; linked evidence | business outcomes is generic; business outcomes lacks evidence; business outcomes lacks owner |
| 5 | Artifact-specific focus: stakeholder needs | Business Requirements Document addresses `stakeholder needs` with enough specificity to guide downstream work, review, and verification. | section covering stakeholder needs; owner or accountable role; linked evidence | stakeholder needs is generic; stakeholder needs lacks evidence; stakeholder needs lacks owner |
| 6 | Artifact-specific focus: capability map | Business Requirements Document addresses `capability map` with enough specificity to guide downstream work, review, and verification. | section covering capability map; owner or accountable role; linked evidence | capability map is generic; capability map lacks evidence; capability map lacks owner |
| 7 | Artifact-specific focus: success metrics | Business Requirements Document addresses `success metrics` with enough specificity to guide downstream work, review, and verification. | section covering success metrics; owner or accountable role; linked evidence | success metrics is generic; success metrics lacks evidence; success metrics lacks owner |
| 8 | Artifact-specific focus: business constraints | Business Requirements Document addresses `business constraints` with enough specificity to guide downstream work, review, and verification. | section covering business constraints; owner or accountable role; linked evidence | business constraints is generic; business constraints lacks evidence; business constraints lacks owner |
| 9 | Family theme coverage: downstream allocation | Business Requirements Document handles `downstream allocation` according to its artifact family obligations. | downstream allocation section; trace link; review evidence | downstream allocation omitted; downstream allocation not traceable; downstream allocation not reviewable |
| 10 | Standards and method mapping | Business Requirements Document maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Business Requirements Document supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Business Requirements Document records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Business Requirements Document records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Business Requirements Document defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Business Requirements Document has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### REQ-002 Software Requirements Specification

- **Construction analog:** Detailed room/function/performance specification
- **Basis:** ISO 12207/15289, IEEE-style SRS practice
- **Required links:** Functional/NFR requirements, tests, design
- **Reviewer hint:** Requirements Lead, Test Lead, Governance Auditor
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Software Requirements Specification declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Software Requirements Specification ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Software Requirements Specification defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: functional requirements | Software Requirements Specification addresses `functional requirements` with enough specificity to guide downstream work, review, and verification. | section covering functional requirements; owner or accountable role; linked evidence | functional requirements is generic; functional requirements lacks evidence; functional requirements lacks owner |
| 5 | Artifact-specific focus: NFR allocation | Software Requirements Specification addresses `NFR allocation` with enough specificity to guide downstream work, review, and verification. | section covering NFR allocation; owner or accountable role; linked evidence | NFR allocation is generic; NFR allocation lacks evidence; NFR allocation lacks owner |
| 6 | Artifact-specific focus: interfaces | Software Requirements Specification addresses `interfaces` with enough specificity to guide downstream work, review, and verification. | section covering interfaces; owner or accountable role; linked evidence | interfaces is generic; interfaces lacks evidence; interfaces lacks owner |
| 7 | Artifact-specific focus: acceptance links | Software Requirements Specification addresses `acceptance links` with enough specificity to guide downstream work, review, and verification. | section covering acceptance links; owner or accountable role; linked evidence | acceptance links is generic; acceptance links lacks evidence; acceptance links lacks owner |
| 8 | Artifact-specific focus: requirement attributes | Software Requirements Specification addresses `requirement attributes` with enough specificity to guide downstream work, review, and verification. | section covering requirement attributes; owner or accountable role; linked evidence | requirement attributes is generic; requirement attributes lacks evidence; requirement attributes lacks owner |
| 9 | Family theme coverage: downstream allocation | Software Requirements Specification handles `downstream allocation` according to its artifact family obligations. | downstream allocation section; trace link; review evidence | downstream allocation omitted; downstream allocation not traceable; downstream allocation not reviewable |
| 10 | Standards and method mapping | Software Requirements Specification maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Software Requirements Specification supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Software Requirements Specification records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Software Requirements Specification records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Software Requirements Specification defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Software Requirements Specification has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### REQ-003 Non-Functional Requirements Catalog

- **Construction analog:** Performance criteria schedule: load, fire, acoustic, HVAC, safety
- **Basis:** ISO quality, SRE, security
- **Required links:** SLIs/SLOs, threat model, tests, operations
- **Reviewer hint:** SRE Lead, Security Engineer, System Architect
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Non-Functional Requirements Catalog declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Non-Functional Requirements Catalog ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Non-Functional Requirements Catalog defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: availability | Non-Functional Requirements Catalog addresses `availability` with enough specificity to guide downstream work, review, and verification. | section covering availability; owner or accountable role; linked evidence | availability is generic; availability lacks evidence; availability lacks owner |
| 5 | Artifact-specific focus: performance | Non-Functional Requirements Catalog addresses `performance` with enough specificity to guide downstream work, review, and verification. | section covering performance; owner or accountable role; linked evidence | performance is generic; performance lacks evidence; performance lacks owner |
| 6 | Artifact-specific focus: security | Non-Functional Requirements Catalog addresses `security` with enough specificity to guide downstream work, review, and verification. | section covering security; owner or accountable role; linked evidence | security is generic; security lacks evidence; security lacks owner |
| 7 | Artifact-specific focus: privacy | Non-Functional Requirements Catalog addresses `privacy` with enough specificity to guide downstream work, review, and verification. | section covering privacy; owner or accountable role; linked evidence | privacy is generic; privacy lacks evidence; privacy lacks owner |
| 8 | Artifact-specific focus: operability thresholds | Non-Functional Requirements Catalog addresses `operability thresholds` with enough specificity to guide downstream work, review, and verification. | section covering operability thresholds; owner or accountable role; linked evidence | operability thresholds is generic; operability thresholds lacks evidence; operability thresholds lacks owner |
| 9 | Family theme coverage: downstream allocation | Non-Functional Requirements Catalog handles `downstream allocation` according to its artifact family obligations. | downstream allocation section; trace link; review evidence | downstream allocation omitted; downstream allocation not traceable; downstream allocation not reviewable |
| 10 | Standards and method mapping | Non-Functional Requirements Catalog maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Non-Functional Requirements Catalog supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Non-Functional Requirements Catalog records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Non-Functional Requirements Catalog records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Non-Functional Requirements Catalog defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Non-Functional Requirements Catalog has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### REQ-004 Acceptance Criteria and Scenarios

- **Construction analog:** Acceptance walk-through scenarios and punch-list criteria
- **Basis:** BDD/TDD, dark factory validation
- **Required links:** Requirements, tests, holdouts, user journeys
- **Reviewer hint:** Product Expert, QA Lead, Domain Expert
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Acceptance Criteria and Scenarios declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Acceptance Criteria and Scenarios ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Acceptance Criteria and Scenarios defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: user scenarios | Acceptance Criteria and Scenarios addresses `user scenarios` with enough specificity to guide downstream work, review, and verification. | section covering user scenarios; owner or accountable role; linked evidence | user scenarios is generic; user scenarios lacks evidence; user scenarios lacks owner |
| 5 | Artifact-specific focus: acceptance criteria | Acceptance Criteria and Scenarios addresses `acceptance criteria` with enough specificity to guide downstream work, review, and verification. | section covering acceptance criteria; owner or accountable role; linked evidence | acceptance criteria is generic; acceptance criteria lacks evidence; acceptance criteria lacks owner |
| 6 | Artifact-specific focus: negative cases | Acceptance Criteria and Scenarios addresses `negative cases` with enough specificity to guide downstream work, review, and verification. | section covering negative cases; owner or accountable role; linked evidence | negative cases is generic; negative cases lacks evidence; negative cases lacks owner |
| 7 | Artifact-specific focus: holdouts | Acceptance Criteria and Scenarios addresses `holdouts` with enough specificity to guide downstream work, review, and verification. | section covering holdouts; owner or accountable role; linked evidence | holdouts is generic; holdouts lacks evidence; holdouts lacks owner |
| 8 | Artifact-specific focus: journey coverage | Acceptance Criteria and Scenarios addresses `journey coverage` with enough specificity to guide downstream work, review, and verification. | section covering journey coverage; owner or accountable role; linked evidence | journey coverage is generic; journey coverage lacks evidence; journey coverage lacks owner |
| 9 | Family theme coverage: downstream allocation | Acceptance Criteria and Scenarios handles `downstream allocation` according to its artifact family obligations. | downstream allocation section; trace link; review evidence | downstream allocation omitted; downstream allocation not traceable; downstream allocation not reviewable |
| 10 | Standards and method mapping | Acceptance Criteria and Scenarios maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Acceptance Criteria and Scenarios supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Acceptance Criteria and Scenarios records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Acceptance Criteria and Scenarios records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Acceptance Criteria and Scenarios defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Acceptance Criteria and Scenarios has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### REQ-005 Glossary and Ubiquitous Language

- **Construction analog:** Project glossary and drawing legend
- **Basis:** DDD
- **Required links:** Domain terms, bounded contexts, APIs
- **Reviewer hint:** Domain Expert, DDD Critic, Requirements Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Glossary and Ubiquitous Language declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Glossary and Ubiquitous Language ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Glossary and Ubiquitous Language defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: term definitions | Glossary and Ubiquitous Language addresses `term definitions` with enough specificity to guide downstream work, review, and verification. | section covering term definitions; owner or accountable role; linked evidence | term definitions is generic; term definitions lacks evidence; term definitions lacks owner |
| 5 | Artifact-specific focus: bounded-context meaning | Glossary and Ubiquitous Language addresses `bounded-context meaning` with enough specificity to guide downstream work, review, and verification. | section covering bounded-context meaning; owner or accountable role; linked evidence | bounded-context meaning is generic; bounded-context meaning lacks evidence; bounded-context meaning lacks owner |
| 6 | Artifact-specific focus: aliases | Glossary and Ubiquitous Language addresses `aliases` with enough specificity to guide downstream work, review, and verification. | section covering aliases; owner or accountable role; linked evidence | aliases is generic; aliases lacks evidence; aliases lacks owner |
| 7 | Artifact-specific focus: forbidden synonyms | Glossary and Ubiquitous Language addresses `forbidden synonyms` with enough specificity to guide downstream work, review, and verification. | section covering forbidden synonyms; owner or accountable role; linked evidence | forbidden synonyms is generic; forbidden synonyms lacks evidence; forbidden synonyms lacks owner |
| 8 | Artifact-specific focus: code/test naming links | Glossary and Ubiquitous Language addresses `code/test naming links` with enough specificity to guide downstream work, review, and verification. | section covering code/test naming links; owner or accountable role; linked evidence | code/test naming links is generic; code/test naming links lacks evidence; code/test naming links lacks owner |
| 9 | Family theme coverage: downstream allocation | Glossary and Ubiquitous Language handles `downstream allocation` according to its artifact family obligations. | downstream allocation section; trace link; review evidence | downstream allocation omitted; downstream allocation not traceable; downstream allocation not reviewable |
| 10 | Standards and method mapping | Glossary and Ubiquitous Language maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Glossary and Ubiquitous Language supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Glossary and Ubiquitous Language records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Glossary and Ubiquitous Language records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Glossary and Ubiquitous Language defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Glossary and Ubiquitous Language has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### REQ-006 Assumption and Constraint Log

- **Construction analog:** Assumption, constraint, and site condition log
- **Basis:** Professional SDLC handoff
- **Required links:** Decisions, risks, open questions
- **Reviewer hint:** Requirements Lead, Delivery Manager, Human Owner
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Assumption and Constraint Log declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Assumption and Constraint Log ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Assumption and Constraint Log defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: assumption owner | Assumption and Constraint Log addresses `assumption owner` with enough specificity to guide downstream work, review, and verification. | section covering assumption owner; owner or accountable role; linked evidence | assumption owner is generic; assumption owner lacks evidence; assumption owner lacks owner |
| 5 | Artifact-specific focus: confidence level | Assumption and Constraint Log addresses `confidence level` with enough specificity to guide downstream work, review, and verification. | section covering confidence level; owner or accountable role; linked evidence | confidence level is generic; confidence level lacks evidence; confidence level lacks owner |
| 6 | Artifact-specific focus: constraint type | Assumption and Constraint Log addresses `constraint type` with enough specificity to guide downstream work, review, and verification. | section covering constraint type; owner or accountable role; linked evidence | constraint type is generic; constraint type lacks evidence; constraint type lacks owner |
| 7 | Artifact-specific focus: decision impact | Assumption and Constraint Log addresses `decision impact` with enough specificity to guide downstream work, review, and verification. | section covering decision impact; owner or accountable role; linked evidence | decision impact is generic; decision impact lacks evidence; decision impact lacks owner |
| 8 | Artifact-specific focus: revalidation trigger | Assumption and Constraint Log addresses `revalidation trigger` with enough specificity to guide downstream work, review, and verification. | section covering revalidation trigger; owner or accountable role; linked evidence | revalidation trigger is generic; revalidation trigger lacks evidence; revalidation trigger lacks owner |
| 9 | Family theme coverage: downstream allocation | Assumption and Constraint Log handles `downstream allocation` according to its artifact family obligations. | downstream allocation section; trace link; review evidence | downstream allocation omitted; downstream allocation not traceable; downstream allocation not reviewable |
| 10 | Standards and method mapping | Assumption and Constraint Log maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Assumption and Constraint Log supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Assumption and Constraint Log records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Assumption and Constraint Log records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Assumption and Constraint Log defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Assumption and Constraint Log has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### REQ-007 Interrogation Record

- **Construction analog:** Owner/stakeholder interview and signoff record
- **Basis:** Customer discovery and validation
- **Required links:** Rounds, answer IDs, contradiction scoring, approval mechanics
- **Reviewer hint:** Requirements Lead, Product Owner, Governance Auditor
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Interrogation Record declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Interrogation Record ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Interrogation Record defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: interview rounds | Interrogation Record addresses `interview rounds` with enough specificity to guide downstream work, review, and verification. | section covering interview rounds; owner or accountable role; linked evidence | interview rounds is generic; interview rounds lacks evidence; interview rounds lacks owner |
| 5 | Artifact-specific focus: answer IDs | Interrogation Record addresses `answer IDs` with enough specificity to guide downstream work, review, and verification. | section covering answer IDs; owner or accountable role; linked evidence | answer IDs is generic; answer IDs lacks evidence; answer IDs lacks owner |
| 6 | Artifact-specific focus: contradiction scoring | Interrogation Record addresses `contradiction scoring` with enough specificity to guide downstream work, review, and verification. | section covering contradiction scoring; owner or accountable role; linked evidence | contradiction scoring is generic; contradiction scoring lacks evidence; contradiction scoring lacks owner |
| 7 | Artifact-specific focus: approval mechanics | Interrogation Record addresses `approval mechanics` with enough specificity to guide downstream work, review, and verification. | section covering approval mechanics; owner or accountable role; linked evidence | approval mechanics is generic; approval mechanics lacks evidence; approval mechanics lacks owner |
| 8 | Artifact-specific focus: re-interrogation triggers | Interrogation Record addresses `re-interrogation triggers` with enough specificity to guide downstream work, review, and verification. | section covering re-interrogation triggers; owner or accountable role; linked evidence | re-interrogation triggers is generic; re-interrogation triggers lacks evidence; re-interrogation triggers lacks owner |
| 9 | Family theme coverage: downstream allocation | Interrogation Record handles `downstream allocation` according to its artifact family obligations. | downstream allocation section; trace link; review evidence | downstream allocation omitted; downstream allocation not traceable; downstream allocation not reviewable |
| 10 | Standards and method mapping | Interrogation Record maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Interrogation Record supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Interrogation Record records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Interrogation Record records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Interrogation Record defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Interrogation Record has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### REQ-008 Spec Decomposition Record

- **Construction analog:** Work breakdown / room-by-room decomposition record
- **Basis:** ISO/IEC/IEEE 29148, RUP use-case decomposition, Agile story slicing, DDD domain decomposition
- **Required links:** Requirement tree, branch interviews, completeness scores, leaf acceptance criteria, trace links, re-interrogation triggers
- **Reviewer hint:** Requirements Decomposition Lead, Product Owner, Verification Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Spec Decomposition Record declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Spec Decomposition Record ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Spec Decomposition Record defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: decomposition tree | Spec Decomposition Record addresses `decomposition tree` with enough specificity to guide downstream work, review, and verification. | section covering decomposition tree; owner or accountable role; linked evidence | decomposition tree is generic; decomposition tree lacks evidence; decomposition tree lacks owner |
| 5 | Artifact-specific focus: parent-child coverage | Spec Decomposition Record addresses `parent-child coverage` with enough specificity to guide downstream work, review, and verification. | section covering parent-child coverage; owner or accountable role; linked evidence | parent-child coverage is generic; parent-child coverage lacks evidence; parent-child coverage lacks owner |
| 6 | Artifact-specific focus: atomic leaves | Spec Decomposition Record addresses `atomic leaves` with enough specificity to guide downstream work, review, and verification. | section covering atomic leaves; owner or accountable role; linked evidence | atomic leaves is generic; atomic leaves lacks evidence; atomic leaves lacks owner |
| 7 | Artifact-specific focus: completeness score | Spec Decomposition Record addresses `completeness score` with enough specificity to guide downstream work, review, and verification. | section covering completeness score; owner or accountable role; linked evidence | completeness score is generic; completeness score lacks evidence; completeness score lacks owner |
| 8 | Artifact-specific focus: leaf acceptance tests | Spec Decomposition Record addresses `leaf acceptance tests` with enough specificity to guide downstream work, review, and verification. | section covering leaf acceptance tests; owner or accountable role; linked evidence | leaf acceptance tests is generic; leaf acceptance tests lacks evidence; leaf acceptance tests lacks owner |
| 9 | Family theme coverage: downstream allocation | Spec Decomposition Record handles `downstream allocation` according to its artifact family obligations. | downstream allocation section; trace link; review evidence | downstream allocation omitted; downstream allocation not traceable; downstream allocation not reviewable |
| 10 | Standards and method mapping | Spec Decomposition Record maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Spec Decomposition Record supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Spec Decomposition Record records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Spec Decomposition Record records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Spec Decomposition Record defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Spec Decomposition Record has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |


## Design Development and Engineering

### ARC-001 High-Level Design

- **Construction analog:** Architectural design development package
- **Basis:** RUP, ISO design, architecture practice
- **Required links:** Requirements, NFRs, ADRs, risks
- **Reviewer hint:** System Architect, SRE Lead, Security Engineer
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | High-Level Design declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | High-Level Design ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | High-Level Design defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: system boundaries | High-Level Design addresses `system boundaries` with enough specificity to guide downstream work, review, and verification. | section covering system boundaries; owner or accountable role; linked evidence | system boundaries is generic; system boundaries lacks evidence; system boundaries lacks owner |
| 5 | Artifact-specific focus: logical view | High-Level Design addresses `logical view` with enough specificity to guide downstream work, review, and verification. | section covering logical view; owner or accountable role; linked evidence | logical view is generic; logical view lacks evidence; logical view lacks owner |
| 6 | Artifact-specific focus: deployment view | High-Level Design addresses `deployment view` with enough specificity to guide downstream work, review, and verification. | section covering deployment view; owner or accountable role; linked evidence | deployment view is generic; deployment view lacks evidence; deployment view lacks owner |
| 7 | Artifact-specific focus: failure modes | High-Level Design addresses `failure modes` with enough specificity to guide downstream work, review, and verification. | section covering failure modes; owner or accountable role; linked evidence | failure modes is generic; failure modes lacks evidence; failure modes lacks owner |
| 8 | Artifact-specific focus: architecture alternatives | High-Level Design addresses `architecture alternatives` with enough specificity to guide downstream work, review, and verification. | section covering architecture alternatives; owner or accountable role; linked evidence | architecture alternatives is generic; architecture alternatives lacks evidence; architecture alternatives lacks owner |
| 9 | Family theme coverage: implementation feasibility | High-Level Design handles `implementation feasibility` according to its artifact family obligations. | implementation feasibility section; trace link; review evidence | implementation feasibility omitted; implementation feasibility not traceable; implementation feasibility not reviewable |
| 10 | Standards and method mapping | High-Level Design maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | High-Level Design supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | High-Level Design records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | High-Level Design records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | High-Level Design defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | High-Level Design has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### ARC-002 Low-Level Design

- **Construction analog:** Detailed construction drawings and shop drawing basis
- **Basis:** ISO implementation planning
- **Required links:** Components, APIs, data model, tests
- **Reviewer hint:** System Architect, Implementation Lead, Test Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Low-Level Design declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Low-Level Design ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Low-Level Design defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: component contracts | Low-Level Design addresses `component contracts` with enough specificity to guide downstream work, review, and verification. | section covering component contracts; owner or accountable role; linked evidence | component contracts is generic; component contracts lacks evidence; component contracts lacks owner |
| 5 | Artifact-specific focus: algorithms | Low-Level Design addresses `algorithms` with enough specificity to guide downstream work, review, and verification. | section covering algorithms; owner or accountable role; linked evidence | algorithms is generic; algorithms lacks evidence; algorithms lacks owner |
| 6 | Artifact-specific focus: data structures | Low-Level Design addresses `data structures` with enough specificity to guide downstream work, review, and verification. | section covering data structures; owner or accountable role; linked evidence | data structures is generic; data structures lacks evidence; data structures lacks owner |
| 7 | Artifact-specific focus: API details | Low-Level Design addresses `API details` with enough specificity to guide downstream work, review, and verification. | section covering API details; owner or accountable role; linked evidence | API details is generic; API details lacks evidence; API details lacks owner |
| 8 | Artifact-specific focus: test seams | Low-Level Design addresses `test seams` with enough specificity to guide downstream work, review, and verification. | section covering test seams; owner or accountable role; linked evidence | test seams is generic; test seams lacks evidence; test seams lacks owner |
| 9 | Family theme coverage: implementation feasibility | Low-Level Design handles `implementation feasibility` according to its artifact family obligations. | implementation feasibility section; trace link; review evidence | implementation feasibility omitted; implementation feasibility not traceable; implementation feasibility not reviewable |
| 10 | Standards and method mapping | Low-Level Design maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Low-Level Design supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Low-Level Design records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Low-Level Design records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Low-Level Design defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Low-Level Design has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### ARC-003 Architecture Decision Records

- **Construction analog:** Design decision log and engineering rationale
- **Basis:** ADR practice, ISO rationale records
- **Required links:** Alternatives, chosen design, consequences
- **Reviewer hint:** System Architect, DDD Critic, Governance Auditor
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Architecture Decision Records declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Architecture Decision Records ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Architecture Decision Records defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: decision context | Architecture Decision Records addresses `decision context` with enough specificity to guide downstream work, review, and verification. | section covering decision context; owner or accountable role; linked evidence | decision context is generic; decision context lacks evidence; decision context lacks owner |
| 5 | Artifact-specific focus: alternatives | Architecture Decision Records addresses `alternatives` with enough specificity to guide downstream work, review, and verification. | section covering alternatives; owner or accountable role; linked evidence | alternatives is generic; alternatives lacks evidence; alternatives lacks owner |
| 6 | Artifact-specific focus: chosen option | Architecture Decision Records addresses `chosen option` with enough specificity to guide downstream work, review, and verification. | section covering chosen option; owner or accountable role; linked evidence | chosen option is generic; chosen option lacks evidence; chosen option lacks owner |
| 7 | Artifact-specific focus: consequences | Architecture Decision Records addresses `consequences` with enough specificity to guide downstream work, review, and verification. | section covering consequences; owner or accountable role; linked evidence | consequences is generic; consequences lacks evidence; consequences lacks owner |
| 8 | Artifact-specific focus: reversal conditions | Architecture Decision Records addresses `reversal conditions` with enough specificity to guide downstream work, review, and verification. | section covering reversal conditions; owner or accountable role; linked evidence | reversal conditions is generic; reversal conditions lacks evidence; reversal conditions lacks owner |
| 9 | Family theme coverage: implementation feasibility | Architecture Decision Records handles `implementation feasibility` according to its artifact family obligations. | implementation feasibility section; trace link; review evidence | implementation feasibility omitted; implementation feasibility not traceable; implementation feasibility not reviewable |
| 10 | Standards and method mapping | Architecture Decision Records maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Architecture Decision Records supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Architecture Decision Records records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Architecture Decision Records records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Architecture Decision Records defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Architecture Decision Records has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### ARC-004 Interface/API Specification

- **Construction analog:** Interface specification between trades and systems
- **Basis:** ISO, OpenAPI/gRPC/etc. as applicable
- **Required links:** Requirements, consumers, tests
- **Reviewer hint:** System Architect, Test Lead, Security Engineer
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Interface/API Specification declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Interface/API Specification ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Interface/API Specification defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: contract schema | Interface/API Specification addresses `contract schema` with enough specificity to guide downstream work, review, and verification. | section covering contract schema; owner or accountable role; linked evidence | contract schema is generic; contract schema lacks evidence; contract schema lacks owner |
| 5 | Artifact-specific focus: error model | Interface/API Specification addresses `error model` with enough specificity to guide downstream work, review, and verification. | section covering error model; owner or accountable role; linked evidence | error model is generic; error model lacks evidence; error model lacks owner |
| 6 | Artifact-specific focus: auth/authz | Interface/API Specification addresses `auth/authz` with enough specificity to guide downstream work, review, and verification. | section covering auth/authz; owner or accountable role; linked evidence | auth/authz is generic; auth/authz lacks evidence; auth/authz lacks owner |
| 7 | Artifact-specific focus: versioning | Interface/API Specification addresses `versioning` with enough specificity to guide downstream work, review, and verification. | section covering versioning; owner or accountable role; linked evidence | versioning is generic; versioning lacks evidence; versioning lacks owner |
| 8 | Artifact-specific focus: consumer tests | Interface/API Specification addresses `consumer tests` with enough specificity to guide downstream work, review, and verification. | section covering consumer tests; owner or accountable role; linked evidence | consumer tests is generic; consumer tests lacks evidence; consumer tests lacks owner |
| 9 | Family theme coverage: implementation feasibility | Interface/API Specification handles `implementation feasibility` according to its artifact family obligations. | implementation feasibility section; trace link; review evidence | implementation feasibility omitted; implementation feasibility not traceable; implementation feasibility not reviewable |
| 10 | Standards and method mapping | Interface/API Specification maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Interface/API Specification supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Interface/API Specification records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Interface/API Specification records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Interface/API Specification defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Interface/API Specification has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### ARC-005 Data Model and Migration Plan

- **Construction analog:** Site utility/data model and phased migration plan
- **Basis:** DDD/data architecture
- **Required links:** Entities, stores, privacy, migrations
- **Reviewer hint:** Data Architect, Security Engineer, SRE Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Data Model and Migration Plan declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Data Model and Migration Plan ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Data Model and Migration Plan defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: entities | Data Model and Migration Plan addresses `entities` with enough specificity to guide downstream work, review, and verification. | section covering entities; owner or accountable role; linked evidence | entities is generic; entities lacks evidence; entities lacks owner |
| 5 | Artifact-specific focus: relationships | Data Model and Migration Plan addresses `relationships` with enough specificity to guide downstream work, review, and verification. | section covering relationships; owner or accountable role; linked evidence | relationships is generic; relationships lacks evidence; relationships lacks owner |
| 6 | Artifact-specific focus: migration steps | Data Model and Migration Plan addresses `migration steps` with enough specificity to guide downstream work, review, and verification. | section covering migration steps; owner or accountable role; linked evidence | migration steps is generic; migration steps lacks evidence; migration steps lacks owner |
| 7 | Artifact-specific focus: privacy handling | Data Model and Migration Plan addresses `privacy handling` with enough specificity to guide downstream work, review, and verification. | section covering privacy handling; owner or accountable role; linked evidence | privacy handling is generic; privacy handling lacks evidence; privacy handling lacks owner |
| 8 | Artifact-specific focus: reconciliation checks | Data Model and Migration Plan addresses `reconciliation checks` with enough specificity to guide downstream work, review, and verification. | section covering reconciliation checks; owner or accountable role; linked evidence | reconciliation checks is generic; reconciliation checks lacks evidence; reconciliation checks lacks owner |
| 9 | Family theme coverage: implementation feasibility | Data Model and Migration Plan handles `implementation feasibility` according to its artifact family obligations. | implementation feasibility section; trace link; review evidence | implementation feasibility omitted; implementation feasibility not traceable; implementation feasibility not reviewable |
| 10 | Standards and method mapping | Data Model and Migration Plan maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Data Model and Migration Plan supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Data Model and Migration Plan records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Data Model and Migration Plan records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Data Model and Migration Plan defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Data Model and Migration Plan has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### ARC-006 Threat Model

- **Construction analog:** Life-safety, security, and hazard analysis
- **Basis:** SSDF, OWASP SAMM
- **Required links:** Assets, abuse cases, mitigations, tests
- **Reviewer hint:** Security Engineer, System Architect, Test Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Threat Model declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Threat Model ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Threat Model defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: assets | Threat Model addresses `assets` with enough specificity to guide downstream work, review, and verification. | section covering assets; owner or accountable role; linked evidence | assets is generic; assets lacks evidence; assets lacks owner |
| 5 | Artifact-specific focus: actors | Threat Model addresses `actors` with enough specificity to guide downstream work, review, and verification. | section covering actors; owner or accountable role; linked evidence | actors is generic; actors lacks evidence; actors lacks owner |
| 6 | Artifact-specific focus: trust boundaries | Threat Model addresses `trust boundaries` with enough specificity to guide downstream work, review, and verification. | section covering trust boundaries; owner or accountable role; linked evidence | trust boundaries is generic; trust boundaries lacks evidence; trust boundaries lacks owner |
| 7 | Artifact-specific focus: abuse cases | Threat Model addresses `abuse cases` with enough specificity to guide downstream work, review, and verification. | section covering abuse cases; owner or accountable role; linked evidence | abuse cases is generic; abuse cases lacks evidence; abuse cases lacks owner |
| 8 | Artifact-specific focus: mitigations | Threat Model addresses `mitigations` with enough specificity to guide downstream work, review, and verification. | section covering mitigations; owner or accountable role; linked evidence | mitigations is generic; mitigations lacks evidence; mitigations lacks owner |
| 9 | Family theme coverage: implementation feasibility | Threat Model handles `implementation feasibility` according to its artifact family obligations. | implementation feasibility section; trace link; review evidence | implementation feasibility omitted; implementation feasibility not traceable; implementation feasibility not reviewable |
| 10 | Standards and method mapping | Threat Model maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Threat Model supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Threat Model records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Threat Model records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Threat Model defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Threat Model has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### ARC-007 Observability Design

- **Construction analog:** Building monitoring, alarms, and observability plan
- **Basis:** SRE
- **Required links:** SLIs, logs, metrics, traces, alerts
- **Reviewer hint:** SRE Lead, System Architect, Test Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Observability Design declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Observability Design ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Observability Design defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: SLIs | Observability Design addresses `SLIs` with enough specificity to guide downstream work, review, and verification. | section covering SLIs; owner or accountable role; linked evidence | SLIs is generic; SLIs lacks evidence; SLIs lacks owner |
| 5 | Artifact-specific focus: logs | Observability Design addresses `logs` with enough specificity to guide downstream work, review, and verification. | section covering logs; owner or accountable role; linked evidence | logs is generic; logs lacks evidence; logs lacks owner |
| 6 | Artifact-specific focus: metrics | Observability Design addresses `metrics` with enough specificity to guide downstream work, review, and verification. | section covering metrics; owner or accountable role; linked evidence | metrics is generic; metrics lacks evidence; metrics lacks owner |
| 7 | Artifact-specific focus: traces | Observability Design addresses `traces` with enough specificity to guide downstream work, review, and verification. | section covering traces; owner or accountable role; linked evidence | traces is generic; traces lacks evidence; traces lacks owner |
| 8 | Artifact-specific focus: alerts and dashboards | Observability Design addresses `alerts and dashboards` with enough specificity to guide downstream work, review, and verification. | section covering alerts and dashboards; owner or accountable role; linked evidence | alerts and dashboards is generic; alerts and dashboards lacks evidence; alerts and dashboards lacks owner |
| 9 | Family theme coverage: implementation feasibility | Observability Design handles `implementation feasibility` according to its artifact family obligations. | implementation feasibility section; trace link; review evidence | implementation feasibility omitted; implementation feasibility not traceable; implementation feasibility not reviewable |
| 10 | Standards and method mapping | Observability Design maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Observability Design supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Observability Design records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Observability Design records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Observability Design defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Observability Design has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |


## Model and Blueprint Transformation

### MDA-001 Computation-Independent Model

- **Construction analog:** Conceptual massing and owner-use model
- **Basis:** OMG MDA
- **Required links:** Business process, domain goals, glossary
- **Reviewer hint:** MDA Architect, Domain Expert, Product Expert
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Computation-Independent Model declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Computation-Independent Model ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Computation-Independent Model defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: business process | Computation-Independent Model addresses `business process` with enough specificity to guide downstream work, review, and verification. | section covering business process; owner or accountable role; linked evidence | business process is generic; business process lacks evidence; business process lacks owner |
| 5 | Artifact-specific focus: actors | Computation-Independent Model addresses `actors` with enough specificity to guide downstream work, review, and verification. | section covering actors; owner or accountable role; linked evidence | actors is generic; actors lacks evidence; actors lacks owner |
| 6 | Artifact-specific focus: business concepts | Computation-Independent Model addresses `business concepts` with enough specificity to guide downstream work, review, and verification. | section covering business concepts; owner or accountable role; linked evidence | business concepts is generic; business concepts lacks evidence; business concepts lacks owner |
| 7 | Artifact-specific focus: constraints | Computation-Independent Model addresses `constraints` with enough specificity to guide downstream work, review, and verification. | section covering constraints; owner or accountable role; linked evidence | constraints is generic; constraints lacks evidence; constraints lacks owner |
| 8 | Artifact-specific focus: technology-free behavior | Computation-Independent Model addresses `technology-free behavior` with enough specificity to guide downstream work, review, and verification. | section covering technology-free behavior; owner or accountable role; linked evidence | technology-free behavior is generic; technology-free behavior lacks evidence; technology-free behavior lacks owner |
| 9 | Family theme coverage: model verification | Computation-Independent Model handles `model verification` according to its artifact family obligations. | model verification section; trace link; review evidence | model verification omitted; model verification not traceable; model verification not reviewable |
| 10 | Standards and method mapping | Computation-Independent Model maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Computation-Independent Model supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Computation-Independent Model records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Computation-Independent Model records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Computation-Independent Model defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Computation-Independent Model has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### MDA-002 Platform-Independent Model

- **Construction analog:** Technology-neutral engineering model
- **Basis:** OMG MDA
- **Required links:** CIM elements, domain model, interfaces
- **Reviewer hint:** MDA Architect, System Architect, DDD Critic
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Platform-Independent Model declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Platform-Independent Model ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Platform-Independent Model defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: logical services | Platform-Independent Model addresses `logical services` with enough specificity to guide downstream work, review, and verification. | section covering logical services; owner or accountable role; linked evidence | logical services is generic; logical services lacks evidence; logical services lacks owner |
| 5 | Artifact-specific focus: platform-neutral interfaces | Platform-Independent Model addresses `platform-neutral interfaces` with enough specificity to guide downstream work, review, and verification. | section covering platform-neutral interfaces; owner or accountable role; linked evidence | platform-neutral interfaces is generic; platform-neutral interfaces lacks evidence; platform-neutral interfaces lacks owner |
| 6 | Artifact-specific focus: behavior model | Platform-Independent Model addresses `behavior model` with enough specificity to guide downstream work, review, and verification. | section covering behavior model; owner or accountable role; linked evidence | behavior model is generic; behavior model lacks evidence; behavior model lacks owner |
| 7 | Artifact-specific focus: quality constraints | Platform-Independent Model addresses `quality constraints` with enough specificity to guide downstream work, review, and verification. | section covering quality constraints; owner or accountable role; linked evidence | quality constraints is generic; quality constraints lacks evidence; quality constraints lacks owner |
| 8 | Artifact-specific focus: CIM preservation | Platform-Independent Model addresses `CIM preservation` with enough specificity to guide downstream work, review, and verification. | section covering CIM preservation; owner or accountable role; linked evidence | CIM preservation is generic; CIM preservation lacks evidence; CIM preservation lacks owner |
| 9 | Family theme coverage: model verification | Platform-Independent Model handles `model verification` according to its artifact family obligations. | model verification section; trace link; review evidence | model verification omitted; model verification not traceable; model verification not reviewable |
| 10 | Standards and method mapping | Platform-Independent Model maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Platform-Independent Model supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Platform-Independent Model records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Platform-Independent Model records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Platform-Independent Model defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Platform-Independent Model has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### MDA-003 Platform-Specific Model

- **Construction analog:** Construction-ready platform/material model
- **Basis:** OMG MDA
- **Required links:** PIM mappings, stack choices, code modules
- **Reviewer hint:** MDA Architect, Implementation Lead, SRE Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Platform-Specific Model declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Platform-Specific Model ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Platform-Specific Model defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: runtime stack | Platform-Specific Model addresses `runtime stack` with enough specificity to guide downstream work, review, and verification. | section covering runtime stack; owner or accountable role; linked evidence | runtime stack is generic; runtime stack lacks evidence; runtime stack lacks owner |
| 5 | Artifact-specific focus: module mapping | Platform-Specific Model addresses `module mapping` with enough specificity to guide downstream work, review, and verification. | section covering module mapping; owner or accountable role; linked evidence | module mapping is generic; module mapping lacks evidence; module mapping lacks owner |
| 6 | Artifact-specific focus: deployment units | Platform-Specific Model addresses `deployment units` with enough specificity to guide downstream work, review, and verification. | section covering deployment units; owner or accountable role; linked evidence | deployment units is generic; deployment units lacks evidence; deployment units lacks owner |
| 7 | Artifact-specific focus: config | Platform-Specific Model addresses `config` with enough specificity to guide downstream work, review, and verification. | section covering config; owner or accountable role; linked evidence | config is generic; config lacks evidence; config lacks owner |
| 8 | Artifact-specific focus: platform constraints | Platform-Specific Model addresses `platform constraints` with enough specificity to guide downstream work, review, and verification. | section covering platform constraints; owner or accountable role; linked evidence | platform constraints is generic; platform constraints lacks evidence; platform constraints lacks owner |
| 9 | Family theme coverage: model verification | Platform-Specific Model handles `model verification` according to its artifact family obligations. | model verification section; trace link; review evidence | model verification omitted; model verification not traceable; model verification not reviewable |
| 10 | Standards and method mapping | Platform-Specific Model maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Platform-Specific Model supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Platform-Specific Model records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Platform-Specific Model records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Platform-Specific Model defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Platform-Specific Model has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### MDA-004 Model Transformation Record

- **Construction analog:** Concept-to-engineering-to-construction transformation log
- **Basis:** OMG MDA
- **Required links:** CIM->PIM->PSM mappings and exceptions
- **Reviewer hint:** MDA Architect, Governance Auditor, Test Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Model Transformation Record declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Model Transformation Record ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Model Transformation Record defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: mapping table | Model Transformation Record addresses `mapping table` with enough specificity to guide downstream work, review, and verification. | section covering mapping table; owner or accountable role; linked evidence | mapping table is generic; mapping table lacks evidence; mapping table lacks owner |
| 5 | Artifact-specific focus: transformation rule | Model Transformation Record addresses `transformation rule` with enough specificity to guide downstream work, review, and verification. | section covering transformation rule; owner or accountable role; linked evidence | transformation rule is generic; transformation rule lacks evidence; transformation rule lacks owner |
| 6 | Artifact-specific focus: exception | Model Transformation Record addresses `exception` with enough specificity to guide downstream work, review, and verification. | section covering exception; owner or accountable role; linked evidence | exception is generic; exception lacks evidence; exception lacks owner |
| 7 | Artifact-specific focus: lost information | Model Transformation Record addresses `lost information` with enough specificity to guide downstream work, review, and verification. | section covering lost information; owner or accountable role; linked evidence | lost information is generic; lost information lacks evidence; lost information lacks owner |
| 8 | Artifact-specific focus: verification evidence | Model Transformation Record addresses `verification evidence` with enough specificity to guide downstream work, review, and verification. | section covering verification evidence; owner or accountable role; linked evidence | verification evidence is generic; verification evidence lacks evidence; verification evidence lacks owner |
| 9 | Family theme coverage: model verification | Model Transformation Record handles `model verification` according to its artifact family obligations. | model verification section; trace link; review evidence | model verification omitted; model verification not traceable; model verification not reviewable |
| 10 | Standards and method mapping | Model Transformation Record maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Model Transformation Record supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Model Transformation Record records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Model Transformation Record records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Model Transformation Record defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Model Transformation Record has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |


## Domain Blueprint Coordination

### DDD-001 Bounded Context Map

- **Construction analog:** Trade boundary and coordination map
- **Basis:** DDD
- **Required links:** Glossary, aggregates, services, integrations
- **Reviewer hint:** DDD Critic, System Architect, Domain Expert
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Bounded Context Map declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Bounded Context Map ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Bounded Context Map defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: bounded contexts | Bounded Context Map addresses `bounded contexts` with enough specificity to guide downstream work, review, and verification. | section covering bounded contexts; owner or accountable role; linked evidence | bounded contexts is generic; bounded contexts lacks evidence; bounded contexts lacks owner |
| 5 | Artifact-specific focus: context relationships | Bounded Context Map addresses `context relationships` with enough specificity to guide downstream work, review, and verification. | section covering context relationships; owner or accountable role; linked evidence | context relationships is generic; context relationships lacks evidence; context relationships lacks owner |
| 6 | Artifact-specific focus: upstream/downstream | Bounded Context Map addresses `upstream/downstream` with enough specificity to guide downstream work, review, and verification. | section covering upstream/downstream; owner or accountable role; linked evidence | upstream/downstream is generic; upstream/downstream lacks evidence; upstream/downstream lacks owner |
| 7 | Artifact-specific focus: translation | Bounded Context Map addresses `translation` with enough specificity to guide downstream work, review, and verification. | section covering translation; owner or accountable role; linked evidence | translation is generic; translation lacks evidence; translation lacks owner |
| 8 | Artifact-specific focus: ownership | Bounded Context Map addresses `ownership` with enough specificity to guide downstream work, review, and verification. | section covering ownership; owner or accountable role; linked evidence | ownership is generic; ownership lacks evidence; ownership lacks owner |
| 9 | Family theme coverage: domain testability | Bounded Context Map handles `domain testability` according to its artifact family obligations. | domain testability section; trace link; review evidence | domain testability omitted; domain testability not traceable; domain testability not reviewable |
| 10 | Standards and method mapping | Bounded Context Map maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Bounded Context Map supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Bounded Context Map records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Bounded Context Map records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Bounded Context Map defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Bounded Context Map has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### DDD-002 Aggregate and Invariant Catalog

- **Construction analog:** Structural/detail invariant and tolerance catalog
- **Basis:** DDD/TDD
- **Required links:** Business rules, tests, code
- **Reviewer hint:** DDD Critic, Test Lead, Implementation Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Aggregate and Invariant Catalog declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Aggregate and Invariant Catalog ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Aggregate and Invariant Catalog defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: aggregates | Aggregate and Invariant Catalog addresses `aggregates` with enough specificity to guide downstream work, review, and verification. | section covering aggregates; owner or accountable role; linked evidence | aggregates is generic; aggregates lacks evidence; aggregates lacks owner |
| 5 | Artifact-specific focus: invariants | Aggregate and Invariant Catalog addresses `invariants` with enough specificity to guide downstream work, review, and verification. | section covering invariants; owner or accountable role; linked evidence | invariants is generic; invariants lacks evidence; invariants lacks owner |
| 6 | Artifact-specific focus: commands | Aggregate and Invariant Catalog addresses `commands` with enough specificity to guide downstream work, review, and verification. | section covering commands; owner or accountable role; linked evidence | commands is generic; commands lacks evidence; commands lacks owner |
| 7 | Artifact-specific focus: events | Aggregate and Invariant Catalog addresses `events` with enough specificity to guide downstream work, review, and verification. | section covering events; owner or accountable role; linked evidence | events is generic; events lacks evidence; events lacks owner |
| 8 | Artifact-specific focus: business-rule tests | Aggregate and Invariant Catalog addresses `business-rule tests` with enough specificity to guide downstream work, review, and verification. | section covering business-rule tests; owner or accountable role; linked evidence | business-rule tests is generic; business-rule tests lacks evidence; business-rule tests lacks owner |
| 9 | Family theme coverage: domain testability | Aggregate and Invariant Catalog handles `domain testability` according to its artifact family obligations. | domain testability section; trace link; review evidence | domain testability omitted; domain testability not traceable; domain testability not reviewable |
| 10 | Standards and method mapping | Aggregate and Invariant Catalog maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Aggregate and Invariant Catalog supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Aggregate and Invariant Catalog records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Aggregate and Invariant Catalog records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Aggregate and Invariant Catalog defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Aggregate and Invariant Catalog has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### DDD-003 Anti-Corruption Layer Plan

- **Construction analog:** Interface isolation plan for external/legacy systems
- **Basis:** DDD integration
- **Required links:** External systems, adapters, contracts
- **Reviewer hint:** DDD Critic, Security Engineer, System Architect
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Anti-Corruption Layer Plan declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Anti-Corruption Layer Plan ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Anti-Corruption Layer Plan defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: external model | Anti-Corruption Layer Plan addresses `external model` with enough specificity to guide downstream work, review, and verification. | section covering external model; owner or accountable role; linked evidence | external model is generic; external model lacks evidence; external model lacks owner |
| 5 | Artifact-specific focus: adapter | Anti-Corruption Layer Plan addresses `adapter` with enough specificity to guide downstream work, review, and verification. | section covering adapter; owner or accountable role; linked evidence | adapter is generic; adapter lacks evidence; adapter lacks owner |
| 6 | Artifact-specific focus: translation rule | Anti-Corruption Layer Plan addresses `translation rule` with enough specificity to guide downstream work, review, and verification. | section covering translation rule; owner or accountable role; linked evidence | translation rule is generic; translation rule lacks evidence; translation rule lacks owner |
| 7 | Artifact-specific focus: contract test | Anti-Corruption Layer Plan addresses `contract test` with enough specificity to guide downstream work, review, and verification. | section covering contract test; owner or accountable role; linked evidence | contract test is generic; contract test lacks evidence; contract test lacks owner |
| 8 | Artifact-specific focus: failure isolation | Anti-Corruption Layer Plan addresses `failure isolation` with enough specificity to guide downstream work, review, and verification. | section covering failure isolation; owner or accountable role; linked evidence | failure isolation is generic; failure isolation lacks evidence; failure isolation lacks owner |
| 9 | Family theme coverage: domain testability | Anti-Corruption Layer Plan handles `domain testability` according to its artifact family obligations. | domain testability section; trace link; review evidence | domain testability omitted; domain testability not traceable; domain testability not reviewable |
| 10 | Standards and method mapping | Anti-Corruption Layer Plan maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Anti-Corruption Layer Plan supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Anti-Corruption Layer Plan records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Anti-Corruption Layer Plan records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Anti-Corruption Layer Plan defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Anti-Corruption Layer Plan has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |


## Construction Execution Package

### IMP-001 Implementation Plan

- **Construction analog:** Construction execution plan
- **Basis:** ISO implementation, Agile sprint planning
- **Required links:** Requirements, components, tasks
- **Reviewer hint:** Implementation Lead, Delivery Manager, Test Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Implementation Plan declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Implementation Plan ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Implementation Plan defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: work packages | Implementation Plan addresses `work packages` with enough specificity to guide downstream work, review, and verification. | section covering work packages; owner or accountable role; linked evidence | work packages is generic; work packages lacks evidence; work packages lacks owner |
| 5 | Artifact-specific focus: sequencing | Implementation Plan addresses `sequencing` with enough specificity to guide downstream work, review, and verification. | section covering sequencing; owner or accountable role; linked evidence | sequencing is generic; sequencing lacks evidence; sequencing lacks owner |
| 6 | Artifact-specific focus: dependencies | Implementation Plan addresses `dependencies` with enough specificity to guide downstream work, review, and verification. | section covering dependencies; owner or accountable role; linked evidence | dependencies is generic; dependencies lacks evidence; dependencies lacks owner |
| 7 | Artifact-specific focus: token estimate | Implementation Plan addresses `token estimate` with enough specificity to guide downstream work, review, and verification. | section covering token estimate; owner or accountable role; linked evidence | token estimate is generic; token estimate lacks evidence; token estimate lacks owner |
| 8 | Artifact-specific focus: definition of done | Implementation Plan addresses `definition of done` with enough specificity to guide downstream work, review, and verification. | section covering definition of done; owner or accountable role; linked evidence | definition of done is generic; definition of done lacks evidence; definition of done lacks owner |
| 9 | Family theme coverage: maintainability | Implementation Plan handles `maintainability` according to its artifact family obligations. | maintainability section; trace link; review evidence | maintainability omitted; maintainability not traceable; maintainability not reviewable |
| 10 | Standards and method mapping | Implementation Plan maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Implementation Plan supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Implementation Plan records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Implementation Plan records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Implementation Plan defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Implementation Plan has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### IMP-002 Code Change Set

- **Construction analog:** Installed work package / change set
- **Basis:** Source control
- **Required links:** Requirements, designs, tests, reviews
- **Reviewer hint:** Implementation Lead, Test Lead, Security Engineer
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Code Change Set declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Code Change Set ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Code Change Set defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: changed files | Code Change Set addresses `changed files` with enough specificity to guide downstream work, review, and verification. | section covering changed files; owner or accountable role; linked evidence | changed files is generic; changed files lacks evidence; changed files lacks owner |
| 5 | Artifact-specific focus: behavior change | Code Change Set addresses `behavior change` with enough specificity to guide downstream work, review, and verification. | section covering behavior change; owner or accountable role; linked evidence | behavior change is generic; behavior change lacks evidence; behavior change lacks owner |
| 6 | Artifact-specific focus: tests | Code Change Set addresses `tests` with enough specificity to guide downstream work, review, and verification. | section covering tests; owner or accountable role; linked evidence | tests is generic; tests lacks evidence; tests lacks owner |
| 7 | Artifact-specific focus: review findings | Code Change Set addresses `review findings` with enough specificity to guide downstream work, review, and verification. | section covering review findings; owner or accountable role; linked evidence | review findings is generic; review findings lacks evidence; review findings lacks owner |
| 8 | Artifact-specific focus: security impact | Code Change Set addresses `security impact` with enough specificity to guide downstream work, review, and verification. | section covering security impact; owner or accountable role; linked evidence | security impact is generic; security impact lacks evidence; security impact lacks owner |
| 9 | Family theme coverage: maintainability | Code Change Set handles `maintainability` according to its artifact family obligations. | maintainability section; trace link; review evidence | maintainability omitted; maintainability not traceable; maintainability not reviewable |
| 10 | Standards and method mapping | Code Change Set maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Code Change Set supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Code Change Set records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Code Change Set records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Code Change Set defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Code Change Set has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### IMP-003 Build and Dependency Manifest

- **Construction analog:** Materials, suppliers, and build manifest
- **Basis:** SSDF, supply chain
- **Required links:** SBOM, lockfiles, build logs
- **Reviewer hint:** Security Engineer, SRE Lead, Implementation Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Build and Dependency Manifest declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Build and Dependency Manifest ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Build and Dependency Manifest defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: dependencies | Build and Dependency Manifest addresses `dependencies` with enough specificity to guide downstream work, review, and verification. | section covering dependencies; owner or accountable role; linked evidence | dependencies is generic; dependencies lacks evidence; dependencies lacks owner |
| 5 | Artifact-specific focus: lockfiles | Build and Dependency Manifest addresses `lockfiles` with enough specificity to guide downstream work, review, and verification. | section covering lockfiles; owner or accountable role; linked evidence | lockfiles is generic; lockfiles lacks evidence; lockfiles lacks owner |
| 6 | Artifact-specific focus: SBOM | Build and Dependency Manifest addresses `SBOM` with enough specificity to guide downstream work, review, and verification. | section covering SBOM; owner or accountable role; linked evidence | SBOM is generic; SBOM lacks evidence; SBOM lacks owner |
| 7 | Artifact-specific focus: build logs | Build and Dependency Manifest addresses `build logs` with enough specificity to guide downstream work, review, and verification. | section covering build logs; owner or accountable role; linked evidence | build logs is generic; build logs lacks evidence; build logs lacks owner |
| 8 | Artifact-specific focus: license/security checks | Build and Dependency Manifest addresses `license/security checks` with enough specificity to guide downstream work, review, and verification. | section covering license/security checks; owner or accountable role; linked evidence | license/security checks is generic; license/security checks lacks evidence; license/security checks lacks owner |
| 9 | Family theme coverage: maintainability | Build and Dependency Manifest handles `maintainability` according to its artifact family obligations. | maintainability section; trace link; review evidence | maintainability omitted; maintainability not traceable; maintainability not reviewable |
| 10 | Standards and method mapping | Build and Dependency Manifest maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Build and Dependency Manifest supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Build and Dependency Manifest records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Build and Dependency Manifest records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Build and Dependency Manifest defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Build and Dependency Manifest has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### IMP-004 Configuration and Environment Spec

- **Construction analog:** Temporary works, site environment, and configuration spec
- **Basis:** DevOps/SRE
- **Required links:** Deploy targets, secrets policy, config tests
- **Reviewer hint:** SRE Lead, Security Engineer, Implementation Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Configuration and Environment Spec declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Configuration and Environment Spec ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Configuration and Environment Spec defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: environments | Configuration and Environment Spec addresses `environments` with enough specificity to guide downstream work, review, and verification. | section covering environments; owner or accountable role; linked evidence | environments is generic; environments lacks evidence; environments lacks owner |
| 5 | Artifact-specific focus: configuration keys | Configuration and Environment Spec addresses `configuration keys` with enough specificity to guide downstream work, review, and verification. | section covering configuration keys; owner or accountable role; linked evidence | configuration keys is generic; configuration keys lacks evidence; configuration keys lacks owner |
| 6 | Artifact-specific focus: secrets policy | Configuration and Environment Spec addresses `secrets policy` with enough specificity to guide downstream work, review, and verification. | section covering secrets policy; owner or accountable role; linked evidence | secrets policy is generic; secrets policy lacks evidence; secrets policy lacks owner |
| 7 | Artifact-specific focus: validation | Configuration and Environment Spec addresses `validation` with enough specificity to guide downstream work, review, and verification. | section covering validation; owner or accountable role; linked evidence | validation is generic; validation lacks evidence; validation lacks owner |
| 8 | Artifact-specific focus: drift control | Configuration and Environment Spec addresses `drift control` with enough specificity to guide downstream work, review, and verification. | section covering drift control; owner or accountable role; linked evidence | drift control is generic; drift control lacks evidence; drift control lacks owner |
| 9 | Family theme coverage: maintainability | Configuration and Environment Spec handles `maintainability` according to its artifact family obligations. | maintainability section; trace link; review evidence | maintainability omitted; maintainability not traceable; maintainability not reviewable |
| 10 | Standards and method mapping | Configuration and Environment Spec maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Configuration and Environment Spec supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Configuration and Environment Spec records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Configuration and Environment Spec records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Configuration and Environment Spec defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Configuration and Environment Spec has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### IMP-005 Migration and Backout Plan

- **Construction analog:** Cutover, migration, and backout plan
- **Basis:** Release/SRE
- **Required links:** Data model, deployment, rollback
- **Reviewer hint:** Data Architect, SRE Lead, Test Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Migration and Backout Plan declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Migration and Backout Plan ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Migration and Backout Plan defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: migration runbook | Migration and Backout Plan addresses `migration runbook` with enough specificity to guide downstream work, review, and verification. | section covering migration runbook; owner or accountable role; linked evidence | migration runbook is generic; migration runbook lacks evidence; migration runbook lacks owner |
| 5 | Artifact-specific focus: dry run | Migration and Backout Plan addresses `dry run` with enough specificity to guide downstream work, review, and verification. | section covering dry run; owner or accountable role; linked evidence | dry run is generic; dry run lacks evidence; dry run lacks owner |
| 6 | Artifact-specific focus: validation query | Migration and Backout Plan addresses `validation query` with enough specificity to guide downstream work, review, and verification. | section covering validation query; owner or accountable role; linked evidence | validation query is generic; validation query lacks evidence; validation query lacks owner |
| 7 | Artifact-specific focus: rollback | Migration and Backout Plan addresses `rollback` with enough specificity to guide downstream work, review, and verification. | section covering rollback; owner or accountable role; linked evidence | rollback is generic; rollback lacks evidence; rollback lacks owner |
| 8 | Artifact-specific focus: cutover window | Migration and Backout Plan addresses `cutover window` with enough specificity to guide downstream work, review, and verification. | section covering cutover window; owner or accountable role; linked evidence | cutover window is generic; cutover window lacks evidence; cutover window lacks owner |
| 9 | Family theme coverage: maintainability | Migration and Backout Plan handles `maintainability` according to its artifact family obligations. | maintainability section; trace link; review evidence | maintainability omitted; maintainability not traceable; maintainability not reviewable |
| 10 | Standards and method mapping | Migration and Backout Plan maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Migration and Backout Plan supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Migration and Backout Plan records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Migration and Backout Plan records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Migration and Backout Plan defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Migration and Backout Plan has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |


## Inspection and Commissioning

### VNV-001 Master Test Strategy

- **Construction analog:** Master inspection and commissioning strategy
- **Basis:** ISO verification/validation, TDD/BDD
- **Required links:** Requirements, risks, coverage targets
- **Reviewer hint:** Test Lead, Product Expert, Security Engineer
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Master Test Strategy declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Master Test Strategy ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Master Test Strategy defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: test levels | Master Test Strategy addresses `test levels` with enough specificity to guide downstream work, review, and verification. | section covering test levels; owner or accountable role; linked evidence | test levels is generic; test levels lacks evidence; test levels lacks owner |
| 5 | Artifact-specific focus: risk coverage | Master Test Strategy addresses `risk coverage` with enough specificity to guide downstream work, review, and verification. | section covering risk coverage; owner or accountable role; linked evidence | risk coverage is generic; risk coverage lacks evidence; risk coverage lacks owner |
| 6 | Artifact-specific focus: automation strategy | Master Test Strategy addresses `automation strategy` with enough specificity to guide downstream work, review, and verification. | section covering automation strategy; owner or accountable role; linked evidence | automation strategy is generic; automation strategy lacks evidence; automation strategy lacks owner |
| 7 | Artifact-specific focus: manual checks | Master Test Strategy addresses `manual checks` with enough specificity to guide downstream work, review, and verification. | section covering manual checks; owner or accountable role; linked evidence | manual checks is generic; manual checks lacks evidence; manual checks lacks owner |
| 8 | Artifact-specific focus: exit criteria | Master Test Strategy addresses `exit criteria` with enough specificity to guide downstream work, review, and verification. | section covering exit criteria; owner or accountable role; linked evidence | exit criteria is generic; exit criteria lacks evidence; exit criteria lacks owner |
| 9 | Family theme coverage: exit decision | Master Test Strategy handles `exit decision` according to its artifact family obligations. | exit decision section; trace link; review evidence | exit decision omitted; exit decision not traceable; exit decision not reviewable |
| 10 | Standards and method mapping | Master Test Strategy maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Master Test Strategy supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Master Test Strategy records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Master Test Strategy records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Master Test Strategy defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Master Test Strategy has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### VNV-002 Test Cases and Procedures

- **Construction analog:** Inspection checklists and test procedures
- **Basis:** ISO/IEEE-style test docs
- **Required links:** Requirements, code paths, scenarios
- **Reviewer hint:** Test Lead, Domain Expert, Implementation Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Test Cases and Procedures declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Test Cases and Procedures ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Test Cases and Procedures defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: preconditions | Test Cases and Procedures addresses `preconditions` with enough specificity to guide downstream work, review, and verification. | section covering preconditions; owner or accountable role; linked evidence | preconditions is generic; preconditions lacks evidence; preconditions lacks owner |
| 5 | Artifact-specific focus: test steps | Test Cases and Procedures addresses `test steps` with enough specificity to guide downstream work, review, and verification. | section covering test steps; owner or accountable role; linked evidence | test steps is generic; test steps lacks evidence; test steps lacks owner |
| 6 | Artifact-specific focus: expected results | Test Cases and Procedures addresses `expected results` with enough specificity to guide downstream work, review, and verification. | section covering expected results; owner or accountable role; linked evidence | expected results is generic; expected results lacks evidence; expected results lacks owner |
| 7 | Artifact-specific focus: test data | Test Cases and Procedures addresses `test data` with enough specificity to guide downstream work, review, and verification. | section covering test data; owner or accountable role; linked evidence | test data is generic; test data lacks evidence; test data lacks owner |
| 8 | Artifact-specific focus: rerun notes | Test Cases and Procedures addresses `rerun notes` with enough specificity to guide downstream work, review, and verification. | section covering rerun notes; owner or accountable role; linked evidence | rerun notes is generic; rerun notes lacks evidence; rerun notes lacks owner |
| 9 | Family theme coverage: exit decision | Test Cases and Procedures handles `exit decision` according to its artifact family obligations. | exit decision section; trace link; review evidence | exit decision omitted; exit decision not traceable; exit decision not reviewable |
| 10 | Standards and method mapping | Test Cases and Procedures maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Test Cases and Procedures supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Test Cases and Procedures records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Test Cases and Procedures records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Test Cases and Procedures defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Test Cases and Procedures has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### VNV-003 Automated Test Evidence

- **Construction analog:** Inspection/test evidence and signoff package
- **Basis:** TDD/CI
- **Required links:** Test cases, code, build results
- **Reviewer hint:** Test Lead, Implementation Lead, Quality Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Automated Test Evidence declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Automated Test Evidence ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Automated Test Evidence defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: execution logs | Automated Test Evidence addresses `execution logs` with enough specificity to guide downstream work, review, and verification. | section covering execution logs; owner or accountable role; linked evidence | execution logs is generic; execution logs lacks evidence; execution logs lacks owner |
| 5 | Artifact-specific focus: CI run | Automated Test Evidence addresses `CI run` with enough specificity to guide downstream work, review, and verification. | section covering CI run; owner or accountable role; linked evidence | CI run is generic; CI run lacks evidence; CI run lacks owner |
| 6 | Artifact-specific focus: coverage | Automated Test Evidence addresses `coverage` with enough specificity to guide downstream work, review, and verification. | section covering coverage; owner or accountable role; linked evidence | coverage is generic; coverage lacks evidence; coverage lacks owner |
| 7 | Artifact-specific focus: flake analysis | Automated Test Evidence addresses `flake analysis` with enough specificity to guide downstream work, review, and verification. | section covering flake analysis; owner or accountable role; linked evidence | flake analysis is generic; flake analysis lacks evidence; flake analysis lacks owner |
| 8 | Artifact-specific focus: failure triage | Automated Test Evidence addresses `failure triage` with enough specificity to guide downstream work, review, and verification. | section covering failure triage; owner or accountable role; linked evidence | failure triage is generic; failure triage lacks evidence; failure triage lacks owner |
| 9 | Family theme coverage: exit decision | Automated Test Evidence handles `exit decision` according to its artifact family obligations. | exit decision section; trace link; review evidence | exit decision omitted; exit decision not traceable; exit decision not reviewable |
| 10 | Standards and method mapping | Automated Test Evidence maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Automated Test Evidence supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Automated Test Evidence records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Automated Test Evidence records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Automated Test Evidence defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Automated Test Evidence has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### VNV-004 Holdout Scenario Report

- **Construction analog:** Independent holdout inspection scenario report
- **Basis:** Dark factory validation
- **Required links:** Acceptance criteria, runtime logs, scores
- **Reviewer hint:** QA Lead, Product Expert, Governance Auditor
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Holdout Scenario Report declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Holdout Scenario Report ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Holdout Scenario Report defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: hidden scenario | Holdout Scenario Report addresses `hidden scenario` with enough specificity to guide downstream work, review, and verification. | section covering hidden scenario; owner or accountable role; linked evidence | hidden scenario is generic; hidden scenario lacks evidence; hidden scenario lacks owner |
| 5 | Artifact-specific focus: anti-gaming | Holdout Scenario Report addresses `anti-gaming` with enough specificity to guide downstream work, review, and verification. | section covering anti-gaming; owner or accountable role; linked evidence | anti-gaming is generic; anti-gaming lacks evidence; anti-gaming lacks owner |
| 6 | Artifact-specific focus: transfer test | Holdout Scenario Report addresses `transfer test` with enough specificity to guide downstream work, review, and verification. | section covering transfer test; owner or accountable role; linked evidence | transfer test is generic; transfer test lacks evidence; transfer test lacks owner |
| 7 | Artifact-specific focus: score | Holdout Scenario Report addresses `score` with enough specificity to guide downstream work, review, and verification. | section covering score; owner or accountable role; linked evidence | score is generic; score lacks evidence; score lacks owner |
| 8 | Artifact-specific focus: claim supported | Holdout Scenario Report addresses `claim supported` with enough specificity to guide downstream work, review, and verification. | section covering claim supported; owner or accountable role; linked evidence | claim supported is generic; claim supported lacks evidence; claim supported lacks owner |
| 9 | Family theme coverage: exit decision | Holdout Scenario Report handles `exit decision` according to its artifact family obligations. | exit decision section; trace link; review evidence | exit decision omitted; exit decision not traceable; exit decision not reviewable |
| 10 | Standards and method mapping | Holdout Scenario Report maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Holdout Scenario Report supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Holdout Scenario Report records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Holdout Scenario Report records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Holdout Scenario Report defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Holdout Scenario Report has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### VNV-005 Security Test Report

- **Construction analog:** Security and life-safety test report
- **Basis:** SSDF, OWASP SAMM
- **Required links:** Threats, findings, mitigations
- **Reviewer hint:** Security Engineer, Test Lead, Governance Auditor
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Security Test Report declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Security Test Report ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Security Test Report defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: security test scope | Security Test Report addresses `security test scope` with enough specificity to guide downstream work, review, and verification. | section covering security test scope; owner or accountable role; linked evidence | security test scope is generic; security test scope lacks evidence; security test scope lacks owner |
| 5 | Artifact-specific focus: findings | Security Test Report addresses `findings` with enough specificity to guide downstream work, review, and verification. | section covering findings; owner or accountable role; linked evidence | findings is generic; findings lacks evidence; findings lacks owner |
| 6 | Artifact-specific focus: severity | Security Test Report addresses `severity` with enough specificity to guide downstream work, review, and verification. | section covering severity; owner or accountable role; linked evidence | severity is generic; severity lacks evidence; severity lacks owner |
| 7 | Artifact-specific focus: retest | Security Test Report addresses `retest` with enough specificity to guide downstream work, review, and verification. | section covering retest; owner or accountable role; linked evidence | retest is generic; retest lacks evidence; retest lacks owner |
| 8 | Artifact-specific focus: residual risk | Security Test Report addresses `residual risk` with enough specificity to guide downstream work, review, and verification. | section covering residual risk; owner or accountable role; linked evidence | residual risk is generic; residual risk lacks evidence; residual risk lacks owner |
| 9 | Family theme coverage: exit decision | Security Test Report handles `exit decision` according to its artifact family obligations. | exit decision section; trace link; review evidence | exit decision omitted; exit decision not traceable; exit decision not reviewable |
| 10 | Standards and method mapping | Security Test Report maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Security Test Report supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Security Test Report records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Security Test Report records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Security Test Report defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Security Test Report has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### VNV-006 Performance/Reliability Report

- **Construction analog:** Load, reliability, and performance commissioning report
- **Basis:** SRE/NFR
- **Required links:** NFRs, SLIs, capacity assumptions
- **Reviewer hint:** SRE Lead, Test Lead, System Architect
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Performance/Reliability Report declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Performance/Reliability Report ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Performance/Reliability Report defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: load model | Performance/Reliability Report addresses `load model` with enough specificity to guide downstream work, review, and verification. | section covering load model; owner or accountable role; linked evidence | load model is generic; load model lacks evidence; load model lacks owner |
| 5 | Artifact-specific focus: SLI results | Performance/Reliability Report addresses `SLI results` with enough specificity to guide downstream work, review, and verification. | section covering SLI results; owner or accountable role; linked evidence | SLI results is generic; SLI results lacks evidence; SLI results lacks owner |
| 6 | Artifact-specific focus: capacity | Performance/Reliability Report addresses `capacity` with enough specificity to guide downstream work, review, and verification. | section covering capacity; owner or accountable role; linked evidence | capacity is generic; capacity lacks evidence; capacity lacks owner |
| 7 | Artifact-specific focus: bottlenecks | Performance/Reliability Report addresses `bottlenecks` with enough specificity to guide downstream work, review, and verification. | section covering bottlenecks; owner or accountable role; linked evidence | bottlenecks is generic; bottlenecks lacks evidence; bottlenecks lacks owner |
| 8 | Artifact-specific focus: reliability decision | Performance/Reliability Report addresses `reliability decision` with enough specificity to guide downstream work, review, and verification. | section covering reliability decision; owner or accountable role; linked evidence | reliability decision is generic; reliability decision lacks evidence; reliability decision lacks owner |
| 9 | Family theme coverage: exit decision | Performance/Reliability Report handles `exit decision` according to its artifact family obligations. | exit decision section; trace link; review evidence | exit decision omitted; exit decision not traceable; exit decision not reviewable |
| 10 | Standards and method mapping | Performance/Reliability Report maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Performance/Reliability Report supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Performance/Reliability Report records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Performance/Reliability Report records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Performance/Reliability Report defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Performance/Reliability Report has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### VNV-007 Accessibility/UX Validation

- **Construction analog:** Accessibility and usability inspection report
- **Basis:** Product quality
- **Required links:** User journeys, acceptance criteria
- **Reviewer hint:** UX Expert, Product Expert, Test Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Accessibility/UX Validation declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Accessibility/UX Validation ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Accessibility/UX Validation defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: keyboard access | Accessibility/UX Validation addresses `keyboard access` with enough specificity to guide downstream work, review, and verification. | section covering keyboard access; owner or accountable role; linked evidence | keyboard access is generic; keyboard access lacks evidence; keyboard access lacks owner |
| 5 | Artifact-specific focus: screen reader | Accessibility/UX Validation addresses `screen reader` with enough specificity to guide downstream work, review, and verification. | section covering screen reader; owner or accountable role; linked evidence | screen reader is generic; screen reader lacks evidence; screen reader lacks owner |
| 6 | Artifact-specific focus: contrast | Accessibility/UX Validation addresses `contrast` with enough specificity to guide downstream work, review, and verification. | section covering contrast; owner or accountable role; linked evidence | contrast is generic; contrast lacks evidence; contrast lacks owner |
| 7 | Artifact-specific focus: task completion | Accessibility/UX Validation addresses `task completion` with enough specificity to guide downstream work, review, and verification. | section covering task completion; owner or accountable role; linked evidence | task completion is generic; task completion lacks evidence; task completion lacks owner |
| 8 | Artifact-specific focus: state coverage | Accessibility/UX Validation addresses `state coverage` with enough specificity to guide downstream work, review, and verification. | section covering state coverage; owner or accountable role; linked evidence | state coverage is generic; state coverage lacks evidence; state coverage lacks owner |
| 9 | Family theme coverage: exit decision | Accessibility/UX Validation handles `exit decision` according to its artifact family obligations. | exit decision section; trace link; review evidence | exit decision omitted; exit decision not traceable; exit decision not reviewable |
| 10 | Standards and method mapping | Accessibility/UX Validation maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Accessibility/UX Validation supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Accessibility/UX Validation records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Accessibility/UX Validation records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Accessibility/UX Validation defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Accessibility/UX Validation has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |


## Handover, Operations, and Maintenance

### REL-001 Release Plan

- **Construction analog:** Move-in / occupancy release plan
- **Basis:** RUP transition, DevOps
- **Required links:** Change set, risks, deployment steps
- **Reviewer hint:** Release Manager, SRE Lead, Product Owner
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Release Plan declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Release Plan ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Release Plan defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: release scope | Release Plan addresses `release scope` with enough specificity to guide downstream work, review, and verification. | section covering release scope; owner or accountable role; linked evidence | release scope is generic; release scope lacks evidence; release scope lacks owner |
| 5 | Artifact-specific focus: go/no-go | Release Plan addresses `go/no-go` with enough specificity to guide downstream work, review, and verification. | section covering go/no-go; owner or accountable role; linked evidence | go/no-go is generic; go/no-go lacks evidence; go/no-go lacks owner |
| 6 | Artifact-specific focus: deployment sequence | Release Plan addresses `deployment sequence` with enough specificity to guide downstream work, review, and verification. | section covering deployment sequence; owner or accountable role; linked evidence | deployment sequence is generic; deployment sequence lacks evidence; deployment sequence lacks owner |
| 7 | Artifact-specific focus: rollback | Release Plan addresses `rollback` with enough specificity to guide downstream work, review, and verification. | section covering rollback; owner or accountable role; linked evidence | rollback is generic; rollback lacks evidence; rollback lacks owner |
| 8 | Artifact-specific focus: communication | Release Plan addresses `communication` with enough specificity to guide downstream work, review, and verification. | section covering communication; owner or accountable role; linked evidence | communication is generic; communication lacks evidence; communication lacks owner |
| 9 | Family theme coverage: post-release learning | Release Plan handles `post-release learning` according to its artifact family obligations. | post-release learning section; trace link; review evidence | post-release learning omitted; post-release learning not traceable; post-release learning not reviewable |
| 10 | Standards and method mapping | Release Plan maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Release Plan supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Release Plan records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Release Plan records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Release Plan defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Release Plan has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### REL-002 Release Notes

- **Construction analog:** Owner release notes and known-issue bulletin
- **Basis:** Handoff practice
- **Required links:** Features, fixes, risks, known issues
- **Reviewer hint:** Product Expert, Release Manager, Support Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Release Notes declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Release Notes ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Release Notes defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: user-facing changes | Release Notes addresses `user-facing changes` with enough specificity to guide downstream work, review, and verification. | section covering user-facing changes; owner or accountable role; linked evidence | user-facing changes is generic; user-facing changes lacks evidence; user-facing changes lacks owner |
| 5 | Artifact-specific focus: known issues | Release Notes addresses `known issues` with enough specificity to guide downstream work, review, and verification. | section covering known issues; owner or accountable role; linked evidence | known issues is generic; known issues lacks evidence; known issues lacks owner |
| 6 | Artifact-specific focus: upgrade notes | Release Notes addresses `upgrade notes` with enough specificity to guide downstream work, review, and verification. | section covering upgrade notes; owner or accountable role; linked evidence | upgrade notes is generic; upgrade notes lacks evidence; upgrade notes lacks owner |
| 7 | Artifact-specific focus: support impact | Release Notes addresses `support impact` with enough specificity to guide downstream work, review, and verification. | section covering support impact; owner or accountable role; linked evidence | support impact is generic; support impact lacks evidence; support impact lacks owner |
| 8 | Artifact-specific focus: risk notes | Release Notes addresses `risk notes` with enough specificity to guide downstream work, review, and verification. | section covering risk notes; owner or accountable role; linked evidence | risk notes is generic; risk notes lacks evidence; risk notes lacks owner |
| 9 | Family theme coverage: post-release learning | Release Notes handles `post-release learning` according to its artifact family obligations. | post-release learning section; trace link; review evidence | post-release learning omitted; post-release learning not traceable; post-release learning not reviewable |
| 10 | Standards and method mapping | Release Notes maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Release Notes supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Release Notes records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Release Notes records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Release Notes defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Release Notes has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### REL-003 Deployment Guide

- **Construction analog:** Deployment / installation guide
- **Basis:** SRE/operations
- **Required links:** Environments, config, rollback
- **Reviewer hint:** SRE Lead, Security Engineer, Release Manager
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Deployment Guide declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Deployment Guide ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Deployment Guide defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: deployment steps | Deployment Guide addresses `deployment steps` with enough specificity to guide downstream work, review, and verification. | section covering deployment steps; owner or accountable role; linked evidence | deployment steps is generic; deployment steps lacks evidence; deployment steps lacks owner |
| 5 | Artifact-specific focus: prechecks | Deployment Guide addresses `prechecks` with enough specificity to guide downstream work, review, and verification. | section covering prechecks; owner or accountable role; linked evidence | prechecks is generic; prechecks lacks evidence; prechecks lacks owner |
| 6 | Artifact-specific focus: postchecks | Deployment Guide addresses `postchecks` with enough specificity to guide downstream work, review, and verification. | section covering postchecks; owner or accountable role; linked evidence | postchecks is generic; postchecks lacks evidence; postchecks lacks owner |
| 7 | Artifact-specific focus: rollback | Deployment Guide addresses `rollback` with enough specificity to guide downstream work, review, and verification. | section covering rollback; owner or accountable role; linked evidence | rollback is generic; rollback lacks evidence; rollback lacks owner |
| 8 | Artifact-specific focus: ownership | Deployment Guide addresses `ownership` with enough specificity to guide downstream work, review, and verification. | section covering ownership; owner or accountable role; linked evidence | ownership is generic; ownership lacks evidence; ownership lacks owner |
| 9 | Family theme coverage: post-release learning | Deployment Guide handles `post-release learning` according to its artifact family obligations. | post-release learning section; trace link; review evidence | post-release learning omitted; post-release learning not traceable; post-release learning not reviewable |
| 10 | Standards and method mapping | Deployment Guide maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Deployment Guide supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Deployment Guide records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Deployment Guide records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Deployment Guide defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Deployment Guide has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### REL-004 Operations Runbook

- **Construction analog:** Operations and facilities runbook
- **Basis:** SRE
- **Required links:** Alerts, dashboards, procedures, owners
- **Reviewer hint:** SRE Lead, Support Lead, Security Engineer
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Operations Runbook declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Operations Runbook ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Operations Runbook defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: alert response | Operations Runbook addresses `alert response` with enough specificity to guide downstream work, review, and verification. | section covering alert response; owner or accountable role; linked evidence | alert response is generic; alert response lacks evidence; alert response lacks owner |
| 5 | Artifact-specific focus: dashboard | Operations Runbook addresses `dashboard` with enough specificity to guide downstream work, review, and verification. | section covering dashboard; owner or accountable role; linked evidence | dashboard is generic; dashboard lacks evidence; dashboard lacks owner |
| 6 | Artifact-specific focus: diagnosis | Operations Runbook addresses `diagnosis` with enough specificity to guide downstream work, review, and verification. | section covering diagnosis; owner or accountable role; linked evidence | diagnosis is generic; diagnosis lacks evidence; diagnosis lacks owner |
| 7 | Artifact-specific focus: mitigation | Operations Runbook addresses `mitigation` with enough specificity to guide downstream work, review, and verification. | section covering mitigation; owner or accountable role; linked evidence | mitigation is generic; mitigation lacks evidence; mitigation lacks owner |
| 8 | Artifact-specific focus: escalation | Operations Runbook addresses `escalation` with enough specificity to guide downstream work, review, and verification. | section covering escalation; owner or accountable role; linked evidence | escalation is generic; escalation lacks evidence; escalation lacks owner |
| 9 | Family theme coverage: post-release learning | Operations Runbook handles `post-release learning` according to its artifact family obligations. | post-release learning section; trace link; review evidence | post-release learning omitted; post-release learning not traceable; post-release learning not reviewable |
| 10 | Standards and method mapping | Operations Runbook maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Operations Runbook supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Operations Runbook records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Operations Runbook records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Operations Runbook defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Operations Runbook has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### REL-005 Incident Response Guide

- **Construction analog:** Emergency response and incident guide
- **Basis:** SRE/security
- **Required links:** Failure modes, rollback, escalation
- **Reviewer hint:** SRE Lead, Security Engineer, Human Owner
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Incident Response Guide declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Incident Response Guide ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Incident Response Guide defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: severity | Incident Response Guide addresses `severity` with enough specificity to guide downstream work, review, and verification. | section covering severity; owner or accountable role; linked evidence | severity is generic; severity lacks evidence; severity lacks owner |
| 5 | Artifact-specific focus: incident roles | Incident Response Guide addresses `incident roles` with enough specificity to guide downstream work, review, and verification. | section covering incident roles; owner or accountable role; linked evidence | incident roles is generic; incident roles lacks evidence; incident roles lacks owner |
| 6 | Artifact-specific focus: containment | Incident Response Guide addresses `containment` with enough specificity to guide downstream work, review, and verification. | section covering containment; owner or accountable role; linked evidence | containment is generic; containment lacks evidence; containment lacks owner |
| 7 | Artifact-specific focus: communications | Incident Response Guide addresses `communications` with enough specificity to guide downstream work, review, and verification. | section covering communications; owner or accountable role; linked evidence | communications is generic; communications lacks evidence; communications lacks owner |
| 8 | Artifact-specific focus: post-incident review | Incident Response Guide addresses `post-incident review` with enough specificity to guide downstream work, review, and verification. | section covering post-incident review; owner or accountable role; linked evidence | post-incident review is generic; post-incident review lacks evidence; post-incident review lacks owner |
| 9 | Family theme coverage: post-release learning | Incident Response Guide handles `post-release learning` according to its artifact family obligations. | post-release learning section; trace link; review evidence | post-release learning omitted; post-release learning not traceable; post-release learning not reviewable |
| 10 | Standards and method mapping | Incident Response Guide maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Incident Response Guide supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Incident Response Guide records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Incident Response Guide records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Incident Response Guide defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Incident Response Guide has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### REL-006 Maintenance Guide

- **Construction analog:** Maintenance and repair manual
- **Basis:** ISO maintenance
- **Required links:** Code map, common changes, tests
- **Reviewer hint:** Brownfield Maintainer, Implementation Lead, SRE Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Maintenance Guide declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Maintenance Guide ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Maintenance Guide defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: code map | Maintenance Guide addresses `code map` with enough specificity to guide downstream work, review, and verification. | section covering code map; owner or accountable role; linked evidence | code map is generic; code map lacks evidence; code map lacks owner |
| 5 | Artifact-specific focus: common changes | Maintenance Guide addresses `common changes` with enough specificity to guide downstream work, review, and verification. | section covering common changes; owner or accountable role; linked evidence | common changes is generic; common changes lacks evidence; common changes lacks owner |
| 6 | Artifact-specific focus: regression commands | Maintenance Guide addresses `regression commands` with enough specificity to guide downstream work, review, and verification. | section covering regression commands; owner or accountable role; linked evidence | regression commands is generic; regression commands lacks evidence; regression commands lacks owner |
| 7 | Artifact-specific focus: operational tasks | Maintenance Guide addresses `operational tasks` with enough specificity to guide downstream work, review, and verification. | section covering operational tasks; owner or accountable role; linked evidence | operational tasks is generic; operational tasks lacks evidence; operational tasks lacks owner |
| 8 | Artifact-specific focus: maintenance risks | Maintenance Guide addresses `maintenance risks` with enough specificity to guide downstream work, review, and verification. | section covering maintenance risks; owner or accountable role; linked evidence | maintenance risks is generic; maintenance risks lacks evidence; maintenance risks lacks owner |
| 9 | Family theme coverage: post-release learning | Maintenance Guide handles `post-release learning` according to its artifact family obligations. | post-release learning section; trace link; review evidence | post-release learning omitted; post-release learning not traceable; post-release learning not reviewable |
| 10 | Standards and method mapping | Maintenance Guide maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Maintenance Guide supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Maintenance Guide records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Maintenance Guide records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Maintenance Guide defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Maintenance Guide has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### REL-007 Human Training Package

- **Construction analog:** Owner/operator training package
- **Basis:** Outsourcing handoff
- **Required links:** Project book, runbooks, walkthroughs
- **Reviewer hint:** Human Owner, Support Lead, Product Expert
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Human Training Package declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Human Training Package ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Human Training Package defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: training goals | Human Training Package addresses `training goals` with enough specificity to guide downstream work, review, and verification. | section covering training goals; owner or accountable role; linked evidence | training goals is generic; training goals lacks evidence; training goals lacks owner |
| 5 | Artifact-specific focus: walkthrough | Human Training Package addresses `walkthrough` with enough specificity to guide downstream work, review, and verification. | section covering walkthrough; owner or accountable role; linked evidence | walkthrough is generic; walkthrough lacks evidence; walkthrough lacks owner |
| 6 | Artifact-specific focus: exercises | Human Training Package addresses `exercises` with enough specificity to guide downstream work, review, and verification. | section covering exercises; owner or accountable role; linked evidence | exercises is generic; exercises lacks evidence; exercises lacks owner |
| 7 | Artifact-specific focus: comprehension checks | Human Training Package addresses `comprehension checks` with enough specificity to guide downstream work, review, and verification. | section covering comprehension checks; owner or accountable role; linked evidence | comprehension checks is generic; comprehension checks lacks evidence; comprehension checks lacks owner |
| 8 | Artifact-specific focus: signoff | Human Training Package addresses `signoff` with enough specificity to guide downstream work, review, and verification. | section covering signoff; owner or accountable role; linked evidence | signoff is generic; signoff lacks evidence; signoff lacks owner |
| 9 | Family theme coverage: post-release learning | Human Training Package handles `post-release learning` according to its artifact family obligations. | post-release learning section; trace link; review evidence | post-release learning omitted; post-release learning not traceable; post-release learning not reviewable |
| 10 | Standards and method mapping | Human Training Package maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Human Training Package supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Human Training Package records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Human Training Package records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Human Training Package defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Human Training Package has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### REL-008 Outage Drill and Operator Readiness Record

- **Construction analog:** Emergency drill and operator readiness record
- **Basis:** SRE human-owned operations
- **Required links:** Scenario, runbook replay, diagnosis, mitigation, operator signoff
- **Reviewer hint:** SRE Lead, Human Owner, Support Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Outage Drill and Operator Readiness Record declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Outage Drill and Operator Readiness Record ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Outage Drill and Operator Readiness Record defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: outage scenario | Outage Drill and Operator Readiness Record addresses `outage scenario` with enough specificity to guide downstream work, review, and verification. | section covering outage scenario; owner or accountable role; linked evidence | outage scenario is generic; outage scenario lacks evidence; outage scenario lacks owner |
| 5 | Artifact-specific focus: operator actions | Outage Drill and Operator Readiness Record addresses `operator actions` with enough specificity to guide downstream work, review, and verification. | section covering operator actions; owner or accountable role; linked evidence | operator actions is generic; operator actions lacks evidence; operator actions lacks owner |
| 6 | Artifact-specific focus: timing | Outage Drill and Operator Readiness Record addresses `timing` with enough specificity to guide downstream work, review, and verification. | section covering timing; owner or accountable role; linked evidence | timing is generic; timing lacks evidence; timing lacks owner |
| 7 | Artifact-specific focus: signoff | Outage Drill and Operator Readiness Record addresses `signoff` with enough specificity to guide downstream work, review, and verification. | section covering signoff; owner or accountable role; linked evidence | signoff is generic; signoff lacks evidence; signoff lacks owner |
| 8 | Artifact-specific focus: learning gaps | Outage Drill and Operator Readiness Record addresses `learning gaps` with enough specificity to guide downstream work, review, and verification. | section covering learning gaps; owner or accountable role; linked evidence | learning gaps is generic; learning gaps lacks evidence; learning gaps lacks owner |
| 9 | Family theme coverage: post-release learning | Outage Drill and Operator Readiness Record handles `post-release learning` according to its artifact family obligations. | post-release learning section; trace link; review evidence | post-release learning omitted; post-release learning not traceable; post-release learning not reviewable |
| 10 | Standards and method mapping | Outage Drill and Operator Readiness Record maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Outage Drill and Operator Readiness Record supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Outage Drill and Operator Readiness Record records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Outage Drill and Operator Readiness Record records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Outage Drill and Operator Readiness Record defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Outage Drill and Operator Readiness Record has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |


## Inspection Records and Warranty Binder

### EVD-001 Bidirectional Traceability Matrix

- **Construction analog:** As-built traceability matrix
- **Basis:** ISO/CMMI/professional handoff
- **Required links:** Requirements, design, code, tests, operations
- **Reviewer hint:** Governance Auditor, Requirements Lead, Test Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Bidirectional Traceability Matrix declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Bidirectional Traceability Matrix ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Bidirectional Traceability Matrix defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: trace classes | Bidirectional Traceability Matrix addresses `trace classes` with enough specificity to guide downstream work, review, and verification. | section covering trace classes; owner or accountable role; linked evidence | trace classes is generic; trace classes lacks evidence; trace classes lacks owner |
| 5 | Artifact-specific focus: forward links | Bidirectional Traceability Matrix addresses `forward links` with enough specificity to guide downstream work, review, and verification. | section covering forward links; owner or accountable role; linked evidence | forward links is generic; forward links lacks evidence; forward links lacks owner |
| 6 | Artifact-specific focus: reverse links | Bidirectional Traceability Matrix addresses `reverse links` with enough specificity to guide downstream work, review, and verification. | section covering reverse links; owner or accountable role; linked evidence | reverse links is generic; reverse links lacks evidence; reverse links lacks owner |
| 7 | Artifact-specific focus: gaps | Bidirectional Traceability Matrix addresses `gaps` with enough specificity to guide downstream work, review, and verification. | section covering gaps; owner or accountable role; linked evidence | gaps is generic; gaps lacks evidence; gaps lacks owner |
| 8 | Artifact-specific focus: closure status | Bidirectional Traceability Matrix addresses `closure status` with enough specificity to guide downstream work, review, and verification. | section covering closure status; owner or accountable role; linked evidence | closure status is generic; closure status lacks evidence; closure status lacks owner |
| 9 | Family theme coverage: future resumption | Bidirectional Traceability Matrix handles `future resumption` according to its artifact family obligations. | future resumption section; trace link; review evidence | future resumption omitted; future resumption not traceable; future resumption not reviewable |
| 10 | Standards and method mapping | Bidirectional Traceability Matrix maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Bidirectional Traceability Matrix supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Bidirectional Traceability Matrix records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Bidirectional Traceability Matrix records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Bidirectional Traceability Matrix defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Bidirectional Traceability Matrix has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### EVD-002 Expert Debate Record

- **Construction analog:** Design review and coordination meeting record
- **Basis:** DFMS governance
- **Required links:** Proposals, critiques, votes, decision
- **Reviewer hint:** Moderator, Governance Auditor, Human Owner
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Expert Debate Record declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Expert Debate Record ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Expert Debate Record defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: persona declarations | Expert Debate Record addresses `persona declarations` with enough specificity to guide downstream work, review, and verification. | section covering persona declarations; owner or accountable role; linked evidence | persona declarations is generic; persona declarations lacks evidence; persona declarations lacks owner |
| 5 | Artifact-specific focus: independent proposals | Expert Debate Record addresses `independent proposals` with enough specificity to guide downstream work, review, and verification. | section covering independent proposals; owner or accountable role; linked evidence | independent proposals is generic; independent proposals lacks evidence; independent proposals lacks owner |
| 6 | Artifact-specific focus: cross critiques | Expert Debate Record addresses `cross critiques` with enough specificity to guide downstream work, review, and verification. | section covering cross critiques; owner or accountable role; linked evidence | cross critiques is generic; cross critiques lacks evidence; cross critiques lacks owner |
| 7 | Artifact-specific focus: votes | Expert Debate Record addresses `votes` with enough specificity to guide downstream work, review, and verification. | section covering votes; owner or accountable role; linked evidence | votes is generic; votes lacks evidence; votes lacks owner |
| 8 | Artifact-specific focus: dissent | Expert Debate Record addresses `dissent` with enough specificity to guide downstream work, review, and verification. | section covering dissent; owner or accountable role; linked evidence | dissent is generic; dissent lacks evidence; dissent lacks owner |
| 9 | Family theme coverage: future resumption | Expert Debate Record handles `future resumption` according to its artifact family obligations. | future resumption section; trace link; review evidence | future resumption omitted; future resumption not traceable; future resumption not reviewable |
| 10 | Standards and method mapping | Expert Debate Record maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Expert Debate Record supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Expert Debate Record records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Expert Debate Record records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Expert Debate Record defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Expert Debate Record has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### EVD-003 Rubric Scorecard

- **Construction analog:** Inspection scorecard
- **Basis:** DFMS quality
- **Required links:** Artifact, reviewers, scores, failures
- **Reviewer hint:** Quality Lead, Governance Auditor, Selected Experts
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Rubric Scorecard declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Rubric Scorecard ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Rubric Scorecard defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: 3 reviewers | Rubric Scorecard addresses `3 reviewers` with enough specificity to guide downstream work, review, and verification. | section covering 3 reviewers; owner or accountable role; linked evidence | 3 reviewers is generic; 3 reviewers lacks evidence; 3 reviewers lacks owner |
| 5 | Artifact-specific focus: 15 checks | Rubric Scorecard addresses `15 checks` with enough specificity to guide downstream work, review, and verification. | section covering 15 checks; owner or accountable role; linked evidence | 15 checks is generic; 15 checks lacks evidence; 15 checks lacks owner |
| 6 | Artifact-specific focus: scores | Rubric Scorecard addresses `scores` with enough specificity to guide downstream work, review, and verification. | section covering scores; owner or accountable role; linked evidence | scores is generic; scores lacks evidence; scores lacks owner |
| 7 | Artifact-specific focus: failed points | Rubric Scorecard addresses `failed points` with enough specificity to guide downstream work, review, and verification. | section covering failed points; owner or accountable role; linked evidence | failed points is generic; failed points lacks evidence; failed points lacks owner |
| 8 | Artifact-specific focus: fix evidence | Rubric Scorecard addresses `fix evidence` with enough specificity to guide downstream work, review, and verification. | section covering fix evidence; owner or accountable role; linked evidence | fix evidence is generic; fix evidence lacks evidence; fix evidence lacks owner |
| 9 | Family theme coverage: future resumption | Rubric Scorecard handles `future resumption` according to its artifact family obligations. | future resumption section; trace link; review evidence | future resumption omitted; future resumption not traceable; future resumption not reviewable |
| 10 | Standards and method mapping | Rubric Scorecard maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Rubric Scorecard supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Rubric Scorecard records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Rubric Scorecard records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Rubric Scorecard defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Rubric Scorecard has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### EVD-004 Quality Certificate

- **Construction analog:** Certificate of quality / acceptance
- **Basis:** DFMS gate
- **Required links:** Artifact, evidence, thresholds, residual risk
- **Reviewer hint:** Quality Lead, Governance Auditor, Human Owner
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Quality Certificate declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Quality Certificate ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Quality Certificate defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: artifact verdict | Quality Certificate addresses `artifact verdict` with enough specificity to guide downstream work, review, and verification. | section covering artifact verdict; owner or accountable role; linked evidence | artifact verdict is generic; artifact verdict lacks evidence; artifact verdict lacks owner |
| 5 | Artifact-specific focus: thresholds | Quality Certificate addresses `thresholds` with enough specificity to guide downstream work, review, and verification. | section covering thresholds; owner or accountable role; linked evidence | thresholds is generic; thresholds lacks evidence; thresholds lacks owner |
| 6 | Artifact-specific focus: evidence bundle | Quality Certificate addresses `evidence bundle` with enough specificity to guide downstream work, review, and verification. | section covering evidence bundle; owner or accountable role; linked evidence | evidence bundle is generic; evidence bundle lacks evidence; evidence bundle lacks owner |
| 7 | Artifact-specific focus: conditions | Quality Certificate addresses `conditions` with enough specificity to guide downstream work, review, and verification. | section covering conditions; owner or accountable role; linked evidence | conditions is generic; conditions lacks evidence; conditions lacks owner |
| 8 | Artifact-specific focus: expiry | Quality Certificate addresses `expiry` with enough specificity to guide downstream work, review, and verification. | section covering expiry; owner or accountable role; linked evidence | expiry is generic; expiry lacks evidence; expiry lacks owner |
| 9 | Family theme coverage: future resumption | Quality Certificate handles `future resumption` according to its artifact family obligations. | future resumption section; trace link; review evidence | future resumption omitted; future resumption not traceable; future resumption not reviewable |
| 10 | Standards and method mapping | Quality Certificate maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Quality Certificate supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Quality Certificate records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Quality Certificate records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Quality Certificate defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Quality Certificate has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### EVD-005 Provenance Record

- **Construction analog:** Material provenance and chain-of-custody record
- **Basis:** Supply chain/audit
- **Required links:** Hashes, commits, logs, prompts if allowed
- **Reviewer hint:** Governance Auditor, Security Engineer, Release Manager
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Provenance Record declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Provenance Record ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Provenance Record defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: hashes | Provenance Record addresses `hashes` with enough specificity to guide downstream work, review, and verification. | section covering hashes; owner or accountable role; linked evidence | hashes is generic; hashes lacks evidence; hashes lacks owner |
| 5 | Artifact-specific focus: commits | Provenance Record addresses `commits` with enough specificity to guide downstream work, review, and verification. | section covering commits; owner or accountable role; linked evidence | commits is generic; commits lacks evidence; commits lacks owner |
| 6 | Artifact-specific focus: generation logs | Provenance Record addresses `generation logs` with enough specificity to guide downstream work, review, and verification. | section covering generation logs; owner or accountable role; linked evidence | generation logs is generic; generation logs lacks evidence; generation logs lacks owner |
| 7 | Artifact-specific focus: source references | Provenance Record addresses `source references` with enough specificity to guide downstream work, review, and verification. | section covering source references; owner or accountable role; linked evidence | source references is generic; source references lacks evidence; source references lacks owner |
| 8 | Artifact-specific focus: reproducibility | Provenance Record addresses `reproducibility` with enough specificity to guide downstream work, review, and verification. | section covering reproducibility; owner or accountable role; linked evidence | reproducibility is generic; reproducibility lacks evidence; reproducibility lacks owner |
| 9 | Family theme coverage: future resumption | Provenance Record handles `future resumption` according to its artifact family obligations. | future resumption section; trace link; review evidence | future resumption omitted; future resumption not traceable; future resumption not reviewable |
| 10 | Standards and method mapping | Provenance Record maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Provenance Record supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Provenance Record records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Provenance Record records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Provenance Record defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Provenance Record has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### EVD-006 Residual Risk Acceptance

- **Construction analog:** Residual risk / exception acceptance
- **Basis:** Risk management
- **Required links:** Risks, owner, expiration, mitigation
- **Reviewer hint:** Human Owner, Security Engineer, Delivery Manager
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Residual Risk Acceptance declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Residual Risk Acceptance ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Residual Risk Acceptance defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: risk owner | Residual Risk Acceptance addresses `risk owner` with enough specificity to guide downstream work, review, and verification. | section covering risk owner; owner or accountable role; linked evidence | risk owner is generic; risk owner lacks evidence; risk owner lacks owner |
| 5 | Artifact-specific focus: accepted risk | Residual Risk Acceptance addresses `accepted risk` with enough specificity to guide downstream work, review, and verification. | section covering accepted risk; owner or accountable role; linked evidence | accepted risk is generic; accepted risk lacks evidence; accepted risk lacks owner |
| 6 | Artifact-specific focus: mitigation | Residual Risk Acceptance addresses `mitigation` with enough specificity to guide downstream work, review, and verification. | section covering mitigation; owner or accountable role; linked evidence | mitigation is generic; mitigation lacks evidence; mitigation lacks owner |
| 7 | Artifact-specific focus: expiry | Residual Risk Acceptance addresses `expiry` with enough specificity to guide downstream work, review, and verification. | section covering expiry; owner or accountable role; linked evidence | expiry is generic; expiry lacks evidence; expiry lacks owner |
| 8 | Artifact-specific focus: monitoring | Residual Risk Acceptance addresses `monitoring` with enough specificity to guide downstream work, review, and verification. | section covering monitoring; owner or accountable role; linked evidence | monitoring is generic; monitoring lacks evidence; monitoring lacks owner |
| 9 | Family theme coverage: future resumption | Residual Risk Acceptance handles `future resumption` according to its artifact family obligations. | future resumption section; trace link; review evidence | future resumption omitted; future resumption not traceable; future resumption not reviewable |
| 10 | Standards and method mapping | Residual Risk Acceptance maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Residual Risk Acceptance supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Residual Risk Acceptance records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Residual Risk Acceptance records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Residual Risk Acceptance defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Residual Risk Acceptance has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### EVD-007 Refinery Gate Record

- **Construction analog:** Inspection gate record
- **Basis:** DFMS/Fabro/Gas Town verification merge
- **Required links:** Tests, traceability, rubrics, security, operations, residual risk
- **Reviewer hint:** Quality Lead, Test Lead, Governance Auditor
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Refinery Gate Record declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Refinery Gate Record ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Refinery Gate Record defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: core checks | Refinery Gate Record addresses `core checks` with enough specificity to guide downstream work, review, and verification. | section covering core checks; owner or accountable role; linked evidence | core checks is generic; core checks lacks evidence; core checks lacks owner |
| 5 | Artifact-specific focus: test evidence | Refinery Gate Record addresses `test evidence` with enough specificity to guide downstream work, review, and verification. | section covering test evidence; owner or accountable role; linked evidence | test evidence is generic; test evidence lacks evidence; test evidence lacks owner |
| 6 | Artifact-specific focus: trace evidence | Refinery Gate Record addresses `trace evidence` with enough specificity to guide downstream work, review, and verification. | section covering trace evidence; owner or accountable role; linked evidence | trace evidence is generic; trace evidence lacks evidence; trace evidence lacks owner |
| 7 | Artifact-specific focus: rubric evidence | Refinery Gate Record addresses `rubric evidence` with enough specificity to guide downstream work, review, and verification. | section covering rubric evidence; owner or accountable role; linked evidence | rubric evidence is generic; rubric evidence lacks evidence; rubric evidence lacks owner |
| 8 | Artifact-specific focus: gate verdict | Refinery Gate Record addresses `gate verdict` with enough specificity to guide downstream work, review, and verification. | section covering gate verdict; owner or accountable role; linked evidence | gate verdict is generic; gate verdict lacks evidence; gate verdict lacks owner |
| 9 | Family theme coverage: future resumption | Refinery Gate Record handles `future resumption` according to its artifact family obligations. | future resumption section; trace link; review evidence | future resumption omitted; future resumption not traceable; future resumption not reviewable |
| 10 | Standards and method mapping | Refinery Gate Record maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Refinery Gate Record supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Refinery Gate Record records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Refinery Gate Record records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Refinery Gate Record defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Refinery Gate Record has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### EVD-008 Human Communication Record

- **Construction analog:** Owner communication and signoff record
- **Basis:** Human-centered SDLC collaboration
- **Required links:** Async comments, confidence framing, taste gates, approval, incorporation evidence
- **Reviewer hint:** Human Owner, Delivery Manager, Quality Lead
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Human Communication Record declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Human Communication Record ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Human Communication Record defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: async comments | Human Communication Record addresses `async comments` with enough specificity to guide downstream work, review, and verification. | section covering async comments; owner or accountable role; linked evidence | async comments is generic; async comments lacks evidence; async comments lacks owner |
| 5 | Artifact-specific focus: confidence framing | Human Communication Record addresses `confidence framing` with enough specificity to guide downstream work, review, and verification. | section covering confidence framing; owner or accountable role; linked evidence | confidence framing is generic; confidence framing lacks evidence; confidence framing lacks owner |
| 6 | Artifact-specific focus: disagreement handling | Human Communication Record addresses `disagreement handling` with enough specificity to guide downstream work, review, and verification. | section covering disagreement handling; owner or accountable role; linked evidence | disagreement handling is generic; disagreement handling lacks evidence; disagreement handling lacks owner |
| 7 | Artifact-specific focus: feedback incorporation | Human Communication Record addresses `feedback incorporation` with enough specificity to guide downstream work, review, and verification. | section covering feedback incorporation; owner or accountable role; linked evidence | feedback incorporation is generic; feedback incorporation lacks evidence; feedback incorporation lacks owner |
| 8 | Artifact-specific focus: approval | Human Communication Record addresses `approval` with enough specificity to guide downstream work, review, and verification. | section covering approval; owner or accountable role; linked evidence | approval is generic; approval lacks evidence; approval lacks owner |
| 9 | Family theme coverage: future resumption | Human Communication Record handles `future resumption` according to its artifact family obligations. | future resumption section; trace link; review evidence | future resumption omitted; future resumption not traceable; future resumption not reviewable |
| 10 | Standards and method mapping | Human Communication Record maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Human Communication Record supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Human Communication Record records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Human Communication Record records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Human Communication Record defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Human Communication Record has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### EVD-009 Context Pack and Predecessor Recovery Record

- **Construction analog:** Handover binder and predecessor recovery record
- **Basis:** Gas Town-inspired context rot control
- **Required links:** Current node, recovered decisions, drift, replay evidence, next action
- **Reviewer hint:** Maintainer, Governance Auditor, Human Owner
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Context Pack and Predecessor Recovery Record declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Context Pack and Predecessor Recovery Record ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Context Pack and Predecessor Recovery Record defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: current node | Context Pack and Predecessor Recovery Record addresses `current node` with enough specificity to guide downstream work, review, and verification. | section covering current node; owner or accountable role; linked evidence | current node is generic; current node lacks evidence; current node lacks owner |
| 5 | Artifact-specific focus: predecessor decisions | Context Pack and Predecessor Recovery Record addresses `predecessor decisions` with enough specificity to guide downstream work, review, and verification. | section covering predecessor decisions; owner or accountable role; linked evidence | predecessor decisions is generic; predecessor decisions lacks evidence; predecessor decisions lacks owner |
| 6 | Artifact-specific focus: evidence index | Context Pack and Predecessor Recovery Record addresses `evidence index` with enough specificity to guide downstream work, review, and verification. | section covering evidence index; owner or accountable role; linked evidence | evidence index is generic; evidence index lacks evidence; evidence index lacks owner |
| 7 | Artifact-specific focus: replay drill | Context Pack and Predecessor Recovery Record addresses `replay drill` with enough specificity to guide downstream work, review, and verification. | section covering replay drill; owner or accountable role; linked evidence | replay drill is generic; replay drill lacks evidence; replay drill lacks owner |
| 8 | Artifact-specific focus: next action | Context Pack and Predecessor Recovery Record addresses `next action` with enough specificity to guide downstream work, review, and verification. | section covering next action; owner or accountable role; linked evidence | next action is generic; next action lacks evidence; next action lacks owner |
| 9 | Family theme coverage: future resumption | Context Pack and Predecessor Recovery Record handles `future resumption` according to its artifact family obligations. | future resumption section; trace link; review evidence | future resumption omitted; future resumption not traceable; future resumption not reviewable |
| 10 | Standards and method mapping | Context Pack and Predecessor Recovery Record maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Context Pack and Predecessor Recovery Record supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Context Pack and Predecessor Recovery Record records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Context Pack and Predecessor Recovery Record records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Context Pack and Predecessor Recovery Record defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Context Pack and Predecessor Recovery Record has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |

### EVD-010 Retrospective Learning Record

- **Construction analog:** Post-project lessons learned and warranty learning record
- **Basis:** Fabro/Gas Town/DFMS continuous improvement
- **Required links:** Friction, failures, lessons, template/rubric/skill updates
- **Reviewer hint:** Feedback Lead, Governance Auditor, Human Owner
- **Mandatory review gate:** 3 primary critics, at least 2 adversarial critics, at least 5 RALPH loops, trace closure, refinery gate, and quality certificate.

| # | Rubric | Intent | Required Evidence | Fail If |
| --- | --- | --- | --- | --- |
| 1 | Artifact identity and lifecycle state | Retrospective Learning Record declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item. | artifact header; owner/approver fields; control graph and ledger links | missing owner; missing lifecycle state; unlinked node or ledger |
| 2 | Source intent and authorization | Retrospective Learning Record ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests. | answer IDs; approved assumptions; source references | unsupported material claim; unapproved assumption; missing source trace |
| 3 | Scope boundary and tailoring | Retrospective Learning Record defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable. | scope table; tailoring note; deferred list | scope ambiguity; tailoring without rationale; deferred work without owner |
| 4 | Artifact-specific focus: lesson | Retrospective Learning Record addresses `lesson` with enough specificity to guide downstream work, review, and verification. | section covering lesson; owner or accountable role; linked evidence | lesson is generic; lesson lacks evidence; lesson lacks owner |
| 5 | Artifact-specific focus: root cause | Retrospective Learning Record addresses `root cause` with enough specificity to guide downstream work, review, and verification. | section covering root cause; owner or accountable role; linked evidence | root cause is generic; root cause lacks evidence; root cause lacks owner |
| 6 | Artifact-specific focus: process update | Retrospective Learning Record addresses `process update` with enough specificity to guide downstream work, review, and verification. | section covering process update; owner or accountable role; linked evidence | process update is generic; process update lacks evidence; process update lacks owner |
| 7 | Artifact-specific focus: regression check | Retrospective Learning Record addresses `regression check` with enough specificity to guide downstream work, review, and verification. | section covering regression check; owner or accountable role; linked evidence | regression check is generic; regression check lacks evidence; regression check lacks owner |
| 8 | Artifact-specific focus: future trigger | Retrospective Learning Record addresses `future trigger` with enough specificity to guide downstream work, review, and verification. | section covering future trigger; owner or accountable role; linked evidence | future trigger is generic; future trigger lacks evidence; future trigger lacks owner |
| 9 | Family theme coverage: future resumption | Retrospective Learning Record handles `future resumption` according to its artifact family obligations. | future resumption section; trace link; review evidence | future resumption omitted; future resumption not traceable; future resumption not reviewable |
| 10 | Standards and method mapping | Retrospective Learning Record maps named standards and methods to concrete sections, evidence, or justified exclusions. | standards mapping; tailoring rationale; waivers | standard named without mapping; unsupported compliance claim |
| 11 | Bidirectional traceability | Retrospective Learning Record supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable. | trace matrix entries; reverse links; gap log | one-way trace only; missing risk/test/design links |
| 12 | Decision rationale and alternatives | Retrospective Learning Record records material decisions, alternatives considered, rationale, consequences, and reversal triggers. | decision table; alternative analysis; ADR links | decision without alternatives; rationale too generic; no reversal trigger |
| 13 | Risk, assumption, and residual-risk handling | Retrospective Learning Record records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger. | risk table; assumption log; residual-risk acceptance | risk without owner; assumption without confidence; residual risk not accepted |
| 14 | Verification and acceptance evidence | Retrospective Learning Record defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof. | test links; review evidence; holdout/transfer evidence | no proof path; evidence cannot be rerun; acceptance criteria absent |
| 15 | Artifact-specific critic panel instantiated | Retrospective Learning Record has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics. | artifact review panel record; critic personas; cross-critique | generic reviewers only; missing critic seat; no cross-critique |
