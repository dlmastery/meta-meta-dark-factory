const state = {
  bootstrap: null,
  run: null,
  portal: null,
  protocol: null,
  busy: false
};

const $ = (id) => document.getElementById(id);

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "content-type": "application/json" },
    ...options
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || response.statusText);
  return data;
}

function setBusy(value) {
  state.busy = value;
  for (const id of [
    "createRun",
    "invokeStage",
    "advanceStage",
    "executePipeline",
    "runRalphAudit",
    "redoClosure",
    "refreshProject",
    "openChangeRequest",
    "sendAgentMessage"
  ]) {
    const element = $(id);
    if (element) element.disabled = value;
  }
  renderCommandCenter();
}

async function init() {
  state.bootstrap = await api("/api/bootstrap");
  renderBootstrap();
  renderQuestions();
  wireEvents();
  renderChangeTargetStages();
  if (state.bootstrap.runs.length) {
    await loadRun(state.bootstrap.runs[0].run_id);
  } else {
    renderRun();
    renderPortal();
    renderProtocol();
  }
}

function wireEvents() {
  $("createRun").addEventListener("click", createRun);
  $("invokeStage").addEventListener("click", invokeCurrentStage);
  $("advanceStage").addEventListener("click", advanceStage);
  $("executePipeline").addEventListener("click", executePipeline);
  $("runRalphAudit").addEventListener("click", runRalphAudit);
  $("redoClosure").addEventListener("click", redoClosure);
  $("refreshProject").addEventListener("click", refreshCurrentProject);
  $("openChangeRequest").addEventListener("click", openChangeRequest);
  $("sendAgentMessage").addEventListener("click", sendAgentMessage);
  $("projectSelect").addEventListener("change", (event) => loadRun(event.target.value));
}

async function refreshBootstrap() {
  state.bootstrap = await api("/api/bootstrap");
  renderBootstrap();
  renderChangeTargetStages();
}

async function loadRun(runId) {
  if (!runId) return;
  setBusy(true);
  try {
    state.run = await api(`/api/runs/${encodeURIComponent(runId)}`);
    await refreshPortal(false);
    await refreshProtocol(false);
    renderRun();
    renderPortal();
    renderProtocol();
  } catch (error) {
    showResult(error.message, true);
  } finally {
    setBusy(false);
  }
}

async function refreshCurrentProject() {
  if (!state.run) return showChangeResult("Start or select a project first.", true);
  await loadRun(state.run.run_id);
}

async function refreshPortal(shouldRender = true) {
  if (!state.run) {
    state.portal = null;
    if (shouldRender) renderPortal();
    return;
  }
  state.portal = await api(`/api/runs/${encodeURIComponent(state.run.run_id)}/portal`);
  if (shouldRender) renderPortal();
}

async function refreshProtocol(shouldRender = true) {
  if (!state.run) {
    state.protocol = null;
    if (shouldRender) renderProtocol();
    return;
  }
  state.protocol = await api(`/api/runs/${encodeURIComponent(state.run.run_id)}/protocol`);
  if (shouldRender) renderProtocol();
}

function renderBootstrap() {
  $("skillCount").textContent = `Skills: ${state.bootstrap.skills.length}`;
  const graph = state.bootstrap.projectBook;
  $("graphCount").textContent = `Graph: ${graph.nodes} / ${graph.edges}`;
  $("nodeCount").textContent = graph.nodes;
  $("edgeCount").textContent = graph.edges;
  $("stageCount").textContent = Object.keys(graph.stages).length;
  const stages = currentStages();
  renderStages(stages);
  renderAgenticSurface(stages);
  renderCommandCenter();
  renderSkills();
  renderProjectSelector();
  renderProjectList();
  renderPacket(state.run?.invocation_packet || {});
}

function currentStages() {
  return state.run?.stages || (state.bootstrap?.stages || []).map((stage, index) => ({
    ...stage,
    status: index === 0 ? "ready" : "locked",
    gate_result: index === 0 ? "ready" : "locked"
  }));
}

function renderProjectSelector() {
  const select = $("projectSelect");
  const runs = state.bootstrap?.runs || [];
  if (!runs.length) {
    select.innerHTML = `<option value="">No projects yet</option>`;
    return;
  }
  select.innerHTML = runs.map((run) => `
    <option value="${escapeAttr(run.run_id)}"${state.run?.run_id === run.run_id ? " selected" : ""}>
      ${escapeHtml(run.project_name || run.run_id)}
    </option>
  `).join("");
}

