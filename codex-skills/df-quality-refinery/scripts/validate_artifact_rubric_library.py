#!/usr/bin/env python3
import json
import sys
from pathlib import Path


MIN_ARTIFACT_CHECKS = 15
REQUIRED_CRITIC_SEATS = 3
REQUIRED_CRITIC_CHECKS = 15
MIN_THRESHOLD = 96


REQUIRED_CHECK_FIELDS = (
    "id",
    "name",
    "severity",
    "score_scale",
    "intent",
    "required_evidence",
    "fail_if",
)


def problem_list_for_check(check, label):
    problems = []
    for field in REQUIRED_CHECK_FIELDS:
        value = check.get(field)
        if isinstance(value, list):
            if not value or any(not str(item).strip() for item in value):
                problems.append(f"{label}: {field} must be a non-empty list")
        elif not isinstance(value, str) or not value.strip():
            problems.append(f"{label}: {field} must be non-empty")
    if check.get("severity") not in {"critical", "major", "minor"}:
        problems.append(f"{label}: severity must be critical, major, or minor")
    return problems


def validate_rubric(data, source):
    problems = []
    for field in ("artifact_id", "artifact_name", "basis", "required_links", "score_scale", "pass_policy"):
        if not data.get(field):
            problems.append(f"{source}: missing {field}")

    artifact_checks = data.get("artifact_level_rubric", [])
    if len(artifact_checks) < MIN_ARTIFACT_CHECKS:
        problems.append(f"{source}: artifact_level_rubric requires at least {MIN_ARTIFACT_CHECKS} checks")
    for index, item in enumerate(artifact_checks, start=1):
        problems.extend(problem_list_for_check(item, f"{source}: artifact check {index}"))

    critics = data.get("critic_seat_rubrics", [])
    if len(critics) != REQUIRED_CRITIC_SEATS:
        problems.append(f"{source}: requires exactly {REQUIRED_CRITIC_SEATS} critic seat rubrics")
    seen_seats = set()
    for critic in critics:
        seat = critic.get("critic_seat_id", "<missing-seat>")
        if seat in seen_seats:
            problems.append(f"{source}: duplicate critic_seat_id {seat}")
        seen_seats.add(seat)
        for field in ("critic_seat_id", "seat_kind", "mandate", "required_check_count", "checks"):
            if field not in critic or critic.get(field) in ("", None):
                problems.append(f"{source}: {seat} missing {field}")
        checks = critic.get("checks", [])
        if len(checks) != REQUIRED_CRITIC_CHECKS:
            problems.append(f"{source}: {seat} requires exactly {REQUIRED_CRITIC_CHECKS} checks")
        for index, item in enumerate(checks, start=1):
            problems.extend(problem_list_for_check(item, f"{source}: {seat} check {index}"))

    pass_policy = data.get("pass_policy", {})
    if pass_policy:
        for field in ("artifact_level_minimum_percent", "critic_seat_minimum_percent"):
            value = pass_policy.get(field)
            if not isinstance(value, (int, float)) or value < MIN_THRESHOLD:
                problems.append(f"{source}: pass_policy.{field} must be at least {MIN_THRESHOLD}")
        if pass_policy.get("critical_check_minimum_score") != 4:
            problems.append(f"{source}: critical_check_minimum_score must be 4")
    return problems


def iter_rubric_files(path):
    root = Path(path)
    if root.is_file():
        yield root
    else:
        yield from sorted(root.glob("*/*-rubric.json"))


def main(path):
    files = list(iter_rubric_files(path))
    if not files:
        print("No rubric JSON files found")
        return 1
    problems = []
    totals = {"files": 0, "artifact_checks": 0, "critic_seat_checks": 0, "total_checks": 0}
    for file in files:
        data = json.loads(file.read_text(encoding="utf-8-sig"))
        problems.extend(validate_rubric(data, str(file)))
        totals["files"] += 1
        totals["artifact_checks"] += len(data.get("artifact_level_rubric", []))
        totals["critic_seat_checks"] += sum(len(c.get("checks", [])) for c in data.get("critic_seat_rubrics", []))
    totals["total_checks"] = totals["artifact_checks"] + totals["critic_seat_checks"]
    if problems:
        print("Artifact rubric validation failed:")
        print("\n".join(problems[:200]))
        if len(problems) > 200:
            print(f"... {len(problems) - 200} more")
        return 1
    print(json.dumps({"status": "pass", **totals}, indent=2))
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: validate_artifact_rubric_library.py rubric-file-or-library-dir")
    raise SystemExit(main(sys.argv[1]))
