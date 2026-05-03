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
  assert(packet.agentic_ui_contract.required_surfaces.includes("human-interrupt-inbox"), "agentic UI contract should require human interrupts");
  assert(packet.agentic_ui_contract.required_surfaces.includes("spec-graph-impact-explorer"), "agentic UI contract should require Spec Graph impact");
  assert(packet.agentic_ui_contract.required_surfaces.includes("legal-next-action-cockpit"), "agentic UI contract should require the legal next-action cockpit");
  assert(packet.agentic_ui_contract.required_surfaces.includes("hawkeye-conformance-auditor"), "agentic UI contract should require Hawkeye auditor visibility");
  assert(packet.spec_graph_layer.node_identity_format, "invocation packet should carry Spec Graph identity rules");
  const platformBeforeRun = consoleApp.buildProductPlatformState();
  assert.strictEqual(platformBeforeRun.platform_status, "pb01_local_spine_running", "PB-01 product platform spine should be an actual local runtime state");
  assert(platformBeforeRun.capabilities.some((capability) => capability.id === "PB01-CAP-004"), "platform spine should include human collaboration capability");

  const run = consoleApp.createRun({
    projectName: "Console Test",
    projectType: "greenfield",
    scenarioMode: "greenfield-product",
    templateId: "agentic-sdlc-factory",
    providerQuorum: "three-provider-merge",
    tokenBand: "medium",
    intent: "Build a governed product with UI, API, tests, artifacts, dashboard, redo closure, and production handoff."
  });
  assert.strictEqual(run.current_stage, "stage-00-meta-meta", "new runs start at meta-meta");
  assert.strictEqual(run.stages[1].status, "locked", "child stages start locked");
  assert(run.agui_events.some((event) => event.type === "RUN_STARTED"), "new runs should start an AG-UI event stream");
  const initialProtocol = consoleApp.buildProtocolState(run.run_id);
  assert(initialProtocol.a2ui_surfaces.some((surface) => surface.surface_id === "current-stage-report"), "protocol state should expose A2UI stage report surface");
  assert(initialProtocol.a2ui_surfaces.some((surface) => surface.surface_id === "human-interrupt-inbox"), "protocol state should expose a human interrupt inbox");
  assert(initialProtocol.a2ui_surfaces.some((surface) => surface.surface_id === "spec-graph-impact-explorer"), "protocol state should expose Spec Graph impact");
  assert(initialProtocol.a2ui_surfaces.some((surface) => surface.surface_id === "legal-next-action-cockpit"), "protocol state should expose the legal cockpit surface");
  assert(initialProtocol.a2ui_surfaces.some((surface) => surface.surface_id === "hawkeye-conformance-auditor"), "protocol state should expose Hawkeye auditor surface");
  assert(initialProtocol.a2ui_surfaces.some((surface) => surface.surface_id === "rb-closure-board"), "protocol state should expose recovery closure surface");
  assert(initialProtocol.a2ui_surfaces.some((surface) => surface.surface_id === "product-platform-spine"), "protocol state should expose PB-01 product platform spine surface");
  assert(initialProtocol.mcp_apps.tools.some((tool) => tool.name === "dfms.askAgent"), "protocol state should expose MCP Apps askAgent tool");
  assert(initialProtocol.mcp_apps.tools.some((tool) => tool.name === "dfms.decideInterrupt"), "protocol state should expose MCP Apps decideInterrupt tool");
  assert(initialProtocol.mcp_apps.tools.some((tool) => tool.name === "dfms.addPlatformComment"), "protocol state should expose platform comment tool");
  assert.strictEqual(initialProtocol.product_platform_spine.platform_status, "pb01_local_spine_running", "protocol state should carry the platform spine");
  assert(initialProtocol.human_interrupts.some((item) => item.state === "pending"), "new runs should pause on the first human interrupt");
  assert.strictEqual(initialProtocol.execution_legal_state.current_stage, "stage-00-meta-meta", "legal state should expose the stage cursor");
  assert.strictEqual(initialProtocol.execution_legal_state.can_invoke_current_stage, false, "pending interrupt should block initial invocation");
  assert(initialProtocol.execution_legal_state.blockers.some((item) => item.code === "HUMAN_INTERRUPT_PENDING"), "legal state should name the pending human decision blocker");

  const interruptDecision = consoleApp.decideHumanInterrupt(run.run_id, {
    interruptId: initialProtocol.human_interrupts[0].interrupt_id,
    decision: "approve",
    note: "Test owner approves scenario/template/provider quorum."
  });
  assert.strictEqual(interruptDecision.decision.decision, "approve", "human interrupt approval should be recorded");
  assert(interruptDecision.run.agui_events.some((event) => event.type === "HUMAN_DECISION_RECORDED"), "interrupt decision should create AG-UI evidence");
  const legalAfterInterrupt = consoleApp.computeLegalState(run.run_id);
  assert.strictEqual(legalAfterInterrupt.can_invoke_current_stage, true, "resolved interrupt should unlock only the current stage");
  const futureLegal = consoleApp.computeLegalState(run.run_id, "stage-01-interrogation");
  assert.strictEqual(futureLegal.requested_stage_allowed, false, "future stage request should be illegal");
  assert.throws(
    () => consoleApp.invokeStage(run.run_id, "stage-01-interrogation"),
    /FUTURE_STAGE_LOCKED|only legal invocation cursor/,
    "future stages must not be invokable before predecessor acceptance"
  );

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
  assert.strictEqual(advanced.interrogation.gate, "approval_required", "interrogation should require explicit human approval after required answers");
  assert(advanced.interrogation.decomposition_tree.root.children.length >= 10, "interrogation should build recursive decomposition axes");
  assert(advanced.interrogation.trace_links.length >= 10, "interrogation should trace answers to downstream requirement seeds");
  assert.throws(
    () => consoleApp.invokeStage(advanced.run_id, "stage-01-interrogation"),
    /INTERROGATION_NOT_APPROVED|approval_required|Customer grill/,
    "customer grill stage must not execute until the baseline is approved"
  );
  advanced = consoleApp.approveInterrogation(advanced.run_id, {
    owner: "human-owner",
    note: "Test owner approves the interrogation baseline."
  });
  assert.strictEqual(advanced.interrogation.gate, "pass", "interrogation gate should pass after explicit baseline approval");
  assert.strictEqual(advanced.interrogation.approval.state, "approved", "approval state should be recorded");

  advanced = consoleApp.invokeStage(advanced.run_id, "stage-01-interrogation");
  advanced = consoleApp.advanceRun(advanced.run_id);
  assert.strictEqual(advanced.current_stage, "stage-02-engagement", "interrogation stage should advance after invocation");

  advanced = consoleApp.executeReadyPipeline(advanced.run_id);
  assert(advanced.execution_outputs.some((record) => record.includes("engagement-governance-record.json")), "pipeline should execute governance records");
  assert(advanced.execution_outputs.some((record) => record.includes("agent-protocol-session-record.json")), "pipeline should execute protocol session records");
  const artifactBomRel = advanced.execution_outputs.find((record) => record.endsWith("artifact-bom.json"));
  assert(artifactBomRel, "pipeline should generate the artifact BOM record");
  const artifactBom = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", artifactBomRel), "utf8")).artifact_bom;
  assert(artifactBom.artifact_count >= 100, "artifact BOM should carry the full governed artifact catalog");
  assert(artifactBom.artifacts.every((artifact) => artifact.rubric_15.length >= 15), "every artifact should carry a 15-point rubric");
  assert(artifactBom.artifacts.every((artifact) => artifact.template.sections.length >= 10), "every artifact should carry a reusable template structure");
  const qualityGateRel = advanced.execution_outputs.find((record) => record.endsWith("quality-refinery-gate.json"));
  assert(qualityGateRel, "pipeline should generate the quality refinery gate");
  const reviewEngine = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", qualityGateRel), "utf8")).review_engine;
  assert(reviewEngine.assignment_count >= artifactBom.artifact_count, "review engine should cover the artifact catalog");
  assert(reviewEngine.assignments.every((assignment) => assignment.independent_expert_panel.length >= 3), "every artifact should get three independent experts");
  assert(reviewEngine.assignments.every((assignment) => assignment.adversarial_critic_panel.length >= 2), "every artifact should get adversarial critics");
  assert(reviewEngine.assignments.every((assignment) => assignment.ralph_loop_plan.length >= 5), "every artifact should get a five-loop RALPH plan");
  const implementationRel = advanced.execution_outputs.find((record) => record.endsWith("implementation-execution-record.json"));
  const buildRel = advanced.execution_outputs.find((record) => record.endsWith("build-verification-record.json"));
  const scenarioRel = advanced.execution_outputs.find((record) => record.endsWith("scenario-test-matrix.json"));
  const wysiwygRel = advanced.execution_outputs.find((record) => record.endsWith("wysiwyg-browser-test-record.json"));
  const accessibilitySecurityRel = advanced.execution_outputs.find((record) => record.endsWith("accessibility-security-evidence-record.json"));
  const sreRel = advanced.execution_outputs.find((record) => record.endsWith("production-sre-handoff-record.json"));
  assert(implementationRel, "pipeline should generate implementation execution evidence");
  assert(buildRel, "pipeline should generate build verification evidence");
  assert(scenarioRel, "pipeline should generate scenario test matrix evidence");
  assert(wysiwygRel, "pipeline should generate WYSIWYG browser evidence");
  assert(accessibilitySecurityRel, "pipeline should generate accessibility/security evidence");
  assert(sreRel, "pipeline should generate production/SRE handoff evidence");
  assert.strictEqual(advanced.build_test_evidence.proof_class, "working_implementation_local", "stage-06 should produce working local implementation proof");
  assert.strictEqual(advanced.build_test_evidence.build_status, "pass", "generated implementation tests should pass");
  assert(advanced.build_test_evidence.generated_files.some((file) => file.path.endsWith("src/product-core.cjs")), "generated source code should exist");
  assert(advanced.build_test_evidence.generated_files.some((file) => file.path.endsWith("tests/product-core.test.cjs")), "generated unit tests should exist");
  assert(advanced.build_test_evidence.scenario_coverage.some((item) => item.type === "holdout" && item.status === "pass"), "holdout scenario evidence should pass");
  assert(advanced.build_test_evidence.scenario_coverage.some((item) => item.type === "transfer" && item.status === "pass"), "transfer scenario evidence should pass");
  const buildRecord = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", buildRel), "utf8"));
  assert.strictEqual(buildRecord.status, "pass", "build verification record should be passing");
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
  assert.strictEqual(portal.portal_control_model.model_type, "dfms_portal_control_model_v1", "portal should expose the machine-readable cockpit model");
  assert(portal.portal_control_model.first_viewport_contract.length >= 5, "portal cockpit should define first-viewport obligations");
  assert(portal.portal_control_model.recovery_batches.some((batch) => batch.id === "RB-07" && batch.status === "accepted_for_local_control_model_slice"), "RB-07 local portal control model slice should be visible");
  assert(portal.portal_control_model.recovery_batches.some((batch) => batch.id === "PB-01" && batch.status === "accepted_for_local_product_spine"), "portal should expose PB-01 local product platform spine as accepted only within its boundary");
  assert.strictEqual(portal.portal_control_model.product_platform_spine.platform_status, "pb01_local_spine_running", "portal should expose product platform spine state");
  assert(portal.portal_control_model.assurance.build_test_status === "pass", "portal cockpit should surface build/test status");
  assert(portal.portal_control_model.stage_assurance.length === consoleApp.STAGES.length, "portal cockpit should show every factory stage");
  assert.strictEqual(portal.progress.accepted_stages, consoleApp.STAGES.length, "portal should show all stages accepted before change");
  assert.strictEqual(portal.execution_legal_state.completed, true, "portal legal state should recognize completed stage chain");
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
  const changeLegal = consoleApp.computeLegalState(change.run.run_id);
  assert.strictEqual(changeLegal.current_stage, "stage-04-artifacts", "change control should move the legal cursor to the reopened target stage");
  assert.strictEqual(changeLegal.can_invoke_current_stage, true, "reopened target should be the only invokable stage");
  assert.strictEqual(consoleApp.computeLegalState(change.run.run_id, "stage-06-build-test").requested_stage_allowed, false, "downstream reopened stages stay locked until predecessors pass again");
  assert(change.change_request.reopened_stages.includes("stage-07-dashboard-redo"), "redo/handoff stage should be in the transitive reopen set");
  assert(change.portal.change_requests.length >= 1, "portal should list opened change requests");
  assert(change.run.execution_outputs.some((record) => record.includes("human-communication-record.json")), "human communication evidence should be recorded");
  const changeValidation = consoleApp.validateRunExecution(change.run.run_id);
  assert.notStrictEqual(changeValidation.status, "fail", `change-control run should not fail structural validation: ${JSON.stringify(changeValidation.findings)}`);
  const goalAudit = consoleApp.runGoalAchievementAudit(change.run.run_id, 10);
  assert.strictEqual(goalAudit.audit.loops.length, 10, "goal audit should run 10 RALPH loops");
  assert.strictEqual(goalAudit.audit.status, "pass", `goal audit should pass: ${JSON.stringify(goalAudit.audit.loops.flatMap((loop) => loop.findings))}`);
  assert.strictEqual(goalAudit.audit.achieved, true, "agent-centric workflow goal should be achieved after interrogation and resteer proof");
  assert(goalAudit.run.execution_outputs.some((record) => record.includes("goal-achievement-ralph-10-audit.json")), "goal audit record should be written");
  const truth = consoleApp.buildTruthInventory(goalAudit.run.run_id);
  assert.strictEqual(truth.inventory_type, "dfms_recovery_truth_inventory", "truth endpoint should expose recovery truth inventory");
  assert(truth.truth_rows.some((row) => row.proof_class === "descriptor_only"), "truth inventory must distinguish descriptors from implementation");
  assert(truth.trust_now.some((row) => row.layer === "artifact_saturation" && row.status === "achieved"), "truth inventory must expose RB-08 artifact saturation as achieved after evidence exists");
  assert(truth.trust_now.some((row) => row.layer === "public_hardening" && row.status === "achieved_for_local_public_package"), "truth inventory must expose RB-09 public hardening after validation exists");
  assert(truth.trust_now.some((row) => row.layer === "product_platform_spine" && row.status === "achieved_for_local_product_spine"), "truth inventory must expose PB-01 local product spine without calling it hosted");
  assert.strictEqual(truth.next_recovery_batch.id, "PB-02", "truth inventory should move beyond PB-01 to hosted enterprise runtime after local product spine exists");

  const commentResult = consoleApp.createPlatformComment({
    runId: goalAudit.run.run_id,
    topic: "product_gap",
    comment: "Human reviewer confirms PB-01 local spine exists but hosted auth and database persistence remain PB-02."
  });
  assert(commentResult.platform.human_collaboration.comments.some((comment) => comment.topic === "product_gap"), "platform comments should persist human collaboration evidence");

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
