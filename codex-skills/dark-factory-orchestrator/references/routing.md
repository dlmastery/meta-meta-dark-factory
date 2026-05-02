# Routing

Classify the request before acting.

## Governed Entry Rule

Before selecting a mode, decide whether the request is a governed DFMS run.

Governed means the request involves any of: standards-based SDLC artifacts, project book, expert debate, triple review, bidirectional traceability, brownfield impact, human-agent handoff, production/SRE, long-running context, meta-skill changes, or best-of-all control-plane claims.

If governed, route first to `df-meta-attractor` and require an Attractor Run Record before ordinary orchestration. Only tiny non-factory tasks may bypass this step, and the bypass must be obvious from the request.

| Mode | Signals | Load |
| --- | --- | --- |
| Meta-attractor | ambitious, ambiguous, meta-skill, best-of-all, serious factory, transcript, standards-heavy | df-meta-attractor, then orchestrator |
| Greenfield | build, create, new app, new system, product idea | intake, governance, artifact, methodology, quality, trace |
| Brownfield | existing repo, bug, legacy, modify, refactor, migrate | brownfield, governance, trace, quality, handoff |
| Artifact-only | SRS, HLD, runbook, trace matrix, whitepaper | artifact, quality, trace |
| Review-only | review, audit, certify, check quality | quality, trace, governance |
| Handoff | production, SRE, release, maintenance, runbook | production handoff, human handoff, trace |
| Recovery | resume, continue, large context, context rot | context memory, handoff, trace |
| Governance update | standards, rubrics, process, roles, thresholds | governance, feedback learning |

Ask a question only when a wrong mode would cause real risk. Otherwise choose the safest mode and state the assumption.
