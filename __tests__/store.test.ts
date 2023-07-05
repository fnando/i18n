import get from "../src/vendor/lodash/get";
import { I18n } from "../src/I18n";

describe("I18n#store", () => {
  it("updates store", () => {
    const i18n = new I18n({});
    i18n.store({ en: { hello: "Hello" }, pt: { hello: "Olá" } });
    i18n.store({ pt: { hello: "Oi", bye: "Até logo" } });
    i18n.store({ en: { colors: { blue: ["light", "dark"] } } });

    expect(get(i18n.translations, "en.hello")).toEqual("Hello");
    expect(get(i18n.translations, "pt.hello")).toEqual("Oi");
    expect(get(i18n.translations, "pt.bye")).toEqual("Até logo");
    expect(get(i18n.translations, "en.colors.blue")).toEqual(["light", "dark"]);
  });
});
