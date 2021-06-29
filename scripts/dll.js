'use strict';

/*
 * dll 生成脚本
 * */

// promise reject 报错未 catch 的处理
process.on('unhandledRejection', (err) => {
  throw err;
});

const webpack = require('webpack');
const chalk = require('chalk');
const shell = require('shelljs');
const {writeDLLVersion} = require('./utils/findDLLFile');
const pkg = require('../package.json');
const dllConfig = require('./config/webpack.dll.config');
const pathConfig = require('./config/paths.config');

// 文件夹清空
shell.rm('-rf', 'dll');

// dev prod 同时编译
const devConfig = pathConfig('development');
const prodConfig = pathConfig('production');

const compiler = webpack([
  dllConfig('development', devConfig),
  dllConfig('production', prodConfig),
]);

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    throw err;
  }

  // 输出 DLL 依赖版本
  writeDLLVersion(prodConfig, 'production', pkg);

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
  if (
    stats.hasWarnings() &&
    process.env.CI &&
    (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false')
  ) {
    console.log(
      chalk.yellow(
        '\nTreating warnings as errors because process.env.CI = true.\n' +
        'Most CI servers set it automatically.\n',
      ),
    );
    process.exit(1);
  }
  compiler.close();
})
