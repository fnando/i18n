import { I18n } from "../src/I18n";

const i18n = new I18n({});

test("notifies when locale changes", () => {
  const callback = jest.fn();
  i18n.onChange(callback);

  i18n.locale = "en";
  i18n.locale = "pt-BR";

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith(i18n);
});

test("notifies when default locale changes", () => {
  const callback = jest.fn();
  i18n.onChange(callback);

  i18n.defaultLocale = "en";
  i18n.defaultLocale = "pt-BR";

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith(i18n);
});

test("notifies when I18n#store is called", () => {
  const callback = jest.fn();
  i18n.onChange(callback);

  i18n.store({});
  i18n.store({});

  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenCalledWith(i18n);
});

test("notifies when I18n#update is called", () => {
  const callback = jest.fn();
  i18n.onChange(callback);

  i18n.update("en.hello", "hello");
  i18n.update("en.hello", "hello");

  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenCalledWith(i18n);
});

test("notifies multiple callbacks", () => {
  const callback = jest.fn();
  const anotherCallback = jest.fn();

  i18n.onChange(callback);
  i18n.onChange(anotherCallback);

  i18n.update("en.hello", "hello");

  expect(callback).toHaveBeenCalledTimes(1);
  expect(anotherCallback).toHaveBeenCalledTimes(1);
});
