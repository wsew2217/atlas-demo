export type Surface = 'marketing' | 'demo'

export function resolveSurface(host: string | null | undefined): Surface | null {
  if (!host) return null
  const h = host.toLowerCase().split(':')[0]

  if (h === 'kuhler.com' || h === 'www.kuhler.com') return 'marketing'
  if (h === 'demo.kuhler.com') return 'demo'

  if (h === 'localhost' || h === '127.0.0.1') return 'demo'
  if (h.endsWith('.vercel.app')) return 'demo'

  return null
}
