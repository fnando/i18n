import { translations } from "./fixtures/translations";
import { I18n } from "../src/I18n";

test("when count is provided and translation key has pluralization", () => {
  const i18n = new I18n(translations());

  expect(i18n.t("inbox", { count: 0 })).toEqual("You have no messages");
  expect(i18n.t("inbox", { count: 1 })).toEqual("You have 1 message");
  expect(i18n.t("inbox", { count: 5 })).toEqual("You have 5 messages");
});

test("when count is provided and translation key doesn't have pluralization", () => {
  const i18n = new I18n(translations());

  expect(i18n.t("hello", { count: 0 })).toEqual("Hello World!");
  expect(i18n.t("hello", { count: 1 })).toEqual("Hello World!");
  expect(i18n.t("hello", { count: 5 })).toEqual("Hello World!");
});

test("when count is not provided and translation key has pluralization", () => {
  const i18n = new I18n(translations());
  const options = {
    one: "You have {{count}} message",
    other: "You have {{count}} messages",
    zero: "You have no messages",
  };

  expect(i18n.t("inbox", { not_count: 0 })).toEqual(options);
  expect(i18n.t("inbox", { not_count: 1 })).toEqual(options);
  expect(i18n.t("inbox", { not_count: 5 })).toEqual(options);
});

test("when count is not provided and translation key doesn't have pluralization", () => {
  const i18n = new I18n(translations());

  expect(i18n.t("hello", { not_count: 0 })).toEqual("Hello World!");
  expect(i18n.t("hello", { not_count: 1 })).toEqual("Hello World!");
  expect(i18n.t("hello", { not_count: 5 })).toEqual("Hello World!");
});
