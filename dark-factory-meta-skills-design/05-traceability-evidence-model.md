# 05. Traceability and Evidence Model

## Principle

Every artifact must be explainable in both directions:

- Forward: why this exists and what it leads to.
- Reverse: what requirement, decision, risk, or human input caused it.

If a fresh reviewer cannot answer "why is this here?" and "what proves it is good enough?", the node is not done.

## Core Trace Link Types

| Link | Meaning |
| --- | --- |
| `satisfies` | Artifact or code satisfies a requirement |
| `verifies` | Test or review verifies a requirement/artifact |
| `derives_from` | Artifact was derived from another artifact |
| `implements` | Code implements design or requirement |
| `mitigates` | Control mitigates a risk or threat |
| `decides` | Decision record chooses among alternatives |
| `supersedes` | New artifact replaces older one |
| `depends_on` | Artifact/code depends on another item |
| `blocks` | Unresolved item prevents completion |
| `accepted_by` | Human or agent role accepted the item |
| `raises` | Review or test raises a defect, risk, or change |
| `routes_to` | Control graph node routes work to a skill, owner, artifact, or next node |
| `tracked_by` | Requirement, artifact, risk, or task is tracked by a work-ledger item |
| `gated_by` | Work item, artifact, code change, or release item is controlled by a refinery gate |
| `refines` | Control graph, work item, or artifact decomposes a higher-level item |
| `answers` | Requirement, scenario, or decision is derived from a captured customer answer |
| `revalidated_by` | Context pack, handoff, or recovered decision is confirmed by replay, review, or renewed customer answer |
| `indexed_by` | Artifact, evidence, task, gate, or certificate is included in a dashboard-control index |
| `dashboard_node_for` | Dashboard node represents a concrete project-book file, record, or evidence item |
| `redo_impacts` | Redo of one node impacts another node through explicit or inferred dependency closure |
| `redo_reopens` | Redo requires a gate, certificate, approval, or review to reopen |
| `redo_reruns` | Redo requires a test, scenario, browser check, validation, or Hawkeye audit to rerun |

## Requirement Record

```yaml
id: REQ-AUTH-001
type: functional
source: stakeholder-interview | transcript | regulation | existing-code | defect | human-comment
statement: "Users must be able to sign in with SSO."
priority: must | should | could
owner: product-owner
status: proposed | accepted | deferred | retired
acceptance_criteria:
  - id: AC-AUTH-001
    text: "A valid IdP login creates an authenticated application session."
links:
  derives_from: []
  satisfies: []
  verifies: []
  risks: []
review:
  state: accepted
  score: 98
```

## Artifact Record

```yaml
id: ARC-001
name: High-Level Design
version: 0.3
state: reviewing
standard_basis:
  - ISO/IEC/IEEE 12207:2017
  - ISO/IEC/IEEE 15289:2019
  - company-architecture-playbook
authors:
  - role: system-architect-agent
reviewers:
  - role: governance-standards-auditor
  - role: system-architect
  - role: sre-production-lead
trace:
  derives_from:
    - REQ-AUTH-001
  satisfies:
    - NFR-REL-001
  verified_by:
    - VNV-ARCH-REVIEW-001
evidence:
  - EVD-RUBRIC-001
  - EVD-DEBATE-001
  - EVD-TRACE-001
residual_risk:
  - RISK-AUTH-003
```

## Expert Debate Record

```yaml
id: EVD-DEBATE-001
node: architecture-auth-sso
rounds:
  - round: 1
    type: independent-proposals
    participants:
      - system-architect
      - security-engineer
      - sre-lead
    outputs:
      - proposal: oidc-bff-session
      - proposal: direct-spa-oidc
      - proposal: gateway-mediated-auth
  - round: 2
    type: cross-critique
    critiques:
      - from: security-engineer
        target: direct-spa-oidc
        concern: token-exposure-risk
  - round: 3
    type: synthesis
    selected: oidc-bff-session
    rejected:
      - direct-spa-oidc
      - gateway-mediated-auth
decision:
  outcome: accept
  rationale: "Best balance of security, operability, and existing architecture."
  residual_risks:
    - RISK-AUTH-003
```

## Rubric Score Record

```yaml
id: EVD-RUBRIC-001
artifact: ARC-001
reviewer_role: system-architect
rubric_version: 2026-04-24
scores:
  architecture_serves_requirements: 4
  responsibilities_clear: 4
  boundaries_explicit: 3
  data_flows_described: 4
  failure_modes_considered: 3
  scalability_tradeoffs: 4
  reliability_tradeoffs: 4
  security_integrated: 4
  operations_designed_in: 3
  alternatives_compared: 4
  rationale_specific: 4
  coupling_cohesion: 3
  tech_fit: 4
  evolvability: 4
  maintainer_understanding: 4
percent: 95
verdict: revise
required_fixes:
  - "Add explicit failure mode for IdP partial outage."
```

## Quality Certificate

