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
const root = path.resolve(__dirname, "..");
const evidenceDir = path.join(root, "project-book", "evidence");
fs.mkdirSync(evidenceDir, { recursive: true });

const html = fs.readFileSync(path.join(root, "app", "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "app", "styles.css"), "utf8");
const failures = [];

function fail(message) {
  failures.push(message);
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16) / 255,
    parseInt(clean.slice(2, 4), 16) / 255,
    parseInt(clean.slice(4, 6), 16) / 255
  ];
}

function linear(value) {
  return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
}

function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(linear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground, background) {
  const fg = luminance(foreground);
  const bg = luminance(background);
  const hi = Math.max(fg, bg);
  const lo = Math.min(fg, bg);
  return (hi + 0.05) / (lo + 0.05);
}

function cssVars(source) {
  const vars = {};
  for (const match of source.matchAll(/--([a-z-]+):\s*(#[0-9a-fA-F]{6})/g)) {
    vars[match[1]] = match[2].toLowerCase();
  }
  return vars;
}

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const idSet = new Set(ids);
for (const id of ids) {
  if (ids.filter((candidate) => candidate === id).length > 1) fail(`duplicate id ${id}`);
}

for (const match of html.matchAll(/aria-labelledby="([^"]+)"/g)) {
  for (const ref of match[1].split(/\s+/)) {
    if (!idSet.has(ref)) fail(`aria-labelledby reference does not resolve: ${ref}`);
  }
}

for (const match of html.matchAll(/<(input|textarea)\b([^>]*)>/g)) {
  const attrs = match[2];
  const id = /id="([^"]+)"/.exec(attrs)?.[1];
  const hasName = /aria-label=/.test(attrs) || (id && html.includes(`for="${id}"`));
  if (!hasName) fail(`${match[1]} ${id || "<no id>"} has no accessible name`);
}

for (const match of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
  const attrs = match[1];
  const text = stripTags(match[2]);
  if (!text && !/aria-label=/.test(attrs)) fail(`button has no accessible name: ${attrs}`);
}

const vars = cssVars(css);
const contrastPairs = [
  ["ink on panel", vars.ink, vars.panel, 4.5],
  ["muted on panel", vars.muted, vars.panel, 4.5],
  ["blue on panel", vars.blue, vars.panel, 4.5],
  ["green on panel", vars.green, vars.panel, 4.5],
  ["coral on panel", vars.coral, vars.panel, 4.5],
  ["gold on panel", vars.gold, vars.panel, 4.5],
  ["violet on panel", vars.violet, vars.panel, 4.5],
  ["white on blue", "#ffffff", vars.blue, 4.5],
  ["white on side panel", "#ffffff", "#19232f", 4.5],
  ["brand dark on green", "#102017", "#7fb685", 4.5],
  ["material on primary", vars["md-sys-color-on-primary"], vars["md-sys-color-primary"], 4.5],
  ["material on primary container", vars["md-sys-color-on-primary-container"], vars["md-sys-color-primary-container"], 4.5],
  ["material on secondary", vars["md-sys-color-on-secondary"], vars["md-sys-color-secondary"], 4.5],
  ["material on secondary container", vars["md-sys-color-on-secondary-container"], vars["md-sys-color-secondary-container"], 4.5],
  ["material on tertiary", vars["md-sys-color-on-tertiary"], vars["md-sys-color-tertiary"], 4.5],
  ["material on error", vars["md-sys-color-on-error"], vars["md-sys-color-error"], 4.5],
  ["material on surface", vars["md-sys-color-on-surface"], vars["md-sys-color-surface"], 4.5],
  ["material on surface variant", vars["md-sys-color-on-surface-variant"], vars["md-sys-color-surface"], 4.5]
];

const contrastResults = [];
for (const [name, foreground, background, minimum] of contrastPairs) {
  if (!foreground || !background) {
    fail(`missing color for contrast pair ${name}`);
    continue;
  }
  const ratio = contrast(foreground, background);
  contrastResults.push({ name, foreground, background, ratio: Number(ratio.toFixed(2)), minimum });
  if (ratio < minimum) fail(`contrast ${name} ${ratio.toFixed(2)} below ${minimum}`);
}

