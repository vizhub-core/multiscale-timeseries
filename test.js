const assert = require('assert');
const { initialize, increment } = require('./index');

describe('Multiscale Timeseries', () => {
  describe('initialize()', () => {
    it('should initialize a timeseries record', () => {
      assert.deepEqual(initialize(), { days: {} });
    });
  });
  describe('increment()', () => {
    let record = initialize();
    const date = new Date('2020-10-05T14:32:40.441Z');
    it('should increment a timeseries record', () => {
      record = increment(record, date);
      assert.deepEqual(record, { days: { '2020-10-05': 1 } });
      record = increment(record, date);
      assert.deepEqual(record, { days: { '2020-10-05': 2 } });
    });
  });
});
