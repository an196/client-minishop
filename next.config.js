/** @type {import('next').NextConfig} */
const path = require('path');
const transpileModules = require('next-transpile-modules');
const withModules = transpileModules(['html-react-parser']);
const withPlugins = require('next-compose-plugins');

const nextConfig = withPlugins([ withModules],{
	reactStrictMode: true,
	extends: ['next/core-web-vitals', 'prettier'],
	ignorePatterns: ['node_modules', 'dist'],
	parserOptions: {
		babelOptions: {
		  presets: [require.resolve('next/babel')],
		},
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	  },
	webpack: (config) => {
		config.plugins = config.plugins || [];

		config.optimization.providedExports = true;

		config.resolve.alias = {
			...config.resolve.alias,
			'~': path.resolve(__dirname, './'),
		};
	
		return config;
	},
	images: {
		domains: ['firebasestorage.googleapis.com'],
	},
});

module.exports = nextConfig;
