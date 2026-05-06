import { NextRequest } from 'next/server'
import { listBrands } from '@/lib/demo-db'
import { checkApiAuth, authError } from '@/lib/api/auth'

export async function GET(request: NextRequest) {
  const auth = checkApiAuth(request)
  if (!auth.ok) return authError(auth)

  const brands = await listBrands()
  return Response.json({
    data: brands.map((b) => ({
      slug: b.slug,
      name: b.name,
      primary_color: b.primary,
      contact: b.contact,
      contact_email: b.contactEmail,
      portal_url: `https://demo.kuhler.com/portal/${b.slug}`,
    })),
    meta: { count: brands.length },
  })
}
