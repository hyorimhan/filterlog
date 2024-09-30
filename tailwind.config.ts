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
        'custom-green': {
          500: '#9EE54E',
        },
        'custome-white': { 50: '#F5F5F5' },
        'custome-orange': { 1: '#F27E39', 2: '#F79638' },
        ballons: '#ffffe1',
        'footer-blue': { 1: '#215ADE', 2: '#4A9CEF' },
      },
      fontFamily: {
        gulim: ['굴림', 'Gulim', 'sans-serif'],
        dotum: ['Dotum', '돋움'],
        tahoma: ['Tahoma', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
