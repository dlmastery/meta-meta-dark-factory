> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# REQ-001 Business Requirements Document Rubric

Status: artifact-specific QA rubric.

Basis: ISO information item, RUP business modeling.

## Counts

- Artifact-level checks: 18
- Critic-seat rubrics: 3
- Critic-seat checks: 45
- Total checks: 63

## Pass Policy

- Minimum score: 96 percent for artifact-level and each critic-seat score.
- Every critical check must score 4 or have owner-approved residual risk.
- Every failed point needs fix evidence or residual-risk acceptance.
- A pass cannot be issued without trace evidence, refinery gate, and quality certificate linkage.

## Artifact-Level Rubric

### A01 Artifact identity and lifecycle state

- Severity: `critical`
- Intent: Business Requirements Document declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item.
- Required evidence: artifact header, owner/approver fields, control graph and ledger links.
- Fail if: missing owner, missing lifecycle state, unlinked node or ledger.

### A02 Source intent and authorization

- Severity: `critical`
- Intent: Business Requirements Document ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests.
- Required evidence: answer IDs, approved assumptions, source references.
- Fail if: unsupported material claim, unapproved assumption, missing source trace.

### A03 Scope boundary and tailoring

- Severity: `critical`
- Intent: Business Requirements Document defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable.
- Required evidence: scope table, tailoring note, deferred list.
- Fail if: scope ambiguity, tailoring without rationale, deferred work without owner.

### A04 Artifact-specific focus: business outcomes

- Severity: `major`
- Intent: Business Requirements Document addresses `business outcomes` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering business outcomes, owner or accountable role, linked evidence.
- Fail if: business outcomes is generic, business outcomes lacks evidence, business outcomes lacks owner.

### A05 Artifact-specific focus: stakeholder needs

- Severity: `major`
- Intent: Business Requirements Document addresses `stakeholder needs` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering stakeholder needs, owner or accountable role, linked evidence.
- Fail if: stakeholder needs is generic, stakeholder needs lacks evidence, stakeholder needs lacks owner.

### A06 Artifact-specific focus: capability map

- Severity: `major`
- Intent: Business Requirements Document addresses `capability map` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering capability map, owner or accountable role, linked evidence.
- Fail if: capability map is generic, capability map lacks evidence, capability map lacks owner.

### A07 Artifact-specific focus: success metrics

- Severity: `major`
- Intent: Business Requirements Document addresses `success metrics` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering success metrics, owner or accountable role, linked evidence.
- Fail if: success metrics is generic, success metrics lacks evidence, success metrics lacks owner.

### A08 Artifact-specific focus: business constraints

- Severity: `major`
- Intent: Business Requirements Document addresses `business constraints` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering business constraints, owner or accountable role, linked evidence.
- Fail if: business constraints is generic, business constraints lacks evidence, business constraints lacks owner.

### A09 Family theme coverage: downstream allocation

- Severity: `major`
- Intent: Business Requirements Document handles `downstream allocation` according to its artifact family obligations.
- Required evidence: downstream allocation section, trace link, review evidence.
- Fail if: downstream allocation omitted, downstream allocation not traceable, downstream allocation not reviewable.

### A10 Standards and method mapping

- Severity: `critical`
- Intent: Business Requirements Document maps named standards and methods to concrete sections, evidence, or justified exclusions.
- Required evidence: standards mapping, tailoring rationale, waivers.
- Fail if: standard named without mapping, unsupported compliance claim.

### A11 Bidirectional traceability

- Severity: `critical`
- Intent: Business Requirements Document supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable.
- Required evidence: trace matrix entries, reverse links, gap log.
- Fail if: one-way trace only, missing risk/test/design links.

### A12 Decision rationale and alternatives

- Severity: `major`
- Intent: Business Requirements Document records material decisions, alternatives considered, rationale, consequences, and reversal triggers.
- Required evidence: decision table, alternative analysis, ADR links.
- Fail if: decision without alternatives, rationale too generic, no reversal trigger.

### A13 Risk, assumption, and residual-risk handling

- Severity: `critical`
- Intent: Business Requirements Document records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger.
- Required evidence: risk table, assumption log, residual-risk acceptance.
- Fail if: risk without owner, assumption without confidence, residual risk not accepted.

### A14 Verification and acceptance evidence

- Severity: `critical`
- Intent: Business Requirements Document defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof.
- Required evidence: test links, review evidence, holdout/transfer evidence.
- Fail if: no proof path, evidence cannot be rerun, acceptance criteria absent.

### A15 Artifact-specific critic panel instantiated

- Severity: `critical`
- Intent: Business Requirements Document has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics.
- Required evidence: artifact review panel record, critic personas, cross-critique.
- Fail if: generic reviewers only, missing critic seat, no cross-critique.

### A16 Handoff and future resumption

