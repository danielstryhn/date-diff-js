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
  expect(
    () => new ("1900-01-01", "2000-01-0").calculateDaysBetween()
  ).toThrow();
});
