import { getBrandFromId, type BrandConfig } from '@/config/brands'

interface EmailTemplate {
  subject: string
  html: string
}

function brandHeader(brand: BrandConfig): string {
  return `
    <div style="text-align: center; margin-bottom: 32px;">
      <span style="font-size: 18px; color: #E2E8F0;">${brand.logoName[0]}</span>
      <span style="font-size: 18px; color: ${brand.colors.accent}; font-weight: 600;">${brand.logoName[1]}</span>
    </div>
  `
}

function brandFooter(brand: BrandConfig, email: string): string {
  return `
    <div style="border-top: 1px solid rgba(255,255,255,0.04); padding-top: 24px; margin-top: 32px;">
      <p style="color: #475569; font-size: 11px; text-align: center; margin: 0;">
        Dis Optimus Capital LLC &mdash; ${brand.domain}<br />
        <a href="https://${brand.domain}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #475569;">Unsubscribe</a>
      </p>
    </div>
  `
}

function wrap(brand: BrandConfig, email: string, content: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /></head>
    <body style="margin: 0; padding: 0; background: #0A0F1E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 560px; margin: 0 auto; padding: 40px 24px;">
        ${brandHeader(brand)}
        ${content}
        ${brandFooter(brand, email)}
      </div>
    </body>
    </html>
  `
}

function cta(brand: BrandConfig, text: string, url: string): string {
  return `
    <div style="text-align: center; margin: 24px 0;">
      <a href="${url}" style="display: inline-block; background: ${brand.colors.accent}; color: #0A0F1E; font-size: 14px; font-weight: 600; padding: 14px 32px; text-decoration: none; text-transform: uppercase; letter-spacing: 0.05em;">
        ${text}
      </a>
    </div>
  `
}

const welcomeSequence: Record<number, (brand: BrandConfig) => { subject: string; body: string }> = {
  1: (brand) => ({
    subject: `Welcome to ${brand.name} - What to Know About IRS Campaign 685`,
    body: `
      <h2 style="color: #F1F5F9; font-size: 20px; margin: 0 0 16px;">Campaign 685 Is Real. Here's What It Means for You.</h2>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">The IRS has publicly confirmed that Campaign 685 is targeting Act 60 decree holders. Over 100 investigations are active, with an average deficiency of $287,000.</p>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">The most common errors we find:</p>
      <ul style="color: #94A3B8; font-size: 14px; line-height: 1.9; padding-left: 20px;">
        <li>IRC 933 exclusion miscalculations</li>
        <li>Transfer pricing that doesn't hold up</li>
        <li>Missing FBAR/FATCA filings</li>
        <li>Residency test documentation gaps</li>
      </ul>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">Your checklist is a great first step. When you're ready for a comprehensive review, we're here.</p>
    `,
  }),
  2: (brand) => ({
    subject: `The #1 Error That Triggers Act 60 Audits`,
    body: `
      <h2 style="color: #F1F5F9; font-size: 20px; margin: 0 0 16px;">Transfer Pricing: The Silent Audit Trigger</h2>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">85% of the Act 60 audit cases we've reviewed involve transfer pricing issues. Here's the pattern:</p>
      <div style="background: rgba(239,68,68,0.05); border-left: 3px solid rgba(239,68,68,0.3); padding: 16px; margin: 16px 0;">
        <p style="color: #FCA5A5; font-size: 13px; margin: 0;">US entity pays PR entity 80-90% of revenue as "management fees." IRS applies IRC 482 and reclassifies the income. Result: $287K average deficiency + 40% penalty.</p>
      </div>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">Our AI analyzes your transfer pricing arrangements against the same benchmarks the IRS uses. Most CPAs don't have the tools to do this.</p>
    `,
  }),
  3: (brand) => ({
    subject: `"My CPA Said Everything Was Fine" - A $120K Mistake`,
    body: `
      <h2 style="color: #F1F5F9; font-size: 20px; margin: 0 0 16px;">Why a Second Opinion Matters</h2>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">One of our clients paid $8,000 for a CPA review. They said everything was fine.</p>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">Our AI found three critical errors in 20 minutes:</p>
      <ul style="color: #94A3B8; font-size: 14px; line-height: 1.9; padding-left: 20px;">
        <li>Pre-move capital gains incorrectly excluded under IRC 933</li>
        <li>Transfer pricing ratio outside safe harbor range</li>
        <li>Form 480.6 EC not filed for exempt income</li>
      </ul>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">Total exposure avoided: <strong style="color: #F1F5F9;">$120,000+</strong></p>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">A ${brand.name} review costs a fraction of what you'd pay a specialist CPA. And it catches things they miss.</p>
    `,
  }),
  4: (brand) => ({
    subject: `${brand.altCostFrame} - The Math Is Simple`,
    body: `
      <h2 style="color: #F1F5F9; font-size: 20px; margin: 0 0 16px;">The Real Cost of Not Knowing</h2>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">Here's what Act 60 holders face if they get audited unprepared:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="color: #94A3B8; font-size: 13px; padding: 8px 0;">Average deficiency</td>
          <td style="color: #FCA5A5; font-size: 13px; padding: 8px 0; text-align: right; font-weight: 600;">$287,000</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="color: #94A3B8; font-size: 13px; padding: 8px 0;">TP penalty (40%)</td>
          <td style="color: #FCA5A5; font-size: 13px; padding: 8px 0; text-align: right; font-weight: 600;">$114,800</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="color: #94A3B8; font-size: 13px; padding: 8px 0;">Interest (3 years)</td>
          <td style="color: #FCA5A5; font-size: 13px; padding: 8px 0; text-align: right; font-weight: 600;">$43,000+</td>
        </tr>
        <tr>
          <td style="color: #F1F5F9; font-size: 14px; padding: 12px 0; font-weight: 600;">Total exposure</td>
          <td style="color: #F1F5F9; font-size: 14px; padding: 12px 0; text-align: right; font-weight: 600;">$444,800+</td>
        </tr>
      </table>
      <p style="color: ${brand.colors.accent}; font-size: 14px; font-weight: 600; text-align: center;">${brand.altCostFrame}</p>
    `,
  }),
}

