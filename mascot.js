/**
 * ANABOO – Mascot SVG Templates
 * Reusable SVG cat expressions as JS functions.
 * Import these into your templating system or framework.
 */

/**
 * Returns SVG markup for the happy cat mascot (used on dashboard).
 * @param {number} width
 * @param {number} height
 * @returns {string} SVG HTML string
 */
function mascotHappy(width = 130, height = 120) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 140 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="70" cy="100" rx="40" ry="28" fill="white" stroke="#111" stroke-width="3"/>
    <circle cx="70" cy="60" r="34" fill="white" stroke="#111" stroke-width="3"/>
    <polygon points="44,36 33,10 58,32" fill="#FF4896" stroke="#111" stroke-width="3" stroke-linejoin="round"/>
    <polygon points="96,36 107,10 82,32" fill="#FF4896" stroke="#111" stroke-width="3" stroke-linejoin="round"/>
    <polygon points="47,34 37,14 57,30" fill="#FFB3D1"/>
    <polygon points="93,34 103,14 83,30" fill="#FFB3D1"/>
    <!-- Happy curved eyes -->
    <path d="M56 56 Q60 50 64 56" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M76 56 Q80 50 84 56" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M70 68 L67 65 L73 65 Z" fill="#FF4896"/>
    <path d="M67 71 Q70 75 73 71" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <line x1="42" y1="65" x2="63" y2="67" stroke="#111" stroke-width="2" stroke-linecap="round"/>
    <line x1="40" y1="70" x2="63" y2="70" stroke="#111" stroke-width="2" stroke-linecap="round"/>
    <line x1="77" y1="67" x2="98" y2="65" stroke="#111" stroke-width="2" stroke-linecap="round"/>
    <line x1="77" y1="70" x2="100" y2="70" stroke="#111" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="44" cy="62" rx="6" ry="3.5" fill="#FF4896" opacity="0.3"/>
    <ellipse cx="96" cy="62" rx="6" ry="3.5" fill="#FF4896" opacity="0.3"/>
    <ellipse cx="45" cy="118" rx="14" ry="8" fill="white" stroke="#111" stroke-width="2.5"/>
    <ellipse cx="95" cy="118" rx="14" ry="8" fill="white" stroke="#111" stroke-width="2.5"/>
    <path d="M108 108 Q126 90 120 75" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="70" cy="103" rx="16" ry="12" fill="#FFF3B0"/>
  </svg>`;
}

/**
 * Returns SVG markup for the worried cat mascot (used on reminders).
 * @param {number} width
 * @param {number} height
 * @returns {string} SVG HTML string
 */
function mascotWorried(width = 110, height = 100) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="85" rx="35" ry="23" fill="white" stroke="#111" stroke-width="3"/>
    <circle cx="60" cy="50" r="30" fill="white" stroke="#111" stroke-width="3"/>
    <polygon points="36,28 26,4 50,28" fill="#FF4896" stroke="#111" stroke-width="3" stroke-linejoin="round"/>
    <polygon points="84,28 94,4 70,28" fill="#FF4896" stroke="#111" stroke-width="3" stroke-linejoin="round"/>
    <!-- Worried eyes -->
    <circle cx="48" cy="46" r="9" fill="white" stroke="#111" stroke-width="2.5"/>
    <circle cx="72" cy="46" r="9" fill="white" stroke="#111" stroke-width="2.5"/>
    <circle cx="50" cy="47" r="5" fill="#111"/>
    <circle cx="74" cy="47" r="5" fill="#111"/>
    <!-- Worried eyebrows -->
    <path d="M42 38 Q48 34 54 38" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M66 38 Q72 34 78 38" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M60 58 L57 55 L63 55 Z" fill="#FF4896"/>
    <path d="M56 62 Q60 58 64 62" stroke="#111" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="37" cy="52" rx="5.5" ry="3" fill="#FF4896" opacity="0.35"/>
    <ellipse cx="83" cy="52" rx="5.5" ry="3" fill="#FF4896" opacity="0.35"/>
    <ellipse cx="36" cy="100" rx="12" ry="7" fill="white" stroke="#111" stroke-width="2.5"/>
    <ellipse cx="84" cy="100" rx="12" ry="7" fill="white" stroke="#111" stroke-width="2.5"/>
    <ellipse cx="60" cy="88" rx="14" ry="10" fill="#FFF3B0"/>
    <!-- Sweat drop -->
    <path d="M88 32 Q90 26 88 22 Q86 26 88 32Z" fill="#015FEE" stroke="#111" stroke-width="1.5"/>
  </svg>`;
}

/**
 * Returns SVG markup for the full onboarding cat mascot.
 * @param {number} width
 * @param {number} height
 * @returns {string} SVG HTML string
 */
function mascotFull(width = 180, height = 180) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 180 180" fill="none"
       style="animation:wiggle 3s ease-in-out infinite;display:block;margin:auto;">
    <ellipse cx="90" cy="130" rx="50" ry="40" fill="white" stroke="#111" stroke-width="3.5"/>
    <circle cx="90" cy="80" r="42" fill="white" stroke="#111" stroke-width="3.5"/>
    <polygon points="58,48 46,18 74,42" fill="#FF4896" stroke="#111" stroke-width="3.5" stroke-linejoin="round"/>
    <polygon points="122,48 134,18 106,42" fill="#FF4896" stroke="#111" stroke-width="3.5" stroke-linejoin="round"/>
    <polygon points="61,46 50,24 72,44" fill="#FFB3D1"/>
    <polygon points="119,46 130,24 108,44" fill="#FFB3D1"/>
    <circle cx="76" cy="76" r="10" fill="white" stroke="#111" stroke-width="3"/>
    <circle cx="104" cy="76" r="10" fill="white" stroke="#111" stroke-width="3"/>
    <circle cx="78" cy="76" r="5.5" fill="#111"/>
    <circle cx="106" cy="76" r="5.5" fill="#111"/>
    <circle cx="79.5" cy="74" r="2" fill="white"/>
    <circle cx="107.5" cy="74" r="2" fill="white"/>
    <path d="M90 90 L86 87 L94 87 Z" fill="#FF4896"/>
    <path d="M86 93 Q90 97 94 93" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <line x1="60" y1="88" x2="82" y2="90" stroke="#111" stroke-width="2" stroke-linecap="round"/>
    <line x1="58" y1="94" x2="82" y2="93" stroke="#111" stroke-width="2" stroke-linecap="round"/>
    <line x1="98" y1="90" x2="120" y2="88" stroke="#111" stroke-width="2" stroke-linecap="round"/>
    <line x1="98" y1="93" x2="122" y2="94" stroke="#111" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="60" cy="158" rx="18" ry="12" fill="white" stroke="#111" stroke-width="3"/>
    <ellipse cx="120" cy="158" rx="18" ry="12" fill="white" stroke="#111" stroke-width="3"/>
    <path d="M135 140 Q160 120 155 100 Q150 85 140 90" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="90" cy="132" rx="22" ry="16" fill="#FFF3B0"/>
    <ellipse cx="66" cy="84" rx="7" ry="4" fill="#FF4896" opacity="0.3"/>
    <ellipse cx="114" cy="84" rx="7" ry="4" fill="#FF4896" opacity="0.3"/>
  </svg>`;
}
