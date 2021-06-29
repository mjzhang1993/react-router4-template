'use strict';
/*
   生产环境输出编译后文件
*/

// 设置环境变量
process.env.NODE_ENV = 'production';

// promise reject 报错未 catch 的处理
process.on('unhandledRejection', (err) => {
  throw err;
});

const { parseCommandLine } = require('./utils/parseCommandLine');
const params = parseCommandLine();

// 开始构建
const shell = require('shelljs');
const _ = require('lodash');
const webpack = require('webpack');
const chalk = require('chalk');
const pathConfig = require('./config/paths.config');
const webpackConfig = require('./config/webpack.prod.config');
const { findDLLFile } = require('./utils/findDLLFile');

const prodConfig = pathConfig(process.env.NODE_ENV);

_.set(prodConfig, 'bundleAnalyzerReport', params['report']);
_.set(prodConfig, 'dllGuide', findDLLFile(prodConfig, process.env.NODE_ENV))

// 输出文件夹清空
shell.rm('-rf', 'build');

// loading
console.log('building for production...');

const compiler = webpack(webpackConfig(prodConfig));

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    throw err;
  }

  // report 开启后不输出其他 stdout，否则会打断 report ，报出错误
  if (params['report']) return;

  // 编译结果输出
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n',
  );

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'));
    process.exit(1);
  }

  console.log(chalk.cyan('  Build complete.\n'));
  // compiler.close();
  process.exit(0);
})

