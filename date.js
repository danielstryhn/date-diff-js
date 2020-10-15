class DateDiff {
  constructor(fromDate, endDate) {
    this.startDate = this.stringToDate(fromDate);
    this.endDate = this.stringToDate(endDate);
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

  calculateDaysBetween() {
    const startDate = this.startDate;
    const endDate = this.endDate;

    // Start with some simple validation
    if (
      !startDate ||
      !endDate ||
      startDate.year <= 1582 ||
      endDate.year <= 1582 ||
      endDate.year < startDate.year ||
      (startDate.month === 2 &&
        startDate.day > (this.isYearLeapYear(startDate.year) ? 29 : 28)) ||
      (endDate.month === 2 &&
        endDate.day > (this.isYearLeapYear(endDate.year) ? 29 : 28))
    ) {
      return "Invalid dates.";
    }

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
console.log(new DateDiff("1900-01-01", "2000-01-01").calculateDaysBetween());
