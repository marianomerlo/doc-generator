const express = require('express');
const bodyParser = require('body-parser');
const errorCoercing = require('@mulesoft/error-coercing-middleware');

module.exports = function $app(
  apiV1Router,
  bulletTracingMiddleware,
  errorLoggingMiddleware,
  errorMiddleware,
  requestLoggerMiddleware
) {
  const app = express();
  const errorCoercingMiddleware = errorCoercing();

  // ---

  app.use(bulletTracingMiddleware);
  app.use(requestLoggerMiddleware);

  app.use(bodyParser.json());

  // ---

  app.use(apiV1Router);

  // ---

  app.use(errorLoggingMiddleware);
  app.use(errorCoercingMiddleware);
  app.use(errorMiddleware);

  return app;
};
