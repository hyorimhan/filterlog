import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-main': "url('/main/main.jpg')",
        'bg-blog': "url('/background.svg')",
      },

      colors: {
        'custom-blue': {
          1000: '#00309C',
          900: '#1442A1',
          800: '#2353B6',
          700: '#5276D6',
          600: '#5A7EDC',
          500: '#D1DBFF',
        },
        'custom-pink': {
          100: '#fce9e9',
          200: '#ff99ae',
        },
        'custom-green': {
          300: '#C5DEDA',
          400: '#92BEA9',
          500: '#9EE54E',
          600: '#659F7C',
          700: '#4F7670',
        },
        'custom-white': { 50: '#F5F5F5' },
        'custom-orange': { 1: '#F27E39', 2: '#F79638' },
        ballons: '#ffffe1',
        'footer-blue': { 1: '#215ADE', 2: '#4A9CEF' },
        header: '#EDE9D3',
        'border-blue': '#0831D9',
        'border-beige': '#DCD8C1',
        'url-border': '#D7D7FF',
        'bg-blue': '#0b61ff',
      },
      fontFamily: {
        gulim: ['굴림', 'Gulim', 'sans-serif'],
        dotum: ['Dotum', '돋움'],
        tahoma: ['Tahoma', 'sans-serif'],
        galmuri: ['Galmuri11', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
