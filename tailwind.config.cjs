/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          // Anaboo v2 — softer coral + creamy warm bg
          orange:      '#FF8A65',  // Primary
          'orange-dk': '#FF7043',
          'orange-md': '#FFAB91',
          'orange-lt': '#FFE0CC',
          peach:       '#FFF3E0',
          'peach-lt':  '#FFF9F7',  // warm off-white background
          cream:       '#FFF9F7',
          ink:         '#333333',
          'ink-md':    '#757575',
          'ink-lt':    '#9E9E9E',
          // Type accents
          vaccine:     '#7C4DFF',
          'vaccine-bg':'#EDE7F6',
          medication:  '#FF8A65',
          'medication-bg':'#FBE9E7',
          care:        '#26C6DA',
          'care-bg':   '#E0F7FA',
          // Semantic
          blue:        '#03A9F4',
          'blue-lt':   '#E1F5FE',
          yellow:      '#FFB627',
          'yellow-lt': '#FFF8E1',
          red:         '#FF5252',
          'red-lt':    '#FFEBEE',
          green:       '#4CAF50',
          'green-dk':  '#2E7D32',
          'green-lt':  '#E8F5E9',
          gold:        '#FFD700',
        },
        pet: {
          blue:   '#DBEAFE',
          green:  '#D1FAE5',
          purple: '#EDE9FE',
          pink:   '#FCE7F3',
          yellow: '#FEF3C7',
          cyan:   '#CFFAFE',
        },
      },
      fontSize: {
        'h1':      ['28px', { lineHeight: '1.2',  fontWeight: 800 }],
        'h2':      ['22px', { lineHeight: '1.3',  fontWeight: 800 }],
        'body-lg': ['16px', { lineHeight: '1.5',  fontWeight: 600 }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      boxShadow: {
        phone: '0 0 0 1px rgba(255,255,255,0.06), 0 0 0 10px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.55), 0 16px 32px rgba(0,0,0,0.3)',
        xs:    '0 1px 3px rgba(15,23,42,0.05), 0 1px 2px rgba(15,23,42,0.08)',
        card:  '0 4px 10px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.04)',
        soft:  '0 2px 5px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04)',
        hero:  '0 10px 30px rgba(255,138,101,0.25)',
      },
      keyframes: {
        float:       { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-5px)' } },
        wiggle:      { '0%,100%': { transform: 'rotate(-4deg) scale(1)' }, '50%': { transform: 'rotate(4deg) scale(1.05)' } },
        fadeUp:      { from: { opacity: '0', transform: 'translateY(4px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pop:         { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.12)' }, '100%': { transform: 'scale(1)' } },
        'ping-soft': { '0%,100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '0.6', transform: 'scale(1.15)' } },
        'badge-pop': { '0%': { transform: 'scale(0)' }, '70%': { transform: 'scale(1.15)' }, '100%': { transform: 'scale(1)' } },
        'slide-down':{ from: { opacity: '0', transform: 'translateY(-30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'check-pop': { '0%': { transform: 'scale(0.6)' }, '60%': { transform: 'scale(1.15)' }, '100%': { transform: 'scale(1)' } },
      },
      animation: {
        float:       'float 3s ease-in-out infinite',
        wiggle:      'wiggle 2s ease-in-out infinite',
        fadeUp:      'fadeUp 0.2s ease',
        pop:         'pop 0.25s ease-out',
        'ping-soft': 'ping-soft 1.8s ease-in-out infinite',
        'badge-pop': 'badge-pop 0.35s cubic-bezier(.34,1.56,.64,1)',
        'slide-down':'slide-down 0.4s cubic-bezier(.34,1.56,.64,1)',
        'check-pop': 'check-pop 0.3s cubic-bezier(.34,1.56,.64,1)',
      },
    },
  },
  plugins: [],
}
