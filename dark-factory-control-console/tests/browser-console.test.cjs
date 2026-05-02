const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");

module.paths.push(path.join(os.homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "node", "node_modules"));
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto("http://127.0.0.1:4187/", { waitUntil: "networkidle" });

  assert((await page.locator("h1").textContent()).includes("Meta-Meta First"), "console title should render");
  assert((await page.locator("#skillCount").textContent()).includes("Skills:"), "skill count should render");
  assert((await page.locator("#agentSwarm").textContent()).includes("Meta-Attractor"), "agent swarm should render the meta-attractor");
  assert((await page.locator("#flowMap").textContent()).includes("Meta-Meta Attractor"), "critical path should render the stage map");
  assert((await page.locator("#legalNextAction").textContent()).trim().length > 5, "command deck should render the next legal action");
  assert((await page.locator("#protocolAguiStatus").textContent()).includes("AG-UI"), "protocol workbench should render AG-UI status");

  await page.fill("#projectName", "Browser Smoke Governed Product");
  await page.fill("#intent", "Build a governed UI product through meta-meta first sequencing, customer grilling, artifact gates, testing evidence, dashboard control, and redo closure.");
  await page.click("#createRun");
  await page.waitForFunction(() => document.querySelector("#runState")?.textContent.includes("interrogating"));
  await page.waitForFunction(() => document.querySelector("#swarmStatus")?.textContent.includes("interrogating"));
  await page.waitForFunction(() => document.querySelector("#protocolAguiStatus")?.textContent.includes("events"));
  await page.fill("#agentMessage", "Explain the active stage and what the legal next action is.");
  await page.click("#sendAgentMessage");
  await page.waitForFunction(() => document.querySelector("#agentResponse")?.textContent.includes("Current legal focus"));
  await page.waitForFunction(() => document.querySelector("#aguiEventStream")?.textContent.includes("USER_MESSAGE"));
  await page.click("#executePipeline");
  await page.waitForFunction(() => document.querySelector("#currentStage")?.textContent.includes("01-interrogation"));
  await page.waitForFunction(() => document.querySelector("#activeAgent")?.textContent.includes("Spec Interrogator"));

  const fields = await page.locator("[data-question]").elementHandles();
  for (const field of fields) {
    const qid = await field.getAttribute("data-question");
    if (["ANS-001", "ANS-002", "ANS-003", "ANS-004", "ANS-005", "ANS-006", "ANS-007", "ANS-008", "ANS-009", "ANS-010"].includes(qid)) {
      await field.fill(`${qid} answer with concrete scope, owner, tests, token approval, and evidence obligations.`);
      await field.dispatchEvent("change");
    }
  }

  await page.waitForFunction(() => document.querySelector("#completionScore")?.textContent.trim() === "100%");
  await page.click("#executePipeline");
  await page.waitForFunction(() => Number(document.querySelector("#recordCount")?.textContent || "0") >= 5);
  await page.click("#runRalphAudit");
  await page.waitForFunction(() => document.querySelector("#auditResult")?.textContent.includes("20 RALPH loops executed"));
  const validateStatus = await page.evaluate(async () => {
    const bootstrap = await fetch("/api/bootstrap").then((response) => response.json());
    const runId = bootstrap.runs[0].run_id;
    const validation = await fetch(`/api/runs/${encodeURIComponent(runId)}/validate`).then((response) => response.json());
    return validation.status;
  });
  assert.strictEqual(validateStatus, "pass", "validate endpoint should expose a passing run validator");

  await page.click("#redoClosure");
  await page.waitForFunction(() => document.querySelector("#redoResult")?.textContent.includes("Impacted nodes:"));

  assert((await page.locator("#portalStatus").textContent()).length > 1, "project portal status should render");
  await page.fill("#changeTitle", "Browser design resteer");
  await page.selectOption("#changeImpact", "design");
  await page.selectOption("#changeTargetStage", "stage-04-artifacts");
  await page.fill("#changeNode", "02-prd.md");
  await page.fill("#changeRequested", "Reopen the design artifact stage and all downstream review, testing, handoff, and dashboard records.");
  await page.fill("#changeReason", "Browser smoke test proves a human can resteer the project after reviewing portal evidence.");
  await page.click("#openChangeRequest");
  await page.waitForFunction(() => document.querySelector("#changeResult")?.textContent.includes("Opened CR-"));
  await page.waitForFunction(() => document.querySelector("#portalStatus")?.textContent.includes("change_control"));
  await page.waitForFunction(() => document.querySelector("#legalNextAction")?.textContent.includes("active change request"));
  await page.waitForFunction(() => document.querySelector("#changeRequestList")?.textContent.includes("Browser design resteer"));
  await page.click("#runGoalRalphAudit");
  await page.waitForFunction(() => document.querySelector("#goalAuditResult")?.textContent.includes("Goal achieved: yes"));
  const portalAfterChange = await page.evaluate(async () => {
    const bootstrap = await fetch("/api/bootstrap").then((response) => response.json());
    const runId = bootstrap.runs[0].run_id;
    return fetch(`/api/runs/${encodeURIComponent(runId)}/portal`).then((response) => response.json());
  });
  assert.strictEqual(portalAfterChange.change_requests[0].target_stage, "stage-04-artifacts", "change request should preserve the selected reopen stage");
  assert.strictEqual(portalAfterChange.progress.accepted_stages, 4, "design resteer should preserve accepted predecessor stages");

  const artifacts = path.join(__dirname, "..", "artifacts");
  fs.mkdirSync(artifacts, { recursive: true });
  await page.screenshot({ path: path.join(artifacts, "browser-console-smoke.png"), fullPage: true });
  await page.setViewportSize({ width: 390, height: 900 });
  await page.screenshot({ path: path.join(artifacts, "browser-console-mobile-smoke.png"), fullPage: true });
  await browser.close();
  console.log("browser-console smoke passed");
})().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
