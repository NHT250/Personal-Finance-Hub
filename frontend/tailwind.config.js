/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        surface: '#F8FAFB',
        primary: '#009688',
        primaryDark: '#00796B',
        secondary: '#FF9800',
        textMain: '#1A1A1A',
        textSub: '#4F4F4F',
        success: '#1FA971',
        warning: '#FF9800',
        danger: '#D35400',
      },
      boxShadow: {
        glow: '0 0 28px rgba(0,150,136,0.28)',
        card: '0 10px 24px rgba(31,41,55,0.10)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(120,120,120,0.16) 1px, transparent 0)',
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
