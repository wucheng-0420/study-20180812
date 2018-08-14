const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const outputDirectory = path.join(__dirname, "../dist");
const bundelEsModules = process.env.BUNDEL_ES_MODULES === "true";
const version = require(path.join(__dirname, "../package.json")).version;

const presets = [];

if (!bundelEsModules) {
  presets.push([
    "@babel/preset-env",
    {
      targets: {
        browsers: ["Chrome 28"]
      }
    }
  ]);
} else {
  presets.push([
    "@babel/preset-env",
    {
      targets: {
        browsers: ["Chrome 61"]
      }
    }
  ]);
}

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: outputDirectory,
    filename: `js/main.v${version}-[hash:8].${bundelEsModules ? "mjs" : "js"}`,
    chunkFilename: `js/[name].main.v${version}-[hash:8].${
      bundelEsModules ? "mjs" : "js"
    }`
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
            presets,
            plugins: ["@babel/syntax-dynamic-import"]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], { root: path.join(__dirname, "../") }),
    new HtmlWebpackPlugin({
      title: "demo",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        "http-equiv": "X-UA-Compatible",
        content: "IE=edge"
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      // custom: [{
      //   test: /main.*\.js$/,
      //   attribute: 'type',
      //   value: 'text/javascript'
      // }],
      module: /main.*\.mjs/
    })
    // new CopyWebpackPlugin([
    //   { from: "./public/*", to: outputDirectory, flatten: true }
    // ])
  ]
};
