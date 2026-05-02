# RUP, MDA, DDD, TDD Blend

RUP:
- Use inception for vision, scope, business case, and risk framing.
- Use elaboration for architecture and risk burn-down.
- Use construction for implementation and verification.
- Use transition for release, training, and handoff.
- Create a control graph node for each selected phase and link phase exits to refinery gates.

MDA:
- Use CIM for business behavior without platform detail.
- Use PIM for platform-independent system behavior.
- Use PSM for stack-specific mapping.
- Record CIM to PIM to PSM transformations.
- Each transformation must link source model, target model, mapping rule, exception, reviewer, and verification evidence.

DDD:
- Build ubiquitous language.
- Define bounded contexts.
- Model aggregates, invariants, services, events, and anti-corruption layers.

TDD/BDD:
- Convert requirements into acceptance criteria and scenarios.
- Use red, green, refactor loops where code is changed.
- Keep holdout scenarios separate when testing agentic output.
- Record red-green-refactor evidence or a justified substitute for each implementation slice.

SRE:
- Define SLIs/SLOs where production reliability matters.
- Require deployment, rollback, observability, incident, and ownership artifacts.
- Require outage-drill or runbook-replay evidence when humans own production.
