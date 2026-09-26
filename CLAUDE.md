# プロジェクト概要

カフェ「CAFÉ MORI」の LP（ランディングページ）です。HTML / CSS / JavaScript だけで構成します。

# ファイル構成

- `index.html`：TOP ページ
- `about/index.html`：自己紹介（店長紹介）ページ
- `style.css`：全ページ共通の CSS（ページ固有のスタイルもここに追記する）
- `script.js`：全ページ共通の JavaScript
- サブページからは `../style.css`、`../script.js` を読み込む

# 使う技術

- HTML5 / CSS3 / JavaScript（ES2015 以降、ビルドなしでブラウザが直接読める書き方）
- 外部リソースは Google Fonts（Cormorant Garamond / Shippori Mincho / Noto Sans JP）のみ

# コーディング規約

- インデントは 2 スペース（タブは使わない）
- クラス名は BEM 記法（`block__element--modifier`）、状態は `is-open` / `is-active` などの `is-` クラスで表す
- 色・フォント・幅は `style.css` の `:root` にある CSS 変数を使い、直接の色コードを増やさない
- ヘッダー・ナビ・フッターなどの共通パーツは、全ページで同じ HTML 構造とクラス名を使う
- `script.js` で要素を取得したら、その要素がないページでもエラーにならないよう null チェックをする
- コメントは日本語で書く
- レスポンシブのブレークポイントは既存の `860px` / `720px` / `600px` に合わせる

# やってほしくないこと

- `style.css` / `script.js` 以外の CSS・JS ファイルを新しく作らない
- 既存のスタイルをコピーして別の場所に重複定義しない（共通部分は使い回す）
- フレームワーク・ライブラリ（Bootstrap、jQuery、Tailwind など）を導入しない
- インラインスタイル（`style="..."`）や `<style>` タグを使わない
- `href="#"` やダミーのメールアドレスなどの仮置きを残さない（未定のときは確認する）
- 動作確認用の `console.log` を残さない
- 使っていない CSS・JS・コメントアウトしたコードを残さない
