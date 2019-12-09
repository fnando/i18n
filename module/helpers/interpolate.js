import { isSet } from ".";
export function interpolate(i18n, message, options) {
    options = Object.assign({}, options);
    const matches = message.match(i18n.placeholder);
    if (!matches) {
        return message;
    }
    while (matches.length) {
        let value;
        const placeholder = matches.shift();
        const name = placeholder.replace(i18n.placeholder, "$1");
        if (isSet(options[name])) {
            value = options[name].toString().replace(/\$/gm, "_#$#_");
        }
        else if (name in options) {
            value = i18n.nullPlaceholder(i18n, placeholder, message, options);
        }
        else {
            value = i18n.missingPlaceholder(i18n, placeholder, message, options);
        }
        const regex = new RegExp(placeholder.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}"));
        message = message.replace(regex, value);
    }
    return message.replace(/_#\$#_/g, "$");
}
