# 06. PRD Triple-Critic Review

Reviewed artifact: `05-product-requirements-document-40-page.md`.

Review basis:

- Original transcript requirements from the customer: expert roles, critic panels, rubrics, debate rounds, feedback loops, project book of knowledge, functional and non-functional coverage, company standards, human HOTL, production/SRE, certification at every stage, bidirectional human-agent handoff, context-rot controls, RUP/MDA/DDD/TDD blend, and strict artifact quality.
- `df-quality-refinery` threshold: each selected expert should score at least 96 percent for acceptance.
- `df-traceability-evidence` rule: every material requirement/artifact should be explainable forward and backward.

Review outcome: fail / major revision required.

The PRD is useful as a first todo-product draft, but it does not yet encode the full dark-factory operating requirements the customer specified.

## Critic 1: Product And Spec-Intake Expert

Score: 41/60, 68.3 percent.

Verdict: revise.

### Strengths

- Clearly says the first step is customer interrogation.
- Separates draft assumptions from customer-approved facts.
- Defines product modes and protects against premature implementation.
- Provides a practical Page 40 customer answer format.

### Findings

1. Customer interrogation exists, but it is only a question list, not a full interrogation workflow.
   - Evidence: PRD lines 102-123.
   - Problem: The original requirement asked for a human-level collaborative, iterative SDLC process, not just a checklist. The PRD should define intake rounds, answer capture, validation scoring, ambiguity resolution, assumption acceptance, and when to re-interrogate.
   - Required fix: Add a "Customer Interrogation Protocol" with rounds: discovery, contradiction check, scenario validation, NFR validation, artifact expectation validation, approval.

2. Product success is too generic.
   - Evidence: PRD lines 46-61, 65-80.
   - Problem: The PRD says the app should be simple and trustworthy, but does not define measurable customer value beyond task CRUD.
   - Required fix: Add success metrics and explicit product outcomes for demo, internal tool, production, or SaaS modes.

3. The PRD does not yet capture company standards and stack rules as first-class customer inputs.
   - Evidence: PRD lines 734-752 and 897-908.
   - Problem: Stack appears as an open question, but original requirements emphasized company standards, stack, SRE, and maintainability rules.
   - Required fix: Add a dedicated "Company Standards Intake" page covering stack, design system, coding rules, security baseline, documentation expectations, hosting, CI/CD, observability, and review policy.

4. Human ownership is present but not rich enough.
   - Evidence: PRD lines 127-178.
   - Problem: The original requirement asked for humans HOTL providing guiding and decisions because they maintain later. The PRD does not define when humans must decide, how async feedback is captured, or how humans can take over and hand back.
   - Required fix: Add human decision gates and async feedback protocol.

## Critic 2: SDLC Governance And Artifact Auditor

Score: 31/60, 51.7 percent.

Verdict: fail.

### Strengths

- Correctly blocks design and coding until PRD assumptions are accepted.
- Includes an artifact roadmap.
- Includes an expert review requirement page.

### Findings

1. The artifact roadmap is far too small for the original ask.
   - Evidence: PRD lines 851-868.
   - Problem: The customer asked for all human-style SDLC artifacts and strict dark-factory artifact process. The roadmap omits or underplays BRD, standards tailoring matrix, RASCI finalization, risk register, change management plan, quality management plan, project book index, DDD artifacts, MDA CIM/PIM/PSM artifacts, RUP vision/use-case/software architecture artifacts, deployment artifacts, maintenance guide, quality certificates, review records, and residual-risk acceptance.
   - Required fix: Replace Page 38 with a full artifact catalog by phase, including author, reviewers, iteration cadence, quality gate, and output state.

2. Governance standards are not concretely mapped.
   - Evidence: PRD lines 19, 828-847.
   - Problem: The PRD mentions governance and expert review but does not map to ISO/IEC/IEEE 12207:2017, ISO/IEC/IEEE 15289:2019, SSDF, OWASP SAMM, RUP, MDA, DDD, TDD/BDD, or SRE gates.
   - Required fix: Add standards tailoring matrix with included/excluded standards and exact artifacts/checks required by each.

3. There is no stage-by-stage certification model.
   - Evidence: PRD lines 828-847.
   - Problem: The original transcript explicitly asked for certification at every stage. The PRD says experts must review but does not define certification records, pass/fail criteria, evidence, or residual risk.
   - Required fix: Add a quality certificate template and define intake, PRD, SRS, HLD, LLD, implementation, verification, transition, and handoff certificates.

