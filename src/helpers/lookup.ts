import type { I18n } from "../I18n.js";
import type { Dict, Scope } from "../typing.js";
import { getFullScope } from "./getFullScope.js";
import { isSet } from "./isSet.js";
import { localeChain } from "./localeChain.js";

/**
 * Find and process the translation using the provided scope and options.
 * This is used internally by some functions and should not be used as a
 * public API.
 *
 * @private
 *
 * @param {I18n} i18n The I18n instance.
 *
 * @param {Scope} scope The translation scope.
 *
 * @param {Dict|undefined} options The lookup options.
 *
 * @returns {any} The resolved translation.
 */
export function lookup(i18n: I18n, scope: Scope, options: Dict = {}): any {
  options = { ...options };

  const locale = "locale" in options ? options.locale : i18n.locale;
  const locales = localeChain(i18n, locale);

  const keys = getFullScope(i18n, scope, options)
    .split(i18n.defaultSeparator)
    .map((component) => i18n.transformKey(component));

  const entries = locales.map((locale) =>
    keys.reduce((path, key) => path?.[key], i18n.translations[locale]),
  );

  entries.push(options.defaultValue);

  return entries.find((entry) => isSet(entry));
}
