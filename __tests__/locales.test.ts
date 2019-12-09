import { translations } from "./fixtures/translations";
import { I18n } from "../src/I18n";

test("returns the requested locale, if available", () => {
  const i18n = new I18n(translations());
  i18n.locales.register("ab", ["ab"]);

  expect(i18n.locales.get("ab")).toEqual(["ab"]);
});

test("wraps single results in an array", () => {
  const i18n = new I18n(translations());
  i18n.locales.register("cd", "cd");

  expect(i18n.locales.get("cd")).toEqual(["cd"]);
});

test("returns the result of locale functions", () => {
  const i18n = new I18n(translations());

  i18n.locales.register("fn", () => ["gg"]);

  expect(i18n.locales.get("fn")).toEqual(["gg"]);
});

test("uses i18n.locale as a fallback", () => {
  const i18n = new I18n(translations());

  i18n.locale = "xx";
  i18n.locales.register("xx", () => ["xx"]);

  expect(i18n.locales.get("")).toEqual(["xx"]);
  expect(i18n.locales.get("yy")).toEqual(["xx"]);
});

test("returns the list for primary-script-region codes", () => {
  const i18n = new I18n(translations());
  i18n.enableFallback = true;

  i18n.locale = "zh-Hant-TW";

  expect(i18n.locales.get("zh-Hant-TW")).toEqual([
    "zh-Hant-TW",
    "zh-Hant",
    "zh",
    "en",
  ]);
});
