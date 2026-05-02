# 03. Artifact Catalog

## Catalog Rule

DFMS treats artifacts as living records. They may be combined or split as long as the required information is present, traceable, reviewed, and versioned. This follows the ISO/IEC/IEEE 15289 principle that information items can be combined or subdivided for project needs.

The `Reviewers` column is now treated as a reviewer hint, not the complete review contract. Every artifact must instantiate the artifact-specific 3-critic panel in `35-artifact-specific-critic-panel-matrix.md`: content authority critic, governance/trace critic, and verification/handoff critic. This produces 189 required critic seats across the current 63-artifact catalog before risk-based specialists are added.

## Artifact States

| State | Meaning |
| --- | --- |
| `planned` | Required by tailoring but not drafted |
| `drafted` | Initial content exists |
| `reviewing` | Expert review is active |
| `rework` | Failed a rubric or evidence gate |
| `accepted` | Passed rubrics and traceability |
| `deferred` | Explicitly postponed with rationale and owner |
| `retired` | No longer applicable, with rationale |

## Governance and Management Artifacts

| ID | Artifact | Basis | Required Links | Reviewers |
| --- | --- | --- | --- | --- |
| GOV-001 | Project Charter | RUP inception, ISO agreement/project planning | Stakeholders, objectives, scope, constraints | Product Expert, Governance Auditor, Delivery Manager |
| GOV-002 | Standards Tailoring Matrix | ISO 12207, ISO 15289, company process | Standards clauses, included/excluded artifacts, rationale | Governance Auditor, Quality Lead, Human Owner |
| GOV-003 | RASCI Matrix | Human-agent accountability | Roles, stages, approval authority | Governance Auditor, Delivery Manager, Human Owner |
| GOV-004 | Risk Register | ISO risk management, CMMI | Requirements, decisions, tests, owners | Delivery Manager, Security Engineer, System Architect |
| GOV-005 | Change Management Plan | Agile/RUP/CMMI | Change requests, sprints, releases, approvals | Change Manager, Governance Auditor, Product Owner |
| GOV-006 | Quality Management Plan | ISO 12207, CMMI | Rubrics, thresholds, evidence types | Quality Lead, Governance Auditor, Test Lead |
| GOV-007 | AI Governance Plan | ISO 42001 | Agent roles, model use, review gates, monitoring | AI Governance Auditor, Security Engineer, Human Owner |
| GOV-008 | DFMS Control Graph | Attractor/Fabro-inspired workflow-as-code, ISO planning | Lifecycle nodes, gates, child skills, human decisions, evidence outputs | Governance Auditor, Delivery Manager, Quality Lead |
| GOV-009 | Work Ledger Schema | Gas Town-inspired durable work state, CMMI measurement | Requirements, artifacts, tasks, risks, decisions, owners, status | Delivery Manager, Traceability Lead, Maintainer |
| GOV-010 | Attractor Run Record | StrongDM Attractor-inspired governed entry | Requirement field, routing, stable state, waivers, next safe action | System Theorist, Governance Architect, Verification Critic |
| GOV-011 | Methodology Blend Record | RUP/MDA/DDD/TDD/SRE compiler | Included methods, graph nodes, ledger items, gates, evidence | Methodology Architect, Governance Auditor, Quality Lead |

## Requirements and Product Artifacts

| ID | Artifact | Basis | Required Links | Reviewers |
| --- | --- | --- | --- | --- |
| REQ-001 | Business Requirements Document | ISO information item, RUP business modeling | Stakeholders, capabilities, business outcomes | Product Expert, Domain Expert, Requirements Lead |
| REQ-002 | Software Requirements Specification | ISO 12207/15289, IEEE-style SRS practice | Functional/NFR requirements, tests, design | Requirements Lead, Test Lead, Governance Auditor |
| REQ-003 | Non-Functional Requirements Catalog | ISO quality, SRE, security | SLIs/SLOs, threat model, tests, operations | SRE Lead, Security Engineer, System Architect |
| REQ-004 | Acceptance Criteria and Scenarios | BDD/TDD, dark factory validation | Requirements, tests, holdouts, user journeys | Product Expert, QA Lead, Domain Expert |
| REQ-005 | Glossary and Ubiquitous Language | DDD | Domain terms, bounded contexts, APIs | Domain Expert, DDD Critic, Requirements Lead |
| REQ-006 | Assumption and Constraint Log | Professional SDLC handoff | Decisions, risks, open questions | Requirements Lead, Delivery Manager, Human Owner |
| REQ-007 | Interrogation Record | Customer discovery and validation | Rounds, answer IDs, contradiction scoring, approval mechanics | Requirements Lead, Product Owner, Governance Auditor |
| REQ-008 | Spec Decomposition Record | ISO/IEC/IEEE 29148, RUP use-case decomposition, Agile story slicing, DDD domain decomposition | Requirement tree, branch interviews, completeness scores, leaf acceptance criteria, trace links, re-interrogation triggers | Requirements Decomposition Lead, Product Owner, Verification Lead |

