export const LOCALES = ['en', 'tr', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** hreflang value emitted for each locale. Language-only: we target speakers, not countries. */
export const HREFLANG: Record<Locale, string> = {
  en: 'en',
  tr: 'tr',
  de: 'de',
};

export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  tr: 'tr_TR',
  de: 'de_DE',
};

/** URL prefix per locale. The default locale lives at the root. */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '' : `/${locale}`;
}

/** The locale home page, e.g. "/" or "/tr". */
export function localeHome(locale: Locale): string {
  return localePrefix(locale) || '/';
}
