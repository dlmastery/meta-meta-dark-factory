**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# Meta-Meta Product-Tailored Skill Compiler

## Purpose

This revision makes the double-meta structure explicit.

The meta-meta skill does not run every project directly. It compiles a product-tailored factory meta-skill. That generated meta-skill then runs the dark factory for that specific product, using the right lifecycle, artifacts, roles, testing, ledgers, and gates.

This matters because SDLC rigor is not identical for every product. A WYSIWYG editor, a banking API, a toy todo app, a brownfield migration, a data pipeline, an internal CLI, and a production SRE handoff need different SDLC emphasis while preserving the same assurance spine.

## Compiler Chain

```text
Raw user intent / transcript / repo
  -> Meta-Meta Attractor
  -> Product Tailoring Profile
  -> Methodology + Artifact + Testing Compiler
  -> Generated Product Factory Meta-Skill Contract
  -> Dark Factory Instantiation Record
  -> TASKS.md + TPM Flow + PERT + KG + SDLC Matrix
  -> Product-specific implementation, artifacts, tests, release, handoff
```

## The Core Assurance

The meta-meta skill is accepted only if it produces a generated meta-skill contract that says:

- what product archetype this is;
- what surfaces exist;
- what SDLC stages are required;
- what methods are included or excluded;
- what artifacts are mandatory, combined, deferred, or waived;
- what tests are mandatory;
- what implementation evidence is required;
- what browser/WYSIWYG evidence is required;
- what release and operations evidence is required;
- what validators must run;
- what task/PERT/graph controls will govern execution;
- what AI judge/jury roles will approve transitions;
- what boundary-human approvals still exist;
- what the generated skill must refuse to do.

If the generated meta-skill is generic, it fails. If it cannot explain why the SDLC is tailored to the product, it fails. If it cannot instantiate `TASKS.md`, TPM flow, PERT, KG, stage matrix, and quality refinery gates, it fails.

## Product Tailoring Dimensions

Every generated product factory meta-skill must classify:

| Dimension | Examples | Effect |
| --- | --- | --- |
| Product archetype | CRUD app, WYSIWYG editor, API platform, data pipeline, CLI, game, mobile app, embedded, ML system, SRE migration, regulated system | Chooses SDLC emphasis and artifact set |
| Surface flags | code, UI, API, data, production, brownfield, scenario-driven | Activates hard gates |
| Risk profile | safety, money, privacy, security, reliability, compliance, UX, migration, scale | Adds reviewers, tests, artifacts, thresholds |
| Lifecycle mode | greenfield, brownfield, artifact-only, planning-only, release-only, maintenance | Selects flow and stage exits |
| Method blend | RUP, MDA, DDD, TDD/BDD, Agile, SRE, SSDF, OWASP SAMM | Compiles methods into concrete gates |
| Evidence mode | executable tests, browser screenshots, logs, traces, reviews, approvals, drills | Defines proof required |
| Human boundary | scope, budget, production, legal, safety, privacy, irreversible risk | Defines approvals AI cannot fake |

## Archetype Examples

| Archetype | Mandatory Emphasis |
| --- | --- |
| CRUD Web App | requirements, data model, UI flows, API contracts, unit/integration/browser tests, accessibility, deployment |
| WYSIWYG Editor | interaction model, undo/redo, selection model, persistence, visual regression, Playwright drag/drop/keyboard tests |
| API Platform | OpenAPI/contract, authz/authn, negative/error tests, backward compatibility, load tests |
| Data Pipeline | schema, data contracts, lineage, validation, backfill, privacy, monitoring, recovery |
| Mobile App | device matrix, offline/sync, accessibility, app-store/release, crash/telemetry |
| Game | game loop, rules engine, performance, input latency, assets, deterministic scenario tests |
| Regulated Workflow | audit trail, approvals, traceability, privacy/security, validation protocol, release evidence |
| Brownfield Migration | recon, current behavior capture, impact analysis, regression, migration/backout, rollback |
| SRE/Platform Change | infra plan, observability, incident path, rollback, load/reliability, outage drill |
| ML/Data Product | dataset provenance, evaluation sets, holdouts, bias/safety checks, model monitoring |

## Generated Meta-Skill Must Contain

The generated product factory meta-skill must include:

- zero-slop banner;
- trigger conditions;
- product tailoring profile reference;
- declared project type flags;
- required child DFMS skills;
- lifecycle stages and stage gates;
- artifact BOM tailoring;
- testing strategy by product surface;
- implementation gates;
- browser/WYSIWYG gates where UI exists;
- scenario/holdout/transfer gates where scenarios exist;
- production gates where production exists;
- brownfield recon and regression gates where brownfield exists;
- `TASKS.md`, TPM flow, PERT, KG, SDLC matrix, and execution-kernel requirements;
- AI judge/jury roles and boundary-human approval triggers;
- refusal rules for skipped stages, docs-only completion, fake evidence, and template-as-proof;
- validation commands and expected artifacts.

## Compile-Time Gates

The meta-meta skill must run compile-time gates before a generated meta-skill is accepted:

- Product Tailoring Profile complete.
- Methodology blend compiled.
- SDLC Stage Coverage Matrix created.
- Artifact BOM tailored.
- Testing classes selected.
- Implementation and code gates selected when code is in scope.
- Browser/WYSIWYG gate selected when UI is in scope.
- Scenario/holdout/transfer gate selected when scenario-driven.
- Operations/release gate selected when production is in scope.
- Brownfield recon/regression gate selected when brownfield.
- Validators listed.
- TASKS/TPM/PERT/KG/execution kernel listed.
- AI judge/jury and boundary-human approvals listed.

## Runtime Gates

The generated meta-skill must run runtime gates before final acceptance:

- `TASKS.md` validates.
- TPM flow and PERT validate.
- Knowledge graph validates.
- SDLC Stage Coverage Matrix validates.
- Execution kernel returns legal next action or closed state.
- Artifact refinery gates pass.
- Code/test/browser/scenario/production evidence exists where required.
- Quality certificate names residual risks and cannot be template-like.

## No Generic Skill Rule

A generated product factory meta-skill fails if:

- it says "use the standard process" without product tailoring;
- it includes all artifacts blindly without tailoring;
- it omits why a stage is required, waived, deferred, or not applicable;
- it has no product-specific testing strategy;
- it cannot name the next task ledger objects it will instantiate;
- it cannot explain what it will refuse to do;
- it cannot map product surfaces to evidence.

## Assurance Statement

The assurance comes from compile-time and runtime enforcement:

- compile time proves the generated meta-skill is product-tailored;
- runtime proves the generated meta-skill actually instantiates the ledgers, tasks, stages, evidence, and gates;
- quality refinery proves the artifacts and code pass expert review;
- execution kernel prevents illegal next action;
- SDLC stage coverage prevents documents-only completion;
- traceability proves requirements connect to code, tests, browser/scenario evidence, release, and operations.

This is how the meta-meta layer produces rigorous meta-skills, and those meta-skills produce rigorous dark-factory runs for the actual product instead of a generic ceremony.
