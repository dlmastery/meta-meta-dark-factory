const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const workspace = path.resolve(root, "..", "..");
const projectBook = path.join(root, "project-book");
const matrixPath = path.join(projectBook, "records", "artifact-catalog-coverage-matrix.json");
const catalogPath = path.join(workspace, "codex-skills", "df-artifact-factory", "references", "artifact-catalog.md");
const evidencePath = path.join(projectBook, "evidence", "artifact-catalog-coverage-audit-results.json");
const ZERO = "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS";
const allowed = new Set(["standalone", "combined", "partial", "not_applicable", "deferred", "missing"]);

function parseCatalog(text) {
  return text.split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^\| (GOV|REQ|ARC|MDA|DDD|IMP|VNV|REL|EVD)-\d{3} \|/.test(line))
    .map((line) => {
      const parts = line.split("|").map((part) => part.trim());
      return { id: parts[1], artifact: parts[2] };
    });
}

function existsEvidence(rel) {
  return fs.existsSync(path.join(root, rel)) || fs.existsSync(path.join(projectBook, rel));
}

const catalog = parseCatalog(fs.readFileSync(catalogPath, "utf8"));
const matrix = JSON.parse(fs.readFileSync(matrixPath, "utf8"));
const failures = [];

function fail(message) {
  failures.push(message);
}

if (matrix.zero_slop_policy?.statement !== ZERO) fail("matrix missing zero-slop statement");
if (matrix.template_only !== false) fail("matrix must be instantiated evidence, not a template");
if (matrix.claim_full_catalog_coverage !== false) fail("todo/habits matrix must not claim full catalog coverage");
if (matrix.full_saturation_status !== "fail") fail("full saturation status must truthfully fail");
if (matrix.truthful_coverage_status !== "pass_with_gaps") fail("truthful coverage status must be pass_with_gaps");

const catalogIds = catalog.map((item) => item.id).sort();
const entryIds = matrix.entries.map((item) => item.id).sort();
try {
  assert.deepEqual(entryIds, catalogIds);
} catch {
  fail("matrix entries do not exactly match the artifact catalog IDs");
}

const seen = new Set();
for (const entry of matrix.entries) {
  if (seen.has(entry.id)) fail(`duplicate entry ${entry.id}`);
  seen.add(entry.id);
  if (!allowed.has(entry.status)) fail(`${entry.id} has invalid status ${entry.status}`);
  if (!entry.artifact) fail(`${entry.id} missing artifact name`);
  if (!entry.gap) fail(`${entry.id} missing gap statement`);
  if (!entry.next_action) fail(`${entry.id} missing next action`);
  if (["standalone", "combined", "partial", "not_applicable"].includes(entry.status)) {
    if (!Array.isArray(entry.evidence) || !entry.evidence.length) fail(`${entry.id} must cite evidence or rationale record`);
    for (const rel of entry.evidence || []) {
      if (!existsEvidence(rel)) fail(`${entry.id} evidence does not exist: ${rel}`);
    }
  }
  if (entry.status === "missing" && Array.isArray(entry.evidence) && entry.evidence.length) {
    fail(`${entry.id} is missing but cites evidence`);
  }
}

const counts = matrix.entries.reduce((acc, entry) => {
  acc[entry.status] = (acc[entry.status] || 0) + 1;
  return acc;
}, {});
for (const key of ["standalone", "combined", "partial", "not_applicable", "deferred", "missing"]) {
  const actual = counts[key] || 0;
  counts[key] = actual;
  if (matrix.counts[key] !== actual) fail(`count mismatch for ${key}: expected ${actual}, matrix says ${matrix.counts[key]}`);
}
if (matrix.counts.catalog_total !== catalog.length) fail(`catalog total mismatch: expected ${catalog.length}`);
if ((counts.missing || 0) < 1) fail("matrix should expose missing artifacts for this demonstrator");
if ((counts.standalone || 0) >= catalog.length) fail("matrix incorrectly implies all artifacts are standalone");

const report = {
  zero_slop_policy: { statement: ZERO },
  template_only: false,
  audit_id: "ARTIFACT-CATALOG-COVERAGE-AUDIT-NORTHSTAR-20260429-001",
  status: failures.length ? "fail" : "pass_with_gaps",
  catalog_total: catalog.length,
  counts,
  full_saturation_status: matrix.full_saturation_status,
  claim_full_catalog_coverage: matrix.claim_full_catalog_coverage,
  failures
};

fs.writeFileSync(evidencePath, JSON.stringify(report, null, 2) + "\n", "utf8");
assert.deepEqual(failures, []);
console.log("Artifact catalog coverage audit passed with truthful gaps.");
