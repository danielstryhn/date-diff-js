import DateDiff from "./DateDiff";

test("Diff 1900-01-01 to 2000-01-01 should be 36524", () => {
  const subject = new DateDiff(
    "1900-01-01",
    "2000-01-01"
  ).calculateDaysBetween();
  expect(subject).toBe(36524);
});

test("Diff 1900-01-01 to 1901-01-01 should be 365", () => {
  const subject = new DateDiff(
    "1900-01-01",
    "1901-01-01"
  ).calculateDaysBetween();
  expect(subject).toBe(365);
});

test("Diff 1900-01-01 to 2000-01-0 should return 'Invalid dates.'", () => {
  const subject = new DateDiff(
    "1900-01-01",
    "2000-01-0"
  ).calculateDaysBetween();
  expect(subject).toBe("Invalid dates.");
});
