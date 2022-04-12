/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // export時に「/pages/sample/index.tsx」を「/sample.html」ではなく、
  // 「/sample/index.html」となるようにし、「/sample/」アクセスできるようにする。
  trailingSlash: true,
};

module.exports = nextConfig;
