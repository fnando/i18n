import { I18n } from "../src/I18n";
import en from "../json/en.json";

const i18n = new I18n({ ...en });

test("formats number to delimited", () => {
  expect(i18n.numberToDelimited(12345678)).toEqual("12,345,678");
  expect(i18n.numberToDelimited(0)).toEqual("0");
  expect(i18n.numberToDelimited(123)).toEqual("123");
  expect(i18n.numberToDelimited(123456)).toEqual("123,456");
  expect(i18n.numberToDelimited(123456.78)).toEqual("123,456.78");
  expect(i18n.numberToDelimited(123456.789)).toEqual("123,456.789");
  expect(i18n.numberToDelimited(123456.78901)).toEqual("123,456.78901");
  expect(i18n.numberToDelimited(123456789.78901)).toEqual("123,456,789.78901");
  expect(i18n.numberToDelimited(0.78901)).toEqual("0.78901");
  expect(i18n.numberToDelimited("123456.78")).toEqual("123,456.78");
  expect(i18n.numberToDelimited("112a")).toEqual("112a");
  expect(
    i18n.numberToDelimited("123456.78", {
      delimiterPattern: /(\d+?)(?=(\d\d)+(\d)(?!\d))/g,
    }),
  ).toEqual("1,23,456.78");
});

test("raises exception for non-global regexp", () => {
  const delimiterPattern = /(\d+?)(?=(\d\d)+(\d)(?!\d))/;

  expect(() => {
    i18n.numberToDelimited("123456.78", { delimiterPattern });
  }).toThrow(
    `options.delimiterPattern must be a global regular expression; received ${delimiterPattern}`,
  );
});
