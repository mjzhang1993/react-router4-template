/*
 * dev-server 配置
 * */

module.exports = (option) => {
  return {
    contentBase: option.buildPath,
    publicPath: option.publicPath,
    clientLogLevel: 'silent',
    hot: true,
    inline: true,
    compress: true,
    open: true,
    openPage: '.',
    port: option.customPort,
    host: option.customHost,
    https: option.customProtocol === 'https',
    proxy: option.customProxy,
    watchOptions: {
      ignored: /node_modules/,
    },
    stats: {
      colors: true,
      errors: true,
      warnings: true,
      modules: false,
      chunks: false,
    },
    disableHostCheck: true,
  };
};
