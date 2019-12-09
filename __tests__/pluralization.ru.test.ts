import { translations } from "./fixtures/translations";
import { I18n } from "../src/I18n";
import { ru } from "../src/pluralize/ru";

const i18n = new I18n(translations());
i18n.pluralization.register("ru", ru);

test("detects one key", () => {
  expect(ru(i18n, 1)).toEqual(["one"]);
  expect(ru(i18n, 21)).toEqual(["one"]);
  expect(ru(i18n, 31)).toEqual(["one"]);
  expect(ru(i18n, 41)).toEqual(["one"]);
  expect(ru(i18n, 51)).toEqual(["one"]);
});

test("detects few key", () => {
  expect(ru(i18n, 2)).toEqual(["few"]);
  expect(ru(i18n, 3)).toEqual(["few"]);
  expect(ru(i18n, 4)).toEqual(["few"]);
  expect(ru(i18n, 22)).toEqual(["few"]);
  expect(ru(i18n, 23)).toEqual(["few"]);
  expect(ru(i18n, 24)).toEqual(["few"]);
});

test("detects many key", () => {
  expect(ru(i18n, 0)).toEqual(["many"]);
  expect(ru(i18n, 5)).toEqual(["many"]);
  expect(ru(i18n, 6)).toEqual(["many"]);
  expect(ru(i18n, 7)).toEqual(["many"]);
  expect(ru(i18n, 8)).toEqual(["many"]);
  expect(ru(i18n, 9)).toEqual(["many"]);
  expect(ru(i18n, 10)).toEqual(["many"]);
  expect(ru(i18n, 11)).toEqual(["many"]);
  expect(ru(i18n, 12)).toEqual(["many"]);
  expect(ru(i18n, 13)).toEqual(["many"]);
  expect(ru(i18n, 14)).toEqual(["many"]);
  expect(ru(i18n, 15)).toEqual(["many"]);
  expect(ru(i18n, 16)).toEqual(["many"]);
  expect(ru(i18n, 17)).toEqual(["many"]);
  expect(ru(i18n, 18)).toEqual(["many"]);
  expect(ru(i18n, 19)).toEqual(["many"]);
  expect(ru(i18n, 20)).toEqual(["many"]);
});

test("detects other key", () => {
  expect(ru(i18n, 1.1)).toEqual(["other"]);
});
