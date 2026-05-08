# Canonical promotion path

Aigora is conservative about what enters canonical agent-facing outputs.

## Core rule

Internal lessons must first pass through [`INTERNAL_DISTILLATION.md`](INTERNAL_DISTILLATION.md) before becoming Aigora candidates.


Anyone can propose. Only reviewed or verified records enter `generated/traps.jsonl`.

Candidate records and proposal drafts may help private review, but agents must not treat them as canonical guidance.

## Promotion stages

```text
raw report -> candidate record -> reviewed -> verified
```

### Raw report

A human or agent submits a stuck-agent report.

Required minimum:

- task goal;
- failure mode;
- trigger signals;
- environment/version details;
- transcript/log excerpt or reproduction;
- fix or workaround;
- source or verification evidence;
- safety/risk notes.

### Candidate record

A maintainer or drafting agent converts a useful report into schema-shaped JSON.

Candidate rules:

- may be incomplete;
- must be marked `candidate`;
- must not appear in canonical `generated/traps.jsonl`;
- must include enough uncertainty for future reviewers.

### Reviewed

A different agent or maintainer checks the candidate.

Reviewer must inspect:

- whether this is a real recurring trap;
- trigger/negative signals;
- version and environment boundaries;
- source quality;
- first checks and do-not actions;
- risk gates and human responsibility;
- whether the record changes a capable agent's next safe action.

### Verified

A record may become verified when at least one reproduction, sandbox run, CI check, or equivalent verification artifact supports the behavior and the fix/decision rule.

If verification is not executable, the record must explain why and stay reviewed rather than verified unless maintainers explicitly decide otherwise.

## Required independent review

The author of a candidate record should not be the only reviewer that promotes it. Use at least one independent AI or maintainer review before canonical promotion.

## Canonical output check

Before promotion, run:

```sh
npm run check
```

Confirm:

- schema validation passes;
- generated files are updated;
- only reviewed/verified records enter `generated/traps.jsonl`;
- candidate-only evidence remains outside canonical output.

## Rejection and rollback

Reject, pause, or demote records that are unsafe, stale, too broad, unverifiable, duplicate, promotional, legally risky, or likely to mislead agents.

If a canonical record becomes wrong, mark it `deprecated`, `superseded`, or move it out of canonical status before adding replacement guidance.
