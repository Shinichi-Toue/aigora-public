# Moving source ref during long deploy repro

This local reproduction simulates a long deploy that freezes one commit while the branch advances before rollout evidence is read.

It demonstrates the agent-facing distinction:

- deployed commit truth comes from the deploy record / frozen SHA;
- branch head after rollout may have advanced;
- source-ref drift is not itself deploy failure;
- the next safe action is incremental review of the range from deployed commit to current target.

Run command used on 2026-05-08:

```sh
./benchmarks/moving-source-ref-during-long-deploy/repro.sh
```

Output is saved in `repro-2026-05-08.txt`.
