const dependable = require('dependable');
const path = require('path');
const http       = require('http');
const superagent = require('superagent');

function createContainer() {
  const container = dependable.container();
  const entries   = [
    'app.js',
    'config.js',
    'controllers',
    'middlewares',
    'services',
    'utils'
  ];

  // eslint-disable-next-line prefer-arrow-callback
  container.register('superagent', function superagentInit() { return superagent; });

  // eslint-disable-next-line prefer-arrow-callback
  container.register('http', function httpInit() { return http; });

  entries.forEach((entry) => container.load(path.join(__dirname, entry)));
  return container;
}

module.exports = {
  createContainer
};
