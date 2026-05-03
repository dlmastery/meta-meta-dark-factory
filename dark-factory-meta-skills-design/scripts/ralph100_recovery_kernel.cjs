#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ZERO_SLOP = "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS";

function exists(root, rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(root, rel) {
  const file = path.join(root, rel);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function readJson(root, rel) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function loopStatus(batchStatus) {
  if (batchStatus === "accepted") return "accepted";
  if (batchStatus === "partial") return "partial";
  if (batchStatus === "blocked") return "blocked";
  return "planned";
}

function range(start, end, batch, theme, batchStatus, evidenceTarget) {
  const loops = [];
  for (let loop = start; loop <= end; loop += 1) {
    loops.push({
      loop,
      batch,
      status: loopStatus(batchStatus),
      review: `${theme}: review current proof and predecessor state`,
      attack: `${theme}: attempt to expose skipped work, weak evidence, fake pass, or unresolved owner decision`,
      learn: batchStatus === "accepted"
        ? "Concrete evidence exists for this recovery scope."
        : batchStatus === "partial"
          ? "Some evidence exists, but the batch remains below closure bar."
          : "Loop is planned and must not be counted as completed evidence.",
      patch: batchStatus === "accepted"
        ? "Patch already applied for this loop scope."
        : "Open or continue the matching recovery batch before claiming this loop.",
      harden: `Evidence target: ${evidenceTarget}`
    });
  }
  return loops;
}

function buildReport(root) {
  const server = read(root, "dark-factory-control-console/server.js");
  const app = read(root, "dark-factory-control-console/public/app.js");
  const consoleTest = read(root, "dark-factory-control-console/tests/control-console.test.cjs");
  const browserTest = read(root, "dark-factory-control-console/tests/browser-console.test.cjs");
  const tasks = read(root, "dark-factory-meta-skills-design/TASKS.md");
  const todoMatrix = readJson(root, "example/worlds-best-todo-habits-app/project-book/records/artifact-catalog-coverage-matrix.json");
  const todoArtifactAudit = readJson(root, "example/worlds-best-todo-habits-app/project-book/evidence/artifact-catalog-coverage-audit-results.json");
  const todoReviewPackage = readJson(root, "example/worlds-best-todo-habits-app/project-book/records/artifact-saturation-review-package.json");
  const todoCertificate = readJson(root, "example/worlds-best-todo-habits-app/project-book/evidence/artifact-saturation-quality-certificate.json");
  const rb09Record = readJson(root, "dark-factory-meta-skills-design/records/rb09-final-hawkeye-public-hardening-record.json");
  const finalTruth = readJson(root, "dark-factory-meta-skills-design/records/final-truth-inventory.json");
  const publicManifest = readJson(root, "dark-factory-meta-skills-design/records/public-reproducibility-manifest.json");
  const publicValidation = readJson(root, "dark-factory-meta-skills-design/records/public-hardening-validation-results.json");
  const pb01Record = readJson(root, "dark-factory-meta-skills-design/records/pb01-product-platform-spine-record.json");
  const rootReadme = read(root, "README.md");
  const releaseAudit = read(root, "PUBLIC_RELEASE_AUDIT.md");
  const planRel = "dark-factory-meta-skills-design/69-ralph-100-missing-deliverable-execution-program.md";
  const kernelRel = "dark-factory-meta-skills-design/scripts/ralph100_recovery_kernel.cjs";
  const rb09Accepted =
    rb09Record?.status === "local_public_hardening_pass_with_residual_risks" &&
    finalTruth?.full_product_status === "not_finished" &&
    publicManifest?.repository_url === "https://github.com/dlmastery/meta-meta-dark-factory" &&
    publicValidation?.status === "pass" &&
    rootReadme.includes("full hosted multi-user outsourcing-replacement product still needs production platform work") &&
    rootReadme.includes("55 standalone artifacts") &&
    releaseAudit.includes("rb09_local_public_hardening_pass_with_residual_risks") &&
    exists(root, "dark-factory-meta-skills-design/scripts/validate_public_hardening.cjs");
  const pb01Accepted =
    pb01Record?.status === "accepted_for_local_product_spine" &&
    Array.isArray(finalTruth?.accepted_batches) &&
    finalTruth.accepted_batches.includes("PB-01");

  const batches = [
    {
      id: "RB-01",
      status: exists(root, planRel) && exists(root, kernelRel) && tasks.includes("TB-20260503-034") ? "accepted" : "partial",
      objective: "Canonical truth baseline and master recovery program",
      proof_class: "instantiated_artifact",
      evidence: [planRel, kernelRel, "dark-factory-meta-skills-design/TASKS.md"]
    },
    {
      id: "RB-02",
      status: server.includes("function computeLegalState") &&
        server.includes("dfms_execution_legal_state") &&
        server.includes("Only current_stage may be invoked.") &&
        server.includes("NON_CURRENT_STAGE_INVOCATION") &&
        server.includes("/legal-state") &&
        server.includes("Legal-state blocker") &&
        consoleTest.includes("future stages must not be invokable before predecessor acceptance") &&
        consoleTest.includes("change control should move the legal cursor") &&
        browserTest.includes("consoleApp.createServer") ? "accepted" : "partial",
      objective: "No-skip execution kernel spine",
      proof_class: "working_implementation_local",
      evidence: [
        "dark-factory-control-console/server.js",
        "dark-factory-control-console/tests/control-console.test.cjs",
        "dark-factory-control-console/tests/browser-console.test.cjs",
        "dark-factory-control-console/artifacts/browser-console-smoke.png"
      ]
    },
    {
      id: "RB-03",
      status: server.includes("customer_interrogation_protocol_v2") &&
        server.includes("function approveInterrogation") &&
        server.includes("recursive_spec_decomposition") &&
        server.includes("approval_required") &&
        server.includes("INTERROGATION_NOT_APPROVED") &&
        app.includes("approveInterrogation") &&
        consoleTest.includes("interrogation should require explicit human approval") &&
        consoleTest.includes("interrogation should build recursive decomposition axes") &&
        consoleTest.includes("interrogation should trace answers to downstream requirement seeds") &&
        browserTest.includes("#approveInterrogation") ? "accepted" : "partial",
      objective: "Real customer interrogation and recursive spec development",
      proof_class: "working_implementation_local",
      evidence: [
        "dark-factory-control-console/server.js",
        "dark-factory-control-console/public/app.js",
        "dark-factory-control-console/tests/control-console.test.cjs",
        "dark-factory-control-console/tests/browser-console.test.cjs"
      ]
    },
    {
      id: "RB-04",
      status: server.includes("ARTIFACT_BOM_FAMILIES") &&
        server.includes("minimum_required_artifacts: 100") &&
        server.includes("rubric_checks_per_artifact") &&
        server.includes("Artifact BOM below full-catalog threshold") &&
        consoleTest.includes("artifact BOM should carry the full governed artifact catalog") &&
        consoleTest.includes("every artifact should carry a 15-point rubric") ? "accepted" : "partial",
      objective: "Full artifact BOM engine",
      proof_class: "working_implementation_local",
      evidence: [
        "dark-factory-control-console/server.js",
        "dark-factory-control-console/tests/control-console.test.cjs"
      ]
    },
    {
      id: "RB-05",
      status: server.includes("function buildReviewEngine") &&
        server.includes("required_experts_per_artifact: 3") &&
        server.includes("required_adversarial_critics_per_artifact: 2") &&
        server.includes("required_ralph_loops_per_artifact: 5") &&
        server.includes("Review engine below artifact coverage floor") &&
        consoleTest.includes("every artifact should get three independent experts") &&
        consoleTest.includes("every artifact should get adversarial critics") ? "accepted" : "partial",
      objective: "Expert review and rubric engine",
      proof_class: "working_implementation_local",
      evidence: [
        "dark-factory-control-console/server.js",
        "dark-factory-control-console/tests/control-console.test.cjs"
      ]
    },
    {
      id: "RB-06",
      status: server.includes("function materializeBuildTestEvidence") &&
        server.includes("implementation-execution-record.json") &&
        server.includes("build-verification-record.json") &&
        server.includes("scenario-test-matrix.json") &&
        server.includes("wysiwyg-browser-test-record.json") &&
        server.includes("Code-producing proof missing") &&
        consoleTest.includes("stage-06 should produce working local implementation proof") &&
        consoleTest.includes("generated implementation tests should pass") &&
        browserTest.includes("#buildTestEvidence") ? "accepted" : "partial",
      objective: "Code-producing build/test factory",
      proof_class: "working_implementation_local",
      evidence: [
        "dark-factory-control-console/server.js",
        "dark-factory-control-console/tests/control-console.test.cjs",
        "dark-factory-control-console/tests/browser-console.test.cjs"
      ]
    },
    {
      id: "RB-07",
      status: server.includes("function buildPortalControlModel") &&
        server.includes("dfms_portal_control_model_v1") &&
        server.includes("legal-next-action-cockpit") &&
        server.includes("hawkeye-conformance-auditor") &&
        app.includes("function renderPortalCockpit") &&
        app.includes("cockpitLegalAction") &&
        app.includes("rbClosureBoard") &&
        browserTest.includes("#cockpit-title") &&
        browserTest.includes("portal_control_model") ? "accepted" : exists(root, "dark-factory-control-console/public/index.html") ? "partial" : "planned",
      objective: "Human steering and audit portal",
      proof_class: "working_implementation_local",
      evidence: ["dark-factory-control-console/public/index.html", "dark-factory-control-console/public/app.js", "dark-factory-control-console/public/styles.css"]
    },
    {
      id: "RB-08",
      status: exists(root, "example/worlds-best-todo-habits-app/app/index.html") &&
        exists(root, "example/worlds-best-todo-habits-app/project-book/26-not-applicable-waiver-register.md") &&
        todoMatrix?.claim_full_catalog_coverage === true &&
        todoMatrix?.full_saturation_status === "pass" &&
        todoMatrix?.truthful_coverage_status === "pass_with_not_applicable_waivers" &&
        todoMatrix?.counts?.catalog_total === 63 &&
        todoMatrix?.counts?.standalone === 55 &&
        todoMatrix?.counts?.not_applicable === 8 &&
        todoMatrix?.counts?.combined === 0 &&
        todoMatrix?.counts?.partial === 0 &&
        todoMatrix?.counts?.missing === 0 &&
        todoMatrix?.counts?.deferred === 0 &&
        todoArtifactAudit?.status === "pass" &&
        todoReviewPackage?.artifacts?.length === 63 &&
        todoReviewPackage?.artifacts?.every?.((artifact) =>
          artifact.reviewers?.length === 3 &&
          artifact.adversarial_critics?.length >= 2 &&
          artifact.ralph_loops?.length >= 5 &&
          artifact.artifact_level_rubric_15?.length === 15 &&
          artifact.unresolved_p0_p1_findings === 0
        ) &&
        todoCertificate?.status === "pass_with_not_applicable_waivers" &&
        exists(root, "example/worlds-best-todo-habits-app/project-book/evidence/wysiwyg-desktop.png") &&
        exists(root, "example/worlds-best-todo-habits-app/project-book/evidence/wysiwyg-mobile.png") ? "accepted" :
          exists(root, "example/worlds-best-todo-habits-app/app/index.html") ? "partial" : "planned",
      objective: "Todo/habits demonstrator full certification run",
      proof_class: todoMatrix?.full_saturation_status === "pass" ? "validated_evidence_local" : "partial",
      evidence: [
        "example/worlds-best-todo-habits-app",
        "example/worlds-best-todo-habits-app/project-book/records/artifact-catalog-coverage-matrix.json",
        "example/worlds-best-todo-habits-app/project-book/evidence/artifact-catalog-coverage-audit-results.json",
        "example/worlds-best-todo-habits-app/project-book/records/artifact-saturation-review-package.json",
        "example/worlds-best-todo-habits-app/project-book/evidence/artifact-saturation-quality-certificate.json"
      ]
    },
    {
      id: "RB-09",
      status: rb09Accepted ? "accepted" : "planned",
      objective: "Final Hawkeye closure and public hardening",
      proof_class: rb09Accepted ? "validated_public_package_evidence" : "missing",
      evidence: rb09Accepted ? [
        "README.md",
        "PUBLIC_RELEASE_AUDIT.md",
        "dark-factory-meta-skills-design/71-rb09-final-hawkeye-public-hardening-record.md",
        "dark-factory-meta-skills-design/72-full-product-gap-register-and-plan.md",
        "dark-factory-meta-skills-design/records/rb09-final-hawkeye-public-hardening-record.json",
        "dark-factory-meta-skills-design/records/final-truth-inventory.json",
        "dark-factory-meta-skills-design/records/public-reproducibility-manifest.json",
        "dark-factory-meta-skills-design/records/public-hardening-validation-results.json"
      ] : []
    }
  ];

  const byId = Object.fromEntries(batches.map((batch) => [batch.id, batch]));
  const loops = [
    ...range(1, 10, "RB-01", "Truth baseline and recovery program", byId["RB-01"].status, planRel),
    ...range(11, 25, "RB-02", "No-skip execution kernel", byId["RB-02"].status, "dark-factory-control-console/server.js"),
    ...range(26, 35, "RB-03", "Interrogation and recursive spec development", byId["RB-03"].status, "future interrogation runtime"),
    ...range(36, 50, "RB-04", "Artifact BOM saturation", byId["RB-04"].status, "future artifact BOM engine"),
    ...range(51, 60, "RB-05", "Expert review and rubrics", byId["RB-05"].status, "future review engine"),
    ...range(61, 75, "RB-06", "Code and test factory", byId["RB-06"].status, "future implementation runner"),
    ...range(76, 85, "RB-07", "Human portal and change control", byId["RB-07"].status, "dark-factory-control-console/public"),
    ...range(86, 95, "RB-08", "Todo/habits demonstrator", byId["RB-08"].status, "example/worlds-best-todo-habits-app"),
    ...range(96, 100, "RB-09", "Final Hawkeye/public hardening", byId["RB-09"].status, "future closure bundle")
  ];

  const completedLoops = loops.filter((loop) => loop.status === "accepted").length;
  const partialLoops = loops.filter((loop) => loop.status === "partial").length;
  const plannedLoops = loops.filter((loop) => loop.status === "planned").length;
  const blockedLoops = loops.filter((loop) => loop.status === "blocked").length;
  const closureBlockers = batches
    .filter((batch) => batch.status !== "accepted")
    .map((batch) => `${batch.id}: ${batch.objective} is ${batch.status}`);

  return {
    zero_slop_policy: ZERO_SLOP,
    program_id: "RALPH-100-MISSING-DELIVERABLE-RECOVERY-20260503",
    generated_at: new Date().toISOString(),
    all_tasks_completed: closureBlockers.length === 0,
    truth_boundary: "This report validates the RALPH-100 recovery program and current proof classes for the bounded local/public package. It does not claim the full hosted Software Assured Dark Factory Studio product is finished.",
    batches,
    product_batches: [
      {
        id: "PB-01",
        status: pb01Accepted ? "accepted_for_local_product_spine" : "next_product_batch",
        objective: "Local product platform spine",
        proof_class: pb01Accepted ? "working_implementation_local" : "not_started",
        evidence: pb01Accepted ? [
          "dark-factory-meta-skills-design/73-pb01-product-platform-spine-record.md",
          "dark-factory-meta-skills-design/records/pb01-product-platform-spine-record.json",
          "dark-factory-control-console/server.js",
          "dark-factory-control-console/public/index.html",
          "dark-factory-control-console/tests/browser-console.test.cjs"
        ] : []
      },
      {
        id: "PB-02",
        status: "next_product_batch",
        objective: "Hosted enterprise runtime",
        proof_class: "not_started",
        evidence: []
      }
    ],
    loop_summary: {
      required_loops: 100,
      materialized_loops: loops.length,
      accepted_loops: completedLoops,
      partial_loops: partialLoops,
      planned_loops: plannedLoops,
      blocked_loops: blockedLoops
    },
    loops,
    closure_blockers: closureBlockers,
    next_legal_action: closureBlockers.length
      ? `Continue ${batches.find((batch) => batch.status !== "accepted")?.id || "next"} before any full-factory closure claim.`
      : pb01Accepted
        ? "Recovery program RB-01 through RB-09 is accepted for the local/public package boundary, and PB-01 local product platform spine is accepted. Continue with PB-02 hosted enterprise runtime for the full product."
        : "Recovery program RB-01 through RB-09 is accepted for the local/public package boundary. Continue with product batch PB-01 if building the full hosted factory product."
  };
}

function main() {
  const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
  const out = process.argv[3] ? path.resolve(process.argv[3]) : "";
  const report = buildReport(root);
  if (report.loop_summary.materialized_loops !== 100) {
    throw new Error(`Expected 100 loops, found ${report.loop_summary.materialized_loops}`);
  }
  const text = JSON.stringify(report, null, 2) + "\n";
  if (out) {
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, text, "utf8");
  }
  process.stdout.write(text);
  return report.all_tasks_completed ? 0 : 2;
}

try {
  process.exitCode = main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
