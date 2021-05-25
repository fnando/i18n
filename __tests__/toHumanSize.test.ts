import { I18n } from "../src/I18n";
import { translations } from "./fixtures/translations";

test("returns number as human size", () => {
  const i18n = new I18n(translations());
  const kb = 1024;

  expect(i18n.toHumanSize(1)).toEqual("1Byte");
  expect(i18n.toHumanSize(100)).toEqual("100Bytes");

  expect(i18n.toHumanSize(kb)).toEqual("1KB");
  expect(i18n.toHumanSize(kb * 1.5)).toEqual("1.5KB");

  expect(i18n.toHumanSize(kb * kb)).toEqual("1MB");
  expect(i18n.toHumanSize(kb * kb * 1.5)).toEqual("1.5MB");

  expect(i18n.toHumanSize(kb * kb * kb)).toEqual("1GB");
  expect(i18n.toHumanSize(kb * kb * kb * 1.5)).toEqual("1.5GB");

  expect(i18n.toHumanSize(kb * kb * kb * kb)).toEqual("1TB");
  expect(i18n.toHumanSize(kb * kb * kb * kb * 1.5)).toEqual("1.5TB");

  expect(i18n.toHumanSize(kb * kb * kb * kb * kb)).toEqual("1024TB");
});

test("returns number as human size using custom options", () => {
  const i18n = new I18n(translations());

  expect(i18n.toHumanSize(1024 * 1.6, { precision: 0 })).toEqual("2KB");
});
