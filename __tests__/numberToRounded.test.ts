import { repeat } from "lodash";
import BigNumber from "bignumber.js";

import { I18n } from "../src/I18n";
import en from "../json/en.json";

const i18n = new I18n({ ...en });

test("formats number to rounded", () => {
  expect(i18n.numberToRounded(-111.2346)).toEqual("-111.235");
  expect(i18n.numberToRounded(111.2346)).toEqual("111.235");
  expect(i18n.numberToRounded(31.825, { precision: 2 })).toEqual("31.83");
  expect(i18n.numberToRounded(111.2346, { precision: 2 })).toEqual("111.23");
  expect(
    i18n.numberToRounded(111.2346, { precision: 2, roundMode: "up" }),
  ).toEqual("111.24");
  expect(i18n.numberToRounded(111, { precision: 2 })).toEqual("111.00");
  expect(i18n.numberToRounded("111.2346")).toEqual("111.235");
  expect(i18n.numberToRounded("31.825", { precision: 2 })).toEqual("31.83");
  expect(i18n.numberToRounded(32.6751 * 100.0, { precision: 0 })).toEqual(
    "3268",
  );
  expect(i18n.numberToRounded(111.5, { precision: 0 })).toEqual("112");
  expect(i18n.numberToRounded(1234567891.5, { precision: 0 })).toEqual(
    "1234567892",
  );
  expect(i18n.numberToRounded(0, { precision: 0 })).toEqual("0");
  expect(i18n.numberToRounded(0.001, { precision: 5 })).toEqual("0.00100");
  expect(i18n.numberToRounded(0.00111, { precision: 3 })).toEqual("0.001");
  expect(i18n.numberToRounded(9.995, { precision: 2 })).toEqual("10.00");
  expect(i18n.numberToRounded(10.995, { precision: 2 })).toEqual("11.00");
  expect(i18n.numberToRounded(-0.001, { precision: 2 })).toEqual("0.00");
  expect(i18n.numberToRounded(111.2346, { precision: 20 })).toEqual(
    "111.23460000000000000000",
  );
  expect(i18n.numberToRounded("111.2346", { precision: 20 })).toEqual(
    "111.23460000000000000000",
  );
  expect(i18n.numberToRounded("111.2346", { precision: 100 })).toEqual(
    "111.2346" + repeat("0", 96),
  );
  expect(
    i18n.numberToRounded(new BigNumber(111.2346), { precision: 20 }),
  ).toEqual("111.23460000000000000000");

  // expect(i18n.numberToRounded(Rational(1112346, 10000), precision: 20)).toEqual("111.23460000000000000000")
  // expect(i18n.numberToRounded(Rational(1112346, 10000), precision: 4)).toEqual("111.2346")
  // expect(i18n.numberToRounded(Rational(0, 1), precision: 2)).toEqual("0.00")
  // expect(i18n.numberToRounded(BigDecimal(111.2346, Float::DIG), precision: 20)).toEqual("111.23460000000000000000")
});

test("formats to rounded with custom delimiter and separator", () => {
  expect(
    i18n.numberToRounded(31.825, { precision: 2, separator: "," }),
  ).toEqual("31,83");
  expect(
    i18n.numberToRounded(1231.825, {
      precision: 2,
      separator: ",",
      delimiter: ".",
    }),
  ).toEqual("1.231,83");
});

