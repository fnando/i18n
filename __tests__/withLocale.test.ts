import { translations } from "./fixtures/translations";
import { I18n } from "../src/I18n";

test("restores locale", () => {
  const i18n = new I18n(translations());
  i18n.locale = "pt-BR";

  let actual;

  i18n.withLocale("fr", function() {
    actual = i18n.locale;
  });

  expect(i18n.locale).toEqual("pt-BR");
  expect(actual).toEqual("fr");
});

test("restores locale when function raises exception", () => {
  const i18n = new I18n(translations());
  i18n.locale = "pt-BR";

  expect(() => {
    i18n.withLocale("fr", () => {
      throw "sample";
    });
  }).toThrowError("sample");

  expect(i18n.locale).toEqual("pt-BR");
});