function renderProjectList() {
  const runs = state.bootstrap?.runs || [];
  $("projectList").innerHTML = runs.length ? runs.map((run) => `
    <button class="project-card ${state.run?.run_id === run.run_id ? "selected" : ""}" data-open-run="${escapeAttr(run.run_id)}">
      <strong>${escapeHtml(run.project_name || run.run_id)}</strong>
      <span>${escapeHtml(run.status || "unknown")} | ${escapeHtml(run.current_stage || "--")}</span>
    </button>
  `).join("") : `<div class="empty-note">No governed project runs yet.</div>`;
  document.querySelectorAll("[data-open-run]").forEach((button) => {
    button.addEventListener("click", () => loadRun(button.dataset.openRun));
  });
}

function renderChangeTargetStages() {
  const select = $("changeTargetStage");
  const selected = select.value;
  select.innerHTML = (state.bootstrap?.stages || []).map((stage) => `
    <option value="${escapeAttr(stage.id)}">${escapeHtml(stage.id.replace("stage-", ""))} - ${escapeHtml(stage.title)}</option>
  `).join("");
  if (selected && (state.bootstrap?.stages || []).some((stage) => stage.id === selected)) {
    select.value = selected;
  }
}

function renderStages(stages) {
  $("stageList").innerHTML = (stages || []).map((stage, index) => `
    <li class="stage-item ${escapeAttr(stage.status || "")}">
      <div class="stage-title">
        <span>${String(index).padStart(2, "0")} ${escapeHtml(stage.title)}</span>
        <span>${escapeHtml(stage.status || "locked")}</span>
      </div>
      <div class="stage-skills">${(stage.skills || []).map(escapeHtml).join(" -> ")}</div>
      ${stage.gate_result ? `<div class="stage-gate">${escapeHtml(stage.gate_result)}</div>` : ""}
    </li>
  `).join("");
  renderAgenticSurface(stages);
}

function renderAgenticSurface(stages = currentStages()) {
  const active = stages.find((stage) => stage.id === state.run?.current_stage) || stages.find((stage) => stage.status === "active") || stages[0];
  const swarm = $("agentSwarm");
  if (swarm) {
    swarm.innerHTML = (stages || []).map((stage, index) => `
      <article class="agent-card ${escapeAttr(stage.status || "")}">
        <div class="agent-card-top">
          <span class="agent-index">${String(index).padStart(2, "0")}</span>
          <span class="agent-status">${escapeHtml(stage.status || "locked")}</span>
        </div>
        <strong>${escapeHtml(agentPersona(stage))}</strong>
        <span>${escapeHtml(stage.title)}</span>
        <small>${(stage.skills || []).map(escapeHtml).join(" + ")}</small>
      </article>
    `).join("");
  }

  const flow = $("flowMap");
  if (flow) {
    flow.innerHTML = (stages || []).map((stage, index) => `
      <div class="flow-node ${escapeAttr(stage.status || "")} ${active?.id === stage.id ? "current" : ""}">
        <span>${String(index).padStart(2, "0")}</span>
        <strong>${escapeHtml(stage.title)}</strong>
        <small>${escapeHtml(stage.gate_result || stage.status || "locked")}</small>
      </div>
    `).join("");
  }
}

function agentPersona(stage) {
  const byKind = {
    "meta-meta": "Meta-Attractor",
    intake: "Spec Interrogator",
    governance: "TPM Governor",
    orchestration: "Skill Router",
    planning: "Artifact Architect",
    review: "Critic Jury",
    execution: "Build/Test Executor",
    control: "Dashboard Handoff"
  };
  return byKind[stage?.kind] || "Specialist Agent";
}

