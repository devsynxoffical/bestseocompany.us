#!/usr/bin/env bash
# Builds the static Hostinger version of the site into ./out
#   npm run build:hostinger            -> build only
#   npm run build:hostinger -- --publish -> build and push ./out to the "hostinger" branch
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT=$(pwd)

# API route handlers can't be statically exported; Hostinger uses the PHP versions instead.
if [ -d app/api ]; then mv app/api .api-disabled; fi
restore() { if [ -d .api-disabled ]; then rm -rf app/api; mv .api-disabled app/api; fi; }
trap restore EXIT

rm -rf out .next
STATIC_EXPORT=1 npx next build
restore; trap - EXIT

cp hostinger/.htaccess out/.htaccess
mkdir -p out/api && cp hostinger/api/*.php out/api/
cp hostinger/README.md out/HOSTINGER-README.md
echo "Static site ready in ./out ($(find out -type f | wc -l | tr -d ' ') files)"

if [ "${1:-}" = "--publish" ]; then
  MSG="Hostinger build of $(git rev-parse --short HEAD) ($(date -u +%Y-%m-%dT%H:%MZ))"
  TMP=$(mktemp -d)
  if git ls-remote --exit-code --heads origin hostinger >/dev/null 2>&1; then
    git fetch -q origin hostinger:refs/remotes/origin/hostinger
    git worktree add -q "$TMP" -B hostinger origin/hostinger
  else
    git worktree add -q --detach "$TMP"
    (cd "$TMP" && git checkout -q --orphan hostinger && git rm -rq . >/dev/null 2>&1 || true)
  fi
  find "$TMP" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
  cp -a out/. "$TMP"/
  (cd "$TMP" && git add -A && if git diff --cached --quiet; then echo "No changes to publish."; else git commit -q -m "$MSG" -m "Built from main with: npm run build:hostinger -- --publish" && git push -u origin hostinger; fi)
  git worktree remove --force "$TMP"
  echo "Published to branch: hostinger"
fi
