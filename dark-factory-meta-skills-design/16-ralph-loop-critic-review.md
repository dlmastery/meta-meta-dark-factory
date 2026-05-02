# 16. Ralph Loop Critic Review

Status: revise.

Date: 2026-04-24.

Supersession note: these findings are addressed in `17-ralph-loop-fix-record.md`.

Scope:

- Original transcript: `C:\Users\abhir\Downloads\dark-software-factories-transcript.md`.
- Current design package after artifact 15.
- Installed live skills under `C:\Users\abhir\.codex\skills`.
- Workspace bundle under `codex-skills`.

Review stance: adversarial Ralph loop. Assume the latest fix record is overconfident, then look for remaining ways the system can claim rigor without actually enforcing it.

## Expert Panel

### Expert 1: Verification and Evidence Auditor

Verdict: revise.

Score: 81/100.

The system has better gates than before, but two validators are still weak enough to create false confidence: merged-record validation can pass templates, and rubric scoring can pass incomplete scorecards.

### Expert 2: Enterprise SDLC and Methodology Architect

Verdict: revise.

Score: 84/100.

The artifact catalog is broad, but the live methodology blender is still a high-level checklist. It does not yet compile RUP/MDA/DDD/TDD into graph nodes, ledger records, transformations, method-specific gates, and review evidence.

### Expert 3: Human Operations and Handoff Critic

Verdict: revise.

Score: 86/100.

Human handoff improved, but production/SRE is still release-package oriented. The original transcript asked for humans to learn to debug outages and own production safely; that needs drills, exercises, incident replay, and verified training evidence.

## Findings

### Finding 1: Merged-record validator can pass templates as if they were live evidence

Priority: P1.

Evidence:

- `C:\Users\abhir\.codex\skills\df-meta-attractor\scripts\validate_merged_records.py` lines 6-16 only define marker strings and required text fragments.
- `C:\Users\abhir\.codex\skills\df-meta-attractor\scripts\validate_merged_records.py` lines 31-49 groups files by filename/text markers and checks whether keywords appear.
- `dark-factory-meta-skills-design\15-review-finding-fix-record.md` line 65 records a pass against the installed `df-meta-attractor\assets\templates` directory.
- `C:\Users\abhir\.codex\skills\df-meta-attractor\assets\templates\work-ledger-record.yaml` lines 1-33 is an empty placeholder template with `WL-000`, blank owners, blank next action, and empty evidence.

Why this matters:

The live `df-meta-attractor` guardrail says templates are not proof. But the validator currently passes the template folder as "Merged control-plane records are present." That creates exactly the kind of false certificate the user is trying to eliminate.

Required fix:

- Require instantiated records, not template names.
- Reject placeholder IDs such as `CG-000`, `WL-000`, `RFG-000`, empty owners, empty evidence, pending/proposed status, and blank next actions unless an explicit waiver record exists.
- Validate cross-links between Attractor Run Record, control graph nodes, work-ledger items, refinery gates, and quality certificate.

### Finding 2: Rubric scoring does not enforce 3 experts times 15 rubric points

Priority: P1.

Evidence:

- `C:\Users\abhir\.codex\skills\df-quality-refinery\scripts\score_rubric_matrix.py` lines 7-15 accepts any non-empty `scores` dictionary and computes a percentage.
- `C:\Users\abhir\.codex\skills\df-quality-refinery\assets\templates\rubric-score-record.json` lines 1-9 represents a single reviewer role and an arbitrary `scores` object.
- `C:\Users\abhir\.codex\skills\df-quality-refinery\assets\templates\quality-certificate.json` lines 1-9 has reviewers and scores, but no structural requirement for three reviewers, 15 checks per reviewer, failed-point fix evidence, or independent-before-cross-critique proof.

Why this matters:

The user required every artifact to be checked by expert rubrics of 15 top points by expert role and by three experts debating before deciding. The skill prose says that, but the validator can pass a one-reviewer, one-score record if the number is high enough.

Required fix:

- Add a panel score schema that requires exactly or at least three expert scorecards for material work.
- Require 15 named checks per selected expert, each scored 0-4 with rationale.
- Require independent review timestamps, cross-critique record, failed-point fix evidence, and synthesis verdict before a quality certificate can pass.

### Finding 3: Artifact catalog has duplicate evidence artifact IDs

Priority: P1.

Evidence:

- `dark-factory-meta-skills-design\03-artifact-catalog.md` line 115 defines `EVD-008` as Human Communication Record.
- `dark-factory-meta-skills-design\03-artifact-catalog.md` line 117 also defines `EVD-008` as Retrospective Learning Record.

Why this matters:

Stable artifact IDs are the backbone of bidirectional traceability. Duplicate IDs can corrupt trace links, certificates, work-ledger references, and project-book indexes.

Required fix:

- Rename Retrospective Learning Record to `EVD-010` or the next available ID.
- Add an artifact-catalog uniqueness validator that fails duplicate IDs across all artifact tables.

### Finding 4: Methodology blender is still not a methodology compiler

Priority: P2.

Evidence:

- `C:\Users\abhir\.codex\skills\df-methodology-blender\SKILL.md` lines 12-20 list general mapping steps for RUP, MDA, DDD, TDD/BDD, SRE, and conflict resolution.
- `C:\Users\abhir\.codex\skills\df-methodology-blender\SKILL.md` lines 22-31 asks for a tailoring matrix, but does not require control graph nodes, work-ledger items, transformation records, method-specific refinery gates, or handoff evidence.
- The reference `rup-mda-ddd-tdd.md` is a useful summary, but it does not define executable phase contracts, MDA CIM/PIM/PSM transformation gates, DDD consistency checks, or TDD/BDD red-green-refactor evidence records.

