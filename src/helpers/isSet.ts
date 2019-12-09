/**
 * Check if value is different than undefined and null.
 *
 * @private
 * @param {any} value The inspecting value.
 * @returns {boolean} Whether the value is set or not.
 */
export function isSet(value: any): boolean {
  return value !== undefined && value !== null;
}
