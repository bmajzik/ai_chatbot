/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.15rem',  // 2.4px - subtle rounding for header
      },
      colors: {
        brand: {
          // "Warm & Earthy" ColorCombo 2024 Palette
          slate: '#62868D',          // Slate Blue - main background
          'slate-dark': '#516F77',   // Darker slate for depth
          'slate-light': '#7A9CA4',  // Lighter slate for hover

          terracotta: '#D78B7D',     // Terracotta/Rose - primary accent
          'terracotta-dark': '#C5746A', // Darker terracotta
          'terracotta-light': '#E2A396', // Lighter terracotta

          cream: '#F9F3E3',          // Warm Cream - cards/surfaces
          'cream-dark': '#F0E8D3',   // Slightly darker cream

          beige: '#CFC8B5',          // Warm Beige - borders/secondary
          'beige-dark': '#B8B19E',   // Darker beige
          'beige-light': '#E0DBCA',  // Lighter beige

          // Text colors for this palette
          'text-primary': '#2D3E45', // Dark text on light backgrounds
          'text-secondary': '#5A6C73', // Medium emphasis
          'text-light': '#F9F3E3',   // Light text on dark backgrounds
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
