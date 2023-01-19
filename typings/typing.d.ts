import BigNumber from "bignumber.js";
import { I18n } from "./I18n";
export interface Dict<T> {
    [key: string]: T;
}
export type DateTime = string | number | Date;
export interface TimeAgoInWordsOptions {
    includeSeconds?: boolean;
    scope?: Scope;
}
export type Numeric = BigNumber | string | number;
export type RoundingMode = "up" | "down" | "truncate" | "halfUp" | "default" | "halfDown" | "halfEven" | "banker" | "ceiling" | "ceil" | "floor";
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
export type NumberToHumanSizeOptions = Omit<FormatNumberOptions, "format" | "negativeFormat" | "raise">;
export type NumberToHumanUnits = {
    [key: string]: string;
};
export type NumberToHumanOptions = Omit<FormatNumberOptions, "negativeFormat" | "unit" | "raise"> & {
    units: NumberToHumanUnits | string;
};
export type NumberToDelimitedOptions = {
    delimiterPattern: RegExp;
    delimiter: string;
    separator: string;
};
export type NumberToPercentageOptions = Omit<FormatNumberOptions, "raise">;
export type NumberToRoundedOptions = Omit<FormatNumberOptions, "format" | "negativeFormat" | "raise"> & {
    precision: number;
};
export type NumberToCurrencyOptions = FormatNumberOptions;
export interface ToSentenceOptions {
    wordsConnector: string;
    twoWordsConnector: string;
    lastWordConnector: string;
}
export type PrimitiveType = number | string | null | undefined | boolean;
export type ArrayType = AnyObject[];
export type AnyObject = PrimitiveType | ArrayType | ObjectType;
export interface ObjectType {
    [key: string]: PrimitiveType | ArrayType | ObjectType;
}
type MissingBehavior = "message" | "guess" | "error";
export interface I18nOptions<T extends object> {
    defaultLocale: string;
    defaultSeparator: string;
    enableFallback: boolean;
    locale: string;
    missingBehavior: MissingBehavior;
    missingPlaceholder: MissingPlaceholderHandler<T>;
    nullPlaceholder: NullPlaceholderHandler<T>;
    missingTranslationPrefix: string;
    placeholder: RegExp;
    transformKey: (key: string) => string;
}
export type Scope = string | string[];
export type LocaleResolver<T extends object> = (i18n: I18n<T>, locale: string) => string[];
export type Pluralizer<T extends object> = (i18n: I18n<T>, count: number) => string[];
export type MissingTranslationStrategy<T extends object> = (i18n: I18n<T>, scope: Scope, options: Dict<T>) => string;
export interface TranslateOptions<T  extends object> {
    defaultValue?: any;
    count?: number;
    scope?: Scope;
    defaults?: Dict<T>[];
    missingBehavior?: MissingBehavior | string;
    [key: string]: any;
}
export type MissingPlaceholderHandler<T extends object> = (i18n: I18n<T>, placeholder: string, message: string, options: Dict<T>) => string;
export type NullPlaceholderHandler<T extends object> = (i18n: I18n<T>, placeholder: string, message: string, options: Dict<T>) => string;
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
    string
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
export type OnChangeHandler<T extends object> = (i18n: I18n<T>) => void;

export type NestedKeyOf<ObjectType extends object> = 
    {[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object 
        ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
        : `${Key}`
    }[keyof ObjectType & (string | number)];

export {};
