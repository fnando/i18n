import { get } from "lodash";
import { isSet, getFullScope } from ".";
export function lookup(i18n, scope, options = {}) {
    options = Object.assign({}, options);
    const locales = i18n.locales.get(options.locale || i18n.locale).slice();
    scope = getFullScope(i18n, scope, options)
        .split(i18n.defaultSeparator)
        .join(".");
    const entries = locales.map((locale) => get(i18n.translations, [locale, scope].join(".")));
    entries.push(options.defaultValue);
    return entries.find((entry) => isSet(entry));
}
