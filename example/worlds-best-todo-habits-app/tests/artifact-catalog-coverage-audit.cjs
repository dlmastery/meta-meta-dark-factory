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

function resolveEvidence(rel) {
  const rootPath = path.join(root, rel);
  if (fs.existsSync(rootPath)) return rootPath;
  const projectBookPath = path.join(projectBook, rel);
  if (fs.existsSync(projectBookPath)) return projectBookPath;
  return "";
}

function readJsonEvidence(rel) {
  const file = resolveEvidence(rel);
  return file ? JSON.parse(fs.readFileSync(file, "utf8")) : null;
}

const catalog = parseCatalog(fs.readFileSync(catalogPath, "utf8"));
const matrix = JSON.parse(fs.readFileSync(matrixPath, "utf8"));
const failures = [];

function fail(message) {
  failures.push(message);
}

if (matrix.zero_slop_policy?.statement !== ZERO) fail("matrix missing zero-slop statement");
if (matrix.template_only !== false) fail("matrix must be instantiated evidence, not a template");
if (matrix.claim_full_catalog_coverage !== true) fail("RB-08 matrix must claim current-catalog coverage only after saturation evidence exists");
if (matrix.full_saturation_status !== "pass") fail("full saturation status must pass after RB-08 saturation");
if (matrix.truthful_coverage_status !== "pass_with_not_applicable_waivers") fail("truthful coverage status must be pass_with_not_applicable_waivers");
if (matrix.coverage_mode !== "full_saturation_current_catalog") fail("coverage mode must be full_saturation_current_catalog");

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
  if (["missing", "partial", "combined", "deferred"].includes(entry.status)) {
    fail(`${entry.id} remains ${entry.status}; RB-08 saturation requires standalone or not_applicable with waiver`);
  }
  if (entry.status === "not_applicable") {
    if (!entry.waiver?.owner) fail(`${entry.id} not_applicable missing waiver owner`);
    if (!entry.waiver?.expiry_trigger) fail(`${entry.id} not_applicable missing expiry trigger`);
    if (!entry.evidence.includes(matrix.not_applicable_waiver_register)) fail(`${entry.id} not_applicable missing waiver register evidence`);
  }
  if (entry.status === "standalone") {
    if (!Array.isArray(entry.review_evidence) || !entry.review_evidence.includes(matrix.review_package)) {
      fail(`${entry.id} standalone missing saturation review package link`);
    }
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
if ((counts.missing || 0) !== 0) fail("missing count must be zero after RB-08");
if ((counts.partial || 0) !== 0) fail("partial count must be zero after RB-08");
if ((counts.combined || 0) !== 0) fail("combined count must be zero after RB-08");
if ((counts.deferred || 0) !== 0) fail("deferred count must be zero after RB-08");
if ((counts.standalone || 0) + (counts.not_applicable || 0) !== catalog.length) {
  fail("standalone plus not_applicable count must equal catalog total");
}

const reviewPackage = readJsonEvidence(matrix.review_package);
if (!reviewPackage) {
  fail("review package missing");
} else {
  if (reviewPackage.zero_slop_policy?.statement !== ZERO) fail("review package missing zero-slop statement");
  if (reviewPackage.template_only !== false) fail("review package must be instantiated evidence");
  if (!Array.isArray(reviewPackage.artifacts) || reviewPackage.artifacts.length !== catalog.length) {
    fail("review package must contain one record per catalog artifact");
  } else {
    const reviewById = new Map(reviewPackage.artifacts.map((item) => [item.id, item]));
    for (const id of catalogIds) {
      const record = reviewById.get(id);
      if (!record) {
        fail(`review package missing ${id}`);
        continue;
      }
      if (!Array.isArray(record.artifact_level_rubric_15) || record.artifact_level_rubric_15.length !== 15) {
        fail(`${id} must have 15 artifact-level rubric checks`);
      }
      if (!Array.isArray(record.reviewers) || record.reviewers.length !== 3) {
        fail(`${id} must have exactly three expert reviewers`);
      } else {
        for (const reviewer of record.reviewers) {
          if (!reviewer.persona || !reviewer.seniority_bar || !reviewer.decision_rights) {
            fail(`${id} reviewer missing persona contract`);
          }
          if (!Array.isArray(reviewer.rubric_checks) || reviewer.rubric_checks.length !== 15) {
            fail(`${id} reviewer ${reviewer.persona || "<unknown>"} must have 15 checks`);
          }
        }
      }
      if (!Array.isArray(record.adversarial_critics) || record.adversarial_critics.length < 2) {
        fail(`${id} must have at least two adversarial critics`);
      }
      if (!Array.isArray(record.ralph_loops) || record.ralph_loops.length < 5) {
        fail(`${id} must have at least five RALPH loops`);
      }
      if (record.unresolved_p0_p1_findings !== 0) fail(`${id} has unresolved P0/P1 findings`);
    }
  }
}

const certificate = readJsonEvidence(matrix.quality_certificate);
if (!certificate) {
  fail("artifact saturation quality certificate missing");
} else {
  if (certificate.zero_slop_policy?.statement !== ZERO) fail("certificate missing zero-slop statement");
  if (certificate.template_only !== false) fail("certificate must be instantiated evidence");
  if (certificate.status !== "pass_with_not_applicable_waivers") fail("certificate status must match matrix boundary");
  if (certificate.review_package !== matrix.review_package) fail("certificate does not point at the review package");
  if (certificate.matrix !== "project-book/records/artifact-catalog-coverage-matrix.json") fail("certificate does not point at matrix");
}

const report = {
  zero_slop_policy: { statement: ZERO },
  template_only: false,
  audit_id: "ARTIFACT-CATALOG-COVERAGE-AUDIT-NORTHSTAR-20260503-RB08",
  status: failures.length ? "fail" : "pass",
  catalog_total: catalog.length,
  counts,
  full_saturation_status: matrix.full_saturation_status,
  claim_full_catalog_coverage: matrix.claim_full_catalog_coverage,
  truthful_coverage_status: matrix.truthful_coverage_status,
  review_package: matrix.review_package,
  quality_certificate: matrix.quality_certificate,
  not_applicable_waiver_register: matrix.not_applicable_waiver_register,
  failures
};

fs.writeFileSync(evidencePath, JSON.stringify(report, null, 2) + "\n", "utf8");
assert.deepEqual(failures, []);
console.log("Artifact catalog coverage audit passed for RB-08 current-catalog saturation with explicit not-applicable waivers.");
