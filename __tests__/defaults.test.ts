import { I18n } from "../src/I18n";

const i18n = new I18n({});

test("sets the default locale", () => {
  expect(i18n.defaultLocale).toEqual("en");
});

test("sets current locale", () => {
  expect(i18n.locale).toEqual("en");
});

test("sets default separator", () => {
  expect(i18n.defaultSeparator).toEqual(".");
});

test("sets fallback", () => {
  expect(i18n.enableFallback).toBeFalsy();
});

test("set empty translation prefix", () => {
  expect(i18n.missingTranslationPrefix).toEqual("");
});

test("sets default missingBehavior", () => {
  expect(i18n.missingBehavior).toEqual("message");
});
