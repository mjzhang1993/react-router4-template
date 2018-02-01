'use strict';
/*
   开发配置文件
*/
const ip = require('ip').address();
const utils = require('../build/utils');
const resolve = utils.resolve(__dirname, '../');
module.exports = {
   common: {
      context: resolve(''),
      sourceCode: resolve('src'),
      // 封装的请求模块位置，用于注入请求与服务器地址
      requestModule: resolve('src/api/request.js')
   },
   development: {
      env: { NODE_ENV: JSON.stringify('development') },
      port: process.env.PORT || 8273, // 设置开发时端口号
      devServerIp: ip,
      basicRequestLink: `http://${ip}:3167`,
      entryPath: null, // 默认为 './src/index.js'
      assetsRoot: resolve('dev'), // 编译后的静态资源路径
      assetsSubDirectory: 'static', // 二级资源路径
      assetsPublicPath: '/' // 编译发布的根目录
   },
   production: {
      env: { NODE_ENV: JSON.stringify('production') },
      basicRequestLink: `http://${ip}:3167`, // 生产时设置为服务器地址
      entryPath: null, // 默认为 './src/index.js'
      assetsRoot: resolve('dist'), // 编译后的静态资源路径
      assetsSubDirectory: 'static',
      assetsPublicPath: '/',
      productionSourceMap: false, // js sourceMap
      bundleAnalyzerReport: utils.shouldReport() // 是否显示 report
   }
};
