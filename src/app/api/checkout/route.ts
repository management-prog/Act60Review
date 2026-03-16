import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getBrandFromId } from '@/config/brands'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY not configured')
  return new Stripe(key)
}

export async function POST(request: NextRequest) {
  try {
    const { tier, email } = await request.json()
    const brandId = request.headers.get('x-brand-id') ?? 'act60review'
    const brand = getBrandFromId(brandId)

    if (!tier || !['basic', 'comprehensive', 'defense'].includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier selected' },
        { status: 400 }
      )
    }

    const selectedTier = brand.tiers.find((t) => t.id === tier)
    if (!selectedTier) {
      return NextResponse.json(
        { error: 'Invalid pricing configuration' },
        { status: 500 }
      )
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? `https://${brand.domain}`

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${brand.name} \u2014 ${selectedTier.name}`,
              description: selectedTier.description,
            },
            unit_amount: selectedTier.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${appUrl}/upload?session_id={CHECKOUT_SESSION_ID}&tier=${tier}`,
      cancel_url: `${appUrl}/#pricing`,
      customer_email: email || undefined,
      metadata: {
        brandId: brand.id,
        tier,
        tierName: selectedTier.name,
        price: String(selectedTier.price),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Checkout failed'
    console.error('Checkout error:', errorMessage)
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
