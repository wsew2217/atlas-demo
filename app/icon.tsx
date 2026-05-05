import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1A1A1A',
          color: '#FAF7F2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          fontSize: 44,
          fontStyle: 'italic',
          fontWeight: 600,
          letterSpacing: '-0.04em',
        }}
      >
        K
      </div>
    ),
    { ...size },
  )
}
