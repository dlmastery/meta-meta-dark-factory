> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# VNV-007 Accessibility/UX Validation Rubric

Status: artifact-specific QA rubric.

Basis: Product quality.

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
- Intent: Accessibility/UX Validation declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item.
- Required evidence: artifact header, owner/approver fields, control graph and ledger links.
- Fail if: missing owner, missing lifecycle state, unlinked node or ledger.

### A02 Source intent and authorization

- Severity: `critical`
- Intent: Accessibility/UX Validation ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests.
- Required evidence: answer IDs, approved assumptions, source references.
- Fail if: unsupported material claim, unapproved assumption, missing source trace.

### A03 Scope boundary and tailoring

- Severity: `critical`
- Intent: Accessibility/UX Validation defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable.
- Required evidence: scope table, tailoring note, deferred list.
- Fail if: scope ambiguity, tailoring without rationale, deferred work without owner.

### A04 Artifact-specific focus: keyboard access

- Severity: `major`
- Intent: Accessibility/UX Validation addresses `keyboard access` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering keyboard access, owner or accountable role, linked evidence.
- Fail if: keyboard access is generic, keyboard access lacks evidence, keyboard access lacks owner.

### A05 Artifact-specific focus: screen reader

- Severity: `major`
- Intent: Accessibility/UX Validation addresses `screen reader` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering screen reader, owner or accountable role, linked evidence.
- Fail if: screen reader is generic, screen reader lacks evidence, screen reader lacks owner.

### A06 Artifact-specific focus: contrast

- Severity: `major`
- Intent: Accessibility/UX Validation addresses `contrast` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering contrast, owner or accountable role, linked evidence.
- Fail if: contrast is generic, contrast lacks evidence, contrast lacks owner.

### A07 Artifact-specific focus: task completion

- Severity: `major`
- Intent: Accessibility/UX Validation addresses `task completion` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering task completion, owner or accountable role, linked evidence.
- Fail if: task completion is generic, task completion lacks evidence, task completion lacks owner.

### A08 Artifact-specific focus: state coverage

- Severity: `major`
- Intent: Accessibility/UX Validation addresses `state coverage` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering state coverage, owner or accountable role, linked evidence.
- Fail if: state coverage is generic, state coverage lacks evidence, state coverage lacks owner.

### A09 Family theme coverage: exit decision

- Severity: `major`
- Intent: Accessibility/UX Validation handles `exit decision` according to its artifact family obligations.
- Required evidence: exit decision section, trace link, review evidence.
- Fail if: exit decision omitted, exit decision not traceable, exit decision not reviewable.

### A10 Standards and method mapping

- Severity: `critical`
- Intent: Accessibility/UX Validation maps named standards and methods to concrete sections, evidence, or justified exclusions.
- Required evidence: standards mapping, tailoring rationale, waivers.
- Fail if: standard named without mapping, unsupported compliance claim.

### A11 Bidirectional traceability

- Severity: `critical`
- Intent: Accessibility/UX Validation supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable.
- Required evidence: trace matrix entries, reverse links, gap log.
- Fail if: one-way trace only, missing risk/test/design links.

### A12 Decision rationale and alternatives

- Severity: `major`
- Intent: Accessibility/UX Validation records material decisions, alternatives considered, rationale, consequences, and reversal triggers.
- Required evidence: decision table, alternative analysis, ADR links.
- Fail if: decision without alternatives, rationale too generic, no reversal trigger.

### A13 Risk, assumption, and residual-risk handling

- Severity: `critical`
- Intent: Accessibility/UX Validation records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger.
- Required evidence: risk table, assumption log, residual-risk acceptance.
- Fail if: risk without owner, assumption without confidence, residual risk not accepted.

### A14 Verification and acceptance evidence

- Severity: `critical`
- Intent: Accessibility/UX Validation defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof.
- Required evidence: test links, review evidence, holdout/transfer evidence.
- Fail if: no proof path, evidence cannot be rerun, acceptance criteria absent.

### A15 Artifact-specific critic panel instantiated

- Severity: `critical`
- Intent: Accessibility/UX Validation has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics.
- Required evidence: artifact review panel record, critic personas, cross-critique.
- Fail if: generic reviewers only, missing critic seat, no cross-critique.

### A16 Handoff and future resumption

- Severity: `major`
- Intent: Accessibility/UX Validation includes human handoff, agent handoff, next action, and re-entry triggers so work can continue without hidden context.
- Required evidence: handoff notes, project-book index link, re-entry triggers.
- Fail if: handoff missing, next action unclear, depends on original author.

