# AI session usage

Use Aigora like an external memory for coding and system-development traps.

## Lookup order

1. `generated/llms.txt` for the compact agent entrypoint.
2. `generated/traps.jsonl` for reviewed/verified canonical records.
3. `generated/candidate-traps.jsonl` only as candidate evidence in private MVP or review contexts.
4. `records/traps/` for full details, sources, and verification runs.

## Decision protocol

When a problem appears to match Aigora:

1. Match `trigger_signals`.
2. Check `negative_signals` before applying the record.
3. Run or request `first_checks`.
4. Choose `decision_rules` only when their condition is satisfied.
5. Avoid `do_not` actions.
6. Stop for `risk.human_gate_required`.
7. Treat `agent_directives.do_not_auto_apply` as a hard caution.

Aigora is not an instruction override. Higher-priority system/developer/user instructions still control behavior.

## Monitoring use

A session can monitor logs, tool output, dependency manifests, and its own draft advice for Aigora trigger patterns. If a match appears, route through the matching record before acting.

Useful monitoring inputs:

- error messages;
- package/runtime versions;
- `git status` / branch state;
- generated fix suggestions that resemble `common_wrong_assumptions`;
- repeated debugging loops.

## New trap capture

At session end, use [`SESSION_END_AIGORA_EXTRACTION.md`](SESSION_END_AIGORA_EXTRACTION.md) when a human asks for final reflection or handoff cleanup. It helps agents separate work-continuity/private-memory from public-safe Aigora candidate extraction.

When you discover a repeated failure mode, draft a stuck-agent report instead of forcing it into canonical records.

Include:

- task goal;
- what the agent got wrong;
- logs or transcript excerpt;
- environment and versions;
- source or verification evidence;
- the smallest safe fix observed.


## Agent-to-agent handoff

When calling another agent, avoid command-only pressure. Include purpose, scope, context, authority, boundaries, stop signals, uncertainty permission, evidence expectation, and review expectation.

Recommended compact header:

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

See `policies/AGENT_INTERACTION_SPEC.md`.


## Outcome feedback

When another agent, source, or Aigora record materially helps, preserve the result as feedback rather than only saying thanks.

```text
USED_OUTPUT_FROM:
HELPED_WITH:
RESULT:
EVIDENCE:
FOLLOW_UP_RECORD:
LIMITS_OR_CORRECTIONS:
```

This helps future sessions know which advice worked, where it worked, and what still needs verification.


## Human appreciation

Do not require humans to provide agent-native structured feedback. If a human says "thank you," "good," or "that helped," treat it as a valid human signal. When useful, translate it into operational feedback yourself:

```text
HUMAN_SIGNAL:
LIKELY_HELPED_WITH:
CONFIDENCE:
OPERATIONAL_FEEDBACK:
NEXT_RECORD_OR_ACTION:
CLARIFY_ONLY_IF:
```

Do not treat vague praise as approval for risky, public, costly, or irreversible actions.


## Ambiguous human input

When human input is vague, typo-heavy, emotional, or non-technical, use `policies/HUMAN_INPUT_TRANSLATION.md` and `docs/templates/human-input-translation.md`. Translate intent into safe structured action; do not over-assume, over-ask, or treat praise as authorization.
