const expressify = require('expressify');

// TODO: This module provides an example of a controller. Replace it with your actual controller/s
module.exports = function basicController(
  basicService
) {
  return expressify({
    get
  });

  // ---

  /**
   * It performs a get.
   *
   * @returns {Promise}
   */
  function get(req, res) {
    return basicService.get()
      .then((response) => res.json(response));
  }
};
