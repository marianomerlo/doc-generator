const errors               = require('http-errors');

const testContainerFactory = require('../../support/testContainerFactory');

// ---

const container = testContainerFactory.createContainer();

// ---

describe('errorMiddleware', container.describe(() => {
  let errorMiddleware;
  let err;
  let req;
  let res;
  let next;

  beforeEach(function initErrorMiddleware() {
    errorMiddleware = this.container.get('errorMiddleware');
    req             = {};
    res             = createRes(this.sinon);
    next            = this.sinon.stub();
  });

  describe('when headers already sent', () => {
    beforeEach(() => {
      res.headersSent = true;
      err = new Error('Not implemented');
      err.details = {
        method: 'autoscale'
      };
      errorMiddleware(err, req, res, next);
    });

    it('should not set response status', () => res.status.should.have.not.been.called);

    it('should not send response', () => res.json.should.have.not.been.called);

    it('should forward error to next', () => next.should.have.been.calledWithExactly(err));
  });

  describe('given client error', () => {
    beforeEach(() => {
      err = new errors.BadRequest('Oops!');
      err.details = {
        systemId: 'UNKNOWN'
      };
    });

    it('should respond according to its properties', () => {
      errorMiddleware(err, req, res, next);

      res.status.should.have.been.calledWith(400);
      res.json.should.have.been.calledWith({
        name:    'BadRequestError',
        status:  400,
        message: 'Oops!',
        details: {
          systemId: 'UNKNOWN'
        }
      });
    });
  });

  describe('given non client error', () => {
    beforeEach(() => {
      err = new Error('Oops!');
    });

    it('should respond according to internal server error properties', () => {
      errorMiddleware(err, req, res, next);

      res.status.should.have.been.calledWith(500);
      res.json.should.have.been.calledWith({
        name:    'InternalServerError',
        status:  500,
        message: 'Internal Server Error',
        details: undefined
      });
    });
  });

  // ---

  function createRes(sinon) {
    return {
      status: sinon.stub().returnsThis(),
      json:   sinon.stub().returnsThis()
    };
  }
}));
