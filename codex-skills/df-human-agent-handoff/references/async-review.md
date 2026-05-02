# Async Review

Treat every async comment as one of:

- Clarification.
- Change request.
- Defect.
- Preference.
- Risk acceptance.
- Governance decision.
- Production approval.

Link the comment to affected requirements, artifacts, code, tests, and gates. If it changes behavior or scope, route it through change control.

## Required Async Review Mechanics

1. Acknowledge the comment and classify it.
2. Assign an ID and owner.
3. Link it to requirements, artifacts, code, tests, control graph node, work-ledger item, and refinery gate where applicable.
4. Decide whether it is blocking, non-blocking, preference, approval, or risk acceptance.
5. State confidence and whether a human decision is required.
6. Incorporate the change or record why it was not incorporated.
7. Re-run impacted verification and update trace evidence.
8. Close the thread only after owner approval or explicit deferral.

Escalate when comments conflict, lower a threshold, change scope, alter production risk, or expose unclear ownership.
