const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const ip = require('ip').address();

const baseConfig = require('./webpack/base');
const config = require('./webpack/config');
const defPath = config.defPath;
const APP_PATH = defPath.APP_PATH;

module.exports = webpackMerge(baseConfig(), {
	devtool: 'cheap-module-source-map',
	entry: {
		app: [
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://' + ip + ':8090',
			'webpack/hot/only-dev-server',
			'./app/js/index.js'
		],
		vendor: config.vendor
	},
	output: {
		path: defPath.DEV_PATH,
		// 所有输出文件的目标路径
		filename: 'js/bundle.js',
		publicPath: '/',
		chunkFilename: '[name].chunk.js'
	},
	// webpack 如何输出结果的相关选项
	module: {
		rules: [
			{
				test: /\.(scss|sass|css)$/,
				include: APP_PATH,
				use: [
					'style-loader',
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
					'sass-loader' + config.sassLoaderSuffix
				]
			}, {
				test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
				include: APP_PATH,
				loader: 'url-loader?limit=8192&name=imgs/[name].[ext]'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: [
				'vendor', 'manifest'
			],
			filename: 'js/[name].js',
			minChunks: Infinity
		}),
		new ChunkManifestPlugin({
         filename: 'chunk-manifest.json',
         manifestVariable: 'webpackManifest'
      })
	],
	devServer: {
		contentBase: defPath.DEV_PATH,
		publicPath: '/',
		historyApiFallback: true,
		clientLogLevel: 'none',
		host: ip,
		port: 8090,
		open: true,
		hot: true,
		inline: true,
		compress: true,
		stats: {
			colors: true,
			errors: true,
			warnings: true,
			modules: false,
			chunks: false
		}
	}
})
