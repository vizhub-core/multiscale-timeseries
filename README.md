# multiscale-timeseries
Small utility for maintaining multi-scale timeseries records.

Why? The problem at hand is to record analytics for various events such as page views, user logins, and usage of features for a SAAS product. This library was created out of the need for a lightweight solution that has the following properties:
 * Represent multiple levels of detail including hours, days, weeks, months, quarters, and years.
 * Age out data to maintain an upper bound on storage for each timeseries record.
 * Persist the timeseries as JSON.

## Example Usage

```js
const date = new Date('2020-10-05T14:32:40.441Z');
const maxEntries = 1,000; // Max entries governing age-out for each interval.
const record = {};

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
});
```

Once a record exists, you can increment it again and again. After accumulating `maxEntries` entries for any given interval (`hours` for example would max out first), the oldest of the entries are deleted.

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
});
```

## What should maxEntries be?

The point of this library is to have an upper bound on the size of a multiscale timeseries record, regardless of how many times it is incremented. It begs the question, how does `maxEntries` relate to the size in Kilobytes of the record stored on disk?

A script (`sizeEstimator.js` in this repo) was developed that simulates updating a timeseries record every hour for one year, using various values for `maxEntries`, and estimating the size of the output as stringified JSON. Here is the output of that script:

| `maxEntries` | Kilobytes |
| ----------- | ----------- |
|16|2 KB|
|32|3 KB|
|64|5 KB|
|128|9 KB|
|256|15 KB|
|512|27 KB|
|1024|46 KB|
|2048|85 KB|
|4096|163 KB|
|8192|319 KB|

