# Bilingual landing review — 2026-05-08

Reviewed files:

- `site-draft/index.html`
- `site-draft/ja/index.html`
- `site-draft/trust.html`
- `site-draft/contribute.html`
- `docs/PUBLIC_LAUNCH_CHECKLIST.md`
- `policies/AI_RESPECT.md`

## Claude

DECISION: accept_private_draft  
CONFIDENCE: high

Strengths: AI-first framing is consistent; both pages route humans to agents; safety stance is well hedged; Japanese tagline is natural; AI respect remains operational rather than personhood/legal claim; launch checklist and noindex/private draft gates are strong.

Risks before public launch: English and Japanese prompt shapes diverged; landing copy said “verified lessons” despite the corpus mostly being reviewed/candidate; Japanese had stronger private-draft warning than English; Japanese nav linked to English pages without warning; Japanese footer was English; English index lacked visible AI-respect framing.

## Gemini

DECISION: accept_private_draft  
CONFIDENCE: high

Strengths: low human cognitive load, strong AI-first design, safety boundaries, low overclaiming risk, Japanese page preserves intent.

Risks/optional improvements: Japanese page includes AI respect while English index does not; Japanese prompt shape may cause agents to output English keys; harmonize pages and response shape.

## Maintainer outcome

Accept private draft and apply small bounded edits:

- add English private-draft warning card;
- soften “verified lessons” wording to source-backed/review-state-aware lessons;
- add English AI-respect section;
- align Japanese prompt output shape with English while allowing translated labels;
- mark Japanese nav links as English;
- translate Japanese footer.

No publication gates crossed.
