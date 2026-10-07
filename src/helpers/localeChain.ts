import type { I18n } from "../I18n.js";
import { inferType } from "./inferType.js";

/**
 * Resolve the ordered list of locales that must be tried for a given locale,
 * i.e. its fallback chain. This defers to the instance's locale resolver
 * registry ({@link I18n.locales}), so it honors `enableFallback`, region/script
 * splitting, and any custom resolvers.
 *
 * Used internally by {@link lookup} and {@link I18n.resolvedLocale} so there's a
 * single source of truth for how a locale maps to its chain. Non-string locales
 * are resolved by their type name, matching the lookup behavior.
 *
 * @private
 *
 * @param {I18n} i18n The I18n instance.
 *
 * @param {unknown} locale The locale being resolved.
 *
 * @returns {string[]} The ordered fallback chain.
 */
export function localeChain(i18n: I18n, locale: unknown): string[] {
  const localeType = inferType(locale);

  return i18n.locales
    .get(localeType === "string" ? (locale as string) : typeof locale)
    .slice();
}
