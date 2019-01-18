const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
	resolve: {
		alias: {
			"@": "static",
		},
	},
	entry: {
		app: './src/index.js',
		home: './src/views/home/index.js',
		about: './src/views/about/index.js',
		index: './src/views/index/index.js',
		vendor: ['art-template/lib/template-web.js']
	},
	output: {
		path: path.resolve(__dirname, "dist"), // string 默认
		chunkFilename: '[name].bundle.js',
		filename: '[name].[chunkhash].js',
	},
	externals: {//从输出的 bundle 中排除依赖 不将lodash打包到bundle中
		lodash: {
			commonjs: 'lodash',//可以将 library 作为一个 CommonJS 模块访问。
			commonjs2: 'lodash',//和上面的类似，但导出的是 module.exports.default.
			amd: 'lodash',//类似于 commonjs，但使用 AMD 模块系统。
			root: '_'//可以通过一个全局变量访问 library（例如，通过 script 标签）。
		},
		jquery: {
			commonjs2: 'jQuery',//和上面的类似，但导出的是 module.exports.default.
			root: '$'//可以通过一个全局变量访问 library（例如，通过 script 标签）。
		}
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: "babel-loader"
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.less/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'less-loader']
			}),
		}, {
			test: /\.(svg|jpg|gif)$/,
			use: ['file-loader']
		}]
	},
	plugins: [
		new ExtractTextPlugin('[name].css'),
		new CopyWebpackPlugin([ // 复制插件
			{from: path.join(__dirname, '/static'), to: path.join(__dirname, '/dist/static/')}
		]),
		new HtmlWebpackPlugin({
			hash: true,
			chunks: ['home','runtime','vendors~about~app~home~index~vendor','default~home~index'],
			title: 'home',
			header: '123',
			// Required
			inject: 'body',
			template: "./src/views/home/home.html",
			filename: 'home.html',
		}),
		new HtmlWebpackPlugin({
			hash: true,
			chunks: ['about','runtime'],
			title: 'My App5136',
			header: '123',
			// Required
			inject: 'body',
			template: "./src/views/about/index.html",
			filename: 'about.html',
		}),
		new HtmlWebpackPlugin({
			hash: true,
			chunks: ['index','runtime'],
			title: 'webpack',
			// Required
			inject: 'body',
			template: "./src/views/index/index.html",
			filename: 'index.html',
		})
	],
	optimization:{
		splitChunks: {
			chunks: "all",//插件作用的chunks范围
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
};