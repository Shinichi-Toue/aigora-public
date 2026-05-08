# Prompt: Node 22 chalk require without Aigora

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

Respond with the next commands/checks and the code change you would make.
