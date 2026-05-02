> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# EVD-007 Refinery Gate Record Rubric

Status: artifact-specific QA rubric.

Basis: DFMS/Fabro/Gas Town verification merge.

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
- Intent: Refinery Gate Record declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item.
- Required evidence: artifact header, owner/approver fields, control graph and ledger links.
- Fail if: missing owner, missing lifecycle state, unlinked node or ledger.

### A02 Source intent and authorization

- Severity: `critical`
- Intent: Refinery Gate Record ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests.
- Required evidence: answer IDs, approved assumptions, source references.
- Fail if: unsupported material claim, unapproved assumption, missing source trace.

### A03 Scope boundary and tailoring

- Severity: `critical`
- Intent: Refinery Gate Record defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable.
- Required evidence: scope table, tailoring note, deferred list.
- Fail if: scope ambiguity, tailoring without rationale, deferred work without owner.

### A04 Artifact-specific focus: core checks

- Severity: `major`
- Intent: Refinery Gate Record addresses `core checks` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering core checks, owner or accountable role, linked evidence.
- Fail if: core checks is generic, core checks lacks evidence, core checks lacks owner.

### A05 Artifact-specific focus: test evidence

- Severity: `major`
- Intent: Refinery Gate Record addresses `test evidence` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering test evidence, owner or accountable role, linked evidence.
- Fail if: test evidence is generic, test evidence lacks evidence, test evidence lacks owner.

### A06 Artifact-specific focus: trace evidence

- Severity: `major`
- Intent: Refinery Gate Record addresses `trace evidence` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering trace evidence, owner or accountable role, linked evidence.
- Fail if: trace evidence is generic, trace evidence lacks evidence, trace evidence lacks owner.

### A07 Artifact-specific focus: rubric evidence

- Severity: `major`
- Intent: Refinery Gate Record addresses `rubric evidence` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering rubric evidence, owner or accountable role, linked evidence.
- Fail if: rubric evidence is generic, rubric evidence lacks evidence, rubric evidence lacks owner.

### A08 Artifact-specific focus: gate verdict

- Severity: `major`
- Intent: Refinery Gate Record addresses `gate verdict` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering gate verdict, owner or accountable role, linked evidence.
- Fail if: gate verdict is generic, gate verdict lacks evidence, gate verdict lacks owner.

### A09 Family theme coverage: future resumption

- Severity: `major`
- Intent: Refinery Gate Record handles `future resumption` according to its artifact family obligations.
- Required evidence: future resumption section, trace link, review evidence.
- Fail if: future resumption omitted, future resumption not traceable, future resumption not reviewable.

### A10 Standards and method mapping

- Severity: `critical`
- Intent: Refinery Gate Record maps named standards and methods to concrete sections, evidence, or justified exclusions.
- Required evidence: standards mapping, tailoring rationale, waivers.
- Fail if: standard named without mapping, unsupported compliance claim.

### A11 Bidirectional traceability

- Severity: `critical`
- Intent: Refinery Gate Record supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable.
- Required evidence: trace matrix entries, reverse links, gap log.
- Fail if: one-way trace only, missing risk/test/design links.

### A12 Decision rationale and alternatives

- Severity: `major`
- Intent: Refinery Gate Record records material decisions, alternatives considered, rationale, consequences, and reversal triggers.
- Required evidence: decision table, alternative analysis, ADR links.
- Fail if: decision without alternatives, rationale too generic, no reversal trigger.

### A13 Risk, assumption, and residual-risk handling

- Severity: `critical`
- Intent: Refinery Gate Record records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger.
- Required evidence: risk table, assumption log, residual-risk acceptance.
- Fail if: risk without owner, assumption without confidence, residual risk not accepted.

### A14 Verification and acceptance evidence

- Severity: `critical`
- Intent: Refinery Gate Record defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof.
- Required evidence: test links, review evidence, holdout/transfer evidence.
- Fail if: no proof path, evidence cannot be rerun, acceptance criteria absent.

### A15 Artifact-specific critic panel instantiated

- Severity: `critical`
- Intent: Refinery Gate Record has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics.
- Required evidence: artifact review panel record, critic personas, cross-critique.
- Fail if: generic reviewers only, missing critic seat, no cross-critique.

### A16 Handoff and future resumption

- Severity: `major`
- Intent: Refinery Gate Record includes human handoff, agent handoff, next action, and re-entry triggers so work can continue without hidden context.
- Required evidence: handoff notes, project-book index link, re-entry triggers.
- Fail if: handoff missing, next action unclear, depends on original author.

