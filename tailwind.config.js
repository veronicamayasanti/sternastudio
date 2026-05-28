/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        pastel: {
          pink: '#F9C6D0',
          lavender: '#D4C1EC',
          blue: '#BFD9F5',
          mint: '#B8EDE0',
          peach: '#FDDCB5',
          yellow: '#FFF0B8',
          rose: '#F7B7C5',
          purple: '#C9B8F5',
        },
        brand: {
          primary: '#C084FC',
          secondary: '#F472B6',
          accent: '#818CF8',
          soft: '#E9D5FF',
          bg: '#0D0B14',
          surface: '#13111E',
          card: '#1A1728',
          border: '#2A2440',
          text: '#F0EAFF',
          muted: '#9B8EC4',
        },
      },
      backgroundImage: {
        'gradient-pastel': 'linear-gradient(135deg, #C084FC 0%, #F472B6 50%, #818CF8 100%)',
        'gradient-hero': 'radial-gradient(ellipse at top, #1D1435 0%, #0D0B14 70%)',
        'gradient-card': 'linear-gradient(145deg, rgba(26,23,40,0.9) 0%, rgba(20,17,35,0.95) 100%)',
        'glow-purple': 'radial-gradient(circle, rgba(192,132,252,0.3) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'glow-purple': '0 0 40px rgba(192,132,252,0.3)',
        'glow-pink': '0 0 40px rgba(244,114,182,0.3)',
        'glow-soft': '0 0 20px rgba(192,132,252,0.15)',
        'card': '0 8px 32px rgba(0,0,0,0.4)',
        'card-hover': '0 16px 48px rgba(192,132,252,0.2)',
      },
    },
  },
  plugins: [],
}
