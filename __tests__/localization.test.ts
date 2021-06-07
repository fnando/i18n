import { I18n } from "../src/I18n";
import { translations } from "./fixtures/translations";

test("sets alias", () => {
  const i18n = new I18n(translations());
  expect(i18n.l).toEqual(i18n.localize);
});

test("localizes number", () => {
  const i18n = new I18n(translations());
  expect(i18n.l("number", 1234567)).toEqual("1,234,567.000");
});

test("localizes currency", () => {
  const i18n = new I18n(translations());
  expect(i18n.l("currency", 1234567)).toEqual("$1,234,567.00");
});

test("localizes date strings", () => {
  const i18n = new I18n(translations());
  i18n.locale = "pt-BR";

  expect(i18n.l("date.formats.default", "2009-11-29")).toEqual("29/11/2009");
  expect(i18n.l("date.formats.short", "2009-01-07")).toEqual("07 de Janeiro");
  expect(i18n.l("date.formats.long", "2009-01-07")).toEqual(
    "07 de Janeiro de 2009",
  );
});

test("localizes time strings", () => {
  const i18n = new I18n(translations());
  i18n.locale = "pt-BR";

  expect(i18n.l("time.formats.default", "2009-11-29 15:07:59")).toEqual(
    "Domingo, 29 de Novembro de 2009, 15:07 h",
  );

  expect(i18n.l("time.formats.short", "2009-01-07 09:12:35")).toEqual(
    "07/01, 09:12 h",
  );

  expect(i18n.l("time.formats.long", "2009-11-29 15:07:59")).toEqual(
    "Domingo, 29 de Novembro de 2009, 15:07 h",
  );
});

test("localizes date/time strings with placeholders", () => {
  const i18n = new I18n(translations());
  i18n.locale = "pt-BR";

  expect(
    i18n.l("date.formats.short_with_placeholders", "2009-01-07", {
      p1: "!",
      p2: "?",
    }),
  ).toEqual("07 de Janeiro ! ?");

  expect(
    i18n.l("time.formats.short_with_placeholders", "2009-01-07 09:12:35", {
      p1: "!",
    }),
  ).toEqual("07/01, 09:12 h !");
});

test("localizes percentage", () => {
  const i18n = new I18n(translations());
  i18n.locale = "pt-BR";

  expect(i18n.l("percentage", 123.45)).toEqual("123,45%");
});

test("handles invalid values when localizing time", function () {
  const i18n = new I18n(translations());

  expect(i18n.l("time", "")).toEqual("Invalid Date");
  expect(i18n.l("time", null)).toEqual("");
  expect(i18n.l("time", undefined)).toEqual("");
});

test("localizes unrecognized type", function () {
  const i18n = new I18n(translations());

  expect(i18n.l("foo", 1234)).toEqual("1234");
});