function renderCommandCenter() {
  const stages = currentStages();
  const active = stages.find((stage) => stage.id === state.run?.current_stage) || stages.find((stage) => stage.status === "active") || stages[0];
  const portal = state.portal;
  const progress = portal?.progress || {};
  const recordCount = progress.execution_record_count ?? state.run?.execution_outputs?.length ?? 0;
  const validation = progress.validation_status || (state.run ? "pending" : "--");
  const changes = progress.open_change_request_count ?? state.run?.change_requests?.filter((item) => !["closed", "rejected"].includes(item.state)).length ?? 0;
  const next = portal?.next_actions?.[0] || (state.run ? "Execute the active stage or continue customer interrogation." : "Start or select a project.");

  setText("deckProjectName", state.run ? `${state.run.project_name} | ${state.run.project_type}` : "No project selected");
  setText("activeAgent", active ? `${agentPersona(active)} | ${active.title}` : "Meta-attractor");
  setText("evidencePulse", `${recordCount} records`);
  setText("handoffState", state.run?.status === "ready_for_handoff" ? "Ready" : state.run?.status === "change_control" ? "Re-entry" : "In progress");
  setText("legalNextAction", next);
  setText("budgetPosture", `Token SWAG: ${state.run?.token_swag?.band || "--"}`);
  setText("changePosture", `Change control: ${changes} open`);
  setText("validationPosture", `Validation: ${validation}`);
  setText("swarmStatus", state.busy ? "Swarm: executing" : state.run ? `Swarm: ${state.run.status}` : "Swarm: standing by");
}

function renderSkills() {
  $("skillStack").innerHTML = state.bootstrap.skills.map((skill) => `
    <article class="skill">
      <strong>${escapeHtml(skill.name)}</strong>
      <p>${escapeHtml(skill.description || "")}</p>
    </article>
  `).join("");
}

function renderQuestions() {
  $("questionList").innerHTML = state.bootstrap.questions.map((question) => `
    <div class="question">
      <div>
        <div class="question-id">${escapeHtml(question.id)}${question.required ? " *" : ""}</div>
        <small>${escapeHtml(question.label)}</small>
      </div>
      <label>
        <span>${escapeHtml(question.prompt)}</span>
        <textarea rows="2" data-question="${escapeAttr(question.id)}"></textarea>
      </label>
    </div>
  `).join("");
  document.querySelectorAll("[data-question]").forEach((field) => {
    field.addEventListener("change", () => saveAnswer(field.dataset.question, field.value));
  });
}

async function createRun() {
  setBusy(true);
  try {
    state.run = await api("/api/runs", {
      method: "POST",
      body: JSON.stringify({
        projectName: $("projectName").value,
        projectType: $("projectType").value,
        tokenBand: $("tokenBand").value,
        reapprovalTrigger: $("reapprovalTrigger").value,
        intent: $("intent").value
      })
    });
    await refreshBootstrap();
    await refreshPortal(false);
    await refreshProtocol(false);
    renderRun();
    renderPortal();
    renderProtocol();
  } catch (error) {
    showResult(error.message, true);
  } finally {
    setBusy(false);
  }
}

async function saveAnswer(questionId, value) {
  if (!state.run) return;
  try {
    state.run = await api(`/api/runs/${encodeURIComponent(state.run.run_id)}/answer`, {
      method: "POST",
      body: JSON.stringify({ questionId, value })
    });
    await refreshPortal(false);
    await refreshProtocol(false);
    renderRun();
    renderPortal();
    renderProtocol();
  } catch (error) {
    showResult(error.message, true);
  }
}

async function invokeCurrentStage() {
  if (!state.run) return showResult("Start a run first.", true);
  setBusy(true);
  try {
    state.run = await api(`/api/runs/${encodeURIComponent(state.run.run_id)}/invoke`, {
      method: "POST",
      body: JSON.stringify({ stageId: state.run.current_stage })
    });
    await refreshBootstrap();
    await refreshPortal(false);
    await refreshProtocol(false);
    renderRun();
    renderPortal();
    renderProtocol();
  } catch (error) {
    showResult(error.message, true);
  } finally {
    setBusy(false);
  }
}

async function advanceStage() {
  if (!state.run) return showResult("Start a run first.", true);
  setBusy(true);
  try {
    state.run = await api(`/api/runs/${encodeURIComponent(state.run.run_id)}/advance`, { method: "POST", body: "{}" });
    await refreshBootstrap();
    await refreshPortal(false);
    await refreshProtocol(false);
    renderRun();
    renderPortal();
    renderProtocol();
  } catch (error) {
    showResult(error.message, true);
  } finally {
    setBusy(false);
  }
}

async function executePipeline() {
  if (!state.run) return showResult("Start a run first.", true);
  setBusy(true);
  try {
    state.run = await api(`/api/runs/${encodeURIComponent(state.run.run_id)}/execute`, { method: "POST", body: "{}" });
    await refreshBootstrap();
    await refreshPortal(false);
    await refreshProtocol(false);
    renderRun();
    renderPortal();
    renderProtocol();
  } catch (error) {
    showResult(error.message, true);
  } finally {
    setBusy(false);
  }
}

