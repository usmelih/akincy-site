import type { AuditContent } from './index';

/**
 * English content. Scoring is deliberately transparent: every option carries a
 * visible point value and the maximum is 100. The tool is a diagnostic, not a
 * lead gate — visitors learn what is weak even if they never contact us.
 */

const groups = [
  { id: 'basics', label: 'Category and basics', max: 30 },
  { id: 'reviews', label: 'Reviews', max: 30 },
  { id: 'freshness', label: 'Content and freshness', max: 20 },
  { id: 'site', label: 'Website connection', max: 20 },
];

const questions = [
  {
    id: 'q1',
    group: 'basics',
    question: 'Does your primary category match your main service exactly?',
    help: 'The primary category is the heaviest relevance signal in local ranking. It should sit on your highest-volume core service.',
    options: [
      { label: 'Yes, it matches exactly', points: 10 },
      { label: 'Close, but not exact', points: 5 },
      { label: 'Not sure — I have not checked', points: 0 },
    ],
    advice:
      'Category is the single biggest ranking change you can make through one field. Extract the primary categories of the current top three and compare before doing anything else.',
    link: 'services/gbp' as const,
  },
  {
    id: 'q2',
    group: 'basics',
    question: 'Is your service list filled in, with a description for each item?',
    help: 'On most profiles this field is either empty or filled with Google’s generic suggestions — meaning it is identical to your competitors’.',
    options: [
      { label: 'All written, each with a description', points: 10 },
      { label: 'List exists but no descriptions', points: 5 },
      { label: 'Empty, or left as Google suggested', points: 0 },
    ],
    advice:
      'Write service items in the words people actually search for and add a description to each. Keep that naming identical to the service pages on your site.',
    link: 'services/gbp' as const,
  },
  {
    id: 'q3',
    group: 'basics',
    question: 'Are your hours, phone and website link current?',
    help: 'A profile that shows as closed, or has the wrong number, loses that customer even when its ranking is good.',
    options: [
      { label: 'All three current, holidays included', points: 10 },
      { label: 'Mostly current but I do not check', points: 5 },
      { label: 'Something is missing or outdated', points: 0 },
    ],
    advice:
      'These fields affect conversion more than ranking. Setting special hours for public holidays in particular prevents showing as "closed" and losing the enquiry.',
  },
  {
    id: 'q4',
    group: 'reviews',
    question: 'How many reviews do you have?',
    options: [
      { label: '50 or more', points: 10 },
      { label: '20–49', points: 7 },
      { label: '5–19', points: 4 },
      { label: '0–4', points: 0 },
    ],
    advice:
      'Review volume is the most measurable source of the prominence signal. Set the target from the average of the current top three, not from an absolute number.',
    link: 'services/gbp' as const,
  },
  {
    id: 'q5',
    group: 'reviews',
    question: 'How does your review volume compare to the top three?',
    help: 'Look at the three businesses that appear for your target query.',
    options: [
      { label: 'More than theirs', points: 10 },
      { label: 'About the same', points: 6 },
      { label: 'Noticeably fewer', points: 2 },
      { label: 'I have not looked', points: 0 },
    ],
    advice:
      'Setting a review target without knowing your competitors’ volume is meaningless. Quantify the gap — in most cases it turns out to be the single reason you are behind.',
    link: 'services/rank-tracking' as const,
  },
  {
    id: 'q6',
    group: 'reviews',
    question: 'Do you reply to reviews?',
    help: 'Service and place names that appear in your replies also produce relevance signals.',
    options: [
      { label: 'To all of them, within a few days', points: 10 },
      { label: 'To some', points: 5 },
      { label: 'No', points: 0 },
    ],
    advice:
      'Reply to every review and name the service naturally in the reply. For negative ones, fix it privately first, then post a short, non-defensive public reply.',
    link: 'services/gbp' as const,
  },
  {
    id: 'q7',
    group: 'freshness',
    question: 'Have you posted from your profile in the last 30 days?',
    options: [
      { label: 'I post regularly', points: 10 },
      { label: 'Occasionally', points: 5 },
      { label: 'No', points: 0 },
    ],
    advice:
      'Posting alone will not put you in the top three; but with everything else equal, an active profile beats a dormant one. Point each post at a service page on your site.',
    link: 'services/gbp' as const,
  },
  {
    id: 'q8',
    group: 'freshness',
    question: 'Have you added new photos in the last 90 days?',
    help: 'A steady trickle works better than uploading thirty photos once and never touching it again.',
    options: [
      { label: 'Yes, I add them regularly', points: 10 },
      { label: 'No, not for a long time', points: 0 },
    ],
    advice:
      'Real premises and team photos produce a freshness signal and build trust that stock imagery cannot.',
  },
  {
    id: 'q9',
    group: 'site',
    question: 'Which page on your site does the profile link to?',
    options: [
      { label: 'Homepage plus each service linked separately', points: 10 },
      { label: 'Homepage only', points: 6 },
      { label: 'No site linked', points: 0 },
    ],
    advice:
      'Linking each profile service to its matching page on the site helps Google match the two entities as one business.',
    link: 'services/on-page-seo' as const,
  },
  {
    id: 'q10',
    group: 'site',
    question: 'Are the business name and phone on your site identical to the profile?',
    help: 'NAP consistency: the same business written the same way across every source.',
    options: [
      { label: 'Yes, character for character', points: 10 },
      { label: 'There are small differences', points: 3 },
      { label: 'I have not checked', points: 0 },
    ],
    advice:
      'Name and phone being byte-identical everywhere directly affects the confidence Google accumulates that the business is real. On address-hidden profiles this matters even more.',
    link: 'services/local-seo' as const,
  },
];

const bands = [
  {
    min: 80,
    title: 'Your foundation is solid',
    text: 'There is no root problem on the profile side. At this level the next job is finding out where you fall behind geographically, through grid measurement — because the problem is no longer the profile, it is the points where competition concentrates.',
  },
  {
    min: 55,
    title: 'There are clear gaps',
    text: 'The profile works, but you are behind competitors in a few areas. The weak points below can usually be closed within four to eight weeks, which is also when first movement shows.',
  },
  {
    min: 0,
    title: 'There are critical gaps',
    text: 'The profile has gaps that directly hold ranking down. The good news: at this level the biggest jump usually comes from the first fixes, because most competitors are not managing these areas either.',
  },
];

export const en: AuditContent = {
  groups,
  questions,
  bands,
  ui: {
    answered: 'questions answered',
    adviceHeading: 'Fix these first',
    adviceLink: 'How to fix it →',
    ctaLabel: 'Request My Grid Report →',
  },
};
