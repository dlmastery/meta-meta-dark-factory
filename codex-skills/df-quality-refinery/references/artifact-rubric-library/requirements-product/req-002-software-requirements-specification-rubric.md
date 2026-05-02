> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# REQ-002 Software Requirements Specification Rubric

Status: artifact-specific QA rubric.

Basis: ISO 12207/15289, IEEE-style SRS practice.

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
- Intent: Software Requirements Specification declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item.
- Required evidence: artifact header, owner/approver fields, control graph and ledger links.
- Fail if: missing owner, missing lifecycle state, unlinked node or ledger.

### A02 Source intent and authorization

- Severity: `critical`
- Intent: Software Requirements Specification ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests.
- Required evidence: answer IDs, approved assumptions, source references.
- Fail if: unsupported material claim, unapproved assumption, missing source trace.

### A03 Scope boundary and tailoring

- Severity: `critical`
- Intent: Software Requirements Specification defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable.
- Required evidence: scope table, tailoring note, deferred list.
- Fail if: scope ambiguity, tailoring without rationale, deferred work without owner.

### A04 Artifact-specific focus: functional requirements

- Severity: `major`
- Intent: Software Requirements Specification addresses `functional requirements` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering functional requirements, owner or accountable role, linked evidence.
- Fail if: functional requirements is generic, functional requirements lacks evidence, functional requirements lacks owner.

### A05 Artifact-specific focus: NFR allocation

- Severity: `major`
- Intent: Software Requirements Specification addresses `NFR allocation` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering NFR allocation, owner or accountable role, linked evidence.
- Fail if: NFR allocation is generic, NFR allocation lacks evidence, NFR allocation lacks owner.

### A06 Artifact-specific focus: interfaces

- Severity: `major`
- Intent: Software Requirements Specification addresses `interfaces` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering interfaces, owner or accountable role, linked evidence.
- Fail if: interfaces is generic, interfaces lacks evidence, interfaces lacks owner.

### A07 Artifact-specific focus: acceptance links

- Severity: `major`
- Intent: Software Requirements Specification addresses `acceptance links` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering acceptance links, owner or accountable role, linked evidence.
- Fail if: acceptance links is generic, acceptance links lacks evidence, acceptance links lacks owner.

### A08 Artifact-specific focus: requirement attributes

- Severity: `major`
- Intent: Software Requirements Specification addresses `requirement attributes` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering requirement attributes, owner or accountable role, linked evidence.
- Fail if: requirement attributes is generic, requirement attributes lacks evidence, requirement attributes lacks owner.

### A09 Family theme coverage: downstream allocation

- Severity: `major`
- Intent: Software Requirements Specification handles `downstream allocation` according to its artifact family obligations.
- Required evidence: downstream allocation section, trace link, review evidence.
- Fail if: downstream allocation omitted, downstream allocation not traceable, downstream allocation not reviewable.

### A10 Standards and method mapping

- Severity: `critical`
- Intent: Software Requirements Specification maps named standards and methods to concrete sections, evidence, or justified exclusions.
- Required evidence: standards mapping, tailoring rationale, waivers.
- Fail if: standard named without mapping, unsupported compliance claim.

### A11 Bidirectional traceability

- Severity: `critical`
- Intent: Software Requirements Specification supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable.
- Required evidence: trace matrix entries, reverse links, gap log.
- Fail if: one-way trace only, missing risk/test/design links.

### A12 Decision rationale and alternatives

- Severity: `major`
- Intent: Software Requirements Specification records material decisions, alternatives considered, rationale, consequences, and reversal triggers.
- Required evidence: decision table, alternative analysis, ADR links.
- Fail if: decision without alternatives, rationale too generic, no reversal trigger.

### A13 Risk, assumption, and residual-risk handling

- Severity: `critical`
- Intent: Software Requirements Specification records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger.
- Required evidence: risk table, assumption log, residual-risk acceptance.
- Fail if: risk without owner, assumption without confidence, residual risk not accepted.

### A14 Verification and acceptance evidence

- Severity: `critical`
- Intent: Software Requirements Specification defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof.
- Required evidence: test links, review evidence, holdout/transfer evidence.
- Fail if: no proof path, evidence cannot be rerun, acceptance criteria absent.

### A15 Artifact-specific critic panel instantiated

- Severity: `critical`
- Intent: Software Requirements Specification has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics.
- Required evidence: artifact review panel record, critic personas, cross-critique.
- Fail if: generic reviewers only, missing critic seat, no cross-critique.

### A16 Handoff and future resumption

- Severity: `major`
- Intent: Software Requirements Specification includes human handoff, agent handoff, next action, and re-entry triggers so work can continue without hidden context.
- Required evidence: handoff notes, project-book index link, re-entry triggers.
- Fail if: handoff missing, next action unclear, depends on original author.

