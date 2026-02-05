import { snakeCase } from "lodash";

import { I18n } from "../src/I18n";
import { Dict, Scope } from "../src/typing";
import { translations } from "./fixtures/translations";

let i18n: I18n;

beforeEach(() => {
  i18n = new I18n(translations());
});

test("returns translation for single scope", () => {
  expect(i18n.t("hello")).toEqual("Hello World!");
});

test("returns translation as object", () => {
  expect(i18n.t("greetings")).toEqual(i18n.translations.en.greetings);
});

test("returns missing message translation for invalid scope", () => {
  const actual = i18n.t("invalid.scope");
  const expected = '[missing "en.invalid.scope" translation]';

  expect(actual).toEqual(expected);
});

test("throws an error if missingBehavior is set to error", () => {
  i18n.missingBehavior = "error";

  expect(() => i18n.t("missing.translation")).toThrow(
    "Missing translation: en.missing.translation",
  );
});

test("returns guessed translation if missingBehavior is set to guess", () => {
  i18n.missingBehavior = "guess";
  const actual = i18n.t("invalid.thisIsAutomaticallyGeneratedTranslation");
  const expected = "this is automatically generated translation";

  expect(actual).toEqual(expected);
});

test("returns guessed translation with scope as array", () => {
  i18n.missingBehavior = "guess";
  const actual = i18n.t(["invalid", "thisIsAutomaticallyGeneratedTranslation"]);
  const expected = "this is automatically generated translation";

  expect(actual).toEqual(expected);
});

test("returns guessed translation with prefix if missingBehavior is set to guess and prefix is also provided", () => {
  i18n.missingBehavior = "guess";
  i18n.missingTranslationPrefix = "EE: ";

  const actual = i18n.t("invalid.thisIsAutomaticallyGeneratedTranslation");
  const expected = "EE: this is automatically generated translation";

  expect(actual).toEqual(expected);
});

test("returns missing message translation for valid scope with scope", () => {
  const actual = i18n.t("monster", { scope: "greetings" });
  const expected = '[missing "en.greetings.monster" translation]';

  expect(actual).toEqual(expected);
});

test("raises error for invalid locale type", () => {
  expect(() => {
    // eslint-disable-next-line
    // @ts-ignore
    i18n.locale = null;
  }).toThrow("Expected newLocale to be a string; got null");

  expect(() => {
    // eslint-disable-next-line
    // @ts-ignore
    i18n.defaultLocale = null;
  }).toThrow("Expected newLocale to be a string; got null");
});

test("returns translation for single scope on a custom locale", () => {
  i18n.locale = "pt-BR";
  expect(i18n.t("hello")).toEqual("Olá Mundo!");
});

test("returns translation for multiple scopes", () => {
  expect(i18n.t("greetings.stranger")).toEqual("Hello stranger!");
});

test("returns translation with default locale option", () => {
  expect(i18n.t("hello", { locale: "en" })).toEqual("Hello World!");
  expect(i18n.t("hello", { locale: "pt-BR" })).toEqual("Olá Mundo!");
});

test("fallbacks to the default locale when i18n.enableFallback is enabled", () => {
  i18n.locale = "pt-BR";
  i18n.enableFallback = true;
  expect(i18n.t("greetings.stranger")).toEqual("Hello stranger!");
});

test("fallbacks to default locale when providing an unknown locale", () => {
  i18n.locale = "fr";
  i18n.enableFallback = true;
  expect(i18n.t("greetings.stranger")).toEqual("Hello stranger!");
});

test("fallbacks to less specific locale", () => {
  i18n.locale = "de-DE";
  i18n.enableFallback = true;
  expect(i18n.t("hello")).toEqual("Hallo Welt!");
});

test("fallbacks using custom rules (function)", () => {
  i18n.locale = "no";
  i18n.enableFallback = true;
  i18n.locales.register("no", () => ["nb"]);

  expect(i18n.t("hello")).toEqual("Hei Verden!");
});

test("fallbacks using custom rules (array)", () => {
  i18n.locale = "no";
  i18n.enableFallback = true;
  i18n.locales.register("no", ["no", "nb"]);

  expect(i18n.t("hello")).toEqual("Hei Verden!");
});

test("fallbacks using custom rules (string)", () => {
  i18n.locale = "no";
  i18n.enableFallback = true;
  i18n.locales.register("no", "nb");

  expect(i18n.t("hello")).toEqual("Hei Verden!");
});

test("uses default value for simple translation", () => {
  const actual = i18n.t("warning", { defaultValue: "Warning!" });
  expect(actual).toEqual("Warning!");
});

test("uses default value for unknown locale", () => {
  i18n.locale = "fr";
  const actual = i18n.t("warning", { defaultValue: "Warning!" });
  expect(actual).toEqual("Warning!");
});

