import type { I18n } from "../I18n.js";
import type { Scope, TranslateOptions } from "../typing.js";

import { isSet } from "./isSet.js";
import { lookup } from "./lookup.js";

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
export function pluralize({
  i18n,
  count,
  scope,
  options,
  baseScope,
}: {
  i18n: I18n;
  count: number;
  scope: Scope;
  options: TranslateOptions;
  baseScope: string;
}): string {
  options = { ...options };
  let message: any;

  const translations =
    typeof scope === "object" && scope ? scope : lookup(i18n, scope, options);

  if (!translations) {
    return i18n.missingTranslation.get(scope, options);
  }

  const pluralizer = i18n.pluralization.get(options.locale);
  const keys = pluralizer(i18n, count);
  const missingKeys: typeof keys = [];

  while (keys.length) {
    const key = keys.shift() as string;

    // Prefer the resolved object; otherwise fall back through the locale chain
    // for this specific plural key, so `enableFallback` still applies when the
    // requested locale defines the plural object but leaves the key unset.
    const value = isSet(translations[key])
      ? translations[key]
      : lookup(
          i18n,
          baseScope.split(i18n.defaultSeparator).concat([key]),
          options,
        );

    if (isSet(value)) {
      message = value;
      break;
    }

    missingKeys.push(key);
  }

  if (!isSet(message)) {
    return i18n.missingTranslation.get(
      baseScope.split(i18n.defaultSeparator).concat([missingKeys[0]]),
      options,
    );
  }

  options.count = count;

  return i18n.interpolate(i18n, message, options);
}
