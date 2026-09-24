import type { Config } from 'tailwindcss'

/*
 * Rent a Car Beganović design tokens, sampled off the logo.
 *
 * The mark is a navy-black car and wordmark on white, with an orange-to-amber
 * sun arc behind it and an orange "RENT A CAR" line. So the site is built the
 * same way: a warm paper ground, navy type, and orange doing the pointing.
 *
 * Contrast rules that are easy to break:
 *  - flame-500 (#f76b0e, the logo orange) is a FILL. On paper it is ~2.9:1,
 *    so orange text on light surfaces uses flame-700 (#b8420b, ~5.4:1).
 *  - A flame-500 button carries navy-950 text (~6.8:1), never white.
 *  - On the navy footer and CTA band, flame-400 is fine as text (~7:1).
 */
export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.{js,ts}',
    './app/data/**/*.{js,ts}',
    './app/content/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          0: '#ffffff',
          50: '#faf8f5', // page floor
          100: '#f4f0ea', // alternating band
          200: '#e8e1d7', // hairlines
          300: '#d6ccbe',
        },
        /* The logo's navy-black, as a ladder. 950 is headline type. */
        navy: {
          950: '#07101c',
          900: '#0b1624',
          800: '#132236',
          700: '#1f3049',
          600: '#3a4a62',
          500: '#566279', // body copy on paper, ~6:1
          400: '#8791a3',
          300: '#b7bfcc',
        },
        flame: {
          50: '#fff5ed',
          100: '#ffe7d3',
          200: '#ffcaa3',
          300: '#ffa566',
          400: '#fd8a33',
          500: '#f76b0e', // logo orange — fill only on light
          600: '#dc540a',
          700: '#b8420b', // orange text on paper
          800: '#92360f',
        },
        /* The yellow end of the sun arc. Gradients only. */
        sun: '#f9a620',
      },
      fontFamily: {
        display: ['Archivo', 'Noto Sans Arabic', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'Noto Sans Arabic', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1.25rem',
        pill: '999px',
      },
      maxWidth: {
        shell: '1320px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
        drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      boxShadow: {
        card: '0 1px 2px rgb(7 16 28 / 0.04), 0 8px 24px -12px rgb(7 16 28 / 0.12)',
        lift: '0 2px 4px rgb(7 16 28 / 0.04), 0 24px 48px -20px rgb(7 16 28 / 0.28)',
        flame: '0 12px 32px -12px rgb(247 107 14 / 0.55)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.92)', opacity: '0.55' },
          '70%': { transform: 'scale(1.7)', opacity: '0' },
          '100%': { transform: 'scale(1.7)', opacity: '0' },
        },
        shine: {
          from: { transform: 'translateX(-120%) skewX(-20deg)' },
          to: { transform: 'translateX(260%) skewX(-20deg)' },
        },
        'sun-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite',
        'sun-spin': 'sun-spin 90s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
