const { timeFormat } = require('d3-time-format');

const initialize = () => ({
  days: {},
});

const getDay = timeFormat('%Y-%m-%d');
//const getDay = timeFormat('%Y-%m-%dT%H:%M');

const increment = (record, date) => {
  const day = getDay(date);
  return {
    days: { ...record.days, [day]: (record.days[day] || 0) + 1 },
  };
};

module.exports = { initialize, increment };
