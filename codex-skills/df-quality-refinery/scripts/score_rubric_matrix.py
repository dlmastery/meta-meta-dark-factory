#!/usr/bin/env python3
import json
import sys
from pathlib import Path


REQUIRED_REVIEWERS = 3
REQUIRED_CHECKS = 15
MIN_THRESHOLD = 96
REQUIRED_PERSONA_FIELDS = (
    "persona_summary",
    "seniority_bar",
    "primary_lens",
    "decision_rights",
    "non_negotiables",
    "red_flags",
    "evidence_required_for_pass",
    "handoff_note",
)
PLACEHOLDER_STRINGS = ("", "tbd", "todo", "placeholder", "example")


def fail(message):
    print(message)
    return 1


def validate_check(check, reviewer_role, index):
    problems = []
    if not check.get("id") and not check.get("name"):
        problems.append(f"{reviewer_role}: check {index} missing id or name")
    score = check.get("score")
    if not isinstance(score, int) or score < 0 or score > 4:
        problems.append(f"{reviewer_role}: check {index} score must be integer 0..4")
    if not check.get("rationale"):
        problems.append(f"{reviewer_role}: check {index} missing rationale")
    if score is not None and score < 4 and not check.get("fix_or_risk"):
        problems.append(f"{reviewer_role}: check {index} below 4 requires fix_or_risk")
    if score is not None and score < 4 and not (check.get("fix_evidence") or check.get("resolution_evidence")):
        problems.append(f"{reviewer_role}: check {index} below 4 requires fix_evidence or resolution_evidence")
    return problems


def waiver_is_complete(waiver, topic):
    if not isinstance(waiver, dict):
        return False
    if waiver.get("topic") != topic:
        return False
    if not waiver.get("owner") or not waiver.get("reason"):
        return False
    if not waiver.get("revalidation_trigger") and not waiver.get("expires_at"):
        return False
    if "residual_risk" not in waiver and "residual_risks" not in waiver:
        return False
    return True


def is_blank_or_placeholder(value):
    if not isinstance(value, str):
        return False
    return value.strip().lower() in PLACEHOLDER_STRINGS


def has_waiver(data, topic):
    waivers = data.get("waivers", [])
    if not isinstance(waivers, list):
        return False
    return any(waiver_is_complete(waiver, topic) for waiver in waivers)


def validate_waivers(data, problems):
    waivers = data.get("waivers", [])
    if waivers in (None, ""):
        return
    if not isinstance(waivers, list):
        problems.append("waivers must be a list")
        return
    for index, waiver in enumerate(waivers, start=1):
        topic = waiver.get("topic") if isinstance(waiver, dict) else None
        if not topic or not waiver_is_complete(waiver, topic):
            problems.append(f"waiver {index} missing topic, owner, reason, revalidation/expiry, or residual risk")


def validate_persona(reviewer, role):
    problems = []
    for field in REQUIRED_PERSONA_FIELDS:
        value = reviewer.get(field)
        if isinstance(value, list):
            if not value or any(not str(item).strip() for item in value):
                problems.append(f"{role}: reviewer persona field {field} must be a non-empty list")
        elif not isinstance(value, str) or not value.strip():
            problems.append(f"{role}: reviewer persona field {field} must be non-empty")
    return problems


def validate_threshold(data, threshold, problems):
    record_threshold = data.get("threshold_percent", threshold)
    for label, value in (("threshold argument", threshold), ("threshold_percent", record_threshold)):
        if not isinstance(value, (int, float)) or value < 0 or value > 100:
            problems.append(f"{label} must be 0..100")
        elif value < MIN_THRESHOLD and not has_waiver(data, "threshold_lowering"):
            problems.append(f"{label} below {MIN_THRESHOLD} requires waiver topic threshold_lowering")


