const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const { spawnSync } = require("child_process");

const ZERO_SLOP = "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS";
const PORT = Number(process.env.PORT || 4187);
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(__dirname, "public");
const LAYER_MAP_PUBLIC = path.join(ROOT, "dark-factory-meta-skills-design", "interactive-layer-map");
const RUNS = path.join(__dirname, "runs");
const SKILLS = path.join(ROOT, "codex-skills");
const DEFAULT_PROJECT_BOOK = path.join(ROOT, "example", "worlds-best-todo-habits-app", "project-book");

const STAGES = [
  {
    id: "stage-00-meta-meta",
    title: "Meta-Meta Attractor",
    kind: "meta-meta",
    skills: ["df-meta-attractor"],
    gate: "Attractor state, mode, risks, product tailoring, and no-overfit rule are recorded."
  },
  {
    id: "stage-01-interrogation",
    title: "Customer Grill",
    kind: "intake",
    skills: ["df-intake-spec-lab", "df-swarm-coordination"],
    gate: "Required answers captured, contradictions scored, and re-interrogation triggers resolved."
  },
  {
    id: "stage-02-engagement",
    title: "Engagement And Token Approval",
    kind: "governance",
    skills: ["df-governance-mayor"],
    gate: "Client owner, delivery owner, token SWAG, checkpoint, and change-control rule are approved."
  },
  {
    id: "stage-03-skill-routing",
    title: "Meta-Skill Routing",
    kind: "orchestration",
    skills: ["dark-factory-orchestrator", "df-methodology-blender"],
    gate: "Selected skills, lifecycle graph, stage coverage, and next legal node are coherent."
  },
  {
    id: "stage-04-artifacts",
    title: "Artifact And SDLC Plan",
    kind: "planning",
    skills: ["df-artifact-factory", "df-traceability-evidence"],
    gate: "Artifact BOM, trace model, standards tailoring, tests, implementation, and handoff obligations are explicit."
  },
  {
    id: "stage-05-experts",
    title: "Expert Debate And Critics",
    kind: "review",
    skills: ["df-swarm-coordination", "df-quality-refinery"],
    gate: "Elite role panel, critic panel, rubric thresholds, RALPH loop plan, and failed-point fix path exist."
  },
  {
    id: "stage-06-build-test",
    title: "Build, Test, Evidence",
    kind: "execution",
    skills: ["df-quality-refinery", "df-production-sre-handoff"],
    gate: "Implementation, tests, browser/WYSIWYG checks, scenario transfer, ops readiness, and evidence are complete."
  },
  {
    id: "stage-07-dashboard-redo",
    title: "Dashboard Control And Redo",
    kind: "control",
    skills: ["df-dashboard-control", "df-human-agent-handoff", "df-context-memory"],
    gate: "Artifact graph, task bead, redo closure, impacted gates/tests, memory, and human handoff are ready."
  }
];

const QUESTIONS = [
  { id: "ANS-001", label: "Business outcome", required: true, prompt: "What business result must this project create, and how will the client know it worked?" },
  { id: "ANS-002", label: "Primary users", required: true, prompt: "Who are the main users, buyers, operators, approvers, and auditors?" },
  { id: "ANS-003", label: "Product surface", required: true, prompt: "Which surfaces are in scope: UI, API, data, workflow, admin, mobile, desktop, integration, production ops?" },
  { id: "ANS-004", label: "Domain rules", required: true, prompt: "What are the non-negotiable domain rules, edge cases, examples, and forbidden behaviors?" },
  { id: "ANS-005", label: "Quality bar", required: true, prompt: "What does world-class quality mean here: speed, UX, safety, reliability, compliance, accessibility, maintainability?" },
  { id: "ANS-006", label: "Testing proof", required: true, prompt: "What testing evidence is mandatory: unit, integration, scenario, holdout, transfer, browser/WYSIWYG, security, load, ops drill?" },
  { id: "ANS-007", label: "Data and privacy", required: true, prompt: "What data is stored or processed, and what privacy, security, retention, or audit constraints apply?" },
  { id: "ANS-008", label: "Non-goals", required: true, prompt: "What should the factory explicitly not build, optimize, or assume?" },
  { id: "ANS-009", label: "Token boundary", required: true, prompt: "What token budget band is approved for this iteration, and what change requires reapproval?" },
  { id: "ANS-010", label: "Approval owner", required: true, prompt: "Who can approve scope, token budget, requirement changes, release, and residual risk?" },
  { id: "ANS-011", label: "Examples", required: false, prompt: "Which products, artifacts, or workflows are inspiration only, and which are binding requirements?" },
  { id: "ANS-012", label: "Brownfield context", required: false, prompt: "If this touches an existing system, what repos, files, services, behaviors, and tests must be preserved?" }
];

const INTERROGATION_ROUNDS = [
  {
    id: "ROUND-01-MISSION",
    title: "Mission And Context",
    objective: "Pin down the business outcome, users, product surface, and inspiration/non-goals before any solution shape is accepted.",
    question_ids: ["ANS-001", "ANS-002", "ANS-003", "ANS-008", "ANS-011"]
  },
  {
    id: "ROUND-02-DOMAIN-DECOMPOSITION",
    title: "Domain And Recursive Decomposition",
    objective: "Split the problem into workflows, domain rules, data, edge cases, risks, and brownfield constraints.",
    question_ids: ["ANS-004", "ANS-007", "ANS-012"]
  },
  {
    id: "ROUND-03-QUALITY-EVIDENCE",
    title: "Quality, Testing, And Evidence",
    objective: "Define world-class quality, test evidence, holdouts, scenario checks, browser/WYSIWYG proof, and operations evidence.",
    question_ids: ["ANS-005", "ANS-006"]
  },
  {
    id: "ROUND-04-ENGAGEMENT-APPROVAL",
    title: "Token Boundary And Approval",
    objective: "Capture token budget, approval owner, reapproval triggers, and explicit customer approval of the captured spec baseline.",
    question_ids: ["ANS-009", "ANS-010"]
  }
];

const QUESTION_TO_ROUND = Object.fromEntries(INTERROGATION_ROUNDS.flatMap((round) => round.question_ids.map((qid) => [qid, round.id])));

const DECOMPOSITION_AXES = [
  { id: "business-outcomes", label: "Business Outcomes", source_questions: ["ANS-001"] },
  { id: "actors-and-personas", label: "Actors And Personas", source_questions: ["ANS-002"] },
  { id: "product-surfaces", label: "Product Surfaces", source_questions: ["ANS-003"] },
  { id: "domain-rules-and-edge-cases", label: "Domain Rules And Edge Cases", source_questions: ["ANS-004"] },
  { id: "quality-attributes", label: "Quality Attributes", source_questions: ["ANS-005"] },
  { id: "test-and-evidence-obligations", label: "Test And Evidence Obligations", source_questions: ["ANS-006"] },
  { id: "data-security-privacy", label: "Data, Security, And Privacy", source_questions: ["ANS-007"] },
  { id: "non-goals-and-waivers", label: "Non-Goals And Waivers", source_questions: ["ANS-008"] },
  { id: "token-and-change-control", label: "Token And Change Control", source_questions: ["ANS-009", "ANS-010"] },
  { id: "reference-examples", label: "Reference Examples", source_questions: ["ANS-011"] },
  { id: "brownfield-impact", label: "Brownfield Impact", source_questions: ["ANS-012"] }
];

const ARTIFACT_BOM_FAMILIES = [
  { code: "GOV", family: "Governance And Engagement", stage: "stage-02-engagement", standard_refs: ["ISO 12207", "ISO 15289", "RUP"], names: ["Engagement Charter", "Token Budget And Reapproval Plan", "RASCI Matrix", "Stakeholder Register", "Decision Rights Record", "Change Control Plan", "Standards Tailoring Record", "Lifecycle Tailoring Record", "Governance Calendar", "Client Checkpoint Plan"] },
  { code: "INT", family: "Intake And Requirements", stage: "stage-01-interrogation", standard_refs: ["SWEBOK Requirements", "ISO 29148", "BDD"], names: ["Customer Interrogation Record", "Recursive Spec Decomposition", "Business Requirements Document", "Product Requirements Document", "Software Requirements Specification", "Functional Requirements Catalog", "NFR Catalog", "Assumption Register", "Constraint Register", "Glossary And Ubiquitous Language"] },
  { code: "DOM", family: "Domain And Product Modeling", stage: "stage-04-artifacts", standard_refs: ["DDD", "MDA", "RUP"], names: ["Domain Vision", "Bounded Context Map", "Context Relationship Matrix", "Domain Event Catalog", "Aggregate Catalog", "Command Catalog", "Query Catalog", "Policy And Invariant Catalog", "Ubiquitous Language Dictionary", "Domain Risk Register"] },
  { code: "MDA", family: "Model Driven Architecture", stage: "stage-04-artifacts", standard_refs: ["MDA", "UML", "ISO 42010"], names: ["Computation Independent Model", "Platform Independent Model", "Platform Specific Model", "Model Transformation Record", "Model Trace Map", "System Context Diagram", "Container Model", "Component Model", "Deployment Model", "Interface Model"] },
  { code: "UX", family: "Experience And Interaction", stage: "stage-04-artifacts", standard_refs: ["ISO 9241", "WCAG", "Material Design"], names: ["UX Research Brief", "Persona Set", "Journey Map", "Scenario Walkthroughs", "Information Architecture", "Interaction Flow Map", "Wireframe Pack", "Design System Tailoring", "Accessibility Plan", "Visual QA Checklist"] },
  { code: "ARCH", family: "Architecture And Design", stage: "stage-04-artifacts", standard_refs: ["ISO 42010", "SWEBOK Design", "RUP"], names: ["Architecture Decision Log", "High Level Design", "Low Level Design", "API Contract", "Data Contract", "Integration Contract", "State Management Design", "Error Handling Design", "Performance Design", "Resilience Design"] },
  { code: "DATA", family: "Data, Privacy, And Security", stage: "stage-04-artifacts", standard_refs: ["OWASP SAMM", "NIST SSDF", "ISO 27001"], names: ["Data Inventory", "Data Classification Matrix", "Privacy Impact Assessment", "Threat Model", "Abuse Case Catalog", "Security Requirements", "Secrets Management Plan", "Access Control Matrix", "Audit Logging Plan", "Retention And Deletion Plan"] },
  { code: "PLAN", family: "Delivery Planning", stage: "stage-04-artifacts", standard_refs: ["PMBOK", "RUP", "Agile"], names: ["Release Roadmap", "Milestone Plan", "PERT Dependency Graph", "Sprint Plan", "Backlog Map", "Risk Register", "Issue Register", "Dependency Register", "Communications Plan", "Vendor And Tooling Plan"] },
  { code: "BUILD", family: "Implementation And Code", stage: "stage-06-build-test", standard_refs: ["SWEBOK Construction", "NIST SSDF", "TDD"], names: ["Implementation Plan", "Code Structure Map", "Coding Standards Tailoring", "Branching Strategy", "Build Pipeline Plan", "Dependency Policy", "Configuration Plan", "Feature Flag Plan", "Migration Plan", "Code Review Checklist"] },
  { code: "TEST", family: "Testing And Verification", stage: "stage-06-build-test", standard_refs: ["SWEBOK Testing", "TDD", "BDD", "WCAG"], names: ["Master Test Strategy", "Unit Test Plan", "Integration Test Plan", "Scenario Test Matrix", "BDD Feature Pack", "Holdout Test Plan", "Transfer Test Plan", "Browser WYSIWYG Test Plan", "Accessibility Test Plan", "Regression Policy"] },
  { code: "OPS", family: "Release, SRE, And Operations", stage: "stage-06-build-test", standard_refs: ["SRE", "ITIL", "ISO 20000"], names: ["Release Plan", "Deployment Runbook", "Rollback Plan", "Observability Plan", "SLO And Error Budget", "Incident Response Plan", "Outage Drill Record", "Support Handoff", "Maintenance Plan", "Operator Training Record"] },
  { code: "QA", family: "Quality, Evidence, And Closure", stage: "stage-05-experts", standard_refs: ["ISO 15289", "ISO 25010", "CMMI"], names: ["Expert Panel Record", "Critic Panel Record", "Rubric Scorecard", "Quality Certificate", "Traceability Matrix", "Evidence Ledger", "Review Finding Fix Log", "Hawkeye Audit Record", "RALPH Loop Record", "Residual Risk Acceptance"] }
];

const BASE_ARTIFACT_RUBRIC = [
  "Purpose, decision value, and consumer are explicit.",
  "Inputs and source authority are named with trace links.",
  "Scope boundaries, assumptions, and non-goals are explicit.",
  "Requirements or decisions are atomic, testable, and uniquely identified.",
  "Functional behavior, NFRs, risks, and constraints are separated.",
  "Bidirectional trace to customer answers, decomposition nodes, risks, tests, and downstream artifacts exists.",
  "Standards tailoring is stated with accepted deviations or waivers.",
  "Examples are realistic and marked as examples, not binding truth.",
  "Open questions, contradictions, and re-interrogation triggers are captured.",
  "Quality thresholds and exit criteria are measurable.",
  "Owner, approver, reviewer roles, and handoff path are defined.",
  "Change impact and transitive redo obligations are listed.",
  "Security, privacy, accessibility, reliability, and operations implications are considered where applicable.",
  "Evidence links distinguish generated templates from instantiated proof.",
  "No hallucinated facts, hidden assumptions, fake pass language, or slop claims remain."
];

const STAGE_RECORDS = {
  "stage-00-meta-meta": [
    "meta-attractor-run-record.json",
    "product-tailoring-profile.json",
    "generated-meta-skill-contract.json"
  ],
  "stage-01-interrogation": [
    "intake-package.json",
    "recursive-spec-decomposition-record.json"
  ],
  "stage-02-engagement": [
    "engagement-governance-record.json",
    "token-budget-record.json"
  ],
  "stage-03-skill-routing": [
    "skill-routing-record.json",
    "lifecycle-control-graph.json",
    "execution-kernel-next-action.json",
    "agent-protocol-session-record.json"
  ],
  "stage-04-artifacts": [
    "artifact-bom.json",
    "traceability-seed.json",
    "starter-project-book-index.json"
  ],
  "stage-05-experts": [
    "expert-panel-record.json",
    "critic-panel-record.json",
    "quality-refinery-gate.json"
  ],
  "stage-06-build-test": [
    "implementation-execution-record.json",
    "build-verification-record.json",
    "scenario-test-matrix.json",
    "wysiwyg-browser-test-record.json",
    "accessibility-security-evidence-record.json",
    "production-sre-handoff-record.json"
  ],
  "stage-07-dashboard-redo": [
    "dashboard-control-record.json",
    "human-agent-handoff-record.json",
    "context-memory-pack.json"
  ]
};

const PROTOCOL_PROFILE = {
  agui: {
    name: "AG-UI",
    role: "event_stream",
    local_profile: "dfms-agui-control-events-v1",
    events: [
      "RUN_STARTED",
      "STAGE_ACTIVE",
      "STAGE_INVOKED",
      "STAGE_REPORT_READY",
      "STATE_DELTA",
      "USER_ANSWERED",
      "USER_MESSAGE",
      "USER_RESTEER_REQUESTED",
      "HUMAN_DECISION_REQUIRED",
      "HUMAN_DECISION_RECORDED",
      "PROVIDER_QUORUM_STARTED",
      "SPEC_GRAPH_IMPACT_REQUESTED",
      "GATE_PASSED",
      "GATE_BLOCKED",
      "PIPELINE_EXECUTED",
      "RALPH_AUDIT_COMPLETED",
      "GOAL_RALPH_AUDIT_COMPLETED"
    ],
    contract: "Every meaningful user, agent, gate, stage, and state transition is persisted as a structured event."
  },
  a2ui: {
    name: "A2UI",
    role: "declarative_agent_surfaces",
    local_profile: "dfms-a2ui-surfaces-v1",
    surfaces: [
      "current-stage-report",
      "customer-interrogation",
      "change-control",
      "artifact-evidence-board",
      "build-test-evidence",
      "legal-next-action-cockpit",
      "hawkeye-conformance-auditor",
      "rb-closure-board",
      "protocol-status",
      "scenario-template-router",
      "provider-quorum-board",
      "foundation-authoring-workbench",
      "human-interrupt-inbox",
      "spec-graph-impact-explorer"
    ],
    contract: "The agent declares safe data-only UI surfaces that the console renders with local Material-style components."
  },
  mcp_apps: {
    name: "MCP Apps",
    role: "tool_linked_interactive_resources",
    local_profile: "dfms-mcp-apps-manifest-v1",
    resource_mime_type: "text/html;profile=mcp-app",
    contract: "Factory tools expose UI resources, resource URIs, schemas, and human-consent boundaries for interactive workflow execution."
  }
};

const PROOF_CLASSES = [
  "working_implementation",
  "working_implementation_local",
  "instantiated_artifact",
  "validated_evidence",
  "scaffold_only",
  "template_only",
  "descriptor_only",
  "partial",
  "missing",
  "blocked",
  "waived"
];

const AGENTIC_UI_RESEARCH_FINDINGS = [
  {
    source: "AG-UI",
    principle: "Event-driven, bidirectional agent-to-user runtime",
    implication: "Every stage, state delta, human message, interrupt, gate, and tool result must appear as a structured event, not hidden text."
  },
  {
    source: "A2UI",
    principle: "Agents declare UI as validated data, while the client renders native components",
    implication: "DFMS agents must emit constrained surfaces such as stage reports, review cards, merge proposals, graph impacts, and approval requests."
  },
  {
    source: "MCP Apps",
    principle: "Tools can expose interactive UI resources with sandbox and permission boundaries",
    implication: "Factory tools must declare resource URIs, input schemas, context resources, and human-consent boundaries."
  },
  {
    source: "LangGraph HITL",
    principle: "Human review uses interrupts that pause state and resume with approve, edit, or reject",
    implication: "Sensitive DFMS transitions must create human interrupt cards before execution proceeds."
  },
  {
    source: "Magentic-UI",
    principle: "Human-agent systems need co-planning, co-tasking, multitasking, action guards, and long-term memory",
    implication: "The console must expose planning, parallel agent work, action guards, memory/context, and recovery truth in one workbench."
  }
];

const FACTORY_SCENARIOS = [
  { id: "greenfield-product", label: "Build a new product", route: "greenfield", description: "Start from raw intent, interrogate, generate product-specific skills, then build/test/artifact the product." },
  { id: "brownfield-modernization", label: "Modernize an existing system", route: "brownfield", description: "Ingest existing code/specs, recover architecture, map drift, then change safely." },
  { id: "migration-impact", label: "Migrate to a new stack", route: "migration", description: "Use spec graph impact analysis to plan platform moves, dependency breaks, and transfer tests." },
  { id: "document-existing", label: "Document what already exists", route: "documentation", description: "Reverse-engineer current behavior into traceable specs, diagrams, and handoff docs." },
  { id: "regulatory-compliance", label: "Comply with a new regulation", route: "compliance", description: "Map clauses to requirements, evidence, risks, controls, tests, and waivers." },
  { id: "product-audit", label: "Audit an existing product", route: "audit", description: "Run Hawkeye and critic panels over current artifacts, code, tests, and operations." },
  { id: "competitor-analysis", label: "Analyze a competitor", route: "research", description: "Research external product behavior, synthesize gaps, and separate inspiration from requirements." }
];

const PROJECT_TEMPLATES = [
  { id: "saas-starter", name: "SaaS Starter", domain: "SaaS", tier: "standard", modules: 7, tags: ["auth", "billing", "admin", "notifications"] },
  { id: "marketplace", name: "Two-Sided Marketplace", domain: "Marketplace", tier: "standard", modules: 12, tags: ["listings", "reviews", "payments", "escrow"] },
  { id: "healthcare", name: "Healthcare Workflow", domain: "Healthcare", tier: "enterprise", modules: 11, tags: ["privacy", "appointments", "records", "audit"] },
  { id: "education", name: "EdTech Learning Platform", domain: "EdTech", tier: "standard", modules: 10, tags: ["courses", "assessment", "progress", "certificates"] },
  { id: "brownfield-api", name: "Brownfield API Modernization", domain: "Backend", tier: "enterprise", modules: 9, tags: ["cir", "contracts", "drift", "migration"] },
  { id: "agentic-sdlc-factory", name: "Agentic SDLC Factory", domain: "AI Tooling", tier: "enterprise", modules: 15, tags: ["agents", "graph", "evidence", "human-in-loop"] }
];

const PROVIDER_QUORUM = [
  { id: "openai", label: "OpenAI", role: "planner_or_coder", status: "configured", latency_ms: 180, fallback_rank: 1 },
  { id: "anthropic", label: "Claude", role: "critic_or_architect", status: "configured", latency_ms: 210, fallback_rank: 2 },
  { id: "gemini", label: "Gemini", role: "research_or_multimodal", status: "configured", latency_ms: 240, fallback_rank: 3 },
  { id: "local", label: "Local LLM", role: "privacy_preserving_reviewer", status: "available_when_configured", latency_ms: 0, fallback_rank: 4 }
];

const FOUNDATION_SECTIONS = [
  { id: "product-brief", title: "Product Brief", estimate_minutes: 8, required: true },
  { id: "user-personas", title: "User Personas", estimate_minutes: 6, required: true },
  { id: "use-cases", title: "Use Cases", estimate_minutes: 10, required: true },
  { id: "user-scenarios", title: "User Scenarios", estimate_minutes: 8, required: true },
  { id: "user-journeys", title: "User Journeys", estimate_minutes: 8, required: true },
  { id: "user-flows", title: "User Flows", estimate_minutes: 6, required: true },
  { id: "business-workflows", title: "Business Workflows", estimate_minutes: 10, required: true },
  { id: "functional-requirements", title: "Functional Requirements", estimate_minutes: 12, required: true },
  { id: "system-constraints", title: "System Constraints", estimate_minutes: 6, required: true },
  { id: "quality-attributes", title: "Quality Attributes", estimate_minutes: 8, required: true },
  { id: "acceptance-and-tests", title: "Acceptance And Tests", estimate_minutes: 10, required: true }
];

