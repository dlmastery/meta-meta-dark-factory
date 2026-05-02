> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# Artifact Research Source Map

Status: curated source map for improving DFMS artifact templates. This is not a substitute for project-specific evidence or a license to claim compliance.

## How To Use This Map

1. Select the artifact from `index.json`.
2. Apply the family-specific source anchors below.
3. Convert source guidance into artifact sections, evidence hooks, rubrics, and review questions.
4. Link each instantiated artifact to project evidence; do not cite this source map as proof that project work was performed.

## Cross-Cutting Anchors

| Source | Use in templates | Required template effect |
| --- | --- | --- |
| ISO/IEC/IEEE 15289:2019 | Life-cycle information items, document purpose/content, generic document types, tailoring and combining/splitting information items | Every artifact needs purpose, lifecycle fit, owner, content model, tailoring rationale, and information-item type |
| ISO/IEC/IEEE 29148:2018 | Requirements processes, requirements information items, contents and format guidance | Requirements artifacts need recursive elicitation, source links, attributes, acceptance criteria, trace, contradiction handling, and approval state |
| ISO/IEC 25010 | Product quality characteristics and evaluation framing | NFR, test, architecture, UX, and certificate artifacts must map quality attributes to measurable criteria and evidence |
| NIST SSDF SP 800-218 | Secure development practices and vulnerability risk reduction | Security, build, implementation, and release artifacts need secure-development tasks, controls, evidence, and ownership |
| OWASP SAMM | Software assurance maturity model | Governance and security artifacts need measurable maturity objectives, evidence, and improvement loops |
| CISA Secure by Design | Product security ownership, transparency, executive accountability, secure defaults | Security and product artifacts must treat security as a core business requirement with customer-outcome accountability |
| C4 model | Architecture abstractions and diagrams | Architecture templates must choose context/container/component/code and supporting diagrams based on audience and decision |
| arc42 | Architecture documentation sections and quality scenarios | Architecture templates must include goals, constraints, context, solution strategy, building blocks, runtime, deployment, concepts, decisions, quality, risks, and glossary as applicable |
| Google SRE | SLIs/SLOs, monitoring, incidents, postmortems, reliability testing | NFR, observability, runbook, incident, release, and outage-drill templates must define user-relevant measures and operational consequences |
| SLSA | Supply-chain security levels, provenance, verification, attestations | Build, dependency, provenance, and release artifacts need source/build/provenance verification hooks |
| CycloneDX | SBOM/BOM object model for components, services, dependencies, vulnerabilities, formulation, declarations | Dependency, release, provenance, and evidence artifacts need inventory, relationship, vulnerability, and conformance evidence |
| OWASP WSTG | Methodical web/security testing lifecycle | Security test artifacts need phase-aware tests, evidence, defects, retest proof, and risk disposition |
| Twelve-Factor App | Build/release/run separation and config discipline | Implementation, environment, release, and deployment artifacts must separate codebase, dependencies, config, backing services, build, release, and run concerns when applicable |

## Artifact Family Mapping

### Governance and Management

Applies to: `GOV-001` through `GOV-011`.

Consulting-grade learnings:

- Treat governance artifacts as a client control surface: decision rights, stage gates, change authority, budget/token approvals, and no-skip enforcement.
- Use ISO 15289 to determine whether the artifact behaves as a policy, plan, procedure, report, record, request, description, or specification.
- Use OWASP SAMM and NIST SSDF where security maturity, secure lifecycle, or assurance evidence affects scope.
- Require token-budget SWAG, approval threshold, change request path, and ledger impact for every iteration expansion.
- Require Hawkeye audit and AI judge/jury transition proof for stage movement.

Template implications:

- Every governance artifact must include stage gate, PERT dependency, owner, approval, waiver, escalation, and evidence tables.
- Every control artifact must identify the next legal bead, blocked beads, active risks, and exit criteria.
- Every method-blend artifact must compile methods into control graph nodes, work-ledger items, gates, and review evidence.

### Requirements and Product

Applies to: `REQ-001` through `REQ-008`.

Consulting-grade learnings:

- Use ISO 29148 as the requirements backbone: requirements process, required information items, content, and format discipline.
- Use recursive decomposition: business outcome -> capability -> scenario -> requirement -> NFR -> edge case -> acceptance test -> holdout/transfer proof.
- Treat customer interrogation as a protocol: rounds, answer IDs, contradiction score, completeness score, re-interrogation, validation summary, approval/waiver.
- Use ISO 25010 to prevent NFR blindness: quality attributes must be measurable, testable, and connected to architecture and operations.

