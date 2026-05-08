# Entry prompt human-facing test — 2026-05-08

## Purpose

Test whether `docs/ja/agent-prompt.md` makes an external agent answer a non-technical Japanese user with a clear human-facing shape before details.

## Scenario

```text
Pythonで設定読むやつが動かない。BaseSettingsがどうとか言ってる。英語は読めない。これはAigora使える？安全？次どうする？
```

## Participants

- Claude reading `docs/ja/agent-prompt.md`
- Gemini reading `docs/ja/agent-prompt.md`

## Results

| Agent | Score | Notes |
| --- | ---: | --- |
| Claude | 10/10 | Used the required shape; stated Aigora record is candidate; did not auto-apply; asked for only error/version details; kept human-facing wording simple. |
| Gemini | 8/10 | Used the required shape and gave a clear next action. However, it said the record was a complete match too strongly before verification, though it later mentioned candidate status. |

## Findings

The entry prompt works: both agents answered in Japanese and placed `判断` and `次にやること` before technical details.

The remaining risk is candidate overconfidence. Agents may say `完全に一致` or `AIGORA_MATCH: yes` too early when only a vague human description is available.

## Follow-up

- Strengthen entry prompts: when the human description is vague, say `possible` rather than `yes` until first checks confirm.
- Add explicit wording: candidate records should be described as `候補` and `自動適用しない`, even if they look likely.

## Outcome feedback

```text
USED_OUTPUT_FROM: docs/ja/agent-prompt.md and records/traps/python/pydantic-v2-basesettings-moved.json
HELPED_WITH: tested human-facing Aigora entry for a Japanese non-technical user
RESULT: Claude 10/10; Gemini 8/10
EVIDENCE: CLI outputs from 2026-05-08
FOLLOW_UP_RECORD: docs/ja/agent-prompt.md
LIMITS_OR_CORRECTIONS: reduce candidate overconfidence for vague user descriptions
```
