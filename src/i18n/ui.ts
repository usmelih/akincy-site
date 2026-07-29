import type { Locale } from './config';

/**
 * Chrome strings (nav + footer). Page body copy stays in the page files —
 * only shell text that every page repeats lives here.
 */
export const ui = {
  en: {
    nav: {
      beforeAfter: 'Before / After',
      process: 'How it Works',
      faq: 'FAQ',
      audit: 'Free Audit',
      services: 'Services',
      industries: 'Industries',
      cases: 'Case Studies',
      tool: 'Free profile audit',
    },
    footer: {
      tagline: 'Local SEO & Google Maps Growth for ambitious businesses.',
      sub: 'Built for local businesses that want real ranking movement.',
      rights: 'All rights reserved.',
      claim: 'Own Your City on Google',
    },
    menuLabel: 'Open menu',
  },
  tr: {
    nav: {
      beforeAfter: 'Öncesi / Sonrası',
      process: 'Nasıl Çalışıyor',
      faq: 'SSS',
      audit: 'Ücretsiz Analiz',
      services: 'Hizmetler',
      industries: 'Sektörler',
      cases: 'Vakalar',
      tool: 'Ücretsiz profil denetimi',
    },
    footer: {
      tagline: 'Hedefi olan işletmeler için Local SEO & Google Maps büyümesi.',
      sub: 'Gerçek sıralama artışı isteyen yerel işletmeler için.',
      rights: 'Tüm hakları saklıdır.',
      claim: 'Google’da kendi Şehrinde ilk 3 - Garantili',
    },
    menuLabel: 'Menüyü aç',
  },
  de: {
    nav: {
      beforeAfter: 'Vorher / Nachher',
      process: "So funktioniert's",
      faq: 'FAQ',
      audit: 'Kostenlose Analyse',
      services: 'Leistungen',
      industries: 'Branchen',
      cases: 'Fallstudien',
      tool: 'Kostenlose Profilanalyse',
    },
    footer: {
      tagline: 'Lokale SEO & Google Maps Wachstum für ambitionierte Unternehmen.',
      sub: 'Für lokale Unternehmen, die echte Ranking-Bewegung wollen.',
      rights: 'Alle Rechte vorbehalten.',
      claim: 'Beherrschen Sie Ihre Stadt bei Google',
    },
    menuLabel: 'Menü öffnen',
  },
} as const satisfies Record<Locale, unknown>;

export function t(locale: Locale) {
  return ui[locale];
}

/** Contact address differs per locale on the live site. */
export const CONTACT_EMAIL: Record<Locale, string> = {
  en: 'audit@akincy.com',
  tr: 'melih@akincy.com',
  de: 'melih@akincy.com',
};
