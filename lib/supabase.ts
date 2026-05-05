import { createClient } from '@supabase/supabase-js'

// Sanitize: the env var sometimes carries a trailing /rest/v1/, but the JS
// client wants the bare project URL.
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '')
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const supabase = createClient(supabaseUrl, supabaseAnon)
