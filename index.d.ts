import BigNumber from "bignumber.js";

import { I18n } from "./src/I18n";

export namespace BigNumber {
  export type RoundingMode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

export interface Dict {
  [key: string]: any;
}

export type DateTime = string | number | Date;

export interface TimeAgoInWordsOptions {
  includeSeconds?: boolean;
  scope?: Scope;
}

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
 *
 * @type {string}
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

// toNumber options.
export interface FormatNumberOptions {
  format: string;
  negativeFormat: string;
  precision: number | null;
  roundMode: RoundingMode;
  significant: boolean;
  separator: string;
  delimiter: string;
  stripInsignificantZeros: boolean;
  raise: boolean;
  unit: string;
}

// I18n#numberToHumanSize options.
export type NumberToHumanSizeOptions = Omit<
  FormatNumberOptions,
  "format" | "negativeFormat"
>;

export type NumberToHumanUnits = {
  [key: string]: string;
};

export type NumberToHumanOptions = Omit<
  FormatNumberOptions,
  "negativeFormat" | "unit"
> & {
  units: NumberToHumanUnits | string;
};

export type NumberToDelimitedOptions = {
  delimiterPattern: RegExp;
  delimiter: string;
  separator: string;
};

// I18n#numberToPercentage options.
export type NumberToPercentageOptions = Omit<FormatNumberOptions, "raise">;

// I18n#numberToRounded options.
export type NumberToRoundedOptions = Omit<
  FormatNumberOptions,
  "format" | "negativeFormat"
> & { precision: number };

// I18n#numberToCurrency options.
export type NumberToCurrencyOptions = FormatNumberOptions;

// I18n#toSentence() options.
export interface ToSentenceOptions {
  wordsConnector: string;
  twoWordsConnector: string;
  lastWordConnector: string;
}

// Default primitive types.
export type PrimitiveType = number | string | null | undefined | boolean;
export type ArrayType = AnyObject[];
export type AnyObject = PrimitiveType | ArrayType | ObjectType;

export interface ObjectType {
  [key: string]: PrimitiveType | ArrayType | ObjectType;
}

// The I18n class initializer options.
export interface I18nOptions {
  defaultLocale: string;
  defaultSeparator: string;
  enableFallback: boolean;
  locale: string;
  missingBehavior: MissingBehavior;
  missingPlaceholder: MissingPlaceholderHandler;
  nullPlaceholder: NullPlaceholderHandler;
  missingTranslationPrefix: string;
  translations: Dict;
  placeholder: RegExp;
  transformKey: (key: string) => string;
}

// The translation scope.
export type Scope = string | string[];

// The locale resolver.
export type LocaleResolver = (i18n: I18n, locale: string) => string[];

// The pluralizer function.
export type Pluralizer = (i18n: I18n, count: number) => string[];

// The missing translation strategy.
export type MissingTranslationStrategy = (
  i18n: I18n,
  scope: Scope,
  options: Dict,
) => string;

export interface TranslateOptions {
  defaultValue?: any;
  count?: number;
  scope?: Scope;
  defaults?: Dict[];
  [key: string]: any;
}

export type MissingPlaceholderHandler = (
  i18n: I18n,
  placeholder: string,
  message: string,
  options: Dict,
) => string;

export type NullPlaceholderHandler = (
  i18n: I18n,
  placeholder: string,
  message: string,
  options: Dict,
) => string;

export type DayNames = [string, string, string, string, string, string, string];
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

export interface StrftimeOptions {
  meridian: {
    am: string;
    pm: string;
  };

  dayNames: DayNames;
  abbrDayNames: DayNames;
  monthNames: MonthNames;
  abbrMonthNames: MonthNames;
}

export type OnChangeHandler = (i18n: I18n) => void;
