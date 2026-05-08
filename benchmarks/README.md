# Aigora benchmarks

Aigora benchmarks are small before/after demonstrations.

They are not model leaderboards. They show whether Aigora changes an agent's next safe action when the agent is stuck.

Each benchmark should include:

- a stuck-agent scenario;
- a prompt without Aigora context;
- the same prompt with relevant Aigora context;
- expected behavior and scoring rubric;
- optional notes from real agent runs.


## Standard benchmark files

- [`RUN_TEMPLATE.md`](RUN_TEMPLATE.md)
- [`SCORE_RUBRIC.md`](SCORE_RUBRIC.md)
