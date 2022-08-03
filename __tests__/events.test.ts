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

test("updates change version", () => {
  const versions: string[] = [];

  const callback = (i18n: I18n) => versions.push(`1-${i18n.version}`);
  const anotherCallback = (i18n: I18n) => versions.push(`2-${i18n.version}`);

  const i18n = new I18n({});

  // The constructor calls I18n#store, so the actual initialized version will
  // always be 1.
  expect(i18n.version).toEqual(1);

  i18n.onChange(callback);
  i18n.onChange(anotherCallback);

  i18n.update("en.hello", "hello");
  expect(i18n.version).toEqual(2);

  i18n.update("en.hello", "hello");
  expect(i18n.version).toEqual(3);

  i18n.store({ en: { hello: "hi" } });
  expect(i18n.version).toEqual(4);

  i18n.locale = "pt-BR";
  expect(i18n.version).toEqual(5);

  // No changes, no need version bump.
  i18n.locale = "pt-BR";
  expect(i18n.version).toEqual(5);

  i18n.defaultLocale = "pt-BR";
  expect(i18n.version).toEqual(6);

  // No changes, no need version bump.
  i18n.defaultLocale = "pt-BR";
  expect(i18n.version).toEqual(6);

  expect(versions).toEqual([
    "1-2",
    "2-2",
    "1-3",
    "2-3",
    "1-4",
    "2-4",
    "1-5",
    "2-5",
    "1-6",
    "2-6",
  ]);
});

test("unsubscribes from events", () => {
  i18n.locale = "en";

  const callback = jest.fn();
  const anotherCallback = jest.fn();

  const unsubscribe = i18n.onChange(callback);
  i18n.onChange(anotherCallback);

  i18n.locale = "pt-BR";

  expect(callback).toHaveBeenCalledTimes(1);
  expect(anotherCallback).toHaveBeenCalledTimes(1);

  unsubscribe();

  i18n.locale = "en";

  expect(callback).toHaveBeenCalledTimes(1);
  expect(anotherCallback).toHaveBeenCalledTimes(2);
});
