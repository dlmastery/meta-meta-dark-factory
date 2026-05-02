> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# EVD-009 Context Pack and Predecessor Recovery Record Rubric

Status: artifact-specific QA rubric.

Basis: Gas Town-inspired context rot control.

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
- Intent: Context Pack and Predecessor Recovery Record declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item.
- Required evidence: artifact header, owner/approver fields, control graph and ledger links.
- Fail if: missing owner, missing lifecycle state, unlinked node or ledger.

### A02 Source intent and authorization

- Severity: `critical`
- Intent: Context Pack and Predecessor Recovery Record ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests.
- Required evidence: answer IDs, approved assumptions, source references.
- Fail if: unsupported material claim, unapproved assumption, missing source trace.

### A03 Scope boundary and tailoring

- Severity: `critical`
- Intent: Context Pack and Predecessor Recovery Record defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable.
- Required evidence: scope table, tailoring note, deferred list.
- Fail if: scope ambiguity, tailoring without rationale, deferred work without owner.

### A04 Artifact-specific focus: current node

- Severity: `major`
- Intent: Context Pack and Predecessor Recovery Record addresses `current node` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering current node, owner or accountable role, linked evidence.
- Fail if: current node is generic, current node lacks evidence, current node lacks owner.

### A05 Artifact-specific focus: predecessor decisions

- Severity: `major`
- Intent: Context Pack and Predecessor Recovery Record addresses `predecessor decisions` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering predecessor decisions, owner or accountable role, linked evidence.
- Fail if: predecessor decisions is generic, predecessor decisions lacks evidence, predecessor decisions lacks owner.

### A06 Artifact-specific focus: evidence index

- Severity: `major`
- Intent: Context Pack and Predecessor Recovery Record addresses `evidence index` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering evidence index, owner or accountable role, linked evidence.
- Fail if: evidence index is generic, evidence index lacks evidence, evidence index lacks owner.

### A07 Artifact-specific focus: replay drill

- Severity: `major`
- Intent: Context Pack and Predecessor Recovery Record addresses `replay drill` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering replay drill, owner or accountable role, linked evidence.
- Fail if: replay drill is generic, replay drill lacks evidence, replay drill lacks owner.

### A08 Artifact-specific focus: next action

- Severity: `major`
- Intent: Context Pack and Predecessor Recovery Record addresses `next action` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering next action, owner or accountable role, linked evidence.
- Fail if: next action is generic, next action lacks evidence, next action lacks owner.

### A09 Family theme coverage: future resumption

- Severity: `major`
- Intent: Context Pack and Predecessor Recovery Record handles `future resumption` according to its artifact family obligations.
- Required evidence: future resumption section, trace link, review evidence.
- Fail if: future resumption omitted, future resumption not traceable, future resumption not reviewable.

### A10 Standards and method mapping

- Severity: `critical`
- Intent: Context Pack and Predecessor Recovery Record maps named standards and methods to concrete sections, evidence, or justified exclusions.
- Required evidence: standards mapping, tailoring rationale, waivers.
- Fail if: standard named without mapping, unsupported compliance claim.

### A11 Bidirectional traceability

- Severity: `critical`
- Intent: Context Pack and Predecessor Recovery Record supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable.
- Required evidence: trace matrix entries, reverse links, gap log.
- Fail if: one-way trace only, missing risk/test/design links.

### A12 Decision rationale and alternatives

- Severity: `major`
- Intent: Context Pack and Predecessor Recovery Record records material decisions, alternatives considered, rationale, consequences, and reversal triggers.
- Required evidence: decision table, alternative analysis, ADR links.
- Fail if: decision without alternatives, rationale too generic, no reversal trigger.

### A13 Risk, assumption, and residual-risk handling

- Severity: `critical`
- Intent: Context Pack and Predecessor Recovery Record records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger.
- Required evidence: risk table, assumption log, residual-risk acceptance.
- Fail if: risk without owner, assumption without confidence, residual risk not accepted.

### A14 Verification and acceptance evidence

- Severity: `critical`
- Intent: Context Pack and Predecessor Recovery Record defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof.
- Required evidence: test links, review evidence, holdout/transfer evidence.
- Fail if: no proof path, evidence cannot be rerun, acceptance criteria absent.

### A15 Artifact-specific critic panel instantiated

- Severity: `critical`
- Intent: Context Pack and Predecessor Recovery Record has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics.
- Required evidence: artifact review panel record, critic personas, cross-critique.
- Fail if: generic reviewers only, missing critic seat, no cross-critique.

### A16 Handoff and future resumption

- Severity: `major`
- Intent: Context Pack and Predecessor Recovery Record includes human handoff, agent handoff, next action, and re-entry triggers so work can continue without hidden context.
- Required evidence: handoff notes, project-book index link, re-entry triggers.
- Fail if: handoff missing, next action unclear, depends on original author.

