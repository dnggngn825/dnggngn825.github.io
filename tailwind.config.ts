import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg:       '#0b1326',
        primary:  '#94C9A9',
        secondary:'#b7c8e1',
        surface:  {
          DEFAULT:  '#171f33',
          low:      '#131b2e',
          lowest:   '#060e20',
          high:     '#222a3d',
          highest:  '#2d3449',
          bright:   '#31394d',
          dim:      '#0b1326',
        },
        'on-surface':  '#dae2fd',
        'on-primary':  '#052e16',
        outline:       '#859490',
        'outline-variant': '#3c4a46',
        muted:         '#6b7fa3',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg:      '1.5rem',
        xl:      '2rem',
        full:    '9999px',
      },
      keyframes: {
        'spin-gradient': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(1080deg)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'spin-gradient': 'spin-gradient 2s infinite',
        'fade-up':       'fade-up 0.5s ease-out forwards',
        'fade-in':       'fade-in 0.5s ease-out forwards',
        shimmer:         'shimmer 1.5s infinite',
      },
      backgroundImage: {
        shimmer: 'linear-gradient(90deg, #222a3d 25%, #31394d 50%, #222a3d 75%)',
        'gradient-primary': 'linear-gradient(135deg, #94C9A9 0%, #b7e0c6 100%)',
      },
      backgroundSize: {
        shimmer: '200% 100%',
      },
    },
  },
  plugins: [],
} satisfies Config
