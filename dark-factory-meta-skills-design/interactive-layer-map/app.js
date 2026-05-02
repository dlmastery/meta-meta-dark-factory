const layers = [
  {
    id: "l0",
    index: "0",
    title: "Raw Intent Field",
    subtitle: "Human goals, transcript, examples, standards, constraints, and review findings enter the factory here.",
    badge: "Input field",
    summary: "This is the unshaped demand signal. It can be ambitious, messy, contradictory, or incomplete.",
    owns: ["Human intent", "Examples and non-examples", "Existing transcripts", "Constraints and standards"],
    limits: ["Does not define a delivery plan", "Does not prove product readiness"],
    groups: [
      {
        title: "Inputs",
        artifacts: [
          ["Original transcript", "Long-form user goals, corrections, and process requirements.", "source"],
          ["Example workload", "A concrete product such as todo plus habits used for simulation and validation.", "example"],
          ["Standards field", "Applicable SDLC, quality, security, accessibility, and operations standards.", "standards"]
        ]
      }
    ],
    example: [
      ["Todo plus habits app", "Used as an understandable demonstrator, not the whole target system."]
    ]
  },
  {
    id: "l1",
    index: "1",
    title: "Meta-Meta Skill Execution",
    subtitle: "Designs a reusable broad-domain factory template for a class of SDLC projects. These are expected template classes, not todo/habits files.",
    badge: "Expected domain templates",
    summary: "The meta-meta layer creates the reusable factory architecture. It defines what kinds of meta-skills, gates, artifacts, experts, rubrics, and no-skip controls should exist for a broad software domain.",
    owns: ["Domain factory charter", "Meta-skill templates", "Lifecycle metamodel", "Artifact and rubric libraries", "Control graph and ledger templates"],
    limits: ["Must not claim the product is built", "Must not claim product tests passed", "Must not overfit to one demonstrator app"],
    groups: [
      {
        title: "Factory definition",
        artifacts: [
          ["Meta-Meta Attractor Run Record", "Captures attractor state, scope, assumptions, and selected operating mode.", "record"],
          ["Broad Domain Factory Charter", "Defines the SDLC domain and product families served by the factory.", "charter"],
          ["Domain Capability Map", "Maps workflows, user types, data types, integrations, and quality concerns.", "map"],
          ["Domain Lifecycle Metamodel", "Defines allowed stages, gates, transitions, re-entry, and no-skip rules.", "graph"]
        ]
      },
      {
        title: "Governance templates",
        artifacts: [
          ["Standards Tailoring Framework", "Defines available standards and waiver mechanics.", "matrix"],
          ["Token Budget Governance Template", "Defines SWAG bands, approvals, and change-control triggers.", "control"],
          ["Control Graph Template", "Defines control nodes and transition rules.", "graph"],
          ["Work Ledger Template", "Defines task beads, evidence, owners, blockers, and closure.", "ledger"],
          ["PERT Template", "Defines dependency and critical path planning.", "plan"]
        ]
      },
      {
        title: "Assurance templates",
        artifacts: [
          ["Expert Role Taxonomy", "Defines elite specialist personas for future products.", "roles"],
          ["Critic Panel Taxonomy", "Defines adversarial artifact and stage critics.", "critics"],
          ["Quality Rubric Library Template", "Defines 15-plus point review rubrics and thresholds.", "rubrics"],
          ["Refinery Gate Template", "Defines review rounds, RALPH loops, fix proof, and certificate rules.", "gate"],
          ["Human Review Portal Template", "Defines dashboard, reading paths, diagrams, evidence, and redo controls.", "portal"]
        ]
      }
    ],
    example: [
      ["Consumer Productivity Factory", "Reusable template for daily-use personal productivity products."],
      ["Behavior and habit-loop template", "Reusable scenario model for tasks, habits, streaks, focus, and review."]
    ]
  },
  {
    id: "l2",
    index: "2",
    title: "Generated Meta-Skill Template Execution",
    subtitle: "Tailors the broad factory into a product-specific factory and skill pack. These are expected product-factory records, not proof that final product artifacts exist.",
    badge: "Expected product factory",
    summary: "The generated meta-skill layer turns a product request into a governed product factory. It decides the required skills, artifacts, tests, experts, gates, and human checkpoints for that product.",
    owns: ["Product tailoring profile", "Generated product meta-skill", "Skill manifest", "Interrogation packet", "Product artifact BOM", "Product control graph"],
    limits: ["Must not claim code exists unless product skills executed", "Must not claim release readiness", "Must not skip interrogation or token approval"],
    groups: [
      {
        title: "Product tailoring",
        artifacts: [
          ["Product Tailoring Profile", "Captures product type, surfaces, users, risks, data, and lifecycle flags.", "json"],
          ["Generated Product Meta-Skill Charter", "Defines product-specific factory behavior and forbidden shortcuts.", "charter"],
          ["Product-Specific Skill Manifest", "Lists the skills, order, dependencies, and gates.", "yaml"],
          ["Factory Instantiation Record", "Proves broad meta-meta template became a product-specific factory.", "record"]
        ]
      },
      {
        title: "Product planning",
        artifacts: [
          ["Customer Interrogation Packet", "Defines answer IDs, contradiction checks, completeness scoring, and approvals.", "intake"],
          ["Recursive Decomposition Tree", "Breaks product scope into capabilities, scenarios, NFRs, tests, and risks.", "tree"],
          ["Product Standards Tailoring Matrix", "Selects standards and explains waivers.", "matrix"],
          ["Product SDLC Stage Coverage Matrix", "Marks required, waived, and not-applicable stages.", "matrix"],
          ["Product Artifact BOM", "Lists documents, evidence files, code, tests, and handoff outputs.", "bom"]
        ]
      },
      {
        title: "Execution controls",
        artifacts: [
          ["Product Work Ledger", "Creates product task beads and next legal actions.", "ledger"],
          ["Product PERT Plan", "Defines dependencies, critical path, and blocked states.", "plan"],
          ["Product Knowledge Graph Seed", "Creates initial trace nodes and typed edges.", "graph"],
          ["Quality Refinery Plan", "Sets review rounds, RALPH loops, thresholds, and certificates.", "gate"],
          ["Dashboard And Redo Plan", "Defines graph index, selected-node redo, and downstream closure.", "dashboard"]
        ]
      }
    ],
    example: [
      ["Northstar Daily Product Factory", "Tailored factory for the todo plus habits demonstrator."],
      ["Generated contract", "Uses product-tailoring-profile.json and generated-meta-skill-contract.json."]
    ]
  },
  {
    id: "l3",
    index: "3",
    title: "Product-Specific Skill Execution",
    subtitle: "Generates the real project book, implementation, tests, evidence, dashboards, and handoff. The todo/habits app currently demonstrates a tailored subset.",
    badge: "Actual delivery layer",
    summary: "The product-skill layer is where actual product work happens. For todo/habits, only a tailored local-static subset exists: 19 project-book Markdown docs, 34 records, 42 root evidence files, 3 app files, 6 tests, and 7 portal files. It is not a full hundreds-of-artifacts saturation run; the 63-artifact catalog matrix exposes 14 missing standalone artifacts.",
    owns: ["Project book", "Code and configuration", "Tests and screenshots", "Evidence ledger", "Quality certificates", "Runbook and handoff"],
    limits: ["Must not accept untested code", "Must not treat templates as proof", "Must not close without trace, review, and evidence"],
    groups: [
      {
        title: "Requirements and governance",
        artifacts: [
          ["Factory Run Summary", "Summarizes scope, stage status, and evidence.", "md"],
          ["Customer Interrogation Record", "Stores answers, contradictions, completeness, and approvals.", "record"],
          ["BRD, PRD, SRS", "Business, product, and software requirements.", "docs"],
          ["NFR Catalog", "Performance, reliability, security, privacy, accessibility, and operability needs.", "docs"],
          ["Risk Register", "Tracks risks, owners, mitigations, and status.", "risk"],
          ["Task Beads", "Tracks every material work item, evidence, and closure.", "ledger"]
        ]
      },
      {
        title: "Design and implementation",
        artifacts: [
          ["UX Strategy", "Defines IA, interaction model, states, and accessibility posture.", "ux"],
          ["Architecture", "System context, containers, components, and decisions.", "design"],
          ["Domain Model", "Entities, value objects, aggregates, policies, and events.", "ddd"],
          ["API and Data Specs", "Contracts, schemas, persistence, migrations, and retention.", "spec"],
          ["Source Code", "Product implementation.", "code"],
          ["Implementation Execution Record", "Links implementation to requirements and tests.", "evidence"]
        ]
      },
      {
        title: "Verification and handoff",
        artifacts: [
          ["Test Strategy", "Defines unit, integration, scenario, browser, accessibility, and release gates.", "test"],
          ["Scenario Test Matrix", "Links scenarios, holdouts, transfer cases, requirements, and evidence.", "matrix"],
          ["Browser/WYSIWYG Evidence", "Verifies rendered UI behavior and layout.", "browser"],
          ["Artifact Catalog Coverage Matrix", "Machine-checked truth map over all 63 catalog artifacts, including missing items.", "matrix"],
          ["Quality Refinery Gate", "Records expert review, rubric scores, failed-point fixes, and acceptance.", "gate"],
          ["Quality Certificate", "Certifies accepted scope and residual risks.", "certificate"],
          ["Runbook And Handoff", "Packages operation and resume instructions for humans and agents.", "handoff"]
        ]
      }
    ],
    example: [
      ["Project book", "00-factory-run-summary.md through 18-ralph-20-artifact-completeness-audit.md."],
      ["App files", "app/index.html, app/app.js, app/styles.css."],
      ["Tests", "core, static UI, accessibility, portal-index, artifact-catalog coverage, and browser WYSIWYG tests."],
      ["Evidence", "quality gates, screenshots, validation JSON, certificates, artifact-catalog coverage results, and redo reports; nested edge-profile files are runtime noise."]
    ]
  }
];

