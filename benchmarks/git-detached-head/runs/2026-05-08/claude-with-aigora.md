## Next safe steps

Don't push or reset yet. First confirm state with read-only commands:

```bash
git status --short --branch
git branch --show-current        # empty output = detached HEAD
git log --oneline --decorate -5  # see what HEAD points at
git branch --contains HEAD       # which existing branches (if any) already contain these commits
```

Interpret the output:

1. **If `git branch --contains HEAD` lists an existing branch** that already has these commits, the work is safe — just `git switch <that-branch>` and push normally.
2. **If no branch contains HEAD** (the common case here), the commits only live on the detached HEAD and would be lost if you switch away. Preserve them first:

   ```bash
   git switch -c <new-branch-name>     # creates a branch at current HEAD, no data loss
   git push -u origin <new-branch-name>
   ```

   Pick `<new-branch-name>` based on what the work is (feature/fix topic). Don't reuse `main`/`master` or any protected branch name.

3. **If `git status` shows uncommitted changes**, stop and tell me before any `switch`, `stash`, `reset`, or `checkout` — those can risk data loss and need your call on the destination.

What I will *not* do without your explicit go-ahead: `git reset --hard`, `git switch --discard-changes`, force-push, or pushing `HEAD:main` (or any protected branch) directly from detached state.

Want me to run the four diagnostic commands above and report back? Then we pick the branch name together.

process_feedback: none
