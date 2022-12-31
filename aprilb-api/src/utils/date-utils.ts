import _ from 'lodash';

/**
 * Method to get year ranges from X to Y.
 * @param from From year.
 * @param to To year.
 * @returns Numeric array with year ranges.
 */
// TODO: Needs testing, check if _.range works.
// TODO: Rename getDateRanges to getYearRanges.
const getDateRanges = (from: number, to: number) => {
  // From cannot be negative.
  // From cannot be bigger than To.
  // To cannot be negative.
  if (from < 0 || to < 0 || from > to) {
    return [];
  }

  return _.range(from, to);
};

/**
 * Method to return current date.
 * @returns Today's date.
 */
const getCurrentDate = () => {
  const today = new Date();
  let offset = today.getTimezoneOffset();
  offset = Math.abs(offset / 60);
  today.setHours(today.getHours() + offset);

  return today;
};

export { getDateRanges, getCurrentDate };
