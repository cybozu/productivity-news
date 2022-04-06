module.exports = {
  root: true,
  plugins: ["import"],
  extends: ["next/core-web-vitals", "prettier"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css"],
      },
    },
  },
  rules: {
    "import/order": "error",
  },
};
