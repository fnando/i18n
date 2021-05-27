import { inferType } from "../src/helpers/inferType";

class Custom {}

test("infers type", () => {
  expect(inferType("hello")).toEqual("string");
  expect(inferType(new String())).toEqual("string");
  expect(inferType(true)).toEqual("boolean");
  expect(inferType(undefined)).toEqual("undefined");
  expect(inferType(null)).toEqual("null");
  expect(inferType(/.+/)).toEqual("regexp");
  expect(inferType([])).toEqual("array");
  expect(inferType(() => true)).toEqual("function");
  expect(inferType(new Custom())).toEqual("custom");
});
