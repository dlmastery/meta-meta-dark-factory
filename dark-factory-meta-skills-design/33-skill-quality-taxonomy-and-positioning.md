# 33. Skill Quality Taxonomy and Positioning

Status: added.

Date: 2026-04-25.

Purpose: define how DFMS should name, market, certify, and govern its meta-skills so they communicate comprehensive industry-grade coverage without becoming vague hype.

## Positioning Principle

DFMS skills should be described as:

> Industry-grade comprehensive assurance skills for standards-based agentic software delivery.

This phrase is intentional:

- `industry-grade` means aligned with professional SDLC, assurance, governance, delivery, security, and operations practices.
- `comprehensive` means the skill covers the full task tree for its domain: inputs, outputs, roles, artifacts, decisions, risks, tests, evidence, handoff, and learning.
- `assurance` means the skill includes proof: rubrics, traceability, validators, certificates, and residual-risk records.
- `standards-based` means the skill maps to selected standards, methods, and company policy when applicable.
- `agentic software delivery` means the skill is built for agent swarms and human-agent handoff, not only static documentation.

Do not call a skill "full coverage" unless it has evidence.

## Recommended Product Name

Use:

> DFMS Comprehensive Assurance Skill Mesh

Supporting phrase:

> A modular hierarchy of industry-grade skills, each with standards mapping, expert review, trace evidence, deterministic validators, and client-governed token budgets.

## Skill Certification Levels

| Level | Name | Meaning | Allowed Claim |
| --- | --- | --- | --- |
| 0 | Draft Skill | Instructions exist but are not fully governed | "Draft capability" |
| 1 | Vetted Skill | Trigger, scope, inputs, outputs, and guardrails are clear | "Vetted DFMS skill" |
| 2 | Comprehensive Skill | Full task tree, artifacts, gates, trace links, and handoff are defined | "Comprehensive DFMS skill" |
| 3 | Assured Skill | Validators, fixtures, rubric scorecards, and failure handling exist | "Assured DFMS skill" |
| 4 | Industry-Grade Skill | Mapped to standards/methods, expert-reviewed, regression-tested, and project-book integrated | "Industry-grade DFMS skill" |
| 5 | Industry-Leader-Validated Skill | Reviewed or signed off by actual qualified external industry leaders | "Industry-leader-validated DFMS skill" |

Important: Level 5 requires real named external review evidence. Without that evidence, use "industry-grade" or "industry-leader-style expert review," not "done by industry leaders."

## Full-Coverage Requirements

A skill may claim comprehensive or full coverage only when it covers all relevant branches:

| Branch | Required Coverage |
| --- | --- |
| Requirements | Intent, answer IDs, assumptions, constraints, acceptance criteria |
| Governance | Standards tailoring, owner, approval, waiver, token impact |
| Design | Alternatives, chosen path, rejected path, rationale, risk |
| Artifacts | Required artifact outputs, state, version, review status |
| Evidence | Tests, reviews, validators, logs, certificates, residual risks |
| Traceability | Forward and reverse links to requirements, artifacts, code, tests, decisions, handoffs |
| Human collaboration | Async review, clarification, takeover, handback, approval mechanics |
| Production | Release, rollback, observability, runbook, incident path where applicable |
| Learning | Retrospective, recurring defect pattern, template/rubric update path |
| External skills | Discovery, license/security review, adaptation, regression check where applicable |

If a branch is not applicable, the skill must record a waiver with owner, reason, and revalidation trigger.

## Skill Module Contract

Each comprehensive skill must include:

```yaml
skill_quality:
  certification_level: draft|vetted|comprehensive|assured|industry_grade|industry_leader_validated
  domain: requirements|governance|architecture|build|verification|operations|memory|learning|supply_chain
  coverage_claim: concise claim
  standards_basis: []
  inputs: []
  outputs: []
  gates: []
  validators: []
  rubrics: []
  trace_links: []
  human_checkpoints: []
  token_budget_effect: none|minor|material
  failure_modes: []
  rollback_or_handoff: []
```

## Industry-Leader Review Model

DFMS should simulate industry-leader review through expert roles, but it must distinguish simulated expert roles from actual external leaders.

### Internal Expert Role Panels

Use these for normal DFMS operation:

- Requirements principal.
- Enterprise architect.
- Security assurance lead.
- SRE/operations lead.
- QA/test strategy lead.
- Governance/compliance auditor.
- Delivery executive.
- Product/domain owner.

### Actual Industry-Leader Validation

Reserve this for real external validation:

- Named reviewer.
- Organization or credential if permitted.
- Review scope.
- Rubric score.
- Required fixes.
- Acceptance or rejection.
- Date and evidence record.

## Naming Rules

Use strong but precise names:

- `Comprehensive Requirements Assurance Skill`.
- `Industry-Grade Brownfield Recon Skill`.
- `Assured Traceability Evidence Skill`.
- `Comprehensive Production Handoff Skill`.
- `External Skill Supply Chain Assurance Skill`.
- `Meta-Meta Attractor Governance Skill`.

Avoid vague claims:

- "Best skill ever."
- "Zero mistakes guaranteed."
- "Industry leaders built this" unless actually true.
- "Full coverage" without trace evidence.
- "Certified" without certificate record.

## Pitch Deck Language

Preferred slide wording:

> Comprehensive Assurance Skill Mesh
>
> Each skill is modular, standards-mapped, expert-reviewed, trace-linked, validator-backed, and token-budget aware.

Preferred proof line:

> Full coverage is not a slogan; it is a gate state earned through task-tree coverage, 3-expert review, 15-point rubrics, trace closure, deterministic validators, and handoff replay.

## Quality Gate For Calling A Skill Comprehensive

Before a skill can be labeled comprehensive:

1. Module contract exists.
2. Trigger conditions are specific.
3. Inputs and outputs are named.
4. Full task tree is decomposed to testable leaves.
5. Standards/methodology basis is recorded.
6. Artifact outputs are listed.
7. Human checkpoints are listed.
8. Token-budget effect is classified.
9. Failure modes are documented.
10. Rollback/handoff path is documented.
11. Trace links are defined.
12. At least 3 expert roles are assigned.
13. 15-point rubric exists for each reviewer role.
14. Validator or review procedure exists.
15. Project-book update path exists.

## Verdict

DFMS should use ambitious naming, but every ambitious word must have an evidence gate.

Recommended claim:

> DFMS provides an industry-grade comprehensive assurance skill mesh for replacing outsourcing-style software delivery with a standards-based agent swarm.

Reserved claim:

> Industry-leader-validated DFMS skills.

Use the reserved claim only after actual external expert review evidence exists.
