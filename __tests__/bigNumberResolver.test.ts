/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
// `require` is used deliberately so each case can load the resolver after the
// module mock is installed, reproducing how a bundler resolves bignumber.js.
import RealBigNumber from "bignumber.js";

// Regression coverage for https://github.com/fnando/i18n/issues/126
//
// bignumber.js v10 ships a "browser" bundle (an IIFE) that bundlers such as
// Metro, Webpack and Parcel resolve via the package's "browser" field. That
// bundle assigns the constructor to `globalThis.BigNumber` instead of exporting
// it, so `require("bignumber.js")` yields an empty object and calling it throws
// a TypeError. We simulate that by mocking the module with `{}` while exposing
// the real constructor on the global, exactly as the IIFE does at runtime.

describe("bigNumberResolver", () => {
  const originalGlobal = (globalThis as { BigNumber?: unknown }).BigNumber;

  afterEach(() => {
    jest.dontMock("bignumber.js");
    jest.resetModules();
    (globalThis as { BigNumber?: unknown }).BigNumber = originalGlobal;
  });

  test("uses the module export when it is callable", () => {
    const resolved = require("../src/helpers/bigNumberResolver").default;

    expect(typeof resolved).toBe("function");
    expect(new resolved(1500).toNumber()).toBe(1500);
  });

  test("falls back to globalThis.BigNumber when the browser bundle leaves the export empty", () => {
    jest.isolateModules(() => {
      jest.doMock("bignumber.js", () => ({}));
      (globalThis as { BigNumber?: unknown }).BigNumber = RealBigNumber;

      const resolved = require("../src/helpers/bigNumberResolver").default;

      expect(resolved).toBe(RealBigNumber);
      expect(new resolved(1500).toNumber()).toBe(1500);
    });
  });

  test("numberToCurrency works under the broken browser bundle", () => {
    jest.isolateModules(() => {
      jest.doMock("bignumber.js", () => ({}));
      (globalThis as { BigNumber?: unknown }).BigNumber = RealBigNumber;

      const { I18n } = require("../src/I18n");
      const i18n = new I18n();

      expect(i18n.numberToCurrency(1500)).toEqual("$1,500.00");
    });
  });
});
