// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2671eb',
          50: '#eef4ff',
          100: '#dce9fe',
          200: '#c0d7fd',
          300: '#94bbfc',
          400: '#6096f9',
          500: '#2671eb',   // main color
          600: '#1f59d9',
          700: '#1846b3',
          800: '#153a8f',
          900: '#133074',
        },
      },
    },
  },
  plugins: [],
};