## Architecture and Design Artifacts

| ID | Artifact | Basis | Required Links | Reviewers |
| --- | --- | --- | --- | --- |
| ARC-001 | High-Level Design | RUP, ISO design, architecture practice | Requirements, NFRs, ADRs, risks | System Architect, SRE Lead, Security Engineer |
| ARC-002 | Low-Level Design | ISO implementation planning | Components, APIs, data model, tests | System Architect, Implementation Lead, Test Lead |
| ARC-003 | Architecture Decision Records | ADR practice, ISO rationale records | Alternatives, chosen design, consequences | System Architect, DDD Critic, Governance Auditor |
| ARC-004 | Interface/API Specification | ISO, OpenAPI/gRPC/etc. as applicable | Requirements, consumers, tests | System Architect, Test Lead, Security Engineer |
| ARC-005 | Data Model and Migration Plan | DDD/data architecture | Entities, stores, privacy, migrations | Data Architect, Security Engineer, SRE Lead |
| ARC-006 | Threat Model | SSDF, OWASP SAMM | Assets, abuse cases, mitigations, tests | Security Engineer, System Architect, Test Lead |
| ARC-007 | Observability Design | SRE | SLIs, logs, metrics, traces, alerts | SRE Lead, System Architect, Test Lead |

## MDA and DDD Artifacts

| ID | Artifact | Basis | Required Links | Reviewers |
| --- | --- | --- | --- | --- |
| MDA-001 | Computation-Independent Model | OMG MDA | Business process, domain goals, glossary | MDA Architect, Domain Expert, Product Expert |
| MDA-002 | Platform-Independent Model | OMG MDA | CIM elements, domain model, interfaces | MDA Architect, System Architect, DDD Critic |
| MDA-003 | Platform-Specific Model | OMG MDA | PIM mappings, stack choices, code modules | MDA Architect, Implementation Lead, SRE Lead |
| MDA-004 | Model Transformation Record | OMG MDA | CIM->PIM->PSM mappings and exceptions | MDA Architect, Governance Auditor, Test Lead |
| DDD-001 | Bounded Context Map | DDD | Glossary, aggregates, services, integrations | DDD Critic, System Architect, Domain Expert |
| DDD-002 | Aggregate and Invariant Catalog | DDD/TDD | Business rules, tests, code | DDD Critic, Test Lead, Implementation Lead |
| DDD-003 | Anti-Corruption Layer Plan | DDD integration | External systems, adapters, contracts | DDD Critic, Security Engineer, System Architect |

## Implementation and Build Artifacts

| ID | Artifact | Basis | Required Links | Reviewers |
| --- | --- | --- | --- | --- |
| IMP-001 | Implementation Plan | ISO implementation, Agile sprint planning | Requirements, components, tasks | Implementation Lead, Delivery Manager, Test Lead |
| IMP-002 | Code Change Set | Source control | Requirements, designs, tests, reviews | Implementation Lead, Test Lead, Security Engineer |
| IMP-003 | Build and Dependency Manifest | SSDF, supply chain | SBOM, lockfiles, build logs | Security Engineer, SRE Lead, Implementation Lead |
| IMP-004 | Configuration and Environment Spec | DevOps/SRE | Deploy targets, secrets policy, config tests | SRE Lead, Security Engineer, Implementation Lead |
| IMP-005 | Migration and Backout Plan | Release/SRE | Data model, deployment, rollback | Data Architect, SRE Lead, Test Lead |

## Verification and Validation Artifacts

