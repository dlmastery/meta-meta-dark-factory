# 09. External Inspiration Map

Status: inspiration only, not requirements by itself.

## Why This Exists

The meta-meta skill should learn from strong external patterns without becoming a clone of any vendor, open-source project, or agency process. This record documents what was checked and what is useful.

## Sources Checked

| Source | What It Contributes | What Not To Copy Blindly |
| --- | --- | --- |
| StrongDM Attractor | NLSpec-first factory thinking, graph/pipeline orchestration, human-in-the-loop gates, validation and definition-of-done discipline | Its exact runtime shape, DOT subset, or backend choices |
| Fabro | Workflow graphs, human gates, model routing, verification, Git checkpoints, cloud sandboxes, API/UI, retrospectives | Its product packaging, exact workflow syntax, or assumption that every run needs cloud execution |
| Gas Town | Mayor-style coordination, durable work state, rigs, worker agents, beads/convoys, handoffs, health monitors, refinery merge gates, escalation, predecessor-session recovery, and federated work concepts | Its exact terminology, CLI/runtime assumptions, animal/role naming, or requirement for a separate workspace manager |
| Octopus Garden AI automation agency | Business-facing discovery, analysis, development, deployment, training, and support lifecycle | Treating an agency service model as a software factory engine |
| Fabriqa.ai | PRD-to-code traceability, validation layer, IDE/MCP integration themes | Any unstated implementation details or platform assumptions |
| Factory.ai | Agent-native delegation across developer surfaces and incident/migration workflows | Broad delegation as a default requirement for every project |
| Octopus Deploy AI/DevOps | Deployment, operations, troubleshooting, auditing, and remediation patterns | Vendor-specific deployment coupling |

## Inspiration Adopted Into Our Meta-Meta Skill

- Specification as product: the factory can be driven by natural-language operating specs.
- Workflow as graph: projects become node contracts, gates, and transitions.
- Human gates: humans approve, redirect, or take over where judgment or ownership matters.
- Model/expert routing: different nodes get different skills or experts.
- Verification first: testing, review, traceability, and evidence are gates, not decoration.
- Checkpointing: every major stage must be resumable and auditable.
- Durable work ledger: long-running work needs stable issue/work-item records, not only chat memory.
- Coordinator plus workers: complex work benefits from a central coordinator, bounded worker tasks, health checks, and escalation.
- Merge refinery: completed work should flow through a verification and integration gate rather than being accepted directly.
- Predecessor recovery: future sessions must be able to query previous decisions, evidence, and blockers.
- Retrospectives: the factory learns from each run, review, and failure.
- Business rollout: discovery, deployment, training, support, and maintenance are real lifecycle stages.

## Guardrail

External examples may inspire the control plane, but accepted requirements still come from the user transcript, customer decisions, standards baseline, project book, and explicit review findings.
