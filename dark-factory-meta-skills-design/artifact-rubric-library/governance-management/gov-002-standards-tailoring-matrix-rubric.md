> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# GOV-002 Standards Tailoring Matrix Rubric

Status: artifact-specific QA rubric.

Basis: ISO 12207, ISO 15289, company process.

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
- Intent: Standards Tailoring Matrix declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item.
- Required evidence: artifact header, owner/approver fields, control graph and ledger links.
- Fail if: missing owner, missing lifecycle state, unlinked node or ledger.

### A02 Source intent and authorization

- Severity: `critical`
- Intent: Standards Tailoring Matrix ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests.
- Required evidence: answer IDs, approved assumptions, source references.
- Fail if: unsupported material claim, unapproved assumption, missing source trace.

### A03 Scope boundary and tailoring

- Severity: `critical`
- Intent: Standards Tailoring Matrix defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable.
- Required evidence: scope table, tailoring note, deferred list.
- Fail if: scope ambiguity, tailoring without rationale, deferred work without owner.

### A04 Artifact-specific focus: included standards

- Severity: `major`
- Intent: Standards Tailoring Matrix addresses `included standards` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering included standards, owner or accountable role, linked evidence.
- Fail if: included standards is generic, included standards lacks evidence, included standards lacks owner.

### A05 Artifact-specific focus: excluded standards

- Severity: `major`
- Intent: Standards Tailoring Matrix addresses `excluded standards` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering excluded standards, owner or accountable role, linked evidence.
- Fail if: excluded standards is generic, excluded standards lacks evidence, excluded standards lacks owner.

### A06 Artifact-specific focus: tailoring rationale

- Severity: `major`
- Intent: Standards Tailoring Matrix addresses `tailoring rationale` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering tailoring rationale, owner or accountable role, linked evidence.
- Fail if: tailoring rationale is generic, tailoring rationale lacks evidence, tailoring rationale lacks owner.

### A07 Artifact-specific focus: information-item mapping

- Severity: `major`
- Intent: Standards Tailoring Matrix addresses `information-item mapping` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering information-item mapping, owner or accountable role, linked evidence.
- Fail if: information-item mapping is generic, information-item mapping lacks evidence, information-item mapping lacks owner.

### A08 Artifact-specific focus: waiver policy

- Severity: `major`
- Intent: Standards Tailoring Matrix addresses `waiver policy` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering waiver policy, owner or accountable role, linked evidence.
- Fail if: waiver policy is generic, waiver policy lacks evidence, waiver policy lacks owner.

### A09 Family theme coverage: human-agent accountability

- Severity: `major`
- Intent: Standards Tailoring Matrix handles `human-agent accountability` according to its artifact family obligations.
- Required evidence: human-agent accountability section, trace link, review evidence.
- Fail if: human-agent accountability omitted, human-agent accountability not traceable, human-agent accountability not reviewable.

### A10 Standards and method mapping

- Severity: `critical`
- Intent: Standards Tailoring Matrix maps named standards and methods to concrete sections, evidence, or justified exclusions.
- Required evidence: standards mapping, tailoring rationale, waivers.
- Fail if: standard named without mapping, unsupported compliance claim.

### A11 Bidirectional traceability

- Severity: `critical`
- Intent: Standards Tailoring Matrix supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable.
- Required evidence: trace matrix entries, reverse links, gap log.
- Fail if: one-way trace only, missing risk/test/design links.

### A12 Decision rationale and alternatives

- Severity: `major`
- Intent: Standards Tailoring Matrix records material decisions, alternatives considered, rationale, consequences, and reversal triggers.
- Required evidence: decision table, alternative analysis, ADR links.
- Fail if: decision without alternatives, rationale too generic, no reversal trigger.

### A13 Risk, assumption, and residual-risk handling

- Severity: `critical`
- Intent: Standards Tailoring Matrix records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger.
- Required evidence: risk table, assumption log, residual-risk acceptance.
- Fail if: risk without owner, assumption without confidence, residual risk not accepted.

### A14 Verification and acceptance evidence

- Severity: `critical`
- Intent: Standards Tailoring Matrix defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof.
- Required evidence: test links, review evidence, holdout/transfer evidence.
- Fail if: no proof path, evidence cannot be rerun, acceptance criteria absent.

### A15 Artifact-specific critic panel instantiated

- Severity: `critical`
- Intent: Standards Tailoring Matrix has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics.
- Required evidence: artifact review panel record, critic personas, cross-critique.
- Fail if: generic reviewers only, missing critic seat, no cross-critique.

### A16 Handoff and future resumption

- Severity: `major`
- Intent: Standards Tailoring Matrix includes human handoff, agent handoff, next action, and re-entry triggers so work can continue without hidden context.
- Required evidence: handoff notes, project-book index link, re-entry triggers.
- Fail if: handoff missing, next action unclear, depends on original author.

### A17 Quality certificate readiness

