import { translations } from "./fixtures/translations";
import { I18n } from "../src/I18n";

const i18n = new I18n(translations());

test("matches {{name}}", () => {
  expect("{{name}}".match(i18n.placeholder)).toBeTruthy();
});

test("matches %{name}", () => {
  expect("%{name}".match(i18n.placeholder)).toBeTruthy();
});

test("returns placeholders", () => {
  const translation = "I like %{javascript}. I also like %{ruby}";
  const [javascript, ruby] = translation.match(i18n.placeholder) || [];

  expect(javascript).toEqual("%{javascript}");
  expect(ruby).toEqual("%{ruby}");
});