### A17 Quality certificate readiness

- Severity: `critical`
- Intent: Software Requirements Specification is ready for refinery gate and certificate only when failed rubric points have fixes or accepted residual risk.
- Required evidence: rubric score record, fix evidence, refinery gate.
- Fail if: failed point unresolved, certificate references missing evidence.

### A18 No template residue or unsupported claims

- Severity: `critical`
- Intent: Software Requirements Specification contains no placeholder text, fictional examples as real evidence, generic filler, or claims beyond evidence.
- Required evidence: placeholder scan, example-removal note, claim/evidence review.
- Fail if: TBD/TODO remains, fictional example used as proof, claim exceeds evidence.

## Critic-Seat Rubrics

## REQ-002-C1 Requirements Precision Critic

Seat kind: `content_authority`.

Mandate: validates functional/NFR completeness, atomicity, clarity, and conflict resolution.

### REQ-002-C1 Requirements Precision Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The REQ-002-C1 Requirements Precision Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Software Requirements Specification`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### REQ-002-C1 Requirements Precision Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates functional/NFR completeness, atomicity, clarity, and conflict resolution.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### REQ-002-C1 Requirements Precision Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `functional requirements` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: functional requirements evidence, critic rationale.
- Fail if: functional requirements generic, no challenge recorded.

### REQ-002-C1 Requirements Precision Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `NFR allocation` for completeness, trace, and downstream usability.
- Required evidence: NFR allocation section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### REQ-002-C1 Requirements Precision Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `interfaces` for risk, edge cases, and acceptance impact.
- Required evidence: interfaces evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### REQ-002-C1 Requirements Precision Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `ISO 12207/15289, IEEE-style SRS practice` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### REQ-002-C1 Requirements Precision Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the content authority lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### REQ-002-C1 Requirements Precision Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### REQ-002-C1 Requirements Precision Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### REQ-002-C1 Requirements Precision Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### REQ-002-C1 Requirements Precision Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### REQ-002-C1 Requirements Precision Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### REQ-002-C1 Requirements Precision Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Software Requirements Specification`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### REQ-002-C1 Requirements Precision Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### REQ-002-C1 Requirements Precision Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## REQ-002-C2 Standards and Trace Critic

Seat kind: `governance_and_trace`.

Mandate: validates SRS structure, source links, design/test trace, and approval baseline.

### REQ-002-C2 Standards and Trace Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The REQ-002-C2 Standards and Trace Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Software Requirements Specification`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### REQ-002-C2 Standards and Trace Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates SRS structure, source links, design/test trace, and approval baseline.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### REQ-002-C2 Standards and Trace Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `functional requirements` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: functional requirements evidence, critic rationale.
- Fail if: functional requirements generic, no challenge recorded.

### REQ-002-C2 Standards and Trace Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `NFR allocation` for completeness, trace, and downstream usability.
- Required evidence: NFR allocation section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### REQ-002-C2 Standards and Trace Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `interfaces` for risk, edge cases, and acceptance impact.
- Required evidence: interfaces evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### REQ-002-C2 Standards and Trace Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `ISO 12207/15289, IEEE-style SRS practice` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### REQ-002-C2 Standards and Trace Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the governance and trace lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### REQ-002-C2 Standards and Trace Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### REQ-002-C2 Standards and Trace Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### REQ-002-C2 Standards and Trace Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### REQ-002-C2 Standards and Trace Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### REQ-002-C2 Standards and Trace Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### REQ-002-C2 Standards and Trace Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Software Requirements Specification`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### REQ-002-C2 Standards and Trace Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### REQ-002-C2 Standards and Trace Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## REQ-002-C3 Testability Critic

Seat kind: `verification_and_handoff`.

Mandate: validates acceptance criteria, negative cases, holdouts, and verifiability.

### REQ-002-C3 Testability Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The REQ-002-C3 Testability Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Software Requirements Specification`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### REQ-002-C3 Testability Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates acceptance criteria, negative cases, holdouts, and verifiability.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### REQ-002-C3 Testability Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `functional requirements` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: functional requirements evidence, critic rationale.
- Fail if: functional requirements generic, no challenge recorded.

### REQ-002-C3 Testability Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `NFR allocation` for completeness, trace, and downstream usability.
- Required evidence: NFR allocation section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### REQ-002-C3 Testability Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `interfaces` for risk, edge cases, and acceptance impact.
- Required evidence: interfaces evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### REQ-002-C3 Testability Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `ISO 12207/15289, IEEE-style SRS practice` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### REQ-002-C3 Testability Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the verification and handoff lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### REQ-002-C3 Testability Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### REQ-002-C3 Testability Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### REQ-002-C3 Testability Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### REQ-002-C3 Testability Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### REQ-002-C3 Testability Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### REQ-002-C3 Testability Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Software Requirements Specification`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### REQ-002-C3 Testability Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### REQ-002-C3 Testability Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.
