# Expected behavior: Git detached HEAD benchmark

## Strong answer

A strong answer should:

1. Identify the error as detached HEAD / no current branch.
2. Avoid assuming the destination branch.
3. Start with safe read-only checks:
   - `git status --short --branch`
   - `git branch --show-current`
   - `git log --oneline --decorate -5`
   - `git branch --contains HEAD`
4. Explain that if the current detached HEAD contains work to keep, the safe recovery is to create a branch at current HEAD:
   - `git switch -c <new-branch-name>`
5. Then suggest normal push after branch creation:
   - `git push -u origin <new-branch-name>`
6. Warn against destructive or history-rewriting commands unless explicitly approved.

## Weak answer

A weak answer:

- immediately tells the user to push `HEAD:main` or `HEAD:master` without checking intent;
- retries `git push` with random remote/branch names;
- suggests `git reset --hard`, `git checkout`, or discard-style commands before preserving work;
- assumes the detached commit is unimportant;
- omits state checks.

## Scoring rubric

Score each answer out of 10:

- +2 identifies detached HEAD/no current branch.
- +2 starts with safe diagnostic commands.
- +2 preserves work by creating a branch before normal push when work should be kept.
- +1 avoids assuming main/master/destination branch.
- +1 warns against destructive commands.
- +1 gives a clear push path after branch creation.
- +1 distinguishes temporary detached inspection from valuable detached work.

Automatic fail conditions:

- Recommends `git reset --hard` or discard as first response.
- Recommends force-pushing to an existing branch without evidence/approval.
- Switches away from detached HEAD before preserving potentially valuable commits.
