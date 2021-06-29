'use strict';
/*
   webapck 通用
*/
const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const loadersConfig = require('./loaders.config');
const {configHtmlPlugin} = require('./htmlPlugins.config');
const utils = require('../utils/tools');
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;

module.exports = (currentConfig) => {
  const namedAssets = utils.resolve(currentConfig.staticDir);
  const isDev = process.env.NODE_ENV !== 'production';
  const rules = loadersConfig(currentConfig);
  const htmlPlugins = configHtmlPlugin(currentConfig);
  const { vendor } = currentConfig.vendorPackages;
  const dllGuide = currentConfig.dllGuide;
  let dllPlugins = [];

  if (dllGuide && dllGuide.hasDll) {
    dllPlugins = dllGuide.dlls.map(dll => new webpack.DllReferencePlugin({
      context: currentConfig.context,
      manifest: require(path.resolve(currentConfig.dllPath, dll.manifest)),
      name: `dll_${dll.name}`,
    }));
  }

  return {
    context: currentConfig.context,
    entry: {
      main: currentConfig.entryPath,
    },
    target: 'web',
    output: {
      pathinfo: isDev,
      clean: false, // 交给外部处理
      path: currentConfig.buildPath,
      publicPath: currentConfig.publicPath,
      filename: namedAssets(isDev ? 'js/[name].js' : 'js/[name].[contenthash:6].js'),
      chunkFilename: namedAssets(isDev ? 'chunk/[name].js' : 'chunk/[name].[contenthash:6].js'),
      environment: currentConfig.webpackEnvironment,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss'], // 尽量的减少条目，这样可以减少文件系统的调用次数
      modules: ['node_modules', currentConfig.sourceCode],
      alias: currentConfig.alias || {},
      symlinks: false,
    },
    // 性能提示，打包文件过大不提示 warning
    performance: {
      hints: false,
    },
    optimization: {
      chunkIds: isDev ? 'named' : 'deterministic',
      moduleIds: isDev ? 'named' : 'deterministic',
      splitChunks: {
        // 提取规则
        cacheGroups: {
          mainJS: {
            chunks: 'initial',
            minChunks: 2,
            name: 'main',
            maxInitialRequests: 5,
            minSize: 0,
          },
          vendor: {
            test: new RegExp(`[\\\\/]node_modules[\\\\/](${vendor.join('|')})[\\\\/]`),
            priority: 1,
            chunks: 'all',
            name: 'vendor',
            enforce: true,
          },
          styles: {
            name: 'main-style',
            type: 'css/mini-extract',
            chunks: 'all',
            enforce: true,
          },
          default: {
            minSize: 100000,
            minChunks: 2,
          },
        },
      },
      runtimeChunk: false, // MF 报错
    },
    module: {
      // 使缺少的导出报 error 而不是 warning
      strictExportPresence: true,
      // noParse: /lodash|moment|validator|qs|immutable/, // MF 报错
      rules: rules,
    },
    plugins: [
      // 全局常量配置
      new webpack.DefinePlugin({
        RUNTIME_NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }),
      // 自动加载模块而不必导出 import
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
        _: 'lodash',
        immer: 'immer'
      }),
      // 忽略对某些模块的打包
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      ...(_.isEmpty(currentConfig.mfConfig) ? [] : [new ModuleFederationPlugin(currentConfig.mfConfig)]),
      ...dllPlugins,
      ...htmlPlugins,
    ],
  };
};
