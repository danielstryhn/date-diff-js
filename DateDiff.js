class DateDiff {
  constructor(fromDate, endDate) {
    this.dates = {
      startDate: this.stringToDate(fromDate),
      endDate: this.stringToDate(endDate),
    };
    this.months = {
      1: 31,
      2: 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31,
    };
  }

  stringToDate(date) {
    // Test if date is of format yyyy-mm-dd (ex. 2018-01-01).
    return /(([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(date)
      ? {
          year: parseInt(date.substring(0, 4)),
          month: parseInt(date.substring(5, 7)),
          day: parseInt(date.substring(8, 10)),
        }
      : false;
  }

  isYearLeapYear(year) {
    // Check if a given year is a leap year
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
  }

  validateDates() {
    const { startDate, endDate } = this.dates;

    try {
      if (!startDate || !endDate) {
        throw "Dates provided are invalid.";
      }

      if (startDate.year <= 1582 || endDate.year <= 1582) {
        throw "Year cannot be less than 1582";
      }

      if (endDate.year < startDate.year) {
        throw "End year cannot be less than startyear";
      }

      if (startDate.month === 2) {
        if (startDate.day > (this.isYearLeapYear(startDate.year) ? 29 : 28)) {
          throw "Start day does not exist in February";
        }
      }

      if (endDate.month === 2) {
        if (endDate.day > (this.isYearLeapYear(endDate.year) ? 29 : 28)) {
          throw "End day does not exist in February";
        }
      }

      if (startDate.day > this.months[startDate.month]) {
        throw "Start day does not exist in month " + startDate.month;
      }

      if (endDate.day > this.months[startDate.month]) {
        throw "End day does not exist in month " + startDate.month;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  calculateDaysBetween() {
    const { startDate, endDate } = this.dates;

    // Start with some simple validation
    this.validateDates();

    // initial calculations
    const daysPassedUntilEndYear =
      365 * endDate.year +
      parseInt(endDate.year / 4) -
      parseInt(endDate.year / 100);

    const daysPassedUntilStartYear =
      365 * startDate.year +
      parseInt(startDate.year / 4) -
      parseInt(startDate.year / 100);

    let totalDaysBetweenDates =
      daysPassedUntilEndYear - daysPassedUntilStartYear;

    // Add the days passed for each completed months in the endyear
    for (let m = 1; m < endDate.month; m++) {
      totalDaysBetweenDates += this.months[m];
    }

    // add the days passed current month of the endyear
    for (let d = 1; d < this.months[endDate.month]; d++) {
      totalDaysBetweenDates += d < endDate.day ? 1 : 0;
    }

    // Add a leap year day if needed for endYar
    totalDaysBetweenDates +=
      endDate.month > 2 ? (this.isYearLeapYear(endDate.year) ? 1 : 0) : 0;

    // Now substract full months passed during startyear
    for (let m = 1; m < startDate.month; m++) {
      totalDaysBetweenDates -= this.months[m];
    }

    // Substract days passed in current startyear month
    for (let d = 1; d < this.months[startDate.month]; d++) {
      totalDaysBetweenDates -= d < startDate.day ? 1 : 0;
    }

    // add leap days during start year
    totalDaysBetweenDates +=
      startDate.month > 2 ? (this.isYearLeapYear(startDate.year) ? 1 : 0) : 0;

    return totalDaysBetweenDates;
  }
}
export default DateDiff;
