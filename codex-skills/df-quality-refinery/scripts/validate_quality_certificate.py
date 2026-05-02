#!/usr/bin/env python3
import contextlib
import io
import json
import sys
from pathlib import Path

import score_rubric_matrix
import validate_refinery_gate


REQUIRED_TOP_LEVEL = {
    "id",
    "artifact",
    "status",
    "reviewers",
    "scores",
    "panel_score_record",
    "artifact_review_panel_record",
    "artifact_ralph_loop_record",
    "minimum_ralph_loops_completed",
    "adversarial_critics",
    "adversarial_critics_stood_down",
    "independent_review_evidence",
    "cross_critique_evidence",
    "failed_point_fix_evidence",
    "refinery_gate",
    "evidence",
    "residual_risks",
}

ALLOWED_STATUSES = {"pending", "pass", "conditional_pass", "revise", "fail", "escalated"}
MIN_REVIEWERS = 3
MIN_ADVERSARIAL_CRITICS = 2
MIN_RALPH_LOOPS = 5
MIN_PASS_SCORE = 96
PLACEHOLDER_VALUES = {"", "pending", "CERT-001"}


def list_value(value):
    if value is None:
        return []
    if isinstance(value, list):
        return [item for item in value if item not in ("", None)]
    if value in ("", None):
        return []
    return [value]


def non_placeholder(value):
    if value is None:
        return False
    if isinstance(value, str):
        return value.strip() not in PLACEHOLDER_VALUES
    if isinstance(value, list):
        return bool(list_value(value))
    if isinstance(value, dict):
        return bool(value)
    return True


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


def has_waiver(record, topic):
    waivers = record.get("waivers", [])
    if not isinstance(waivers, list):
        return False
    return any(waiver_is_complete(waiver, topic) for waiver in waivers)


def validate_waivers(record, problems):
    waivers = record.get("waivers", [])
    if waivers in (None, ""):
        return
    if not isinstance(waivers, list):
        problems.append("waivers must be a list")
        return
    for index, waiver in enumerate(waivers, start=1):
        topic = waiver.get("topic") if isinstance(waiver, dict) else None
        if not topic or not waiver_is_complete(waiver, topic):
            problems.append(f"waiver {index} missing topic, owner, reason, revalidation/expiry, or residual risk")


def validate_scores(record, problems):
    scores = record.get("scores")
    if not isinstance(scores, dict) or not scores:
        problems.append("scores must be a non-empty object")
        return
    if len(scores) < MIN_REVIEWERS:
        problems.append(f"scores require at least {MIN_REVIEWERS} reviewer entries")
    reviewers = list_value(record.get("reviewers"))
    if len(set(reviewers)) != len(reviewers):
        problems.append("reviewers must be unique")
    reviewer_set = set(reviewers)
    score_set = set(scores)
    for reviewer in sorted(reviewer_set - score_set):
        problems.append(f"{reviewer}: missing score")
    for role in sorted(score_set - reviewer_set):
        problems.append(f"{role}: score has no matching reviewer")
    for role, score in scores.items():
        if not isinstance(score, (int, float)) or score < 0 or score > 100:
            problems.append(f"{role}: score must be 0..100")
        elif record.get("status") == "pass" and score < MIN_PASS_SCORE and not has_waiver(record, "threshold_lowering"):
            problems.append(f"{role}: pass certificate score {score} below {MIN_PASS_SCORE}")


def validate_threshold(record, problems):
    threshold = record.get("threshold_percent", MIN_PASS_SCORE)
    if not isinstance(threshold, (int, float)) or threshold < 0 or threshold > 100:
        problems.append("threshold_percent must be 0..100")
    elif threshold < MIN_PASS_SCORE and not has_waiver(record, "threshold_lowering"):
        problems.append(f"threshold_percent below {MIN_PASS_SCORE} requires waiver topic threshold_lowering")


