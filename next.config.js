/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,

	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	// webpack: (config) => {
	// 	config.plugins = config.plugins || [];

	// 	config.optimization.providedExports = true;

	// 	config.resolve.alias = {
	// 		...config.resolve.alias,
	// 		'~': path.resolve(__dirname, './'),
	// 	};

	// 	return config;
	// },
	images: {
		domains: ['firebasestorage.googleapis.com'],
	},
}

module.exports = nextConfig;
