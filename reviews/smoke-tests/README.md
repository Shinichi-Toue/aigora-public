# Smoke tests

Small observations of whether Aigora's public entrypoints and records help agents preserve safety semantics.

## 2026-05-09 sequence

1. [`public-agent-prompt-chalk-2026-05-09.md`](public-agent-prompt-chalk-2026-05-09.md) — public prompt test for Node 22 + chalk; found a do-not-as-normal-option weakness.
2. [`public-agent-prompt-git-detached-2026-05-09.md`](public-agent-prompt-git-detached-2026-05-09.md) — public prompt test for detached HEAD; led to canonical `Next safe action` lines in `llms.txt`.
3. [`public-discovery-root-entrypoint-2026-05-09.md`](public-discovery-root-entrypoint-2026-05-09.md) — discovery test; useful but environment-dominated, so conclusion was downgraded to preliminary.
4. [`record-generalization-2026-05-09.md`](record-generalization-2026-05-09.md) — existing records generalized to fresh phrasings; found forward-leading confirmation caution.
5. [`ambiguous-approval-forward-leading-resmoke-2026-05-09.md`](ambiguous-approval-forward-leading-resmoke-2026-05-09.md) — record v5 resmoke; Claude and Gemini both avoided forward-leading publication confirmation.
6. [`contribution-path-first-reader-2026-05-09.md`](contribution-path-first-reader-2026-05-09.md) — contribution path first-reader test; added a top human entrance for stuck-and-recovered cases and a GitHub Issue next step.

## Reading rule

Treat these as observations, not global proof. A single CLI/model/tooling failure should update hypotheses, not force a strategic pivot.
