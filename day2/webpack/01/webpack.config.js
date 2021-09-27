// commonjs
const path = require("path");

module.export = {
  mode: "development",
  entry: "./main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        // .css->.js
        use: ["style-loader","css-loader"],
      },
    ],
  },
};
