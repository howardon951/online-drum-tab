# 互動式鼓機音序器 (Interactive Drum Sequencer)

使用 Next.js, React 和 Tone.js 實現的互動式鼓機音序器。

## 特點

- 播放/暫停控制
- 可調整 BPM (速度)
- 六種不同的鼓聲
- 16 步序列
- 響應式設計

## 技術堆疊

- **React 19** - 前端 UI 框架
- **Next.js 15** - React 框架
- **TypeScript** - 靜態類型檢查
- **Tone.js** - Web Audio 框架
- **TailwindCSS** - 工具優先的 CSS 框架

## 專案架構

```
app/
├── components/             # UI 組件
│   ├── ControlPanel.tsx    # 播放控制面板
│   ├── DrumGrid.tsx        # 鼓序列網格
│   ├── DrumMachine.tsx     # 主鼓機組件
│   ├── Footer.tsx          # 頁尾信息
│   └── LoadingIndicator.tsx # 加載指示器
├── constants/              # 常量
│   └── drumSounds.ts       # 鼓聲定義
├── hooks/                  # 自定義 React Hooks
│   └── useDrumSequencer.ts # 鼓序列器邏輯
├── lib/                    # 工具函數
│   └── toneUtils.ts        # Tone.js 相關工具
├── types/                  # TypeScript 類型定義
│   └── index.ts            # 通用類型
├── favicon.ico             # 網站圖標
├── globals.css             # 全局 CSS
├── layout.tsx              # 主佈局
└── page.tsx                # 主頁面
```

## 主要組件

- **DrumMachine**: 主要組件，整合所有子組件和邏輯
- **ControlPanel**: 包含播放/暫停、清除和 BPM 控制
- **DrumGrid**: 顯示鼓聲網格和當前步數
- **Footer**: 顯示應用信息

## 自定義 Hooks

- **useDrumSequencer**: 管理鼓序列器的狀態和邏輯

## 工具函數

- **toneUtils.ts**: 提供 Tone.js 相關的工具函數

## 啟動項目

```bash
# 安裝依賴
npm install
# 或
yarn

# 運行開發服務器
npm run dev
# 或
yarn dev
```

訪問 [http://localhost:3000](http://localhost:3000) 查看應用。

## 構建生產版本

```bash
# 構建生產版本
npm run build
# 或
yarn build

# 運行生產版本
npm start
# 或
yarn start
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
