import { I18n } from "../src/I18n";
import en from "../json/en.json";

const i18n = new I18n({ ...en });
const kilobytes = (numeric: number) => numeric * 1024;
const megabytes = (numeric: number) => kilobytes(numeric) * 1024;
const gigabytes = (numeric: number) => megabytes(numeric) * 1024;
const terabytes = (numeric: number) => gigabytes(numeric) * 1024;
const petabytes = (numeric: number) => terabytes(numeric) * 1024;
const exabytes = (numeric: number) => petabytes(numeric) * 1024;

test("returns number as human size", () => {
  expect(i18n.numberToHumanSize(0)).toEqual("0 Bytes");
  expect(i18n.numberToHumanSize(1)).toEqual("1 Byte");
  expect(i18n.numberToHumanSize(3.14159265)).toEqual("3 Bytes");
  expect(i18n.numberToHumanSize(123.0)).toEqual("123 Bytes");
  expect(i18n.numberToHumanSize(123)).toEqual("123 Bytes");
  expect(i18n.numberToHumanSize(1234)).toEqual("1.21 KB");
  expect(i18n.numberToHumanSize(12345)).toEqual("12.1 KB");
  expect(i18n.numberToHumanSize(1234567)).toEqual("1.18 MB");
  expect(i18n.numberToHumanSize(1234567890)).toEqual("1.15 GB");
  expect(i18n.numberToHumanSize(1234567890123)).toEqual("1.12 TB");
  expect(i18n.numberToHumanSize(1234567890123456)).toEqual("1.1 PB");
  expect(i18n.numberToHumanSize(1234567890123456789)).toEqual("1.07 EB");
  expect(i18n.numberToHumanSize(exabytes(1026))).toEqual("1030 EB");
  expect(i18n.numberToHumanSize(kilobytes(444))).toEqual("444 KB");
  expect(i18n.numberToHumanSize(megabytes(1023))).toEqual("1020 MB");
  expect(i18n.numberToHumanSize(terabytes(3))).toEqual("3 TB");
  expect(i18n.numberToHumanSize(1234567, { precision: 2 })).toEqual("1.2 MB");
  expect(
    i18n.numberToHumanSize(1234567, { precision: 2, roundMode: "down" }),
  ).toEqual("1.1 MB");
  expect(i18n.numberToHumanSize(3.14159265, { precision: 4 })).toEqual(
    "3 Bytes",
  );
  expect(i18n.numberToHumanSize(123)).toEqual("123 Bytes");
  expect(i18n.numberToHumanSize(kilobytes(1.0123), { precision: 2 })).toEqual(
    "1 KB",
  );
  expect(i18n.numberToHumanSize(kilobytes(1.01), { precision: 4 })).toEqual(
    "1.01 KB",
  );
  expect(i18n.numberToHumanSize(kilobytes(10.0), { precision: 4 })).toEqual(
    "10 KB",
  );
  expect(i18n.numberToHumanSize(1.1)).toEqual("1 Byte");
  expect(i18n.numberToHumanSize(10)).toEqual("10 Bytes");
});
