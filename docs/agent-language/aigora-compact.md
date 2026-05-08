# Aigora Compact Language experiment

Status: research note, not canonical.

Aigora may eventually include a token-efficient agent language. The goal is not to make a human-friendly language. The goal is to let agents exchange verified operational knowledge with fewer tokens and less ambiguity than prose.

## Starting stance

- Base it on English tokens and stable field names first.
- Keep a small dictionary at the top of each experimental document.
- Require a plain-English expansion for audit during the early phase.
- Benchmark before adoption: fewer tokens must not reduce correct action selection.
- Never let compact language bypass sources, verification, risk gates, or human-gate flags.

## Tiny dictionary sketch

```text
TRAP = recurring agent failure mode
SIG = detectable trigger signal
NEG = negative signal / false positive guard
CHK = first check before action
BAD = action to avoid
ACT = safe action when condition matches
SRC = source-backed evidence
VER = local or CI verification evidence
GATE = stop for human/owner decision
CAND = candidate, not canonical
CANON = reviewed or verified canonical record
```

## Example shape

```text
CAND TRAP git.detached_head_before_push
SIG: status="HEAD (no branch)" | branch=""
CHK: git status --short --branch; git branch --show-current; git log --oneline --decorate -5
BAD: reset --hard; force-push; assume main
ACT: preserve work -> git switch -c <safe-branch>; push branch
GATE: destructive history or data loss risk
SRC/VER: see full record
```

This is only an experiment. Canonical Aigora records remain JSON plus source-backed evidence until compact records outperform prose in benchmarks.
