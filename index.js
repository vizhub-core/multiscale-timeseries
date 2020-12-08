const { utcFormat } = require('d3-time-format');

const intervals = [
  { property: 'minutes', format: utcFormat('%Y-%m-%dT%H:%M') },
  { property: 'hours', format: utcFormat('%Y-%m-%dT%H') },
  { property: 'days', format: utcFormat('%Y-%m-%d') },
  { property: 'weeks', format: utcFormat('%Y-W%V') },
  { property: 'months', format: utcFormat('%Y-%m') },
  { property: 'quarters', format: utcFormat('%Y-Q%q') },
  { property: 'years', format: utcFormat('%Y') },
  { property: 'all', format: () => 'all' },
];

const increment = (record = {}, date, maxEntries) =>
  intervals.reduce((accumulator, { property, format }) => {
    // Derive the key for this particular date and interval.
    const key = format(date);

    // Increment entries.
    const newRecordAtProperty = {
      ...record[property],
      [key]: ((record[property] && record[property][key]) || 0) + 1,
    };

    // Age out old entries.
    const keys = Object.keys(newRecordAtProperty);
    if (keys.length > maxEntries) {
      delete newRecordAtProperty[keys[0]];
    }

    // Update new record at property.
    return { ...accumulator, [property]: newRecordAtProperty };
  }, record);

module.exports = { increment };
