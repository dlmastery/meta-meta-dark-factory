---
name: df-feedback-learning
description: Continuous improvement for dark-factory meta-skills and project knowledge. Use after human reviews, async comments, incidents, outages, retrospectives, failed gates, standards changes, recurring defects, or lessons learned that should update scenarios, artifacts, rubrics, templates, or governance rules.
---

## Zero-Slop Compliance

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.


# DF Feedback Learning

## Purpose

Turn feedback into better future work. Reviews, incidents, and human comments should become requirements, scenarios, rubrics, templates, or process changes instead of disappearing into chat.

## Workflow

1. Classify feedback as defect, preference, risk, standard update, process gap, human communication lesson, domain lesson, operational lesson, or memory/recovery lesson.
2. Link feedback to affected requirements, artifacts, code, tests, control graph nodes, work-ledger items, refinery gates, handoffs, and human communication records.
3. Create a change request or lesson record.
4. For governed work, estimate token impact as a rough low/mid/high SWAG and require client approval if the lesson changes scope, iteration objective, acceptance criteria, standards, or token forecast.
5. Update scenarios, holdouts, transfer tests, templates, rubrics, standards baseline, interrogation protocol, handoff protocol, memory protocol, token policy, or engagement checkpoints when appropriate.
6. Record what changed, why, who accepted it, token impact, and what needs revalidation.
7. Add regression checks for lessons learned from defects, incidents, failed reviews, context recovery failures, or unapproved scope/budget drift.

## Review Cadence

- After every failed gate.
- After every human review cycle.
- After every production incident or near miss.
- At phase exit.
- When standards or company policy changes.

## Resources

- `references/retrospective-loop.md`
- `references/standards-watch.md`

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

