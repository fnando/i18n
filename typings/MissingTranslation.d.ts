import { Dict, MissingTranslationStrategy, Scope } from "../index.d";
import { I18n } from "./I18n";
export declare class MissingTranslation {
    private i18n;
    private registry;
    constructor(i18n: I18n);
    register(name: string, strategy: MissingTranslationStrategy): void;
    get(scope: Scope, options: Dict): string;
}
