export interface Testimonial {
  quote: string
  name: string
  role: string
  result: string
}

export interface LeadMagnet {
  title: string
  description: string
  bullets: readonly string[]
  type: 'pdf' | 'interactive'
}

export interface BrandConfig {
  id: 'act60review' | 'decreecheck' | 'act60shield'
  name: string
  logoName: [string, string]
  domain: string
  tagline: string
  description: string
  tier: 'premium' | 'diy' | 'defense'
  heroHeadline: string
  heroHighlight: string
  heroSubheadline: string
  ctaText: string
  ctaSecondary: string
  socialProof: string
  trustBadges: readonly string[]
  tiers: readonly PricingTier[]
  features: readonly string[]
  colors: {
    accent: string
    accentLight: string
    accentDark: string
    bgPrimary: string
    bgSecondary: string
  }
  clientCount: string
  altCostFrame: string
  consultationUrl: string
  testimonials: readonly Testimonial[]
  leadMagnet: LeadMagnet
  credentials: readonly string[]
  crossSell: { text: string; url: string; brandName: string }
}

export interface PricingTier {
  id: string
  tier: string
  name: string
  price: number
  description: string
  features: readonly string[]
  excludes: readonly string[]
  cta: string
  popular: boolean
}

const brands: Record<string, BrandConfig> = {
  act60review: {
    id: 'act60review',
    name: 'Act 60 Review',
    logoName: ['Act 60 ', 'Review'],
    domain: 'act60review.com',
    tagline: 'AI-Powered Tax Return Review for Act 60 Decree Holders',
    description: 'Get a comprehensive AI review of your Puerto Rico tax return in under 24 hours. Catch errors before the IRS does.',
    tier: 'premium',
    heroHeadline: 'Is Your Act 60 Return',
    heroHighlight: 'Bulletproof?',
    heroSubheadline: 'The IRS is investigating 100+ decree holders. Our AI reviews your return against 200+ compliance rules in under 24 hours \u2014 catching the errors that trigger audits.',
    ctaText: 'Get Your Review',
    ctaSecondary: 'See What We Catch',
    socialProof: '5,500+ decree holders. Zero AI tools. Until now.',
    trustBadges: ['CPA-Verified', 'SOC 2 Compliant', '256-bit Encryption'],
    colors: { accent: '#C9A96E', accentLight: '#DFC292', accentDark: '#A68B4B', bgPrimary: '#0A0F1E', bgSecondary: '#111827' },
    clientCount: '247+ decree holders served',
    altCostFrame: '$1,499 review vs $48,946 garnishment',
    consultationUrl: 'mailto:support@act60review.com',
    testimonials: [
      { quote: 'Found three errors my CPA missed. The transfer pricing flag alone saved me from a potential $120K assessment.', name: 'R.M.', role: 'Tech Founder, Dorado', result: 'Avoided $120K+ assessment' },
      { quote: 'Worth every penny. The AI caught an IRC 933 exclusion error that would have triggered an automatic audit.', name: 'S.K.', role: 'Fund Manager, San Juan', result: 'Prevented audit trigger' },
      { quote: 'My CPA charged $8,000 and missed what this tool found in 20 minutes.', name: 'J.P.', role: 'E-commerce Operator, Condado', result: 'Saved $8K+ in CPA fees' },
    ],
    leadMagnet: {
      title: '12-Point Act 60 Compliance Self-Check',
      description: 'The exact checklist our AI uses to flag the errors that trigger IRS Campaign 685 audits.',
      bullets: [
        'The 3 IRC 933 errors that trigger automatic IRS review',
        'Transfer pricing red flags the IRS looks for first',
        'FBAR/FATCA gaps that carry $100K+ penalties per year',
        'Presence test documentation most CPAs forget',
      ],
      type: 'pdf',
    },
    credentials: ['CPA-Reviewed', 'SOC 2 Compliant', '256-bit Encryption', 'Act 60 Specialist'],
    crossSell: { text: 'Want audit protection? Act 60 Shield', url: 'https://act60shield.com', brandName: 'Act 60 Shield' },
    tiers: [
      { id: 'basic', tier: 'Essential', name: 'Quick Scan', price: 299, description: 'AI compliance check. Know your risk in minutes.', features: ['AI compliance score (0\u2013100)', 'Top 5 risk areas identified', 'Missing form detection', 'Basic transfer pricing flags', 'Actionable recommendations', 'PDF report instantly'], excludes: ['CPA verification', 'Audit preparation', 'Ongoing monitoring', 'Direct CPA access'], cta: 'Get Quick Scan', popular: false },
      { id: 'comprehensive', tier: 'Most Popular', name: 'Full Review', price: 1499, description: 'Complete AI review + CPA verification + audit prep. The gold standard.', features: ['Full return analysis (200+ rules)', 'Transfer pricing deep dive', 'FBAR & 8938 cross-check', 'IRC 933 exclusion verification', 'Residency test review', 'CPA-verified report', 'Campaign 685 risk mapping', 'Documentation audit', 'Presence test gap analysis', 'TP study evaluation', 'Pre-audit preparation', '30-min CPA call', '90-day priority support'], excludes: ['Ongoing monitoring', 'Direct CPA phone line', 'Multi-entity review'], cta: 'Get Full Review', popular: true },
      { id: 'enterprise', tier: 'Maximum Protection', name: 'Fortress', price: 4999, description: 'Maximum protection. Ongoing monitoring. White-glove service.', features: ['Everything in Full Review', 'Dedicated CPA advisor', 'Annual compliance monitoring', 'Quarterly risk updates', 'Hacienda correspondence review', 'Emergency audit response kit', 'Multi-entity review (LLCs, trusts)', 'Transfer pricing study audit', 'IRS correspondence management', 'Proactive audit prevention', 'Direct CPA phone line', 'Priority response (<4 hours)', 'Unlimited email support', '12-month coverage'], excludes: [], cta: 'Deploy Fortress', popular: false },
    ],
    features: ['Full return analysis against 200+ Act 60 compliance rules', 'Transfer pricing red flag detection', 'FBAR & Form 8938 cross-verification', 'IRC 933 exclusion accuracy check', 'Bona fide residency documentation review', 'CPA-verified findings report'],
  },
  decreecheck: {
    id: 'decreecheck',
    name: 'DecreeCheck',
    logoName: ['Decree', 'Check'],
    domain: 'decreecheck.com',
    tagline: 'Quick Compliance Check for Your Act 60 Return',
    description: 'Run a fast AI scan on your PR tax return. Know your risk level in minutes, not weeks.',
    tier: 'diy',
    heroHeadline: 'Check Your Decree',
    heroHighlight: 'In Minutes.',
    heroSubheadline: 'Upload your return. Get an instant compliance score and risk assessment. Fix issues before they become audits. No phone calls, no waiting.',
    ctaText: 'Check My Return',
    ctaSecondary: 'How It Works',
    socialProof: 'The $149 second opinion that could save you $250,000.',
    trustBadges: ['Instant Results', '256-bit Encryption', 'Money-Back Guarantee'],
    colors: { accent: '#10B981', accentLight: '#34D399', accentDark: '#059669', bgPrimary: '#0A1A15', bgSecondary: '#0F2318' },
    clientCount: '180+ returns scanned',
    altCostFrame: '$149 scan vs $287,000 average deficiency',
    consultationUrl: 'mailto:support@decreecheck.com',
    testimonials: [
      { quote: 'Ran the scan before filing and caught two missing forms. Best $149 I ever spent.', name: 'M.L.', role: 'Consultant, Guaynabo', result: '2 missing forms caught' },
      { quote: 'My accountant said everything was fine. DecreeCheck found a $47K exposure in 3 minutes.', name: 'A.R.', role: 'SaaS Founder, Isla Verde', result: '$47K exposure identified' },
      { quote: 'Simple, fast, and it actually found real issues. No upsell pressure.', name: 'D.C.', role: 'Investor, Palmas del Mar', result: 'Clean compliance score' },
    ],
    leadMagnet: {
      title: 'Decree Health Score Calculator',
      description: 'Answer 12 questions and get your compliance risk score instantly. No upload required.',
      bullets: [
        'Instant risk score based on your decree terms',
        'Top 3 areas where most holders fail compliance',
        'IRS Campaign 685 exposure assessment',
        'Personalized action items to fix gaps',
      ],
      type: 'interactive',
    },
    credentials: ['Instant Results', 'Bank-Level Encryption', 'Money-Back Guarantee', 'No CPA Required'],
    crossSell: { text: 'Need deeper analysis? Act 60 Review', url: 'https://act60review.com', brandName: 'Act 60 Review' },
    tiers: [
      { id: 'basic', tier: 'Quick Check', name: 'Instant Scan', price: 149, description: 'AI-powered compliance scan. Results in minutes.', features: ['AI compliance score (0\u2013100)', 'Top 5 risk areas flagged', 'Missing form detection', 'Basic transfer pricing check', 'PDF report instantly', 'Fix recommendations'], excludes: ['CPA verification', 'Full 200+ rule analysis', 'Audit preparation', 'Email support'], cta: 'Run Instant Scan', popular: false },
      { id: 'comprehensive', tier: 'Full Check', name: 'Deep Scan', price: 499, description: 'Comprehensive AI scan with CPA verification.', features: ['Full return analysis (200+ rules)', 'Transfer pricing deep dive', 'FBAR & 8938 cross-check', 'IRC 933 exclusion verification', 'Residency test review', 'CPA-verified report', 'Remediation guide', '14-day email support'], excludes: ['Audit preparation', 'Campaign 685 mapping', 'CPA consultation call'], cta: 'Run Deep Scan', popular: true },
      { id: 'defense', tier: 'Full Check+', name: 'Complete Audit', price: 899, description: 'Deep Scan + audit preparation documentation.', features: ['Everything in Deep Scan', 'Campaign 685 risk mapping', 'Documentation completeness check', 'Presence test gap analysis', 'TP study evaluation', 'Pre-audit preparation guide', '30-day email support'], excludes: [], cta: 'Run Complete Audit', popular: false },
    ],
    features: ['AI compliance score (0-100)', 'Top 5 risk areas identified', 'Missing form detection', 'Basic transfer pricing flags', 'Actionable fix recommendations', 'PDF report in minutes'],
  },
  act60shield: {
    id: 'act60shield',
    name: 'Act 60 Shield',
    logoName: ['Act 60 ', 'Shield'],
    domain: 'act60shield.com',
    tagline: 'Audit Defense Intelligence for Act 60 Holders',
    description: 'Comprehensive review + audit preparation package. Know exactly where you stand before the IRS comes knocking.',
    tier: 'defense',
    heroHeadline: 'Your Audit Defense',
    heroHighlight: 'Starts Here.',
    heroSubheadline: 'IRS Campaign 685 is targeting Act 60 holders. Get ahead of it with a comprehensive review and audit-ready documentation package. Built for those who take compliance seriously.',
    ctaText: 'Activate Your Shield',
    ctaSecondary: 'View Defense Report',
    socialProof: 'Average Act 60 audit deficiency: $287,000. Average shield cost: $1,999.',
    trustBadges: ['CPA-Verified', 'Audit-Ready Documentation', 'Money-Back Guarantee'],
    colors: { accent: '#8B5CF6', accentLight: '#A78BFA', accentDark: '#7C3AED', bgPrimary: '#0F0D1E', bgSecondary: '#1A1730' },
    clientCount: '130+ audit-ready packages delivered',
    altCostFrame: '$1,999 shield vs $287,000 average deficiency',
    consultationUrl: 'mailto:support@act60shield.com',
    testimonials: [
      { quote: 'Got the IRS letter 3 months after activating my shield. Had every document ready. Case closed in 6 weeks.', name: 'T.W.', role: 'Real Estate Investor, Dorado', result: 'Audit closed in 6 weeks' },
      { quote: 'The Campaign 685 risk mapping showed me exactly what the IRS would look at. No surprises.', name: 'K.S.', role: 'Hedge Fund Partner, Old San Juan', result: 'Zero surprises at audit' },
      { quote: 'My attorney quoted $25K for audit prep. Act 60 Shield delivered the same documentation package for a fraction.', name: 'L.B.', role: 'Crypto Trader, Condado', result: 'Saved $23K in legal fees' },
    ],
    leadMagnet: {
      title: 'Hacienda Audit Defense Checklist',
      description: 'The 20-point documentation checklist the IRS expects to see when they audit your decree.',
      bullets: [
        'Every document IRS Campaign 685 agents request first',
        'The 5 presence test gaps that trigger deeper investigation',
        'Transfer pricing documentation the IRS considers adequate',
        'Common CPA mistakes that make audits worse',
      ],
      type: 'pdf',
    },
    credentials: ['CPA-Verified', 'Audit-Ready Documentation', 'Money-Back Guarantee', 'Campaign 685 Specialist'],
    crossSell: { text: 'Know someone who needs a quick check? DecreeCheck', url: 'https://decreecheck.com', brandName: 'DecreeCheck' },
    tiers: [
      { id: 'basic', tier: 'Standard', name: 'Defense Review', price: 799, description: 'Full AI review with audit-focused analysis.', features: ['Full return analysis (200+ rules)', 'Transfer pricing red flags', 'FBAR & 8938 verification', 'IRC 933 exclusion check', 'CPA-verified findings', 'Audit risk score', 'PDF report delivery'], excludes: ['Campaign 685 mapping', 'CPA consultation', 'Ongoing monitoring', 'Correspondence management'], cta: 'Start Defense Review', popular: false },
      { id: 'comprehensive', tier: 'Advanced', name: 'Full Shield', price: 1999, description: 'Complete defense package. CPA-verified. Audit-ready.', features: ['Everything in Defense Review', 'Campaign 685 risk mapping', 'Documentation completeness audit', 'Presence test gap analysis', 'TP study evaluation', 'Pre-audit response prep', 'CPA consultation (30 min)', '90-day priority support'], excludes: ['Ongoing monitoring', 'Dedicated CPA advisor', 'Correspondence management'], cta: 'Activate Full Shield', popular: true },
      { id: 'defense', tier: 'Maximum', name: 'Fortress', price: 3499, description: 'Maximum protection. Ongoing monitoring.', features: ['Everything in Full Shield', 'Annual compliance monitoring', 'Quarterly risk updates', 'Hacienda correspondence review', 'Emergency audit response kit', 'Dedicated CPA advisor', 'Unlimited email support', '12-month coverage'], excludes: [], cta: 'Deploy Fortress', popular: false },
    ],
    features: ['Everything in Act 60 Review', 'Audit risk assessment with IRS Campaign 685 mapping', 'Documentation completeness audit', 'Presence test verification & gap analysis', 'Transfer pricing study evaluation', 'Pre-audit response preparation guide', 'Priority CPA consultation (30 min)'],
  },
}

export function getBrandFromId(brandId: string): BrandConfig {
  return brands[brandId] ?? brands.act60review
}

export function getBrandConfig(): BrandConfig {
  const brandId = process.env.NEXT_PUBLIC_BRAND_ID ?? 'act60review'
  return brands[brandId] ?? brands.act60review
}

export function getAllBrands(): BrandConfig[] {
  return Object.values(brands)
}

export default brands
