# 14. Expert Critic Review After Best-Of-All Revision

Status: revise.

Date: 2026-04-24.

Supersession note: the findings in this review are addressed in `15-review-finding-fix-record.md`.

Scope reviewed:

- Original transcript: `C:\Users\abhir\Downloads\dark-software-factories-transcript.md`.
- Design package: `dark-factory-meta-skills-design`.
- Installed Codex skills: `C:\Users\abhir\.codex\skills\*`.
- Workspace draft skill bundle: `codex-skills`.

This review checks whether the revised DFMS system actually satisfies the user's original intent, not only whether the latest four findings were patched.

## Original Requirement Anchors

| Anchor | Transcript lines | Requirement |
| --- | --- | --- |
| RQ-ARTIFACT-CALIBER | 65-67, 100-127 | Match professional outsourced SDLC handoff caliber with standards-based artifacts, traceability, quality records, and maintainability handoff. |
| RQ-NODE-QUALITY | 139-141, 151-156 | Every node needs two-way traceability, strong rubrics, recursive decomposition, verification, alternatives, debates, expert roles, and audit logging. |
| RQ-HUMAN-SDLC | 237-239 | Dark factory must model collaborative iterative human SDLC, not just workable tests and artifacts. |
| RQ-HOTL-HANDOFF | 237-239, 898-900, 1429-1431 | Humans and agents can swap ownership at any stage in both directions, especially production and maintenance. |
| RQ-PROJECT-BOOK | 237-239, 1628-1630 | Each SDLC stage generates a living project book with authors, reviewers, iterations, comments, quality outcomes, and change management. |
| RQ-TRUST-EXCEED-HUMANS | 1328-1330, 1693-1695, 2016-2018 | Quality must exceed human experts through strict processes, all artifacts, and triple expert review. |
| RQ-METHOD-BLEND | 441-443, 559-617, 2838-2841 | Blend RUP, MDA, MDD, DDD, BDD, TDD, layered development, and modern system thinking coherently. |
| RQ-PROD-SRE | 898-900, 1125-1127 | Production, SRE, incident readiness, outage debugging, and human learning are first-class post-dev concerns. |
| RQ-META-SKILLS | 1693-1695, 2016-2018 | Organize the factory as meta-skills that enforce artifacts, critic panels, bidirectional role swapping, and quality gates. |
| RQ-HUMAN-COMMS | 2198-2535 | Preserve human communication patterns, async feedback, confidence framing, informal clarification, and predecessor memory. |
| RQ-CONTEXT-ROT | 2532-2830 | Long-running work must resist context rot using durable state, predecessor recovery, compact context, and handoff/replay. |

## Expert Panel

### Expert 1: Requirements and Governance Architect

Verdict: revise.

Score: 82/100 against the 96 percent serious-factory threshold.

Strengths:

- The design package now has the correct high-level concepts: meta-attractor, control graph, work ledger, refinery gate, standards tailoring, project book, and handoff.
- The PRD benchmark revision is much stronger than the initial checklist and now distinguishes benchmark workload from reusable factory process.
- Governance language correctly rejects literal "zero mistakes" and turns it into evidence, thresholds, residual risk, and owner acceptance.

Concerns:

- The live orchestrator and hierarchy can still start serious work without a meta-attractor run record.
- Customer interrogation is still rigorous in the PRD but weak in the installed `df-intake-spec-lab` skill.
- The project book and artifact factory still do not require the new merged objects as mandatory sections.

### Expert 2: Factory Control-Plane Architect

Verdict: revise.

Score: 78/100 against the 96 percent serious-factory threshold.

Strengths:

- `00-system-design.md`, `02-lifecycle-workflow.md`, `05-traceability-evidence-model.md`, and `11-best-of-all-merged-control-plane.md` now have the right conceptual direction.
- The installed `df-meta-attractor` skill now has templates for control graph, work ledger, and refinery gate records.
- The best-of-all merge is not overfit to the todo/habits benchmark.

Concerns:

- The merged control objects are not propagated into the installed child skills that will run normal work.
- The greenfield and brownfield procedures are still old enough that a run could complete without concrete graph, ledger, and refinery artifacts.
- The workspace draft skill bundle does not include `df-meta-attractor`, so source package and installed package are diverging.

### Expert 3: Verification, Traceability, and Memory Critic

Verdict: revise.

Score: 74/100 against the 96 percent serious-factory threshold.

Strengths:

- The design traceability model now names graph, ledger, and refinery proof.
- The quality-refinery skill has a strong baseline triple-review workflow.
- Handoff and production-SRE skills exist and cover basic ownership transfer and release readiness.

Concerns:

- Trace schemas and validators still know only the old link classes.
- Holdout scenarios, transfer tests, digital-twin style verification, and probabilistic judge evidence are design requirements but not hard gates in the installed quality skill.
- Context memory is compact-summary focused, but the transcript required durable, queryable institutional memory and predecessor recovery.

## Findings

### Finding 1: Governed runs can still bypass the meta-attractor in the live skill surface

Priority: P1.

Evidence:

- `C:\Users\abhir\.codex\skills\dark-factory-orchestrator\SKILL.md` lines 12-18 classifies and starts work directly.
- `C:\Users\abhir\.codex\skills\dark-factory-orchestrator\SKILL.md` lines 20-33 routes child skills but does not route to `df-meta-attractor`.
- `dark-factory-meta-skills-design\01-meta-skill-hierarchy.md` lines 5-21 still names `dark-factory-orchestrator` as the top-level skill.
- `codex-skills\dark-factory-meta-skills-manifest.yaml` lines 5-18 omits `df-meta-attractor` entirely from the workspace draft bundle.

Why it matters:

The prior revision fixed `00-system-design.md`, but future Codex sessions will often trigger the installed `dark-factory-orchestrator` directly. That means serious, ambiguous, standards-based work can still skip the meta-meta field formation, control graph seed, anti-overfit split, and governed run record.

Required fix:

- Make `df-meta-attractor` the phase -1 governed entry point in `01-meta-skill-hierarchy.md`, the installed orchestrator, its routing reference, and the workspace draft bundle.
- Add an explicit bypass rule: only tiny non-factory tasks may skip the meta-attractor, and serious work must have either an Attractor Run Record or an explicit waiver.

### Finding 2: Merged control objects are not enforced by the installed child skills

Priority: P1.

Evidence:

- `C:\Users\abhir\.codex\skills\df-traceability-evidence\SKILL.md` lines 20-38 still lists only old link classes and old done-ness rules.
- `C:\Users\abhir\.codex\skills\df-traceability-evidence\references\trace-schema.md` lines 13-29 also lacks `routes_to`, `tracked_by`, `gated_by`, and `refines`.
- `C:\Users\abhir\.codex\skills\df-quality-refinery\SKILL.md` lines 12-19 issues only a generic quality certificate, not a refinery gate record.
- `C:\Users\abhir\.codex\skills\df-artifact-factory\SKILL.md` lines 30-39 omits control graph, work ledger, refinery gate, retrospective learning record, and meta-attractor record from required project book sections.

Why it matters:

The best-of-all merge depends on control graph, work ledger, and refinery gate as first-class objects. Right now those objects exist in design docs and the meta-attractor template folder, but the normal work skills do not require or validate them. The system can claim the merged process while producing only old-style artifact and certificate records.

Required fix:

- Extend installed traceability, quality, artifact, governance, and context-memory skills to require graph, ledger, and refinery proof for governed work.
- Update reference schemas and templates in those skills, not just the design package.
- Add child-skill regression checks that fail when a governed run lacks these records or explicit waivers.

### Finding 3: Customer interrogation is still a checklist in the installed intake skill

Priority: P1.

Evidence:

- `C:\Users\abhir\.codex\skills\df-intake-spec-lab\SKILL.md` lines 12-20 captures good requirement categories but does not define interrogation rounds, answer IDs, contradiction scoring, completeness scoring, re-interrogation, or approval mechanics.
- `C:\Users\abhir\.codex\skills\df-intake-spec-lab\references\intake-question-bank.md` lines 1-21 is a question list, not a protocol.
- The stronger PRD interrogation protocol is in `greenfield-todo-list-project-artifacts\05-product-requirements-document-40-page.md`, but future Codex sessions will trigger the installed skill, not the PRD.

