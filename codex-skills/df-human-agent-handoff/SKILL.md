---
name: df-human-agent-handoff
description: Bidirectional human-agent handoff for dark-factory work. Use when a human takes over from an agent, an agent resumes human work, async review comments change direction, a taste gate is required, or state must be packaged so another human or Codex session can continue safely.
---

## Zero-Slop Compliance

**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

Strict compliance is mandatory. Every claim must be project-specific, evidence-backed, trace-linked, reviewer-challenged, and free of unsupported invention. If evidence is missing, mark it as an assumption, risk, open question, or failure.


# DF Human Agent Handoff

## Purpose

Make ownership fluid without losing accountability. Humans and agents may swap at any stage, but every swap must carry state, rationale, open risks, and the next safe action.

## Workflow

1. Identify direction: agent to human, human to agent, human takeover, agent takeover, async review, taste gate, informal clarification, or confidence delegation.
2. Create a handoff record using `assets/templates/handoff-record.json`.
3. For human communication, also create or update `assets/templates/human-communication-record.json`.
4. Include current node, control graph state, work-ledger item, current artifacts, changed files, decisions, open questions, risks, blockers, confidence, and next checks.
5. Include client checkpoint state, token budget used/remaining/forecast, whether reapproval is needed, and any open change requests for governed work.
6. Include the Human Review and Onboarding Portal path, portal freshness status, role-based start path, indexed evidence scope, and any portal validation failures for governed project-book work.
7. If a human made changes, re-run brownfield or artifact drift checks before continuing.
8. If an agent asks for human input, ask for the smallest decision needed and label whether the answer is binding, preference, clarification, change approval, budget approval, or risk acceptance.
9. Resume only after the handoff package is coherent and linked to traceability evidence.

## Handoff Must Include

- Current objective.
- Work completed.
- Work not completed.
- Important decisions and alternatives.
- Files and artifacts touched.
- Verification already run.
- Verification still needed.
- Exact decision requested from the next owner.
- Token budget state, forecast delta, and whether client budget reapproval is required.
- Change-request state for changed scope, iteration objective, acceptance criterion, or token forecast.
- Confidence level and reason.
- Whether the handoff is blocking, async, informal, or approval-grade.
- How feedback will be incorporated and reverified.
- Human portal link, freshness state, role-specific reading path, and exact artifacts a reviewer should inspect first.

## Human Communication Patterns

- Async review: acknowledge, classify, link, incorporate, and reverify.
- Confidence framing: state confidence, uncertainty, and decision boundary.
- Informal clarification lane: capture low-risk human answers without forcing a full gate, then promote them if they change scope or behavior.
- Taste gate: ask humans for product, UX, tone, risk appetite, or maintainability preference when correctness alone is insufficient.
- Disagreement escalation: if human and agent or reviewers disagree, record options, recommendation, owner decision, and residual risk.

## Resources

- `references/takeover-protocol.md`
- `references/async-review.md`
- `assets/templates/handoff-record.json`
- `assets/templates/human-communication-record.json`
