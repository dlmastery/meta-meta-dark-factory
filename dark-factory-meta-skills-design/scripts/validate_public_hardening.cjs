#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ZERO_SLOP = "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS";

const REQUIRED_FILES = [
  "README.md",
  "PUBLIC_RELEASE_AUDIT.md",
  "dark-factory-meta-skills-design/71-rb09-final-hawkeye-public-hardening-record.md",
  "dark-factory-meta-skills-design/72-full-product-gap-register-and-plan.md",
  "dark-factory-meta-skills-design/records/rb09-final-hawkeye-public-hardening-record.json",
  "dark-factory-meta-skills-design/records/final-truth-inventory.json",
  "dark-factory-meta-skills-design/records/public-reproducibility-manifest.json",
  "dark-factory-meta-skills-design/scripts/ralph100_recovery_kernel.cjs",
  "example/worlds-best-todo-habits-app/project-book/records/artifact-catalog-coverage-matrix.json",
  "example/worlds-best-todo-habits-app/project-book/records/artifact-saturation-review-package.json",
  "example/worlds-best-todo-habits-app/project-book/evidence/artifact-saturation-quality-certificate.json",
  "example/worlds-best-todo-habits-app/project-book/evidence/wysiwyg-desktop.png",
  "example/worlds-best-todo-habits-app/project-book/evidence/wysiwyg-mobile.png"
];

const SECRET_PATTERNS = [
  { name: "openai_key", re: /\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{20,}\b/g },
  { name: "github_token", re: /\bgh[opsu]_[A-Za-z0-9_]{20,}\b/g },
  { name: "google_api_key", re: /\bAIza[0-9A-Za-z_-]{20,}\b/g },
  { name: "private_key", re: /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/g }
];

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function readJson(file) {
  try {
    return JSON.parse(read(file));
  } catch {
    return null;
  }
}

function walk(root, rel = "") {
  if (!fs.existsSync(path.join(root, rel))) return [];
  const out = [];
  for (const entry of fs.readdirSync(path.join(root, rel), { withFileTypes: true })) {
    if ([".git", "node_modules", "__pycache__", "runs", "public-github-sync"].includes(entry.name)) continue;
    const next = path.join(rel, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(root, next));
    } else {
      out.push(next.replace(/\\/g, "/"));
    }
  }
  return out;
}

function addFinding(findings, priority, title, detail, file = "") {
  findings.push({ priority, title, detail, file });
}

function repoView() {
  const result = spawnSync("gh", ["repo", "view", "dlmastery/meta-meta-dark-factory", "--json", "name,owner,visibility,url"], { encoding: "utf8" });
  if (result.status !== 0) {
    return { status: "fail", detail: result.stderr || result.stdout || "gh repo view failed" };
  }
  try {
    return { status: "pass", data: JSON.parse(result.stdout) };
  } catch {
    return { status: "fail", detail: "Unable to parse gh repo view output" };
  }
}

