const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const projectBook = path.join(root, "project-book");
const portalDir = path.join(projectBook, "portal");
const evidenceDir = path.join(projectBook, "evidence");
fs.mkdirSync(evidenceDir, { recursive: true });

const ZERO = "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS";

function read(rel) {
  return fs.readFileSync(path.join(projectBook, rel), "utf8");
}

function listFiles(dir, filter) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(dir, entry.name))
    .filter((file) => !filter || filter(file))
    .sort();
}

function relProjectBook(file) {
  return path.relative(projectBook, file).replace(/\\/g, "/");
}

const html = read("portal/index.html");
const css = read("portal/portal.css");
const diagrams = read("portal/diagrams.md");
const index = JSON.parse(read("portal/portal-data.json"));
const record = JSON.parse(read("records/human-review-portal-record.json"));
const failures = [];

function fail(message) {
  failures.push(message);
}

function containsEvery(surface, values, label) {
  for (const value of values) {
    if (!surface.includes(value)) fail(`${label} missing ${value}`);
  }
}

if (!html.includes(ZERO)) fail("portal html missing zero-slop policy");
if (!diagrams.includes(ZERO)) fail("diagram atlas missing zero-slop policy");
if (index.zero_slop_policy?.statement !== ZERO) fail("portal index missing zero-slop policy");
if (record.zero_slop_policy?.statement !== ZERO) fail("portal record missing zero-slop policy");
if (index.template_only !== false) fail("portal index is template-only or missing template_only=false");
if (record.template_only !== false) fail("portal record is template-only or missing template_only=false");

containsEvery(html, [
  "Fresh Reviewer Start Here",
  "Role-Based Onboarding",
  "SDLC Stage Dashboard",
  "Documentation Library",
  "Structured Records",
  "Evidence Library",
  "Mermaid Diagram Atlas",
  "Next Safe Action"
], "portal html");

containsEvery(css, [
  ".summary-grid",
  ".role-grid",
  ".stage-grid",
  ".library-grid",
  "@media (max-width: 720px)"
], "portal css");

const topMarkdown = listFiles(projectBook, (file) => file.endsWith(".md")).map(relProjectBook);
const records = [
  "records/TASKS.md",
  ...listFiles(path.join(projectBook, "records"), (file) => file.endsWith(".json")).map(relProjectBook)
].sort();
const evidence = [
  ...listFiles(evidenceDir).map(relProjectBook),
  "evidence/human-review-portal-validation-output.txt",
  "evidence/human-review-portal-validation.json"
].filter((value, index, all) => all.indexOf(value) === index).sort();

const indexText = JSON.stringify(index);
for (const rel of topMarkdown) {
  if (!indexText.includes(rel) && !html.includes(`../${rel}`)) fail(`top-level Markdown not indexed: ${rel}`);
}
for (const rel of records) {
  if (!indexText.includes(rel) && !html.includes(`../${rel}`)) fail(`record not indexed: ${rel}`);
}
for (const rel of evidence) {
  if (!indexText.includes(rel) && !html.includes(`../${rel}`)) fail(`evidence not indexed: ${rel}`);
}

const diagramSources = [];
for (const searchRoot of [
  projectBook,
  path.resolve(root, "..", "..", "dark-factory-meta-skills-design")
]) {
  if (!fs.existsSync(searchRoot)) continue;
  const stack = [searchRoot];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      if (entry.isFile() && entry.name.endsWith(".md")) {
        const text = fs.readFileSync(full, "utf8");
        if (text.includes("```mermaid")) diagramSources.push(full);
      }
    }
  }
}

for (const source of diagramSources) {
  if (!diagrams.includes(path.basename(source))) fail(`Mermaid source not indexed: ${source}`);
}

if (!Array.isArray(index.onboarding_paths) || index.onboarding_paths.length < 5) {
  fail("portal index must include at least five role onboarding paths");
}

const report = {
  zero_slop_policy: {
    statement: ZERO
  },
  template_only: false,
  record_id: "PORTAL-AUDIT-NORTHSTAR-20260426-001",
  status: failures.length ? "fail" : "pass",
  counts: {
    topLevelMarkdown: topMarkdown.length,
    records: records.length,
    evidenceRootFiles: evidence.length,
    mermaidSources: diagramSources.length,
    onboardingPaths: index.onboarding_paths.length
  },
  exclusions: [
    "Browser runtime profile subdirectories under project-book/evidence are excluded because they are not review artifacts."
  ],
  failures
};

fs.writeFileSync(path.join(evidenceDir, "human-review-portal-validation.json"), JSON.stringify(report, null, 2));
assert.deepEqual(failures, []);
console.log("Human review portal audit passed.");
