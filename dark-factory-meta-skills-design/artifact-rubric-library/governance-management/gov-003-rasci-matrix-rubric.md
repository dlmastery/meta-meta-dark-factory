> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# GOV-003 RASCI Matrix Rubric

Status: artifact-specific QA rubric.

Basis: Human-agent accountability.

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
- Intent: RASCI Matrix declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item.
- Required evidence: artifact header, owner/approver fields, control graph and ledger links.
- Fail if: missing owner, missing lifecycle state, unlinked node or ledger.

### A02 Source intent and authorization

- Severity: `critical`
- Intent: RASCI Matrix ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests.
- Required evidence: answer IDs, approved assumptions, source references.
- Fail if: unsupported material claim, unapproved assumption, missing source trace.

### A03 Scope boundary and tailoring

- Severity: `critical`
- Intent: RASCI Matrix defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable.
- Required evidence: scope table, tailoring note, deferred list.
- Fail if: scope ambiguity, tailoring without rationale, deferred work without owner.

### A04 Artifact-specific focus: accountable owners

- Severity: `major`
- Intent: RASCI Matrix addresses `accountable owners` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering accountable owners, owner or accountable role, linked evidence.
- Fail if: accountable owners is generic, accountable owners lacks evidence, accountable owners lacks owner.

### A05 Artifact-specific focus: approval authority

- Severity: `major`
- Intent: RASCI Matrix addresses `approval authority` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering approval authority, owner or accountable role, linked evidence.
- Fail if: approval authority is generic, approval authority lacks evidence, approval authority lacks owner.

### A06 Artifact-specific focus: agent/human handoff

- Severity: `major`
- Intent: RASCI Matrix addresses `agent/human handoff` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering agent/human handoff, owner or accountable role, linked evidence.
- Fail if: agent/human handoff is generic, agent/human handoff lacks evidence, agent/human handoff lacks owner.

### A07 Artifact-specific focus: segregation of duties

- Severity: `major`
- Intent: RASCI Matrix addresses `segregation of duties` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering segregation of duties, owner or accountable role, linked evidence.
- Fail if: segregation of duties is generic, segregation of duties lacks evidence, segregation of duties lacks owner.

### A08 Artifact-specific focus: escalation path

- Severity: `major`
- Intent: RASCI Matrix addresses `escalation path` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering escalation path, owner or accountable role, linked evidence.
- Fail if: escalation path is generic, escalation path lacks evidence, escalation path lacks owner.

### A09 Family theme coverage: human-agent accountability

- Severity: `major`
- Intent: RASCI Matrix handles `human-agent accountability` according to its artifact family obligations.
- Required evidence: human-agent accountability section, trace link, review evidence.
- Fail if: human-agent accountability omitted, human-agent accountability not traceable, human-agent accountability not reviewable.

### A10 Standards and method mapping

- Severity: `critical`
- Intent: RASCI Matrix maps named standards and methods to concrete sections, evidence, or justified exclusions.
- Required evidence: standards mapping, tailoring rationale, waivers.
- Fail if: standard named without mapping, unsupported compliance claim.

### A11 Bidirectional traceability

- Severity: `critical`
- Intent: RASCI Matrix supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable.
- Required evidence: trace matrix entries, reverse links, gap log.
- Fail if: one-way trace only, missing risk/test/design links.

### A12 Decision rationale and alternatives

- Severity: `major`
- Intent: RASCI Matrix records material decisions, alternatives considered, rationale, consequences, and reversal triggers.
- Required evidence: decision table, alternative analysis, ADR links.
- Fail if: decision without alternatives, rationale too generic, no reversal trigger.

### A13 Risk, assumption, and residual-risk handling

- Severity: `critical`
- Intent: RASCI Matrix records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger.
- Required evidence: risk table, assumption log, residual-risk acceptance.
- Fail if: risk without owner, assumption without confidence, residual risk not accepted.

### A14 Verification and acceptance evidence

- Severity: `critical`
- Intent: RASCI Matrix defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof.
- Required evidence: test links, review evidence, holdout/transfer evidence.
- Fail if: no proof path, evidence cannot be rerun, acceptance criteria absent.

### A15 Artifact-specific critic panel instantiated

- Severity: `critical`
- Intent: RASCI Matrix has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics.
- Required evidence: artifact review panel record, critic personas, cross-critique.
- Fail if: generic reviewers only, missing critic seat, no cross-critique.

### A16 Handoff and future resumption

- Severity: `major`
- Intent: RASCI Matrix includes human handoff, agent handoff, next action, and re-entry triggers so work can continue without hidden context.
- Required evidence: handoff notes, project-book index link, re-entry triggers.
- Fail if: handoff missing, next action unclear, depends on original author.

