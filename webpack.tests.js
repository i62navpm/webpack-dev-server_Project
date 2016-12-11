/* eslint-disable */

require('babel-polyfill');

var context = require.context('./src', true, /_spec\.js$/);
context.keys().forEach(context);