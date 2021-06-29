'use strict';

/*
   production 环境下 webpack 配置文件
*/

const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');
const utils = require('../utils/tools');

module.exports = (prodConfig) => {
  const namedAssets = utils.resolve(prodConfig.staticDir);
  const reportPlugin = [];
  const baseProdConfig = baseWebpackConfig(prodConfig);

  if (prodConfig.bundleAnalyzerReport) {
    const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

    reportPlugin.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8888,
        reportFilename: `${prodConfig.reportPath}/${process.env.NODE_ENV}/report.html`,
        defaultSizes: 'parsed',
        openAnalyzer: false,
        generateStatsFile: true,
        statsFilename: `${prodConfig.reportPath}/${process.env.NODE_ENV}/stats.json`,
        statsOptions: null,
        logLevel: 'info',
      }),
    );
  }

  return merge(baseProdConfig, {
    mode: 'production',
    devtool: false,
    optimization: {
      ...baseProdConfig.optimization,
      minimize: true,
      minimizer: [
        `...`, // 不可删，webpack 5 提供，代表集成默认的 minimizer 配置
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: ['default', {discardComments: { removeAll: true }}],
          },
        }),
      ]
    },
    bail: true, // 在第一个错误出错时抛出，而不是无视错误。
    cache: false, // prod 禁用缓存
    // externals: prodConfig.externals,
    plugins: [
      new MiniCssExtractPlugin({
        ignoreOrder: true,
        filename: namedAssets('css/[name].[contenthash:6].css'),
        chunkFilename: namedAssets('css/[name].[contenthash:6].css'),
        // insert: '#some-element' // 表示将生成的 link 标签插入到id=some-element 的元素后边
      }),
      new ESLintWebpackPlugin({
        lintDirtyModulesOnly: false, // prod build 检查所有文件
        threads: true, // 开启多线程
        formatter: 'stylish', // 报错输出格式化
      }),
      ...reportPlugin,
    ],
  });
};