async function redoClosure() {
  setBusy(true);
  try {
    const result = await api("/api/redo", {
      method: "POST",
      body: JSON.stringify({ node: $("redoNode").value })
    });
    showResult(`Redo closure passed for ${escapeHtml(result.node)}. Impacted nodes: ${result.impacted}. Dashboard outputs to refresh: ${result.dashboardOutputs}. Report: ${escapeHtml(result.reportPath)}`, false);
    await refreshBootstrap();
    if (state.run) {
      await refreshPortal(false);
      await refreshProtocol(false);
      renderRun();
      renderPortal();
      renderProtocol();
    }
  } catch (error) {
    showResult(error.message, true);
  } finally {
    setBusy(false);
  }
}

async function runRalphAudit() {
  if (!state.run) return showAuditResult("Start a run first.", true);
  setBusy(true);
  try {
    const result = await api(`/api/runs/${encodeURIComponent(state.run.run_id)}/ralph`, { method: "POST", body: "{}" });
    state.run = result.run;
    await refreshBootstrap();
    await refreshPortal(false);
    await refreshProtocol(false);
    renderRun();
    renderPortal();
    renderProtocol();
    showAuditResult(`${result.audit.summary} Record: ${result.record}`, result.audit.status === "fail");
  } catch (error) {
    showAuditResult(error.message, true);
  } finally {
    setBusy(false);
  }
}

async function openChangeRequest() {
  if (!state.run) return showChangeResult("Start or select a governed project first.", true);
  setBusy(true);
  try {
    const result = await api(`/api/runs/${encodeURIComponent(state.run.run_id)}/change-request`, {
      method: "POST",
      body: JSON.stringify({
        title: $("changeTitle").value,
        impactArea: $("changeImpact").value,
        targetStage: $("changeTargetStage").value,
        selectedNode: $("changeNode").value,
        tokenDelta: $("changeTokenDelta").value,
        approvalOwner: $("changeApprovalOwner").value,
        requestedBy: "human-owner",
        requestedChange: $("changeRequested").value,
        reason: $("changeReason").value
      })
    });
    state.run = result.run;
    state.portal = result.portal;
    await refreshBootstrap();
    await refreshProtocol(false);
    renderRun();
    renderPortal();
    renderProtocol();
    const cr = result.change_request;
    showChangeResult(`Opened ${escapeHtml(cr.id)}. Reopened ${cr.reopened_stages.length} stages from ${escapeHtml(cr.target_stage)}. Redo impact: ${escapeHtml(cr.redo_impact?.status || "not selected")}.`, false);
  } catch (error) {
    showChangeResult(error.message, true);
  } finally {
    setBusy(false);
  }
}

async function sendAgentMessage() {
  if (!state.run) return showAgentResponse("Start or select a governed project first.", true);
  const message = $("agentMessage").value.trim();
  if (!message) return showAgentResponse("Ask the agent a concrete question or resteer request.", true);
  setBusy(true);
  try {
    const result = await api(`/api/runs/${encodeURIComponent(state.run.run_id)}/agent-message`, {
      method: "POST",
      body: JSON.stringify({
        mode: $("agentMessageMode").value,
        message
      })
    });
    state.run = result.run;
    state.protocol = result.protocol;
    await refreshBootstrap();
    await refreshPortal(false);
    renderRun();
    renderPortal();
    renderProtocol();
    $("agentMessage").value = "";
    showAgentResponse(result.interaction.response.summary, false);
  } catch (error) {
    showAgentResponse(error.message, true);
  } finally {
    setBusy(false);
  }
}

function renderRun() {
  if (!state.run) {
    $("runState").textContent = "No run";
    renderStages(currentStages());
    $("completionScore").textContent = "0%";
    $("collectionScore").textContent = "--";
    $("recordCount").textContent = "--";
    $("currentStage").textContent = "--";
    $("generatedMetaSkill").textContent = "{}";
    $("executionRecords").innerHTML = `<div class="result">No execution records yet. Start a project to create a run ledger.</div>`;
    $("auditLog").innerHTML = "";
    renderContradictions();
    renderPacket({});
    renderProtocol();
    renderCommandCenter();
    return;
  }
  $("runState").textContent = `Run: ${state.run.status}`;
  renderStages(state.run.stages);
  $("completionScore").textContent = `${state.run.interrogation.completeness}%`;
  renderContradictions();
  renderAuditLog();
  renderFactoryExecution();
  renderPacket(state.run.invocation_packet);
  for (const [qid, answer] of Object.entries(state.run.answers || {})) {
    const field = document.querySelector(`[data-question="${CSS.escape(qid)}"]`);
    if (field && field.value !== answer.value) field.value = answer.value;
  }
  renderProjectSelector();
  renderProjectList();
  renderProtocol();
  renderCommandCenter();
}

