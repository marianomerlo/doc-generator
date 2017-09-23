const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

module.exports = function $app(
  basicController,
  operaService,
  errorMiddleware
) {
  const app = express();

  // ---
  app.set('view engine', 'pug');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());

  // ---
  app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', operas: operaService.getOperas() });
  });
  app.post('/basic',       basicController.post)

  // ---

  app.use(errorMiddleware);

  return app;
};