const abandonedCheckoutSequence: Record<number, (brand: BrandConfig) => { subject: string; body: string }> = {
  1: (brand) => ({
    subject: `You left something behind at ${brand.name}`,
    body: `
      <h2 style="color: #F1F5F9; font-size: 20px; margin: 0 0 16px;">Your Review Is Waiting</h2>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">You started the checkout process but didn't complete it. No worries - your selection is still available.</p>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">Remember: every day without a review is another day of potential exposure to IRS Campaign 685.</p>
    `,
  }),
  2: (brand) => ({
    subject: `"I wish I'd done this before the audit letter arrived"`,
    body: `
      <h2 style="color: #F1F5F9; font-size: 20px; margin: 0 0 16px;">Don't Wait for the Letter</h2>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">We hear this from decree holders every week. The ones who review proactively save an average of $120K+ in avoided assessments.</p>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">The ones who wait? They spend 10x more on attorneys and penalties.</p>
    `,
  }),
  3: (brand) => ({
    subject: `Last chance: Your ${brand.name} review`,
    body: `
      <h2 style="color: #F1F5F9; font-size: 20px; margin: 0 0 16px;">100% Money-Back Guarantee</h2>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">If our review doesn't find at least one issue worth addressing, you get a full refund. No questions asked.</p>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">With 100+ active IRS investigations into Act 60 holders, the question isn't whether to review - it's when.</p>
      <p style="color: ${brand.colors.accent}; font-size: 14px; font-weight: 600;">${brand.altCostFrame}</p>
    `,
  }),
}