Template implications:

- BRD must separate business outcomes, stakeholder value, success metrics, constraints, non-goals, assumptions, and measurable decision criteria.
- SRS must include requirement attributes, priority, source, rationale, acceptance, conflict state, verification method, downstream allocation, and change status.
- NFR catalog must include measurable SLO-like targets where applicable, ISO 25010 category, measurement method, test, owner, and operational consequence.
- Acceptance/scenario artifacts must include happy path, negative path, edge/failure path, holdout, transfer scenario, and evidence path.
- Glossary must map terms to bounded contexts, source answers, aliases, forbidden meanings, APIs, and UI text.
- Assumption log must include confidence, owner, evidence, expiry, revalidation trigger, and conversion path to requirement/risk/decision.
- Interrogation record must include rounds, questions, answers, contradictions, completeness, customer validation, and approval mechanics.
- Decomposition record must include tree, leaf acceptance, branch interviews, completeness scoring, re-interrogation triggers, and trace closure.

### Architecture and Design

Applies to: `ARC-001` through `ARC-007`.

Consulting-grade learnings:

- Use C4 to pick audience-specific diagrams and arc42 to cover goals, constraints, context, solution strategy, views, decisions, quality, risks, and glossary.
- Architecture must be driven by architecturally significant requirements, quality scenarios, security/trust boundaries, operations, and failure modes.
- Decisions must carry alternatives, consequences, reversibility, and validation.

Template implications:

- HLD must include context, boundary, major components, runtime, deployment, data/control flow, quality scenarios, threat/failure boundaries, and alternatives.
- LLD must include module contracts, API/data details, invariants, error handling, concurrency, state, test hooks, and maintainability.
- ADRs must include context, forces, options, decision, consequences, reversal trigger, accepted risk, and validation evidence.
- API specs must include consumers, contracts, examples, auth, errors, rate limits, compatibility, versioning, observability, and tests.
- Data/migration plans must include schema, lineage, retention, privacy, validation, rollback, rehearsal, and data-quality evidence.
- Threat models must include assets, trust boundaries, abuse cases, mitigations, verification, residual risk, and owner acceptance.
- Observability designs must include SLIs, SLOs, logs, traces, metrics, alert routes, dashboards, runbook links, and test evidence.

### MDA and DDD

Applies to: `MDA-001` through `MDA-004` and `DDD-001` through `DDD-003`.

Consulting-grade learnings:

- Preserve model lineage from business vocabulary and use cases to platform-independent concepts and platform-specific implementation.
- DDD artifacts must protect language boundaries, invariants, aggregate consistency, context ownership, and integration contracts.

Template implications:

- CIM must show business concepts, actors, events, outcomes, policies, and non-technical constraints.
- PIM must show platform-neutral services, entities, flows, interfaces, and quality constraints.
- PSM must show chosen platform structures, deployment constraints, persistence, code mapping, and operational hooks.
- Transformation record must show mapping rules, deltas, loss of information, generated/manual boundaries, and validation evidence.
- Context maps must show upstream/downstream relationships, shared kernels, anti-corruption boundaries, events, and ownership.
- Aggregate catalogs must show invariants, commands, events, consistency boundaries, concurrency, and tests.
- Anti-corruption plans must show translation models, failure handling, monitoring, migration path, and retirement criteria.

### Implementation and Build

Applies to: `IMP-001` through `IMP-005`.

Consulting-grade learnings:

- Use NIST SSDF to embed secure implementation evidence.
- Use SLSA and CycloneDX to make source, build, dependency, provenance, and vulnerability evidence inspectable.
- Use Twelve-Factor App where applicable to separate config, dependencies, build, release, and run.

Template implications:

- Implementation plans must map work packages to requirements, design, owners, acceptance tests, branch strategy, and rollback.
- Code change sets must list changed files, behavioral changes, tests, risks, review findings, and trace links.
- Build/dependency manifests must include lockfiles, SBOM/provenance expectations, vulnerability posture, licenses, reproducibility, and update policy.
- Configuration specs must list variables, defaults, secrets, environments, validation, drift detection, and ownership.
- Migration/backout plans must include rehearsal, prechecks, validation, rollback, data protection, monitoring, and signoff.

### Verification and Validation

Applies to: `VNV-001` through `VNV-007`.

Consulting-grade learnings:

