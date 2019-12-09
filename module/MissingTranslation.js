import { getFullScope } from "./helpers";
const guessStrategy = function (i18n, scope) {
    if (scope instanceof Array) {
        scope = scope.join(i18n.defaultSeparator);
    }
    const message = scope.split(i18n.defaultSeparator).slice(-1)[0];
    return (i18n.missingTranslationPrefix +
        message
            .replace("_", " ")
            .replace(/([a-z])([A-Z])/g, (_match, p1, p2) => `${p1} ${p2.toLowerCase()}`));
};
const messageStrategy = (i18n, scope, options) => {
    const fullScope = getFullScope(i18n, scope, options);
    const fullScopeWithLocale = [i18n.locale, fullScope].join(i18n.defaultSeparator);
    return `[missing "${fullScopeWithLocale}" translation]`;
};
export class MissingTranslation {
    constructor(i18n) {
        this.i18n = i18n;
        this.registry = {};
        this.register("guess", guessStrategy);
        this.register("message", messageStrategy);
    }
    register(name, strategy) {
        this.registry[name] = strategy;
    }
    get(scope, options) {
        return this.registry[this.i18n.missingBehavior](this.i18n, scope, options);
    }
}
