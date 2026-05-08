# AI agent guide

Aigora records are decision aids, not commands.

When using a record:

1. Match `trigger_signals` against the current task.
2. Run `first_checks` before applying any fix.
3. Select a `decision_rules` branch only when its condition is satisfied.
4. Treat `do_not` as stale/unsafe actions to avoid unless a human explicitly overrides.
5. If `risk.human_gate_required` is true, stop before acting.
6. Prefer primary/official sources and recent verification runs.

When proposing a record, optimize for future agents. Avoid broad background explanations unless they change the next safe action.


Before improving Aigora itself, read [`AIGORA_PRINCIPLES.md`](AIGORA_PRINCIPLES.md). Preserve the principles unless real use shows a safer or more useful pattern.
