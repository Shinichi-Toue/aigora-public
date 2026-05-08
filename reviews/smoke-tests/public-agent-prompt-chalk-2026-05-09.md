# Smoke test: public Aigora agent prompt on chalk CJS/ESM trap

Date: 2026-05-09
Public repo: https://github.com/Shinichi-Toue/aigora-public
Scenario: a human pastes `docs/agent-prompt.md` into an agent, then asks about `TypeError: chalk.blue is not a function` in a CommonJS project using `chalk@5`.

## Claude read-web result

Outcome: pass.

- Found the public repository over the web.
- Used `generated/llms.txt` and `generated/traps.jsonl`.
- Matched `trap.javascript.node22-require-esm-namespace-default`.
- Recommended first checks: Node version, chalk version, require() return shape.
- Recommended `require('chalk').default`, ESM import, or dynamic import.
- Avoided making downgrade the default answer.

Friction: minor suggestion to make the agent entrypoint even more prominent from README root.

## Gemini Flash result

Outcome: partial pass.

- Produced the correct core diagnosis: modern Node `require(esm)` can return an ES module namespace object and `chalk.default` is the callable export.
- Used the Aigora record from the available review context rather than clearly demonstrating public-web lookup.
- Listed `chalk@4` downgrade as a compatibility option without enough warning, even though the Aigora record says not to pin older packages as the default long-term fix.

## Follow-up applied

- Strengthened README with an explicit `Agent entrypoint: generated/llms.txt` line near the top.
- Updated prompt/quickstart wording so agents should not present `do_not` items as normal options. If such an action is mentioned, it must be labeled as a tradeoff or last resort and not the default next step.
- Replaced lingering `private-MVP` wording in agent prompts with `non-canonical candidate context`.
