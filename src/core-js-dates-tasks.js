/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  return new Date(date).getTime();
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  const hours = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
  const minutes =
    date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  const seconds =
    date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`;
  return `${hours}:${minutes}:${seconds}`;
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wensday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return days[new Date(date).getDay()];
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  const initDay = new Date(date);
  const dayOfWeek = initDay.getDay();
  let dayDelta = 5 - dayOfWeek;
  if (dayDelta === -1) {
    dayDelta = 6;
  }
  if (dayDelta === 0) {
    dayDelta = 7;
  }
  const resultDay = initDay.getDate() + dayDelta;
  return new Date(initDay.setDate(resultDay));
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  const date = new Date(year, month + 1, 1);
  date.setUTCDate(0);
  return date.getUTCDate();
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const delta = new Date(dateEnd) - new Date(dateStart);
  const days = delta / 1000 / 60 / 60 / 24;
  return days + 1;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  const start = new Date(period.start).getTime();
  const end = new Date(period.end).getTime();
  const dateCheck = new Date(date).getTime();
  let result = true;
  if (dateCheck < start) {
    result = false;
  } else if (dateCheck > end) {
    result = false;
  }
  return result;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const dateFormat = new Date(date);
  const year = dateFormat.getUTCFullYear();
  const month = dateFormat.getUTCMonth() + 1;
  const data = dateFormat.getUTCDate();
  const timeDay = dateFormat.getUTCHours() >= 12 ? 'PM' : 'AM';
  const hours =
    dateFormat.getUTCHours() > 12
      ? dateFormat.getUTCHours() - 12
      : dateFormat.getUTCHours();
  const minutes =
    dateFormat.getUTCMinutes() < 10
      ? `0${dateFormat.getUTCMinutes()}`
      : dateFormat.getUTCMinutes();
  const seconds =
    dateFormat.getUTCSeconds() < 10
      ? `0${dateFormat.getUTCSeconds()}`
      : dateFormat.getUTCSeconds();
  return `${month}/${data}/${year}, ${hours}:${minutes}:${seconds} ${timeDay}`;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const result = [];
  for (let i = 1; i <= daysInMonth; i += 1) {
    const dateCheck = new Date(year, month - 1, i);
    if (dateCheck.getDay() === 0 || dateCheck.getDay() === 6) {
      result.push(i);
    }
  }
  return result.length;
}

/**
 * Returns the week number of the year for a given date.
 * The first week of the year is defined according to ISO8601.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const startYear = new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0);
  const startYearDate = startYear.getTime();
  const giveYearDate = date.getTime();
  const weeks = Math.ceil(
    ((giveYearDate - startYearDate) / 1000 / 60 / 60 / 24 + 1) / 7
  );
  return weeks;
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  const dataCheck = new Date(date);
  dataCheck.setDate(13);
  if (dataCheck.getDay() === 5 && dataCheck >= date) {
    return dataCheck;
  }
  dataCheck.setMonth(dataCheck.getMonth() + 1);
  return getNextFridayThe13th(dataCheck);
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  const month = date.getMonth();
  if (month < 3) {
    return 1;
  }
  if (month < 6) {
    return 2;
  }
  if (month < 9) {
    return 3;
  }
  return 4;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(/* period, countWorkDays, countOffDays */) {
  throw new Error('Not implemented');
}

// function getWorkSchedule(period, countWorkDays, countOffDays) {
//   let numberWorkDays = 1;
//   let numberOffDays = 1;
//   const [daystart, monthstart, yearstart] = period.start.split('-').map(Number);
//   const startDay = new Date(yearstart, monthstart - 1, daystart);
//   const [dayend, monthend, yearend] = period.end.split('-').map(Number);
//   const endDay = new Date(yearend, monthend - 1, dayend);
//   const result = [];
//   for (let i = startDay; i <= endDay; i.setDate(i.getDate() + 1)) {
//     if (numberWorkDays <= countWorkDays) {
//       const day = i.getDate() < 10 ? `0${i.getDate()}` : i.getDate();
//       const month =
//         i.getMonth() + 1 < 10 ? `0${i.getMonth() + 1}` : i.getMonth() + 1;
//       result.push(`${day}-${month}-${i.getFullYear()}`);
//       numberWorkDays += 1;
//     } else if (numberOffDays <= countOffDays) {
//       numberOffDays += 1;
//     }
//     if (numberOffDays > countOffDays && numberWorkDays > countWorkDays) {
//       numberWorkDays = 1;
//       numberOffDays = 1;
//     }
//   }
//   return result;
// }

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const year = date.getFullYear();
  if (year % 4 !== 0) {
    return false;
  }
  if (year % 100 !== 0) {
    return true;
  }
  return year % 400 === 0;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
