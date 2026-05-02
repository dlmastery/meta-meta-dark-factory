> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# DFMS Artifact Template Library

Generated from `03-artifact-catalog.md` and `35-artifact-specific-critic-panel-matrix.md`.

This library contains one comprehensive template per governed artifact type. Each template includes fillable sections, standards/method anchors, required trace links, artifact-specific completion rubrics, an artifact-specific 3-critic panel, evidence bundle expectations, handoff notes, and a fictional worked example using `CareQueue Pro`.

The mandatory quality floor for every template and every instantiated artifact is `consulting-grade-artifact-standard.md`. The artifact-family source map is `research-source-map.md`. These exist because a top consulting deliverable is not merely a heading set: it is a decision aid, evidence carrier, handoff contract, trace object, and quality-gated work product grounded in the right industry practice for its artifact family.

## Counts

- Governed artifact types: 63
- Required primary critic seats: 189
- Core template files: 63
- Worked example files: 63
- Artifact review panel starter files: 63
- Total generated template assets: 189

## Standards Anchors

- SWEBOK V4 knowledge areas are used as the broad software engineering body-of-knowledge frame.
- ISO/IEC/IEEE 12207 is used as the software lifecycle process anchor.
- ISO/IEC/IEEE 15289 is used as the life-cycle information-item/documentation anchor.
- ISO/IEC/IEEE 29148 is used for requirements artifacts and requirement quality.
- RUP is used as an iterative, risk-driven lifecycle and artifact/work-product inspiration.
- OMG MDA is used for CIM/PIM/PSM and model transformation artifacts.
- DDD is used for ubiquitous language, bounded contexts, aggregates, and domain invariants.
- NIST SSDF is used for secure development and supply-chain overlays.
- ISO/IEC 25010 is used to structure measurable product quality attributes and quality evaluation.
- OWASP SAMM and OWASP WSTG are used for secure SDLC maturity and methodical web/security testing evidence.
- C4 and arc42 are used to make architecture documentation audience-aware, view-based, quality-scenario driven, and decision/risk explicit.
- Google SRE is used for SLI/SLO, error-budget, alerting, incident, and operability practices.
- SLSA and CycloneDX are used for provenance, build trust, dependency inventory, vulnerability context, and supply-chain evidence.
- CISA Secure by Design is used to require executive/product ownership of customer security outcomes.

## Consulting-Grade Use Rule

Before any artifact is accepted:

1. Read `consulting-grade-artifact-standard.md`.
2. Read `research-source-map.md` for the artifact family and translate those practices into artifact-specific sections, tables, diagrams, evidence hooks, and review questions.
3. Confirm the artifact has an artifact passport, client decision purpose, source ledger, artifact-specific body, verification model, trace model, risk controls, handoff route, and quality gate package.
4. Replace all fill markers and example-only content with project-specific evidence.
5. Reject repetitive generated examples, standards name-dropping, and claims that are not backed by source links or evidence.
6. Run `scripts/validate_artifact_template_library.py` after template-library changes and run `df-quality-refinery` before any real artifact is certified.


## How To Use

1. Select the artifact by ID from `index.json`.
2. Copy or instantiate the core template into the project book.
3. Use the worked example only as a specificity benchmark.
4. Replace all fillable markers with project-specific content.
5. Remove fictional example text from the real artifact or mark it as training-only appendix.
6. Create an Artifact Review Panel Record from the artifact-specific critic matrix.
7. Use the review-panel starter only as a shape example; it intentionally contains "example only" markers and must not pass as real evidence.
8. Run 3 independent 15-check expert reviews.
9. Link the artifact to trace evidence, refinery gate, and quality certificate.
10. Record the artifact's token-budget/change-control impact when the artifact requires more than the approved iteration scope.

## Template Index

### architecture-design

- `ARC-001` [High-Level Design](architecture-design/arc-001-high-level-design.md)
- `ARC-002` [Low-Level Design](architecture-design/arc-002-low-level-design.md)
- `ARC-003` [Architecture Decision Records](architecture-design/arc-003-architecture-decision-records.md)
- `ARC-004` [Interface/API Specification](architecture-design/arc-004-interface-api-specification.md)
- `ARC-005` [Data Model and Migration Plan](architecture-design/arc-005-data-model-and-migration-plan.md)
- `ARC-006` [Threat Model](architecture-design/arc-006-threat-model.md)
- `ARC-007` [Observability Design](architecture-design/arc-007-observability-design.md)

### evidence-certification

- `EVD-001` [Bidirectional Traceability Matrix](evidence-certification/evd-001-bidirectional-traceability-matrix.md)
- `EVD-002` [Expert Debate Record](evidence-certification/evd-002-expert-debate-record.md)
- `EVD-003` [Rubric Scorecard](evidence-certification/evd-003-rubric-scorecard.md)
- `EVD-004` [Quality Certificate](evidence-certification/evd-004-quality-certificate.md)
- `EVD-005` [Provenance Record](evidence-certification/evd-005-provenance-record.md)
- `EVD-006` [Residual Risk Acceptance](evidence-certification/evd-006-residual-risk-acceptance.md)
- `EVD-007` [Refinery Gate Record](evidence-certification/evd-007-refinery-gate-record.md)
- `EVD-008` [Human Communication Record](evidence-certification/evd-008-human-communication-record.md)
- `EVD-009` [Context Pack and Predecessor Recovery Record](evidence-certification/evd-009-context-pack-and-predecessor-recovery-record.md)
- `EVD-010` [Retrospective Learning Record](evidence-certification/evd-010-retrospective-learning-record.md)

