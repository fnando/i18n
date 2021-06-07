/* eslint-disable class-methods-use-this, no-underscore-dangle */

import { get, has, set } from "lodash";

import {
  DateTime,
  Dict,
  FormatNumberOptions,
  I18nOptions,
  MissingPlaceholderHandler,
  NullPlaceholderHandler,
  NumberToCurrencyOptions,
  NumberToDelimitedOptions,
  NumberToHumanOptions,
  NumberToHumanSizeOptions,
  NumberToPercentageOptions,
  NumberToRoundedOptions,
  Numeric,
  OnChangeHandler,
  RoundingMode,
  Scope,
  StrftimeOptions,
  TimeAgoInWordsOptions,
  ToSentenceOptions,
  TranslateOptions,
} from "../index.d";
import { Locales } from "./Locales";
import { Pluralization } from "./Pluralization";
import { MissingTranslation } from "./MissingTranslation";
import {
  camelCaseKeys,
  createTranslationOptions,
  formatNumber,
  inferType,
  interpolate,
  isSet,
  lookup,
  numberToDelimited,
  numberToHuman,
  numberToHumanSize,
  parseDate,
  pluralize,
  propertyFlatList,
  strftime,
  timeAgoInWords,
} from "./helpers";

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
   * @param {DateTime} input The string that must be parsed into a Date object.
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
   * @param {Numeric} input  The number to be formatted.
   *
   * @param {object} options The formatting options. When defined, supersedes
   *  the default options defined by `number.currency.*` and `number.format`.
   *
   * @returns {string} The formatted number.
   */
  public numberToCurrency(
    input: Numeric,
    options: Partial<NumberToCurrencyOptions> = {},
  ): string {
    return formatNumber(input, {
      unit: "$",
      precision: 2,
      format: "%u%n",
      delimiter: ",",
      separator: ".",
      ...this.get("number.format"),
      ...this.get("number.currency.format"),
      ...options,
    } as FormatNumberOptions);
  }

  /**
   * Convert a number into a formatted percentage value.
   *
   * @param {Numeric} input The number to be formatted.
   *
   * @param {options} options The formatting options. When defined, supersedes
   * the default options stored at `number.percentage.*`.
   *
   * @returns {string} The formatted number.
   */
  public numberToPercentage(
    input: Numeric,
    options: Partial<NumberToPercentageOptions> = {},
  ): string {
    return formatNumber(input, {
      unit: "%",
      precision: 3,
      separator: ".",
      delimiter: "",
      format: "%n%",
      ...camelCaseKeys<Partial<NumberToPercentageOptions>>(
        lookup(this, "number.percentage.format"),
      ),
      ...options,
    } as FormatNumberOptions);
  }

  /**
   * Convert a number into a readable size representation.
   *
   * @param {Numeric} input The number that will be formatted.
   *
   * @param {object} options The formatting options. When defined, supersedes
   * the default options stored at `number.human.storage_units.*`.
   *
   * @returns {string} The formatted number.
   */
  public numberToHumanSize(
    input: Numeric,
    options: Partial<NumberToHumanSizeOptions> = {},
  ): string {
    return numberToHumanSize(this, input, {
      roundMode: "default" as RoundingMode,
      delimiter: "",
      precision: 3,
      significant: true,
      stripInsignificantZeros: true,
      units: {
        billion: "Billion",
        million: "Million",
        quadrillion: "Quadrillion",
        thousand: "Thousand",
        trillion: "Trillion",
        unit: "",
      },
      ...camelCaseKeys<Partial<NumberToHumanSizeOptions>>(
        this.get("number.human.format"),
      ),
      ...options,
    } as NumberToHumanSizeOptions);
  }

  /**
   * Convert a number into a readable representation.
   *
   * @param  {Numeric} input The number that will be formatted.
   *
   * @param  {object} options The formatting options. When defined, supersedes
   * the default options stored at `number.human.storage_units.*`.
   *
   * @returns {string} The formatted number.
   */
  public numberToHuman(
    input: Numeric,
    options: Partial<NumberToHumanOptions> = {},
  ): string {
    return numberToHuman(this, input, {
      delimiter: "",
      separator: ".",
      precision: 3,
      significant: true,
      stripInsignificantZeros: true,
      format: "%n %u",
      roundMode: "default",
      units: this.get("number.human.decimal_units")?.units,
      ...camelCaseKeys<Partial<NumberToHumanOptions>>(
        this.get("number.human.format"),
      ),
      ...options,
    } as NumberToHumanOptions);
  }

  /**
   * Convert number to a formatted rounded value.
   *
   * @param {Numeric} input The number to be formatted.
   *
   * @param {NumberToRoundedOptions} options The formatting options.
   *
   * @param {number} options.precision  Sets the precision of the number
   * (defaults to 3).
   *
   * @param {string} options.separator  Sets the separator between the
   * fractional and integer digits (defaults to ".").
   *
   * @param {RoundingMode} options.roundMode  Determine how rounding is
   * performed.
   *
   * @param {boolean} options.significant  If `true`, precision will be the
   * number of significant_digits. If `false`, the number of fractional digits
   * (defaults to `false`).
   *
   * @param {boolean} options.stripInsignificantZeros If `true` removes
   * insignificant zeros after the decimal separator (defaults to `false`).
   *
   * @returns {string} The formatted number.
   */
  public numberToRounded(
    input: Numeric,
    options?: Partial<NumberToRoundedOptions>,
  ): string {
    return formatNumber(input, {
      unit: "",
      precision: 3,
      significant: false,
      separator: ".",
      delimiter: "",
      stripInsignificantZeros: false,
      ...options,
    } as FormatNumberOptions);
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
   * @param {Numeric} input The numeric value that will be formatted.
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
    input: Numeric,
    options: Partial<NumberToDelimitedOptions> = {},
  ): string {
    return numberToDelimited(this, input, {
      delimiterPattern: /(\d)(?=(\d\d\d)+(?!\d))/g,
      delimiter: ",",
      separator: ".",
      ...options,
    } as NumberToDelimitedOptions);
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
   * @param {Date} date The date that will be formatted.
   *
   * @param {string} format The formatting string.
   *
   * @param {StrftimeOptions} options The formatting options.
   *
   * @returns {string}        The formatted date.
   */
  public strftime(
    date: Date,
    format: string,
    options: Partial<StrftimeOptions> = {},
  ): string {
    return strftime(date, format, {
      ...camelCaseKeys(lookup(this, "date")),
      meridian: {
        am: lookup(this, "time.am") || "AM",
        pm: lookup(this, "time.pm") || "PM",
      },
      ...options,
    });
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
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    override: any,
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

    let newNode: any;

    if (overrideType === "object") {
      newNode = { ...currentNode, ...override };
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
  public toSentence(
    items: any[],
    options: Partial<ToSentenceOptions> = {},
  ): string {
    const { wordsConnector, twoWordsConnector, lastWordConnector } = {
      wordsConnector: ", ",
      twoWordsConnector: " and ",
      lastWordConnector: ", and ",
      ...camelCaseKeys<Partial<ToSentenceOptions>>(
        lookup(this, "support.array"),
      ),
      ...options,
    } as ToSentenceOptions;

    const size = items.length;

    switch (size) {
      case 0:
        return "";

      case 1:
        return `${items[0]}`;

      case 2:
        return items.join(twoWordsConnector);

      default:
        return [
          items.slice(0, size - 1).join(wordsConnector),
          lastWordConnector,
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
    return timeAgoInWords(this, fromTime, toTime, options);
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
