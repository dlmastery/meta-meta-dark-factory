#!/usr/bin/env python3
import re
import sys
from collections import defaultdict
from pathlib import Path


ID_PATTERN = re.compile(r"^\|\s*([A-Z]+-\d{3,})\s*\|")


def main(path):
    seen = defaultdict(list)
    for line_no, line in enumerate(Path(path).read_text(encoding="utf-8").splitlines(), start=1):
        match = ID_PATTERN.match(line)
        if match:
            seen[match.group(1)].append(line_no)

    duplicates = {key: lines for key, lines in seen.items() if len(lines) > 1}
    if duplicates:
        for key, lines in sorted(duplicates.items()):
            print(f"duplicate artifact id {key}: lines {', '.join(map(str, lines))}")
        return 1
    print("Artifact catalog IDs are unique.")
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: validate_artifact_catalog_ids.py artifact-catalog.md")
    raise SystemExit(main(sys.argv[1]))
