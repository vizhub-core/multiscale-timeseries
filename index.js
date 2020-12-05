const { timeFormat } = require('d3-time-format');

const initialize = () => ({});

//const getMonth = timeFormat('%Y-%m-%dT%H:%M');
const getDay = timeFormat('%Y-%m-%d');
const getWeek = timeFormat('%Y-W%V');
const getMonth = timeFormat('%Y-%m');
const getYear = timeFormat('%Y');

const intervals = [
  { property: 'days', format: timeFormat('%Y-%m-%d') },
  { property: 'weeks', format: timeFormat('%Y-W%V') },
];

const increment = (record = {}, date) => {
  return intervals.reduce((accumulator, { property, format }) => {
    const key = format(date);
    return {
      ...accumulator,
      [property]: {
        ...record[property],
        [key]: ((record[property] && record[property][key]) || 0) + 1,
      },
    };
  }, record);
};
module.exports = { initialize, increment };
