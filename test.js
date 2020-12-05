const assert = require('assert');
const { initialize, increment } = require('./index');

describe('Multiscale Timeseries', () => {
  describe('increment()', () => {
    let record;
    const date = new Date('2020-10-05T14:32:40.441Z');
    it('should increment a timeseries record', () => {
      record = increment(record, date);
      assert.deepEqual(record, {
        minutes: { '2020-10-05T10:32': 1 },
        hours: { '2020-10-05T10': 1 },
        days: { '2020-10-05': 1 },
        weeks: { '2020-W41': 1 },
        months: { '2020-10': 1 },
        quarters: { '2020-Q4': 1 },
        years: { 2020: 1 },
      });
      record = increment(record, date);
      assert.deepEqual(record, {
        minutes: { '2020-10-05T10:32': 2 },
        hours: { '2020-10-05T10': 2 },
        days: { '2020-10-05': 2 },
        weeks: { '2020-W41': 2 },
        months: { '2020-10': 2 },
        quarters: { '2020-Q4': 2 },
        years: { 2020: 2 },
      });
    });
  });
});
