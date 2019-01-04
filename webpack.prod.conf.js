const path = require('path');

module.exports = {
	entry: {
		index:'./src/index.js',
		main:'./src/main.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
};