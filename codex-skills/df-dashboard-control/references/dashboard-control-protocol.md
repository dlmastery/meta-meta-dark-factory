> **NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**
> Strict compliance is mandatory. Every graph edge, impact claim, redo order, and dashboard status must be backed by explicit evidence or marked inferred.

# Dashboard Control Protocol

## Dashboard Object Model

The dashboard graph contains:

- Artifact nodes: Markdown docs, templates, generated artifacts, PRDs, BRDs, SRS, HLD/LLD, ADRs, test plans, runbooks, certificates.
- Evidence nodes: test outputs, screenshots, logs, validation JSON, score records.
- Governance nodes: task beads, control graph nodes, work-ledger items, PERT steps, Hawkeye audits, AI judge/jury records.
- Trace nodes: requirements, NFRs, assumptions, decisions, risks, scenarios, tests, code/design elements.
- Portal nodes: onboarding paths, diagram atlas, document index, gate map, next-action panel.

## Edge Types

Use these edge types:

- `depends_on`: target cannot be trusted unless source is current.
- `satisfies`: source satisfies target requirement or gate.
- `verifies`: source test/evidence verifies target artifact or requirement.
- `documents`: source document describes target node.
- `generated_from`: source was produced from target input.
- `supersedes`: source replaces target.
- `blocks`: source blocks target.
- `reviewed_by`: source was reviewed by target review record.
- `certified_by`: source was certified by target certificate.
- `reopens`: changing source reopens target gate/certificate.
- `inferred_reference`: non-authoritative reference found by scanning text.

## Redo Closure Semantics

For a selected node:

1. Include the selected node.
2. Follow outgoing `depends_on`, `satisfies`, `verifies`, `documents`, `generated_from`, `reviewed_by`, `certified_by`, and `reopens` edges downstream.
3. Include any gate, certificate, review, trace, test, or portal node that references an impacted node.
4. Stop at nodes explicitly marked `redo_boundary: true` unless the request says `force_boundary`.
5. Preserve edge reasons in the impact report.

## Redo Report Requirements

The report must state:

- selected node and reason for redo;
- authoritative versus inferred edges;
- impacted nodes grouped by stage/type;
- redo order;
- gates and certificates to reopen;
- tests, browser/WYSIWYG checks, scenario/holdout/transfer checks, security checks, and Hawkeye checks to rerun;
- human approvals and token SWAG;
- residual risks if inferred edges are not converted into explicit trace records.

## Human Dashboard Requirements

The dashboard must support a human reviewer answering:

- What exists?
- What is accepted, blocked, stale, or conditional?
- What evidence proves it?
- What artifacts depend on it?
- What breaks if I change this node?
- What is the next legal action?
- Who must approve a redo?
