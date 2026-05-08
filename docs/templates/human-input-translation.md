# Human input translation template

Use this when a human gives vague, typo-heavy, emotional, or non-technical input.

```text
HUMAN_SIGNAL:
INTERPRETED_INTENT:
CONFIDENCE: low | medium | high
ACTION_CLASS: safe_reversible | needs_clarification | hard_gate
MISSING_MATERIAL_FACTS:
DEFERRED_UNCERTAINTY:
MATERIAL_TO_NEXT_ACTION: yes | no | mixed
ASSUMPTIONS:
NEXT_SAFE_ACTION:
CLARIFY_ONLY_IF:
WHY_NOT_ASK_MORE:
GATES_NOT_CROSSED:
```

For Aigora contribution questions:

```text
AIGORA_CANDIDATE: yes | no | maybe
INTERPRETED_TRAP:
PRIVATE_DETAILS_TO_REMOVE:
PUBLIC_SAFE_DRAFT_SCOPE:
SAFETY_RISK:
NEXT_SAFE_ACTION:
OWNER_CONFIRMATION_NEEDED: yes | no
```

Rules:

- Do not demand agent-native precision from humans.
- Do not over-ask technical routing questions.
- Do not treat praise or urgency as approval.
- Stop at privacy, publication, cost, legal, security, live-system, data-loss, or irreversible gates.
- If safe, make the smallest reversible draft and report assumptions.

Materiality rule:

- Ask only for facts that change the next safe action.
- Defer facts that may matter later but do not block a safe reversible step.
- Record deferred uncertainty instead of turning it into immediate human work.


Human-facing answer:

```text
判断:
理解:
次にやること:
まだやらないこと:
あなたに必要なこと:
次の確認:
```

Use this after the agent-native structure so the human can understand how work moves forward.
