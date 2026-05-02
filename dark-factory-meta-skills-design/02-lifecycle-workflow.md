# 02. Lifecycle Workflow

## Universal Node Contract

Every node in DFMS must declare:

| Field | Meaning |
| --- | --- |
| `what` | What the node produces or decides |
| `why` | Why this node exists and which risk it controls |
| `how` | Method, templates, tools, and standards used |
| `where` | Repo path, artifact path, environment, or system boundary |
| `when` | Phase, trigger, cadence, and completion condition |
| `who` | Author role, reviewer roles, accountable human or agent |
| `how_good` | Rubric, threshold, evidence, and residual risk policy |

No node is complete without all seven fields.

## Expert Debate Protocol

Every material node uses at least 3 experts.

| Round | Name | Required Action |
| --- | --- | --- |
| 0 | Context prime | Load only relevant spec, code, standards, prior decisions, and trace links |
| 1 | Independent proposals | Each expert proposes solution, risks, assumptions, and evidence needed |
| 2 | Cross critique | Each expert critiques the other proposals using its 15-point rubric |
| 3 | Alternative synthesis | Moderator creates at least 2 viable alternatives and one recommended path |
| 4 | Decision review | Experts vote: accept, revise, reject, or escalate to human taste gate |
| 5 | Verification plan | Experts define how the choice will be proven with tests, checks, or review |
| 6 | Certificate | Evidence and residual risk are recorded before the node closes |

If any expert scores below threshold, the node loops through rounds 2 to 6 again. After 3 failed loops, the system escalates to a human with a compact explanation and options.

## Lifecycle Stages

| Stage | Human SDLC Equivalent | DFMS Node | Primary Outputs | Required Expert Panel |
| --- | --- | --- | --- | --- |
| -1. Meta-attractor | Pre-intake field formation | Meta-Attractor Gate | Attractor state, requirement field map, control graph seed, routing decision, open decisions | System Theorist, Requirements/Governance Architect, Verification/Safety Critic |
| -0.5. Engagement governance | Outsourcing kickoff, commercial/budget checkpoint, change-control setup | Engagement Governance Gate | Client/dark-factory owners, scope baseline, rough token SWAG, checkpoint cadence, iteration approvals, change-control rules | Delivery Manager, Governance Auditor, Client Owner |
| 0. Intake | Sales, discovery, project kickoff | Spec Lab | Interrogation record, recursive spec decomposition record, project profile, stakeholder map, initial requirements, assumptions, constraints, work-ledger seed | Product Expert, Requirements Decomposition Lead, Governance Auditor |
| 1. Feasibility | Business case, risk review | Feasibility Gate | Feasibility assessment, risk register, option set, recommended path | Domain Expert, System Architect, Delivery Manager |
| 2. Inception | RUP inception, chartering | Inception Package | Vision, scope, BRD, RASCI, tailoring matrix, governance plan, accepted control graph | Product Expert, Governance Auditor, Change Manager |
| 3. Elaboration | Architecture and risk burn-down | Architecture Lab | HLD, ADRs, NFRs, DDD bounded contexts, MDA CIM/PIM drafts, ledger-linked design nodes | System Architect, DDD Critic, MDA Architect |
| 4. Planning | Sprint planning, release planning | Delivery Plan | Roadmap, sprint plan, dependency graph, acceptance plan, ledger work items | Delivery Manager, Test Lead, SRE Lead |
| 5. Construction | Implementation, test, integration | Build Loop | Code, tests, migrations, configs, LLD, implementation notes, updated ledger evidence | Implementation Lead, Test Lead, Security Engineer |
| 6. Verification | QA, V&V, compliance review | Refinery Gate | Test reports, coverage, static analysis, threat model validation, review records, refinery gate record | Test Lead, Security Engineer, Governance Auditor |
| 7. Transition | Release, training, handoff | Transition Package | Release notes, deployment guide, runbooks, rollback, training, ops handoff | SRE Lead, Release Manager, Product Owner |
| 8. Operation | Production support | Human-Owned SRE Mode | Observability, incident guide, on-call playbook, known risks | SRE Lead, Security Engineer, Brownfield Maintainer |
| 9. Maintenance | Change requests, defects, enhancements | Brownfield Change Loop | Impact analysis, change request, updated artifacts, regression evidence | Brownfield Maintainer, System Architect, Test Lead |
| 10. Retrospective | Continuous improvement | Feedback Learning | Lessons learned, updated templates, new scenarios, standards updates, retrospective learning record | Governance Auditor, Quality Lead, Human Owner |

Every lifecycle stage must update or explicitly waive:

- The control graph node state.
- The related work-ledger entries.
- The engagement governance record when scope, token forecast, iteration objective, or acceptance criteria change.
- The traceability/evidence links.
- The refinery gate status when verification or acceptance is involved.

Waivers require owner, reason, expiry or revalidation trigger, and residual-risk entry.

## Greenfield Flow

