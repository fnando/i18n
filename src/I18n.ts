/* eslint-disable class-methods-use-this */

import { get, set, range } from "lodash";

import {
  DateTime,
  Dict,
  I18nOptions,
  MissingPlaceholderHandler,
  NullPlaceholderHandler,
  Scope,
  StrftimeOptions,
  TimeAgoInWordsOptions,
  ToNumberOptions,
  ToSentenceOptions,
  TranslateOptions,
} from "../index.d";
import { Locales } from "./Locales";
import { Pluralization } from "./Pluralization";
import { MissingTranslation } from "./MissingTranslation";
import {
  camelCaseKeys,
  createTranslationOptions,
  flatMap,
  inferType,
  interpolate,
  isSet,
  lookup,
  parseDate,
  pluralize,
  strftime,
  toNumber,
} from "./helpers";

const within = (start: number, end: number, actual: number): boolean =>
  actual >= start && actual <= end;

/**
 * Other default options.
 */
const DEFAULT_I18N_OPTIONS: I18nOptions = {
  // Set default locale. This locale will be used when fallback is enabled and
  // the translation doesn't exist in a particular locale.
  defaultLocale: "en",

  // Set the current locale to `en`.
  locale: "en",

  // Set the translation key separator.
  defaultSeparator: ".",

  // Set the placeholder format. Accepts `{{placeholder}}` and `%{placeholder}`.
  placeholder: /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm,

  // Set if engine should fallback to the default locale when a translation
  // is missing.
  enableFallback: false,

  // Set the default translation object.
  translations: {},

  // Set missing translation behavior. 'message' will display a message
  // that the translation is missing, 'guess' will try to guess the string.
  missingBehavior: "message",

  // if you use missingBehavior with 'message', but want to know that the
  // string is actually missing for testing purposes, you can prefix the
  // guessed string by setting the value here. By default, no prefix!
  missingTranslationPrefix: "",

  // Return a missing placeholder message for given parameters
  missingPlaceholder: (_i18n: I18n, placeholder: string): string =>
    `[missing "${placeholder}" value]`,

  // Return a placeholder message for null values.
  // It defaults to the same behavior as `I18n.missingPlaceholder`.
  nullPlaceholder: (
    i18n: I18n,
    placeholder,
    message: string,
    options: Dict,
  ): string => i18n.missingPlaceholder(i18n, placeholder, message, options),

  // Transform keys.
  // By default, it returns the key as it is, but allows for overriding.
  // For instance, you can set a function to receive the camelcase key, and
  // convert it to snake case.
  transformKey: (key: string): string => key,
};

/**
 * Set default number format.
 */
const NUMBER_FORMAT = {
  precision: 3,
  separator: ".",
  delimiter: ",",
  stripInsignificantZeros: false,
};

/**
 * Set default currency format.
 */
const CURRENCY_FORMAT = {
  unit: "$",
  precision: 2,
  format: "%u%n",
  signFirst: true,
  delimiter: ",",
  separator: ".",
};

/**
 * Set default size units.
 */
const SIZE_UNITS = [null, "kb", "mb", "gb", "tb"];

/**
 * Set default percentage format.
 */
const PERCENTAGE_FORMAT = {
  unit: "%",
  precision: 3,
  format: "%n%u",
  separator: ".",
  delimiter: "",
};

/**
 * Set the default word connectors.
 */
const WORD_CONNECTORS = {
  wordsConnector: ", ",
  twoWordsConnector: " and ",
  lastWordConnector: ", and ",
};

export class I18n {
  private _locale: string = DEFAULT_I18N_OPTIONS.locale;
  private _defaultLocale: string = DEFAULT_I18N_OPTIONS.defaultLocale;

  /**
   * Set the default string separator. By default, `.` is used, as in
   * `scope.translation`.
   */
  public defaultSeparator: string;

  /**
   * By default missing translations will first be looked for in less specific
   * versions of the requested locale and if that fails by taking them from your
   * `I18n#defaultLocale`.
   */
  public enableFallback: boolean;

  public locales: Locales;

  /**
   * [pluralization description]
   * @type {Pluralization}
   */
  public pluralization: Pluralization;

