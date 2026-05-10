/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          // Wild Pup palette — orange forward
          orange:      '#FF6B00',  // Primary action / brand
          'orange-dk': '#E55A00',
          'orange-md': '#FF8A33',
          'orange-lt': '#FFE0CC',
          peach:       '#FFD4B8',  // soft peach surface
          'peach-lt':  '#FFEDE0',
          blue:        '#1E40FF',  // accent (deeper, more punchy)
          'blue-dk':   '#1530CC',
          'blue-lt':   '#DCE4FF',
          yellow:      '#FFB627',  // warm sunshine
          'yellow-lt': '#FFEDC9',
          cream:       '#FFF1E6',  // warmer cream
          ink:         '#1A1F36',
          // Semantic
          red:         '#F43F5E',
          'red-lt':    '#FFF1F3',
          green:       '#10B981',
          'green-dk':  '#059669',
          'green-lt':  '#ECFDF5',
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
        card:  '0 2px 8px rgba(15,23,42,0.07), 0 1px 3px rgba(15,23,42,0.05)',
        book:  '0 6px 16px rgba(79,127,255,0.18), 0 2px 4px rgba(79,127,255,0.12)',
      },
      keyframes: {
        float:       { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-5px)' } },
        wiggle:      { '0%,100%': { transform: 'rotate(-4deg) scale(1)' }, '50%': { transform: 'rotate(4deg) scale(1.05)' } },
        fadeUp:      { from: { opacity: '0', transform: 'translateY(4px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pop:         { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.12)' }, '100%': { transform: 'scale(1)' } },
        'ping-soft': { '0%,100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '0.6', transform: 'scale(1.15)' } },
        'badge-pop': { '0%': { transform: 'scale(0)' }, '70%': { transform: 'scale(1.15)' }, '100%': { transform: 'scale(1)' } },
      },
      animation: {
        float:       'float 3s ease-in-out infinite',
        wiggle:      'wiggle 2s ease-in-out infinite',
        fadeUp:      'fadeUp 0.2s ease',
        pop:         'pop 0.25s ease-out',
        'ping-soft': 'ping-soft 1.8s ease-in-out infinite',
        'badge-pop': 'badge-pop 0.35s cubic-bezier(.34,1.56,.64,1)',
      },
    },
  },
  plugins: [],
}
