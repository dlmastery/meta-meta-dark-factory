> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# ARC-003 Architecture Decision Records Rubric

Status: artifact-specific QA rubric.

Basis: ADR practice, ISO rationale records.

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
- Intent: Architecture Decision Records declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item.
- Required evidence: artifact header, owner/approver fields, control graph and ledger links.
- Fail if: missing owner, missing lifecycle state, unlinked node or ledger.

### A02 Source intent and authorization

- Severity: `critical`
- Intent: Architecture Decision Records ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests.
- Required evidence: answer IDs, approved assumptions, source references.
- Fail if: unsupported material claim, unapproved assumption, missing source trace.

### A03 Scope boundary and tailoring

- Severity: `critical`
- Intent: Architecture Decision Records defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable.
- Required evidence: scope table, tailoring note, deferred list.
- Fail if: scope ambiguity, tailoring without rationale, deferred work without owner.

### A04 Artifact-specific focus: decision context

- Severity: `major`
- Intent: Architecture Decision Records addresses `decision context` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering decision context, owner or accountable role, linked evidence.
- Fail if: decision context is generic, decision context lacks evidence, decision context lacks owner.

### A05 Artifact-specific focus: alternatives

- Severity: `major`
- Intent: Architecture Decision Records addresses `alternatives` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering alternatives, owner or accountable role, linked evidence.
- Fail if: alternatives is generic, alternatives lacks evidence, alternatives lacks owner.

### A06 Artifact-specific focus: chosen option

- Severity: `major`
- Intent: Architecture Decision Records addresses `chosen option` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering chosen option, owner or accountable role, linked evidence.
- Fail if: chosen option is generic, chosen option lacks evidence, chosen option lacks owner.

### A07 Artifact-specific focus: consequences

- Severity: `major`
- Intent: Architecture Decision Records addresses `consequences` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering consequences, owner or accountable role, linked evidence.
- Fail if: consequences is generic, consequences lacks evidence, consequences lacks owner.

### A08 Artifact-specific focus: reversal conditions

- Severity: `major`
- Intent: Architecture Decision Records addresses `reversal conditions` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering reversal conditions, owner or accountable role, linked evidence.
- Fail if: reversal conditions is generic, reversal conditions lacks evidence, reversal conditions lacks owner.

### A09 Family theme coverage: implementation feasibility

- Severity: `major`
- Intent: Architecture Decision Records handles `implementation feasibility` according to its artifact family obligations.
- Required evidence: implementation feasibility section, trace link, review evidence.
- Fail if: implementation feasibility omitted, implementation feasibility not traceable, implementation feasibility not reviewable.

### A10 Standards and method mapping

- Severity: `critical`
- Intent: Architecture Decision Records maps named standards and methods to concrete sections, evidence, or justified exclusions.
- Required evidence: standards mapping, tailoring rationale, waivers.
- Fail if: standard named without mapping, unsupported compliance claim.

### A11 Bidirectional traceability

- Severity: `critical`
- Intent: Architecture Decision Records supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable.
- Required evidence: trace matrix entries, reverse links, gap log.
- Fail if: one-way trace only, missing risk/test/design links.

### A12 Decision rationale and alternatives

- Severity: `major`
- Intent: Architecture Decision Records records material decisions, alternatives considered, rationale, consequences, and reversal triggers.
- Required evidence: decision table, alternative analysis, ADR links.
- Fail if: decision without alternatives, rationale too generic, no reversal trigger.

### A13 Risk, assumption, and residual-risk handling

- Severity: `critical`
- Intent: Architecture Decision Records records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger.
- Required evidence: risk table, assumption log, residual-risk acceptance.
- Fail if: risk without owner, assumption without confidence, residual risk not accepted.

### A14 Verification and acceptance evidence

- Severity: `critical`
- Intent: Architecture Decision Records defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof.
- Required evidence: test links, review evidence, holdout/transfer evidence.
- Fail if: no proof path, evidence cannot be rerun, acceptance criteria absent.

### A15 Artifact-specific critic panel instantiated

- Severity: `critical`
- Intent: Architecture Decision Records has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics.
- Required evidence: artifact review panel record, critic personas, cross-critique.
- Fail if: generic reviewers only, missing critic seat, no cross-critique.

### A16 Handoff and future resumption

- Severity: `major`
- Intent: Architecture Decision Records includes human handoff, agent handoff, next action, and re-entry triggers so work can continue without hidden context.
- Required evidence: handoff notes, project-book index link, re-entry triggers.
- Fail if: handoff missing, next action unclear, depends on original author.

### A17 Quality certificate readiness