### A17 Quality certificate readiness

- Severity: `critical`
- Intent: Context Pack and Predecessor Recovery Record is ready for refinery gate and certificate only when failed rubric points have fixes or accepted residual risk.
- Required evidence: rubric score record, fix evidence, refinery gate.
- Fail if: failed point unresolved, certificate references missing evidence.

### A18 No template residue or unsupported claims

- Severity: `critical`
- Intent: Context Pack and Predecessor Recovery Record contains no placeholder text, fictional examples as real evidence, generic filler, or claims beyond evidence.
- Required evidence: placeholder scan, example-removal note, claim/evidence review.
- Fail if: TBD/TODO remains, fictional example used as proof, claim exceeds evidence.

## Critic-Seat Rubrics

## EVD-009-C1 Continuity Critic

Seat kind: `content_authority`.

Mandate: validates current node, next action, decisions, and resume path.

### EVD-009-C1 Continuity Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The EVD-009-C1 Continuity Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Context Pack and Predecessor Recovery Record`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### EVD-009-C1 Continuity Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates current node, next action, decisions, and resume path.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### EVD-009-C1 Continuity Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `current node` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: current node evidence, critic rationale.
- Fail if: current node generic, no challenge recorded.

### EVD-009-C1 Continuity Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `predecessor decisions` for completeness, trace, and downstream usability.
- Required evidence: predecessor decisions section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### EVD-009-C1 Continuity Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `evidence index` for risk, edge cases, and acceptance impact.
- Required evidence: evidence index evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### EVD-009-C1 Continuity Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `Gas Town-inspired context rot control` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### EVD-009-C1 Continuity Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the content authority lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### EVD-009-C1 Continuity Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### EVD-009-C1 Continuity Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### EVD-009-C1 Continuity Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### EVD-009-C1 Continuity Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### EVD-009-C1 Continuity Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### EVD-009-C1 Continuity Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Context Pack and Predecessor Recovery Record`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### EVD-009-C1 Continuity Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### EVD-009-C1 Continuity Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## EVD-009-C2 Governance Memory Critic

Seat kind: `governance_and_trace`.

Mandate: validates evidence index, drift, trace links, and audit history.

### EVD-009-C2 Governance Memory Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The EVD-009-C2 Governance Memory Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Context Pack and Predecessor Recovery Record`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### EVD-009-C2 Governance Memory Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates evidence index, drift, trace links, and audit history.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### EVD-009-C2 Governance Memory Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `current node` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: current node evidence, critic rationale.
- Fail if: current node generic, no challenge recorded.

### EVD-009-C2 Governance Memory Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `predecessor decisions` for completeness, trace, and downstream usability.
- Required evidence: predecessor decisions section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### EVD-009-C2 Governance Memory Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `evidence index` for risk, edge cases, and acceptance impact.
- Required evidence: evidence index evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### EVD-009-C2 Governance Memory Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `Gas Town-inspired context rot control` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### EVD-009-C2 Governance Memory Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the governance and trace lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### EVD-009-C2 Governance Memory Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### EVD-009-C2 Governance Memory Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### EVD-009-C2 Governance Memory Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### EVD-009-C2 Governance Memory Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### EVD-009-C2 Governance Memory Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### EVD-009-C2 Governance Memory Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Context Pack and Predecessor Recovery Record`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### EVD-009-C2 Governance Memory Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### EVD-009-C2 Governance Memory Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## EVD-009-C3 Human Recovery Critic

Seat kind: `verification_and_handoff`.

Mandate: validates replay drill, predecessor state, and handoff usability.

### EVD-009-C3 Human Recovery Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The EVD-009-C3 Human Recovery Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Context Pack and Predecessor Recovery Record`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### EVD-009-C3 Human Recovery Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates replay drill, predecessor state, and handoff usability.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### EVD-009-C3 Human Recovery Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `current node` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: current node evidence, critic rationale.
- Fail if: current node generic, no challenge recorded.

### EVD-009-C3 Human Recovery Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `predecessor decisions` for completeness, trace, and downstream usability.
- Required evidence: predecessor decisions section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### EVD-009-C3 Human Recovery Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `evidence index` for risk, edge cases, and acceptance impact.
- Required evidence: evidence index evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### EVD-009-C3 Human Recovery Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `Gas Town-inspired context rot control` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### EVD-009-C3 Human Recovery Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the verification and handoff lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### EVD-009-C3 Human Recovery Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### EVD-009-C3 Human Recovery Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### EVD-009-C3 Human Recovery Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### EVD-009-C3 Human Recovery Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### EVD-009-C3 Human Recovery Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### EVD-009-C3 Human Recovery Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Context Pack and Predecessor Recovery Record`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### EVD-009-C3 Human Recovery Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### EVD-009-C3 Human Recovery Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.
