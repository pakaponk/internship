/* eslint-disable */

var webpackMerge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var commonConfig = require('./webpack.common.js')
var helpers = require('./helpers')

module.exports = webpackMerge(commonConfig, {
	devtool: 'eval',

	output: {
		path: helpers.root('public'),
		filename: 'js/[name].js',
		chunkFilename: 'js/[id].chunk.js'
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html'
		}),
		new ExtractTextPlugin({
			filename: '[name].css'
		})
	],

	devServer: {
		host: '0.0.0.0',
		port: '8888',
		contentBase: helpers.root(),
		historyApiFallback: true,
		stats: 'minimal',
		proxy: {
			'/web' : 'http://localhost/internship/public',
			'/images': 'http://localhost/internship/public'
		}
	}
})