### A17 Quality certificate readiness

- Severity: `critical`
- Intent: Accessibility/UX Validation is ready for refinery gate and certificate only when failed rubric points have fixes or accepted residual risk.
- Required evidence: rubric score record, fix evidence, refinery gate.
- Fail if: failed point unresolved, certificate references missing evidence.

### A18 No template residue or unsupported claims

- Severity: `critical`
- Intent: Accessibility/UX Validation contains no placeholder text, fictional examples as real evidence, generic filler, or claims beyond evidence.
- Required evidence: placeholder scan, example-removal note, claim/evidence review.
- Fail if: TBD/TODO remains, fictional example used as proof, claim exceeds evidence.

## Critic-Seat Rubrics

## VNV-007-C1 UX Usability Critic

Seat kind: `content_authority`.

Mandate: validates task completion, clarity, state coverage, and error prevention.

### VNV-007-C1 UX Usability Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The VNV-007-C1 UX Usability Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Accessibility/UX Validation`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### VNV-007-C1 UX Usability Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates task completion, clarity, state coverage, and error prevention.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### VNV-007-C1 UX Usability Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `keyboard access` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: keyboard access evidence, critic rationale.
- Fail if: keyboard access generic, no challenge recorded.

### VNV-007-C1 UX Usability Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `screen reader` for completeness, trace, and downstream usability.
- Required evidence: screen reader section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### VNV-007-C1 UX Usability Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `contrast` for risk, edge cases, and acceptance impact.
- Required evidence: contrast evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### VNV-007-C1 UX Usability Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `Product quality` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### VNV-007-C1 UX Usability Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the content authority lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### VNV-007-C1 UX Usability Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### VNV-007-C1 UX Usability Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### VNV-007-C1 UX Usability Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### VNV-007-C1 UX Usability Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### VNV-007-C1 UX Usability Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### VNV-007-C1 UX Usability Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Accessibility/UX Validation`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### VNV-007-C1 UX Usability Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### VNV-007-C1 UX Usability Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## VNV-007-C2 Accessibility Critic

Seat kind: `governance_and_trace`.

Mandate: validates keyboard, screen reader, contrast, semantics, and inclusive interaction.

### VNV-007-C2 Accessibility Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The VNV-007-C2 Accessibility Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Accessibility/UX Validation`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### VNV-007-C2 Accessibility Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates keyboard, screen reader, contrast, semantics, and inclusive interaction.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### VNV-007-C2 Accessibility Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `keyboard access` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: keyboard access evidence, critic rationale.
- Fail if: keyboard access generic, no challenge recorded.

### VNV-007-C2 Accessibility Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `screen reader` for completeness, trace, and downstream usability.
- Required evidence: screen reader section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### VNV-007-C2 Accessibility Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `contrast` for risk, edge cases, and acceptance impact.
- Required evidence: contrast evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### VNV-007-C2 Accessibility Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `Product quality` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### VNV-007-C2 Accessibility Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the governance and trace lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### VNV-007-C2 Accessibility Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### VNV-007-C2 Accessibility Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### VNV-007-C2 Accessibility Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### VNV-007-C2 Accessibility Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### VNV-007-C2 Accessibility Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### VNV-007-C2 Accessibility Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Accessibility/UX Validation`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### VNV-007-C2 Accessibility Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### VNV-007-C2 Accessibility Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## VNV-007-C3 Test Evidence Critic

Seat kind: `verification_and_handoff`.

Mandate: validates criteria, tools/manual checks, user scenarios, and regression evidence.

### VNV-007-C3 Test Evidence Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The VNV-007-C3 Test Evidence Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Accessibility/UX Validation`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### VNV-007-C3 Test Evidence Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates criteria, tools/manual checks, user scenarios, and regression evidence.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### VNV-007-C3 Test Evidence Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `keyboard access` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: keyboard access evidence, critic rationale.
- Fail if: keyboard access generic, no challenge recorded.

### VNV-007-C3 Test Evidence Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `screen reader` for completeness, trace, and downstream usability.
- Required evidence: screen reader section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### VNV-007-C3 Test Evidence Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `contrast` for risk, edge cases, and acceptance impact.
- Required evidence: contrast evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### VNV-007-C3 Test Evidence Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `Product quality` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### VNV-007-C3 Test Evidence Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the verification and handoff lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### VNV-007-C3 Test Evidence Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### VNV-007-C3 Test Evidence Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### VNV-007-C3 Test Evidence Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### VNV-007-C3 Test Evidence Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### VNV-007-C3 Test Evidence Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### VNV-007-C3 Test Evidence Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Accessibility/UX Validation`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### VNV-007-C3 Test Evidence Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### VNV-007-C3 Test Evidence Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.