const traceLinks = [
  ["Consumer Productivity Factory", "L1 domain template"],
  ["Northstar Daily Product Factory", "L2 tailored factory"],
  ["PRD, architecture, tests, app code", "L3 project delivery"],
  ["Portal, certificates, redo closure", "L3 evidence and handoff"]
];

let selectedId = "l1";
let focus = "all";
let search = "";

const hierarchy = document.querySelector("#hierarchy");
const miniTree = document.querySelector("#miniTree");
const artifactList = document.querySelector("#artifactList");
const exampleList = document.querySelector("#exampleList");
const detailLayer = document.querySelector("#detailLayer");
const detailTitle = document.querySelector("#detailTitle");
const detailSummary = document.querySelector("#detailSummary");
const detailOwns = document.querySelector("#detailOwns");
const detailLimits = document.querySelector("#detailLimits");
const searchBox = document.querySelector("#searchBox");

function artifactMatches(row) {
  if (!search) return true;
  return row.join(" ").toLowerCase().includes(search);
}

function layerVisible(layer) {
  return focus === "all" || layer.id === focus || layer.id === "l0";
}

function renderMiniTree() {
  miniTree.innerHTML = "";
  for (const layer of layers) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mini-link";
    button.dataset.layer = layer.id;
    button.innerHTML = `<strong>${layer.index}. ${layer.title}</strong><span>${layer.badge}</span>`;
    button.addEventListener("click", () => selectLayer(layer.id));
    miniTree.append(button);
  }
}

