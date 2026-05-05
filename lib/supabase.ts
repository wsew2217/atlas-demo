import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? ''
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const supabase = createClient(supabaseUrl, supabaseAnon)

export interface Project {
  id: string
  code: string
  name: string
  status: 'active' | 'paused' | 'complete'
  owner: string
  due: string
}

export interface Task {
  id: string
  project_id: string
  title: string
  state: 'todo' | 'in_progress' | 'done' | 'blocked'
  assignee: string
  updated_at: string
}
