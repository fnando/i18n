import type BigNumber from "bignumber.js";
import type { I18n } from "./I18n.js";

/**
 * The signature of a [make-plural](https://github.com/eemeli/make-plural)
 * function: given a count, it returns the plural category (e.g. `"one"`,
 * `"other"`) for a locale. Used by {@link Pluralization} via `useMakePlural`.
 */
export type MakePlural = (count: number, ordinal?: boolean) => string;

/**
 * A plain object keyed by string. Used throughout the library for the
 * translation tree and for loosely-typed option bags.
 */
export interface Dict {
  [key: string]: any;
}

/**
 * A value that can be localized as a date/time: a `Date`, a timestamp in
 * milliseconds, or a string that `Date` can parse (such as an ISO 8601 date).
 */
export type DateTime = string | number | Date;

/** Options accepted by {@link I18n.timeAgoInWords}. */
export interface TimeAgoInWordsOptions {
  /** Include seconds when the distance is under a minute. */
  includeSeconds?: boolean;

  /** Translation scope holding the distance-in-words messages. */
  scope?: Scope;
}

/**
 * A value that can be treated as a number by the formatting helpers: a
 * `BigNumber`, a numeric string, or a `number`.
 */
export type Numeric = BigNumber | string | number;

/**
 * Controls handling of arithmetic exceptions and rounding.
 *
 * - "up": round away from zero
 * - "down" or "truncate": round towards zero (truncate)
 * - "halfUp" or "default": round towards the nearest neighbor, unless both
 *   neighbors are equidistant, in which case round away from zero.
 * - "halfDown": round towards the nearest neighbor, unless both neighbors are
 *   equidistant, in which case round towards zero.
 * - "halfEven" or "banker": round towards the nearest neighbor, unless both
 *   neighbors are equidistant, in which case round towards the even neighbor
 *   (Banker’s rounding)
 * - "ceiling" or "ceil": round towards positive infinity
 * - "floor": round towards negative infinity
 */
export type RoundingMode =
  | "up"
  | "down"
  | "truncate"
  | "halfUp"
  | "default"
  | "halfDown"
  | "halfEven"
  | "banker"
  | "ceiling"
  | "ceil"
  | "floor";

/**
 * The base set of options shared by the number-formatting helpers. The more
 * specific option types (currency, percentage, rounded, human size, human)
 * are derived from this one.
 */
export interface FormatNumberOptions {
  /**
   * The output format, where `%n` is replaced with the number and `%u` with
   * the unit. For example, `"%u%n"` renders `"$1,234.00"`.
   */
  format: string;

  /** The format used when the number is negative, e.g. `"-%u%n"`. */
  negativeFormat: string;

  /**
   * How many digits to keep. Combined with
   * {@link FormatNumberOptions.significant} this is either the number of
   * decimal places or significant digits. Use `null` to keep the number as-is.
   */
  precision: number | null;

  /** How to round the number. See {@link RoundingMode}. */
  roundMode: RoundingMode;

  /**
   * When `true`, {@link FormatNumberOptions.precision} counts significant
   * digits instead of decimal places.
   */
  significant: boolean;

  /** The decimal separator (e.g. `"."`). */
  separator: string;

  /** The thousands delimiter (e.g. `","`). */
  delimiter: string;

  /** Remove insignificant trailing zeros from the fractional part. */
  stripInsignificantZeros: boolean;

  /** Throw when the input is not a valid number instead of formatting `NaN`. */
  raise: boolean;

  /** The unit substituted for `%u` in the format (e.g. the currency symbol). */
  unit: string;
}

/** Options accepted by {@link I18n.numberToHumanSize}. */
export type NumberToHumanSizeOptions = Omit<
  FormatNumberOptions,
  "format" | "negativeFormat"
>;

/**
 * A map of storage/size unit keys (e.g. `"kb"`, `"mb"`) to their localized
 * labels, used by {@link I18n.numberToHuman} and
 * {@link I18n.numberToHumanSize}.
 */
export type NumberToHumanUnits = {
  [key: string]: string;
};

/** Options accepted by {@link I18n.numberToHuman}. */
export type NumberToHumanOptions = Omit<
  FormatNumberOptions,
  "negativeFormat" | "unit"
> & {
  /** The units to append, either a scope key or an explicit units map. */
  units: NumberToHumanUnits | string;
};

/** Options accepted by {@link I18n.numberToDelimited}. */
export type NumberToDelimitedOptions = {
  /** Throw when the input is not a valid number. */
  raise: boolean;

  /** The pattern used to find the digit groups that get a delimiter. */
  delimiterPattern: RegExp;

  /** The thousands delimiter (e.g. `","`). */
  delimiter: string;

  /** The decimal separator (e.g. `"."`). */
  separator: string;
};

/** Options accepted by {@link I18n.numberToPercentage}. */
export type NumberToPercentageOptions = FormatNumberOptions;

/** Options accepted by {@link I18n.numberToRounded}. */
export type NumberToRoundedOptions = Omit<
  FormatNumberOptions,
  "format" | "negativeFormat" | "raise"
> & {
  /** The number of digits to keep. */
  precision: number;
};

/** Options accepted by {@link I18n.numberToCurrency}. */
export type NumberToCurrencyOptions = FormatNumberOptions;

/** Options accepted by {@link I18n.toSentence}. */
export interface ToSentenceOptions {
  /**
   * Joins all words except the last two, e.g. the `", "` in `"a, b, and c"`.
   */
  wordsConnector: string;

  /** Joins the words when the list has exactly two items (e.g. `" and "`). */
  twoWordsConnector: string;

  /** Joins the last two words of a longer list (e.g. `", and "`). */
  lastWordConnector: string;
}