### A17 Quality certificate readiness

- Severity: `critical`
- Intent: RASCI Matrix is ready for refinery gate and certificate only when failed rubric points have fixes or accepted residual risk.
- Required evidence: rubric score record, fix evidence, refinery gate.
- Fail if: failed point unresolved, certificate references missing evidence.

### A18 No template residue or unsupported claims

- Severity: `critical`
- Intent: RASCI Matrix contains no placeholder text, fictional examples as real evidence, generic filler, or claims beyond evidence.
- Required evidence: placeholder scan, example-removal note, claim/evidence review.
- Fail if: TBD/TODO remains, fictional example used as proof, claim exceeds evidence.

## Critic-Seat Rubrics

## GOV-003-C1 Accountability Design Critic

Seat kind: `content_authority`.

Mandate: validates role clarity, decision rights, and human-agent ownership.

### GOV-003-C1 Accountability Design Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The GOV-003-C1 Accountability Design Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `RASCI Matrix`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### GOV-003-C1 Accountability Design Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates role clarity, decision rights, and human-agent ownership.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### GOV-003-C1 Accountability Design Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `accountable owners` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: accountable owners evidence, critic rationale.
- Fail if: accountable owners generic, no challenge recorded.

### GOV-003-C1 Accountability Design Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `approval authority` for completeness, trace, and downstream usability.
- Required evidence: approval authority section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### GOV-003-C1 Accountability Design Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `agent/human handoff` for risk, edge cases, and acceptance impact.
- Required evidence: agent/human handoff evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### GOV-003-C1 Accountability Design Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `Human-agent accountability` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### GOV-003-C1 Accountability Design Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the content authority lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### GOV-003-C1 Accountability Design Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### GOV-003-C1 Accountability Design Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### GOV-003-C1 Accountability Design Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### GOV-003-C1 Accountability Design Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### GOV-003-C1 Accountability Design Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### GOV-003-C1 Accountability Design Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `RASCI Matrix`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### GOV-003-C1 Accountability Design Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### GOV-003-C1 Accountability Design Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## GOV-003-C2 Governance Authority Critic

Seat kind: `governance_and_trace`.

Mandate: validates approval authority, segregation of duties, waiver owner, and escalation path.

### GOV-003-C2 Governance Authority Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The GOV-003-C2 Governance Authority Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `RASCI Matrix`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### GOV-003-C2 Governance Authority Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates approval authority, segregation of duties, waiver owner, and escalation path.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### GOV-003-C2 Governance Authority Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `accountable owners` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: accountable owners evidence, critic rationale.
- Fail if: accountable owners generic, no challenge recorded.

### GOV-003-C2 Governance Authority Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `approval authority` for completeness, trace, and downstream usability.
- Required evidence: approval authority section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### GOV-003-C2 Governance Authority Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `agent/human handoff` for risk, edge cases, and acceptance impact.
- Required evidence: agent/human handoff evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### GOV-003-C2 Governance Authority Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `Human-agent accountability` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### GOV-003-C2 Governance Authority Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the governance and trace lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### GOV-003-C2 Governance Authority Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### GOV-003-C2 Governance Authority Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### GOV-003-C2 Governance Authority Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### GOV-003-C2 Governance Authority Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### GOV-003-C2 Governance Authority Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### GOV-003-C2 Governance Authority Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `RASCI Matrix`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### GOV-003-C2 Governance Authority Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### GOV-003-C2 Governance Authority Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## GOV-003-C3 Delivery Continuity Critic

Seat kind: `verification_and_handoff`.

Mandate: validates takeover, handback, async review, and operational continuity.

### GOV-003-C3 Delivery Continuity Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The GOV-003-C3 Delivery Continuity Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `RASCI Matrix`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### GOV-003-C3 Delivery Continuity Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates takeover, handback, async review, and operational continuity.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### GOV-003-C3 Delivery Continuity Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `accountable owners` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: accountable owners evidence, critic rationale.
- Fail if: accountable owners generic, no challenge recorded.

### GOV-003-C3 Delivery Continuity Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `approval authority` for completeness, trace, and downstream usability.
- Required evidence: approval authority section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### GOV-003-C3 Delivery Continuity Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `agent/human handoff` for risk, edge cases, and acceptance impact.
- Required evidence: agent/human handoff evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### GOV-003-C3 Delivery Continuity Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `Human-agent accountability` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### GOV-003-C3 Delivery Continuity Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the verification and handoff lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### GOV-003-C3 Delivery Continuity Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### GOV-003-C3 Delivery Continuity Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### GOV-003-C3 Delivery Continuity Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### GOV-003-C3 Delivery Continuity Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### GOV-003-C3 Delivery Continuity Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### GOV-003-C3 Delivery Continuity Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `RASCI Matrix`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### GOV-003-C3 Delivery Continuity Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### GOV-003-C3 Delivery Continuity Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.
