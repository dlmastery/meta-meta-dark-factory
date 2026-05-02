# UX Recovery: Agentic App Redesign Record

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

## What Failed

The previous control console exposed too many internal records at once. It mixed runtime concepts, protocol jargon, proof classes, stage maps, forms, evidence rows, and graph data into one long surface. That made the human feel lost, which is a product failure even if the backend records were technically present.

## Correct Agentic UX Principle

An AI agent-centric app is not a documentation dump and not a chatbot next to forms. It is a human supervision cockpit for agents:

- The human sees the current mission.
- The human sees what the agents are trying to do now.
- The human sees the next decision they personally own.
- The human can approve, edit, reject, pause, inspect evidence, or change direction.
- The system hides deep evidence until the human asks for it.
- The system never hides proof, gates, graph impact, or redo consequences from the human.

## Redesign Applied

The first screen now prioritizes:

1. Command deck: current project, active agent, evidence count, handoff state, and next legal action.
2. Human Supervisor View: one active factory run and one next decision.
3. Decision Queue: pending interrupt or next action.
4. Workspace tabs:
   - Overview
   - Start / Grill
   - Evidence
   - Graph / Redo
   - Change
   - Agent Protocol

The protocol workbench, truth inventory, project portal, graph, change control, and raw invocation packet are still available, but they are no longer all dumped into the primary reading path.

## Current Boundary

This is a UX recovery pass, not a full product design system. It improves the information architecture and interaction journey of the local control console. It does not yet implement a full multi-user hosted product, live external agent provider execution, or the full Spec Graph database.

## Validation

- `node --check public/app.js`: pass
- `npm test`: pass
- `npm run test:browser`: pass
- Screenshot review: first viewport now has command deck, supervisor view, decision queue, and overview; random protocol dump moved behind tabs.

