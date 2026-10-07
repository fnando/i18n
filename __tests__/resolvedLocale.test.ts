import { I18n } from "../src/I18n";
import { translations } from "./fixtures/translations";

test("returns the current locale when it has translations", () => {
  const i18n = new I18n(translations(), { locale: "en" });

  expect(i18n.resolvedLocale).toEqual("en");
});

test("falls back to the default locale when the current one is missing", () => {
  const i18n = new I18n(
    { en: translations().en, de: translations().de },
    { locale: "cs", defaultLocale: "en", enableFallback: true },
  );

  expect(i18n.resolvedLocale).toEqual("en");
});

test("falls back to the region/script's base locale", () => {
  const i18n = new I18n(translations(), {
    locale: "de-DE",
    enableFallback: true,
  });

  expect(i18n.resolvedLocale).toEqual("de");
});

test("returns the requested locale when fallback is disabled", () => {
  const i18n = new I18n(
    { en: translations().en },
    { locale: "cs", defaultLocale: "en", enableFallback: false },
  );

  expect(i18n.resolvedLocale).toEqual("cs");
});

test("returns the current locale when nothing matches", () => {
  const i18n = new I18n({}, { locale: "cs" });

  expect(i18n.resolvedLocale).toEqual("cs");
});

test("follows a custom locale resolver", () => {
  const i18n = new I18n(translations(), { locale: "no" });
  i18n.locales.register("no", ["nb", "en"]);

  expect(i18n.resolvedLocale).toEqual("nb");
});

test("falls back to the script locale before the language", () => {
  const i18n = new I18n(translations(), {
    locale: "zh-Hant-TW",
    enableFallback: true,
  });

  expect(i18n.resolvedLocale).toEqual("zh-Hant");
});

test("does not split region codes when fallback is disabled", () => {
  const i18n = new I18n(
    { de: translations().de },
    { locale: "de-DE", enableFallback: false },
  );

  expect(i18n.resolvedLocale).toEqual("de-DE");
});

test("resolves against the effective locale when unset", () => {
  const i18n = new I18n(translations(), { defaultLocale: "en" });
  i18n.locale = "";

  expect(i18n.resolvedLocale).toEqual("en");
});
