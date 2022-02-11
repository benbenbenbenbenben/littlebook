import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import makeAttractionsImporter from 'attractions/importer.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			scss: {
				importer: makeAttractionsImporter({
					themeFile: 'src/theme.scss'
				}),
				prependData: '@use "src/variables.scss" as *;'
			}
		})
	],
	
	kit: {
		adapter: adapter(),

		vite: {
			css: {
				preprocessorOptions: {
					scss: {
						additionalData: '@use "src/variables.scss" as *;'
					}
				}
			}
		}
	}
};

export default config;
