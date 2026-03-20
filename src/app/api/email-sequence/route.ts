import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getDelayHours, getMaxSteps } from '@/lib/email-templates'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase not configured')
  return createClient(url, key)
}

export async function POST(request: NextRequest) {
  try {
    const { email, brandId, flowType, currentStep } = await request.json()

    if (!email || !brandId || !flowType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const step = currentStep ?? 1
    const maxSteps = getMaxSteps(flowType)
    if (step > maxSteps) {
      return NextResponse.json({ status: 'sequence_complete' })
    }

    const delayHours = getDelayHours(flowType, step)
    const nextSendAt = new Date(Date.now() + delayHours * 60 * 60 * 1000).toISOString()

    const supabase = getSupabase()

    // Upsert: don't create duplicate sequences for same email+brand+flow
    const { error } = await supabase
      .from('email_sequences')
      .upsert(
        {
          email,
          brand_id: brandId,
          flow_type: flowType,
          current_step: step,
          next_send_at: nextSendAt,
          status: 'active',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'email,brand_id,flow_type' }
      )

    if (error) {
      // Table may not exist yet - log but don't fail
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ status: 'queued', nextSendAt })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to queue'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
