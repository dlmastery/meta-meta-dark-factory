**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# Meta-Meta Dark Factory

Meta-Meta Dark Factory is a local, standards-oriented agentic SDLC factory package. It contains a meta-meta attractor, generated meta-skill design records, Codex skill bundles, a local project-control console, and a todo/habits demonstrator project book used as an evidence-bearing example.

This repository is not allowed to claim that the full outsourcing-replacement product is finished. The current evidence supports a bounded local factory slice:

- `RB-01` through `RB-08` are accepted for their stated local evidence boundaries.
- The todo/habits demonstrator has current-catalog saturation evidence: 55 standalone artifacts, 8 explicit not-applicable waivers, zero missing/partial/combined/deferred catalog entries, review package, quality certificate, dashboard index, and browser screenshots.
- `RB-09` is the final Hawkeye/public-hardening track. It verifies public repo posture, reproducibility, overclaim controls, validation commands, and residual risks.
- `PB-01` adds a local product-platform spine and a guided agentic UX rescue slice: mission-control first viewport, workflow runway, legal-next-action supervisor pane, human decision queue, runtime spine, and Playwright desktop/mobile no-overflow checks.
- A full hosted multi-user outsourcing-replacement product still needs production platform work: authentication/RBAC, durable database, provider orchestration, collaboration, hosted deployment, CI/CD, policy controls, and operational service management.

## What The Owner Actually Wanted

The real product target is Software Assured Dark Factory Studio:

1. A meta-meta factory that reads messy intent and compiles the right product-specific factory.
2. A generated product meta-skill that tailors standards, artifacts, experts, tests, token budgets, and no-skip gates to a project.
3. Product execution skills that create real artifacts, source code, tests, browser/WYSIWYG evidence, expert reviews, certificates, and handoff records.
4. A human-agent workflow UI where the owner can start a project, answer interrogation, approve or reject baselines, watch agent quorum work, inspect evidence, ask questions, resteer, open change requests, and rerun downstream closure.
5. A proving example, not an overfit target: the todo/habits app exists to test the factory mechanics.

The prior misses were not a lack of documents. The misses were overclaiming, confusing UX, treating templates as proof, and failing to keep code/test/product execution as first-class gates.

## Main Directories

- `codex-skills/` - Codex skill bundle, validators, templates, and method/rubric references.
- `dark-factory-meta-skills-design/` - meta-meta design records, RALPH loops, artifact BOMs, task ledger, recovery plans, and public-hardening records.
- `dark-factory-control-console/` - local Node control console for starting, interrogating, steering, auditing, and testing a governed factory run.
- `example/worlds-best-todo-habits-app/` - bounded todo/habits app demonstrator with project book, artifacts, tests, evidence, and review portal.
- `greenfield-todo-list-project-artifacts/` - earlier PRD/artifact set used during process hardening.
- `pitch-decks/` - product pitch deck source and verified output.

## Run The Local Control Console

```powershell
cd dark-factory-control-console
npm start
```

Open [http://127.0.0.1:4187/](http://127.0.0.1:4187/).

## Validate

Run the core local checks from the workspace root:

```powershell
node dark-factory-meta-skills-design/scripts/validate_public_hardening.cjs .
node dark-factory-meta-skills-design/scripts/ralph100_recovery_kernel.cjs . dark-factory-meta-skills-design/records/ralph-100-missing-deliverable-kernel-report.json
```

Run the control console checks:

```powershell
cd dark-factory-control-console
npm test
npm run test:browser
```

Run the todo/habits demonstrator checks:

```powershell
cd example/worlds-best-todo-habits-app
node tests/core.test.cjs
node tests/static-ui-audit.cjs
node tests/accessibility-certification-audit.cjs
node tests/browser-wysiwyg.test.cjs
node tests/artifact-catalog-coverage-audit.cjs
node tests/portal-index-audit.cjs
```

## Windows Clone Note

This repository has deep artifact-library paths. If cloning on Windows into a long parent path, enable Git long paths or clone into a short path such as `C:\mmdf-public`:

```powershell
git config --global core.longpaths true
git clone https://github.com/dlmastery/meta-meta-dark-factory C:\mmdf-public
```

This is tracked as an RB-09 reproducibility risk. The package is usable, but long-path ergonomics are not yet perfect.

## Public Truth Boundary

Do not describe this package as complete, production-ready, externally certified, or a full replacement for a consulting firm without the residual-risk qualifiers in `PUBLIC_RELEASE_AUDIT.md` and `dark-factory-meta-skills-design/72-full-product-gap-register-and-plan.md`.

No open-source license has been added yet. Until the repository owner adds one, default copyright restrictions apply.