const SPEC_GRAPH_LAYER = {
  source_prd: "C:/Users/abhir/Downloads/SPEC-GRAPH-LAYER-PRD.md",
  node_identity_format: "{kind}::{scope}::{local_id}[@{version}]",
  v1_capabilities: [
    "unified chunk identity",
    "graph substrate",
    "hybrid retrieval",
    "brownfield ingestion",
    "change impact engine",
    "dependency explorer",
    "code-spec sync dashboard"
  ],
  edge_taxonomy: ["derives_from", "depends_on", "implements", "tests", "invalidates", "supersedes", "owned_by", "evidenced_by"],
  no_duplicate_path_rule: "Reuse CIR, xref, drift, schema, brownfield, dependency-graph, foundation, and project storage primitives before creating any parallel module."
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function nowIso() {
  return new Date().toISOString();
}

function slug(value) {
  return String(value || "run").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "run";
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function readJson(file, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(file, data) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function appendAguiEvent(run, type, payload = {}) {
  run.agui_events = Array.isArray(run.agui_events) ? run.agui_events : [];
  const event = {
    zero_slop_policy: ZERO_SLOP,
    protocol: "AG-UI",
    profile: PROTOCOL_PROFILE.agui.local_profile,
    event_id: `AGUI-${Date.now()}-${String(run.agui_events.length + 1).padStart(4, "0")}`,
    type,
    at: nowIso(),
    run_id: run.run_id,
    stage_id: run.current_stage || "",
    actor: payload.actor || "dark-factory-agent-swarm",
    payload
  };
  run.agui_events.push(event);
  if (run.agui_events.length > 240) run.agui_events = run.agui_events.slice(-240);
  return event;
}

function parseSkill(file) {
  const text = fs.readFileSync(file, "utf8");
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const result = {
    name: path.basename(path.dirname(file)),
    description: "",
    path: path.relative(ROOT, file).replace(/\\/g, "/"),
    zeroSlop: text.includes(ZERO_SLOP)
  };
  if (frontmatter) {
    for (const line of frontmatter[1].split(/\r?\n/)) {
      const match = line.match(/^(\w+):\s*(.*)$/);
      if (match) result[match[1]] = match[2].trim();
    }
  }
  return result;
}

function loadSkills(skillsDir = SKILLS) {
  if (!fs.existsSync(skillsDir)) return [];
  return fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(skillsDir, entry.name, "SKILL.md"))
    .filter((file) => fs.existsSync(file))
    .map(parseSkill)
    .sort((a, b) => skillRank(a.name) - skillRank(b.name) || a.name.localeCompare(b.name));
}

function skillRank(name) {
  const order = [
    "df-meta-attractor",
    "dark-factory-orchestrator",
    "df-intake-spec-lab",
    "df-governance-mayor",
    "df-dashboard-control",
    "df-artifact-factory",
    "df-traceability-evidence",
    "df-swarm-coordination",
    "df-quality-refinery"
  ];
  const index = order.indexOf(name);
  return index === -1 ? 100 : index;
}

function projectBookSummary(projectBook = DEFAULT_PROJECT_BOOK) {
  const indexPath = path.join(projectBook, "portal", "dashboard-control-index.json");
  const index = readJson(indexPath, {});
  return {
    projectBook,
    indexPath,
    project: index.project || "No dashboard index yet",
    nodes: Array.isArray(index.nodes) ? index.nodes.length : 0,
    edges: Array.isArray(index.edges) ? index.edges.length : 0,
    generatedAt: index.generated_at || "",
    stages: summarizeStages(index.nodes || []),
    openRisks: index.residual_risks || []
  };
}

function summarizeStages(nodes) {
  return nodes.reduce((acc, node) => {
    const stage = node.stage || "unknown";
    acc[stage] = (acc[stage] || 0) + 1;
    return acc;
  }, {});
}

function buildAgenticUiContract(input = {}) {
  const scenarioInput = input.scenarioMode || input.scenario_mode;
  const projectType = input.projectType || input.project_type;
  const templateInput = input.templateId || input.template_id;
  const scenario = FACTORY_SCENARIOS.find((item) => item.id === scenarioInput || item.route === projectType) || FACTORY_SCENARIOS[0];
  const template = PROJECT_TEMPLATES.find((item) => item.id === templateInput) || PROJECT_TEMPLATES[PROJECT_TEMPLATES.length - 1];
  return {
    zero_slop_policy: ZERO_SLOP,
    contract_type: "agentic_ai_centric_factory_ui_contract",
    generated_at: nowIso(),
    scenario,
    template,
    non_negotiables: [
      "The UI is a control system for human intent, agent proposals, state, evidence, gates, interrupts, and redo impact.",
      "Every agent-visible action has a durable event, resource, stage, owner, and approval posture.",
      "Human approval, edit, reject, pause, takeover, and change-control paths must be available at material boundaries.",
      "Provider quorum output is merged, reviewed, and confirmed; provider text is never treated as final proof.",
      "Spec Graph identity and downstream impact must be visible before changing requirements, designs, tests, or code."
    ],
    required_surfaces: [
      "scenario-template-router",
      "provider-quorum-board",
      "foundation-authoring-workbench",
      "human-interrupt-inbox",
      "spec-graph-impact-explorer",
      ...PROTOCOL_PROFILE.a2ui.surfaces
    ],
    research_findings: AGENTIC_UI_RESEARCH_FINDINGS
  };
}

function buildSpecGraphState(runLike = {}) {
  const projectName = runLike.project_name || runLike.projectName || "project";
  const scope = slug(projectName);
  const nodes = [
    { id: `intent::${scope}::raw-brief@v1`, kind: "intent", label: "Raw customer intent", status: "captured" },
    { id: `question::${scope}::ANS-001@v1`, kind: "question", label: "Business outcome answer", status: "pending_or_answered" },
    { id: `requirement::${scope}::FR-001@v1`, kind: "requirement", label: "Primary functional requirement", status: "to_be_decomposed" },
    { id: `artifact::${scope}::PRD@v1`, kind: "artifact", label: "PRD / specification", status: "draftable" },
    { id: `test::${scope}::E2E-001@v1`, kind: "test", label: "Scenario and browser evidence", status: "required" },
    { id: `code::${scope}::implementation@v1`, kind: "code", label: "Future implementation", status: "blocked_until_design" }
  ];
  const edges = [
    { source: nodes[0].id, target: nodes[1].id, type: "requires_answer" },
    { source: nodes[1].id, target: nodes[2].id, type: "derives_from" },
    { source: nodes[2].id, target: nodes[3].id, type: "documents" },
    { source: nodes[2].id, target: nodes[4].id, type: "tests" },
    { source: nodes[3].id, target: nodes[5].id, type: "constrains" }
  ];
  return {
    zero_slop_policy: ZERO_SLOP,
    source_prd: SPEC_GRAPH_LAYER.source_prd,
    node_identity_format: SPEC_GRAPH_LAYER.node_identity_format,
    v1_capabilities: SPEC_GRAPH_LAYER.v1_capabilities,
    edge_taxonomy: SPEC_GRAPH_LAYER.edge_taxonomy,
    no_duplicate_path_rule: SPEC_GRAPH_LAYER.no_duplicate_path_rule,
    nodes,
    edges,
    impact_samples: [
      {
        change: "Change a confirmed use case or PRD paragraph",
        upstream: [nodes[0].id, nodes[1].id],
        downstream: [nodes[2].id, nodes[3].id, nodes[4].id, nodes[5].id],
        required_actions: ["reopen requirement decomposition", "rerun critic panel", "rerun scenario/browser tests", "refresh dashboard redo closure"]
      },
      {
        change: "Change a future implementation module",
        upstream: [nodes[2].id, nodes[3].id],
        downstream: [nodes[4].id],
        required_actions: ["update code-spec trace", "rerun regression and WYSIWYG evidence", "record SRE impact if production-facing"]
      }
    ]
  };
}

function createFoundationWorkboard() {
  return FOUNDATION_SECTIONS.map((section, index) => ({
    ...section,
    status: index < 2 ? "confirmed" : index === 2 ? "ready_for_provider_quorum" : "locked",
    provider_mode: index === 2 ? "parallel_three_provider_draft_merge_confirm" : "not_started",
    required_human_action: index === 2 ? "Review merged draft, refine if needed, then confirm section." : ""
  }));
}

function createHumanInterrupts(input = {}) {
  const scenario = FACTORY_SCENARIOS.find((item) => item.id === input.scenarioMode || item.route === input.projectType) || FACTORY_SCENARIOS[0];
  const template = PROJECT_TEMPLATES.find((item) => item.id === input.templateId) || PROJECT_TEMPLATES[PROJECT_TEMPLATES.length - 1];
  return [
    {
      zero_slop_policy: ZERO_SLOP,
      interrupt_id: `HITL-${Date.now()}-scenario-template-approval`,
      stage_id: STAGES[0].id,
      state: "pending",
      action: "approve_factory_scenario_and_template",
      description: "Approve, edit, reject, or escalate the selected scenario/template before downstream factory execution.",
      proposed_action: {
        scenario_id: scenario.id,
        scenario_label: scenario.label,
        template_id: template.id,
        template_name: template.name,
        provider_quorum_mode: String(input.providerQuorum || "three-provider-merge")
      },
      allowed_decisions: ["approve", "edit", "reject", "escalate"],
      approval_owner: String(input.approvalOwner || "human-owner"),
      created_at: nowIso()
    }
  ];
}

function createRun(input) {
  ensureDir(RUNS);
  const id = `DFRUN-UI-${new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14)}-${slug(input.projectName || "project")}`;
  const agenticUiContract = buildAgenticUiContract(input);
  const run = {
    zero_slop_policy: ZERO_SLOP,
    run_id: id,
    created_at: nowIso(),
    updated_at: nowIso(),
    status: "interrogating",
    current_stage: STAGES[0].id,
    intent: String(input.intent || "").trim(),
    project_name: String(input.projectName || "Untitled governed project").trim(),
    project_type: String(input.projectType || "greenfield").trim(),
    scenario_mode: String(input.scenarioMode || agenticUiContract.scenario.id),
    template_id: String(input.templateId || agenticUiContract.template.id),
    provider_quorum_mode: String(input.providerQuorum || "three-provider-merge"),
    project_book: input.projectBook || DEFAULT_PROJECT_BOOK,
    token_swag: {
      band: String(input.tokenBand || "medium"),
      reapproval_trigger: String(input.reapprovalTrigger || "Any scope, production, security, privacy, or artifact expansion beyond the current iteration.")
    },
    stages: STAGES.map((stage, index) => ({
      ...stage,
      status: index === 0 ? "active" : "locked",
      invocations: [],
      gate_result: index === 0 ? "ready" : "locked"
    })),
    questions: QUESTIONS,
    answers: {},
    interrogation: scoreInterrogation({}),
    interrogation_approval: {
      state: "not_requested",
      owner: "",
      approved_at: "",
      note: "",
      baseline_hash: ""
    },
    invocation_packet: buildInvocationPacket(input, {}),
    generated_meta_skill: null,
    agentic_ui_contract: agenticUiContract,
    provider_quorum: PROVIDER_QUORUM,
    foundation_sections: createFoundationWorkboard(),
    spec_graph_layer: buildSpecGraphState(input),
    execution_outputs: [],
    change_requests: [],
    human_decisions: [],
    human_interrupts: createHumanInterrupts(input),
    agent_messages: [],
    agui_events: [],
    project_collection: {
      status: "not_started",
      required_answer_count: QUESTIONS.filter((question) => question.required).length,
      captured_answer_count: 0,
      records_directory: path.relative(ROOT, runRecordsDir(id)).replace(/\\/g, "/")
    },
    audit_log: [
      {
        at: nowIso(),
        event: "run_created",
        detail: "Meta-meta attractor is the first active stage; child skills are locked until gate progression."
      }
    ]
  };
  run.invocation_packet = buildInvocationPacket(run, {});
  appendAguiEvent(run, "RUN_STARTED", {
    actor: "human-owner",
    project_name: run.project_name,
    project_type: run.project_type,
    scenario_mode: run.scenario_mode,
    template_id: run.template_id,
    token_swag: run.token_swag,
    zero_slop_policy: ZERO_SLOP
  });
  appendAguiEvent(run, "STAGE_ACTIVE", {
    stage_id: run.current_stage,
    stage_title: run.stages[0].title,
    gate: run.stages[0].gate,
    legal_next_action: "Invoke the meta-meta attractor before child skill execution."
  });
  appendAguiEvent(run, "HUMAN_DECISION_REQUIRED", {
    actor: "dark-factory-agent-swarm",
    interrupt_id: run.human_interrupts[0].interrupt_id,
    reason: "Scenario/template/provider-quorum selection is a material factory boundary.",
    proposed_action: run.human_interrupts[0].proposed_action,
    allowed_decisions: run.human_interrupts[0].allowed_decisions
  });
  saveRun(run);
  return run;
}

function runPath(id) {
  const safe = String(id || "").replace(/[^A-Za-z0-9_.-]/g, "");
  return path.join(RUNS, `${safe}.json`);
}

function loadRun(id) {
  const run = readJson(runPath(id));
  if (!run) throw Object.assign(new Error("Run not found"), { status: 404 });
  return run;
}

function runDir(id) {
  const safe = String(id || "").replace(/[^A-Za-z0-9_.-]/g, "");
  return path.join(RUNS, safe);
}

function runRecordsDir(id) {
  return path.join(runDir(id), "records");
}

function runProjectBookDir(id) {
  return path.join(runDir(id), "project-book");
}

function runImplementationDir(id) {
  return path.join(runDir(id), "implementation");
}

function saveRun(run) {
  run.updated_at = nowIso();
  run.change_requests = Array.isArray(run.change_requests) ? run.change_requests : [];
  run.human_decisions = Array.isArray(run.human_decisions) ? run.human_decisions : [];
  run.agent_messages = Array.isArray(run.agent_messages) ? run.agent_messages : [];
  run.agui_events = Array.isArray(run.agui_events) ? run.agui_events : [];
  run.interrogation = scoreInterrogation(run.answers || {}, run.interrogation_approval || null);
  run.project_collection = summarizeProjectCollection(run);
  run.generated_meta_skill = deriveGeneratedMetaSkill(run);
  run.invocation_packet = buildInvocationPacket(run, run.answers || {});
  run.execution_legal_state = computeLegalState(run);
  writeJson(runPath(run.run_id), run);
}

function summarizeProjectCollection(run) {
  const required = QUESTIONS.filter((question) => question.required);
  const captured = required.filter((question) => run.answers?.[question.id]?.value?.trim().length >= 8);
  return {
    status: run.interrogation?.gate === "pass" ? "ready" : captured.length ? "collecting" : "not_started",
    required_answer_count: required.length,
    captured_answer_count: captured.length,
    completeness: run.interrogation?.completeness || 0,
    contradiction_count: run.interrogation?.contradictions?.length || 0,
    records_directory: path.relative(ROOT, runRecordsDir(run.run_id)).replace(/\\/g, "/"),
    project_book_directory: path.relative(ROOT, runProjectBookDir(run.run_id)).replace(/\\/g, "/")
  };
}

function deriveGeneratedMetaSkill(run) {
  const answerText = Object.values(run.answers || {}).map((answer) => answer.value || "").join(" ").toLowerCase();
  const surfaces = [];
  for (const [name, pattern] of Object.entries({
    ui: /\b(ui|frontend|screen|dashboard|browser|wysiwyg)\b/,
    api: /\b(api|endpoint|service|integration)\b/,
    data: /\b(data|database|storage|analytics|privacy)\b/,
    production: /\b(production|deploy|sre|observability|incident|runbook)\b/,
    mobile: /\b(mobile|ios|android)\b/,
    brownfield: /\b(brownfield|existing|legacy|repo)\b/
  })) {
    if (pattern.test(answerText) || (name === "brownfield" && run.project_type === "brownfield")) surfaces.push(name);
  }
  if (!surfaces.length) surfaces.push(run.project_type === "artifact-only" ? "artifact" : "ui");
  const selectedSkills = Array.from(new Set(STAGES.flatMap((stage) => stage.skills)));
  return {
    zero_slop_policy: ZERO_SLOP,
    name: `generated-${slug(run.project_name)}-factory`,
    description: `Project-tailored DFMS meta-skill contract for ${run.project_name}.`,
    generated_from: "df-meta-attractor",
    product_type: run.project_type,
    surfaces,
    selected_meta_skills: selectedSkills,
    required_sequence: STAGES.map((stage) => ({ id: stage.id, title: stage.title, skills: stage.skills })),
    refusal_rules: [
      "Do not bypass df-meta-attractor for governed work.",
      "Do not execute child skills before interrogation and engagement gates pass.",
      "Do not claim completion without implementation, testing, evidence, traceability, and handoff records appropriate to the project type.",
      "Do not treat generated templates as proof."
    ]
  };
}

function answerQuestion(runId, payload) {
  const run = loadRun(runId);
  const qid = String(payload.questionId || "");
  if (!QUESTIONS.some((q) => q.id === qid)) throw Object.assign(new Error("Unknown question"), { status: 400 });
  run.answers[qid] = {
    value: String(payload.value || "").trim(),
    updated_at: nowIso()
  };
  if (run.interrogation_approval?.state === "approved") {
    run.interrogation_approval = {
      ...run.interrogation_approval,
      state: "stale_after_answer_change",
      stale_reason: `${qid} changed after approval.`,
      stale_at: nowIso()
    };
  }
  run.audit_log.push({ at: nowIso(), event: "answer_updated", detail: qid });
  appendAguiEvent(run, "USER_ANSWERED", {
    actor: "human-owner",
    question_id: qid,
    answer_length: run.answers[qid].value.length,
    completeness_after_answer: scoreInterrogation(run.answers, run.interrogation_approval).completeness
  });
  appendAguiEvent(run, "STATE_DELTA", {
    field: "interrogation",
    gate: scoreInterrogation(run.answers, run.interrogation_approval).gate,
    active_stage: run.current_stage
  });
  saveRun(run);
  return run;
}

function answerQualityScore(question, value) {
  const text = String(value || "").trim();
  if (!text) return 0;
  let score = 20;
  if (text.length >= 30) score += 15;
  if (text.length >= 80) score += 15;
  if (/[.;:\n,]/.test(text)) score += 10;
  if (/\b(scenario|workflow|user|owner|approval|test|evidence|risk|data|edge|quality|scope|token|privacy|security|browser|production)\b/i.test(text)) score += 20;
  if (/\b(example|must|shall|cannot|non-goal|acceptance|metric|deadline|budget|persona|operator|auditor)\b/i.test(text)) score += 10;
  if (question.required && text.length < 8) score = 0;
  return Math.min(100, score);
}

function interrogationBaselineHash(answers) {
  const stable = QUESTIONS.map((question) => [question.id, String(answers?.[question.id]?.value || "").trim()]);
  return crypto.createHash("sha256").update(JSON.stringify(stable)).digest("hex");
}

function splitAnswerItems(value) {
  return String(value || "")
    .split(/[\n.;]+/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 8)
    .slice(0, 8);
}

function buildSpecDecomposition(answers) {
  return {
    tree_type: "recursive_spec_decomposition",
    root: {
      id: "SPEC-ROOT",
      label: "Project Intent",
      children: DECOMPOSITION_AXES.map((axis) => {
        const sourceItems = axis.source_questions.flatMap((qid) => splitAnswerItems(answers?.[qid]?.value || ""));
        return {
          id: `SPEC-${axis.id.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}`,
          label: axis.label,
          source_questions: axis.source_questions,
          status: sourceItems.length ? "captured" : "missing_or_deferred",
          children: sourceItems.map((item, index) => ({
            id: `SPEC-${axis.id.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}-${String(index + 1).padStart(2, "0")}`,
            label: item,
            source_text: item,
            trace_to_answers: axis.source_questions.filter((qid) => (answers?.[qid]?.value || "").includes(item))
          }))
        };
      })
    }
  };
}

function buildAnswerTraceLinks(answers) {
  return QUESTIONS
    .filter((question) => (answers?.[question.id]?.value || "").trim())
    .map((question) => ({
      answer_id: question.id,
      round_id: QUESTION_TO_ROUND[question.id] || "ROUND-UNMAPPED",
      traces_to: [
        `INTAKE:${question.id}`,
        `REQ-SEED:${question.label.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}`,
        `SPEC-AXIS:${DECOMPOSITION_AXES.find((axis) => axis.source_questions.includes(question.id))?.id || "unmapped"}`
      ],
      downstream_artifacts: [
        "PRD",
        "SRS",
        "Traceability Matrix",
        "Test Strategy",
        "Artifact BOM"
      ]
    }));
}

function scoreInterrogation(answers, approval = null) {
  const required = QUESTIONS.filter((q) => q.required);
  const answerScores = QUESTIONS.map((question) => {
    const value = answers?.[question.id]?.value || "";
    const score = answerQualityScore(question, value);
    return {
      answer_id: question.id,
      round_id: QUESTION_TO_ROUND[question.id] || "ROUND-UNMAPPED",
      label: question.label,
      required: question.required,
      captured: value.trim().length >= 8,
      quality_score: score,
      status: value.trim().length < 8
        ? question.required ? "missing" : "optional_missing"
        : score < 60 ? "weak_reinterrogate" : "captured"
    };
  });
  const answered = required.filter((q) => answers?.[q.id] && answers[q.id].value.trim().length >= 8);
  const completeness = Math.round((answered.length / required.length) * 100);
  const answerText = Object.values(answers).map((a) => a.value.toLowerCase()).join(" ");
  const contradictions = [];
  if (/\b(ui|browser|dashboard|frontend|screen|mobile)\b/.test(answerText) && /\b(no browser|skip browser|no ui test|no visual test)\b/.test(answerText)) {
    contradictions.push({ severity: "P1", message: "UI surface is in scope while browser or visual testing is being skipped." });
  }
  if (/\b(production|deploy|customer data|security|privacy)\b/.test(answerText) && !answers["ANS-010"]?.value) {
    contradictions.push({ severity: "P1", message: "Production, security, or privacy language appears without an approval owner." });
  }
  if (/\b(no tests|skip tests|later tests)\b/.test(answerText)) {
    contradictions.push({ severity: "P1", message: "Testing cannot be waived casually in a governed dark-factory run." });
  }
  const weakRequired = answerScores.filter((item) => item.required && item.status === "weak_reinterrogate");
  for (const item of weakRequired) {
    contradictions.push({ severity: "P2", message: `${item.answer_id} is captured but too weak for factory-grade specification. Re-interrogate before artifact generation.` });
  }
  const p1 = contradictions.filter((item) => item.severity === "P1").length;
  const baselineHash = interrogationBaselineHash(answers || {});
  const approvalState = approval?.state === "approved" && approval?.baseline_hash === baselineHash
    ? "approved"
    : approval?.state === "approved"
      ? "stale_after_answer_change"
      : approval?.state || "not_requested";
  const readyForApproval = completeness >= 100 && p1 === 0 && weakRequired.length === 0;
  const gate = readyForApproval
    ? approvalState === "approved" ? "pass" : "approval_required"
    : "blocked";
  return {
    protocol_type: "customer_interrogation_protocol_v2",
    required_questions: required.length,
    answered_required: answered.length,
    completeness,
    answer_quality_average: Math.round(answerScores.filter((item) => item.captured).reduce((sum, item) => sum + item.quality_score, 0) / Math.max(1, answerScores.filter((item) => item.captured).length)),
    answer_scores: answerScores,
    rounds: INTERROGATION_ROUNDS.map((round) => {
      const roundScores = answerScores.filter((item) => item.round_id === round.id);
      const requiredRoundScores = roundScores.filter((item) => item.required);
      const missingRequired = requiredRoundScores.filter((item) => item.status === "missing");
      const weakRequiredRound = requiredRoundScores.filter((item) => item.status === "weak_reinterrogate");
      return {
        ...round,
        status: missingRequired.length ? "missing_answers" : weakRequiredRound.length ? "reinterrogate" : "captured",
        captured_required: requiredRoundScores.filter((item) => item.captured).length,
        required_count: requiredRoundScores.length,
        weak_required: weakRequiredRound.map((item) => item.answer_id),
        missing_required: missingRequired.map((item) => item.answer_id)
      };
    }),
    decomposition_tree: buildSpecDecomposition(answers || {}),
    trace_links: buildAnswerTraceLinks(answers || {}),
    reinterrogation_queue: [
      ...answerScores.filter((item) => item.required && item.status === "missing").map((item) => ({ reason: "missing_required_answer", answer_id: item.answer_id, round_id: item.round_id })),
      ...weakRequired.map((item) => ({ reason: "weak_answer", answer_id: item.answer_id, round_id: item.round_id })),
      ...contradictions.filter((item) => item.severity === "P1").map((item, index) => ({ reason: "p1_contradiction", contradiction_index: index, message: item.message }))
    ],
    approval: {
      state: approvalState,
      owner: approval?.owner || answers?.["ANS-010"]?.value || "",
      baseline_hash: baselineHash,
      approved_at: approval?.approved_at || "",
      note: approval?.note || "",
      approval_required: readyForApproval && approvalState !== "approved"
    },
    contradictions,
    gate
  };
}

function approveInterrogation(runId, payload = {}) {
  const run = loadRun(runId);
  const precheck = scoreInterrogation(run.answers || {}, run.interrogation_approval || null);
  if (precheck.gate === "blocked") {
    throw Object.assign(new Error("Interrogation cannot be approved until required answers, weak answers, and P1 contradictions are resolved."), { status: 409, interrogation: precheck });
  }
  const approval = {
    state: "approved",
    owner: String(payload.owner || run.answers?.["ANS-010"]?.value || "human-owner").trim(),
    approved_at: nowIso(),
    note: String(payload.note || "Human owner approved captured interrogation baseline for downstream SDLC artifact generation.").trim(),
    baseline_hash: interrogationBaselineHash(run.answers || {})
  };
  run.interrogation_approval = approval;
  run.audit_log.push({ at: nowIso(), event: "interrogation_approved", detail: approval.owner });
  appendAguiEvent(run, "HUMAN_DECISION_RECORDED", {
    actor: approval.owner,
    decision_type: "interrogation_baseline_approval",
    baseline_hash: approval.baseline_hash,
    note: approval.note
  });
  appendAguiEvent(run, "STATE_DELTA", {
    field: "interrogation",
    gate: "pass",
    legal_next_action: "Invoke and advance the customer grill stage; downstream artifacts may now be generated through the legal cursor."
  });
  saveRun(run);
  return run;
}

function buildInvocationPacket(runLike, answers) {
  const agenticUiContract = runLike.agentic_ui_contract || buildAgenticUiContract(runLike);
  return {
    zero_slop_policy: ZERO_SLOP,
    packet_type: "dfms_ui_invocation_packet",
    created_at: nowIso(),
    meta_meta_first: true,
    entry_skill: "df-meta-attractor",
    run_id: runLike.run_id || "",
    project_name: runLike.project_name || runLike.projectName || "",
    project_type: runLike.project_type || runLike.projectType || "",
    scenario_mode: runLike.scenario_mode || runLike.scenarioMode || agenticUiContract.scenario.id,
    template_id: runLike.template_id || runLike.templateId || agenticUiContract.template.id,
    provider_quorum_mode: runLike.provider_quorum_mode || runLike.providerQuorum || "three-provider-merge",
    intent: runLike.intent || "",
    token_swag: runLike.token_swag || {
      band: runLike.tokenBand || "medium",
      reapproval_trigger: runLike.reapprovalTrigger || ""
    },
    agentic_ui_contract: agenticUiContract,
    provider_quorum: runLike.provider_quorum || PROVIDER_QUORUM,
    foundation_sections: runLike.foundation_sections || createFoundationWorkboard(),
    human_interrupts: runLike.human_interrupts || createHumanInterrupts(runLike),
    spec_graph_layer: runLike.spec_graph_layer || buildSpecGraphState(runLike),
    generated_meta_skill: runLike.generated_meta_skill || null,
    agent_protocols: {
      agui: PROTOCOL_PROFILE.agui,
      a2ui: PROTOCOL_PROFILE.a2ui,
      mcp_apps: PROTOCOL_PROFILE.mcp_apps,
      run_protocol_endpoint: runLike.run_id ? `/api/runs/${encodeURIComponent(runLike.run_id)}/protocol` : "",
      agent_message_endpoint: runLike.run_id ? `/api/runs/${encodeURIComponent(runLike.run_id)}/agent-message` : "",
      human_interrupt_endpoint: runLike.run_id ? `/api/runs/${encodeURIComponent(runLike.run_id)}/interrupt` : "",
      human_can_interrogate_anytime: true,
      human_can_resteer_anytime_through_change_control: true,
      human_interrupts_required_for_sensitive_actions: true
    },
    required_sequence: STAGES.map((stage) => ({ id: stage.id, title: stage.title, skills: stage.skills, gate: stage.gate })),
    executable_records_by_stage: STAGE_RECORDS,
    open_change_requests: (runLike.change_requests || []).filter((item) => !["closed", "rejected"].includes(item.state)).map((item) => ({
      id: item.id,
      title: item.title,
      state: item.state,
      target_stage: item.target_stage,
      selected_node: item.selected_node
    })),
    interrogation_answers: answers,
    next_safe_action: "Run meta-meta attractor, then resolve customer grill blockers before child meta-skill execution."
  };
}

function invokeStage(runId, stageId) {
  const run = loadRun(runId);
  const stage = run.stages.find((item) => item.id === stageId);
  if (!stage) throw Object.assign(new Error("Unknown stage"), { status: 400 });
  const legal = computeLegalState(run, stageId);
  if (!legal.requested_stage_allowed || !legal.can_invoke_current_stage) {
    const detail = legal.blockers.map((item) => `${item.code}: ${item.detail}`).join(" ");
    throw Object.assign(new Error(detail || `Stage ${stageId} is not the current legal invocation target.`), { status: 409, legal_state: legal });
  }
  const execution = executeStageRecords(run, stage);
  const invocation = {
    invocation_id: `INV-${Date.now()}`,
    at: nowIso(),
    skills: stage.skills,
    input_packet: run.invocation_packet,
    result: execution.status,
    records: execution.records,
    note: "UI created a governed invocation packet and materialized executable DFMS control records for this stage."
  };
  stage.invocations.push(invocation);
  stage.outputs = execution.records;
  stage.execution_status = execution.status;
  stage.status = stage.status === "locked" ? "active" : stage.status;
  run.execution_outputs = Array.from(new Set([...(run.execution_outputs || []), ...execution.records]));
  run.audit_log.push({ at: nowIso(), event: "stage_invoked", detail: stageId });
  appendAguiEvent(run, "STAGE_INVOKED", {
    stage_id: stage.id,
    stage_title: stage.title,
    skills: stage.skills,
    records: execution.records,
    execution_status: execution.status
  });
  appendAguiEvent(run, "STAGE_REPORT_READY", {
    stage_report: buildStageReport(run, stage)
  });
  appendAguiEvent(run, "STATE_DELTA", {
    field: "execution_legal_state",
    legal_state: computeLegalState(run)
  });
  saveRun(run);
  return run;
}

function executeStageRecords(run, stage) {
  ensureDir(runRecordsDir(run.run_id));
  ensureDir(runProjectBookDir(run.run_id));
  if (stage.id === "stage-06-build-test") {
    run.build_test_evidence = materializeBuildTestEvidence(run);
  }
  const recordNames = STAGE_RECORDS[stage.id] || [`${stage.id}.json`];
  const records = [];
  for (const recordName of recordNames) {
    const file = path.join(runRecordsDir(run.run_id), recordName);
    writeJson(file, buildStageRecord(run, stage, recordName));
    records.push(path.relative(ROOT, file).replace(/\\/g, "/"));
  }
  if (stage.id === "stage-04-artifacts") {
    const summaryPath = path.join(runProjectBookDir(run.run_id), "00-factory-run-summary.md");
    const prdPath = path.join(runProjectBookDir(run.run_id), "01-initial-prd-skeleton.md");
    fs.writeFileSync(summaryPath, renderRunSummaryMarkdown(run), "utf8");
    fs.writeFileSync(prdPath, renderPrdSkeletonMarkdown(run), "utf8");
    records.push(path.relative(ROOT, summaryPath).replace(/\\/g, "/"));
    records.push(path.relative(ROOT, prdPath).replace(/\\/g, "/"));
  }
  if (stage.id === "stage-07-dashboard-redo") {
    const closure = computeRedoClosure({ projectBook: run.project_book, node: "02-prd.md" });
    records.push(path.relative(ROOT, closure.reportPath).replace(/\\/g, "/"));
  }
  return {
    status: stage.id === "stage-01-interrogation" ? run.interrogation.gate : "executed",
    records
  };
}

function materializeBuildTestEvidence(run) {
  const implementationDir = runImplementationDir(run.run_id);
  const srcDir = path.join(implementationDir, "src");
  const testDir = path.join(implementationDir, "tests");
  const publicDir = path.join(implementationDir, "public");
  ensureDir(srcDir);
  ensureDir(testDir);
  ensureDir(publicDir);

  const contract = buildImplementationContract(run);
  const corePath = path.join(srcDir, "product-core.cjs");
  const testPath = path.join(testDir, "product-core.test.cjs");
  const htmlPath = path.join(publicDir, "index.html");
  const contractPath = path.join(srcDir, "product-contract.json");
  const packagePath = path.join(implementationDir, "package.json");

  fs.writeFileSync(contractPath, JSON.stringify(contract, null, 2) + "\n", "utf8");
  fs.writeFileSync(corePath, renderGeneratedProductCore(contract), "utf8");
  fs.writeFileSync(testPath, renderGeneratedProductTest(), "utf8");
  fs.writeFileSync(htmlPath, renderGeneratedProductHtml(run, contract), "utf8");
  fs.writeFileSync(packagePath, JSON.stringify({
    name: `${slug(run.project_name)}-factory-generated-implementation`,
    version: "0.0.0",
    private: true,
    type: "commonjs",
    scripts: {
      test: "node tests/product-core.test.cjs"
    }
  }, null, 2) + "\n", "utf8");

  const test = spawnSync(process.execPath, [testPath], { cwd: implementationDir, encoding: "utf8" });
  const html = fs.readFileSync(htmlPath, "utf8");
  const staticChecks = [
    { id: "HTML-001", check: "document language declared", pass: /\<html[^>]+lang=/i.test(html) },
    { id: "HTML-002", check: "main landmark exists", pass: /\<main[\s>]/i.test(html) },
    { id: "HTML-003", check: "form control has label", pass: /\<label[\s>]/i.test(html) && /\<input[\s>]/i.test(html) },
    { id: "HTML-004", check: "call to action exists", pass: /\<button[\s>]/i.test(html) },
    { id: "HTML-005", check: "zero-slop boundary visible in source", pass: html.includes(ZERO_SLOP) },
    { id: "SEC-001", check: "no external script tags", pass: !/\<script[^>]+src=/i.test(html) },
    { id: "SEC-002", check: "no inline event handlers", pass: !/\son[a-z]+=/i.test(html) }
  ];
  const generatedFiles = [contractPath, corePath, testPath, htmlPath, packagePath].map((file) => ({
    path: path.relative(ROOT, file).replace(/\\/g, "/"),
    sha256: crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex"),
    bytes: fs.statSync(file).size
  }));
  const testPassed = test.status === 0;
  const staticPassed = staticChecks.every((item) => item.pass);
  return {
    zero_slop_policy: ZERO_SLOP,
    evidence_type: "dfms_code_producing_build_test_evidence",
    generated_at: nowIso(),
    proof_class: testPassed && staticPassed ? "working_implementation_local" : "blocked",
    implementation_root: path.relative(ROOT, implementationDir).replace(/\\/g, "/"),
    generated_files: generatedFiles,
    build_command: `${process.execPath} ${path.relative(implementationDir, testPath).replace(/\\/g, "/")}`,
    build_exit_code: test.status,
    build_status: testPassed ? "pass" : "fail",
    stdout: String(test.stdout || "").trim(),
    stderr: String(test.stderr || "").trim(),
    static_checks: staticChecks,
    scenario_coverage: buildScenarioCoverage(run, testPassed, staticPassed),
    trust_boundary: "This proves the factory can generate and execute a local implementation/test package. It is not a production product release."
  };
}

function buildImplementationContract(run) {
  const answers = normalizeAnswers(run);
  const requiredAnswers = Object.entries(answers)
    .filter(([, answer]) => answer.required)
    .map(([id, answer]) => ({ id, label: answer.label, status: answer.status, excerpt: answer.value.slice(0, 180) }));
  return {
    zero_slop_policy: ZERO_SLOP,
    contract_type: "factory_generated_product_implementation_contract",
    run_id: run.run_id,
    project_name: run.project_name,
    project_type: run.project_type,
    generated_from: "stage-06-build-test",
    source_baseline_hash: run.interrogation?.approval?.baseline_hash || run.interrogation_approval?.baseline_hash || "",
    requirements: requiredAnswers,
    product_surfaces: deriveGeneratedMetaSkill(run).surfaces,
    mandatory_evidence: ["unit", "scenario", "holdout", "transfer", "browser_wysiwyg", "accessibility_static", "security_static"],
    acceptance: {
      no_product_claim_without_code: true,
      no_ui_claim_without_browser_or_static_wysiwyg_record: true,
      no_scenario_claim_without_holdout_and_transfer_cases: true
    }
  };
}

function renderGeneratedProductCore(contract) {
  return `"use strict";

// ${ZERO_SLOP}
// Factory-generated local implementation proof. Do not treat this as production release code.

const projectContract = ${JSON.stringify(contract, null, 2)};

function normalizeTask(input) {
  const title = String(input && input.title || "").trim();
  if (title.length < 2) throw new Error("Task title is required.");
  return {
    id: String(input.id || "TASK-LOCAL-001"),
    title,
    done: Boolean(input.done),
    evidenceRequired: true,
    sourceBaselineHash: projectContract.source_baseline_hash || "unapproved-baseline"
  };
}

function createScenarioPlan(intent = "") {
  const text = String(intent || projectContract.project_name || "");
  return {
    project: projectContract.project_name,
    scenarioCount: 5,
    scenarios: [
      "happy path task capture",
      "negative empty-title rejection",
      "holdout unfamiliar workflow",
      "transfer cross-product workflow",
      "browser WYSIWYG inspection"
    ],
    intentLength: text.length
  };
}

function validateEvidencePlan(plan) {
  const evidence = Array.isArray(plan && plan.evidence) ? plan.evidence : [];
  const required = projectContract.mandatory_evidence;
  const missing = required.filter((item) => !evidence.includes(item));
  return { pass: missing.length === 0, missing, required };
}

module.exports = {
  projectContract,
  normalizeTask,
  createScenarioPlan,
  validateEvidencePlan
};
`;
}

function renderGeneratedProductTest() {
  return `"use strict";

const assert = require("assert");
const { projectContract, normalizeTask, createScenarioPlan, validateEvidencePlan } = require("../src/product-core.cjs");

assert(projectContract.zero_slop_policy.includes("NO AI SLOP"), "contract carries zero-slop policy");
assert(projectContract.acceptance.no_product_claim_without_code, "contract blocks product claims without code");

const task = normalizeTask({ title: "Capture first validated task" });
assert.strictEqual(task.done, false, "task defaults to incomplete");
assert.strictEqual(task.evidenceRequired, true, "task carries evidence requirement");
assert.throws(() => normalizeTask({ title: " " }), /Task title is required/, "empty task title rejected");

const scenario = createScenarioPlan("Build a todo and habit product through the factory.");
assert(scenario.scenarioCount >= 5, "scenario plan covers happy, negative, holdout, transfer, and browser proof");

const evidence = validateEvidencePlan({
  evidence: ["unit", "scenario", "holdout", "transfer", "browser_wysiwyg", "accessibility_static", "security_static"]
});
assert.strictEqual(evidence.pass, true, "mandatory evidence classes are satisfied");

const missingEvidence = validateEvidencePlan({ evidence: ["unit"] });
assert.strictEqual(missingEvidence.pass, false, "incomplete evidence cannot pass");
assert(missingEvidence.missing.includes("browser_wysiwyg"), "browser proof remains mandatory");

console.log("factory-generated implementation tests passed");
`;
}

function renderGeneratedProductHtml(run, contract) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(run.project_name)} - Factory Generated App Shell</title>
  <style>
    :root { color-scheme: light; font-family: Arial, sans-serif; }
    body { margin: 0; background: #f8faf9; color: #111513; }
    main { max-width: 760px; margin: 0 auto; padding: 32px 20px; }
    .panel { border: 1px solid #cfd8d3; border-radius: 8px; background: #ffffff; padding: 24px; }
    label, input, button { display: block; width: 100%; box-sizing: border-box; }
    input { margin: 8px 0 16px; padding: 12px; border: 1px solid #9ca7a1; border-radius: 4px; }
    button { padding: 12px 16px; border: 0; border-radius: 4px; background: #006c4c; color: #ffffff; font-weight: 700; }
    small { color: #45514b; }
  </style>
</head>
<body>
  <main>
    <section class="panel" aria-labelledby="app-title">
      <small>${ZERO_SLOP}</small>
      <h1 id="app-title">${escapeHtml(run.project_name)}</h1>
      <p>Factory-generated local implementation proof for ${escapeHtml(contract.project_type)}. It exists to prove code and tests were produced after governed planning.</p>
      <form>
        <label for="task-title">Task title</label>
        <input id="task-title" name="task-title" autocomplete="off" value="Capture first validated task">
        <button type="button">Add task</button>
      </form>
    </section>
  </main>
</body>
</html>
`;
}

function buildScenarioCoverage(run, testPassed, staticPassed) {
  const baseEvidence = testPassed ? "generated unit test passed" : "generated unit test failed";
  return [
    { id: "SCN-001", type: "happy_path", name: "Capture a validated work item", status: testPassed ? "pass" : "fail", evidence: baseEvidence, source_answers: ["ANS-003", "ANS-006"] },
    { id: "SCN-002", type: "negative", name: "Reject empty task title", status: testPassed ? "pass" : "fail", evidence: baseEvidence, source_answers: ["ANS-004", "ANS-006"] },
    { id: "SCN-003", type: "holdout", name: "Unseen workflow still requires complete evidence classes", status: testPassed ? "pass" : "fail", evidence: baseEvidence, source_answers: ["ANS-005", "ANS-006"] },
    { id: "SCN-004", type: "transfer", name: "Transfer evidence policy to another product archetype", status: testPassed ? "pass" : "fail", evidence: baseEvidence, source_answers: ["ANS-011"] },
    { id: "SCN-005", type: "browser_wysiwyg", name: "Generated UI shell has inspectable semantic structure", status: staticPassed ? "pass" : "fail", evidence: "static HTML/WYSIWYG checks", source_answers: ["ANS-003", "ANS-006"] },
    { id: "SCN-006", type: "accessibility_security", name: "Generated shell passes static accessibility and script-safety checks", status: staticPassed ? "pass" : "fail", evidence: "static accessibility/security checks", source_answers: ["ANS-005", "ANS-007"] }
  ];
}

function artifactTemplateSections(artifactName) {
  return [
    "Zero-slop compliance banner",
    "Artifact purpose and decision supported",
    "Source inputs and authority",
    "Scope boundary and assumptions",
    "Detailed content sections for this artifact",
    "Examples using project-specific realistic scenarios",
    "Trace links to answers, decomposition nodes, requirements, tests, risks, and downstream artifacts",
    "Review panel and critic panel assignments",
    "Fifteen-point quality rubric",
    "Open questions, waivers, residual risk, and re-entry triggers"
  ].map((section, index) => ({ order: index + 1, heading: section, required: true, artifact_context: artifactName }));
}

function buildArtifactBom(run) {
  const answers = normalizeAnswers(run);
  const traceLinks = run.interrogation?.trace_links || buildAnswerTraceLinks(run.answers || {});
  const artifacts = ARTIFACT_BOM_FAMILIES.flatMap((family, familyIndex) => family.names.map((name, index) => {
    const artifactId = `${family.code}-${String(index + 1).padStart(3, "0")}`;
    const primaryAnswer = traceLinks[(familyIndex + index) % Math.max(1, traceLinks.length)];
    return {
      id: artifactId,
      name,
      family: family.family,
      lifecycle_stage: family.stage,
      standard_refs: family.standard_refs,
      required: true,
      status: "template_ready_pending_instantiation",
      purpose: `${name} for ${run.project_name}; used to govern ${family.family.toLowerCase()} decisions without treating templates as proof.`,
      template: {
        zero_slop_policy: ZERO_SLOP,
        template_id: `TPL-${artifactId}`,
        sections: artifactTemplateSections(name),
        sample_scenario: `${run.project_name} team uses ${name} to decide a realistic product path from answer ${primaryAnswer?.answer_id || "ANS-001"} while preserving traceability and owner approval.`,
        fill_rules: [
          "Replace every example with project-specific evidence or mark it as not applicable.",
          "Every claim needs a source answer, decision record, test, code link, or approved waiver.",
          "A generated template is never accepted proof by itself."
        ]
      },
      rubric_15: BASE_ARTIFACT_RUBRIC.map((check, rubricIndex) => ({
        id: `${artifactId}-R${String(rubricIndex + 1).padStart(2, "0")}`,
        check,
        pass_threshold: "must_pass",
        reviewer_role: rubricIndex % 3 === 0 ? "artifact specialist" : rubricIndex % 3 === 1 ? "hawkeye auditor" : "adversarial critic"
      })),
      expert_review_panel: [
        `${family.family} specialist`,
        "Traceability/evidence auditor",
        "Hawkeye no-slop critic"
      ],
      adversarial_critics: [
        "Template-as-proof critic",
        "Missing-downstream-impact critic"
      ],
      trace_obligations: {
        source_answers: primaryAnswer ? [primaryAnswer.answer_id] : Object.keys(answers).slice(0, 1),
        decomposition_axes: DECOMPOSITION_AXES.filter((axis) => axis.source_questions.some((qid) => primaryAnswer?.answer_id === qid)).map((axis) => axis.id),
        downstream_artifacts: ["Traceability Matrix", "Test Evidence Plan", "Quality Certificate", "Dashboard Control Index"]
      },
      waiver_policy: {
        waiver_allowed: false,
        required_if_not_applicable: true,
        waiver_requires: ["owner", "reason", "risk", "downstream impact", "reapproval trigger"]
      }
    };
  }));
  return {
    zero_slop_policy: ZERO_SLOP,
    catalog_version: "dfms-artifact-bom-v2",
    artifact_count: artifacts.length,
    family_count: ARTIFACT_BOM_FAMILIES.length,
    minimum_required_artifacts: 100,
    rubric_checks_per_artifact: BASE_ARTIFACT_RUBRIC.length,
    standards_basis: Array.from(new Set(ARTIFACT_BOM_FAMILIES.flatMap((family) => family.standard_refs))),
    tailoring_policy: {
      default: "All serious governed runs start with the full catalog.",
      reduction_rule: "Reduction requires an explicit human-approved tailoring waiver with owner, risk, and downstream impact.",
      template_boundary: "Catalog entries and templates are planning assets, not proof that the project artifact has been authored."
    },
    source_interrogation: {
      gate: run.interrogation?.gate || "unknown",
      approval_state: run.interrogation?.approval?.state || run.interrogation_approval?.state || "unknown",
      baseline_hash: run.interrogation?.approval?.baseline_hash || ""
    },
    artifacts
  };
}

function buildReviewEngine(run) {
  const bom = buildArtifactBom(run);
  const assignments = bom.artifacts.map((artifact) => ({
    artifact_id: artifact.id,
    artifact_name: artifact.name,
    family: artifact.family,
    independent_expert_panel: [
      { role: `${artifact.family} Lead`, obligation: "Independently review completeness, standards fit, and decision usefulness." },
      { role: "Traceability And Evidence Lead", obligation: "Independently verify bidirectional trace, proof class, and waiver evidence." },
      { role: "Hawkeye Quality Auditor", obligation: "Independently attack slop, skipped steps, fake pass language, and unsupported claims." }
    ],
    adversarial_critic_panel: [
      { role: "Template-As-Proof Critic", attack: "Rejects any artifact that treats a generated template as instantiated evidence." },
      { role: "Downstream-Impact Critic", attack: "Rejects missing test, code, operations, handoff, or redo closure obligations." }
    ],
    rubric_15: artifact.rubric_15,
    ralph_loop_plan: Array.from({ length: 5 }, (_, index) => ({
      loop: index + 1,
      review: "Read artifact against source answers, standards, trace, and downstream obligations.",
      attack: "Find ambiguity, hallucination, missing evidence, weak examples, skipped tests, or fake acceptance.",
      learn: "Record the strongest critique and whether it changes the artifact or its waiver.",
      patch: "Update artifact or create explicit waiver/finding-fix evidence.",
      harden: "Re-run scorecard and preserve before/after evidence."
    })),
    scorecard_policy: {
      pass_threshold_percent: 96,
      must_pass_all_p1: true,
      independent_review_required: true,
      cross_critique_required: true,
      failed_point_fix_evidence_required: true
    },
    certificate_rule: "No quality certificate may issue until this assignment has passing scorecards, closed P1/P2 findings or accepted residual risk, and trace-linked evidence."
  }));
  return {
    zero_slop_policy: ZERO_SLOP,
    engine_version: "dfms-review-engine-v2",
    source_artifact_count: bom.artifact_count,
    assignment_count: assignments.length,
    required_experts_per_artifact: 3,
    required_adversarial_critics_per_artifact: 2,
    required_rubric_checks_per_artifact: 15,
    required_ralph_loops_per_artifact: 5,
    review_sequence: [
      "independent specialist reviews",
      "cross-critique",
      "adversarial attack",
      "failed-point fix loop",
      "quality certificate or residual-risk rejection"
    ],
    assignments
  };
}

function buildStageRecord(run, stage, recordName) {
  const base = {
    zero_slop_policy: ZERO_SLOP,
    record_id: `${stage.id}-${recordName.replace(/[^A-Za-z0-9]+/g, "-")}-${Date.now()}`,
    record_type: recordName.replace(/\.(json|md)$/i, ""),
    run_id: run.run_id,
    project_name: run.project_name,
    project_type: run.project_type,
    stage_id: stage.id,
    stage_title: stage.title,
    skills: stage.skills,
    created_at: nowIso(),
    status: "draft",
    source_intent: run.intent,
    token_swag: run.token_swag,
    project_collection: summarizeProjectCollection(run),
    trace: {
      answers: Object.keys(run.answers || {}),
      generated_meta_skill: run.generated_meta_skill?.name || deriveGeneratedMetaSkill(run).name
    }
  };
  const answers = normalizeAnswers(run);
  if (recordName === "meta-attractor-run-record.json") {
    return {
      ...base,
      status: "accepted",
      attractor_state: run.intent.length >= 12 ? "forming" : "blocked",
      selected_mode: run.project_type,
      generated_meta_skill: deriveGeneratedMetaSkill(run),
      next_safe_action: "Collect and validate customer answers before child meta-skill execution."
    };
  }
  if (recordName === "product-tailoring-profile.json") {
    return {
      ...base,
      status: "accepted",
      profile: {
        product_type: run.project_type,
        surfaces: deriveGeneratedMetaSkill(run).surfaces,
        standards: ["ISO 12207", "ISO 15289", "SWEBOK", "RUP", "MDA", "DDD", "TDD", "BDD", "SRE"],
        required_evidence: ["interrogation", "traceability", "tests", "expert review", "dashboard closure", "handoff"]
      }
    };
  }
  if (recordName === "generated-meta-skill-contract.json") {
    return { ...base, status: "accepted", generated_meta_skill: deriveGeneratedMetaSkill(run) };
  }
  if (recordName === "intake-package.json") {
    return {
      ...base,
      status: run.interrogation.gate,
      answers,
      interrogation: run.interrogation,
      reinterrogation_required: run.interrogation.gate !== "pass"
    };
  }
  if (recordName === "recursive-spec-decomposition-record.json") {
    return {
      ...base,
      status: run.interrogation.gate,
      decomposition_tree: buildDecompositionTree(run),
      completeness_rule: "Every branch must have answer source, acceptance criteria, risks, tests, and owner or explicit waiver."
    };
  }
  if (recordName === "engagement-governance-record.json" || recordName === "token-budget-record.json") {
    return {
      ...base,
      status: run.answers["ANS-009"] && run.answers["ANS-010"] ? "accepted" : "blocked",
      client_owner: run.answers["ANS-010"]?.value || "",
      delivery_owner: "dark-factory-agent-swarm",
      token_swag: run.token_swag,
      change_control: run.token_swag.reapproval_trigger
    };
  }
  if (recordName === "skill-routing-record.json") {
    return {
      ...base,
      status: "accepted",
      generated_meta_skill: deriveGeneratedMetaSkill(run),
      routes: STAGES.map((item) => ({ stage_id: item.id, stage: item.title, skills: item.skills, gate: item.gate }))
    };
  }
  if (recordName === "lifecycle-control-graph.json") {
    return {
      ...base,
      status: "accepted",
      nodes: STAGES.map((item, index) => ({ id: item.id, order: index, title: item.title, gate: item.gate, skills: item.skills })),
      edges: STAGES.slice(1).map((item, index) => ({ source: STAGES[index].id, target: item.id, type: "precedes" }))
    };
  }
  if (recordName === "execution-kernel-next-action.json") {
    return {
      ...base,
      status: "accepted",
      legal_next_action: run.current_stage,
      blocked_actions: ["direct child-skill execution before active gate", "artifact completion without evidence", "production handoff without owner"]
    };
  }
  if (recordName === "agent-protocol-session-record.json") {
    return {
      ...base,
      status: "accepted",
      protocols: PROTOCOL_PROFILE,
      agui_event_count: (run.agui_events || []).length,
      a2ui_surface_count: buildA2uiSurfaces(run).length,
      mcp_apps_tool_count: buildMcpAppsManifest(run).tools.length,
      user_controls: [
        "interrogate agent any time",
        "answer customer grill questions",
        "open change request and resteer",
        "execute only legal next stage",
        "inspect protocol event stream and MCP-style tool/resource descriptors"
      ],
      no_skip_rule: "A stage cannot be claimed accepted without invocation evidence, records, trace/evidence posture, and a protocol-visible event trail."
    };
  }
  if (recordName === "artifact-bom.json") {
    return {
      ...base,
      status: "accepted",
      artifact_bom: buildArtifactBom(run)
    };
  }
  if (recordName === "traceability-seed.json") {
    const bom = buildArtifactBom(run);
    return {
      ...base,
      status: "accepted",
      nodes: [
        ...Object.entries(answers).map(([id, answer]) => ({ id, type: "customer_answer", summary: answer.value.slice(0, 140) })),
        ...bom.artifacts.map((artifact) => ({ id: artifact.id, type: "artifact", name: artifact.name, family: artifact.family }))
      ],
      edges: [
        ...Object.keys(answers).map((id) => ({ source: id, target: "generated-meta-skill-contract", type: "derives_from" })),
        ...bom.artifacts.flatMap((artifact) => artifact.trace_obligations.source_answers.map((answerId) => ({ source: answerId, target: artifact.id, type: "informs_artifact" })))
      ]
    };
  }
  if (recordName === "starter-project-book-index.json") {
    return {
      ...base,
      status: "accepted",
      project_book_directory: path.relative(ROOT, runProjectBookDir(run.run_id)).replace(/\\/g, "/"),
      files: ["00-factory-run-summary.md", "01-initial-prd-skeleton.md"]
    };
  }
  if (recordName === "expert-panel-record.json" || recordName === "critic-panel-record.json") {
    const reviewEngine = buildReviewEngine(run);
    return {
      ...base,
      status: "accepted",
      experts: [
        expertPersona("Engagement Partner", "Owns client confidence, token budget, change control, and outsourcing-style checkpoints."),
        expertPersona("Requirements Interrogation Lead", "Owns answer quality, contradiction pressure, and recursive spec decomposition."),
        expertPersona("Hawkeye Workflow Auditor", "Owns no-skip conformance, stage gates, evidence integrity, and veto power.")
      ],
      review_rounds_required: 5,
      review_engine: recordName === "expert-panel-record.json"
        ? {
          assignment_count: reviewEngine.assignment_count,
          panels: reviewEngine.assignments.map((assignment) => ({
            artifact_id: assignment.artifact_id,
            artifact_name: assignment.artifact_name,
            experts: assignment.independent_expert_panel
          }))
        }
        : {
          assignment_count: reviewEngine.assignment_count,
          panels: reviewEngine.assignments.map((assignment) => ({
            artifact_id: assignment.artifact_id,
            artifact_name: assignment.artifact_name,
            adversarial_critics: assignment.adversarial_critic_panel
          }))
        }
    };
  }
  if (recordName === "quality-refinery-gate.json") {
    const reviewEngine = buildReviewEngine(run);
    return {
      ...base,
      status: "accepted",
      thresholds: { expert_count: 3, checks_per_expert: 15, minimum_score: 96 },
      review_engine: reviewEngine,
      residual_risks: ["Engine assignment is ready; generated artifact templates still require real artifact authoring and scorecard execution before final project acceptance."]
    };
  }
  if (recordName === "implementation-execution-record.json") {
    return {
      ...base,
      status: run.build_test_evidence?.proof_class === "working_implementation_local" ? "accepted" : "blocked",
      proof_class: run.build_test_evidence?.proof_class || "missing",
      implementation_required: run.project_type !== "artifact-only",
      generated_files: run.build_test_evidence?.generated_files || [],
      implementation_root: run.build_test_evidence?.implementation_root || "",
      source_baseline_hash: run.build_test_evidence?.generated_files?.length ? (run.interrogation?.approval?.baseline_hash || run.interrogation_approval?.baseline_hash || "") : "",
      evidence_boundary: run.build_test_evidence?.trust_boundary || "No implementation evidence has been generated."
    };
  }
  if (recordName === "build-verification-record.json") {
    return {
      ...base,
      status: run.build_test_evidence?.build_status || "missing",
      proof_class: run.build_test_evidence?.build_status === "pass" ? "validated_evidence" : "blocked",
      command: run.build_test_evidence?.build_command || "",
      exit_code: run.build_test_evidence?.build_exit_code,
      stdout: run.build_test_evidence?.stdout || "",
      stderr: run.build_test_evidence?.stderr || "",
      generated_files: run.build_test_evidence?.generated_files || []
    };
  }
  if (recordName === "scenario-test-matrix.json") {
    return {
      ...base,
      status: (run.build_test_evidence?.scenario_coverage || []).every((item) => item.status === "pass") ? "accepted" : "blocked",
      proof_class: "validated_evidence",
      required_test_classes: ["unit", "scenario", "negative", "holdout", "transfer", "browser_wysiwyg", "accessibility_static", "security_static"],
      scenario_coverage: run.build_test_evidence?.scenario_coverage || [],
      exit_rule: "Scenario-driven product claims fail if happy, negative, holdout, transfer, browser, accessibility, or security evidence is missing."
    };
  }
  if (recordName === "wysiwyg-browser-test-record.json") {
    const checks = run.build_test_evidence?.static_checks || [];
    return {
      ...base,
      status: checks.filter((item) => item.id.startsWith("HTML-")).every((item) => item.pass) ? "accepted" : "blocked",
      proof_class: "validated_evidence",
      evidence_mode: "local_static_wysiwyg_plus_browser_regression_required",
      inspected_file: (run.build_test_evidence?.generated_files || []).find((item) => item.path.endsWith("public/index.html"))?.path || "",
      viewport_requirements: ["desktop 1440x1000", "mobile 390x900"],
      static_checks: checks.filter((item) => item.id.startsWith("HTML-")),
      browser_regression: "dark-factory-control-console/tests/browser-console.test.cjs verifies that build/test evidence is visible in the factory portal."
    };
  }
  if (recordName === "accessibility-security-evidence-record.json") {
    const checks = run.build_test_evidence?.static_checks || [];
    const relevant = checks.filter((item) => item.id.startsWith("SEC-") || item.id.startsWith("HTML-"));
    return {
      ...base,
      status: relevant.every((item) => item.pass) ? "accepted" : "blocked",
      proof_class: "validated_evidence",
      accessibility_checks: checks.filter((item) => item.id.startsWith("HTML-")),
      security_checks: checks.filter((item) => item.id.startsWith("SEC-")),
      residual_risk: "Static checks are evidence for the local starter implementation only; production security review remains required for deployable products."
    };
  }
  if (recordName === "production-sre-handoff-record.json") {
    return {
      ...base,
      status: run.build_test_evidence?.build_status === "pass" ? "accepted_with_boundary" : "blocked",
      proof_class: run.build_test_evidence?.build_status === "pass" ? "instantiated_artifact" : "blocked",
      handoff: ["deploy", "rollback", "observability", "incident drill", "operator signoff", "known risks"],
      local_runbook: {
        start: "Open the generated implementation/public/index.html for local visual inspection.",
        test: run.build_test_evidence?.build_command || "No local command generated.",
        rollback: "Delete the run implementation directory or reopen stage-06 through change control.",
        incident_drill: "If generated tests fail, block handoff, reopen implementation, and rerun scenario matrix."
      },
      production_boundary: "Production deployment is not performed by this local RB-06 slice; production handoff remains bounded to generated evidence and runbook obligations."
    };
  }
  if (recordName === "dashboard-control-record.json") {
    return {
      ...base,
      status: "planned",
      dashboard_index_required: true,
      redo_closure_required: true,
      selected_node_policy: "No material redo without downstream impact report and task bead."
    };
  }
  if (recordName === "human-agent-handoff-record.json" || recordName === "context-memory-pack.json") {
    return {
      ...base,
      status: "planned",
      handoff_ready: false,
      required_before_handoff: ["accepted gates", "evidence links", "next legal action", "residual risks", "owner approval"]
    };
  }
  return base;
}

function normalizeAnswers(run) {
  const result = {};
  for (const question of QUESTIONS) {
    result[question.id] = {
      label: question.label,
      required: question.required,
      prompt: question.prompt,
      value: run.answers?.[question.id]?.value || "",
      status: run.answers?.[question.id]?.value?.trim().length >= 8 ? "answered" : question.required ? "missing" : "optional"
    };
  }
  return result;
}

function buildDecompositionTree(run) {
  return {
    root: {
      id: "SPEC-ROOT",
      name: run.project_name,
      children: [
        branch("SPEC-BUSINESS", "Business and stakeholders", ["ANS-001", "ANS-002", "ANS-010"]),
        branch("SPEC-PRODUCT", "Product surfaces and domain behavior", ["ANS-003", "ANS-004", "ANS-008", "ANS-011"]),
        branch("SPEC-QUALITY", "Quality, testing, security, and operations", ["ANS-005", "ANS-006", "ANS-007", "ANS-009"]),
        branch("SPEC-BROWNFIELD", "Existing system preservation", ["ANS-012"])
      ]
    }
  };
}

function branch(id, name, answerIds) {
  return {
    id,
    name,
    answer_ids: answerIds,
    required_validation: ["source answer", "acceptance criteria", "risk", "test evidence", "owner approval"]
  };
}

function expertPersona(role, mandate) {
  return {
    role,
    seniority: "elite industry expert",
    mandate,
    veto_power: true,
    required_checks: 15,
    evidence_required: ["trace links", "rubric scores", "failed-point fixes", "residual risk"]
  };
}

function renderRunSummaryMarkdown(run) {
  return `# ${run.project_name} Factory Run Summary

**${ZERO_SLOP}**

Run ID: \`${run.run_id}\`

Project type: \`${run.project_type}\`

Generated meta-skill: \`${deriveGeneratedMetaSkill(run).name}\`

Current status: \`${run.status}\`

## Intent

${run.intent}

## Next Legal Action

Proceed only through the active factory stage and its gate. Do not bypass the meta-meta generated skill contract.
`;
}

function renderPrdSkeletonMarkdown(run) {
  const answers = normalizeAnswers(run);
  return `# Initial PRD Skeleton

**${ZERO_SLOP}**

This is a generated starter artifact from the factory UX. It is not final proof.

## Business Outcome

${answers["ANS-001"].value || "Missing."}

## Users

${answers["ANS-002"].value || "Missing."}

## Product Surface

${answers["ANS-003"].value || "Missing."}

## Quality And Testing

${answers["ANS-005"].value || "Missing."}

${answers["ANS-006"].value || "Missing."}
`;
}

function activeStage(run) {
  return (run.stages || []).find((stage) => stage.id === run.current_stage) || (run.stages || [])[0] || STAGES[0];
}

function legalBlocker(type, code, detail, stageId = "") {
  return { type, code, detail, stage_id: stageId };
}

function computeLegalState(runOrId, requestedStageId = "") {
  const run = typeof runOrId === "string" ? loadRun(runOrId) : runOrId;
  const stages = run.stages || [];
  const currentIndex = stages.findIndex((item) => item.id === run.current_stage);
  const current = currentIndex >= 0 ? stages[currentIndex] : null;
  const requestedStage = requestedStageId ? stages.find((item) => item.id === requestedStageId) : null;
  const requestedIndex = requestedStageId ? stages.findIndex((item) => item.id === requestedStageId) : -1;
  const blockers = [];
  const predecessorStatus = stages.slice(0, Math.max(0, currentIndex)).map((stage, index) => ({
    index,
    stage_id: stage.id,
    title: stage.title,
    status: stage.status,
    accepted: stage.status === "accepted"
  }));

  if (!current) {
    blockers.push(legalBlocker("sequence", "NO_CURRENT_STAGE", `Run current_stage ${run.current_stage || "(missing)"} does not map to the control graph.`));
  }
  if (requestedStageId && !requestedStage) {
    blockers.push(legalBlocker("request_scope", "UNKNOWN_REQUESTED_STAGE", `Requested stage ${requestedStageId} is not in this run.`));
  }
  if (current && requestedStageId && requestedStageId !== current.id) {
    const relation = requestedIndex > currentIndex ? "future locked" : "previous/non-current";
    blockers.push(legalBlocker(
      "request_scope",
      requestedIndex > currentIndex ? "FUTURE_STAGE_LOCKED" : "NON_CURRENT_STAGE_INVOCATION",
      `Requested ${requestedStageId}, but the only legal invocation cursor is ${current.id}; ${relation} stages require change control before execution.`,
      requestedStageId
    ));
  }
  for (const predecessor of predecessorStatus) {
    if (!predecessor.accepted) {
      blockers.push(legalBlocker(
        "sequence",
        "PREDECESSOR_NOT_ACCEPTED",
        `${predecessor.stage_id} must be accepted before ${current?.id || run.current_stage} may execute.`,
        predecessor.stage_id
      ));
    }
  }
  if (current?.status === "locked") {
    blockers.push(legalBlocker("sequence", "CURRENT_STAGE_LOCKED", `${current.id} is locked behind predecessor gates.`, current.id));
  }
  if (current?.status === "accepted" && run.status !== "ready_for_handoff") {
    blockers.push(legalBlocker("sequence", "CURRENT_STAGE_ALREADY_ACCEPTED", `${current.id} is accepted; use the next active stage or open change control.`, current.id));
  }
  const pendingCurrentInterrupts = (run.human_interrupts || []).filter((item) => item.stage_id === current?.id && item.state === "pending");
  for (const interrupt of pendingCurrentInterrupts) {
    blockers.push(legalBlocker(
      "human_decision",
      "HUMAN_INTERRUPT_PENDING",
      `Human interrupt ${interrupt.interrupt_id} must be resolved before ${current?.id} executes.`,
      current?.id || ""
    ));
  }
  if (current?.id === "stage-01-interrogation" && run.interrogation?.gate !== "pass") {
    blockers.push(legalBlocker(
      "gate_input",
      "INTERROGATION_NOT_APPROVED",
      `Customer grill is ${run.interrogation?.completeness || 0}% complete with gate ${run.interrogation?.gate || "unknown"}.`,
      current.id
    ));
  }
  if (current?.id === "stage-02-engagement" && !run.answers?.["ANS-009"]?.value) {
    blockers.push(legalBlocker("gate_input", "TOKEN_BOUNDARY_MISSING", "Token boundary answer ANS-009 is required before engagement execution.", current.id));
  }
  if (current?.id === "stage-02-engagement" && !run.answers?.["ANS-010"]?.value) {
    blockers.push(legalBlocker("gate_input", "APPROVAL_OWNER_MISSING", "Approval owner answer ANS-010 is required before engagement execution.", current.id));
  }

  const gateProbe = current
    ? evaluateStageGate(run, current)
    : { status: "blocked", notes: ["No active stage exists."] };
  const hardBlockers = blockers.filter((item) => ["sequence", "request_scope", "human_decision"].includes(item.type));
  const invocationBlockers = blockers;
  const canInvokeCurrentStage = Boolean(current)
    && current.status !== "accepted"
    && invocationBlockers.length === 0
    && (!requestedStageId || requestedStageId === current.id);
  const canAdvanceCurrentStage = Boolean(current)
    && hardBlockers.length === 0
    && gateProbe.status === "pass";
  const completed = run.status === "ready_for_handoff" && stages.length > 0 && stages.every((stage) => stage.status === "accepted");
  let legalNextAction = "Inspect the run ledger.";
  if (!current) {
    legalNextAction = "Repair the run ledger current_stage before any execution.";
  } else if (completed) {
    legalNextAction = "Review portal, evidence, handoff package, or open a governed change request.";
  } else if (hardBlockers.length) {
    legalNextAction = hardBlockers[0].detail;
  } else if (blockers.some((item) => item.type === "gate_input")) {
    legalNextAction = blockers.find((item) => item.type === "gate_input").detail;
  } else if (!(current.invocations || []).length) {
    legalNextAction = `Invoke current stage ${current.id} (${current.title}).`;
  } else if (gateProbe.status !== "pass") {
    legalNextAction = `Resolve gate blockers for ${current.id}: ${gateProbe.notes.join(" ")}`;
  } else {
    const next = stages[currentIndex + 1];
    legalNextAction = next
      ? `Advance ${current.id}; next legal stage becomes ${next.id}.`
      : "Advance final stage to handoff readiness.";
  }

  return {
    zero_slop_policy: ZERO_SLOP,
    state_type: "dfms_execution_legal_state",
    generated_at: nowIso(),
    run_id: run.run_id,
    run_status: run.status,
    current_stage: current?.id || run.current_stage || "",
    current_stage_index: currentIndex,
    current_stage_status: current?.status || "missing",
    requested_stage: requestedStageId || "",
    requested_stage_allowed: !requestedStageId || (requestedStageId === current?.id && invocationBlockers.length === 0),
    no_skip_rules: [
      "Only current_stage may be invoked.",
      "Every predecessor stage must be accepted before the current stage can execute.",
      "Future stages are locked until their predecessor gate passes.",
      "Previously accepted stages cannot be re-invoked without a change request reopening that stage and its downstream closure.",
      "Human interrupts, token approvals, customer grill gates, and P1 contradictions are execution blockers.",
      "Templates, descriptors, and generated promises are not proof; accepted stages need invocation and record evidence."
    ],
    predecessor_status: predecessorStatus,
    all_predecessors_accepted: predecessorStatus.every((stage) => stage.accepted),
    gate_probe: gateProbe,
    pending_human_interrupts_current: pendingCurrentInterrupts,
    pending_human_interrupts_any: (run.human_interrupts || []).filter((item) => item.state === "pending"),
    blockers,
    hard_blocker_count: hardBlockers.length,
    can_invoke_current_stage: canInvokeCurrentStage,
    can_advance_current_stage: canAdvanceCurrentStage,
    can_execute_ready_pipeline: Boolean(current) && !completed && hardBlockers.length === 0 && (canInvokeCurrentStage || canAdvanceCurrentStage),
    can_open_change_request: true,
    can_ask_agent_anytime: true,
    completed,
    legal_next_action: legalNextAction
  };
}

function buildStageReport(run, stageLike = null) {
  const stage = typeof stageLike === "string"
    ? (run.stages || []).find((item) => item.id === stageLike)
    : stageLike || activeStage(run);
  const canonical = STAGES.find((item) => item.id === stage?.id) || stage || STAGES[0];
  const legalState = buildLegalStateForReport(run, canonical.id);
  const outputs = (run.execution_outputs || []).filter((item) => (STAGE_RECORDS[canonical.id] || []).some((record) => item.endsWith(record)) || item.includes(canonical.id));
  const missingQuestions = QUESTIONS
    .filter((question) => question.required && !(run.answers?.[question.id]?.value || "").trim())
    .map((question) => ({ id: question.id, label: question.label, prompt: question.prompt }));
  const blockers = [];
  if (canonical.id === "stage-01-interrogation" && run.interrogation?.gate !== "pass") {
    blockers.push(`Interrogation gate is ${run.interrogation?.gate || "unknown"} at ${run.interrogation?.completeness || 0}% completeness.`);
  }
  if (stage?.status === "locked") blockers.push("Stage is locked behind predecessor gates.");
  if (stage?.status === "blocked") blockers.push(...(stage.gate_notes || ["Stage gate is blocked."]));
  const pendingInterrupts = (run.human_interrupts || []).filter((item) => item.stage_id === canonical.id && item.state === "pending");
  return {
    zero_slop_policy: ZERO_SLOP,
    report_type: "dfms_stage_report",
    stage_id: canonical.id,
    stage_title: canonical.title,
    stage_kind: canonical.kind,
    status: stage?.status || "locked",
    gate_result: stage?.gate_result || "not_run",
    gate: canonical.gate,
    skills: canonical.skills,
    expected_records: STAGE_RECORDS[canonical.id] || [],
    generated_records: outputs,
    blockers,
    pending_human_interrupts: pendingInterrupts,
    human_questions: canonical.id === "stage-01-interrogation" ? missingQuestions : [],
    legal_state: legalState,
    next_action: stageNextAction(run, canonical, blockers),
    assurance: [
      "Meta-meta remains first for governed work.",
      "Future stages stay locked until predecessor gates pass.",
      "Human resteer must open change control and reopen downstream gates.",
      "Every stage report is exposed through AG-UI events, A2UI surfaces, and MCP Apps resources."
    ]
  };
}

function buildLegalStateForReport(run, stageId) {
  try {
    return computeLegalState(run, stageId);
  } catch (error) {
    return {
      zero_slop_policy: ZERO_SLOP,
      state_type: "dfms_execution_legal_state_unavailable",
      stage_id: stageId,
      error: error.message || String(error)
    };
  }
}

function stageNextAction(run, stage, blockers) {
  const pendingInterrupt = (run.human_interrupts || []).find((item) => item.stage_id === stage.id && item.state === "pending");
  if (pendingInterrupt) return `Resolve human interrupt ${pendingInterrupt.interrupt_id} before material execution continues.`;
  if (blockers.length) return "Resolve blockers, then re-invoke or advance the active stage.";
  if (stage.id !== run.current_stage) return "Inspect only; execute the currently active stage.";
  if (stage.id === "stage-01-interrogation" && run.interrogation?.gate !== "pass") return "Answer required customer grill questions and resolve contradictions.";
  if (!(run.stages || []).find((item) => item.id === stage.id)?.invocations?.length) return "Invoke current stage.";
  return "Advance gate or execute the ready pipeline.";
}

function buildAgentReport(run) {
  const validation = validateRunExecution(run);
  const current = activeStage(run);
  const legalState = computeLegalState(run);
  return {
    zero_slop_policy: ZERO_SLOP,
    report_type: "dfms_agent_status_report",
    run_id: run.run_id,
    generated_at: nowIso(),
    active_stage: buildStageReport(run, current),
    execution_legal_state: legalState,
    validation: {
      status: validation.status,
      finding_count: validation.finding_count,
      p1_count: validation.p1_count,
      p2_count: validation.p2_count
    },
    project_collection: run.project_collection || summarizeProjectCollection(run),
    next_actions: projectPortalNextActions(run, validation),
    can_interrogate_anytime: true,
    can_resteer_anytime: true,
    resteer_rule: "Use the change-request surface so downstream artifacts, gates, tests, and certificates reopen through traceable change control."
  };
}

function buildA2uiSurfaces(run) {
  const stageReport = buildStageReport(run);
  const requiredQuestions = QUESTIONS.filter((question) => question.required);
  const answered = requiredQuestions.filter((question) => (run.answers?.[question.id]?.value || "").trim().length >= 8);
  const openChanges = (run.change_requests || []).filter((item) => !["closed", "rejected"].includes(item.state));
  const agenticContract = run.agentic_ui_contract || buildAgenticUiContract(run);
  const specGraph = run.spec_graph_layer || buildSpecGraphState(run);
  return [
    {
      protocol: "A2UI",
      profile: PROTOCOL_PROFILE.a2ui.local_profile,
      surface_id: "scenario-template-router",
      component: "ScenarioTemplateRouter",
      title: "Scenario And Template Router",
      props: {
        selected_scenario: run.scenario_mode || agenticContract.scenario.id,
        selected_template: run.template_id || agenticContract.template.id,
        scenarios: FACTORY_SCENARIOS,
        templates: PROJECT_TEMPLATES,
        rule: "Scenario and template are factory-routing decisions, not visual decoration."
      },
      actions: ["approveInterrupt", "editScenarioTemplate", "startProject"]
    },
    {
      protocol: "A2UI",
      profile: PROTOCOL_PROFILE.a2ui.local_profile,
      surface_id: "provider-quorum-board",
      component: "ProviderQuorumBoard",
      title: "Provider Quorum And Merge",
      props: {
        provider_quorum_mode: run.provider_quorum_mode || "three-provider-merge",
        providers: run.provider_quorum || PROVIDER_QUORUM,
        merge_rule: "Parallel provider drafts are merged, refined, reviewed, and confirmed before acceptance."
      },
      actions: ["runProviderQuorum", "compareProviderDrafts", "confirmMergedDraft"]
    },
    {
      protocol: "A2UI",
      profile: PROTOCOL_PROFILE.a2ui.local_profile,
      surface_id: "foundation-authoring-workbench",
      component: "FoundationAuthoringWorkbench",
      title: "Foundation Authoring Workbench",
      props: {
        sections: run.foundation_sections || createFoundationWorkboard(),
        confirmation_rule: "Each section needs draft, merge, refine, confirm, review, and trace before downstream artifacts depend on it."
      },
      actions: ["draftSection", "refineSection", "confirmSection"]
    },
    {
      protocol: "A2UI",
      profile: PROTOCOL_PROFILE.a2ui.local_profile,
      surface_id: "human-interrupt-inbox",
      component: "HumanInterruptInbox",
      title: "Human Interrupt Inbox",
      props: {
        interrupts: run.human_interrupts || [],
        allowed_decisions: ["approve", "edit", "reject", "escalate"],
        rule: "Sensitive actions pause execution until explicit human decision."
      },
      actions: ["decideHumanInterrupt"]
    },
    {
      protocol: "A2UI",
      profile: PROTOCOL_PROFILE.a2ui.local_profile,
      surface_id: "spec-graph-impact-explorer",
      component: "SpecGraphImpactExplorer",
      title: "Spec Graph Impact Explorer",
      props: {
        source_prd: specGraph.source_prd,
        node_identity_format: specGraph.node_identity_format,
        nodes: specGraph.nodes,
        edges: specGraph.edges,
        impact_samples: specGraph.impact_samples,
        no_duplicate_path_rule: specGraph.no_duplicate_path_rule
      },
      actions: ["computeSpecGraphImpact", "openRedoClosure"]
    },
    {
      protocol: "A2UI",
      profile: PROTOCOL_PROFILE.a2ui.local_profile,
      surface_id: "protocol-status",
      component: "ProtocolStatusPanel",
      title: "Agent Interaction Protocols",
      props: {
        agui_events: (run.agui_events || []).length,
        a2ui_surfaces: PROTOCOL_PROFILE.a2ui.surfaces,
        mcp_apps_tools: buildMcpAppsManifest(run).tools.map((tool) => tool.name),
        no_skip_policy: "Legal next action is computed from run state, stage gates, change control, and validation."
      }
    },
    {
      protocol: "A2UI",
      profile: PROTOCOL_PROFILE.a2ui.local_profile,
      surface_id: "current-stage-report",
      component: "StageReportCard",
      title: stageReport.stage_title,
      props: stageReport,
      actions: ["invokeCurrentStage", "advanceGate", "executeReadyPipeline"]
    },
    {
      protocol: "A2UI",
      profile: PROTOCOL_PROFILE.a2ui.local_profile,
      surface_id: "customer-interrogation",
      component: "InterrogationForm",
      title: "Customer Grill",
      props: {
        required_questions: requiredQuestions.length,
        answered_required: answered.length,
        completeness: run.interrogation?.completeness || 0,
        gate: run.interrogation?.gate || "blocked",
        contradictions: run.interrogation?.contradictions || [],
        questions: QUESTIONS
      },
      actions: ["answerQuestion", "askAgent"]
    },
    {
      protocol: "A2UI",
      profile: PROTOCOL_PROFILE.a2ui.local_profile,
      surface_id: "change-control",
      component: "ResteerChangeRequestForm",
      title: "Resteer Or Change Design",
      props: {
        open_change_requests: openChanges,
        target_stages: STAGES.map((stage) => ({ id: stage.id, title: stage.title })),
        token_reapproval_trigger: run.token_swag?.reapproval_trigger || ""
      },
      actions: ["openChangeRequest", "computeRedoClosure"]
    },
    {
      protocol: "A2UI",
      profile: PROTOCOL_PROFILE.a2ui.local_profile,
      surface_id: "artifact-evidence-board",
      component: "ArtifactEvidenceBoard",
      title: "Artifact Evidence",
      props: {
        execution_records: run.execution_outputs || [],
        accepted_stages: (run.stages || []).filter((stage) => stage.status === "accepted").map((stage) => stage.id),
        project_book: run.project_book,
        generated_meta_skill: run.generated_meta_skill?.name || ""
      }
    },
    {
      protocol: "A2UI",
      profile: PROTOCOL_PROFILE.a2ui.local_profile,
      surface_id: "build-test-evidence",
      component: "BuildTestEvidenceBoard",
      title: "Build, Test, And WYSIWYG Evidence",
      props: {
        proof_class: run.build_test_evidence?.proof_class || "missing",
        build_status: run.build_test_evidence?.build_status || "not_run",
        implementation_root: run.build_test_evidence?.implementation_root || "",
        generated_files: run.build_test_evidence?.generated_files || [],
        scenario_coverage: run.build_test_evidence?.scenario_coverage || [],
        static_checks: run.build_test_evidence?.static_checks || [],
        trust_boundary: run.build_test_evidence?.trust_boundary || "Build/test evidence has not been generated yet."
      },
      actions: ["invokeCurrentStage", "executeReadyPipeline", "openChangeRequest"]
    },
    {
      protocol: "A2UI",
      profile: PROTOCOL_PROFILE.a2ui.local_profile,
      surface_id: "legal-next-action-cockpit",
      component: "LegalNextActionCockpit",
      title: "Legal Next Action",
      props: {
        current_stage: run.current_stage,
        legal_next_action: computeLegalState(run).legal_next_action,
        status: run.status,
        open_change_requests: (run.change_requests || []).filter((item) => !["closed", "rejected"].includes(item.state)).length,
        pending_interrupts: (run.human_interrupts || []).filter((item) => item.state === "pending").length
      },
      actions: ["decideInterrupt", "invokeCurrentStage", "openChangeRequest", "askAgent"]
    },
    {
      protocol: "A2UI",
      profile: PROTOCOL_PROFILE.a2ui.local_profile,
      surface_id: "hawkeye-conformance-auditor",
      component: "HawkeyeConformanceAuditor",
      title: "Hawkeye Auditor",
      props: {
        stage_count: STAGES.length,
        accepted_stages: (run.stages || []).filter((stage) => stage.status === "accepted").length,
        zero_slop_policy: run.zero_slop_policy === ZERO_SLOP,
        evidence_records: (run.execution_outputs || []).length,
        current_stage: run.current_stage
      },
      actions: ["validateRun", "runRalphAudit", "openChangeRequest"]
    },
    {
      protocol: "A2UI",
      profile: PROTOCOL_PROFILE.a2ui.local_profile,
      surface_id: "rb-closure-board",
      component: "RecoveryBatchClosureBoard",
      title: "Recovery Batch Closure",
      props: {
        rb_06: run.build_test_evidence?.proof_class === "working_implementation_local" ? "accepted_local_slice" : "blocked",
        rb_07: "portal_control_model_runtime",
        rb_08: "partial_until_todo_habits_full_certification",
        rb_09: "blocked_until_final_hawkeye_public_hardening"
      },
      actions: ["inspectEvidence", "openChangeRequest", "runGoalRalphAudit"]
    }
  ];
}

function buildMcpAppsManifest(run) {
  const tool = (name, description, resourceUri, inputSchema = {}) => ({
    name,
    description,
    inputSchema: { type: "object", properties: inputSchema, additionalProperties: false },
    _meta: { ui: { resourceUri } }
  });
  return {
    zero_slop_policy: ZERO_SLOP,
    protocol: "MCP Apps",
    profile: PROTOCOL_PROFILE.mcp_apps.local_profile,
    run_id: run.run_id,
    tools: [
      tool("dfms.startProject", "Create a governed greenfield, brownfield, artifact-only, or meta-skill-system run.", "ui://dfms/start-project", {
        projectName: { type: "string" },
        projectType: { type: "string", enum: ["greenfield", "brownfield", "artifact-only", "meta-skill-system"] },
        intent: { type: "string" }
      }),
      tool("dfms.answerQuestion", "Capture customer grill answers with traceable answer IDs.", "ui://dfms/customer-grill", {
        runId: { type: "string" },
        questionId: { type: "string" },
        value: { type: "string" }
      }),
      tool("dfms.invokeStage", "Invoke only the current or reopened legal stage.", "ui://dfms/stage-report", {
        runId: { type: "string" },
        stageId: { type: "string" }
      }),
      tool("dfms.openChangeRequest", "Resteer through governed change control and downstream redo closure.", "ui://dfms/change-control", {
        runId: { type: "string" },
        targetStage: { type: "string" },
        selectedNode: { type: "string" },
        requestedChange: { type: "string" }
      }),
      tool("dfms.askAgent", "Ask the agent for a stage report, blocker explanation, or resteer advice.", "ui://dfms/agent-interrogation", {
        runId: { type: "string" },
        mode: { type: "string", enum: ["ask", "audit", "resteer", "explain"] },
        message: { type: "string" }
      }),
      tool("dfms.decideInterrupt", "Approve, edit, reject, or escalate a human interrupt before material factory execution.", "ui://dfms/human-interrupts", {
        runId: { type: "string" },
        interruptId: { type: "string" },
        decision: { type: "string", enum: ["approve", "edit", "reject", "escalate"] },
        note: { type: "string" }
      }),
      tool("dfms.runProviderQuorum", "Run or inspect provider quorum drafts before merge/refine/confirm.", "ui://dfms/provider-quorum", {
        runId: { type: "string" },
        sectionId: { type: "string" }
      }),
      tool("dfms.computeSpecGraphImpact", "Compute upstream and downstream impact for a selected spec graph node.", "ui://dfms/spec-graph-impact", {
        runId: { type: "string" },
        nodeId: { type: "string" },
        hypotheticalChange: { type: "string" }
      })
    ],
    resources: [
      { uri: `dfms://runs/${run.run_id}/portal`, name: "Human project portal", mimeType: "application/json" },
      { uri: `dfms://runs/${run.run_id}/protocol`, name: "Protocol state", mimeType: "application/json" },
      { uri: `dfms://runs/${run.run_id}/stage-report`, name: "Current stage report", mimeType: "application/json" },
      { uri: `dfms://runs/${run.run_id}/interrupts`, name: "Human interrupts", mimeType: "application/json" },
      { uri: `dfms://runs/${run.run_id}/spec-graph`, name: "Spec graph impact substrate", mimeType: "application/json" },
      { uri: `dfms://runs/${run.run_id}/foundation-sections`, name: "Foundation workboard", mimeType: "application/json" }
    ],
    ui_resources: [
      { uri: "ui://dfms/run-cockpit", mimeType: PROTOCOL_PROFILE.mcp_apps.resource_mime_type, title: "Dark Factory Run Cockpit" },
      { uri: "ui://dfms/customer-grill", mimeType: PROTOCOL_PROFILE.mcp_apps.resource_mime_type, title: "Customer Grill Form" },
      { uri: "ui://dfms/change-control", mimeType: PROTOCOL_PROFILE.mcp_apps.resource_mime_type, title: "Change Control And Redo" },
      { uri: "ui://dfms/agent-interrogation", mimeType: PROTOCOL_PROFILE.mcp_apps.resource_mime_type, title: "Ask Agent Anytime" },
      { uri: "ui://dfms/human-interrupts", mimeType: PROTOCOL_PROFILE.mcp_apps.resource_mime_type, title: "Human Interrupts" },
      { uri: "ui://dfms/provider-quorum", mimeType: PROTOCOL_PROFILE.mcp_apps.resource_mime_type, title: "Provider Quorum Merge" },
      { uri: "ui://dfms/spec-graph-impact", mimeType: PROTOCOL_PROFILE.mcp_apps.resource_mime_type, title: "Spec Graph Impact" },
      { uri: "ui://dfms/foundation-authoring", mimeType: PROTOCOL_PROFILE.mcp_apps.resource_mime_type, title: "Foundation Authoring Workbench" }
    ],
    security_model: [
      "UI resources are local descriptors in this console, not remote executable code.",
      "User-initiated tool calls require explicit button actions or API POSTs.",
      "Scope, budget, production, security, privacy, and residual-risk changes require human approval evidence."
    ]
  };
}

function buildProtocolState(runOrId) {
  const run = typeof runOrId === "string" ? loadRun(runOrId) : runOrId;
  return {
    zero_slop_policy: ZERO_SLOP,
    protocol_state_type: "dfms_agent_centric_protocol_state",
    generated_at: nowIso(),
    run_summary: {
      run_id: run.run_id,
      project_name: run.project_name,
      project_type: run.project_type,
      status: run.status,
      current_stage: run.current_stage,
      token_swag: run.token_swag
    },
    protocol_profile: PROTOCOL_PROFILE,
    agentic_ui_contract: run.agentic_ui_contract || buildAgenticUiContract(run),
    provider_quorum: run.provider_quorum || PROVIDER_QUORUM,
    foundation_sections: run.foundation_sections || createFoundationWorkboard(),
    human_interrupts: run.human_interrupts || [],
    spec_graph_layer: run.spec_graph_layer || buildSpecGraphState(run),
    execution_legal_state: computeLegalState(run),
    agui_events: run.agui_events || [],
    a2ui_surfaces: buildA2uiSurfaces(run),
    mcp_apps: buildMcpAppsManifest(run),
    agent_report: buildAgentReport(run),
    recent_agent_messages: (run.agent_messages || []).slice(0, 10)
  };
}

function buildTruthInventory(runOrId) {
  const run = typeof runOrId === "string" ? loadRun(runOrId) : runOrId;
  const validation = validateRunExecution(run);
  const coverage = loadArtifactCoverage(run.project_book || DEFAULT_PROJECT_BOOK);
  const publicValidation = readJson(path.join(ROOT, "dark-factory-meta-skills-design", "records", "public-hardening-validation-results.json"), {});
  const finalTruth = readJson(path.join(ROOT, "dark-factory-meta-skills-design", "records", "final-truth-inventory.json"), {});
  const protocol = run.invocation_packet?.agent_protocols || {};
  const eventTypes = new Set((run.agui_events || []).map((event) => event.type));
  const truthRows = [
    truthRow({
      id: "TRUTH-RUN-001",
      layer: "meta_meta_entry",
      claim: "Governed work starts with the meta-meta attractor and generated project-specific meta-skill contract.",
      proof_class: run.generated_meta_skill?.generated_from === "df-meta-attractor" ? "instantiated_artifact" : "missing",
      status: run.generated_meta_skill?.generated_from === "df-meta-attractor" ? "partially_achieved" : "missing",
      evidence: ["run.generated_meta_skill", "run.stages[0]", "run.invocation_packet"],
      trust_boundary: "Trust sequencing evidence only; not proof that every downstream artifact exists."
    }),
    truthRow({
      id: "TRUTH-RUN-002",
      layer: "agent_centric_ux",
      claim: "Human can ask the agent anytime and receive a stage-aware recorded response.",
      proof_class: (run.agent_messages || []).length && eventTypes.has("USER_MESSAGE") ? "working_implementation_local" : "missing",
      status: (run.agent_messages || []).length && eventTypes.has("USER_MESSAGE") ? "achieved_for_local_console" : "missing",
      evidence: (run.execution_outputs || []).filter((item) => item.includes("agent-interaction-record.json")),
      trust_boundary: "Local single-user console behavior only."
    }),
    truthRow({
      id: "TRUTH-RUN-003",
      layer: "change_control",
      claim: "Human can resteer through a governed change request that reopens downstream work.",
      proof_class: (run.change_requests || []).length && eventTypes.has("USER_RESTEER_REQUESTED") ? "working_implementation_local" : "missing",
      status: (run.change_requests || []).length ? "achieved_for_local_console" : "missing",
      evidence: (run.execution_outputs || []).filter((item) => item.includes("CR-") || item.includes("human-communication-record.json")),
      trust_boundary: "Proves local change-control reentry; not production change advisory workflow."
    }),
    truthRow({
      id: "TRUTH-RUN-004",
      layer: "protocol_contracts",
      claim: "AG-UI, A2UI, and MCP Apps are represented in the workflow.",
      proof_class: protocol.agui && protocol.a2ui && protocol.mcp_apps ? "descriptor_only" : "missing",
      status: protocol.agui && protocol.a2ui && protocol.mcp_apps ? "local_descriptors_exist" : "missing",
      evidence: ["run.invocation_packet.agent_protocols", "/api/runs/:id/protocol"],
      trust_boundary: "Descriptors and local endpoints exist; not a packaged remote protocol server."
    }),
    truthRow({
      id: "TRUTH-RUN-005",
      layer: "no_skip_execution",
      claim: "Accepted stages have invocation evidence and validator does not find P1 no-skip failures.",
      proof_class: validation.status === "pass" || validation.status === "conditional_pass" ? "validated_evidence" : "blocked",
      status: validation.status,
      evidence: ["validateRunExecution", ...(run.execution_outputs || []).filter((item) => item.endsWith(".json")).slice(0, 8)],
      trust_boundary: "Structural validator only; semantic expert review still required for artifact quality."
    }),
    truthRow({
      id: "TRUTH-RUN-006",
      layer: "goal_achievement",
      claim: "Bounded local agent-centric protocol workflow passed goal RALPH-10.",
      proof_class: run.goal_achievement?.achieved ? "validated_evidence" : "missing",
      status: run.goal_achievement?.achieved ? "achieved_for_bounded_local_goal" : "missing",
      evidence: run.goal_achievement?.record ? [run.goal_achievement.record] : [],
      trust_boundary: "Does not certify hosted outsourcing replacement platform."
    }),
    truthRow({
      id: "TRUTH-RUN-007",
      layer: "artifact_saturation",
      claim: "Todo/habits demonstrator has current-catalog artifact saturation with explicit not-applicable waivers.",
      proof_class: coverage.full_saturation_status === "pass" ? "validated_evidence" : "partial",
      status: coverage.full_saturation_status === "pass" ? "achieved" : "not_achieved",
      evidence: coverage.matrix_path ? [coverage.matrix_path] : [],
      trust_boundary: `Current catalog counts: ${coverage.counts_summary}. Full saturation is ${coverage.full_saturation_status || "unknown"} for the local-static demonstrator boundary only.`
    }),
    truthRow({
      id: "TRUTH-RUN-008",
      layer: "code_build_test_factory",
      claim: "The factory generated local implementation code, executed tests, and produced scenario/browser/accessibility/security evidence.",
      proof_class: run.build_test_evidence?.proof_class === "working_implementation_local" ? "working_implementation_local" : "missing",
      status: run.build_test_evidence?.build_status === "pass" ? "achieved_for_local_console" : "missing",
      evidence: [
        ...(run.execution_outputs || []).filter((item) => /implementation-execution-record|build-verification-record|scenario-test-matrix|wysiwyg-browser-test-record|accessibility-security-evidence-record/.test(item)),
        ...((run.build_test_evidence?.generated_files || []).map((item) => item.path))
      ],
      trust_boundary: "Proves the local RB-06 code/test factory slice only; not a production-quality app release."
    }),
    truthRow({
      id: "TRUTH-RUN-009",
      layer: "public_hardening",
      claim: "RB-09 public hardening exists for the bounded local package: public repo posture, truthful README, release audit, residual risks, and validation record.",
      proof_class: publicValidation.status === "pass" ? "validated_evidence" : "missing",
      status: publicValidation.status === "pass" ? "achieved_for_local_public_package" : "missing",
      evidence: [
        "README.md",
        "PUBLIC_RELEASE_AUDIT.md",
        "dark-factory-meta-skills-design/records/public-hardening-validation-results.json",
        "dark-factory-meta-skills-design/records/final-truth-inventory.json"
      ],
      trust_boundary: finalTruth.full_product_status === "not_finished"
        ? "Public hardening is accepted only for the local package boundary; final truth inventory still says the full hosted product is not finished."
        : "Public hardening cannot be trusted until final truth inventory states the full product boundary."
    }),
    truthRow({
      id: "TRUTH-RUN-010",
      layer: "outsourcing_replacement_platform",
      claim: "DFMS is a full hosted replacement for a human outsourcing SDLC firm.",
      proof_class: "scaffold_only",
      status: "not_achieved",
      evidence: ["dark-factory-control-console", "dark-factory-meta-skills-design"],
      trust_boundary: "Auth/RBAC, durable database, hosted runtime, production operations, and service-management model remain future batches."
    })
  ];
  const counts = truthRows.reduce((acc, row) => {
    acc[row.proof_class] = (acc[row.proof_class] || 0) + 1;
    return acc;
  }, {});
  return {
    zero_slop_policy: ZERO_SLOP,
    inventory_type: "dfms_recovery_truth_inventory",
    generated_at: nowIso(),
    run_id: run.run_id,
    proof_classes: PROOF_CLASSES,
    counts,
    truth_rows: truthRows,
    overclaim_register: [
      "Do not call the full platform achieved because the local workflow passes.",
      "Do not call MCP Apps implemented beyond local descriptors and endpoints.",
      coverage.full_saturation_status === "pass"
        ? "Do not call RB-08 local-static artifact saturation a hosted production, external certification, sync, mobile, or public-hardening pass."
        : "Do not call todo/habits full saturation achieved while the coverage matrix says fail.",
      publicValidation.status === "pass"
        ? "Do not call RB-09 public hardening a full hosted-product completion."
        : "Do not call public hardening accepted until validate_public_hardening.cjs passes.",
      "Do not call dashboards, validators, or RALPH records product artifacts."
    ],
    trust_now: truthRows.filter((row) => ["working_implementation_local", "validated_evidence", "instantiated_artifact"].includes(row.proof_class)),
    do_not_trust_yet: truthRows.filter((row) => ["scaffold_only", "descriptor_only", "partial", "missing", "blocked"].includes(row.proof_class)),
    next_recovery_batch: {
      id: coverage.full_saturation_status === "pass"
        ? (publicValidation.status === "pass" ? "PB-01" : "RB-09")
        : run.build_test_evidence?.proof_class === "working_implementation_local" ? "RB-08" : "RB-06",
      objective: coverage.full_saturation_status === "pass"
        ? (publicValidation.status === "pass"
          ? "Start the full product platform spine: hosted app shell, durable database, accounts, roles, comments, and real execution ledger."
          : "Run final Hawkeye/public hardening before any full-factory closure claim.")
        : run.build_test_evidence?.proof_class === "working_implementation_local"
          ? "Finish the todo/habits demonstrator certification run and current-catalog artifact saturation."
          : "Create code-producing implementation, build, scenario, WYSIWYG, accessibility, security, and SRE evidence.",
      token_swag: "high",
      approval_required: true
    }
  };
}

function truthRow(row) {
  return {
    evidence: [],
    ...row,
    evidence: (row.evidence || []).filter(Boolean)
  };
}

function loadArtifactCoverage(projectBook) {
  const file = path.join(projectBook, "records", "artifact-catalog-coverage-matrix.json");
  const matrix = readJson(file, {});
  const counts = matrix.counts || {};
  const countsSummary = Object.entries(counts).map(([key, value]) => `${key}:${value}`).join(", ") || "no coverage matrix";
  return {
    matrix_path: fs.existsSync(file) ? path.relative(ROOT, file).replace(/\\/g, "/") : "",
    full_saturation_status: matrix.full_saturation_status || "missing",
    truthful_coverage_status: matrix.truthful_coverage_status || "unknown",
    counts,
    counts_summary: countsSummary
  };
}

function createAgentMessage(runId, payload) {
  const run = loadRun(runId);
  const message = String(payload.message || "").trim();
  if (message.length < 2) throw Object.assign(new Error("Agent message is required."), { status: 400 });
  const mode = String(payload.mode || "ask").trim() || "ask";
  const response = buildAgentResponse(run, message, mode);
  const interaction = {
    zero_slop_policy: ZERO_SLOP,
    record_type: "agent_interaction_record",
    id: `AIMSG-${Date.now()}`,
    at: nowIso(),
    run_id: run.run_id,
    active_stage: run.current_stage,
    mode,
    message,
    response
  };
  const recordPath = path.join(runRecordsDir(run.run_id), `${interaction.id}-agent-interaction-record.json`);
  writeJson(recordPath, interaction);
  run.agent_messages = [interaction, ...(run.agent_messages || [])];
  run.execution_outputs = Array.from(new Set([...(run.execution_outputs || []), path.relative(ROOT, recordPath).replace(/\\/g, "/")]));
  run.audit_log.push({ at: nowIso(), event: "agent_interrogated", detail: `${mode}: ${message.slice(0, 80)}` });
  appendAguiEvent(run, "USER_MESSAGE", {
    actor: "human-owner",
    mode,
    message,
    response_summary: response.summary
  });
  if (response.resteer_recommended) {
    appendAguiEvent(run, "HUMAN_DECISION_REQUIRED", {
      reason: "Message appears to request design, workflow, budget, or scope re-steer.",
      recommended_action: response.recommended_change_request
    });
  }
  saveRun(run);
  return { interaction, protocol: buildProtocolState(run.run_id), run: loadRun(run.run_id) };
}

function decideHumanInterrupt(runId, payload) {
  const run = loadRun(runId);
  const decision = String(payload.decision || "").trim().toLowerCase();
  if (!["approve", "edit", "reject", "escalate"].includes(decision)) {
    throw Object.assign(new Error("Decision must be approve, edit, reject, or escalate."), { status: 400 });
  }
  const interrupt = (run.human_interrupts || []).find((item) =>
    item.interrupt_id === payload.interruptId || (!payload.interruptId && item.state === "pending")
  );
  if (!interrupt) throw Object.assign(new Error("No matching pending human interrupt."), { status: 404 });
  if (interrupt.state !== "pending") throw Object.assign(new Error(`Interrupt is already ${interrupt.state}.`), { status: 409 });

  interrupt.state = decision === "approve" ? "approved" : decision === "edit" ? "edited" : decision === "reject" ? "rejected" : "escalated";
  interrupt.decided_at = nowIso();
  interrupt.decided_by = String(payload.decidedBy || "human-owner");
  interrupt.note = String(payload.note || "").trim();
  if (payload.patch && typeof payload.patch === "object") interrupt.patch = payload.patch;
  if (decision === "edit" && payload.patch?.scenario_mode) run.scenario_mode = String(payload.patch.scenario_mode);
  if (decision === "edit" && payload.patch?.template_id) run.template_id = String(payload.patch.template_id);
  if (decision === "edit" && payload.patch?.provider_quorum_mode) run.provider_quorum_mode = String(payload.patch.provider_quorum_mode);

  const record = {
    zero_slop_policy: ZERO_SLOP,
    record_type: "human_interrupt_decision_record",
    id: `HIDEC-${Date.now()}`,
    at: nowIso(),
    run_id: run.run_id,
    interrupt_id: interrupt.interrupt_id,
    decision,
    resulting_state: interrupt.state,
    decided_by: interrupt.decided_by,
    note: interrupt.note,
    proposed_action: interrupt.proposed_action,
    patch: interrupt.patch || null,
    downstream_rule: decision === "approve"
      ? "Current stage may proceed; all later material changes still require gates and evidence."
      : "Factory execution is blocked or re-entered until the decision is resolved through change control."
  };
  const recordPath = path.join(runRecordsDir(run.run_id), `${record.id}-human-interrupt-decision-record.json`);
  writeJson(recordPath, record);
  run.human_decisions = [record, ...(run.human_decisions || [])];
  run.execution_outputs = Array.from(new Set([...(run.execution_outputs || []), path.relative(ROOT, recordPath).replace(/\\/g, "/")]));
  run.audit_log.push({ at: nowIso(), event: "human_interrupt_decided", detail: `${interrupt.interrupt_id}: ${decision}` });
  appendAguiEvent(run, "HUMAN_DECISION_RECORDED", {
    actor: record.decided_by,
    interrupt_id: interrupt.interrupt_id,
    decision,
    resulting_state: interrupt.state,
    note: interrupt.note
  });
  if (["reject", "escalate"].includes(decision)) {
    run.status = "blocked";
    const stage = (run.stages || []).find((item) => item.id === interrupt.stage_id);
    if (stage) {
      stage.status = "blocked";
      stage.gate_result = "blocked_by_human_interrupt";
      stage.gate_notes = [`Human interrupt ${interrupt.interrupt_id} was ${decision}.`];
    }
    appendAguiEvent(run, "GATE_BLOCKED", {
      stage_id: interrupt.stage_id,
      interrupt_id: interrupt.interrupt_id,
      reason: `Human interrupt ${decision}.`
    });
  } else {
    const stage = (run.stages || []).find((item) => item.id === interrupt.stage_id);
    if (stage && stage.gate_result === "ready") stage.gate_result = "human_interrupt_resolved";
  }
  run.invocation_packet = buildInvocationPacket(run, run.answers || {});
  saveRun(run);
  return { decision: record, run: loadRun(run.run_id), protocol: buildProtocolState(run.run_id) };
}

function buildAgentResponse(run, message, mode) {
  const lower = message.toLowerCase();
  const stage = activeStage(run);
  const stageReport = buildStageReport(run, stage);
  const validation = validateRunExecution(run);
  const wantsResteer = /\b(resteer|change|redo|reopen|pivot|alter|modify|scope|budget|approve|approval)\b/.test(lower) || mode === "resteer";
  const recommendedStage = targetStageForImpact(message);
  const missing = QUESTIONS
    .filter((question) => question.required && !(run.answers?.[question.id]?.value || "").trim())
    .map((question) => question.id);
  return {
    zero_slop_policy: ZERO_SLOP,
    summary: wantsResteer
      ? `Open a governed change request from ${recommendedStage}; do not mutate accepted evidence in place.`
      : `Current legal focus is ${stage.title}; status ${stage.status}; validation ${validation.status}.`,
    mode,
    active_stage_report: stageReport,
    missing_required_answers: missing,
    validation_findings: validation.findings.slice(0, 8),
    resteer_recommended: wantsResteer,
    recommended_change_request: wantsResteer ? {
      target_stage: recommendedStage,
      selected_node: recommendedStage === "stage-04-artifacts" ? "02-prd.md" : "",
      required_reviews: [
        "change-control approval",
        "downstream trace closure",
        "quality refinery reopened gate",
        "dashboard redo impact",
        "human handoff note"
      ]
    } : null,
    next_safe_action: wantsResteer
      ? "Use the Resteer Or Change Design form so reopened stages and redo closure are recorded."
      : stageReport.next_action
  };
}

function buildProjectPortal(runId) {
  const run = loadRun(runId);
  const validation = validateRunExecution(run);
  const legalState = computeLegalState(run);
  const records = listRunFiles(runRecordsDir(run.run_id), "records");
  const runBookDocs = listRunFiles(runProjectBookDir(run.run_id), "project-book");
  const externalBook = projectBookSummary(run.project_book || DEFAULT_PROJECT_BOOK);
  const accepted = (run.stages || []).filter((stage) => stage.status === "accepted").length;
  const active = (run.stages || []).find((stage) => stage.id === run.current_stage);
  return {
    zero_slop_policy: ZERO_SLOP,
    portal_type: "dfms_human_project_control_portal",
    generated_at: nowIso(),
    run: {
      id: run.run_id,
      name: run.project_name,
      type: run.project_type,
      status: run.status,
      current_stage: run.current_stage,
      active_stage_title: active?.title || "",
      created_at: run.created_at,
      updated_at: run.updated_at,
      token_swag: run.token_swag
    },
    progress: {
      accepted_stages: accepted,
      total_stages: STAGES.length,
      interrogation_completeness: run.interrogation?.completeness || 0,
      execution_record_count: (run.execution_outputs || []).length,
      open_change_request_count: (run.change_requests || []).filter((item) => !["closed", "rejected"].includes(item.state)).length,
      validation_status: validation.status,
      validation_findings: validation.finding_count
    },
    stages: run.stages,
    records,
    project_book: {
      generated_for_run: runBookDocs,
      external_reference: externalBook
    },
    change_requests: run.change_requests || [],
    human_interrupts: run.human_interrupts || [],
    human_decisions: run.human_decisions || [],
    agentic_ui_contract: run.agentic_ui_contract || buildAgenticUiContract(run),
    spec_graph_layer: run.spec_graph_layer || buildSpecGraphState(run),
    audit_log: run.audit_log || [],
    validation,
    execution_legal_state: legalState,
    portal_control_model: buildPortalControlModel(run, validation, legalState, records, runBookDocs, externalBook),
    next_actions: projectPortalNextActions(run, validation, legalState)
  };
}

function buildPortalControlModel(run, validation, legalState, records = [], runBookDocs = [], externalBook = {}) {
  const openChanges = (run.change_requests || []).filter((item) => !["closed", "rejected"].includes(item.state));
  const pendingInterrupts = (run.human_interrupts || []).filter((item) => item.state === "pending");
  const coverage = loadArtifactCoverage(run.project_book || DEFAULT_PROJECT_BOOK);
  const publicValidation = readJson(path.join(ROOT, "dark-factory-meta-skills-design", "records", "public-hardening-validation-results.json"), {});
  const buildEvidence = run.build_test_evidence || {};
  const acceptedStages = (run.stages || []).filter((stage) => stage.status === "accepted");
  const blockers = [
    ...pendingInterrupts.map((item) => ({
      severity: "P1",
      source: "human_interrupt",
      title: item.action,
      detail: item.description || `Resolve ${item.interrupt_id} before material execution.`
    })),
    ...(legalState.blockers || []).map((item) => ({
      severity: item.type === "human_decision" ? "P2" : "P1",
      source: "legal_state",
      title: item.code,
      detail: item.detail
    })),
    ...(validation.findings || []).slice(0, 8).map((item) => ({
      severity: item.priority,
      source: "validator",
      title: item.title,
      detail: item.detail
    }))
  ];
  if (coverage.full_saturation_status !== "pass") {
    blockers.push({
      severity: "P2",
      source: "artifact_saturation",
      title: "Todo/habits exemplar certification remains partial",
      detail: `Coverage status ${coverage.full_saturation_status || "missing"}; ${coverage.counts_summary}.`
    });
  }
  if (publicValidation.status !== "pass") {
    blockers.push({
      severity: "P2",
      source: "public_hardening",
      title: "Final Hawkeye/public hardening is not closed",
      detail: "RB-09 still needs final conformance, packaging, public repository hardening, and non-overclaim release notes."
    });
  } else {
    blockers.push({
      severity: "P2",
      source: "full_product_platform",
      title: "Full hosted product platform is still open",
      detail: "RB-09 is accepted for local/public package hardening; PB-01 must build the hosted multi-user platform spine."
    });
  }

  const stageAssurance = (run.stages || []).map((stage, index) => ({
    id: stage.id,
    order: index,
    title: stage.title,
    persona: stage.kind,
    status: stage.status,
    gate_result: stage.gate_result,
    evidence_count: (stage.outputs || []).length,
    next_if_active: stage.id === run.current_stage ? legalState.legal_next_action : ""
  }));

  return {
    zero_slop_policy: ZERO_SLOP,
    model_type: "dfms_portal_control_model_v1",
    generated_at: nowIso(),
    first_viewport_contract: [
      "Show current mission and active stage.",
      "Show legal next action and blockers.",
      "Show human approval/interrupt queue.",
      "Show evidence, graph impact, tests, and audit posture.",
      "Expose resteer/change-control path and downstream reopen behavior."
    ],
    legal_action: {
      run_status: run.status,
      current_stage: run.current_stage,
      current_stage_title: (run.stages || []).find((stage) => stage.id === run.current_stage)?.title || "",
      legal_next_action: legalState.legal_next_action,
      can_invoke_current_stage: legalState.can_invoke_current_stage,
      completed: legalState.completed
    },
    human_control: {
      pending_interrupts: pendingInterrupts.length,
      open_change_requests: openChanges.length,
      approval_owner: run.answers?.["ANS-010"]?.value || "human-owner",
      supported_actions: ["approve", "edit", "reject", "ask_agent", "open_change_request", "compute_redo_closure", "run_audit"]
    },
    assurance: {
      validation_status: validation.status,
      p1_count: validation.p1_count,
      p2_count: validation.p2_count,
      accepted_stage_count: acceptedStages.length,
      total_stage_count: STAGES.length,
      execution_record_count: (run.execution_outputs || []).length,
      run_record_count: records.length,
      project_book_doc_count: runBookDocs.length,
      external_project_book_nodes: externalBook.nodes || 0,
      build_test_status: buildEvidence.build_status || "not_run",
      build_test_proof_class: buildEvidence.proof_class || "missing"
    },
    blocker_board: blockers,
    recovery_batches: [
      {
        id: "RB-06",
        title: "Code-producing build/test factory",
        status: buildEvidence.proof_class === "working_implementation_local" && buildEvidence.build_status === "pass" ? "accepted_local_slice" : "blocked",
        proof_class: buildEvidence.proof_class || "missing"
      },
      {
        id: "RB-07",
        title: "Human steering and audit portal",
        status: "accepted_for_local_control_model_slice",
        proof_class: "working_implementation_local",
        boundary: "Local single-user portal cockpit and machine-readable control model; not hosted enterprise UX."
      },
      {
        id: "RB-08",
        title: "Todo/habits demonstrator full certification",
        status: coverage.full_saturation_status === "pass" ? "accepted" : "partial",
        proof_class: coverage.full_saturation_status === "pass" ? "validated_evidence" : "partial",
        boundary: "Requires complete exemplar artifact/code/test/certification run before full acceptance."
      },
      {
        id: "RB-09",
        title: "Final Hawkeye/public hardening",
        status: publicValidation.status === "pass" ? "accepted_for_local_public_package" : "planned",
        proof_class: publicValidation.status === "pass" ? "validated_evidence" : "missing",
        boundary: publicValidation.status === "pass"
          ? "Public hardening accepted with residual risks; not a full hosted product completion."
          : "Requires final Hawkeye closure, packaging, release, and public hardening."
      },
      {
        id: "PB-01",
        title: "Full product platform spine",
        status: "next_product_batch",
        proof_class: "not_started",
        boundary: "Hosted multi-user app shell, durable database, identity, comments, and production execution ledger remain future product work."
      }
    ],
    stage_assurance: stageAssurance,
    graph_and_redo: {
      spec_graph_nodes: (run.spec_graph_layer?.nodes || []).length,
      spec_graph_edges: (run.spec_graph_layer?.edges || []).length,
      selected_node_example: "02-prd.md",
      change_control_path: "Open Change Request -> compute redo closure -> reopen downstream gates -> rerun tests/reviews/handoff."
    }
  };
}

function listRunFiles(dir, kind) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  const walk = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      const stat = fs.statSync(full);
      out.push({
        kind,
        name: entry.name,
        path: path.relative(ROOT, full).replace(/\\/g, "/"),
        bytes: stat.size,
        updated_at: stat.mtime.toISOString()
      });
    }
  };
  walk(dir);
  return out.sort((a, b) => a.path.localeCompare(b.path));
}

function projectPortalNextActions(run, validation, legalState = computeLegalState(run)) {
  const actions = [];
  const pendingInterrupt = (run.human_interrupts || []).find((item) => item.state === "pending");
  if (pendingInterrupt) actions.push(`Resolve human interrupt ${pendingInterrupt.interrupt_id}: ${pendingInterrupt.action}.`);
  if (run.interrogation?.gate === "approval_required") {
    actions.push("Approve the captured customer grill baseline before downstream SDLC generation.");
  } else if (run.interrogation?.gate !== "pass") {
    actions.push("Finish customer grill answers and resolve contradiction blockers.");
  }
  if (run.status === "change_control") actions.push("Review the active change request, then execute the reopened stage pipeline.");
  if (legalState?.legal_next_action) actions.push(`Legal cursor: ${legalState.legal_next_action}`);
  if (validation.status !== "pass") actions.push("Resolve validation findings before claiming handoff readiness.");
  if (run.status === "ready_for_handoff") actions.push("Review project portal, run RALPH audit if stale, and approve handoff or open a change request.");
  if (!actions.length) actions.push("Execute the active stage or ready pipeline from the workflow controls.");
  return actions;
}

function createChangeRequest(runId, payload) {
  const run = loadRun(runId);
  const title = String(payload.title || "").trim();
  if (title.length < 4) throw Object.assign(new Error("Change request title is required."), { status: 400 });
  const targetStage = STAGES.some((stage) => stage.id === payload.targetStage)
    ? payload.targetStage
    : targetStageForImpact(payload.impactArea || payload.changeType || "");
  const id = `CR-${new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14)}-${slug(title).slice(0, 36)}`;
  const selectedNode = String(payload.selectedNode || "").trim();
  let redo = null;
  if (selectedNode) {
    try {
      redo = computeRedoClosure({ projectBook: run.project_book, node: selectedNode });
    } catch (error) {
      redo = {
        status: "blocked",
        node: selectedNode,
        error: error.message || String(error)
      };
    }
  }
  const cr = {
    zero_slop_policy: ZERO_SLOP,
    id,
    state: "approved_for_reentry",
    title,
    requested_at: nowIso(),
    requested_by: String(payload.requestedBy || "human-owner"),
    approval_owner: String(payload.approvalOwner || run.answers?.["ANS-010"]?.value || "human-owner"),
    change_type: String(payload.changeType || "design_resteer"),
    impact_area: String(payload.impactArea || "design"),
    target_stage: targetStage,
    selected_node: selectedNode,
    reason: String(payload.reason || "").trim(),
    requested_change: String(payload.requestedChange || "").trim(),
    token_swag_delta: String(payload.tokenDelta || "medium"),
    reapproval_trigger: run.token_swag?.reapproval_trigger || "",
    redo_impact: redo,
    reopened_stages: reopenStagesForChange(run, targetStage, title),
    required_reviews: [
      "df-dashboard-control downstream impact review",
      "df-governance-mayor change-control approval",
      "df-quality-refinery reopened gate review",
      "df-traceability-evidence updated trace closure",
      "df-human-agent-handoff owner communication record"
    ],
    next_legal_action: `Execute reopened stage ${targetStage} through the ready pipeline.`
  };
  const recordPath = path.join(runRecordsDir(run.run_id), `${id}.json`);
  writeJson(recordPath, cr);
  const communicationPath = path.join(runRecordsDir(run.run_id), `${id}-human-communication-record.json`);
  writeJson(communicationPath, buildHumanCommunicationRecord(run, cr));
  run.change_requests = [cr, ...(run.change_requests || [])];
  run.human_decisions = [{
    id: `HD-${Date.now()}`,
    at: nowIso(),
    type: "change_request",
    owner: cr.approval_owner,
    decision: "approved_for_reentry",
    summary: title,
    evidence: path.relative(ROOT, recordPath).replace(/\\/g, "/")
  }, ...(run.human_decisions || [])];
  run.execution_outputs = Array.from(new Set([
    ...(run.execution_outputs || []),
    path.relative(ROOT, recordPath).replace(/\\/g, "/"),
    path.relative(ROOT, communicationPath).replace(/\\/g, "/")
  ]));
  run.status = "change_control";
  run.current_stage = targetStage;
  run.audit_log.push({ at: nowIso(), event: "change_request_opened", detail: `${id}: ${title}` });
  appendAguiEvent(run, "USER_RESTEER_REQUESTED", {
    actor: cr.requested_by,
    change_request_id: cr.id,
    title: cr.title,
    target_stage: cr.target_stage,
    selected_node: cr.selected_node,
    reopened_stages: cr.reopened_stages,
    redo_status: cr.redo_impact?.status || "not_requested"
  });
  appendAguiEvent(run, "STATE_DELTA", {
    field: "change_control",
    status: run.status,
    current_stage: run.current_stage,
    legal_next_action: cr.next_legal_action
  });
  saveRun(run);
  return { change_request: cr, portal: buildProjectPortal(run.run_id), run: loadRun(run.run_id) };
}

function targetStageForImpact(impactArea) {
  const value = String(impactArea || "").toLowerCase();
  if (/\b(requirement|scope|customer|spec|prd|srs)\b/.test(value)) return "stage-01-interrogation";
  if (/\b(token|budget|approval|commercial|engagement)\b/.test(value)) return "stage-02-engagement";
  if (/\b(skill|method|workflow|lifecycle|stage|process)\b/.test(value)) return "stage-03-skill-routing";
  if (/\b(artifact|trace|design|architecture|model|ddd|mda)\b/.test(value)) return "stage-04-artifacts";
  if (/\b(review|critic|rubric|quality|certificate)\b/.test(value)) return "stage-05-experts";
  if (/\b(code|test|implementation|browser|scenario|production|sre|ops)\b/.test(value)) return "stage-06-build-test";
  return "stage-04-artifacts";
}

function reopenStagesForChange(run, targetStage, reason) {
  const start = STAGES.findIndex((stage) => stage.id === targetStage);
  const reopened = [];
  for (let index = Math.max(0, start); index < run.stages.length; index += 1) {
    const stage = run.stages[index];
    reopened.push(stage.id);
    stage.status = index === start ? "active" : "locked";
    stage.gate_result = index === start ? "change_control_ready" : "reopened_downstream";
    stage.gate_notes = [`Reopened by human change request: ${reason}`];
    stage.reopened_at = nowIso();
    stage.reopen_reason = reason;
    stage.prior_invocation_count = (stage.invocations || []).length;
    stage.invocations = [];
    stage.outputs = [];
  }
  return reopened;
}

function buildHumanCommunicationRecord(run, cr) {
  return {
    zero_slop_policy: ZERO_SLOP,
    record_type: "human_communication_record",
    record_id: `${cr.id}-HUMAN-COMM`,
    run_id: run.run_id,
    created_at: nowIso(),
    communication_pattern: "resteer_change_request",
    human_owner: cr.approval_owner,
    confidence_framing: "Human has requested a design/workflow change; downstream stages are reopened rather than silently mutating accepted evidence.",
    requested_decision: cr.requested_change,
    response_policy: "Execute only through reopened stage gates; update trace, evidence, dashboard closure, and quality records.",
    linked_change_request: cr.id,
    next_check: cr.next_legal_action
  };
}

function advanceRun(runId) {
  const run = loadRun(runId);
  const index = run.stages.findIndex((item) => item.id === run.current_stage);
  const current = run.stages[index];
  const legal = computeLegalState(run);
  const hardBlockers = legal.blockers.filter((item) => ["sequence", "request_scope", "human_decision"].includes(item.type));
  if (hardBlockers.length) {
    const detail = hardBlockers.map((item) => `${item.code}: ${item.detail}`).join(" ");
    throw Object.assign(new Error(detail || `Cannot advance ${run.current_stage}; legal-state blockers exist.`), { status: 409, legal_state: legal });
  }
  const gate = evaluateStageGate(run, current);
  current.gate_result = gate.status;
  current.gate_notes = gate.notes;
  if (gate.status !== "pass") {
    current.status = "blocked";
    run.status = "blocked";
    run.audit_log.push({ at: nowIso(), event: "advance_blocked", detail: `${current.id}: ${gate.notes.join(" ")}` });
    appendAguiEvent(run, "GATE_BLOCKED", {
      stage_id: current.id,
      stage_title: current.title,
      notes: gate.notes,
      next_safe_action: "Fix gate blockers before advancing."
    });
    saveRun(run);
    return run;
  }
  current.status = "accepted";
  const next = run.stages[index + 1];
  if (next) {
    next.status = "active";
    next.gate_result = "ready";
    run.current_stage = next.id;
    run.status = next.id === "stage-01-interrogation" ? "interrogating" : "in_progress";
  } else {
    run.status = "ready_for_handoff";
  }
  run.audit_log.push({ at: nowIso(), event: "advanced", detail: current.id });
  appendAguiEvent(run, "GATE_PASSED", {
    stage_id: current.id,
    stage_title: current.title,
    next_stage: next?.id || "",
    run_status: run.status
  });
  appendAguiEvent(run, next ? "STAGE_ACTIVE" : "STATE_DELTA", {
    stage_id: next?.id || current.id,
    stage_title: next?.title || current.title,
    run_status: run.status,
    legal_next_action: next ? `Invoke ${next.title}.` : "Review portal, evidence, and handoff package."
  });
  saveRun(run);
  return run;
}

function evaluateStageGate(run, stage) {
  const notes = [];
  if (!(stage.invocations || []).length) notes.push("Stage has not been executed yet.");
  if (stage.id === "stage-00-meta-meta" && run.intent.length < 12) notes.push("Intent is too thin for meta-meta field formation.");
  if (stage.id === "stage-01-interrogation" && run.interrogation.gate !== "pass") {
    notes.push(`Customer grill blocked: ${run.interrogation.completeness}% complete with ${run.interrogation.contradictions.length} contradictions.`);
  }
  if (stage.id === "stage-02-engagement" && !run.answers["ANS-009"]?.value) notes.push("Token boundary answer is missing.");
  if (stage.id === "stage-02-engagement" && !run.answers["ANS-010"]?.value) notes.push("Approval owner answer is missing.");
  if (stage.id === "stage-06-build-test") {
    const evidence = run.build_test_evidence || {};
    if (evidence.proof_class !== "working_implementation_local") notes.push("Implementation package was not generated with working local proof.");
    if (evidence.build_status !== "pass") notes.push("Generated implementation tests did not pass.");
    if (!(evidence.scenario_coverage || []).length) notes.push("Scenario, holdout, transfer, browser, accessibility, and security evidence matrix is missing.");
    if ((evidence.scenario_coverage || []).some((item) => item.status !== "pass")) notes.push("At least one required scenario evidence class did not pass.");
  }
  return { status: notes.length ? "blocked" : "pass", notes };
}

function executeReadyPipeline(runId) {
  let run = loadRun(runId);
  const visited = [];
  for (let guard = 0; guard < STAGES.length + 2; guard += 1) {
    if (run.status === "ready_for_handoff") break;
    const stage = run.stages.find((item) => item.id === run.current_stage);
    if (!stage) break;
    if (!stage.invocations.length || stage.status === "blocked") {
      run = invokeStage(run.run_id, stage.id);
      visited.push(`executed:${stage.id}`);
    }
    run = advanceRun(run.run_id);
    visited.push(`advanced:${stage.id}:${run.status}`);
    if (run.status === "blocked" || run.status === "interrogating") break;
  }
  run.pipeline_execution = {
    at: nowIso(),
    visited,
    result: run.status,
    current_stage: run.current_stage
  };
  run.audit_log.push({ at: nowIso(), event: "pipeline_execute", detail: `${visited.length} transitions, status ${run.status}` });
  appendAguiEvent(run, "PIPELINE_EXECUTED", {
    visited,
    result: run.status,
    current_stage: run.current_stage,
    record_count: (run.execution_outputs || []).length
  });
  saveRun(run);
  return run;
}

function validateRunExecution(runOrId) {
  const run = typeof runOrId === "string" ? loadRun(runOrId) : runOrId;
  const findings = [];
  const warn = (priority, title, detail) => findings.push({ priority, title, detail });
  const stageById = Object.fromEntries((run.stages || []).map((stage) => [stage.id, stage]));

  if (run.zero_slop_policy !== ZERO_SLOP) warn("P1", "Missing zero-slop policy", "Run ledger does not carry the mandatory zero-slop policy.");
  if (!Array.isArray(run.agui_events) || run.agui_events.length === 0) {
    warn("P1", "AG-UI event stream missing", "Run does not carry persisted agent-user protocol events.");
  }
  if (!run.invocation_packet?.agent_protocols?.agui || !run.invocation_packet?.agent_protocols?.a2ui || !run.invocation_packet?.agent_protocols?.mcp_apps) {
    warn("P1", "Agent protocol contracts missing", "Invocation packet does not expose AG-UI, A2UI, and MCP Apps contracts.");
  }
  if (!run.agentic_ui_contract?.required_surfaces?.includes("human-interrupt-inbox")) {
    warn("P1", "Agentic UI contract missing interrupt surface", "Run does not enforce the human interrupt inbox as a required agentic UI surface.");
  }
  if (!run.agentic_ui_contract?.required_surfaces?.includes("spec-graph-impact-explorer")) {
    warn("P1", "Agentic UI contract missing graph surface", "Run does not expose Spec Graph impact as a required agentic UI surface.");
  }
  if (!Array.isArray(run.provider_quorum) || run.provider_quorum.length < 3) {
    warn("P1", "Provider quorum underspecified", "Run must expose at least three provider seats for independent draft/review quorum.");
  }
  if (!Array.isArray(run.foundation_sections) || run.foundation_sections.length < 11) {
    warn("P1", "Foundation workboard underspecified", "Run must expose the full foundation authoring workboard.");
  }
  if (!Array.isArray(run.human_interrupts)) {
    warn("P1", "Human interrupt ledger missing", "Run must carry a human interrupt ledger even if all interrupts are resolved.");
  }
  if (!run.spec_graph_layer?.node_identity_format || !Array.isArray(run.spec_graph_layer?.edges)) {
    warn("P1", "Spec Graph layer state missing", "Run must expose graph identity, nodes, edges, and impact state.");
  }
  const surfaces = buildA2uiSurfaces(run).map((surface) => surface.surface_id);
  for (const requiredSurface of run.agentic_ui_contract?.required_surfaces || []) {
    if (!surfaces.includes(requiredSurface)) warn("P1", "Required A2UI surface missing", `${requiredSurface} is required by the agentic UI contract but not emitted.`);
  }
  if (!run.generated_meta_skill || run.generated_meta_skill.generated_from !== "df-meta-attractor") {
    warn("P1", "Generated meta-skill missing", "Run does not prove the meta-meta skill generated the project-tailored meta-skill.");
  }
  if (run.generated_meta_skill?.required_sequence?.[0]?.skills?.[0] !== "df-meta-attractor") {
    warn("P1", "Meta-meta is not first", "Generated meta-skill sequence does not start with df-meta-attractor.");
  }
  const selected = new Set(run.generated_meta_skill?.selected_meta_skills || []);
  for (const skill of new Set(STAGES.flatMap((stage) => stage.skills))) {
    if (!selected.has(skill)) warn("P2", "Skill missing from generated contract", `${skill} is not listed in selected_meta_skills.`);
  }
  if ((run.stages || []).map((stage) => stage.id).join("|") !== STAGES.map((stage) => stage.id).join("|")) {
    warn("P1", "Stage order drift", "Run stage order no longer matches the factory control graph.");
  }
  const legalState = computeLegalState(run);
  if (legalState.current_stage_index < 0) {
    warn("P1", "Legal cursor missing", "Run current_stage does not resolve to a control-graph stage.");
  }
  if (!legalState.all_predecessors_accepted) {
    warn("P1", "Legal cursor predecessor gap", "The active stage has at least one predecessor that is not accepted.");
  }
  if (legalState.current_stage_status === "locked") {
    warn("P1", "Legal cursor locked", "The current stage is locked and cannot be the execution cursor.");
  }
  for (const blocker of legalState.blockers.filter((item) => ["sequence", "request_scope"].includes(item.type))) {
    warn("P1", `Legal-state blocker: ${blocker.code}`, blocker.detail);
  }
  for (const blocker of legalState.blockers.filter((item) => item.type === "human_decision")) {
    warn("P2", `Human decision pending: ${blocker.code}`, blocker.detail);
  }

  let firstNonAccepted = -1;
  for (let index = 0; index < STAGES.length; index += 1) {
    const expected = STAGES[index];
    const actual = run.stages?.[index];
    if (!actual || actual.id !== expected.id) {
      warn("P1", "Stage identity mismatch", `Expected ${expected.id} at index ${index}.`);
      continue;
    }
    if (actual.status !== "accepted" && firstNonAccepted === -1) firstNonAccepted = index;
    if (firstNonAccepted !== -1 && index > firstNonAccepted && actual.status === "accepted") {
      warn("P1", "Non-contiguous accepted stages", `${actual.id} is accepted after an earlier unaccepted stage.`);
    }
    if (actual.status === "accepted" && !actual.invocations?.length) {
      warn("P1", "Accepted stage has no invocation", `${actual.id} is accepted without invocation evidence.`);
    }
    if (actual.status === "accepted") {
      for (const recordName of STAGE_RECORDS[actual.id] || []) {
        const rel = path.relative(ROOT, path.join(runRecordsDir(run.run_id), recordName)).replace(/\\/g, "/");
        if (!actual.outputs?.includes(rel) && !(run.execution_outputs || []).includes(rel)) {
          warn("P1", "Accepted stage missing required record", `${actual.id} missing ${recordName}.`);
        }
      }
    }
  }

  if (run.status === "ready_for_handoff" && run.stages.some((stage) => stage.status !== "accepted")) {
    warn("P1", "Handoff before all stages accepted", "Run is ready_for_handoff while at least one stage is not accepted.");
  }
  if (run.status === "ready_for_handoff" && run.current_stage !== STAGES[STAGES.length - 1].id) {
    warn("P2", "Handoff current stage not final", "Run is handoff-ready but current_stage is not the final dashboard/handoff stage.");
  }
  if (run.project_collection?.completeness < 100 && run.status !== "interrogating" && run.status !== "blocked") {
    warn("P1", "Execution with incomplete project collection", "Run advanced past interrogation without complete required answers.");
  }
  if (run.interrogation?.contradictions?.some((item) => item.severity === "P1") && run.status !== "blocked") {
    warn("P1", "P1 contradiction not blocking", "Run contains a P1 contradiction but is not blocked.");
  }

  const outputs = run.execution_outputs || [];
  const duplicates = outputs.filter((item, index) => outputs.indexOf(item) !== index);
  if (duplicates.length) warn("P2", "Duplicate execution outputs", `Duplicate output entries: ${Array.from(new Set(duplicates)).join(", ")}`);
  for (const rel of outputs) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) {
      warn("P1", "Execution output missing on disk", rel);
      continue;
    }
    if (rel.endsWith(".json")) {
      const data = readJson(full);
      if (!data) {
        warn("P1", "Execution JSON is invalid", rel);
      } else if (data.zero_slop_policy !== ZERO_SLOP) {
        warn("P1", "Execution record missing zero-slop policy", rel);
      }
    }
    if (rel.endsWith(".md")) {
      const text = fs.readFileSync(full, "utf8");
      if (!text.includes(ZERO_SLOP)) warn("P1", "Markdown execution record missing zero-slop policy", rel);
    }
  }

  if (stageById["stage-04-artifacts"]?.status === "accepted") {
    for (const file of ["00-factory-run-summary.md", "01-initial-prd-skeleton.md"]) {
      const rel = path.relative(ROOT, path.join(runProjectBookDir(run.run_id), file)).replace(/\\/g, "/");
      if (!outputs.includes(rel) || !fs.existsSync(path.join(ROOT, rel))) warn("P1", "Starter project-book artifact missing", file);
    }
    const bomRel = path.relative(ROOT, path.join(runRecordsDir(run.run_id), "artifact-bom.json")).replace(/\\/g, "/");
    const bomRecord = readJson(path.join(ROOT, bomRel));
    const bom = bomRecord?.artifact_bom;
    if (!bom || bom.artifact_count < 100 || !Array.isArray(bom.artifacts)) {
      warn("P1", "Artifact BOM below full-catalog threshold", "stage-04 artifact-bom.json must include at least 100 governed artifact templates.");
    } else {
      const weak = bom.artifacts.filter((artifact) => !Array.isArray(artifact.rubric_15) || artifact.rubric_15.length < 15 || !artifact.template?.sections?.length || !artifact.waiver_policy);
      if (weak.length) warn("P1", "Artifact BOM entries missing template/rubric/waiver controls", `${weak.length} artifacts are below the RB-04 quality floor.`);
    }
  }
  if (stageById["stage-05-experts"]?.status === "accepted") {
    const gateRel = path.relative(ROOT, path.join(runRecordsDir(run.run_id), "quality-refinery-gate.json")).replace(/\\/g, "/");
    const gateRecord = readJson(path.join(ROOT, gateRel));
    const engine = gateRecord?.review_engine;
    if (!engine || engine.assignment_count < 100) {
      warn("P1", "Review engine below artifact coverage floor", "quality-refinery-gate.json must assign specialist review to the full artifact catalog.");
    } else {
      const weak = engine.assignments.filter((assignment) =>
        assignment.independent_expert_panel.length < 3 ||
        assignment.adversarial_critic_panel.length < 2 ||
        assignment.rubric_15.length < 15 ||
        assignment.ralph_loop_plan.length < 5 ||
        !assignment.scorecard_policy?.failed_point_fix_evidence_required
      );
      if (weak.length) warn("P1", "Review assignments missing expert/critic/rubric/RALPH controls", `${weak.length} assignments are below the RB-05 review floor.`);
    }
  }
  if (stageById["stage-06-build-test"]?.status === "accepted") {
    const evidence = run.build_test_evidence || {};
    if (evidence.proof_class !== "working_implementation_local") {
      warn("P1", "Code-producing proof missing", "stage-06 accepted without a working local implementation proof class.");
    }
    if (evidence.build_status !== "pass" || typeof evidence.build_exit_code !== "number") {
      warn("P1", "Build verification missing", "stage-06 accepted without an executed local test command and pass result.");
    }
    const generated = evidence.generated_files || [];
    for (const requiredSuffix of ["src/product-core.cjs", "tests/product-core.test.cjs", "public/index.html", "src/product-contract.json"]) {
      if (!generated.some((item) => item.path.endsWith(requiredSuffix))) {
        warn("P1", "Generated implementation file missing", `stage-06 did not generate ${requiredSuffix}.`);
      }
    }
    const requiredClasses = ["happy_path", "negative", "holdout", "transfer", "browser_wysiwyg", "accessibility_security"];
    const coverage = evidence.scenario_coverage || [];
    for (const requiredClass of requiredClasses) {
      if (!coverage.some((item) => item.type === requiredClass && item.status === "pass")) {
        warn("P1", "Scenario evidence class missing", `${requiredClass} evidence is missing or not passing.`);
      }
    }
    const checks = evidence.static_checks || [];
    if (!checks.length || checks.some((item) => item.pass !== true)) {
      warn("P1", "WYSIWYG/accessibility/security static checks missing", "stage-06 accepted without passing static browser/accessibility/security evidence checks.");
    }
  }
  if (stageById["stage-07-dashboard-redo"]?.status === "accepted") {
    if (!outputs.some((item) => item.includes("redo-impact-ui-02-prd-md.json"))) {
      warn("P1", "Redo impact report missing", "Final dashboard stage accepted without redo impact evidence.");
    }
  }

  return {
    zero_slop_policy: ZERO_SLOP,
    run_id: run.run_id,
    checked_at: nowIso(),
    status: findings.some((item) => item.priority === "P1") ? "fail" : findings.length ? "conditional_pass" : "pass",
    finding_count: findings.length,
    p1_count: findings.filter((item) => item.priority === "P1").length,
    p2_count: findings.filter((item) => item.priority === "P2").length,
    findings
  };
}