def validate_artifact_panel_link(data, problems):
    artifact_id = data.get("artifact_id")
    if artifact_id and not is_blank_or_placeholder(artifact_id):
        if is_blank_or_placeholder(data.get("artifact_review_panel_record", "")):
            problems.append("artifact review requires artifact_review_panel_record")
        if is_blank_or_placeholder(data.get("artifact_rubric_path", "")):
            problems.append("artifact review requires artifact_rubric_path")
        if is_blank_or_placeholder(data.get("artifact_ralph_loop_record", "")):
            problems.append("artifact review requires artifact_ralph_loop_record")
        loops_completed = data.get("minimum_ralph_loops_completed", 0)
        if not isinstance(loops_completed, int) or loops_completed < 5:
            problems.append("artifact review requires minimum_ralph_loops_completed >= 5")
        if is_blank_or_placeholder(data.get("panel_selection_rationale", "")):
            problems.append("artifact review requires panel_selection_rationale")
        artifact_results = data.get("artifact_level_check_results", [])
        if not isinstance(artifact_results, list) or len(artifact_results) < 15:
            problems.append("artifact review requires at least 15 artifact_level_check_results")
        for index, result in enumerate(artifact_results, start=1):
            score = result.get("score") if isinstance(result, dict) else None
            if not isinstance(score, int) or score < 0 or score > 4:
                problems.append(f"artifact level check {index} score must be integer 0..4")
            if isinstance(result, dict) and not result.get("rationale"):
                problems.append(f"artifact level check {index} missing rationale")
            if isinstance(score, int) and score < 4 and isinstance(result, dict) and not (result.get("fix_evidence") or result.get("resolution_evidence")):
                problems.append(f"artifact level check {index} below 4 requires fix_evidence or resolution_evidence")


def validate_panel(data, threshold):
    reviewers = data.get("reviewers", [])
    problems = []
    validate_waivers(data, problems)
    validate_threshold(data, threshold, problems)
    validate_artifact_panel_link(data, problems)
    if len(reviewers) < REQUIRED_REVIEWERS:
        problems.append(f"requires at least {REQUIRED_REVIEWERS} reviewers")

    reviewer_roles = set()
    percents = {}
    for reviewer in reviewers:
        role = reviewer.get("reviewer_role") or reviewer.get("role") or "<missing-role>"
        if role in reviewer_roles:
            problems.append(f"duplicate reviewer role {role}")
        reviewer_roles.add(role)
        if not reviewer.get("independent_review_at"):
            problems.append(f"{role}: missing independent_review_at")
        problems.extend(validate_persona(reviewer, role))
        checks = reviewer.get("checks", [])
        if len(checks) != REQUIRED_CHECKS:
            problems.append(f"{role}: requires exactly {REQUIRED_CHECKS} checks")
        for idx, check in enumerate(checks, start=1):
            problems.extend(validate_check(check, role, idx))
        total = sum(check.get("score", 0) for check in checks if isinstance(check.get("score"), int))
        possible = len(checks) * 4
        percents[role] = round((total / possible) * 100, 2) if possible else 0
        if percents[role] < threshold:
            problems.append(f"{role}: score {percents[role]} below threshold {threshold}")

    cross = data.get("cross_critique", {})
    if not cross.get("at") or not cross.get("summary"):
        problems.append("missing cross_critique.at or cross_critique.summary")

    synthesis = data.get("synthesis", {})
    if not synthesis.get("verdict"):
        problems.append("missing synthesis.verdict")
    if synthesis.get("verdict") == "pass" and not synthesis.get("failed_points_resolved"):
        problems.append("pass verdict requires failed_points_resolved=true")
    if not synthesis.get("evidence"):
        problems.append("missing synthesis evidence")

    data["reviewer_percents"] = percents
    data["percent"] = round(min(percents.values()), 2) if percents else 0
    data["verdict"] = "pass" if not problems and data["percent"] >= threshold else "revise"
    return problems, data


def main(path, threshold=96):
    data = json.loads(Path(path).read_text(encoding="utf-8-sig"))
    if "reviewers" not in data:
        return fail("Panel rubric record must contain reviewers[] with 3 reviewers and 15 checks each.")
    problems, data = validate_panel(data, threshold)
    print(json.dumps(data, indent=2))
    if problems:
        print("\nProblems:")
        print("\n".join(problems))
        return 1
    return 0


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit("Usage: score_rubric_matrix.py panel-score-record.json [threshold]")
    threshold = float(sys.argv[2]) if len(sys.argv) > 2 else 96
    raise SystemExit(main(sys.argv[1], threshold))
