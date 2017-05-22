/* eslint-disable */
var webpack = require('webpack')
var webpackMerge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var commonConfig = require('./webpack.common.js')
var helpers = require('./helpers')

const ENV = process.env.ENV || 'production'

module.exports = webpackMerge(commonConfig, {
	devtool: 'source-map',

	output: {
		path: helpers.root('public', 'dist'),
		publicPath: 'http://localhost/internship/public/dist/',
		filename: '[name].[hash].js',
		chunkFilename: '[id].[hash].chunk.js'
	},

	// htmlLoader: {
	// 	minimize: false // workaround for ng2
	// },

	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.LoaderOptionsPlugin({
			options: {
				htmlLoader: {
					minimize: true
				}
			}
		}),
		new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
			sourceMap: true,
			mangle: {
				keep_fnames: true
			},
		}),
		new HtmlWebpackPlugin({
			filename: 'index.php',
			template: 'index.html',
		}),
		new ExtractTextPlugin('[name].[hash].css'),
		new webpack.DefinePlugin({
			'process.env': {
				'ENV': JSON.stringify(ENV)
			}
		})
	]
})
