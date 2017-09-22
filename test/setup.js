const bluebird        = require('bluebird');
const chai            = require('chai');
const chaiAsPromised  = require('chai-as-promised');
const sinon           = require('sinon');
const sinonChai       = require('sinon-chai');
const sinonAsPromised = require('sinon-as-promised');

// ---

sinonAsPromised(bluebird);
global.should = chai.should();

// ---

chai.use(chaiAsPromised);
chai.use(sinonChai);

// ---

beforeEach(function setupTest() {
  this.sinon = sinon.sandbox.create();
});

afterEach(function closeTest() {
  this.sinon.restore();
});
