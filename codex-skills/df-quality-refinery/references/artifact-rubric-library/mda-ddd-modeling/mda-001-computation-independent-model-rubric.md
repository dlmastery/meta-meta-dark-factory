> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# MDA-001 Computation-Independent Model Rubric

Status: artifact-specific QA rubric.

Basis: OMG MDA.

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
- Intent: Computation-Independent Model declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item.
- Required evidence: artifact header, owner/approver fields, control graph and ledger links.
- Fail if: missing owner, missing lifecycle state, unlinked node or ledger.

### A02 Source intent and authorization

- Severity: `critical`
- Intent: Computation-Independent Model ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests.
- Required evidence: answer IDs, approved assumptions, source references.
- Fail if: unsupported material claim, unapproved assumption, missing source trace.

### A03 Scope boundary and tailoring

- Severity: `critical`
- Intent: Computation-Independent Model defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable.
- Required evidence: scope table, tailoring note, deferred list.
- Fail if: scope ambiguity, tailoring without rationale, deferred work without owner.

### A04 Artifact-specific focus: business process

- Severity: `major`
- Intent: Computation-Independent Model addresses `business process` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering business process, owner or accountable role, linked evidence.
- Fail if: business process is generic, business process lacks evidence, business process lacks owner.

### A05 Artifact-specific focus: actors

- Severity: `major`
- Intent: Computation-Independent Model addresses `actors` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering actors, owner or accountable role, linked evidence.
- Fail if: actors is generic, actors lacks evidence, actors lacks owner.

### A06 Artifact-specific focus: business concepts

- Severity: `major`
- Intent: Computation-Independent Model addresses `business concepts` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering business concepts, owner or accountable role, linked evidence.
- Fail if: business concepts is generic, business concepts lacks evidence, business concepts lacks owner.

### A07 Artifact-specific focus: constraints

- Severity: `major`
- Intent: Computation-Independent Model addresses `constraints` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering constraints, owner or accountable role, linked evidence.
- Fail if: constraints is generic, constraints lacks evidence, constraints lacks owner.

### A08 Artifact-specific focus: technology-free behavior

- Severity: `major`
- Intent: Computation-Independent Model addresses `technology-free behavior` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering technology-free behavior, owner or accountable role, linked evidence.
- Fail if: technology-free behavior is generic, technology-free behavior lacks evidence, technology-free behavior lacks owner.

### A09 Family theme coverage: model verification

- Severity: `major`
- Intent: Computation-Independent Model handles `model verification` according to its artifact family obligations.
- Required evidence: model verification section, trace link, review evidence.
- Fail if: model verification omitted, model verification not traceable, model verification not reviewable.

### A10 Standards and method mapping

- Severity: `critical`
- Intent: Computation-Independent Model maps named standards and methods to concrete sections, evidence, or justified exclusions.
- Required evidence: standards mapping, tailoring rationale, waivers.
- Fail if: standard named without mapping, unsupported compliance claim.

### A11 Bidirectional traceability

- Severity: `critical`
- Intent: Computation-Independent Model supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable.
- Required evidence: trace matrix entries, reverse links, gap log.
- Fail if: one-way trace only, missing risk/test/design links.

### A12 Decision rationale and alternatives

- Severity: `major`
- Intent: Computation-Independent Model records material decisions, alternatives considered, rationale, consequences, and reversal triggers.
- Required evidence: decision table, alternative analysis, ADR links.
- Fail if: decision without alternatives, rationale too generic, no reversal trigger.

### A13 Risk, assumption, and residual-risk handling

- Severity: `critical`
- Intent: Computation-Independent Model records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger.
- Required evidence: risk table, assumption log, residual-risk acceptance.
- Fail if: risk without owner, assumption without confidence, residual risk not accepted.

### A14 Verification and acceptance evidence

- Severity: `critical`
- Intent: Computation-Independent Model defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof.
- Required evidence: test links, review evidence, holdout/transfer evidence.
- Fail if: no proof path, evidence cannot be rerun, acceptance criteria absent.

### A15 Artifact-specific critic panel instantiated

- Severity: `critical`
- Intent: Computation-Independent Model has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics.
- Required evidence: artifact review panel record, critic personas, cross-critique.
- Fail if: generic reviewers only, missing critic seat, no cross-critique.

### A16 Handoff and future resumption

- Severity: `major`
- Intent: Computation-Independent Model includes human handoff, agent handoff, next action, and re-entry triggers so work can continue without hidden context.
- Required evidence: handoff notes, project-book index link, re-entry triggers.
- Fail if: handoff missing, next action unclear, depends on original author.

