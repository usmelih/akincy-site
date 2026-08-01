import type { Locale } from '../../i18n/config';
import type { RouteKey } from '../../i18n/routes';

export interface AuditOption {
  label: string;
  points: number;
}

export interface AuditQuestion {
  id: string;
  group: string;
  question: string;
  help?: string;
  options: AuditOption[];
  /** Shown when this question scores below half its maximum. */
  advice: string;
  /** Route key of the service page that addresses this gap. */
  link?: RouteKey;
}

export interface AuditGroup {
  id: string;
  label: string;
  max: number;
}

export interface AuditBand {
  min: number;
  title: string;
  text: string;
}

/** Labels for the result panel and advice block. */
export interface AuditUi {
  answered: string;
  adviceHeading: string;
  adviceLink: string;
  ctaLabel: string;
}

export interface AuditContent {
  groups: AuditGroup[];
  questions: AuditQuestion[];
  bands: AuditBand[];
  ui: AuditUi;
}

import { tr } from './tr';
import { en } from './en';
import { de } from './de';

const CONTENT: Record<Locale, AuditContent> = { tr, en, de };

export function getAudit(locale: Locale): AuditContent {
  return CONTENT[locale];
}
