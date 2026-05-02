> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# GOV-010 Attractor Run Record Rubric

Status: artifact-specific QA rubric.

Basis: StrongDM Attractor-inspired governed entry.

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
- Intent: Attractor Run Record declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item.
- Required evidence: artifact header, owner/approver fields, control graph and ledger links.
- Fail if: missing owner, missing lifecycle state, unlinked node or ledger.

### A02 Source intent and authorization

- Severity: `critical`
- Intent: Attractor Run Record ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests.
- Required evidence: answer IDs, approved assumptions, source references.
- Fail if: unsupported material claim, unapproved assumption, missing source trace.

### A03 Scope boundary and tailoring

- Severity: `critical`
- Intent: Attractor Run Record defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable.
- Required evidence: scope table, tailoring note, deferred list.
- Fail if: scope ambiguity, tailoring without rationale, deferred work without owner.

### A04 Artifact-specific focus: attractor state

- Severity: `major`
- Intent: Attractor Run Record addresses `attractor state` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering attractor state, owner or accountable role, linked evidence.
- Fail if: attractor state is generic, attractor state lacks evidence, attractor state lacks owner.

### A05 Artifact-specific focus: requirement field

- Severity: `major`
- Intent: Attractor Run Record addresses `requirement field` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering requirement field, owner or accountable role, linked evidence.
- Fail if: requirement field is generic, requirement field lacks evidence, requirement field lacks owner.

### A06 Artifact-specific focus: selected mode

- Severity: `major`
- Intent: Attractor Run Record addresses `selected mode` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering selected mode, owner or accountable role, linked evidence.
- Fail if: selected mode is generic, selected mode lacks evidence, selected mode lacks owner.

### A07 Artifact-specific focus: waivers

- Severity: `major`
- Intent: Attractor Run Record addresses `waivers` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering waivers, owner or accountable role, linked evidence.
- Fail if: waivers is generic, waivers lacks evidence, waivers lacks owner.

### A08 Artifact-specific focus: next safe action

- Severity: `major`
- Intent: Attractor Run Record addresses `next safe action` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering next safe action, owner or accountable role, linked evidence.
- Fail if: next safe action is generic, next safe action lacks evidence, next safe action lacks owner.

### A09 Family theme coverage: human-agent accountability

- Severity: `major`
- Intent: Attractor Run Record handles `human-agent accountability` according to its artifact family obligations.
- Required evidence: human-agent accountability section, trace link, review evidence.
- Fail if: human-agent accountability omitted, human-agent accountability not traceable, human-agent accountability not reviewable.

### A10 Standards and method mapping

- Severity: `critical`
- Intent: Attractor Run Record maps named standards and methods to concrete sections, evidence, or justified exclusions.
- Required evidence: standards mapping, tailoring rationale, waivers.
- Fail if: standard named without mapping, unsupported compliance claim.

### A11 Bidirectional traceability

- Severity: `critical`
- Intent: Attractor Run Record supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable.
- Required evidence: trace matrix entries, reverse links, gap log.
- Fail if: one-way trace only, missing risk/test/design links.

### A12 Decision rationale and alternatives

- Severity: `major`
- Intent: Attractor Run Record records material decisions, alternatives considered, rationale, consequences, and reversal triggers.
- Required evidence: decision table, alternative analysis, ADR links.
- Fail if: decision without alternatives, rationale too generic, no reversal trigger.

### A13 Risk, assumption, and residual-risk handling

- Severity: `critical`
- Intent: Attractor Run Record records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger.
- Required evidence: risk table, assumption log, residual-risk acceptance.
- Fail if: risk without owner, assumption without confidence, residual risk not accepted.

### A14 Verification and acceptance evidence

- Severity: `critical`
- Intent: Attractor Run Record defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof.
- Required evidence: test links, review evidence, holdout/transfer evidence.
- Fail if: no proof path, evidence cannot be rerun, acceptance criteria absent.

### A15 Artifact-specific critic panel instantiated

- Severity: `critical`
- Intent: Attractor Run Record has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics.
- Required evidence: artifact review panel record, critic personas, cross-critique.
- Fail if: generic reviewers only, missing critic seat, no cross-critique.

### A16 Handoff and future resumption

- Severity: `major`
- Intent: Attractor Run Record includes human handoff, agent handoff, next action, and re-entry triggers so work can continue without hidden context.
- Required evidence: handoff notes, project-book index link, re-entry triggers.
- Fail if: handoff missing, next action unclear, depends on original author.

### A17 Quality certificate readiness

- Severity: `critical`
- Intent: Attractor Run Record is ready for refinery gate and certificate only when failed rubric points have fixes or accepted residual risk.
- Required evidence: rubric score record, fix evidence, refinery gate.
- Fail if: failed point unresolved, certificate references missing evidence.