### A17 Quality certificate readiness

- Severity: `critical`
- Intent: Computation-Independent Model is ready for refinery gate and certificate only when failed rubric points have fixes or accepted residual risk.
- Required evidence: rubric score record, fix evidence, refinery gate.
- Fail if: failed point unresolved, certificate references missing evidence.

### A18 No template residue or unsupported claims

- Severity: `critical`
- Intent: Computation-Independent Model contains no placeholder text, fictional examples as real evidence, generic filler, or claims beyond evidence.
- Required evidence: placeholder scan, example-removal note, claim/evidence review.
- Fail if: TBD/TODO remains, fictional example used as proof, claim exceeds evidence.

## Critic-Seat Rubrics

## MDA-001-C1 Business Model Critic

Seat kind: `content_authority`.

Mandate: validates business concepts, processes, actors, and domain goals without technology leakage.

### MDA-001-C1 Business Model Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The MDA-001-C1 Business Model Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Computation-Independent Model`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### MDA-001-C1 Business Model Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates business concepts, processes, actors, and domain goals without technology leakage.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### MDA-001-C1 Business Model Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `business process` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: business process evidence, critic rationale.
- Fail if: business process generic, no challenge recorded.

### MDA-001-C1 Business Model Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `actors` for completeness, trace, and downstream usability.
- Required evidence: actors section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### MDA-001-C1 Business Model Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `business concepts` for risk, edge cases, and acceptance impact.
- Required evidence: business concepts evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### MDA-001-C1 Business Model Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `OMG MDA` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### MDA-001-C1 Business Model Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the content authority lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### MDA-001-C1 Business Model Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### MDA-001-C1 Business Model Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### MDA-001-C1 Business Model Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### MDA-001-C1 Business Model Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### MDA-001-C1 Business Model Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### MDA-001-C1 Business Model Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Computation-Independent Model`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### MDA-001-C1 Business Model Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### MDA-001-C1 Business Model Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## MDA-001-C2 Domain Expert Critic

Seat kind: `governance_and_trace`.

Mandate: validates stakeholder language, business rules, invariants, and workflow truth.

### MDA-001-C2 Domain Expert Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The MDA-001-C2 Domain Expert Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Computation-Independent Model`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### MDA-001-C2 Domain Expert Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates stakeholder language, business rules, invariants, and workflow truth.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### MDA-001-C2 Domain Expert Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `business process` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: business process evidence, critic rationale.
- Fail if: business process generic, no challenge recorded.

### MDA-001-C2 Domain Expert Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `actors` for completeness, trace, and downstream usability.
- Required evidence: actors section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### MDA-001-C2 Domain Expert Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `business concepts` for risk, edge cases, and acceptance impact.
- Required evidence: business concepts evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### MDA-001-C2 Domain Expert Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `OMG MDA` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### MDA-001-C2 Domain Expert Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the governance and trace lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### MDA-001-C2 Domain Expert Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### MDA-001-C2 Domain Expert Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### MDA-001-C2 Domain Expert Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### MDA-001-C2 Domain Expert Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### MDA-001-C2 Domain Expert Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### MDA-001-C2 Domain Expert Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Computation-Independent Model`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### MDA-001-C2 Domain Expert Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### MDA-001-C2 Domain Expert Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## MDA-001-C3 Product Outcome Critic

Seat kind: `verification_and_handoff`.

Mandate: validates value alignment, customer scenarios, and downstream trace to requirements.

### MDA-001-C3 Product Outcome Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The MDA-001-C3 Product Outcome Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Computation-Independent Model`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### MDA-001-C3 Product Outcome Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates value alignment, customer scenarios, and downstream trace to requirements.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### MDA-001-C3 Product Outcome Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `business process` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: business process evidence, critic rationale.
- Fail if: business process generic, no challenge recorded.

### MDA-001-C3 Product Outcome Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `actors` for completeness, trace, and downstream usability.
- Required evidence: actors section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### MDA-001-C3 Product Outcome Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `business concepts` for risk, edge cases, and acceptance impact.
- Required evidence: business concepts evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### MDA-001-C3 Product Outcome Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `OMG MDA` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### MDA-001-C3 Product Outcome Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the verification and handoff lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### MDA-001-C3 Product Outcome Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### MDA-001-C3 Product Outcome Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### MDA-001-C3 Product Outcome Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### MDA-001-C3 Product Outcome Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### MDA-001-C3 Product Outcome Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### MDA-001-C3 Product Outcome Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Computation-Independent Model`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### MDA-001-C3 Product Outcome Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### MDA-001-C3 Product Outcome Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.
