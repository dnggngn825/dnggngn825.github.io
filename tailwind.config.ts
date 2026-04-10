import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Dark mode theme palette
      colors: {
        bg:       '#000000',
        primary:  '#f8fafc',
        secondary:'#a1a1aa',
        surface:  {
          DEFAULT:  '#111827',
          low:      '#0f172a',
          lowest:   '#000000',
          high:     '#1f2937',
          highest:  '#111827',
          bright:   '#27272a',
          dim:      '#020617',
        },
        'on-surface':  '#f8fafc',
        'on-primary':  '#0f172a',
        outline:       '#374151',
        'outline-variant': '#27272a',
        muted:         '#71717a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
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
        shimmer: 'linear-gradient(90deg, #111827 25%, #0f172a 50%, #111827 75%)',
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #9333ea 50%, #f43f5e 100%)',
      },
      backgroundSize: {
        shimmer: '200% 100%',
      },
    },
  },
  plugins: [],
} satisfies Config
