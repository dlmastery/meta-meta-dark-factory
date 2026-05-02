**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# Expanded Artifact BOM And Worked Example Depth Standard

## Purpose

The transcript asked for hundreds of SDLC artifacts with best-in-industry templates, realistic samples, and 15+ artifact-level rubrics. The current library has 63 governed master artifacts with deep rubric coverage. This spec defines when and how those master artifacts expand into 200+ atomic handoff deliverables.

## Expansion Policy

DFMS supports two artifact modes:

| Mode | Use When | Requirement |
| --- | --- | --- |
| Master Artifact Mode | Small/medium projects, early planning, or artifact tailoring | Use 63 governed master artifacts with sub-sections |
| Outsourcing-Grade Atomic Mode | Client expects TCS/Infosys-style handoff, regulated delivery, production transfer, or explicit "hundreds" request | Expand master artifacts into atomic leaf artifacts with separate templates, rubrics, reviewers, trace IDs, and certificates |

When the user says "hundreds of artifacts," the default is Outsourcing-Grade Atomic Mode unless a human owner waives it.

## Atomic Artifact Count Target

Minimum separate atomic artifacts for full outsourcing-grade runs: 216.

| Family | Count | ID Range | Scope |
| --- | ---: | --- | --- |
| Engagement and governance | 18 | `AT-GOV-001` to `AT-GOV-018` | kickoff, RASCI, token budget, change board, standards tailoring |
| Discovery and requirements | 30 | `AT-REQ-001` to `AT-REQ-030` | interrogation, BRD, SRS, NFRs, assumptions, scenarios, holdouts |
| Methodology and modeling | 24 | `AT-MOD-001` to `AT-MOD-024` | RUP, MDA CIM/PIM/PSM, UML, DDD, BDD/TDD mappings |
| Architecture and design | 28 | `AT-DSN-001` to `AT-DSN-028` | HLD, LLD, ADRs, interface specs, data design, security design |
| Planning and delivery | 18 | `AT-PLN-001` to `AT-PLN-018` | roadmap, sprint plans, PERT, work packages, dependencies |
| Implementation evidence | 20 | `AT-IMP-001` to `AT-IMP-020` | code map, build manifest, migration log, review log, change set |
| Verification and validation | 34 | `AT-VNV-001` to `AT-VNV-034` | unit, integration, contract, scenario, holdout, transfer, browser, a11y, security, performance |
| Trace and evidence | 16 | `AT-EVD-001` to `AT-EVD-016` | trace matrix, evidence ledger, certificates, physical evidence index |
| Release and operations | 20 | `AT-REL-001` to `AT-REL-020` | release plan, rollback, observability, runbook, outage drill, operator training |
| Maintenance and learning | 8 | `AT-MNT-001` to `AT-MNT-008` | maintenance guide, defect workflow, retrospective, skill update |

Total: 216 atomic artifacts.

## Atomic Template Standard

Each atomic artifact template must include:

1. Zero-slop banner.
2. Artifact ID and title.
3. Standards basis.
4. Project applicability rules.
5. Required inputs.
6. Required outputs.
7. Author role.
8. Three specialist critic roles.
9. Two adversarial critic roles.
10. Required trace links.
11. Required evidence files.
12. Required review scorecards.
13. Minimum 5 RALPH loop record.
14. Pass/fail threshold.
15. Waiver policy.
16. Realistic sample filled for a fake but coherent project.
17. Rejection sample showing what slop looks like.
18. Handoff note for a future human owner.

## Worked Example Depth Standard

A worked example is not acceptable if it only says "example value recorded."

Every worked example must contain:

- realistic project name, domain, actors, and constraints;
- answer IDs or source requirement IDs;
- at least one table with real-looking values;
- at least one non-happy-path case;
- at least one risk or assumption;
- trace links to requirements, decisions, tests, artifacts, and evidence;
- reviewer comments from three named expert roles;
- adversarial critique and patch response;
- acceptance status and residual risk;
- evidence path placeholders that are project-specific rather than generic.

## Rubric Rule

Every atomic artifact receives:

- 18 artifact-level checks;
- 15 checks for critic 1;
- 15 checks for critic 2;
- 15 checks for critic 3;
- adversarial stand-down criteria;
- threshold: 96 percent default, lower only by governance waiver.

## Generation Gate

Before generating an outsourcing-grade project book, DFMS must:

1. Choose Master or Atomic mode.
2. If Atomic mode, create the 216-artifact leaf BOM.
3. Select applicable artifacts by project type and standards tailoring.
4. Create a task bead per artifact or artifact batch.
5. Generate templates and worked examples.
6. Validate no placeholder/weak example language remains.
7. Run artifact-specific RALPH loops.
8. Issue artifact certificates only after physical evidence exists.

## Boundary

This spec fixes the artifact expansion requirement at the policy/spec layer. It does not claim that all 216 atomic templates have already been generated in this repository.
