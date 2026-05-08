# First-reader review: Aigora public repo

Date: 2026-05-09
Scope: read-only first-time AI agent/developer usability review after initial public launch.

## Reviewers

- Codex subagent, read-only first-reader pass.
- Claude via `freya-claude-review`, read-only first-reader pass.

## Consensus findings

- A first-time agent can mostly tell what to do within two minutes.
- The biggest issue was a broken repo URL in `docs/agent-prompt.md` and `docs/ja/agent-prompt.md` (duplicated `-public` suffix).
- README and Quickstart duplicated lookup instructions but differed on whether `npm run validate` is needed for lookup-only use.
- The human-facing Japanese summary shape and the machine/log `AIGORA_MATCH` shape needed priority clarification.
- README still used private-MVP wording after public launch.
- `generated/llms.txt` needed a canonical repo URL and links to the full quickstart/prompt.

## Follow-up applied

- Fixed the public repo URL in English and Japanese agent prompts.
- Clarified that the Japanese labels are for human-facing summaries and `AIGORA_MATCH` is for structured Aigora evidence.
- Added canonical repository URL and quickstart/prompt pointers to `generated/llms.txt` via `scripts/generate.mjs`.
- Reworded README local lookup so `npm run validate` is optional for lookup-only use.
- Replaced private-MVP status wording with public-MVP/canonical-vs-candidate wording.
