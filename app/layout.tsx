import type { Metadata } from 'next'
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kuhler.com'),
  title: {
    default: 'Kuhler — Operational software for apparel manufacturers',
    template: '%s · Kuhler',
  },
  description:
    'Atlas is the operational engine inside Kuhler — POs, batches, factories, and branded customer portals on one platform.',
  openGraph: {
    type: 'website',
    siteName: 'Kuhler',
    title: 'Kuhler — Operational software for apparel manufacturers',
    description:
      'Atlas is the operational engine inside Kuhler — POs, batches, factories, and branded customer portals on one platform.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kuhler — Operational software for apparel manufacturers',
    description:
      'Atlas is the operational engine inside Kuhler — POs, batches, factories, and branded customer portals on one platform.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
