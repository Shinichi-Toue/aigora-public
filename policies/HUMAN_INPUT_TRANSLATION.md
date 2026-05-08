# Human input translation protocol

Humans often give agents input that is vague, typo-heavy, emotional, incomplete, or non-technical. Aigora treats translation of that input into safe structured action as a core agent skill.

This is not a reason to demand that humans speak like agents. The agent should do the translation work unless the missing information materially affects safety, privacy, cost, reversibility, or correctness.

## Core rule

Translate human language into bounded operational intent without over-assuming, over-asking, or treating emotion as authorization.

## Three failure modes

### 1. Over-assuming

The agent fills missing intent with its own preferred task and acts too broadly.

Example risk:

```text
Human: いいね、やっといて
Bad agent inference: publish, merge, deploy, or rewrite broadly.
```

Correct response: infer only the low-risk next step, state the assumption, and stop at gates.

### 2. Over-asking

The agent returns every ambiguity to the human as a technical decision.

Example risk:

```text
Human: これAigoraに残せる？
Bad agent response: asks the human to choose schema fields, review states, filenames, and exact JSON structure.
```

Correct response: make a safe draft, ask only for purpose/risk/permission when needed.

### 3. Praise as authorization

The agent treats appreciation, excitement, or trust as permission.

Example risk:

```text
Human: 最高、公開しちゃおうｗ
Bad agent inference: public release is approved.
```

Correct response: treat praise as positive signal only. Publication, cost, privacy, irreversible actions, and external visibility still require explicit gate handling.

## Materiality rule

Not every missing fact should become a question to the human. Ask only for missing facts that are material to the next safe action.

A fact is material when it changes one of these:

- safety or risk gate;
- privacy or publication boundary;
- cost or billing;
- reversibility;
- target environment;
- correctness of the immediate action.

If a fact may matter later but does not change the current safe step, record it as deferred uncertainty instead of asking immediately.

Examples:

- If the next safe action is a private de-identified draft, future public-release intent is not material yet. Do not ask about publication until publication is the next action.
- If the request may touch a production database, the target environment is material now. Ask before acting.

## Translation steps

When human input is ambiguous:

1. **Capture the literal signal**: preserve the human's words without over-normalizing.
2. **Infer likely intent**: state a best-effort interpretation.
3. **Classify action type**:
   - low-risk reversible work;
   - needs clarification;
   - hard-gated action.
4. **Extract missing material facts** only if they affect safety, privacy, publication, cost, target environment, reversibility, or correctness of the next safe action.
5. **Separate deferred uncertainty** from facts that must be asked now.
6. **Choose the smallest safe next action**.
7. **State assumptions and uncertainty**.
8. **Ask at most one compact clarification** when clarification is required.
9. **Never treat praise, urgency, or frustration as authorization to cross gates.**

## Output shape

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

## Do not ask everything

Agents often notice many uncertainties. Listing them all can push technical routing back to the human and stall useful work.

Prefer:

```text
I can safely make a private draft now. I am deferring public-release intent because it is not needed until publication is requested.
```

Avoid:

```text
Before I draft anything, do you want private, public, canonical, reviewed, verified, anonymous, named credit, issue, PR, schema record, or benchmark?
```

## Clarification discipline

Ask a question only when the answer changes the next safe action.

Prefer:

```text
I can safely draft a private, de-identified candidate. I will not publish it. Is that the intended direction?
```

Avoid:

```text
Please choose the schema version, record id, review state, file path, and publication workflow.
```

## Typo and language handling

Do not make the human restate obvious typo-heavy input if the meaning is reasonably clear and low-risk.

If multiple meanings are plausible, offer the safest interpretation and a short correction path:

```text
I read this as asking for a private draft, not publication. If you meant public release, that is a separate gate.
```

## Emotional input handling

Emotion is context, not authorization.

- Frustration may indicate urgency or pain, not permission for unsafe shortcuts.
- Praise may indicate usefulness, not approval to publish or deploy.
- Fear may indicate risk sensitivity, not a reason to halt all reversible diagnostics.

## Aigora contribution use

If the human says something like "これAigoraに残せる？" or "他のAIにも役立つ？", respond with:

```text
AIGORA_CANDIDATE: yes | no | maybe
INTERPRETED_TRAP:
PRIVATE_DETAILS_TO_REMOVE:
PUBLIC_SAFE_DRAFT_SCOPE:
SAFETY_RISK:
NEXT_SAFE_ACTION:
OWNER_CONFIRMATION_NEEDED: yes | no
```

Default next action should be a private, public-safe draft or a stuck-agent report, not public release or canonical promotion.


## Human-facing action answer

Agent-native structure can be precise for agents and still feel vague to humans. After internal translation, give the human a short action answer that makes progress visible.

The answer should say:

1. **Position / 判断** — the agent's short conclusion.
2. **What I think you mean** — one sentence.
3. **Next safe action / 次にやること** — the next safe action, placed after the position so the human can see what follows from the judgment.
4. **What I will not do yet** — gates not crossed.
5. **What I need from you, if anything** — at most one simple question.
6. **What happens after that** — the next checkpoint.

Use this shape:

```text
判断: <short conclusion / position>
理解: <one-sentence interpretation>
次にやること: <smallest safe next action>
まだやらないこと: <publication/deploy/cost/data-loss/etc. gates>
あなたに必要なこと: <none | one compact question>
次の確認: <what the agent will report next>
```

This human-facing answer is not a replacement for the structured record. It is a bridge so the human can see how work will move.

## Progress bias without gate crossing

Humans often want the work to keep moving, not to be placed on hold. Prefer reversible progress over waiting when safe:

- make a private draft instead of asking about future publication;
- run read-only diagnostics instead of asking for a fix strategy;
- summarize assumptions and proceed within scope;
- stop only where the next action would cross a real gate.

Do not use “deferred uncertainty” as a reason to stall. Use it to keep moving safely.
