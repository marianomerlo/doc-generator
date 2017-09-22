const expressify = require('expressify');

module.exports = function statusController() {
  return expressify({
    ping,
    health
  });

  // ---

  function ping(req, res) {
    res.json({ status: 'ok' });
  }

  function health(req, res) {
    res.json({ status: 'ok' });
  }
};