4. Change management and sprint cadence are missing.
   - Evidence: PRD lines 851-868.
   - Problem: Original requirements mention change management by sprints, iterative improvements, feedback, and reviews. The PRD lacks change request handling, sprint/review cadence, and feedback-to-requirement conversion.
   - Required fix: Add a change management section with change request IDs, impact analysis, sprint planning, review cycle, and feedback loop.

5. The PRD does not adequately implement bidirectional human-agent role swapping.
   - Evidence: PRD lines 167-178 and 786-812.
   - Problem: RASCI exists, but no handoff record, takeover protocol, agent-to-human escalation, human-to-agent resume protocol, or async review routing is specified.
   - Required fix: Add a full human-agent handoff page and require handoff artifacts for every ownership change.

## Critic 3: Traceability, Verification, And Quality Refinery Lead

Score: 36/60, 60.0 percent.

Verdict: fail.

### Strengths

- Requirements have stable IDs.
- Acceptance criteria and scenarios exist.
- Holdout candidates are included.
- The PRD blocks implementation until customer questions are answered.

### Findings

1. Traceability is incomplete and not bidirectional.
   - Evidence: requirements at lines 365-378 and trace matrix at lines 661-674.
   - Problem: REQ-TODO-007 and REQ-TODO-008 have weak or missing full acceptance criteria. NFRs are not traced. Open questions, assumptions, risks, artifacts, and customer decisions are not linked.
   - Required fix: Expand the traceability matrix to include every functional requirement, every NFR, each assumption, each open decision, each scenario, each risk, and each future artifact.

2. The acceptance criteria do not cover all core requirements.
   - Evidence: PRD lines 584-608.
   - Problem: There are only six acceptance criteria for ten core requirements and multiple NFRs.
   - Required fix: Add acceptance criteria for view all tasks, clear completed tasks if retained, empty validation, persistence, accessibility, performance, reliability, and maintainability.

3. Testing strategy is too shallow for the requested factory rigor.
   - Evidence: PRD lines 756-783.
   - Problem: It lists test areas but not test levels, ownership, entry/exit criteria, TDD/BDD loop, holdout handling, regression rules, or evidence records.
   - Required fix: Add a formal validation model: unit, component, browser, accessibility, persistence, negative, holdout, and handoff replay tests.

4. No rubric scorecards are attached to the PRD itself.
   - Evidence: PRD lines 828-847.
   - Problem: The PRD says experts must review, but the artifact itself does not carry reviewer scorecards, failed points, fix list, or quality certificate.
   - Required fix: Attach expert scorecards and a PRD quality certificate after revision.

5. Context-rot controls are absent from the PRD process.
   - Evidence: no section in PRD.
   - Problem: Original transcript explicitly asked how to handle large context and context rot. The PRD does not require context packs, project book indexes, handoff summaries, or predecessor recovery.
   - Required fix: Add a context management section requiring project-book index, node-local context packs, structured handoff records, and evidence-ledger retrieval.

## Cross-Critic Debate Summary

Agreement:

- The PRD correctly starts with customer interrogation and blocks coding.
- The PRD is too product-only and not enough factory/process PRD.
- It does not yet satisfy the original meta-skill/dark-factory requirements.
- It needs a major revision before it can be the controlling artifact.

Disagreement:

- Product critic would keep the todo V1 lean.
- Governance critic wants the full artifact/process machinery visible even for a small todo app.
- Traceability critic agrees with lean product scope but requires full evidence scaffolding because this PRD is also testing the meta-skills process.

Synthesis:

Revise the PRD into a "Product + Factory Operating PRD." Keep the todo app simple, but make the factory process heavy enough to prove the meta-skills: interrogation protocol, artifact catalog, triple critic gate, traceability matrix, handoff protocol, context management, and certification.

## Required Revision List

1. Add customer interrogation protocol, not just questions.
2. Add company standards and stack intake.
3. Add standards tailoring matrix.
4. Add full artifact catalog by SDLC phase.
5. Add RUP/MDA/DDD/TDD/SRE methodology mapping.
6. Add async human review and feedback loop.
7. Add bidirectional human-agent handoff protocol.
8. Add context rot and project-book controls.
9. Expand requirements and acceptance criteria coverage.
10. Expand traceability to include NFRs, assumptions, decisions, risks, and artifacts.
11. Add test and validation evidence model.
12. Add stage certification records.
13. Add reviewer scorecards and quality certificate.

## Final Gate

Gate: PRD artifact review.

Outcome: fail / major revision.

Reason: the current PRD is a sound todo-app intake draft, but it does not yet encode the full original dark-factory requirements.

