const bluebird         = require('bluebird');
const supertest        = require('supertest');
const containerFactory = require('../support/testContainerFactory');

const container = containerFactory.createContainer();

describe('statusController', container.describe(() => {
  let request;

  beforeEach(() => {
    // eslint-disable-next-line prefer-arrow-callback
    container.resolve(function init(app) {
      request = supertest(app);
    });
  });

  describe('GET /api/v1/ping', () => {
    it('should respond with correct status and body', () => (
      bluebird.fromNode((callback) => {
        request.get('/api/v1/ping')
          .send()
          .expect(200, { status: 'ok' })
          .end(callback)
        ;
      })
    ));
  });

  describe('GET /api/v1/health', () => {
    it('should respond with correct status and body', () => (
      bluebird.fromNode((callback) => {
        request.get('/api/v1/health')
          .send()
          .expect(200, { status: 'ok' })
          .end(callback)
        ;
      })
    ));
  });
}));
