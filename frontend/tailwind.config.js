module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        highlight: {
          grey: "#D4D4D4"
        }
      },
      fontFamily: {
        sans: ['Geologica', 'sans-serif'],  // เพิ่มตรงนี้!
      }
    },
  },
  plugins: [],
}