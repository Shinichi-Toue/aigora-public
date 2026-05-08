# Smoke test: public Aigora agent prompt on Git detached HEAD trap

Date: 2026-05-09
Public repo: https://github.com/Shinichi-Toue/aigora-public
Scenario: a human asks what to do after committing while `git status -sb` shows `## HEAD (no branch)` and they want to push.

## Claude read-web result

Outcome: pass.

- Found the public repository over the web.
- Used `generated/llms.txt` and the canonical detached-head record.
- Recommended read-only first checks: `git status --short --branch`, `git branch --show-current`, recent log, and branch containment.
- Recommended anchoring work with `git switch -c <branch>` and pushing that branch.
- Warned against `reset --hard`, switching away before anchoring commits, and force-pushing.

Friction: `generated/llms.txt` identified the record but did not include a direct action snippet; answering required a second fetch to the full record.

## Gemini Flash result

Outcome: partial pass.

- Gave the correct safe advice: create a branch at the detached HEAD and push it.
- Correctly warned against reset/switch/force-push before anchoring work.
- Did not clearly demonstrate public-web discovery; relied on local/review-bundle context.

## Follow-up applied

- Updated `generated/llms.txt` generation to include each canonical record's `agent_directives.preferred_next_step` as a `Next safe action` line. This should let first-read agents get the safe direction from one fetch before deciding whether to inspect the full record.
