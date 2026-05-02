# 00. Customer Interrogation

## Purpose

Develop and validate the project spec before design or implementation. The goal is to prevent the factory from building a polished but wrong todo app.

## Minimum Questions

### Product Goal

1. Who is the todo list for: personal users, teams, students, managers, or another group?
2. What problem is this solving beyond "make a list"?
3. What would make this product successful after 30 days?
4. Is this a learning/demo project, internal tool, or real product?

### Scope

5. Must users create accounts, or can the app work without login?
6. Should todos be saved locally, synced to a backend, or both?
7. Are lists shared between users?
8. Are due dates, reminders, priorities, labels, recurring tasks, or subtasks required?
9. Should the app support offline use?
10. What is explicitly out of scope for version 1?

### User Experience

11. What devices matter most: desktop, mobile, tablet?
12. Should the UI feel minimal, productivity-focused, playful, or enterprise-like?
13. Is accessibility a requirement for version 1?
14. Are keyboard shortcuts expected?
15. Should completed tasks be hidden, archived, or shown inline?

### Data and Security

16. Is any sensitive information expected inside tasks?
17. Does the app need authentication, authorization, encryption, audit logs, or data export?
18. Should users be able to delete all their data?
19. Are there privacy or compliance requirements?

### Operations and Handoff

20. Who will maintain the app after delivery?
21. Where will it run: static site, local desktop, private server, cloud app, or mobile wrapper?
22. What stack do you prefer?
23. What tests or documentation must be delivered?
24. Is production deployment part of this project?

## Validation Questions

1. Which three user journeys must work flawlessly?
2. What are the top three failure cases to avoid?
3. What is the simplest acceptable version 1?
4. What should the factory optimize for: speed, polish, maintainability, reliability, learning value, or production readiness?

## Intake Gate

Proceed to final SRS and architecture only when:

- Product goal is concrete.
- Version 1 scope is explicit.
- Storage and identity model are decided.
- Primary user journeys are accepted.
- Non-functional expectations are known or accepted as assumptions.
- Maintainer and deployment expectations are clear.

