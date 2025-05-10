module.exports = {
	webpack: {
	  configure: (webpackConfig) => {
		// Disable source maps for react-datepicker
		webpackConfig.module.rules = webpackConfig.module.rules.map((rule) => {
		  if (rule.loader && rule.loader.includes('source-map-loader')) {
			rule.exclude = /react-datepicker/;
		  }
		  return rule;
		});
		return webpackConfig;
	  },
	},
  };
  