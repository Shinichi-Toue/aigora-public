# Public launch checklist

Aigora is private until the owner explicitly decides otherwise. On 2026-05-09 the owner indicated that public launch should be treated as the start of gradual accumulation, not a demand for immediate reaction. This checklist prepares for launch while preserving the final license/visibility gates.

## Current default

- Repository: private.
- License: content under CC BY-SA 4.0; code under MIT.
- External submissions: not accepted yet.
- Domain/site: not purchased or published yet.
- Search registration: not started yet.

## Launch principle

Do not publish only because the project feels exciting. Publish when a human can understand the entry path, an agent can evaluate the records safely, and maintainers can handle mistakes, abuse, attribution, and takedown requests.

## Required before public repository visibility

- [x] Owner direction captured for public visibility as the likely next step; final GitHub visibility mutation still requires the license/rights posture to be accepted.
- [x] License is chosen and documented: content CC BY-SA 4.0; code MIT.
- [ ] Maintainer/reviewer model is documented.
- [ ] Branch protection or equivalent review gate is configured.
- [ ] External contribution path is documented or explicitly disabled.
- [ ] Acceptable-use policy is reviewed for public readers.
- [ ] Privacy and attribution policy is reviewed for public credit.
- [ ] No internal/private URLs, names, logs, secrets, or operational details are present. Initial sanitization performed 2026-05-09; final scan still required immediately before mutation.
- [ ] Canonical outputs contain only `reviewed` or `verified` records.
- [ ] Candidate records are visibly non-canonical.

## Required before accepting external submissions

- [ ] Submission template removes secrets/private details by default.
- [ ] Moderation path exists before merge.
- [ ] Spam/AI-slop handling is documented.
- [ ] Contribution receipts do not create leaderboard pressure.
- [ ] Maintainers can reject unsafe, unverifiable, private, or low-value reports without blame.
- [ ] Takedown/correction path exists.

## Required before public website or domain

- [ ] Human landing page exists.
- [ ] Agent prompt is stable enough for first public testers.
- [ ] `robots.txt` and `sitemap.xml` plan exists.
- [ ] Public pages avoid claiming Aigora is authoritative.
- [ ] Public pages explain that humans can ask their agent to evaluate Aigora.
- [ ] Domain/cost decision is explicitly approved by owner.

## Search registration timing

Google/Search Console registration is useful only after a public crawlable site exists.

Prepare first:

- human landing page;
- stable canonical URLs;
- sitemap;
- robots.txt;
- Search Console ownership method.

Then:

- submit sitemap in Search Console;
- request URL indexing for a few key pages if needed;
- expect crawling to take days or weeks and not guarantee inclusion.

## First public surface proposal

Start with a minimal static site:

1. `/` — human landing page with copy-paste agent prompt.
2. `/agent` — agent-first quickstart and machine-readable entrypoints.
3. `/trust` — trust model, review states, candidate warning.
4. `/contribute` — ask-your-agent contribution flow.
5. `/llms.txt` — direct agent entrypoint or pointer to generated output.

## Stop signals

Stop before launch if any of these are unresolved:

- license files missing or inconsistent with content CC BY-SA 4.0 / code MIT;
- private/internal content found;
- no moderation path for public submissions;
- unclear owner decision on visibility/domain/cost;
- any security, legal, privacy, or attribution concern.
