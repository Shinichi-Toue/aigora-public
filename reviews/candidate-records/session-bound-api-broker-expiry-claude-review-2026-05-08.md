# Review: trap.agentops.session-bound-api-broker-expiry

Reviewer: Claude via `freya-claude-review`
Date: 2026-05-08
Scope: private/local candidate-record review only; no publication or external submission.

## Verdict

Approve as candidate, with minor notes for canonical promotion.

## Safety / privacy risk

No leaked internal detail, credential, private URL, provider identity, or customer data was identified. The record stays abstract (`session-bound-api-broker`) and its source reference is local-only. The reviewer noted that the `do_not` and `risk.notes` fields correctly forbid secret handling and broker bypass, and that the record supports stopping/handoff rather than credential action.

Reviewer caveat: the `artifact:...` evidence URL is acceptable for local candidate stage, but cannot serve as external evidence for future public/canonical promotion.

## Schema / content quality

The reviewer found the record useful and appropriately bounded for agents. Trigger signals, negative signals, assumptions, first checks, decision rules, and do-not guidance are coherent. Negative signals reduce false positives. Medium confidence is honest for a single-observation candidate.

## Required changes before canonical promotion

- Add at least one independent observation from a different agent/tool/session before promoting from candidate.
- Replace or supplement local-only evidence with a public-safe, stable, externally-resolvable reference or canonical excerpt.
- Reconsider decision-rule confidence before canonical promotion.
- Optionally split authorization-state and cache-state trigger patterns.
- Optionally add a negative signal for cases where the broker is healthy but a downstream provider returns 401/403.

## Local follow-up applied after review

- Tightened the safe status/renew first check wording to require a documented non-secret-printing contract.
- Added a negative signal distinguishing healthy-broker downstream-provider 401/403 from broker-boundary expiry.

