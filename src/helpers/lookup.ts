import { get } from "lodash";

import { Dict, Scope } from "../../index.d";
import { I18n } from "../I18n";
import { isSet, getFullScope } from ".";

/**
 * Find and process the translation using the provided scope and options.
 * This is used internally by some functions and should not be used as a
 * public API.
 *
 * @private
 * @param {I18n} i18n The I18n instance.
 * @param {Scope} scope The translation scope.
 * @param {Dict|undefined} options The lookup options.
 * @returns {string} The resolved translation.
 */
export function lookup(i18n: I18n, scope: Scope, options: Dict = {}): any {
  options = { ...options };

  const locales = i18n.locales.get(options.locale || i18n.locale).slice();

  scope = getFullScope(i18n, scope, options)
    .split(i18n.defaultSeparator)
    .join(".");

  const entries = locales.map((locale) =>
    get(i18n.translations, [locale, scope].join(".")),
  );

  entries.push(options.defaultValue);

  return entries.find((entry) => isSet(entry));
}