Why this matters:

The original transcript repeatedly asks to blend RUP, MDA, DDD, TDD, BDD, layered development, and modern system thinking in a Gas-Town-like executable way. The current skill still describes the blend rather than compiling it into enforced workflow nodes and evidence.

Required fix:

- Add a Methodology Blend Record template.
- Require method-selected graph nodes, artifact obligations, reviewers, gates, and evidence for each included method.
- For MDA, require CIM-to-PIM-to-PSM transformation links and exceptions.
- For TDD/BDD, require red-green-refactor or justified substitute evidence.

### Finding 5: Production/SRE handoff lacks outage training and drill evidence

Priority: P2.

Evidence:

- `C:\Users\abhir\.codex\skills\df-production-sre-handoff\SKILL.md` lines 12-19 creates release/rollback/observability/incident artifacts and a release readiness certificate.
- `C:\Users\abhir\.codex\skills\df-production-sre-handoff\SKILL.md` lines 21-30 requires what humans need to learn, but not how learning is verified.
- `C:\Users\abhir\.codex\skills\df-production-sre-handoff\assets\templates\production-handoff-record.json` lines 1-14 has `training_needed`, but no outage drill, incident replay, diagnosis exercise, operator signoff, or readiness score.

Why this matters:

The user specifically asked what about humans learning to debug in outages. A release handoff document is not enough. Human production ownership needs verified learning loops, drills, runbook replay, and confidence evidence.

Required fix:

- Add incident drill and outage-debug training records.
- Require at least one fresh-human runbook replay for high-risk production packages.
- Link production handoff to control graph, work ledger, refinery gate, and human communication records.

### Finding 6: Swarm coordination does not persist debate as a governed object

Priority: P2.

Evidence:

- `C:\Users\abhir\.codex\skills\df-swarm-coordination\SKILL.md` lines 12-18 records alternatives, critiques, decision, residual risk, and required evidence.
- The skill has no debate-record template, no work-ledger linkage requirement, no control graph node requirement, and no refinery pre/post gate requirement.
- `C:\Users\abhir\.codex\skills\df-swarm-coordination\references\debate-protocol.md` lines 3-13 defines rounds, but not scorecard shape, transcript capture, dissent handling, or re-entry triggers as durable evidence.

Why this matters:

The transcript says every step has experts debating rounds before deciding. The debate should be a first-class governed artifact, not just a narrative step that may or may not be preserved.

Required fix:

- Add an Expert Debate Record template to the installed swarm skill.
- Require each debate to link to control graph node, work-ledger item, decision record, trace evidence, and refinery gate.
- Require dissent and rejected alternatives to be preserved.

### Finding 7: Conditional pass overstates runtime readiness

Priority: P2.

Evidence:

- `dark-factory-meta-skills-design\15-review-finding-fix-record.md` lines 75-82 records that validators are structural, digital-twin verification has no runtime harness, human communication has no UI, and no full simulation has been rerun.
- The same record line 88 gives a conditional pass for the eight findings.

Why this matters:

The pass is reasonable for "the eight findings were patched in skill prose and templates," but not for the user's larger standard: a rigorous, repeatedly verified, instantiable factory. Without an end-to-end rerun, the pass should be phrased as "patch set accepted for review" rather than "system conditionally passes."

Required fix:

- Split certificates into `patch-certificate`, `skill-system-certificate`, and `runtime-readiness-certificate`.
- Do not let a patch certificate imply the full factory is ready.
- Rerun the greenfield benchmark and a brownfield simulation after fixes.

## Requirement Coverage Snapshot

| Requirement Cluster | Current Status | Review Result |
| --- | --- | --- |
| Meta-attractor governed entry | Stronger after artifact 15 | Pass with validator risk |
| Customer interrogation first | Stronger after artifact 15 | Pass at protocol level |
| Bidirectional traceability | Strong in prose, duplicate ID risk remains | Revise |
| Three experts, 15-point rubrics | Prose strong, validator weak | Revise |
| Expert debate rounds | Prose present, durable debate artifact weak | Revise |
| Full human SDLC artifact catalog | Broad catalog, duplicate ID defect | Revise |
| RUP/MDA/DDD/TDD blending | Still too checklist-like in live skill | Revise |
| Holdouts and anti-overfit | Present as gate, needs live simulation | Partial |
| Digital twin / scenario harness | Requirement present, runtime missing | Partial |
| Human-agent swapping | Good protocol base | Pass with integration risk |
| Production/SRE handoff | Baseline good, outage-training proof weak | Revise |
| Context rot / predecessor recovery | Improved protocol, database/runtime future | Partial |
| Workspace-installed sync | Passed last validation | Pass |
| Greenfield todo benchmark | Not rerun after fixes | Needs rerun |

## Ralph Loop Verdict

Verdict: revise.

The latest fix materially improved the DFMS system, but the Ralph loop found remaining correctness risks. The highest-priority gaps are validator false positives, incomplete enforcement of the three-expert 15-point rubric model, and duplicate evidence IDs. These should be fixed before claiming the system can reliably enforce the user's "do not miss any requirement" standard.
