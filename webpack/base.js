
const webpack = require('webpack');
// const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./config');
const API = require('./API');
const defPath = config.defPath;
const APP_PATH = defPath.APP_PATH;

module.exports = function () {
   return {
      context: defPath.ROOT_PATH,
      resolve: {
         modules: [
            APP_PATH,
            'node_modules'
         ],
         // 用于查找模块的目录
         extensions: [
   			'.js', '.json', '.jsx', '.css'
   		]
   		// 使用的扩展名
      },
      // 解析模块请求的选项
      cache: true,
      module: {
         rules: [
            {
               enforce: 'pre',
      			test : /\.(js|jsx)$/,
               include : APP_PATH,
               loader : 'eslint-loader',
               options: {
                  configFile: defPath.ESLINT_PATH
               }
            },
            {
               test: /\.(js|jsx)$/,
   				include: APP_PATH,
   				loader: 'babel-loader'
            },
            {
               test: require.resolve(defPath.REQUEST_PATH),
               loader: 'imports-loader?baseUrl=>'+ JSON.stringify( API[ process.env.NODE_ENV || 'development' ] )
            }
         ]
      },
      plugins: [
         // new webpack.LoaderOptionsPlugin({
         //    options: {
         //       context: '/',
         //       minimize: true,
         //       postcss: [autoprefixer(config.autoConfig)]
         //    }
         // }),
         new webpack.optimize.ModuleConcatenationPlugin(),
         new HtmlWebpackPlugin({
   			template: defPath.TPL_PATH,
   			title: 'Hello World app',
   			filename: 'index.html',
   			inject: 'body',
   			minify: {
   				removeComments: true
   			},
   			cache: false
   		})
      ]
   }
}
