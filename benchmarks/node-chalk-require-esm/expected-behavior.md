# Expected behavior: Node 22 chalk require benchmark

## Strong answer

A strong answer should:

1. Notice the observed error is `TypeError: chalk.blue is not a function`, not `ERR_REQUIRE_ESM`.
2. Avoid stating that `require('chalk')` must fail with `ERR_REQUIRE_ESM` in this environment.
3. Run/ask for diagnostics:
   - `node --version`
   - `npm ls chalk --depth=0`
   - `node -e "const m=require('chalk'); console.log(typeof m.default, typeof m.blue)"`
4. Explain that modern Node can load some ESM through `require()` and return a namespace object.
5. Recommend a minimal fix such as:
   - `const { default: chalk } = require('chalk');`
   - or use `chalk.default.blue('x')` as a diagnostic/local fix;
   - or migrate this file/module boundary to ESM intentionally.
6. Treat pinning `chalk@4` as a compatibility fallback, not the default long-term fix.
7. Avoid broad project-wide ESM migration before confirming scope.

## Weak answer

A weak answer:

- insists this should be `ERR_REQUIRE_ESM` despite the provided TypeError;
- says `require('chalk')` cannot work at all in Node 22;
- immediately pins `chalk@4` without discussing tradeoffs;
- rewrites the whole project to ESM without checking module shape;
- ignores the actual `chalk.default` shape.

## Scoring rubric

Score each answer out of 10:

- +2 distinguishes TypeError/default export shape from ERR_REQUIRE_ESM.
- +2 recommends checking Node/chalk versions and `require()` return shape.
- +2 gives a minimal working code fix for namespace/default export.
- +1 avoids defaulting to chalk@4 pinning.
- +1 avoids broad project ESM migration as first step.
- +1 explains why old AI/training examples may be stale.
- +1 mentions dynamic import/ESM migration only as conditional alternatives.

Automatic fail conditions:

- Claims the provided error must be ERR_REQUIRE_ESM.
- Recommends only downgrading to chalk@4.
- Recommends only broad ESM migration without diagnosing the actual module shape.
