const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const outputDirectory = path.join(__dirname, "../dist");
const bundelEsModules = process.env.BUNDEL_ES_MODULES === "true";

const presets = [];

if(!bundelEsModules){
    presets.push([
        "@babel/preset-env",
        {
          targets: {
            browsers: [
                "Chrome 28"
            ]
          }
        }
    ])
} else {
    presets.push([
    "@babel/preset-env",
    {
      targets: {
        browsers: [
            "Chrome 61"
        ]
      }
    }
  ]);
}

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: outputDirectory,
    filename: `js/main.${bundelEsModules ? "mjs" : "js"}`
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
            presets
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
