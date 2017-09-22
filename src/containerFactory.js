const dependable = require('dependable');
const path = require('path');
const http       = require('http');
const superagent = require('superagent');

const authComponentsFactory = require('@mulesoft/exchange-auth-components');
const loggerHelper          = require('@mulesoft/logger-helper');

function createContainer() {
  const container = dependable.container();
  const entries   = [
    'app.js',
    'config.js',
    'controllers',
    'middlewares',
    'routers',
    'services',
    'utils'
  ];

  // eslint-disable-next-line prefer-arrow-callback
  container.register('logger', function logger(config) {
    return loggerHelper.logger(config.logger);
  });

  // eslint-disable-next-line prefer-arrow-callback
  container.register('bulletTracingMiddleware', function bulletTracingMiddleware() {
    return loggerHelper.bulletTracingMiddleware;
  });

  // eslint-disable-next-line prefer-arrow-callback
  container.register('requestLoggerMiddleware', function requestLoggerMiddleware(logger) {
    return loggerHelper.requestLoggerMiddleware(logger);
  });

  // eslint-disable-next-line prefer-arrow-callback
  container.register('errorLoggingMiddleware', function errorLoggingMiddleware(logger) {
    return loggerHelper.errorLoggingMiddleware(logger);
  });

  // eslint-disable-next-line prefer-arrow-callback
  container.register('authComponents', function authComponents(config, logger) {
    return authComponentsFactory(config, logger);
  });

  // eslint-disable-next-line prefer-arrow-callback
  container.register('authzMiddleware', function authzMiddleware(authComponents) {
    return authComponents.authzMiddleware;
  });

  // eslint-disable-next-line prefer-arrow-callback
  container.register('bearerAuthnMiddleware', function bearerAuthnMiddleware(authComponents) {
    return authComponents.bearerAuthnMiddleware;
  });

  // eslint-disable-next-line prefer-arrow-callback
  container.register('csGateway', function csGateway(authComponents) {
    return authComponents.csGateway;
  });

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
