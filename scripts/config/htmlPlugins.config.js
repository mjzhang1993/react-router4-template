/**
 * html 生成相关 webpack plugin 配置（包括 copyFile tag）
 * */
const path = require('path');
const _ = require('lodash');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pkg = require('../../package.json');

function configHtmlPlugin(currentConfig) {
  const dllGuide = currentConfig.dllGuide;
  const isDev = process.env.NODE_ENV !== 'production';

  /**
   * 这里将 core-js 做了一个单独的处理 -- copy 后全局引用
   * */
  let coreJsVersion = _.get(pkg, ['dependencies', 'core-js-bundle']);

  if (!coreJsVersion) {
    console.log(
      chalk.red('\n ERROR Must have "core-js-bundle" package in you package.json dependencies \n')
    );
    process.exit(1);
  }
  coreJsVersion = coreJsVersion.replace(/^\^/, '');
  const coreSource = path.join(currentConfig.context, 'node_modules/core-js-bundle/minified.js');
  const coreDest = path.join(currentConfig.dllStaticDir, `core-js@${coreJsVersion}.production.js`,);
  const patterns = [{ from: coreSource, to: coreDest }];
  const tags = [coreDest];

  isDev && patterns.push({
    from: path.join(currentConfig.context, 'node_modules/core-js-bundle/minified.js.map'),
    to: path.join(currentConfig.dllStaticDir, `minified.js.map`,)
  })

  if (dllGuide && dllGuide.hasDll) {
    dllGuide.dlls.map(dll => {
      patterns.push({
        from: path.join(currentConfig.context, 'dll', dll.filename),
        to: path.join(currentConfig.dllStaticDir, dll.filename),
      });
      dll.versionFile && patterns.push({
        from: path.join(currentConfig.context, 'dll', dll.versionFile),
        to: path.join(currentConfig.dllStaticDir, dll.versionFile),
      });
      isDev && patterns.push({
        from: path.join(currentConfig.context, 'dll', `${dll.filename}.map`),
        to: path.join(currentConfig.dllStaticDir, `${dll.filename}.map`),
      })
      tags.push(path.join(currentConfig.dllStaticDir, dll.filename));
    });
  }
  const htmlPlugins = [
    new HtmlWebpackPlugin({
      template: currentConfig.htmlTemplate,
      filename: 'index.html',
      templateParameters: currentConfig.htmlParameter,
      inject: true,
      xhtml: true,
      cache: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new CopyWebpackPlugin({ patterns }),
    new HtmlWebpackTagsPlugin({ tags, append: false, useHash: false }),
  ];

  return htmlPlugins;
}

module.exports = {configHtmlPlugin};