  public missingBehavior: string;
  public missingTranslation: MissingTranslation;
  public missingTranslationPrefix: string;
  public placeholder: RegExp;
  public translations: Dict = {};
  public missingPlaceholder: MissingPlaceholderHandler;
  public nullPlaceholder: NullPlaceholderHandler;
  public transformKey: (key: string) => string;

  constructor(translations: Dict = {}, options?: Partial<I18nOptions>) {
    const {
      locale,
      enableFallback,
      missingBehavior,
      missingTranslationPrefix,
      missingPlaceholder,
      nullPlaceholder,
      defaultLocale,
      defaultSeparator,
      placeholder,
      transformKey,
    }: I18nOptions = {
      ...DEFAULT_I18N_OPTIONS,
      ...options,
    };

    this.locale = locale;
    this.defaultLocale = defaultLocale;
    this.defaultSeparator = defaultSeparator;
    this.enableFallback = enableFallback;
    this.locale = locale;
    this.missingBehavior = missingBehavior;
    this.missingTranslationPrefix = missingTranslationPrefix;
    this.missingPlaceholder = missingPlaceholder;
    this.nullPlaceholder = nullPlaceholder;
    this.placeholder = placeholder;
    this.pluralization = new Pluralization(this);
    this.locales = new Locales(this);
    this.missingTranslation = new MissingTranslation(this);
    this.transformKey = transformKey;

    this.store(translations);
  }

  /**
   * Update translations by merging them. Newest translations will override
   * existing ones.
   *
   * @param {Dict} translations An object containing the translations that will
   *                            be merged into existing translations.
   * @return {void}
   */
  public store(translations: Dict): void {
    const map = flatMap(translations);

    map.forEach((path) =>
      set(this.translations, path, get(translations, path)),
    );
  }

  /**
   * Return the current locale, using a explicit locale set using
   * `i18n.locale = newLocale`, the default locale set using
   * `i18n.defaultLocale` or the fallback, which is `en`.
   *
   * @return {string} The current locale.
   */
  public get locale(): string {
    // eslint-disable-next-line no-underscore-dangle
    return this._locale || this.defaultLocale || "en";
  }

  /**
   * Set the current locale explicitly.
   *
   * @param {string} newLocale The new locale.
   */
  public set locale(newLocale: string) {
    if (typeof newLocale !== "string") {
      throw new Error(
        `Expected newLocale to be a string; got ${inferType(newLocale)}`,
      );
    }

    // eslint-disable-next-line no-underscore-dangle
    this._locale = newLocale;
  }

  /**
   * Return the default locale, using a explicit locale set using
   * `i18n.defaultLocale = locale`, the default locale set using
   * `i18n.defaultLocale` or the fallback, which is `en`.
   *
   * @return {string} The current locale.
   */
  public get defaultLocale(): string {
    // eslint-disable-next-line no-underscore-dangle
    return this._defaultLocale || "en";
  }

  /**
   * Set the default locale explicitly.
   *
   * @param {string} newLocale The new locale.
   */
  public set defaultLocale(newLocale: string) {
    if (typeof newLocale !== "string") {
      throw new Error(
        `Expected newLocale to be a string; got ${inferType(newLocale)}`,
      );
    }

    // eslint-disable-next-line no-underscore-dangle
    this._defaultLocale = newLocale;
  }

  /**
   * Format number using localization rules.
   * The options will be retrieved from the `number.format` scope.
   *
   * If this isn't present, then the following options will be used:
   *
   * - `precision`: `3`
   * - `separator`: `"."`
   * - `delimiter`: `","`
   * - `stripInsignificantZeros`: `false`
   *
   * You can also override these options by providing the `options` argument.
   *
   * @param {number} numeric The number to be formatted.
   * @param {object} options The formatting options. When defined, supersedes
   *                         the default options defined by `number.format`.
   * @return {string}        The formatted number.
   */
  public toNumber(numeric: number, options?: ToNumberOptions): string {
    options = {
      ...NUMBER_FORMAT,
      ...this.get("number.format"),
      ...options,
    } as ToNumberOptions;

    return toNumber(numeric, options);
  }