- Severity: `major`
- Intent: Business Requirements Document includes human handoff, agent handoff, next action, and re-entry triggers so work can continue without hidden context.
- Required evidence: handoff notes, project-book index link, re-entry triggers.
- Fail if: handoff missing, next action unclear, depends on original author.

### A17 Quality certificate readiness

- Severity: `critical`
- Intent: Business Requirements Document is ready for refinery gate and certificate only when failed rubric points have fixes or accepted residual risk.
- Required evidence: rubric score record, fix evidence, refinery gate.
- Fail if: failed point unresolved, certificate references missing evidence.

### A18 No template residue or unsupported claims

- Severity: `critical`
- Intent: Business Requirements Document contains no placeholder text, fictional examples as real evidence, generic filler, or claims beyond evidence.
- Required evidence: placeholder scan, example-removal note, claim/evidence review.
- Fail if: TBD/TODO remains, fictional example used as proof, claim exceeds evidence.

## Critic-Seat Rubrics

## REQ-001-C1 Business Value Critic

Seat kind: `content_authority`.

Mandate: validates outcomes, stakeholders, capabilities, success measures, and priorities.

### REQ-001-C1 Business Value Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The REQ-001-C1 Business Value Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Business Requirements Document`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### REQ-001-C1 Business Value Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates outcomes, stakeholders, capabilities, success measures, and priorities.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### REQ-001-C1 Business Value Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `business outcomes` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: business outcomes evidence, critic rationale.
- Fail if: business outcomes generic, no challenge recorded.

### REQ-001-C1 Business Value Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `stakeholder needs` for completeness, trace, and downstream usability.
- Required evidence: stakeholder needs section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### REQ-001-C1 Business Value Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `capability map` for risk, edge cases, and acceptance impact.
- Required evidence: capability map evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### REQ-001-C1 Business Value Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `ISO information item, RUP business modeling` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### REQ-001-C1 Business Value Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the content authority lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### REQ-001-C1 Business Value Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### REQ-001-C1 Business Value Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### REQ-001-C1 Business Value Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### REQ-001-C1 Business Value Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### REQ-001-C1 Business Value Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### REQ-001-C1 Business Value Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Business Requirements Document`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### REQ-001-C1 Business Value Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### REQ-001-C1 Business Value Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## REQ-001-C2 Domain Realism Critic

Seat kind: `governance_and_trace`.

Mandate: validates workflow truth, vocabulary, constraints, and market/domain fit.

### REQ-001-C2 Domain Realism Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The REQ-001-C2 Domain Realism Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Business Requirements Document`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### REQ-001-C2 Domain Realism Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates workflow truth, vocabulary, constraints, and market/domain fit.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### REQ-001-C2 Domain Realism Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `business outcomes` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: business outcomes evidence, critic rationale.
- Fail if: business outcomes generic, no challenge recorded.

### REQ-001-C2 Domain Realism Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `stakeholder needs` for completeness, trace, and downstream usability.
- Required evidence: stakeholder needs section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### REQ-001-C2 Domain Realism Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `capability map` for risk, edge cases, and acceptance impact.
- Required evidence: capability map evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### REQ-001-C2 Domain Realism Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `ISO information item, RUP business modeling` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### REQ-001-C2 Domain Realism Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the governance and trace lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### REQ-001-C2 Domain Realism Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### REQ-001-C2 Domain Realism Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### REQ-001-C2 Domain Realism Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### REQ-001-C2 Domain Realism Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### REQ-001-C2 Domain Realism Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### REQ-001-C2 Domain Realism Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Business Requirements Document`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### REQ-001-C2 Domain Realism Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### REQ-001-C2 Domain Realism Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## REQ-001-C3 Requirements Trace Critic

Seat kind: `verification_and_handoff`.

Mandate: validates source answers, assumptions, approval state, and downstream acceptance links.

### REQ-001-C3 Requirements Trace Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The REQ-001-C3 Requirements Trace Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Business Requirements Document`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### REQ-001-C3 Requirements Trace Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates source answers, assumptions, approval state, and downstream acceptance links.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### REQ-001-C3 Requirements Trace Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `business outcomes` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: business outcomes evidence, critic rationale.
- Fail if: business outcomes generic, no challenge recorded.

### REQ-001-C3 Requirements Trace Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `stakeholder needs` for completeness, trace, and downstream usability.
- Required evidence: stakeholder needs section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### REQ-001-C3 Requirements Trace Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `capability map` for risk, edge cases, and acceptance impact.
- Required evidence: capability map evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### REQ-001-C3 Requirements Trace Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `ISO information item, RUP business modeling` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### REQ-001-C3 Requirements Trace Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the verification and handoff lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### REQ-001-C3 Requirements Trace Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### REQ-001-C3 Requirements Trace Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### REQ-001-C3 Requirements Trace Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### REQ-001-C3 Requirements Trace Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### REQ-001-C3 Requirements Trace Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### REQ-001-C3 Requirements Trace Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Business Requirements Document`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### REQ-001-C3 Requirements Trace Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### REQ-001-C3 Requirements Trace Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.
