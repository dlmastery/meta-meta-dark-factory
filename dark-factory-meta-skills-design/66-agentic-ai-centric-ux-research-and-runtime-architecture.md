# Agentic AI-Centric UX Research And Runtime Architecture

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

## Recovery Truth

The prior console was too close to a documentation dashboard. It exposed stages, records, and protocol descriptors, but it did not sufficiently behave like an agentic AI-centric application. An agentic app is not a normal SDLC app with chat attached. It is a control system where agents and humans negotiate work through events, state, generated surfaces, interrupts, evidence, and graph impact.

The screenshots supplied by the owner are treated as inspiration only. The binding requirement is not to copy SpecForge styling. The binding requirement is to build a stronger dark-factory experience where scenario selection, templates, provider quorum, per-section confirmation, research/audit/blueprint tabs, provider health, merged drafts, refinement, and confirmation become agentic factory controls.

## Primary Research Findings

1. AG-UI defines an open, lightweight, event-based protocol for connecting agents to user-facing applications, with agent state, UI intents, and user interactions flowing between frontend and backend. Source: https://docs.ag-ui.com/introduction
2. A2UI defines declarative, LLM-friendly UI as data: flat component lists, separate data model updates, progressive rendering, native client rendering, and event handling. Source: https://a2ui.org/specification/v0.8-a2ui/
3. MCP Apps let tools declare interactive UI resources via `ui://`, render sandboxed HTML resources, and communicate bidirectionally through JSON-RPC/postMessage. Source: https://modelcontextprotocol.io/extensions/apps/overview
4. SEP-1865 formalizes MCP Apps as an extension with UI resources, resource discovery, bidirectional communication, and mandatory sandbox/auditable communication. Source: https://modelcontextprotocol.io/seps/1865-mcp-apps-interactive-user-interfaces-for-mcp
5. LangGraph human-in-the-loop docs define interrupts as explicit pause points with approve, reject, edit, and respond decisions, then resume. Source: https://docs.langchain.com/oss/python/langchain/frontend/human-in-the-loop
6. Microsoft Magentic-UI emphasizes co-planning, co-tasking, action guards, sandboxed tools, and plan learning for human-centered agents. Source: https://www.microsoft.com/en-us/research/blog/magentic-ui-an-experimental-human-centered-web-agent/
7. Material Web describes Material 3 as adaptive, expressive, accessible, and token-driven; the console should use native controls and design tokens instead of decorative styling. Source: https://material-web.dev/about/intro/

## Definition

An agentic AI-centric SDLC factory UI must expose these runtime objects:

- Human intent and approvals.
- Agent plans, proposed actions, drafts, critiques, and evidence.
- Event stream with structured, replayable state changes.
- A2UI-style declarative surfaces for the active work.
- MCP Apps-style tool/resource manifest for interactive execution.
- Human interrupt cards for material decisions.
- Provider quorum boards for independent generation, review, merge, refine, and confirm.
- Stage-gate and task-bead next-action control.
- Spec Graph nodes, edges, upstream/downstream impact, and no-duplicate-path rules.
- Recovery truth inventory separating implementation, artifact, descriptor, template, partial, missing, blocked, and waived proof classes.

## Runtime Upgrade Applied

The control console now adds these first-class surfaces:

- `scenario-template-router`: chooses greenfield, brownfield, migration, compliance, audit, documentation, or competitor analysis routes.
- `provider-quorum-board`: shows OpenAI, Claude, Gemini, and local/provider seats as quorum participants, not hidden backends.
- `foundation-authoring-workbench`: tracks the 11 foundation sections with confirmed, ready-for-quorum, and locked states.
- `human-interrupt-inbox`: blocks material execution until approve/edit/reject/escalate is recorded.
- `spec-graph-impact-explorer`: exposes node identity, graph counts, impact samples, and reuse/no-duplicate-path rules from the Spec Graph PRD.

## Skill-System Upgrade Applied

Every dark-factory skill in both the workspace bundle and installed skill directory now has an `Agentic AI-Centric App Compliance` section. The section rejects CRUD-with-chat dashboards and requires AG-UI events, A2UI surfaces, MCP Apps resources, human interrupts, provider quorum, Spec Graph impact, redo closure, and Material 3-style native components for any app or workflow console.

## Expert Critic Panel

### Martin-Fowler-Level Enterprise Architecture Critic

Mandate: reject any architecture that hides workflow state, overfits to screenshots, creates duplicate substrate paths, or confuses a dashboard with a runtime control plane.

Finding: The previous console was useful but under-agentic. The new runtime is materially better because scenario/template selection, interrupts, provider quorum, and graph impact are part of persisted run state and protocol descriptors.

Residual risk: Provider quorum is still represented as local descriptors, not live multi-provider execution. This is acceptable as a control-console upgrade but not proof of actual provider execution.

### Grady-Booch-Level Modeling And Control Critic

Mandate: reject any system that cannot name its objects, edges, state machines, and allowed transitions.

Finding: The upgrade gives the app explicit objects: scenario, template, provider, foundation section, interrupt, Spec Graph node, Spec Graph edge, A2UI surface, MCP App tool, and AG-UI event. This is the right modeling direction.

Residual risk: The Spec Graph is currently a representative runtime state seeded from the PRD, not a full implementation of the PRD substrate.

### Legendary TPM / Hawkeye Conformance Critic

Mandate: reject skipped steps, hidden next actions, stale evidence, or approval bypass.

Finding: Human interrupts now block stage invocation until decision evidence exists. This directly addresses the owner’s “AI skipping steps” concern.

Residual risk: The no-skip gate applies inside the local console. A future external agent runner must enforce the same gate before tool execution.

## Acceptance Status

Status: **improved, not fully complete**.

Evidence added:

- Runtime code surfaces and state in `dark-factory-control-console/server.js`.
- Interactive UI in `dark-factory-control-console/public/index.html`, `app.js`, and `styles.css`.
- Unit/browser tests updated to exercise human interrupt approval and agentic workbench surfaces.
- Workspace and installed skills updated with agentic app compliance requirements.

Remaining hard truth:

- The console is still a local control-console implementation, not a fully integrated live AG-UI/A2UI/MCP Apps server.
- Provider quorum and Spec Graph are represented as enforceable descriptors/state, not actual external provider orchestration or graph database execution yet.
- This improves the meta-meta/meta/skill factory rules and UI substrate. It does not magically generate every product artifact that remains missing from prior runs.

