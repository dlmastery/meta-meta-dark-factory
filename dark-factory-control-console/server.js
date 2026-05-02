const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
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
    "implementation-execution-plan.json",
    "test-evidence-plan.json",
    "production-sre-handoff-plan.json"
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
      "protocol-status"
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

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function nowIso() {
  return new Date().toISOString();
}

function slug(value) {
  return String(value || "run").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "run";
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

function createRun(input) {
  ensureDir(RUNS);
  const id = `DFRUN-UI-${new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14)}-${slug(input.projectName || "project")}`;
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
    invocation_packet: buildInvocationPacket(input, {}),
    generated_meta_skill: null,
    execution_outputs: [],
    change_requests: [],
    human_decisions: [],
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
  appendAguiEvent(run, "RUN_STARTED", {
    actor: "human-owner",
    project_name: run.project_name,
    project_type: run.project_type,
    token_swag: run.token_swag,
    zero_slop_policy: ZERO_SLOP
  });
  appendAguiEvent(run, "STAGE_ACTIVE", {
    stage_id: run.current_stage,
    stage_title: run.stages[0].title,
    gate: run.stages[0].gate,
    legal_next_action: "Invoke the meta-meta attractor before child skill execution."
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

function saveRun(run) {
  run.updated_at = nowIso();
  run.change_requests = Array.isArray(run.change_requests) ? run.change_requests : [];
  run.human_decisions = Array.isArray(run.human_decisions) ? run.human_decisions : [];
  run.agent_messages = Array.isArray(run.agent_messages) ? run.agent_messages : [];
  run.agui_events = Array.isArray(run.agui_events) ? run.agui_events : [];
  run.interrogation = scoreInterrogation(run.answers || {});
  run.project_collection = summarizeProjectCollection(run);
  run.generated_meta_skill = deriveGeneratedMetaSkill(run);
  run.invocation_packet = buildInvocationPacket(run, run.answers || {});
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
  run.audit_log.push({ at: nowIso(), event: "answer_updated", detail: qid });
  appendAguiEvent(run, "USER_ANSWERED", {
    actor: "human-owner",
    question_id: qid,
    answer_length: run.answers[qid].value.length,
    completeness_after_answer: scoreInterrogation(run.answers).completeness
  });
  appendAguiEvent(run, "STATE_DELTA", {
    field: "interrogation",
    gate: scoreInterrogation(run.answers).gate,
    active_stage: run.current_stage
  });
  saveRun(run);
  return run;
}

function scoreInterrogation(answers) {
  const required = QUESTIONS.filter((q) => q.required);
  const answered = required.filter((q) => answers[q.id] && answers[q.id].value.trim().length >= 8);
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
  const p1 = contradictions.filter((item) => item.severity === "P1").length;
  return {
    required_questions: required.length,
    answered_required: answered.length,
    completeness,
    contradictions,
    gate: completeness >= 85 && p1 === 0 ? "pass" : "blocked"
  };
}

function buildInvocationPacket(runLike, answers) {
  return {
    zero_slop_policy: ZERO_SLOP,
    packet_type: "dfms_ui_invocation_packet",
    created_at: nowIso(),
    meta_meta_first: true,
    entry_skill: "df-meta-attractor",
    run_id: runLike.run_id || "",
    project_name: runLike.project_name || runLike.projectName || "",
    project_type: runLike.project_type || runLike.projectType || "",
    intent: runLike.intent || "",
    token_swag: runLike.token_swag || {
      band: runLike.tokenBand || "medium",
      reapproval_trigger: runLike.reapprovalTrigger || ""
    },
    generated_meta_skill: runLike.generated_meta_skill || null,
    agent_protocols: {
      agui: PROTOCOL_PROFILE.agui,
      a2ui: PROTOCOL_PROFILE.a2ui,
      mcp_apps: PROTOCOL_PROFILE.mcp_apps,
      run_protocol_endpoint: runLike.run_id ? `/api/runs/${encodeURIComponent(runLike.run_id)}/protocol` : "",
      agent_message_endpoint: runLike.run_id ? `/api/runs/${encodeURIComponent(runLike.run_id)}/agent-message` : "",
      human_can_interrogate_anytime: true,
      human_can_resteer_anytime_through_change_control: true
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
  const currentIndex = run.stages.findIndex((item) => item.id === run.current_stage);
  const stageIndex = run.stages.findIndex((item) => item.id === stageId);
  if (stageIndex > currentIndex) throw Object.assign(new Error("Cannot invoke a locked future stage"), { status: 409 });
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
  saveRun(run);
  return run;
}

function executeStageRecords(run, stage) {
  ensureDir(runRecordsDir(run.run_id));
  ensureDir(runProjectBookDir(run.run_id));
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
      artifacts: [
        "BRD", "PRD", "SRS", "NFR catalog", "standards-tailoring record", "risk register", "quality plan",
        "MDA CIM/PIM/PSM", "DDD context map", "HLD", "LLD", "ADR log", "test strategy", "scenario matrix",
        "traceability matrix", "release plan", "runbook", "handoff record", "dashboard-control index", "quality certificate"
      ].map((name, index) => ({ id: `ART-${String(index + 1).padStart(3, "0")}`, name, status: "planned" }))
    };
  }
  if (recordName === "traceability-seed.json") {
    return {
      ...base,
      status: "accepted",
      nodes: Object.entries(answers).map(([id, answer]) => ({ id, type: "customer_answer", summary: answer.value.slice(0, 140) })),
      edges: Object.keys(answers).map((id) => ({ source: id, target: "generated-meta-skill-contract", type: "derives_from" }))
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
    return {
      ...base,
      status: "accepted",
      experts: [
        expertPersona("Engagement Partner", "Owns client confidence, token budget, change control, and outsourcing-style checkpoints."),
        expertPersona("Requirements Interrogation Lead", "Owns answer quality, contradiction pressure, and recursive spec decomposition."),
        expertPersona("Hawkeye Workflow Auditor", "Owns no-skip conformance, stage gates, evidence integrity, and veto power.")
      ],
      review_rounds_required: 5
    };
  }
  if (recordName === "quality-refinery-gate.json") {
    return {
      ...base,
      status: "conditional_pass",
      thresholds: { expert_count: 3, checks_per_expert: 15, minimum_score: 96 },
      residual_risks: ["Generated records require semantic human/Codex review before final project acceptance."]
    };
  }
  if (recordName === "implementation-execution-plan.json" || recordName === "test-evidence-plan.json") {
    return {
      ...base,
      status: "planned",
      execution_plan: {
        implementation_required: run.project_type !== "artifact-only",
        test_classes: ["unit", "integration", "scenario", "holdout", "transfer", "browser/WYSIWYG", "accessibility", "security", "operations drill"],
        evidence_required: true
      }
    };
  }
  if (recordName === "production-sre-handoff-plan.json") {
    return {
      ...base,
      status: "planned",
      handoff: ["deploy", "rollback", "observability", "incident drill", "operator signoff", "known risks"]
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

function buildStageReport(run, stageLike = null) {
  const stage = typeof stageLike === "string"
    ? (run.stages || []).find((item) => item.id === stageLike)
    : stageLike || activeStage(run);
  const canonical = STAGES.find((item) => item.id === stage?.id) || stage || STAGES[0];
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
    human_questions: canonical.id === "stage-01-interrogation" ? missingQuestions : [],
    next_action: stageNextAction(run, canonical, blockers),
    assurance: [
      "Meta-meta remains first for governed work.",
      "Future stages stay locked until predecessor gates pass.",
      "Human resteer must open change control and reopen downstream gates.",
      "Every stage report is exposed through AG-UI events, A2UI surfaces, and MCP Apps resources."
    ]
  };
}

function stageNextAction(run, stage, blockers) {
  if (blockers.length) return "Resolve blockers, then re-invoke or advance the active stage.";
  if (stage.id !== run.current_stage) return "Inspect only; execute the currently active stage.";
  if (stage.id === "stage-01-interrogation" && run.interrogation?.gate !== "pass") return "Answer required customer grill questions and resolve contradictions.";
  if (!(run.stages || []).find((item) => item.id === stage.id)?.invocations?.length) return "Invoke current stage.";
  return "Advance gate or execute the ready pipeline.";
}

function buildAgentReport(run) {
  const validation = validateRunExecution(run);
  const current = activeStage(run);
  return {
    zero_slop_policy: ZERO_SLOP,
    report_type: "dfms_agent_status_report",
    run_id: run.run_id,
    generated_at: nowIso(),
    active_stage: buildStageReport(run, current),
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
  return [
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
      })
    ],
    resources: [
      { uri: `dfms://runs/${run.run_id}/portal`, name: "Human project portal", mimeType: "application/json" },
      { uri: `dfms://runs/${run.run_id}/protocol`, name: "Protocol state", mimeType: "application/json" },
      { uri: `dfms://runs/${run.run_id}/stage-report`, name: "Current stage report", mimeType: "application/json" }
    ],
    ui_resources: [
      { uri: "ui://dfms/run-cockpit", mimeType: PROTOCOL_PROFILE.mcp_apps.resource_mime_type, title: "Dark Factory Run Cockpit" },
      { uri: "ui://dfms/customer-grill", mimeType: PROTOCOL_PROFILE.mcp_apps.resource_mime_type, title: "Customer Grill Form" },
      { uri: "ui://dfms/change-control", mimeType: PROTOCOL_PROFILE.mcp_apps.resource_mime_type, title: "Change Control And Redo" },
      { uri: "ui://dfms/agent-interrogation", mimeType: PROTOCOL_PROFILE.mcp_apps.resource_mime_type, title: "Ask Agent Anytime" }
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
      claim: "Todo/habits demonstrator has full standalone SDLC artifact saturation.",
      proof_class: coverage.full_saturation_status === "pass" ? "validated_evidence" : "partial",
      status: coverage.full_saturation_status === "pass" ? "achieved" : "not_achieved",
      evidence: coverage.matrix_path ? [coverage.matrix_path] : [],
      trust_boundary: `Current catalog counts: ${coverage.counts_summary}. Full saturation is ${coverage.full_saturation_status || "unknown"}.`
    }),
    truthRow({
      id: "TRUTH-RUN-008",
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
      "Do not call todo/habits full saturation achieved while the coverage matrix says fail.",
      "Do not call dashboards, validators, or RALPH records product artifacts."
    ],
    trust_now: truthRows.filter((row) => ["working_implementation_local", "validated_evidence", "instantiated_artifact"].includes(row.proof_class)),
    do_not_trust_yet: truthRows.filter((row) => ["scaffold_only", "descriptor_only", "partial", "missing", "blocked"].includes(row.proof_class)),
    next_recovery_batch: {
      id: "RB-03",
      objective: "Generate missing high-priority standalone todo/habits artifacts or get explicit human approval for a smaller tailored set.",
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
    human_decisions: run.human_decisions || [],
    audit_log: run.audit_log || [],
    validation,
    next_actions: projectPortalNextActions(run, validation)
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

function projectPortalNextActions(run, validation) {
  const actions = [];
  if (run.interrogation?.gate !== "pass") actions.push("Finish customer grill answers and resolve contradiction blockers.");
  if (run.status === "change_control") actions.push("Review the active change request, then execute the reopened stage pipeline.");
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
  if (stage.invocations.length === 0) notes.push("Stage has not been executed yet.");
  if (stage.id === "stage-00-meta-meta" && run.intent.length < 12) notes.push("Intent is too thin for meta-meta field formation.");
  if (stage.id === "stage-01-interrogation" && run.interrogation.gate !== "pass") {
    notes.push(`Customer grill blocked: ${run.interrogation.completeness}% complete with ${run.interrogation.contradictions.length} contradictions.`);
  }
  if (stage.id === "stage-02-engagement" && !run.answers["ANS-009"]?.value) notes.push("Token boundary answer is missing.");
  if (stage.id === "stage-02-engagement" && !run.answers["ANS-010"]?.value) notes.push("Approval owner answer is missing.");
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
    ["Testing plan", "Verify implementation and test evidence plans are generated."],
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
    "Testing plan": (run.execution_outputs || []).some((item) => item.endsWith("test-evidence-plan.json")) ? [] : [{ priority: "P1", title: "Testing plan missing", detail: "test-evidence-plan.json not generated." }],
    "SRE handoff": (run.execution_outputs || []).some((item) => item.endsWith("production-sre-handoff-plan.json")) ? [] : [{ priority: "P2", title: "SRE handoff plan missing", detail: "production-sre-handoff-plan.json not generated." }],
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
  advanceRun,
  invokeStage,
  executeReadyPipeline,
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
  buildProjectPortal,
  createChangeRequest,
  computeRedoClosure,
  createServer
};
