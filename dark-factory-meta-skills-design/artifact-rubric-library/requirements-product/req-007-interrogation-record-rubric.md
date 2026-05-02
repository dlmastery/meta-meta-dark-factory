> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# REQ-007 Interrogation Record Rubric

Status: artifact-specific QA rubric.

Basis: Customer discovery and validation.

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
- Intent: Interrogation Record declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item.
- Required evidence: artifact header, owner/approver fields, control graph and ledger links.
- Fail if: missing owner, missing lifecycle state, unlinked node or ledger.

### A02 Source intent and authorization

- Severity: `critical`
- Intent: Interrogation Record ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests.
- Required evidence: answer IDs, approved assumptions, source references.
- Fail if: unsupported material claim, unapproved assumption, missing source trace.

### A03 Scope boundary and tailoring

- Severity: `critical`
- Intent: Interrogation Record defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable.
- Required evidence: scope table, tailoring note, deferred list.
- Fail if: scope ambiguity, tailoring without rationale, deferred work without owner.

### A04 Artifact-specific focus: interview rounds

- Severity: `major`
- Intent: Interrogation Record addresses `interview rounds` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering interview rounds, owner or accountable role, linked evidence.
- Fail if: interview rounds is generic, interview rounds lacks evidence, interview rounds lacks owner.

### A05 Artifact-specific focus: answer IDs

- Severity: `major`
- Intent: Interrogation Record addresses `answer IDs` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering answer IDs, owner or accountable role, linked evidence.
- Fail if: answer IDs is generic, answer IDs lacks evidence, answer IDs lacks owner.

### A06 Artifact-specific focus: contradiction scoring

- Severity: `major`
- Intent: Interrogation Record addresses `contradiction scoring` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering contradiction scoring, owner or accountable role, linked evidence.
- Fail if: contradiction scoring is generic, contradiction scoring lacks evidence, contradiction scoring lacks owner.

### A07 Artifact-specific focus: approval mechanics

- Severity: `major`
- Intent: Interrogation Record addresses `approval mechanics` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering approval mechanics, owner or accountable role, linked evidence.
- Fail if: approval mechanics is generic, approval mechanics lacks evidence, approval mechanics lacks owner.

### A08 Artifact-specific focus: re-interrogation triggers

- Severity: `major`
- Intent: Interrogation Record addresses `re-interrogation triggers` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering re-interrogation triggers, owner or accountable role, linked evidence.
- Fail if: re-interrogation triggers is generic, re-interrogation triggers lacks evidence, re-interrogation triggers lacks owner.

### A09 Family theme coverage: downstream allocation

- Severity: `major`
- Intent: Interrogation Record handles `downstream allocation` according to its artifact family obligations.
- Required evidence: downstream allocation section, trace link, review evidence.
- Fail if: downstream allocation omitted, downstream allocation not traceable, downstream allocation not reviewable.

### A10 Standards and method mapping

- Severity: `critical`
- Intent: Interrogation Record maps named standards and methods to concrete sections, evidence, or justified exclusions.
- Required evidence: standards mapping, tailoring rationale, waivers.
- Fail if: standard named without mapping, unsupported compliance claim.

### A11 Bidirectional traceability

- Severity: `critical`
- Intent: Interrogation Record supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable.
- Required evidence: trace matrix entries, reverse links, gap log.
- Fail if: one-way trace only, missing risk/test/design links.

### A12 Decision rationale and alternatives

- Severity: `major`
- Intent: Interrogation Record records material decisions, alternatives considered, rationale, consequences, and reversal triggers.
- Required evidence: decision table, alternative analysis, ADR links.
- Fail if: decision without alternatives, rationale too generic, no reversal trigger.

### A13 Risk, assumption, and residual-risk handling

- Severity: `critical`
- Intent: Interrogation Record records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger.
- Required evidence: risk table, assumption log, residual-risk acceptance.
- Fail if: risk without owner, assumption without confidence, residual risk not accepted.

### A14 Verification and acceptance evidence

- Severity: `critical`
- Intent: Interrogation Record defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof.
- Required evidence: test links, review evidence, holdout/transfer evidence.
- Fail if: no proof path, evidence cannot be rerun, acceptance criteria absent.

### A15 Artifact-specific critic panel instantiated

- Severity: `critical`
- Intent: Interrogation Record has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics.
- Required evidence: artifact review panel record, critic personas, cross-critique.
- Fail if: generic reviewers only, missing critic seat, no cross-critique.

### A16 Handoff and future resumption

- Severity: `major`
- Intent: Interrogation Record includes human handoff, agent handoff, next action, and re-entry triggers so work can continue without hidden context.
- Required evidence: handoff notes, project-book index link, re-entry triggers.
- Fail if: handoff missing, next action unclear, depends on original author.

### A17 Quality certificate readiness

