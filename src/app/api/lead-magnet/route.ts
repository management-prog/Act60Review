import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getBrandFromId } from '@/config/brands'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY not configured')
  return new Resend(key)
}

export async function POST(request: NextRequest) {
  try {
    const { email, brandId } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const brand = getBrandFromId(brandId ?? 'act60review')
    const resend = getResend()

    const fromEmail = `${brand.name.replace(/\s+/g, '')} <noreply@${brand.domain}>`

    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `Your Free ${brand.leadMagnet.title}`,
      html: buildLeadMagnetEmail(brand, email),
    })

    // Trigger welcome email sequence
    try {
      await fetch(new URL('/api/email-sequence', request.url), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          brandId: brand.id,
          flowType: 'welcome',
          currentStep: 0,
        }),
      })
    } catch {
      // Non-blocking: sequence trigger failure shouldn't prevent lead magnet delivery
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to send'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

function buildLeadMagnetEmail(brand: ReturnType<typeof getBrandFromId>, email: string): string {
  const accentColor = brand.colors.accent

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /></head>
    <body style="margin: 0; padding: 0; background: #0A0F1E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 560px; margin: 0 auto; padding: 40px 24px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 18px; color: #E2E8F0;">${brand.logoName[0]}</span>
          <span style="font-size: 18px; color: ${accentColor}; font-weight: 600;">${brand.logoName[1]}</span>
        </div>

        <h1 style="color: #F1F5F9; font-size: 24px; margin: 0 0 16px; text-align: center;">
          Your ${brand.leadMagnet.title}
        </h1>

        <p style="color: #94A3B8; font-size: 14px; line-height: 1.6; text-align: center; margin: 0 0 24px;">
          ${brand.leadMagnet.description}
        </p>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 24px; margin-bottom: 24px;">
          <p style="color: #64748B; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px;">What's inside:</p>
          ${brand.leadMagnet.bullets.map(b => `
            <p style="color: #CBD5E1; font-size: 14px; margin: 0 0 8px; padding-left: 16px;">
              &#10003; ${b}
            </p>
          `).join('')}
        </div>

        <div style="text-align: center; margin: 32px 0;">
          <a href="https://${brand.domain}/lead-magnet" style="display: inline-block; background: ${accentColor}; color: #0A0F1E; font-size: 14px; font-weight: 600; padding: 14px 32px; text-decoration: none; text-transform: uppercase; letter-spacing: 0.05em;">
            Download Now
          </a>
        </div>

        <div style="border-top: 1px solid rgba(255,255,255,0.04); padding-top: 24px; margin-top: 32px;">
          <p style="color: #64748B; font-size: 12px; text-align: center; margin: 0 0 8px;">
            Ready for a comprehensive review?
          </p>
          <p style="text-align: center;">
            <a href="https://${brand.domain}/#pricing" style="color: ${accentColor}; font-size: 13px; text-decoration: none;">
              See pricing &rarr;
            </a>
          </p>
        </div>

        <p style="color: #475569; font-size: 11px; text-align: center; margin-top: 32px;">
          Dis Optimus Capital LLC &mdash; ${brand.domain}<br />
          <a href="https://${brand.domain}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #475569;">Unsubscribe</a>
        </p>
      </div>
    </body>
    </html>
  `
}
