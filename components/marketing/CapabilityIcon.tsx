interface CapabilityIconProps {
  variant: 'intake' | 'batches' | 'portals'
  className?: string
}

export function CapabilityIcon({ variant, className }: CapabilityIconProps) {
  const stroke = 'currentColor'
  const baseProps = {
    width: 32,
    height: 32,
    viewBox: '0 0 32 32',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className,
    'aria-hidden': true,
  } as const

  if (variant === 'intake') {
    return (
      <svg {...baseProps}>
        <path
          d="M9 4 H19 L23 8 V26 a2 2 0 0 1-2 2 H11 a2 2 0 0 1-2-2 V6 a2 2 0 0 1 2-2 z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M19 4 V8 H23" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="13" y1="14" x2="21" y2="14" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="13" y1="18" x2="21" y2="18" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="13" y1="22" x2="18" y2="22" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }

  if (variant === 'batches') {
    return (
      <svg {...baseProps}>
        <rect x="5" y="5" width="22" height="6" rx="1" stroke={stroke} strokeWidth="1.5" />
        <rect x="5" y="13" width="22" height="6" rx="1" stroke={stroke} strokeWidth="1.5" />
        <rect x="5" y="21" width="22" height="6" rx="1" stroke={stroke} strokeWidth="1.5" />
        <circle cx="9" cy="8" r="1.4" fill={stroke} />
        <circle cx="9" cy="16" r="1.4" fill={stroke} />
        <circle cx="9" cy="24" r="1.4" stroke={stroke} strokeWidth="1.5" />
      </svg>
    )
  }

  // portals
  return (
    <svg {...baseProps}>
      <rect x="3" y="6" width="26" height="20" rx="2" stroke={stroke} strokeWidth="1.5" />
      <line x1="3" y1="11" x2="29" y2="11" stroke={stroke} strokeWidth="1.5" />
      <circle cx="6" cy="8.5" r="0.7" fill={stroke} />
      <circle cx="8.5" cy="8.5" r="0.7" fill={stroke} />
      <circle cx="11" cy="8.5" r="0.7" fill={stroke} />
      <line x1="8" y1="17" x2="16" y2="17" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="21" x2="20" y2="21" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="22" y="15" width="3" height="3" stroke={stroke} strokeWidth="1.5" rx="0.5" />
    </svg>
  )
}
