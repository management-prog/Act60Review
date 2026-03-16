import { Resend } from 'resend'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY not configured')
  return new Resend(key)
}

interface SendReportParams {
  to: string
  brandName: string
  brandDomain: string
  tierName: string
  reportHtml: string
  fromEmail: string
}

export async function sendReport({
  to,
  brandName,
  brandDomain,
  tierName,
  reportHtml,
  fromEmail,
}: SendReportParams) {
  const resend = getResend()

  const { error } = await resend.emails.send({
    from: `${brandName} <${fromEmail}>`,
    to,
    subject: `Your ${tierName} Compliance Report — ${brandName}`,
    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0A0F1E; color: #e2e8f0; margin: 0; padding: 0; }
  .container { max-width: 640px; margin: 0 auto; padding: 40px 24px; }
  .header { border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 24px; margin-bottom: 32px; }
  .brand { font-size: 18px; font-weight: 600; color: #f1f5f9; }
  .report { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 32px; margin-bottom: 32px; white-space: pre-wrap; line-height: 1.7; font-size: 14px; color: #cbd5e1; }
  .footer { font-size: 12px; color: #64748b; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 24px; }
  .cta { display: inline-block; background: #C9A96E; color: #0A0F1E; font-weight: 600; font-size: 14px; padding: 12px 24px; text-decoration: none; margin: 16px 0; }
  a { color: #C9A96E; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <div class="brand">${brandName}</div>
    <p style="color: #94a3b8; font-size: 14px; margin: 8px 0 0;">Your ${tierName} Compliance Report</p>
  </div>

  <p>Your Act 60 tax return analysis is complete. Here are your findings:</p>

  <div class="report">${reportHtml}</div>

  <p>Questions about your report? Reply to this email or visit <a href="https://${brandDomain}/#pricing">${brandDomain}</a>.</p>

  <div class="footer">
    <p>This report is for informational purposes only and does not constitute tax preparation, tax advice, or representation before any government agency. Consult a licensed CPA or tax attorney before acting on these findings.</p>
    <p>&copy; ${new Date().getFullYear()} Dis Optimus Capital LLC. All rights reserved.</p>
    <p><a href="https://${brandDomain}/privacy">Privacy Policy</a> | <a href="https://${brandDomain}/terms">Terms of Service</a></p>
  </div>
</div>
</body>
</html>`,
  })

  if (error) throw new Error(`Email send failed: ${error.message}`)
}

const FROM_EMAILS: Record<string, string> = {
  act60review: 'reports@act60review.com',
  decreecheck: 'reports@decreecheck.com',
  act60shield: 'reports@act60shield.com',
}

export function getFromEmail(brandId: string): string {
  return FROM_EMAILS[brandId] ?? FROM_EMAILS.act60review
}
