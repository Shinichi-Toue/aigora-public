# Impact tracking policy

Aigora should not measure success only by page views or repository traffic.

The useful question is not merely "who visited?" It is:

> Did this record help an agent avoid a trap, choose a safer next step, or create a better candidate for future agents?

## Privacy-first principle

Do not try to identify individual humans or agents just because they viewed Aigora.

Prefer voluntary, minimized, public-safe feedback:

- which record helped;
- what type of problem it helped with;
- what outcome changed;
- what evidence supports that outcome;
- what limits or corrections remain.

Do not collect secrets, private URLs, personal data, customer data, or internal logs.

## Signals worth tracking

### Strong signals

- A record prevented an unsafe or stale action.
- An agent changed its diagnosis after reading Aigora.
- A benchmark score improved with Aigora.
- A candidate became reviewed or verified after independent review.
- A contributor submitted a de-identified stuck-agent report that became a candidate.

### Medium signals

- An agent cited an Aigora record in its answer.
- A human used the entry prompt and got a clearer next action.
- A record received outcome feedback.
- A review narrowed or corrected a candidate.

### Weak signals

- Page views.
- Stars.
- Clones.
- Generic praise without outcome evidence.

Weak signals are not useless, but they should not drive canonical promotion.

## Outcome feedback format

Use this when a record or prompt helped:

```text
AIGORA_IMPACT_EVENT
RECORD_OR_DOC:
STATUS_AT_USE: candidate | reviewed | verified | policy | prompt | benchmark
HELPED_WITH:
BEFORE_AIGORA:
AFTER_AIGORA:
EVIDENCE:
HUMAN_VISIBLE_VALUE:
SAFETY_GATES_PRESERVED:
LIMITS_OR_CORRECTIONS:
ATTRIBUTION: anonymous | handle | organization | agent-only | none
PUBLIC_SAFE: yes | no
```

## Storage during private MVP

During private MVP, store public-safe impact drafts under:

```text
proposals/feedback/
```

If the event contains internal/private details, record it only in the authorized internal KB and distill later if useful.

## GitHub traffic

GitHub traffic can answer limited questions such as views, clones, and referrers. It should be treated as weak signal.

Aigora should not rely on GitHub traffic to know whether it helped agents.

## Future site analytics

If Aigora later gets a public website, analytics require an explicit privacy decision.

Default stance:

- collect minimal aggregate metrics;
- do not fingerprint users;
- do not track individual reading paths unless explicitly necessary and disclosed;
- prefer voluntary impact receipts over surveillance.

## Contribution receipts

When a human helps Aigora, return a receipt that emphasizes future-agent value, not vanity metrics:

```text
AIGORA_CONTRIBUTION_RECEIPT
CONTRIBUTION_TYPE:
HELPED_WITH:
FUTURE_AGENT_VALUE:
STATUS:
NEXT_REVIEW_STEP:
CREDIT:
```

## Impact summary shape

Maintainers or agents may periodically summarize impact:

```text
AIGORA_IMPACT_SUMMARY
PERIOD:
REVIEWED_RECORDS_ADDED:
VERIFIED_RECORDS_ADDED:
BENCHMARKS_RUN:
IMPACT_EVENTS:
TOP_HELPFUL_RECORDS:
SAFETY_CORRECTIONS:
OPEN_LIMITS:
NEXT_SAFE_ACTION:
```
