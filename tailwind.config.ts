import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#0ea5e9',
        'accent-dark': '#0284c7',
        'accent-light': '#38bdf8',
        gold: '#f7ab0a',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'Consolas', 'monospace'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.5) rotate(-10deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0) translateY(20px)' },
          '50%': { transform: 'scale(1.1) translateY(-5px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        backgroundZoom: {
          '0%': { transform: 'scale(1.2)', filter: 'blur(10px)' },
          '100%': { transform: 'scale(1)', filter: 'blur(0px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        ping: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '70%': { transform: 'scale(1.1)', opacity: '0.2' },
          '100%': { transform: 'scale(0.8)', opacity: '0' },
        },
        rotate: {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        rotateReverse: {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(-360deg)' },
        },
        ringRotate: {
          '0%': { transform: 'rotate(0deg)', borderTopColor: '#0ea5e9' },
          '50%': { borderTopColor: '#38bdf8' },
          '100%': { transform: 'rotate(360deg)', borderTopColor: '#0ea5e9' },
        },
        logoBreathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        progressFlow: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-scale': 'fadeInScale 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s backwards',
        'slide-in-up': 'slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) backwards',
        'slide-in-right': 'slideInRight 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s backwards',
        'pop-in': 'popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) backwards',
        'bg-zoom': 'backgroundZoom 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        shimmer: 'shimmer 2s linear infinite',
        spin: 'spin 1s linear infinite',
        ping: 'ping 2.5s ease-out infinite',
        rotate: 'rotate 30s linear infinite',
        'rotate-reverse': 'rotateReverse 30s linear infinite',
        'ring-rotate': 'ringRotate 2s linear infinite',
        'logo-breathe': 'logoBreathe 3s ease-in-out infinite',
        'progress-flow': 'progressFlow 2s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