### governance-management

- `GOV-001` [Project Charter](governance-management/gov-001-project-charter.md)
- `GOV-002` [Standards Tailoring Matrix](governance-management/gov-002-standards-tailoring-matrix.md)
- `GOV-003` [RASCI Matrix](governance-management/gov-003-rasci-matrix.md)
- `GOV-004` [Risk Register](governance-management/gov-004-risk-register.md)
- `GOV-005` [Change Management Plan](governance-management/gov-005-change-management-plan.md)
- `GOV-006` [Quality Management Plan](governance-management/gov-006-quality-management-plan.md)
- `GOV-007` [AI Governance Plan](governance-management/gov-007-ai-governance-plan.md)
- `GOV-008` [DFMS Control Graph](governance-management/gov-008-dfms-control-graph.md)
- `GOV-009` [Work Ledger Schema](governance-management/gov-009-work-ledger-schema.md)
- `GOV-010` [Attractor Run Record](governance-management/gov-010-attractor-run-record.md)
- `GOV-011` [Methodology Blend Record](governance-management/gov-011-methodology-blend-record.md)

### implementation-build

- `IMP-001` [Implementation Plan](implementation-build/imp-001-implementation-plan.md)
- `IMP-002` [Code Change Set](implementation-build/imp-002-code-change-set.md)
- `IMP-003` [Build and Dependency Manifest](implementation-build/imp-003-build-and-dependency-manifest.md)
- `IMP-004` [Configuration and Environment Spec](implementation-build/imp-004-configuration-and-environment-spec.md)
- `IMP-005` [Migration and Backout Plan](implementation-build/imp-005-migration-and-backout-plan.md)

### mda-ddd-modeling

- `MDA-001` [Computation-Independent Model](mda-ddd-modeling/mda-001-computation-independent-model.md)
- `MDA-002` [Platform-Independent Model](mda-ddd-modeling/mda-002-platform-independent-model.md)
- `MDA-003` [Platform-Specific Model](mda-ddd-modeling/mda-003-platform-specific-model.md)
- `MDA-004` [Model Transformation Record](mda-ddd-modeling/mda-004-model-transformation-record.md)
- `DDD-001` [Bounded Context Map](mda-ddd-modeling/ddd-001-bounded-context-map.md)
- `DDD-002` [Aggregate and Invariant Catalog](mda-ddd-modeling/ddd-002-aggregate-and-invariant-catalog.md)
- `DDD-003` [Anti-Corruption Layer Plan](mda-ddd-modeling/ddd-003-anti-corruption-layer-plan.md)

### release-production-maintenance

- `REL-001` [Release Plan](release-production-maintenance/rel-001-release-plan.md)
- `REL-002` [Release Notes](release-production-maintenance/rel-002-release-notes.md)
- `REL-003` [Deployment Guide](release-production-maintenance/rel-003-deployment-guide.md)
- `REL-004` [Operations Runbook](release-production-maintenance/rel-004-operations-runbook.md)
- `REL-005` [Incident Response Guide](release-production-maintenance/rel-005-incident-response-guide.md)
- `REL-006` [Maintenance Guide](release-production-maintenance/rel-006-maintenance-guide.md)
- `REL-007` [Human Training Package](release-production-maintenance/rel-007-human-training-package.md)
- `REL-008` [Outage Drill and Operator Readiness Record](release-production-maintenance/rel-008-outage-drill-and-operator-readiness-record.md)

### requirements-product

- `REQ-001` [Business Requirements Document](requirements-product/req-001-business-requirements-document.md)
- `REQ-002` [Software Requirements Specification](requirements-product/req-002-software-requirements-specification.md)
- `REQ-003` [Non-Functional Requirements Catalog](requirements-product/req-003-non-functional-requirements-catalog.md)
- `REQ-004` [Acceptance Criteria and Scenarios](requirements-product/req-004-acceptance-criteria-and-scenarios.md)
- `REQ-005` [Glossary and Ubiquitous Language](requirements-product/req-005-glossary-and-ubiquitous-language.md)
- `REQ-006` [Assumption and Constraint Log](requirements-product/req-006-assumption-and-constraint-log.md)
- `REQ-007` [Interrogation Record](requirements-product/req-007-interrogation-record.md)
- `REQ-008` [Spec Decomposition Record](requirements-product/req-008-spec-decomposition-record.md)

### verification-validation

- `VNV-001` [Master Test Strategy](verification-validation/vnv-001-master-test-strategy.md)
- `VNV-002` [Test Cases and Procedures](verification-validation/vnv-002-test-cases-and-procedures.md)
- `VNV-003` [Automated Test Evidence](verification-validation/vnv-003-automated-test-evidence.md)
- `VNV-004` [Holdout Scenario Report](verification-validation/vnv-004-holdout-scenario-report.md)
- `VNV-005` [Security Test Report](verification-validation/vnv-005-security-test-report.md)
- `VNV-006` [Performance/Reliability Report](verification-validation/vnv-006-performance-reliability-report.md)
- `VNV-007` [Accessibility/UX Validation](verification-validation/vnv-007-accessibility-ux-validation.md)

