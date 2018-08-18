"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const outputDirectory = path.join(__dirname, "../dist");
const { name: title, version } = require(path.join(__dirname, "../package.json"));

module.exports = (env, argv) => {
  env = env || {};
  let jsExtension = ".js";
  const envOptions = {
    useBuiltIns: "usage",
  };
  if (env.bundle === "esmodules") {
    envOptions.targets = { esmodules: true };
    jsExtension = ".es.js";
  }

  return {
    mode: "development",
    entry: "./src/index.js",
    output: {
      filename: `js/main.v${version}-[hash:8]${jsExtension}`,
      chunkFilename: `js/[name].v${version}-[hash:8]${jsExtension}`,
      path: outputDirectory,
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", envOptions]
              ],
              plugins: [
                "@babel/plugin-proposal-export-default-from",
                "@babel/plugin-proposal-export-namespace-from",
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                "@babel/plugin-syntax-dynamic-import",
                ["@babel/plugin-proposal-class-properties", { loose: true }],
                "@babel/plugin-proposal-optional-chaining",
                "transform-modern-regexp"
              ]
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title,
        template: "public/index.html"
      }),
      new ScriptExtHtmlWebpackPlugin({
        custom: [
          {
            test: /.*[^\.es]\.js/,
            attribute: 'nomodule',
            value: true
          }
        ],
        module: /main.*\.es\.js/
      })
    ],
    watchOptions: {
      ignored: ["node_modules", "dist"]
    }
  };
};
