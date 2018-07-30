'use strict';
/* eslint-disable */

const utils = require('./utils');
const config = require('../config/index');
const common = config.common;
const currentConfig = config.production;

// 设置环境变量
if (!process.env.NODE_ENV) {
   process.env.NODE_ENV = JSON.parse(currentConfig.env.NODE_ENV);
}

/*
   production 环境下 webpack 配置文件，安装 plugins
*/
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const safeParser = require('postcss-safe-parser');
const baseWebpackConfig = require('./webpack.base.config');

// 打包信息展示插件
let reportPlugin = [];

if (currentConfig.bundleAnalyzerReport) {
   const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

   reportPlugin.push(new BundleAnalyzerPlugin());
}

// workbox 插件
let workboxPlugin = [];

if (currentConfig.needWorkboxSW) {
   const WorkboxPlugin = require('workbox-webpack-plugin');
   const defaultConfig = {
      cacheId: 'webpack-pwa',
      skipWaiting: true,
      clientsClaim: true,
      swDest: 'service-wroker.js',
      // 一下两个配置不在需要
      // globPatterns: ['**/*.{html,js,css,png.jpg}'],
      // globIgnores: [ 'service-wroker.js' ],
      runtimeCaching: [
         {
            urlPattern: /.*\.js/,
            handler: 'networkFirst' // 网络优先
         }
      ]
   };
   workboxPlugin.push(new WorkboxPlugin.GenerateSW(currentConfig.workboxConfig || defaultConfig));
}

module.exports = merge(baseWebpackConfig, {
   mode: 'production',
   devtool: currentConfig.productionSourceMap ? '#source-map' : false,
   module: {
      rules: [
         {
            test: /\.(scss|sass|css)$/,
            include: common.sourceCode,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
         }
      ]
   },
   optimization: {
      splitChunks: {
         cacheGroups: {
            commons: {
               chunks: 'initial',
               minChunks: 2,
               maxInitialRequests: 5,
               minSize: 0
            },
            vendor: {
               test: /node_modules/,
               chunks: 'initial',
               name: 'vendor',
               priority: 10,
               enforce: true
            },
            styles: {
               name: 'styles',
               test: /\.scss$/,
               chunks: 'all',
               enforce: true
            }
         }
      },
      runtimeChunk: {
         name: 'runtime'
      }
   },
   plugins: [
      new CleanWebpackPlugin(['dist'], { root: common.context }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new OptimizeCSSPlugin({
         cssProcessorOptions: {
            parser: safeParser,
            discardComments: {
               removeAll: true
            }
         }
      }),
      new MiniCssExtractPlugin({
         filename: utils.resolve(currentConfig.assetsSubDirectory)('css/[name].[contenthash].css')
      }),
      new CopyWebpackPlugin([
         {
            from: 'src/manifest.json',
            to: 'manifest.json'
         },
         {
            from: 'src/icon.png',
            to: 'static/imgs/icon.png'
         }
      ]),
      ...workboxPlugin,
      ...reportPlugin
   ]
});
