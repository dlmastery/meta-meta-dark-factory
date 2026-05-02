> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.

# GOV-001 Project Charter Rubric

Status: artifact-specific QA rubric.

Basis: RUP inception, ISO agreement/project planning.

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
- Intent: Project Charter declares artifact ID, version, lifecycle phase, status, owner, approval authority, control graph node, and work ledger item.
- Required evidence: artifact header, owner/approver fields, control graph and ledger links.
- Fail if: missing owner, missing lifecycle state, unlinked node or ledger.

### A02 Source intent and authorization

- Severity: `critical`
- Intent: Project Charter ties every material claim to customer answers, approved assumptions, source transcripts, issue records, or change requests.
- Required evidence: answer IDs, approved assumptions, source references.
- Fail if: unsupported material claim, unapproved assumption, missing source trace.

### A03 Scope boundary and tailoring

- Severity: `critical`
- Intent: Project Charter defines in scope, out of scope, deferred items, tailoring rationale, and combination/split rationale when applicable.
- Required evidence: scope table, tailoring note, deferred list.
- Fail if: scope ambiguity, tailoring without rationale, deferred work without owner.

### A04 Artifact-specific focus: business case boundaries

- Severity: `major`
- Intent: Project Charter addresses `business case boundaries` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering business case boundaries, owner or accountable role, linked evidence.
- Fail if: business case boundaries is generic, business case boundaries lacks evidence, business case boundaries lacks owner.

### A05 Artifact-specific focus: stakeholder map

- Severity: `major`
- Intent: Project Charter addresses `stakeholder map` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering stakeholder map, owner or accountable role, linked evidence.
- Fail if: stakeholder map is generic, stakeholder map lacks evidence, stakeholder map lacks owner.

### A06 Artifact-specific focus: success measures

- Severity: `major`
- Intent: Project Charter addresses `success measures` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering success measures, owner or accountable role, linked evidence.
- Fail if: success measures is generic, success measures lacks evidence, success measures lacks owner.

### A07 Artifact-specific focus: scope exclusions

- Severity: `major`
- Intent: Project Charter addresses `scope exclusions` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering scope exclusions, owner or accountable role, linked evidence.
- Fail if: scope exclusions is generic, scope exclusions lacks evidence, scope exclusions lacks owner.

### A08 Artifact-specific focus: project viability decision

- Severity: `major`
- Intent: Project Charter addresses `project viability decision` with enough specificity to guide downstream work, review, and verification.
- Required evidence: section covering project viability decision, owner or accountable role, linked evidence.
- Fail if: project viability decision is generic, project viability decision lacks evidence, project viability decision lacks owner.

### A09 Family theme coverage: human-agent accountability

- Severity: `major`
- Intent: Project Charter handles `human-agent accountability` according to its artifact family obligations.
- Required evidence: human-agent accountability section, trace link, review evidence.
- Fail if: human-agent accountability omitted, human-agent accountability not traceable, human-agent accountability not reviewable.

### A10 Standards and method mapping

- Severity: `critical`
- Intent: Project Charter maps named standards and methods to concrete sections, evidence, or justified exclusions.
- Required evidence: standards mapping, tailoring rationale, waivers.
- Fail if: standard named without mapping, unsupported compliance claim.

### A11 Bidirectional traceability

- Severity: `critical`
- Intent: Project Charter supports forward and reverse trace across intent, requirements, design, implementation, tests, operations, risks, and decisions as applicable.
- Required evidence: trace matrix entries, reverse links, gap log.
- Fail if: one-way trace only, missing risk/test/design links.

### A12 Decision rationale and alternatives

- Severity: `major`
- Intent: Project Charter records material decisions, alternatives considered, rationale, consequences, and reversal triggers.
- Required evidence: decision table, alternative analysis, ADR links.
- Fail if: decision without alternatives, rationale too generic, no reversal trigger.

### A13 Risk, assumption, and residual-risk handling

- Severity: `critical`
- Intent: Project Charter records risks, assumptions, constraints, mitigation, owner, expiry, and revalidation trigger.
- Required evidence: risk table, assumption log, residual-risk acceptance.
- Fail if: risk without owner, assumption without confidence, residual risk not accepted.

### A14 Verification and acceptance evidence

- Severity: `critical`
- Intent: Project Charter defines how its claims will be verified and links to test evidence, review evidence, holdouts, or operational proof.
- Required evidence: test links, review evidence, holdout/transfer evidence.
- Fail if: no proof path, evidence cannot be rerun, acceptance criteria absent.

### A15 Artifact-specific critic panel instantiated

