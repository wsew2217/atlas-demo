import 'server-only'

const DEFAULT_DEMO_KEY = 'atlas_demo_KuhlerExampleKey_2026'

export interface AuthResult {
  ok: boolean
  status: number
  error?: string
}

export function checkApiAuth(request: Request): AuthResult {
  const auth = request.headers.get('authorization') ?? ''
  if (!auth.toLowerCase().startsWith('bearer ')) {
    return {
      ok: false,
      status: 401,
      error: 'Missing or malformed Authorization header. Expected: "Authorization: Bearer <api_key>"',
    }
  }
  const token = auth.slice(7).trim()
  const expected = process.env.ATLAS_API_KEY ?? DEFAULT_DEMO_KEY
  if (token !== expected) {
    return { ok: false, status: 401, error: 'Invalid API key.' }
  }
  return { ok: true, status: 200 }
}

export function authError(result: AuthResult): Response {
  return Response.json(
    { error: result.error, code: 'unauthorized' },
    {
      status: result.status,
      headers: { 'WWW-Authenticate': 'Bearer realm="Atlas API"' },
    },
  )
}

export const DEMO_API_KEY = DEFAULT_DEMO_KEY
