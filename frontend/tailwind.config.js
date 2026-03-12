/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0B1020',
        surface: '#131A2E',
        primary: '#8B5CF6',
        primaryDark: '#6D28D9',
        secondary: '#22D3EE',
        textMain: '#F8FAFC',
        textSub: '#94A3B8',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      boxShadow: {
        glow: '0 0 40px rgba(139,92,246,0.35)',
        card: '0 10px 30px rgba(0,0,0,0.35)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.16) 1px, transparent 0)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
