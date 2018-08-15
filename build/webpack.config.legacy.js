const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const outputDirectory = path.join(__dirname, "../dist");
const version = require(path.join(__dirname, "../package.json")).version;

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: outputDirectory,
    filename: `js/main.v${version}-[hash:8].js`,
    chunkFilename: `js/[name].main.v${version}-[hash:8].js`
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
            presets: ["@babel/preset-env"],
            plugins: ["@babel/syntax-dynamic-import"]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], { root: path.join(__dirname, "../") }),
    new HtmlWebpackPlugin({
      template: "public/index.html"
    }),
    new ScriptExtHtmlWebpackPlugin({
      custom: [
        {
          test: /main.*\.js$/,
          attribute: "nomodule"
        }
      ]
    })
    // new CopyWebpackPlugin([
    //   { from: "./public/*", to: outputDirectory, flatten: true }
    // ])
  ]
};