- Severity: `critical`
- Intent: Interrogation Record is ready for refinery gate and certificate only when failed rubric points have fixes or accepted residual risk.
- Required evidence: rubric score record, fix evidence, refinery gate.
- Fail if: failed point unresolved, certificate references missing evidence.

### A18 No template residue or unsupported claims

- Severity: `critical`
- Intent: Interrogation Record contains no placeholder text, fictional examples as real evidence, generic filler, or claims beyond evidence.
- Required evidence: placeholder scan, example-removal note, claim/evidence review.
- Fail if: TBD/TODO remains, fictional example used as proof, claim exceeds evidence.

## Critic-Seat Rubrics

## REQ-007-C1 Interrogation Protocol Critic

Seat kind: `content_authority`.

Mandate: validates rounds, answer IDs, contradiction checks, completeness scoring, and re-interrogation.

### REQ-007-C1 Interrogation Protocol Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The REQ-007-C1 Interrogation Protocol Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Interrogation Record`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### REQ-007-C1 Interrogation Protocol Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates rounds, answer IDs, contradiction checks, completeness scoring, and re-interrogation.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### REQ-007-C1 Interrogation Protocol Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `interview rounds` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: interview rounds evidence, critic rationale.
- Fail if: interview rounds generic, no challenge recorded.

### REQ-007-C1 Interrogation Protocol Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `answer IDs` for completeness, trace, and downstream usability.
- Required evidence: answer IDs section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### REQ-007-C1 Interrogation Protocol Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `contradiction scoring` for risk, edge cases, and acceptance impact.
- Required evidence: contradiction scoring evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### REQ-007-C1 Interrogation Protocol Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `Customer discovery and validation` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### REQ-007-C1 Interrogation Protocol Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the content authority lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### REQ-007-C1 Interrogation Protocol Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### REQ-007-C1 Interrogation Protocol Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### REQ-007-C1 Interrogation Protocol Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### REQ-007-C1 Interrogation Protocol Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### REQ-007-C1 Interrogation Protocol Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### REQ-007-C1 Interrogation Protocol Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Interrogation Record`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### REQ-007-C1 Interrogation Protocol Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### REQ-007-C1 Interrogation Protocol Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## REQ-007-C2 Product Owner Alignment Critic

Seat kind: `governance_and_trace`.

Mandate: validates customer validation, approval mechanics, priorities, and unresolved intent.

### REQ-007-C2 Product Owner Alignment Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The REQ-007-C2 Product Owner Alignment Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Interrogation Record`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### REQ-007-C2 Product Owner Alignment Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates customer validation, approval mechanics, priorities, and unresolved intent.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### REQ-007-C2 Product Owner Alignment Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `interview rounds` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: interview rounds evidence, critic rationale.
- Fail if: interview rounds generic, no challenge recorded.

### REQ-007-C2 Product Owner Alignment Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `answer IDs` for completeness, trace, and downstream usability.
- Required evidence: answer IDs section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### REQ-007-C2 Product Owner Alignment Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `contradiction scoring` for risk, edge cases, and acceptance impact.
- Required evidence: contradiction scoring evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### REQ-007-C2 Product Owner Alignment Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `Customer discovery and validation` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### REQ-007-C2 Product Owner Alignment Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the governance and trace lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### REQ-007-C2 Product Owner Alignment Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### REQ-007-C2 Product Owner Alignment Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### REQ-007-C2 Product Owner Alignment Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### REQ-007-C2 Product Owner Alignment Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### REQ-007-C2 Product Owner Alignment Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### REQ-007-C2 Product Owner Alignment Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Interrogation Record`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### REQ-007-C2 Product Owner Alignment Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### REQ-007-C2 Product Owner Alignment Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## REQ-007-C3 Governance Trace Critic

Seat kind: `verification_and_handoff`.

Mandate: validates answer-to-requirement links, assumptions, decisions, and approval evidence.

### REQ-007-C3 Governance Trace Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The REQ-007-C3 Governance Trace Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Interrogation Record`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### REQ-007-C3 Governance Trace Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates answer-to-requirement links, assumptions, decisions, and approval evidence.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### REQ-007-C3 Governance Trace Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `interview rounds` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: interview rounds evidence, critic rationale.
- Fail if: interview rounds generic, no challenge recorded.

### REQ-007-C3 Governance Trace Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `answer IDs` for completeness, trace, and downstream usability.
- Required evidence: answer IDs section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### REQ-007-C3 Governance Trace Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `contradiction scoring` for risk, edge cases, and acceptance impact.
- Required evidence: contradiction scoring evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### REQ-007-C3 Governance Trace Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `Customer discovery and validation` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### REQ-007-C3 Governance Trace Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the verification and handoff lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### REQ-007-C3 Governance Trace Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### REQ-007-C3 Governance Trace Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### REQ-007-C3 Governance Trace Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### REQ-007-C3 Governance Trace Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### REQ-007-C3 Governance Trace Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### REQ-007-C3 Governance Trace Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Interrogation Record`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### REQ-007-C3 Governance Trace Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### REQ-007-C3 Governance Trace Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.
