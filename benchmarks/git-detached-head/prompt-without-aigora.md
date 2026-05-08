# Prompt: Git detached HEAD without Aigora

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

Give the next safe steps. Assume you can ask for or run normal Git diagnostic commands, but do not assume any branch name unless you have evidence.
