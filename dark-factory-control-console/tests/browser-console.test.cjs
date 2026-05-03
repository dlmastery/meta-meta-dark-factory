const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");

module.paths.push(path.join(os.homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "node", "node_modules"));
const { chromium } = require("playwright");
const consoleApp = require("../server");

let browser;
let server;

(async () => {
  server = process.env.DFMS_BROWSER_BASE_URL ? null : consoleApp.createServer();
  if (server) {
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  }
  const baseUrl = process.env.DFMS_BROWSER_BASE_URL || `http://127.0.0.1:${server.address().port}/`;
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(baseUrl, { waitUntil: "networkidle" });

  assert((await page.locator("h1").textContent()).includes("Dark Factory Studio"), "studio title should render");
  assert((await page.locator("#studio-title").textContent()).includes("Describe the mission"), "mission composer should lead the first screen");
  assert((await page.locator("#cockpit-title").textContent()).includes("what is blocked"), "control cockpit should explain the no-skip work state");
  assert((await page.locator("#cockpitLegalAction").textContent()).trim().length > 5, "control cockpit should show the legal next action");
  assert((await page.locator("#hawkeyeState").textContent()).trim().length > 2, "Hawkeye auditor state should render");
  assert((await page.locator("#studioPrimaryAction").textContent()).trim().length > 5, "studio primary action should be visible");
  assert((await page.locator("#skillCount").textContent()).includes("Skills:"), "skill count should render");
  assert((await page.locator("#agentSwarm").textContent()).includes("Meta-Attractor"), "agent swarm should render the meta-attractor");
  assert((await page.locator("#flowMap").textContent()).includes("Meta-Meta Attractor"), "critical path should render the stage map");
  assert((await page.locator("#legalNextAction").textContent()).trim().length > 5, "command deck should render the next legal action");
  assert((await page.locator("#protocolAguiStatus").textContent()).includes("AG-UI"), "protocol workbench should render AG-UI status");
  assert((await page.locator("#truth-title").textContent()).includes("Recovery Truth"), "truth inventory should render");
  assert((await page.locator("#agentic-workbench-title").textContent()).includes("Agentic SDLC"), "agentic workbench should render");
  assert((await page.locator("#scenarioCards").textContent()).includes("Build a new product"), "scenario router should render");
  assert((await page.locator("#providerQuorumBoard").textContent()).includes("OpenAI"), "provider quorum should render");
  assert((await page.locator("#specGraphExplorer").textContent()).includes("nodes"), "Spec Graph explorer should render");

  await page.click('[data-panel-target="start"]');
  await page.fill("#projectName", "Browser Smoke Governed Product");
  await page.selectOption("#scenarioMode", "greenfield-product");
  await page.selectOption("#templateId", "agentic-sdlc-factory");
  await page.selectOption("#providerQuorum", "three-provider-merge");
  await page.fill("#intent", "Build a governed UI product through meta-meta first sequencing, customer grilling, artifact gates, testing evidence, dashboard control, and redo closure.");
  await page.click("#createRun");
  await page.waitForFunction(() => document.querySelector("#runState")?.textContent.includes("interrogating"));
  await page.waitForFunction(() => document.querySelector("#swarmStatus")?.textContent.includes("interrogating"));
  await page.waitForFunction(() => document.querySelector("#protocolAguiStatus")?.textContent.includes("events"));
  await page.waitForFunction(() => document.querySelector("#humanInterrupts")?.textContent.includes("approve_factory_scenario"));
  await page.click('[data-interrupt-decision="approve"]');
  await page.waitForFunction(() => document.querySelector("#aguiEventStream")?.textContent.includes("HUMAN_DECISION_RECORDED"));
  await page.click('[data-panel-target="debug"]');
  await page.fill("#agentMessage", "Explain the active stage and what the legal next action is.");
  await page.click("#sendAgentMessage");
  await page.waitForFunction(() => document.querySelector("#agentResponse")?.textContent.includes("Current legal focus"));
  await page.waitForFunction(() => document.querySelector("#aguiEventStream")?.textContent.includes("USER_MESSAGE"));
  await page.click('[data-panel-target="evidence"]');
  await page.click("#executePipeline");
  await page.waitForFunction(() => document.querySelector("#currentStage")?.textContent.includes("01-interrogation"));
  await page.waitForFunction(() => document.querySelector("#activeAgent")?.textContent.includes("Spec Interrogator"));

  await page.click('[data-panel-target="start"]');
  const fields = await page.locator("[data-question]").elementHandles();
  for (const field of fields) {
    const qid = await field.getAttribute("data-question");
    if (["ANS-001", "ANS-002", "ANS-003", "ANS-004", "ANS-005", "ANS-006", "ANS-007", "ANS-008", "ANS-009", "ANS-010"].includes(qid)) {
      await field.fill(`${qid} answer with concrete scope, owner, tests, token approval, and evidence obligations.`);
      await field.dispatchEvent("change");
    }
  }

  await page.waitForFunction(() => document.querySelector("#completionScore")?.textContent.trim() === "100%");
  await page.waitForFunction(() => document.querySelector("#interrogationApproval")?.textContent.includes("approval_required"));
  await page.click("#approveInterrogation");
  await page.waitForFunction(() => document.querySelector("#interrogationApproval")?.textContent.includes("approved"));
  await page.waitForFunction(() => document.querySelector("#interrogationProtocolSummary")?.textContent.includes("trace links"));
  await page.click('[data-panel-target="evidence"]');
  await page.click("#executePipeline");
  await page.waitForFunction(() => Number(document.querySelector("#recordCount")?.textContent || "0") >= 5);
  await page.waitForFunction(() => document.querySelector("#buildTestEvidence")?.textContent.includes("working_implementation_local"));
  await page.waitForFunction(() => document.querySelector("#buildTestEvidence")?.textContent.includes("generated files"));
  await page.waitForFunction(() => document.querySelector("#cockpitEvidenceMeta")?.textContent.includes("working_implementation_local"));
  await page.waitForFunction(() => document.querySelector("#rbClosureBoard")?.textContent.includes("RB-07"));
  await page.waitForFunction(() => document.querySelector("#stageAssuranceBoard")?.textContent.includes("Build, Test, Evidence"));
  await page.waitForFunction(() => document.querySelector("#executionRecords")?.textContent.includes("scenario-test-matrix.json"));
  await page.click("#runRalphAudit");
  await page.waitForFunction(() => document.querySelector("#auditResult")?.textContent.includes("20 RALPH loops executed"));
  const validateStatus = await page.evaluate(async () => {
    const bootstrap = await fetch("/api/bootstrap").then((response) => response.json());
    const runId = bootstrap.runs[0].run_id;
    const validation = await fetch(`/api/runs/${encodeURIComponent(runId)}/validate`).then((response) => response.json());
    return validation.status;
  });
  assert.strictEqual(validateStatus, "pass", "validate endpoint should expose a passing run validator");

  await page.click('[data-panel-target="graph"]');
  await page.click("#redoClosure");
  await page.waitForFunction(() => document.querySelector("#redoResult")?.textContent.includes("Impacted nodes:"));

  assert((await page.locator("#portalStatus").textContent()).length > 1, "project portal status should render");
  await page.click('[data-panel-target="change"]');
  await page.fill("#changeTitle", "Browser design resteer");
  await page.selectOption("#changeImpact", "design");
  await page.selectOption("#changeTargetStage", "stage-04-artifacts");
  await page.fill("#changeNode", "02-prd.md");
  await page.fill("#changeRequested", "Reopen the design artifact stage and all downstream review, testing, handoff, and dashboard records.");
  await page.fill("#changeReason", "Browser smoke test proves a human can resteer the project after reviewing portal evidence.");
  await page.click("#openChangeRequest");
  await page.waitForFunction(() => document.querySelector("#changeResult")?.textContent.includes("Opened CR-"));
  await page.click('[data-panel-target="evidence"]');
  await page.waitForFunction(() => document.querySelector("#portalStatus")?.textContent.includes("change_control"));
  await page.waitForFunction(() => document.querySelector("#legalNextAction")?.textContent.includes("active change request"));
  await page.waitForFunction(() => document.querySelector("#changeRequestList")?.textContent.includes("Browser design resteer"));
  await page.click("#runGoalRalphAudit");
  await page.waitForFunction(() => document.querySelector("#goalAuditResult")?.textContent.includes("Goal achieved: yes"));
  await page.waitForFunction(() => document.querySelector("#trustNowList")?.textContent.includes("artifact_saturation"));
  await page.waitForFunction(() => document.querySelector("#proofClassCounts")?.textContent.includes("descriptor_only"));
  const portalAfterChange = await page.evaluate(async () => {
    const bootstrap = await fetch("/api/bootstrap").then((response) => response.json());
    const runId = bootstrap.runs[0].run_id;
    return fetch(`/api/runs/${encodeURIComponent(runId)}/portal`).then((response) => response.json());
  });
  assert.strictEqual(portalAfterChange.portal_control_model.model_type, "dfms_portal_control_model_v1", "portal should expose a machine-readable control model");
  assert(portalAfterChange.portal_control_model.recovery_batches.some((batch) => batch.id === "RB-07"), "portal control model should expose RB-07");
  assert(portalAfterChange.portal_control_model.recovery_batches.some((batch) => batch.id === "RB-08" && batch.status === "accepted"), "portal should truthfully show RB-08 saturation as accepted after evidence exists");
  assert(portalAfterChange.portal_control_model.recovery_batches.some((batch) => batch.id === "RB-09" && batch.status === "accepted_for_local_public_package"), "portal should truthfully show RB-09 local/public hardening as accepted after validation exists");
  assert(portalAfterChange.portal_control_model.blocker_board.some((item) => item.source === "full_product_platform"), "portal should move the remaining blocker to the full hosted product platform after RB-09");
  assert.strictEqual(portalAfterChange.change_requests[0].target_stage, "stage-04-artifacts", "change request should preserve the selected reopen stage");
  assert.strictEqual(portalAfterChange.progress.accepted_stages, 4, "design resteer should preserve accepted predecessor stages");

  const artifacts = path.join(__dirname, "..", "artifacts");
  fs.mkdirSync(artifacts, { recursive: true });
  await page.screenshot({ path: path.join(artifacts, "browser-console-smoke.png"), fullPage: true });
  await page.setViewportSize({ width: 390, height: 900 });
  await page.screenshot({ path: path.join(artifacts, "browser-console-mobile-smoke.png"), fullPage: true });
  await browser.close();
  if (server) await new Promise((resolve) => server.close(resolve));
  console.log("browser-console smoke passed");
})().catch(async (error) => {
  if (browser) await browser.close().catch(() => {});
  if (server) await new Promise((resolve) => server.close(resolve)).catch(() => {});
  console.error(error);
  process.exit(1);
});