function main() {
  const root = path.resolve(process.argv[2] || process.cwd());
  const findings = [];

  for (const rel of REQUIRED_FILES) {
    if (!fs.existsSync(path.join(root, rel))) {
      addFinding(findings, "P1", "Missing required public-hardening evidence", "Required evidence path is absent.", rel);
    }
  }

  const rootReadme = read(path.join(root, "README.md"));
  const releaseAudit = read(path.join(root, "PUBLIC_RELEASE_AUDIT.md"));
  const rb09 = readJson(path.join(root, "dark-factory-meta-skills-design/records/rb09-final-hawkeye-public-hardening-record.json"));
  const finalTruth = readJson(path.join(root, "dark-factory-meta-skills-design/records/final-truth-inventory.json"));
  const manifest = readJson(path.join(root, "dark-factory-meta-skills-design/records/public-reproducibility-manifest.json"));
  const coverage = readJson(path.join(root, "example/worlds-best-todo-habits-app/project-book/records/artifact-catalog-coverage-matrix.json"));
  const certificate = readJson(path.join(root, "example/worlds-best-todo-habits-app/project-book/evidence/artifact-saturation-quality-certificate.json"));

  if (!rootReadme.includes(ZERO_SLOP)) addFinding(findings, "P1", "Root README missing zero-slop banner", "The public entry point must carry the strict anti-slop policy.", "README.md");
  if (!rootReadme.includes("full hosted multi-user outsourcing-replacement product still needs production platform work")) {
    addFinding(findings, "P1", "Root README does not state full-product boundary", "Public documentation must prevent false victory claims.", "README.md");
  }
  if (!rootReadme.includes("55 standalone artifacts") || !rootReadme.includes("8 explicit not-applicable waivers")) {
    addFinding(findings, "P1", "Root README does not reflect RB-08 artifact saturation", "Public README must be current with the artifact-saturation evidence.", "README.md");
  }
  if (!releaseAudit.includes("rb09_local_public_hardening_pass_with_residual_risks")) {
    addFinding(findings, "P1", "Public release audit does not expose RB-09 status", "Release audit must name the accepted boundary and residual risks.", "PUBLIC_RELEASE_AUDIT.md");
  }
  if (rb09?.status !== "local_public_hardening_pass_with_residual_risks") {
    addFinding(findings, "P1", "RB-09 record status is not accepted-with-risk", "RB-09 needs an instantiated status record.", "dark-factory-meta-skills-design/records/rb09-final-hawkeye-public-hardening-record.json");
  }
  if (finalTruth?.full_product_status !== "not_finished") {
    addFinding(findings, "P1", "Final truth inventory overclaims full product status", "The full product is still not finished.", "dark-factory-meta-skills-design/records/final-truth-inventory.json");
  }
  if (coverage?.full_saturation_status !== "pass" || coverage?.counts?.missing !== 0 || coverage?.counts?.partial !== 0 || coverage?.counts?.combined !== 0 || coverage?.counts?.deferred !== 0) {
    addFinding(findings, "P1", "Todo/habits saturation evidence is not clean", "RB-08 must remain passing before RB-09 can close.", "example/worlds-best-todo-habits-app/project-book/records/artifact-catalog-coverage-matrix.json");
  }
  if (certificate?.status !== "pass_with_not_applicable_waivers") {
    addFinding(findings, "P1", "Artifact saturation certificate not passing", "RB-08 quality certificate must be present and passing.", "example/worlds-best-todo-habits-app/project-book/evidence/artifact-saturation-quality-certificate.json");
  }
  if (!manifest?.repository_url?.includes("github.com/dlmastery/meta-meta-dark-factory")) {
    addFinding(findings, "P1", "Public reproducibility manifest missing repository URL", "Public release must name the clone target.", "dark-factory-meta-skills-design/records/public-reproducibility-manifest.json");
  }

  const repo = repoView();
  if (repo.status !== "pass" || repo.data?.visibility !== "PUBLIC") {
    addFinding(findings, "P1", "GitHub repository is not verified public", repo.detail || JSON.stringify(repo.data), "https://github.com/dlmastery/meta-meta-dark-factory");
  }

  const scanRoots = [
    "README.md",
    "PUBLIC_RELEASE_AUDIT.md",
    "codex-skills",
    "dark-factory-meta-skills-design",
    "dark-factory-control-console",
    "example/worlds-best-todo-habits-app",
    "greenfield-todo-list-project-artifacts"
  ];
  const textFiles = [];
  for (const rel of scanRoots) {
    const full = path.join(root, rel);
    if (!fs.existsSync(full)) continue;
    if (fs.statSync(full).isDirectory()) {
      textFiles.push(...walk(root, rel).filter((file) => /\.(?:md|json|yaml|yml|js|cjs|mjs|html|css|txt|ps1|py)$/i.test(file)));
    } else {
      textFiles.push(rel);
    }
  }
  const secretHits = [];
  for (const rel of textFiles) {
    const text = read(path.join(root, rel));
    for (const pattern of SECRET_PATTERNS) {
      if (pattern.re.test(text)) secretHits.push({ file: rel, pattern: pattern.name });
      pattern.re.lastIndex = 0;
    }
  }
  if (secretHits.length) {
    addFinding(findings, "P1", "Potential secret pattern found", `Secret-like patterns found in ${secretHits.length} text files.`, secretHits.slice(0, 5).map((hit) => `${hit.file}:${hit.pattern}`).join(", "));
  }

  const allFiles = walk(root);
  const longest = allFiles.reduce((max, file) => Math.max(max, file.length), 0);
  const longestFile = allFiles.find((file) => file.length === longest) || "";
  const pathPosture = longest <= 180 ? "pass" : "pass_with_windows_longpath_residual_risk";

  const status = findings.some((finding) => finding.priority === "P1") ? "fail" : "pass";
  const report = {
    zero_slop_policy: ZERO_SLOP,
    validator: "validate_public_hardening.cjs",
    generated_at: new Date().toISOString(),
    status,
    repository: repo.status === "pass" ? repo.data : repo,
    required_file_count: REQUIRED_FILES.length,
    secret_scan: {
      scanned_text_files: textFiles.length,
      hit_count: secretHits.length
    },
    path_posture: {
      status: pathPosture,
      longest_relative_path_length: longest,
      longest_relative_path: longestFile,
      note: pathPosture === "pass" ? "Relative paths are under the conservative threshold." : "Use a short clone path or Git core.longpaths on Windows."
    },
    findings
  };

  const out = path.join(root, "dark-factory-meta-skills-design/records/public-hardening-validation-results.json");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(report, null, 2) + "\n", "utf8");
  process.stdout.write(JSON.stringify(report, null, 2) + "\n");
  process.exitCode = status === "pass" ? 0 : 1;
}

main();
