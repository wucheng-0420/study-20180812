const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const outputDirectory = path.join(__dirname, "../dist");
const bundelEsModules = process.env.BUNDEL_ES_MODULES === "true";
const version = require(path.join(__dirname,"../package.json")).version;

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
    filename: `js/main.v${version}.${bundelEsModules ? "mjs" : "js"}`,
    chunkFilename: `js/[name].main.v${version}.${bundelEsModules ? "mjs" : "js"}`,
    // publicPath: "public"
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
    new CopyWebpackPlugin([
      { from: "./public/*", to: outputDirectory, flatten: true }
    ])
  ]
};
