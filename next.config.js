const basePath = process.env.BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // export時に「/pages/sample/index.tsx」を「/sample.html」ではなく、
  // 「/sample/index.html」となるようにし、「/sample/」アクセスできるようにする。
  trailingSlash: true,

  // リポジトリ単位のGitHub Pagesはルートが「/」ではなくリポジトリ名になる。
  // ローカル開発での利便性を考慮して環境変数で差し替え可能にする。
  assetPrefix: basePath,
  basePath,
};

module.exports = nextConfig;
