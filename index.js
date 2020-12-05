const { timeFormat } = require('d3-time-format');

const initialize = () => ({});

//const getMonth = timeFormat('%Y-%m-%dT%H:%M');
const getDay = timeFormat('%Y-%m-%d');
const getWeek = timeFormat('%Y-W%V');
const getMonth = timeFormat('%Y-%m');
const getYear = timeFormat('%Y');

const increment = (record = {}, date) => {
  const day = getDay(date);
  const week = getWeek(date);
  return {
    days: {
      ...record.days,
      [day]: ((record.days && record.days[day]) || 0) + 1,
    },
    weeks: {
      ...record.weeks,
      [week]: ((record.weeks && record.weeks[week]) || 0) + 1,
    },
  };
};

module.exports = { initialize, increment };
