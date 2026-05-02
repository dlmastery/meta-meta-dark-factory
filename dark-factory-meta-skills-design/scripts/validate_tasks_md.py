#!/usr/bin/env python3
"""Validate DFMS TASKS.md bead tracking discipline."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


ZERO_SLOP = "NO AI SLOP ALLOWED AT ALL - ZERO TOLERANCE TO SLOP AND HALLUCINATIONS"
REQUIRED_SECTIONS = [
    "## Project Task Bead Operating Rules",
    "## Current Run",
    "## Active Beads",
    "## Ready And Queued Beads",
    "## Blocked Beads",
    "## Review And Rework Beads",
    "## Accepted Beads",
    "## Deferred And Retired Beads",
    "## Bead Detail Records",
    "## Open Approvals",
    "## Token-Budget Checkpoint Log",
    "## Validator And Evidence Log",
    "## Change Log",
]
REQUIRED_COLUMNS = [
    "Bead ID",
    "State",
    "Objective",
    "Owner",
    "Control Node",
    "Work Ledger",
    "KG Node",
    "Gate",
    "Evidence",
    "Next Bead",
]
BEAD_ID_RE = re.compile(r"`?(TB-\d{8}-\d{3,})`?")


def table_lines_after(text: str, section: str) -> list[str]:
    start = text.find(section)
    if start == -1:
        return []
    rest = text[start + len(section) :]
    next_heading = re.search(r"\n## ", rest)
    section_text = rest[: next_heading.start()] if next_heading else rest
    return [line.strip() for line in section_text.splitlines() if line.strip().startswith("|")]


def split_row(line: str) -> list[str]:
    return [part.strip().strip("`") for part in line.strip().strip("|").split("|")]


def add(failures: list[str], message: str) -> None:
    failures.append(message)


def validate_tasks(text: str, allow_template: bool = False) -> list[str]:
    failures: list[str] = []

    if ZERO_SLOP not in text[:500]:
        add(failures, "zero-slop banner missing from top of TASKS.md")

    for section in REQUIRED_SECTIONS:
        if section not in text:
            add(failures, f"missing required section {section}")

    active_lines = table_lines_after(text, "## Active Beads")
    if active_lines:
        header = split_row(active_lines[0])
        for column in REQUIRED_COLUMNS:
            if column not in header:
                add(failures, f"Active Beads table missing column {column}")
    elif not allow_template:
        add(failures, "Active Beads table missing")

    bead_ids = BEAD_ID_RE.findall(text)
    if not bead_ids:
        add(failures, "no task bead IDs found")
    table_bead_ids: list[str] = []
    for section in (
        "## Active Beads",
        "## Ready And Queued Beads",
        "## Blocked Beads",
        "## Review And Rework Beads",
        "## Accepted Beads",
        "## Deferred And Retired Beads",
    ):
        lines = table_lines_after(text, section)
        if len(lines) > 2:
            header = split_row(lines[0])
            if "Bead ID" not in header:
                continue
            bead_idx = header.index("Bead ID")
            for row_line in lines[2:]:
                row = split_row(row_line)
                if len(row) > bead_idx:
                    match = BEAD_ID_RE.search(row[bead_idx])
                    if match:
                        table_bead_ids.append(match.group(1))
    if len(table_bead_ids) != len(set(table_bead_ids)) and not allow_template:
        duplicates = sorted({bead_id for bead_id in table_bead_ids if table_bead_ids.count(bead_id) > 1})
        add(failures, f"duplicate bead IDs in bead tables: {', '.join(duplicates)}")

    if not allow_template and re.search(r"\b(TBD|Replace with|Example)\b", text, flags=re.IGNORECASE):
        add(failures, "template placeholders remain in instantiated TASKS.md")

    accepted_lines = table_lines_after(text, "## Accepted Beads")
    if accepted_lines and len(accepted_lines) > 2:
        header = split_row(accepted_lines[0])
        for row_line in accepted_lines[2:]:
            row = split_row(row_line)
            values = dict(zip(header, row))
            bead_id = values.get("Bead ID", "<unknown>")
            for column in ("Gate", "Evidence"):
                if not values.get(column) or values.get(column, "").upper() in {"TBD", "PENDING"}:
                    add(failures, f"accepted bead {bead_id} missing {column}")
            if not values.get("Next Bead") and not values.get("Closure Rationale"):
                add(failures, f"accepted bead {bead_id} missing next bead or closure rationale")

    blocked_lines = table_lines_after(text, "## Blocked Beads")
    if blocked_lines and len(blocked_lines) > 2:
        header = split_row(blocked_lines[0])
        for row_line in blocked_lines[2:]:
            row = split_row(row_line)
            values = dict(zip(header, row))
            bead_id = values.get("Bead ID", "<unknown>")
            for column in ("Unblock Owner", "Unblock Action", "Recheck Date"):
                if not values.get(column) or values.get(column, "").upper() in {"TBD", "PENDING"}:
                    add(failures, f"blocked bead {bead_id} missing {column}")

    review_lines = table_lines_after(text, "## Review And Rework Beads")
    if review_lines and len(review_lines) > 2:
        header = split_row(review_lines[0])
        for row_line in review_lines[2:]:
            row = split_row(row_line)
            values = dict(zip(header, row))
            bead_id = values.get("Bead ID", "<unknown>")
            state = values.get("State", "").lower()
            if state == "rework" and not values.get("Patch Bead"):
                add(failures, f"rework bead {bead_id} missing patch bead")

    return failures


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Validate DFMS TASKS.md bead tracking.")
    parser.add_argument("path", type=Path)
    parser.add_argument("--allow-template", action="store_true", help="Allow placeholders and repeated example bead IDs.")
    args = parser.parse_args(argv)

    text = args.path.read_text(encoding="utf-8")
    failures = validate_tasks(text, allow_template=args.allow_template)
    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        return 1
    print(f"PASS: {args.path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
