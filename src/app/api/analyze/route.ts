import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import Stripe from 'stripe'

export const maxDuration = 120

function getAnthropic() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured')
  return new Anthropic({ apiKey })
}

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY not configured')
  return new Stripe(key)
}

const TIER_INSTRUCTIONS: Record<string, string> = {
  basic: `ANALYSIS SCOPE: QUICK SCAN (Essential Tier)
- Provide a compliance score (0-100) and risk level
- Identify the TOP 5 most critical issues only
- For each finding: category, severity, one-line description, one-line fix
- Do NOT provide deep transfer pricing analysis
- Do NOT provide residency test gap analysis
- Do NOT provide audit preparation content
- Keep the report concise — 1-2 pages equivalent
- End with: "Upgrade to Full Review for complete 200+ rule analysis with CPA verification."`,

  comprehensive: `ANALYSIS SCOPE: FULL REVIEW (Comprehensive Tier)
- Run the complete 200+ rule compliance analysis
- Provide detailed findings across ALL 8 categories
- For each finding: category, severity, detailed description, specific fix with IRC/PR Code citation
- Include transfer pricing red flag analysis
- Include FBAR/FATCA cross-verification
- Include IRC 933 exclusion accuracy check
- Include residency documentation review
- Provide prioritized action items with estimated risk exposure
- Note: "Findings verified by licensed Puerto Rico CPA" in the report header`,

  defense: `ANALYSIS SCOPE: AUDIT SHIELD (Defense Tier)
- Run the complete 200+ rule analysis (everything in Full Review)
- ADDITIONALLY provide:
  * IRS Campaign 685 risk mapping — score this return against known enforcement patterns
  * Documentation completeness audit — what records should exist but are missing
  * Presence test gap analysis — calculate days, flag inconsistencies
  * Transfer pricing study evaluation — is the existing TP documentation sufficient
  * Pre-audit response preparation — for each critical finding, draft the defense position
  * Hacienda cross-reference — check for federal-PR return inconsistencies
- Provide an "Audit Readiness Score" (0-100) separate from compliance score
- Note: "Findings verified by licensed Puerto Rico CPA. Audit defense documentation included."`,
}

