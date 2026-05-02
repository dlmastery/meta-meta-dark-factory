---
name: df-methodology-blender
description: Methodology blending for RUP, MDA, DDD, TDD, BDD, Agile, SRE, ISO lifecycle processes, SSDF, OWASP SAMM, and company delivery playbooks. Use when a project needs multiple methods composed into one coherent workflow with artifacts, gates, roles, and verification.
---

## Zero-Slop Compliance

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.


# DF Methodology Blender

## Purpose

Compose methodologies without ceremony theater. Convert each method into concrete artifacts, checks, loops, and gates.

## Workflow

1. Create a Methodology Blend Record using `assets/templates/methodology-blend-record.json`.
2. Identify which methods are required by domain, risk, user request, company policy, and standards tailoring.
3. Compile each included method into control graph nodes, work-ledger items, required artifacts, reviewers, gates, and evidence.
4. Map RUP phases to lifecycle stages when phase discipline is needed.
5. Map MDA CIM/PIM/PSM when business, platform-independent, and platform-specific separation matters, including transformation records and exception handling.
6. Apply DDD for domain language, bounded contexts, aggregates, invariants, events, and anti-corruption layers.
7. Apply TDD/BDD for executable acceptance, red-green-refactor evidence, holdout scenarios, and regression evidence.
8. Apply SRE for production ownership, SLIs/SLOs, runbooks, incident paths, outage drills, and rollback.
9. Resolve conflicts through expert debate and decision records.
10. Send the blend record to `df-quality-refinery` and `df-traceability-evidence`.

## Output

Produce a methodology tailoring matrix that says:

- Method included or excluded.
- Why it applies.
- Which artifacts it requires.
- Which gates it adds.
- Which reviewers enforce it.
- How evidence is produced.
- Which control graph nodes and work-ledger items enforce it.
- Which refinery gates prove it.
- Which method-specific transformation or test evidence is mandatory.

## Resources

- `references/rup-mda-ddd-tdd.md`
- `assets/templates/methodology-blend-record.json`

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

