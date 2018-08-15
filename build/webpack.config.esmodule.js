const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const outputDirectory = path.join(__dirname, "../dist");
const outputJsDirectory = path.join(__dirname, "../dist/js");
const version = require(path.join(__dirname, "../package.json")).version;

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: outputDirectory,
    filename: `js/main.v${version}-[hash:8].mjs`,
    chunkFilename: `js/[name].main.v${version}-[hash:8].mjs`
    // publicPath: 'public'
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
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["Chrome 61"]
                  }
                }
              ]
            ],
            plugins: ["@babel/syntax-dynamic-import"]
          }
        }
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(["dist"], { root: path.join(__dirname, "../") }),
    // new CopyWebpackPlugin([
    //   { from: "./dist/temp/*.js", to: outputJsDirectory}
    // ]),
    new HtmlWebpackPlugin({
      title: "demo",
      template: "dist/index.html",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        "http-equiv": "X-UA-Compatible",
        content: "IE=edge"
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      module: /main.*\.mjs/
    })
  ]
};
