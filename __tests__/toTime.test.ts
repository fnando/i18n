import { I18n } from "../src/I18n";

const i18n = new I18n();

test("formats string as date representation", () => {
  const input = "06 Jun 2021 00:14:32 GMT";
  const date = new Date(Date.parse(input));

  expect(i18n.toTime("foo", input)).toEqual(date.toString());
});

test("formats number as date representation", () => {
  const input = Date.parse("06 Jun 2021 00:14:32 GMT");
  const date = new Date(input);

  expect(i18n.toTime("foo", input)).toEqual(date.toString());
});

test("formats date representation", () => {
  const input = new Date();

  expect(i18n.toTime("foo", input)).toEqual(input.toString());
});

test("returns representation for invalid date", () => {
  const input = "bogus format";

  expect(i18n.toTime("foo", input)).toEqual("Invalid Date");
});
