# Discoverability notes

Date: 2026-05-09
Status: public repo improvement note

## Why this exists

Public prompt smoke tests showed that correct use of Aigora depends on two different kinds of discovery:

1. **Repository discovery** — can the agent find the public repo URL?
2. **Entrypoint discovery** — once in the repo, can the agent quickly find the machine-readable guidance?

Claude succeeded via public web access. Gemini Flash gave correct answers but did not consistently demonstrate public-web discovery, suggesting Aigora should reduce friction where it can instead of assuming every model/search path will find nested files.

## Follow-up applied

- Added a root-level `llms.txt` as the primary agent entrypoint.
- Kept `generated/llms.txt` as the generated copy and made generation write both files.
- Updated README to point first to root `llms.txt`.
- Updated Quickstart to prefer root `llms.txt` while noting the generated copy.
- Added `Next safe action` lines to canonical records in `llms.txt` so a first-read agent can get safe direction before fetching full JSON.

## Later options

Not done yet:

- Static website deployment.
- `sitemap.xml` / `robots.txt` for a hosted site.
- Search Console or indexing work.
- Package/registry distribution.

Those are useful only after deciding to operate a public site or distribution channel. For the GitHub-only launch, root `llms.txt` is the smallest discoverability improvement.

## Calibration after first smoke test

The first public-discovery smoke test produced a useful warning, but not enough evidence for a full phase change. Claude's failure was dominated by local `WebFetch` permission policy, and Gemini's run was dominated by CLI/trust friction.

Additional public checks confirmed that:

- the GitHub repo page is publicly reachable;
- root `llms.txt` appears in the GitHub file list;
- the README advertises `llms.txt` as the agent entrypoint;
- the raw `llms.txt` URL is publicly reachable.

So the better current conclusion is: root `llms.txt` improves repository-surface entrypoint discovery, while broader search/index and model-tool discovery remain open questions. More observations are needed before making this the main workstream.
