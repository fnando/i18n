import { get } from "lodash";
import { I18n } from "../src/I18n";

describe("I18n#store", () => {
  test("updates store", () => {
    const i18n = new I18n({});
    i18n.store({ en: { hello: "Hello" }, pt: { hello: "Olá" } });
    i18n.store({ pt: { hello: "Oi", bye: "Até logo" } });
    i18n.store({ en: { colors: { blue: ["light", "dark"] } } });

    expect(get(i18n.translations, "en.hello")).toEqual("Hello");
    expect(get(i18n.translations, "pt.hello")).toEqual("Oi");
    expect(get(i18n.translations, "pt.bye")).toEqual("Até logo");
    expect(get(i18n.translations, "en.colors.blue")).toEqual(["light", "dark"]);
  });

  test("works with numeric keys", () => {
    const i18n = new I18n();
    i18n.store({ en: { units: { l: "liter", "1": "number" } } });

    expect(get(i18n.translations, "en.units.l")).toEqual("liter");
    expect(get(i18n.translations, "en.units.1")).toEqual("number");
    expect(get(i18n.translations, "en.units")).toEqual({
      l: "liter",
      "1": "number",
    });
  });

  test("does not pollute Object.prototype", () => {
    const key = "polluted";
    // eslint-disable-next-line no-prototype-builtins, @typescript-eslint/no-explicit-any
    delete (Object.prototype as any)[key];

    const i18n = new I18n();
    i18n.store(JSON.parse(`{"__proto__": {"${key}": "yes"}}`));
    i18n.store(
      JSON.parse(`{"en": {"constructor": {"prototype": {"${key}": "yes"}}}}`),
    );

    expect(Object.prototype.hasOwnProperty.call(Object.prototype, key)).toBe(
      false,
    );
    expect(({} as Record<string, unknown>)[key]).toBeUndefined();
  });
});
