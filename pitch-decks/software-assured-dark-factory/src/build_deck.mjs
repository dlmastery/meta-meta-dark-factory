import fs from "node:fs/promises";
import path from "node:path";

const {
  Presentation,
  PresentationFile,
  row,
  column,
  grid,
  layers,
  panel,
  text,
  shape,
  rule,
  fill,
  hug,
  fixed,
  wrap,
  grow,
  fr,
  auto,
} = await import("@oai/artifact-tool");

const WORKSPACE =
  "C:/Users/abhir/Documents/Codex/2026-04-23/files-mentioned-by-the-user-dark";
const DECK_ROOT = path.join(
  WORKSPACE,
  "pitch-decks",
  "software-assured-dark-factory",
);
const OUTPUT_DIR = path.join(DECK_ROOT, "output");
const SCRATCH_DIR = path.join(DECK_ROOT, "scratch");
const PREVIEW_DIR = path.join(SCRATCH_DIR, "previews");
const LAYOUT_DIR = path.join(SCRATCH_DIR, "layouts");
const QA_PATH = path.join(SCRATCH_DIR, "qa-report.json");
const PPTX_PATH = path.join(OUTPUT_DIR, "output.pptx");

await fs.mkdir(OUTPUT_DIR, { recursive: true });
await fs.mkdir(PREVIEW_DIR, { recursive: true });
await fs.mkdir(LAYOUT_DIR, { recursive: true });

const W = 1920;
const H = 1080;
const C = {
  ink: "#F7FAF8",
  paper: "#F2F6EF",
  bg: "#09100F",
  bg2: "#0D1715",
  soft: "#A9B8AE",
  muted: "#6E7C74",
  teal: "#2DD4BF",
  mint: "#9AF2C8",
  green: "#46D17E",
  amber: "#F2B84B",
  red: "#F26464",
  line: "#29443B",
  panel: "#111D1A",
  panel2: "#162520",
  nearBlack: "#050807",
};

const S = {
  eyebrow: { fontSize: 21, bold: true, color: C.mint },
  title: { fontSize: 55, bold: true, color: C.ink },
  titleSmall: { fontSize: 44, bold: true, color: C.ink },
  subtitle: { fontSize: 26, color: C.soft },
  body: { fontSize: 25, color: C.paper },
  bodyMuted: { fontSize: 22, color: C.soft },
  label: { fontSize: 18, bold: true, color: C.mint },
  micro: { fontSize: 13, color: C.muted },
  number: { fontSize: 76, bold: true, color: C.ink },
};

const presentation = Presentation.create({
  slideSize: { width: W, height: H },
});

const titlePageConcept = {
  promptRead:
    "A serious enterprise product pitch for standardized agentic software delivery with assurance controls.",
  audiencePromise:
    "This is the control plane that lets buyers trust a dark-factory agent swarm the way they trust a top outsourcing partner, but with stronger evidence.",
  coverThesis:
    "The product turns agent delivery into a governed, auditable software factory.",
  chosenArchetype: "typographic poster",
  rejectedCliches: [
    "dashboard opener",
    "hero plus card rail",
    "KPI strip",
    "generic AI gradient",
  ],
  dominantElement: "Monumental product category title with a factory control lattice.",
  typographyMove:
    "Large left-anchored phrase, short measure, strong line breaks, quiet proof line.",
  paletteMove:
    "Near-black assurance field with mint/amber/red evidence-control accents.",
  imageOrEvidenceMove:
    "Native control lattice and gate marks, no fake screenshots or invented logos.",
  negativeSpacePlan:
    "Open right-side field implies a machine room without crowding the title.",
  whyThisCouldOnlyBeThisDeck:
    "The cover joins software assurance, dark-factory delivery, and standards evidence in one category phrase.",
};

const deckPlan = [
  "Cover",
  "Market tension",
  "Buyer confidence bar",
  "Category shift",
  "Product",
  "Whole system map",
  "Operating model",
  "Lifecycle stages",
  "Meta hierarchy",
  "Greenfield task tree",
  "Brownfield task tree",
  "Interrogation protocol",
  "Recursive decomposition",
  "Assurance layer",
  "Expert review depth",
  "Client governance",
  "Token economics",
  "Project book",
  "Modules",
  "Comprehensive assurance skill mesh",
  "External skill supply chain",
  "Skill curation matrix",
  "Core data objects",
  "Standards",
  "Trace model",
  "Control room surface",
  "SRE handoff",
  "Memory and learning",
  "Risk controls",
  "Use cases",
  "Competitive position",
  "Packaging and GTM",
  "Moat",
  "Roadmap",
  "Pilot ask",
];