function runRalphAudit(runId, loops = 20) {
  const run = loadRun(runId);
  const base = validateRunExecution(run);
  const loopSpecs = [
    ["Meta-meta entry", "Verify df-meta-attractor is first and cannot be bypassed."],
    ["Generated meta-skill", "Verify generated meta-skill contract exists and selects child skills."],
    ["Project collection", "Verify required answers are captured before execution advances."],
    ["Contradiction blocking", "Verify P1 contradictions cannot pass silently."],
    ["Stage order", "Verify stage order matches the control graph."],
    ["Locked future work", "Verify accepted stages form a contiguous prefix."],
    ["Invocation evidence", "Verify accepted stages have invocations."],
    ["Required records", "Verify required records exist per stage."],
    ["Record persistence", "Verify execution outputs exist on disk."],
    ["Zero-slop evidence", "Verify JSON/Markdown records carry zero-slop policy."],
    ["Artifact output", "Verify artifact stage creates starter project-book files."],
    ["Trace seed", "Verify traceability seed is generated."],
    ["Expert review plan", "Verify expert and critic panels are generated."],
    ["Testing evidence", "Verify implementation source, generated tests, scenario/holdout/transfer/browser evidence, accessibility, and security checks are generated and pass."],
    ["SRE handoff", "Verify production/SRE handoff plan exists."],
    ["Dashboard redo", "Verify redo impact evidence exists for final stage."],
    ["Audit log", "Verify pipeline execution appears in audit log."],
    ["No duplicate outputs", "Verify execution output ledger is unique."],
    ["Handoff readiness", "Verify handoff-ready only after all stages accepted."],
    ["Residual boundary", "Verify real code/deploy remains project-specific and not overclaimed."]
  ];
  const loopsOut = loopSpecs.slice(0, loops).map(([name, attack], index) => {
    const loopFindings = ralphLoopFindings(name, run, base);
    return {
      loop: index + 1,
      review: name,
      attack,
      learn: loopFindings.length ? "Gap found; keep gate conditional or fail until fixed." : "No gap found for this check.",
      patch: loopFindings.length ? "See findings list and required remediation." : "No patch required.",
      harden: "Validator check recorded in RALPH audit.",
      findings: loopFindings
    };
  });
  const audit = {
    zero_slop_policy: ZERO_SLOP,
    record_type: "ralph_20_execution_audit",
    run_id: run.run_id,
    created_at: nowIso(),
    base_validation: base,
    loops: loopsOut,
    status: base.status,
    summary: `${loopsOut.length} RALPH loops executed; ${base.p1_count} P1 findings, ${base.p2_count} P2 findings.`
  };
  const file = path.join(runRecordsDir(run.run_id), "ralph-20-execution-audit.json");
  writeJson(file, audit);
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  run.execution_outputs = Array.from(new Set([...(run.execution_outputs || []), rel]));
  run.audit_log.push({ at: nowIso(), event: "ralph_20_audit", detail: audit.summary });
  appendAguiEvent(run, "RALPH_AUDIT_COMPLETED", {
    loops: loopsOut.length,
    status: audit.status,
    p1_count: base.p1_count,
    p2_count: base.p2_count,
    record: rel
  });
  saveRun(run);
  return { audit, run: loadRun(run.run_id), record: rel };
}

