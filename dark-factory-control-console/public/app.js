const state = {
  bootstrap: null,
  run: null,
  portal: null,
  protocol: null,
  platform: null,
  truth: null,
  activePanel: "overview",
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
    "approveInterrogation",
    "invokeStage",
    "advanceStage",
    "executePipeline",
    "runRalphAudit",
    "runGoalRalphAudit",
    "redoClosure",
    "refreshProject",
    "openChangeRequest",
    "sendAgentMessage",
    "studioPrimaryAction",
    "studioRefineAction",
    "cockpitPrimaryAction",
    "cockpitAskAgent",
    "cockpitOpenChange",
    "addPlatformComment"
  ]) {
    const element = $(id);
    if (element) element.disabled = value;
  }
  renderCommandCenter();
  renderFocusConsole();
}

async function init() {
  state.bootstrap = await api("/api/bootstrap");
  state.platform = state.bootstrap.product_platform_spine || null;
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
    renderProductPlatform();
    renderTruthInventory();
    renderPortalCockpit();
  }
}

function wireEvents() {
  $("createRun").addEventListener("click", createRun);
  $("approveInterrogation").addEventListener("click", approveInterrogation);
  $("invokeStage").addEventListener("click", invokeCurrentStage);
  $("advanceStage").addEventListener("click", advanceStage);
  $("executePipeline").addEventListener("click", executePipeline);
  $("runRalphAudit").addEventListener("click", runRalphAudit);
  $("runGoalRalphAudit").addEventListener("click", runGoalRalphAudit);
  $("redoClosure").addEventListener("click", redoClosure);
  $("refreshProject").addEventListener("click", refreshCurrentProject);
  $("openChangeRequest").addEventListener("click", openChangeRequest);
  $("sendAgentMessage").addEventListener("click", sendAgentMessage);
  $("studioPrimaryAction").addEventListener("click", runStudioPrimary);
  $("studioSecondaryAction").addEventListener("click", () => switchPanel("start"));
  $("studioRefineAction").addEventListener("click", runStudioRefine);
  $("cockpitPrimaryAction").addEventListener("click", runStudioPrimary);
  $("cockpitAskAgent").addEventListener("click", () => switchPanel("debug"));
  $("cockpitOpenChange").addEventListener("click", () => switchPanel("change"));
  $("addPlatformComment").addEventListener("click", addPlatformComment);
  document.querySelectorAll("[data-studio-scenario]").forEach((button) => {
    button.addEventListener("click", () => selectStudioScenario(button.dataset.studioScenario));
  });
  $("projectSelect").addEventListener("change", (event) => loadRun(event.target.value));
  document.querySelectorAll("[data-panel-target]").forEach((button) => {
    button.addEventListener("click", () => switchPanel(button.dataset.panelTarget));
  });
  $("focusPrimaryAction").addEventListener("click", () => {
    const pending = (state.protocol?.human_interrupts || state.run?.human_interrupts || []).find((item) => item.state === "pending");
    if (pending) return switchPanel("overview");
    if (!state.run) return switchPanel("start");
    if (state.run.interrogation?.gate !== "pass") return switchPanel("start");
    return switchPanel("evidence");
  });
  $("focusSecondaryAction").addEventListener("click", () => switchPanel("evidence"));
}

function selectStudioScenario(scenario) {
  if ($("scenarioMode")) $("scenarioMode").value = scenario;
  document.querySelectorAll("[data-studio-scenario]").forEach((button) => {
    button.classList.toggle("active", button.dataset.studioScenario === scenario);
  });
}

function updateWorkflowRunway(run, pendingCount = 0) {
  const order = ["mission", "route", "grill", "execute", "evidence", "handoff"];
  let activeKey = "mission";
  if (run) {
    if (pendingCount > 0 || run.current_stage === "stage-00-meta-meta") {
      activeKey = "route";
    } else if (run.current_stage === "stage-01-interrogation" || run.interrogation?.gate !== "pass") {
      activeKey = "grill";
    } else if (["stage-02-engagement", "stage-03-methodology", "stage-04-artifacts", "stage-05-review"].includes(run.current_stage)) {
      activeKey = "execute";
    } else if (run.current_stage === "stage-06-build-test") {
      activeKey = "evidence";
    } else {
      activeKey = "handoff";
    }
    if (run.status === "change_control" || run.status === "ready_for_handoff") activeKey = "handoff";
  }
  const activeIndex = order.indexOf(activeKey);
  document.querySelectorAll("[data-runway-step]").forEach((step) => {
    const index = order.indexOf(step.dataset.runwayStep);
    step.classList.toggle("active", index === activeIndex);
    step.classList.toggle("completed", index >= 0 && index < activeIndex);
  });
}

