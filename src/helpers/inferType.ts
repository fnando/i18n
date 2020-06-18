/**
 * Return object type.
 *
 * @private
 * @param {unknown} instance The object that will be inspected.
 * @returns {string} The object's type.
 */
export function inferType(instance: unknown): string {
  const type = typeof instance;

  if (type !== "object") {
    return type;
  }

  return type.constructor.name.toLowerCase();
}
