import DateDiff from "./DateDiff";

test("Diff 1900-01-01 to 2000-01-01 should be 36524", () => {
  expect(new DateDiff("1900-01-01", "2000-01-01").calculateDaysBetween()).toBe(
    36524
  );
});

test("Diff 1900-01-01 to 1901-01-01 should be 365", () => {
  expect(new DateDiff("1900-01-01", "1901-01-01").calculateDaysBetween()).toBe(
    365
  );
});

test("Diff 1900-01-01 to 2000-01-0 should throw an error", () => {
  expect(() =>
    new DateDiff("1900-01-01", "2000-01-0").calculateDaysBetween()
  ).toThrow("Dates provided are invalid.");
});

test("Diff 1900-01-01 to 2000-01-0 should throw an error", () => {
  expect(() =>
    new DateDiff("19000101", "2000010").calculateDaysBetween()
  ).toThrow("Dates provided are invalid.");
});

test("Years below 1582 should throw an error", () => {
  expect(() =>
    new DateDiff("1583-01-01", "1582-01-01").calculateDaysBetween()
  ).toThrow("Year cannot be less than 1582");
});

test("End year should be bigger than start year", () => {
  expect(() =>
    new DateDiff("2000-01-01", "1999-01-01").calculateDaysBetween()
  ).toThrow("End year cannot be less than startyear");
});

test("Start day in February cannot be 29 on a non-leap year", () => {
  expect(() =>
    new DateDiff("1997-02-29", "1999-01-01").calculateDaysBetween()
  ).toThrow("Start day does not exist in February");
});

test("End day in February cannot be 29 on a non-leap year", () => {
  expect(() =>
    new DateDiff("1995-02-28", "1999-02-29").calculateDaysBetween()
  ).toThrow("End day does not exist in February");
});

test("Start day should exist in start month", () => {
  expect(() =>
    new DateDiff("1995-04-31", "1999-02-01").calculateDaysBetween()
  ).toThrow("Start day does not exist in month 4");
});

test("End day should exist in start month", () => {
  expect(() =>
    new DateDiff("1995-04-30", "1995-04-31").calculateDaysBetween()
  ).toThrow("End day does not exist in month 4");
});
