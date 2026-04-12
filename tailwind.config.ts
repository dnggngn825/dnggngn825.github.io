import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg:       'rgb(var(--color-bg) / <alpha-value>)',
        primary:  'rgb(var(--color-primary) / <alpha-value>)',
        secondary:'rgb(var(--color-secondary) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          low:     'rgb(var(--color-surface-low) / <alpha-value>)',
          lowest:  'rgb(var(--color-surface-lowest) / <alpha-value>)',
          high:    'rgb(var(--color-surface-high) / <alpha-value>)',
          highest: 'rgb(var(--color-surface-highest) / <alpha-value>)',
          bright:  'rgb(var(--color-surface-bright) / <alpha-value>)',
          dim:     'rgb(var(--color-surface-dim) / <alpha-value>)',
          tag:     'rgb(var(--color-surface-tag) / <alpha-value>)',
        },
        'on-surface':      'rgb(var(--color-on-surface) / <alpha-value>)',
        'on-primary':      'rgb(var(--color-on-primary) / <alpha-value>)',
        outline:           'rgb(var(--color-outline) / <alpha-value>)',
        'outline-variant': 'rgb(var(--color-outline-variant) / <alpha-value>)',
        muted:             'rgb(var(--color-muted) / <alpha-value>)',
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
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
        shimmer:           'linear-gradient(90deg, rgb(var(--color-surface)) 25%, rgb(var(--color-surface-low)) 50%, rgb(var(--color-surface)) 75%)',
        'gradient-primary':'linear-gradient(135deg, #6366f1 0%, #9333ea 50%, #f43f5e 100%)',
      },
      backgroundSize: {
        shimmer: '200% 100%',
      },
    },
  },
  plugins: [],
} satisfies Config
