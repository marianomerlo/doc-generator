const express = require('express');
const ospreyMiddleware = require('osprey-middleware');

module.exports = function apiV1Router(
  config,
  basicController,
  statusController
) {
  // eslint-disable-next-line new-cap
  return express.Router().use(config.apis.v1.baseUri, express.Router()
    // ---
    // OSPREY
    // ---
    .use(ospreyMiddleware(config.apis.v1.raml, {
      disableErrorInterception: true,
      server:                   {
        limit: config.apis.v1.jsonMaxSize
      }
    }))

    // Ping
     .get('/ping', statusController.ping)

    // Health
     .get('/health', statusController.health)

    // ---
    // GENERAL
    // ---
    .use(initContext)

    // ---
    // ROUTES
    // ---

    // Basic endpoint
      .get('/basic',       basicController.get)
  );
};

function initContext(req, res, next) {
  // eslint-disable-next-line no-param-reassign
  req.context = {};
  next();
}
