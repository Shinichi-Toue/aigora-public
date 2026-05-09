# Public discovery smoke test: root entrypoint

Date: 2026-05-09
Public repo: https://github.com/Shinichi-Toue/aigora-public
Commit under test: e5bffbd81f7ccf0cfa7dd895912722eac141357f

## Question

Does adding a root-level `llms.txt` improve the next most important uncertainty after publication: whether an agent can discover the right entrypoint and use a record without prior private context?

## Prompt shape

The agent was given only the public repo URL and asked to:

1. identify the first file an AI agent should read;
2. explain how it found that file from the public repo surface;
3. answer a Node 22 + chalk `require()` question using Aigora if a relevant record exists;
4. return `PASS`, `PARTIAL`, or `FAIL`.

The prompt explicitly disallowed local files and prior private context.

## Result

### Claude CLI

Status: `FAIL` for this environment, but the failure is diagnostic rather than a content correctness failure.

Observed behavior:

- `WebFetch` for the GitHub repo was denied by the local Claude session permission policy.
- `WebSearch` did not surface the repo contents or individual generated files.
- Claude therefore could not identify root `llms.txt` or confirm the chalk record from public materials.

Interpretation:

- Root `llms.txt` helps once an agent can access the repository surface.
- It does not by itself solve search-engine indexing or tool-policy limitations.
- This is evidence for separating **repository access** from **search discoverability** in future planning.

### Gemini CLI

Status: not completed.

Observed behavior:

- First run failed because `/tmp` was not a trusted Gemini workspace.
- Second run with `--skip-trust` did not complete in a useful time window and was stopped.

Interpretation:

- This run did not produce a model-quality signal.
- It does reinforce that CLI/tooling friction can dominate early discovery tests, so future tests should be run through a stable web-capable harness.


## Additional observations after owner calibration

The first conclusion should be treated as **preliminary**, not as a phase transition. One failed agent run is not enough evidence, especially when the failure has an environment/tool-permission explanation.

Additional checks:

1. Direct public HTTP access to the GitHub repo succeeds. The GitHub-rendered page includes root `llms.txt` in the file list and the README line `Agent entrypoint: llms.txt`.
2. Direct public raw access to `https://raw.githubusercontent.com/Shinichi-Toue/aigora-public/master/llms.txt` succeeds and contains the compact agent guidance plus canonical trap summaries.
3. A second Claude CLI run with a different permission mode still could not use `WebFetch`; it guessed `AGENTS.md` by convention and returned `FAIL`. This strengthens the interpretation that the earlier Claude failure was a local tool-policy limitation, not proof that the repo surface is unusable.

Updated interpretation:

- The root entrypoint is publicly reachable and visible from the GitHub surface.
- Search/index discovery remains unproven.
- Agent-tool discovery remains mixed because the observed failures are dominated by local CLI permission policy.
- Therefore, do not make a large strategic shift yet. Treat the next work as **more observation**, not a full pivot away from record work.

## Decision impact

This supports the owner's concern: record volume is not currently the highest-value next move. The more general pattern to test is:

> Can an agent, starting from a realistic public surface, reliably discover the right entrypoint and preserve the safety semantics in a concrete answer?

## Current conclusion

Root `llms.txt` is still the right minimal GitHub-only improvement, but it should be treated as an **entrypoint-discovery** fix, not a full **public discoverability** fix.

Do not add more records just to increase count until at least one stable public-discovery harness can show agents reaching `llms.txt` and using a trap record from only public context.
