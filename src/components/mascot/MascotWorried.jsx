export default function MascotWorried({ width = 110, height = 100 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 120 110" fill="none">
      <ellipse cx="60" cy="85" rx="35" ry="23" fill="white" stroke="#111" strokeWidth="3"/>
      <circle cx="60" cy="50" r="30" fill="white" stroke="#111" strokeWidth="3"/>
      <polygon points="36,28 26,4 50,28" fill="#FF4896" stroke="#111" strokeWidth="3" strokeLinejoin="round"/>
      <polygon points="84,28 94,4 70,28" fill="#FF4896" stroke="#111" strokeWidth="3" strokeLinejoin="round"/>
      <circle cx="48" cy="46" r="9" fill="white" stroke="#111" strokeWidth="2.5"/>
      <circle cx="72" cy="46" r="9" fill="white" stroke="#111" strokeWidth="2.5"/>
      <circle cx="50" cy="47" r="5" fill="#111"/>
      <circle cx="74" cy="47" r="5" fill="#111"/>
      <path d="M42 38 Q48 34 54 38" stroke="#111" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M66 38 Q72 34 78 38" stroke="#111" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M60 58 L57 55 L63 55 Z" fill="#FF4896"/>
      <path d="M56 62 Q60 58 64 62" stroke="#111" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="37" cy="52" rx="5.5" ry="3" fill="#FF4896" opacity="0.35"/>
      <ellipse cx="83" cy="52" rx="5.5" ry="3" fill="#FF4896" opacity="0.35"/>
      <ellipse cx="36" cy="100" rx="12" ry="7" fill="white" stroke="#111" strokeWidth="2.5"/>
      <ellipse cx="84" cy="100" rx="12" ry="7" fill="white" stroke="#111" strokeWidth="2.5"/>
      <ellipse cx="60" cy="88" rx="14" ry="10" fill="#FFF3B0"/>
      <path d="M88 32 Q90 26 88 22 Q86 26 88 32Z" fill="#015FEE" stroke="#111" strokeWidth="1.5"/>
    </svg>
  )
}
