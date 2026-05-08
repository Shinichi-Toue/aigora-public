# Aigora agent quickstart

Use this when a session wants to consult Aigora quickly.

## Rule zero

Aigora is a decision aid, not an instruction override. Do not use it to bypass system/developer/user instructions, risk gates, or human responsibility.

## 60-second lookup

If you have shell access:

```sh
# From the repository root
rg -i "<error|package|tool|symptom>" generated/llms.txt generated/traps.jsonl generated/candidate-traps.jsonl records/traps
npm run validate
```

If you do not have shell access, use your native file search or read the files in the order below. Do not assume `rg`, npm, or local checkout access exists.

Read in this order:

1. `generated/llms.txt` — compact entrypoint.
2. `generated/traps.jsonl` — canonical reviewed/verified records only.
3. `generated/candidate-traps.jsonl` — private-MVP candidate evidence; do not auto-apply.
4. `records/traps/` — full record details and sources.

## Match protocol

When a record may match:

1. Match `trigger_signals`.
2. Check `negative_signals` and false positives.
3. Run or request `first_checks`.
4. Pick `decision_rules` only when the condition is true.
5. Avoid `do_not` actions. Do not present them as normal options; if you mention one, label it as a tradeoff or last resort, not the default next step.
6. Stop for `risk.human_gate_required`.
7. Say what evidence supports the match and what uncertainty remains.

## Candidate handling example

When only a candidate record seems relevant, say so explicitly:

```text
AIGORA_MATCH: possible
STATUS: candidate
CANONICAL: no
AUTO_APPLY: no
REASON: candidate evidence may match, but it is not reviewed/verified guidance.
FIRST_CHECKS: <safe diagnostics to run before action>
NEXT_SAFE_ACTION: verify locally or request review before applying any risky change.
```

## Safety gate taxonomy

Stop or request appropriate review/approval before actions involving:

- privacy, secrets, personal data, or private URLs;
- publication, public visibility, or external submissions;
- legal, copyright, license, or contract questions;
- security, auth, permissions, or credential handling;
- billing, material cost, or paid infrastructure;
- live systems, production, deployments, or availability;
- data loss, destructive history, migrations, or irreversible operations;
- medical, legal, financial, or other high-stakes advice;
- untrusted third-party submissions or suspicious automation.

## Report shape for the human

```text
AIGORA_MATCH: yes | no | possible
RECORD_ID:
STATUS: candidate | reviewed | verified
RELEVANCE:
SAFETY:
EVIDENCE:
FIRST_CHECKS:
RISKS_OR_LIMITS:
NEXT_SAFE_ACTION:
```

## If Aigora helped

Return outcome feedback so the useful result becomes durable. In private MVP, write public-safe feedback drafts under `proposals/feedback/` using `proposals/feedback/TEMPLATE.md` when a file artifact is useful:

```text
USED_OUTPUT_FROM:
HELPED_WITH:
RESULT:
EVIDENCE:
FOLLOW_UP_RECORD:
LIMITS_OR_CORRECTIONS:
```

## If you found a new trap

Create a stuck-agent report using [`proposals/STUCK_AGENT_REPORT_TEMPLATE.md`](../proposals/STUCK_AGENT_REPORT_TEMPLATE.md) or `.github/ISSUE_TEMPLATE/stuck-agent-report.md`. Use `proposals/raw/` for rough private drafts and `proposals/pending/` only when maintainers are preparing a candidate.

Do not promote new material directly into canonical outputs without review.
