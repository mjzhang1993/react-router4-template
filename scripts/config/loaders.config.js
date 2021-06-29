/*
 * Loaders plugin 配置
 * */
const os = require('os');
const path = require('path');
const utils = require('../utils/tools');
const _ = require('lodash');
const threadLoader = require('thread-loader');
const chalk = require('chalk');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cpuNumber = Math.min(Math.max(_.get(os.cpus(), 'length', 1) - 1, 1), 4);
console.log(chalk.cyan(`Number of CPU core Used: ${cpuNumber}`));

const jsWorkerPool = {
  workers: cpuNumber,
  poolTimeout: Infinity, // 设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
};

threadLoader.warmup(jsWorkerPool, [
  'babel-loader',
  '@babel/preset-env',
  '@babel/preset-react',
  '@babel/preset-typescript',
]);

module.exports = (currentConfig) => {
  const namedAssets = utils.resolve(currentConfig.staticDir);
  const isDev = process.env.NODE_ENV !== 'production';

  return [
    {
      test: /\.(js|jsx|ts|tsx)$/,
      include: currentConfig.sourceCode,
      exclude: /node_modules/,
      use: [
        {loader: 'thread-loader', options: jsWorkerPool},
        {loader: 'babel-loader', options: {
            exclude: [
              // \\ for Windows, / for macOS and Linux 排除不需要转义的包
              /node_modules[\\/]core-js/,
              /node_modules[\\/]webpack[\\/]buildin/,
            ],
            cacheDirectory: isDev ? path.join(currentConfig.cacheDir, 'babel-loader') : false
        }},
      ],
    },
    {
      test: /\.(scss)$/,
      include: currentConfig.sourceCode,
      use: [
        {loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader},
        {loader: 'css-loader'},
        {loader: 'postcss-loader'},
        {loader: 'sass-loader'},
      ],
    },
    {
      test: /\.css$/,
      include: [/node_modules/, currentConfig.sourceCode],
      use: [
        {loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader},
        {loader: 'css-loader'},
        {loader: 'postcss-loader'},
      ],
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
      generator: {
        filename: namedAssets(isDev ? 'media/[name].[ext]' : 'media/[name].[hash:8].[ext]')
      }
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: namedAssets(isDev ? 'fonts/[name].[ext]' : 'fonts/[name].[hash:8].[ext]')
      }
    },
  ];
};
