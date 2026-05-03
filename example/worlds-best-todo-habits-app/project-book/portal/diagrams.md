# Mermaid Diagram Atlas

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

This atlas indexes the known Mermaid diagrams produced so far for the dark-factory meta-meta work and this project portal.

## Diagram Sources

| ID | Source | Purpose |
|---|---|---|
| `DIA-DFMS-001` | `../../../../dark-factory-meta-skills-design/00-system-design.md` | Meta-attractor and orchestrator system design. |
| `DIA-DFMS-002` | `../../../../dark-factory-meta-skills-design/11-best-of-all-merged-control-plane.md` | Best-of-all merged control plane. |
| `DIA-DFMS-003` | `../../../../dark-factory-meta-skills-design/50-control-console-ui-record.md` | Meta-meta-first control console workflow. |
| `DIA-DFMS-004` | `../../../../dark-factory-meta-skills-design/51-factory-execution-ux-record.md` | Generated meta-skill to child-skill execution flow. |
| `DIA-DFMS-005` | `../../../../dark-factory-meta-skills-design/63-document-generation-layer-map.md` | Three-layer document generation model. |
| `DIA-NORTHSTAR-PORTAL-001` | `project-book/portal/diagrams.md` | Human review portal map. |

## Project Portal Map

```mermaid
flowchart TD
  A["Fresh Human Reviewer"] --> B["Portal Dashboard"]
  B --> C["Role-Based Onboarding Paths"]
  B --> D["Project Book Markdown"]
  B --> E["Governance Records"]
  B --> F["Evidence And Screenshots"]
  B --> G["Diagram Atlas"]
  C --> H["Client Executive"]
  C --> I["TPM / Operator"]
  C --> J["Architect / Engineer"]
  C --> K["QA / Auditor"]
  C --> L["Incoming Maintainer"]
  D --> M["PRD, Architecture, Test Strategy, Traceability, Runbook"]
  E --> N["TASKS, TPM, PERT, KG, Hawkeye, SDLC, Jury"]
  F --> O["Tests, Gates, Certificates, WYSIWYG Images"]
  G --> P["DFMS System And Control-Plane Diagrams"]
  O --> Q["Validation Summary"]
  N --> R["Legal Next Action"]
  R --> S["Open New Change-Controlled Bead"]
```

## Meta-Attractor System Design Diagram

Source: `../../../../dark-factory-meta-skills-design/00-system-design.md`

```mermaid
flowchart TD
  User["User intent / transcript / review findings"] --> Attractor["DF Meta-Attractor"]
  Attractor --> Orchestrator["Dark Factory Orchestrator"]
  Attractor --> Governance["Governance Mayor"]
  Orchestrator --> Intake["Intake Spec Lab"]
  Orchestrator --> Artifacts["Artifact Factory"]
  Orchestrator --> Swarm["Swarm Coordination"]
  Orchestrator --> Trace["Traceability Evidence"]
  Orchestrator --> Quality["Quality Refinery"]
  Orchestrator --> Handoff["Human-Agent Handoff"]
  Quality --> Certificate["Quality Certificate"]
  Trace --> Ledger["Evidence Ledger"]
  Governance --> Gate["Stage Gates"]
```

## Best-Of-All Merged Control Plane Diagram

Source: `../../../../dark-factory-meta-skills-design/11-best-of-all-merged-control-plane.md`

```mermaid
flowchart TD
  NLSpec["Natural language spec"] --> Graph["Control graph"]
  Graph --> Ledger["Work ledger"]
  Ledger --> Gate["Refinery gate"]
  Gate --> Artifacts["Artifacts and code"]
  Artifacts --> Evidence["Evidence ledger"]
  Evidence --> Review["Expert review and Hawkeye audit"]
  Review --> Decision["Pass / rework / blocked / closed"]
  Decision -->|rework| Graph
  Decision -->|pass| Handoff["Human handoff"]
```

## Control Console Workflow Diagram

Source: `../../../../dark-factory-meta-skills-design/50-control-console-ui-record.md`

```mermaid
flowchart TD
    A["Start Governed Run"] --> B["Meta-Meta Attractor Packet"]
    B --> C["Customer Grill"]
    C --> D{"Completeness >= 85% and no P1 contradictions?"}
    D -->|"no"| C
    D -->|"yes"| E["Engagement And Token Approval"]
    E --> F["Meta-Skill Routing"]
    F --> G["Artifact And SDLC Plan"]
    G --> H["Expert Debate And Critics"]
    H --> I["Build, Test, Evidence"]
    I --> J["Dashboard Control And Redo"]
    J --> K["Handoff / Next Legal Bead"]
```

## Factory Execution UX Diagram

Source: `../../../../dark-factory-meta-skills-design/51-factory-execution-ux-record.md`

```mermaid
flowchart TD
    U["Factory UX"] --> MM["Meta-Meta: df-meta-attractor"]
    MM --> GMS["Generated Project-Tailored Meta Skill"]
    GMS --> I["df-intake-spec-lab + df-swarm-coordination"]
    GMS --> G["df-governance-mayor"]
    GMS --> O["dark-factory-orchestrator + df-methodology-blender"]
    GMS --> A["df-artifact-factory + df-traceability-evidence"]
    GMS --> Q["df-swarm-coordination + df-quality-refinery"]
    GMS --> B["Build/Test/Ops Execution Plans"]
    GMS --> D["df-dashboard-control + handoff + memory"]
    D --> R["Redo Impact / Transitive Closure"]
```

## Document Generation Layer Map

Source: `../../../../dark-factory-meta-skills-design/63-document-generation-layer-map.md`

```mermaid
flowchart TD
    A["Raw human intent, transcript, standards, constraints"] --> B["Layer 1: Meta-meta skill execution"]
    B --> C["Broad domain meta-skill template pack"]
    C --> D["Layer 2: Generated meta-skill template execution"]
    D --> E["Product-specific skill pack and factory run plan"]
    E --> F["Layer 3: Product skill execution"]
    F --> G["Project book, code, tests, evidence, portal, handoff, release package"]
```

## AI Studio Agentic UX Rescue Layout

Source: `../../../../dark-factory-meta-skills-design/68-ai-studio-apple-grade-agentic-ux-rescue-brief.md`

```mermaid
flowchart LR
  Rail["Left Rail<br/>Projects<br/>Templates<br/>Artifacts<br/>Quality<br/>Stage Ladder"]
  Center["Center Studio<br/>Mission Composer<br/>Scenario Chips<br/>Active Preview<br/>Refine Input<br/>Approve / Edit / Reject"]
  Inspector["Right Inspector<br/>Agents<br/>Evidence<br/>Graph<br/>Tests<br/>Audit"]
  Rail --> Center
  Center --> Inspector
```
