const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackChunkHash = require("webpack-chunk-hash");

const baseConfig = require('./webpack/base');
const config = require('./webpack/config');
const defPath = config.defPath;
const APP_PATH = defPath.APP_PATH;

module.exports = webpackMerge(baseConfig(), {
	entry: {
		app: defPath.ENTRY_PATH,
		vendor: config.vendor
	},
	output: {
		path: defPath.BUILD_PATH,
		// 所有输出文件的目标路径
		filename: 'js/bundle.js?[chunkhash:10]',
		publicPath: 'http://xxx.xxx.xxx/',
		chunkFilename: 'chunk.js?[chunkhash:10]'
	},
	module: {
		rules: [
			{
				test: /\.(scss|sass|css)$/,
				include: APP_PATH,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: false,
								plugins: (loader) => [
									autoprefixer(config.autoConfig)
								]
							}
						},
						'sass-loader' + config.sassLoaderProd
					]
				})
			}, {
				test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
				include: APP_PATH,
				loader: 'url-loader?limit=8192&name=imgs/[name].[ext]?[hash:10]'
			}
		]
	},
	plugins: [
		new webpack.HashedModuleIdsPlugin(),
		new WebpackChunkHash(),
      new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new webpack.optimize.UglifyJsPlugin(config.uglifyJsConfig),
		new webpack.optimize.CommonsChunkPlugin({
			names: [
				'vendor', 'manifest'
			],
			filename: 'js/[name].js?[chunkhash:10]',
			minChunks: Infinity
		}),
		new ChunkManifestPlugin({
         filename: 'chunk-manifest.json',
         manifestVariable: 'webpackManifest'
      }),
		new ExtractTextPlugin({
         filename: 'css/styles.css?[contenthash:10]',
         disable: false,
         allChunks: true
      })
	]
})
