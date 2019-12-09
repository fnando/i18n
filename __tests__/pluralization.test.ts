import { translations } from "./fixtures/translations";
import { I18n } from "../src/I18n";

test("sets alias", () => {
  const i18n = new I18n(translations());

  expect(i18n.p).toEqual(i18n.pluralize);
});

test("pluralizes scope", () => {
  const i18n = new I18n(translations());

  expect(i18n.p(0, "inbox")).toEqual("You have no messages");
  expect(i18n.p(1, "inbox")).toEqual("You have 1 message");
  expect(i18n.p(5, "inbox")).toEqual("You have 5 messages");
});

test("pluralizes using the 'other' scope", () => {
  const i18n = new I18n(translations());
  delete i18n.translations.en.inbox.zero;

  expect(i18n.p(0, "inbox")).toEqual("You have 0 messages");
});

test("pluralizes using the 'zero' scope", () => {
  const i18n = new I18n(translations());
  i18n.mergeTranslations("en.inbox", { zero: "No messages (zero)" });

  expect(i18n.p(0, "inbox")).toEqual("No messages (zero)");
});

test("pluralizes using negative values", () => {
  const i18n = new I18n(translations());

  expect(i18n.p(-1, "inbox")).toEqual("You have -1 messages");
  expect(i18n.p(-5, "inbox")).toEqual("You have -5 messages");
});

test("returns missing translation", () => {
  const i18n = new I18n(translations());
  expect(i18n.p(-1, "missing")).toEqual('[missing "en.missing" translation]');
});

test("pluralizes using multiple placeholders", () => {
  const i18n = new I18n(translations());

  let actual = i18n.p(1, "unread", { unread: 5 });
  expect(actual).toEqual("You have 1 new message (5 unread)");

  actual = i18n.p(10, "unread", { unread: 2 });
  expect(actual).toEqual("You have 10 new messages (2 unread)");

  actual = i18n.p(0, "unread", { unread: 5 });
  expect(actual).toEqual("You have no new messages (5 unread)");
});

test("allows empty strings", () => {
  const i18n = new I18n(translations());
  i18n.mergeTranslations("en.inbox", { zero: "" });

  expect(i18n.p(0, "inbox")).toEqual("");
});

test("pluralizes using custom rules", () => {
  const i18n = new I18n(translations());
  i18n.locale = "custom";

  i18n.pluralization.register("custom", (_i18n, count) => {
    if (count === 0) {
      return ["zero"];
    }

    if (count >= 1 && count <= 5) {
      return ["few", "other"];
    }

    return ["other"];
  });

  i18n.mergeTranslations("custom.things", {
    zero: "No things",
    few: "A few things",
    other: "%{count} things",
  });

  expect(i18n.p(0, "things")).toEqual("No things");
  expect(i18n.p(4, "things")).toEqual("A few things");
  expect(i18n.p(-4, "things")).toEqual("-4 things");
  expect(i18n.p(10, "things")).toEqual("10 things");
});

test("pluralizes default value", () => {
  const i18n = new I18n(translations());
  const options = {
    defaultValue: {
      zero: "No things here!",
      one: "There is {{count}} thing here!",
      other: "There are {{count}} things here!",
    },
  };

  expect(i18n.p(0, "things", options)).toEqual("No things here!");
  expect(i18n.p(1, "things", options)).toEqual("There is 1 thing here!");
  expect(i18n.p(5, "things", options)).toEqual("There are 5 things here!");
});

test("ignores pluralization when scope exists", () => {
  const i18n = new I18n(translations());
  const options = {
    defaultValue: {
      zero: "No things here!",
      one: "There is {{count}} thing here!",
      other: "There are {{count}} things here!",
    },
  };

  expect(i18n.p(0, "inbox", options)).toEqual("You have no messages");
  expect(i18n.p(1, "inbox", options)).toEqual("You have 1 message");
  expect(i18n.p(5, "inbox", options)).toEqual("You have 5 messages");
});

test("pluralizes using the correct scope if translation is found within default scope", () => {
  const i18n = new I18n(translations());
  const actual = i18n.t("mailbox.inbox", {
    count: 1,
    defaults: [{ scope: "inbox" }],
  });

  expect(i18n.translations.en.mailbox).toBeUndefined();
  expect(actual).toEqual("You have 1 message");
});
