/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        cream: '#F9F6F1',
        warm: '#F2EDE6',
        stone: '#C8BFB0',
        ink: '#1A1814',
        muted: '#7A7269',
        accent: '#B8860B',
      },
      letterSpacing: {
        widest2: '0.25em',
      }
    },
  },
  plugins: [],
}
