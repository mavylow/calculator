const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  module: {
    rules: [
      { test: /\.svg$/, use: "svg-inline-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.js$/, use: "babel-loader" },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main_bundle.js",
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "development",
};