function renderHierarchy() {
  hierarchy.innerHTML = "";
  for (const layer of layers) {
    const section = document.createElement("section");
    section.className = `tier ${layerVisible(layer) ? "" : "is-hidden"}`;
    section.dataset.layer = layer.id;
    section.innerHTML = `
      <div class="tier-header">
        <div class="tier-index">${layer.index}</div>
        <div>
          <h3 class="tier-title">${layer.title}</h3>
          <p class="tier-subtitle">${layer.subtitle}</p>
        </div>
        <div class="tier-badge">${layer.badge}</div>
      </div>
      <div class="node-grid">
        ${layer.groups.map((group, groupIndex) => `
          <button class="node-button ${selectedId === layer.id ? "is-selected" : ""}" type="button" data-layer="${layer.id}" data-group="${groupIndex}">
            <strong>${group.title}</strong>
            <span>${group.artifacts.length} artifact classes</span>
            <span>${group.artifacts.slice(0, 2).map((item) => item[0]).join(", ")}</span>
            <span class="node-meta">${group.artifacts.slice(0, 3).map((item) => `<span class="pill">${item[2]}</span>`).join("")}</span>
          </button>
        `).join("")}
      </div>
      ${layer.groups.map((group) => renderGroup(group)).join("")}
    `;
    hierarchy.append(section);
  }
  document.querySelectorAll(".node-button").forEach((button) => {
    button.addEventListener("click", () => selectLayer(button.dataset.layer));
  });
}

