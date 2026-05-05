import { ClerkProvider } from '@clerk/nextjs'
import { DemoBar } from '@/components/demo/DemoBar'

const clerkAppearance = {
  variables: {
    colorPrimary: '#B8763D',
    colorBackground: '#FAF7F2',
    colorText: '#1A1A1A',
    colorTextSecondary: '#5C5C5C',
    colorInputBackground: '#FFFFFF',
    colorInputText: '#1A1A1A',
    borderRadius: '6px',
    fontFamily: 'var(--font-ibm-plex-sans), system-ui, sans-serif',
  },
}

export const metadata = {
  title: 'Atlas Demo',
  description: 'Atlas — operational software for apparel manufacturers. Demo with fake data.',
  robots: { index: false, follow: false },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <div className="flex min-h-screen flex-col">
        <DemoBar />
        {children}
      </div>
    </ClerkProvider>
  )
}
