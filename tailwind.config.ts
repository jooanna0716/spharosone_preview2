/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    fontFamily: {
      sans: ['Pretendard', 'Poppins', 'sans-serif'],
      ko: ['Pretendard', 'sans-serif'],
      en: ['Poppins', 'sans-serif'],
    },
      extend: {
        colors: {
          accent: {
            DEFAULT: '#00B89C',
            light: '#E6F9F5',
            dark: '#009980',
          },
          surface: {
            DEFAULT: '#F0F0F0',
            card: '#FFFFFF',
          },
          ink: {
            DEFAULT: '#111111',
            secondary: '#555555',
            muted: '#888888',
          },
        },
        borderRadius: {
          '2xl': '16px',
          '3xl': '20px',
        },
        boxShadow: {
          card: '0 2px 20px rgba(0,0,0,0.08)',
          'card-hover': '0 8px 40px rgba(0,0,0,0.12)',
        },
      },
    },
    plugins: [],
  }
