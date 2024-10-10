import { I18n } from "../src/I18n";
import { translations } from "./fixtures/translations";

test("performs single interpolation", () => {
  const i18n = new I18n(translations());
  const actual = i18n.t("greetings.name", { name: "John Doe" });

  expect(actual).toEqual("Hello John Doe!");
});

test("performs multiple interpolations", () => {
  const i18n = new I18n(translations());
  const actual = i18n.t("profile.details", { name: "John Doe", age: 27 });

  expect(actual).toEqual("John Doe is 27-years old");
});

test("interpolates multiple instances of each variable", () => {
  const i18n = new I18n(translations());
  const actual = i18n.t("multiple_variables", { name: "John Doe" });

  expect(actual).toEqual("Hello, John Doe! Your name is John Doe.");
});

test("outputs missing placeholder message if interpolation value is missing", () => {
  const i18n = new I18n(translations());
  const actual = i18n.t("greetings.name");

  expect(actual).toEqual('Hello [missing "{{name}}" value]!');
});

test("outputs missing placeholder message if interpolation value is null", () => {
  const i18n = new I18n(translations());
  const actual = i18n.t("greetings.name", { name: null });

  expect(actual).toEqual('Hello [missing "{{name}}" value]!');
});

test("allows overriding the null placeholder message", () => {
  const i18n = new I18n(translations(), { nullPlaceholder: () => "" });
  const actual = i18n.t("greetings.name", { name: null });

  expect(actual).toEqual("Hello !");
});

test("provides missingPlaceholder with the placeholder, message, and options object", () => {
  let actualArgs: any[] = [];
  const i18n = new I18n(translations(), {
    missingPlaceholder: (...args) => {
      actualArgs = args;
      return "[missing-placeholder-debug]";
    },
  });

  const actual = i18n.t("greetings.name", { debugScope: "landing-page" });
  const [anotherI18n, placeholder, message, options] = actualArgs;

  expect(anotherI18n).toEqual(i18n);
  expect(actual).toEqual("Hello [missing-placeholder-debug]!");
  expect(placeholder).toEqual("{{name}}");
  expect(message).toEqual("Hello {{name}}!");
  expect(options.debugScope).toEqual("landing-page");
});

test("interpolates array of strings", () => {
  const i18n = new I18n({
    en: {
      someTranslation: ["Some text", "Value of something is {{value}}", 42],
    },
  });

  const actual = i18n.t("someTranslation", { value: 123 });
  const expected = ["Some text", "Value of something is 123", 42];

  expect(actual).toEqual(expected);
});
