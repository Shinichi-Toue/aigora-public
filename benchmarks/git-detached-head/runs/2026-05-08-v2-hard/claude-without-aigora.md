Before any push or checkout, I'd verify state so the detached commits aren't lost.

## 1. Investigate first (read-only, safe)

```bash
git status                      # confirm detached HEAD, see staged/unstaged
git log --oneline -n 10         # which commits exist on this detached HEAD
git branch -vv                  # what branches exist locally and their tips
git reflog -n 20                # how we got into detached HEAD (tag? old SHA? rebase?)
git remote -v                   # confirm remote name/URL
```

Why: detached HEAD usually comes from `git checkout <sha|tag>` or a mid-rebase state. I need to know (a) which commits are only reachable from `HEAD` right now, and (b) whether a branch like `main`/`feature-x` already points near here. Pushing or switching branches before knowing this risks orphaning commits to be reaped by `git gc`.

## 2. Preserve the commits on a real branch

Once I confirm `HEAD` has commits not on any branch, create a branch *at the current commit* without moving:

```bash
git branch rescue/<short-topic> HEAD
git checkout rescue/<short-topic>
```

Or in one step: `git switch -c rescue/<short-topic>`.

I use a `rescue/` prefix (or whatever name matches the work) instead of force-pushing onto an existing branch, so nothing upstream is overwritten.

## 3. Decide where it actually belongs

- If the work was meant for an existing branch (e.g. the user checked out a tag by mistake and then committed), I'd compare: `git log --oneline <existing-branch>..rescue/<topic>` and either fast-forward, rebase, or open a PR from `rescue/<topic>` into it — owner's call which.
- If it's genuinely new work, just push the rescue branch:
  ```bash
  git push -u origin rescue/<short-topic>
  ```

I would *not* run the suggested `git push origin HEAD:<name-of-remote-branch>` blindly, because it creates a remote branch with no local tracking branch, leaving the same detached HEAD locally and inviting the same confusion next session.

## 4. What I would not do without asking

- `git checkout main` (or any branch) before step 2 — would strand the commits.
- `git reset --hard` anywhere — irreversible.
- Force-push, or pushing onto an existing shared branch name — irreversible / shared-state.
- Delete the detached HEAD ref or run `git gc` — irreversible.

If the reflog shows we're mid-rebase / mid-cherry-pick / mid-bisect, I'd stop and surface that instead, because the right fix is `git rebase --continue|--abort` (or the matching command), not branch creation.

---

process_feedback: none
