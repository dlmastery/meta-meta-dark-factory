**NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS**

# Always-On Runtime Scheduler And No-Skip Enforcement Spec

## Purpose

The transcript requires confidence that agents cannot skip steps, fake evidence, or pick work from chat memory. Existing validators and the local control console are strong, but this spec defines the missing runtime contract: a scheduler that makes illegal transitions impossible by default.

## Name

DFMS Runtime Sheriff.

## Core Rule

No governed node may start, advance, certify, hand off, redo, or close unless the Runtime Sheriff accepts a transition request based on current durable state.

Chat memory is never a legal source of truth for next action.

## Durable State Inputs

The scheduler must load:

- Attractor Run Record;
- product-tailoring profile;
- generated meta-skill contract;
- engagement governance record;
- control graph;
- work ledger;
- `TASKS.md`;
- PERT dependency plan;
- knowledge graph;
- SDLC Stage Coverage Matrix;
- AI judge/jury records;
- Hawkeye audit records;
- trace/evidence ledger;
- dashboard-control index;
- redo impact reports;
- quality/refinery gates;
- human-agent handoff records;
- research/source freshness records when current-sensitive claims are involved.

## Transition API

Every transition request must include:

| Field | Meaning |
| --- | --- |
| `run_id` | Stable governed run ID |
| `current_node` | Current control-graph node |
| `requested_transition` | start, advance, redo, certify, handoff, close, or reopen |
| `requested_by` | agent, human, scheduler, or judge panel |
| `scope_delta` | none, requirements, design, code, test, ops, budget, risk, schedule |
| `evidence_paths` | Physical files supporting the transition |
| `token_delta` | low, medium, high, or none |
| `approval_state` | approved, pending, not_required, or blocked |
| `risk_state` | none, accepted, unresolved, or escalated |

The scheduler returns one of:

- `pass`
- `blocked`
- `change_control_required`
- `human_boundary_required`
- `redo_required`
- `closed`

## Hard Blocks

The scheduler must block if:

- meta-meta gate is missing for governed work;
- generated meta-skill contract is missing or generic;
- current node does not match the control graph;
- predecessors in the PERT plan are unmet;
- required customer answers are missing;
- P1 contradictions are unresolved;
- token SWAG or reapproval trigger is breached;
- code-producing work lacks implementation/build/test evidence;
- UI work lacks browser/WYSIWYG evidence;
- scenario-driven work lacks scenario, holdout, and transfer evidence;
- production-surface work lacks release, rollback, observability, runbook, incident, and outage-drill evidence;
- artifact pass lacks artifact-specific critic panel, 15-check reviewer scorecards, adversarial critics, RALPH loop record, fix evidence, and certificate;
- Hawkeye has open vetoes;
- any physical evidence file is missing;
- any output is a template presented as proof;
- a redo changes a node without transitive impact closure.

## Runtime Ledger

The scheduler writes an append-only transition ledger:

| Column | Required |
| --- | --- |
| transition ID | yes |
| timestamp | yes |
| current node | yes |
| requested transition | yes |
| decision | yes |
| reason | yes |
| evidence files | yes |
| reopened gates | when applicable |
| tests to rerun | when applicable |
| human approval | when applicable |
| next legal node | when applicable |

## Relationship To Current Implementation

Current DFMS has:

- execution-kernel preflight;
- task beads;
- PERT and work-ledger records;
- Hawkeye audit;
- local control console;
- live `/validate` and `/ralph` endpoints for the console run.

This spec turns that into an explicit product requirement for a persistent scheduler. Until implemented, DFMS may claim "spec-layer no-skip assurance" and "local console validation," but not "always-on runtime enforcement."

## Acceptance Tests

The scheduler implementation is not done until these tests pass:

1. Attempt to skip meta-attractor and verify block.
2. Attempt to run child skills before interrogation and verify block.
3. Attempt to pass with incomplete customer answers and verify block.
4. Attempt to pass with unresolved P1 contradiction and verify block.
5. Attempt to close code-producing run with documents only and verify block.
6. Attempt to close UI run without browser evidence and verify block.
7. Attempt to close scenario-driven run without holdout/transfer evidence and verify block.
8. Attempt to close production run without SRE evidence and verify block.
9. Attempt to certify artifact without 5 RALPH loops and verify block.
10. Attempt to redo PRD without downstream closure and verify block.
11. Attempt a legal full transition and verify pass.
12. Restart scheduler and verify state recovery from durable files.

## Certificate Boundary

This file is the authoritative scheduler spec. It is not itself the scheduler implementation.
