/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: { 50:'#F8EEF0',100:'#F0DDE1',200:'#DDBFC6',300:'#C98D9A',400:'#A95266',500:'#861B32',600:'#71172B',700:'#541323',800:'#3E111E',900:'#302323' },
        saffron: { 50:'#FBF7EE',100:'#F5EBD5',200:'#E8D5A3',300:'#E1C883',400:'#D4AF65',500:'#B18D4D',600:'#92713B',700:'#70542D' },
        ivory: { 50:'#FFFCF7',100:'#FFF8EE',200:'#F8F0E5',300:'#E8DCCB',400:'#D5C6B3' },
        gold: { 100:'#F6EEDC',200:'#E8D5A3',300:'#D4AF65',400:'#B18D4D',500:'#92713B' },
        ink: '#302323', muted: '#756761', border: '#E8DCCB',
        leaf: { 50:'#EAF5EF',100:'#CCE6D8',300:'#69B38D',500:'#26734D',600:'#1F5E3F',700:'#194B33' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Mukta"', '"Noto Sans Telugu"', 'system-ui', 'sans-serif'],
        telugu: ['"Noto Serif Telugu"', 'serif'],
      },
      boxShadow: { soft: '0 6px 24px -10px rgba(89,14,28,.25)', lift: '0 18px 40px -16px rgba(89,14,28,.35)' },
      keyframes: {
        sway: { '0%,100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } },
        flicker: { '0%,100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '.85', transform: 'scale(1.08)' } },
        spinslow: { to: { transform: 'rotate(360deg)' } },
      },
      animation: { sway: 'sway 6s ease-in-out infinite', flicker: 'flicker 2.4s ease-in-out infinite', spinslow: 'spinslow 90s linear infinite' },
    },
  },
  plugins: [],
}
