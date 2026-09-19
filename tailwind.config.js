/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          darkest: '#051f13',
          dark: '#0a321e',
          forest: '#0f3d26',
          primary: '#14532d',
          emerald: '#16a34a',
          accent: '#10b981',
          lime: '#84cc16',
          light: '#f0fdf4',
          subtle: '#f4f9f4'
        },
        harvest: {
          amber: '#d97706',
          gold: '#f59e0b',
          earth: '#92400e',
          light: '#fef3c7',
          warm: '#fffbeb'
        },
        eco: {
          canvas: '#f8faf7',
          card: '#ffffff',
          border: '#e6ece4',
          text: '#0f172a',
          muted: '#64748b'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'flow-dash': 'flowDash 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        flowDash: {
          to: { strokeDashoffset: '-1000' }
        }
      }
    },
  },
  plugins: [],
}
