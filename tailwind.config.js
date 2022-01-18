module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      dropShadow: {
        custom: '0px 2px 16px rgba(138, 138, 142, 0.25)',
      }
    },
  },
  plugins: [],
}