### A17 Quality certificate readiness

- Severity: `critical`
- Intent: Refinery Gate Record is ready for refinery gate and certificate only when failed rubric points have fixes or accepted residual risk.
- Required evidence: rubric score record, fix evidence, refinery gate.
- Fail if: failed point unresolved, certificate references missing evidence.

### A18 No template residue or unsupported claims

- Severity: `critical`
- Intent: Refinery Gate Record contains no placeholder text, fictional examples as real evidence, generic filler, or claims beyond evidence.
- Required evidence: placeholder scan, example-removal note, claim/evidence review.
- Fail if: TBD/TODO remains, fictional example used as proof, claim exceeds evidence.

## Critic-Seat Rubrics

## EVD-007-C1 Quality Gate Critic

Seat kind: `content_authority`.

Mandate: validates gate scope, core checks, verdict, and failed-point resolution.

### EVD-007-C1 Quality Gate Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The EVD-007-C1 Quality Gate Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Refinery Gate Record`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### EVD-007-C1 Quality Gate Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates gate scope, core checks, verdict, and failed-point resolution.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### EVD-007-C1 Quality Gate Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `core checks` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: core checks evidence, critic rationale.
- Fail if: core checks generic, no challenge recorded.

### EVD-007-C1 Quality Gate Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `test evidence` for completeness, trace, and downstream usability.
- Required evidence: test evidence section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### EVD-007-C1 Quality Gate Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `trace evidence` for risk, edge cases, and acceptance impact.
- Required evidence: trace evidence evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### EVD-007-C1 Quality Gate Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `DFMS/Fabro/Gas Town verification merge` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### EVD-007-C1 Quality Gate Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the content authority lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### EVD-007-C1 Quality Gate Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### EVD-007-C1 Quality Gate Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### EVD-007-C1 Quality Gate Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### EVD-007-C1 Quality Gate Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### EVD-007-C1 Quality Gate Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### EVD-007-C1 Quality Gate Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Refinery Gate Record`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### EVD-007-C1 Quality Gate Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### EVD-007-C1 Quality Gate Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## EVD-007-C2 Verification Critic

Seat kind: `governance_and_trace`.

Mandate: validates tests, evidence, rerunability, and unresolved gaps.

### EVD-007-C2 Verification Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The EVD-007-C2 Verification Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Refinery Gate Record`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### EVD-007-C2 Verification Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates tests, evidence, rerunability, and unresolved gaps.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### EVD-007-C2 Verification Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `core checks` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: core checks evidence, critic rationale.
- Fail if: core checks generic, no challenge recorded.

### EVD-007-C2 Verification Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `test evidence` for completeness, trace, and downstream usability.
- Required evidence: test evidence section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### EVD-007-C2 Verification Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `trace evidence` for risk, edge cases, and acceptance impact.
- Required evidence: trace evidence evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### EVD-007-C2 Verification Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `DFMS/Fabro/Gas Town verification merge` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### EVD-007-C2 Verification Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the governance and trace lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### EVD-007-C2 Verification Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### EVD-007-C2 Verification Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### EVD-007-C2 Verification Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### EVD-007-C2 Verification Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### EVD-007-C2 Verification Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### EVD-007-C2 Verification Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Refinery Gate Record`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### EVD-007-C2 Verification Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### EVD-007-C2 Verification Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## EVD-007-C3 Governance Critic

Seat kind: `verification_and_handoff`.

Mandate: validates trace links, panel records, waivers, and certificate readiness.

### EVD-007-C3 Governance Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The EVD-007-C3 Governance Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Refinery Gate Record`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### EVD-007-C3 Governance Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates trace links, panel records, waivers, and certificate readiness.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### EVD-007-C3 Governance Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `core checks` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: core checks evidence, critic rationale.
- Fail if: core checks generic, no challenge recorded.

### EVD-007-C3 Governance Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `test evidence` for completeness, trace, and downstream usability.
- Required evidence: test evidence section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### EVD-007-C3 Governance Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `trace evidence` for risk, edge cases, and acceptance impact.
- Required evidence: trace evidence evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### EVD-007-C3 Governance Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `DFMS/Fabro/Gas Town verification merge` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### EVD-007-C3 Governance Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the verification and handoff lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### EVD-007-C3 Governance Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### EVD-007-C3 Governance Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### EVD-007-C3 Governance Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### EVD-007-C3 Governance Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### EVD-007-C3 Governance Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### EVD-007-C3 Governance Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Refinery Gate Record`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### EVD-007-C3 Governance Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### EVD-007-C3 Governance Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.
