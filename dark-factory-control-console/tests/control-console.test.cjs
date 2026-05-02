const assert = require("assert");
const fs = require("fs");
const path = require("path");

const consoleApp = require("../server");

function main() {
  const skills = consoleApp.loadSkills();
  assert(skills.some((skill) => skill.name === "df-meta-attractor"), "df-meta-attractor should be loaded");
  assert(skills.some((skill) => skill.name === "df-dashboard-control"), "df-dashboard-control should be loaded");

  const packet = consoleApp.buildInvocationPacket({
    run_id: "TEST-RUN",
    project_name: "Console Test",
    project_type: "greenfield",
    intent: "Build a governed product through the dark factory.",
    token_swag: { band: "medium", reapproval_trigger: "scope change" }
  }, {});
  assert.strictEqual(packet.meta_meta_first, true, "invocation packet must enforce meta-meta first");
  assert.strictEqual(packet.entry_skill, "df-meta-attractor", "entry skill must be df-meta-attractor");
  assert.strictEqual(packet.required_sequence[0].skills[0], "df-meta-attractor", "first stage must be meta-meta");
  assert(packet.agent_protocols.agui, "invocation packet should expose AG-UI protocol contract");
  assert(packet.agent_protocols.a2ui, "invocation packet should expose A2UI protocol contract");
  assert(packet.agent_protocols.mcp_apps, "invocation packet should expose MCP Apps protocol contract");

  const run = consoleApp.createRun({
    projectName: "Console Test",
    projectType: "greenfield",
    tokenBand: "medium",
    intent: "Build a governed product with UI, API, tests, artifacts, dashboard, redo closure, and production handoff."
  });
  assert.strictEqual(run.current_stage, "stage-00-meta-meta", "new runs start at meta-meta");
  assert.strictEqual(run.stages[1].status, "locked", "child stages start locked");
  assert(run.agui_events.some((event) => event.type === "RUN_STARTED"), "new runs should start an AG-UI event stream");
  const initialProtocol = consoleApp.buildProtocolState(run.run_id);
  assert(initialProtocol.a2ui_surfaces.some((surface) => surface.surface_id === "current-stage-report"), "protocol state should expose A2UI stage report surface");
  assert(initialProtocol.mcp_apps.tools.some((tool) => tool.name === "dfms.askAgent"), "protocol state should expose MCP Apps askAgent tool");

  let advanced = consoleApp.invokeStage(run.run_id, "stage-00-meta-meta");
  assert(advanced.execution_outputs.some((record) => record.includes("meta-attractor-run-record.json")), "meta-meta execution should create an attractor record");
  advanced = consoleApp.advanceRun(run.run_id);
  assert.strictEqual(advanced.current_stage, "stage-01-interrogation", "meta-meta gate advances to customer grill");

  for (const question of consoleApp.QUESTIONS.filter((item) => item.required)) {
    advanced = consoleApp.answerQuestion(advanced.run_id, {
      questionId: question.id,
      value: `${question.label} answer with concrete project-specific evidence and approval detail.`
    });
  }
  assert(advanced.interrogation.completeness >= 85, "required answer completeness should pass");
  assert.strictEqual(advanced.interrogation.gate, "pass", "interrogation gate should pass after required answers");

  advanced = consoleApp.invokeStage(advanced.run_id, "stage-01-interrogation");
  advanced = consoleApp.advanceRun(advanced.run_id);
  assert.strictEqual(advanced.current_stage, "stage-02-engagement", "interrogation stage should advance after invocation");

  advanced = consoleApp.executeReadyPipeline(advanced.run_id);
  assert(advanced.execution_outputs.some((record) => record.includes("engagement-governance-record.json")), "pipeline should execute governance records");
  assert(advanced.execution_outputs.some((record) => record.includes("agent-protocol-session-record.json")), "pipeline should execute protocol session records");
  assert(advanced.generated_meta_skill.name.startsWith("generated-"), "generated meta skill should be attached to the run");
  assert.strictEqual(advanced.status, "ready_for_handoff", "pipeline should reach handoff readiness after answers are complete");
  const interaction = consoleApp.createAgentMessage(advanced.run_id, {
    mode: "resteer",
    message: "Resteer the design and reopen the PRD downstream review path."
  });
  assert(interaction.interaction.response.resteer_recommended, "agent interrogation should detect a resteer path");
  advanced = consoleApp.loadRun ? consoleApp.loadRun(advanced.run_id) : interaction.run;
  advanced = interaction.run;
  const validation = consoleApp.validateRunExecution(advanced.run_id);
  assert.strictEqual(validation.status, "pass", `execution validator should pass: ${JSON.stringify(validation.findings)}`);
  const ralph = consoleApp.runRalphAudit(advanced.run_id, 20);
  assert.strictEqual(ralph.audit.loops.length, 20, "RALPH audit should run 20 loops");
  assert.strictEqual(ralph.audit.status, "pass", `RALPH audit should pass: ${JSON.stringify(ralph.audit.base_validation.findings)}`);
  assert(fs.existsSync(path.join(__dirname, "..", "..", ralph.record)), "RALPH audit record should be written");

  const portal = consoleApp.buildProjectPortal(advanced.run_id);
  assert.strictEqual(portal.portal_type, "dfms_human_project_control_portal", "portal should expose human control contract");
  assert.strictEqual(portal.progress.accepted_stages, consoleApp.STAGES.length, "portal should show all stages accepted before change");
  assert(portal.next_actions.some((action) => action.includes("handoff") || action.includes("change request")), "portal should expose legal human next actions");

  const change = consoleApp.createChangeRequest(advanced.run_id, {
    title: "Test design resteer",
    impactArea: "design",
    targetStage: "stage-04-artifacts",
    selectedNode: "02-prd.md",
    tokenDelta: "medium",
    approvalOwner: "human-owner",
    requestedChange: "Reopen design artifacts and downstream quality gates after human review.",
    reason: "Human owner changed the design direction from the portal."
  });
  assert.strictEqual(change.run.status, "change_control", "change requests should put the run into change control");
  assert.strictEqual(change.run.current_stage, "stage-04-artifacts", "design change should reopen from artifact stage");
  assert.strictEqual(change.run.stages[4].status, "active", "target stage should be active after change");
  assert.strictEqual(change.run.stages[5].status, "locked", "downstream stages should lock until re-executed");
  assert(change.change_request.reopened_stages.includes("stage-07-dashboard-redo"), "redo/handoff stage should be in the transitive reopen set");
  assert(change.portal.change_requests.length >= 1, "portal should list opened change requests");
  assert(change.run.execution_outputs.some((record) => record.includes("human-communication-record.json")), "human communication evidence should be recorded");
  const changeValidation = consoleApp.validateRunExecution(change.run.run_id);
  assert.notStrictEqual(changeValidation.status, "fail", `change-control run should not fail structural validation: ${JSON.stringify(changeValidation.findings)}`);

  const summary = consoleApp.projectBookSummary();
  assert(summary.nodes > 0, "project-book dashboard should expose nodes");
  assert(summary.edges > 0, "project-book dashboard should expose edges");

  const createdRunPath = path.join(__dirname, "..", "runs", `${run.run_id}.json`);
  assert(fs.existsSync(createdRunPath), "run ledger should be written to disk");
  fs.unlinkSync(createdRunPath);
  fs.rmSync(path.join(__dirname, "..", "runs", run.run_id), { recursive: true, force: true });
  console.log("control-console tests passed");
}

main();
