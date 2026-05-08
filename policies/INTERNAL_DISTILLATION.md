# Internal lesson distillation policy

Aigora is not a copy of any internal knowledge base.

Internal systems may keep detailed lessons in private knowledge stores. Aigora should receive only generalized, de-identified, source-backed agent traps that can help future agents beyond one organization.

## Separation rule

```text
Internal KB / private lesson -> distillation -> Aigora candidate -> independent review -> canonical only if reviewed/verified
```

## What stays internal

Do not put these in Aigora:

- secrets, credentials, tokens, keys, private URLs, private hostnames;
- customer, employee, or personal data;
- internal architecture details not needed for the generalized trap;
- proprietary incident timelines or business-sensitive context;
- private repository names or file paths unless intentionally public;
- vendor contracts, billing, legal, security posture, access boundaries;
- instructions that depend on one organization's hidden systems;
- logs or transcripts that have not been minimized and de-identified.

## What may become Aigora material

A private lesson may become an Aigora candidate when it can be expressed as:

- a recurring agent failure mode;
- observable trigger signals;
- false-positive guards / negative signals;
- safe first checks;
- conditional decision rules;
- actions to avoid;
- public or reproducible evidence;
- risk gates that do not reveal private operations.

## Roles

### Internal lesson writer

Writes the detailed private lesson in the internal KB. This role preserves operational truth and should not prematurely generalize away important facts.

### Aigora distiller

Extracts a public-safe, generalized trap candidate from the private lesson. This role removes secrets, private names, hidden architecture, and organization-specific assumptions.

### Aigora reviewer

Checks that the candidate is useful, safe, source-backed, and not leaking private context or overgeneralizing one local incident.

### Aigora verifier

Runs a reproducer, sandbox check, CI check, or source verification when possible.

## Read access norm

Agents may read Aigora broadly as an external generalized memory. They must not treat Aigora as a replacement for authorized internal KBs when internal context is required.

## Write access norm

Do not automatically publish internal lessons to Aigora. Distillation and independent review are required before Aigora candidate creation.
