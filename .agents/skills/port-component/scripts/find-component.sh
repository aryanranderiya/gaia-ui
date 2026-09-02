#!/usr/bin/env bash
# Locate component files in the gaia mono repo on a given ref, without checking it out.
# Searches frontend code only (apps/web); backend and infra are excluded on purpose.
# Usage: ./find-component.sh <component-name> [ref]
#   component-name: e.g. "weather-card", "composer", "WeatherCard"
#   ref: git ref to search (default: origin/master)
set -euo pipefail

GAIA_REPO="${GAIA_REPO:-$HOME/work/gaia}"
NAME="${1:?Usage: find-component.sh <component-name> [ref]}"
REF="${2:-origin/master}"

# Frontend-only search scope. Never widen this to apps/api, infra, tools,
# scripts, or packages/cli.
SCOPE=(apps/web/src)

if [ ! -d "$GAIA_REPO/.git" ]; then
  echo "error: gaia repo not found at $GAIA_REPO (set GAIA_REPO to override)" >&2
  exit 1
fi

cd "$GAIA_REPO"
git fetch origin --quiet || echo "warn: fetch failed, searching local refs" >&2

# Build name variants: kebab-case, PascalCase, snake_case
kebab=$(echo "$NAME" | sed -E 's/([a-z0-9])([A-Z])/\1-\2/g' | tr '[:upper:]' '[:lower:]' | tr '_ ' '--')
pascal=$(echo "$kebab" | sed -E 's/(^|-)([a-z])/\U\2/g')
snake=$(echo "$kebab" | tr '-' '_')

echo "== Searching ref: $REF (repo: $GAIA_REPO, scope: ${SCOPE[*]})"
echo "== Name variants: $kebab, $pascal, $snake"
echo
echo "-- Matching files:"
git ls-tree -r --name-only "$REF" -- "${SCOPE[@]}" \
  | grep -iE "(^|/)(${kebab}|${pascal}|${snake})[^/]*\.(tsx|ts|css)$" \
  | grep -vE "\.(test|spec|stories)\." || echo "   (no direct file-name matches)"

echo
echo "-- Files exporting/defining '${pascal}':"
git grep -lE "(function|const|class) ${pascal}\b" "$REF" -- "${SCOPE[@]}" 2>/dev/null \
  | sed "s/^${REF//\//\\/}://" | grep -vE "\.(test|spec|stories)\." | head -20 || echo "   (none found)"

echo
echo "== Read a file with:  git -C $GAIA_REPO show '$REF:<path>'"