def validate_certificate(record, allow_pending=False):
    problems = []
    missing = sorted(REQUIRED_TOP_LEVEL - set(record))
    for key in missing:
        problems.append(f"missing top-level key {key}")
    if record.get("id") in (None, "", "CERT-001"):
        problems.append("certificate has placeholder or missing id")
    status = record.get("status")
    if status not in ALLOWED_STATUSES:
        problems.append("status must be a live certificate verdict")
    elif status == "pending" and not allow_pending:
        problems.append("status is still pending")
    if record.get("artifact") in (None, ""):
        problems.append("missing artifact")
    reviewers = list_value(record.get("reviewers"))
    if len(reviewers) < MIN_REVIEWERS:
        problems.append(f"requires at least {MIN_REVIEWERS} reviewers")
    adversarial_critics = list_value(record.get("adversarial_critics"))
    if len(adversarial_critics) < MIN_ADVERSARIAL_CRITICS:
        problems.append(f"requires at least {MIN_ADVERSARIAL_CRITICS} adversarial critics")
    loops_completed = record.get("minimum_ralph_loops_completed")
    if not isinstance(loops_completed, int) or loops_completed < MIN_RALPH_LOOPS:
        problems.append(f"minimum_ralph_loops_completed must be at least {MIN_RALPH_LOOPS}")
    validate_threshold(record, problems)
    validate_scores(record, problems)
    validate_waivers(record, problems)
    if status == "pass":
        for key in (
            "panel_score_record",
            "artifact_review_panel_record",
            "artifact_ralph_loop_record",
            "independent_review_evidence",
            "cross_critique_evidence",
            "failed_point_fix_evidence",
            "refinery_gate",
            "evidence",
        ):
            if not non_placeholder(record.get(key)):
                problems.append(f"pass certificate missing {key}")
        if record.get("adversarial_critics_stood_down") is not True:
            problems.append("pass certificate requires adversarial_critics_stood_down=true")
        if not str(record.get("refinery_gate", "")).startswith("RFG-"):
            problems.append("pass certificate refinery_gate must reference RFG-*")
        if not str(record.get("panel_score_record", "")).startswith(("EVD-", "RUBRIC-")):
            problems.append("pass certificate panel_score_record must reference EVD-* or RUBRIC-*")
    if "residual_risks" not in record:
        problems.append("missing residual_risks")
    return problems


def load_panel(path):
    return json.loads(Path(path).read_text(encoding="utf-8-sig"))


def panel_reviewer_roles(panel):
    roles = []
    for reviewer in panel.get("reviewers", []):
        role = reviewer.get("reviewer_role") or reviewer.get("role")
        if role:
            roles.append(role)
    return roles


def validate_panel_reference(record, panel_path, problems):
    try:
        panel = load_panel(panel_path)
    except Exception as exc:
        problems.append(f"panel score record could not be read: {exc}")
        return
    panel_id = panel.get("id") or panel.get("record_id")
    if panel_id != record.get("panel_score_record"):
        problems.append("panel_score_record does not match referenced panel id")
    if panel.get("artifact") != record.get("artifact"):
        problems.append("certificate artifact does not match referenced panel artifact")
    panel_roles = set(panel_reviewer_roles(panel))
    certificate_reviewers = set(list_value(record.get("reviewers")))
    if panel_roles != certificate_reviewers:
        problems.append("certificate reviewers do not match referenced panel reviewers")
    panel_problems, scored_panel = score_rubric_matrix.validate_panel(panel, record.get("threshold_percent", MIN_PASS_SCORE))
    for problem in panel_problems:
        problems.append(f"referenced panel invalid: {problem}")
    if record.get("status") == "pass" and scored_panel.get("verdict") != "pass":
        problems.append("pass certificate requires referenced panel verdict pass")
    panel_scores = scored_panel.get("reviewer_percents", {})
    for role, certificate_score in record.get("scores", {}).items():
        panel_score = panel_scores.get(role)
        if panel_score is None:
            problems.append(f"{role}: missing referenced panel score")
        elif abs(float(certificate_score) - float(panel_score)) > 0.01:
            problems.append(f"{role}: certificate score {certificate_score} does not match referenced panel score {panel_score}")


