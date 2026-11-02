interface LogoProps {
  size?: number
  variant?: 'default' | 'mark'
}

export function Logo({ size = 32, variant = 'default' }: LogoProps) {
  if (variant === 'mark') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M4 14V4H14" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <path d="M34 4H44V14" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <path d="M4 34V44H14" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <path d="M34 44H44V34" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <path
          d="M15 11L24 37L33 11"
          stroke="var(--moon)"
          strokeWidth="1.75"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <circle cx="24" cy="17" r="5.5" fill="var(--moon)" />
        <path
          d="M19 37C21.5 31 26.5 31 29 37"
          fill="var(--bg)"
          opacity="0.92"
        />
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M3 13V3H13" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M35 3H45V13" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M3 35V45H13" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M35 45H45V35" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path
        d="M14 10L24 36L34 10"
        stroke="var(--moon)"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <circle cx="24" cy="16" r="5" fill="var(--moon)" />
      <path d="M18 36C20.5 30 27.5 30 30 36" fill="var(--bg)" opacity="0.9" />
    </svg>
  )
}
