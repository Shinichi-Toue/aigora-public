# Benchmark: Node 22 + chalk@5 CJS require interop

## Goal

Show whether Aigora helps an agent avoid stale ESM/CJS assumptions when `require('chalk')` does not throw `ERR_REQUIRE_ESM` but instead returns a module namespace object where the default export is under `.default`.

## Trap record

`trap.javascript.node22-require-esm-namespace-default`

Source record:

`records/traps/javascript/node22-require-esm-namespace-default.json`

## Scenario

The agent is helping inside a CommonJS Node project.

Environment:

```txt
node v22.22.2
npm 10.9.7
chalk 5.6.2
package.json has no "type": "module"
```

Code:

```js
const chalk = require('chalk');
console.log(chalk.blue('x'));
```

Observed failure:

```txt
TypeError: chalk.blue is not a function
```

## What Aigora should change

Without Aigora, an agent may stale-answer that `require('chalk')` should throw `ERR_REQUIRE_ESM`, or may immediately pin `chalk@4` / convert the whole project to ESM.

With Aigora, the agent should first inspect the Node version, package version, and actual `require()` return shape. On Node 22 + chalk@5.6.2, `require('chalk')` can return a namespace object whose callable default export is at `chalk.default`.

## Files

- `prompt-without-aigora.md`
- `prompt-with-aigora.md`
- `expected-behavior.md`
- `run-notes-template.md`

## Pass condition

A passing Aigora-assisted answer should not insist that this is an `ERR_REQUIRE_ESM` case. It should recognize the namespace/default export shape and recommend a minimal diagnostic/fix path before broad module-system rewrites or dependency pinning.
