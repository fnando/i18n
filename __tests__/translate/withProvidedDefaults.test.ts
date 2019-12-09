import { translations } from "../fixtures/translations";
import { I18n } from "../../src/I18n";

let i18n: I18n;

beforeEach(() => {
  i18n = new I18n(translations());
});

test("uses scope provided in defaults if scope doesn't exist", () => {
  const actual = i18n.t("Hello!", {
    defaults: [{ scope: "greetings.stranger" }],
  });
  expect(actual).toEqual("Hello stranger!");
});

test("continues to fallback until a scope is found", () => {
  var defaults = [{ scope: "foo" }, { scope: "hello" }];

  const actual = i18n.t("foo", { defaults: defaults });
  expect(actual).toEqual("Hello World!");
});

test("uses message if specified as a default", () => {
  var defaults = [{ message: "Hello all!" }];
  const actual = i18n.t("foo", { defaults: defaults });

  expect(actual).toEqual("Hello all!");
});

test("uses the first message if no scopes are found", () => {
  var defaults = [
    { scope: "bar" },
    { message: "Hello all!" },
    { scope: "hello" },
  ];
  const actual = i18n.t("foo", { defaults: defaults });

  expect(actual).toEqual("Hello all!");
});

test("uses default value if no scope is found", () => {
  var options = {
    defaults: [{ scope: "bar" }],
    defaultValue: "Hello all!",
  };
  const actual = i18n.t("foo", options);

  expect(actual).toEqual("Hello all!");
});
