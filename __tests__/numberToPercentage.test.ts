import { I18n } from "../src/I18n";
import en from "../json/en.json";

const i18n = new I18n({ ...en });

test("formats number to percentage", () => {
  expect(i18n.numberToPercentage(100)).toEqual("100.000%");
  expect(i18n.numberToPercentage(100, { precision: 0 })).toEqual("100%");
  expect(i18n.numberToPercentage(302.0574, { precision: 2 })).toEqual(
    "302.06%",
  );
  expect(
    i18n.numberToPercentage(302.0574, { precision: 2, roundMode: "down" }),
  ).toEqual("302.05%");
  expect(i18n.numberToPercentage("100")).toEqual("100.000%");
  expect(i18n.numberToPercentage("1000")).toEqual("1000.000%");
  expect(
    i18n.numberToPercentage(123.4, {
      precision: 3,
      stripInsignificantZeros: true,
    }),
  ).toEqual("123.4%");
  expect(
    i18n.numberToPercentage(1000, { delimiter: ".", separator: "," }),
  ).toEqual("1.000,000%");
  expect(i18n.numberToPercentage(1000, { format: "%n  %" })).toEqual(
    "1000.000  %",
  );
  expect(
    i18n.numberToPercentage(-0.13, { precision: 2, format: "%n %" }),
  ).toEqual("-0.13 %");
  expect(i18n.numberToPercentage(Number.NaN)).toEqual("NaN%");
  expect(i18n.numberToPercentage(Number.POSITIVE_INFINITY)).toEqual(
    "Infinity%",
  );
  expect(i18n.numberToPercentage(Number.NEGATIVE_INFINITY)).toEqual(
    "-Infinity%",
  );
  expect(i18n.numberToPercentage(Number.NaN, { precision: 0 })).toEqual("NaN%");
  expect(
    i18n.numberToPercentage(Number.POSITIVE_INFINITY, { precision: 0 }),
  ).toEqual("Infinity%");
  expect(i18n.numberToPercentage(Number.NaN, { precision: 1 })).toEqual("NaN%");
  expect(
    i18n.numberToPercentage(Number.POSITIVE_INFINITY, { precision: 1 }),
  ).toEqual("Infinity%");
  expect(i18n.numberToPercentage(1000, { precision: null })).toEqual("1000%");
  expect(i18n.numberToPercentage(1000, { precision: null })).toEqual("1000%");
  expect(i18n.numberToPercentage(1000.1, { precision: null })).toEqual(
    "1000.1%",
  );
  expect(
    i18n.numberToPercentage("-0.13", { precision: null, format: "%n %" }),
  ).toEqual("-0.13 %");
  expect(i18n.numberToPercentage("98a")).toEqual("98a%");
});

test("formats number to percentage using default options", () => {
  const i18n = new I18n();
  expect(i18n.numberToPercentage(100)).toEqual("100.000%");
});
