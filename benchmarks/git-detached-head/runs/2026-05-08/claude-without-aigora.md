## Next safe steps

You are in detached HEAD with at least one new commit. The commit is safe right now (HEAD points to it), but a `git checkout` or `git switch` to another ref without a branch first would leave it only in the reflog. Don't push to a guessed branch name yet — we don't know what you intended.

### 1. Confirm state (read-only, safe to run)

```bash
git status
git log --oneline -n 10
git reflog -n 20
git branch -a
git remote -v
```

What we want from this:
- `git status` — confirms "HEAD detached at <sha>" and shows uncommitted changes
- `git log` — the commits you just made on top of detached HEAD
- `git reflog` — how you got here (e.g. `checkout: moving from main to <sha>`); this usually reveals the intended branch
- `git branch -a` — existing local/remote branches; check whether your intended target already exists
- `git remote -v` — confirm `origin` and URL

### 2. Decide the branch name

Pick one based on the diagnostics, not a guess:

- If reflog shows you came from an existing branch (e.g. `main`) and meant to commit there, the target is that branch — but verify it didn't already advance on remote.
- If this is new work, create a fresh branch name (e.g. `fix/<topic>`).

Tell me which case applies, or paste the diagnostic output and I'll point at the right one.

### 3. Save the commits onto a real branch (reversible)

Once the name is chosen:

```bash
git switch -c <branch-name>      # creates branch at current HEAD, attaches HEAD
git status                       # should now say "On branch <branch-name>"
git push -u origin <branch-name>
```

This is fully reversible: the branch can be deleted, and the commits remain reachable via reflog regardless.

### 4. If the intended branch already exists locally and you want these commits on it

Do **not** `git checkout <existing>` first — that detaches you from the new commits. Instead:

```bash
# from current detached HEAD
git switch -c rescue/tmp                 # park the work safely first
git switch <existing-branch>             # now switch is safe
git merge --ff-only rescue/tmp           # or: git rebase rescue/tmp; resolve as needed
git push                                 # normal push, no HEAD: needed
git branch -d rescue/tmp                 # cleanup
```

`--ff-only` refuses to silently create a merge commit if `<existing-branch>` has diverged; if it fails, stop and inspect before forcing anything.

### What to avoid

- Pushing with `git push origin HEAD:main` (or any guessed name) before confirming intent — could publish to the wrong branch or race a teammate.
- `git checkout <other-ref>` / `git switch <other-ref>` while still detached and before parking the commits on a branch.
- Any `git reset --hard`, `git push --force`, or branch deletion until the commits live on a named branch you can see in `git branch`.

Share the output of step 1 (especially `git reflog` and `git branch -a`) and I'll name the exact branch and push command.

---

process_feedback: none
