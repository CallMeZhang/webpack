const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const artTemplateLoader =require('art-template')

module.exports = {
	entry: {
		app: './src/index.js',
		home: './src/views/home/index.js',
		about: './src/views/about/index.js',
		index: './src/views/index/index.js'
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
			test: /\.(png|svg|jpg|gif)$/,
			use: ['file-loader']
		}, {
			test: /\.pug$/,
			loader: ['raw-loader', 'pug-html-loader','pug-loader']
		},{
			test: /.art$/,
			use: [ 'art-template-loader' ]
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new ExtractTextPlugin('[name].css'),
		new HtmlWebpackPlugin({
			title: 'My App',
			// Required
			inject: false,
			chunks: ['home'],
			template: require("html-webpack-template-pug"),
			filename: 'home.html',
			// Optional
			appMountId: 'app',
			// appMountId: ['app1', 'app2']
			mobile: true,
			injectExtras: {
				head: [
					{
						tag: 'meta',
						name: 'description',
						content: 'A description of the page'
					},
					"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css",
					{
						tag: 'script',
						href: 'https://unpkg.com/lodash@4.16.6/lodash.js'
					},
				],
				body: [
					'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js',
					'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js',
				]
			},
		}),
		new HtmlWebpackPlugin({
			hash: true,
			chunks: ['about'],
			title: 'My App5136',
			// Required
			inject: 'body',
			template: "./src/views/about/index.html",
			filename: 'about.html',
		}),
		new HtmlWebpackPlugin({
			hash: true,
			chunks: ['index'],
			title: 'My App56',
			// Required
			inject: 'body',
			template: "./src/views/index/layout.pug",
			filename: 'index.html',
		})
	],
};