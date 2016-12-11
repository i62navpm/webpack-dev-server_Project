/* eslint-disable */

let webpackConfig = require('./webpack.config.js');

// Karma configuration
module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS',],
    frameworks: ['jasmine',],
    singleRun: true,
    client: {
      captureConsole: false
    },
    files: [
      // all files ending in "_spec"
      { pattern: 'webpack.tests.js', watched: false }
      // each file acts as entry point for the webpack configuration
    ],

    preprocessors: {
      // add webpack as preprocessor
      'webpack.tests.js': ['webpack'],
    },

    webpack: {
      module: {
        loaders: [
          { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015' }
        ]
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    }
  });
};