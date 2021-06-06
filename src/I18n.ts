/* eslint-disable class-methods-use-this, no-underscore-dangle */

import BigNumber from "bignumber.js";
import { get, has, set, range, zipObject, sortBy } from "lodash";

import {
  DateTime,
  Dict,
  I18nOptions,
  MissingPlaceholderHandler,
  NullPlaceholderHandler,
  OnChangeHandler,
  Scope,
  StrftimeOptions,
  TimeAgoInWordsOptions,
  NumberToCurrencyOptions,
  NumberToRoundedOptions,
  NumberToPercentageOptions,
  NumberToHumanUnits,
  NumberToDelimitedOptions,
  NumberToHumanOptions,
  NumberToHumanSizeOptions,
  FormatNumberOptions,
  ToSentenceOptions,
  TranslateOptions,
} from "../index.d";
import { Locales } from "./Locales";
import { Pluralization } from "./Pluralization";
import { MissingTranslation } from "./MissingTranslation";
import {
  camelCaseKeys,
  createTranslationOptions,
  expandRoundMode,
  formatNumber,
  inferType,
  interpolate,
  isSet,
  lookup,
  parseDate,
  pluralize,
  propertyFlatList,
  roundNumber,
  strftime,
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
 * Set default size units.
 */
const STORAGE_UNITS = ["byte", "kb", "mb", "gb", "tb", "pb", "eb"];

/**
 * Set the default word connectors.
 */
const WORD_CONNECTORS = {
  wordsConnector: ", ",
  twoWordsConnector: " and ",
  lastWordConnector: ", and ",
};

/**
 * Set decimal units used to calculate number to human formatting.
 */
const DECIMAL_UNITS = {
  "0": "unit",
  "1": "ten",
  "2": "hundred",
  "3": "thousand",
  "6": "million",
  "9": "billion",
  "12": "trillion",
  "15": "quadrillion",
  "-1": "deci",
  "-2": "centi",
  "-3": "mili",
  "-6": "micro",
  "-9": "nano",
  "-12": "pico",
  "-15": "femto",
};

const INVERTED_DECIMAL_UNITS = zipObject(
  Object.values(DECIMAL_UNITS),
  Object.keys(DECIMAL_UNITS).map((key) => parseInt(key, 10)),
);

export class I18n {
  private _locale: string = DEFAULT_I18N_OPTIONS.locale;
  private _defaultLocale: string = DEFAULT_I18N_OPTIONS.defaultLocale;
  private _version = 0;

  /**
   * List of all onChange handlers.
   *
   * @type {OnChangeHandler[]}
   */
  public onChangeHandlers: OnChangeHandler[] = [];

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
   * @returns {void}
   */
  public store(translations: Dict): void {
    const map = propertyFlatList(translations);

    map.forEach((path) =>
      set(this.translations, path, get(translations, path)),
    );

    this.hasChanged();
  }

  /**
   * Return the current locale, using a explicit locale set using
   * `i18n.locale = newLocale`, the default locale set using
   * `i18n.defaultLocale` or the fallback, which is `en`.
   *
   * @returns {string} The current locale.
   */
  public get locale(): string {
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

    const changed = this._locale !== newLocale;

    this._locale = newLocale;

    if (changed) {
      this.hasChanged();
    }
  }

  /**
   * Return the default locale, using a explicit locale set using
   * `i18n.defaultLocale = locale`, the default locale set using
   * `i18n.defaultLocale` or the fallback, which is `en`.
   *
   * @returns {string} The current locale.
   */
  public get defaultLocale(): string {
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

    const changed = this._defaultLocale !== newLocale;

    this._defaultLocale = newLocale;

    if (changed) {
      this.hasChanged();
    }
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
   * @param {number} amount  The number to be formatted.
   *
   * @param {object} options The formatting options. When defined, supersedes
   *  the default options defined by `number.currency.*` and `number.format`.
   *
   * @returns {string} The formatted number.
   */
  public numberToCurrency(
    amount: string | number,
    options: NumberToCurrencyOptions = {},
  ): string {
    options = {
      unit: "$",
      precision: 2,
      format: "%u%n",
      delimiter: ",",
      separator: ".",
      ...this.get("number.format"),
      ...this.get("number.currency.format"),
      ...options,
    };

    options.negativeFormat = options.negativeFormat || `-${options.format}`;

    return formatNumber(amount, options as FormatNumberOptions);
  }

  /**
   * Translate the given scope with the provided options.
   *
   * @param {string|array} scope The scope that will be used.
   *
   * @param {object} options The options that will be used on the translation.
   * Can include some special options like `defaultValue`, `count`, and `scope`.
   * Everything else will be treated as replacement values.
   *
   * @param {number} options.count Enable pluralization. The returned
   * translation will depend on the detected pluralizer.
   *
   * @param {any} options.defaultValue The default value that will used in case
   * the translation defined by `scope` cannot be found. Can be a function that
   * returns a string; the signature is
   * `(i18n:I18n, options: TranslateOptions): string`.
   *
   * @param {Dict[]} options.defaults  An array of hashs where the key is the
   * type of translation desired, a `scope` or a `message`. The translation
   * returned will be either the first scope recognized, or the first message
   * defined.
   *
   * @returns {string} The translated string.
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
   * @param {number} count The counting number.
   *
   * @param {Scope} scope The translation scope.
   *
   * @param {object} options The translation options.
   *
   * @returns {string} The translated string.
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
   *
   * You can provide the following scopes: `currency`, `number`, or
   * `percentage`. If you provide a scope that matches the `/^(date|time)/`
   * regular expression then the `value` will be converted by using the
   * `I18n.toTime` function. It will default to the value's `toString` function.
   *
   * If value is either `null` or `undefined` then an empty string will be
   * returned, regardless of that localization type has been used.
   *
   * @param {string} type The localization type.
   *
   * @param {string|number|Date} value The value that must be localized.
   *
   * @param {object} options The localization options.
   *
   * @returns {string} The localized string.
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
        return this.numberToCurrency(value as number);
      case "number":
        return formatNumber(value as number, {
          delimiter: ",",
          precision: 3,
          separator: ".",
          significant: false,
          stripInsignificantZeros: false,
          ...lookup(this, "number.format"),
        });
      case "percentage":
        return this.numberToPercentage(value as number);
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
   *
   * @param {scope} scope The formatting scope.
   *
   * @param {string|number|Date} input The string that must be parsed into a
   * Date object.
   *
   * @returns {string} The formatted date.
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
   *
   * @param {number|string} input The number to be formatted.
   *
   * @param {options} options The formatting options. When defined, supersedes
   * the default options stored at `number.percentage.*`.
   *
   * @returns {string} The formatted number.
   */
  public numberToPercentage(
    input: number | string,
    options: NumberToPercentageOptions = {},
  ): string {
    options = {
      unit: "%",
      precision: 3,
      separator: ".",
      delimiter: "",
      format: "%n%",
      ...camelCaseKeys(lookup(this, "number.percentage.format")),
      ...options,
    };

    return formatNumber(input, options as FormatNumberOptions);
  }

  /**
   * Convert a number into a readable size representation.
   *
   * @param {number} numeric The number that will be formatted.
   *
   * @param {object} options The formatting options. When defined, supersedes
   * the default options stored at `number.human.storage_units.*`.
   *
   * @returns {string} The formatted number.
   */
  public numberToHumanSize(
    numeric: number,
    options: NumberToHumanSizeOptions = {},
  ): string {
    options = {
      roundMode: "default",
      delimiter: "",
      precision: 3,
      significant: true,
      stripInsignificantZeros: true,
      ...camelCaseKeys(this.get("number.human.format")),
      ...options,
    };

    const roundMode = expandRoundMode(options.roundMode || "default");
    const base = 1024;
    const num = new BigNumber(numeric).abs();
    const smallerThanBase = num.lt(base);
    let numberToBeFormatted;
    const stripInsignificantZeros = options.stripInsignificantZeros ?? true;
    const units = STORAGE_UNITS;

    const computeExponent = (numeric: BigNumber, units: string[]) => {
      const max = units.length - 1;
      const exp = new BigNumber(Math.log(numeric.toNumber()))
        .div(Math.log(base))
        .integerValue(BigNumber.ROUND_DOWN)
        .toNumber();

      return Math.min(max, exp);
    };

    const storageUnitKey = () => {
      const keyEnd = smallerThanBase ? "byte" : units[exponent];
      return `number.human.storage_units.units.${keyEnd}`;
    };

    const exponent = computeExponent(num, units);

    if (smallerThanBase) {
      numberToBeFormatted = num.integerValue();
    } else {
      numberToBeFormatted = new BigNumber(
        roundNumber(num.div(base ** exponent), {
          significant: options.significant ?? true,
          precision: options.precision ?? 3,
          roundMode: options.roundMode ?? "default",
        }),
      );
    }

    let precision: number;

    if (inferType(options.precision) === "number") {
      precision = options.precision as number;
    } else {
      const significand = numberToBeFormatted.minus(
        numberToBeFormatted.integerValue(),
      );

      if (significand.gte(0.06)) {
        precision = 2;
      } else if (significand.gt(0)) {
        precision = 1;
      } else {
        precision = 0;
      }
    }

    const format = this.translate("number.human.storage_units.format", {
      defaultValue: "%n %u",
    });

    const unit = this.translate(storageUnitKey(), {
      count: num.integerValue().toNumber(),
    });

    let formattedNumber = numberToBeFormatted.toFixed(precision, roundMode);

    if (stripInsignificantZeros) {
      formattedNumber = formattedNumber
        .replace(/(\..*?)0+$/, "$1")
        .replace(/\.$/, "");
    }

    return format.replace("%n", formattedNumber).replace("%u", unit);
  }

  /**
   * Convert a number into a readable representation.
   *
   * @param  {number|string} input The number that will be formatted.
   *
   * @param  {object} options The formatting options. When defined, supersedes
   * the default options stored at `number.human.storage_units.*`.
   *
   * @returns {string} The formatted number.
   */
  public numberToHuman(
    input: number | string,
    options: NumberToHumanOptions = {},
  ): string {
    options = {
      delimiter: "",
      precision: 3,
      significant: true,
      stripInsignificantZeros: true,
      format: "%n %u",
      units: this.get("number.human.decimal_units")?.units,
      ...camelCaseKeys(this.get("number.human.format")),
      ...options,
    };

    const roundMode = options.roundMode ?? "default";
    const precision = options.precision ?? 3;
    const significant = options.significant ?? true;
    const format = options.format ?? "%n %u";
    const separator = options.separator ?? ".";

    let units: NumberToHumanUnits;

    if (inferType(options.units) === "string") {
      units = this.get(options.units as string);
    } else {
      units = options.units as NumberToHumanUnits;
    }

    let formattedNumber = roundNumber(new BigNumber(input), {
      roundMode,
      precision,
      significant,
    });

    const unitExponents = (units: NumberToHumanUnits) =>
      sortBy(
        Object.keys(units).map((name) => INVERTED_DECIMAL_UNITS[name]),
        (numeric) => numeric * -1,
      );

    const calculateExponent = (num: BigNumber, units: NumberToHumanUnits) => {
      const exponent = num.isZero()
        ? 0
        : Math.floor(Math.log10(num.abs().toNumber()));

      return unitExponents(units).find((exp) => exponent >= exp) || 0;
    };

    const determineUnit = (units: NumberToHumanUnits, exponent: number) => {
      // @ts-ignore
      const expName = DECIMAL_UNITS[exponent.toString()];

      return units[expName] || "";
    };

    const exponent = calculateExponent(new BigNumber(formattedNumber), units);
    const unit = determineUnit(units, exponent);

    formattedNumber = roundNumber(
      new BigNumber(formattedNumber).div(10 ** exponent),
      {
        roundMode,
        precision,
        significant,
      },
    );

    if (options.stripInsignificantZeros) {
      // eslint-disable-next-line prefer-const
      let [whole, significand] = formattedNumber.split(".");
      significand = (significand || "").replace(/0+$/, "");

      formattedNumber = whole;

      if (significand) {
        formattedNumber += `${separator}${significand}`;
      }
    }

    return format
      .replace("%n", formattedNumber || "0")
      .replace("%u", unit)
      .trim();
  }

  /**
   * Convert number to a formatted rounded value.
   *
   * @param {number|string} input The number to be formatted.
   *
   * @param {NumberToRoundedOptions} options The formatting options.
   *
   * @param {number} options.precision  Sets the precision of the number
   * (defaults to 3).
   *
   * @param {string}        options.separator  Sets the separator between the
   * fractional and integer digits (defaults to ".").
   *
   * @param {RoundingMode} options.roundMode  Determine how rounding is
   * performed.
   *
   * @param {boolean}     options.significant  If `true`, precision will be the
   * number of significant_digits. If `false`, the number of fractional digits
   * (defaults to `false`).
   *
   * @param {boolean}  options.stripInsignificantZeros If `true` removes
   * insignificant zeros after the decimal separator (defaults to `false`).
   *
   * @returns {string} The formatted number.
   */
  public numberToRounded(
    input: number | string,
    options?: NumberToRoundedOptions,
  ): string {
    options = {
      unit: "",
      precision: 3,
      significant: false,
      separator: ".",
      delimiter: "",
      stripInsignificantZeros: false,
      ...options,
    };

    return formatNumber(input, options as FormatNumberOptions);
  }

  /**
   * Formats a +number+ with grouped thousands using `delimiter` (e.g., 12,324).
   * You can customize the format in the `options` parameter.
   *
   * @example
   * ```js
   * i18n.numberToDelimited(12345678)                      // => "12,345,678"
   * i18n.numberToDelimited('123456')                      // => "123,456"
   * i18n.numberToDelimited(12345678.05)                   // => "12,345,678.05"
   * i18n.numberToDelimited(12345678, {delimiter: "."})    // => "12.345.678"
   * i18n.numberToDelimited(12345678, {delimiter: ","})    // => "12,345,678"
   * i18n.numberToDelimited(12345678.05, {separator: " "}) // => "12,345,678 05"
   * i18n.numberToDelimited('112a')                        // => "112a"
   * i18n.numberToDelimited(98765432.98, delimiter: " ", separator: ",")
   *                                                       // => "98 765 432,98"
   * i18n.numberToDelimited(
   *   "123456.78",
   *   {delimiterPattern: /(\d+?)(?=(\d\d)+(\d)(?!\d))/g}
   * )                                                     // => "1,23,456.78"
   * ```
   *
   * @param {number | string} input The numeric value that will be formatted.
   *
   * @param {NumberToDelimitedOptions} options The formatting options.
   *
   * @param {string} options.delimiter Sets the thousands delimiter (defaults to
   * ",").
   *
   * @param {string} options.separator Sets the separator between the fractional
   * and integer digits (defaults to ".").
   *
   * @param {RegExp} options.delimiterPattern Sets a custom regular expression
   * used for deriving the placement of delimiter. Helpful when using currency
   * formats like INR.
   *
   * @return {string} The formatted number.
   */
  public numberToDelimited(
    input: number | string,
    options: Partial<NumberToDelimitedOptions> = {},
  ): string {
    options = {
      delimiterPattern: /(\d)(?=(\d\d\d)+(?!\d))/g,
      delimiter: ",",
      separator: ".",
      ...options,
    };

    const numeric = new BigNumber(input);

    if (!numeric.isFinite()) {
      return input.toString();
    }

    const newOptions = options as NumberToDelimitedOptions;

    if (!newOptions.delimiterPattern.global) {
      throw new Error(
        `options.delimiterPattern must be a global regular expression; received ${newOptions.delimiterPattern}`,
      );
    }

    let [left, right] = numeric.toString().split(".");

    left = left.replace(
      newOptions.delimiterPattern,
      (digitToDelimiter) => `${digitToDelimiter}${newOptions.delimiter}`,
    );

    return [left, right].filter(Boolean).join(newOptions.separator);
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
   * @param {string} locale The temporary locale that will be set during the
   * function's execution.
   *
   * @param {Function} callback The function that will be executed with a
   * temporary locale set.
   *
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
   * @returns {string}        The formatted date.
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
   * If the provided path exists, it'll be replaced. Otherwise, a new node will
   * be created. When running in strict mode, paths that doesn't already exist
   * will raise an exception.
   *
   * Strict mode will also raise an exception if the override type differs from
   * previous node type.
   *
   * @example
   * ```js
   * i18n.update("en.number.format", {unit: "%n %u"});
   * i18n.update("en.number.format", {unit: "%n %u"}, true);
   * ```
   *
   * @param {string}     path The path that's going to be updated. It must
   * include the language, as in `en.messages`.
   *
   * @param {Dict}   override The new translation node.
   *
   * @param {boolean} options Set options.
   *
   * @param {boolean} options.strict Raise an exception if path doesn't already
   * exist, or if previous node's type differs from new node's type.
   *
   * @returns {void}
   */
  public update(
    path: string,
    override: unknown,
    options: { strict: boolean } = { strict: false },
  ): void {
    if (options.strict && !has(this.translations, path)) {
      throw new Error(`The path "${path}" is not currently defined`);
    }

    const currentNode = get(this.translations, path);
    const currentType = inferType(currentNode);
    const overrideType = inferType(override);

    if (options.strict && currentType !== overrideType) {
      throw new Error(
        `The current type for "${path}" is "${currentType}", but you're trying to override it with "${overrideType}"`,
      );
    }

    let newNode: unknown;

    if (overrideType === "object") {
      newNode = { ...currentNode, ...(override as Dict) };
    } else {
      newNode = override;
    }

    set(this.translations, path, newNode);
    this.hasChanged();
  }

  /**
   * Converts the array to a comma-separated sentence where the last element is
   * joined by the connector word.
   *
   * @param {any[]} items The list of items that will be joined.
   *
   * @param {ToSentenceOptions} options The options.
   *
   * @param {string} options.wordsConnector The sign or word used to join the
   * elements in arrays with two or more elements (default: ", ").
   *
   * @param {string} options.twoWordsConnector The sign or word used to join the
   * elements in arrays with two elements (default: " and ").
   *
   * @param {string} options.lastWordConnector The sign or word used to join the
   * last element in arrays with three or more elements (default: ", and ").
   *
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
   *
   * @param {DateTime} toTime The ending time. Defaults to `Date.now()`.
   *
   * @param {TimeAgoInWordsOptions} options  The options.
   *
   * @param {boolean} options.includeSeconds Pass `{includeSeconds: true}` if
   * you want more detailed approximations when distance < 1 min, 29 secs.
   *
   * @param {Scope} options.scope With the scope option, you can define a custom
   * scope to look up the translation.
   *
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
   * Add a callback that will be executed whenever locale/defaultLocale changes,
   * or `I18n#store` / `I18n#update` is called.
   *
   * @param {OnChangeHandler} callback The callback that will be executed.
   *
   * @returns {void}
   */
  public onChange(callback: OnChangeHandler): void {
    this.onChangeHandlers.push(callback);
  }

  /**
   * Return the change version. This value is incremented whenever `I18n#store`
   * or `I18n#update` is called.
   */
  public get version(): number {
    return this._version;
  }

  /**
   * @private
   *
   * @param {string} path The scope lookup path.
   *
   * @returns {any} The found scope.
   */
  private get(path: string): any {
    return lookup(this, path);
  }

  /**
   * @private
   * @returns {void}
   */
  private runCallbacks(): void {
    this.onChangeHandlers.forEach((callback) => callback(this));
  }

  /**
   * @private
   * @returns {void}
   */
  private hasChanged(): void {
    this._version += 1;

    this.runCallbacks();
  }
}
