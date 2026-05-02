const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

function loadPlaywright() {
  try {
    return require("playwright");
  } catch {
    const bundled = "C:/Users/abhir/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright";
    return require(bundled);
  }
}

const { chromium } = loadPlaywright();

(async () => {
  const root = path.resolve(__dirname, "..");
  const evidenceDir = path.join(root, "project-book", "evidence");
  fs.mkdirSync(evidenceDir, { recursive: true });
  let browser;
  try {
    browser = await launchBrowser();
  } catch (error) {
    const blocker = {
      status: "blocked",
      reason: "Browser executable launch failed in this environment.",
      error: error.message.split("\n")[0],
      attemptedBrowsers: [
        "bundled Playwright Chromium",
        "Google Chrome",
        "Microsoft Edge"
      ],
      nextAction: "Run this same script in an environment that permits launching a local browser executable."
    };
    fs.writeFileSync(path.join(evidenceDir, "browser-wysiwyg-blocker.json"), JSON.stringify(blocker, null, 2));
    throw error;
  }
  const results = [];
  const viewports = [
    { name: "desktop", width: 1440, height: 950 },
    { name: "mobile", width: 390, height: 844 }
  ];

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport, acceptDownloads: true });
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));
    await page.goto(pathToFileURL(path.join(root, "app", "index.html")).href);
    await page.waitForSelector("#app");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector("#app");
    await assertVisible(page, "text=Northstar Daily");
    await assertVisible(page, "#task-list .task-card");
    await page.fill("#quick-add-input", "pay property tax p1 today 20m #finance");
    await page.click("#quick-add-form button");
    await assertVisible(page, "text=pay property tax");
    await page.fill("#quick-add-input", "tidy inbox p3 today 15m #home");
    await page.click("#quick-add-form button");
    await assertVisible(page, "text=tidy inbox");
    const completionBefore = await page.textContent("#metric-completion-detail");
    await page.locator("#task-list .task-card", { hasText: "pay property tax" }).locator(".check-button").click();
    await page.waitForFunction((before) => document.querySelector("#metric-completion-detail").textContent !== before, completionBefore);
    await page.locator("#task-list .task-card", { hasText: "pay property tax" }).locator(".check-button").click();
    await page.click("button[data-view='habits']");
    await assertVisible(page, "#habit-board .habit-card");
    await assertVisible(page, "#habit-insight .audit-item");
    const habitBefore = await page.textContent("#metric-habits-detail");
    await page.locator("#habit-board .habit-card").first().locator("button").click();
    await page.waitForFunction((before) => document.querySelector("#metric-habits-detail").textContent !== before, habitBefore);
    await page.click("button[data-view='plan']");
    await page.click("#rebalance-plan");
    await assertVisible(page, "#matrix .matrix-cell");
    await assertVisible(page, "#plan-audit .audit-item");
    await page.click("button[data-view='today']");
    await page.click("button[data-filter='upcoming']");
    await assertVisible(page, "text=tidy inbox");
    await page.click("button[data-view='focus']");
    await assertVisible(page, ".focus-ring");
    await page.click("button[data-view='review']");
    await page.fill("#review-note", `E2E shutdown note ${viewport.name}`);
    await page.click("#save-review");
    await assertVisible(page, `text=E2E shutdown note ${viewport.name}`);
    const downloadPromise = page.waitForEvent("download");
    await page.click("#export-state");
    const download = await downloadPromise;
    assert.equal(download.suggestedFilename(), "northstar-daily-export.json");
    const screenshotPath = path.join(evidenceDir, `wysiwyg-${viewport.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    const overlapRisk = await page.evaluate(() => {
      const bad = [];
      const all = Array.from(document.querySelectorAll("button, input, textarea, .task-title, h1, h2, h3, h4, h5, .metric-card strong"));
      for (const el of all) {
        if (!el.offsetParent && getComputedStyle(el).position !== "fixed") continue;
        const rect = el.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) bad.push(el.outerHTML.slice(0, 120));
        if (el.scrollWidth - el.clientWidth > 2) bad.push(`horizontal-overflow:${el.outerHTML.slice(0, 80)}`);
      }
      return bad;
    });
    results.push({
      viewport,
      consoleErrors,
      overlapRisk,
      screenshotPath
    });
    assert.deepEqual(consoleErrors, []);
    assert.deepEqual(overlapRisk, []);
    await context.close();
  }

  await browser.close();
  fs.writeFileSync(path.join(evidenceDir, "browser-wysiwyg-results.json"), JSON.stringify(results, null, 2));
  console.log("Browser WYSIWYG checks passed.");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

async function assertVisible(page, selector) {
  const element = page.locator(selector).first();
  await element.waitFor({ state: "visible", timeout: 5000 });
  assert.ok(await element.isVisible());
}

async function launchBrowser() {
  const candidates = [
    {},
    { executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" },
    { executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" }
  ];
  let lastError;
  for (const candidate of candidates) {
    try {
      return await chromium.launch(candidate);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}
