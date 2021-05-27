import BigNumber from "bignumber.js";

/**
 * Improved toFixed number rounding function by using
 * [bignumber.js](https://npmjs.com/package/bignumber.js).
 *
 * @private
 * @param {number}     numeric The number that will be rounded.
 * @param {number}   precision The rounding decimal places.
 * @returns {string}           The rounded number.
 */
export function toFixed(numeric: number, precision: number): string {
  return new BigNumber(numeric).toFixed(precision);
}
