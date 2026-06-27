import BigNumber from "bignumber.js";

/**
 * bignumber.js v10 added a "browser" field to its package.json that points at
 * an IIFE build. Bundlers that honor the "browser" field (Metro/React Native,
 * Webpack, Parcel) load that build, but it assigns the constructor to
 * `globalThis.BigNumber` instead of exporting it through CommonJS/ESM. As a
 * result the default import resolves to an empty object and calling it throws a
 * TypeError (e.g. from `numberToCurrency`). Plain Node.js is unaffected because
 * it resolves the "main" field, which still exports the constructor.
 *
 * Resolve the constructor defensively: use the imported value when it is
 * callable, otherwise fall back to the global the IIFE installed.
 *
 * See https://github.com/fnando/i18n/issues/126
 */
const resolvedBigNumber: typeof BigNumber =
  typeof BigNumber === "function"
    ? BigNumber
    : (globalThis as unknown as { BigNumber: typeof BigNumber }).BigNumber;

export default resolvedBigNumber;
