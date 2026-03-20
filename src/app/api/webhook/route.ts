import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY not configured')
  return new Stripe(key, { apiVersion: '2026-02-25.clover' })
}

async function triggerEmailSequence(baseUrl: string, email: string, brandId: string, flowType: string) {
  try {
    await fetch(`${baseUrl}/api/email-sequence`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, brandId, flowType, currentStep: 1 }),
    })
  } catch {
    // Non-blocking
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  try {
    const stripe = getStripe()
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://act60review.com'

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const email = session.customer_email ?? session.customer_details?.email
        const brandId = session.metadata?.brandId ?? 'act60review'

        if (email) {
          // Trigger post-purchase email sequence
          await triggerEmailSequence(baseUrl, email, brandId, 'post_purchase')
        }

        // TODO: Create review record in Supabase
        // TODO: Grant upload access
        break
      }
      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        const email = session.customer_email ?? session.customer_details?.email
        const brandId = session.metadata?.brandId ?? 'act60review'

        if (email) {
          // Trigger abandoned checkout sequence
          await triggerEmailSequence(baseUrl, email, brandId, 'abandoned_checkout')
        }
        break
      }
      case 'payment_intent.payment_failed': {
        // TODO: Handle failed payment
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Webhook error'
    return NextResponse.json({ error: errorMessage }, { status: 400 })
  }
}
