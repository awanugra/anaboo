import { cn } from '../lib/utils'

// Flat single-color solid icons (Streamline Flex Solid style, monotone)
// Color is controlled by `tone` or by `currentColor` via parent text color.

const ICONS = {
  home: (
    <path d="M12 2.1a1.5 1.5 0 00-.95.34l-9 7.4A1.5 1.5 0 003 11v9.5A1.5 1.5 0 004.5 22H9a1 1 0 001-1v-5h4v5a1 1 0 001 1h4.5a1.5 1.5 0 001.5-1.5V11a1.5 1.5 0 00-.55-1.16l-9-7.4A1.5 1.5 0 0012 2.1z"/>
  ),
  book: (
    <>
      <path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h6V3H5z"/>
      <path d="M19 3h-6v18h6a2 2 0 002-2V5a2 2 0 00-2-2z"/>
    </>
  ),
  hospital: (
    <path d="M9 2a2 2 0 00-2 2v2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-2V4a2 2 0 00-2-2H9zm0 2h6v3H9V4zm2 7h2v3h3v2h-3v3h-2v-3H8v-2h3v-3z"/>
  ),
  bell: (
    <path d="M12 2a7 7 0 00-7 7v4.6L3.3 17a1 1 0 00.9 1.4h15.6a1 1 0 00.9-1.4L19 13.6V9a7 7 0 00-7-7zm-2.5 18a2.5 2.5 0 005 0h-5z"/>
  ),
  paw: (
    <>
      <ellipse cx="6" cy="9" rx="2" ry="2.5"/>
      <ellipse cx="18" cy="9" rx="2" ry="2.5"/>
      <ellipse cx="9" cy="5" rx="1.8" ry="2.3"/>
      <ellipse cx="15" cy="5" rx="1.8" ry="2.3"/>
      <path d="M12 11c-3 0-6 3-6 6.5 0 2 1.5 3 3.5 3 1 0 1.7-.5 2.5-.5s1.5.5 2.5.5c2 0 3.5-1 3.5-3 0-3.5-3-6.5-6-6.5z"/>
    </>
  ),
  back: (
    <path d="M14.7 5.3a1 1 0 010 1.4L9.4 12l5.3 5.3a1 1 0 11-1.4 1.4l-6-6a1 1 0 010-1.4l6-6a1 1 0 011.4 0z"/>
  ),
  shield: (
    <path d="M12 2.5a1 1 0 00-.36.07l-7 2.6A1 1 0 004 6.1V12c0 5.3 3.5 9.1 7.7 10.5a1 1 0 00.6 0C16.5 21.1 20 17.3 20 12V6.1a1 1 0 00-.64-.93l-7-2.6A1 1 0 0012 2.5zm-1.5 11l-2.5-2.5L9.4 9.6 10.5 10.7l3.6-3.6 1.4 1.4-5 5z"/>
  ),
  pill: (
    <path d="M16.5 3a4.5 4.5 0 013.18 7.68l-9 9a4.5 4.5 0 01-6.36-6.36l9-9A4.5 4.5 0 0116.5 3zm-2.5 5l-6 6 4.36 4.36 6-6L14 8z"/>
  ),
  'health-care': (
    <path d="M12 21.4c-.3 0-.6-.1-.8-.3C7.4 18 3 14.4 3 9.5A5.5 5.5 0 018.5 4 5.4 5.4 0 0112 5.7 5.4 5.4 0 0115.5 4 5.5 5.5 0 0121 9.5c0 4.9-4.4 8.5-8.2 11.6a1.4 1.4 0 01-.8.3zM11 9v2H9v2h2v2h2v-2h2v-2h-2V9h-2z"/>
  ),
  heart: (
    <path d="M12 21.4c-.3 0-.6-.1-.8-.3C7.4 18 3 14.4 3 9.5A5.5 5.5 0 018.5 4 5.4 5.4 0 0112 5.7 5.4 5.4 0 0115.5 4 5.5 5.5 0 0121 9.5c0 4.9-4.4 8.5-8.2 11.6a1.4 1.4 0 01-.8.3z"/>
  ),
  star: (
    <path d="M12 2.5a1 1 0 01.9.55l2.65 5.4 5.96.86a1 1 0 01.55 1.7l-4.3 4.2 1 5.94a1 1 0 01-1.45 1.06L12 19.46l-5.32 2.8a1 1 0 01-1.45-1.06l1-5.94-4.3-4.2a1 1 0 01.55-1.7l5.96-.86 2.66-5.4A1 1 0 0112 2.5z"/>
  ),
  'check-square': (
    <path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm5 13.4l-3.7-3.7 1.4-1.4 2.3 2.3 5.3-5.3 1.4 1.4-6.7 6.7z"/>
  ),
  info: (
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 5a1 1 0 112 0 1 1 0 01-2 0zm0 3h2v8h-2v-8z"/>
  ),
  calendar: (
    <path d="M7 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm-3 8v9h16v-9H4zm3 2h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/>
  ),
  add: (
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 5h2v4h4v2h-4v4h-2v-4H7v-2h4V7z"/>
  ),
  hourglass: (
    <path d="M6 2a1 1 0 100 2h.5v3.05a4 4 0 001.78 3.32L11.2 12l-2.92 1.63A4 4 0 006.5 16.95V20H6a1 1 0 100 2h12a1 1 0 100-2h-.5v-3.05a4 4 0 00-1.78-3.32L12.8 12l2.92-1.63A4 4 0 0017.5 7.05V4H18a1 1 0 100-2H6zm2.5 2h7v3.05a2 2 0 01-.89 1.66L12 10.84l-2.61-1.46A2 2 0 018.5 7.05V4z"/>
  ),
  cat: (
    <path d="M5 5l-2-3 2 .5 4 1.5h6l4-1.5 2-.5-2 3v7a4 4 0 01-4 4h-6a4 4 0 01-4-4V5zm4 6a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zm6 0a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zm-3 4l-1.2 1.5h2.4L12 15z"/>
  ),
  prescription: (
    <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 5h10v2H7V7zm0 4h10v2H7v-2zm0 4h6v2H7v-2z"/>
  ),
  thermometer: (
    <path d="M12 2a3 3 0 00-3 3v9.55a4.5 4.5 0 106 0V5a3 3 0 00-3-3zm-1 4a1 1 0 112 0v8.34a2.5 2.5 0 11-2 0V6z"/>
  ),
  virus: (
    <path d="M12 6a6 6 0 100 12 6 6 0 000-12zm-1-4h2v3h-2V2zm0 17h2v3h-2v-3zM2 11h3v2H2v-2zm17 0h3v2h-3v-2zm-9 0a1 1 0 112 0 1 1 0 01-2 0zm3 2a1 1 0 112 0 1 1 0 01-2 0z"/>
  ),
  // Pet portrait (replaces emoji on cards) — generic friendly silhouette
  'pet-cat': (
    <path d="M5 4l1.5 4A6 6 0 015 12v3a5 5 0 005 5h4a5 5 0 005-5v-3a6 6 0 01-1.5-4L19 4l-3 2h-8L5 4zm4 8a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zm6 0a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zm-3 4l-1.2 1.5h2.4L12 16z"/>
  ),
}

// Aliases
ICONS['microscope']   = ICONS.shield
ICONS['heart-cross']  = ICONS['health-care']
ICONS['location-med'] = ICONS.hospital
ICONS['graduation']   = ICONS.book
ICONS['warning']      = ICONS.info

const TONES = {
  default: '#475569',  // slate-600
  orange:  '#FF6B00',
  blue:    '#1E40FF',
  white:   '#FFFFFF',
  mono:    '#1A1F36',
  current: 'currentColor',
}

export default function Icon({ name, size = 24, className = '', tone = 'default', style = {} }) {
  const shape = ICONS[name] || ICONS.paw
  const fill  = TONES[tone] || tone || TONES.default
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      className={cn('inline-block shrink-0', className)}
      style={style}
      aria-hidden="true"
    >
      {shape}
    </svg>
  )
}
