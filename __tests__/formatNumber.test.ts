import { I18n } from "../src/I18n";
import en from "../json/en.json";

const i18n = new I18n({ ...en });

test("formats number with defaults", () => {
  expect(i18n.formatNumber(1234567890.5)).toEqual("1,234,567,890.500");
});

test("formats number with custom override", () => {
  expect(i18n.formatNumber(1234567890.5, { precision: 2, unit: "$" })).toEqual(
    "$1,234,567,890.50",
  );
});
