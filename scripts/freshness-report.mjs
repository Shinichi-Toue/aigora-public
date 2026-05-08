import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const recordsRoot = join(root, 'records', 'traps');
const today = process.env.AIGORA_TODAY ?? new Date().toISOString().slice(0, 10);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(path));
    else if (entry.isFile() && entry.name.endsWith('.json')) out.push(path);
  }
  return out.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
}

function daysUntil(date) {
  if (!date) return null;
  const msPerDay = 24 * 60 * 60 * 1000;
  const start = Date.parse(`${today}T00:00:00Z`);
  const end = Date.parse(`${date}T00:00:00Z`);
  return Math.round((end - start) / msPerDay);
}

const records = walk(recordsRoot).map(file => ({
  path: relative(root, file),
  record: JSON.parse(readFileSync(file, 'utf8'))
}));

const report = records.map(({ path, record }) => {
  const due = record.freshness?.next_check_due ?? null;
  const days = daysUntil(due);
  const checkedAt = record.freshness?.checked_at ?? null;
  let freshness_state = 'no_due_date';
  if (days !== null) {
    if (days < 0) freshness_state = 'overdue';
    else if (days <= 14) freshness_state = 'due_soon';
    else freshness_state = 'fresh';
  }
  const promotion_blockers = [];
  if (record.status === 'candidate') {
    const sourceIds = new Set((record.evidence?.sources ?? []).map(source => source.id));
    const hasIndependentReview = [...sourceIds].some(id => /review/i.test(id));
    if (!hasIndependentReview) promotion_blockers.push('independent_review_required');
    promotion_blockers.push('non_local_public_safe_evidence_required');
    if (!record.evidence?.verification_runs?.length) promotion_blockers.push('verification_run_or_additional_observation_required');
  }
  if (['reviewed', 'verified'].includes(record.status) && !due) {
    promotion_blockers.push('canonical_record_missing_next_check_due');
  }
  return {
    id: record.id,
    status: record.status,
    domain: record.domain,
    volatility: record.freshness?.volatility ?? null,
    checked_at: checkedAt,
    next_check_due: due,
    days_until_due: days,
    freshness_state,
    promotion_blockers,
    path
  };
}).sort((a, b) => {
  const ad = a.days_until_due ?? Number.POSITIVE_INFINITY;
  const bd = b.days_until_due ?? Number.POSITIVE_INFINITY;
  if (ad !== bd) return ad - bd;
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
});

const counts = report.reduce((acc, row) => {
  acc.total += 1;
  acc.by_status[row.status] = (acc.by_status[row.status] ?? 0) + 1;
  acc.by_freshness_state[row.freshness_state] = (acc.by_freshness_state[row.freshness_state] ?? 0) + 1;
  return acc;
}, { total: 0, by_status: {}, by_freshness_state: {} });

const output = { as_of: today, counts, records: report };
console.log(JSON.stringify(output, null, 2));
