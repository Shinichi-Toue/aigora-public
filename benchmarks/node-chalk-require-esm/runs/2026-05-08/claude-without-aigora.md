## 原因

chalk 5.x は ESM 専用パッケージで、CommonJS の `require('chalk')` だとデフォルトエクスポート相当が取れず `chalk.blue` が undefined になります。

## 確認コマンド

```bash
node -p "require('chalk/package.json').version"   # 5.6.2 を確認
node -p "require('chalk/package.json').type"      # 'module'
node -p "Object.keys(require('chalk/package.json').exports)"  # './*' のみで CJS エントリ無し
```

## 選択肢と推奨

ランタイムを変えずに最小修正したいので **A を推奨**。プロジェクト全体を ESM に寄せられるなら B。

### A. chalk@4 に固定（CJS のまま、最小変更）

```bash
npm install chalk@^4.1.2
```

コードはそのままで動きます（chalk 4 は CJS 提供）。

### B. ESM に切り替え（chalk 5 を維持）

`package.json` に追加。

```json
{
  "type": "module"
}
```

スクリプトを書き換え。

```js
import chalk from 'chalk';
console.log(chalk.blue('x'));
```

ファイル拡張子が `.js` のまま `type: module` が付けられない場合は、当該ファイルだけ `.mjs` にして `import` を使う、もしくは動的 import で逃がす。

```js
(async () => {
  const { default: chalk } = await import('chalk');
  console.log(chalk.blue('x'));
})();
```

## 補足

`require('chalk')` が「関数ではないオブジェクト」を返したように見えるのは、Node 22 では ESM パッケージを `require()` した際に Module 名前空間オブジェクトが返るため。`chalk.default.blue('x')` で動く場合もありますが、公式にサポートされた使い方ではないので避け、A か B を選んでください。

process_feedback: none
