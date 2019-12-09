import { translations } from "./fixtures/translations";
import { I18n } from "../src/I18n";
import { ToNumberOptions } from "../index.d";

test("formats number with default settings", () => {
  const i18n = new I18n(translations());

  expect(i18n.toNumber(1)).toEqual("1.000");
  expect(i18n.toNumber(12)).toEqual("12.000");
  expect(i18n.toNumber(123)).toEqual("123.000");
  expect(i18n.toNumber(1234)).toEqual("1,234.000");
  expect(i18n.toNumber(12345)).toEqual("12,345.000");
  expect(i18n.toNumber(123456)).toEqual("123,456.000");
  expect(i18n.toNumber(1234567)).toEqual("1,234,567.000");
  expect(i18n.toNumber(12345678)).toEqual("12,345,678.000");
  expect(i18n.toNumber(123456789)).toEqual("123,456,789.000");
});

test("formats negative numbers with default settings", () => {
  const i18n = new I18n(translations());

  expect(i18n.toNumber(-1)).toEqual("-1.000");
  expect(i18n.toNumber(-12)).toEqual("-12.000");
  expect(i18n.toNumber(-123)).toEqual("-123.000");
  expect(i18n.toNumber(-1234)).toEqual("-1,234.000");
  expect(i18n.toNumber(-12345)).toEqual("-12,345.000");
  expect(i18n.toNumber(-123456)).toEqual("-123,456.000");
  expect(i18n.toNumber(-1234567)).toEqual("-1,234,567.000");
  expect(i18n.toNumber(-12345678)).toEqual("-12,345,678.000");
  expect(i18n.toNumber(-123456789)).toEqual("-123,456,789.000");
});

test("formats number with partial translation and default options", () => {
  const i18n = new I18n(translations());

  i18n.mergeTranslations("en.number", {
    format: {
      precision: 2,
    },
  });

  expect(i18n.toNumber(1234)).toEqual("1,234.00");
});

test("formats number with full translation and default options", () => {
  const i18n = new I18n(translations());

  i18n.mergeTranslations("en.number", {
    format: {
      delimiter: ".",
      separator: ",",
      precision: 2,
    },
  });

  expect(i18n.toNumber(1234)).toEqual("1.234,00");
});

test("formats numbers with some custom options that should be merged with default options", () => {
  const i18n = new I18n(translations());

  expect(i18n.toNumber(1234.56, { precision: 0 })).toEqual("1,235");
  expect(i18n.toNumber(1234, { separator: "-" })).toEqual("1,234-000");
  expect(i18n.toNumber(1234, { delimiter: "_" })).toEqual("1_234.000");
});

test("formats number considering options", () => {
  const i18n = new I18n(translations());

  const options = {
    precision: 2,
    separator: ",",
    delimiter: ".",
  };

  expect(i18n.toNumber(1, options)).toEqual("1,00");
  expect(i18n.toNumber(12, options)).toEqual("12,00");
  expect(i18n.toNumber(123, options)).toEqual("123,00");
  expect(i18n.toNumber(1234, options)).toEqual("1.234,00");
  expect(i18n.toNumber(123456, options)).toEqual("123.456,00");
  expect(i18n.toNumber(1234567, options)).toEqual("1.234.567,00");
  expect(i18n.toNumber(12345678, options)).toEqual("12.345.678,00");
});

test("formats numbers with different precisions", () => {
  const i18n = new I18n(translations());
  const options: ToNumberOptions = { separator: ".", delimiter: "," };

  options["precision"] = 2;
  expect(i18n.toNumber(1.98, options)).toEqual("1.98");

  options["precision"] = 3;
  expect(i18n.toNumber(1.98, options)).toEqual("1.980");

  options["precision"] = 2;
  expect(i18n.toNumber(1.987, options)).toEqual("1.99");

  options["precision"] = 1;
  expect(i18n.toNumber(1.98, options)).toEqual("2.0");

  options["precision"] = 0;
  expect(i18n.toNumber(1.98, options)).toEqual("2");
});

test("rounds numbers correctly when precision is given", () => {
  const i18n = new I18n(translations());
  const options: ToNumberOptions = { separator: ".", delimiter: "," };

  options["precision"] = 2;
  expect(i18n.toNumber(0.104, options)).toEqual("0.10");

  options["precision"] = 2;
  expect(i18n.toNumber(0.105, options)).toEqual("0.11");

  options["precision"] = 2;
  expect(i18n.toNumber(1.005, options)).toEqual("1.01");

  options["precision"] = 3;
  expect(i18n.toNumber(35.855, options)).toEqual("35.855");

  options["precision"] = 2;
  expect(i18n.toNumber(35.855, options)).toEqual("35.86");

  options["precision"] = 1;
  expect(i18n.toNumber(35.855, options)).toEqual("35.9");

  options["precision"] = 0;
  expect(i18n.toNumber(35.855, options)).toEqual("36");

  options["precision"] = 0;
  expect(i18n.toNumber(0.000000000000001, options)).toEqual("0");
});

test("returns number as human size", () => {
  const i18n = new I18n(translations());
  const kb = 1024;

  expect(i18n.toHumanSize(1)).toEqual("1Byte");
  expect(i18n.toHumanSize(100)).toEqual("100Bytes");

  expect(i18n.toHumanSize(kb)).toEqual("1KB");
  expect(i18n.toHumanSize(kb * 1.5)).toEqual("1.5KB");

  expect(i18n.toHumanSize(kb * kb)).toEqual("1MB");
  expect(i18n.toHumanSize(kb * kb * 1.5)).toEqual("1.5MB");

  expect(i18n.toHumanSize(kb * kb * kb)).toEqual("1GB");
  expect(i18n.toHumanSize(kb * kb * kb * 1.5)).toEqual("1.5GB");

  expect(i18n.toHumanSize(kb * kb * kb * kb)).toEqual("1TB");
  expect(i18n.toHumanSize(kb * kb * kb * kb * 1.5)).toEqual("1.5TB");

  expect(i18n.toHumanSize(kb * kb * kb * kb * kb)).toEqual("1024TB");
});

test("returns number as human size using custom options", () => {
  const i18n = new I18n(translations());

  expect(i18n.toHumanSize(1024 * 1.6, { precision: 0 })).toEqual("2KB");
});

test("formats numbers with strip insignificant zero", () => {
  const i18n = new I18n(translations());

  const options: ToNumberOptions = {
    separator: ".",
    delimiter: ",",
    strip_insignificant_zeros: true,
  };

  options["precision"] = 2;
  expect(i18n.toNumber(1.0, options)).toEqual("1");

  options["precision"] = 3;
  expect(i18n.toNumber(1.98, options)).toEqual("1.98");

  options["precision"] = 4;
  expect(i18n.toNumber(1.987, options)).toEqual("1.987");
});

test("keeps significant zeros [issue#103]", () => {
  const i18n = new I18n(translations());

  const actual = i18n.toNumber(30, {
    strip_insignificant_zeros: true,
    precision: 0,
  });

  expect(actual).toEqual("30");
});
