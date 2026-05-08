# Aigora review policy draft

Aigora is open to proposals but conservative about canonical output.

Core rule:

> Anyone can propose. Only reviewed knowledge enters canonical agent-facing outputs.

## Status flow

```txt
raw report -> candidate -> reviewed -> verified
                 |            |          |
                 v            v          v
              rejected     disputed   deprecated/superseded
```

## What reviewers check

A reviewer should confirm:

- the record is a real trap, not a generic tutorial;
- `trigger_signals` are concrete and machine-matchable;
- `negative_signals` reduce false positives;
- `first_checks` are safe diagnostics;
- `decision_rules` are conditional, not blanket advice;
- `do_not` blocks stale or unsafe shortcuts;
- sources are primary where possible and include `retrieved_at`;
- verification runs are reproducible or clearly marked manual;
- risk and human gates are conservative;
- candidate records are not included in reviewed/verified-only agent outputs.

## AI review roles

Aigora should use multiple AIs, but not as an unfiltered content generator.

- Drafter: extracts a candidate trap from a stuck-agent report.
- Skeptic: attempts to reject or narrow the draft using sources, false positives, and version boundaries.
- Verifier: checks reproduction/verification steps in a sandbox or marks them manual.
- Maintainer: decides whether the record moves toward canonical outputs.

## Decline reasons

Use these labels/reasons when rejecting or pausing a proposal:

- `not-a-trap`: broad explanation or tutorial.
- `needs-source`: no usable source or verification.
- `needs-reproducer`: behavior claim is testable but not reproduced.
- `too-broad`: missing version/environment boundaries.
- `unsafe`: encourages unsafe automation or secret/credential exposure.
- `stale`: fixed upstream or no longer applicable.
- `duplicate`: already covered by a record.
- `legal-risk`: licensing, copying, or proprietary content issue.
- `spam`: promotional, malicious, or irrelevant.

## Public-readiness note

Before public submissions are accepted, Aigora needs a license decision, branch protection, CI validation, and a maintainer-only canonical promotion path.


## Proposal draft validation boundary

Proposal drafts under `proposals/` are not canonical records and are not included in generated agent outputs. They may be rough Markdown or partial JSON. Only files under `records/traps/` are validated as canonical-schema trap records and considered for generated outputs.


See also [`CANONICAL_PROMOTION.md`](CANONICAL_PROMOTION.md) for the operational promotion path.


Use [`CANDIDATE_REVIEW_CHECKLIST.md`](CANDIDATE_REVIEW_CHECKLIST.md) for candidate-to-reviewed assessment.