- Severity: `critical`
- Intent: Project Charter has a linked Artifact Review Panel Record with content authority, governance/trace, and verification/handoff critics.
- Required evidence: artifact review panel record, critic personas, cross-critique.
- Fail if: generic reviewers only, missing critic seat, no cross-critique.

### A16 Handoff and future resumption

- Severity: `major`
- Intent: Project Charter includes human handoff, agent handoff, next action, and re-entry triggers so work can continue without hidden context.
- Required evidence: handoff notes, project-book index link, re-entry triggers.
- Fail if: handoff missing, next action unclear, depends on original author.

### A17 Quality certificate readiness

- Severity: `critical`
- Intent: Project Charter is ready for refinery gate and certificate only when failed rubric points have fixes or accepted residual risk.
- Required evidence: rubric score record, fix evidence, refinery gate.
- Fail if: failed point unresolved, certificate references missing evidence.

### A18 No template residue or unsupported claims

- Severity: `critical`
- Intent: Project Charter contains no placeholder text, fictional examples as real evidence, generic filler, or claims beyond evidence.
- Required evidence: placeholder scan, example-removal note, claim/evidence review.
- Fail if: TBD/TODO remains, fictional example used as proof, claim exceeds evidence.

## Critic-Seat Rubrics

## GOV-001-C1 Strategic Charter Critic

Seat kind: `content_authority`.

Mandate: validates objectives, stakeholders, value, boundaries, assumptions, and success criteria.

### GOV-001-C1 Strategic Charter Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The GOV-001-C1 Strategic Charter Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Project Charter`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### GOV-001-C1 Strategic Charter Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates objectives, stakeholders, value, boundaries, assumptions, and success criteria.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### GOV-001-C1 Strategic Charter Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `business case boundaries` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: business case boundaries evidence, critic rationale.
- Fail if: business case boundaries generic, no challenge recorded.

### GOV-001-C1 Strategic Charter Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `stakeholder map` for completeness, trace, and downstream usability.
- Required evidence: stakeholder map section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### GOV-001-C1 Strategic Charter Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `success measures` for risk, edge cases, and acceptance impact.
- Required evidence: success measures evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### GOV-001-C1 Strategic Charter Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `RUP inception, ISO agreement/project planning` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### GOV-001-C1 Strategic Charter Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the content authority lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### GOV-001-C1 Strategic Charter Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### GOV-001-C1 Strategic Charter Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### GOV-001-C1 Strategic Charter Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### GOV-001-C1 Strategic Charter Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### GOV-001-C1 Strategic Charter Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### GOV-001-C1 Strategic Charter Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Project Charter`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### GOV-001-C1 Strategic Charter Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### GOV-001-C1 Strategic Charter Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## GOV-001-C2 Governance Baseline Critic

Seat kind: `governance_and_trace`.

Mandate: validates agreement basis, authority, approvals, standards tailoring link, and scope trace.

### GOV-001-C2 Governance Baseline Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The GOV-001-C2 Governance Baseline Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Project Charter`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### GOV-001-C2 Governance Baseline Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates agreement basis, authority, approvals, standards tailoring link, and scope trace.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### GOV-001-C2 Governance Baseline Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `business case boundaries` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: business case boundaries evidence, critic rationale.
- Fail if: business case boundaries generic, no challenge recorded.

### GOV-001-C2 Governance Baseline Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `stakeholder map` for completeness, trace, and downstream usability.
- Required evidence: stakeholder map section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### GOV-001-C2 Governance Baseline Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `success measures` for risk, edge cases, and acceptance impact.
- Required evidence: success measures evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### GOV-001-C2 Governance Baseline Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `RUP inception, ISO agreement/project planning` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### GOV-001-C2 Governance Baseline Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the governance and trace lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### GOV-001-C2 Governance Baseline Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### GOV-001-C2 Governance Baseline Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### GOV-001-C2 Governance Baseline Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### GOV-001-C2 Governance Baseline Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### GOV-001-C2 Governance Baseline Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### GOV-001-C2 Governance Baseline Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Project Charter`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### GOV-001-C2 Governance Baseline Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### GOV-001-C2 Governance Baseline Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.

## GOV-001-C3 Delivery Commitment Critic

Seat kind: `verification_and_handoff`.

Mandate: validates delivery feasibility, checkpoint cadence, token-budget assumptions, and handoff clarity.

### GOV-001-C3 Delivery Commitment Critic C01 Persona mandate declared

- Severity: `critical`
- Intent: The GOV-001-C3 Delivery Commitment Critic critic declares the elite persona, decision rights, non-negotiables, red flags, and evidence required for `Project Charter`.
- Required evidence: persona contract, decision rights, red flags.
- Fail if: generic reviewer, no decision rights, no red flags.

