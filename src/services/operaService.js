const bluebird = require('bluebird');

const operas = [
  {
    title: 'Turandot',
    description: 'Tiene un area que se llama Nessun Dorma'
  },
  {
    title: 'Traviata',
    description: 'Tiene un area que es un brindis donde estan todos borrachos'
  }
]
// ---

module.exports = function basicService() {
  return {
    getOperas
  };

  // ---

  /**
   * Get
   *
   * @returns {Promise}
   */
  function getOperas() {
    return operas
  };
};
