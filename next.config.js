const { join } = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const WebpackLicensePlugin = require("webpack-license-plugin");
const {
  CssMinimizerPlugin,
} = require("next/dist/build/webpack/plugins/css-minimizer-plugin");

// 再配布を伴う使用を許可するライセンスをホワイストリスト方式で管理する。
// リストにないライセンスの依存パッケージを追加する際は、
// そのライセンスにおける再配布のライセンス表示方法が問題ないか確認してリストを更新する
// ライセンス名はSPDX License Identifierを用いる https://spdx.org/licenses/
const acceptableLicenses = ["MIT"];

// ライセンス表示のための情報が足りないがnpm run dev時にしか使われないため除外しておきたいものを設定する。
const excludedPackages = ["@next/react-refresh-utils"];

const LICENSE_LIST_URL =
  "https://cybozu.github.io/productivity-news/licenses.txt";

const basePath = process.env.BASE_PATH || "";

/** @type {import('next/dist/server/config-shared').NextJsWebpackConfig} */
const webpackConfig = (config, { webpack }) => {
  // Next.jsのterser-webpack-pluginの設定ではヘッダーコメントのライセンス表示を消してしまうためカスタマイズする。
  //
  // ただし、terser-webpack-pluginの設定を部分的に書き換えることはできない。
  // カスタマイズするにはconfig.optimization.minimizerを差し替える必要がある。
  // minimizerにはterser-webpack-pluginとcss-minimizer-webpack-pluginが設定されている。
  // https://github.com/vercel/next.js/blob/v12.1.4/packages/next/build/webpack-config.ts#L1070-L1102
  //
  // css-minimizer-webpack-pluginはヘッダーコメントのライセンス表示を削除しないため、オブジェクトをそのまま流用する。
  // CSSの場合、JavaScriptの依存ツリーは再配布されないため、
  // このプロジェクトではTailwind CSSのライセンスが表示されていればよい。
  const cssMinimizerPlugin = config.optimization.minimizer[1];

  // Next.js同梱版のterser-webpack-plugin(next/dist/build/webpack/plugins/terser-webpack-plugin/src/index)では
  // extractComments周りの設定が動かないため、別途インストールしたものを用いる。
  //
  // Next.js側と同等のterserOptionsの値を設定しておく。
  // https://github.com/vercel/next.js/blob/v12.1.4/packages/next/build/webpack-config.ts#L668-L687
  // 本家のterser-webpack-pluginではいくつかオプションが変わっているため置き換えている。
  /** @type {import('terser').MinifyOptions} */
  const terserOptions = {
    parse: {
      ecma: 2017, // ECMA 8 = 2017
    },
    compress: {
      ecma: 5,
      // warnings: false, // warningsは存在しない
      comparisons: false,
      inline: 2,
    },
    mangle: { safari10: true },
    // outputはdeprecatedとなりformatオプションになった
    format: {
      ecma: 5,
      safari10: true,
      comments: false,
      ascii_only: true,
    },
  };
  const terserPlugin = new TerserPlugin({
    extractComments: {
      // webpack-license-pluginが出力するライセンス表示へのURLをヘッダーコメントに挿入する。
      banner: `For license information please see ${LICENSE_LIST_URL}`,
      // webpack-license-pluginが出力したライセンス表示を使うため、.next直下に出力して公開しない。
      filename: "/extracted-license-headers-by-terser.txt",
    },
    terserOptions,
  });
  config.optimization.minimizer = [terserPlugin, cssMinimizerPlugin];

  // ライセンス表示ファイルを出力する。
  config.plugins.push(
    // webpack-license-pluginはpackage.jsonやpackage-lock.jsonから依存を辿るのではなく、
    // webpackの出力で使用されているパッケージを対象とする。
    new WebpackLicensePlugin({
      // 確認済みライセンス以外が含まれていないかチェックする。
      unacceptableLicenseTest: (identifier) =>
        !acceptableLicenses.includes(identifier),

      // 特定のパッケージを除外する。
      excludedPackageTest: (name, _version) => excludedPackages.includes(name),

      // 人間が読みやすいテキスト形式で出力する。
      // デフォルトのJSON形式のファイルは.next直下に出力されるため、そのままにして公開しない。
      additionalFiles: {
        [join("..", "public", "licenses.txt")]: (packages) => {
          const keys = [
            "name",
            "version",
            "author",
            "repository",
            "source",
            "license",
          ];

          return packages
            .map((pkg) => {
              const lines = [];
              keys.forEach((key) => {
                pkg[key] && lines.push(`${key}: ${pkg[key]}`);
              });
              let text = lines.join("\n");

              if (!pkg.licenseText) {
                throw new Error(`ライセンス本文が取得できません: ${pkg.name}`);
              }

              text += `\n\n${pkg.licenseText}`;
              return text;
            })
            .join("\n-----\n\n");
        },
      },
    })
  );

  return config;
};

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

  webpack: webpackConfig,
};

module.exports = nextConfig;
