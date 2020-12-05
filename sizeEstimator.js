const { timeHour, timeYear } = require('d3-time');
const { increment } = require('./index');

const start = new Date('2020-01-01T00:00:00.000Z');
const end = new Date('2021-01-01T00:00:00.000Z');
const everyHour = timeHour.range(start, end);

console.log('| maxEntries  | Kilobytes |');
console.log('| ----------- | ----------- |');

[
  10,
  20,
  30,
  40,
  50,
  60,
  70,
  80,
  90,
  100,
  150,
  200,
  250,
  300,
  350,
  400,
  450,
  500,
  600,
  700,
  800,
  900,
  1000,
  1500,
  2000,
].map((maxEntries) => {
  const record = everyHour.reduce(
    (accumulator, date) => increment(accumulator, date, maxEntries),
    {}
  );
  const kilobytes = (data) => Math.ceil(JSON.stringify(data).length / 1024);
  console.log(`|${maxEntries}|${kilobytes(record)} KB|`);
});
