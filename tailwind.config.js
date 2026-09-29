/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          950: '#060913',
          900: '#0b1120',
          850: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          border: 'rgba(51, 65, 85, 0.4)',
          cyan: '#06b6d4',
          'cyan-glow': 'rgba(6, 182, 212, 0.25)',
          emerald: '#10b981',
          'emerald-glow': 'rgba(16, 185, 129, 0.25)',
          amber: '#f59e0b',
          crimson: '#ef4444',
          'crimson-glow': 'rgba(239, 68, 68, 0.25)',
          gold: '#eab308'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'cyber-glow': '0 0 15px rgba(6, 182, 212, 0.2)',
        'emerald-glow': '0 0 15px rgba(16, 185, 129, 0.25)',
        'alert-glow': '0 0 15px rgba(239, 68, 68, 0.3)'
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
}
