import type { Config } from 'tailwindcss'

/**
 * Design tokens live in app/globals.css as CSS variables (RGB channels).
 * This file maps them onto the Tailwind theme so utilities like
 * `bg-accent/10`, `text-muted`, `rounded-card`, `text-h2` all share one source.
 */
const channel = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: channel('bg'),
        surface: channel('surface'),
        raised: channel('raised'),
        fg: channel('fg'),
        muted: channel('muted'),
        subtle: channel('subtle'),
        line: channel('line'),
        accent: {
          DEFAULT: channel('accent'),
          light: channel('accent-light'),
          dark: channel('accent-dark'),
          ink: channel('accent-ink'),
        },
        gold: {
          DEFAULT: channel('gold'),
          ink: channel('gold-ink'),
        },
        success: channel('success'),
        warning: channel('warning'),
        danger: channel('danger'),
      },
      fontFamily: {
        display: ['var(--font-bricolage)', 'Segoe UI', 'system-ui', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'Consolas', 'monospace'],
      },
      /**
       * Type scale. Display sizes are fluid (clamp) so there are no
       * breakpoint-by-breakpoint overrides in components.
       */
      fontSize: {
        display: ['clamp(2.5rem, 1.6rem + 4.2vw, 4.5rem)', { lineHeight: '1.04', letterSpacing: '-0.035em', fontWeight: '800' }],
        h1: ['clamp(2rem, 1.4rem + 2.6vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '800' }],
        h2: ['clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '700' }],
        h3: ['clamp(1.2rem, 1.1rem + 0.6vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '700' }],
        lead: ['clamp(1.0625rem, 1rem + 0.4vw, 1.25rem)', { lineHeight: '1.7' }],
        body: ['1rem', { lineHeight: '1.65' }],
        small: ['0.875rem', { lineHeight: '1.55' }],
        eyebrow: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.16em', fontWeight: '500' }],
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'var(--section-y)',
        nav: 'var(--navbar-h)',
      },
      maxWidth: {
        content: '72rem',
        'prose-lg': '44rem',
      },
      borderRadius: {
        control: 'var(--radius-control)',
        card: 'var(--radius-card)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        lift: 'var(--shadow-lift)',
        glow: 'var(--shadow-glow)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.6' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) both',
        shimmer: 'shimmer 2s linear infinite',
        'pulse-ring': 'pulseRing 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
