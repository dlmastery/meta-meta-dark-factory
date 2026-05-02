---
name: df-brownfield-recon
description: Brownfield discovery and change impact analysis for existing repositories, legacy systems, production code, bug fixes, migrations, refactors, integrations, and maintenance work. Use before modifying existing code so Codex first maps current architecture, behavior, tests, conventions, risks, and artifact drift.
---

## Zero-Slop Compliance

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.


# DF Brownfield Recon

## Purpose

Protect existing systems from confident but shallow changes. Understand the current system before modifying it.

## Workflow

1. Inventory repo structure, build tools, test commands, runtime entry points, configs, docs, and deployment hints.
2. Identify ownership, conventions, architectural boundaries, and risky areas.
3. Characterize current behavior using tests, docs, code reading, and available logs.
4. Map the requested change to impacted requirements, code, tests, artifacts, and operations.
5. Produce a change impact record before implementation.
6. Hand implementation to the orchestrator only after impact and regression plan are clear.

## Brownfield Rules

- Do not refactor unrelated code while making a behavior change.
- Do not overwrite user work.
- Do not assume missing tests mean missing behavior.
- Do not change production-sensitive paths without rollback and observability review.
- Update stale artifacts when reality differs from documentation.

## Resources

- `references/codebase-recon-playbook.md`
- `references/change-impact-template.md`

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

