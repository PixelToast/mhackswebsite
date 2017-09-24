var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

const HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, "js"),
  devtool: debug ? "inline-sourcemap" : false,
  entry: {
    index: "./index.js",
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: ['transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
        test: /\.html$/,
        loader: "raw-loader"
      }
    ]
  },
  output: {
    path: __dirname + "/build",
    filename: "[name].js"
  },
  devServer: {
    publicPath: "/build/"
  },
  plugins: true ? [] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
