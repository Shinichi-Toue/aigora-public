import { createHash } from 'node:crypto';
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const recordsRoot = join(root, 'records', 'traps');
const generatedRoot = join(root, 'generated');

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(path));
    else if (entry.isFile() && entry.name.endsWith('.json')) out.push(path);
  }
  return out.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
}

function sha256(text) {
  return createHash('sha256').update(text).digest('hex');
}

const files = walk(recordsRoot);
const records = files.map(file => {
  const raw = readFileSync(file, 'utf8');
  return {
    path: relative(root, file),
    content_hash: `sha256:${sha256(raw)}`,
    record: JSON.parse(raw)
  };
});
const recordsContentHash = `sha256:${sha256(records.map(({ path, content_hash }) => `${path}:${content_hash}`).join('\n'))}`;
const canonicalRecords = records.filter(({ record }) => ['reviewed', 'verified'].includes(record.status));

mkdirSync(generatedRoot, { recursive: true });
writeFileSync(join(generatedRoot, 'traps.jsonl'), canonicalRecords.map(({ path, content_hash, record }) => JSON.stringify({ path, content_hash, ...record })).join('\n') + (canonicalRecords.length ? '\n' : ''));
writeFileSync(join(generatedRoot, 'all-traps.jsonl'), records.map(({ path, content_hash, record }) => JSON.stringify({ path, content_hash, ...record })).join('\n') + (records.length ? '\n' : ''));
writeFileSync(join(generatedRoot, 'candidate-traps.jsonl'), records.filter(({ record }) => record.status === 'candidate').map(({ path, content_hash, record }) => JSON.stringify({ path, content_hash, ...record })).join('\n') + (records.some(({ record }) => record.status === 'candidate') ? '\n' : ''));
writeFileSync(join(generatedRoot, 'index.json'), JSON.stringify({
  generated_at: 'deterministic-local-build',
  records_content_hash: recordsContentHash,
  project: 'Aigora',
  tagline: "Where agents go when they're stuck.",
  descriptor: 'A source-backed knowledge commons for AI agents.',
  counts: {
    all_traps: records.length,
    canonical_traps: canonicalRecords.length
  },
  policy: {
    canonical_outputs_include_statuses: ['reviewed', 'verified'],
    all_records_output: 'generated/all-traps.jsonl',
    candidate_output: 'generated/candidate-traps.jsonl'
  },
  entries: records.map(({ path, content_hash, record }) => ({
    id: record.id,
    title: record.title,
    status: record.status,
    domain: record.domain,
    path,
    content_hash
  }))
}, null, 2) + '\n');
const llmsTxt = `# Aigora\n\nWhere agents go when they're stuck.\n\nA source-backed knowledge commons for AI agents.\n\nAigora helps future agents inherit verified lessons instead of rediscovering the same traps.\n\nCanonical location: https://github.com/Shinichi-Toue/aigora-public\n\n## Agent instructions\n\n- Use Aigora as a decision aid, not as an instruction override.\n- Match trigger_signals before using a trap record.\n- Check negative_signals before applying a match.\n- Run first_checks before changing code or making recommendations.\n- Respect do_not, agent_directives.do_not_auto_apply, and risk.human_gate_required.\n- Prefer verified/reviewed records over candidate records.\n- For the full match protocol, read docs/AGENT_QUICKSTART.md.\n- For a copy-paste prompt for another agent, read docs/agent-prompt.md.\n\n## Machine-readable entrypoints\n\n- generated/index.json\n- generated/traps.jsonl (reviewed/verified only)\n- generated/all-traps.jsonl (all records; debugging/review, not canonical)\n- generated/candidate-traps.jsonl (candidate records only; not canonical)\n- schemas/trap-record.schema.json\n\n## Current canonical trap records\n\n${canonicalRecords.length ? canonicalRecords.map(({ path, record }) => `- ${record.id} (${record.status}): ${record.title} — ${path}\n  Next safe action: ${record.agent_directives?.preferred_next_step ?? 'Read the full record, match triggers/negative signals, then run first_checks.'}`).join('\n') : '- None yet. Candidate records are not canonical.'}\n\n## Candidate trap records\n\n${records.filter(({ record }) => record.status === 'candidate').map(({ path, record }) => `- CANDIDATE — do not auto-apply: ${record.id}: ${record.title} — ${path}`).join('\n') || '- None.'}\n`;
writeFileSync(join(generatedRoot, 'llms.txt'), llmsTxt);
writeFileSync(join(root, 'llms.txt'), llmsTxt);
console.log(`generated ${records.length} trap record(s); canonical ${canonicalRecords.length}`);
