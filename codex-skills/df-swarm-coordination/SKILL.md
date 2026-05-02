---
name: df-swarm-coordination
description: Expert role assignment, recursive decomposition, debate rounds, alternative design synthesis, critic panels, and multi-agent coordination for dark-factory nodes. Use when a task requires 3 expert viewpoints, parallel proposals, cross-critique, consensus, escalation, or decomposition into smaller work units.
---

## Zero-Slop Compliance

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.


# DF Swarm Coordination

## Purpose

Make multi-expert work disciplined. Assign roles, run independent reasoning, force critique, synthesize alternatives, and escalate when confidence is not earned.

## Workflow

1. Select a moderator and 3 primary experts from `references/role-roster.md`.
2. Decompose work until each node has a clear output and verification path.
3. Create an Expert Debate Record using `assets/templates/expert-debate-record.json`.
4. Run the debate protocol in `references/debate-protocol.md`.
5. Record alternatives, critiques, dissent, decision, residual risk, required evidence, and re-entry triggers.
6. Link the debate record to the control graph node, work-ledger item, decision record, trace evidence, and refinery gate.
7. Send outputs to `df-quality-refinery` and `df-traceability-evidence`.

## Debate Rounds

1. Context prime.
2. Independent proposals.
3. Cross critique.
4. Alternative synthesis.
5. Decision vote.
6. Verification plan.
7. Certificate or escalation.

## Escalate When

- The experts disagree after 3 loops.
- The task is too large to verify.
- The decision changes business, legal, safety, production, security, or irreversible architecture risk.

## Resources

- `references/role-roster.md`
- `references/debate-protocol.md`
- `assets/templates/expert-debate-record.json`

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