1. Run `df-meta-attractor` and create an Attractor Run Record that separates durable intent from benchmark/example workload.
2. Create and validate the engagement governance record: client owner, dark-factory delivery owner, rough token SWAG, checkpoint cadence, iteration approval, and change-control policy.
3. Create the initial control graph, work-ledger seed, standards tailoring matrix, and explicit waiver list.
4. Interrogate customer intent through recorded rounds, answer IDs, contradiction checks, completeness scoring, and approval mechanics.
5. Recursively decompose the spec from vision to atomic acceptance leaves; validate branch interviews, completeness scores, answer links, trace links, and owner approval.
6. Produce project profile, BRD/SRS/NFR catalog, assumptions, acceptance scenarios, and holdout/transfer-test commitments from accepted decomposition leaves.
7. Create work-ledger entries for each material requirement, artifact, risk, decision, test, handoff, and open question.
8. Run 3-expert review and fix loop for intake and requirements; update trace links from customer answers to decomposition nodes and requirements.
9. Reconfirm token SWAG after decomposition; if forecast exceeds the approved threshold, stop for client reapproval.
10. Produce architecture alternatives, MDA/DDD artifacts where selected, ADRs, and verification plan.
11. Select architecture through debate, traceable decision, human taste gate when needed, and refinery pre-check.
12. Produce implementation plan, test strategy, control graph updates, and work package ledger items.
13. Implement in small approved work packages with trace links to requirements, decisions, tests, ledger items, and iteration budget state.
14. Run unit, integration, security, performance, accessibility, scenario, holdout, transfer, and digital-twin-style checks as applicable.
15. Update HLD/LLD/runbooks/maintenance docs and project book index.
16. Run quality refinery and issue a refinery gate record plus quality certificate.
17. Produce release and production handoff package.
18. Handoff to humans or agent-owned maintenance mode based on RASCI, with handoff replay evidence.

## Brownfield Flow

1. Run `df-meta-attractor` and create or update the Attractor Run Record for the change.
2. Create or update the engagement governance record for the change, including token SWAG, iteration approval, reapproval threshold, and change-control rule.
3. Create or update the control graph and work ledger for the brownfield change, including re-entry and rollback nodes.
4. Freeze current intent, identify target behavior, and record customer answers, assumptions, contradictions, and approval state.
5. Recursively decompose the change into current-behavior branches, target-behavior branches, migration/regression leaves, and operation/handoff leaves; validate answer links and completeness.
6. Discover repo structure, architecture, commands, dependencies, tests, operational state, and risks.
7. Produce current-state map, drift report, impact analysis, affected artifact list, and revised token forecast.
8. Link affected requirements, artifacts, code, tests, incidents, runbooks, and operational docs.
9. Propose alternative change strategies and risk treatments.
10. Select strategy through expert debate, human decision where needed, and refinery pre-check.
11. If the chosen strategy changes scope, token budget, schedule, quality bar, or risk, create a change request and stop for client approval.
12. Implement the smallest safe change with trace links to ledger items and decisions.
13. Update artifacts, trace links, control graph state, work-ledger state, and engagement budget state.
14. Run regression, targeted verification, holdout/transfer checks, and handoff replay.
15. Produce refinery gate record and handoff note explaining what changed, what did not, and where risk remains.

## Human-Agent Role Swapping

| Direction | Trigger | Required Package |
| --- | --- | --- |
| Agent to human | Taste gate, ambiguity, production signoff, legal/compliance concern, low confidence | Decision brief, alternatives, recommendation, evidence, exact ask |
| Human to agent | Human completes decision, comment, review, or manual change | Handoff record, changed files/artifacts, rationale, new constraints |
| Human takeover | User says "I will handle this" or edits directly | Current node paused, ownership changed, pending verification preserved |
| Agent takeover | User says "continue", "take over", or assigns task back | Fresh context prime, changed-state recon, then resume |

## Verification Cadence

| Cadence | Verification |
| --- | --- |
| Every governed run | Attractor Run Record, control graph, work-ledger seed, routing decision, and waiver check |
| Every governed iteration | Engagement governance record, token SWAG, client checkpoint approval, change-control state, and reapproval trigger check |
| Every governed intake | Interrogation record, recursive spec decomposition record, intake package validation, and decomposition trace closure |
| Every node | Node contract completeness, selected rubrics, trace links, control graph state, work-ledger state |
| Every artifact | 3 expert reviews, 15-point rubric per expert, trace links, evidence certificate |
| Every code change | Build/test/lint/type/security checks as applicable, plus requirement/decision/test/ledger links |
| Every benchmark or simulation | Holdout scenarios and transfer tests to prevent overfitting |
| Every high-risk integration | Digital-twin-style sandbox or documented substitute |
| Every phase | Phase exit gate, artifact completeness matrix, graph/ledger/refinery proof |
| Every sprint/change batch | Change log, regression evidence, release risk update |
| Every handoff | Handoff replay test: can a fresh agent or human continue from the package? |
| Every release | Deployment rehearsal, rollback proof, observability proof, runbook drill |

## Thresholds

Default thresholds:

- Governance compliance: 98/100.
- Artifact quality: 96/100 from each selected reviewer.
- Traceability completeness: 100 percent for mandatory links.
- Requirements coverage: 100 percent for accepted requirements, with explicit deferred items.
- Security gate: no unresolved critical/high issues; medium issues require signed risk acceptance.
- Production readiness: no missing rollback, observability, ownership, or incident path.
- Token budget: rough low/mid/high SWAG approved by client; reapproval required for scope change, token forecast increase above approved threshold, or iteration objective change.

Thresholds are configurable per company risk profile, but lowering them requires a governance decision record.
