import type { Locale } from './config';
import { localePrefix } from './config';

/**
 * Central route map: one stable key per page, with the slug each locale uses.
 *
 * Two rules this enforces, which are the whole reason it exists:
 *  1. Slugs are localized (`/services/local-seo` vs `/tr/hizmetler/yerel-seo`),
 *     because a Turkish page ranking for Turkish queries needs a Turkish URL.
 *  2. A locale that is *absent* from an entry has no translation, so it gets no
 *     hreflang. Market-specific pages (TR-only city pages) simply omit `en`/`de`
 *     instead of pointing Google at a page that does not exist.
 */
export const ROUTES = {
  home: { en: '/', tr: '/', de: '/' },

  // Services are the global layer: the same offer in every market, so all three
  // locales exist and hreflang links them.
  services: { en: '/services', tr: '/hizmetler', de: '/leistungen' },
  'services/gbp': {
    en: '/services/google-business-profile',
    tr: '/hizmetler/google-isletme-profili-yonetimi',
    de: '/leistungen/google-unternehmensprofil',
  },
  'services/local-seo': {
    en: '/services/local-seo',
    tr: '/hizmetler/yerel-seo',
    de: '/leistungen/lokale-seo',
  },
  'services/rank-tracking': {
    en: '/services/map-rank-tracking',
    tr: '/hizmetler/harita-siralama-takibi',
    de: '/leistungen/google-maps-ranking-tracking',
  },
  'services/technical-seo': {
    en: '/services/technical-seo',
    tr: '/hizmetler/teknik-seo',
    de: '/leistungen/technisches-seo',
  },
  'services/on-page-seo': {
    en: '/services/on-page-seo',
    tr: '/hizmetler/on-page-seo',
    de: '/leistungen/onpage-seo',
  },
  'services/content': {
    en: '/services/content-production',
    tr: '/hizmetler/icerik-uretimi',
    de: '/leistungen/content-erstellung',
  },

  // Industries. These target queries with no proximity signal ("avukatlar için
  // SEO"), which is the only layer that can rank nationwide.
  industries: { tr: '/sektorler' },
  'industries/law': { tr: '/sektorler/avukatlar-icin-seo' },
  'industries/dental': { tr: '/sektorler/dis-hekimleri-icin-seo' },
  'industries/aesthetics': { tr: '/sektorler/estetik-klinikleri-icin-seo' },
  'industries/physio': { tr: '/sektorler/fizyoterapistler-icin-seo' },
  'industries/vehicle-inspection': { tr: '/sektorler/oto-ekspertiz-icin-seo' },

  // Free tools. Link magnets — they run entirely in the browser, no API.
  'tools/gbp-audit': { tr: '/araclar/google-isletme-profili-denetimi' },
} as const satisfies Record<string, Partial<Record<Locale, string>>>;

export type RouteKey = keyof typeof ROUTES;

/** Locales a route actually has a page for. */
export function routeLocales(key: RouteKey): Locale[] {
  return Object.keys(ROUTES[key]) as Locale[];
}

/** Full path for a route in one locale, including the locale prefix. */
export function routePath(locale: Locale, key: RouteKey): string {
  const slug = (ROUTES[key] as Partial<Record<Locale, string>>)[locale];
  if (slug === undefined) {
    throw new Error(`Route "${key}" has no ${locale} translation — omit it from hreflang instead.`);
  }
  const clean = slug === '/' ? '' : `/${slug.replace(/^\/+|\/+$/g, '')}`;
  return `${localePrefix(locale)}${clean}` || '/';
}
