#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path


REQUIRED_COVERAGE = (
    "content_authority",
    "governance_and_trace",
    "verification_and_handoff",
)
MIN_ADVERSARIAL_CRITICS = 2

REQUIRED_CRITIC_FIELDS = (
    "critic_seat_id",
    "base_persona",
    "persona_summary",
    "seniority_bar",
    "artifact_specific_mandate",
    "decision_rights",
    "primary_lens",
    "non_negotiables",
    "signature_questions",
    "red_flags",
    "artifact_checks",
    "adversarial_challenge",
    "evidence_required_for_pass",
    "handoff_note",
)


PLACEHOLDER_PATTERNS = (
    re.compile(r"^\s*$"),
    re.compile(r"\bTBD\b", re.I),
    re.compile(r"\bTODO\b", re.I),
    re.compile(r"placeholder", re.I),
    re.compile(r"example", re.I),
)


def is_blank_or_placeholder(value):
    if isinstance(value, str):
        return any(pattern.search(value) for pattern in PLACEHOLDER_PATTERNS)
    if isinstance(value, list):
        return not value or any(is_blank_or_placeholder(item) for item in value)
    return value is None


def validate_critic(critic, index):
    problems = []
    label = critic.get("critic_seat_id") or f"critic {index}"
    for field in REQUIRED_CRITIC_FIELDS:
        if field not in critic or is_blank_or_placeholder(critic.get(field)):
            problems.append(f"{label}: missing or placeholder {field}")
    if not critic.get("independent_review_required", False):
        problems.append(f"{label}: independent_review_required must be true")
    if isinstance(critic.get("artifact_checks"), list) and len(critic["artifact_checks"]) < 5:
        problems.append(f"{label}: artifact_checks must contain at least 5 artifact-specific checks")
    if isinstance(critic.get("non_negotiables"), list) and len(critic["non_negotiables"]) < 3:
        problems.append(f"{label}: non_negotiables must contain at least 3 items")
    if isinstance(critic.get("red_flags"), list) and len(critic["red_flags"]) < 3:
        problems.append(f"{label}: red_flags must contain at least 3 items")
    return problems


def validate_adversarial_critic(critic, index):
    problems = []
    label = critic.get("critic_id") or f"adversarial critic {index}"
    for field in ("critic_id", "base_persona", "persona_summary", "seniority_bar", "attack_mandate", "non_negotiables", "attack_questions", "red_flags", "evidence_required_to_stand_down", "handoff_note"):
        if field not in critic or is_blank_or_placeholder(critic.get(field)):
            problems.append(f"{label}: missing or placeholder {field}")
    if critic.get("independent_review_required") is not True:
        problems.append(f"{label}: independent_review_required must be true")
    for field in ("non_negotiables", "attack_questions", "red_flags", "evidence_required_to_stand_down"):
        if isinstance(critic.get(field), list) and len(critic[field]) < 3:
            problems.append(f"{label}: {field} must contain at least 3 items")
    return problems


def validate_panel(data):
    problems = []
    for field in ("id", "artifact_id", "artifact_name", "artifact_path", "panel_selection_rationale"):
        if field not in data or is_blank_or_placeholder(data.get(field)):
            problems.append(f"missing or placeholder {field}")

    coverage = data.get("coverage_model", {})
    for key in REQUIRED_COVERAGE:
        if coverage.get(key) is not True:
            problems.append(f"coverage_model.{key} must be true")

    critics = data.get("critics", [])
    if not isinstance(critics, list) or len(critics) < 3:
        problems.append("requires at least 3 artifact-specific critics")
    elif len(critics) > 3:
        expansion = data.get("specialist_expansion", {})
        if expansion.get("needed") is not True or is_blank_or_placeholder(expansion.get("reason", "")):
            problems.append("more than 3 critics requires specialist_expansion.needed=true and reason")

    seen = set()
    for index, critic in enumerate(critics, start=1):
        seat_id = critic.get("critic_seat_id")
        if seat_id in seen:
            problems.append(f"duplicate critic_seat_id {seat_id}")
        seen.add(seat_id)
        problems.extend(validate_critic(critic, index))

    adversarial = data.get("adversarial_critics", [])
    if not isinstance(adversarial, list) or len(adversarial) < MIN_ADVERSARIAL_CRITICS:
        problems.append(f"requires at least {MIN_ADVERSARIAL_CRITICS} adversarial critics")
    else:
        seen_adv = set()
        for index, critic in enumerate(adversarial, start=1):
            critic_id = critic.get("critic_id")
            if critic_id in seen_adv:
                problems.append(f"duplicate adversarial critic_id {critic_id}")
            seen_adv.add(critic_id)
            problems.extend(validate_adversarial_critic(critic, index))

    try:
        minimum_ralph_loops = int(data.get("minimum_ralph_loops", 0))
    except (TypeError, ValueError):
        minimum_ralph_loops = 0
    if minimum_ralph_loops < 5:
        problems.append("minimum_ralph_loops must be at least 5")
    if is_blank_or_placeholder(data.get("ralph_loop_record", "")):
        problems.append("missing ralph_loop_record")

    if data.get("cross_critique_required") is not True:
        problems.append("cross_critique_required must be true")
    if is_blank_or_placeholder(data.get("rubric_score_record", "")):
        problems.append("missing rubric_score_record")
    if is_blank_or_placeholder(data.get("refinery_gate", "")):
        problems.append("missing refinery_gate")
    if is_blank_or_placeholder(data.get("trace_evidence", [])):
        problems.append("missing trace_evidence")

    return problems


def main(path):
    data = json.loads(Path(path).read_text(encoding="utf-8-sig"))
    problems = validate_panel(data)
    if problems:
        print("Artifact review panel validation failed:")
        print("\n".join(problems))
        return 1
    print(json.dumps({"status": "pass", "artifact_id": data["artifact_id"], "critics": len(data["critics"])}, indent=2))
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: validate_artifact_review_panel.py artifact-review-panel-record.json")
    raise SystemExit(main(sys.argv[1]))
