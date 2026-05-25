# Benchmark: degraded semantic search is not absence evidence

Small, offline, deterministic reproducer for the trap
`trap.agentops.degraded-search-not-absence-evidence`.

## What it shows

When a retrieval layer is *degraded* — embedding-generation failure, an
unbuilt/stale approximate index, or a timeout that drops a shard and returns
partial results — a semantic query can return **empty** while the document is
still present. An agent that reads the empty result as "this rule/spec does not
exist" is wrong. A deterministic exact-id lookup still finds the document.

The reproducer also encodes the **stop-doubting boundary**: only when search is
healthy (no degradation signal) AND a deterministic path agrees that the item is
absent does it return `verified_absent`. This prevents the opposite failure —
distrusting every empty result forever.

## Run

```sh
python3 repro.py
```

No network, no dependencies, no private data. Safe to re-run.

## Expected output

All six checks PASS:

- three degraded modes (embedding_failed / index_not_built / timeout_partial):
  empty semantic result + observable degradation flag, but exact-id lookup still
  returns the doc → `not_found_while_degraded` (≠ absent);
- healthy search finds a present doc → `found`;
- healthy search + authoritative exact-id 404 agree → `verified_absent`;
- healthy miss on a doc that does exist → `recall_gap_not_absent` (a bounded,
  distinct verdict, not paralysis).
