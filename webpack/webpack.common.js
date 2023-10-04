const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
  entry: {
    "../contentScript": path.join(srcDir, "contentScriptRoot.ts"),
  },
  output: {
    path: path.join(__dirname, "../dist/icons"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png)$/i,
        use: "file-loader",
      },
    ],
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: "../", context: "public" }],
      options: {},
    }),
  ],
};
