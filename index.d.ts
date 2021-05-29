import { I18n } from "./src/I18n";

export interface Dict {
  [key: string]: any;
}

export type DateTime = string | number | Date;

// I18n#timeAgoInWords() options.
export interface TimeAgoInWordsOptions {
  includeSeconds?: boolean;
  scope?: Scope;
}

// I18n#toNumber() options.
export interface ToNumberOptions {
  unit?: string;
  format?: string;
  signFirst?: boolean;
  precision?: number;
  separator?: string;
  delimiter?: string;
  stripInsignificantZeros?: boolean;
}

// I18n#toSentence() options.
export interface ToSentenceOptions {
  wordsConnector?: string;
  twoWordsConnector?: string;
  lastWordConnector?: string;
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