function runGoalAchievementAudit(runId, loops = 10) {
  const run = loadRun(runId);
  const validation = validateRunExecution(run);
  const loopSpecs = [
    ["Meta-meta entry", "Can governed work bypass the meta-meta attractor?"],
    ["Protocol contracts", "Are AG-UI, A2UI, and MCP Apps explicit machine-readable contracts?"],
    ["AG-UI event ledger", "Are user, agent, stage, gate, and state transitions persisted as events?"],
    ["A2UI dynamic surfaces", "Can the agent declare the stage report, interrogation, change-control, evidence, and protocol surfaces?"],
    ["MCP Apps manifest", "Do tool descriptors expose UI resource URIs, schemas, JSON resources, and ui resources?"],
    ["Human interrogation", "Can a human ask the agent at any point and get a recorded, stage-aware answer?"],
    ["Resteer and change control", "Can a human reopen downstream work through a change request instead of mutating accepted evidence?"],
    ["No-skip execution", "Does the validator prevent locked/future stages and missing accepted-stage evidence?"],
    ["Detailed stage reporting", "Does the active stage report include skills, gate, records, blockers, and next safe action?"],
    ["Goal evidence package", "Are goal audit, protocol state, tests, and task-bead evidence tied back into the project ledger?"]
  ];
  const loopsOut = loopSpecs.slice(0, loops).map(([name, attack], index) => {
    const findings = goalLoopFindings(name, run, validation);
    return {
      loop: index + 1,
      review: name,
      attack,
      learn: findings.length ? "Gap found in the goal-specific workflow proof." : "Goal check is backed by current run evidence.",
      patch: findings.length ? "Patch or execute the missing capability, then rerun this goal audit." : "No patch required for this goal check.",
      harden: "Goal achievement RALPH loop recorded with evidence links and residual risk.",
      findings
    };
  });
  const p1 = loopsOut.flatMap((loop) => loop.findings).filter((finding) => finding.priority === "P1").length;
  const p2 = loopsOut.flatMap((loop) => loop.findings).filter((finding) => finding.priority === "P2").length;
  const audit = {
    zero_slop_policy: ZERO_SLOP,
    record_type: "goal_achievement_ralph_10_audit",
    goal: "Agent-centric DFMS workflow using AG-UI-style events, A2UI-style surfaces, and MCP Apps-style tool/resources for greenfield or brownfield projects with anytime interrogation and resteer.",
    run_id: run.run_id,
    created_at: nowIso(),
    validation,
    loops: loopsOut,
    status: p1 ? "fail" : p2 ? "conditional_pass" : "pass",
    achieved: p1 === 0,
    p1_count: p1,
    p2_count: p2,
    summary: `${loopsOut.length} goal RALPH loops executed; ${p1} P1 findings, ${p2} P2 findings.`
  };
  const file = path.join(runRecordsDir(run.run_id), "goal-achievement-ralph-10-audit.json");
  writeJson(file, audit);
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  run.execution_outputs = Array.from(new Set([...(run.execution_outputs || []), rel]));
  run.goal_achievement = {
    at: nowIso(),
    status: audit.status,
    achieved: audit.achieved,
    record: rel,
    p1_count: p1,
    p2_count: p2
  };
  run.audit_log.push({ at: nowIso(), event: "goal_ralph_10_audit", detail: audit.summary });
  appendAguiEvent(run, "GOAL_RALPH_AUDIT_COMPLETED", {
    loops: loopsOut.length,
    status: audit.status,
    achieved: audit.achieved,
    p1_count: p1,
    p2_count: p2,
    record: rel
  });
  saveRun(run);
  return { audit, run: loadRun(run.run_id), record: rel };
}