function cleanName(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function bg() {
  return shape({
    name: "background",
    width: fill,
    height: fill,
    fill: C.bg,
    line: { width: 0, fill: C.bg },
  });
}

function contentSlide({ eyebrow, title, subtitle, children, footer, name }) {
  const slide = presentation.slides.add();
  const pageNumber = presentation.slides.count;
  slide.compose(
    layers({ name: `${name}-root`, width: fill, height: fill }, [
      bg(),
      column(
        {
          name: `${name}-content`,
          width: fill,
          height: fill,
          padding: { x: 88, y: 64 },
          gap: 34,
        },
        [
          column({ name: `${name}-title-stack`, width: fill, height: hug, gap: 13 }, [
            text(eyebrow, {
              name: `${name}-eyebrow`,
              width: fill,
              height: hug,
              style: S.eyebrow,
            }),
            text(title, {
              name: `${name}-title`,
              width: wrap(1500),
              height: hug,
              style: title.length > 68 ? S.titleSmall : S.title,
            }),
            subtitle
              ? text(subtitle, {
                  name: `${name}-subtitle`,
                  width: wrap(1330),
                  height: hug,
                  style: S.subtitle,
                })
              : null,
          ].filter(Boolean)),
          children,
          row(
            {
              name: `${name}-footer-row`,
              width: fill,
              height: hug,
              align: "center",
              justify: "between",
            },
            [
              text(footer ?? "DFMS pitch deck | software assurance dark factory", {
                name: `${name}-footer`,
                width: wrap(1200),
                height: hug,
                style: S.micro,
              }),
              text(String(pageNumber).padStart(2, "0"), {
                name: `${name}-page`,
                width: fixed(40),
                height: hug,
                style: { fontSize: 13, color: C.muted, bold: true },
              }),
            ],
          ),
        ],
      ),
    ]),
    { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
  );
  return slide;
}

function pill(label, tone = "teal", width = 210) {
  const toneMap = {
    teal: { fill: "#102D29", line: C.teal, color: C.mint },
    amber: { fill: "#2C2414", line: C.amber, color: "#FFE1A1" },
    red: { fill: "#2B1717", line: C.red, color: "#FFC2C2" },
    green: { fill: "#112A19", line: C.green, color: "#BFFAD1" },
    gray: { fill: "#16201E", line: C.line, color: C.soft },
  };
  const t = toneMap[tone] ?? toneMap.teal;
  return panel(
    {
      name: `pill-${cleanName(label)}`,
      width: fixed(width),
      height: fixed(46),
      padding: { x: 18, y: 10 },
      fill: t.fill,
      line: { width: 1, fill: t.line },
      borderRadius: "rounded-full",
      align: "center",
      justify: "center",
    },
    text(label, {
      name: `pill-text-${cleanName(label)}`,
      width: fill,
      height: hug,
      style: { fontSize: 16, bold: true, color: t.color },
    }),
  );
}

function openMetric(value, label, tone = C.mint) {
  return column({ name: `metric-${cleanName(label)}`, width: fill, height: hug, gap: 7 }, [
    text(value, {
      name: `metric-value-${cleanName(label)}`,
      width: fill,
      height: hug,
      style: { fontSize: 70, bold: true, color: tone },
    }),
    text(label, {
      name: `metric-label-${cleanName(label)}`,
      width: wrap(320),
      height: hug,
      style: { fontSize: 21, color: C.soft },
    }),
  ]);
}

function statementLine(title, body, tone = C.teal) {
  return row(
    {
      name: `statement-${cleanName(title)}`,
      width: fill,
      height: hug,
      gap: 22,
      align: "start",
    },
    [
      shape({
        name: `dot-${cleanName(title)}`,
        width: fixed(13),
        height: fixed(56),
        fill: tone,
        line: { width: 0, fill: tone },
        borderRadius: "rounded-full",
      }),
      column({ width: fill, height: hug, gap: 5 }, [
        text(title, {
          name: `statement-title-${cleanName(title)}`,
          width: fill,
          height: hug,
          style: { fontSize: 29, bold: true, color: C.ink },
        }),
        text(body, {
          name: `statement-body-${cleanName(title)}`,
          width: wrap(1030),
          height: hug,
          style: { fontSize: 22, color: C.soft },
        }),
      ]),
    ],
  );
}

function stepNode(index, title, body, tone = C.teal) {
  return panel(
    {
      name: `step-${index}-${cleanName(title)}`,
      width: fill,
      height: hug,
      padding: { x: 24, y: 20 },
      fill: C.panel,
      line: { width: 1, fill: C.line },
      borderRadius: "rounded-md",
    },
    row({ width: fill, height: hug, gap: 18, align: "start" }, [
      text(index, {
        name: `step-num-${index}`,
        width: fixed(44),
        height: hug,
        style: { fontSize: 23, bold: true, color: tone },
      }),
      column({ width: fill, height: hug, gap: 6 }, [
        text(title, {
          name: `step-title-${index}`,
          width: fill,
          height: hug,
          style: { fontSize: 24, bold: true, color: C.ink },
        }),
        text(body, {
          name: `step-body-${index}`,
          width: fill,
          height: hug,
          style: { fontSize: 18, color: C.soft },
        }),
      ]),
    ]),
  );
}

function comparisonRow(a, b, c, tone = "gray") {
  const toneColor = tone === "good" ? C.green : tone === "warn" ? C.amber : C.teal;
  return grid(
    {
      name: `comp-${cleanName(a)}`,
      width: fill,
      height: hug,
      columns: [fr(1.02), fr(1.02), fr(1.18)],
      columnGap: 28,
      alignItems: "stretch",
    },
    [
      text(a, {
        name: `comp-a-${cleanName(a)}`,
        width: fill,
        height: hug,
        style: { fontSize: 22, color: C.soft },
      }),
      text(b, {
        name: `comp-b-${cleanName(a)}`,
        width: fill,
        height: hug,
        style: { fontSize: 22, color: C.soft },
      }),
      row({ width: fill, height: hug, gap: 14, align: "start" }, [
        shape({
          name: `comp-mark-${cleanName(a)}`,
          width: fixed(8),
          height: fixed(40),
          fill: toneColor,
          line: { width: 0, fill: toneColor },
          borderRadius: "rounded-full",
        }),
        text(c, {
          name: `comp-c-${cleanName(a)}`,
          width: fill,
          height: hug,
          style: { fontSize: 22, bold: true, color: C.ink },
        }),
      ]),
    ],
  );
}

function addCover() {
  const slide = presentation.slides.add();
  const railNodes = [];
  for (let i = 0; i < 8; i += 1) {
    railNodes.push(
      row({ name: `cover-rail-row-${i}`, width: fill, height: fixed(44), gap: 14 }, [
        shape({
          name: `cover-gate-${i}-a`,
          width: fixed(70 + (i % 3) * 28),
          height: fixed(10),
          fill: i % 3 === 0 ? C.teal : i % 3 === 1 ? C.amber : C.line,
          line: { width: 0, fill: C.line },
          borderRadius: "rounded-full",
        }),
        shape({
          name: `cover-gate-${i}-b`,
          width: fixed(18),
          height: fixed(18),
          fill: i % 2 === 0 ? C.green : C.red,
          line: { width: 0, fill: C.line },
          borderRadius: "rounded-full",
        }),
        shape({
          name: `cover-gate-${i}-c`,
          width: fixed(160 + (i % 4) * 22),
          height: fixed(10),
          fill: C.line,
          line: { width: 0, fill: C.line },
          borderRadius: "rounded-full",
        }),
      ]),
    );
  }

  slide.compose(
    layers({ name: "cover-root", width: fill, height: fill }, [
      bg(),
      grid(
        {
          name: "cover-grid",
          width: fill,
          height: fill,
          columns: [fr(1.04), fr(0.96)],
          columnGap: 76,
          padding: { x: 96, y: 82 },
          alignItems: "center",
        },
        [
          column({ name: "cover-type", width: fill, height: fixed(650), gap: 28, justify: "center" }, [
            text("SOFTWARE-ASSURED", {
              name: "cover-kicker",
              width: fill,
              height: hug,
              style: { fontSize: 24, bold: true, color: C.mint },
            }),
            text("Standardized Dark Factory", {
              name: "cover-title",
              width: wrap(850),
              height: hug,
              style: { fontSize: 80, bold: true, color: C.ink },
            }),
            text(
              "A governed agent swarm that delivers software like a high-trust outsourcing firm, with stronger evidence, standards mapping, and token-budget control.",
              {
                name: "cover-subtitle",
                width: wrap(860),
                height: hug,
                style: { fontSize: 29, color: C.soft },
              },
            ),
            row({ name: "cover-pills", width: fill, height: hug, gap: 14 }, [
              pill("standards based", "green", 200),
              pill("evidence gated", "teal", 190),
              pill("token governed", "amber", 190),
            ]),
          ]),
          column(
            {
              name: "cover-lattice",
              width: fill,
              height: fixed(650),
              gap: 22,
              justify: "center",
            },
            [
              text("CONTROL GRAPH", {
                name: "cover-lattice-label",
                width: fill,
                height: hug,
                style: { fontSize: 18, bold: true, color: C.muted },
              }),
              ...railNodes,
              row({ name: "cover-proof-strip", width: fill, height: hug, gap: 16 }, [
                pill("trace", "teal", 116),
                pill("rubric", "green", 128),
                pill("handoff", "amber", 138),
                pill("SRE", "red", 98),
              ]),
            ],
          ),
        ],
      ),
      row(
        {
          name: "cover-footer",
          width: fill,
          height: hug,
          padding: { x: 96, y: 48 },
          align: "end",
          justify: "between",
        },
        [
          text("Pitch deck | DFMS product concept", {
            name: "cover-footer-left",
            width: wrap(600),
            height: hug,
            style: S.micro,
          }),
          text("2026", {
            name: "cover-footer-right",
            width: wrap(120),
            height: hug,
            style: { fontSize: 13, bold: true, color: C.muted },
          }),
        ],
      ),
    ]),
    { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
  );
}

addCover();

contentSlide({
  name: "tension",
  eyebrow: "THE PROBLEM",
  title: "Enterprise buyers are being asked to trust speed without assurance.",
  subtitle:
    "Classic outsourcing is slow and opaque. AI coding is fast but thin on evidence. Regulated teams need the missing middle.",
  children: grid(
    {
      name: "tension-grid",
      width: fill,
      height: grow(1),
      columns: [fr(0.9), fr(1.1)],
      columnGap: 70,
      alignItems: "center",
    },
    [
      column({ name: "tension-metrics", width: fill, height: fixed(480), gap: 24, justify: "center" }, [
        openMetric("slow", "human SDLC checkpoints arrive late", C.amber),
        openMetric("opaque", "outsourcing status is often summarized, not proven", C.red),
        openMetric("fragile", "AI output often lacks traceable acceptance evidence", C.teal),
      ]),
      column({ name: "tension-statements", width: fill, height: hug, gap: 32 }, [
        statementLine(
          "The buyer's real question is not 'can it code?'",
          "It is whether the delivery system can explain, prove, hand off, and keep improving the software.",
          C.teal,
        ),
        statementLine(
          "The vendor's real question is not 'did the model answer?'",
          "It is whether every requirement, decision, artifact, test, and residual risk survived scrutiny.",
          C.green,
        ),
        statementLine(
          "The cost center changes form.",
          "Dollars become tokens, but scope, approvals, change control, and confidence still have to be managed.",
          C.amber,
        ),
      ]),
    ],
  ),
});

contentSlide({
  name: "buyer-confidence",
  eyebrow: "THE BUYER STANDARD",
  title: "Confidence requires a full delivery system, not a clever answer.",
  subtitle:
    "A serious buyer needs the same control surfaces they expect from a top delivery partner, plus stronger machine-verifiable proof.",
  children: grid(
    {
      name: "buyer-confidence-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1), fr(1)],
      columnGap: 30,
      rowGap: 24,
      alignItems: "stretch",
    },
    [
      stepNode("01", "Scope confidence", "What is in, what is out, what changed, and who approved it.", C.teal),
      stepNode("02", "Spec confidence", "Customer answers trace to decomposed requirements and acceptance leaves.", C.green),
      stepNode("03", "Design confidence", "Alternatives, decisions, standards, risks, and trade-offs are explicit.", C.amber),
      stepNode("04", "Build confidence", "Code, models, data, dependencies, and environments link back to intent.", C.teal),
      stepNode("05", "Quality confidence", "Tests, expert rubrics, refinery gates, and certificates prove readiness.", C.green),
      stepNode("06", "Ownership confidence", "Humans can take over with runbooks, replay drills, and residual-risk context.", C.amber),
    ],
  ),
});

contentSlide({
  name: "shift",
  eyebrow: "THE CATEGORY SHIFT",
  title: "From AI assistance to software-assured dark-factory delivery.",
  subtitle:
    "The product is not a chatbot. It is a standards-aware delivery machine with gates, evidence, and client governance.",
  children: grid(
    {
      name: "shift-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1), fr(1)],
      columnGap: 32,
      alignItems: "center",
    },
    [
      stepNode("01", "AI coding tool", "Produces code fragments or changes when asked.", C.red),
      stepNode("02", "Agent workflow", "Coordinates multiple tasks and checks a local result.", C.amber),
      stepNode(
        "03",
        "Software-assured factory",
        "Runs the full delivery relationship: scope, artifacts, evidence, reviews, change control, handoff.",
        C.green,
      ),
    ],
  ),
});

contentSlide({
  name: "product",
  eyebrow: "PRODUCT",
  title: "DFMS is the control plane for standardized agent delivery.",
  subtitle:
    "It turns raw intent into governed project work: a meta-attractor, expert swarm, artifact factory, and trace ledger.",
  children: grid(
    {
      name: "product-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1.15), fr(0.85)],
      columnGap: 52,
      alignItems: "center",
    },
    [
      column({ name: "product-flow", width: fill, height: hug, gap: 18 }, [
        stepNode("A", "Meta-attractor", "Stabilizes ambiguous, evolving, or contradictory project intent.", C.teal),
        stepNode("B", "Governance mayor", "Creates standards tailoring, scope baseline, token SWAG, and gates.", C.green),
        stepNode("C", "Factory nodes", "Produce requirements, design, code, tests, runbooks, and handoff artifacts.", C.mint),
        stepNode("D", "Quality refinery", "Applies expert rubrics, verification, evidence, and certificates.", C.amber),
      ]),
      column({ name: "product-claim", width: fill, height: hug, gap: 26 }, [
        text("One governed run can produce a project book, not just a pull request.", {
          name: "product-claim-title",
          width: wrap(570),
          height: hug,
          style: { fontSize: 52, bold: true, color: C.ink },
        }),
        text(
          "Each node must state what, why, how, where, when, who, and how good. That contract is the product's atomic unit.",
          {
            name: "product-claim-body",
            width: wrap(600),
            height: hug,
            style: S.bodyMuted,
          },
        ),
      ]),
    ],
  ),
});

contentSlide({
  name: "system-map",
  eyebrow: "WHOLE SYSTEM",
  title: "The product has to cover the entire outsourcing-style relationship.",
  subtitle:
    "The dark factory is a delivery institution: control plane, artifact plane, execution plane, evidence plane, memory plane, and human collaboration plane.",
  children: grid(
    {
      name: "system-map-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1), fr(1)],
      columnGap: 28,
      rowGap: 22,
      alignItems: "stretch",
    },
    [
      stepNode("C", "Control plane", "Routing, gates, roles, waivers, escalation, phase exits.", C.teal),
      stepNode("A", "Artifact plane", "PRD, SRS, models, decisions, tests, runbooks, certificates.", C.green),
      stepNode("X", "Execution plane", "Code, migrations, configs, environments, automation, checks.", C.amber),
      stepNode("E", "Evidence plane", "Trace links, review records, logs, hashes, residual risks.", C.teal),
      stepNode("M", "Memory plane", "Project book, predecessor recovery, context packs, replay drills.", C.green),
      stepNode("H", "Human plane", "Checkpoints, async review, taste gates, takeover, handback.", C.amber),
    ],
  ),
});

contentSlide({
  name: "operating-model",
  eyebrow: "OPERATING MODEL",
  title: "Every project becomes a governed control graph.",
  subtitle:
    "The graph keeps lifecycle work, expert debates, client approvals, work ledger items, and evidence tied together.",
  children: column({ name: "op-model-body", width: fill, height: grow(1), gap: 32, justify: "center" }, [
    grid(
      {
        name: "op-model-row1",
        width: fill,
        height: hug,
        columns: [fr(1), fr(1), fr(1), fr(1)],
        columnGap: 24,
      },
      [
        stepNode("1", "Interrogate", "Ask, capture, score completeness, resolve contradictions.", C.teal),
        stepNode("2", "Decompose", "Break specs into branches and acceptance leaves.", C.green),
        stepNode("3", "Debate", "Three experts propose, critique, synthesize, and vote.", C.amber),
        stepNode("4", "Approve", "Client checkpoint and token budget gate before material work.", C.red),
      ],
    ),
    grid(
      {
        name: "op-model-row2",
        width: fill,
        height: hug,
        columns: [fr(1), fr(1), fr(1), fr(1)],
        columnGap: 24,
      },
      [
        stepNode("5", "Build", "Produce code, models, artifacts, tests, and runbooks.", C.teal),
        stepNode("6", "Verify", "Run tests, trace checks, rubrics, and refinery gates.", C.green),
        stepNode("7", "Handoff", "Package state so humans or agents can take over safely.", C.amber),
        stepNode("8", "Learn", "Feed lessons back into templates, rubrics, and scenarios.", C.red),
      ],
    ),
  ]),
});

contentSlide({
  name: "lifecycle-stages",
  eyebrow: "LIFECYCLE COVERAGE",
  title: "The factory spans before-intake to production learning.",
  subtitle:
    "It does not stop at code generation; it models the whole SDLC and the client/delivery relationship around it.",
  children: grid(
    {
      name: "lifecycle-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1), fr(1)],
      columnGap: 28,
      rowGap: 20,
      alignItems: "stretch",
    },
    [
      stepNode("-1", "Meta-attractor", "Stabilize the request, route the run, preserve durable intent.", C.teal),
      stepNode("-0.5", "Engagement governance", "Owners, scope baseline, token SWAG, checkpoints, change control.", C.amber),
      stepNode("0", "Intake and spec lab", "Interrogate, decompose, score, validate, and approve requirements.", C.green),
      stepNode("1-4", "Feasibility to planning", "Risk register, architecture options, delivery plan, acceptance plan.", C.teal),
      stepNode("5-7", "Build to transition", "Implementation, verification, release, runbooks, training, handoff.", C.green),
      stepNode("8-10", "Operate to learn", "SRE mode, brownfield loop, retrospectives, template/rubric updates.", C.amber),
    ],
  ),
});

contentSlide({
  name: "meta-hierarchy",
  eyebrow: "META + META-META",
  title: "The meta-meta layer protects the whole factory from narrow thinking.",
  subtitle:
    "It forms the field before any specialized skill acts, so a run cannot overfit to one artifact, one app, or one local task.",
  children: grid(
    {
      name: "meta-hierarchy-grid",
      width: fill,
      height: grow(1),
      columns: [fr(0.9), fr(1.1)],
      columnGap: 56,
      alignItems: "center",
    },
    [
      column({ name: "meta-left", width: fill, height: fixed(620), gap: 12, justify: "center" }, [
        openMetric("meta-meta", "attractor for intent, governance, and routing", C.teal),
        openMetric("meta", "orchestrated skills for project delivery", C.green),
        openMetric("node", "bounded work with rubrics and evidence", C.amber),
      ]),
      column({ name: "meta-right", width: fill, height: hug, gap: 22 }, [
        statementLine("Meta-attractor", "Separates durable intent from examples, contradictions, and transient context.", C.teal),
        statementLine("Dark-factory orchestrator", "Routes greenfield, brownfield, artifact-only, review-only, handoff, recovery, and governance-update modes.", C.green),
        statementLine("Specialized skills", "Intake, methodology, artifact generation, review, traceability, SRE, memory, and feedback learning.", C.amber),
        statementLine("Control objects", "Attractor record, control graph, work ledger, refinery gate, token budget, change request.", C.red),
      ]),
    ],
  ),
});

contentSlide({
  name: "greenfield-tree",
  eyebrow: "GREENFIELD TASK TREE",
  title: "A new project starts with interrogation, not implementation.",
  subtitle:
    "The example todo/habits app is only a simulation target; the repeatable product is the project factory around any domain.",
  children: grid(
    {
      name: "greenfield-tree-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1), fr(1)],
      columnGap: 26,
      rowGap: 20,
      alignItems: "stretch",
    },
    [
      stepNode("1", "Field formation", "Attractor record, routing decision, open decisions, waiver list.", C.teal),
      stepNode("2", "Engagement setup", "Client owner, delivery owner, scope baseline, token budget.", C.amber),
      stepNode("3", "Customer interrogation", "Rounds, answer IDs, contradictions, completeness, approval.", C.green),
      stepNode("4", "Spec decomposition", "Vision to branches to atomic acceptance leaves with trace links.", C.teal),
      stepNode("5", "Architecture and plan", "Alternatives, MDA/DDD choices, ADRs, test strategy, work ledger.", C.green),
      stepNode("6", "Build and certify", "Implementation packages, checks, refinery record, handoff package.", C.amber),
    ],
  ),
});

contentSlide({
  name: "brownfield-tree",
  eyebrow: "BROWNFIELD TASK TREE",
  title: "Existing systems need recon, drift repair, and change control before edits.",
  subtitle:
    "Brownfield delivery is where evidence and context memory become more valuable than raw generation speed.",
  children: grid(
    {
      name: "brownfield-tree-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1), fr(1)],
      columnGap: 26,
      rowGap: 20,
      alignItems: "stretch",
    },
    [
      stepNode("1", "Freeze intent", "Capture target behavior, assumptions, contradictions, and approval state.", C.teal),
      stepNode("2", "Discover reality", "Repo map, architecture, tests, dependencies, commands, operations, risks.", C.green),
      stepNode("3", "Analyze impact", "Affected requirements, artifacts, code, tests, runbooks, and token forecast.", C.amber),
      stepNode("4", "Choose strategy", "Alternatives, debate, human decision, refinery pre-check, rollback plan.", C.teal),
      stepNode("5", "Approve change", "Scope, token, schedule, quality, and risk impact before rebaseline.", C.green),
      stepNode("6", "Implement and replay", "Small change, regression evidence, artifact updates, handoff replay.", C.amber),
    ],
  ),
});

contentSlide({
  name: "interrogation",
  eyebrow: "SPEC DEVELOPMENT",
  title: "The first product move is a governed customer interrogation protocol.",
  subtitle:
    "Questions are not a checklist; they are rounds with answer capture, contradiction scoring, re-interrogation, and approval mechanics.",
  children: column({ name: "interrogation-body", width: fill, height: grow(1), gap: 24, justify: "center" }, [
    grid(
      {
        name: "interrogation-rounds",
        width: fill,
        height: hug,
        columns: [fr(1), fr(1), fr(1)],
        columnGap: 26,
        rowGap: 20,
      },
      [
        stepNode("R1", "Intent and outcomes", "Why now, stakeholders, success measures, exclusions.", C.teal),
        stepNode("R2", "Users and workflows", "Actors, journeys, edge cases, permissions, service levels.", C.green),
        stepNode("R3", "Constraints and risks", "Stack, compliance, security, data, schedule, budget assumptions.", C.amber),
        stepNode("R4", "Contradiction pass", "Conflicts, missing owners, ambiguous words, impossible constraints.", C.red),
        stepNode("R5", "Completeness score", "Branch coverage, unanswered areas, acceptance gaps, holdouts.", C.teal),
        stepNode("R6", "Approval gate", "Accepted assumptions, deferred questions, signed baseline, next budget.", C.green),
      ],
    ),
  ]),
});

contentSlide({
  name: "decomposition",
  eyebrow: "RECURSIVE VALIDATION",
  title: "Specs decompose until each leaf can be tested, traced, and owned.",
  subtitle:
    "Completeness is validated branch by branch, with re-interview triggers when the tree exposes a gap.",
  children: grid(
    {
      name: "decomposition-grid",
      width: fill,
      height: grow(1),
      columns: [fr(0.95), fr(1.05)],
      columnGap: 56,
      alignItems: "center",
    },
    [
      column({ name: "decomp-left", width: fill, height: hug, gap: 18 }, [
        stepNode("V", "Vision", "Business goal, buyer outcome, success definition.", C.teal),
        stepNode("C", "Capabilities", "Major product abilities and user-visible value.", C.green),
        stepNode("B", "Branches", "Use cases, NFRs, security, data, operations, integrations.", C.amber),
        stepNode("L", "Leaves", "Atomic acceptance criteria with owner, proof method, and trace ID.", C.red),
      ]),
      column({ name: "decomp-right", width: fill, height: hug, gap: 26 }, [
        statementLine("Completeness scoring", "Each branch has coverage score, open-question count, risk level, and approval state.", C.teal),
        statementLine("Contradiction scoring", "Conflicting answers become explicit defects in the spec, not hidden interpretation.", C.red),
        statementLine("Holdout scenarios", "Examples reserved for transfer tests prevent overfitting to a single simulation app.", C.green),
        statementLine("Trace closure", "Every accepted leaf links back to answer IDs and forward to tests and artifacts.", C.amber),
      ]),
    ],
  ),
});

contentSlide({
  name: "assurance",
  eyebrow: "SOFTWARE ASSURANCE",
  title: "The assurance layer is evidence, not vibes.",
  subtitle:
    "Every meaningful artifact is accepted only after traceability, verification, expert review, and residual-risk recording.",
  children: grid(
    {
      name: "assurance-grid",
      width: fill,
      height: grow(1),
      columns: [fr(0.92), fr(1.08)],
      columnGap: 64,
      alignItems: "center",
    },
    [
      column({ name: "assurance-metrics", width: fill, height: hug, gap: 34 }, [
        openMetric("3", "expert roles per material node", C.teal),
        openMetric("15", "rubric checks per reviewer", C.green),
        openMetric("100%", "mandatory trace closure target", C.amber),
      ]),
      column({ name: "assurance-lines", width: fill, height: hug, gap: 29 }, [
        statementLine(
          "Reviews are governed objects.",
          "Independent scores, cross-critique, failed-point fixes, and certificates are recorded.",
          C.teal,
        ),
        statementLine(
          "Traceability is bidirectional.",
          "Customer answers link forward to requirements, artifacts, decisions, code, tests, risks, and handoffs.",
          C.green,
        ),
        statementLine(
          "Templates are never proof.",
          "Validators distinguish blank templates from instantiated evidence and signed gate records.",
          C.amber,
        ),
      ]),
    ],
  ),
});

contentSlide({
  name: "review-depth",
  eyebrow: "QUALITY REFINERY",
  title: "Expert review is a governed work product, not a comment thread.",
  subtitle:
    "The review loop creates records that can be inspected, replayed, and used to improve the factory itself.",
  children: grid(
    {
      name: "review-depth-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1)],
      columnGap: 56,
      alignItems: "center",
    },
    [
      column({ name: "review-depth-left", width: fill, height: hug, gap: 24 }, [
        statementLine("Independent proposals", "Each expert first thinks alone: solution, assumptions, risks, evidence needed.", C.teal),
        statementLine("Cross critique", "Experts critique the other proposals using role-specific 15-point rubrics.", C.green),
        statementLine("Synthesis and vote", "Moderator creates alternatives, recommends one, records votes and rationale.", C.amber),
        statementLine("Fix loop", "Failed rubric points create required fixes and evidence before certificate.", C.red),
      ]),
      column({ name: "review-depth-right", width: fill, height: hug, gap: 32 }, [
        openMetric("3", "minimum expert perspectives", C.teal),
        openMetric("45", "minimum checks per material artifact", C.green),
        openMetric("0", "silent failures allowed through a gate", C.amber),
      ]),
    ],
  ),
});

contentSlide({
  name: "governance",
  eyebrow: "CLIENT GOVERNANCE",
  title: "The engagement model feels like a serious outsourcing relationship.",
  subtitle:
    "Scope, checkpoints, approvals, token budgets, change requests, and acceptance gates are first-class product objects.",
  children: grid(
    {
      name: "governance-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1)],
      columnGap: 54,
      alignItems: "center",
    },
    [
      column({ name: "governance-left", width: fill, height: hug, gap: 22 }, [
        statementLine(
          "Token SWAG before material spend",
          "Low, mid, and high ranges include assumptions, exclusions, confidence, and reapproval triggers.",
          C.amber,
        ),
        statementLine(
          "Checkpoint cadence by default",
          "Iteration objectives, acceptance criteria, and evidence state are visible to the client.",
          C.teal,
        ),
        statementLine(
          "Change management is explicit",
          "Scope, token, schedule, quality, and risk impacts are reviewed before the run rebaselines.",
          C.green,
        ),
      ]),
      panel(
        {
          name: "governance-record",
          width: fill,
          height: hug,
          padding: { x: 34, y: 30 },
          fill: C.panel,
          line: { width: 1, fill: C.line },
          borderRadius: "rounded-md",
        },
        column({ width: fill, height: hug, gap: 18 }, [
          text("Engagement Governance Record", {
            name: "governance-record-title",
            width: fill,
            height: hug,
            style: { fontSize: 30, bold: true, color: C.ink },
          }),
          rule({ name: "governance-record-rule", width: fill, stroke: C.line, weight: 2 }),
          text("client owner | dark-factory owner | scope baseline", {
            name: "governance-record-row-1",
            width: fill,
            height: hug,
            style: { fontSize: 22, color: C.soft },
          }),
          text("token SWAG | checkpoint plan | iteration approvals", {
            name: "governance-record-row-2",
            width: fill,
            height: hug,
            style: { fontSize: 22, color: C.soft },
          }),
          text("change-control policy | acceptance gate | risk rebaseline", {
            name: "governance-record-row-3",
            width: fill,
            height: hug,
            style: { fontSize: 22, color: C.soft },
          }),
        ]),
      ),
    ],
  ),
});

contentSlide({
  name: "token-economics",
  eyebrow: "TOKEN ECONOMICS",
  title: "Tokens become the managed delivery budget.",
  subtitle:
    "The product does not promise magical certainty; it makes uncertainty visible, bounded, approved, and re-estimated as the work decomposes.",
  children: grid(
    {
      name: "token-economics-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1), fr(1), fr(1)],
      columnGap: 24,
      alignItems: "center",
    },
    [
      stepNode("1", "Estimate", "Low/mid/high token SWAG, assumptions, exclusions, confidence.", C.teal),
      stepNode("2", "Approve", "Client approves material token spend before governed work proceeds.", C.green),
      stepNode("3", "Burn and observe", "Work ledger and checkpoints expose forecast drift and evidence state.", C.amber),
      stepNode("4", "Rebaseline", "Scope, token, schedule, quality, or risk drift triggers change approval.", C.red),
    ],
  ),
});

contentSlide({
  name: "project-book",
  eyebrow: "PROJECT BOOK",
  title: "The output is a living SDLC project book, not a pile of files.",
  subtitle:
    "Artifacts can be combined or split, but required information must be current, traceable, reviewed, and versioned.",
  children: grid(
    {
      name: "project-book-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1), fr(1)],
      columnGap: 26,
      rowGap: 20,
      alignItems: "stretch",
    },
    [
      stepNode("GOV", "Governance", "Charter, standards tailoring, RASCI, risk, change, quality, AI governance.", C.teal),
      stepNode("REQ", "Requirements", "BRD, SRS, NFR catalog, scenarios, assumptions, interrogation, decomposition.", C.green),
      stepNode("ARC", "Architecture", "HLD, LLD, ADRs, APIs, data model, threat model, observability design.", C.amber),
      stepNode("MDA/DDD", "Models", "CIM, PIM, PSM, transformations, bounded contexts, aggregates, ACLs.", C.teal),
      stepNode("V&V", "Verification", "Test strategy, procedures, evidence, holdouts, security, performance, UX.", C.green),
      stepNode("REL/EVD", "Release and evidence", "Release plan, runbooks, incident guides, trace matrix, certificates.", C.amber),
    ],
  ),
});

contentSlide({
  name: "modules",
  eyebrow: "PRODUCT MODULES",
  title: "A skill hierarchy that can run greenfield, brownfield, and handoff work.",
  subtitle:
    "Each module owns a defined slice of the delivery factory, with trace links and refinery gates connecting them.",
  children: grid(
    {
      name: "module-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1), fr(1)],
      rowGap: 18,
      columnGap: 22,
      alignItems: "stretch",
    },
    [
      stepNode("01", "Meta-attractor", "Forms the project field and routes governed work.", C.teal),
      stepNode("02", "Intake spec lab", "Interrogation, decomposition, completeness scoring.", C.green),
      stepNode("03", "Governance mayor", "Standards tailoring, approvals, and phase exits.", C.amber),
      stepNode("04", "Methodology blender", "RUP, MDA, DDD, TDD, BDD, SRE, ISO composition.", C.teal),
      stepNode("05", "Artifact factory", "BRD, SRS, NFRs, HLD, LLD, ADRs, test plans.", C.green),
      stepNode("06", "Swarm coordination", "Expert roles, debate rounds, decisions, escalation.", C.amber),
      stepNode("07", "Quality refinery", "Rubrics, verification, certificates, fix loops.", C.teal),
      stepNode("08", "Trace evidence", "Bidirectional links and evidence ledgers.", C.green),
      stepNode("09", "SRE handoff", "Release, runbooks, drills, incident readiness.", C.amber),
    ],
  ),
});

contentSlide({
  name: "assurance-skill-mesh",
  eyebrow: "SKILL QUALITY",
  title: "Call it a Comprehensive Assurance Skill Mesh.",
  subtitle:
    "The language should be ambitious, but every claim is earned by evidence gates, not marketing adjectives.",
  children: grid(
    {
      name: "assurance-skill-mesh-grid",
      width: fill,
      height: grow(1),
      columns: [fr(0.9), fr(1.1)],
      columnGap: 58,
      alignItems: "center",
    },
    [
      column({ name: "skill-mesh-left", width: fill, height: fixed(620), gap: 22, justify: "center" }, [
        openMetric("industry-grade", "standards-mapped and expert-reviewed", C.teal),
        openMetric("comprehensive", "full task-tree coverage to testable leaves", C.green),
        openMetric("assured", "validator-backed evidence and certificates", C.amber),
      ]),
      column({ name: "skill-mesh-right", width: fill, height: hug, gap: 22 }, [
        statementLine("Full coverage is a gate state", "Inputs, outputs, artifacts, decisions, risks, tests, handoff, and learning are all covered or explicitly waived.", C.teal),
        statementLine("Industry-grade is evidence-backed", "Each skill has module contracts, standards basis, 3-expert review, 15-point rubrics, and trace closure.", C.green),
        statementLine("Industry-leader-validated is reserved", "Use that label only after actual named external reviewers sign off with evidence.", C.amber),
      ]),
    ],
  ),
});

contentSlide({
  name: "external-skills",
  eyebrow: "EXTERNAL SKILL SUPPLY CHAIN",
  title: "DFMS should harvest the best public skills without inheriting their risk.",
  subtitle:
    "Claude Code skills, Agent Skills, and GitHub marketplaces become source material for governed DFMS-native capabilities.",
  children: grid(
    {
      name: "external-skills-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1), fr(1), fr(1)],
      columnGap: 24,
      alignItems: "center",
    },
    [
      stepNode("1", "Discover", "Official skills, curated lists, community marketplaces, single-purpose repos.", C.teal),
      stepNode("2", "Evaluate", "Fit, maturity, maintenance, portability, docs, examples, and testability.", C.green),
      stepNode("3", "Assure", "License, scripts, dependencies, network behavior, secrets, prompt-injection risk.", C.amber),
      stepNode("4", "Adapt", "Convert patterns into DFMS-native skills with rubrics, templates, validators, evidence.", C.red),
    ],
  ),
  footer: "Sources: anthropics/skills, anthropics/claude-plugins-official, awesome-skills.com; imported patterns must pass DFMS gates.",
});

contentSlide({
  name: "skill-curation",
  eyebrow: "SKILL CURATION MATRIX",
  title: "Every factory role can have a best-of-breed skill bench.",
  subtitle:
    "The product becomes stronger when each role has a curated set of skills, test fixtures, validators, and fallback procedures.",
  children: grid(
    {
      name: "skill-curation-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1), fr(1)],
      columnGap: 26,
      rowGap: 20,
      alignItems: "stretch",
    },
    [
      stepNode("Spec", "Requirements bench", "Interviewing, decomposition, NLSpec, acceptance criteria, contradiction checks.", C.teal),
      stepNode("Arch", "Architecture bench", "DDD, MDA, threat modeling, API design, data modeling, ADR critique.", C.green),
      stepNode("Build", "Engineering bench", "TDD, migration generation, dependency checks, code review, refactor plans.", C.amber),
      stepNode("Verify", "QA/security bench", "Test generation, fuzzing, accessibility, static checks, evidence validation.", C.teal),
      stepNode("Ops", "SRE bench", "Runbooks, observability, incident drills, rollback, maintenance handoff.", C.green),
      stepNode("Gov", "Governance bench", "Standards tailoring, change control, token budgeting, certificates, audit export.", C.amber),
    ],
  ),
});

contentSlide({
  name: "data-objects",
  eyebrow: "CORE OBJECT MODEL",
  title: "The product's backbone is a set of durable governed objects.",
  subtitle:
    "These objects are what make the factory inspectable, resumable, and auditable across long-running work.",
  children: grid(
    {
      name: "data-objects-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1), fr(1)],
      columnGap: 24,
      rowGap: 18,
      alignItems: "stretch",
    },
    [
      stepNode("AR", "Attractor run", "Intent field, routing decision, stable state, open decisions.", C.teal),
      stepNode("CG", "Control graph", "Nodes, gates, child skills, decisions, evidence outputs, re-entry paths.", C.green),
      stepNode("WL", "Work ledger", "Requirements, tasks, risks, artifacts, owners, statuses, next actions.", C.amber),
      stepNode("EG", "Engagement record", "Client/delivery owners, token budget, checkpoints, change control.", C.teal),
      stepNode("RG", "Refinery gate", "Rubrics, tests, traceability, security/ops checks, residual risk.", C.green),
      stepNode("PB", "Project book", "Current knowledge index for fresh humans and fresh Codex sessions.", C.amber),
    ],
  ),
});

contentSlide({
  name: "standards",
  eyebrow: "STANDARDIZATION",
  title: "Standards become operating controls, not appendix claims.",
  subtitle:
    "DFMS maps lifecycle, artifacts, security, assurance, and operations into explicit nodes and gates.",
  children: grid(
    {
      name: "standards-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1.05), fr(0.95)],
      columnGap: 52,
      alignItems: "center",
    },
    [
      column({ name: "standards-list", width: fill, height: hug, gap: 20 }, [
        statementLine("ISO/IEC/IEEE 12207", "Lifecycle process coverage and phase outcomes.", C.teal),
        statementLine("ISO/IEC/IEEE 15289", "Information-item discipline for SDLC artifacts.", C.green),
        statementLine("NIST SSDF + OWASP SAMM", "Secure development and assurance maturity controls.", C.amber),
        statementLine("OMG MDA + UML + DDD", "Modeling, bounded contexts, and transformation evidence.", C.red),
      ]),
      column({ name: "standards-claim", width: fill, height: hug, gap: 26 }, [
        text("The pitch is not compliance theater.", {
          name: "standards-big",
          width: wrap(620),
          height: hug,
          style: { fontSize: 58, bold: true, color: C.ink },
        }),
        text(
          "Each selected standard changes what the factory must produce, review, trace, and verify before a gate closes.",
          {
            name: "standards-body",
            width: wrap(610),
            height: hug,
            style: S.bodyMuted,
          },
        ),
      ]),
    ],
  ),
  footer: "Standards baseline from DFMS design docs; exact tailoring is project-specific.",
});

contentSlide({
  name: "trace-model",
  eyebrow: "TRACEABILITY",
  title: "Every important object must explain why it exists and what proves it.",
  subtitle:
    "Bidirectional traceability ties customer answers to requirements, artifacts, decisions, code, tests, operations, and acceptance.",
  children: grid(
    {
      name: "trace-model-grid",
      width: fill,
      height: grow(1),
      columns: [fr(0.88), fr(1.12)],
      columnGap: 62,
      alignItems: "center",
    },
    [
      column({ name: "trace-left", width: fill, height: hug, gap: 30 }, [
        openMetric("forward", "intent -> requirement -> design -> code -> test -> handoff", C.teal),
        openMetric("reverse", "artifact -> proof -> decision -> answer -> owner", C.green),
      ]),
      column({ name: "trace-right", width: fill, height: hug, gap: 22 }, [
        statementLine("Link classes", "satisfies, verifies, derives_from, implements, mitigates, decides, supersedes, blocks.", C.teal),
        statementLine("Control proof", "Material work maps to a control graph node and work-ledger item or has an explicit waiver.", C.green),
        statementLine("Refinery proof", "Acceptance or rework outcome is recorded with evidence and residual risk.", C.amber),
        statementLine("Replay proof", "A fresh human or agent can continue from the package without guessing.", C.red),
      ]),
    ],
  ),
});

contentSlide({
  name: "control-room",
  eyebrow: "PRODUCT SURFACE",
  title: "The natural UI is a delivery control room.",
  subtitle:
    "A buyer should see what the factory is doing, what it costs in tokens, what is blocked, and what evidence exists.",
  children: grid(
    {
      name: "control-room-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1.15), fr(0.85)],
      columnGap: 42,
      alignItems: "center",
    },
    [
      panel(
        {
          name: "control-room-mock",
          width: fill,
          height: fixed(520),
          padding: { x: 30, y: 28 },
          fill: C.panel,
          line: { width: 1, fill: C.line },
          borderRadius: "rounded-md",
        },
        column({ width: fill, height: fill, gap: 20 }, [
          row({ width: fill, height: hug, justify: "between", align: "center" }, [
            text("Run: GOV-ACME-014", { name: "control-room-title", width: hug, height: hug, style: { fontSize: 24, bold: true, color: C.ink } }),
            pill("checkpoint pending", "amber", 190),
          ]),
          grid(
            { name: "control-room-metrics", width: fill, height: hug, columns: [fr(1), fr(1), fr(1)], columnGap: 18 },
            [
              stepNode("73%", "trace closure", "Mandatory links closed.", C.green),
              stepNode("mid", "token forecast", "Within approved SWAG.", C.amber),
              stepNode("2", "open decisions", "Need client approval.", C.red),
            ],
          ),
          rule({ name: "control-room-rule", width: fill, stroke: C.line, weight: 2 }),
          text("current node: recursive spec decomposition -> branch completeness review -> re-interrogation triggers", {
            name: "control-room-node",
            width: fill,
            height: hug,
            style: { fontSize: 23, color: C.soft },
          }),
          text("evidence: answer IDs, control graph node, work-ledger item, rubric scorecards, refinery pre-check", {
            name: "control-room-evidence",
            width: fill,
            height: hug,
            style: { fontSize: 23, color: C.mint },
          }),
        ]),
      ),
      column({ name: "control-room-right", width: fill, height: hug, gap: 24 }, [
        statementLine("For clients", "Approve scope, tokens, changes, and acceptance with confidence.", C.teal),
        statementLine("For delivery", "Know exactly which node, owner, artifact, and proof is next.", C.green),
        statementLine("For auditors", "Export the project book, trace ledger, certificates, and residual risks.", C.amber),
      ]),
    ],
  ),
});

contentSlide({
  name: "sre-handoff",
  eyebrow: "OPERATIONS",
  title: "Production handoff is a first-class product outcome.",
  subtitle:
    "If humans own production, the factory still has to prepare them to debug, operate, and maintain the system.",
  children: grid(
    {
      name: "sre-handoff-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1), fr(1)],
      columnGap: 26,
      rowGap: 20,
      alignItems: "stretch",
    },
    [
      stepNode("1", "Release readiness", "Deployment guide, rollback, config, dependency, and environment proof.", C.teal),
      stepNode("2", "Observability", "SLIs, logs, metrics, traces, alerts, dashboards, ownership.", C.green),
      stepNode("3", "Incident path", "Failure modes, diagnosis, escalation, mitigation, security response.", C.amber),
      stepNode("4", "Outage drill", "Runbook replay against scenarios with operator signoff.", C.red),
      stepNode("5", "Maintenance guide", "Code map, common changes, regression commands, known risks.", C.teal),
      stepNode("6", "Human training", "Walkthrough, evidence package, open risks, and handback path.", C.green),
    ],
  ),
});

contentSlide({
  name: "memory-learning",
  eyebrow: "CONTEXT AND LEARNING",
  title: "The factory must survive long projects and improve after every run.",
  subtitle:
    "Context rot is treated as a product defect. Lessons feed back into templates, validators, rubrics, and scenarios.",
  children: grid(
    {
      name: "memory-learning-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1)],
      columnGap: 58,
      alignItems: "center",
    },
    [
      column({ name: "memory-left", width: fill, height: hug, gap: 24 }, [
        statementLine("Project book index", "Fresh current-state map instead of reading the full repo and transcript history.", C.teal),
        statementLine("Predecessor recovery", "Recover decisions, drift, and next action when a new session resumes.", C.green),
        statementLine("Replay drills", "Prove that handoff packages work by having a fresh actor continue safely.", C.amber),
      ]),
      column({ name: "learning-right", width: fill, height: hug, gap: 24 }, [
        statementLine("Retrospective records", "Capture friction, failures, missed checks, and human feedback.", C.red),
        statementLine("Template updates", "Improve artifacts, validators, and rubrics based on observed defects.", C.teal),
        statementLine("Standards watch", "Version baselines and update process when standards or company policy changes.", C.green),
      ]),
    ],
  ),
});

contentSlide({
  name: "risk-controls",
  eyebrow: "RISK CONTROLS",
  title: "The product wins trust by refusing to hide residual risk.",
  subtitle:
    "Every serious delivery system has risk; DFMS makes risk explicit, owned, time-bounded, and tied to evidence.",
  children: grid(
    {
      name: "risk-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1), fr(1)],
      columnGap: 26,
      rowGap: 20,
      alignItems: "stretch",
    },
    [
      stepNode("R1", "Spec ambiguity", "Contradiction scoring, re-interrogation, assumption approval.", C.red),
      stepNode("R2", "Overfitting", "Holdout scenarios and transfer tests across greenfield/brownfield examples.", C.amber),
      stepNode("R3", "False proof", "Validators reject blank templates and missing instantiated evidence.", C.teal),
      stepNode("R4", "Budget drift", "Token SWAG reapproval rules and change-control impact fields.", C.green),
      stepNode("R5", "Context rot", "Project book, predecessor recovery, and replay drills.", C.amber),
      stepNode("R6", "Production fear", "Runbooks, outage drills, incident replay, and human signoff.", C.red),
    ],
  ),
});

contentSlide({
  name: "use-cases",
  eyebrow: "WHERE IT WINS",
  title: "Best first customers have software risk, not just coding backlog.",
  subtitle:
    "The factory is strongest where buyer confidence, evidence, and handoff matter as much as speed.",
  children: grid(
    {
      name: "usecase-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1)],
      columnGap: 42,
      rowGap: 20,
    },
    [
      stepNode("A", "Regulated product teams", "Need requirements, tests, security evidence, and audit-ready handoff.", C.green),
      stepNode("B", "Brownfield modernization", "Need recon, impact analysis, drift repair, and regression proof.", C.teal),
      stepNode("C", "Enterprise app delivery", "Need PRD-to-production artifacts with client checkpoints.", C.amber),
      stepNode("D", "SRE and maintenance transfer", "Need runbooks, drills, incident replay, and owner confidence.", C.red),
      stepNode("E", "Vendor oversight teams", "Need visibility into token spend, change requests, and acceptance gates.", C.green),
      stepNode("F", "AI transformation offices", "Need reusable delivery method, not one-off demonstrations.", C.teal),
    ],
  ),
});

contentSlide({
  name: "competition",
  eyebrow: "POSITIONING",
  title: "DFMS bridges outsourcing firms and AI coding tools.",
  subtitle:
    "It borrows the trust rituals of delivery firms, then makes them machine-checkable and token-governed.",
  children: column({ name: "competition-body", width: fill, height: grow(1), gap: 22, justify: "center" }, [
    grid(
      {
        name: "competition-header",
        width: fill,
        height: hug,
        columns: [fr(1.02), fr(1.02), fr(1.18)],
        columnGap: 28,
      },
      [
        text("Outsourcing firms", { name: "competition-h-a", width: fill, height: hug, style: S.label }),
        text("AI coding tools", { name: "competition-h-b", width: fill, height: hug, style: S.label }),
        text("DFMS product", { name: "competition-h-c", width: fill, height: hug, style: S.label }),
      ],
    ),
    rule({ name: "competition-rule", width: fill, stroke: C.line, weight: 2 }),
    comparisonRow(
      "People-heavy status rituals",
      "Fast local task completion",
      "Governed control graph with live evidence",
      "good",
    ),
    comparisonRow(
      "Budget managed in dollars",
      "Compute spend is hidden or ad hoc",
      "Token SWAGs, approvals, and reapproval triggers",
      "warn",
    ),
    comparisonRow(
      "Artifacts often lag reality",
      "Artifacts often absent",
      "Artifacts, trace links, tests, and handoffs evolve together",
      "good",
    ),
    comparisonRow(
      "Quality depends on delivery team maturity",
      "Quality depends on prompt discipline",
      "Quality is rubric-scored, evidence-gated, and replayable",
      "good",
    ),
  ]),
});

contentSlide({
  name: "packaging-gtm",
  eyebrow: "GO-TO-MARKET",
  title: "Package it as assurance infrastructure for agentic delivery.",
  subtitle:
    "The wedge is not cheaper coding. The wedge is a buyer-approved delivery system that makes agent work inspectable.",
  children: grid(
    {
      name: "gtm-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1), fr(1), fr(1)],
      columnGap: 26,
      alignItems: "center",
    },
    [
      stepNode("Pilot", "Assured project run", "One greenfield and one brownfield run with project book and evidence ledger.", C.teal),
      stepNode("Team", "Delivery control plane", "Reusable skill bundle, templates, validators, checkpoint process.", C.green),
      stepNode("Enterprise", "Assurance platform", "Policy packs, dashboard, SSO, repo/CI integrations, audit export.", C.amber),
    ],
  ),
});

contentSlide({
  name: "moat",
  eyebrow: "DEFENSIBILITY",
  title: "The moat is the operating system for trustworthy agent delivery.",
  subtitle:
    "The longer it runs, the stronger the evidence corpus, rubrics, validators, and learned delivery patterns become.",
  children: grid(
    {
      name: "moat-grid",
      width: fill,
      height: grow(1),
      columns: [fr(0.88), fr(1.12)],
      columnGap: 62,
      alignItems: "center",
    },
    [
      column({ name: "moat-left", width: fill, height: hug, gap: 20 }, [
        text("Compounding assets", {
          name: "moat-left-title",
          width: fill,
          height: hug,
          style: { fontSize: 42, bold: true, color: C.ink },
        }),
        text("Not models alone. The durable advantage is the delivery method, evidence structure, and institutional memory.", {
          name: "moat-left-body",
          width: wrap(560),
          height: hug,
          style: S.bodyMuted,
        }),
      ]),
      column({ name: "moat-right", width: fill, height: hug, gap: 24 }, [
        statementLine("Project books", "Reusable records of requirements, designs, tests, decisions, risks, and handoffs.", C.teal),
        statementLine("Expert rubrics", "Reviewer-specific 15-point standards that harden with real failure data.", C.green),
        statementLine("Validators", "Machine checks that reject templates, missing proofs, and drifted bundles.", C.amber),
        statementLine("Context recovery", "Predecessor summaries and replay drills keep long projects coherent.", C.red),
      ]),
    ],
  ),
});

contentSlide({
  name: "roadmap",
  eyebrow: "ROADMAP",
  title: "A staged product path from skill bundle to enterprise control room.",
  subtitle:
    "Start with Codex skills and evidence artifacts; graduate to dashboards, integrations, and organization-level assurance.",
  children: column({ name: "roadmap-body", width: fill, height: grow(1), gap: 26, justify: "center" }, [
    grid(
      {
        name: "roadmap-grid",
        width: fill,
        height: hug,
        columns: [fr(1), fr(1), fr(1), fr(1)],
        columnGap: 24,
      },
      [
        stepNode("0", "Skill bundle", "Installable DFMS skills, templates, validators, and project books.", C.teal),
        stepNode("1", "Pilot runtime", "Guided greenfield and brownfield runs with token governance.", C.green),
        stepNode("2", "Control dashboard", "Live graph, ledger, evidence, budget, and checkpoint state.", C.amber),
        stepNode("3", "Enterprise assurance", "SSO, policy packs, repo integrations, audit export, org memory.", C.red),
      ],
    ),
    rule({ name: "roadmap-rule", width: fill, stroke: C.line, weight: 2 }),
    text(
      "The critical product proof is not a demo app. It is a repeatable run where a skeptical buyer can inspect the evidence and approve the next iteration with confidence.",
      {
        name: "roadmap-proof",
        width: wrap(1450),
        height: hug,
        style: { fontSize: 32, bold: true, color: C.ink },
      },
    ),
  ]),
});

contentSlide({
  name: "ask",
  eyebrow: "PILOT ASK",
  title: "Prove the product on one greenfield project and one brownfield change.",
  subtitle:
    "The pilot should test confidence transfer: can the client trust the factory's evidence enough to approve the next iteration?",
  children: grid(
    {
      name: "ask-grid",
      width: fill,
      height: grow(1),
      columns: [fr(1.02), fr(0.98)],
      columnGap: 58,
      alignItems: "center",
    },
    [
      column({ name: "ask-left", width: fill, height: hug, gap: 24 }, [
        statementLine("Greenfield pilot", "Run from interrogation to PRD, architecture, build plan, evidence, and handoff.", C.teal),
        statementLine("Brownfield pilot", "Run recon, impact analysis, change request, regression proof, and updated artifacts.", C.green),
        statementLine("Success gate", "Client can approve or reject the next iteration using evidence, not trust alone.", C.amber),
      ]),
      panel(
        {
          name: "ask-token-record",
          width: fill,
          height: hug,
          padding: { x: 34, y: 32 },
          fill: C.panel2,
          line: { width: 1, fill: C.line },
          borderRadius: "rounded-md",
        },
        column({ width: fill, height: hug, gap: 20 }, [
          text("Pilot budget contract", {
            name: "ask-token-title",
            width: fill,
            height: hug,
            style: { fontSize: 34, bold: true, color: C.ink },
          }),
          text("Rough token SWAG: low / mid / high", {
            name: "ask-token-1",
            width: fill,
            height: hug,
            style: { fontSize: 24, color: C.soft },
          }),
          text("Approved iteration objective and acceptance criteria", {
            name: "ask-token-2",
            width: fill,
            height: hug,
            style: { fontSize: 24, color: C.soft },
          }),
          text("Change-control trigger for scope, tokens, schedule, quality, or risk", {
            name: "ask-token-3",
            width: fill,
            height: hug,
            style: { fontSize: 24, color: C.soft },
          }),
          text("Output: project book, evidence ledger, quality certificate, handoff package", {
            name: "ask-token-4",
            width: fill,
            height: hug,
            style: { fontSize: 24, color: C.mint },
          }),
        ]),
      ),
    ],
  ),
});

async function saveBlob(blob, targetPath) {
  if (typeof blob.save === "function") {
    await blob.save(targetPath);
    return;
  }
  if (blob.data) {
    await fs.writeFile(targetPath, blob.data);
    return;
  }
  const arrayBuffer = await blob.arrayBuffer();
  await fs.writeFile(targetPath, Buffer.from(arrayBuffer));
}

const pptxBlob = await PresentationFile.exportPptx(presentation);
await saveBlob(pptxBlob, PPTX_PATH);

const layoutSummaries = [];
for (let i = 0; i < presentation.slides.count; i += 1) {
  const slide = presentation.slides.getItem(i);
  const pngPath = path.join(PREVIEW_DIR, `slide-${String(i + 1).padStart(2, "0")}.png`);
  const layoutPath = path.join(LAYOUT_DIR, `slide-${String(i + 1).padStart(2, "0")}.layout.json`);
  await saveBlob(await slide.export({ format: "png" }), pngPath);
  const layoutBlob = await slide.export({ format: "layout" });
  await saveBlob(layoutBlob, layoutPath);
  const layoutText = await fs.readFile(layoutPath, "utf8");
  const layout = JSON.parse(layoutText);
  layoutSummaries.push({
    slide: i + 1,
    elements: layout.elements?.length ?? 0,
    textElements: layout.elements?.filter((element) => element.text).length ?? 0,
    path: layoutPath,
    preview: pngPath,
  });
}

const report = {
  titlePageConcept,
  deckPlan,
  slideCount: presentation.slides.count,
  exportedDeck: PPTX_PATH,
  previews: PREVIEW_DIR,
  layouts: LAYOUT_DIR,
  layoutSummaries,
  qaNotes: [
    "All slides were exported to PNG previews from the authored presentation.",
    "Layout JSON was exported for every slide to support text and bounds inspection.",
    "Deck avoids external market-size claims; product claims are based on DFMS source artifacts.",
  ],
};

await fs.writeFile(QA_PATH, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
