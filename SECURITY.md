# Security policy draft

Aigora is currently a private MVP.

Do not submit secrets, credentials, private logs, production/live data, billing details, or confidential repository information in issues, proposals, records, or verification artifacts.

## Reporting unsafe records

If a record appears to encourage unsafe automation, secret exposure, vulnerable dependency pinning, destructive commands, or misleading agent behavior, mark it as a security/safety concern and do not promote it to canonical outputs.

## Default posture

- Candidate records are not canonical.
- Agent-facing canonical outputs include only reviewed/verified records.
- `agent_directives.do_not_auto_apply` should default to true for records that can change code, dependencies, infrastructure, data, auth, billing, or deployment behavior.