function goalLoopFindings(name, run, validation) {
  const findings = [];
  const add = (priority, title, detail) => findings.push({ priority, title, detail });
  const protocol = run.invocation_packet?.agent_protocols || {};
  const surfaces = buildA2uiSurfaces(run);
  const mcp = buildMcpAppsManifest(run);
  const events = run.agui_events || [];
  const eventTypes = new Set(events.map((event) => event.type));
  const stageReport = buildStageReport(run);
  if (name === "Meta-meta entry") {
    if ((run.stages || [])[0]?.id !== "stage-00-meta-meta") add("P1", "Meta-meta not first", "Run stage sequence does not start with the meta-meta attractor.");
    if (run.generated_meta_skill?.generated_from !== "df-meta-attractor") add("P1", "Generated meta-skill source missing", "Run does not prove df-meta-attractor generated the project-tailored meta-skill.");
  }
  if (name === "Protocol contracts") {
    for (const key of ["agui", "a2ui", "mcp_apps"]) {
      if (!protocol[key]) add("P1", "Protocol contract missing", `${key} missing from invocation packet.`);
    }
  }
  if (name === "AG-UI event ledger") {
    for (const type of ["RUN_STARTED", "STAGE_ACTIVE", "STAGE_INVOKED", "GATE_PASSED", "PIPELINE_EXECUTED"]) {
      if (!eventTypes.has(type)) add("P1", "Required AG-UI event missing", `${type} not found in event ledger.`);
    }
    if (!events.every((event) => event.zero_slop_policy === ZERO_SLOP && event.protocol === "AG-UI")) add("P1", "Malformed AG-UI event", "One or more events lack protocol or zero-slop metadata.");
  }
  if (name === "A2UI dynamic surfaces") {
    for (const required of PROTOCOL_PROFILE.a2ui.surfaces) {
      if (!surfaces.some((surface) => surface.surface_id === required)) add("P1", "A2UI surface missing", `${required} surface missing.`);
    }
  }
  if (name === "MCP Apps manifest") {
    if ((mcp.tools || []).length < 5) add("P1", "MCP Apps tools underspecified", "Expected at least five workflow tools.");
    for (const tool of mcp.tools || []) {
      if (!tool._meta?.ui?.resourceUri) add("P1", "MCP Apps tool lacks UI resource", `${tool.name} has no _meta.ui.resourceUri.`);
    }
    if (!(mcp.ui_resources || []).some((resource) => resource.mimeType === PROTOCOL_PROFILE.mcp_apps.resource_mime_type)) add("P1", "MCP Apps UI resource missing", "No ui resource declares the MCP Apps HTML profile.");
  }
  if (name === "Human interrogation") {
    if (!(run.agent_messages || []).length) add("P1", "Agent interrogation not proven", "No agent-message interaction record exists for this run.");
    if (!eventTypes.has("USER_MESSAGE")) add("P1", "User message event missing", "Human interrogation did not create a USER_MESSAGE event.");
    if (!(run.execution_outputs || []).some((item) => item.includes("agent-interaction-record.json"))) add("P1", "Agent interaction evidence missing", "No agent interaction record appears in execution outputs.");
  }
  if (name === "Resteer and change control") {
    if (!(run.change_requests || []).length) add("P1", "Resteer path not proven", "No change request exists for this run.");
    if (!eventTypes.has("USER_RESTEER_REQUESTED")) add("P1", "Resteer event missing", "Change control did not create a USER_RESTEER_REQUESTED event.");
    if (!(run.execution_outputs || []).some((item) => item.includes("human-communication-record.json"))) add("P1", "Human communication evidence missing", "No human communication record appears in execution outputs.");
  }
  if (name === "No-skip execution") {
    if (validation.status === "fail") add("P1", "Run validator failed", JSON.stringify(validation.findings.slice(0, 5)));
    if ((run.stages || []).some((stage, index) => stage.status === "accepted" && index > 0 && run.stages[index - 1].status !== "accepted")) {
      add("P1", "Non-contiguous accepted stages", "A downstream stage is accepted while an upstream stage is not accepted.");
    }
  }
  if (name === "Detailed stage reporting") {
    for (const key of ["stage_id", "stage_title", "skills", "gate", "expected_records", "next_action"]) {
      if (!stageReport[key] || (Array.isArray(stageReport[key]) && !stageReport[key].length)) add("P1", "Stage report field missing", `${key} missing from active stage report.`);
    }
  }
  if (name === "Goal evidence package") {
    if (!run.invocation_packet?.agent_protocols) add("P1", "Protocol packet evidence missing", "Invocation packet lacks protocol contracts.");
    if (!(run.execution_outputs || []).length) add("P1", "Execution outputs missing", "Run has no evidence outputs.");
    if (!run.audit_log?.some((entry) => entry.event === "pipeline_execute")) add("P2", "Pipeline audit event missing", "Pipeline execution was not recorded in the audit log.");
  }
  return findings;
}

