'use strict';
/*
   生产环境输出编译后文件
*/
const config = require('../config/index');
const prodConfig = config.production;

// 设置环境变量
process.env.NODE_ENV = JSON.parse(prodConfig.env.NODE_ENV);

const webpack = require('webpack');
const ora = require('ora');
const chalk = require('chalk');
const webpackConfig = require('./webpack.prod.config');

// loading
const spinner = ora('building for production...');
spinner.start();

webpack(webpackConfig, function(err, stats) {
   spinner.stop();
   if (err) {
      throw err;
   }
   process.stdout.write(
      stats.toString({
         colors: true,
         modules: false,
         children: false,
         chunks: false,
         chunkModules: false
      }) + '\n\n'
   );

   if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
   }

   console.log(chalk.cyan('  Build complete.\n'));
   console.log(chalk.yellow('  Tip: built files are meant to be served over an HTTP server.\n' + '  Opening index.html over file:// won\'t work.\n'));
});