function renderPortal() {
  const portal = state.portal;
  if (!portal) {
    $("portalScore").textContent = "--";
    $("portalStatus").textContent = "--";
    $("portalValidation").textContent = "--";
    $("portalChanges").textContent = "--";
    $("portalRecordsCount").textContent = "--";
    $("nextActions").innerHTML = `<div class="empty-note">Start or select a project to see legal next actions.</div>`;
    $("changeRequestList").innerHTML = `<div class="empty-note">No change requests yet.</div>`;
    $("portalRecords").innerHTML = `<div class="empty-note">No records yet.</div>`;
    renderCommandCenter();
    return;
  }

  const progress = portal.progress || {};
  $("portalScore").textContent = `${progress.accepted_stages || 0}/${progress.total_stages || 0}`;
  $("portalStatus").textContent = portal.run?.status || "--";
  $("portalValidation").textContent = `${progress.validation_status || "--"} (${progress.validation_findings || 0})`;
  $("portalChanges").textContent = String(progress.open_change_request_count || 0);
  $("portalRecordsCount").textContent = String((progress.execution_record_count || 0) + (portal.project_book?.generated_for_run?.length || 0));

  $("nextActions").innerHTML = (portal.next_actions || []).map((action) => `
    <div class="stack-item"><strong>Next</strong><span>${escapeHtml(action)}</span></div>
  `).join("");

  const changes = portal.change_requests || [];
  $("changeRequestList").innerHTML = changes.length ? changes.map((cr) => `
    <div class="stack-item">
      <strong>${escapeHtml(cr.id)} | ${escapeHtml(cr.state)}</strong>
      <span>${escapeHtml(cr.title)} -> ${escapeHtml(cr.target_stage)}</span>
    </div>
  `).join("") : `<div class="empty-note">No human change requests opened.</div>`;

  const records = [
    ...(portal.records || []),
    ...(portal.project_book?.generated_for_run || [])
  ];
  $("portalRecords").innerHTML = records.length ? records.slice().reverse().map((record) => `
    <div class="record-item">
      <span>${escapeHtml(record.path)}</span>
      <span>${escapeHtml(record.kind || "record")}</span>
    </div>
  `).join("") : `<div class="empty-note">No project records yet.</div>`;
  renderCommandCenter();
}

function renderProtocol() {
  const protocol = state.protocol;
  if (!protocol) {
    setText("protocolAguiStatus", "AG-UI: no run");
    setText("protocolA2uiStatus", "A2UI: no surfaces");
    setText("protocolMcpStatus", "MCP Apps: no tools");
    setText("stageReportTitle", "No active stage");
    setText("stageReportBody", "Start or select a project to inspect agent protocol state.");
    $("aguiEventStream").innerHTML = `<div class="empty-note">No protocol events yet.</div>`;
    $("a2uiSurfaces").innerHTML = `<div class="empty-note">No A2UI surfaces yet.</div>`;
    $("mcpAppsList").innerHTML = `<div class="empty-note">No MCP Apps descriptors yet.</div>`;
    $("agentResponse").innerHTML = `<div class="empty-note">Ask the agent about the active stage, blockers, evidence, or a resteer.</div>`;
    return;
  }

  const events = protocol.agui_events || [];
  const surfaces = protocol.a2ui_surfaces || [];
  const mcp = protocol.mcp_apps || { tools: [], resources: [], ui_resources: [] };
  const report = protocol.agent_report?.active_stage || {};
  setText("protocolAguiStatus", `AG-UI: ${events.length} events`);
  setText("protocolA2uiStatus", `A2UI: ${surfaces.length} surfaces`);
  setText("protocolMcpStatus", `MCP Apps: ${(mcp.tools || []).length} tools`);
  setText("stageReportTitle", report.stage_title || "Active stage report");
  setText("stageReportBody", `${report.status || "--"} | ${report.gate_result || "--"} | ${report.next_action || "--"}`);

  $("aguiEventStream").innerHTML = events.length ? events.slice().reverse().slice(0, 12).map((event) => `
    <div class="event-row">
      <strong>${escapeHtml(event.type)}</strong>
      <span>${escapeHtml(event.stage_id || "--")} | ${escapeHtml(event.at || "")}</span>
      <small>${escapeHtml(event.payload?.response_summary || event.payload?.legal_next_action || event.payload?.stage_title || event.payload?.title || "")}</small>
    </div>
  `).join("") : `<div class="empty-note">No protocol events yet.</div>`;

  $("a2uiSurfaces").innerHTML = surfaces.length ? surfaces.map((surface) => `
    <article class="surface-card">
      <div>
        <strong>${escapeHtml(surface.title || surface.surface_id)}</strong>
        <span>${escapeHtml(surface.component || "Component")}</span>
      </div>
      <small>${escapeHtml(surface.surface_id)} | ${(surface.actions || []).map(escapeHtml).join(", ") || "read-only"}</small>
    </article>
  `).join("") : `<div class="empty-note">No A2UI surfaces yet.</div>`;

  const tools = (mcp.tools || []).map((tool) => `
    <div class="stack-item">
      <strong>${escapeHtml(tool.name)}</strong>
      <span>${escapeHtml(tool.description)} | ${escapeHtml(tool._meta?.ui?.resourceUri || "")}</span>
    </div>
  `).join("");
  const resources = [...(mcp.resources || []), ...(mcp.ui_resources || [])].map((resource) => `
    <div class="stack-item muted">
      <strong>${escapeHtml(resource.uri)}</strong>
      <span>${escapeHtml(resource.mimeType || "resource")} | ${escapeHtml(resource.title || resource.name || "")}</span>
    </div>
  `).join("");
  $("mcpAppsList").innerHTML = tools || resources ? `${tools}${resources}` : `<div class="empty-note">No MCP Apps descriptors yet.</div>`;

  const latest = protocol.recent_agent_messages?.[0];
  if (latest) {
    showAgentResponse(latest.response?.summary || "Agent response recorded.", false);
  }
}

