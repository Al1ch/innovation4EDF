/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config, options) {
	  // Ajoutez la règle pour les fichiers SVG
	  config.module.rules.push({
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	  });
  
	  // Ajoutez "canvas" aux externals
	  config.externals.push('canvas');
  
	  return config;
	},
	experimental: {
	  serverActions: true,
	},
  };
  
  module.exports = nextConfig;
  