test("formats to rounded with significant digits", () => {
  expect(
    i18n.numberToRounded(123987, { precision: 3, significant: true }),
  ).toEqual("124000");
  expect(
    i18n.numberToRounded(123987876, { precision: 2, significant: true }),
  ).toEqual("120000000");
  expect(
    i18n.numberToRounded("43523", { precision: 1, significant: true }),
  ).toEqual("40000");
  expect(
    i18n.numberToRounded(9775, { precision: 4, significant: true }),
  ).toEqual("9775");
  expect(
    i18n.numberToRounded(5.3923, { precision: 2, significant: true }),
  ).toEqual("5.4");
  expect(
    i18n.numberToRounded(5.3923, { precision: 1, significant: true }),
  ).toEqual("5");
  expect(
    i18n.numberToRounded(1.232, { precision: 1, significant: true }),
  ).toEqual("1");
  expect(i18n.numberToRounded(7, { precision: 1, significant: true })).toEqual(
    "7",
  );
  expect(i18n.numberToRounded(1, { precision: 1, significant: true })).toEqual(
    "1",
  );
  expect(
    i18n.numberToRounded(52.7923, { precision: 2, significant: true }),
  ).toEqual("53");
  expect(
    i18n.numberToRounded(9775, { precision: 6, significant: true }),
  ).toEqual("9775.00");
  expect(
    i18n.numberToRounded(5.3929, { precision: 7, significant: true }),
  ).toEqual("5.392900");
  expect(i18n.numberToRounded(0, { precision: 2, significant: true })).toEqual(
    "0.0",
  );
  expect(i18n.numberToRounded(0, { precision: 1, significant: true })).toEqual(
    "0",
  );
  expect(
    i18n.numberToRounded(0.0001, { precision: 1, significant: true }),
  ).toEqual("0.0001");
  expect(
    i18n.numberToRounded(0.0001, { precision: 3, significant: true }),
  ).toEqual("0.000100");
  expect(
    i18n.numberToRounded(0.0001111, { precision: 1, significant: true }),
  ).toEqual("0.0001");
  expect(
    i18n.numberToRounded(9.995, { precision: 3, significant: true }),
  ).toEqual("10.0");
  expect(
    i18n.numberToRounded(9.994, { precision: 3, significant: true }),
  ).toEqual("9.99");
  expect(
    i18n.numberToRounded(10.995, { precision: 3, significant: true }),
  ).toEqual("11.0");
  expect(
    i18n.numberToRounded(123987, {
      precision: 3,
      significant: true,
      roundMode: "down",
    }),
  ).toEqual("123000");
  expect(
    i18n.numberToRounded(9775, { precision: 20, significant: true }),
  ).toEqual("9775.0000000000000000");
  expect(
    i18n.numberToRounded(9775.0, { precision: 20, significant: true }),
  ).toEqual("9775.0000000000000000");
  // expect(i18n.numberToRounded(Rational(9775, 1), precision: 20, significant: true)).toEqual("9775.0000000000000000")
  // expect(i18n.numberToRounded(Rational(9775, 100), precision: 20, significant: true)).toEqual("97.750000000000000000")
  expect(
    i18n.numberToRounded(new BigNumber(9775), {
      precision: 20,
      significant: true,
    }),
  ).toEqual("9775.0000000000000000");
  expect(
    i18n.numberToRounded("9775", { precision: 20, significant: true }),
  ).toEqual("9775.0000000000000000");
  // expect(i18n.numberToRounded(Rational(9772, 100), precision: 3, significant: true)).toEqual("97.7")
  expect(
    i18n.numberToRounded("9775", { precision: 100, significant: true }),
  ).toEqual("9775." + repeat("0", 96));
});

test("formats to rounded with strip insignificant zeros", () => {
  expect(
    i18n.numberToRounded(9775.43, {
      precision: 4,
      stripInsignificantZeros: true,
    }),
  ).toEqual("9775.43");
  expect(
    i18n.numberToRounded(9775.2, {
      precision: 6,
      significant: true,
      stripInsignificantZeros: true,
    }),
  ).toEqual("9775.2");
  expect(
    i18n.numberToRounded(0, {
      precision: 6,
      significant: true,
      stripInsignificantZeros: true,
    }),
  ).toEqual("0");
});

test("formats to rounded with significant true and zero precision", () => {
  // Zero precision with significant is a mistake (would always return zero),
  // so we treat it as if significant was false (increases backwards
  // compatibility for number_to_human_size)
  expect(
    i18n.numberToRounded(123.987, { precision: 0, significant: true }),
  ).toEqual("124");
  expect(i18n.numberToRounded(12, { precision: 0, significant: true })).toEqual(
    "12",
  );
  expect(
    i18n.numberToRounded("12.3", { precision: 0, significant: true }),
  ).toEqual("12");
});
