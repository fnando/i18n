import { get, set, range } from "lodash";
import { Locales } from "./Locales";
import { Pluralization } from "./Pluralization";
import { MissingTranslation } from "./MissingTranslation";
import { createTranslationOptions, inferType, interpolate, isSet, lookup, parseDate, pluralize, strftime, toNumber, } from "./helpers";
const within = (start, end, actual) => actual >= start && actual <= end;
const DEFAULT_I18N_OPTIONS = {
    defaultLocale: "en",
    locale: "en",
    defaultSeparator: ".",
    placeholder: /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm,
    enableFallback: false,
    translations: {},
    missingBehavior: "message",
    missingTranslationPrefix: "",
    missingPlaceholder: (_i18n, placeholder) => `[missing "${placeholder}" value]`,
    nullPlaceholder: (i18n, placeholder, message, options) => i18n.missingPlaceholder(i18n, placeholder, message, options),
};
const NUMBER_FORMAT = {
    precision: 3,
    separator: ".",
    delimiter: ",",
    strip_insignificant_zeros: false,
};
const CURRENCY_FORMAT = {
    unit: "$",
    precision: 2,
    format: "%u%n",
    sign_first: true,
    delimiter: ",",
    separator: ".",
};
const SIZE_UNITS = [null, "kb", "mb", "gb", "tb"];
const PERCENTAGE_FORMAT = {
    unit: "%",
    precision: 3,
    format: "%n%u",
    separator: ".",
    delimiter: "",
};
const WORD_CONNECTORS = {
    words_connector: ", ",
    two_words_connector: " and ",
    last_word_connector: ", and ",
};
export class I18n {
    constructor(translations, options) {
        this.t = this.translate;
        this.p = this.pluralize;
        this.l = this.localize;
        this.distanceOfTimeInWords = this.timeAgoInWords;
        const { locale, enableFallback, missingBehavior, missingTranslationPrefix, missingPlaceholder, nullPlaceholder, defaultLocale, defaultSeparator, placeholder, } = Object.assign(Object.assign({}, DEFAULT_I18N_OPTIONS), options);
        this._locale = "en";
        this.defaultLocale = defaultLocale;
        this.defaultSeparator = defaultSeparator;
        this.enableFallback = enableFallback;
        this.locale = locale;
        this.missingBehavior = missingBehavior;
        this.missingTranslationPrefix = missingTranslationPrefix;
        this.missingPlaceholder = missingPlaceholder;
        this.nullPlaceholder = nullPlaceholder;
        this.placeholder = placeholder;
        this.translations = translations;
        this.pluralization = new Pluralization(this);
        this.locales = new Locales(this);
        this.missingTranslation = new MissingTranslation(this);
    }
    get locale() {
        return this._locale || this.defaultLocale || "en";
    }
    set locale(newLocale) {
        if (typeof newLocale !== "string") {
            throw new Error(`Expected newLocale to be a string; got ${inferType(newLocale)}`);
        }
        this._locale = newLocale;
    }
    toNumber(numeric, options) {
        options = Object.assign(Object.assign(Object.assign({}, NUMBER_FORMAT), this.get("number.format")), options);
        return toNumber(numeric, options);
    }
    toCurrency(amount, options = {}) {
        options = Object.assign(Object.assign(Object.assign(Object.assign({}, CURRENCY_FORMAT), this.get("number.format")), this.get("number.currency.format")), options);
        return this.toNumber(amount, options);
    }
    toHumanSize(numeric, options) {
        const kb = 1024;
        let size = numeric;
        let iterations = 0;
        let unit;
        let precision;
        while (size >= kb && iterations < 4) {
            size = size / kb;
            iterations += 1;
        }
        if (iterations === 0) {
            unit = this.t("number.human.storage_units.units.byte", { count: size });
            precision = 0;
        }
        else {
            unit = this.t("number.human.storage_units.units." + SIZE_UNITS[iterations]);
            precision = size - Math.floor(size) === 0 ? 0 : 1;
        }
        options = Object.assign({ unit,
            precision, format: "%n%u", delimiter: "" }, options);
        return this.toNumber(size, options);
    }
    translate(scope, options) {
        options = Object.assign({}, options);
        const translationOptions = createTranslationOptions(this, scope, options);
        let translation;
        const hasFoundTranslation = translationOptions.some((translationOption) => {
            if (isSet(translationOption.scope)) {
                translation = lookup(this, translationOption.scope, options);
            }
            else if (isSet(translationOption.message)) {
                translation = translationOption.message;
            }
            return translation !== undefined && translation !== null;
        });
        if (!hasFoundTranslation) {
            return this.missingTranslation.get(scope, options);
        }
        if (typeof translation === "string") {
            translation = interpolate(this, translation, options);
        }
        else if (typeof translation === "object" &&
            translation &&
            isSet(options.count)) {
            translation = this.pluralize(options.count || 0, translation, options);
        }
        return translation;
    }
    pluralize(count, scope, options) {
        return pluralize(this, count, scope, Object.assign({}, options));
    }
    localize(type, value, options) {
        options = Object.assign({}, options);
        if (value === undefined || value === null) {
            return "";
        }
        switch (type) {
            case "currency":
                return this.toCurrency(value);
            case "number":
                return this.toNumber(value, lookup(this, "number.format"));
            case "percentage":
                return this.toPercentage(value);
            default: {
                let localizedValue;
                if (type.match(/^(date|time)/)) {
                    localizedValue = this.toTime(type, value);
                }
                else {
                    localizedValue = value.toString();
                }
                return interpolate(this, localizedValue, options);
            }
        }
    }
    toTime(scope, input) {
        const date = parseDate(input);
        const format = lookup(this, scope);
        if (date.toString().match(/invalid/i)) {
            return date.toString();
        }
        if (!format) {
            return date.toString();
        }
        return this.strftime(date, format);
    }
    toPercentage(numeric, options) {
        options = Object.assign(Object.assign(Object.assign(Object.assign({}, PERCENTAGE_FORMAT), lookup(this, "number.format")), lookup(this, "number.percentage.format")), options);
        return this.toNumber(numeric, options);
    }
    withLocale(locale, callback) {
        const originalLocale = this.locale;
        try {
            this.locale = locale;
            callback();
        }
        finally {
            this.locale = originalLocale;
        }
    }
    strftime(date, format) {
        const options = Object.assign(Object.assign({}, lookup(this, "date")), { meridian: {
                am: lookup(this, "time.am") || "AM",
                pm: lookup(this, "time.pm") || "PM",
            } });
        return strftime(date, format, options);
    }
    mergeTranslations(path, override) {
        const currentNode = get(this.translations, path, {});
        const newNode = Object.assign(Object.assign({}, currentNode), override);
        set(this.translations, path, newNode);
    }
    toSentence(items, options) {
        options = Object.assign(Object.assign(Object.assign({}, WORD_CONNECTORS), lookup(this, "support.array")), options);
        const size = items.length;
        switch (size) {
            case 0:
                return "";
            case 1:
                return `${items[0]}`;
            case 2:
                return items.join(options.two_words_connector);
            default:
                return [
                    items.slice(0, size - 1).join(options.words_connector),
                    options.last_word_connector,
                    items[size - 1],
                ].join("");
        }
    }
    timeAgoInWords(fromTime, toTime, options = {}) {
        const scope = options.scope || "datetime.distance_in_words";
        const t = (name, count = 0) => this.t(name, { count, scope });
        fromTime = parseDate(fromTime);
        toTime = parseDate(toTime);
        let fromInSeconds = fromTime.getTime() / 1000;
        let toInSeconds = toTime.getTime() / 1000;
        if (fromInSeconds > toInSeconds) {
            [fromTime, toTime, fromInSeconds, toInSeconds] = [
                toTime,
                fromTime,
                toInSeconds,
                fromInSeconds,
            ];
        }
        const distanceInSeconds = Math.round(toInSeconds - fromInSeconds);
        const distanceInMinutes = Math.round((toInSeconds - fromInSeconds) / 60);
        const distanceInHours = distanceInMinutes / 60;
        const distanceInDays = distanceInHours / 24;
        const distanceInHoursRounded = Math.round(distanceInMinutes / 60);
        const distanceInDaysRounded = Math.round(distanceInDays);
        const distanceInMonthsRounded = Math.round(distanceInDaysRounded / 30);
        if (within(0, 1, distanceInMinutes)) {
            if (!options.includeSeconds) {
                return distanceInMinutes === 0
                    ? t("less_than_x_minutes", 1)
                    : t("x_minutes", distanceInMinutes);
            }
            if (within(0, 4, distanceInSeconds)) {
                return t("less_than_x_seconds", 5);
            }
            if (within(5, 9, distanceInSeconds)) {
                return t("less_than_x_seconds", 10);
            }
            if (within(10, 19, distanceInSeconds)) {
                return t("less_than_x_seconds", 20);
            }
            if (within(20, 39, distanceInSeconds)) {
                return t("half_a_minute");
            }
            if (within(40, 59, distanceInSeconds)) {
                return t("less_than_x_minutes", 1);
            }
            return t("x_minutes", 1);
        }
        if (within(2, 44, distanceInMinutes)) {
            return t("x_minutes", distanceInMinutes);
        }
        if (within(45, 89, distanceInMinutes)) {
            return t("about_x_hours", 1);
        }
        if (within(90, 1439, distanceInMinutes)) {
            return t("about_x_hours", distanceInHoursRounded);
        }
        if (within(1440, 2519, distanceInMinutes)) {
            return t("x_days", 1);
        }
        if (within(2520, 43199, distanceInMinutes)) {
            return t("x_days", distanceInDaysRounded);
        }
        if (within(43200, 86399, distanceInMinutes)) {
            return t("about_x_months", Math.round(distanceInMinutes / 43200));
        }
        if (within(86400, 525599, distanceInMinutes)) {
            return t("x_months", distanceInMonthsRounded);
        }
        let fromYear = fromTime.getFullYear();
        if (fromTime.getMonth() + 1 >= 3) {
            fromYear += 1;
        }
        let toYear = toTime.getFullYear();
        if (toTime.getMonth() + 1 < 3) {
            toYear -= 1;
        }
        const leapYears = fromYear > toYear
            ? 0
            : range(fromYear, toYear).filter((year) => new Date(year, 1, 29).getMonth() == 1).length;
        const minutesInYear = 525600;
        const minuteOffsetForLeapYear = leapYears * 1440;
        const minutesWithOffset = distanceInMinutes - minuteOffsetForLeapYear;
        const distanceInYears = Math.trunc(minutesWithOffset / minutesInYear);
        const diff = parseFloat((minutesWithOffset / minutesInYear - distanceInYears).toPrecision(3));
        if (diff < 0.25) {
            return t("about_x_years", distanceInYears);
        }
        if (diff < 0.75) {
            return t("over_x_years", distanceInYears);
        }
        return t("almost_x_years", distanceInYears + 1);
    }
    get(path) {
        return lookup(this, path);
    }
}
