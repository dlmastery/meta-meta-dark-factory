# 37. Artifact-Specific Rubric Library Record

Status: generated and installed.

Date: 2026-04-25.

Purpose: provide artifact-specific quality assurance rubrics for every governed DFMS SDLC artifact at the meta-meta level.

## Meta-Meta Role

This library lets the DFMS factory instantiate the right quality model for the artifact being produced.

```text
meta-meta attractor
  -> selects factory mode and artifact set
    -> artifact factory selects a template
      -> quality refinery loads the artifact-specific rubric
        -> artifact-specific critic panel scores the artifact
          -> trace/refinery/certificate close the evidence loop
```

The library is not a single generic checklist. It is a catalog-driven rubric system.

## Generated Scope

Generated from:

- `03-artifact-catalog.md`
- `35-artifact-specific-critic-panel-matrix.md`
- `generate_artifact_template_library.py` focus metadata

Outputs:

- Governed artifact types: 63
- Artifact-level checks per artifact: 18
- Artifact-level checks total: 1,134
- Critic-seat rubrics per artifact: 3
- Critic-seat checks per critic: 15
- Critic-seat checks total: 2,835
- Total rubric checks: 3,969
- Workspace library: `dark-factory-meta-skills-design/artifact-rubric-library/`
- Installed live skill library: `C:/Users/abhir/.codex/skills/df-quality-refinery/references/artifact-rubric-library/`

## Rubric Structure

Each artifact rubric contains:

- artifact identity,
- basis and required links,
- pass policy,
- 18 artifact-level checks,
- 3 artifact-specific critic-seat rubrics,
- 15 checks per critic seat,
- required evidence per check,
- fail-if conditions per check,
- severity,
- score scale.

## Pass Policy

The default pass policy is:

- artifact-level score at least 96 percent,
- each critic-seat score at least 96 percent,
- every critical check must score 4 unless explicitly waived,
- every failed point requires fix evidence or owner-approved residual risk,
- no quality certificate without artifact rubric path, artifact review panel record, rubric score record, refinery gate, and trace evidence.

## Live Skill Changes

The live `df-quality-refinery` skill now requires:

- load the artifact-specific rubric from `references/artifact-rubric-library/index.json`;
- score 18 artifact-level checks;
- run 3 critic-seat reviews with exactly 15 checks each;
- reject artifact score records that lack `artifact_rubric_path`;
- reject artifact score records with fewer than 15 artifact-level check results;
- validate the rubric library using `scripts/validate_artifact_rubric_library.py`.

## Generator

Generator script:

`dark-factory-meta-skills-design/scripts/generate_artifact_rubric_library.py`

The generator:

- parses the governed artifact catalog,
- reads artifact-specific critic seats,
- creates Markdown and JSON rubric files,
- writes the workspace library,
- writes the installed live skill library,
- refuses unexpected output paths.

## Quality Guardrail

The rubric library itself is meta-level infrastructure. It is not proof that any project artifact is good.

A real artifact must still:

- instantiate the right template,
- fill project-specific content,
- remove examples and placeholders,
- link source intent and evidence,
- instantiate the artifact-specific critic panel,
- instantiate at least 2 adversarial critics,
- complete at least 5 RALPH loops,
- score all artifact-level and critic-seat checks,
- fix failures,
- close traceability,
- pass the refinery gate,
- receive a quality certificate.

## Verdict

DFMS now has per-artifact quality rubrics rather than a generic review checklist. The current governed catalog produces 3,969 checks across artifact-level and specialist critic-seat rubrics, giving the meta-meta system a much stronger quality control surface.
