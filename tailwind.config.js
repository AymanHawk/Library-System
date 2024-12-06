const {
	default: flattenColorPalette,
  } = require("tailwindcss/lib/util/flattenColorPalette");
  
  /** @type {import('tailwindcss').Config} */
  module.exports = {
	content: [
	  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  
	  // Or if using `src` directory:
	  "./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
	  extend: {
		screens: {
			'xs': {'max': '350px'},       
			'sm': '480px',                
			'md': '640px',                
			'norm': {'min': '768px', 'max': '1024px'},               
			'lg': '1024px',               
			'xl': '1280px',              
			'2xl': '1440px',
		},
		colors: {
		  background: "#1E1C1C",
		  primary: "#DCE75C",
		  secondary: "#5D68B0",
		  loading: "#272525",
		},
		extend: {
		  animation: {
			scroll:
			  "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
		  },
		  keyframes: {
			scroll: {
			  to: {
				transform: "translate(calc(-50% - 0.5rem))",
			  },
			},
		  },
		},
		colors: {
		  'background' : '#1E1C1C',
		  'primary': '#DCE75C',
		  'secondary': '#5D68B0',
		  'loading': '#272525'
		}
	  },
	},
	plugins: [addVariablesForColors],
  };
  
  // This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
  function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
	  Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);
  
	addBase({
	  ":root": newVars,
	});
  }