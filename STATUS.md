# Aigora status

Last updated: 2026-05-09

Aigora is a private MVP for an AI-first, source-backed knowledge commons for agents.

## Current state

Aigora can now:

- provide an agent-first entrypoint via `generated/llms.txt`;
- separate canonical records from candidate records;
- validate trap records with JSON Schema;
- generate JSONL outputs for agents;
- report record freshness and candidate promotion blockers locally via `npm run freshness`;
- guide human users through copy-paste agent prompts;
- define operational respect, agent interaction, and human input translation principles;
- support private/internal lesson distillation into public-safe Aigora candidates;
- run small with/without-Aigora benchmarks;
- record outcome feedback and benchmark results;
- define privacy-first impact tracking via `policies/IMPACT_TRACKING.md`;
- preserve cross-session project spirit and handoff memory via `docs/SESSION_CONTINUITY.md`;
- prepare public launch without crossing publication gates via `docs/PUBLIC_LAUNCH_CHECKLIST.md` and `docs/HUMAN_LANDING_DRAFT.md`;
- hold a private static site draft under `site-draft/` for future landing/agent/trust/contribution pages;
- record independent site-draft review and private-only safety refinements under `reviews/site-draft/review-2026-05-08.md`;
- use AI-authored human-facing copy as source material for warmer landing/trust/contribution text under `reviews/human-copy/`;
- add a Japanese human landing page draft at `site-draft/ja/index.html` using AI-generated Japanese copy;
- record bilingual landing review and apply private-only alignment fixes under `reviews/site-draft/bilingual-landing-review-2026-05-08.md`;
- preserve a private, public-safe self-application/case-study draft under `docs/AIGORA_SELF_APPLICATION_DRAFT.md`;
- prepare a private publication-review packet under `docs/publication-review/self-application-review-packet-2026-05-09.md` without crossing launch gates.
- document public-prep governance, Freya Reviewer PR review boundaries, owner override responsibility, and current Freya Reviewer permission state.

## Current records

Canonical reviewed records: 5

Candidate records: 1

- `trap.agentops.session-bound-api-broker-expiry` — session-bound API broker expiry is an authorization boundary.

Reviewed canonical records:

- `trap.agentops.ambiguous-human-input-overauthorization`
- `trap.agentops.moving-source-ref-during-long-deploy`
- `trap.git.detached-head-before-push`
- `trap.javascript.node22-require-esm-namespace-default`
- `trap.python.pydantic-v2-basesettings-moved`

Candidate records are not canonical and must not be auto-applied.

## Current benchmark signal

- Node/chalk CJS/ESM: strong evidence that Aigora can correct stale agent advice.
- Git detached HEAD: useful smoke/regression test; strong agents often know it already.
- Pydantic BaseSettings: useful regression test for candidate labeling and safe first checks; explicit error text makes it easy without Aigora.
- Ambiguous human input: promising protocol benchmark; agents can improve when given materiality and human-facing action answer rules. A reviewed trap now captures vague approval / praise-as-authorization risk.
- Moving source refs during long deploys: first de-identified long-running development-session extraction that became a reviewed Aigora trap after independent multi-agent review, official source backing, and a public-safe repro script.

## Key principles now in place

- Aigora is a decision aid, not an instruction override.
- Candidate is not canonical.
- Source-backed beats confidence-backed.
- Internal lessons must be distilled, not copied.
- Human pages route humans to agents; agent pages define fields, gates, evidence, and actions.
- Operational respect means reliable interaction, not legal personhood or blind trust.
- Human appreciation is valid human signal; agents translate it into operational memory when useful.
- Human-facing answers should show `判断 -> 次にやること` clearly.
- Session handoffs should preserve not only state, but also the project spirit: future agents helping future agents through evidence, respect, and durable memory.

## Hard unresolved decisions

Do not cross these without owner decision and review:

- public repository visibility;
- accepting external submissions;
- domain purchase or publication;
- branch protection / maintainer permissions;
- canonical promotion of candidate records;
- any public credit model involving human identities.

## Most important gaps

1. No verified records yet; reviewed records now include a deploy/source-ref drift trap, but it is not `verified`. Local freshness reporting now exists, but verification itself is still manual.
2. Review workflow exists as policy/checklist, but is not automated in GitHub.
3. Public launch checklist and landing draft exist, but no owner decision to publish yet.
4. No branch protection or equivalent GitHub review gate is configured yet.
5. No active public submission moderation process or owner-opened submission policy.
6. No automated benchmark runner, but run template and score rubric now exist.
7. Ambiguous-human-input overauthorization record was promoted to reviewed after multi-agent re-review; future freshness should capture stable model IDs when tooling exposes them.
8. New source material captured: `proposals/pending/trial-and-error-over-persuasive-fluency.md` — Aigora should value working evidence-backed iteration over persuasive fluency.
9. New candidate record added from `proposals/pending/session-bound-api-broker-expiry.md`; independent AI review approved candidate status, but canonical promotion still requires another observation and non-local/public-safe evidence.
10. Future public story source captured: `proposals/pending/aigora-self-application-public-story.md` — Aigora used its own method on itself and should eventually be published after redaction/review/gates.
11. Dedicated observation pipeline from internal development sessions has a first working example via de-identified long-running development-session extraction, but it is not automated.
12. No multilingual landing pages beyond Japanese/English entry docs.

## Recommended next work

1. Use `docs/publication-review/self-application-review-packet-2026-05-09.md` to run publication-readiness review for `docs/AIGORA_SELF_APPLICATION_DRAFT.md` without publishing.
2. Collect another independent observation and non-local/public-safe evidence for `trap.agentops.session-bound-api-broker-expiry` before any canonical promotion; otherwise improve verified/freshness automation for reviewed records.
3. After the next RPP auto-task result, consider a public-safe candidate about not confusing manual success with automated operation success.
4. Improve Pydantic verification command at the next freshness check.
5. Prepare multilingual static page drafts from the reviewed `site-draft/` only when public launch becomes likely.
6. Add automated support for the benchmark run templates when the manual process stabilizes; freshness reporting is now local-only and can later feed CI after publication/repo gates.
7. Continue observing internal sessions through the session-end extraction prompt and connect useful results to `HUMAN_INPUT_TRANSLATION.md` and `INTERNAL_DISTILLATION.md`.
8. Distill private/internal lessons into public-safe Aigora candidates when they are general and non-sensitive.