function syncStudioMissionToStartForm() {
  if ($("studioProjectName")?.value) $("projectName").value = $("studioProjectName").value;
  if ($("studioIntent")?.value) $("intent").value = $("studioIntent").value;
  if ($("studioTokenBand")?.value) $("tokenBand").value = $("studioTokenBand").value;
  const activeScenario = document.querySelector("[data-studio-scenario].active")?.dataset.studioScenario;
  if (activeScenario) $("scenarioMode").value = activeScenario;
}

async function runStudioPrimary() {
  syncStudioMissionToStartForm();
  if (!state.run) return createRun();
  const pending = (state.protocol?.human_interrupts || state.run?.human_interrupts || []).some((item) => item.state === "pending");
  if (pending) return switchPanel("overview");
  if (state.run.status === "change_control") return switchPanel("change");
  if (state.run.interrogation?.gate !== "pass") return switchPanel("start");
  return executePipeline();
}

async function runStudioRefine() {
  const message = $("studioRefineInput").value.trim();
  if (!message) return switchPanel("debug");
  if (!state.run) {
    $("intent").value = `${$("studioIntent").value}\n\nRefinement request: ${message}`;
    return switchPanel("start");
  }
  $("agentMessageMode").value = /change|resteer|reopen|redo/i.test(message) ? "resteer" : "ask";
  $("agentMessage").value = message;
  await sendAgentMessage();
}

function switchPanel(panel) {
  state.activePanel = panel || "overview";
  renderPanelVisibility();
}

function renderPanelVisibility() {
  document.querySelectorAll("[data-panel-target]").forEach((button) => {
    button.classList.toggle("active", button.dataset.panelTarget === state.activePanel);
  });
  document.querySelectorAll(".ux-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === state.activePanel);
  });
}

