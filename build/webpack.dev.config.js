'use strict';
/*
   development 环境下 webpack 配置文件，安装 plugins
*/
const config = require('../config/index');
const utils = require('./utils');
const common = config.common;
const currentConfig = config.development;

// 设置环境变量
if (!process.env.NODE_ENV) {
   process.env.NODE_ENV = JSON.parse(currentConfig.env.NODE_ENV);
}

const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {
   mode: 'development',
   devtool: '#cheap-module-eval-source-map',
   module: {
      rules: [
         {
            test: /\.(scss|sass|css)$/,
            include: common.sourceCode,
            use: utils.computeStyleLoader(false, ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'])
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
            }
         }
      },
      runtimeChunk: {
         name: 'runtime'
      }
   },
   plugins: [
      new CleanWebpackPlugin(['dev'], { root: common.context }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsPlugin()
   ],
   devServer: {
      contentBase: currentConfig.assetsRoot,
      publicPath: currentConfig.assetsPublicPath,
      historyApiFallback: true,
      //    clientLogLevel: 'none',
      hot: true,
      inline: true,
      compress: true,
      open: true,
      openPage: 'index.html',
      port: currentConfig.port,
      host: currentConfig.devServerIp,
      stats: {
         colors: true,
         errors: true,
         warnings: true,
         modules: false,
         chunks: false
      }
   }
});
