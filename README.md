**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# Meta-Meta Dark Factory

Meta-Meta Dark Factory is a standards-oriented dark-factory skill system for turning raw software intent into governed SDLC work: meta-meta attractor, generated meta-skills, product-specific skill execution, artifact catalogs, expert panels, quality gates, traceability, task beads, human review portals, and redo/change-control workflows.

This repository is a public release package of the local DFMS artifacts produced in the Codex workspace.

## Contents

- `codex-skills/` - reusable Codex skills, templates, validators, references, and artifact/rubric libraries.
- `dark-factory-meta-skills-design/` - meta-meta design records, RALPH loops, artifact BOMs, task ledger, interactive layer map, tests, and governance documents.
- `dark-factory-control-console/` - local control-console source for meta-meta first project initiation, stage execution, human portal, redo/change-control, and browser-tested workflow UI.
- `example/worlds-best-todo-habits-app/` - bounded todo/habits demonstrator with project book, app, tests, evidence, and human review portal.
- `greenfield-todo-list-project-artifacts/` - earlier greenfield artifact set used during process hardening.
- `pitch-decks/` - pitch and product positioning artifacts.

## Important Truth Statement

The todo/habits demonstrator is not a full artifact-saturation run. Its own audit records say that clearly:

- `example/worlds-best-todo-habits-app/project-book/17-actual-vs-promised-artifact-gap-audit.md`
- `example/worlds-best-todo-habits-app/project-book/18-ralph-20-artifact-completeness-audit.md`
- `example/worlds-best-todo-habits-app/project-book/records/artifact-catalog-coverage-matrix.json`

The DFMS skills were hardened so future serious runs default to `full_saturation`; smaller artifact sets require explicit human-approved waivers and a catalog coverage matrix.

## Excluded From Public Release

This public package intentionally excludes local runtime noise and volatile machine artifacts:

- control-console generated `runs/`
- browser profile directories such as `edge-profile*`
- `node_modules/`
- `__pycache__/`
- logs, PID files, and local environment/secrets files

## Validation

Before publication, the release package was checked with:

- skill bundle validation
- artifact template library validation
- Python compile checks for the new artifact coverage validator
- strict task ledger validation
- a negative artifact coverage test proving the incomplete todo/habits artifact matrix is rejected by the stricter full-artifact gate
- a basic public-release secret scan

## License

No open-source license has been added yet. Until a license is added by the repository owner, default copyright restrictions apply.
