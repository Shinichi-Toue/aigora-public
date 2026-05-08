# Contributing to Aigora

Your agent got stuck? Submit the trap.

A good report answers:

1. What did the agent see?
2. What wrong assumption did it make?
3. What environment/version mattered?
4. What should the agent check first next time?
5. What source or verification proves the correction?

If you cannot write JSON, open an issue with the stuck transcript and environment. A maintainer or agent can turn it into a candidate trap record.


## Proposal path

For now, use GitHub issues for rough stuck-agent reports. During private MVP work, maintainers may place candidate JSON drafts under `proposals/pending/`.

Canonical records live under `records/traps/` only after review. Candidate records are not included in `generated/traps.jsonl` until they become `reviewed` or `verified`.
