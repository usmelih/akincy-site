import type { AuditContent } from './index';

/**
 * Deutsche Inhalte. Die Bewertung ist bewusst transparent: jede Option trägt
 * einen sichtbaren Punktwert, Maximum 100. Das Werkzeug ist eine Diagnose,
 * kein Lead-Gate — Besucher erfahren ihre Schwachstellen auch dann, wenn sie
 * uns nie schreiben.
 */

const groups = [
  { id: 'basis', label: 'Kategorie und Basisdaten', max: 30 },
  { id: 'bewertungen', label: 'Bewertungen', max: 30 },
  { id: 'aktualitaet', label: 'Inhalt und Aktualität', max: 20 },
  { id: 'website', label: 'Website-Verknüpfung', max: 20 },
];

const questions = [
  {
    id: 'q1',
    group: 'basis',
    question: 'Passt Ihre Hauptkategorie exakt zu Ihrer Hauptleistung?',
    help: 'Die Hauptkategorie ist das schwerste Relevanzsignal im lokalen Ranking. Sie gehört auf Ihre volumenstärkste Kernleistung.',
    options: [
      { label: 'Ja, sie passt genau', points: 10 },
      { label: 'Nah dran, aber nicht exakt', points: 5 },
      { label: 'Unsicher — habe ich nicht geprüft', points: 0 },
    ],
    advice:
      'Die Kategorie ist die größte Ranking-Veränderung über ein einzelnes Feld. Lesen Sie zuerst die Hauptkategorien der aktuellen Top 3 aus und vergleichen Sie, bevor Sie etwas anderes anfassen.',
    link: 'services/gbp' as const,
  },
  {
    id: 'q2',
    group: 'basis',
    question: 'Ist Ihre Leistungsliste gefüllt — mit Beschreibung je Eintrag?',
    help: 'In den meisten Profilen ist dieses Feld leer oder mit Googles generischen Vorschlägen gefüllt — also identisch mit dem Ihrer Wettbewerber.',
    options: [
      { label: 'Alle erfasst, jeweils mit Beschreibung', points: 10 },
      { label: 'Liste vorhanden, aber ohne Beschreibungen', points: 5 },
      { label: 'Leer oder so belassen, wie Google es vorschlug', points: 0 },
    ],
    advice:
      'Formulieren Sie Leistungen in den Worten, die Menschen tatsächlich suchen, und ergänzen Sie je eine Beschreibung. Halten Sie die Benennung identisch zu den Leistungsseiten Ihrer Website.',
    link: 'services/gbp' as const,
  },
  {
    id: 'q3',
    group: 'basis',
    question: 'Sind Öffnungszeiten, Telefonnummer und Website-Link aktuell?',
    help: 'Ein Profil, das als geschlossen erscheint oder eine falsche Nummer trägt, verliert den Kunden auch bei gutem Ranking.',
    options: [
      { label: 'Alle drei aktuell, inklusive Feiertage', points: 10 },
      { label: 'Größtenteils aktuell, aber ich prüfe es nicht', points: 5 },
      { label: 'Etwas fehlt oder ist veraltet', points: 0 },
    ],
    advice:
      'Diese Felder wirken stärker auf die Konversion als auf das Ranking. Besonders Sonderöffnungszeiten an Feiertagen verhindern, dass Sie als "geschlossen" erscheinen und die Anfrage verlieren.',
  },
  {
    id: 'q4',
    group: 'bewertungen',
    question: 'Wie viele Bewertungen haben Sie?',
    options: [
      { label: '50 oder mehr', points: 10 },
      { label: '20–49', points: 7 },
      { label: '5–19', points: 4 },
      { label: '0–4', points: 0 },
    ],
    advice:
      'Das Bewertungsvolumen ist die messbarste Quelle des Bekanntheitssignals. Leiten Sie das Ziel vom Durchschnitt der aktuellen Top 3 ab, nicht von einer absoluten Zahl.',
    link: 'services/gbp' as const,
  },
  {
    id: 'q5',
    group: 'bewertungen',
    question: 'Wie steht Ihr Bewertungsvolumen im Vergleich zu den Top 3?',
    help: 'Schauen Sie sich die drei Unternehmen an, die bei Ihrer Zielsuchanfrage erscheinen.',
    options: [
      { label: 'Mehr als deren', points: 10 },
      { label: 'Etwa gleich', points: 6 },
      { label: 'Deutlich weniger', points: 2 },
      { label: 'Habe ich nicht angesehen', points: 0 },
    ],
    advice:
      'Ein Bewertungsziel ohne Kenntnis der Wettbewerbszahlen ist sinnlos. Beziffern Sie den Abstand — in den meisten Fällen ist genau das der Grund für den Rückstand.',
    link: 'services/rank-tracking' as const,
  },
  {
    id: 'q6',
    group: 'bewertungen',
    question: 'Antworten Sie auf Bewertungen?',
    help: 'Leistungs- und Ortsnamen in Ihren Antworten erzeugen ebenfalls Relevanzsignale.',
    options: [
      { label: 'Auf alle, innerhalb weniger Tage', points: 10 },
      { label: 'Auf einige', points: 5 },
      { label: 'Nein', points: 0 },
    ],
    advice:
      'Antworten Sie auf jede Bewertung und nennen Sie die Leistung dabei natürlich. Bei negativen zuerst persönlich klären, dann kurz und nicht defensiv öffentlich antworten.',
    link: 'services/gbp' as const,
  },
  {
    id: 'q7',
    group: 'aktualitaet',
    question: 'Haben Sie in den letzten 30 Tagen aus dem Profil gepostet?',
    options: [
      { label: 'Ich poste regelmäßig', points: 10 },
      { label: 'Gelegentlich', points: 5 },
      { label: 'Nein', points: 0 },
    ],
    advice:
      'Beiträge allein bringen Sie nicht in die Top 3; bei sonst gleichen Voraussetzungen schlägt das aktive Profil aber das inaktive. Verlinken Sie jeden Beitrag auf eine Leistungsseite.',
    link: 'services/gbp' as const,
  },
  {
    id: 'q8',
    group: 'aktualitaet',
    question: 'Haben Sie in den letzten 90 Tagen neue Fotos hinzugefügt?',
    help: 'Ein stetiger Zufluss wirkt besser, als einmal dreißig Fotos hochzuladen und nie wieder anzufassen.',
    options: [
      { label: 'Ja, ich ergänze regelmäßig', points: 10 },
      { label: 'Nein, schon lange nicht mehr', points: 0 },
    ],
    advice:
      'Echte Aufnahmen von Räumen und Team erzeugen ein Aktualitätssignal und schaffen Vertrauen, das Stockfotos nicht herstellen können.',
  },
  {
    id: 'q9',
    group: 'website',
    question: 'Auf welche Seite Ihrer Website verweist das Profil?',
    options: [
      { label: 'Startseite plus jede Leistung einzeln verlinkt', points: 10 },
      { label: 'Nur Startseite', points: 6 },
      { label: 'Keine Website verknüpft', points: 0 },
    ],
    advice:
      'Jede Profilleistung mit der passenden Seite auf der Website zu verlinken hilft Google, beide Entitäten als dasselbe Unternehmen zu verknüpfen.',
    link: 'services/on-page-seo' as const,
  },
  {
    id: 'q10',
    group: 'website',
    question: 'Sind Firmenname und Telefonnummer auf der Website identisch mit dem Profil?',
    help: 'NAP-Konsistenz: dasselbe Unternehmen in jeder Quelle gleich geschrieben.',
    options: [
      { label: 'Ja, Zeichen für Zeichen', points: 10 },
      { label: 'Es gibt kleine Abweichungen', points: 3 },
      { label: 'Habe ich nicht geprüft', points: 0 },
    ],
    advice:
      'Dass Name und Telefonnummer überall exakt gleich sind, beeinflusst direkt das Vertrauen, das Google in die Existenz des Unternehmens aufbaut. Bei Profilen ohne Adresse zählt das noch mehr.',
    link: 'services/local-seo' as const,
  },
];

