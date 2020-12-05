const { timeHour, timeYear } = require('d3-time');
const { increment } = require('./index');

const start = new Date('2020-01-01T00:00:00.000Z');
const end = new Date('2021-01-01T00:00:00.000Z');
const everyHour = timeHour.range(start, end);

console.log('| maxEntries  | Kilobytes |');
console.log('| ----------- | ----------- |');

for (let maxEntries = 16; maxEntries < 10000; maxEntries *= 2) {
  const record = everyHour.reduce(
    (accumulator, date) => increment(accumulator, date, maxEntries),
    {}
  );
  const kilobytes = (data) => Math.ceil(JSON.stringify(data).length / 1024);
  console.log(`|${maxEntries}|${kilobytes(record)} KB|`);
}
