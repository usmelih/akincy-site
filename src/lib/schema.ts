import type { Locale } from '../i18n/config';
import { localeHome } from '../i18n/config';
import { CONTACT_EMAIL } from '../i18n/ui';

const SITE = 'https://akincy.com';

/**
 * Stable @id for the organisation entity. Every page's schema points back at
 * this node so Google merges them into one entity instead of many.
 */
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;

/**
 * Profiles that prove this is the same entity as the Google Business Profile.
 * TODO: replace the share.google link with the stable
 * https://www.google.com/maps?cid=<CID> URL once the CID is read off the profile.
 */
const SAME_AS = [
  'https://share.google/T3PSRjjBTlHTIfHZG',
];

const DESCRIPTION: Record<Locale, string> = {
  en: 'Akincy helps local businesses rank higher on Google Maps, outrank nearby competitors, and turn visibility into real leads.',
  tr: 'Akincy, yerel işletmelerin Google Haritalar’da üst sıralara çıkmasını, yakın rakiplerini geçmesini ve görünürlüğü gerçek müşteriye dönüştürmesini sağlar.',
  de: 'Akincy hilft lokalen Unternehmen, bei Google Maps besser zu ranken, Wettbewerber in der Nähe zu überholen und Sichtbarkeit in echte Anfragen zu verwandeln.',
};

/** Service-area business: no public street address, so we declare the areas served. */
const AREA_SERVED = [
  { '@type': 'Country', name: 'Türkiye' },
  { '@type': 'City', name: 'Antalya' },
];

export function orgSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': ORG_ID,
        name: 'Akincy',
        alternateName: 'Akincy Dijital Pazarlama',
        url: `${SITE}${localeHome(locale)}`,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE}/images/logo.png`,
        },
        image: `${SITE}${locale === 'tr' ? '/images/og-image-tr.png' : '/images/og-image.png'}`,
        email: CONTACT_EMAIL[locale],
        description: DESCRIPTION[locale],
        serviceType: 'Local SEO & Google Maps Optimization',
        areaServed: AREA_SERVED,
        knowsLanguage: ['tr', 'en', 'de'],
        sameAs: SAME_AS,
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE,
        name: 'Akincy',
        inLanguage: locale,
        publisher: { '@id': ORG_ID },
      },
    ],
  };
}