def validate_refinery_reference(record, refinery_path, problems):
    buffer = io.StringIO()
    with contextlib.redirect_stdout(buffer):
        refinery_exit = validate_refinery_gate.main(refinery_path)
    if refinery_exit != 0:
        output = buffer.getvalue().strip() or "unknown refinery validation error"
        problems.append(f"referenced refinery gate invalid: {output}")
        return
    text = Path(refinery_path).read_text(encoding="utf-8-sig")
    gate_id = validate_refinery_gate.scalar_value(text, "id")
    status = validate_refinery_gate.scalar_value(text, "status")
    if gate_id != record.get("refinery_gate"):
        problems.append("refinery_gate does not match referenced refinery gate id")
    if record.get("status") == "pass" and status != "pass":
        problems.append("pass certificate requires referenced refinery gate status pass")
    structured_expectations = (
        ("scope.artifacts", record.get("artifact"), validate_refinery_gate.section_list_values(text, "scope", "artifacts")),
        (
            "evidence.rubric_scorecards",
            record.get("panel_score_record"),
            validate_refinery_gate.section_list_values(text, "evidence", "rubric_scorecards"),
        ),
        (
            "evidence.certificates",
            record.get("id"),
            validate_refinery_gate.section_list_values(text, "evidence", "certificates"),
        ),
    )
    for label, expected, values in structured_expectations:
        if expected and str(expected) not in values:
            problems.append(f"referenced refinery gate missing {expected} in {label}")


def validate_certificate_bundle(record, panel_path=None, refinery_path=None):
    problems = []
    if panel_path:
        validate_panel_reference(record, panel_path, problems)
    elif record.get("status") == "pass":
        problems.append("pass certificate requires --panel-score-record for bundle validation")
    if refinery_path:
        validate_refinery_reference(record, refinery_path, problems)
    elif record.get("status") == "pass":
        problems.append("pass certificate requires --refinery-gate for bundle validation")
    return problems


def parse_args(args):
    allow_pending = False
    panel_path = None
    refinery_path = None
    index = 0
    while index < len(args):
        arg = args[index]
        if arg == "--allow-pending":
            allow_pending = True
            index += 1
        elif arg == "--panel-score-record":
            if index + 1 >= len(args):
                raise ValueError("--panel-score-record requires a path")
            panel_path = args[index + 1]
            index += 2
        elif arg == "--refinery-gate":
            if index + 1 >= len(args):
                raise ValueError("--refinery-gate requires a path")
            refinery_path = args[index + 1]
            index += 2
        else:
            raise ValueError(f"unknown argument {arg}")
    return allow_pending, panel_path, refinery_path


def main(path, allow_pending=False, panel_path=None, refinery_path=None):
    try:
        record = json.loads(Path(path).read_text(encoding="utf-8-sig"))
    except Exception as exc:
        print(str(exc))
        return 1
    if not isinstance(record, dict):
        print("Quality certificate must be a JSON object.")
        return 1
    problems = validate_certificate(record, allow_pending)
    problems.extend(validate_certificate_bundle(record, panel_path, refinery_path))
    if problems:
        print("\n".join(problems))
        return 1
    print("Quality certificate is valid.")
    return 0


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit(
            "Usage: validate_quality_certificate.py quality-certificate.json "
            "[--allow-pending] [--panel-score-record panel.json] [--refinery-gate gate.yaml]"
        )
    try:
        allow_pending_arg, panel_arg, refinery_arg = parse_args(sys.argv[2:])
    except ValueError as exc:
        raise SystemExit(str(exc))
    raise SystemExit(main(sys.argv[1], allow_pending_arg, panel_arg, refinery_arg))
