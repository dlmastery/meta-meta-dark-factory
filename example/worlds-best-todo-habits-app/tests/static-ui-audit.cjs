const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "app", "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "app", "styles.css"), "utf8");
const js = fs.readFileSync(path.join(root, "app", "app.js"), "utf8");
const evidenceDir = path.join(root, "project-book", "evidence");
fs.mkdirSync(evidenceDir, { recursive: true });

const requiredHtml = [
  "<main",
  "<aside",
  "id=\"quick-add-form\"",
  "id=\"task-list\"",
  "id=\"habit-board\"",
  "id=\"habit-insight\"",
  "id=\"matrix\"",
  "id=\"plan-audit\"",
  "id=\"focus-queue\"",
  "id=\"review-note\"",
  "aria-label",
  "aria-live",
  "aria-pressed",
  "visually-hidden",
  "skip-link"
];

const requiredCss = [
  "@media (max-width: 1040px)",
  "@media (max-width: 720px)",
  "--md-sys-color-primary",
  "--md-sys-color-primary-container",
  "--md-sys-color-surface-container",
  "--md-sys-shape-corner-full",
  "--md-sys-typescale-body-medium-size",
  "--md-sys-motion-duration-short",
  "grid-template-columns",
  "overflow-wrap: anywhere",
  "letter-spacing: 0",
  "transition:",
  ":focus"
];

const requiredJs = [
  "function parseQuickAdd",
  "function calculateStats",
  "function planAudit",
  "function habitFrictionInsights",
  "function habitStreak",
  "function normalizeState",
  "function escapeHtml",
  "localStorage",
  "addEventListener"
];

const failures = [];
for (const token of requiredHtml) if (!html.includes(token)) failures.push(`missing html token ${token}`);
for (const token of requiredCss) if (!css.includes(token)) failures.push(`missing css token ${token}`);
for (const token of requiredJs) if (!js.includes(token)) failures.push(`missing js token ${token}`);
if (/https?:\/\//i.test(html)) failures.push("html includes external http resource");
if (/\bfetch\s*\(|XMLHttpRequest|navigator\.sendBeacon/i.test(js)) failures.push("js includes network-capable call");
if (/letter-spacing:\s*-/i.test(css)) failures.push("css includes negative letter spacing");

const report = {
  zero_slop_policy: {
    statement: "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS"
  },
  record_id: "STATIC-UI-AUDIT-NORTHSTAR-20260425-001",
  status: failures.length ? "fail" : "pass",
  checks: {
    requiredHtml,
    requiredCss,
    requiredJs,
    noExternalHttpResources: !/https?:\/\//i.test(html),
    noNetworkCalls: !/\bfetch\s*\(|XMLHttpRequest|navigator\.sendBeacon/i.test(js),
    noNegativeLetterSpacing: !/letter-spacing:\s*-/i.test(css),
    materialSystemTokensPresent: requiredCss
      .filter((token) => token.startsWith("--md-"))
      .every((token) => css.includes(token)),
    materialTouchTargetsPresent: /min-height:\s*48px/.test(css),
    materialStateMotionPresent: /transition:\s*[^;]+var\(--md-sys-motion-duration-short\)/.test(css)
  },
  failures
};

fs.writeFileSync(path.join(evidenceDir, "static-ui-audit-results.json"), JSON.stringify(report, null, 2));
assert.deepEqual(failures, []);
console.log("Static UI audit passed.");
