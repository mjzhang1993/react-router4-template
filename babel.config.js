module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        modules: false,
        loose: true,
        bugfixes: true,
        useBuiltIns: false,
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'classic',
      },
    ],
    '@babel/preset-typescript',
  ];
  const plugins = [
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-transform-classes', { loose: true }],
    ['@babel/plugin-transform-runtime', { corejs: false, helpers: true, regenerator: true }],
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }, 'antd'],
  ];

  return { presets, plugins, ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/]};
};
