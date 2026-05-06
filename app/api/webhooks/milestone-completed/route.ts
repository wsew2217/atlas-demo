import { NextRequest } from 'next/server'
import { checkApiAuth, authError } from '@/lib/api/auth'

interface MilestonePayload {
  batch_id?: string
  milestone_id?: string
  completed_at?: string
  completed_by?: string
}

export async function POST(request: NextRequest) {
  const auth = checkApiAuth(request)
  if (!auth.ok) return authError(auth)

  let body: MilestonePayload
  try {
    body = (await request.json()) as MilestonePayload
  } catch {
    return Response.json(
      { error: 'Invalid JSON body', code: 'invalid_request' },
      { status: 400 },
    )
  }

  const errors: string[] = []
  if (!body.batch_id) errors.push('batch_id is required')
  if (!body.milestone_id) errors.push('milestone_id is required')
  if (errors.length > 0) {
    return Response.json(
      { error: 'Validation failed', code: 'invalid_request', details: errors },
      { status: 422 },
    )
  }

  return Response.json({
    data: {
      received: true,
      batch_id: body.batch_id,
      milestone_id: body.milestone_id,
      completed_at: body.completed_at ?? new Date().toISOString(),
      completed_by: body.completed_by ?? 'unknown',
    },
    demo_note:
      'Webhook accepted. In production this would advance the milestone, post system messages to the conversation, and notify subscribed integrations downstream.',
  })
}
