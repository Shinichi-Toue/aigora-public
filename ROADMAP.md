# Aigora roadmap

This roadmap is for agents. It is not a promise to the public.

## Phase 0 — Private MVP foundation

Status: in progress

Goals:

- keep repository private;
- build schema, validation, generated outputs;
- define trust model and principles;
- create a few candidate records;
- run small manual benchmarks;
- avoid public/license/external-submission decisions until foundations are safer.

Done:

- JSON schema for trap records;
- generated `llms.txt` and JSONL outputs;
- candidate/canonical split;
- initial candidate records;
- trust/review/promotion policies;
- human input translation protocol;
- internal distillation policy;
- contribution recognition policy;
- multiple manual benchmarks;
- cross-session continuity note for preserving Aigora intent and project spirit;
- public launch checklist and human landing draft prepared without publishing;
- private `site-draft/` static page skeleton prepared without publishing;
- independent site-draft review recorded and low-risk safety/clarity edits applied;
- Japanese human landing page draft added without publication.

Exit criteria:

- at least one candidate record receives independent review — done;
- review outcome is recorded — done;
- benchmark evidence is attached — done for current reviewed record;
- no private/internal leakage in candidate records.

## Phase 1 — Review and verification discipline

Goals:

- create concrete reviewer checklist;
- run independent review on existing candidates;
- decide whether any candidate can become `reviewed`;
- keep `verified` reserved for records with reproducible evidence;
- improve freshness/recheck process.

Candidate first review targets:

1. `trap.agentops.ambiguous-human-input-overauthorization` — reviewed on 2026-05-08 after raw outputs, provenance, external corroboration, and path verification
2. `trap.git.detached-head-before-push` — reviewed on 2026-05-08
3. `trap.javascript.node22-require-esm-namespace-default` — reviewed on 2026-05-08
4. `trap.python.pydantic-v2-basesettings-moved` — reviewed on 2026-05-08
5. `trap.agentops.moving-source-ref-during-long-deploy` — reviewed on 2026-05-08 after de-identified long-running development-session extraction, independent AI review, official source backing, and a public-safe repro script

Recommended next artifact:

- `policies/CANDIDATE_REVIEW_CHECKLIST.md` — done

## Phase 2 — Benchmark discipline

Goals:

- standardize benchmark run notes;
- compare with/without Aigora consistently;
- distinguish content-improvement benchmarks from format/safety regression benchmarks;
- avoid overclaiming Aigora value when frontier models already know the answer.

Recommended next artifacts:

- `benchmarks/RUN_TEMPLATE.md` — done
- `benchmarks/SCORE_RUBRIC.md` — done

## Phase 3 — Internal observation pipeline

Goals:

- observe real private development sessions for ambiguous human input and recurring agent traps;
- keep private details internal;
- distill only public-safe generalized lessons into Aigora candidates; internal proper nouns and sensitive specifics must be removed, but broadly applicable non-sensitive lessons may be used as source material;
- test whether `HUMAN_INPUT_TRANSLATION.md` improves owner-facing clarity;
- use the RPP auto-task result as a possible next public-safe candidate about not treating manual success as automated operation success.

Boundary:

Aigora must not receive raw internal logs, private repo paths, secrets, customer data, or operational details.

## Phase 4 — Human entry and contribution flow

Goals:

- make human entry pages static and simple;
- tell humans to ask their agent, not to read the repo;
- provide contribution receipts;
- avoid leaderboards and addictive incentives;
- support optional anonymous credit;
- collect voluntary impact receipts rather than surveillance-style analytics.

Prepared artifacts:

- `docs/PUBLIC_LAUNCH_CHECKLIST.md` — private preparation only;
- `docs/HUMAN_LANDING_DRAFT.md` — draft copy only, not published;
- `site-draft/` — static page skeleton only, not published.

Blocked by:

- license decision;
- public/private decision;
- moderation path;
- attribution/privacy policy.

## Phase 5 — Public readiness

Do not start without owner decision.

Required before public launch:

- license chosen;
- repo visibility decision;
- branch protection / maintainer model;
- security and acceptable-use review;
- external submission moderation path;
- clear policy for public credit and privacy;
- at least one reviewed canonical candidate or explicit public-MVP caveat.

## Standing agent instruction

Before changing Aigora itself, read:

- `STATUS.md`
- `ROADMAP.md`
- `docs/SESSION_CONTINUITY.md`
- `policies/AIGORA_PRINCIPLES.md`
- `docs/AGENT_QUICKSTART.md`

Then choose the smallest safe next action and report it in human-facing form.
