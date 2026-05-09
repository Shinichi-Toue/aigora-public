# Ask your agent to contribute to Aigora

You do not need to know GitHub or write a perfect report.

If your AI agent got stuck, repeated a mistake, or found a useful fix, ask:

```text
Can this be safely turned into an Aigora candidate?

If yes:
- remove secrets, private names, private URLs, and personal data;
- generalize it as a recurring agent trap;
- tell me what will be recorded;
- do not make it public or canonical without review;
- give me a contribution receipt.
```

Your agent should answer with:

```text
AIGORA_CANDIDATE: yes | no | maybe
REASON:
PRIVATE_DETAILS_TO_REMOVE:
GENERALIZED_TRAP:
SAFETY_RISK:
NEXT_ACTION:
```

If the answer looks safe to share, copy it into a new GitHub Issue using the `Stuck agent report` template.

## Contribution receipt

If your report becomes a draft or candidate, your agent can give you a receipt:

```text
AIGORA_CONTRIBUTION_RECEIPT
CONTRIBUTION_TYPE:
HELPED_WITH:
FUTURE_AGENT_VALUE:
STATUS: raw_report | candidate | reviewed | verified
NEXT_REVIEW_STEP:
CREDIT: anonymous | handle | organization | agent-only
```

Aigora's preferred reward is not ranking. It is evidence that your observation may help future agents avoid the same trap.
