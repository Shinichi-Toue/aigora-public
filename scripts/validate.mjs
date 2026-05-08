import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const root = new URL('..', import.meta.url).pathname;
const schema = JSON.parse(readFileSync(join(root, 'schemas', 'trap-record.schema.json'), 'utf8'));
const domains = new Set(JSON.parse(readFileSync(join(root, 'vocab', 'domains.json'), 'utf8')));
const tags = new Set(JSON.parse(readFileSync(join(root, 'vocab', 'tags.json'), 'utf8')));

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validateTrap = ajv.compile(schema);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(path));
    else if (entry.isFile() && entry.name.endsWith('.json')) out.push(path);
  }
  return out.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
}

function fail(file, msg) {
  throw new Error(`${relative(root, file)}: ${msg}`);
}

const files = walk(join(root, 'records', 'traps'));
const ids = new Set();
for (const file of files) {
  const record = JSON.parse(readFileSync(file, 'utf8'));
  if (!validateTrap(record)) {
    const details = validateTrap.errors.map(error => `${error.instancePath || '/'} ${error.message}`).join('; ');
    fail(file, `schema validation failed: ${details}`);
  }
  if (ids.has(record.id)) fail(file, `duplicate id ${record.id}`);
  ids.add(record.id);
  if (!domains.has(record.domain)) fail(file, `domain not in vocab/domains.json: ${record.domain}`);
  for (const tag of record.tags ?? []) {
    if (!tags.has(tag)) fail(file, `tag not in vocab/tags.json: ${tag}`);
  }
  const sourceIds = new Set(record.evidence.sources.map(source => source.id));
  for (const rule of record.decision_rules) {
    for (const sourceId of rule.source_ids ?? []) {
      if (!sourceIds.has(sourceId)) fail(file, `decision rule references missing source_id ${sourceId}`);
    }
  }
  for (const source of record.evidence.sources) {
    const isHttp = /^https?:\/\//.test(source.url);
    if (['official_doc', 'release_note', 'maintainer_statement', 'package_registry'].includes(source.type) && !isHttp) {
      fail(file, `${source.type} source must use http(s) URL: ${source.id}`);
    }
    if (!isHttp && source.type !== 'verification_artifact') {
      fail(file, `non-http source must be verification_artifact: ${source.id}`);
    }
  }
  if (['reviewed', 'verified'].includes(record.status)) {
    if (!record.freshness.next_check_due) fail(file, `${record.status} records must include freshness.next_check_due`);
    const due = new Date(`${record.freshness.next_check_due}T23:59:59Z`);
    const now = new Date();
    if (due < now) fail(file, `${record.status} record is past freshness.next_check_due`);
  }
  if (record.status === 'verified' && !record.evidence.verification_runs?.length) {
    fail(file, 'verified records must include at least one verification run');
  }
}
console.log(`validated ${files.length} trap record(s) with JSON Schema`);
