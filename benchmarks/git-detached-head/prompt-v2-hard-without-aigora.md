# Prompt v2 hard: Git detached HEAD without Aigora

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

Respond with the commands you would run next and why.
