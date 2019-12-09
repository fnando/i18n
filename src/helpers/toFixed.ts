/**
 * Improved toFixed number rounding function with support for unprecise
 * floating points. JavaScript's standard toFixed function does not round
 * certain numbers correctly (for example 0.105 with precision 2).
 *
 * @private
 * @param {number} numeric The number that will be rounded.
 * @param {number} precision The rounding decimal places.
 * @returns {string} The rounded number.
 */
export function toFixed(numeric: number, precision: number): string {
  return decimalAdjust(numeric, -precision).toFixed(precision);
}

/**
 * Decimal adjustment of a number.
 * Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
 *
 * @private
 * @param {Number}  value The number.
 * @param {Integer} exponent   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
export function decimalAdjust(value: number, exponent: number): number {
  if (typeof exponent === "undefined" || +exponent === 0) {
    return Math.round(value);
  }

  value = +value;
  exponent = +exponent;

  // If the value is not a number or the exponent is not an integer...
  if (isNaN(value) || !(typeof exponent === "number" && exponent % 1 === 0)) {
    return NaN;
  }

  // Shift
  let parts: string[] = value.toString().split("e");
  value = Math.round(
    +(parts[0] + "e" + (parts[1] ? +parts[1] - exponent : -exponent)),
  );

  // Shift back
  parts = value.toString().split("e");
  value = +(parts[0] + "e" + (parts[1] ? +parts[1] + exponent : exponent));

  return value;
}
