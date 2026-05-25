#!/usr/bin/env python3
"""Degraded semantic search is not absence evidence — public-safe reproducer.

This fixture demonstrates, with no network and no private data, the load-bearing
mechanic of the trap: when a retrieval layer is *degraded* (embedding failure,
unbuilt/stale index, or timeout/partial results) an empty semantic result does
NOT mean the document is absent — a deterministic exact-id lookup still finds it.

It also encodes the negative-signal boundary that lets an agent *stop* doubting:
only when search is healthy AND a deterministic path agrees is "verified_absent"
a legitimate conclusion.

Deterministic, offline, safe to re-run.
"""
from __future__ import annotations

# A tiny neutral corpus. "vector" is a toy 1-D embedding keyed by a token.
CORPUS = {
    "policy-a": {"text": "retention policy alpha", "token": "retention"},
    "runbook-b": {"text": "deploy runbook beta", "token": "deploy"},
    "spec-c": {"text": "billing spec gamma", "token": "billing"},
}


def semantic_search(query_token, *, degraded=None):
    """Toy semantic search.

    Returns (hits, health) where health carries an in-band degradation signal,
    exactly like real engines surface `timed_out`, `_shards` failures, fallback,
    or embedding-failure warnings.
    """
    health = {"degraded": False, "warning": None}

    if degraded == "embedding_failed":
        # Query could not be embedded -> similarity search yields nothing.
        health = {"degraded": True, "warning": "embedding_generation_failed"}
        return [], health
    if degraded == "index_not_built":
        # ANN index missing -> approximate path returns nothing though data exists.
        health = {"degraded": True, "warning": "vector_index_not_built"}
        return [], health
    if degraded == "timeout_partial":
        # Matching shard dropped on timeout -> partial (here, empty) results.
        health = {"degraded": True, "warning": "timed_out_partial_results"}
        return [], health

    # Healthy path: exact token match over the corpus.
    hits = [doc_id for doc_id, d in CORPUS.items() if d["token"] == query_token]
    return hits, health


def exact_id_lookup(doc_id):
    """Deterministic point lookup against the authoritative store.

    Does not depend on similarity ranking or index recall: a definitive
    present/absent answer.
    """
    return CORPUS.get(doc_id)  # None == authoritative 404


def classify(query_token, expected_doc_id, *, degraded=None):
    """Decide absence honestly, per the trap's decision rules + negative signals."""
    hits, health = semantic_search(query_token, degraded=degraded)
    deterministic = exact_id_lookup(expected_doc_id)

    if not hits and health["degraded"]:
        # Empty under an observable degradation signal -> NOT absence.
        return "not_found_while_degraded", hits, health, deterministic
    if not hits and not health["degraded"]:
        # Healthy search miss: only "verified_absent" if deterministic agrees.
        if deterministic is None:
            return "verified_absent", hits, health, deterministic
        # Healthy search missed an item that deterministically exists -> recall gap.
        return "recall_gap_not_absent", hits, health, deterministic
    return "found", hits, health, deterministic


def main():
    checks = []

    # (b1/b2/b3) Each degraded mode: target "policy-a" IS in the corpus, yet
    # semantic search returns empty. The trap fires only because a degradation
    # signal is observable, and exact-id lookup proves the doc still exists.
    for mode in ("embedding_failed", "index_not_built", "timeout_partial"):
        verdict, hits, health, det = classify("retention", "policy-a", degraded=mode)
        ok = (
            verdict == "not_found_while_degraded"
            and hits == []
            and health["degraded"] is True
            and det is not None  # exact-id lookup STILL finds it
        )
        checks.append((f"degraded[{mode}]: empty != absent", ok, verdict))

    # (healthy + present) Healthy search finds the present doc.
    verdict, hits, health, det = classify("deploy", "runbook-b")
    checks.append(("healthy: present doc is found", verdict == "found", verdict))

    # (negative signal) Healthy search AND authoritative 404 agree -> verified_absent.
    verdict, hits, health, det = classify("nonexistent-token", "ghost-x")
    ok = verdict == "verified_absent" and det is None and health["degraded"] is False
    checks.append(("healthy + exact 404 -> verified_absent (stop doubting)", ok, verdict))

    # (anti-paralysis guard) A healthy miss on an item that DOES exist is a recall
    # gap, not degradation paralysis -> a distinct, bounded verdict.
    verdict, hits, health, det = classify("retention", "policy-a")
    # "retention" healthy-matches policy-a, so this is "found"; force a recall gap
    # by querying a token that won't match while the doc exists:
    verdict2, _, health2, det2 = classify("unindexed-token", "spec-c")
    ok = verdict2 == "recall_gap_not_absent" and det2 is not None and not health2["degraded"]
    checks.append(("healthy miss but doc exists -> recall_gap (not 'absent')", ok, verdict2))

    print("degraded-search-not-absence-evidence reproducer")
    print("-" * 60)
    all_ok = True
    for name, ok, verdict in checks:
        all_ok &= ok
        print(f"[{'PASS' if ok else 'FAIL'}] {name}  (verdict={verdict})")
    print("-" * 60)
    print("RESULT:", "ALL PASS" if all_ok else "FAILURE")
    return 0 if all_ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
