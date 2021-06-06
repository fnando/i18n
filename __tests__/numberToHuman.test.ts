import { I18n } from "../src/I18n";
import en from "../json/en.json";

const i18n = new I18n({ ...en });

test("formats number to human", () => {
  expect(i18n.numberToHuman(-123)).toEqual("-123");
  expect(i18n.numberToHuman(-0.5)).toEqual("-0.5");
  expect(i18n.numberToHuman(0)).toEqual("0");
  expect(i18n.numberToHuman(0.5)).toEqual("0.5");
  expect(i18n.numberToHuman(123)).toEqual("123");
  expect(i18n.numberToHuman(1_234)).toEqual("1.23 Thousand");
  expect(i18n.numberToHuman(12_345)).toEqual("12.3 Thousand");
  expect(i18n.numberToHuman(1_234_567)).toEqual("1.23 Million");
  expect(i18n.numberToHuman(1_234_567_890)).toEqual("1.23 Billion");
  expect(i18n.numberToHuman(1_234_567_890_123)).toEqual("1.23 Trillion");
  expect(i18n.numberToHuman(1_234_567_890_123_456)).toEqual("1.23 Quadrillion");
  expect(i18n.numberToHuman(1_234_567_890_123_456_789)).toEqual(
    "1230 Quadrillion",
  );
  expect(i18n.numberToHuman(489_939, { precision: 2 })).toEqual("490 Thousand");
  expect(i18n.numberToHuman(489_939, { precision: 4 })).toEqual(
    "489.9 Thousand",
  );
  expect(i18n.numberToHuman(489_000, { precision: 4 })).toEqual("489 Thousand");
  expect(
    i18n.numberToHuman(489_939, { precision: 2, roundMode: "down" }),
  ).toEqual("480 Thousand");
  expect(
    i18n.numberToHuman(489_000, {
      precision: 4,
      stripInsignificantZeros: false,
    }),
  ).toEqual("489.0 Thousand");
  expect(
    i18n.numberToHuman(1_234_567, { precision: 4, significant: false }),
  ).toEqual("1.2346 Million");
  expect(
    i18n.numberToHuman(1_234_567, {
      precision: 1,
      significant: false,
      separator: ",",
    }),
  ).toEqual("1,2 Million");
  expect(
    i18n.numberToHuman(1_234_567, {
      precision: 0,
      significant: true,
      separator: ",",
    }),
  ).toEqual("1 Million");
  expect(i18n.numberToHuman(999_999)).toEqual("1 Million");
  expect(i18n.numberToHuman(999_999_999)).toEqual("1 Billion");
});

test("formats number to human with custom units", () => {
  // # Only integers
  const volume = { unit: "ml", thousand: "lt", million: "m3" };
  expect(i18n.numberToHuman(123_456, { units: volume })).toEqual("123 lt");
  expect(i18n.numberToHuman(12, { units: volume })).toEqual("12 ml");
  expect(i18n.numberToHuman(1_234_567, { units: volume })).toEqual("1.23 m3");

  // # Including fractionals
  const distance = {
    mili: "mm",
    centi: "cm",
    deci: "dm",
    unit: "m",
    ten: "dam",
    hundred: "hm",
    thousand: "km",
  };
  expect(i18n.numberToHuman(0.00123, { units: distance })).toEqual("1.23 mm");
  expect(i18n.numberToHuman(0.0123, { units: distance })).toEqual("1.23 cm");
  expect(i18n.numberToHuman(0.123, { units: distance })).toEqual("1.23 dm");
  expect(i18n.numberToHuman(1.23, { units: distance })).toEqual("1.23 m");
  expect(i18n.numberToHuman(12.3, { units: distance })).toEqual("1.23 dam");
  expect(i18n.numberToHuman(123, { units: distance })).toEqual("1.23 hm");
  expect(i18n.numberToHuman(1_230, { units: distance })).toEqual("1.23 km");
  expect(i18n.numberToHuman(1_230, { units: distance })).toEqual("1.23 km");
  expect(i18n.numberToHuman(1_230, { units: distance })).toEqual("1.23 km");
  expect(i18n.numberToHuman(12_300, { units: distance })).toEqual("12.3 km");

  // # The quantifiers don't need to be a continuous sequence
  const gangster = { hundred: "hundred bucks", million: "thousand quids" };
  expect(i18n.numberToHuman(100, { units: gangster })).toEqual(
    "1 hundred bucks",
  );
  expect(i18n.numberToHuman(2_500, { units: gangster })).toEqual(
    "25 hundred bucks",
  );
  expect(i18n.numberToHuman(100_000, { units: gangster })).toEqual(
    "1000 hundred bucks",
  );
  expect(i18n.numberToHuman(999_999, { units: gangster })).toEqual(
    "1 thousand quids",
  );
  expect(i18n.numberToHuman(1_000_000, { units: gangster })).toEqual(
    "1 thousand quids",
  );
  expect(i18n.numberToHuman(25_000_000, { units: gangster })).toEqual(
    "25 thousand quids",
  );
  expect(i18n.numberToHuman(12_345_000_000, { units: gangster })).toEqual(
    "12300 thousand quids",
  );

  // # Spaces are stripped from the resulting string
  expect(i18n.numberToHuman(4, { units: { unit: "", ten: "tens " } })).toEqual(
    "4",
  );
  expect(
    i18n.numberToHuman(45, { units: { unit: "", ten: " tens   " } }),
  ).toEqual("4.5  tens");

  // # Uses only the provided units and does not try to use larger ones
  expect(
    i18n.numberToHuman(1_000_000, {
      units: { unit: "meter", thousand: "kilometers" },
    }),
  ).toEqual("1000 kilometers");
});

test("formats number with custom units that are missing the needed key", () => {
  expect(i18n.numberToHuman(123, { units: { thousand: "k" } })).toEqual("123");
  expect(i18n.numberToHuman(123, { units: {} })).toEqual("123");
});

test("formats number to human with custom format", () => {
  expect(i18n.numberToHuman(123_456, { format: "%n times %u" })).toEqual(
    "123 times Thousand",
  );

  const volume = { unit: "ml", thousand: "lt", million: "m3" };

  expect(
    i18n.numberToHuman(123_456, { units: volume, format: "%n.%u" }),
  ).toEqual("123.lt");
});
