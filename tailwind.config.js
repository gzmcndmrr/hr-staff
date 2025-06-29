/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
        },
        orange:{
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#ff6101',
          600: '#ea580c',
          700: '#c2410c',
        }
      },
      width: {
        'card': '500px',
        'card-sm': '400px',
        'card-lg': '600px',
        'card-xl': '700px',
        'form-input': '300px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'hover': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'focus': '0 0 0 3px rgba(59, 130, 246, 0.1)',
        'orange': '0 4px 16px rgba(255, 97, 1, 0.2)',
        'deep': '0 12px 32px rgba(0, 0, 0, 0.2)',
        'layered': 'rgba(0, 0, 0, 0.4) 0px 1px 2px, rgba(0, 0, 0, 0.3) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px -1px 0px inset',
      }
    },
  },
  plugins: [],
} 