- Severity: `critical`
- Intent: Architecture Decision Records is ready for refinery gate and certificate only when failed rubric points have fixes or accepted residual risk.
- Required evidence: rubric score record, fix evidence, refinery gate.
- Fail if: failed point unresolved, certificate references missing evidence.

### A18 No template residue or unsupported claims

- Severity: `critical`
- Intent: Architecture Decision Records contains no placeholder text, fictional examples as real evidence, generic filler, or claims beyond evidence.
- Required evidence: placeholder scan, example-removal note, claim/evidence review.
- Fail if: TBD/TODO remains, fictional example used as proof, claim exceeds evidence.

## Critic-Seat Rubrics

## ARC-003-C1 Decision Rationale Critic

Seat kind: `content_authority`.

Mandate: validates context, options, chosen decision, consequences, and reversibility.

### ARC-003-C1 Decision Rationale Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The ARC-003-C1 Decision Rationale Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Architecture Decision Records`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### ARC-003-C1 Decision Rationale Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates context, options, chosen decision, consequences, and reversibility.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### ARC-003-C1 Decision Rationale Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `decision context` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: decision context evidence, critic rationale.
- Fail if: decision context generic, no challenge recorded.

### ARC-003-C1 Decision Rationale Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `alternatives` for completeness, trace, and downstream usability.
- Required evidence: alternatives section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### ARC-003-C1 Decision Rationale Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `chosen option` for risk, edge cases, and acceptance impact.
- Required evidence: chosen option evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### ARC-003-C1 Decision Rationale Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `ADR practice, ISO rationale records` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### ARC-003-C1 Decision Rationale Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the content authority lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### ARC-003-C1 Decision Rationale Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### ARC-003-C1 Decision Rationale Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### ARC-003-C1 Decision Rationale Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### ARC-003-C1 Decision Rationale Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### ARC-003-C1 Decision Rationale Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### ARC-003-C1 Decision Rationale Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Architecture Decision Records`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### ARC-003-C1 Decision Rationale Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### ARC-003-C1 Decision Rationale Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## ARC-003-C2 Domain and DDD Critic

Seat kind: `governance_and_trace`.

Mandate: validates domain alignment, context boundaries, and invariant impact.

### ARC-003-C2 Domain and DDD Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The ARC-003-C2 Domain and DDD Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Architecture Decision Records`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### ARC-003-C2 Domain and DDD Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates domain alignment, context boundaries, and invariant impact.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### ARC-003-C2 Domain and DDD Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `decision context` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: decision context evidence, critic rationale.
- Fail if: decision context generic, no challenge recorded.

### ARC-003-C2 Domain and DDD Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `alternatives` for completeness, trace, and downstream usability.
- Required evidence: alternatives section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### ARC-003-C2 Domain and DDD Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `chosen option` for risk, edge cases, and acceptance impact.
- Required evidence: chosen option evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### ARC-003-C2 Domain and DDD Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `ADR practice, ISO rationale records` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### ARC-003-C2 Domain and DDD Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the governance and trace lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### ARC-003-C2 Domain and DDD Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### ARC-003-C2 Domain and DDD Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### ARC-003-C2 Domain and DDD Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### ARC-003-C2 Domain and DDD Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### ARC-003-C2 Domain and DDD Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### ARC-003-C2 Domain and DDD Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Architecture Decision Records`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### ARC-003-C2 Domain and DDD Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### ARC-003-C2 Domain and DDD Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## ARC-003-C3 Governance Audit Critic

Seat kind: `verification_and_handoff`.

Mandate: validates approval, trace, date/version, residual risk, and rejected alternatives.

### ARC-003-C3 Governance Audit Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The ARC-003-C3 Governance Audit Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Architecture Decision Records`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### ARC-003-C3 Governance Audit Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates approval, trace, date/version, residual risk, and rejected alternatives.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### ARC-003-C3 Governance Audit Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `decision context` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: decision context evidence, critic rationale.
- Fail if: decision context generic, no challenge recorded.

### ARC-003-C3 Governance Audit Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `alternatives` for completeness, trace, and downstream usability.
- Required evidence: alternatives section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### ARC-003-C3 Governance Audit Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `chosen option` for risk, edge cases, and acceptance impact.
- Required evidence: chosen option evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### ARC-003-C3 Governance Audit Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `ADR practice, ISO rationale records` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### ARC-003-C3 Governance Audit Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the verification and handoff lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### ARC-003-C3 Governance Audit Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### ARC-003-C3 Governance Audit Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### ARC-003-C3 Governance Audit Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### ARC-003-C3 Governance Audit Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### ARC-003-C3 Governance Audit Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### ARC-003-C3 Governance Audit Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Architecture Decision Records`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### ARC-003-C3 Governance Audit Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### ARC-003-C3 Governance Audit Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.
