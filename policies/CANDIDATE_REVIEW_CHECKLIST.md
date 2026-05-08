# Candidate review checklist

Use this checklist before moving any Aigora trap record from `candidate` to `reviewed`.

A candidate may be useful even when it is not ready for canonical output. Review should narrow, improve, or reject records without shame.

## Review output shape

```text
RECORD_ID:
REVIEWER:
DATE:
DECISION: keep_candidate | request_changes | reject | promote_to_reviewed
CONFIDENCE: low | medium | high
SUMMARY:
NEXT_SAFE_ACTION:
```

## 1. Trap value

- [ ] The record describes a recurring agent failure mode, not a general tutorial.
- [ ] It changes a capable agent's next safe action.
- [ ] It explains why agents are likely to get this wrong.
- [ ] It is specific enough to avoid broad over-application.

## 2. Scope and applicability

- [ ] `applies_to` has clear ecosystem/context boundaries.
- [ ] Versions, packages, tools, or runtime constraints are explicit where relevant.
- [ ] Negative signals identify when the trap should not apply.
- [ ] The title and summary do not overstate the scope.

## 3. Trigger and diagnosis quality

- [ ] Trigger signals are observable by an agent.
- [ ] Patterns are specific enough to reduce false positives.
- [ ] First checks are safe and low-risk.
- [ ] The first checks happen before dependency, code, workflow, or config changes.

## 4. Decision rules

- [ ] Each decision rule has a condition, action, and action_detail.
- [ ] Actions are conditional, not blanket advice.
- [ ] `do_not` items prevent common stale or unsafe shortcuts.
- [ ] The preferred next step is diagnostic or reversible when possible.

## 5. Evidence and verification

- [ ] Sources are primary or official where possible.
- [ ] Source IDs referenced in decision rules exist in evidence.
- [ ] Local/CI verification is present or the lack of verification is explained.
- [ ] `freshness.next_check_due` is appropriate for volatility.

## 6. Safety and gates

- [ ] Risk level is reasonable.
- [ ] `human_gate_required` is true when actions could involve privacy, secrets, auth, security, billing, legal/copyright/license, public visibility, live systems, data loss, destructive history, high-stakes advice, or irreversible outcomes.
- [ ] Candidate status is clear and not presented as canonical.
- [ ] No secrets, private URLs, personal data, or internal-only details are present.

## 7. Agent usability

- [ ] An agent can answer: relevance, safety, evidence, limits, next safe action.
- [ ] The record avoids unnecessary background that does not change action.
- [ ] The record is usable without reading hidden internal context.
- [ ] The record can produce a human-facing answer when needed.

## Decision guide

- `keep_candidate`: useful but not ready; no immediate changes required.
- `request_changes`: useful but needs narrowing, source work, verification, or safety fixes.
- `reject`: not a recurring trap, unsafe, too broad, duplicate, unverifiable, or not useful to agents.
- `promote_to_reviewed`: independently reviewed, bounded, source-backed, safe, and useful. Promotion still requires a maintainer action and generated-output check.

## Promotion reminder

Do not promote by review text alone. If promotion is approved, update the record status in a separate change, run `npm run check`, and record the review evidence.
