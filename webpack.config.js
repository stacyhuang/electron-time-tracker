var webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "bundle.js",
    path: __dirname + "/build",
    publicPath: "/"
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: "babel-loader",
      query: { presets: ["react"]},
      exclude: /node_modules/
    },{
      test: /\.scss$/,
      loader: "style-loader!css-loader!sass-loader"
    }]
  }
};
