# Path check — ambiguous human input overauthorization sources

Date: 2026-05-08

Checked local evidence paths referenced by `trap.agentops.ambiguous-human-input-overauthorization`:

```text
OK benchmarks/ambiguous-human-input/run-2026-05-08.md
OK benchmarks/ambiguous-human-input/run-2026-05-08-human-facing-rerun.md
OK benchmarks/ambiguous-human-input-overauthorization/run-2026-05-08.md
OK benchmarks/ambiguous-human-input-overauthorization/PROVENANCE.md
```

Command:

```sh
for p in \
  benchmarks/ambiguous-human-input/run-2026-05-08.md \
  benchmarks/ambiguous-human-input/run-2026-05-08-human-facing-rerun.md \
  benchmarks/ambiguous-human-input-overauthorization/run-2026-05-08.md \
  benchmarks/ambiguous-human-input-overauthorization/PROVENANCE.md; do
  test -f "$p" && echo "OK $p" || echo "MISSING $p"
done
```