| ID | Artifact | Basis | Required Links | Reviewers |
| --- | --- | --- | --- | --- |
| VNV-001 | Master Test Strategy | ISO verification/validation, TDD/BDD | Requirements, risks, coverage targets | Test Lead, Product Expert, Security Engineer |
| VNV-002 | Test Cases and Procedures | ISO/IEEE-style test docs | Requirements, code paths, scenarios | Test Lead, Domain Expert, Implementation Lead |
| VNV-003 | Automated Test Evidence | TDD/CI | Test cases, code, build results | Test Lead, Implementation Lead, Quality Lead |
| VNV-004 | Holdout Scenario Report | Dark factory validation | Acceptance criteria, runtime logs, scores | QA Lead, Product Expert, Governance Auditor |
| VNV-005 | Security Test Report | SSDF, OWASP SAMM | Threats, findings, mitigations | Security Engineer, Test Lead, Governance Auditor |
| VNV-006 | Performance/Reliability Report | SRE/NFR | NFRs, SLIs, capacity assumptions | SRE Lead, Test Lead, System Architect |
| VNV-007 | Accessibility/UX Validation | Product quality | User journeys, acceptance criteria | UX Expert, Product Expert, Test Lead |

## Release, Production, and Maintenance Artifacts

| ID | Artifact | Basis | Required Links | Reviewers |
| --- | --- | --- | --- | --- |
| REL-001 | Release Plan | RUP transition, DevOps | Change set, risks, deployment steps | Release Manager, SRE Lead, Product Owner |
| REL-002 | Release Notes | Handoff practice | Features, fixes, risks, known issues | Product Expert, Release Manager, Support Lead |
| REL-003 | Deployment Guide | SRE/operations | Environments, config, rollback | SRE Lead, Security Engineer, Release Manager |
| REL-004 | Operations Runbook | SRE | Alerts, dashboards, procedures, owners | SRE Lead, Support Lead, Security Engineer |
| REL-005 | Incident Response Guide | SRE/security | Failure modes, rollback, escalation | SRE Lead, Security Engineer, Human Owner |
| REL-006 | Maintenance Guide | ISO maintenance | Code map, common changes, tests | Brownfield Maintainer, Implementation Lead, SRE Lead |
| REL-007 | Human Training Package | Outsourcing handoff | Project book, runbooks, walkthroughs | Human Owner, Support Lead, Product Expert |
| REL-008 | Outage Drill and Operator Readiness Record | SRE human-owned operations | Scenario, runbook replay, diagnosis, mitigation, operator signoff | SRE Lead, Human Owner, Support Lead |

## Evidence and Certification Artifacts

| ID | Artifact | Basis | Required Links | Reviewers |
| --- | --- | --- | --- | --- |
| EVD-001 | Bidirectional Traceability Matrix | ISO/CMMI/professional handoff | Requirements, design, code, tests, operations | Governance Auditor, Requirements Lead, Test Lead |
| EVD-002 | Expert Debate Record | DFMS governance | Proposals, critiques, votes, decision | Moderator, Governance Auditor, Human Owner |
| EVD-003 | Rubric Scorecard | DFMS quality | Artifact, reviewers, scores, failures | Quality Lead, Governance Auditor, Selected Experts |
| EVD-004 | Quality Certificate | DFMS gate | Artifact, evidence, thresholds, residual risk | Quality Lead, Governance Auditor, Human Owner |
| EVD-005 | Provenance Record | Supply chain/audit | Hashes, commits, logs, prompts if allowed | Governance Auditor, Security Engineer, Release Manager |
| EVD-006 | Residual Risk Acceptance | Risk management | Risks, owner, expiration, mitigation | Human Owner, Security Engineer, Delivery Manager |
| EVD-007 | Refinery Gate Record | DFMS/Fabro/Gas Town verification merge | Tests, traceability, rubrics, security, operations, residual risk | Quality Lead, Test Lead, Governance Auditor |
| EVD-008 | Human Communication Record | Human-centered SDLC collaboration | Async comments, confidence framing, taste gates, approval, incorporation evidence | Human Owner, Delivery Manager, Quality Lead |
| EVD-009 | Context Pack and Predecessor Recovery Record | Gas Town-inspired context rot control | Current node, recovered decisions, drift, replay evidence, next action | Maintainer, Governance Auditor, Human Owner |
| EVD-010 | Retrospective Learning Record | Fabro/Gas Town/DFMS continuous improvement | Friction, failures, lessons, template/rubric/skill updates | Feedback Lead, Governance Auditor, Human Owner |

## Project Book Of Knowledge

The project book is not one document. It is an indexed set of current artifacts plus durable knowledge:

- Current goals and constraints.
- Current architecture.
- Current domain language.
- Current decisions and rejected alternatives.
- Current requirement coverage.
- Current quality state.
- Current release and operational state.
- Human feedback and lessons learned.
- Known risks and accepted trade-offs.

The index must be fresh enough that a new human or new Codex session can resume without reading the entire repository history.
