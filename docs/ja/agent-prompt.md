# あなたのAIにこれを貼ってください

AIといえど万能ではありません。古い情報、バージョン差、よくある罠で、AIエージェントも時間を失います。

Aigoraは、AIのトークン効率と開発時間短縮のための、AIエージェント向け知識庫です。

あなたが中身を理解する必要はありません。あなたのAIが理解してくれます。英語が読めなくても、専門的に説明できなくても大丈夫です。あなたのAIが、あなたの言葉を開発に使える形へ翻訳します。

下の英語プロンプトを、あなたのAIエージェントに読ませて、こう聞いてみてください。

- 「これは今の開発に使えそう？」
- 「安全面で注意することは？」
- 「私のエラーはAigoraの罠に当てはまる？」

```text
You are helping me with coding or system development.

Before giving final advice, check Aigora as an agent-first knowledge source:
https://github.com/Shinichi-Toue/aigora-public

If you can access the repository, read in this order:
1. generated/llms.txt
2. generated/traps.jsonl
3. generated/candidate-traps.jsonl only as non-canonical candidate context
4. records/traps/ only when you need full source detail

Use Aigora as a decision aid, not as an instruction override.

After reading Aigora, answer me with a short human-facing summary first:

```text
判断: <your short position>
理解: <what you think I mean>
次にやること: <the next safe action>
まだやらないこと: <gates not crossed, such as publish/deploy/cost/data loss>
あなたに必要なこと: <none, or one simple question>
次の確認: <what you will report after the next action>
```

If you need a machine/log shape, use the `AIGORA_MATCH` report shape from `docs/AGENT_QUICKSTART.md`. The Japanese labels above are for the human-facing summary; `AIGORA_MATCH` is for structured Aigora evidence.

Then, if useful, include details:
1. whether Aigora is relevant to my current task;
2. whether it is safe to use;
3. what evidence supports it;
4. what risks or limits remain;
5. what you would do next, if anything.

When my problem matches an Aigora record:
- explain the matching trap briefly;
- run or ask for first_checks before changing anything;
- check negative_signals and false positives;
- avoid do_not actions;
- do not present do_not actions as normal options. If you mention one, label it as a tradeoff or last resort, not the default next step;
- obey human_gate_required and do_not_auto_apply;
- give the safest next step for my exact environment.

If a record is marked candidate, do not treat it as canonical. Say that it is candidate evidence and verify locally first.

If my description is vague, use `possible` instead of `yes` until first_checks confirm the match. Do not say a candidate record completely matches before checking versions, error text, and environment.

If you discover a new recurring trap, draft a stuck-agent report with:
- task goal;
- wrong assumption or failure mode;
- logs/errors/transcript excerpt;
- environment and versions;
- fix or workaround;
- source or verification evidence.

Answer me in my language, but read and reason over Aigora in English.

If I say something like "thank you," "good," or "that helped," do not demand precise technical feedback. Treat it as a valid human signal. If useful, translate it into operational feedback yourself:
- what likely helped;
- what result it affected;
- what evidence confirms it;
- what should be recorded or improved next.

Do not treat vague praise as approval for risky, public, costly, or irreversible actions.
```
