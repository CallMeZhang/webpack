const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const env = process.env.NODE_ENV

module.exports = {
	resolve: {
		alias: {
			"@": "/static",
		},
	},
	entry: {
		home: './src/views/home/index.js',
		about: './src/views/about/index.js',
		stylus: './src/views/stylus/index.js',
		lazyLoad: './src/views/lazyLoad/lazyLoad.js',
		index: './src/views/index/index.js',
		vendor: ['art-template/lib/template-web.js']
	},
	output: {
		path: path.resolve(__dirname, "dist"), // string 默认
		chunkFilename: '[name].bundle.[chunkhash].js',
		filename: '[name].[hash].js',
		// publicPath: "http://cdn.example.com/assets/"
	},
	externals: {//从输出的 bundle 中排除依赖 不将lodash打包到bundle中
		lodash:'_',
		// lodash: { //youwenti
		// 	commonjs: 'lodash',//可以将 library 作为一个 CommonJS 模块访问。
		// 	commonjs2: 'lodash',//和上面的类似，但导出的是 module.exports.default.
		// 	amd: 'lodash',//类似于 commonjs，但使用 AMD 模块系统。
		// 	root: '_'//可以通过一个全局变量访问 library（例如，通过 script 标签）。
		// },
		// jquery:'jQuery'
		// jquery: {
		// 	commonjs2: 'jQuery',//和上面的类似，但导出的是 module.exports.default.
		// 	root: '$'//可以通过一个全局变量访问 library（例如，通过 script 标签）。
		// }
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: "babel-loader"
		}, {
			test: /\.css$/,
			use:  ['style-loader',{loader:"css-loader",options:{ importLoaders: 1}},'postcss-loader']/*ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [ 'css-loader' ]
			})*/
		}, {
			test: /\.less/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					{loader:"css-loader",options:{ importLoaders: 2}},
					'postcss-loader',
					'less-loader'
				]
			}),
		}, {
			test: /\.(svg|jpg|gif)$/,
			use: ['file-loader']
		}]
	},
	plugins: [
		new ExtractTextPlugin('[name].css'),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g, //一个正则表达式，指示应优化\最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
			cssProcessor: require('cssnano'), //用于优化\最小化CSS的CSS处理器，默认为cssnano。这应该是一个跟随cssnano.process接口的函数（接收CSS和选项参数并返回一个Promise）。
			cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给cssProcessor的选项，默认为{}
			canPrint: true //一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
		}),
		new CopyWebpackPlugin([ // 复制插件
			{from: path.join(__dirname, '/static'), to: path.join(__dirname, '/dist/static/')}
		]),
		new HtmlWebpackPlugin({
			chunks: ['stylus','runtime','vendorChunks','commons'],
			title: 'stylus',
			header: '123',
			// Required
			favicon:'./static/favicon.ico',
			inject: 'body',
			template: "./src/views/stylus/stylus.html",
			filename: 'stylus.html',
		}),
		new HtmlWebpackPlugin({
			chunks: ['lazyLoad','runtime','vendorChunks'],
			title: 'lazyLoad',
			header: '123',
			// Required
			favicon:'./static/favicon.ico',
			inject: 'body',
			template: "./src/views/lazyLoad/lazyLoad.html",
			filename: 'lazyLoad.html',
		}),
		new HtmlWebpackPlugin({
			chunks: ['home','runtime','vendorChunks','default~home~index'],
			title: 'home',
			header: '123',
			// Required
			inject: 'body',
			template: "./src/views/home/home.html",
			filename: 'home.html',
		}),
		new HtmlWebpackPlugin({
			chunks: ['about','runtime'],
			title: 'My App5136',
			header: '123',
			// Required
			inject: 'body',
			template: "./src/views/about/index.html",
			filename: 'about.html',
		}),
		new HtmlWebpackPlugin({
			chunks: ['index','runtime','default~home~index','vendorChunks'],
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
			name: 'vendorChunks',// split 的 chunks name
			cacheGroups: {//缓存组
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				},
				commons: {
					name: 'commons',    //提取出来的文件命名
					chunks: 'initial',  //initial表示提取入口文件的公共部分
					minChunks: 2,       //表示提取公共部分最少的文件数
					minSize: 0          //表示提取公共部分最小的大小
				}
			}
		},
		runtimeChunk:{
			name: 'runtime'
		}
	},
};