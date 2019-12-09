import { interpolate, isSet, lookup } from ".";
export function pluralize(i18n, count, scope, options) {
    options = Object.assign({}, options);
    let translations;
    let message;
    if (typeof scope === "object" && scope) {
        translations = scope;
    }
    else {
        translations = lookup(i18n, scope, options);
    }
    if (!translations) {
        return i18n.missingTranslation.get(scope, options);
    }
    const pluralizer = i18n.pluralization.get(options.locale);
    const keys = pluralizer(i18n, count);
    while (keys.length) {
        const key = keys.shift();
        if (isSet(translations[key])) {
            message = translations[key];
            break;
        }
    }
    options.count = count;
    return interpolate(i18n, message, options);
}
