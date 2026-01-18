# Portfolio Website

A professional portfolio showcasing System Development, Web Development, and AI Development services. Features an interactive AI chatbot, internationalization (English/Japanese), and a cosmic space theme.

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **UI:** React 19, TypeScript 5, Tailwind CSS 4
- **i18n:** next-intl (English/Japanese)
- **AI:** Anthropic Claude API with RAG via [portfolio-ai](https://github.com/hiroko_m18/portfolio-ai) backend
- **Email:** Resend (contact form)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Environment Variables

Create `.env.local`:

```env
ANTHROPIC_API_KEY=your_key_here
RESEND_API_KEY=your_key_here
CONTACT_EMAIL=your@email.com
```

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Docker

```bash
docker build -f Dockerfile.dev -t portfolio-dev .
docker run -p 3000:3000 portfolio-dev
```

## Scripts

| Command          | Description              |
| ---------------- | ------------------------ |
| `npm run dev`    | Start development server |
| `npm run build`  | Production build         |
| `npm run lint`   | Run ESLint               |
| `npm run format` | Format with Prettier     |
| `npm run check`  | Lint + format check      |

## Features

- **AI Chatbot:** Floating widget powered by Claude with RAG (connects to [portfolio-ai](https://github.com/hiroko_m18/portfolio-ai) for context-aware responses)
- **Contact Form:** Secure form with Resend email delivery, honeypot protection, rate limiting
- **Internationalization:** Full English/Japanese support with URL-based routing
- **Responsive Design:** Mobile-first with cosmic space theme
- **Accessibility:** Colorblind-safe color palette

## Project Structure

```
src/
├── app/[locale]/     # i18n routing
├── components/       # React components
├── constants/        # Color palette
├── locales/          # Translation files
└── types/            # TypeScript definitions
```

## License

MIT

---

# ポートフォリオサイト

システム開発、Web開発、AI開発サービスを紹介するプロフェッショナルなポートフォリオサイトです。AIチャットボット、多言語対応（日本語/英語）、宇宙テーマのデザインを特徴としています。

## 技術スタック

- **フレームワーク:** Next.js 16 (App Router)
- **UI:** React 19, TypeScript 5, Tailwind CSS 4
- **多言語対応:** next-intl（日本語・英語）
- **AI:** Anthropic Claude API + RAG（[portfolio-ai](https://github.com/hiroko_m18/portfolio-ai)バックエンド連携）
- **メール:** Resend（お問い合わせフォーム）

## はじめに

### 必要条件

- Node.js 18以上
- npm

### 環境変数

`.env.local`を作成:

```env
ANTHROPIC_API_KEY=your_key_here
RESEND_API_KEY=your_key_here
CONTACT_EMAIL=your@email.com
```

### 開発

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

### Docker

```bash
docker build -f Dockerfile.dev -t portfolio-dev .
docker run -p 3000:3000 portfolio-dev
```

## スクリプト

| コマンド         | 説明             |
| ---------------- | ---------------- |
| `npm run dev`    | 開発サーバー起動 |
| `npm run build`  | 本番ビルド       |
| `npm run lint`   | ESLint実行       |
| `npm run format` | コード整形       |
| `npm run check`  | 品質チェック     |

## 機能

- **AIチャットボット:** Claude + RAGを活用したフローティングウィジェット（[portfolio-ai](https://github.com/hiroko_m18/portfolio-ai)連携でコンテキストを考慮した回答）
- **お問い合わせフォーム:** Resendによるメール送信、ハニーポット保護、レート制限を備えたセキュアなフォーム
- **多言語対応:** URLベースのルーティングによる日英完全対応
- **レスポンシブデザイン:** モバイルファーストの宇宙テーマ
- **アクセシビリティ:** 色覚多様性に配慮したカラーパレット

## プロジェクト構造

```
src/
├── app/[locale]/     # 多言語ルーティング
├── components/       # Reactコンポーネント
├── constants/        # カラーパレット
├── locales/          # 翻訳ファイル
└── types/            # 型定義
```

## ライセンス

MIT
