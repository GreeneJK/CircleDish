/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core Palette
        primary: '#1e3d58',        // Deep navy blue for CTAs and brand
        background: '#fafafa',     // Off-white for premium feel
        surface: {
          light: '#e8eef1',        // Light blue-gray for cards
          blue: '#43b0f1',         // Bright blue for modals
        },
        accent: {
          sage: '#87a96b',         // Subtle sage green
          terracotta: '#d4a574',   // Warm terracotta
          slate: '#6b7280',        // Soft slate gray
        },
        // Semantic color mappings
        'navy': '#1e3d58',
        'light-blue': '#43b0f1',
        'pale-blue': '#e8eef1',
        'off-white': '#fafafa',
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'Geist', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      spacing: {
        '20': '80px', // Generous whitespace for landing sections
      },
      animation: {
        'subtle-scale': 'subtleScale 0.2s ease-in-out',
      },
      keyframes: {
        subtleScale: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