### GOV-001-C3 Delivery Commitment Critic C02 Mandate-specific completeness

- Severity: `critical`
- Intent: The critic verifies its mandate: validates delivery feasibility, checkpoint cadence, token-budget assumptions, and handoff clarity.
- Required evidence: mandate review notes, artifact sections cited.
- Fail if: mandate not addressed, review ignores artifact-specific duties.

### GOV-001-C3 Delivery Commitment Critic C03 Artifact focus challenge

- Severity: `major`
- Intent: The critic inspects `business case boundaries` and challenges whether it is concrete, evidenced, and useful.
- Required evidence: business case boundaries evidence, critic rationale.
- Fail if: business case boundaries generic, no challenge recorded.

### GOV-001-C3 Delivery Commitment Critic C04 Secondary focus challenge

- Severity: `major`
- Intent: The critic inspects `stakeholder map` for completeness, trace, and downstream usability.
- Required evidence: stakeholder map section, trace link.
- Fail if: secondary focus incomplete, no downstream allocation.

### GOV-001-C3 Delivery Commitment Critic C05 Tertiary focus challenge

- Severity: `major`
- Intent: The critic inspects `success measures` for risk, edge cases, and acceptance impact.
- Required evidence: success measures evidence, risk/test link.
- Fail if: tertiary focus lacks proof, edge cases ignored.

### GOV-001-C3 Delivery Commitment Critic C06 Standards fit

- Severity: `critical`
- Intent: The critic confirms `RUP inception, ISO agreement/project planning` is applied through concrete artifact content, not name-dropping.
- Required evidence: standards mapping, tailoring rationale.
- Fail if: standard named but not used, unsupported compliance claim.

### GOV-001-C3 Delivery Commitment Critic C07 Trace closure

- Severity: `critical`
- Intent: The critic verifies source, forward, reverse, and evidence links relevant to the verification and handoff lens.
- Required evidence: trace entries, reverse links, evidence links.
- Fail if: trace gap, one-way trace only.

### GOV-001-C3 Delivery Commitment Critic C08 Evidence sufficiency

- Severity: `critical`
- Intent: The critic verifies that evidence is inspectable, current, project-specific, and not merely a template.
- Required evidence: evidence bundle, dates/versions, review notes.
- Fail if: template as proof, stale evidence, not project-specific.

### GOV-001-C3 Delivery Commitment Critic C09 Risk and residual-risk treatment

- Severity: `critical`
- Intent: The critic verifies risks in its lane have owner, mitigation, acceptance state, expiry, and revalidation triggers.
- Required evidence: risk log, residual-risk record.
- Fail if: risk without owner, no revalidation trigger.

### GOV-001-C3 Delivery Commitment Critic C10 Adversarial cross-critique

- Severity: `major`
- Intent: The critic challenges at least one assumption from another critic seat and records whether it survived scrutiny.
- Required evidence: cross-critique entry, assumption challenged.
- Fail if: no adversarial challenge, dissent erased.

### GOV-001-C3 Delivery Commitment Critic C11 Downstream usability

- Severity: `major`
- Intent: The critic verifies that downstream artifacts, code, tests, operations, or handoff users can act on this artifact.
- Required evidence: downstream allocation, handoff note.
- Fail if: downstream user must guess, handoff missing.

### GOV-001-C3 Delivery Commitment Critic C12 Iteration and change control

- Severity: `major`
- Intent: The critic checks whether artifact changes affect scope, token budget, approvals, or baseline state.
- Required evidence: change impact note, approval log.
- Fail if: scope drift hidden, budget impact ignored.

### GOV-001-C3 Delivery Commitment Critic C13 Failure and edge handling

- Severity: `major`
- Intent: The critic verifies negative cases, failure modes, contradiction handling, or operational exceptions appropriate to `Project Charter`.
- Required evidence: edge case list, failure-mode notes.
- Fail if: happy path only, contradictions unresolved.

### GOV-001-C3 Delivery Commitment Critic C14 Pass/fail vote integrity

- Severity: `critical`
- Intent: The critic's score, rationale, failed points, fixes, and residual risks are explicit and consistent.
- Required evidence: 15 scored checks, fix evidence, vote rationale.
- Fail if: score without rationale, failed point unresolved.

### GOV-001-C3 Delivery Commitment Critic C15 Specialist escalation judgment

- Severity: `major`
- Intent: The critic decides whether additional specialists are required because artifact risk exceeds the default three-seat panel.
- Required evidence: specialist decision, risk rationale.
- Fail if: high risk without specialist, specialist need not assessed.
