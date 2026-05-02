---
name: df-intake-spec-lab
description: Dark-factory intake for turning raw human intent into project profiles, requirements, constraints, functional and non-functional scenarios, acceptance criteria, assumptions, and clarification requests. Use before greenfield work, major brownfield changes, artifact generation, or any workflow where input quality controls downstream quality.
---

## Zero-Slop Compliance

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.


# DF Intake Spec Lab

## Purpose

Convert blurry intent into usable factory input. Improve the spec before execution so the factory does not manufacture polished nonsense.

## Workflow

1. Start an interrogation record using `assets/templates/interrogation-record.json`.
2. Run interrogation rounds from `references/interrogation-protocol.md`: context, outcomes, constraints, scenarios, NFRs, handoff/operations, contradictions, and approval.
3. Capture every material answer with a stable answer ID, source, confidence, owner, and affected requirement IDs.
4. Build a recursive spec decomposition record using `references/spec-decomposition-protocol.md` and `assets/templates/spec-decomposition-record.json`.
5. Decompose from vision to capabilities, journeys, features, rules/data/events, NFRs, and acceptance-test leaves.
6. Interview each branch until every material leaf has answer IDs, owner, acceptance criteria, validation method, dependencies, risks, and trace targets.
7. Split requirements into functional, non-functional, security, compliance, operational, and handoff needs.
8. Create acceptance criteria, scenario seeds, holdout candidates, and transfer-test candidates for each leaf requirement.
9. Score completeness, contradiction risk, decomposition coverage, validation readiness, and owner clarity.
10. Re-interrogate when thresholds are missed, answers conflict, ownership is ambiguous, decomposition is too shallow, or implementation would require guessing.
11. Ask only the smallest necessary questions when risk is high; otherwise state assumptions with revalidation triggers.
12. Validate decomposition records with `scripts/validate_spec_decomposition.py` before artifact expansion for governed work.
13. Validate the interrogation-plus-decomposition package with `scripts/validate_intake_package.py` so cited answer IDs actually exist and answers point back to decomposition nodes.
14. Send accepted requirements, answer links, decomposition nodes, and validation evidence to `df-traceability-evidence`.

## Intake Quality Gate

- Goal is concrete.
- Scope and out-of-scope are explicit.
- Users and owners are named or reasonably assumed.
- Functional and non-functional needs are separated.
- Standards and company constraints are visible.
- Acceptance criteria are testable.
- Material customer answers have IDs and trace links.
- Spec is recursively decomposed to atomic, testable leaves.
- Every leaf has a parent, owner, answer source, priority, acceptance criteria, validation method, dependencies, risks, and trace target.
- Every decomposition branch has branch-level completeness, contradiction, and validation-readiness scores.
- Contradictions are resolved, explicitly deferred, or escalated.
- Completeness and verification-readiness scores meet threshold.
- Customer or accountable owner approval is recorded before artifact expansion for governed work.
- Open assumptions and risks are recorded.

## Resources

- `references/intake-question-bank.md`
- `references/interrogation-protocol.md`
- `references/spec-decomposition-protocol.md`
- `references/spec-quality-rubric.md`
- `assets/templates/interrogation-record.json`
- `assets/templates/spec-decomposition-record.json`
- `scripts/validate_spec_decomposition.py`
- `scripts/validate_intake_package.py`

## Agentic AI-Centric App Compliance

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

When a dark-factory task creates or revises any app, portal, workflow console, dashboard, MCP App, A2UI surface, AG-UI runtime, or human review UI, the output must be agentic AI-centric, not a conventional CRUD screen with chat attached.

Mandatory interpretation:

- The UI is a control system for human intent, agent state, proposed actions, evidence, gates, interrupts, provider quorum, trace links, and redo impact.
- Agents must expose structured state through AG-UI-style events: run started, state delta, stage active, provider quorum started, human decision required, human decision recorded, gate passed/blocked, test evidence, redo impact, and handoff.
- Agents must expose A2UI-style declarative surfaces as data that the host renders with native components: scenario/template router, provider quorum board, foundation authoring workbench, human interrupt inbox, stage report, artifact/evidence board, Spec Graph impact explorer, change-control form, and portal status.
- Tools must expose MCP Apps-style UI resources, schemas, permissions, and resources for interactive workflows; text-only tools are insufficient for complex review, approval, and multi-step factory execution.
- Sensitive or material transitions must pause with a human interrupt card that supports approve, edit, reject, and escalate. Approval must be recorded before stage execution proceeds.
- Provider quorum output must be treated as draft evidence only until merged, refined, confirmed, reviewed, and trace-linked.
- Spec Graph identity, upstream/downstream impact, no-duplicate-path reuse rules, and redo transitive closure must be visible before changing requirements, designs, tests, code, or production artifacts.
- Google Material 3-style principles apply to web UI: adaptive layout, accessible contrast, design tokens, native controls, clear state layers, and predictable components. Use tokens/components rather than decorative styling.
- A dashboard is not proof. It is a control and inspection surface. Missing artifacts, missing code, missing tests, or missing runtime behavior remain missing until instantiated and verified.

Reject any app or portal that cannot answer, on screen and via machine-readable state: what is the current legal next action, what is blocked, who must approve, what changed, what artifacts/tests/gates are affected, what evidence exists, what is only a descriptor/template, and what happens if the human resteers now.

