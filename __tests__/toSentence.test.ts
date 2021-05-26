import { I18n } from "../src/I18n";
import ptBR from "../json/pt-BR.json";

test("uses default connecting words", () => {
  const i18n = new I18n({});

  expect(i18n.toSentence([])).toEqual("");
  expect(i18n.toSentence([1])).toEqual("1");
  expect(i18n.toSentence([1, 2])).toEqual("1 and 2");
  expect(i18n.toSentence([1, 2, 3])).toEqual("1, 2, and 3");
});

test("uses provided connecting words", () => {
  const i18n = new I18n({});
  const options = {
    wordsConnector: ". ",
    twoWordsConnector: " AND ",
    lastWordConnector: ". AND ",
  };

  expect(i18n.toSentence([], options)).toEqual("");
  expect(i18n.toSentence([1], options)).toEqual("1");
  expect(i18n.toSentence([1, 2], options)).toEqual("1 AND 2");
  expect(i18n.toSentence([1, 2, 3], options)).toEqual("1. 2. AND 3");
});

test("uses locale options", () => {
  const i18n = new I18n({ ...ptBR });
  i18n.locale = "pt-BR";

  expect(i18n.toSentence([])).toEqual("");
  expect(i18n.toSentence([1])).toEqual("1");
  expect(i18n.toSentence([1, 2])).toEqual("1 e 2");
  expect(i18n.toSentence([1, 2, 3])).toEqual("1, 2 e 3");
});
