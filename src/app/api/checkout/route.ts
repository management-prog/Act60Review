import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getBrandConfig } from '@/config/brands'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY not configured')
  return new Stripe(key, { apiVersion: '2026-02-25.clover' })
}

const tierPrices: Record<string, Record<string, number>> = {
  act60review: {
    basic: 29900,
    comprehensive: 99900,
    defense: 149900,
  },
  decreecheck: {
    basic: 29900,
    comprehensive: 29900,
    defense: 29900,
  },
  act60shield: {
    basic: 99900,
    comprehensive: 149900,
    defense: 149900,
  },
}

export async function POST(request: NextRequest) {
  try {
    const { tier, email } = await request.json()
    const brand = getBrandConfig()

    if (!tier || !['basic', 'comprehensive', 'defense'].includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier selected' },
        { status: 400 }
      )
    }

    const amount = tierPrices[brand.id]?.[tier]
    if (!amount) {
      return NextResponse.json(
        { error: 'Invalid pricing configuration' },
        { status: 500 }
      )
    }

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${brand.name} — ${tier.charAt(0).toUpperCase() + tier.slice(1)} Review`,
              description: `AI-powered Act 60 tax return review (${tier} tier)`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/upload?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/#pricing`,
      customer_email: email || undefined,
      metadata: {
        brandId: brand.id,
        tier,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Checkout failed'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
