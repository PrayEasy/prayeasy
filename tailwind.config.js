/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // New Blue Gradient Palette
        azure: {
          50: '#e6f2ff',
          100: '#b3d9ff',
          200: '#80bfff',
          300: '#4da6ff',
          400: '#1a8cff',
          500: '#007FFF', // Primary brand color
          600: '#0066cc',
          700: '#004d99',
          800: '#003366',
          900: '#001a33',
        },
        sky: {
          50: '#f0f9ff',
          100: '#e0f3fe',
          200: '#bae6fd',
          300: '#87CEEB', // Light accents
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        ocean: {
          50: '#e8f4fc',
          100: '#c5e3f6',
          200: '#9fd1ef',
          300: '#79bee8',
          400: '#4A90E2', // Interactive elements
          500: '#3a7bc8',
          600: '#2d66ae',
          700: '#235194',
          800: '#1a3d7a',
          900: '#112860',
        },
        aqua: {
          50: '#e0fafa',
          100: '#b3f2f2',
          200: '#80e9e9',
          300: '#4de1e1',
          400: '#1ad8d8',
          500: '#00CED1', // Highlights
          600: '#00a8ab',
          700: '#008285',
          800: '#005c5f',
          900: '#003639',
        },
        cobalt: {
          50: '#e6eaf5',
          100: '#c0cae5',
          200: '#99aad5',
          300: '#738ac5',
          400: '#4c6ab5',
          500: '#0047AB', // Deep accents
          600: '#003a8c',
          700: '#002d6d',
          800: '#00204e',
          900: '#00132f',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-blue': 'linear-gradient(135deg, #007FFF 0%, #4A90E2 50%, #87CEEB 100%)',
        'gradient-blue-dark': 'linear-gradient(135deg, #003366 0%, #004d99 50%, #0047AB 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 127, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 127, 255, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
