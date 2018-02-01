'use strict';
/*
   development 环境下 webpack 配置文件，安装 plugins
*/
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');
const utils = require('./utils');
const config = require('../config/index');
const common = config.common;
const current = utils.getEnvAndConf(config);

module.exports = merge(baseWebpackConfig, {
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
   plugins: [
      new CleanWebpackPlugin(['dev'], { root: common.context }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': current.conf.env.NODE_ENV }),
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
      new webpack.optimize.CommonsChunkPlugin({ name: 'runtime' }),
      new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsPlugin()
   ]
});
