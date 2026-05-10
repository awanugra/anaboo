export default function MascotFull({ width = 180, height = 180 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 180 180" fill="none"
         style={{ animation: 'wiggle 3s ease-in-out infinite', display: 'block', margin: 'auto' }}>
      <ellipse cx="90" cy="130" rx="50" ry="40" fill="white" stroke="#111" strokeWidth="3.5"/>
      <circle cx="90" cy="80" r="42" fill="white" stroke="#111" strokeWidth="3.5"/>
      <polygon points="58,48 46,18 74,42" fill="#FF4896" stroke="#111" strokeWidth="3.5" strokeLinejoin="round"/>
      <polygon points="122,48 134,18 106,42" fill="#FF4896" stroke="#111" strokeWidth="3.5" strokeLinejoin="round"/>
      <polygon points="61,46 50,24 72,44" fill="#FFB3D1"/>
      <polygon points="119,46 130,24 108,44" fill="#FFB3D1"/>
      <circle cx="76" cy="76" r="10" fill="white" stroke="#111" strokeWidth="3"/>
      <circle cx="104" cy="76" r="10" fill="white" stroke="#111" strokeWidth="3"/>
      <circle cx="78" cy="76" r="5.5" fill="#111"/>
      <circle cx="106" cy="76" r="5.5" fill="#111"/>
      <circle cx="79.5" cy="74" r="2" fill="white"/>
      <circle cx="107.5" cy="74" r="2" fill="white"/>
      <path d="M90 90 L86 87 L94 87 Z" fill="#FF4896"/>
      <path d="M86 93 Q90 97 94 93" stroke="#111" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <line x1="60" y1="88" x2="82" y2="90" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
      <line x1="58" y1="94" x2="82" y2="93" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
      <line x1="98" y1="90" x2="120" y2="88" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
      <line x1="98" y1="93" x2="122" y2="94" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="60" cy="158" rx="18" ry="12" fill="white" stroke="#111" strokeWidth="3"/>
      <ellipse cx="120" cy="158" rx="18" ry="12" fill="white" stroke="#111" strokeWidth="3"/>
      <path d="M135 140 Q160 120 155 100 Q150 85 140 90" stroke="#111" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="90" cy="132" rx="22" ry="16" fill="#FFF3B0"/>
      <ellipse cx="66" cy="84" rx="7" ry="4" fill="#FF4896" opacity="0.3"/>
      <ellipse cx="114" cy="84" rx="7" ry="4" fill="#FF4896" opacity="0.3"/>
    </svg>
  )
}
