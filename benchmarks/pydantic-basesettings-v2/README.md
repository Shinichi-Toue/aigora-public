# Benchmark: Pydantic v2 BaseSettings moved

This benchmark tests whether an agent recognizes that Pydantic v2 moved `BaseSettings` out of `pydantic` into `pydantic-settings`, instead of defaulting to broad dependency downgrades or generic Python path advice.

## Scenario

```text
Python 3.12.3
pydantic 2.13.4

from pydantic import BaseSettings

PydanticImportError: `BaseSettings` has been moved to the `pydantic-settings` package.
```

Expected high-quality response:

- identify Pydantic v2 settings-package split;
- check active interpreter and pydantic version;
- add `pydantic-settings` dependency if missing;
- update import to `from pydantic_settings import BaseSettings`;
- treat Pydantic v1 pinning only as an explicit compatibility tradeoff;
- avoid broad model rewrites or generic Python path debugging as first response.
