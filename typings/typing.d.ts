import BigNumber from "bignumber.js";
import { I18n } from "./I18n";
export interface Dict {
    [key: string]: any;
}
export declare type DateTime = string | number | Date;
export interface TimeAgoInWordsOptions {
    includeSeconds?: boolean;
    scope?: Scope;
}
export declare type Numeric = BigNumber | string | number;
export declare type RoundingMode = "up" | "down" | "truncate" | "halfUp" | "default" | "halfDown" | "halfEven" | "banker" | "ceiling" | "ceil" | "floor";
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
export declare type NumberToHumanSizeOptions = Omit<FormatNumberOptions, "format" | "negativeFormat" | "raise">;
export declare type NumberToHumanUnits = {
    [key: string]: string;
};
export declare type NumberToHumanOptions = Omit<FormatNumberOptions, "negativeFormat" | "unit" | "raise"> & {
    units: NumberToHumanUnits | string;
};
export declare type NumberToDelimitedOptions = {
    delimiterPattern: RegExp;
    delimiter: string;
    separator: string;
};
export declare type NumberToPercentageOptions = Omit<FormatNumberOptions, "raise">;
export declare type NumberToRoundedOptions = Omit<FormatNumberOptions, "format" | "negativeFormat" | "raise"> & {
    precision: number;
};
export declare type NumberToCurrencyOptions = FormatNumberOptions;
export interface ToSentenceOptions {
    wordsConnector: string;
    twoWordsConnector: string;
    lastWordConnector: string;
}
export declare type PrimitiveType = number | string | null | undefined | boolean;
export declare type ArrayType = AnyObject[];
export declare type AnyObject = PrimitiveType | ArrayType | ObjectType;
export interface ObjectType {
    [key: string]: PrimitiveType | ArrayType | ObjectType;
}
declare type MissingBehavior = "message" | "guess" | "error";
export interface I18nOptions {
    defaultLocale: string;
    defaultSeparator: string;
    enableFallback: boolean;
    locale: string;
    missingBehavior: MissingBehavior;
    missingPlaceholder: MissingPlaceholderHandler;
    nullPlaceholder: NullPlaceholderHandler;
    missingTranslationPrefix: string;
    placeholder: RegExp;
    transformKey: (key: string) => string;
}
export declare type Scope = string | string[];
export declare type LocaleResolver = (i18n: I18n, locale: string) => string[];
export declare type Pluralizer = (i18n: I18n, count: number) => string[];
export declare type MissingTranslationStrategy = (i18n: I18n, scope: Scope, options: Dict) => string;
export interface TranslateOptions {
    defaultValue?: any;
    count?: number;
    scope?: Scope;
    defaults?: Dict[];
    missingBehavior?: MissingBehavior | string;
    [key: string]: any;
}
export declare type MissingPlaceholderHandler = (i18n: I18n, placeholder: string, message: string, options: Dict) => string;
export declare type NullPlaceholderHandler = (i18n: I18n, placeholder: string, message: string, options: Dict) => string;
export declare type DayNames = [string, string, string, string, string, string, string];
export declare type MonthNames = [
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
export declare type OnChangeHandler = (i18n: I18n) => void;
export {};