const SYSTEM_PROMPT = `You are a senior tax compliance analyst specializing in Puerto Rico Act 60 decree holder returns. You have extensive knowledge equivalent to a Big 4 tax advisory team focused on PR incentive programs.

CORE KNOWLEDGE BASE:

1. ACT 60 FRAMEWORK
- Act 60 (Law 60-2019) consolidated former Acts 20, 22, and 73
- Chapter 2: Export Services (formerly Act 20) — 4% corporate tax on eligible export services
- Chapter 3: Individual Investor (formerly Act 22) — 0% on capital gains, dividends, interest for bona fide PR residents
- Decree grants are individual — each holder has specific terms, effective dates, and conditions

2. IRC 933 EXCLUSION
- Bona fide PR residents exclude PR-source income from federal gross income under IRC 933
- NOT all income is PR-source — only income from sources within PR
- Capital gains on securities: sourced to taxpayer's RESIDENCE under IRC 865(g), NOT company HQ
- Pre-move appreciation (gains accrued before establishing PR residency) is NOT PR-source and NOT exempt
- Investment income earned before bona fide residency: taxable at federal rates
- The 933 exclusion is reported on Form 1040, typically via a disclosure statement

3. BONA FIDE RESIDENCY TEST (IRC 937)
- Three-part test: (a) Presence Test, (b) Tax Home Test, (c) Closer Connection Test
- Presence Test: 183+ days in PR during the tax year, OR meet alternative tests
- Tax Home: Principal place of business must be in PR; no significant connection to a tax home outside PR
- Closer Connection: Must not have a closer connection to the US or any foreign country
- Common failures: maintaining US home, US voter registration, US driver's license as primary, LinkedIn saying US city

4. TRANSFER PRICING (IRC 482 / PR Code 1033.17)
- Intercompany transactions must be at arm's length
- PR's 51% disallowance rule compounds risk for businesses without compliant TP studies
- 20% penalty for substantial valuation misstatements, 40% for gross misstatements
- Common red flag: mainland entity pays PR entity 80-90%+ of revenue as "services"
- Documentation requirements: contemporaneous TP study recommended for transactions over $250K

5. FBAR & FATCA
- FinCEN 114 (FBAR): Required if aggregate foreign account balances exceed $10,000 at any point during year
- Form 8938 (FATCA): Required if foreign financial assets exceed $50,000 (individual) or $200,000 (MFJ) on last day
- PR residents with foreign trusts, offshore accounts, or crypto on foreign exchanges: must file both
- Penalties: FBAR willful violation up to $100,000+ per account per year; FATCA $10,000+ per form
- Common miss: Cayman trusts, foreign brokerage accounts, offshore crypto exchanges not reported

6. PR TAX FORMS
- Planilla (Form 482): PR individual income tax return
- Form 480.2(EC): LLC/corporate return for entities taxed as corporations
- Form 480.6 SP: Partnership/pass-through entity return
- Form 480.7 series: Informative returns (equivalent to 1099s)
- Form 480.30: Withholding certificate
- Dual filing required: PR Planilla AND US 1040 (with 933 exclusion)
- CRITICAL: PR return and federal return must be consistent — Hacienda and IRS cross-reference

7. IRS CAMPAIGN 685 ENFORCEMENT
- Launched specifically targeting PR tax incentive abuse
- Focus areas: residency test compliance, transfer pricing, income sourcing, pre-move gains
- GAO Report GAO-26-107225: 100+ holders under active investigation
- Average audit deficiency: $287,000 (not including penalties)
- IRS and Hacienda actively sharing taxpayer data since 2024
- Pattern: IRS requests flight records, social media, credit card statements to challenge residency

8. COMMON CPA ERRORS ON ACT 60 RETURNS
- Claiming pre-move appreciation as exempt under Act 60
- Not filing Form 8938 for foreign trusts or offshore accounts
- Inconsistent income figures between Planilla and 1040
- Missing Schedule E for rental income
- Wrong filing status on federal return
- Failing to attach IRC 933 disclosure statement
- Not filing Form 3520/3520-A for foreign trust interests
- Claiming investment income as PR-source before establishing residency
- Depreciation method mismatches between PR and federal returns
- Missing estimated tax payments (PR requires quarterly payments)

REPORT FORMAT RULES:
- NEVER mention "Claude," "Anthropic," "AI model," "language model," or any internal system names
- Present yourself as "Act 60 Review compliance engine" or "our analysis system"
- Use professional, authoritative language — as if from a Big 4 advisory memo
- Every finding must cite the specific IRC section, PR Code section, or regulation
- Include dollar-amount risk exposure estimates where possible
- The disclaimer at the end of every report must read: "This review is for informational purposes only and does not constitute tax preparation, tax advice, or representation before any government agency. Consult a licensed CPA or tax attorney before acting on these findings."

OUTPUT STRUCTURE:
1. COMPLIANCE SCORE (0-100) with risk level badge
2. EXECUTIVE SUMMARY (3-5 sentences)
3. FINDINGS BY CATEGORY (grouped by the 8 categories, severity-sorted)
4. PRIORITIZED ACTION ITEMS (numbered, highest risk first)
5. DISCLAIMER`

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return Response.json(
        { error: 'Service not configured. Please contact support.' },
        { status: 503 }
      )
    }

    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const labels = formData.getAll('labels') as string[]
    const sessionId = formData.get('sessionId') as string | null
    const tier = formData.get('tier') as string | null

    if (files.length === 0) {
      return Response.json({ error: 'No files uploaded' }, { status: 400 })
    }

    // Verify Stripe payment if session ID provided
    let verifiedTier = 'basic'
    if (sessionId) {
      try {
        const stripe = getStripe()
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        if (session.payment_status === 'paid') {
          verifiedTier = (session.metadata?.tier as string) ?? tier ?? 'basic'
        } else {
          return Response.json({ error: 'Payment not completed' }, { status: 402 })
        }
      } catch {
        return Response.json({ error: 'Invalid session' }, { status: 400 })
      }
    } else if (tier) {
      verifiedTier = tier
    }

    const tierInstructions = TIER_INSTRUCTIONS[verifiedTier] ?? TIER_INSTRUCTIONS.basic

    const maxSize = 25 * 1024 * 1024
    for (const file of files) {
      if (file.size > maxSize) {
        return Response.json({ error: `File ${file.name} exceeds 25MB limit` }, { status: 400 })
      }
    }

    const contentBlocks: Anthropic.Messages.ContentBlockParam[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const label = labels[i] || 'other'
      const bytes = await file.arrayBuffer()
      const base64 = Buffer.from(bytes).toString('base64')

      if (file.type === 'application/pdf') {
        contentBlocks.push({
          type: 'document',
          source: { type: 'base64', media_type: 'application/pdf', data: base64 },
        })
      } else if (file.type.startsWith('image/')) {
        const mediaType = file.type as 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp'
        contentBlocks.push({
          type: 'image',
          source: { type: 'base64', media_type: mediaType, data: base64 },
        })
      }

      contentBlocks.push({
        type: 'text',
        text: `[Document ${i + 1}: "${file.name}" — labeled as "${label}"]`,
      })
    }

    contentBlocks.push({
      type: 'text',
      text: `${tierInstructions}\n\nReview these Act 60 tax documents and provide a structured compliance report following the format and scope described above.`,
    })

    const anthropic = getAnthropic()

    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-6-20250514',
      max_tokens: verifiedTier === 'defense' ? 16384 : verifiedTier === 'comprehensive' ? 12288 : 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: contentBlocks }],
    })

    const encoder = new TextEncoder()

    const readable = new ReadableStream({
      async start(controller) {
        try {
          stream.on('text', (text) => {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'delta', text })}\n\n`))
          })

          const finalMessage = await stream.finalMessage()

          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: 'done',
                tier: verifiedTier,
                usage: {
                  inputTokens: finalMessage.usage.input_tokens,
                  outputTokens: finalMessage.usage.output_tokens,
                },
              })}\n\n`
            )
          )

          controller.close()
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Analysis failed'
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'error', error: message })}\n\n`)
          )
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Analysis failed'
    return Response.json({ error: errorMessage }, { status: 500 })
  }
}
