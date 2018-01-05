/*
   一些处理函数
*/
const path = require('path');

exports.getEnvAndConf = function (config) {
   const env = process.env.NODE_ENV;
   const conf = config[env];

   return {env, conf};
}

exports.resolve = function (...basicPath) {
   return function (dir) {
      return path.join(...basicPath, dir || '');
   }
}

exports.computeEntry = function (config, packageConfig) {
   const {env, conf} = exports.getEnvAndConf(config);
   let entry = {};

   if(env === 'production') {
      entry.app = conf.entryPath || './src/index.js';
   } else if (env === 'development') {
      const {port, devServerIp, entryPath} = conf;
      entry.app = [
         `webpack-dev-server/client?http://${devServerIp}:${port}`,
         'webpack/hot/only-dev-server',
         entryPath || './src/index.js'
      ];
   }

   entry.vendor = Object.keys(packageConfig.dependencies);

   return entry;
}

exports.computeOutput = function (config) {
   const {env, conf} = exports.getEnvAndConf(config);
   const filename = path.join(
      conf.assetsSubDirectory,
      env !== 'production' ? 'js/[name].bundle.js' : 'js/[name].[chunkhash:10].bundle.js'
   );
   const chunkFilename = env !== 'production'
      ? '[id].js'
      : '[id].[chunkhash:10].js';

   const output = {
      path: conf.assetsRoot,
      publicPath: conf.assetsPublicPath,
      filename,
      chunkFilename
   };

   return output;
}

exports.styleLoadersOptions = {
   dev: {
      'sass-loader': {
         outputStyle: 'expanded',
         sourceMapContents: true,
         sourceMap: true
      }
   },
   prod: {
      'sass-loader': {outputStyle: 'expanded'}
   }
}

exports.computeStyleLoader = function (isProduction, loaders) {
   const optionsMap = exports.styleLoadersOptions[isProduction ? 'prod' : 'dev'];
   const defaultOptions = isProduction ? {} : {sourceMap: true};

   return loaders.map(loader => {
      const options = optionsMap[loader] || defaultOptions;

      return {loader, options};
   })
}

exports.shouldReport = function () {
   if (process.env.npm_config_report) {
      return process.env.npm_config_report;
   } 
   
   return process.argv.some((item) => item === '--report');
}