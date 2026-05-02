> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# VNV-003 Automated Test Evidence Rubric

Status: artifact-specific QA rubric.

Basis: TDD/CI.

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
- Intent: Automated Test Evidence declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item.
- Required evidence: artifact header, owner/approver fields, control graph and ledger links.
- Fail if: missing owner, missing lifecycle state, unlinked node or ledger.

### A02 Source intent and authorization

- Severity: `critical`
- Intent: Automated Test Evidence ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests.
- Required evidence: answer IDs, approved assumptions, source references.
- Fail if: unsupported material claim, unapproved assumption, missing source trace.

### A03 Scope boundary and tailoring

- Severity: `critical`
- Intent: Automated Test Evidence defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable.
- Required evidence: scope table, tailoring note, deferred list.
- Fail if: scope ambiguity, tailoring without rationale, deferred work without owner.

### A04 Artifact-specific focus: execution logs

- Severity: `major`
- Intent: Automated Test Evidence addresses `execution logs` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering execution logs, owner or accountable role, linked evidence.
- Fail if: execution logs is generic, execution logs lacks evidence, execution logs lacks owner.

### A05 Artifact-specific focus: CI run

- Severity: `major`
- Intent: Automated Test Evidence addresses `CI run` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering CI run, owner or accountable role, linked evidence.
- Fail if: CI run is generic, CI run lacks evidence, CI run lacks owner.

### A06 Artifact-specific focus: coverage

- Severity: `major`
- Intent: Automated Test Evidence addresses `coverage` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering coverage, owner or accountable role, linked evidence.
- Fail if: coverage is generic, coverage lacks evidence, coverage lacks owner.

### A07 Artifact-specific focus: flake analysis

- Severity: `major`
- Intent: Automated Test Evidence addresses `flake analysis` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering flake analysis, owner or accountable role, linked evidence.
- Fail if: flake analysis is generic, flake analysis lacks evidence, flake analysis lacks owner.

### A08 Artifact-specific focus: failure triage

- Severity: `major`
- Intent: Automated Test Evidence addresses `failure triage` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering failure triage, owner or accountable role, linked evidence.
- Fail if: failure triage is generic, failure triage lacks evidence, failure triage lacks owner.

### A09 Family theme coverage: exit decision

- Severity: `major`
- Intent: Automated Test Evidence handles `exit decision` according to its artifact family obligations.
- Required evidence: exit decision section, trace link, review evidence.
- Fail if: exit decision omitted, exit decision not traceable, exit decision not reviewable.

### A10 Standards and method mapping

- Severity: `critical`
- Intent: Automated Test Evidence maps named standards and methods to concrete sections, evidence, or justified exclusions.
- Required evidence: standards mapping, tailoring rationale, waivers.
- Fail if: standard named without mapping, unsupported compliance claim.

### A11 Bidirectional traceability

- Severity: `critical`
- Intent: Automated Test Evidence supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable.
- Required evidence: trace matrix entries, reverse links, gap log.
- Fail if: one-way trace only, missing risk/test/design links.

### A12 Decision rationale and alternatives

- Severity: `major`
- Intent: Automated Test Evidence records material decisions, alternatives considered, rationale, consequences, and reversal triggers.
- Required evidence: decision table, alternative analysis, ADR links.
- Fail if: decision without alternatives, rationale too generic, no reversal trigger.

### A13 Risk, assumption, and residual-risk handling

- Severity: `critical`
- Intent: Automated Test Evidence records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger.
- Required evidence: risk table, assumption log, residual-risk acceptance.
- Fail if: risk without owner, assumption without confidence, residual risk not accepted.

### A14 Verification and acceptance evidence

- Severity: `critical`
- Intent: Automated Test Evidence defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof.
- Required evidence: test links, review evidence, holdout/transfer evidence.
- Fail if: no proof path, evidence cannot be rerun, acceptance criteria absent.

### A15 Artifact-specific critic panel instantiated

- Severity: `critical`
- Intent: Automated Test Evidence has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics.
- Required evidence: artifact review panel record, critic personas, cross-critique.
- Fail if: generic reviewers only, missing critic seat, no cross-critique.

### A16 Handoff and future resumption

- Severity: `major`
- Intent: Automated Test Evidence includes human handoff, agent handoff, next action, and re-entry triggers so work can continue without hidden context.
- Required evidence: handoff notes, project-book index link, re-entry triggers.
- Fail if: handoff missing, next action unclear, depends on original author.

### A17 Quality certificate readiness

