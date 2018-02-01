'use strict';
/*
   webapck 基础配置
*/
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 根据模板生成 HTML
const packageConfig = require('../package.json');
const config = require('../config/index');
const utils = require('./utils');
const common = config.common;
const current = utils.getEnvAndConf(config);
const namedAssets = utils.resolve(current.conf.assetsSubDirectory);

module.exports = {
   context: common.context,
   entry: utils.computeEntry(config, packageConfig),
   output: utils.computeOutput(config),
   cache: true,
   resolve: {
      extensions: ['.js', '.json', '.jsx', '.css'],
      modules: ['node_modules', common.sourceCode]
   },
   module: {
      rules: [
         // {
         // 	test: /\.bundle\.js$/,
         // 	loader: 'bundle-loader',
         // 	include: common.sourceCode,
         // 	options: {
         // 		lazy: true,
         // 		name: '[name]'
         // 	}
         // },
         {
            test: /\.(js|jsx)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: common.sourceCode,
            options: {
               formatter: require('eslint-friendly-formatter')
            }
         },
         {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            include: common.sourceCode
         },
         {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
               limit: 10000,
               name: namedAssets(current.env !== 'production' ? 'imgs/[name].[ext]' : 'imgs/[name].[hash:10].[ext]')
            }
         },
         {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
               limit: 10000,
               name: namedAssets(current.env !== 'production' ? 'media/[name].[ext]' : 'media/[name].[hash:10].[ext]')
            }
         },
         {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
               limit: 10000,
               name: namedAssets(current.env !== 'production' ? 'fonts/[name].[ext]' : 'fonts/[name].[hash:10].[ext]')
            }
         },
         {
            test: require.resolve(common.requestModule),
            loader: 'imports-loader?basicRequestLink=>' + JSON.stringify(current.conf.basicRequestLink)
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: utils.resolve(common.sourceCode)('index.html'),
         filename: 'index.html',
         inject: 'body',
         minify: false,
         xhtml: true,
         cache: false
         // favicon: ''
      })
   ]
};
