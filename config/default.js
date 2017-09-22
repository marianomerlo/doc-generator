const path = require('path');
const _    = require('lodash');

// ---

const ROOT = path.join(__dirname, '..');

// ---

module.exports = {
  apis: {
    v1: {
      baseUri:     '/api/v1',
      raml:        path.join(ROOT, '/assets/raml/api.v1.raml'),
      jsonMaxSize: '400kb'
    }
  },
  express: {
    host: '0.0.0.0',
    port: _.get(process.env, 'PORT', 8080)
  },
  logger: {
    console: {
      enabled:     true,
      level:       'debug',
      timestamp:   true,
      prettyPrint: true
    },
    syslog: {
      enabled:  false,
      protocol: 'udp4',
      path:     '/dev/log',
      app_name: 'microservice-template',
      facility: 'local6'
    }
  },
  csSiteApi: {
    baseUri:             _.get(process.env, 'CORE_SERVICES_HOST', 'https://devx.anypoint.mulesoft.com/accounts'),
    profileCacheEnabled: JSON.parse(_.get(process.env, 'CORE_SERVICES_PROFILE_CACHE_ENABLED', false))
  }
};
