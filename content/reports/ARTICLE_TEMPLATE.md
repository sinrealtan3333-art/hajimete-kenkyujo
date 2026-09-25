# はじめて研究所 記事テンプレート運用ルール

今後の研究レポートは、以下を標準仕様とする。

## 記事レイアウト
- PCでは本文左側に固定サイドバー（記事内目次）を表示する。
- サイドバーはスクロールに追従する。
- 章タイトルをクリックすると該当見出しへジャンプする。
- 現在読んでいる章をハイライトする。
- 1100px以下では固定を解除し、記事上部の目次へ切り替える。
- 620px以下では1列表示にする。

## HTML構造
```html
<section class="article-shell">
  <div class="article-layout">
    <aside class="article-toc" aria-label="この記事の目次">
      <div class="toc-panel">
        <div class="toc-kicker">RESEARCH INDEX</div>
        <div class="toc-title">この記事の目次</div>
        <nav class="toc-nav">
          <!-- 各h2へのリンクを自動/手動生成 -->
        </nav>
      </div>
    </aside>

    <article class="article-body">
      <!-- 本文 -->
    </article>
  </div>
</section>
```

## 見出しルール
- 大章は `h2` + 固有ID。
- 小見出しは `h3`。
- 目次は大章（h2）のみを基本とする。
- `h2[id]` には固定ヘッダー分の `scroll-margin-top` を適用する。

## CSS
共通の `/report.css` を使う。
固定サイドバー関連の標準クラス:
- `.article-layout`
- `.article-toc`
- `.toc-panel`
- `.toc-nav`
- `.toc-nav a.active`

## JS
IntersectionObserverで現在読んでいる章の目次リンクに `.active` を付与する。

## 公開時チェック
- トップ/一覧から記事へリンクできる
- 記事内目次がPCで左固定になっている
- 各目次リンクが正しい章へ飛ぶ
- スマホでは上部目次に変わる
- GA4タグが入っている
- canonical/OGPが設定されている
- sitemap.xmlに記事URLを追加する
