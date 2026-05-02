---
name: df-quality-refinery
description: Triple expert review, rubric scoring, anti-slop checks, verification gates, and quality certificates for dark-factory artifacts and code changes. Use whenever an artifact, design, code change, test plan, handoff package, or production package needs expert-level review before acceptance.
---

## Zero-Slop Compliance

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.


# DF Quality Refinery

## Purpose

Reject weak outputs and force improvement. Apply artifact-specific expert panels, adversarial critics, 15-point role rubrics, minimum 5-round RALPH loops, verification evidence, and a quality certificate before acceptance.

Every reviewer must be an explicit elite reviewer persona, not a generic "reviewer." The persona must state its seniority bar, primary lens, decision rights, non-negotiables, red flags, and evidence required to vote pass.

Quality and assurance are the optimization goal. Token use remains visible for client approval and change control, but token savings are not a valid reason to skip artifact-specific rubrics, adversarial critics, five RALPH loops, trace closure, or fix evidence.

## Workflow

1. If reviewing a governed artifact, select its artifact-specific 3-critic panel from `references/artifact-critic-panel-matrix.md`; do not use a generic default panel.
2. Load the artifact-specific rubric from `references/artifact-rubric-library/index.json`; every catalog artifact has 18 artifact-level checks plus 15 checks for each of its 3 critic seats.
3. Create an Artifact Review Panel Record using `assets/templates/artifact-review-panel-record.json`.
4. Add at least 2 adversarial critics to the artifact review panel: Anti-Slop Red Team and Failure-Mode/Reality Critic. Add more if risk demands it.
5. Create an Artifact RALPH Loop Record using `assets/templates/artifact-ralph-loop-record.json`.
6. Select 3 reviewer roles from `references/expert-rubrics.md` only after the artifact-specific critic seats, adversarial critics, and rubrics are known.
7. For each reviewer and adversarial critic, record persona contract, attack mandate, decision rights, non-negotiables, red flags, and evidence required to vote pass or stand down.
8. Confirm the artifact or change has source requirements, control graph node, work-ledger item, trace links, and planned refinery gate, or explicit waivers.
9. Score the artifact-level rubric before the panel vote; do not let a critic panel pass an artifact that fails core artifact-level checks.
10. Run independent critic-seat and adversarial review first. Do not let reviewers see each other's scores until after initial scoring.
11. Run at least 5 RALPH loops for every governed artifact before pass:
    - Review: score artifact-level and critic-seat rubrics.
    - Attack: adversarial critics attempt to break the artifact with slop, failure-mode, counterexample, trace, and evidence attacks.
    - Learn: identify root causes and recurring weakness patterns.
    - Patch: update artifact, evidence, trace, template usage, and decisions.
    - Harden: rerun validators, re-review fixes, and record remaining risks.
12. Run cross-critique and synthesis in every RALPH loop if reviewers disagree, any score is below threshold, any adversarial attack stands, or any evidence is weak.
13. Require fixes for every failed artifact-level, critic-seat, or adversarial finding.
14. For benchmark, simulation, high-risk, or best-of-all claims, require holdout scenarios and transfer tests before acceptance.
15. Use `assets/templates/rubric-score-record.json` as a panel score record: artifact rubric path, RALPH loop record, at least 3 reviewers, exactly 15 scored checks per reviewer, explicit reviewer persona contracts, independent review evidence, cross-critique evidence, synthesis, and failed-point fix evidence.
16. Use `scripts/validate_artifact_rubric_library.py` to reject malformed artifact rubrics before relying on them.
17. Use `scripts/validate_artifact_review_panel.py` to reject artifact panels with generic critics, missing adversarial critics, missing RALPH loop link, missing coverage, placeholder fields, weak artifact checks, or missing links.
18. Use `scripts/validate_artifact_ralph_loop.py` to reject artifacts with fewer than 5 loops, missing adversarial attacks, weak fixes, placeholder evidence, or premature pass.
19. Use `scripts/score_rubric_matrix.py` to reject incomplete, undersized, persona-empty, unresolved, RALPH-loop-unlinked, artifact-rubric-unlinked, or threshold-lowered panel score records before issuing any certificate.
20. Use `scripts/validate_refinery_gate.py` to reject pass gates with failed core checks, missing evidence, unresolved fixes, missing RALPH proof, or template placeholders.
21. Use `scripts/validate_quality_certificate.py` to reject template-like, under-reviewed, under-scored, unlinked, or evidence-empty quality certificates. For pass certificates, run it in bundle mode with `--panel-score-record` and `--refinery-gate` so certificate strings are checked against the actual panel and gate files.
22. For governed workflow transitions, require an AI Judge/Jury Record from `df-swarm-coordination` using `assets/templates/ai-judge-jury-record.json`; artifact quality is not accepted if the workflow transition itself is illegal.
23. For code/product/app work, require SDLC Stage Coverage Matrix evidence, Implementation Execution Record, Scenario Test Matrix when scenario-driven, and WYSIWYG Browser Test Record when UI/browser/WYSIWYG work exists.
24. Require Hawkeye Conformance Audit Record before pass, certificate, or closure; Hawkeye veto overrides reviewer enthusiasm.
25. Issue a pass, conditional pass, revise, fail, or escalate outcome using both `assets/templates/refinery-gate-record.yaml` and `assets/templates/quality-certificate.json`.

## Required RALPH Loop