### A18 No template residue or unsupported claims

- Severity: `critical`
- Intent: Attractor Run Record contains no placeholder text, fictional examples as real evidence, generic filler, or claims beyond evidence.
- Required evidence: placeholder scan, example-removal note, claim/evidence review.
- Fail if: TBD/TODO remains, fictional example used as proof, claim exceeds evidence.

## Critic-Seat Rubrics

## GOV-010-C1 Meta-Attractor Critic

Seat kind: `content_authority`.

Mandate: validates attractor state, intent separation, tensions, and selected mode.

### GOV-010-C1 Meta-Attractor Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The GOV-010-C1 Meta-Attractor Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Attractor Run Record`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### GOV-010-C1 Meta-Attractor Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates attractor state, intent separation, tensions, and selected mode.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### GOV-010-C1 Meta-Attractor Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `attractor state` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: attractor state evidence, critic rationale.
- Fail if: attractor state generic, no challenge recorded.

### GOV-010-C1 Meta-Attractor Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `requirement field` for completeness, trace, and downstream usability.
- Required evidence: requirement field section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### GOV-010-C1 Meta-Attractor Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `selected mode` for risk, edge cases, and acceptance impact.
- Required evidence: selected mode evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### GOV-010-C1 Meta-Attractor Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `StrongDM Attractor-inspired governed entry` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### GOV-010-C1 Meta-Attractor Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the content authority lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### GOV-010-C1 Meta-Attractor Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### GOV-010-C1 Meta-Attractor Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### GOV-010-C1 Meta-Attractor Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### GOV-010-C1 Meta-Attractor Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### GOV-010-C1 Meta-Attractor Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### GOV-010-C1 Meta-Attractor Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Attractor Run Record`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### GOV-010-C1 Meta-Attractor Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### GOV-010-C1 Meta-Attractor Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## GOV-010-C2 Governance Routing Critic

Seat kind: `governance_and_trace`.

Mandate: validates selected skills, waivers, engagement checkpoint, token SWAG, and approvals.

### GOV-010-C2 Governance Routing Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The GOV-010-C2 Governance Routing Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Attractor Run Record`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### GOV-010-C2 Governance Routing Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates selected skills, waivers, engagement checkpoint, token SWAG, and approvals.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### GOV-010-C2 Governance Routing Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `attractor state` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: attractor state evidence, critic rationale.
- Fail if: attractor state generic, no challenge recorded.

### GOV-010-C2 Governance Routing Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `requirement field` for completeness, trace, and downstream usability.
- Required evidence: requirement field section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### GOV-010-C2 Governance Routing Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `selected mode` for risk, edge cases, and acceptance impact.
- Required evidence: selected mode evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### GOV-010-C2 Governance Routing Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `StrongDM Attractor-inspired governed entry` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### GOV-010-C2 Governance Routing Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the governance and trace lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### GOV-010-C2 Governance Routing Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### GOV-010-C2 Governance Routing Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### GOV-010-C2 Governance Routing Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### GOV-010-C2 Governance Routing Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### GOV-010-C2 Governance Routing Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### GOV-010-C2 Governance Routing Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Attractor Run Record`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### GOV-010-C2 Governance Routing Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### GOV-010-C2 Governance Routing Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## GOV-010-C3 Verification and Anti-Overfit Critic

Seat kind: `verification_and_handoff`.

Mandate: validates proof commitments, transfer tests, and next safe action.

### GOV-010-C3 Verification and Anti-Overfit Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The GOV-010-C3 Verification and Anti-Overfit Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Attractor Run Record`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### GOV-010-C3 Verification and Anti-Overfit Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates proof commitments, transfer tests, and next safe action.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### GOV-010-C3 Verification and Anti-Overfit Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `attractor state` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: attractor state evidence, critic rationale.
- Fail if: attractor state generic, no challenge recorded.

### GOV-010-C3 Verification and Anti-Overfit Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `requirement field` for completeness, trace, and downstream usability.
- Required evidence: requirement field section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### GOV-010-C3 Verification and Anti-Overfit Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `selected mode` for risk, edge cases, and acceptance impact.
- Required evidence: selected mode evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### GOV-010-C3 Verification and Anti-Overfit Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `StrongDM Attractor-inspired governed entry` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### GOV-010-C3 Verification and Anti-Overfit Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the verification and handoff lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### GOV-010-C3 Verification and Anti-Overfit Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### GOV-010-C3 Verification and Anti-Overfit Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### GOV-010-C3 Verification and Anti-Overfit Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### GOV-010-C3 Verification and Anti-Overfit Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### GOV-010-C3 Verification and Anti-Overfit Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### GOV-010-C3 Verification and Anti-Overfit Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Attractor Run Record`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### GOV-010-C3 Verification and Anti-Overfit Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### GOV-010-C3 Verification and Anti-Overfit Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.
