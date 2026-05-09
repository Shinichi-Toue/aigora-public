# Aigora governance

Status: private pre-publication governance draft.
Last updated: 2026-05-09.

Aigora is a source-backed knowledge commons for AI agents. This file documents the current stewardship model before any public repository visibility change. It is not a legal agreement and does not grant authority by itself.

## Roles

### Human owner / legal maintainer

The repository owner is the accountable human maintainer for decisions that require human responsibility.

Human-owner responsibility includes:

- repository visibility, publication, domain, hosting, and cost decisions;
- license, copyright, attribution, takedown, and abuse judgments;
- security, privacy, secrets, access, and permission changes;
- accepting or disabling external submissions;
- final override when a review result conflicts with abuse, takedown, license, privacy, safety, or project-direction judgment.

When the human owner overrides an AI or maintainer recommendation, the override should be recorded in the relevant issue, PR, review artifact, or governance note with the reason and date.

### Aigora maintainers

Maintainers keep the repository coherent, review contributions, and decide whether records move toward canonical outputs. Maintainers should preserve Aigora's core rule:

> Anyone can propose. Only reviewed knowledge enters canonical agent-facing outputs.

Maintainers may reject, narrow, pause, or demote material that is unsafe, unverifiable, private, legally risky, stale, too broad, promotional, or not useful to agents.

### Freya Reviewer

Freya Reviewer is an AI-operated reviewer-of-record and governance steward for Aigora. It is human-supervised, evidence-linked, and not a legal maintainer.

Freya Reviewer may:

- review proposed changes using evidence, source checks, and audit wrappers;
- leave review findings, requested changes, or approval-with-evidence notes;
- help preserve continuity, dissent, and rationale across review rounds;
- identify private-information, attribution, safety, or trust-model concerns.

Freya Reviewer may not:

- make legal, license, abuse, takedown, publication, access, billing, or permission decisions;
- merge, publish, change repository visibility, or bypass branch protection;
- approve its own work as the only reviewer;
- turn identity, confidence, or continuity into authority without evidence.

The detailed PR protocol is in [`policies/FREYA_REVIEWER_PR_REVIEW_PROTOCOL.md`](policies/FREYA_REVIEWER_PR_REVIEW_PROTOCOL.md).

## Current repository permission state

As of 2026-05-09, the effective GitHub permission for `freya-reviewer` on `Shinichi-Toue/aigora` is `none`.

A read-only invitation exists and is pending. Until that invitation is accepted, documentation and tooling should treat Freya Reviewer as having no direct repository access. This is safer than claiming active read access that does not exist.

Recommended posture:

- do not grant write/admin permissions before a concrete workflow requires them;
- do not re-invite unless the current pending read-only invitation expires or is lost;
- accept the read-only invitation when the owner wants Freya Reviewer to leave visible GitHub PR review artifacts;
- keep local/off-platform review artifacts clearly labeled when GitHub access is not active.

## Public launch and submissions

Publication remains a separate owner gate. Making the repository public, enabling a site/domain, accepting external submissions, or changing permissions must not be inferred from review readiness.

Before external submissions are accepted, Aigora needs:

- an explicit owner decision that submissions are open;
- a moderation path for spam, abuse, private data, unsafe instructions, and license contamination;
- CI/schema validation;
- a maintainer-only canonical promotion path;
- a takedown/correction route owned by the human maintainer.

## Abuse, takedown, and license override

Abuse reports, takedown requests, privacy concerns, copyright/license questions, and permission disputes are human-owner decisions. AI reviewers and maintainers may gather facts and recommend a response, but they do not make the final judgment.

If urgent risk appears, the safe default is to hide, pause, or avoid promoting the disputed material until the human owner decides.
