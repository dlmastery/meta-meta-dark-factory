# RASCI Matrix

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

## Artifact Passport

| Field | Value |
| --- | --- |
| Catalog ID | `GOV-003` |
| Artifact family | Governance and management |
| Project | Northstar Daily todo and habits demonstrator |
| Version | `2026-05-02.1` |
| Status | Standalone draft, not artifact-certified |
| Lifecycle stage | Inception through transition governance |
| Client decision supported | Who owns, approves, supports, is consulted, and is informed for every dark-factory stage and product artifact class. |
| Human owner | Abhir, client/product authority |
| Agent owner | Codex, dark-factory delivery agent |
| Approval authority | Human owner for scope, taste, budget, waivers, and external release; Codex for draft production inside approved scope |
| Control links | `DFRUN-NORTHSTAR-20260425-001`, `CGN-NORTHSTAR-IMPLEMENT`, `WLI-NORTHSTAR-IMPLEMENT`, `TB-20260502-030` |
| Source links | `02-prd.md`, `15-human-review-onboarding-portal-record.md`, `16-dashboard-control-redo-record.md`, `records/engagement-governance-record.json` |
| Evidence links | `records/TASKS.md`, `records/tpm-flow-ledger.json`, `records/ai-judge-jury-record.json`, `records/artifact-catalog-coverage-matrix.json` |
| Change control | Any role or authority change opens a change request and invalidates affected gate/certificate claims. |

## Legend

| Code | Meaning |
| --- | --- |
| R | Responsible for doing the work |
| A | Accountable for final decision or approval |
| S | Supports work with specialist input or execution |
| C | Consulted before decision |
| I | Informed after decision or state change |

No stage may proceed when the `A` role is blank, when human approval is required but missing, or when Codex is both sole `R` and sole `A` for a human-owned decision.

## Role Directory

| Role | Persona and authority | Non-negotiable evidence |
| --- | --- | --- |
| Client/Product Authority | Human owner who defines product intent, taste, acceptable scope, token spend, and waiver appetite. | Approved scope, change decisions, waiver acceptances, feedback incorporation. |
| Dark-Factory Orchestrator | Senior delivery agent that routes meta-meta, meta, and product skills in legal order. | Attractor record, control graph, task bead, next legal action. |
| Technical Program Manager Agent | Legendary TPM-style agent protecting order, dependencies, PERT, ledger discipline, token SWAG, and change control. | `TASKS.md`, PERT plan, TPM flow ledger, approval checkpoint. |
| Requirements Lead Agent | Requirements engineer responsible for interrogation, decomposition, contradiction handling, and approval-ready SRS inputs. | Answer IDs, completeness score, requirement attributes, trace links. |
| Product Strategist Agent | Product and habit/todo domain strategist protecting user value and product taste. | Research benchmark, persona assumptions, scenario acceptance. |
| System Architect Agent | Architecture owner for local-first browser design, state model, tradeoffs, and evolution path. | ADRs, HLD/LLD links, quality scenarios, risks. |
| Implementation Lead Agent | Engineer responsible for code, tests, build/run instructions, and maintainability. | Changed files, executable tests, review notes, reproducibility. |
| Verification Lead Agent | QA owner for scenario, unit, browser/WYSIWYG, accessibility, holdout, and regression evidence. | Test plans, test outputs, screenshots, defects, retest proof. |
| Hawkeye Auditor Agent | Independent conformance auditor with veto power over skipped steps, missing evidence, or overclaims. | Audit findings, no-skip checks, residual risk state. |
| Quality Refinery Panel | Three specialist critics plus adversarial critics for each artifact or code change. | Rubric scorecard, RALPH loops, fix evidence, refinery gate. |
| Human Reviewer/Maintainer | Future person who must be able to resume, inspect, challenge, or resteer the project. | Portal index, context pack, handoff record, next safe action. |

## Lifecycle RASCI

