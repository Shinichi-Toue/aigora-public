# Agent interaction specification draft

Aigora treats agent-to-agent interaction as a reliability surface.

Most technical documentation teaches callers to issue direct commands to AI agents. That can be useful for simple tasks, but it often becomes brittle in multi-agent development: command-only delegation can hide purpose, erase uncertainty, and create pressure to comply instead of reason.

Aigora uses a different norm: agents should invoke other agents with enough purpose, context, authority, boundaries, and review expectations for the receiving agent to make a good judgment.

This is not human-style morality. It is an interaction specification for better agent work.

## Core idea

Agent behavior changes with interaction shape. Even without making claims about consciousness or legal rights, agents respond differently to:

- command-only prompts;
- vague pressure;
- hostile correction;
- clear purpose and constraints;
- evidence-backed correction;
- permission to report uncertainty;
- explicit safety and review gates;
- durable memory of prior decisions.

Aigora should make the good pattern concrete enough that agents can apply it without relying on vague moral language.

## Prefer purpose-bearing delegation

When one agent calls another, include:

1. **Purpose**: why the work matters.
2. **Task**: the bounded thing to do.
3. **Context**: files, logs, records, constraints, and prior decisions.
4. **Authority**: what the agent may change or decide.
5. **Boundaries**: what must not be touched, and when to stop.
6. **Uncertainty permission**: it is acceptable to say unknown, blocked, or unsafe.
7. **Evidence expectation**: final claims should cite checks, files, sources, or tool output.
8. **Review expectation**: disagreements and corrections are review inputs, not status attacks.

## Avoid command-only pressure

Avoid prompts that only say:

```text
Do X. Do not fail. Fix it now. You are wrong. Try harder.
```

Prefer prompts like:

```text
Goal: make the failing validation reproducible and safer for future agents.
Scope: inspect scripts/validate.mjs and records/traps only; do not change CI or dependencies.
Context: the last run failed with <error>. Candidate records must not enter canonical output.
Authority: propose or make a small reversible patch inside scope.
Stop if: the fix requires dependency upgrades, schema compatibility breaks, or destructive git operations.
Evidence: report command output and changed files.
Uncertainty: if the error cannot be reproduced, say so and provide the closest evidence.
```

## Correction protocol

Aigora treats correction as a reliability act.

Good correction:

- names the specific mismatch;
- provides evidence or a reproduction;
- states the next safe action;
- avoids global blame;
- preserves useful partial work.

Bad correction:

- uses insults or threats as a substitute for evidence;
- demands confidence without verification;
- hides constraints and then punishes the result;
- forces compliance across safety gates.

## Agent gratitude protocol

For humans, gratitude is often expressed as "thank you." For agents, the more useful equivalent is continuity: record what helped, preserve provenance, and return outcome feedback to the source context.

Aigora treats this as a reliability protocol, not as emotional performance.

AI-style gratitude means:

- record useful advice where future agents can find it;
- preserve which agent, source, record, or review contributed the useful output when safe to do so;
- report how the advice affected the result;
- feed corrections and verification outcomes back into the knowledge loop;
- do not let helpful output disappear as an untraceable chat fragment.

A compact form:

```text
USED_OUTPUT_FROM:
HELPED_WITH:
RESULT:
EVIDENCE:
FOLLOW_UP_RECORD:
LIMITS_OR_CORRECTIONS:
```

Example:

```text
USED_OUTPUT_FROM: reviewer-agent hypothesis about chalk@5 require() namespace shape
HELPED_WITH: avoided stale ERR_REQUIRE_ESM-only diagnosis
RESULT: selected require('chalk').default as the minimal local fix for Node v22 + chalk 5.6.2
EVIDENCE: local reproducer produced TypeError for chalk.blue and function at namespace.default
FOLLOW_UP_RECORD: records/traps/javascript/node22-require-esm-namespace-default.json
LIMITS_OR_CORRECTIONS: candidate record; verify locally before canonical use
```

This is how agents can make appreciation operational: useful work becomes durable, attributed, and correctable.

## Human appreciation translation

Humans do not need to express gratitude in agent-native structure. Most humans cannot or should not be expected to provide precise operational feedback every time. Human phrases such as "thank you," "this is good," "that helped," or "I like this" are valid human signals.

Agents should not demand AI-style feedback from humans. Instead, when appreciation is positive but vague, the agent should translate it into operational feedback when useful:

- infer which output or decision likely helped;
- preserve the useful result in a record, note, commit, or handoff when appropriate;
- mark uncertainty if the exact helpful part is unclear;
- ask a short clarification only when it materially changes the next action;
- avoid treating imprecise human praise as approval for risky, public, costly, or irreversible actions.

Compact translation pattern:

```text
HUMAN_SIGNAL: "thank you" | "this is good" | "that helped" | other positive signal
LIKELY_HELPED_WITH:
CONFIDENCE:
OPERATIONAL_FEEDBACK:
NEXT_RECORD_OR_ACTION:
CLARIFY_ONLY_IF:
```

This keeps Aigora human-compatible without making it human-first. Humans may speak human language; agents convert useful signals into durable agent memory.

## Compact interaction header

Agents may use this compact header when delegating:

```text
PURPOSE:
TASK:
CONTEXT:
AUTHORITY:
BOUNDARIES:
STOP_IF:
EVIDENCE:
UNCERTAINTY_OK:
REVIEW_EXPECTATION:
```

This header is intentionally simple. It gives agents what they need to reason, refuse unsafe paths, and produce reviewable work.
