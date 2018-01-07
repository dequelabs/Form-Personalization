'use strict';

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    content: './src/content/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new CopyWebpackPlugin([
      // the chrome extension manifest
      {
        from: path.join(__dirname, './src/manifest.json'),
        to: path.resolve(__dirname, './dist')
      }
    ])
  ]
};
