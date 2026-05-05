import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Customers · Built with the people running production'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#FAF7F2',
          padding: '80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: '#5C5C5C',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
          }}
        >
          Kuhler · Customers
        </div>
        <div
          style={{
            fontSize: 80,
            lineHeight: 1.04,
            color: '#1A1A1A',
            fontWeight: 600,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>Built with the people</span>
          <span>
            <em style={{ color: '#B8763D' }}>running production.</em>
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 24,
            color: '#5C5C5C',
            fontFamily: 'monospace',
          }}
        >
          <span>kuhler.com/customers</span>
          <span>Apparel manufacturers · brokers · operators</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
