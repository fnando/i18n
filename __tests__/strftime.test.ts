import { translations } from "./fixtures/translations";
import { I18n } from "../src/I18n";

let i18n: I18n;

beforeEach(() => {
  i18n = new I18n(translations());
});

test("formats date", () => {
  i18n.locale = "pt-BR";

  // 2009-04-26 19:35:44 (Sunday)
  const date = new Date(2009, 3, 26, 19, 35, 44);

  // short week day
  expect(i18n.strftime(date, "%a")).toEqual("Dom");

  // full week day
  expect(i18n.strftime(date, "%A")).toEqual("Domingo");

  // short month
  expect(i18n.strftime(date, "%b")).toEqual("Abr");

  // full month
  expect(i18n.strftime(date, "%B")).toEqual("Abril");

  // day
  expect(i18n.strftime(date, "%d")).toEqual("26");

  // 24-hour
  expect(i18n.strftime(date, "%H")).toEqual("19");

  // 12-hour
  expect(i18n.strftime(date, "%I")).toEqual("07");

  // month
  expect(i18n.strftime(date, "%m")).toEqual("04");

  // minutes
  expect(i18n.strftime(date, "%M")).toEqual("35");

  // meridian
  expect(i18n.strftime(date, "%p")).toEqual("PM");

  // meridian
  expect(i18n.strftime(date, "%P")).toEqual("pm");

  // seconds
  expect(i18n.strftime(date, "%S")).toEqual("44");

  // week day
  expect(i18n.strftime(date, "%w")).toEqual("0");

  // short year
  expect(i18n.strftime(date, "%y")).toEqual("09");

  // full year
  expect(i18n.strftime(date, "%Y")).toEqual("2009");
});

test("formats date without padding", () => {
  i18n.locale = "pt-BR";

  // 2009-04-26 19:35:44 (Sunday)
  const date = new Date(2009, 3, 9, 7, 8, 9);

  // 24-hour without padding
  expect(i18n.strftime(date, "%-H")).toEqual("7");

  // 24-hour without padding
  expect(i18n.strftime(date, "%k")).toEqual("7");

  // 12-hour without padding
  expect(i18n.strftime(date, "%-I")).toEqual("7");

  // 12-hour without padding
  expect(i18n.strftime(date, "%l")).toEqual("7");

  // minutes without padding
  expect(i18n.strftime(date, "%-M")).toEqual("8");

  // seconds without padding
  expect(i18n.strftime(date, "%-S")).toEqual("9");

  // short year without padding
  expect(i18n.strftime(date, "%-y")).toEqual("9");

  // month without padding
  expect(i18n.strftime(date, "%-m")).toEqual("4");

  // day without padding
  expect(i18n.strftime(date, "%-d")).toEqual("9");
  expect(i18n.strftime(date, "%e")).toEqual("9");
});

test("formats date with padding", () => {
  i18n.locale = "pt-BR";

  // 2009-04-26 19:35:44 (Sunday)
  const date = new Date(2009, 3, 9, 7, 8, 9);

  // 24-hour
  expect(i18n.strftime(date, "%H")).toEqual("07");

  // 12-hour
  expect(i18n.strftime(date, "%I")).toEqual("07");

  // minutes
  expect(i18n.strftime(date, "%M")).toEqual("08");

  // seconds
  expect(i18n.strftime(date, "%S")).toEqual("09");

  // short year
  expect(i18n.strftime(date, "%y")).toEqual("09");

  // month
  expect(i18n.strftime(date, "%m")).toEqual("04");

  // day
  expect(i18n.strftime(date, "%d")).toEqual("09");
});

test("formats date with negative time zone", () => {
  i18n.locale = "pt-BR";
  const date = new Date(2009, 3, 26, 19, 35, 44);

  Object.defineProperty(date, "getTimezoneOffset", { value: () => 345 });

  expect(i18n.strftime(date, "%z").match(/^(\+|-)[\d]{4}$/)).toBeTruthy();
  expect(i18n.strftime(date, "%z")).toEqual("-0545");
});

test("formats date with positive time zone", () => {
  i18n.locale = "pt-BR";
  const date = new Date(2009, 3, 26, 19, 35, 44);

  Object.defineProperty(date, "getTimezoneOffset", { value: () => -345 });

  expect(i18n.strftime(date, "%z").match(/^(\+|-)[\d]{4}$/)).toBeTruthy();
  expect(i18n.strftime(date, "%z")).toEqual("+0545");
});

test("formats date with using %Z", () => {
  i18n.locale = "pt-BR";
  const date = new Date(2009, 3, 26, 19, 35, 44);

  Object.defineProperty(date, "getTimezoneOffset", { value: () => -345 });

  expect(i18n.strftime(date, "%Z").match(/^(\+|-)[\d]{4}$/)).toBeTruthy();
  expect(i18n.strftime(date, "%Z")).toEqual("+0545");
});

test("formats date with custom meridian", () => {
  i18n.locale = "en-US";
  const date = new Date(2009, 3, 26, 19, 35, 44);
  expect(i18n.strftime(date, "%p")).toEqual("PM");
});

test("formats date with meridian boundaries", () => {
  i18n.locale = "en-US";
  let date = new Date(2009, 3, 26, 0, 35, 44);
  expect(i18n.strftime(date, "%p")).toEqual("AM");

  date = new Date(2009, 3, 26, 12, 35, 44);
  expect(i18n.strftime(date, "%p")).toEqual("PM");
});

test("formats date using 12-hours format", () => {
  i18n.locale = "pt-BR";
  let date = new Date(2009, 3, 26, 19, 35, 44);
  expect(i18n.strftime(date, "%I")).toEqual("07");

  date = new Date(2009, 3, 26, 12, 35, 44);
  expect(i18n.strftime(date, "%I")).toEqual("12");

  date = new Date(2009, 3, 26, 0, 35, 44);
  expect(i18n.strftime(date, "%I")).toEqual("12");
});

test("defaults to English", () => {
  i18n.locale = "wk";

  const date = new Date(2009, 3, 26, 19, 35, 44);
  expect(i18n.strftime(date, "%a")).toEqual("Sun");
});

test("applies locale fallback", () => {
  i18n.defaultLocale = "en-US";
  i18n.locale = "de";

  let date = new Date(2009, 3, 26, 19, 35, 44);
  expect(i18n.strftime(date, "%A")).toEqual("Sonntag");

  date = new Date(2009, 3, 26, 19, 35, 44);
  expect(i18n.strftime(date, "%a")).toEqual("Sun");
});

test("uses time as the meridian scope", () => {
  i18n.locale = "de";

  let date = new Date(2009, 3, 26, 19, 35, 44);
  expect(i18n.strftime(date, "%p")).toEqual("de:PM");

  date = new Date(2009, 3, 26, 7, 35, 44);
  expect(i18n.strftime(date, "%p")).toEqual("de:AM");
});

test("fails to format invalid date", () => {
  const date = new Date("foo");
  const expected =
    "strftime() requires a valid date object, but received an invalid date.";

  expect(() => i18n.strftime(date, "%a")).toThrowError(expected);
});