```yaml
id: CERT-ARC-001
artifact: ARC-001
issued_at: "2026-04-24T00:00:00-07:00"
gate: architecture-elaboration-exit
status: pass | fail | conditional
thresholds:
  governance: 98
  selected_expert_minimum: 96
  traceability: 100
results:
  governance: 99
  system_architect: 97
  security_engineer: 98
  sre_lead: 96
  traceability: 100
evidence:
  - EVD-DEBATE-001
  - EVD-RUBRIC-001
  - EVD-TRACE-001
residual_risks:
  - RISK-AUTH-003
human_acceptance:
  required: true
  accepted_by: human-owner
  accepted_at: null
```

## Control Graph Record

```yaml
id: CG-001
goal: "Produce a governed greenfield benchmark project."
nodes:
  - id: NODE-INTAKE-001
    type: intake
    child_skills:
      - df-intake-spec-lab
    outputs:
      - REQ-PRD-001
    gates:
      - RFG-INTAKE-001
trace:
  derives_from:
    - INTENT-001
  routes_to:
    - NODE-INCEPTION-001
  tracked_by:
    - WL-INTAKE-001
```

## Work Ledger Record

```yaml
id: WL-INTAKE-001
type: requirement
status: reviewing
source:
  kind: user_message
  reference: INTENT-001
links:
  requirements:
    - REQ-PRD-001
  artifacts:
    - ART-PRD-001
  control_graph_nodes:
    - NODE-INTAKE-001
  gated_by:
    - RFG-INTAKE-001
next_action: "Customer validates assumptions or edits answers."
```

## Refinery Gate Record

```yaml
id: RFG-INTAKE-001
status: conditional_pass
scope:
  work_items:
    - WL-INTAKE-001
  artifacts:
    - ART-PRD-001
required_checks:
  traceability: pass
  expert_rubrics: pass
  handoff_replay: pass
evidence:
  rubric_scorecards:
    - EVD-RUBRIC-PRD-001
  trace_reports:
    - EVD-TRACE-PRD-001
residual_risks:
  - RISK-OPEN-CUSTOMER-ANSWERS
next_action: "Proceed only under accepted assumptions."
```

## Verification Layers

| Layer | Checks |
| --- | --- |
| Content validity | Artifact has required sections, project-specific detail, and no unsupported claims |
| Standards mapping | Artifact maps to selected standard, process, or company policy |
| Traceability | Mandatory forward and reverse links exist |
| Expert review | 3 expert rubrics pass threshold |
| Debate quality | Alternatives, critiques, decision, and residual risk are recorded |
| Executable proof | Tests, builds, static checks, model checks, or scenario runs exist where applicable |
| Handoff proof | A fresh reviewer can continue from the package |
| Drift proof | Artifact matches current code/design, or drift is recorded |
| Interrogation proof | Requirements trace back to answer IDs, contradiction resolution, and approval state |
| Spec decomposition proof | Requirement branches decompose from goal to atomic leaves with answer IDs, acceptance criteria, validation methods, and trace links |
| Human communication proof | Async feedback, taste gates, confidence framing, and owner decisions are incorporated or deferred with evidence |
| Context recovery proof | Predecessor decisions, drift, and next action survive a fresh-session replay |
| Control graph proof | Material work maps to a control graph node or has an explicit waiver |
| Work ledger proof | Material work has a durable work-ledger entry with owner, status, evidence, and next action |
| Refinery proof | Acceptance or rework outcome is recorded in a refinery gate when verification is required |
| Dashboard-control proof | Project-book handoff and redo readiness include an artifact dashboard index, selected-node redo request, downstream impact report, reopened gate/certificate list, rerun test list, token SWAG, and redo bead |
| Strict simulation proof | Greenfield and brownfield simulation records pass strict trace validation with reference resolution and inbound/outbound trace checks |

## Context Rot Controls

| Control | Purpose |
| --- | --- |
| Short work sessions | Avoid overloading one context window |
| Node-local context packs | Load only relevant requirements, artifacts, code, and prior decisions |
| Project book index | Provide compact current-state map |
| Handoff records | Preserve exact state when humans and agents swap |
| Predecessor query | Recover tacit rationale without loading all history |
| Evidence ledger | Keep proof outside conversational memory |
| Work ledger | Keep durable work state outside conversational memory |
| Control graph | Keep route, gates, re-entry paths, and human decisions visible |
| Standards baseline version | Prevent old assumptions from silently surviving |

## Done Means

An artifact or code change is done only when:

1. It has an owner.
2. It has standards or process basis.
3. It has forward and reverse trace links.
4. It has expert debate or a justified waiver.
5. It has 3 selected expert reviews.
6. It has verification evidence.
7. It has residual risk recorded.
8. It has handoff notes sufficient for a fresh human or agent.
9. For governed DFMS work, it maps to a control graph node or has an explicit waiver.
10. For material work, it has a work-ledger entry with owner, status, evidence, and next action.
11. For verification or acceptance, it has a refinery gate outcome or justified deferral.
12. For requirements, it links to customer answer IDs or documented assumptions.
13. For resumed work, it has context recovery evidence or a fresh-session replay waiver.
14. For governed simulations and benchmark claims, strict trace validation passes with no missing control graph, work-ledger, or refinery gate links.
15. For governed intake, recursive spec decomposition has passed branch completeness validation or has an owner-scoped waiver.
16. For redo-ready project books, dashboard-control indexing and selected-node transitive closure pass, and inferred edges are either promoted to explicit trace records or marked as residual risk.
