/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'trello-bg': '#1D2125',
        'trello-nav': '#1D2125',
        'trello-list': '#101204',
        'trello-card': '#22272B',
        'trello-card-hover': '#282E33',
        'trello-modal': '#323940',
        'trello-text-primary': '#B6C2CF',
        'trello-text-secondary': '#8C9BAB',
        'trello-blue': '#579DFF',
        'trello-blue-hover': '#85B8FF',
        'trello-btn-hover': '#A6C5E229'
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Roboto"', '"Noto Sans"', '"Ubuntu"', '"Droid Sans"', '"Helvetica Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}