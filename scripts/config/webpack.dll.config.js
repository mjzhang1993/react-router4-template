/**
 * react 相关的动态链接库 DLL
 * */
const path = require('path');
const _ = require('lodash');
const chalk = require('chalk');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, currentConfig) => {
  if (!['development', 'production'].includes(env)) {
    console.log(chalk.red(' The environment must be `development` or `production` .\n'));
    process.exit(1);
  }

  process.env.NODE_ENV = env;
  const isDev = env === 'development';
  const dllPackages = currentConfig.dllPackages;

  if (!_.isArray(dllPackages) || _.isEmpty(dllPackages)) {
    console.log(
      chalk.red(
        ' The `dllPackages` is needed, set dllPackages in loaders.config.js .\n',
      ),
    );
    process.exit(1);
  }

  return {
    mode: env,
    entry: dllPackages.reduce((p, c) => ({...p, [c.name]: c.packages}), {}),
    performance: { hints: false },
    devtool: isDev ? 'source-map' : false, // 开发环境配置 sourceMap 方便 debug
    output: {
      filename: `dll_[name]_[contenthash:6].${env}.js`,
      library: 'dll_[name]',
      // clean: true, // 不能打开 clean ，因为 dll 会构建两个版本 dev prod, clean 会将其中一个删掉
      path: currentConfig.dllPath,
      environment: currentConfig.webpackEnvironment,
      devtoolModuleFilenameTemplate: 'webpack:///[resource-path]?[loaders]',
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true, // 开启多进程
          terserOptions: {
            sourceMap: true,
            format: {comments: false}
          },
          extractComments: false
        })
      ],
      chunkIds: 'named',
      moduleIds: 'named',
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.join(currentConfig.dllPath, `[name]_manifest_${env}.json`),
        name: 'dll_[name]',
        context: currentConfig.context,
      }),
      ...(env === 'production'
        ? [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              analyzerHost: '127.0.0.1',
              analyzerPort: 8887,
              reportFilename: `${currentConfig.context}/report/dll/report.html`,
              defaultSizes: 'parsed',
              openAnalyzer: false,
              generateStatsFile: true,
              statsFilename: `${currentConfig.context}/report/dll/stats.json`,
              statsOptions: null,
              logLevel: 'info',
            }),
          ]
        : []),
    ],
  };
};
