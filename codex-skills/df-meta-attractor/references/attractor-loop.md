# Attractor Loop

Use this reference when a request is bigger than one project or when the process itself must be shaped.

## Loop

1. Sense the field:
   - Read user request, transcript, project book, review findings, codebase state, and previous decisions.
   - Identify what is explicit, implied, contradictory, missing, and emotionally important.

2. Classify signals:
   - Product requirement.
   - Factory requirement.
   - Governance policy.
   - Quality threshold.
   - Artifact expectation.
   - Human ownership expectation.
   - Example workload.
   - Open question.

3. Find attractors:
   - What keeps recurring?
   - What is the user trying to prevent?
   - What future failure would make this work feel unserious?
   - What must remain true across every project?

4. Collapse ambiguity carefully:
   - If evidence is enough, make a conservative decision and record assumptions.
   - If evidence is not enough, ask the smallest question.
   - If multiple projects are mixed, split them into nodes.

5. Route skills:
   - Choose only the child skills needed for the next node.
   - Avoid loading every skill body at once.
   - Record why each selected skill is necessary.

6. Gate execution:
   - Define what must be true before execution proceeds.
   - Define what evidence proves it.
   - Define who can waive or approve it.

7. Learn:
   - After reviews, failures, or customer corrections, update requirements, rubrics, templates, or skill triggers.
   - Add regression checks so the same process failure is not repeated.

## Stop Conditions

Stop and ask or escalate when:

- The user's real goal is unclear.
- A requirement changes legal, safety, production, security, or irreversible data risk.
- The factory would need to write outside allowed paths.
- Expert debate does not converge after three loops.
- A benchmark example starts becoming a hard-coded factory assumption.

## Stable Output Test

An attractor state is stable only if a fresh Codex session can answer:

- What are we building or governing?
- Why are we doing it?
- What is in and out?
- Which skills run next?
- What artifacts are required?
- What gates block progress?
- What evidence is needed?
- What human decisions remain?
- What is the next safe action?
