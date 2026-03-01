// Premium custom SVG icons for TechAgent
// Each icon uses gradients and modern design language

interface IconProps {
  size?: number
  className?: string
}

// ===== FEATURE ICONS =====

export function IconPercent({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
      <defs>
        <linearGradient id="gPercent" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#3D8BFF" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="24" height="24" rx="6" fill="url(#gPercent)" fillOpacity="0.1" />
      <circle cx="10.5" cy="10.5" r="2.5" stroke="url(#gPercent)" strokeWidth="1.8" fill="none" />
      <circle cx="17.5" cy="17.5" r="2.5" stroke="url(#gPercent)" strokeWidth="1.8" fill="none" />
      <line x1="18" y1="10" x2="10" y2="18" stroke="url(#gPercent)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconBolt({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
      <defs>
        <linearGradient id="gBolt" x1="10" y1="2" x2="18" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="24" height="24" rx="6" fill="#10B981" fillOpacity="0.1" />
      <path d="M15.5 4L8 15h5l-1.5 9L20 13h-5.5L15.5 4z" fill="url(#gBolt)" />
    </svg>
  )
}

export function IconShieldCheck({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
      <defs>
        <linearGradient id="gShield" x1="6" y1="3" x2="22" y2="25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="24" height="24" rx="6" fill="#F59E0B" fillOpacity="0.1" />
      <path d="M14 5L7 8.5V13.5C7 18.2 9.9 22.5 14 24C18.1 22.5 21 18.2 21 13.5V8.5L14 5Z" stroke="url(#gShield)" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <path d="M10.5 14L13 16.5L17.5 12" stroke="url(#gShield)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

// ===== STEP ICONS =====

export function IconUserPlus({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
      <defs>
        <linearGradient id="gUser" x1="4" y1="4" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="10" r="4" stroke="url(#gUser)" strokeWidth="1.8" fill="none" />
      <path d="M5 22C5 18.134 8.134 15 12 15C13.5 15 14.9 15.5 16 16.3" stroke="url(#gUser)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <line x1="21" y1="16" x2="21" y2="22" stroke="url(#gUser)" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="18" y1="19" x2="24" y2="19" stroke="url(#gUser)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconClipboardEdit({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
      <defs>
        <linearGradient id="gClip" x1="4" y1="2" x2="24" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <rect x="6" y="5" width="16" height="19" rx="3" stroke="url(#gClip)" strokeWidth="1.6" fill="none" />
      <path d="M11 3H17C17 3 17.5 3 17.5 3.5V5.5C17.5 6 17 6 17 6H11C11 6 10.5 6 10.5 5.5V3.5C10.5 3 11 3 11 3Z" stroke="url(#gClip)" strokeWidth="1.4" fill="none" />
      <line x1="10" y1="12" x2="18" y2="12" stroke="url(#gClip)" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="10" y1="15.5" x2="16" y2="15.5" stroke="url(#gClip)" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="10" y1="19" x2="14" y2="19" stroke="url(#gClip)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function IconCreditCard({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
      <defs>
        <linearGradient id="gCard" x1="3" y1="6" x2="25" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <rect x="3" y="6" width="22" height="16" rx="3" stroke="url(#gCard)" strokeWidth="1.6" fill="none" />
      <line x1="3" y1="11" x2="25" y2="11" stroke="url(#gCard)" strokeWidth="1.6" />
      <rect x="6" y="15" width="6" height="3" rx="1" fill="url(#gCard)" fillOpacity="0.3" />
      <line x1="16" y1="16.5" x2="22" y2="16.5" stroke="url(#gCard)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function IconPackageCheck({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
      <defs>
        <linearGradient id="gPkg" x1="3" y1="3" x2="25" y2="25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <path d="M14 3L24 8V20L14 25L4 20V8L14 3Z" stroke="url(#gPkg)" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <line x1="14" y1="13" x2="14" y2="25" stroke="url(#gPkg)" strokeWidth="1.4" />
      <line x1="4" y1="8" x2="14" y2="13" stroke="url(#gPkg)" strokeWidth="1.4" />
      <line x1="24" y1="8" x2="14" y2="13" stroke="url(#gPkg)" strokeWidth="1.4" />
      <circle cx="21" cy="21" r="5" fill="#10B981" />
      <path d="M19 21L20.5 22.5L23.5 19.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

// ===== PROMO LIST ICONS =====

export function IconCoins({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gCoins" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <ellipse cx="9" cy="9" rx="7" ry="4" stroke="url(#gCoins)" strokeWidth="1.5" fill="none" />
      <path d="M2 9V14C2 16.2 5.1 18 9 18" stroke="url(#gCoins)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="15" cy="14" rx="7" ry="4" stroke="url(#gCoins)" strokeWidth="1.5" fill="none" />
      <path d="M8 14V19C8 21.2 11.1 23 15 23C18.9 23 22 21.2 22 19V14" stroke="url(#gCoins)" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

export function IconBox({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gBox" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <path d="M3 8L12 3L21 8V16L12 21L3 16V8Z" stroke="url(#gBox)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M12 12L3 8" stroke="url(#gBox)" strokeWidth="1.3" />
      <path d="M12 12L21 8" stroke="url(#gBox)" strokeWidth="1.3" />
      <path d="M12 12V21" stroke="url(#gBox)" strokeWidth="1.3" />
    </svg>
  )
}

export function IconSmartphone({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gPhone" x1="6" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <rect x="6" y="2" width="12" height="20" rx="3" stroke="url(#gPhone)" strokeWidth="1.5" fill="none" />
      <line x1="10" y1="18" x2="14" y2="18" stroke="url(#gPhone)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="5" x2="14" y2="5" stroke="url(#gPhone)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

export function IconFileCheck({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gFile" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="url(#gFile)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M14 2V8H20" stroke="url(#gFile)" strokeWidth="1.5" fill="none" />
      <path d="M9 15L11 17L15 13" stroke="url(#gFile)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export function IconTruck({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gTruck" x1="1" y1="4" x2="23" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <rect x="1" y="5" width="14" height="11" rx="1.5" stroke="url(#gTruck)" strokeWidth="1.5" fill="none" />
      <path d="M15 9H19.5L22 12V16H15V9Z" stroke="url(#gTruck)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="2" stroke="url(#gTruck)" strokeWidth="1.5" fill="none" />
      <circle cx="19" cy="18" r="2" stroke="url(#gTruck)" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

export function IconDiamond({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gDiam" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <path d="M6 3H18L22 9L12 22L2 9L6 3Z" stroke="url(#gDiam)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M2 9H22" stroke="url(#gDiam)" strokeWidth="1.3" />
      <path d="M12 22L9 9L6 3" stroke="url(#gDiam)" strokeWidth="1.1" opacity="0.5" />
      <path d="M12 22L15 9L18 3" stroke="url(#gDiam)" strokeWidth="1.1" opacity="0.5" />
    </svg>
  )
}

export function IconUnlock({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gUnlock" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <rect x="4" y="11" width="16" height="11" rx="2.5" stroke="url(#gUnlock)" strokeWidth="1.5" fill="none" />
      <path d="M8 11V7C8 4.8 9.8 3 12 3C13.9 3 15.5 4.3 15.9 6" stroke="url(#gUnlock)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="16" r="1.5" fill="url(#gUnlock)" />
    </svg>
  )
}

export function IconGlobe({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gGlobe" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" stroke="url(#gGlobe)" strokeWidth="1.5" fill="none" />
      <ellipse cx="12" cy="12" rx="4.5" ry="10" stroke="url(#gGlobe)" strokeWidth="1.2" fill="none" />
      <line x1="2" y1="12" x2="22" y2="12" stroke="url(#gGlobe)" strokeWidth="1.2" />
      <path d="M4 7H20" stroke="url(#gGlobe)" strokeWidth="0.8" opacity="0.5" />
      <path d="M4 17H20" stroke="url(#gGlobe)" strokeWidth="0.8" opacity="0.5" />
    </svg>
  )
}

export function IconZap({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gZap" x1="8" y1="1" x2="16" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <path d="M13 2L4.5 13H12L11 22L19.5 11H12L13 2Z" fill="url(#gZap)" />
    </svg>
  )
}

export function IconUser({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gUsr" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="8" r="4.5" stroke="url(#gUsr)" strokeWidth="1.5" fill="none" />
      <path d="M4 21C4 17.1 7.6 14 12 14C16.4 14 20 17.1 20 21" stroke="url(#gUsr)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// ===== CATEGORY ICONS =====

export function IconApple({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gApple" x1="1" y1="1" x2="19" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <path d="M18.7 12.4C18.7 9.6 16.6 8.2 16.5 8.1C15.2 6.2 13.2 6 12.5 6C10.9 6 9.7 7 8.9 7C8 7 7 6 5.7 6.1C3.9 6.1 2.3 7.2 1.4 8.8C-0.5 12.1 0.9 17 2.7 19.7C3.6 21 4.7 22.5 6.1 22.5C7.4 22.4 7.9 21.6 9.5 21.6C11.1 21.6 11.6 22.5 13 22.4C14.4 22.4 15.4 21.1 16.3 19.7C17.3 18.2 17.7 16.7 17.7 16.6C17.7 16.6 18.7 14.8 18.7 12.4Z" fill="url(#gApple)" fillOpacity="0.15" />
      <path d="M14.4 4.5C15.1 3.6 15.6 2.4 15.5 1.2C14.4 1.3 13.1 1.9 12.4 2.8C11.7 3.7 11.1 4.9 11.3 6C12.4 6.1 13.6 5.4 14.4 4.5Z" fill="url(#gApple)" fillOpacity="0.15" />
      <path d="M18.7 12.4C18.7 9.6 16.6 8.2 16.5 8.1C15.2 6.2 13.2 6 12.5 6C10.9 6 9.7 7 8.9 7C8 7 7 6 5.7 6.1C3.9 6.1 2.3 7.2 1.4 8.8C-0.5 12.1 0.9 17 2.7 19.7C3.6 21 4.7 22.5 6.1 22.5C7.4 22.4 7.9 21.6 9.5 21.6C11.1 21.6 11.6 22.5 13 22.4C14.4 22.4 15.4 21.1 16.3 19.7C17.3 18.2 17.7 16.7 17.7 16.6C17.7 16.6 18.7 14.8 18.7 12.4Z" stroke="url(#gApple)" strokeWidth="1.2" fill="none" />
    </svg>
  )
}

export function IconLaptop({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gLap" x1="1" y1="4" x2="23" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="url(#gLap)" strokeWidth="1.5" fill="none" />
      <path d="M1 18H23" stroke="url(#gLap)" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="8" y="7" width="8" height="5" rx="0.5" fill="url(#gLap)" fillOpacity="0.1" />
    </svg>
  )
}

export function IconHeadphones({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gHead" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <path d="M3 14V12C3 7 7 3 12 3C17 3 21 7 21 12V14" stroke="url(#gHead)" strokeWidth="1.5" fill="none" />
      <rect x="3" y="14" width="4" height="6" rx="2" stroke="url(#gHead)" strokeWidth="1.5" fill="none" />
      <rect x="17" y="14" width="4" height="6" rx="2" stroke="url(#gHead)" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

export function IconWatch({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gWatch" x1="6" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="12" height="12" rx="4" stroke="url(#gWatch)" strokeWidth="1.5" fill="none" />
      <path d="M9 2H15V6H9V2Z" stroke="url(#gWatch)" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      <path d="M9 18H15V22H9V18Z" stroke="url(#gWatch)" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      <path d="M12 9V12L14 14" stroke="url(#gWatch)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export function IconGamepad({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gGame" x1="2" y1="6" x2="22" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <path d="M6 11H2V13H6V17H8V13H12V11H8V7H6V11Z" stroke="url(#gGame)" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      <circle cx="17" cy="9" r="1.5" fill="url(#gGame)" />
      <circle cx="20" cy="12" r="1.5" fill="url(#gGame)" />
      <circle cx="17" cy="15" r="1.5" fill="url(#gGame)" />
      <circle cx="14" cy="12" r="1.5" fill="url(#gGame)" />
    </svg>
  )
}

export function IconCamera({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gCam" x1="2" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <path d="M23 7L16 12L23 17V7Z" stroke="url(#gCam)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <rect x="1" y="5" width="15" height="14" rx="3" stroke="url(#gCam)" strokeWidth="1.5" fill="none" />
      <circle cx="8.5" cy="12" r="3" stroke="url(#gCam)" strokeWidth="1.2" fill="none" />
    </svg>
  )
}

export function IconPlug({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gPlug" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0061FF" />
          <stop offset="1" stopColor="#4D9AFF" />
        </linearGradient>
      </defs>
      <line x1="12" y1="22" x2="12" y2="16" stroke="url(#gPlug)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 16H17" stroke="url(#gPlug)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 12V16" stroke="url(#gPlug)" strokeWidth="1.5" />
      <path d="M17 12V16" stroke="url(#gPlug)" strokeWidth="1.5" />
      <path d="M7 12H17" stroke="url(#gPlug)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="12" x2="9" y2="8" stroke="url(#gPlug)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="12" x2="15" y2="8" stroke="url(#gPlug)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
