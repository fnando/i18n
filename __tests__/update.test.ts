import { get } from "lodash";

import { I18n } from "../src/I18n";

test("sets translation path (string override)", () => {
  const i18n = new I18n();
  i18n.update("en.hello", "Hi");

  expect(get(i18n.translations, "en.hello")).toEqual("Hi");
});

test("sets translation path (object override)", () => {
  const i18n = new I18n();
  i18n.update("en.messages", { hi: "Hi" });

  expect(get(i18n.translations, "en.messages")).toEqual({ hi: "Hi" });
});

test("sets translation path (partial object override)", () => {
  const i18n = new I18n({ en: { messages: { hi: "Hi", bye: "Bye" } } });
  i18n.update("en.messages", { bye: "Seeya" });

  expect(get(i18n.translations, "en.messages")).toEqual({
    hi: "Hi",
    bye: "Seeya",
  });
});

test("raises error when path doesn't exist in strict mode", () => {
  const i18n = new I18n();

  expect(() => i18n.update("en.hi", "Hi", { strict: true })).toThrowError(
    'The path "en.hi" is not currently defined',
  );
});

test("raises error when type differs in strict mode", () => {
  const i18n = new I18n({ en: { hi: "Hi" } });

  expect(() => i18n.update("en.hi", null, { strict: true })).toThrowError(
    'The current type for "en.hi" is "string", but you\'re trying to override it with "null"',
  );
});
