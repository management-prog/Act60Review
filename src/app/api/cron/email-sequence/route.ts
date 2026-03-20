import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { getEmailTemplate, getMaxSteps, getDelayHours } from '@/lib/email-templates'
import { getBrandFromId } from '@/config/brands'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase not configured')
  return createClient(url, key)
}

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY not configured')
  return new Resend(key)
}

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = getSupabase()
    const resend = getResend()

    // Fetch sequences due for sending
    const { data: sequences, error: fetchError } = await supabase
      .from('email_sequences')
      .select('*')
      .eq('status', 'active')
      .lte('next_send_at', new Date().toISOString())
      .limit(50)

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    if (!sequences || sequences.length === 0) {
      return NextResponse.json({ processed: 0 })
    }

    let sent = 0
    let completed = 0
    let errors = 0

    for (const seq of sequences) {
      try {
        const template = getEmailTemplate(
          seq.brand_id,
          seq.flow_type,
          seq.current_step,
          seq.email
        )

        if (!template) {
          // Mark as completed if no template for this step
          await supabase
            .from('email_sequences')
            .update({ status: 'completed', updated_at: new Date().toISOString() })
            .eq('id', seq.id)
          completed++
          continue
        }

        const brand = getBrandFromId(seq.brand_id)
        const fromEmail = `${brand.name.replace(/\s+/g, '')} <noreply@${brand.domain}>`

        await resend.emails.send({
          from: fromEmail,
          to: seq.email,
          subject: template.subject,
          html: template.html,
        })

        sent++

        // Advance to next step or complete
        const nextStep = seq.current_step + 1
        const maxSteps = getMaxSteps(seq.flow_type)

        if (nextStep > maxSteps) {
          await supabase
            .from('email_sequences')
            .update({ status: 'completed', current_step: nextStep, updated_at: new Date().toISOString() })
            .eq('id', seq.id)
          completed++
        } else {
          const delayHours = getDelayHours(seq.flow_type, nextStep)
          const nextSendAt = new Date(Date.now() + delayHours * 60 * 60 * 1000).toISOString()

          await supabase
            .from('email_sequences')
            .update({
              current_step: nextStep,
              next_send_at: nextSendAt,
              updated_at: new Date().toISOString(),
            })
            .eq('id', seq.id)
        }
      } catch {
        errors++
        // Mark as failed after 3 retries
        const retries = (seq.metadata?.retries ?? 0) + 1
        if (retries >= 3) {
          await supabase
            .from('email_sequences')
            .update({ status: 'failed', updated_at: new Date().toISOString() })
            .eq('id', seq.id)
        } else {
          // Retry in 1 hour
          await supabase
            .from('email_sequences')
            .update({
              next_send_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
              metadata: { ...seq.metadata, retries },
              updated_at: new Date().toISOString(),
            })
            .eq('id', seq.id)
        }
      }
    }

    return NextResponse.json({ processed: sequences.length, sent, completed, errors })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Cron failed'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