function renderFactoryExecution() {
  const collection = state.run.project_collection || {};
  $("collectionScore").textContent = `${collection.completeness || 0}%`;
  $("recordCount").textContent = String((state.run.execution_outputs || []).length);
  $("currentStage").textContent = (state.run.current_stage || "--").replace("stage-", "");
  $("generatedMetaSkill").textContent = JSON.stringify(state.run.generated_meta_skill || {}, null, 2);
  const records = state.run.execution_outputs || [];
  $("executionRecords").innerHTML = records.length ? records.slice().reverse().map((record) => `
    <div class="record-item"><span>${escapeHtml(record)}</span><span>record</span></div>
  `).join("") : `<div class="result">No execution records yet. Execute the active stage or ready pipeline.</div>`;
}

function renderContradictions() {
  const contradictions = state.run?.interrogation?.contradictions || [];
  if (!contradictions.length) {
    $("contradictions").innerHTML = `<div class="result">No contradiction blockers found yet. Completeness gate still applies.</div>`;
    return;
  }
  $("contradictions").innerHTML = contradictions.map((item) => `
    <div class="alert"><strong>${escapeHtml(item.severity)}</strong> ${escapeHtml(item.message)}</div>
  `).join("");
}

function renderAuditLog() {
  const log = state.run?.audit_log || [];
  $("auditLog").innerHTML = log.slice().reverse().map((entry) => `
    <div class="timeline-item">
      <strong>${escapeHtml(entry.event)}</strong>
      <span>${escapeHtml(entry.at)} - ${escapeHtml(entry.detail || "")}</span>
    </div>
  `).join("");
}

function renderPacket(packet) {
  $("packetView").textContent = JSON.stringify(packet || {}, null, 2);
}

function showResult(message, isError) {
  $("redoResult").innerHTML = `<div class="${isError ? "alert" : ""}">${message}</div>`;
}

function setText(id, value) {
  const element = $(id);
  if (element) element.textContent = value;
}

function showAuditResult(message, isError) {
  $("auditResult").innerHTML = `<div class="${isError ? "alert" : ""}">${escapeHtml(message)}</div>`;
}

function showChangeResult(message, isError) {
  $("changeResult").innerHTML = `<div class="${isError ? "alert" : ""}">${message}</div>`;
}

function showAgentResponse(message, isError) {
  $("agentResponse").innerHTML = `<div class="${isError ? "alert" : "result compact-result"}">${escapeHtml(message)}</div>`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

init().catch((error) => {
  document.body.innerHTML = `<main class="band"><h1>Console failed to start</h1><p>${escapeHtml(error.message)}</p></main>`;
});