async function refreshBootstrap() {
  state.bootstrap = await api("/api/bootstrap");
  state.platform = state.bootstrap.product_platform_spine || state.platform;
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
    await refreshPlatform(false);
    await refreshTruth(false);
    state.activePanel = "overview";
    renderRun();
    renderPortal();
    renderProtocol();
    renderTruthInventory();
    renderPortalCockpit();
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

async function refreshPlatform(shouldRender = true) {
  state.platform = await api("/api/platform");
  if (shouldRender) renderProductPlatform();
}

async function refreshTruth(shouldRender = true) {
  if (!state.run) {
    state.truth = null;
    if (shouldRender) renderTruthInventory();
    return;
  }
  state.truth = await api(`/api/runs/${encodeURIComponent(state.run.run_id)}/truth`);
  if (shouldRender) renderTruthInventory();
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
  renderAgenticWorkbench();
  renderProductPlatform();
  renderFocusConsole();
  renderStudioState();
  renderPanelVisibility();
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

function renderFocusConsole() {
  const run = state.run;
  const protocol = state.protocol || {};
  const pending = (protocol.human_interrupts || run?.human_interrupts || []).filter((item) => item.state === "pending");
  const active = currentStages().find((stage) => stage.id === run?.current_stage) || currentStages()[0];
  const validation = state.portal?.progress?.validation_status || (run ? "pending" : "--");
  const route = run ? `${run.scenario_mode || run.project_type || "project"} / ${run.template_id || "template"}` : "Choose scenario and template";
  const proof = run ? `${run.execution_outputs?.length || 0} records, ${validation}` : "No run yet";
  const next = state.portal?.next_actions?.[0] || (run ? "Continue the active stage." : "Create the governed run first.");

  setText("focusSummary", run
    ? `${run.project_name} is at ${active?.title || "the first stage"}. ${next}`
    : "Start or select a project. The factory will surface the next human decision before agents execute material work.");
  setText("focusRoute", route);
  setText("focusAgentMode", active ? `${agentPersona(active)} working on ${active.title}` : "--");
  setText("focusProof", proof);

  const decisionList = $("focusDecisionList");
  if (decisionList) {
    if (!run) {
      decisionList.innerHTML = `<div class="focus-empty">No project is active. Start with scenario, template, token band, and raw intent.</div>`;
    } else if (pending.length) {
      decisionList.innerHTML = pending.map((interrupt) => `
        <article class="focus-decision">
          <strong>${escapeHtml(interrupt.action)}</strong>
          <span>${escapeHtml(interrupt.description || "")}</span>
          <div class="interrupt-actions">
            <button class="button primary" data-interrupt-decision="approve" data-interrupt-id="${escapeAttr(interrupt.interrupt_id)}">Approve</button>
            <button class="button secondary" data-interrupt-decision="edit" data-interrupt-id="${escapeAttr(interrupt.interrupt_id)}">Edit</button>
            <button class="button secondary" data-interrupt-decision="reject" data-interrupt-id="${escapeAttr(interrupt.interrupt_id)}">Reject</button>
          </div>
        </article>
      `).join("");
    } else {
      decisionList.innerHTML = `
        <article class="focus-decision calm">
          <strong>${escapeHtml(active?.title || "Factory")}</strong>
          <span>${escapeHtml(next)}</span>
        </article>
      `;
    }
    decisionList.querySelectorAll("[data-interrupt-decision]").forEach((button) => {
      button.addEventListener("click", () => decideInterrupt(button.dataset.interruptId, button.dataset.interruptDecision));
    });
  }

  setText("focusPrimaryAction", pending.length ? "Review Decision" : run ? "Open Evidence" : "Start Project");
  setText("focusSecondaryAction", run ? "Inspect Evidence" : "See Start Form");
  renderStudioState();
}

function renderStudioState() {
  const run = state.run;
  const protocol = state.protocol || {};
  const pending = (protocol.human_interrupts || run?.human_interrupts || []).filter((item) => item.state === "pending");
  const active = currentStages().find((stage) => stage.id === run?.current_stage) || currentStages()[0];
  const scenario = run?.scenario_mode || $("scenarioMode")?.value || "greenfield-product";
  selectStudioScenario(scenario);
  updateWorkflowRunway(run, pending.length);

  if (!run) {
    setText("studioPrimaryAction", "Start Factory Run");
    setText("studioSecondaryAction", "Open Detailed Grill");
    setText("runPreviewState", "Waiting for mission");
    return;
  }

  if ($("studioProjectName") && $("studioProjectName").value === "New governed product") {
    $("studioProjectName").value = run.project_name || $("studioProjectName").value;
  }

  const previewState = pending.length
    ? "Human decision required"
    : run.status === "change_control"
      ? "Change control open"
      : `${active?.title || "Factory"} active`;
  setText("runPreviewState", previewState);
  setText("studioPrimaryAction", pending.length
    ? "Review Decision"
    : run.status === "change_control"
      ? "Open Change Control"
      : run.interrogation?.gate !== "pass"
        ? "Continue Grill"
        : "Continue Factory");
  setText("studioSecondaryAction", "Inspect Evidence");
}

async function approveInterrogation() {
  if (!state.run) return showResult("Start a run first.", true);
  setBusy(true);
  try {
    state.run = await api(`/api/runs/${encodeURIComponent(state.run.run_id)}/approve-interrogation`, {
      method: "POST",
      body: JSON.stringify({
        owner: state.run.answers?.["ANS-010"]?.value || "human-owner",
        note: "Human owner approved the captured interrogation baseline for downstream SDLC generation."
      })
    });
    await refreshBootstrap();
    await refreshPortal(false);
    await refreshProtocol(false);
    await refreshPlatform(false);
    await refreshTruth(false);
    renderRun();
    renderPortal();
    renderProtocol();
    showResult("Interrogation baseline approved. The customer grill can now pass its gate.", false);
  } catch (error) {
    showResult(error.message, true);
  } finally {
    setBusy(false);
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
        scenarioMode: $("scenarioMode").value,
        templateId: $("templateId").value,
        providerQuorum: $("providerQuorum").value,
        tokenBand: $("tokenBand").value,
        reapprovalTrigger: $("reapprovalTrigger").value,
        intent: $("intent").value
      })
    });
    await refreshBootstrap();
    await refreshPortal(false);
    await refreshProtocol(false);
    await refreshPlatform(false);
    await refreshTruth(false);
    state.activePanel = "overview";
    renderRun();
    renderPortal();
    renderProtocol();
    renderAgenticWorkbench();
    renderProductPlatform();
  } catch (error) {
    showResult(error.message, true);
  } finally {
    setBusy(false);
  }
}

