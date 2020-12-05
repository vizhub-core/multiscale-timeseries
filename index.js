const { timeFormat } = require('d3-time-format');

const intervals = [
  { property: 'minutes', format: timeFormat('%Y-%m-%dT%H:%M') },
  { property: 'hours', format: timeFormat('%Y-%m-%dT%H') },
  { property: 'days', format: timeFormat('%Y-%m-%d') },
  { property: 'weeks', format: timeFormat('%Y-W%V') },
  { property: 'months', format: timeFormat('%Y-%m') },
  { property: 'quarters', format: timeFormat('%Y-Q%q') },
  { property: 'years', format: timeFormat('%Y') },
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