RALPH means Review, Attack, Learn, Patch, Harden.

Every governed artifact must complete at least 5 loops. Loops may continue beyond 5 when any P0/P1 finding remains, any critical check scores below 4 without accepted residual risk, any adversarial critic refuses to stand down, or trace/evidence is incomplete.

Minimum pass rule:

- 5 loops completed.
- At least 2 adversarial critics participated independently.
- Every loop recorded attacks, root causes, patches, fix evidence, and re-review evidence.
- No P0/P1 findings remain.
- Failed rubric points are fixed or explicitly accepted by the accountable human owner.
- Adversarial critics have stood down with evidence.
- Trace, refinery gate, and certificate evidence are linked.
- The TPM workflow transition is legal: dependencies are satisfied, current/next bead is explicit, and AI judge/jury gate passes or a boundary-human approval is recorded.
- Required SDLC stages and testing classes are accepted, waived, or not applicable with evidence; product/code/UI/production claims are not documents-only.
- Hawkeye conformance audit passes with no open vetoes and no unresolved P0/P1 conformance findings.

## Default Review Panel

- Standards, governance, or audit persona.
- Domain, requirements, architecture, methodology, or product persona.
- Verification, security, SRE, maintainability, data, UX, or support persona.

This default is a fallback only for non-catalog work. Any artifact listed in the DFMS artifact catalog must use the artifact-specific critic panel matrix.

## Elite Reviewer Persona Bar

- The reviewer must describe what an elite practitioner in that role would protect.
- The reviewer must state what they are empowered to reject.
- The reviewer must identify project-specific proof required for a pass vote.
- The reviewer must challenge assumptions outside their narrow specialty when those assumptions affect quality.
- The reviewer must record a handoff note that a later human can use without the original reviewer.

## Anti-Slop Rejection Triggers

- Generic statements that could apply to any project.
- Standards named without concrete mapping.
- Requirements without acceptance tests.
- Serious-factory work without an Attractor Run Record or waiver.
- Governed work without control graph, work ledger, and refinery gate proof.
- Governed work without TPM flow ledger, PERT dependency plan, and AI judge/jury transition proof.
- Governed product/app/code work without SDLC Stage Coverage Matrix proof.
- Code-producing work without implementation, build, and test execution evidence.
- UI/browser/WYSIWYG work without browser automation or documented browser procedure evidence, screenshots, viewport checks, interaction checks, and visual/layout checks.
- Scenario-driven work without scenario, negative, edge/failure, holdout, and transfer-test evidence or explicit residual-risk waiver.
- Production-surface work without release, rollback, observability, runbook, incident, and outage-drill evidence.
- Tests without requirement links.
- Benchmark results without holdout and transfer-test evidence.
- Rubric thresholds lowered below 96 percent without an explicit owner-scoped waiver.
- Pass refinery gates with failed core checks, empty rubric evidence, or empty trace evidence.
- Pass refinery gates with empty scope, blank verdict rationale, or blank next action.
- Quality certificates without 3 reviewers, score evidence, panel score record, refinery gate link, failed-point fix evidence, or certificate evidence.
- Artifact quality certificates without an Artifact Review Panel Record linked to the artifact-specific critic matrix.
- Artifact quality certificates without an artifact-specific rubric loaded from `references/artifact-rubric-library/`.
- Artifact quality certificates without an Artifact RALPH Loop Record proving at least 5 loops.
- Artifact reviews without at least 2 adversarial critics.
- Artifact review records that score only generic role rubrics and skip the 18 artifact-level checks.
- Critic-seat reviews that do not score exactly the 15 checks defined for that artifact's critic seat.
- Any pass before 5 RALPH loops.
- Any pass where token savings are cited as a reason to reduce review depth.
- Any pass where adversarial critics have not explicitly stood down.
- Any pass where an accepted workflow step has unmet predecessors, missing next step, missing judge/jury verdict, or no closure rationale.
- Any pass without a passing Hawkeye Conformance Audit Record for the applicable stage/process scope.
- Quality certificates whose reviewers, scores, artifact, panel score record, or refinery gate do not match the referenced evidence files.
- Architecture without alternatives.
- Security without threat model or risk treatment.
- Production handoff without owner, rollback, observability, and incident path.
- Brownfield change without recon and regression evidence.

## Resources

- `references/expert-rubrics.md`
- `references/artifact-critic-panel-matrix.md`
- `references/artifact-rubric-library/README.md`
- `references/artifact-rubric-library/index.json`
- `references/review-thresholds.md`
- `assets/templates/artifact-review-panel-record.json`
- `assets/templates/artifact-ralph-loop-record.json`
- `assets/templates/rubric-score-record.json`
- `assets/templates/refinery-gate-record.yaml`
- `assets/templates/quality-certificate.json`
- `assets/templates/ai-judge-jury-record.json`
- `assets/templates/implementation-execution-record.json`
- `assets/templates/scenario-test-matrix.json`
- `assets/templates/wysiwyg-browser-test-record.json`
- `assets/templates/hawkeye-conformance-audit-record.json`
- `scripts/validate_artifact_review_panel.py`
- `scripts/validate_artifact_ralph_loop.py`
- `scripts/validate_artifact_rubric_library.py`
- `scripts/score_rubric_matrix.py`
- `scripts/validate_refinery_gate.py`
- `scripts/validate_quality_certificate.py`
