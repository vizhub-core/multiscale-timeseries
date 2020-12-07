# multiscale-timeseries
Small utility for maintaining multi-scale timeseries records.

Why? The problem at hand is to record analytics for various events such as page views, user logins, and usage of features for a SAAS product. This library was created out of the need for a lightweight solution that has the following properties:
 * Represent multiple levels of detail including hours, days, weeks, months, quarters, and years.
 * Age out data to maintain an upper bound on storage for each timeseries record.
 * Persist the timeseries as JSON.

## Example Usage

```js
const { increment } = require('multiscale-timeseries');

const date = new Date('2020-10-05T14:32:40.441Z');
const maxEntries = 1,000; // Max entries governing age-out for each interval.
const record = {}; // Can be an empty object or existing record.

// This is the main call - increment a timeseries record based on a date.
const record = increment(record, date, maxEntries);

// The result looks like this:
assert.deepEqual(record, {
  minutes: { '2020-10-05T10:32': 1 },
  hours: { '2020-10-05T10': 1 },
  days: { '2020-10-05': 1 },
  weeks: { '2020-W41': 1 },
  months: { '2020-10': 1 },
  quarters: { '2020-Q4': 1 },
  years: { 2020: 1 },
  all: { all: 1 },
});
```

Once a record exists, you can increment it again and again. After accumulating `maxEntries` entries for any given interval, the oldest of the entries are deleted.  For example `hours` entries would be the first to age out.

After incrementing many times, you end up with a record that looks like this:

```js
const date = new Date('2020-12-06T14:32:40.441Z');
const maxEntries = 2; // Low value to demonstrate age-out.

record = increment(record, date, maxEntries);

assert.deepEqual(record, {
  days: { '2020-12-05': 2, '2020-12-06': 1 },
  hours: { '2020-12-05T09': 2, '2020-12-06T09': 1 },
  minutes: { '2020-12-05T09:32': 2, '2020-12-06T09:32': 1 },
  months: { '2020-10': 2, '2020-12': 3 },
  quarters: { '2020-Q4': 5 },
  weeks: { '2020-W41': 2, '2020-W49': 3 },
  years: { 2020: 5 },
  all: { all: 5 },
});
```

## What should maxEntries be?

The point of this library is to have an upper bound on the size of a multiscale timeseries record, regardless of how many times it is incremented. It begs the question, how does `maxEntries` relate to the size in Kilobytes of the record stored on disk?

A script (`sizeEstimator.js` in this repo) was developed that simulates updating a timeseries record every hour for one year, using various values for `maxEntries`, and estimating the size of the output as stringified JSON. Here is the output of that script:

| `maxEntries` | Kilobytes |
| ----------- | ----------- |
|10|2 KB|
|20|2 KB|
|30|3 KB|
|40|4 KB|
|50|4 KB|
|60|5 KB|
|70|5 KB|
|80|6 KB|
|90|6 KB|
|100|7 KB|
|150|10 KB|
|200|12 KB|
|250|15 KB|
|300|18 KB|
|350|20 KB|
|400|23 KB|
|450|25 KB|
|500|26 KB|
|600|30 KB|
|700|34 KB|
|800|38 KB|
|900|42 KB|
|1000|45 KB|
|1500|65 KB|
|2000|84 KB|

## FAQ
 * Why not just use Google Analytics? With `multiscale-timeseries` and any lightweight data store, you can roll your own analytics and _have full access to the data_, so you can present it in your product directly. Other than that, Google Analytics is a perfectly good solution.