- Severity: `critical`
- Intent: Standards Tailoring Matrix is ready for refinery gate and certificate only when failed rubric points have fixes or accepted residual risk.
- Required evidence: rubric score record, fix evidence, refinery gate.
- Fail if: failed point unresolved, certificate references missing evidence.

### A18 No template residue or unsupported claims

- Severity: `critical`
- Intent: Standards Tailoring Matrix contains no placeholder text, fictional examples as real evidence, generic filler, or claims beyond evidence.
- Required evidence: placeholder scan, example-removal note, claim/evidence review.
- Fail if: TBD/TODO remains, fictional example used as proof, claim exceeds evidence.

## Critic-Seat Rubrics

## GOV-002-C1 Standards Tailoring Critic

Seat kind: `content_authority`.

Mandate: validates included/excluded standards, method fit, and tailoring rationale.

### GOV-002-C1 Standards Tailoring Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The GOV-002-C1 Standards Tailoring Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Standards Tailoring Matrix`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### GOV-002-C1 Standards Tailoring Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates included/excluded standards, method fit, and tailoring rationale.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### GOV-002-C1 Standards Tailoring Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `included standards` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: included standards evidence, critic rationale.
- Fail if: included standards generic, no challenge recorded.

### GOV-002-C1 Standards Tailoring Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `excluded standards` for completeness, trace, and downstream usability.
- Required evidence: excluded standards section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### GOV-002-C1 Standards Tailoring Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `tailoring rationale` for risk, edge cases, and acceptance impact.
- Required evidence: tailoring rationale evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### GOV-002-C1 Standards Tailoring Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `ISO 12207, ISO 15289, company process` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### GOV-002-C1 Standards Tailoring Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the content authority lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### GOV-002-C1 Standards Tailoring Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### GOV-002-C1 Standards Tailoring Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### GOV-002-C1 Standards Tailoring Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### GOV-002-C1 Standards Tailoring Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### GOV-002-C1 Standards Tailoring Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### GOV-002-C1 Standards Tailoring Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Standards Tailoring Matrix`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### GOV-002-C1 Standards Tailoring Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### GOV-002-C1 Standards Tailoring Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## GOV-002-C2 Audit Evidence Critic

Seat kind: `governance_and_trace`.

Mandate: validates clauses, information items, waivers, owners, and defensible compliance language.

### GOV-002-C2 Audit Evidence Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The GOV-002-C2 Audit Evidence Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Standards Tailoring Matrix`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### GOV-002-C2 Audit Evidence Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates clauses, information items, waivers, owners, and defensible compliance language.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### GOV-002-C2 Audit Evidence Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `included standards` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: included standards evidence, critic rationale.
- Fail if: included standards generic, no challenge recorded.

### GOV-002-C2 Audit Evidence Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `excluded standards` for completeness, trace, and downstream usability.
- Required evidence: excluded standards section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### GOV-002-C2 Audit Evidence Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `tailoring rationale` for risk, edge cases, and acceptance impact.
- Required evidence: tailoring rationale evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### GOV-002-C2 Audit Evidence Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `ISO 12207, ISO 15289, company process` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### GOV-002-C2 Audit Evidence Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the governance and trace lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### GOV-002-C2 Audit Evidence Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### GOV-002-C2 Audit Evidence Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### GOV-002-C2 Audit Evidence Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### GOV-002-C2 Audit Evidence Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### GOV-002-C2 Audit Evidence Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### GOV-002-C2 Audit Evidence Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Standards Tailoring Matrix`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### GOV-002-C2 Audit Evidence Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### GOV-002-C2 Audit Evidence Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## GOV-002-C3 Quality Threshold Critic

Seat kind: `verification_and_handoff`.

Mandate: validates quality gates, artifact coverage, review thresholds, and certificate implications.

### GOV-002-C3 Quality Threshold Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The GOV-002-C3 Quality Threshold Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Standards Tailoring Matrix`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### GOV-002-C3 Quality Threshold Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates quality gates, artifact coverage, review thresholds, and certificate implications.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### GOV-002-C3 Quality Threshold Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `included standards` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: included standards evidence, critic rationale.
- Fail if: included standards generic, no challenge recorded.

### GOV-002-C3 Quality Threshold Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `excluded standards` for completeness, trace, and downstream usability.
- Required evidence: excluded standards section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### GOV-002-C3 Quality Threshold Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `tailoring rationale` for risk, edge cases, and acceptance impact.
- Required evidence: tailoring rationale evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### GOV-002-C3 Quality Threshold Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `ISO 12207, ISO 15289, company process` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### GOV-002-C3 Quality Threshold Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the verification and handoff lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### GOV-002-C3 Quality Threshold Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### GOV-002-C3 Quality Threshold Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### GOV-002-C3 Quality Threshold Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### GOV-002-C3 Quality Threshold Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### GOV-002-C3 Quality Threshold Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### GOV-002-C3 Quality Threshold Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Standards Tailoring Matrix`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### GOV-002-C3 Quality Threshold Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### GOV-002-C3 Quality Threshold Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.
