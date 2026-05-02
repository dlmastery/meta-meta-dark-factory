> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# IMP-005 Migration and Backout Plan Rubric

Status: artifact-specific QA rubric.

Basis: Release/SRE.

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
- Intent: Migration and Backout Plan declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item.
- Required evidence: artifact header, owner/approver fields, control graph and ledger links.
- Fail if: missing owner, missing lifecycle state, unlinked node or ledger.

### A02 Source intent and authorization

- Severity: `critical`
- Intent: Migration and Backout Plan ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests.
- Required evidence: answer IDs, approved assumptions, source references.
- Fail if: unsupported material claim, unapproved assumption, missing source trace.

### A03 Scope boundary and tailoring

- Severity: `critical`
- Intent: Migration and Backout Plan defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable.
- Required evidence: scope table, tailoring note, deferred list.
- Fail if: scope ambiguity, tailoring without rationale, deferred work without owner.

### A04 Artifact-specific focus: migration runbook

- Severity: `major`
- Intent: Migration and Backout Plan addresses `migration runbook` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering migration runbook, owner or accountable role, linked evidence.
- Fail if: migration runbook is generic, migration runbook lacks evidence, migration runbook lacks owner.

### A05 Artifact-specific focus: dry run

- Severity: `major`
- Intent: Migration and Backout Plan addresses `dry run` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering dry run, owner or accountable role, linked evidence.
- Fail if: dry run is generic, dry run lacks evidence, dry run lacks owner.

### A06 Artifact-specific focus: validation query

- Severity: `major`
- Intent: Migration and Backout Plan addresses `validation query` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering validation query, owner or accountable role, linked evidence.
- Fail if: validation query is generic, validation query lacks evidence, validation query lacks owner.

### A07 Artifact-specific focus: rollback

- Severity: `major`
- Intent: Migration and Backout Plan addresses `rollback` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering rollback, owner or accountable role, linked evidence.
- Fail if: rollback is generic, rollback lacks evidence, rollback lacks owner.

### A08 Artifact-specific focus: cutover window

- Severity: `major`
- Intent: Migration and Backout Plan addresses `cutover window` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering cutover window, owner or accountable role, linked evidence.
- Fail if: cutover window is generic, cutover window lacks evidence, cutover window lacks owner.

### A09 Family theme coverage: maintainability

- Severity: `major`
- Intent: Migration and Backout Plan handles `maintainability` according to its artifact family obligations.
- Required evidence: maintainability section, trace link, review evidence.
- Fail if: maintainability omitted, maintainability not traceable, maintainability not reviewable.

### A10 Standards and method mapping

- Severity: `critical`
- Intent: Migration and Backout Plan maps named standards and methods to concrete sections, evidence, or justified exclusions.
- Required evidence: standards mapping, tailoring rationale, waivers.
- Fail if: standard named without mapping, unsupported compliance claim.

### A11 Bidirectional traceability

- Severity: `critical`
- Intent: Migration and Backout Plan supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable.
- Required evidence: trace matrix entries, reverse links, gap log.
- Fail if: one-way trace only, missing risk/test/design links.

### A12 Decision rationale and alternatives

- Severity: `major`
- Intent: Migration and Backout Plan records material decisions, alternatives considered, rationale, consequences, and reversal triggers.
- Required evidence: decision table, alternative analysis, ADR links.
- Fail if: decision without alternatives, rationale too generic, no reversal trigger.

### A13 Risk, assumption, and residual-risk handling

- Severity: `critical`
- Intent: Migration and Backout Plan records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger.
- Required evidence: risk table, assumption log, residual-risk acceptance.
- Fail if: risk without owner, assumption without confidence, residual risk not accepted.

### A14 Verification and acceptance evidence

- Severity: `critical`
- Intent: Migration and Backout Plan defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof.
- Required evidence: test links, review evidence, holdout/transfer evidence.
- Fail if: no proof path, evidence cannot be rerun, acceptance criteria absent.

### A15 Artifact-specific critic panel instantiated

- Severity: `critical`
- Intent: Migration and Backout Plan has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics.
- Required evidence: artifact review panel record, critic personas, cross-critique.
- Fail if: generic reviewers only, missing critic seat, no cross-critique.

### A16 Handoff and future resumption

- Severity: `major`
- Intent: Migration and Backout Plan includes human handoff, agent handoff, next action, and re-entry triggers so work can continue without hidden context.
- Required evidence: handoff notes, project-book index link, re-entry triggers.
- Fail if: handoff missing, next action unclear, depends on original author.

