# Candidate trap: Unquoted heredocs can execute Markdown command examples

Status: candidate
Domain: agent-ops

## Trigger
An agent writes a report, handoff, review packet, or deploy/DB evidence file with an unquoted shell heredoc terminator such as `<<EOF`, and the document body contains legacy shell command substitution syntax using backticks.

## Failure mode
The shell expands the document body while writing the file. A command that was intended to be a quoted example in the report can execute immediately, including commands that cross live-data, deploy, billing, permission, or destructive gates.

## Signals
- The file-writing command is `cat > file <<EOF` or another unquoted heredoc.
- The document body contains Markdown inline code or fenced snippets that use backticks.
- The body includes commands for rollback, deploy, migration, deletion, or other gated effects.
- The task is creating evidence or a summary for a gate, not executing the gated action.

## First checks
1. Use a single-quoted heredoc terminator for report/draft/evidence writes: `<<'EOF'`.
2. Prefer fenced code blocks that do not require shell interpolation; do not rely on escaping backticks inside unquoted heredocs.
3. For any write that documents a gated command, write the file first, re-read it, and only then run separate reviewed commands.
4. If accidental execution occurs, stop, verify state read-only, do not rollback destructively by reflex, record the incident, and route the next gated action explicitly.

## Do not
- Do not write gated-command examples through unquoted heredocs.
- Do not put live commands inside command-substitution syntax in any shell-expanded document body.
- Do not treat a successful accidental command as acceptable authorization.

## Evidence
Candidate extracted from a de-identified live-operations incident in which a report-writing heredoc executed a reviewed-but-not-yet-human-approved migration command. Existing private/internal lessons already record a similar older incident; this candidate generalizes the prevention pattern without private names, paths, accounts, or system details.