const postPurchaseSequence: Record<number, (brand: BrandConfig) => { subject: string; body: string }> = {
  1: (brand) => ({
    subject: `Thank you for choosing ${brand.name}`,
    body: `
      <h2 style="color: #F1F5F9; font-size: 20px; margin: 0 0 16px;">Your Review Is Confirmed</h2>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">Thank you for trusting us with your Act 60 compliance review. Here's what happens next:</p>
      <ol style="color: #94A3B8; font-size: 14px; line-height: 1.9; padding-left: 20px;">
        <li>Upload your tax return documents</li>
        <li>Our AI analyzes against 200+ compliance rules</li>
        <li>CPA verification of findings (if applicable)</li>
        <li>Receive your comprehensive report</li>
      </ol>
    `,
  }),
  2: (brand) => ({
    subject: `Quick tip: Upload your documents for fastest results`,
    body: `
      <h2 style="color: #F1F5F9; font-size: 20px; margin: 0 0 16px;">Ready to Upload?</h2>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">For the most thorough review, include:</p>
      <ul style="color: #94A3B8; font-size: 14px; line-height: 1.9; padding-left: 20px;">
        <li>Federal return (Form 1040 + all schedules)</li>
        <li>PR return (Planilla)</li>
        <li>Decree grant letter</li>
        <li>Any transfer pricing documentation</li>
      </ul>
    `,
  }),
  3: (brand) => ({
    subject: `Your ${brand.name} report is ready`,
    body: `
      <h2 style="color: #F1F5F9; font-size: 20px; margin: 0 0 16px;">Your Report Is Ready</h2>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">Your compliance review report has been generated. Log in to view your full findings, risk scores, and remediation recommendations.</p>
    `,
  }),
  4: () => ({
    subject: `How was your experience?`,
    body: `
      <h2 style="color: #F1F5F9; font-size: 20px; margin: 0 0 16px;">We'd Love Your Feedback</h2>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">Your review has been delivered. We'd appreciate knowing how it went:</p>
      <ul style="color: #94A3B8; font-size: 14px; line-height: 1.9; padding-left: 20px;">
        <li>Did we find issues your CPA missed?</li>
        <li>Was the report clear and actionable?</li>
        <li>Would you recommend us to other decree holders?</li>
      </ul>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">Reply to this email with your thoughts. Every piece of feedback helps us improve.</p>
    `,
  }),
  5: (brand) => ({
    subject: `Protect your decree year-round with ${brand.crossSell.brandName}`,
    body: `
      <h2 style="color: #F1F5F9; font-size: 20px; margin: 0 0 16px;">What's Next for Your Compliance?</h2>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">Your review identified the current state of your compliance. But the IRS doesn't stop watching after one year.</p>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.7;">Take the next step in the protection stack:</p>
      <p style="color: ${brand.colors.accent}; font-size: 14px; font-weight: 600;">${brand.crossSell.text} &rarr;</p>
    `,
  }),
}

export function getEmailTemplate(
  brandId: string,
  flowType: 'welcome' | 'abandoned_checkout' | 'post_purchase',
  step: number,
  email: string
): EmailTemplate | null {
  const brand = getBrandFromId(brandId)

  const sequences: Record<string, Record<number, (b: BrandConfig) => { subject: string; body: string }>> = {
    welcome: welcomeSequence,
    abandoned_checkout: abandonedCheckoutSequence,
    post_purchase: postPurchaseSequence,
  }

  const sequence = sequences[flowType]
  if (!sequence) return null

  const template = sequence[step]
  if (!template) return null

  const { subject, body } = template(brand)
  const ctaUrl = `https://${brand.domain}/#pricing`
  const ctaText = flowType === 'post_purchase' && step >= 4
    ? brand.crossSell.text
    : brand.ctaText

  return {
    subject,
    html: wrap(brand, email, body + (step <= 4 ? cta(brand, ctaText, flowType === 'post_purchase' && step === 5 ? brand.crossSell.url : ctaUrl) : '')),
  }
}

export function getMaxSteps(flowType: string): number {
  switch (flowType) {
    case 'welcome': return 4
    case 'abandoned_checkout': return 3
    case 'post_purchase': return 5
    default: return 0
  }
}

export function getDelayHours(flowType: string, step: number): number {
  switch (flowType) {
    case 'welcome':
      return [0, 24, 72, 120, 168][step] ?? 168
    case 'abandoned_checkout':
      return [0, 1, 24, 72][step] ?? 72
    case 'post_purchase':
      return [0, 0, 24, 72, 168, 336][step] ?? 336
    default:
      return 24
  }
}
