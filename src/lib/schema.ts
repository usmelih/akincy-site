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
 * Google Business Profile identifiers, read off the profile's Maps URL.
 * The CID is the second hex value in the `!1s0x…:0x…` block of a place URL,
 * converted to decimal: 0x711c7c17fd95a59 -> 509407866757143129.
 */
export const GBP_CID = '509407866757143129';
export const GBP_URL = `https://www.google.com/maps?cid=${GBP_CID}`;

/** Profiles that prove this is the same entity as the Google Business Profile. */
const SAME_AS = [GBP_URL];

/** Must stay byte-identical to the number on the Google Business Profile. */
const PHONE = '+90 545 505 23 86';

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

export interface FaqEntry {
  q: string;
  a: string;
}

export interface Crumb {
  label: string;
  href: string;
}

/**
 * Schema for a service page: the service itself, its FAQ, and the breadcrumb
 * trail. All of it hangs off the one organisation node via `provider`.
 */
export function servicePageSchema(opts: {
  locale: Locale;
  url: string;
  name: string;
  description: string;
  faq?: FaqEntry[];
  breadcrumb: Crumb[];
}) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Service',
      '@id': `${SITE}${opts.url}#service`,
      name: opts.name,
      description: opts.description,
      serviceType: opts.name,
      provider: { '@id': ORG_ID },
      areaServed: AREA_SERVED,
      inLanguage: opts.locale,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE}${opts.url}#breadcrumb`,
      itemListElement: opts.breadcrumb.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.label,
        item: `${SITE}${c.href}`,
      })),
    },
  ];

  if (opts.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${SITE}${opts.url}#faq`,
      mainEntity: opts.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

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
        telephone: PHONE,
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
