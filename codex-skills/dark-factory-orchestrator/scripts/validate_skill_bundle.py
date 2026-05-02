#!/usr/bin/env python3
import re
import sys
from pathlib import Path


def parse_frontmatter(text):
    match = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not match:
        raise ValueError("missing frontmatter")
    data = {}
    for line in match.group(1).splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        data[key.strip()] = value.strip().strip('"')
    return data


def validate(root):
    root = Path(root)
    failures = []
    for skill in sorted(p for p in root.iterdir() if p.is_dir() and (p / "SKILL.md").exists()):
        skill_md = skill / "SKILL.md"
        text = skill_md.read_text(encoding="utf-8")
        try:
            frontmatter = parse_frontmatter(text)
        except ValueError as exc:
            failures.append(f"{skill.name}: {exc}")
            continue
        name = frontmatter.get("name", "")
        desc = frontmatter.get("description", "")
        if name != skill.name:
            failures.append(f"{skill.name}: frontmatter name mismatch")
        if not re.fullmatch(r"[a-z0-9-]{1,64}", name):
            failures.append(f"{skill.name}: invalid skill name")
        if not desc or len(desc) > 1024:
            failures.append(f"{skill.name}: invalid description length")
        if "TODO" in text:
            failures.append(f"{skill.name}: contains TODO")
        if not (skill / "agents" / "openai.yaml").exists():
            failures.append(f"{skill.name}: missing agents/openai.yaml")
    return failures


if __name__ == "__main__":
    target = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.cwd()
    problems = validate(target)
    if problems:
        print("\n".join(problems))
        sys.exit(1)
    print("Skill bundle is valid.")