/** A JSON-compatible scalar value. */
export type PrimitiveType = number | string | null | undefined | boolean;

/** A JSON-compatible array value. */
export type ArrayType = AnyObject[];

/** Any JSON-compatible value: a scalar, an array, or an object. */
export type AnyObject = PrimitiveType | ArrayType | ObjectType;

/** A JSON-compatible object with string keys. */
export interface ObjectType {
  [key: string]: PrimitiveType | ArrayType | ObjectType;
}

/**
 * How the library behaves when a translation is missing.
 *
 * - `message` renders a message noting the translation is missing.
 * - `guess` renders a humanized guess based on the key.
 * - `error` throws.
 */
export type MissingBehavior = "message" | "guess" | "error";

/** The options accepted by the {@link I18n} constructor. */
export interface I18nOptions {
  /**
   * Set default locale. This locale will be used when fallback is enabled and
   * the translation doesn't exist in a particular locale. Defaults to `en`.
   */
  defaultLocale: string;

  /**
   * Set the default string separator. Defaults to `.`, as in
   * `scope.translation`.
   */
  defaultSeparator: string;

  /**
   * Set if engine should fallback to the default locale when a translation is
   * missing. Defaults to `false`.
   *
   * When enabled, missing translations will first be looked for in less
   * specific versions of the requested locale and if that fails by taking them
   * from your `I18n#defaultLocale`.
   */
  enableFallback: boolean;

  /** Set the current locale. Defaults to `en`. */
  locale: string;

  /**
   * Set missing translation behavior.
   *
   * - `message` will display a message that the translation is missing.
   * - `guess` will try to guess the string.
   * - `error` will raise an exception whenever a translation is not defined.
   *
   * See {@link MissingTranslation} for instructions on how to register your
   * own behavior.
   */
  missingBehavior: MissingBehavior;

  /** Return a missing placeholder message for given parameters. */
  missingPlaceholder: MissingPlaceholderHandler;

  /**
   * Return a placeholder message for null values. Defaults to the same behavior
   * as `I18n.missingPlaceholder`.
   */
  nullPlaceholder: NullPlaceholderHandler;

  /**
   * If you use missingBehavior with 'message', but want to know that the string
   * is actually missing for testing purposes, you can prefix the guessed string
   * by setting the value here. By default, no prefix is used.
   */
  missingTranslationPrefix: string;

  /**
   * Set the placeholder format. Accepts `{{placeholder}}` and
   * `%{placeholder}`.
   */
  placeholder: RegExp;

  /**
   * Transform keys. By default, it returns the key as it is, but allows for
   * overriding. For instance, you can set a function to receive the camelcase
   * key, and convert it to snake case.
   */
  transformKey: (key: string) => string;
}

/**
 * A translation key. Either a dot-separated string (`"hello.world"`) or an
 * array of segments (`["hello", "world"]`).
 */
export type Scope = Readonly<string | string[]>;

/**
 * Resolves a locale into the ordered list of locales to look translations up
 * in (the fallback chain). Register one with {@link Locales}.
 */
export type LocaleResolver = (i18n: I18n, locale: string) => string[];

/**
 * Returns the ordered plural keys to try for a given count (e.g.
 * `["one"]` or `["other"]`). Register one with {@link Pluralization}.
 */
export type Pluralizer = (i18n: I18n, count: number) => string[];

/**
 * Produces the output for a missing translation. Register one with
 * {@link MissingTranslation}.
 */
export type MissingTranslationStrategy = (
  i18n: I18n,
  scope: Scope,
  options: Dict,
) => string;

/** Options accepted by {@link I18n.translate}. */
export interface TranslateOptions {
  /** Value returned when the translation is missing. */
  defaultValue?: any;

  /** The count used to select the plural form. */
  count?: number;

  /** A scope prepended to the translation key. */
  scope?: Scope;

  /** An ordered list of fallbacks tried before giving up. */
  defaults?: Dict[];

  /** Overrides the instance's {@link MissingBehavior} for this call. */
  missingBehavior?: MissingBehavior | string;

  /** Any other key is used as an interpolation value. */
  [key: string]: any;
}

/**
 * Called when an interpolation placeholder has no matching value. Returns the
 * text rendered in its place.
 */
export type MissingPlaceholderHandler = (
  i18n: I18n,
  placeholder: string,
  message: string,
  options: Dict,
) => string;

/**
 * Called when an interpolation placeholder resolves to `null`. Returns the
 * text rendered in its place.
 */
export type NullPlaceholderHandler = (
  i18n: I18n,
  placeholder: string,
  message: string,
  options: Dict,
) => string;

/** The seven day names, starting on Sunday. */
export type DayNames = [string, string, string, string, string, string, string];

/**
 * The twelve month names. The first entry is `null` so months can be indexed
 * by their 1-based number.
 */
export type MonthNames = [
  null,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

/** Options accepted by {@link I18n.strftime}. */
export interface StrftimeOptions {
  /** The labels for the AM/PM meridian indicators. */
  meridian: {
    am: string;
    pm: string;
  };

  /** Full day names, starting on Sunday. */
  dayNames: DayNames;

  /** Abbreviated day names, starting on Sunday. */
  abbrDayNames: DayNames;

  /** Full month names (1-based; the first entry is `null`). */
  monthNames: MonthNames;

  /** Abbreviated month names (1-based; the first entry is `null`). */
  abbrMonthNames: MonthNames;

  /** When `true`, read date parts in UTC instead of local time. */
  utc?: boolean;
}

/**
 * A callback notified whenever the store changes (via `store`, `update`, or a
 * locale change). See {@link I18n.onChange}.
 */
export type OnChangeHandler = (i18n: I18n) => void;
