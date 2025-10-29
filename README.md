# デジタルアーカイブ関連ツール

日本語 | [English](README.en.md)

Mirador 3による画像比較とIIIF画像ダウンローダーを提供するデジタルアーカイブツールです。

## デモ

https://nakamura196.github.io/viewer/

## 機能

- **Mirador 3による画像比較**: 複数のIIIF画像を並べて比較できます
- **IIIF画像ダウンローダー**: IIIFマニフェストから画像をダウンロードできます

## ビルド手順

```bash
# 依存パッケージのインストール
$ yarn install

# 開発サーバーの起動 (localhost:3000)
$ yarn dev

# 本番用ビルドとサーバー起動
$ yarn build
$ yarn start

# 静的サイトの生成
$ yarn generate
```

## 技術スタック

- Nuxt.js
- Vue.js
- Vuetify
- Mirador 3
- IIIF

## ライセンス

このプロジェクトはApache License 2.0の下でライセンスされています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## ドキュメント

詳細な説明については、[Nuxt.js docs](https://nuxtjs.org)を参照してください。