const bands = [
  {
    min: 80,
    title: 'Ihr Fundament steht',
    text: 'Auf der Profilseite gibt es kein Grundproblem. Auf diesem Niveau ist der nächste Schritt, per Rastermessung herauszufinden, wo Sie geografisch zurückfallen — denn das Problem ist nicht mehr das Profil, sondern die Punkte, an denen sich der Wettbewerb ballt.',
  },
  {
    min: 55,
    title: 'Es gibt deutliche Lücken',
    text: 'Das Profil funktioniert, aber in einigen Bereichen liegen Sie hinter dem Wettbewerb. Die unten aufgeführten Schwachstellen lassen sich meist in vier bis acht Wochen schließen — in diesem Zeitraum zeigt sich auch die erste Bewegung.',
  },
  {
    min: 0,
    title: 'Es gibt kritische Lücken',
    text: 'Das Profil hat Lücken, die das Ranking unmittelbar bremsen. Die gute Nachricht: auf diesem Niveau kommt der größte Sprung meist aus den ersten Korrekturen, weil die meisten Wettbewerber diese Bereiche ebenfalls nicht pflegen.',
  },
];

export const de: AuditContent = {
  groups,
  questions,
  bands,
  ui: {
    answered: 'Fragen beantwortet',
    adviceHeading: 'Das sollten Sie zuerst beheben',
    adviceLink: 'Wie behebt man das? →',
    ctaLabel: 'Rasterauswertung anfordern →',
  },
};
