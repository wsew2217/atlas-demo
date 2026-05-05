import { ClerkProvider } from '@clerk/nextjs'

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
  description: 'Atlas demo app — dummy data, Fraunces + IBM Plex stack.',
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider appearance={clerkAppearance}>{children}</ClerkProvider>
}
