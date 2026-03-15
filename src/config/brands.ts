export interface BrandConfig {
  id: 'act60review' | 'decreecheck' | 'act60shield'
  name: string
  domain: string
  tagline: string
  description: string
  tier: 'premium' | 'diy' | 'defense'
  price: number
  priceLabel: string
  heroHeadline: string
  heroSubheadline: string
  ctaText: string
  ctaSecondary: string
  colors: {
    primary: string
    primaryDark: string
    accent: string
    gradient: string
  }
  features: readonly string[]
  socialProof: string
  trustBadges: readonly string[]
}

const brands: Record<string, BrandConfig> = {
  act60review: {
    id: 'act60review',
    name: 'Act 60 Review',
    domain: 'act60review.com',
    tagline: 'AI-Powered Tax Return Review for Act 60 Decree Holders',
    description: 'Get a comprehensive AI review of your Puerto Rico tax return in under 24 hours. Catch errors before the IRS does.',
    tier: 'premium',
    price: 999,
    priceLabel: '$999',
    heroHeadline: 'Is Your Act 60 Return\nBulletproof?',
    heroSubheadline: 'The IRS is investigating 100+ decree holders right now. Our AI reviews your return in under 24 hours — catching the errors that trigger audits.',
    ctaText: 'Get Your Review — $999',
    ctaSecondary: 'See What We Catch',
    colors: {
      primary: '#0F172A',
      primaryDark: '#020617',
      accent: '#3B82F6',
      gradient: 'from-blue-600 to-indigo-700',
    },
    features: [
      'Full return analysis against 200+ Act 60 compliance rules',
      'Transfer pricing red flag detection',
      'FBAR & Form 8938 cross-verification',
      'IRC 933 exclusion accuracy check',
      'Bona fide residency documentation review',
      'CPA-verified findings report',
    ],
    socialProof: '5,500+ decree holders. Zero AI tools. Until now.',
    trustBadges: [
      'CPA-Verified',
      'SOC 2 Compliant',
      '256-bit Encryption',
      'Money-Back Guarantee',
    ],
  },
  decreecheck: {
    id: 'decreecheck',
    name: 'DecreeCheck',
    domain: 'decreecheck.com',
    tagline: 'Quick Compliance Check for Your Act 60 Return',
    description: 'Run a fast AI scan on your PR tax return. Know your risk level in minutes.',
    tier: 'diy',
    price: 299,
    priceLabel: '$299',
    heroHeadline: 'Decree Check\nYour Return',
    heroSubheadline: 'Upload your return. Get an instant compliance score and risk assessment. Fix issues before they become audits.',
    ctaText: 'Check My Return — $299',
    ctaSecondary: 'How It Works',
    colors: {
      primary: '#065F46',
      primaryDark: '#022C22',
      accent: '#10B981',
      gradient: 'from-emerald-600 to-teal-700',
    },
    features: [
      'AI compliance score (0-100)',
      'Top 5 risk areas identified',
      'Missing form detection',
      'Basic transfer pricing flags',
      'Actionable fix recommendations',
      'PDF report in minutes',
    ],
    socialProof: 'The $299 second opinion that could save you $250,000.',
    trustBadges: [
      'Instant Results',
      '256-bit Encryption',
      'Money-Back Guarantee',
    ],
  },
  act60shield: {
    id: 'act60shield',
    name: 'Act 60 Shield',
    domain: 'act60shield.com',
    tagline: 'Audit Defense Intelligence for Act 60 Holders',
    description: 'Comprehensive review + audit preparation package. Know exactly where you stand before the IRS comes knocking.',
    tier: 'defense',
    price: 1499,
    priceLabel: '$1,499',
    heroHeadline: 'Your Audit\nDefense Starts Here',
    heroSubheadline: 'The IRS Campaign 685 is targeting Act 60 holders. Get ahead of it with a comprehensive review and audit-ready documentation package.',
    ctaText: 'Activate Shield — $1,499',
    ctaSecondary: 'View Defense Report Sample',
    colors: {
      primary: '#1E1B4B',
      primaryDark: '#0F0D2E',
      accent: '#8B5CF6',
      gradient: 'from-violet-600 to-purple-800',
    },
    features: [
      'Everything in Act 60 Review',
      'Audit risk assessment with IRS Campaign 685 mapping',
      'Documentation completeness audit',
      'Presence test verification & gap analysis',
      'Transfer pricing study evaluation',
      'Pre-audit response preparation guide',
      'Priority CPA consultation (30 min)',
    ],
    socialProof: 'Average Act 60 audit deficiency: $287,000. Average shield cost: $1,499.',
    trustBadges: [
      'CPA-Verified',
      'Audit-Ready Documentation',
      '256-bit Encryption',
      'Money-Back Guarantee',
    ],
  },
}

export function getBrandConfig(): BrandConfig {
  const brandId = process.env.NEXT_PUBLIC_BRAND_ID || 'act60review'
  return brands[brandId] || brands.act60review
}

export function getAllBrands(): BrandConfig[] {
  return Object.values(brands)
}

export default brands
