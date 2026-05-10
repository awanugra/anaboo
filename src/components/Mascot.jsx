import { cn } from '../lib/utils'

// Anaboo mascot system — 2D flat with bold outline, costume variants
// Style reference: cute white dog/cat with black outline, flat color accents
// Variants: default, happy, sleep, sick, party, vet

const STROKE = '#1A1F36'
const STROKE_W = 2.5

// Base body (white dog/cat hybrid — friendly, neutral)
function Body({ accent = '#FF6B00' }) {
  return (
    <>
      {/* Tail */}
      <path d="M115 105 Q135 90 130 70" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinecap="round" />
      <path d="M118 95 Q128 92 125 80" stroke={STROKE} strokeWidth={1.5} fill="none" strokeLinecap="round" />

      {/* Body */}
      <ellipse cx="65" cy="105" rx="38" ry="32" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Legs */}
      <ellipse cx="48" cy="135" rx="9" ry="8" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx="78" cy="135" rx="9" ry="8" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Head */}
      <circle cx="65" cy="62" r="35" fill="white" stroke={STROKE} strokeWidth={STROKE_W} />

      {/* Ears */}
      <path d="M40 35 Q35 18 50 22 Q55 32 50 45 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <path d="M90 35 Q95 18 80 22 Q75 32 80 45 Z" fill={accent} stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />

      {/* Cheek */}
      <ellipse cx="48" cy="72" rx="5" ry="3" fill="#FECDD3" opacity=".7" />
      <ellipse cx="82" cy="72" rx="5" ry="3" fill="#FECDD3" opacity=".7" />
    </>
  )
}

const VARIANTS = {
  // Default: friendly smile, eyes open
  default: ({ accent }) => (
    <>
      <Body accent={accent} />
      {/* Eyes */}
      <ellipse cx="55" cy="60" rx="3" ry="4" fill={STROKE} />
      <ellipse cx="75" cy="60" rx="3" ry="4" fill={STROKE} />
      <circle cx="56" cy="58" r="1" fill="white" />
      <circle cx="76" cy="58" r="1" fill="white" />
      {/* Nose */}
      <ellipse cx="65" cy="70" rx="3" ry="2.5" fill={STROKE} />
      {/* Smile */}
      <path d="M60 75 Q65 80 70 75" stroke={STROKE} strokeWidth={2} fill="none" strokeLinecap="round" />
    </>
  ),
  // Happy: closed crescent eyes, big smile
  happy: ({ accent }) => (
    <>
      <Body accent={accent} />
      {/* Eyes — happy crescent */}
      <path d="M50 60 Q55 55 60 60" stroke={STROKE} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <path d="M70 60 Q75 55 80 60" stroke={STROKE} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <ellipse cx="65" cy="70" rx="3" ry="2.5" fill={STROKE} />
      <path d="M58 76 Q65 84 72 76" stroke={STROKE} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      {/* Tongue */}
      <path d="M62 78 L68 78 L66 82 Z" fill="#FB7185" stroke={STROKE} strokeWidth={1.5} strokeLinejoin="round" />
    </>
  ),
  // Sleep: zZz, closed eyes
  sleep: ({ accent }) => (
    <>
      <Body accent={accent} />
      <path d="M50 62 Q55 60 60 62" stroke={STROKE} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <path d="M70 62 Q75 60 80 62" stroke={STROKE} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <ellipse cx="65" cy="70" rx="3" ry="2.5" fill={STROKE} />
      <ellipse cx="65" cy="76" rx="3" ry="2" fill="#A5F3FC" stroke={STROKE} strokeWidth={1.5} />
      <text x="95" y="35" fontSize="14" fontWeight="800" fill={STROKE}>Z</text>
      <text x="105" y="25" fontSize="10" fontWeight="800" fill={STROKE}>z</text>
    </>
  ),
  // Sick: cone of shame
  sick: ({ accent }) => (
    <>
      <Body accent={accent} />
      <ellipse cx="55" cy="60" rx="3" ry="4" fill={STROKE} />
      <ellipse cx="75" cy="60" rx="3" ry="4" fill={STROKE} />
      <ellipse cx="65" cy="70" rx="3" ry="2.5" fill={STROKE} />
      <path d="M58 78 Q65 75 72 78" stroke={STROKE} strokeWidth={2} fill="none" strokeLinecap="round" />
      {/* Cone */}
      <path d="M30 50 L25 90 L105 90 L100 50 Z" fill="white" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" opacity=".95" />
    </>
  ),
  // Party: with party hat + confetti
  party: ({ accent }) => (
    <>
      <Body accent={accent} />
      <ellipse cx="55" cy="60" rx="3" ry="4" fill={STROKE} />
      <ellipse cx="75" cy="60" rx="3" ry="4" fill={STROKE} />
      <ellipse cx="65" cy="70" rx="3" ry="2.5" fill={STROKE} />
      <path d="M58 76 Q65 84 72 76" stroke={STROKE} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      {/* Party hat */}
      <path d="M45 30 L65 0 L85 30 Z" fill={accent} stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <circle cx="65" cy="2" r="3" fill="#FFB627" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="55" cy="22" r="2" fill="#1E40FF" />
      <circle cx="75" cy="22" r="2" fill="#10B981" />
      {/* Confetti */}
      <rect x="15" y="40" width="4" height="4" fill="#FFB627" transform="rotate(20 17 42)" />
      <rect x="110" y="55" width="4" height="4" fill="#1E40FF" transform="rotate(-15 112 57)" />
      <circle cx="20" cy="80" r="2" fill="#FB7185" />
      <circle cx="115" cy="100" r="2" fill="#10B981" />
    </>
  ),
  // Vet: with stethoscope around neck
  vet: ({ accent }) => (
    <>
      <Body accent={accent} />
      <ellipse cx="55" cy="60" rx="3" ry="4" fill={STROKE} />
      <ellipse cx="75" cy="60" rx="3" ry="4" fill={STROKE} />
      <ellipse cx="65" cy="70" rx="3" ry="2.5" fill={STROKE} />
      <path d="M60 75 Q65 80 70 75" stroke={STROKE} strokeWidth={2} fill="none" strokeLinecap="round" />
      {/* Stethoscope */}
      <path d="M40 95 Q35 110 50 115 Q60 117 60 110" stroke={STROKE} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <circle cx="60" cy="108" r="5" fill={accent} stroke={STROKE} strokeWidth={2} />
      <circle cx="60" cy="108" r="2" fill="white" />
    </>
  ),
}

export default function Mascot({ variant = 'default', size = 140, accent = '#FF6B00', className = '' }) {
  const Render = VARIANTS[variant] || VARIANTS.default
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 150"
      className={cn('inline-block shrink-0', className)}
      aria-hidden="true"
    >
      <Render accent={accent} />
    </svg>
  )
}
