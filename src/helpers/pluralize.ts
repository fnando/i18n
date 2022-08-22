import { Scope, TranslateOptions } from "../typing";
import { I18n } from "../I18n";

import { isSet } from "./isSet";
import { lookup } from "./lookup";

/**
 * Pluralize the given scope using the `count` value.
 * The pluralized translation may have other placeholders,
 * which will be retrieved from `options`.
 *
 * @private
 *
 * @param {I18n} i18n The I18n instance.
 *
 * @param {number} count The counting number.
 *
 * @param {Scope} scope The translation scope.
 *
 * @param {object} options The translation options.
 *
 * @returns {string} The translated string.
 */
export function pluralize(
  i18n: I18n,
  count: number,
  scope: Scope,
  options: TranslateOptions,
): string {
  options = { ...options };
  let translations;
  let message;

  if (typeof scope === "object" && scope) {
    translations = scope;
  } else {
    translations = lookup(i18n, scope, options);
  }

  if (!translations) {
    return i18n.missingTranslation.get(scope, options);
  }

  const pluralizer = i18n.pluralization.get(options.locale);
  const keys = pluralizer(i18n, count);

  while (keys.length) {
    const key = keys.shift() as string;

    if (isSet(translations[key])) {
      message = translations[key];
      break;
    }
  }

  options.count = count;

  return i18n.interpolate(i18n, message, options);
}
