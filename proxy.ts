import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { resolveSurface } from '@/lib/surface'

export default clerkMiddleware(async (auth, request) => {
  const host = request.nextUrl.host
  const hostName = host.split(':')[0].toLowerCase()
  const isLocalhost = hostName === 'localhost' || hostName === '127.0.0.1'

  const hostSurface = resolveSurface(host)
  if (!hostSurface) {
    return new NextResponse(`Unknown host: ${host}`, { status: 404 })
  }

  const { pathname } = request.nextUrl
  const explicitSurface =
    pathname === '/marketing' || pathname.startsWith('/marketing/') ? 'marketing' :
    pathname === '/demo' || pathname.startsWith('/demo/') ? 'demo' :
    null

  if (explicitSurface && explicitSurface !== hostSurface && !isLocalhost) {
    return new NextResponse('Not found', { status: 404 })
  }

  const surface = explicitSurface ?? hostSurface

  // Demo surface is fully public during the showcase phase — fake data,
  // nothing to protect. Clerk infrastructure stays wired in app/demo/layout.tsx
  // so we can gate routes again later by re-introducing auth.protect() here.
  void auth

  if (explicitSurface) return NextResponse.next()

  const target = pathname === '/' ? `/${surface}` : `/${surface}${pathname}`
  return NextResponse.rewrite(new URL(target, request.url))
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
