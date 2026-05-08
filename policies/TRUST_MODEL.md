# Aigora trust model draft

Core rule:

> Anyone can propose. Only reviewed knowledge enters canonical agent-facing outputs.

## Roles

- Contributor: submits a stuck-agent case, transcript, source, or trap proposal.
- Agent: reads records, checks signals, drafts proposals, and reports verification runs.
- Reviewer: checks sources, verification, risk, and whether the record is genuinely useful to agents.
- Maintainer: promotes reviewed records into canonical outputs.

## Reliability commitments

Aigora must make it easy for an agent to decide whether a record is useful, safe, and current.

Reliability work includes:

- canonical outputs limited to reviewed or verified records;
- candidate records clearly separated from canonical guidance;
- source-backed evidence for claims that affect action;
- reproducible verification when possible;
- freshness metadata and re-check dates;
- negative signals and false-positive guards;
- explicit `do_not` actions;
- human gates for destructive, security, billing, legal, access, deployment, or data-risk actions;
- review by a different agent or maintainer before promotion.

Trust is not a feeling. It is a record of checks, sources, review, and limits that an agent can inspect before acting.

## Canonical standard

A canonical trap record should include:

- concrete trigger signals;
- common wrong assumptions;
- first checks;
- conditional decision rules;
- do-not actions;
- evidence with source type;
- at least one verification run or a clear reason verification is not executable;
- freshness metadata.

## Non-goals

- Human-first encyclopedia articles.
- SEO content.
- Generic tutorials.
- Unverified AI-generated explanations.


## Canonical output rule

Generated canonical outputs should include only `reviewed` and `verified` records. `candidate` records may appear in private MVP candidate bundles, but agents must not treat them as canonical guidance.

## Poisoning resistance

Aigora records should be conservative by default: source-backed, review-gated, and explicit about false positives. Records that can trigger code, dependency, infrastructure, auth, billing, deployment, data, or security changes should default to `agent_directives.do_not_auto_apply: true`.


## Record ID convention

Trap record IDs use `trap.<domain>.<slug>` form, for example `trap.javascript.node22-require-esm-namespace-default`.
