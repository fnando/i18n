import { translations } from "./fixtures/translations";
import { I18n } from "../src/I18n";

test("sets default locale to en", () => {
  const i18n = new I18n(translations);
  expect(i18n.locale).toEqual("en");
});

test("returns instance locale when set", () => {
  const i18n = new I18n(translations, { locale: "pt-BR" });
  expect(i18n.locale).toEqual("pt-BR");

  i18n.locale = "es";
  expect(i18n.locale).toEqual("es");
});

test("returns default locale when locale is unset", () => {
  const i18n = new I18n(translations);
  i18n.locale = "";

  expect(i18n.locale).toEqual("en");
});
