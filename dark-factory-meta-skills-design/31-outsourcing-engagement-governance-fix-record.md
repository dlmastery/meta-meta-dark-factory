# 31. Outsourcing Engagement Governance Fix Record

Status: fixes applied; patch-level pass.

Date: 2026-04-25.

Meta-meta source: `records/pass31/meta-attractor-record.json`.

## Scope

The human owner clarified the real meta-meta goal: DFMS should replace the confidence and process of an outsourcing firm with a dark-factory agent swarm, while being better than a human SDLC shop. The client must see checkpoints, rough token budgets, iteration approvals, and change-control approvals. Token cost is the budget line.

## Expert Critic Review

### Finding 1: Engagement governance was implicit, not first-class

Severity: P1.

Problem: The system had artifacts, traceability, and review gates, but did not explicitly model the client/dark-factory relationship like a professional delivery engagement.

Fix: Added an engagement governance record with client owner, dark-factory delivery owner, scope baseline, standards baseline, checkpoints, iterations, change control, and trace links.

### Finding 2: Token budgets were not governed like budget

Severity: P1.

Problem: The system did not require rough token SWAGs, assumptions, exclusions, confidence, approval, or reapproval triggers before material work.

Fix: Added token-budget validation with low/mid/high token bands, client approval, assumptions, exclusions, confidence, and reapproval rules.

### Finding 3: Iteration and change management approvals were not enforceable

Severity: P1.

Problem: Iterative software work could continue without approved iteration objectives, token ranges, or change-request impact analysis.

Fix: Added required client checkpoints, approved iterations, and change-control impact fields for scope, tokens, schedule, quality, and risk.

### Finding 4: Live skills did not instruct future sessions to negotiate token budget and approvals

Severity: P2.

Problem: Meta-attractor, orchestrator, governance, handoff, and feedback skills did not consistently tell future Codex sessions to negotiate and track token budget and change approvals.

Fix: Updated installed and workspace skill instructions so future governed work requires engagement governance before material token spend and reapproval for budget or scope drift.

## Files Changed

- `C:\Users\abhir\.codex\skills\df-meta-attractor\SKILL.md`
- `C:\Users\abhir\.codex\skills\dark-factory-orchestrator\SKILL.md`
- `C:\Users\abhir\.codex\skills\df-governance-mayor\SKILL.md`
- `C:\Users\abhir\.codex\skills\df-governance-mayor\assets\templates\engagement-governance-record.json`
- `C:\Users\abhir\.codex\skills\df-governance-mayor\scripts\validate_engagement_governance.py`
- `C:\Users\abhir\.codex\skills\df-human-agent-handoff\SKILL.md`
- `C:\Users\abhir\.codex\skills\df-feedback-learning\SKILL.md`
- `codex-skills/**` matching workspace files
- `dark-factory-meta-skills-design/00-system-design.md`
- `dark-factory-meta-skills-design/02-lifecycle-workflow.md`
- `dark-factory-meta-skills-design/records/pass31/*`

## Validation Evidence

- Engagement governance validator compiles.
- Engagement governance pass fixture passes.
- Engagement governance template rejects.
- Missing token budget approval rejects.
- Incomplete change-control impact fields reject.
- Full DFMS hardening runner passes.
- Pass 31 merged control-plane records validate.
- Installed and workspace governance files match by hash.

## Residual Risks

| Risk | Status |
| --- | --- |
| Token SWAGs are rough planning instruments, not precise cost predictions | Open; re-estimate after decomposition and recon. |
| Runtime dashboard for live token burn and checkpoint state | Open. |
| Real client signatures are represented structurally in fixtures | Open; production use needs actual user approval capture. |
| Full greenfield and brownfield engagement simulations | Open. |

## Verdict

Patch-level pass for outsourcing engagement governance.

Do not claim full DFMS runtime readiness from this record alone.
