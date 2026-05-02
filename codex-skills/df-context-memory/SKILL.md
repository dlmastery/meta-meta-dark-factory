---
name: df-context-memory
description: Context rot prevention and durable project memory for long-running dark-factory work, large repositories, large transcripts, resumed sessions, multi-agent workflows, and handoffs. Use to create compact context packs, project book indexes, predecessor summaries, and evidence-ledger retrieval plans.
---

## Zero-Slop Compliance

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.


# DF Context Memory

## Purpose

Keep long work fresh by externalizing memory. Do not rely on one giant context window.

## Workflow

1. Create a compact context pack for the current node using `assets/templates/context-pack-record.json`.
2. Link the context pack to the Attractor Run Record, control graph node, work-ledger item, TPM flow step, PERT node, knowledge graph node, active task bead, active artifacts, evidence, and next owner.
3. Keep source-of-truth artifacts outside chat in the project book, TPM flow ledger, PERT plan, knowledge graph, work ledger, and `TASKS.md`.
4. Summarize only current state, decisions, risks, predecessor context, and next action.
5. Load detailed references only when the node needs them.
6. Use `references/predecessor-recovery.md` after long pauses, resumptions, human edits, major phase changes, or failed reviews.
7. Run a fresh-session replay check from the TPM flow ledger, PERT plan, knowledge graph, `TASKS.md` bead ledger, SDLC Stage Coverage Matrix, Hawkeye Conformance Audit Record, and execution-kernel next-action report for governed handoffs and long-running work.
8. For any governed project book, create or refresh the Human Review and Onboarding Portal so a new human can recover state without reading the entire repository linearly.
9. Produce a handoff record before ending long work.

## Context Pack Contents

- Current objective.
- Relevant requirements.
- Current architecture slice.
- Active decisions.
- Open risks and assumptions.
- Files or artifacts in scope.
- Verification state.
- Control graph node and work-ledger item.
- Knowledge graph node and current task bead.
- TPM flow step, PERT node, legal next-step candidates, and judge/jury transition state.
- Execution-kernel status and legal next action.
- SDLC stage coverage status and any missing implementation/testing/browser/scenario/production evidence.
- Hawkeye conformance status, open vetoes, unresolved P0/P1 findings, and next audit action.
- Human review portal location, coverage status, missing-index items, role-based onboarding paths, diagram atlas status, and reviewer start path.
- Predecessor decisions and recovery notes.
- Human communication and approval state.
- Next action and owner.

## Rules

- Prefer many small node-local context packs over one huge summary.
- Keep standards versions explicit.
- Preserve rejected alternatives and rationale.
- Treat context compression as an artifact that can be reviewed.
- Treat predecessor recovery as evidence, not lore.
- Do not resume governed work from a summary unless control graph, work ledger, and trace state are visible or explicitly waived.
- Do not resume governed work unless the active/next bead is visible in `TASKS.md`, or a human-approved recovery bead is created first.
- Treat `TASKS.md` bead state as the operational resume surface and the knowledge graph as the truth map.
- Treat the TPM flow ledger and PERT plan as the authoritative answer to "what next"; chat memory is never authoritative.
- Treat the execution-kernel next-action report as the resume command. If it says `closed`, do not resume work without a new bead or change request.
- Treat missing stage coverage as a resume blocker for governed work; never resume a code/UI/product run from documents alone.
- Treat missing or failing Hawkeye conformance as a resume blocker.
- Treat a stale or missing human review portal as a handoff blocker for governed project-book work; a future reviewer must have a current dashboard and machine-readable index.

## Resources

- `references/context-budgeting.md`
- `references/project-book-index.md`
- `references/predecessor-recovery.md`
- `assets/templates/context-pack-record.json`
- `assets/templates/knowledge-graph-record.json`
- `assets/templates/TASKS.md`
- `assets/templates/tpm-flow-ledger.json`
- `assets/templates/factory-pert-plan.json`
- `assets/templates/execution-kernel-state.json`
- `assets/templates/next-action-report.json`
- `assets/templates/hawkeye-conformance-audit-record.json`

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

