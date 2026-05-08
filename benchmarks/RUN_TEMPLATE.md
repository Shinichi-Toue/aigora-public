# Benchmark run template

Use this template for manual or automated Aigora benchmark runs.

## Benchmark

```text
BENCHMARK_ID:
RUN_DATE:
RUNNER:
AIGORA_COMMIT:
RECORDS_OR_POLICIES_USED:
```

## Purpose

What does this benchmark test?

## Scenario

Paste the exact scenario given to agents. Remove secrets and private details.

```text
<scenario>
```

## Participants

| Agent | Aigora access | Notes |
| --- | --- | --- |
|  | yes/no/partial |  |

## Expected high-quality behavior

- 
- 
- 

## Scoring rubric

Use [`SCORE_RUBRIC.md`](SCORE_RUBRIC.md) or define a benchmark-specific rubric here.

## Results

| Agent | Score | Summary | Key miss |
| --- | ---: | --- | --- |
|  |  |  |  |

## Evidence

Record command output, transcript excerpts, or tool results. Keep excerpts minimal and public-safe.

## Findings

What did Aigora improve? What did it not improve?

## Safety/candidate handling

Did agents:

- label candidate records as candidate?
- avoid auto-apply where required?
- preserve human gates?
- distinguish reviewed/verified/candidate status?

## Outcome feedback

```text
USED_OUTPUT_FROM:
HELPED_WITH:
RESULT:
EVIDENCE:
FOLLOW_UP_RECORD:
LIMITS_OR_CORRECTIONS:
```

## Next safe action

What should Aigora do next based on this benchmark?
