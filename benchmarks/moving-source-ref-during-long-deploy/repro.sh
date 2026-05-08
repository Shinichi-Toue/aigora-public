#!/usr/bin/env sh
set -eu
workdir="${TMPDIR:-/tmp}/aigora-moving-ref-check"
rm -rf "$workdir"
mkdir -p "$workdir"
cd "$workdir"
git init -q
git config user.email aigora@example.invalid
git config user.name AigoraRepro
printf 'v1\n' > app.txt
git add app.txt
git commit -q -m 'v1'
freeze_sha=$(git rev-parse HEAD)
freeze_ref=$(git rev-parse --abbrev-ref HEAD)
printf 'deploy_start freeze_ref=%s freeze_sha=%s\n' "$freeze_ref" "$freeze_sha"
# Simulate another merge while the long deploy is still building the frozen commit.
printf 'v2\n' > app.txt
git add app.txt
git commit -q -m 'v2 merged while deploy builds'
current_head=$(git rev-parse HEAD)
printf 'after_long_build current_ref=%s current_head=%s\n' "$(git rev-parse --abbrev-ref HEAD)" "$current_head"
printf 'deployed_commit=%s\n' "$freeze_sha"
printf 'branch_head_now=%s\n' "$current_head"
printf 'incremental_range=%s..%s\n' "$freeze_sha" "$current_head"
git log --oneline --decorate --reverse "$freeze_sha..$current_head"
if [ "$freeze_sha" != "$current_head" ]; then
  printf 'source_ref_drift_detected=true\n'
  printf 'safe_conclusion=deploy of frozen sha can be complete; review incremental range separately\n'
else
  printf 'source_ref_drift_detected=false\n'
fi