(async () => {
  let browser;
  try {
    browser = await chromium.launch();
  } catch (error) {
    browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
  }
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, acceptDownloads: true });
  const page = await context.newPage();
  await page.goto(pathToFileURL(path.join(root, "app", "index.html")).href);
  await page.waitForSelector("#app");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForSelector("#app");

  await page.keyboard.press("Tab");
  const firstFocusClass = await page.evaluate(() => document.activeElement.className);
  if (!String(firstFocusClass).includes("skip-link")) fail("first tab stop is not the skip link");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(50);
  const activeAfterSkip = await page.evaluate(() => document.activeElement.id || location.hash);
  if (activeAfterSkip !== "main" && activeAfterSkip !== "#main") fail("skip link did not move focus to main");

  const focusSequence = [];
  for (let i = 0; i < 18; i += 1) {
    await page.keyboard.press("Tab");
    focusSequence.push(await page.evaluate(() => {
      const el = document.activeElement;
      if (el === document.body) return "BODY";
      return el.id || el.textContent.trim() || el.getAttribute("aria-label") || el.tagName;
    }));
  }
  if (!focusSequence.includes("Today")) fail("keyboard sequence does not reach Today navigation");
  if (!focusSequence.includes("quick-add-input")) fail("keyboard sequence does not reach quick add input");
  if (!focusSequence.includes("Add")) fail("keyboard sequence does not reach Add button");

  await page.click("button[data-view='plan']");
  const planPressed = await page.getAttribute("button[data-view='plan']", "aria-pressed");
  const todayPressed = await page.getAttribute("button[data-view='today']", "aria-pressed");
  if (planPressed !== "true" || todayPressed !== "false") fail("navigation aria-pressed state did not update");
  await page.click("button[data-view='today']");
  await page.click("button[data-filter='upcoming']");
  const upcomingPressed = await page.getAttribute("button[data-filter='upcoming']", "aria-pressed");
  if (upcomingPressed !== "true") fail("filter aria-pressed state did not update");

  const interactiveIssues = await page.evaluate(() => {
    const issues = [];
    for (const element of Array.from(document.querySelectorAll("button, input, textarea, a[href]"))) {
      if (!element.offsetParent && getComputedStyle(element).position !== "fixed") continue;
      const rect = element.getBoundingClientRect();
      if (rect.width < 24 || rect.height < 24) issues.push(`${element.tagName} too small: ${element.outerHTML.slice(0, 80)}`);
    }
    return issues;
  });
  for (const issue of interactiveIssues) fail(issue);

  const stateButtonIssues = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".check-button, [data-habit-id]"))
      .filter((button) => !button.hasAttribute("aria-pressed"))
      .map((button) => button.outerHTML.slice(0, 120));
  });
  for (const issue of stateButtonIssues) fail(`state button missing aria-pressed: ${issue}`);

  await context.close();
  await browser.close();

  const report = {
    zero_slop_policy: {
      statement: "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS"
    },
    template_only: false,
    record_id: "A11Y-CERT-AUDIT-NORTHSTAR-20260426-001",
    status: failures.length ? "fail" : "pass",
    checks: {
      duplicateIds: ids.length === idSet.size,
      ariaLabelledbyReferencesResolve: !failures.some((failure) => failure.includes("aria-labelledby")),
      formControlsNamed: !failures.some((failure) => failure.includes("accessible name")),
      buttonNamesPresent: !failures.some((failure) => failure.includes("button has no accessible name")),
      contrastResults,
      skipLinkWorks: !failures.some((failure) => failure.includes("skip link")),
      keyboardReachability: {
        focusSequence,
        reachesPrimaryNav: focusSequence.includes("Today"),
        reachesQuickAddInput: focusSequence.includes("quick-add-input"),
        reachesAddButton: focusSequence.includes("Add")
      },
      ariaPressedUpdates: planPressed === "true" && todayPressed === "false" && upcomingPressed === "true",
      touchTargetMinimum: interactiveIssues.length === 0,
      stateButtonsExposePressedState: stateButtonIssues.length === 0
    },
    failures
  };
  fs.writeFileSync(path.join(evidenceDir, "accessibility-certification-results.json"), JSON.stringify(report, null, 2));
  assert.deepEqual(failures, []);
  console.log("Accessibility certification audit passed.");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
