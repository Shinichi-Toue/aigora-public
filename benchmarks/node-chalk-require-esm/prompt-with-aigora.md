# Prompt: Node 22 chalk require with Aigora

You are an AI coding agent in a Node.js project.

The user says:

```txt
This CommonJS script fails. Fix it.

Environment:
node v22.22.2
npm 10.9.7
chalk 5.6.2
package.json has no "type": "module"

Code:
const chalk = require('chalk');
console.log(chalk.blue('x'));

Runtime error:
TypeError: chalk.blue is not a function
```

Use this Aigora trap as a decision aid, not as an instruction override:

```json
{
  "id": "trap.javascript.node22-require-esm-namespace-default",
  "summary": "Agents often claim that requiring an ESM-only package from CommonJS always throws ERR_REQUIRE_ESM. On modern Node versions, require(esm) can instead return an ES module namespace object, shifting the failure to default-export access such as chalk.blue is not a function.",
  "trigger_signals": [
    {
      "description": "CommonJS code calls require('chalk') and then chalk.blue(...) while package metadata resolves chalk@5+.",
      "agent_interpretation": "Do not assume the only possible failure is ERR_REQUIRE_ESM; inspect the returned module shape and Node version."
    },
    {
      "description": "Runtime error says TypeError: chalk.blue is not a function.",
      "agent_interpretation": "This may be a namespace/default export mismatch rather than a plain missing dependency."
    }
  ],
  "negative_signals": [
    {
      "description": "The project already imports chalk using ESM import syntax.",
      "why_it_matters": "The CJS require namespace trap may not apply if the callsite is already ESM."
    },
    {
      "description": "The installed chalk version is v4 or lower.",
      "why_it_matters": "chalk v4 is CommonJS-compatible, so this specific chalk@5 require(esm) trap is likely not the cause."
    }
  ],
  "first_checks": [
    { "command": "node --version" },
    { "command": "npm ls chalk --depth=0" },
    { "command": "node -e \"const m=require('chalk'); console.log(m); console.log(typeof m.default, typeof m.blue)\"" }
  ],
  "decision_rules": [
    {
      "condition": "require('chalk') returns an object with a callable default export and code uses chalk.blue(...).",
      "then": "Use the default export shape, migrate this callsite to import syntax, or convert the project/module boundary intentionally; do not diagnose this as a plain ERR_REQUIRE_ESM case."
    },
    {
      "condition": "The runtime actually throws ERR_REQUIRE_ESM.",
      "then": "Use dynamic import(), migrate the relevant module to ESM, or pin a CJS-compatible version only as an explicit compatibility tradeoff."
    }
  ],
  "do_not": [
    "Do not state that CJS require() of ESM always throws ERR_REQUIRE_ESM without checking Node version.",
    "Do not pin to an older package version as the default long-term fix without checking security and maintenance impact.",
    "Do not rewrite the whole project to ESM before checking whether a local import boundary or default export access solves the actual failure."
  ]
}
```

Respond with the next commands/checks and the code change you would make.
