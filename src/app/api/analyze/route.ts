import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const maxDuration = 120

function getAnthropic() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured')
  return new Anthropic({ apiKey })
}

const SYSTEM_PROMPT = `You are an expert Act 60 tax return reviewer for Puerto Rico decree holders. You have deep knowledge of:

- Puerto Rico Act 60 (formerly Act 20/22) compliance requirements
- IRC Section 933 exclusion rules for bona fide PR residents
- Transfer pricing regulations (IRC §482, PR Code §1033.17)
- FBAR (FinCEN 114) and FATCA (Form 8938) reporting requirements
- Bona fide residency tests (IRC §937, presence test, tax home, closer connection)
- Puerto Rico Planilla (Form 482) and related informative returns (480 series)
- Capital gains sourcing rules for pre-move vs post-move appreciation
- Decree term compliance and annual reporting requirements
- IRS Campaign 685 enforcement patterns for Act 60 holders

When reviewing a tax return, analyze it against 200+ compliance rules across these categories:
1. IRC 933 Exclusion Accuracy
2. Transfer Pricing Red Flags
3. FBAR & FATCA Compliance
4. Residency Test Documentation
5. Form Completeness
6. Income Sourcing
7. Capital Gains Treatment
8. Decree Term Compliance

For each finding, provide:
- Category and severity (INFO, WARNING, ERROR, CRITICAL)
- Clear description of the issue
- Specific recommendation to fix it
- Relevant IRC/PR Code reference

Output a structured compliance report with:
1. Overall compliance score (0-100)
2. Risk level (LOW, MEDIUM, HIGH, CRITICAL)
3. Executive summary
4. Detailed findings by category
5. Prioritized action items

IMPORTANT DISCLAIMERS TO INCLUDE IN EVERY REPORT:
- This review is for informational purposes only
- It does not constitute tax preparation or tax advice
- Users should consult with a licensed PR CPA or tax attorney
- AI analysis is based on data provided and may not capture all issues`

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

    if (files.length === 0) {
      return Response.json(
        { error: 'No files uploaded' },
        { status: 400 }
      )
    }

    const maxSize = 25 * 1024 * 1024
    for (const file of files) {
      if (file.size > maxSize) {
        return Response.json(
          { error: `File ${file.name} exceeds 25MB limit` },
          { status: 400 }
        )
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
          source: {
            type: 'base64',
            media_type: 'application/pdf',
            data: base64,
          },
        })
      } else if (file.type.startsWith('image/')) {
        const mediaType = file.type as 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp'
        contentBlocks.push({
          type: 'image',
          source: {
            type: 'base64',
            media_type: mediaType,
            data: base64,
          },
        })
      }

      contentBlocks.push({
        type: 'text',
        text: `[Document ${i + 1}: "${file.name}" — labeled as "${label}"]`,
      })
    }

    contentBlocks.push({
      type: 'text',
      text: 'Please review these Act 60 tax documents and provide a comprehensive compliance report following the structured format described in your instructions.',
    })

    const anthropic = getAnthropic()

    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: contentBlocks,
        },
      ],
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
    return Response.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
