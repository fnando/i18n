import { I18n } from "../src/I18n";
import { translations } from "./fixtures/translations";

const BIG_NUMBER = 300000000000020000;

test("formats currency with default settings", () => {
  const i18n = new I18n(translations());

  expect(i18n.toCurrency(100.99)).toEqual("$100.99");
  expect(i18n.toCurrency(1000.99)).toEqual("$1,000.99");
  expect(i18n.toCurrency(-1000)).toEqual("-$1,000.00");
  expect(i18n.toCurrency(BIG_NUMBER)).toEqual("$300,000,000,000,020,000.00");
  expect(i18n.toCurrency(-BIG_NUMBER)).toEqual("-$300,000,000,000,020,000.00");
});

test("formats currency with custom settings", () => {
  const i18n = new I18n(translations());

  i18n.update("en.number.currency.format", {
    format: "%n %u",
    unit: "USD",
    delimiter: ".",
    separator: ",",
    precision: 2,
  });

  expect(i18n.toCurrency(1)).toEqual("1,00 USD");
  expect(i18n.toCurrency(12)).toEqual("12,00 USD");
  expect(i18n.toCurrency(123)).toEqual("123,00 USD");
  expect(i18n.toCurrency(1234.56)).toEqual("1.234,56 USD");
});

test("formats currency with custom settings and partial overriding", () => {
  const i18n = new I18n(translations());

  i18n.update("en.number.currency.format", {
    format: "%n %u",
    delimiter: ".",
    separator: ",",
    unit: "USD",
  });

  expect(i18n.toCurrency(12, { precision: 0 })).toEqual("12 USD");
  expect(i18n.toCurrency(123, { unit: "bucks" })).toEqual("123,00 bucks");
});

test("formats currency with some custom options that should be merged with default options", () => {
  const i18n = new I18n(translations());

  expect(i18n.toCurrency(1234, { precision: 0 })).toEqual("$1,234");
  expect(i18n.toCurrency(1234, { unit: "º" })).toEqual("º1,234.00");
  expect(i18n.toCurrency(1234, { separator: "-" })).toEqual("$1,234-00");
  expect(i18n.toCurrency(1234, { delimiter: "-" })).toEqual("$1-234.00");
  expect(i18n.toCurrency(1234, { format: "%u %n" })).toEqual("$ 1,234.00");
  expect(i18n.toCurrency(-123, { signFirst: false })).toEqual("$-123.00");
});
