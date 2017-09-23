const errors = require('http-errors');

module.exports = function errorMiddleware() {
  return function innerErrorMiddleware(err, req, res, next) {
    // Piping the response to the client
    console.error(err);
    if (res.headersSent) {
      // Express handle the error and stop sending data to the client
      return next(err);
    }

    if (!(err instanceof errors.HttpError)) {
      // eslint-disable-next-line no-param-reassign
      err = new errors.InternalServerError();
    }

    return res.status(err.status).json({
      name:    err.name,
      status:  err.status,
      message: err.message,
      details: err.details
    });
  };
};
