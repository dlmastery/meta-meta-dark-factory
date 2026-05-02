**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# Hawkeye Conformance Auditor

## Purpose

This revision adds a Hawkeye Conformance Auditor across every stage, process, generated meta-skill, transition, artifact family, and acceptance gate.

Hawkeye is not a content reviewer. Hawkeye audits whether the factory followed its own process with no skipped steps, missing evidence, stale ledgers, fake passes, template-as-proof, or unapproved tailoring.

Hawkeye has veto power.

## Role Contract

Hawkeye Conformance Auditor is an independent process auditor with these decision rights:

- veto stage exit;
- veto artifact acceptance;
- veto generated meta-skill handoff;
- veto task-bead acceptance;
- veto quality certificate issuance;
- veto execution-kernel `pass` or `closed` status if conformance evidence is stale or incomplete;
- force rework beads for process gaps;
- require waiver records for any skipped stage, process, artifact, test, review, or evidence obligation.

Hawkeye does not decide product taste or architecture preference. Hawkeye decides whether the agreed process was actually followed.

## Audit Scope

Hawkeye audits all of these:

- meta-meta compiler chain;
- product tailoring profile;
- generated meta-skill contract;
- dark-factory instantiation record;
- engagement governance;
- `TASKS.md`;
- TPM flow ledger;
- PERT plan;
- knowledge graph;
- SDLC stage coverage matrix;
- execution-kernel report;
- AI judge/jury transition records;
- artifact BOM tailoring;
- artifact templates and instantiated artifacts;
- artifact-specific rubrics;
- RALPH loops;
- quality refinery gates;
- traceability and evidence;
- implementation execution records;
- scenario, holdout, transfer, browser, WYSIWYG, security, performance, and production testing records;
- release, SRE, handoff, maintenance, and feedback learning records.

## Audit Timing

Hawkeye runs at these moments:

1. Compile-time: before a generated meta-skill is accepted.
2. Pre-stage: before a lifecycle stage starts.
3. Pre-transition: before a step moves state.
4. Pre-artifact-pass: before any material artifact receives a pass.
5. Pre-code-pass: before any implementation/code change is accepted.
6. Pre-test-pass: before any test plan/evidence is accepted.
7. Pre-release: before release, handoff, or production readiness.
8. Resume-time: before a new session continues a governed run.
9. Final certificate: before a quality certificate, project-book closure, or run closure.

## Conformance Axes

Every Hawkeye audit checks:

| Axis | Question |
| --- | --- |
| Product tailoring | Was the SDLC actually tailored to this product archetype and surfaces? |
| Stage coverage | Are every required stage, deferral, waiver, and not-applicable decision recorded? |
| Task discipline | Does `TASKS.md` show the active/accepted/blocked/rework beads correctly? |
| Flow discipline | Does TPM flow state match PERT, KG, and execution-kernel state? |
| Evidence discipline | Are claims backed by instantiated evidence, not templates? |
| Traceability | Do requirements link to artifacts, code, tests, reviews, release, and operations? |
| Review rigor | Were required expert panels, adversarial critics, rubrics, and RALPH loops completed? |
| Testing rigor | Are required unit/integration/scenario/browser/security/performance/production tests present? |
| Change control | Were token, scope, acceptance, and risk changes approved or blocked? |
| Human boundary | Were human-only boundary approvals respected? |
| Resume safety | Can a fresh session continue from ledgers and graph without chat memory? |
| Anti-slop | Are generic claims, missing proof, and reward-hacking patterns rejected? |

## Pass Rule

Hawkeye pass requires:

- every required stage audited;
- every required process audited;
- every non-applicable item has rationale;
- every waived item has owner, rationale, expiry, residual risk, and revalidation trigger;
- no unresolved P0/P1 conformance finding;
- no open Hawkeye veto;
- execution kernel has a valid state;
- `TASKS.md`, TPM, PERT, KG, SDLC matrix, and generated meta-skill contract agree;
- audit record is instantiated and validated.

## Failure Handling

When Hawkeye fails:

- create a finding;
- assign severity;
- create a patch/rework bead;
- block the transition;
- record residual risk if a waiver is requested;
- rerun Hawkeye after the fix.

No one is allowed to "explain away" a Hawkeye fail in prose.

## Required Artifacts

This revision adds:

- `hawkeye-conformance-audit-record.json`
- `validate_hawkeye_conformance.py`

## Result

Hawkeye creates a strict conformance loop over the entire dark factory. The system can still be tailored per product, but tailoring must be explicit, audited, and validated. No stage or process can disappear silently.