### A17 Quality certificate readiness

- Severity: `critical`
- Intent: Migration and Backout Plan is ready for refinery gate and certificate only when failed rubric points have fixes or accepted residual risk.
- Required evidence: rubric score record, fix evidence, refinery gate.
- Fail if: failed point unresolved, certificate references missing evidence.

### A18 No template residue or unsupported claims

- Severity: `critical`
- Intent: Migration and Backout Plan contains no placeholder text, fictional examples as real evidence, generic filler, or claims beyond evidence.
- Required evidence: placeholder scan, example-removal note, claim/evidence review.
- Fail if: TBD/TODO remains, fictional example used as proof, claim exceeds evidence.

## Critic-Seat Rubrics

## IMP-005-C1 Data Migration Critic

Seat kind: `content_authority`.

Mandate: validates migration steps, validation, backfill, data quality, and ownership.

### IMP-005-C1 Data Migration Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The IMP-005-C1 Data Migration Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Migration and Backout Plan`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### IMP-005-C1 Data Migration Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates migration steps, validation, backfill, data quality, and ownership.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### IMP-005-C1 Data Migration Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `migration runbook` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: migration runbook evidence, critic rationale.
- Fail if: migration runbook generic, no challenge recorded.

### IMP-005-C1 Data Migration Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `dry run` for completeness, trace, and downstream usability.
- Required evidence: dry run section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### IMP-005-C1 Data Migration Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `validation query` for risk, edge cases, and acceptance impact.
- Required evidence: validation query evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### IMP-005-C1 Data Migration Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `Release/SRE` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### IMP-005-C1 Data Migration Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the content authority lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### IMP-005-C1 Data Migration Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### IMP-005-C1 Data Migration Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### IMP-005-C1 Data Migration Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### IMP-005-C1 Data Migration Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### IMP-005-C1 Data Migration Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### IMP-005-C1 Data Migration Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Migration and Backout Plan`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### IMP-005-C1 Data Migration Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### IMP-005-C1 Data Migration Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## IMP-005-C2 SRE Rollback Critic

Seat kind: `governance_and_trace`.

Mandate: validates backout, cutover, monitoring, timing, and blast-radius controls.

### IMP-005-C2 SRE Rollback Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The IMP-005-C2 SRE Rollback Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Migration and Backout Plan`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### IMP-005-C2 SRE Rollback Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates backout, cutover, monitoring, timing, and blast-radius controls.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### IMP-005-C2 SRE Rollback Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `migration runbook` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: migration runbook evidence, critic rationale.
- Fail if: migration runbook generic, no challenge recorded.

### IMP-005-C2 SRE Rollback Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `dry run` for completeness, trace, and downstream usability.
- Required evidence: dry run section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### IMP-005-C2 SRE Rollback Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `validation query` for risk, edge cases, and acceptance impact.
- Required evidence: validation query evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### IMP-005-C2 SRE Rollback Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `Release/SRE` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### IMP-005-C2 SRE Rollback Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the governance and trace lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### IMP-005-C2 SRE Rollback Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### IMP-005-C2 SRE Rollback Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### IMP-005-C2 SRE Rollback Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### IMP-005-C2 SRE Rollback Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### IMP-005-C2 SRE Rollback Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### IMP-005-C2 SRE Rollback Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Migration and Backout Plan`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### IMP-005-C2 SRE Rollback Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### IMP-005-C2 SRE Rollback Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## IMP-005-C3 Test Critic

Seat kind: `verification_and_handoff`.

Mandate: validates dry run, test data, reconciliation, performance, and failure scenarios.

### IMP-005-C3 Test Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The IMP-005-C3 Test Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Migration and Backout Plan`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### IMP-005-C3 Test Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates dry run, test data, reconciliation, performance, and failure scenarios.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### IMP-005-C3 Test Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `migration runbook` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: migration runbook evidence, critic rationale.
- Fail if: migration runbook generic, no challenge recorded.

### IMP-005-C3 Test Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `dry run` for completeness, trace, and downstream usability.
- Required evidence: dry run section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### IMP-005-C3 Test Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `validation query` for risk, edge cases, and acceptance impact.
- Required evidence: validation query evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### IMP-005-C3 Test Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `Release/SRE` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### IMP-005-C3 Test Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the verification and handoff lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### IMP-005-C3 Test Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### IMP-005-C3 Test Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### IMP-005-C3 Test Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### IMP-005-C3 Test Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### IMP-005-C3 Test Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### IMP-005-C3 Test Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Migration and Backout Plan`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### IMP-005-C3 Test Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### IMP-005-C3 Test Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.
