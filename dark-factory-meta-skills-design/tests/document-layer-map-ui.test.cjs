const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");

module.paths.push(path.join(os.homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "node", "node_modules"));
const { chromium } = require("playwright");

(async () => {
  const root = path.join(__dirname, "..");
  const pagePath = path.join(root, "interactive-layer-map", "index.html");
  const pageTarget = process.env.LAYER_MAP_URL || `file://${pagePath}`;
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(pageTarget, { waitUntil: "networkidle" });

  assert((await page.locator("h1").textContent()).includes("Document Generation Hierarchy"), "title should render");
  assert((await page.locator("#hierarchy").textContent()).includes("Meta-Meta Skill Execution"), "meta-meta layer should render");
  assert((await page.locator("#hierarchy").textContent()).includes("Generated Meta-Skill Template Execution"), "meta-skill layer should render");
  assert((await page.locator("#hierarchy").textContent()).includes("Product-Specific Skill Execution"), "product-skill layer should render");

  await page.fill("#searchBox", "WYSIWYG");
  assert((await page.locator("#artifactList").textContent()).includes("WYSIWYG"), "search should surface WYSIWYG artifacts");

  await page.click('[data-focus="l2"]');
  const visibleTiers = await page.locator(".tier:not(.is-hidden)").count();
  assert.strictEqual(visibleTiers, 2, "focus should show raw input plus selected layer");

  await page.click("#traceExample");
  assert((await page.locator("#detailTitle").textContent()).includes("Product-Specific Skill Execution"), "trace button should focus product execution");
  assert((await page.locator("#exampleList").textContent()).includes("app/index.html"), "todo plus habits example should show app files");

  await page.click("#collapseAll");
  const openAfterCollapse = await page.locator("details[open]").count();
  assert.strictEqual(openAfterCollapse, 0, "collapse should close all artifact groups");
  await page.click("#expandAll");
  const openAfterExpand = await page.locator("details[open]").count();
  assert(openAfterExpand > 0, "expand should open artifact groups");

  const artifactsDir = path.join(root, "artifacts");
  fs.mkdirSync(artifactsDir, { recursive: true });
  await page.screenshot({ path: path.join(artifactsDir, "document-layer-map-desktop.png"), fullPage: true });
  await page.setViewportSize({ width: 390, height: 900 });
  const bodyWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  assert(bodyWidth <= 430, `mobile page should not create broad horizontal overflow, saw ${bodyWidth}`);
  await page.screenshot({ path: path.join(artifactsDir, "document-layer-map-mobile.png"), fullPage: true });

  await browser.close();
  console.log("document-layer-map UI test passed");
})().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
