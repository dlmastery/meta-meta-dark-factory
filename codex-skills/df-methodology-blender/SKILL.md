---
name: df-methodology-blender
description: Methodology blending for RUP, MDA, DDD, TDD, BDD, Agile, SRE, ISO lifecycle processes, SSDF, OWASP SAMM, and company delivery playbooks. Use when a project needs multiple methods composed into one coherent workflow with artifacts, gates, roles, and verification.
---

## Zero-Slop Compliance

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.


# DF Methodology Blender

## Purpose

Compose methodologies without ceremony theater. Convert each method into concrete artifacts, checks, loops, and gates.

## Workflow

1. Create a Methodology Blend Record using `assets/templates/methodology-blend-record.json`.
2. Identify which methods are required by domain, risk, user request, company policy, and standards tailoring.
3. Compile each included method into control graph nodes, work-ledger items, required artifacts, reviewers, gates, and evidence.
4. Map RUP phases to lifecycle stages when phase discipline is needed.
5. Map MDA CIM/PIM/PSM when business, platform-independent, and platform-specific separation matters, including transformation records and exception handling.
6. Apply DDD for domain language, bounded contexts, aggregates, invariants, events, and anti-corruption layers.
7. Apply TDD/BDD for executable acceptance, red-green-refactor evidence, holdout scenarios, and regression evidence.
8. Apply SRE for production ownership, SLIs/SLOs, runbooks, incident paths, outage drills, and rollback.
9. Resolve conflicts through expert debate and decision records.
10. Send the blend record to `df-quality-refinery` and `df-traceability-evidence`.

## Output

Produce a methodology tailoring matrix that says:

- Method included or excluded.
- Why it applies.
- Which artifacts it requires.
- Which gates it adds.
- Which reviewers enforce it.
- How evidence is produced.
- Which control graph nodes and work-ledger items enforce it.
- Which refinery gates prove it.
- Which method-specific transformation or test evidence is mandatory.

## Resources

- `references/rup-mda-ddd-tdd.md`
- `assets/templates/methodology-blend-record.json`
