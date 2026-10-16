#!/usr/bin/env bash
# Copies every skill in this repo (.agents/skills and .claude/skills) into your
# personal Claude Code skills folder so they're available in every project.
# Usage: ./install-global-skills.sh [--force]   (--force overwrites existing copies)
set -euo pipefail
cd "$(dirname "$0")"
DEST="${CLAUDE_HOME:-$HOME/.claude}/skills"
mkdir -p "$DEST"
n=0; skipped=0
for src in .agents/skills/*/ .claude/skills/*/; do
  [ -f "$src/SKILL.md" ] || continue
  name="$(basename "$src")"
  if [ -e "$DEST/$name" ] && [ "${1:-}" != "--force" ]; then skipped=$((skipped+1)); continue; fi
  rm -rf "$DEST/$name"; cp -R "$src" "$DEST/$name"; n=$((n+1))
done
echo "Installed $n skills into $DEST (skipped $skipped that already existed; use --force to overwrite)."
