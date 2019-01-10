const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	devtool: 'source-map',
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true
		}),

	],
	optimization:{
		splitChunks: {
			chunks: "async",//插件作用的chunks范围
			minSize: 30000,//代码块的最小尺寸
			minChunks: 1,//在分割之前模块的被引用次数
			maxAsyncRequests: 5,//按需加载最大并行请求数量
			maxInitialRequests: 3,//一个入口的最大并行请求数量
			automaticNameDelimiter: '~',//模块名字链接符号'vendors~main.js'
			name: true,// split 的 chunks name
			cacheGroups: {//缓存组
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		},
		runtimeChunk:{
			name: 'runtime'
		}
	},
});