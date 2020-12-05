const assert = require('assert');
const { initialize, increment } = require('./index');

describe('Multiscale Timeseries', () => {
  describe('increment()', () => {
    let record;
    it('should increment a timeseries record', () => {
      const date = new Date('2020-10-05T14:32:40.441Z');
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
    it('should increment a timeseries record for another date', () => {
      const date = new Date('2020-12-05T14:32:40.441Z');
      record = increment(record, date);
      assert.deepEqual(record, {
        days: { '2020-10-05': 2, '2020-12-05': 1 },
        hours: { '2020-10-05T10': 2, '2020-12-05T09': 1 },
        minutes: { '2020-10-05T10:32': 2, '2020-12-05T09:32': 1 },
        months: { '2020-10': 2, '2020-12': 1 },
        quarters: { '2020-Q4': 3 },
        weeks: { '2020-W41': 2, '2020-W49': 1 },
        years: { 2020: 3 },
      });
      record = increment(record, date);
      assert.deepEqual(record, {
        days: { '2020-10-05': 2, '2020-12-05': 2 },
        hours: { '2020-10-05T10': 2, '2020-12-05T09': 2 },
        minutes: { '2020-10-05T10:32': 2, '2020-12-05T09:32': 2 },
        months: { '2020-10': 2, '2020-12': 2 },
        quarters: { '2020-Q4': 4 },
        weeks: { '2020-W41': 2, '2020-W49': 2 },
        years: { 2020: 4 },
      });
    });
    it('should age out old entries', () => {
      const date = new Date('2020-12-06T14:32:40.441Z');
      record = increment(record, date, 2);
      assert.deepEqual(record, {
        days: { '2020-12-05': 2, '2020-12-06': 1 },
        hours: { '2020-12-05T09': 2, '2020-12-06T09': 1 },
        minutes: { '2020-12-05T09:32': 2, '2020-12-06T09:32': 1 },
        months: { '2020-10': 2, '2020-12': 3 },
        quarters: { '2020-Q4': 5 },
        weeks: { '2020-W41': 2, '2020-W49': 3 },
        years: { 2020: 5 },
      });
    });
  });
});
