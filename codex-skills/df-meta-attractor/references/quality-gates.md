# Meta-Attractor Quality Gates

Use these gates before treating a meta-meta output as accepted.

## Gate A: Coherence

Pass only if:

- Goal is one sentence.
- Scope has explicit in/out boundaries.
- Example workloads are labeled as examples.
- Open questions are separated from accepted decisions.
- Next safe action is concrete.

## Gate B: Recursion Control

Pass only if:

- The output distinguishes product, meta-skill, and meta-meta layers.
- It does not create infinite planning loops.
- It names when to stop refining and start execution.
- It records re-entry triggers for future refinement.

## Gate C: Routing

Pass only if:

- Child skills are selected by need.
- Each selected skill has a reason.
- No unnecessary skill loading is required.
- Human decision points are identified before automation proceeds.

## Gate D: Evidence

Pass only if:

- Requirements have traceable sources.
- Gates have evidence expectations.
- Quality thresholds are named.
- Residual risks are preserved.
- A fresh reviewer can replay the decision.

## Gate E: Anti-Overfit

Pass only if:

- Benchmark app details do not become universal factory rules.
- Transfer tests are specified for reusable patterns.
- Domain-specific assumptions are labeled.
- The skill hierarchy remains usable for both greenfield and brownfield projects.

## Verdicts

- Pass: all gates pass and residual risk is acceptable.
- Conditional pass: execution may proceed with named assumptions and revalidation triggers.
- Revise: the attractor shape is useful but a gate is missing.
- Escalate: a human decision is required before safe progress.
