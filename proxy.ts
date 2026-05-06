import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { resolveSurface } from '@/lib/surface'

export default clerkMiddleware(async (auth, request) => {
  const host = request.nextUrl.host
  const hostName = host.split(':')[0].toLowerCase()
  const isLocalhost = hostName === 'localhost' || hostName === '127.0.0.1'

  const { pathname } = request.nextUrl

  // API routes are surface-agnostic — accessible from every host without rewriting.
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const hostSurface = resolveSurface(host)
  if (!hostSurface) {
    return new NextResponse(`Unknown host: ${host}`, { status: 404 })
  }
  const explicitSurface =
    pathname === '/marketing' || pathname.startsWith('/marketing/') ? 'marketing' :
    pathname === '/demo' || pathname.startsWith('/demo/') ? 'demo' :
    null
  void hostSurface

  if (explicitSurface && explicitSurface !== hostSurface && !isLocalhost) {
    return new NextResponse('Not found', { status: 404 })
  }

  const surface = explicitSurface ?? hostSurface

  // Demo light surface is fully public — fake data, nothing to protect.
  // Clerk infrastructure stays wired in app/demo/layout.tsx so we can gate
  // routes again later by re-introducing auth.protect() here.
  void auth

  // Gate /demo/full/* behind a simple cookie-based password.
  if (surface === 'demo') {
    const isFullDemo =
      pathname === '/full' || pathname.startsWith('/full/') ||
      pathname === '/demo/full' || pathname.startsWith('/demo/full/')

    const isFullDemoSignIn =
      pathname === '/full/sign-in' || pathname.startsWith('/full/sign-in/') ||
      pathname === '/demo/full/sign-in' || pathname.startsWith('/demo/full/sign-in/')

    if (isFullDemo && !isFullDemoSignIn) {
      const authed = request.cookies.get('demo-full-auth')?.value === '1'
      if (!authed) {
        return NextResponse.redirect(new URL('/demo/full/sign-in', request.url))
      }
    }
  }

  if (explicitSurface) return NextResponse.next()

  const target = pathname === '/' ? `/${surface}` : `/${surface}${pathname}`
  return NextResponse.rewrite(new URL(target, request.url))
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|webmanifest|xml|txt)).*)',
    '/(api|trpc)(.*)',
  ],
}