async function decideInterrupt(interruptId, decision) {
  if (!state.run) return showAgentResponse("Start or select a governed project first.", true);
  setBusy(true);
  try {
    const result = await api(`/api/runs/${encodeURIComponent(state.run.run_id)}/interrupt`, {
      method: "POST",
      body: JSON.stringify({
        interruptId,
        decision,
        note: `${decision} from agentic SDLC workbench`
      })
    });
    state.run = result.run;
    state.protocol = result.protocol;
    await refreshBootstrap();
    await refreshPortal(false);
    await refreshTruth(false);
    renderRun();
    renderPortal();
    renderProtocol();
    renderAgenticWorkbench();
    renderProductPlatform();
    showAgentResponse(`Human interrupt ${decision}: ${result.decision.interrupt_id}`, false);
  } catch (error) {
    showAgentResponse(error.message, true);
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
    await refreshTruth(false);
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
    await refreshTruth(false);
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
    await refreshTruth(false);
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
    await refreshTruth(false);
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
      await refreshTruth(false);
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
    await refreshTruth(false);
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

async function runGoalRalphAudit() {
  if (!state.run) return showGoalAuditResult("Start a run first.", true);
  setBusy(true);
  try {
    const result = await api(`/api/runs/${encodeURIComponent(state.run.run_id)}/goal-ralph`, { method: "POST", body: "{}" });
    state.run = result.run;
    await refreshBootstrap();
    await refreshPortal(false);
    await refreshProtocol(false);
    await refreshTruth(false);
    renderRun();
    renderPortal();
    renderProtocol();
    showGoalAuditResult(`${result.audit.summary} Goal achieved: ${result.audit.achieved ? "yes" : "no"}. Record: ${result.record}`, result.audit.status === "fail");
  } catch (error) {
    showGoalAuditResult(error.message, true);
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
    await refreshTruth(false);
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
    $("interrogationApproval").textContent = "Approval: not requested";
    $("interrogationProtocolSummary").textContent = "Rounds, decomposition, and trace links appear after answers are captured.";
    $("approveInterrogation").disabled = true;
    $("generatedMetaSkill").textContent = "{}";
    $("executionRecords").innerHTML = `<div class="result">No execution records yet. Start a project to create a run ledger.</div>`;
    $("auditLog").innerHTML = "";
    renderContradictions();
    renderPacket({});
    renderProtocol();
    renderTruthInventory();
    renderPortalCockpit();
    renderAgenticWorkbench();
    renderFocusConsole();
    renderPanelVisibility();
    renderCommandCenter();
    return;
  }
  $("runState").textContent = `Run: ${state.run.status}`;
  renderStages(state.run.stages);
  $("completionScore").textContent = `${state.run.interrogation.completeness}%`;
  renderInterrogationProtocol();
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
  renderTruthInventory();
  renderPortalCockpit();
  renderAgenticWorkbench();
  renderFocusConsole();
  renderPanelVisibility();
  renderCommandCenter();
}

function renderInterrogationProtocol() {
  const interrogation = state.run?.interrogation || {};
  const approval = interrogation.approval || {};
  const rounds = interrogation.rounds || [];
  const capturedRounds = rounds.filter((round) => round.status === "captured").length;
  const requeue = interrogation.reinterrogation_queue || [];
  const traceCount = (interrogation.trace_links || []).length;
  const nodeCount = interrogation.decomposition_tree?.root?.children?.reduce((sum, axis) => sum + 1 + (axis.children || []).length, 1) || 0;
  const approvalLabel = interrogation.gate === "approval_required" ? "approval_required" : approval.state || "not_requested";
  $("interrogationApproval").textContent = `Approval: ${approvalLabel}`;
  $("interrogationProtocolSummary").textContent = `${capturedRounds}/${rounds.length || 4} rounds captured | ${traceCount} answer trace links | ${nodeCount} decomposition nodes | ${requeue.length} re-interrogation items`;
  $("approveInterrogation").disabled = !state.run || interrogation.gate !== "approval_required";
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
    renderPortalCockpit();
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
  renderPortalCockpit();
  renderCommandCenter();
}

function renderPortalCockpit() {
  const model = state.portal?.portal_control_model;
  if (!model) {
    setText("cockpitSubhead", "Start or select a project to load the legal cursor, Hawkeye posture, evidence board, and redo path.");
    setText("cockpitLegalAction", "Start or select a project.");
    setText("cockpitLegalMeta", "The factory cannot skip locked predecessors.");
    setText("cockpitHumanQueue", "--");
    setText("cockpitHumanOwner", "Approval owner: --");
    setText("cockpitEvidencePosture", "--");
    setText("cockpitEvidenceMeta", "Records, tests, and validation status.");
    setText("cockpitGraphPosture", "--");
    setText("cockpitRedoPath", "Select a node to compute downstream closure.");
    setText("hawkeyeState", "No run");
    setText("hawkeyeBoundary", "Validation and closure posture appears after a run is selected.");
    $("hawkeyeBlockers").innerHTML = `<div class="empty-note">No Hawkeye blockers available yet.</div>`;
    $("stageAssuranceBoard").innerHTML = `<div class="empty-note">No stage assurance model yet.</div>`;
    $("rbClosureBoard").innerHTML = `<div class="empty-note">No recovery closure model yet.</div>`;
    $("rbClosureMini").innerHTML = "";
    return;
  }

  const legal = model.legal_action || {};
  const human = model.human_control || {};
  const assurance = model.assurance || {};
  const blockers = model.blocker_board || [];
  const rb = model.recovery_batches || [];
  const stages = model.stage_assurance || [];
  const graph = model.graph_and_redo || {};
  state.platform = model.product_platform_spine || state.platform;
  const hardBlockers = blockers.filter((item) => item.severity === "P1").length;
  const validationText = `${assurance.validation_status || "--"} | ${assurance.p1_count || 0} P1 | ${assurance.p2_count || 0} P2`;

  setText("cockpitSubhead", `${model.first_viewport_contract?.length || 0} viewport obligations enforced by the portal control model.`);
  setText("cockpitLegalAction", legal.legal_next_action || "No legal action computed.");
  setText("cockpitLegalMeta", `${legal.current_stage_title || legal.current_stage || "--"} | can invoke: ${legal.can_invoke_current_stage ? "yes" : "no"} | completed: ${legal.completed ? "yes" : "no"}`);
  setText("cockpitHumanQueue", `${human.pending_interrupts || 0} interrupts | ${human.open_change_requests || 0} changes`);
  setText("cockpitHumanOwner", `Approval owner: ${human.approval_owner || "--"}`);
  setText("cockpitEvidencePosture", `${assurance.execution_record_count || 0} records | ${assurance.build_test_status || "not_run"}`);
  setText("cockpitEvidenceMeta", `${validationText} | ${assurance.build_test_proof_class || "missing"}`);
  setText("cockpitGraphPosture", `${graph.spec_graph_nodes || 0} nodes | ${graph.spec_graph_edges || 0} edges`);
  setText("cockpitRedoPath", graph.change_control_path || "Open change control to compute redo closure.");
  setText("hawkeyeState", hardBlockers ? `${hardBlockers} P1 blockers` : validationText);
  setText("hawkeyeBoundary", hardBlockers ? "Hawkeye veto remains active until P1 blockers are cleared." : "Local structural portal checks are passing; remaining boundaries are explicit.");

  $("hawkeyeBlockers").innerHTML = blockers.length ? blockers.slice(0, 8).map((item) => `
    <article class="cockpit-list-item ${escapeAttr(item.severity || "P2")}">
      <strong>${escapeHtml(item.severity || "--")} | ${escapeHtml(item.title)}</strong>
      <span>${escapeHtml(item.source || "audit")} | ${escapeHtml(item.detail || "")}</span>
    </article>
  `).join("") : `<div class="empty-note">No Hawkeye blockers in the current local control model.</div>`;

  $("stageAssuranceBoard").innerHTML = stages.map((stage) => `
    <article class="assurance-step ${escapeAttr(stage.status || "")} ${stage.id === legal.current_stage ? "current" : ""}">
      <span>${String(stage.order || 0).padStart(2, "0")}</span>
      <div>
        <strong>${escapeHtml(stage.title)}</strong>
        <small>${escapeHtml(stage.status || "--")} | ${escapeHtml(stage.gate_result || "--")} | ${escapeHtml(stage.evidence_count || 0)} outputs</small>
      </div>
    </article>
  `).join("") || `<div class="empty-note">Stage assurance unavailable.</div>`;

  $("rbClosureBoard").innerHTML = rb.map((batch) => `
    <article class="cockpit-list-item">
      <strong>${escapeHtml(batch.id)} | ${escapeHtml(batch.status)}</strong>
      <span>${escapeHtml(batch.title)} | ${escapeHtml(batch.proof_class || "--")}</span>
      ${batch.boundary ? `<small>${escapeHtml(batch.boundary)}</small>` : ""}
    </article>
  `).join("") || `<div class="empty-note">Recovery closure model unavailable.</div>`;

  $("rbClosureMini").innerHTML = rb.map((batch) => `
    <span class="rb-mini ${escapeAttr(batch.status || "")}">${escapeHtml(batch.id)} ${escapeHtml(batch.status || "--")}</span>
  `).join("");
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
    renderAgenticWorkbench();
    renderProductPlatform();
    renderPortalCockpit();
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
  renderAgenticWorkbench();
  renderProductPlatform();
  renderFocusConsole();
  renderPanelVisibility();
  renderPortalCockpit();
}

function renderAgenticWorkbench() {
  const bootstrap = state.bootstrap || {};
  const protocol = state.protocol || {};
  const contract = protocol.agentic_ui_contract || state.run?.agentic_ui_contract || {};
  const templates = bootstrap.project_templates || [];
  const selectedScenario = state.run?.scenario_mode || contract.scenario?.id || $("scenarioMode")?.value || "greenfield-product";
  const selectedTemplate = state.run?.template_id || contract.template?.id || $("templateId")?.value || "agentic-sdlc-factory";
  const providers = protocol.provider_quorum || state.run?.provider_quorum || bootstrap.provider_quorum || [];
  const interrupts = protocol.human_interrupts || state.run?.human_interrupts || [];
  const sections = protocol.foundation_sections || state.run?.foundation_sections || (bootstrap.foundation_sections || []).map((section, index) => ({
    ...section,
    status: index === 0 ? "ready" : "locked"
  }));
  const specGraph = protocol.spec_graph_layer || state.run?.spec_graph_layer || bootstrap.spec_graph_layer || {};

  setText("scenarioStatus", `Scenario: ${selectedScenario}`);
  setText("interruptStatus", `Interrupts: ${interrupts.filter((item) => item.state === "pending").length} pending`);
  setText("specGraphStatus", `Spec Graph: ${(specGraph.nodes || []).length || "--"} nodes`);

  const scenarioCards = $("scenarioCards");
  if (scenarioCards) {
    scenarioCards.innerHTML = (bootstrap.factory_scenarios || []).map((scenario) => `
      <article class="scenario-card ${scenario.id === selectedScenario ? "selected" : ""}">
        <span>${escapeHtml(scenario.route)}</span>
        <strong>${escapeHtml(scenario.label)}</strong>
        <small>${escapeHtml(scenario.description)}</small>
      </article>
    `).join("") || `<div class="empty-note">Scenario catalog not loaded.</div>`;
  }

  const templateCatalog = $("templateCatalog");
  if (templateCatalog) {
    templateCatalog.innerHTML = templates.length ? `
      <div class="template-row template-head"><span>Template</span><span>Domain</span><span>Tier</span><span>Modules</span></div>
      ${templates.map((template) => `
        <div class="template-row ${template.id === selectedTemplate ? "selected" : ""}">
          <strong>${escapeHtml(template.name)}</strong>
          <span>${escapeHtml(template.domain)}</span>
          <span>${escapeHtml(template.tier)}</span>
          <span>${escapeHtml(template.modules)}</span>
        </div>
      `).join("")}
    ` : `<div class="empty-note">Template catalog not loaded.</div>`;
  }

  const providerBoard = $("providerQuorumBoard");
  if (providerBoard) {
    providerBoard.innerHTML = providers.length ? providers.map((provider) => `
      <article class="provider-card">
        <span class="provider-dot"></span>
        <div>
          <strong>${escapeHtml(provider.label)}</strong>
          <small>${escapeHtml(provider.role)} | ${escapeHtml(provider.status)} | ${escapeHtml(provider.latency_ms || "--")}ms</small>
        </div>
      </article>
    `).join("") : `<div class="empty-note">Provider quorum not loaded.</div>`;
  }

  const interruptList = $("humanInterrupts");
  if (interruptList) {
    interruptList.innerHTML = interrupts.length ? interrupts.map((interrupt) => `
      <article class="interrupt-card ${escapeAttr(interrupt.state)}">
        <div>
          <strong>${escapeHtml(interrupt.action)}</strong>
          <span>${escapeHtml(interrupt.interrupt_id)} | ${escapeHtml(interrupt.state)}</span>
          <small>${escapeHtml(interrupt.description || "")}</small>
        </div>
        ${interrupt.state === "pending" ? `
          <div class="interrupt-actions">
            <button class="button primary" data-interrupt-decision="approve" data-interrupt-id="${escapeAttr(interrupt.interrupt_id)}">Approve</button>
            <button class="button secondary" data-interrupt-decision="edit" data-interrupt-id="${escapeAttr(interrupt.interrupt_id)}">Edit</button>
            <button class="button secondary" data-interrupt-decision="reject" data-interrupt-id="${escapeAttr(interrupt.interrupt_id)}">Reject</button>
          </div>
        ` : ""}
      </article>
    `).join("") : `<div class="empty-note">No human interrupts yet.</div>`;
    document.querySelectorAll("[data-interrupt-decision]").forEach((button) => {
      button.addEventListener("click", () => decideInterrupt(button.dataset.interruptId, button.dataset.interruptDecision));
    });
  }

  const foundation = $("foundationAuthoring");
  if (foundation) {
    foundation.innerHTML = sections.length ? sections.map((section, index) => `
      <div class="foundation-row ${escapeAttr(section.status || "locked")}">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <strong>${escapeHtml(section.title)}</strong>
        <small>${escapeHtml(section.status || "locked")}${section.estimate_minutes ? ` | ~${escapeHtml(section.estimate_minutes)}m` : ""}</small>
      </div>
    `).join("") : `<div class="empty-note">Foundation sections not loaded.</div>`;
  }

  const explorer = $("specGraphExplorer");
  if (explorer) {
    const sample = (specGraph.impact_samples || [])[0];
    explorer.innerHTML = `
      <div class="spec-graph-rule">${escapeHtml(specGraph.node_identity_format || "No node identity format loaded.")}</div>
      <div class="spec-graph-counts">
        <span><strong>${escapeHtml((specGraph.nodes || []).length || 0)}</strong> nodes</span>
        <span><strong>${escapeHtml((specGraph.edges || []).length || 0)}</strong> edges</span>
      </div>
      <div class="spec-impact">
        <strong>${escapeHtml(sample?.change || "Change impact sample unavailable.")}</strong>
        <small>${escapeHtml((sample?.required_actions || []).join(" | ") || specGraph.no_duplicate_path_rule || "")}</small>
      </div>
    `;
  }
}

function renderProductPlatform() {
  const platform = state.platform || state.portal?.portal_control_model?.product_platform_spine || state.bootstrap?.product_platform_spine;
  if (!platform) {
    setText("productPlatformStatus", "No PB-01 platform state.");
    setText("platformLedgerStatus", "--");
    setText("platformNextBatch", "--");
    setText("productPlatformBoundary", "Start or select a project to load the local product spine.");
    $("platformCapabilityList").innerHTML = `<div class="empty-note">No platform capabilities loaded.</div>`;
    $("platformRoleList").innerHTML = `<div class="empty-note">No role model loaded.</div>`;
    $("platformProjectSpaces").innerHTML = `<div class="empty-note">No project spaces loaded.</div>`;
    $("platformCommentList").innerHTML = `<div class="empty-note">No human collaboration records yet.</div>`;
    return;
  }
  const ledger = platform.durable_ledger || {};
  const gate = platform.acceptance_gate || {};
  setText("productPlatformStatus", `${platform.batch || "PB-01"} | ${platform.platform_status || "--"}`);
  setText("platformLedgerStatus", `${ledger.run_count || 0} runs | ${ledger.comment_count || 0} comments | ${ledger.status || "--"}`);
  setText("platformNextBatch", gate.next_product_batch || "PB-02 hosted enterprise runtime");
  setText("productPlatformBoundary", platform.trust_boundary || "");

  $("platformCapabilityList").innerHTML = (platform.capabilities || []).map((capability) => `
    <article class="platform-capability ${escapeAttr(capability.status || "")}">
      <strong>${escapeHtml(capability.id)} | ${escapeHtml(capability.title)}</strong>
      <span>${escapeHtml(capability.status || "--")}</span>
      <small>${escapeHtml(capability.evidence || "")}</small>
    </article>
  `).join("") || `<div class="empty-note">No platform capabilities loaded.</div>`;

  $("platformRoleList").innerHTML = (platform.roles || []).map((role) => `
    <article class="platform-role">
      <strong>${escapeHtml(role.role)}</strong>
      <span>${(role.decision_rights || []).map(escapeHtml).join(" | ")}</span>
    </article>
  `).join("") || `<div class="empty-note">No role model loaded.</div>`;

  $("platformProjectSpaces").innerHTML = (platform.project_spaces || []).map((space) => `
    <article class="platform-project ${space.run_id === state.run?.run_id ? "selected" : ""}">
      <strong>${escapeHtml(space.project_name || space.run_id)}</strong>
      <span>${escapeHtml(space.status || "--")} | ${escapeHtml(space.current_stage || "--")}</span>
      <small>${escapeHtml(space.protocol_endpoint || "")}</small>
    </article>
  `).join("") || `<div class="empty-note">No project runs yet. Start a governed project to create the first project space.</div>`;

  const comments = platform.human_collaboration?.comments || [];
  $("platformCommentList").innerHTML = comments.length ? comments.slice(0, 8).map((comment) => `
    <article class="platform-comment">
      <strong>${escapeHtml(comment.topic || "platform_review")} | ${escapeHtml(comment.author_role || "human")}</strong>
      <span>${escapeHtml(comment.comment || "")}</span>
      <small>${escapeHtml(comment.id || "")} | ${escapeHtml(comment.created_at || "")}</small>
    </article>
  `).join("") : `<div class="empty-note">No human collaboration records yet.</div>`;
}

async function addPlatformComment() {
  const comment = $("platformComment").value.trim();
  if (!comment) return showResult("Write a platform review comment first.", true);
  setBusy(true);
  try {
    const result = await api("/api/platform/comments", {
      method: "POST",
      body: JSON.stringify({
        runId: state.run?.run_id || "",
        topic: $("platformCommentTopic").value || "platform_review",
        comment,
        authorRole: "human_reviewer"
      })
    });
    state.platform = result.platform;
    $("platformComment").value = "";
    renderProductPlatform();
    showResult(`Platform comment recorded: ${result.comment.id}`, false);
  } catch (error) {
    showResult(error.message, true);
  } finally {
    setBusy(false);
  }
}

function renderTruthInventory() {
  const truth = state.truth;
  if (!truth) {
    setText("truthRiskScore", "--");
    $("proofClassCounts").innerHTML = `<div class="empty-note">No truth inventory yet.</div>`;
    $("trustNowList").innerHTML = `<div class="empty-note">Start or select a project to see evidence-backed trust boundaries.</div>`;
    $("dontTrustList").innerHTML = `<div class="empty-note">No gap analysis yet.</div>`;
    $("truthRows").innerHTML = "";
    return;
  }
  const risky = (truth.do_not_trust_yet || []).length;
  setText("truthRiskScore", String(risky));
  $("proofClassCounts").innerHTML = Object.entries(truth.counts || {}).map(([key, value]) => `
    <span class="truth-chip"><strong>${escapeHtml(value)}</strong>${escapeHtml(key)}</span>
  `).join("") || `<div class="empty-note">No proof classes counted.</div>`;
  $("trustNowList").innerHTML = renderTruthStack(truth.trust_now || [], "No evidence-backed trusted items yet.");
  $("dontTrustList").innerHTML = renderTruthStack(truth.do_not_trust_yet || [], "No gaps or boundaries listed.");
  $("truthRows").innerHTML = (truth.truth_rows || []).map((row) => `
    <article class="truth-row">
      <div>
        <div class="proof-class">${escapeHtml(row.proof_class)}</div>
        <small>${escapeHtml(row.layer)} | ${escapeHtml(row.status)}</small>
      </div>
      <div>
        <strong>${escapeHtml(row.claim)}</strong>
        <span>${escapeHtml(row.trust_boundary || "")}</span>
        <small>${(row.evidence || []).map(escapeHtml).join(" | ") || "No evidence path."}</small>
      </div>
    </article>
  `).join("");
  renderFocusConsole();
}

function renderTruthStack(rows, empty) {
  return rows.length ? rows.map((row) => `
    <div class="stack-item">
      <strong>${escapeHtml(row.layer)} | ${escapeHtml(row.proof_class)}</strong>
      <span>${escapeHtml(row.claim)}</span>
    </div>
  `).join("") : `<div class="empty-note">${escapeHtml(empty)}</div>`;
}

function renderFactoryExecution() {
  const collection = state.run.project_collection || {};
  $("collectionScore").textContent = `${collection.completeness || 0}%`;
  $("recordCount").textContent = String((state.run.execution_outputs || []).length);
  $("currentStage").textContent = (state.run.current_stage || "--").replace("stage-", "");
  $("generatedMetaSkill").textContent = JSON.stringify(state.run.generated_meta_skill || {}, null, 2);
  const records = state.run.execution_outputs || [];
  const buildEvidence = state.run.build_test_evidence || {};
  const scenarios = buildEvidence.scenario_coverage || [];
  const generatedFiles = buildEvidence.generated_files || [];
  $("buildTestEvidence").innerHTML = buildEvidence.proof_class ? `
    <div class="evidence-summary">
      <div>
        <span class="studio-kicker">Build/Test Factory</span>
        <strong>${escapeHtml(buildEvidence.build_status || "not_run")} | ${escapeHtml(buildEvidence.proof_class || "missing")}</strong>
        <small>${escapeHtml(buildEvidence.trust_boundary || "")}</small>
      </div>
      <div class="mini-ledger">
        <span>${generatedFiles.length} generated files</span>
        <span>${scenarios.filter((item) => item.status === "pass").length}/${scenarios.length} scenarios passing</span>
        <span>${escapeHtml(buildEvidence.implementation_root || "no implementation root")}</span>
      </div>
    </div>
    <div class="truth-row-list compact">
      ${scenarios.map((item) => `
        <article class="truth-row">
          <div><div class="proof-class">${escapeHtml(item.status)}</div><small>${escapeHtml(item.type)}</small></div>
          <div><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.evidence || "")}</span></div>
        </article>
      `).join("")}
    </div>
  ` : `<div class="result">Build/test evidence has not been generated yet. Stage 06 must produce code, tests, scenario, browser, accessibility, security, and SRE evidence before product claims pass.</div>`;
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

function showGoalAuditResult(message, isError) {
  $("goalAuditResult").innerHTML = `<div class="${isError ? "alert" : ""}">${escapeHtml(message)}</div>`;
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
