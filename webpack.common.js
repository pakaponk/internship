/* eslint-disable */

var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var helpers = require("./helpers.js")

module.exports = {
	entry: {
		'vendor': './resources/assets/js/vendor.js',
		'app': './resources/assets/js/app.module.js',
	},

	resolve: {
		extensions: ['.js']
	},

	module: {
		rules: [{
			test: /\.js$/,
			exclude: helpers.root('node_modules'),
			use: [{
				loader: 'ng-annotate-loader'
			},
			{
				loader: 'babel-loader',
			}]
		},
		{
			test: /\.html$/,
			include: helpers.root('resources', 'assets', 'js'),
			use: [{
				loader: 'ngtemplate-loader',
			},
			{
				loader: 'html-loader'
			}]
		},
		{
			test: /\.html$/,
			include: path.resolve(__dirname, './index.html'),
			use: [{
				loader: 'html-loader'
			}]
		},
		{
			test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
			use: [{
				loader: 'file-loader?name=assets/[name].[hash].[ext]'
			}]
		},
		{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader', 
				use: 'css-loader?sourceMap',
			})
		}]
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor']
		})
	]
}