  /**
   * Format currency with localization rules.
   *
   * The options will be retrieved from the `number.currency.format` and
   * `number.format` scopes, in that order.
   *
   * Any missing option will be retrieved from the `I18n.toNumber` defaults and
   * the following options:
   *
   * - `unit`: `"$"`
   * - `precision`: `2`
   * - `format`: `"%u%n"`
   * - `delimiter`: `","`
   * - `separator`: `"."`
   *
   * You can also override these options by providing the `options` argument.
   *
   * @param  {number} amount  The number to be formatted.
   * @param  {object} options The formatting options. When defined, supersedes
   *                          the default options defined by `number.currency.*`
   *                          and `number.format`.
   * @return {string}         The formatted number.
   */
  public toCurrency(amount: number, options: ToNumberOptions = {}): string {
    options = {
      ...CURRENCY_FORMAT,
      ...this.get("number.format"),
      ...this.get("number.currency.format"),
      ...options,
    };

    return this.toNumber(amount, options);
  }

  /**
   * Convert a number into a readable size representation.
   * @param  {number} numeric  The number that will be formatted.
   * @param  {object} options The formatting options. When defined, supersedes
   *                          the default options stored at
   *                          `number.human.storage_units.*`.
   * @return {string}         The formatted number.
   */
  public toHumanSize(numeric: number, options?: ToNumberOptions): string {
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
    } else {
      unit = this.t(
        "number.human.storage_units.units." + SIZE_UNITS[iterations],
      );
      precision = size - Math.floor(size) === 0 ? 0 : 1;
    }

    options = {
      unit,
      precision,
      format: "%n%u",
      delimiter: "",
      ...options,
    };