Why it matters:

The user explicitly requires the first project step to be customer interrogation for spec development and validation. A checklist can ask reasonable questions, but it cannot prove that answers were captured, contradictions resolved, missing requirements re-asked, customer decisions approved, and downstream requirements traced back to interrogation evidence.

Required fix:

- Add a formal interrogation protocol to `df-intake-spec-lab`: rounds, answer capture IDs, contradiction checks, completeness score, re-interrogation triggers, approval gate, and trace links from answers to requirements.
- Require three expert reviewers for high-risk intake before any artifact expansion or implementation.

### Finding 4: Greenfield and brownfield flows still do not instantiate the merged process

Priority: P2.

Evidence:

- `dark-factory-meta-skills-design\02-lifecycle-workflow.md` lines 39-57 adds Stage -1 and global graph/ledger/refinery expectations.
- But `dark-factory-meta-skills-design\02-lifecycle-workflow.md` lines 61-88 still defines greenfield and brownfield flows without explicit meta-attractor record, control graph creation/update, work-ledger item creation, refinery gate creation, holdout/transfer tests, or reinterrogation loops.
- `dark-factory-meta-skills-design\02-lifecycle-workflow.md` lines 99-109 defines verification cadence without holdout scenarios, transfer tests, digital twin checks, probabilistic judge evidence, or graph/ledger/refinery linting.

Why it matters:

The lifecycle table now contains the right objects, but the executable project flows still describe the older process. A user asking for a greenfield or brownfield run could follow the flow and miss the very controls that make the system "best of all."

Required fix:

- Rewrite the greenfield and brownfield flows so each step creates or updates the Attractor Run Record, control graph, work ledger, trace evidence, and refinery gate.
- Add anti-overfit transfer testing and holdout scenario evidence to the verification cadence.

### Finding 5: Context-rot and predecessor-memory requirements are not strong enough in the installed memory skill

Priority: P2.

Evidence:

- `C:\Users\abhir\.codex\skills\df-context-memory\SKILL.md` lines 12-20 focuses on compact context packs, project-book storage, refresh, and handoff.
- `C:\Users\abhir\.codex\skills\df-context-memory\references\project-book-index.md` lines 3-16 defines a useful index, but not durable work-ledger retrieval, predecessor-query protocol, typed memory, replay drills, or reviewable recovery evidence.

Why it matters:

The transcript repeatedly emphasizes context rot, long-running work, predecessor memory, and durable state. The current skill helps with summaries, but it does not yet make memory a governed, queryable control plane tied to the work ledger and trace evidence.

Required fix:

- Add a predecessor recovery protocol, work-ledger retrieval plan, reviewable context-pack certificate, and fresh-session replay test.
- Link context packs to control graph nodes and work-ledger items.

### Finding 6: Verification is still partly manual and template-only

Priority: P2.

Evidence:

- `dark-factory-meta-skills-design\13-best-of-all-revision-fix-record.md` lines 78-81 explicitly records that templates are structural only, control graphs are not linted, work ledgers are not backed by a database or tracker, and refinery evidence is manually attached.
- `C:\Users\abhir\.codex\skills\df-quality-refinery\references\review-thresholds.md` lines 1-14 defines thresholds, but no automated collector verifies graph, ledger, holdout, transfer, or refinery proof.

Why it matters:

The user asked for every artifact to be checked by expert rubrics and verified many times. Manual certificates are useful, but without schema validation, graph linting, trace validation, ledger validation, and gate evidence collection, the factory cannot reliably enforce its own promises across sessions.

Required fix:

- Add validators for control graph, work ledger, refinery gate, trace schema, artifact records, and skill bundle consistency.
- Add a single acceptance command or script that verifies serious-factory readiness before a pass certificate is issued.

### Finding 7: Human communication patterns are acknowledged but not embedded in live workflow skills

Priority: P2.

Evidence:

