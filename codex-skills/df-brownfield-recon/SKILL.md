---
name: df-brownfield-recon
description: Brownfield discovery and change impact analysis for existing repositories, legacy systems, production code, bug fixes, migrations, refactors, integrations, and maintenance work. Use before modifying existing code so Codex first maps current architecture, behavior, tests, conventions, risks, and artifact drift.
---

## Zero-Slop Compliance

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.


# DF Brownfield Recon

## Purpose

Protect existing systems from confident but shallow changes. Understand the current system before modifying it.

## Workflow

1. Inventory repo structure, build tools, test commands, runtime entry points, configs, docs, and deployment hints.
2. Identify ownership, conventions, architectural boundaries, and risky areas.
3. Characterize current behavior using tests, docs, code reading, and available logs.
4. Map the requested change to impacted requirements, code, tests, artifacts, and operations.
5. Produce a change impact record before implementation.
6. Hand implementation to the orchestrator only after impact and regression plan are clear.

## Brownfield Rules

- Do not refactor unrelated code while making a behavior change.
- Do not overwrite user work.
- Do not assume missing tests mean missing behavior.
- Do not change production-sensitive paths without rollback and observability review.
- Update stale artifacts when reality differs from documentation.

## Resources

- `references/codebase-recon-playbook.md`
- `references/change-impact-template.md`