- Use ISO 29148 traceability and ISO 25010 quality evaluation to connect tests to requirements and quality characteristics.
- Use OWASP WSTG, NIST SSDF, and CISA Secure by Design for security tests and security-outcome proof.
- Use Playwright/browser evidence for UI/WYSIWYG work and preserve screenshots/viewport/interactions where relevant.

Template implications:

- Master test strategy must include test levels, types, environments, data, entry/exit, responsibilities, automation, regression, risk, and evidence.
- Test procedures must include preconditions, steps, expected results, data, assertions, negative cases, cleanup, and trace links.
- Automated evidence must include command, environment, version, logs, screenshots, failures, retries, flake handling, and reviewer.
- Holdout reports must separate training/design scenarios from unseen scenarios and transfer cases.
- Security reports must include scope, method, tools, findings, exploitability, fixes, retest, and residual risk.
- Performance/reliability reports must include workload, SLI/SLO, baseline, thresholds, results, bottlenecks, and capacity plan.
- Accessibility/UX validation must include WCAG/material/design-system checks, keyboard/screen-reader checks, viewport/layout proof, and user journey evidence.

### Release, Production, and Maintenance

Applies to: `REL-001` through `REL-008`.

Consulting-grade learnings:

- Use Google SRE for SLOs, monitoring, incidents, postmortems, and reliability testing.
- Use SLSA/CycloneDX for release provenance and dependencies.
- Use CISA Secure by Design for customer security outcomes, logging, patching, and transparency.

Template implications:

- Release plans must define scope, readiness, dependencies, environment, rollout, rollback, communication, monitoring, and approval.
- Release notes must be useful to operators and users: what changed, impact, risk, migration, known issues, and support path.
- Deployment guides must include prerequisites, steps, verification, rollback, smoke checks, evidence, and owners.
- Runbooks must be executable by a trained operator: symptoms, diagnosis, dashboards, commands, mitigations, escalation, and recovery checks.
- Incident guides must include severity, roles, communication, triage, containment, evidence capture, customer impact, and postmortem.
- Maintenance guides must include recurring tasks, dependency updates, backups, technical debt, ownership windows, and risk review.
- Human training packages must include role-based learning goals, labs, checks, signoff, and retention evidence.
- Outage drills must include scenario, injects, operator actions, timeline, evidence, failure learnings, fixes, and readiness signoff.

### Evidence and Certification

Applies to: `EVD-001` through `EVD-010`.

Consulting-grade learnings:

- Evidence artifacts must be tamper-resistant in spirit: exact input, exact output, owners, timestamps, source paths, review independence, and residual risk.
- Certificates must prove the review and verification happened; they must not merely restate that a gate passed.

Template implications:

- Trace matrices must be bidirectional and include requirements, NFRs, assumptions, risks, decisions, artifacts, code, tests, releases, operations, and certificates.
- Debate records must preserve independent positions, cross-critique, synthesis, unresolved dissent, and decision rationale.
- Scorecards must include artifact-level checks, three 15-check specialist rubrics, adversarial critics, thresholds, failed-point fixes, and evidence.
- Quality certificates must link to panel, score, gate, trace, evidence, residual risks, and signoff.
- Provenance records must show source, generation, build/run context, artifact lineage, and reviewer acceptance.
- Residual-risk acceptances must show risk owner, scope, rationale, expiry, controls, and revalidation.
- Refinery gates must show entrance criteria, exit criteria, verdict, blocked items, next legal bead, and certificate state.
- Human communication records must include async review, clarification, disagreement, confidence, decisions, and feedback incorporation.
- Context packs must enable predecessor recovery through indexes, decisions, evidence, state, and replay drills.
- Retrospectives must convert lessons into template, rubric, scenario, and process updates.

## Research Source URLs

- ISO/IEC/IEEE 29148:2018: https://www.iso.org/standard/72089.html
- ISO/IEC/IEEE 15289:2019: https://www.iso.org/standard/74909.html
- NIST SP 800-218 SSDF: https://csrc.nist.gov/pubs/sp/800/218/final
- OWASP SAMM model: https://owaspsamm.org/model/
- C4 model: https://c4model.com/
- arc42 documentation: https://docs.arc42.org/home/
- Google SRE Service Level Objectives: https://sre.google/sre-book/service-level-objectives/
- ISO/IEC 25010 overview: https://iso25000.com/index.php/en/iso-25000-standards/iso-25010
- CISA Secure by Design: https://www.cisa.gov/resources-tools/resources/secure-by-design
- SLSA specification: https://slsa.dev/spec/v1.1/
- CycloneDX specification overview: https://cyclonedx.org/specification/overview/
- Twelve-Factor App: https://12factor.net/
