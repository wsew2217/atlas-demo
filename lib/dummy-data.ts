import type { Project, Task } from './supabase'

export const projects: Project[] = [
  { id: 'p-001', code: 'ATL-01', name: 'Northwind Onboarding', status: 'active',   owner: 'Avery Chen',   due: '2026-06-12' },
  { id: 'p-002', code: 'ATL-02', name: 'Harbor Migration',     status: 'active',   owner: 'Jordan Pike',  due: '2026-05-29' },
  { id: 'p-003', code: 'ATL-03', name: 'Beacon Rollout',       status: 'paused',   owner: 'Sam Iverson',  due: '2026-07-04' },
  { id: 'p-004', code: 'ATL-04', name: 'Foxglove Pilot',       status: 'active',   owner: 'Mira Patel',   due: '2026-05-18' },
  { id: 'p-005', code: 'ATL-05', name: 'Polaris Audit',        status: 'complete', owner: 'Theo Marsh',   due: '2026-04-20' },
]

export const tasks: Task[] = [
  { id: 't-001', project_id: 'p-001', title: 'Kickoff call notes',          state: 'done',         assignee: 'Avery Chen',  updated_at: '2026-05-04T15:12:00Z' },
  { id: 't-002', project_id: 'p-001', title: 'Schema review',               state: 'in_progress',  assignee: 'Sam Iverson', updated_at: '2026-05-05T09:42:00Z' },
  { id: 't-003', project_id: 'p-002', title: 'Cutover dry run',             state: 'todo',         assignee: 'Jordan Pike', updated_at: '2026-05-03T18:00:00Z' },
  { id: 't-004', project_id: 'p-002', title: 'Rollback plan sign-off',      state: 'blocked',      assignee: 'Mira Patel',  updated_at: '2026-05-02T11:25:00Z' },
  { id: 't-005', project_id: 'p-004', title: 'Field trial scoping',         state: 'in_progress',  assignee: 'Mira Patel',  updated_at: '2026-05-05T08:10:00Z' },
  { id: 't-006', project_id: 'p-005', title: 'Final report archived',       state: 'done',         assignee: 'Theo Marsh',  updated_at: '2026-04-21T16:00:00Z' },
]
