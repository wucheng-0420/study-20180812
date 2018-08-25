"use strict";

const path = require("path");
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
    jsExtension = ".mjs";
  }

  return {
    // If you debug under IE, please use cheap-module-source-map
    devtool: "eval",
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
          test: /\.(m)?js$/,
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
      new ScriptExtHtmlWebpackPlugin({
        custom: [
          {
            test: /.*[^\.es]\.js/,
            attribute: 'nomodule',
            value: true
          }
        ],
        module: /main.*\.mjs/
      })
    ],
    watchOptions: {
      ignored: ["node_modules", "dist"]
    },
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
  };
};
