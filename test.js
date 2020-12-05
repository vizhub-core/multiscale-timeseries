const assert = require('assert');
const { initialize } = require('./index');

describe('Initialization', function () {
  describe('#indexOf()', function () {
    it('should initialize a timeseries record', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