- Severity: `critical`
- Intent: Automated Test Evidence is ready for refinery gate and certificate only when failed rubric points have fixes or accepted residual risk.
- Required evidence: rubric score record, fix evidence, refinery gate.
- Fail if: failed point unresolved, certificate references missing evidence.

### A18 No template residue or unsupported claims

- Severity: `critical`
- Intent: Automated Test Evidence contains no placeholder text, fictional examples as real evidence, generic filler, or claims beyond evidence.
- Required evidence: placeholder scan, example-removal note, claim/evidence review.
- Fail if: TBD/TODO remains, fictional example used as proof, claim exceeds evidence.

## Critic-Seat Rubrics

## VNV-003-C1 Test Evidence Critic

Seat kind: `content_authority`.

Mandate: validates execution logs, pass/fail meaning, flake risk, and rerunability.

### VNV-003-C1 Test Evidence Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The VNV-003-C1 Test Evidence Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Automated Test Evidence`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### VNV-003-C1 Test Evidence Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates execution logs, pass/fail meaning, flake risk, and rerunability.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### VNV-003-C1 Test Evidence Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `execution logs` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: execution logs evidence, critic rationale.
- Fail if: execution logs generic, no challenge recorded.

### VNV-003-C1 Test Evidence Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `CI run` for completeness, trace, and downstream usability.
- Required evidence: CI run section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### VNV-003-C1 Test Evidence Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `coverage` for risk, edge cases, and acceptance impact.
- Required evidence: coverage evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### VNV-003-C1 Test Evidence Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `TDD/CI` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### VNV-003-C1 Test Evidence Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the content authority lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### VNV-003-C1 Test Evidence Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### VNV-003-C1 Test Evidence Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### VNV-003-C1 Test Evidence Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### VNV-003-C1 Test Evidence Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### VNV-003-C1 Test Evidence Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### VNV-003-C1 Test Evidence Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Automated Test Evidence`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### VNV-003-C1 Test Evidence Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### VNV-003-C1 Test Evidence Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## VNV-003-C2 Implementation Critic

Seat kind: `governance_and_trace`.

Mandate: validates test-code quality, fixtures, mocks, and maintenance burden.

### VNV-003-C2 Implementation Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The VNV-003-C2 Implementation Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Automated Test Evidence`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### VNV-003-C2 Implementation Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates test-code quality, fixtures, mocks, and maintenance burden.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### VNV-003-C2 Implementation Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `execution logs` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: execution logs evidence, critic rationale.
- Fail if: execution logs generic, no challenge recorded.

### VNV-003-C2 Implementation Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `CI run` for completeness, trace, and downstream usability.
- Required evidence: CI run section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### VNV-003-C2 Implementation Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `coverage` for risk, edge cases, and acceptance impact.
- Required evidence: coverage evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### VNV-003-C2 Implementation Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `TDD/CI` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### VNV-003-C2 Implementation Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the governance and trace lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### VNV-003-C2 Implementation Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### VNV-003-C2 Implementation Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### VNV-003-C2 Implementation Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### VNV-003-C2 Implementation Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### VNV-003-C2 Implementation Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### VNV-003-C2 Implementation Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Automated Test Evidence`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### VNV-003-C2 Implementation Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### VNV-003-C2 Implementation Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## VNV-003-C3 Quality Gate Critic

Seat kind: `verification_and_handoff`.

Mandate: validates evidence links, failure triage, thresholds, and certificate readiness.

### VNV-003-C3 Quality Gate Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The VNV-003-C3 Quality Gate Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Automated Test Evidence`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### VNV-003-C3 Quality Gate Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates evidence links, failure triage, thresholds, and certificate readiness.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### VNV-003-C3 Quality Gate Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `execution logs` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: execution logs evidence, critic rationale.
- Fail if: execution logs generic, no challenge recorded.

### VNV-003-C3 Quality Gate Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `CI run` for completeness, trace, and downstream usability.
- Required evidence: CI run section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### VNV-003-C3 Quality Gate Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `coverage` for risk, edge cases, and acceptance impact.
- Required evidence: coverage evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### VNV-003-C3 Quality Gate Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `TDD/CI` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### VNV-003-C3 Quality Gate Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the verification and handoff lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### VNV-003-C3 Quality Gate Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### VNV-003-C3 Quality Gate Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### VNV-003-C3 Quality Gate Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### VNV-003-C3 Quality Gate Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### VNV-003-C3 Quality Gate Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### VNV-003-C3 Quality Gate Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Automated Test Evidence`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### VNV-003-C3 Quality Gate Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### VNV-003-C3 Quality Gate Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.
