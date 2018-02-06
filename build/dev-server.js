'use strict';
/*
   开发环境启动
*/
const config = require('../config/index');
const devConfig = config.development;

// 设置环境变量
if (!process.env.NODE_ENV) {
   process.env.NODE_ENV = JSON.parse(devConfig.env.NODE_ENV);
}

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const opn = require('opn');
const chalk = require('chalk');
const webpackConfig = require('./webpack.dev.config');
const utils = require('./utils');

const common = config.common;
const resolve = utils.resolve(common.context);

const devServerOptions = {
   contentBase: resolve('dev'),
   publicPath: devConfig.assetsPublicPath,
   historyApiFallback: true,
//    clientLogLevel: 'none',
   hot: true,
   inline: true,
   compress: true,
   openPage: 'index.html',
   stats: {
      colors: true,
      errors: true,
      warnings: true,
      modules: false,
      chunks: false
   }
};

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, devServerOptions);
const { port, devServerIp, basicRequestLink } = devConfig;

server.listen(port, devServerIp, () => {
   const link = `http://${devServerIp}:${port}`;
   console.log(chalk.cyan(`Starting server on ${link}`));
   console.log(chalk.cyan(`development data server on ${basicRequestLink}`));

   opn(link)
      .then(() => {
         console.log(chalk.cyan('success open ...'));
      })
      .catch(err => {
         console.log(chalk.red(err));
      });
});
