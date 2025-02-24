/* eslint-disable @typescript-eslint/no-require-imports */
import type {Config} from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      lg: '1025px',
      sm: '640px',
      xlg: {
        max: '1024px',
      },
      xsm: {
        max: '639px',
      },
      tablet: {
        min: '640px',
        max: '1024px',
      },
    },
    extend: {
      colors: {
        // background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'color-blue': '--color-blue',
        'background': '#f8f9fa',
        'blueprimary': '#007bff',
        'background-elevation5': '#ffffff',
        'black-shadows': 'rgba(0, 0, 0, 0.15)',
        'link': '#007bff',
        'greyscale-text60': 'rgba(0, 0, 0, 0.6)',
        'greyscale-text30': 'rgba(0, 0, 0, 0.3)',
        'blueblue-400': '#0056b3',
        'blueblue-600': '#004085',
        'big-stone-2': '#262626',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({addUtilities}) {
      addUtilities({
        '.flex-center': {
          '@apply flex items-center justify-center': {},
        },
        '.absolute-center': {
          '@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2':
            {},
        },
      })
    }),
  ],
}
export default config
