import { I18n } from "../src/I18n";
import { translations } from "./fixtures/translations";

test("restores locale", async () => {
  const i18n = new I18n(translations());
  i18n.locale = "pt-BR";

  let actual;

  await i18n.withLocale("fr", function () {
    actual = i18n.locale;
  });

  expect(i18n.locale).toEqual("pt-BR");
  expect(actual).toEqual("fr");
});

test("restores locale when function raises exception", async () => {
  const i18n = new I18n(translations());
  i18n.locale = "pt-BR";

  await expect(
    i18n.withLocale("fr", () => {
      throw "sample";
    }),
  ).rejects.toEqual("sample");

  expect(i18n.locale).toEqual("pt-BR");
});
