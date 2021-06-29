'use strict';

/*
 * npm start ...
 * */

// 设置环境变量
process.env.NODE_ENV = 'development';

// promise reject 报错未 catch 的处理
process.on('unhandledRejection', (err) => {
  throw err;
});

const { parseCommandLine } = require('./utils/parseCommandLine');
const params = parseCommandLine();

// 开始构建
const _ = require('lodash');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const pathConfig = require('./config/paths.config');
const webpackConfig = require('./config/webpack.dev.config');
const devServerConfig = require('./config/devServer.config');
const {findDLLFile} = require('./utils/findDLLFile');

const devConfig = pathConfig(process.env.NODE_ENV);

// webpack 的配置替换
_.set(devConfig, 'dllGuide', findDLLFile(devConfig, process.env.NODE_ENV));

startServer();

function startServer() {
  const customPort = parseInt(params['port'], 10) || 3032;
  const customHost = process.env.HOST || '0.0.0.0';
  const customProtocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const compiler = webpack(webpackConfig(devConfig));
  const devServerOptions = devServerConfig({
    buildPath: devConfig.buildPath,
    publicPath: devConfig.publicPath,
    customPort,
    customHost,
    customProtocol,
    customProxy: devConfig.proxy,
  });

  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(customPort, customHost);
}
