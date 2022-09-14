/** @type {import('next').NextConfig} */
const path = require('path');
const transpileModules = require('next-transpile-modules');
const withModules = transpileModules(['html-react-parser']);
const withPlugins = require('next-compose-plugins');

const nextConfig = withPlugins([ withModules],{
	reactStrictMode: true,
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
