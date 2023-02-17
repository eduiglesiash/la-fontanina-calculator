/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'lf-brown-200': '#EBE5D5',
				'lf-brown-500': '#A47A61',
				'lf-blue': '#6EC1E4',
				'lf-black': '#2E2E39',
				'lf-green': '#63633F'

			}
		},
	},
	plugins: [],
}
