const bluebird = require('bluebird');

// ---

module.exports = function basicService() {
  return {
    get
  };

  // ---

  /**
   * Get
   *
   * @returns {Promise}
   */
  function get() {
    // TODO: Do something useful.
    return bluebird.resolve({
      method: 'get'
    });
  }
};
