import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surface
        'pd-bg': '#F4F4F2',
        'pd-bg-2': '#EBEAE5',
        'pd-card': '#FFFFFF',
        'pd-ink': '#0A0A0A',
        'pd-ink-2': '#3A3A38',
        'pd-ink-3': '#7A7A76',
        'pd-line': '#E1DFD8',
        
        // Accent (brand gold)
        'pd-navy': '#C89B37',
        'pd-navy-deep': '#A07A21',
        'pd-navy-soft': '#F3E8CD',
        
        // Semantic
        'pd-success': '#2F6F4E',
        'pd-warning': '#B87514',
        'pd-danger': '#9B2226',
      },
      fontFamily: {
        display: ['Bricolage Grotesque', 'sans-serif'],
        sans: ['Inter Tight', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'pd-sm': '6px',
        'pd-md': '12px',
        'pd-lg': '20px',
        'pd-pill': '999px',
      },
      boxShadow: {
        'pd-sm': '0 1px 2px rgba(10,10,10,0.04), 0 2px 4px rgba(10,10,10,0.02)',
        'pd-md': '0 4px 12px rgba(10,10,10,0.05), 0 12px 28px rgba(10,10,10,0.05)',
        'pd-lg': '0 24px 60px rgba(10,10,10,0.10)',
      },
      animation: {
        'pd-marquee': 'pd-marquee 60s linear infinite',
      },
      keyframes: {
        'pd-marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-33.33%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
