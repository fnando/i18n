import { parseDate } from "../src/helpers/parseDate";

let actual: any;
let expected: any;

test("parses date", () => {
  expected = new Date(2009, 0, 24, 0, 0, 0);
  actual = parseDate("2009-01-24");
  expect(actual.toString()).toEqual(expected.toString());

  expected = new Date(2009, 0, 24, 0, 15, 0);
  actual = parseDate("2009-01-24 00:15:00");
  expect(actual.toString()).toEqual(expected.toString());

  expected = new Date(2009, 0, 24, 0, 0, 15);
  actual = parseDate("2009-01-24 00:00:15");
  expect(actual.toString()).toEqual(expected.toString());

  expected = new Date(2009, 0, 24, 15, 33, 44);
  actual = parseDate("2009-01-24 15:33:44");
  expect(actual.toString()).toEqual(expected.toString());

  expected = new Date(2009, 0, 24, 0, 0, 0);
  actual = parseDate(expected.getTime());
  expect(actual.toString()).toEqual(expected.toString());

  expected = new Date(2009, 0, 24, 0, 0, 0);
  actual = parseDate("01/24/2009");
  expect(actual.toString()).toEqual(expected.toString());

  expected = new Date(2009, 0, 24, 14, 33, 55);
  actual = parseDate(expected).toString();
  expect(actual).toEqual(expected.toString());

  expected = new Date(2009, 0, 24, 15, 33, 44);
  actual = parseDate("2009-01-24T15:33:44");
  expect(actual.toString()).toEqual(expected.toString());

  expected = new Date(Date.UTC(2011, 6, 20, 12, 51, 55));
  actual = parseDate("2011-07-20T12:51:55+0000");
  expect(actual.toString()).toEqual(expected.toString());

  expected = new Date(Date.UTC(2011, 6, 20, 12, 51, 55));
  actual = parseDate("2011-07-20T12:51:55+00:00");
  expect(actual.toString()).toEqual(expected.toString());

  expected = new Date(Date.UTC(2011, 6, 20, 13, 3, 39));
  actual = parseDate("Wed Jul 20 13:03:39 +0000 2011");
  expect(actual.toString()).toEqual(expected.toString());

  expected = new Date(Date.UTC(2009, 0, 24, 15, 33, 44));
  actual = parseDate("2009-01-24T15:33:44Z");
  expect(actual.toString()).toEqual(expected.toString());

  expected = new Date(Date.UTC(2009, 0, 24, 15, 34, 44, 200));
  actual = parseDate("2009-01-24T15:34:44.200Z");
  expect(actual.toString()).toEqual(expected.toString());
  expect(actual.getMilliseconds()).toEqual(expected.getMilliseconds());

  expected = new Date(Date.UTC(2009, 0, 24, 15, 34, 45, 200));
  actual = parseDate("2009-01-24T15:34:45.200+0000");
  expect(actual.toString()).toEqual(expected.toString());
  expect(actual.getMilliseconds()).toEqual(expected.getMilliseconds());

  expected = new Date(Date.UTC(2009, 0, 24, 15, 34, 46, 200));
  actual = parseDate("2009-01-24T15:34:46.200+00:00");
  expect(actual.toString()).toEqual(expected.toString());
  expect(actual.getMilliseconds()).toEqual(expected.getMilliseconds());
});
