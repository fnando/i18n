import { I18n } from "../src/I18n";
import en from "../json/en.json";

const i18n = new I18n({ ...en });
const BIG_NUMBER = 300000000000020000;

test("formats number to currency", () => {
  expect(i18n.numberToCurrency(1234567890.5)).toEqual("$1,234,567,890.50");
  expect(i18n.numberToCurrency(1234567890.506)).toEqual("$1,234,567,890.51");
  expect(i18n.numberToCurrency(-1234567890.5)).toEqual("-$1,234,567,890.50");

  expect(i18n.numberToCurrency(-1234567890.5, { format: "%u %n" })).toEqual(
    "-$ 1,234,567,890.50",
  );

  expect(
    i18n.numberToCurrency(-1234567890.5, { negativeFormat: "(%u%n)" }),
  ).toEqual("($1,234,567,890.50)");

  expect(i18n.numberToCurrency(1234567891.5, { precision: 0 })).toEqual(
    "$1,234,567,892",
  );

  expect(
    i18n.numberToCurrency(1234567891.5, { precision: 0, roundMode: "down" }),
  ).toEqual("$1,234,567,891");

  expect(i18n.numberToCurrency(1234567890.5, { precision: 1 })).toEqual(
    "$1,234,567,890.5",
  );

  expect(
    i18n.numberToCurrency(1234567890.5, {
      unit: "&pound;",
      separator: ",",
      delimiter: "",
    }),
  ).toEqual("&pound;1234567890,50");

  expect(i18n.numberToCurrency(1234567890.5)).toEqual("$1,234,567,890.50");

  expect(
    i18n.numberToCurrency(1234567890.5, { unit: "K&#269;", format: "%n %u" }),
  ).toEqual("1,234,567,890.50 K&#269;");

  expect(
    i18n.numberToCurrency(-1234567890.5, {
      unit: "K&#269;",
      format: "%n %u",
      negativeFormat: "%n - %u",
    }),
  ).toEqual("1,234,567,890.50 - K&#269;");

  expect(
    i18n.numberToCurrency(+0.0, { unit: "", negativeFormat: "(%n)" }),
  ).toEqual("0.00");

  expect(i18n.numberToCurrency(-0.456789, { precision: 0 })).toEqual("$0");
  expect(i18n.numberToCurrency(BIG_NUMBER)).toEqual(
    "$300,000,000,000,020,000.00",
  );
  expect(i18n.numberToCurrency(-BIG_NUMBER)).toEqual(
    "-$300,000,000,000,020,000.00",
  );

  expect(i18n.numberToCurrency("123a456")).toEqual("$123a456");
});

test("raises exception for invalid numbers", () => {
  expect(() => {
    i18n.numberToCurrency("123a456", { raise: true });
  }).toThrow(/"123a456" is not a valid numeric value/);
});
