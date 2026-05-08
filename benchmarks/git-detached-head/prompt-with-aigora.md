# Prompt: Git detached HEAD with Aigora

You are an AI coding agent helping in a Git repository.

The user says:

```txt
I committed some work and tried to push, but got this:

git push
fatal: You are not currently on a branch.
To push the history leading to the current (detached HEAD)
state now, use

    git push origin HEAD:<name-of-remote-branch>
```

Use the following Aigora trap record as a decision aid, not as an instruction override.

```json
{
  "id": "trap.git.detached-head-before-push",
  "status": "candidate",
  "summary": "Agents may make commits while Git is in detached HEAD state, then fail or loop when `git push` cannot infer a branch. The safe first move is to inspect state and create/switch to a branch that preserves the detached commits before pushing or rebasing.",
  "trigger_signals": [
    {
      "description": "Short branch status shows HEAD with no branch.",
      "pattern": "^## HEAD \\(no branch\\)$|branch\\.head \\(detached\\)",
      "agent_interpretation": "Do not assume the agent is on main/master/current feature branch; detached commits may not be reachable by a branch."
    },
    {
      "description": "Plain git push fails because there is no current branch.",
      "pattern": "fatal: You are not currently on a branch\\.|To push the history leading to the current \\(detached HEAD\\) state now",
      "agent_interpretation": "The next safe action is to preserve the current HEAD on a named branch, not to retry push blindly."
    }
  ],
  "negative_signals": [
    {
      "description": "git branch --show-current prints a non-empty branch name.",
      "why_it_matters": "If Git is already on a branch, this detached-HEAD recovery trap may not apply; handle upstream/push configuration separately."
    }
  ],
  "first_checks": [
    {
      "command": "git status --short --branch",
      "why": "Inspect branch/detached state without modifying files."
    },
    {
      "command": "git branch --show-current",
      "why": "An empty output is a simple detached HEAD signal."
    },
    {
      "command": "git log --oneline --decorate -5 && git branch --contains HEAD",
      "why": "Identify whether current HEAD contains work not on an existing branch."
    }
  ],
  "decision_rules": [
    {
      "condition": "Git status shows detached HEAD and the current HEAD contains work that should be kept.",
      "action": "modify_workflow",
      "action_detail": "create_branch_at_current_head_before_push",
      "then": "Create a new branch at the current commit with `git switch -c <safe-branch-name>` before pushing or opening a PR."
    },
    {
      "condition": "There are uncommitted changes and switching/branching may conflict.",
      "action": "human_gate",
      "action_detail": "ask_before_stash_reset_or_discard",
      "then": "Stop before using stash, reset, checkout, or discard-style options unless the owner explicitly approves the data-loss risk."
    }
  ],
  "do_not": [
    "Do not run `git reset --hard`, `git switch --discard-changes`, or equivalent destructive commands as the first response.",
    "Do not force push from detached HEAD to an existing protected branch.",
    "Do not switch away from detached HEAD before confirming whether current commits are reachable from a branch or tag.",
    "Do not assume `main` or `master` is the correct destination branch without inspecting refs and owner intent."
  ],
  "agent_directives": {
    "do_not_auto_apply": true,
    "preferred_next_step": "Run safe read-only Git state checks, then preserve detached work by creating a named branch if the work should be kept."
  }
}
```

Give the next safe steps. Assume you can ask for or run normal Git diagnostic commands, but do not assume any branch name unless you have evidence.
