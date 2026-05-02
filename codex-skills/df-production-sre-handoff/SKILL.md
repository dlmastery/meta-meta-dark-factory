---
name: df-production-sre-handoff
description: Production, release, SRE, incident, maintenance, and human-owned operations handoff for dark-factory outputs. Use when humans are not ready to let agents own production, or when Codex must prepare deployment, rollback, observability, runbook, support, training, or maintenance artifacts.
---

## Zero-Slop Compliance

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.


# DF Production SRE Handoff

## Purpose

Let the factory build and verify, while humans can safely own production. Produce handoff artifacts that an on-call human can actually use.

## Workflow

1. Read `references/release-readiness.md`.
2. Create deployment, rollback, observability, incident, support, maintenance, and outage-debug training artifacts.
3. Link each operational procedure to requirements, risks, alerts, dashboards, control graph nodes, work-ledger items, refinery gates, and owners.
4. Create an outage drill or runbook replay record using `assets/templates/outage-drill-record.json` when humans own production or risk is high.
5. Validate production handoff and outage drill records with `scripts/validate_production_handoff.py`; production handoffs must be run in bundle mode with one `--outage-drill` argument for each referenced drill plus `--control-graph`, `--work-ledger`, `--refinery-gate`, and `--evidence-file` files. Templates, blank drafts, low readiness scores, missing rollback paths, missing observability, missing incident/support paths, unsigned operator drills, unproven drill references, unproven control-plane references, and ledger evidence without physical files are not evidence.
6. Require SRE, security, release, and human operator review.
7. Produce a release readiness certificate and operator readiness evidence.
8. Keep production approval with the accountable human unless governance says otherwise.

## Required Handoff Sections

- What is being released.
- How to deploy.
- How to verify after deployment.
- How to roll back.
- What to watch.
- What can go wrong.
- Who owns each response.
- What humans need to learn to maintain it.
- Outage diagnosis exercise.
- Runbook replay result.
- Operator signoff and readiness score.

## Resources

- `references/release-readiness.md`
- `references/sre-runbook.md`
- `assets/templates/production-handoff-record.json`
- `assets/templates/outage-drill-record.json`
- `scripts/validate_production_handoff.py`

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