function renderGroup(group) {
  const rows = group.artifacts.filter(artifactMatches);
  if (!rows.length) return "";
  return `
    <details class="artifact-group" open>
      <summary>${group.title}</summary>
      <table class="artifact-table">
        <thead>
          <tr><th>Artifact</th><th>Purpose</th><th>Kind</th></tr>
        </thead>
        <tbody>
          ${rows.map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`).join("")}
        </tbody>
      </table>
    </details>
  `;
}

function renderDetails() {
  const layer = layers.find((item) => item.id === selectedId) || layers[1];
  detailLayer.textContent = `${layer.index}. ${layer.badge}`;
  detailTitle.textContent = layer.title;
  detailSummary.textContent = layer.summary;
  detailOwns.innerHTML = layer.owns.map((item) => `<li>${item}</li>`).join("");
  detailLimits.innerHTML = layer.limits.map((item) => `<li>${item}</li>`).join("");

  const sourceLayers = search ? layers : [layer];
  const artifacts = sourceLayers
    .flatMap((sourceLayer) => sourceLayer.groups.flatMap((group) => {
      return group.artifacts.map((artifact) => [artifact[0], artifact[1], `${sourceLayer.index}. ${sourceLayer.title}`]);
    }))
    .filter(artifactMatches)
    .slice(0, 14);
  artifactList.innerHTML = artifacts.map((item) => `
    <div class="artifact-item">
      <strong>${item[0]}</strong>
      <span>${item[1]}</span>
      <span>${item[2]}</span>
    </div>
  `).join("");

  const example = selectedId === "l0" ? traceLinks : layer.example;
  exampleList.innerHTML = example.map((item) => `
    <div class="artifact-item">
      <strong>${item[0]}</strong>
      <span>${item[1]}</span>
    </div>
  `).join("");
}

function selectLayer(id) {
  selectedId = id;
  renderHierarchy();
  renderDetails();
  document.querySelector(`[data-layer="${id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function setFocus(nextFocus) {
  focus = nextFocus;
  document.querySelectorAll(".segment").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.focus === focus);
  });
  renderHierarchy();
}

function setAllDetails(open) {
  document.querySelectorAll("details").forEach((item) => {
    item.open = open;
  });
}

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => setFocus(button.dataset.focus));
});

searchBox.addEventListener("input", (event) => {
  search = event.target.value.trim().toLowerCase();
  renderHierarchy();
  renderDetails();
});

document.querySelector("#traceExample").addEventListener("click", () => {
  setFocus("all");
  selectLayer("l3");
});

document.querySelector("#expandAll").addEventListener("click", () => setAllDetails(true));
document.querySelector("#collapseAll").addEventListener("click", () => setAllDetails(false));

renderMiniTree();
renderHierarchy();
renderDetails();
