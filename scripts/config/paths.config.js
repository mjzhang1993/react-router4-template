'use strict';
/*
   开发配置文件
*/
const utils = require('../utils/tools');
const resolve = utils.resolve(__dirname, '../../');

module.exports = (NODE_ENV) => {
  const isDev = NODE_ENV === 'development';
  const vendorPackages = {
    vendor: [],
  };
  // dllPackages 有顺序
  const dllPackages = [
    {name: 'basic', packages: ['react','react-dom']},
    {name: 'tool', packages: ['lodash', 'axios']}
  ]
  const externals = [];

  return  {
    context: resolve(''),
    sourceCode: resolve('src'),
    publicPath: '/',
    buildPath: resolve(isDev ? 'dev': 'build'),
    staticDir: 'static',
    dllStaticDir: 'static/dll',
    commonPath: resolve('src/common'),
    entryPath: resolve(`src/index.tsx`),
    htmlTemplate: resolve(`src/index.html`),
    reportPath: resolve(`report`),
    cacheDir: resolve(`node_modules/.cache`),
    htmlParameter: {}, // html 传的变量
    vendorPackages: vendorPackages,
    dllPackages: dllPackages,
    externals: externals,
    dllPath: resolve('dll'),
    bundleAnalyzerReport: false,
    dllGuide: {},
    alias: {
      store: resolve('src/store')
    },
    antdTheme: {},
    mfConfig: { // 模块联邦配置
      // remotes: {
      //   'app': 'app@http://localhost:3003/remoteEntry.js'
      // },
      // exposes: {
      //   './base/GlobalContext': './base/GlobalContext'
      // },
      // shared: ['echarts']
    },
    proxy: {}, // dev-server 的代理接口
    webpackEnvironment: { // 定义那些es 新特性可以显示在打包后代码中
      arrowFunction: false,
      const: false,
      destructuring: false,
      forOf: false
    }
  }
};