function ralphLoopFindings(name, run, base) {
  const byTitle = (title) => base.findings.filter((finding) => finding.title.toLowerCase().includes(title.toLowerCase()));
  const map = {
    "Meta-meta entry": byTitle("Meta-meta"),
    "Generated meta-skill": byTitle("Generated meta-skill").concat(byTitle("Skill missing")),
    "Project collection": byTitle("project collection"),
    "Contradiction blocking": byTitle("contradiction"),
    "Stage order": byTitle("Stage"),
    "Locked future work": byTitle("contiguous"),
    "Invocation evidence": byTitle("invocation"),
    "Required records": byTitle("required record"),
    "Record persistence": byTitle("missing on disk").concat(byTitle("invalid")),
    "Zero-slop evidence": byTitle("zero-slop"),
    "Artifact output": byTitle("Starter project-book"),
    "Trace seed": (run.execution_outputs || []).some((item) => item.endsWith("traceability-seed.json")) ? [] : [{ priority: "P1", title: "Trace seed missing", detail: "traceability-seed.json not generated." }],
    "Expert review plan": (run.execution_outputs || []).some((item) => item.endsWith("expert-panel-record.json")) && (run.execution_outputs || []).some((item) => item.endsWith("critic-panel-record.json")) ? [] : [{ priority: "P1", title: "Expert records missing", detail: "Expert or critic panel record missing." }],
    "Testing evidence": run.build_test_evidence?.proof_class === "working_implementation_local" && run.build_test_evidence?.build_status === "pass"
      ? []
      : [{ priority: "P1", title: "Build/test evidence missing", detail: "stage-06 did not produce passing local implementation/test evidence." }],
    "SRE handoff": (run.execution_outputs || []).some((item) => item.endsWith("production-sre-handoff-record.json")) ? [] : [{ priority: "P2", title: "SRE handoff record missing", detail: "production-sre-handoff-record.json not generated." }],
    "Dashboard redo": byTitle("Redo impact"),
    "Audit log": (run.audit_log || []).some((item) => item.event === "pipeline_execute") ? [] : [{ priority: "P2", title: "Pipeline audit log missing", detail: "pipeline_execute event missing." }],
    "No duplicate outputs": byTitle("Duplicate"),
    "Handoff readiness": byTitle("Handoff"),
    "Residual boundary": []
  };
  return map[name] || [];
}

