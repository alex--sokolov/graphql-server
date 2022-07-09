const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const webpack = require('webpack');
const dotenv = require('dotenv')
dotenv.config();

module.exports = {
  mode: "production",
  devtool: false,
  entry: "./src/index.ts",
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: "node-loader",
      }
    ]
  },
  plugins: [
    new ESLintPlugin({extensions: ["ts"]}),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false})
  ],
  resolve: {
    extensions: [".js", ".ts"],
  },
  externals: {
    bufferutil: "bufferutil",
    "utf-8-validate": "utf-8-validate",
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist")
  }
};