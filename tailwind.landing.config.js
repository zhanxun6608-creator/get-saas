/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './privacy-policy.html', './terms-of-use.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#2563eb',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
        },
        emerald: {
          50: '#ecfdf5',
          500: '#10b981',
        },
      },
      maxWidth: {
        'container': '1200px',
        'content': '720px',
      },
    },
  },
  plugins: [],
};