- `C:\Users\abhir\.codex\skills\df-human-agent-handoff\SKILL.md` lines 12-20 defines formal handoff but not confidence framing, informal clarification lane, async comment threading, or human preference capture.
- `C:\Users\abhir\.codex\skills\df-human-agent-handoff\references\async-review.md` lines 3-13 classifies async comments but does not define review rounds, acknowledgement, disagreement handling, owner approval, or incorporation evidence.
- `C:\Users\abhir\.codex\skills\df-feedback-learning\SKILL.md` lines 12-19 captures feedback but does not preserve the richer human communication patterns from the transcript.

Why it matters:

The user did not ask for a sterile pipeline. They asked for human-level collaborative SDLC where humans guide, decide, learn, review asynchronously, and maintain the result later. The workflow needs human communication mechanics as explicit, traceable records, not optional tone.

Required fix:

- Add async review protocol, confidence framing, informal clarification lane, human preference/taste gate, disagreement escalation, and feedback incorporation evidence.
- Link those records into traceability and the project book.

### Finding 8: Workspace draft bundle and installed skills are drifting apart

Priority: P2.

Evidence:

- Installed `C:\Users\abhir\.codex\skills\df-meta-attractor` exists and contains the new templates.
- Workspace `codex-skills` does not include a `df-meta-attractor` directory.
- Workspace `codex-skills\dark-factory-meta-skills-manifest.yaml` lines 5-18 omits `df-meta-attractor`.
- Design `dark-factory-meta-skills-design\codex-skill-manifest.yaml` includes `df-meta-attractor`, but line 19 lists `depends_on: dark-factory-orchestrator`, which blurs whether the attractor is above the orchestrator or dependent on it.

Why it matters:

The user wants a meta-skill hierarchy they can instantiate in Codex directly. If installed skills, workspace draft bundle, and design manifest disagree, future installation, sharing, or revalidation may silently regress to the older hierarchy.

Required fix:

- Synchronize installed skills, workspace draft bundle, and design manifest.
- Represent `df-meta-attractor` as a phase -1 or phase 0 gate that precedes the orchestrator for governed runs, with explicit runtime dependencies on review, traceability, feedback, and swarm skills as needed.

## Requirement Coverage Snapshot

| Requirement | Current coverage | Verdict |
| --- | --- | --- |
| Professional SDLC artifact caliber | Strong in design catalog, weaker in installed artifact factory | Partial |
| Customer interrogation first | Strong in PRD, weak in installed intake skill | Fail |
| Meta-meta attractor | Strong in installed meta-attractor, not enforced by orchestrator/hierarchy | Partial |
| Control graph | Strong concept and template, weak propagation and validation | Partial |
| Work ledger | Strong concept and template, weak propagation and persistence | Partial |
| Refinery gate | Strong concept and template, weak installed quality enforcement | Partial |
| Triple expert reviews and 15-point rubrics | Present in quality skill, needs gate integration | Partial |
| Bidirectional traceability | Good design model, old installed trace schema | Partial |
| Human-agent role swapping | Good basic handoff skill, missing richer async and confidence protocols | Partial |
| Production and SRE handoff | Present and credible baseline | Pass with minor risk |
| Context rot protection | Useful summaries, missing durable predecessor-memory protocol | Partial |
| Methodology blending | Present skill and design intent, needs merged-object integration | Partial |
| Anti-overfit benchmark separation | Good design and PRD fix | Pass |
| Automated verification | Mostly manual or future roadmap | Fail |

## Quality Certificate

Certificate ID: CERT-POST-REVISION-CRITIC-001.

Verdict: revise.

The revision fixed the four previous findings at the design and meta-attractor layer, but it did not fully propagate those fixes into the installed child skills, workflow references, workspace draft bundle, and executable validation layer. The system is directionally strong but cannot yet claim "best-of-all" or "do not miss any requirement" until the P1 findings are fixed and the P2 enforcement gaps are scheduled.

Required next action:

1. Fix P1 findings 1-3 before further project simulation.
2. Fix P2 findings 4-8 before calling the meta-skill system production-ready.
3. Re-run this critic review after synchronization and validator additions.
