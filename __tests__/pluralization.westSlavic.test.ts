import { I18n } from "../src/I18n";
import { westSlavic } from "../src/pluralize/westSlavic";
import { translations } from "./fixtures/translations";

const i18n = new I18n(translations());
i18n.pluralization.register("cs", westSlavic);

test("detects one key", () => {
  expect(westSlavic(i18n, 1)).toEqual(["one"]);
});

test("detects few key", () => {
  expect(westSlavic(i18n, 2)).toEqual(["few"]);
  expect(westSlavic(i18n, 3)).toEqual(["few"]);
  expect(westSlavic(i18n, 4)).toEqual(["few"]);
});

test("detects other key", () => {
  expect(westSlavic(i18n, 0)).toEqual(["other"]);
  expect(westSlavic(i18n, 1.1)).toEqual(["other"]);
  expect(westSlavic(i18n, 5)).toEqual(["other"]);
  expect(westSlavic(i18n, 6)).toEqual(["other"]);
});
