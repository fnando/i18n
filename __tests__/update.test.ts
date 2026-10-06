import { get } from "es-toolkit/compat";

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

test("sets translation path (update with custom separator)", () => {
  const i18n = new I18n(
    { en: { "message.with.dots": "Hi" } },
    { defaultSeparator: "•" },
  );
  i18n.update("en•message.with.dots", "Hello");

  expect(i18n.translations).toEqual({ en: { "message.with.dots": "Hello" } });
});

test("does not pollute Object.prototype via constructor/prototype path", () => {
  const key = "isAdmin";
  // eslint-disable-next-line no-prototype-builtins, @typescript-eslint/no-explicit-any
  delete (Object.prototype as any)[key];

  const i18n = new I18n();
  i18n.update(`safe.constructor.prototype.${key}`, "true");

  expect(Object.prototype.hasOwnProperty.call(Object.prototype, key)).toBe(
    false,
  );
  expect(({} as Record<string, unknown>)[key]).toBeUndefined();
  expect(get(i18n.translations, "safe.constructor.prototype.isAdmin")).toEqual(
    "true",
  );
});

test("does not pollute Object.prototype via __proto__ path", () => {
  const key = "polluted";
  // eslint-disable-next-line no-prototype-builtins, @typescript-eslint/no-explicit-any
  delete (Object.prototype as any)[key];

  const i18n = new I18n();
  i18n.update(`en.__proto__.${key}`, "true");

  expect(Object.prototype.hasOwnProperty.call(Object.prototype, key)).toBe(
    false,
  );
  expect(({} as Record<string, unknown>)[key]).toBeUndefined();
});

test("keeps constructor/prototype as regular translation keys", () => {
  const i18n = new I18n();
  i18n.update("en.constructor", "C");
  i18n.update("en.prototype", "P");

  expect(get(i18n.translations, "en.constructor")).toEqual("C");
  expect(get(i18n.translations, "en.prototype")).toEqual("P");
  expect(i18n.t("constructor")).toEqual("C");
});

test("raises error when path doesn't exist in strict mode", () => {
  const i18n = new I18n();

  expect(() => i18n.update("en.hi", "Hi", { strict: true })).toThrow(
    'The path "en.hi" is not currently defined',
  );
});

test("raises error when type differs in strict mode", () => {
  const i18n = new I18n({ en: { hi: "Hi" } });

  expect(() => i18n.update("en.hi", null, { strict: true })).toThrow(
    'The current type for "en.hi" is "string", but you\'re trying to override it with "null"',
  );
});
