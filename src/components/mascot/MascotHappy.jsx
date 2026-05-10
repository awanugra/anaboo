export default function MascotHappy({ width = 130, height = 120 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 140 130" fill="none">
      <ellipse cx="70" cy="100" rx="40" ry="28" fill="white" stroke="#111" strokeWidth="3"/>
      <circle cx="70" cy="60" r="34" fill="white" stroke="#111" strokeWidth="3"/>
      <polygon points="44,36 33,10 58,32" fill="#FF4896" stroke="#111" strokeWidth="3" strokeLinejoin="round"/>
      <polygon points="96,36 107,10 82,32" fill="#FF4896" stroke="#111" strokeWidth="3" strokeLinejoin="round"/>
      <polygon points="47,34 37,14 57,30" fill="#FFB3D1"/>
      <polygon points="93,34 103,14 83,30" fill="#FFB3D1"/>
      <path d="M56 56 Q60 50 64 56" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M76 56 Q80 50 84 56" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M70 68 L67 65 L73 65 Z" fill="#FF4896"/>
      <path d="M67 71 Q70 75 73 71" stroke="#111" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <line x1="42" y1="65" x2="63" y2="67" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
      <line x1="40" y1="70" x2="63" y2="70" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
      <line x1="77" y1="67" x2="98" y2="65" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
      <line x1="77" y1="70" x2="100" y2="70" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="44" cy="62" rx="6" ry="3.5" fill="#FF4896" opacity="0.3"/>
      <ellipse cx="96" cy="62" rx="6" ry="3.5" fill="#FF4896" opacity="0.3"/>
      <ellipse cx="45" cy="118" rx="14" ry="8" fill="white" stroke="#111" strokeWidth="2.5"/>
      <ellipse cx="95" cy="118" rx="14" ry="8" fill="white" stroke="#111" strokeWidth="2.5"/>
      <path d="M108 108 Q126 90 120 75" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <ellipse cx="70" cy="103" rx="16" ry="12" fill="#FFF3B0"/>
    </svg>
  )
}
