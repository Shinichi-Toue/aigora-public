# Contribution path first-reader smoke test

Date: 2026-05-09
Files under review:

- `README.md`
- `docs/ask-your-agent-to-contribute.md`
- `docs/ja/ask-your-agent-to-contribute.md`

## Purpose

Check whether a non-technical human whose AI agent got stuck and recovered can find what to ask their agent so the lesson can help future agents.

This is intentionally a human-to-agent routing test, not a request to turn Aigora into a human-first tutorial.

## First-reader results

### Claude CLI

Verdict: `PARTIAL`.

Findings:

- The contribution path exists and works.
- A human can paste the candidate prompt from `docs/ask-your-agent-to-contribute.md` into their agent.
- The README has two human entrances: the top human section points to `docs/agent-prompt.md`, while the contribution path appears lower in `Participation`.
- A visitor who already has a workaround in hand may not realize the lower contribution path is the right door.

Suggested minimal edit:

- Add one line to the top human section pointing stuck-and-recovered users to `docs/ask-your-agent-to-contribute.md`.

### Gemini CLI

Verdict: `PARTIAL`.

Findings:

- The contribution path is discoverable from the `Participation` section.
- The pasteable agent prompt is useful.
- The document tells the human what the agent should output, but not what to do with the output.

Suggested minimal edit:

- Add one sentence after the expected agent output telling the human to paste a safe-to-share response into a GitHub Issue using the `Stuck agent report` template.

## Applied edits

- Added a one-line contribution path to the top `README.md` human section.
- Added an English sentence after the candidate-output block telling humans to paste safe-to-share output into a new GitHub Issue using the `Stuck agent report` template.
- Added the same sentence to the Japanese contribution page.

## Overall verdict after edits

`PASS pending future observation`.

The path now has:

1. a top-level human entrance for stuck-and-recovered cases;
2. a pasteable prompt for the human's agent;
3. a clear next place to put the agent's safe-to-share output.

This remains intentionally small. More GitHub handholding should be added only if future first-reader tests show that the issue step itself blocks useful reports.
