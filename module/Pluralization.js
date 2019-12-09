const defaultPluralizer = (_i18n, count) => {
    switch (count) {
        case 0:
            return ["zero", "other"];
        case 1:
            return ["one"];
        default:
            return ["other"];
    }
};
export class Pluralization {
    constructor(i18n) {
        this.i18n = i18n;
        this.registry = {};
        this.register("default", defaultPluralizer);
    }
    register(locale, pluralizer) {
        this.registry[locale] = pluralizer;
    }
    get(locale) {
        return (this.registry[locale] ||
            this.registry[this.i18n.locale] ||
            this.registry["default"]);
    }
}
