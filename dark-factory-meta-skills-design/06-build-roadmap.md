# 06. Build Roadmap

## Phase 0: Design Freeze

Goal: Agree that this design package is the right shape before building the skill bundle.

Outputs:

- Accepted architecture.
- Accepted skill hierarchy.
- Accepted artifact catalog.
- Accepted rubrics.
- Accepted traceability model.

Exit criteria:

- User approves design direction.
- Any company-specific standards, templates, stack rules, or naming rules are added.
- Decision made on install location: workspace-only draft or live Codex skill installation.

## Phase 1: Minimal Usable Skill Bundle

Build these skills first:

- `dark-factory-orchestrator`
- `df-governance-mayor`
- `df-artifact-factory`
- `df-quality-refinery`
- `df-traceability-evidence`

Resources:

- Artifact record template.
- Debate record template.
- Rubric score template.
- Quality certificate template.
- Basic validation scripts.

Validation:

- Run Codex skill validation.
- Forward-test on one greenfield prompt.
- Forward-test on one artifact-only prompt.
- Confirm no skill body exceeds reasonable context size.

## Phase 2: Brownfield and Human Swap

Add:

- `df-brownfield-recon`
- `df-human-agent-handoff`
- `df-context-memory`

Resources:

- Codebase recon playbook.
- Change impact template.
- Human takeover and handback record.
- Project book index template.

Validation:

- Run on a small existing repo.
- Confirm no code is edited before recon.
- Confirm handoff replay works with a fresh Codex session.

## Phase 3: Methodology Blender

Add:

- `df-methodology-blender`
- RUP phase maps.
- MDA CIM/PIM/PSM templates.
- DDD bounded context templates.
- TDD/BDD scenario templates.

Validation:

- Generate a blended lifecycle package for one sample product.
- Confirm methodology artifacts do not contradict each other.
- Confirm requirements link to MDA, DDD, tests, and code plan.

## Phase 4: Production and SRE Handoff

Add:

- `df-production-sre-handoff`
- Release readiness checklist.
- Deployment guide template.
- Rollback template.
- Runbook template.
- Incident drill template.

Validation:

- Generate handoff package for a sample service.
- Fresh reviewer must identify deployment, rollback, monitoring, owners, and known risks in under 10 minutes.

## Phase 5: Feedback and Continuous Improvement

Add:

- `df-feedback-learning`
- Retrospective loop.
- Lessons learned store.
- Standards-watch process.
- Rubric calibration process.

Validation:

- Human feedback becomes a tracked change request.
- New lesson updates a relevant template or rubric.
- Standards baseline can be refreshed without rewriting the whole system.

## Phase 6: Optional Gas Town Adapter

This is separate from Codex skills. If Gas Town is installed, create an adapter package that maps DFMS concepts to Gas Town concepts:

| DFMS | Gas Town-style Concept |
| --- | --- |
| Orchestrator | Mayor |
| Work node | Bead or molecule step |
| Expert worker | Polecat |
| Quality gate | Refinery |
| Evidence ledger | Beads plus artifact files |
| Context recovery | Seance plus project book |
| Escalation | `gt escalate` equivalent |

Validation:

- One convoy or equivalent work batch can run a DFMS artifact gate.
- Refinery-style merge gate blocks incomplete evidence.
- Human takeover and handback are preserved.

## Build Order

1. Create skill folders using the official skill initializer.
2. Add concise `SKILL.md` files with strong trigger descriptions.
3. Add references and templates.
4. Add validation scripts for artifact records and trace links.
5. Validate skill syntax.
6. Run sample tasks.
7. Patch skills based on failures.
8. Install into Codex skill home only after validation.

## Acceptance Tests

| Test | Expected Result |
| --- | --- |
| Greenfield intake | Produces project profile, initial requirements, artifact plan, and review plan |
| Brownfield recon | Produces current-state map before proposing changes |
| Artifact review | Produces 3 expert scorecards and a certificate |
| Traceability check | Detects missing requirement-to-test or test-to-requirement links |
| Human handoff | Produces a compact package a fresh reviewer can resume from |
| Production handoff | Produces deploy, rollback, observability, ownership, and incident docs |
| Context recovery | Resumes from project book and handoff without rereading the entire transcript |

## Open Decisions

1. Whether to install directly under `C:\Users\abhir\.codex\skills` or keep the first bundle in this workspace.
2. Whether your company has existing templates to import.
3. Whether thresholds should be exactly 96/98/100 or adjusted by project risk class.
4. Which models/runtimes the skill should assume for expert debate.
5. Whether to build a Gas Town adapter now or keep this Codex-native first.

