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
            DEFAULT: '#5BA4F5',
            light: '#1a2a40',
            dark: '#3b82f6',
          },
          surface: {
            DEFAULT: '#0d0d0d',
            card: '#1a1a1a',
          },
          ink: {
            DEFAULT: '#f0f0f0',
            secondary: '#aaaaaa',
            muted: '#777777',
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
