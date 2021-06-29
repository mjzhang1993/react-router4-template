'use strict';
/**
 * development 环境下 webpack 配置文件
 * NOTICE: 考虑到随着业务搭建，可能会有更多的 webpack 配置，这里暂时不与 webpack.base.config 合并
 * */

const path = require('path');
const {merge} = require('webpack-merge');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');

module.exports = (devConfig) => {
  const baseDevWebpackConfig = baseWebpackConfig(devConfig);
  // hot reload 暂时禁止使用

  return merge(baseDevWebpackConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    entry: {
      main: devConfig.entryPath,
    },
    cache: {
      type: 'filesystem', // filesystem 缓存在文件系统，这样下次编译会有缓存的性能加成
      cacheDirectory: path.join(devConfig.cacheDir, 'webpack'), // cache 存放地址
      store: 'pack', // 设置编译器闲置时存放
      buildDependencies: {
        config: [devConfig.context] // 依赖项地址
      }
    },
    // externals: devConfig.externals,
    plugins: [
      // ...(devConfig.isHotReload ? [new webpack.HotModuleReplacementPlugin()] : []),
      new ESLintWebpackPlugin({
        lintDirtyModulesOnly: true, // 仅检查变更文件，首次 start 不校验
        threads: true, // 开启多线程
        formatter: 'stylish', // 报错输出格式化
      }),
    ],
  });
};
