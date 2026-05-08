# Public repository readiness note

Status: private preflight note, not a launch approval.
Date: 2026-05-09

## Owner direction captured

The owner indicated that publishing should be treated as the start, not the finish: early silence is expected; the important work is to keep adding useful, agent-readable information over time and make it possible for someone to notice, use it, and eventually contribute.

## Current publication posture

Aigora is close to a minimal public repository launch, but two material gates remain before an AI should mutate GitHub visibility:

1. **License / rights posture** — resolved: content under CC BY-SA 4.0; code under MIT.
2. **Visibility mutation** — making the GitHub repository public is an external publication/access-boundary change and should happen only after the final preflight scan is accepted.

## Recommended minimal launch shape

- Public GitHub repository only.
- No domain purchase.
- No public website deployment.
- No Search Console or crawler registration.
- External submissions are allowed only as ordinary GitHub issues/PRs under the existing templates and review policy; no automated external writes.
- Candidate records remain visibly non-canonical.
- `generated/traps.jsonl` remains reviewed/verified only.
- `generated/candidate-traps.jsonl` may exist but is explicitly non-canonical.

## Preflight performed in this session

- Ran schema validation and generation after sanitization.
- Replaced local `/root`-style artifact references in records with repository-relative `artifact:` references.
- Replaced private/internal project/session names in public-facing status, records, and continuity docs with generic descriptions.
- Prepared self-application draft and publication-review packet.
- Verified the self-application draft and review packet do not contain the checked internal orchestration terms.

## Remaining scan notes

The remaining grep hits are either generic security language, public tool/provider names in benchmark provenance, or generic bearer/session wording in a candidate trap. Before final publication, run one last repository-wide scan and inspect any remaining matches manually.

## Suggested final owner gate wording

> Publish the GitHub repository as public with content under CC BY-SA 4.0 and code under MIT, no domain/site launch, no paid services, and no automated external writes. External issues/PRs may exist but require review before merge.