    return this.toNumber(size, options);
  }

  /**
   * Translate the given scope with the provided options.
   *
   * @param  {string|array} scope      The scope that will be used.
   * @param  {object} options          The options that will be used on the
   *                                   translation. Can include some special
   *                                   options like `defaultValue`, `count`, and
   *                                   `scope`. Everything else will be treated
   *                                   as replacement values.
   * @param {number} options.count     Enable pluralization. The returned
   *                                   translation will depend on the detected
   *                                   pluralizer.
   * @param {any} options.defaultValue The default value that will used in case
   *                                   the translation defined by `scope` cannot
   *                                   be found. Can be a function that returns
   *                                   a string; the signature is
   *                                   `(i18n:I18n, options: TranslateOptions): string`.
   * @param {Dict[]} options.defaults  An array of hashs where the key is the
   *                                   type of translation desired, a `scope` or
   *                                   a `message`. The translation returned
   *                                   will be either the first scope
   *                                   recognized, or the first message defined.
   * @return {string}                  The translated string.
   */
  public translate(scope: Scope, options?: TranslateOptions): string {
    options = { ...options };

    const translationOptions: TranslateOptions[] = createTranslationOptions(
      this,
      scope,
      options,
    ) as TranslateOptions[];

    let translation: string | Dict | undefined;

    // Iterate through the translation options until a translation
    // or message is found.
    const hasFoundTranslation = translationOptions.some(
      (translationOption: TranslateOptions) => {
        if (isSet(translationOption.scope)) {
          translation = lookup(this, translationOption.scope as Scope, options);
        } else if (isSet(translationOption.message)) {
          translation = translationOption.message;
        }

        return translation !== undefined && translation !== null;
      },
    );

    if (!hasFoundTranslation) {
      return this.missingTranslation.get(scope, options);
    }

    if (typeof translation === "string") {
      translation = interpolate(this, translation, options);
    } else if (
      typeof translation === "object" &&
      translation &&
      isSet(options.count)
    ) {
      translation = this.pluralize(
        options.count || 0,
        translation as unknown as string,
        options,
      );
    }

    return translation as string;
  }

  /**
   * @alias translate
   */
  public t = this.translate;

  /**
   * Pluralize the given scope using the `count` value.
   * The pluralized translation may have other placeholders,
   * which will be retrieved from `options`.
   *
   * @param  {number} count   The counting number.
   * @param  {Scope} scope    The translation scope.
   * @param  {object} options The translation options.
   * @return {string}         The translated string.
   */
  public pluralize(
    count: number,
    scope: Scope,
    options?: TranslateOptions,
  ): string {
    return pluralize(this, count, scope, { ...options });
  }

  /**
   * @alias pluralize
   */
  public p = this.pluralize;

  /**
   * Localize several values.
   * You can provide the following scopes: `currency`, `number`, or `percentage`.
   * If you provide a scope that matches the `/^(date|time)/` regular expression
   * then the `value` will be converted by using the `I18n.toTime` function.
   * It will default to the value's `toString` function.
   *
   * If value is either `null` or `undefined` then an empty string will be
   * returned, regardless of that localization type has been used.
   *
   * @param  {string}      type   The localization type.
   * @param  {string|number|Date} value   The value that must be localized.
   * @param  {object}      options The localization options.
   * @return {string}              The localized string.
   */
  public localize(
    type: string,
    value: string | number | Date | null | undefined,
    options?: Dict,
  ): string {
    options = { ...options };

    if (value === undefined || value === null) {
      return "";
    }

    switch (type) {
      case "currency":
        return this.toCurrency(value as number);
      case "number":
        return this.toNumber(value as number, lookup(this, "number.format"));
      case "percentage":
        return this.toPercentage(value as number);
      default: {
        let localizedValue: string;

        if (type.match(/^(date|time)/)) {
          localizedValue = this.toTime(type, value as DateTime);
        } else {
          localizedValue = (value as string | number | Date).toString();
        }

        return interpolate(this, localizedValue, options);
      }
    }
  }

  /**
   * @alias localize
   */
  public l = this.localize;

  /**
   * Convert the given dateString into a formatted date.
   * @param  {scope} scope           The formatting scope.
   * @param  {string|number|Date} input The string that must be parsed into a Date
   *                                 object.
   * @return {string}                The formatted date.
   */
  public toTime(scope: Scope, input: DateTime): string {
    const date = parseDate(input);
    const format: string = lookup(this, scope);

    if (date.toString().match(/invalid/i)) {
      return date.toString();
    }

    if (!format) {
      return date.toString();
    }

    return this.strftime(date, format);
  }

  /**
   * Convert a number into a formatted percentage value.
   * @param  {number} numeric   The number to be formatted.
   * @param  {options} options The formatting options. When defined, supersedes
   *                           the default options stored at
   *                           `number.percentage.*`.
   * @return {string}          The formatted number.
   */
  public toPercentage(numeric: number, options?: ToNumberOptions): string {
    options = {
      ...PERCENTAGE_FORMAT,
      ...lookup(this, "number.format"),
      ...lookup(this, "number.percentage.format"),
      ...options,
    };

    return this.toNumber(numeric, options);
  }

  /**
   * Executes function with given locale set. The locale will be changed only
   * during the `callback`'s execution, switching back to the previous value
   * once it finishes (with or without errors).
   *
   * This is an asynchronous call, which means you must use `await` or you may
   * end up with a race condition.
   *
   * @example
   * await i18n.withLocale("pt", () => {
   *   console.log(i18n.t("hello"));
   * });
   *
   * @param {string} locale     The temporary locale that will be set during the
   *                            function's execution.
   * @param {Function} callback The function that will be executed with a
   *                            temporary locale set.
   * @returns {void}
   */
  public async withLocale(locale: string, callback: () => void): Promise<void> {
    const originalLocale = this.locale;

    try {
      this.locale = locale;
      await callback();
    } finally {
      this.locale = originalLocale;
    }
  }

  /**
   * Formats time according to the directives in the given format string.
   * The directives begins with a percent (`%`) character. Any text not listed
   * as a directive will be passed through to the output string.
   *
   * @see strftime
   *
   * @param  {Date}   date   The date that will be formatted.
   * @param  {string} format The formatting string.
   * @return {string}        The formatted date.
   */
  public strftime(date: Date, format: string): string {
    const options: StrftimeOptions = {
      ...camelCaseKeys(lookup(this, "date")),
      meridian: {
        am: lookup(this, "time.am") || "AM",
        pm: lookup(this, "time.pm") || "PM",
      },
    };

    return strftime(date, format, options);
  }

  /**
   * You may want to update a part of your translations. This is a public
   * interface for doing it so.
   *
   * @example
   * ```js
   * i18n.update("en.number.format", {unit: "%n %u"});
   * ```
   *
   * @param {string} path     [description]
   * @param {Dict}   override [description]
   * @returns {void}
   */
  public update(path: string, override: Dict): void {
    const currentNode = get(this.translations, path, {});
    const newNode = { ...currentNode, ...override };

    set(this.translations, path, newNode);
  }

  /**
   * Converts the array to a comma-separated sentence where the last element is
   * joined by the connector word.
   *
   * @param {any[]} items The list of items that will be joined.
   * @param {ToSentenceOptions} options The options.
   * @param {string} options.wordsConnector The sign or word used to join the
   *                                         elements in arrays with two or more
   *                                         elements (default: ", ").
   * @param {string} options.twoWordsConnector The sign or word used to join
   *                                             the elements in arrays with two
   *                                             elements (default: " and ").
   * @param {string} options.lastWordConnector The sign or word used to join
   *                                             the last element in arrays with
   *                                             three or more elements
   *                                             (default: ", and ").
   * @returns {string} The joined string.
   */
  public toSentence(items: any[], options?: ToSentenceOptions): string {
    options = {
      ...WORD_CONNECTORS,
      ...camelCaseKeys(lookup(this, "support.array")),
      ...options,
    } as ToSentenceOptions;

    const size = items.length;

    switch (size) {
      case 0:
        return "";

      case 1:
        return `${items[0]}`;

      case 2:
        return items.join(options.twoWordsConnector);

      default:
        return [
          items.slice(0, size - 1).join(options.wordsConnector),
          options.lastWordConnector,
          items[size - 1],
        ].join("");
    }
  }

  /**
   * Reports the approximate distance in time between two time representations.
   *
   * @param {DateTime} fromTime The initial time.
   * @param {DateTime} toTime The ending time. Defaults to `Date.now()`.
   * @param {TimeAgoInWordsOptions} options The options.
   * @param {boolean} options.includeSeconds Pass `{includeSeconds: true}` if
   *                                         you want more detailed
   *                                         approximations when
   *                                         distance < 1 min, 29 secs.
   * @param {Scope} options.scope With the scope option, you can define a custom
   *                              scope to look up the translation.
   * @returns {string} The distance in time representation.
   */
  public timeAgoInWords(
    fromTime: DateTime,
    toTime: DateTime,
    options: TimeAgoInWordsOptions = {},
  ): string {
    const scope = options.scope || "datetime.distance_in_words";
    const t = (name: string, count = 0): string =>
      this.t(name, { count, scope });

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

    if (within(2520, 43_199, distanceInMinutes)) {
      return t("x_days", distanceInDaysRounded);
    }

    if (within(43_200, 86_399, distanceInMinutes)) {
      return t("about_x_months", Math.round(distanceInMinutes / 43200));
    }

    if (within(86_400, 525_599, distanceInMinutes)) {
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

    const leapYears =
      fromYear > toYear
        ? 0
        : range(fromYear, toYear).filter(
            (year) => new Date(year, 1, 29).getMonth() == 1,
          ).length;

    const minutesInYear = 525_600;
    const minuteOffsetForLeapYear = leapYears * 1440;
    const minutesWithOffset = distanceInMinutes - minuteOffsetForLeapYear;
    const distanceInYears = Math.trunc(minutesWithOffset / minutesInYear);

    const diff = parseFloat(
      (minutesWithOffset / minutesInYear - distanceInYears).toPrecision(3),
    );

    if (diff < 0.25) {
      return t("about_x_years", distanceInYears);
    }

    if (diff < 0.75) {
      return t("over_x_years", distanceInYears);
    }

    return t("almost_x_years", distanceInYears + 1);
  }

  /**
   * @alias timeAgoInWords
   */
  public distanceOfTimeInWords = this.timeAgoInWords;

  /**
   * @private
   * @param  {string} path The scope lookup path.
   * @return {any}         The found scope.
   */
  private get(path: string): any {
    return lookup(this, path);
  }
}
