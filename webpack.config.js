/* eslint-disable */

let path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: path.join(__dirname, 'src'),
        loaders: ['babel-loader?presets[]=es2015', 'eslint-loader'] }
    ]
  }
};