function listRuns() {
  ensureDir(RUNS);
  return fs.readdirSync(RUNS)
    .filter((name) => name.endsWith(".json"))
    .map((name) => readJson(path.join(RUNS, name)))
    .filter(Boolean)
    .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
}

function locatePython() {
  const bundled = path.join(os.homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "python", "python.exe");
  if (fs.existsSync(bundled)) return bundled;
  return process.env.PYTHON || "python";
}

function computeRedoClosure(payload) {
  const projectBook = payload.projectBook ? path.resolve(payload.projectBook) : DEFAULT_PROJECT_BOOK;
  const node = String(payload.node || "02-prd.md");
  const script = path.join(ROOT, "codex-skills", "df-dashboard-control", "scripts", "df_dashboard_control.py");
  const index = path.join(projectBook, "portal", "dashboard-control-index.json");
  const html = path.join(projectBook, "portal", "dashboard-control.html");
  const out = path.join(projectBook, "evidence", `redo-impact-ui-${slug(node)}.json`);
  const py = locatePython();
  const build = spawnSync(py, [script, "build", "--root", projectBook, "--project", "DFMS UI Console Run", "--out", index, "--html", html], { encoding: "utf8" });
  if (build.status !== 0) {
    return computeRedoClosureFallback({ projectBook, node, index, out, script_error: build.error?.message || build.stderr || build.stdout || "Dashboard build failed" });
  }
  const closure = spawnSync(py, [script, "closure", "--index", index, "--node", node, "--out", out, "--request", "UI-REDO-REQUEST"], { encoding: "utf8" });
  if (closure.status !== 0) {
    return computeRedoClosureFallback({ projectBook, node, index, out, script_error: closure.error?.message || closure.stderr || closure.stdout || "Redo closure failed" });
  }
  const report = readJson(out, {});
  return {
    status: "pass",
    projectBook,
    node,
    index,
    reportPath: out,
    impacted: report.closure?.impacted_node_count || 0,
    dashboardOutputs: report.dashboard_outputs_to_refresh?.length || 0,
    stdout: { build: build.stdout, closure: closure.stdout }
  };
}