test("uses default value with interpolation", () => {
  const actual = i18n.t("alert", {
    defaultValue: "Attention! {{message}}",
    message: "You're out of quota!",
  });

  expect(actual).toEqual("Attention! You're out of quota!");
});

test("ignores default value when scope exists", () => {
  const actual = i18n.t("hello", { defaultValue: "What's up?" });
  expect(actual).toEqual("Hello World!");
});

test("returns translation for custom scope separator", () => {
  i18n.defaultSeparator = "•";
  const actual = i18n.t("greetings•stranger");

  expect(actual).toEqual("Hello stranger!");
});

test("returns translation for custom scope separator and dots", () => {
  i18n.defaultSeparator = "•";
  const actual = i18n.t("greetings•stranger.dot");

  expect(actual).toEqual("Hello stranger.dot!");
});

test("returns boolean values", () => {
  expect(i18n.t("booleans.yes")).toBeTruthy();
  expect(i18n.t("booleans.no")).toBeFalsy();
});

test("escapes $ when doing substitution (IE)", () => {
  i18n.locale = "en";

  expect(i18n.t("paid", { price: "$0" })).toEqual("You were paid $0");
  expect(i18n.t("paid", { price: "$0.12" })).toEqual("You were paid $0.12");
  expect(i18n.t("paid", { price: "$1.35" })).toEqual("You were paid $1.35");
});

test("replaces all occurrences of escaped $", () => {
  i18n.locale = "en";
  const actual = i18n.t("paid_with_vat", {
    price: "$0.12",
    vat: "$0.02",
  });

  expect(actual).toEqual("You were paid $0.12 (incl. VAT $0.02)");
});

test("sets default scope", () => {
  const options = { scope: "greetings" };
  expect(i18n.t("stranger", options)).toEqual("Hello stranger!");
});

test("accepts the scope as an array", () => {
  expect(i18n.t(["greetings", "stranger"])).toEqual("Hello stranger!");
});

test("accepts the scope as an array using a base scope", () => {
  expect(i18n.t(["stranger"], { scope: "greetings" })).toEqual(
    "Hello stranger!",
  );
});

test("fallbacks to script code when region is not available", () => {
  i18n.locale = "zh-Hant-TW";
  i18n.enableFallback = true;

  expect(i18n.t("cat")).toEqual("貓");
});

test("fallbacks to country code when region is not available", () => {
  i18n.locale = "zh-Hant-TW";
  i18n.enableFallback = true;

  expect(i18n.t("dog")).toEqual("狗");
});

test("fallbacks to 2-part for the first time", () => {
  i18n.locale = "zh-Hant-TW";
  i18n.enableFallback = true;

  expect(i18n.t("dragon")).toEqual("龍");
});

test("uses default scope over default value if default scope is found", () => {
  const actual = i18n.t("foo", {
    defaults: [{ scope: "hello" }],
    defaultValue: "Hello all!",
  });

  expect(actual).toEqual("Hello World!");
});

test("uses default value with lazy evaluation", () => {
  let actualArgs: any[] = [];
  const options = {
    defaults: [{ scope: "bar" }],
    defaultValue: (i18n: I18n, scope: Scope, options: Dict) => {
      actualArgs = [i18n, scope, options];
      return (scope as string).toUpperCase();
    },
  };

  const actual = i18n.t("foo", options);

  expect(actual).toEqual("FOO");
  expect(actualArgs[0]).toEqual(i18n);
  expect(actualArgs[1]).toEqual("foo");
  expect(actualArgs[2]).toEqual({ defaults: [{ scope: "bar" }] });
});

test("displays correct missing translation when using locale option", () => {
  i18n.locale = "en";

  expect(i18n.t("hello", { locale: "zz" })).toEqual(
    '[missing "zz.hello" translation]',
  );
});

test("displays correct missing translation when using locale option as null", () => {
  i18n.locale = "en";

  expect(i18n.t("hello", { locale: null })).toEqual(
    '[missing "null.hello" translation]',
  );
});

test("uses key transformer to fetch translation", () => {
  i18n.locale = "en";
  i18n.transformKey = (key: string) => snakeCase(key);

  expect(i18n.t("transformKey.niceOne")).toEqual("Nice one!");

  expect(
    i18n.t("transformKey.niceOneWithName", { fullName: "John Doe" }),
  ).toEqual("Nice one, John Doe!");

  expect(
    i18n.t("transformKey.nice_one_with_name", { full_name: "John Doe" }),
  ).toEqual("Nice one, John Doe!");
});

test("uses missing behavior provided by option", () => {
  i18n.missingTranslation.register("empty", () => "<empty>");

  expect(i18n.t("unknown.key")).toEqual(
    '[missing "en.unknown.key" translation]',
  );

  expect(i18n.t("unknown.key", { missingBehavior: "empty" })).toEqual(
    "<empty>",
  );
});
