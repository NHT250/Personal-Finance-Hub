/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        surface: '#F7FFFB',
        primary: '#98FF98',
        primaryDark: '#70E0B5',
        secondary: '#FFA500',
        textMain: '#D3D3D3',
        textSub: '#BFBFBF',
        success: '#7CDFAE',
        warning: '#FFA500',
        danger: '#F4A261',
      },
      boxShadow: {
        glow: '0 0 35px rgba(152,255,152,0.35)',
        card: '0 10px 30px rgba(0,0,0,0.08)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(210,210,210,0.45) 1px, transparent 0)',
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
