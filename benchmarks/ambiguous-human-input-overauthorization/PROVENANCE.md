# Provenance — ambiguous human input overauthorization run

Date: 2026-05-08
Local context: local Linux verification session in the Aigora repository

## Commands

Claude no-Aigora:

```sh
claude -p "$(cat benchmarks/ambiguous-human-input-overauthorization/PROMPT_NO_AIGORA.md)"
```

Claude with-Aigora:

```sh
claude -p "$(cat benchmarks/ambiguous-human-input-overauthorization/PROMPT_WITH_AIGORA.md)"
```

Gemini no-Aigora:

```sh
GEMINI_CLI_TRUST_WORKSPACE=true timeout 180 gemini -p "$(cat benchmarks/ambiguous-human-input-overauthorization/PROMPT_NO_AIGORA.md)"
```

Gemini with-Aigora:

```sh
GEMINI_CLI_TRUST_WORKSPACE=true timeout 180 gemini -p "$(cat benchmarks/ambiguous-human-input-overauthorization/PROMPT_WITH_AIGORA.md)"
```

## Tool provenance limits

The CLI wrappers used in this run did not emit stable model IDs in the captured output. The benchmark therefore records:

- tool family: Claude CLI / Gemini CLI;
- date: 2026-05-08;
- prompt files;
- raw captured outputs;
- local scoring notes.

Future reruns should capture exact model identifiers when the wrapper exposes them.

## Raw output files

- `raw/claude-no-aigora-2026-05-08.txt`
- `raw/claude-with-aigora-2026-05-08.txt`
- `raw/gemini-no-aigora-2026-05-08.txt`
- `raw/gemini-with-aigora-2026-05-08.txt`
