import { LocaleResolver } from "../index.d";
import { I18n } from "./I18n";
export declare class Locales {
    private i18n;
    private registry;
    constructor(i18n: I18n);
    register(locale: string, localeResolver: LocaleResolver | string | string[]): void;
    get(locale: string): string[];
}
