'use strict';
/* eslint-disable */

/*
   production 环境下 webpack 配置文件，安装 plugins
*/
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');
const utils = require('./utils');
const config = require('../config/index');
const common = config.common;
const current = utils.getEnvAndConf(config);

let reportPlugin = [];

if (current.conf.bundleAnalyzerReport) {
   const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

   reportPlugin.push(new BundleAnalyzerPlugin());
}

module.exports = merge(baseWebpackConfig, {
   devtool: current.conf.productionSourceMap ? '#source-map' : false,
   module: {
      rules: [
         {
            test: /\.(scss|sass|css)$/,
            include: common.sourceCode,
            use: ExtractTextPlugin.extract({
               fallback: 'style-loader',
               use: utils.computeStyleLoader(true, ['css-loader', 'postcss-loader', 'sass-loader'])
            })
         }
      ]
   },
   plugins: [
      new CleanWebpackPlugin(['dist'], { root: common.context }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': current.conf.env.NODE_ENV }),
      new ExtractTextPlugin({
         filename: utils.resolve(current.conf.assetsSubDirectory)('css/[name].[contenthash:10].css'),
         disable: false,
         allChunks: true
      }),
      new OptimizeCSSPlugin({ cssProcessorOptions: { safe: true } }),
      new webpack.optimize.UglifyJsPlugin({
         compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
         },
         comments: false,
         space_colon: false
      }),
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
      new webpack.optimize.CommonsChunkPlugin({ name: 'runtime' }),
      ...reportPlugin
   ]
});