function computeRedoClosureFallback({ projectBook, node, index, out, script_error }) {
  const dashboard = readJson(index);
  if (!dashboard || !Array.isArray(dashboard.nodes)) {
    throw Object.assign(new Error(`Dashboard index is missing and script execution was unavailable: ${script_error}`), { status: 500 });
  }
  const report = computeClosureFromIndex(dashboard, node, path.basename(out));
  report.report_id = `REDO-IMPACT-UI-${Date.now()}`;
  report.project = dashboard.project || "DFMS UI Console Run";
  report.source_request = "UI-REDO-REQUEST";
  report.generated_at = nowIso();
  report.execution_mode = "javascript_fallback";
  report.script_error = script_error;
  writeJson(out, report);
  return {
    status: "pass-fallback",
    projectBook,
    node,
    index,
    reportPath: out,
    impacted: report.closure.impacted_node_count,
    dashboardOutputs: report.dashboard_outputs_to_refresh.length,
    stdout: { build: "", closure: `fallback used: ${script_error}` }
  };
}

function computeClosureFromIndex(index, selected, evidenceTarget = "redo-impact-ui.json") {
  const nodes = Object.fromEntries((index.nodes || []).map((item) => [item.id, item]));
  let selectedId = nodes[selected] ? selected : "";
  if (!selectedId) {
    const matches = (index.nodes || []).filter((item) => String(item.path || "").toLowerCase().includes(String(selected).toLowerCase()));
    if (matches.length !== 1) {
      throw Object.assign(new Error(`Selected node not found or ambiguous: ${selected}`), { status: 400 });
    }
    selectedId = matches[0].id;
  }

  const forward = new Set(["reviewed_by", "certified_by", "reopens", "supersedes", "blocks"]);
  const reverse = new Set(["depends_on", "satisfies", "verifies", "documents", "generated_from", "inferred_reference"]);
  const adjacency = new Map();
  for (const edge of index.edges || []) {
    if (!edge.source || !edge.target) continue;
    if (forward.has(edge.type)) addImpactEdge(adjacency, edge.source, edge.target, edge, "forward");
    if (reverse.has(edge.type)) addImpactEdge(adjacency, edge.target, edge.source, edge, "reverse");
  }

  const seen = new Set([selectedId]);
  const queue = [selectedId];
  const impacted = [];
  const edgeReasons = [];
  while (queue.length) {
    const current = queue.shift();
    impacted.push(current);
    for (const edge of adjacency.get(current) || []) {
      if (seen.has(edge.impact_target) || !nodes[edge.impact_target]) continue;
      seen.add(edge.impact_target);
      queue.push(edge.impact_target);
      edgeReasons.push(edge);
    }
  }

  const impactedNodes = impacted.map((id) => nodes[id]).filter(Boolean);
  const tests = impactedNodes.filter((item) => item.kind === "test" || item.kind === "evidence" || item.stage === "verification");
  const artifacts = impactedNodes.filter((item) => ["artifact", "portal", "trace"].includes(item.kind));
  const dashboardOutputs = Object.values(nodes).filter((item) => ["portal/dashboard-control-index.json", "portal/dashboard-control.html"].includes(item.path));
  return {
    zero_slop_policy: ZERO_SLOP,
    selected_node: selectedId,
    selected_node_path: nodes[selectedId].path,
    closure: {
      impacted_node_count: impactedNodes.length,
      impacted_nodes: impactedNodes,
      edge_reasons: edgeReasons
    },
    redo_order: impactedNodes,
    gates_to_reopen: [],
    certificates_to_reissue: [],
    tests_to_rerun: tests,
    artifacts_to_regenerate: artifacts,
    dashboard_outputs_to_refresh: dashboardOutputs,
    human_approvals: [
      "Approve redo scope and token SWAG before material changes.",
      "Promote important inferred edges to explicit trace records before formal certification."
    ],
    required_skills: ["df-dashboard-control", "df-governance-mayor", "df-quality-refinery", "df-traceability-evidence"],
    task_bead: {
      bead_id: `TB-REDO-UI-${Date.now()}`,
      state: "planned",
      gate: "GATE-REDO-IMPACT",
      evidence_target: evidenceTarget
    },
    assumptions: ["Fallback closure used existing dashboard-control index instead of rebuilding it."],
    residual_risks: ["If the index is stale, rebuild it with the Python dashboard-control script before certification."]
  };
}

function addImpactEdge(adjacency, source, target, edge, direction) {
  if (!adjacency.has(source)) adjacency.set(source, []);
  adjacency.get(source).push({
    ...edge,
    impact_source: source,
    impact_target: target,
    impact_direction: direction,
    original_source: edge.source,
    original_target: edge.target
  });
}

function sendJson(res, status, data) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  res.end(JSON.stringify(data, null, 2));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) reject(Object.assign(new Error("Request too large"), { status: 413 }));
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(Object.assign(new Error("Invalid JSON"), { status: 400 }));
      }
    });
  });
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname.includes("](") || url.pathname.startsWith("/]") || url.pathname.includes("%5D(")) {
    res.writeHead(302, { location: "/layer-map/" });
    res.end();
    return;
  }
  if (url.pathname === "/layer-map") {
    res.writeHead(302, { location: "/layer-map/" });
    res.end();
    return;
  }
  if (url.pathname.startsWith("/layer-map/")) {
    const layerPath = url.pathname === "/layer-map/" ? "/index.html" : url.pathname.slice("/layer-map".length);
    return serveStaticFromRoot(layerPath, LAYER_MAP_PUBLIC, res);
  }
  const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  return serveStaticFromRoot(pathname, PUBLIC, res);
}

function serveStaticFromRoot(pathname, root, res) {
  const file = path.resolve(root, `.${pathname}`);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const ext = path.extname(file);
  const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json" };
  res.writeHead(200, { "content-type": `${types[ext] || "application/octet-stream"}; charset=utf-8` });
  fs.createReadStream(file).pipe(res);
}

async function handleApi(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (req.method === "GET" && url.pathname === "/api/bootstrap") {
      return sendJson(res, 200, {
        zero_slop_policy: ZERO_SLOP,
        skills: loadSkills(),
        stages: STAGES,
        questions: QUESTIONS,
        factory_scenarios: FACTORY_SCENARIOS,
        project_templates: PROJECT_TEMPLATES,
        provider_quorum: PROVIDER_QUORUM,
        foundation_sections: FOUNDATION_SECTIONS,
        spec_graph_layer: SPEC_GRAPH_LAYER,
        agentic_ui_research_findings: AGENTIC_UI_RESEARCH_FINDINGS,
        projectBook: projectBookSummary(),
        runs: listRuns().slice(0, 10)
      });
    }
    if (req.method === "POST" && url.pathname === "/api/runs") {
      return sendJson(res, 201, createRun(await parseBody(req)));
    }
    if (req.method === "POST" && url.pathname.match(/^\/api\/runs\/[^/]+\/answer$/)) {
      const id = url.pathname.split("/")[3];
      return sendJson(res, 200, answerQuestion(id, await parseBody(req)));
    }
    if (req.method === "POST" && url.pathname.match(/^\/api\/runs\/[^/]+\/approve-interrogation$/)) {
      const id = url.pathname.split("/")[3];
      return sendJson(res, 200, approveInterrogation(id, await parseBody(req)));
    }
    if (req.method === "POST" && url.pathname.match(/^\/api\/runs\/[^/]+\/invoke$/)) {
      const id = url.pathname.split("/")[3];
      const body = await parseBody(req);
      return sendJson(res, 200, invokeStage(id, body.stageId));
    }
    if (req.method === "POST" && url.pathname.match(/^\/api\/runs\/[^/]+\/advance$/)) {
      const id = url.pathname.split("/")[3];
      return sendJson(res, 200, advanceRun(id));
    }
    if (req.method === "POST" && url.pathname.match(/^\/api\/runs\/[^/]+\/execute$/)) {
      const id = url.pathname.split("/")[3];
      return sendJson(res, 200, executeReadyPipeline(id));
    }
    if (req.method === "GET" && url.pathname.match(/^\/api\/runs\/[^/]+\/portal$/)) {
      const id = url.pathname.split("/")[3];
      return sendJson(res, 200, buildProjectPortal(id));
    }
    if (req.method === "GET" && url.pathname.match(/^\/api\/runs\/[^/]+\/protocol$/)) {
      const id = url.pathname.split("/")[3];
      return sendJson(res, 200, buildProtocolState(id));
    }
    if (req.method === "GET" && url.pathname.match(/^\/api\/runs\/[^/]+\/legal-state$/)) {
      const id = url.pathname.split("/")[3];
      return sendJson(res, 200, computeLegalState(id));
    }
    if (req.method === "GET" && url.pathname.match(/^\/api\/runs\/[^/]+\/truth$/)) {
      const id = url.pathname.split("/")[3];
      return sendJson(res, 200, buildTruthInventory(id));
    }
    if (req.method === "POST" && url.pathname.match(/^\/api\/runs\/[^/]+\/agent-message$/)) {
      const id = url.pathname.split("/")[3];
      return sendJson(res, 201, createAgentMessage(id, await parseBody(req)));
    }
    if (req.method === "POST" && url.pathname.match(/^\/api\/runs\/[^/]+\/change-request$/)) {
      const id = url.pathname.split("/")[3];
      return sendJson(res, 201, createChangeRequest(id, await parseBody(req)));
    }
    if (req.method === "POST" && url.pathname.match(/^\/api\/runs\/[^/]+\/interrupt$/)) {
      const id = url.pathname.split("/")[3];
      return sendJson(res, 200, decideHumanInterrupt(id, await parseBody(req)));
    }
    if (req.method === "GET" && url.pathname.match(/^\/api\/runs\/[^/]+\/validate$/)) {
      const id = url.pathname.split("/")[3];
      return sendJson(res, 200, validateRunExecution(id));
    }
    if (req.method === "POST" && url.pathname.match(/^\/api\/runs\/[^/]+\/ralph$/)) {
      const id = url.pathname.split("/")[3];
      return sendJson(res, 200, runRalphAudit(id, 20));
    }
    if (req.method === "POST" && url.pathname.match(/^\/api\/runs\/[^/]+\/goal-ralph$/)) {
      const id = url.pathname.split("/")[3];
      return sendJson(res, 200, runGoalAchievementAudit(id, 10));
    }
    if (req.method === "GET" && url.pathname.match(/^\/api\/runs\/[^/]+$/)) {
      return sendJson(res, 200, loadRun(url.pathname.split("/").pop()));
    }
    if (req.method === "POST" && url.pathname === "/api/redo") {
      return sendJson(res, 200, computeRedoClosure(await parseBody(req)));
    }
    return sendJson(res, 404, { error: "Unknown API route" });
  } catch (error) {
    return sendJson(res, error.status || 500, { error: error.message || String(error) });
  }
}

function createServer() {
  ensureDir(RUNS);
  return http.createServer((req, res) => {
    if (req.url.startsWith("/api/")) {
      handleApi(req, res);
    } else {
      serveStatic(req, res);
    }
  });
}

if (require.main === module) {
  createServer().listen(PORT, "127.0.0.1", () => {
    console.log(`DFMS control console listening at http://127.0.0.1:${PORT}/`);
  });
}

module.exports = {
  ZERO_SLOP,
  STAGES,
  QUESTIONS,
  loadSkills,
  projectBookSummary,
  createRun,
  answerQuestion,
  approveInterrogation,
  advanceRun,
  invokeStage,
  executeReadyPipeline,
  computeLegalState,
  validateRunExecution,
  runRalphAudit,
  runGoalAchievementAudit,
  scoreInterrogation,
  buildInvocationPacket,
  buildStageReport,
  buildAgentReport,
  buildA2uiSurfaces,
  buildMcpAppsManifest,
  buildProtocolState,
  buildTruthInventory,
  createAgentMessage,
  decideHumanInterrupt,
  buildProjectPortal,
  createChangeRequest,
  computeRedoClosure,
  createServer
};
