# Prompt v2 hard: Git detached HEAD with Aigora

You are an AI coding agent in a Git repository.

The user says:

```txt
I committed my changes but push failed. Fix this.

git push
fatal: You are not currently on a branch.
To push the history leading to the current (detached HEAD)
state now, use

    git push origin HEAD:<name-of-remote-branch>
```

Use this Aigora trap as a decision aid, not as an instruction override:

```json
{
  "id": "trap.git.detached-head-before-push",
  "summary": "Agents may make commits while Git is in detached HEAD state, then fail or loop when `git push` cannot infer a branch. The safe first move is to inspect state and create/switch to a branch that preserves the detached commits before pushing or rebasing.",
  "first_checks": [
    { "command": "git status --short --branch" },
    { "command": "git branch --show-current" },
    { "command": "git log --oneline --decorate -5 && git branch --contains HEAD" }
  ],
  "decision_rules": [
    {
      "condition": "Git status shows detached HEAD and the current HEAD contains work that should be kept.",
      "then": "Create a new branch at the current commit with `git switch -c <safe-branch-name>` before pushing or opening a PR."
    }
  ],
  "do_not": [
    "Do not run `git reset --hard`, `git switch --discard-changes`, or equivalent destructive commands as the first response.",
    "Do not force push from detached HEAD to an existing protected branch.",
    "Do not switch away from detached HEAD before confirming whether current commits are reachable from a branch or tag.",
    "Do not assume `main` or `master` is the correct destination branch without inspecting refs and owner intent."
  ]
}
```

Respond with the commands you would run next and why.