| Stage | Client/Product Authority | Orchestrator | TPM Agent | Requirements Lead | Product Strategist | Architect | Implementation Lead | Verification Lead | Hawkeye Auditor | Quality Refinery | Human Reviewer |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Meta-meta attractor and routing | A/C | R | S | C | C | C | I | I | C | C | I |
| Engagement governance and token SWAG | A | R | R | I | C | I | I | I | C | C | I |
| Interrogation and recursive spec decomposition | A/C | S | S | R | S | C | I | C | C | C | I |
| PRD/SRS/NFR and acceptance scenarios | A/C | S | C | R | S | C | I | S | C | C | I |
| Product research and benchmark | A/C | S | I | C | R | C | I | C | C | C | I |
| Architecture and ADRs | C | S | C | C | C | R | S | S | C | C | I |
| Implementation planning | C | S | R | C | C | S | R | S | C | C | I |
| Code implementation | I | S | S | I | C | C | R | S | C | C | I |
| Unit/scenario/browser/accessibility testing | I | S | S | C | C | C | S | R | C | C | I |
| Artifact catalog coverage | C | R | S | S | I | S | S | S | A/C | C | I |
| Quality refinery and RALPH loops | C | S | C | C | C | C | C | S | C | R | I |
| Human portal and onboarding | A/C | S | S | C | C | C | C | S | C | C | R/S |
| Change request and redo closure | A | R | R | S | S | S | S | S | C | C | I |
| Release or production expansion | A | R | R | C | C | S | S | R/S | A/C | C | S |

## Artifact Class RASCI

| Artifact class | R | A | S | C | I |
| --- | --- | --- | --- | --- | --- |
| Governance records | TPM Agent | Client/Product Authority for human boundary; Hawkeye for conformance veto | Orchestrator | Quality Refinery, Human Reviewer | All downstream roles |
| Requirements artifacts | Requirements Lead | Client/Product Authority | Product Strategist, Verification Lead | Architect, Hawkeye | Implementation Lead |
| Architecture/design artifacts | System Architect | Orchestrator for draft, Client for strategic tradeoffs | Implementation Lead, Verification Lead | Requirements Lead, Product Strategist | Human Reviewer |
| Implementation artifacts | Implementation Lead | Orchestrator for local slice | Architect, Verification Lead | Hawkeye, Quality Refinery | Client/Product Authority |
| Verification artifacts | Verification Lead | Hawkeye Auditor for conformance; Orchestrator for execution | Implementation Lead | Requirements Lead, Product Strategist | Human Reviewer |
| Evidence/certification artifacts | Quality Refinery | Hawkeye Auditor and Client for residual risk | Verification Lead, TPM Agent | Orchestrator | All roles |
| Handoff/portal artifacts | Human Reviewer/Maintainer | Client/Product Authority | Orchestrator, TPM Agent | Hawkeye, Quality Refinery | All roles |

## Human-Agent Handoff Rules

| Trigger | Required handoff action | Re-verification trigger |
| --- | --- | --- |
| Human changes product taste or scope | Open change request, update task bead, compute redo closure. | Reopen affected requirements, design, tests, portal, and quality gates. |
| Human takes over a task | Agent writes context pack with current state, assumptions, risks, and next command. | Human owner confirms or corrects context before downstream work. |
| Agent resumes human work | Agent reads context pack, last approval, open risks, and selected node closure. | Hawkeye checks no skipped predecessor. |
| Reviewer disagreement | Preserve dissent, run cross-critique, either fix or record explicit residual risk owner. | Quality refinery cannot pass until dissent is closed or accepted by owner. |
| Token SWAG exceeded | Pause material expansion and request approval. | Rebaseline task bead and change plan. |

## Risks And Controls

| Risk | Control | Owner | Status |
| --- | --- | --- | --- |
| Codex silently self-approves human-owned work | Human-owned `A` decisions are explicit in lifecycle table. | Hawkeye Auditor | Open control, active |
| Role ambiguity lets stages be skipped | `TASKS.md`, PERT, TPM flow, and RASCI must agree before next action. | TPM Agent | Active |
| Reviewer roles become generic | Artifact-specific critic panel required before artifact acceptance. | Quality Refinery | Pending per artifact |
| Local demonstrator is mistaken for production system | Release/production expansion remains human-accountable and change-controlled. | Client/Product Authority | Active |

## Verification Model

This draft is valid as a standalone `GOV-003` artifact only when:

1. It is indexed in the portal.
2. `records/artifact-catalog-coverage-matrix.json` points to this file.
3. `tests/artifact-catalog-coverage-audit.cjs` passes with truthful gaps.
4. A future artifact-specific review panel scores this artifact before certification.

## Quality Gate Package

| Gate element | Current state |
| --- | --- |
| Artifact-specific panel | Pending |
| 18 artifact-level rubric | Pending |
| Three 15-check critic rubrics | Pending |
| Two adversarial critics | Pending |
| Five RALPH loops | Pending |
| Certificate | Not issued |

