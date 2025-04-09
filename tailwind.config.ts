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
      fontFamily: {
        roboto: ['var(--font-roboto)'],
        openSans: ['var(--font-open-sans)'],
        montserrat: ['var(--font-montserrat)'],
      },
      colors: {
        foreground: 'hsl(var(--foreground))',
        'color-blue': '--color-blue',
        background: '#f8f9fa',
        blueprimary: '#007bff',
        'background-elevation5': '#ffffff',
        'background-elevation20': '#F8F8F8',
        'background-elevation30': '#F0F0F0',
        'background-elevation10X': '#F5F5F9',
        'black-shadows': 'rgba(0, 0, 0, 0.15)',
        link: '#007bff',
        'greyscale-text60': 'rgba(0, 0, 0, 0.6)',
        'greyscale-text30': 'rgba(0, 0, 0, 0.3)',
        'blueblue-400': '#0056b3',
        'blueblue-600': '#004085',
        'big-stone-2': '#262626',
        'Blue-Primary': '#38B6FF',
        'Blue-400': '#60C5FF',
        'Blue-100': '#C1E8FF',
        'Blue-50': '#D9F1FF',
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
      boxShadow: {
        'card-s': '0px 2px 10px 0px rgba(0, 34, 85, 0.04)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
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
        '.text-pc-heading20b': {
          '@apply text-[1.25rem] font-bold leading-[1.2] tracking-[-0.05rem] font-montserrat':
            {},
        },
        '.text-pc-sub10m': {
          '@apply text-[0.625rem] font-medium leading-[1.4] tracking-[-0.01875rem] font-montserrat':
            {},
        },
        '.text-pc-sub16': {
          '@apply text-[1rem] font-normal leading-[1.5] tracking-[-0.03rem] font-montserrat':
            {},
        },
        '.text-pc-sub16m': {
          '@apply text-[1rem] font-medium leading-[1.3] tracking-[-0.03rem] font-montserrat':
            {},
        },
        '.text-pc-sub16s': {
          '@apply text-[1rem] font-semibold leading-[1.5] tracking-[-0.03rem] font-montserrat':
            {},
        },
        '.text-pc-sub16b': {
          '@apply text-[1rem] font-bold leading-[1.2] tracking-[-0.04rem] font-montserrat':
            {},
        },
        '.text-pc-14': {
          '@apply text-[0.875rem] leading-[1.5] tracking-[-0.02625rem] font-montserrat':
            {},
        },
        '.text-pc-sub14m': {
          '@apply text-[0.875rem] font-medium leading-[1.5] tracking-[-0.02625rem] font-montserrat':
            {},
        },
        '.text-pc-sub14s': {
          '@apply text-[0.875rem] font-semibold leading-[1.5] tracking-[-0.02625rem] font-montserrat':
            {},
        },
        '.text-pc-sub14b': {
          '@apply text-[0.875rem] font-bold leading-[1.3] tracking-[-0.02625rem] font-montserrat':
            {},
        },
        '.text-pc-sub12m': {
          '@apply text-[0.75rem] font-medium leading-[1.4] tracking-[-0.0225rem] font-montserrat':
            {},
        },
        '.text-pc-sub12s': {
          '@apply text-[0.75rem] font-semibold leading-[1.5] tracking-[-0.015rem] font-montserrat':
            {},
        },
        '.text-mb-sub10m': {
          '@apply text-[0.625rem] font-medium leading-[1.4] tracking-[-0.01875rem] font-montserrat':
            {},
        },
        '.text-mb-13': {
          '@apply text-[0.8125rem] leading-[1.5] tracking-[-0.02438rem] font-montserrat':
            {},
        },
        '.text-mb-13M': {
          '@apply text-[0.8125rem] font-medium leading-[1.23] tracking-[-0.023438rem] font-montserrat':
            {},
        },
        '.text-mb-12': {
          '@apply text-[0.75rem] leading-[1.5] tracking-[-0.0225rem] font-montserrat':
            {},
        },
        '.text-pc-h1': {
          '@apply text-[2.75rem] font-bold leading-[1.2] tracking-[-0.115rem] font-montserrat':
            {},
        },
        '.text-mb-h1': {
          '@apply text-[1.25rem] font-bold leading-[1.2] tracking-[-0.05rem] font-montserrat':
            {},
        },
        '.text-pc-tab-title': {
          '@apply text-[1rem] font-semibold leading-[1.625] tracking-[-0.03rem] font-montserrat':
            {},
        },
        '.text-mb-h2': {
          '@apply text-[1.125rem] font-bold leading-[1.2] tracking-[-0.045rem] font-montserrat':
            {},
        },
        '.text-heading-h3': {
          '@apply text-[2.5rem] font-bold leading-[1.3] tracking-[-0.075rem] font-montserrat':
            {},
        },
        '.text-pc-h6': {
          '@apply text-[1.75rem] font-bold leading-[1.3] tracking-[-0.07rem] font-montserrat':
            {},
        },
        '.text-pc-h5': {
          '@apply text-[2rem] font-bold leading-[1.3] tracking-[-0.06rem] font-montserrat':
            {},
        },
      })
    }),
  ],
}
export default config
