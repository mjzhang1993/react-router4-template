module.exports = {
   plugins: ['react', 'jsdoc'],
   parser: 'babel-eslint',
   parserOptions: {
      sourceType: 'module',
      allowImportExportEverywhere: true,
      ecmaVersion: 6,
      ecmaFeatures: {
         jsx: true,
         experimentalObjectRestSpread: true
      }
   },
   env: {
      browser: true,
      node: true,
      es6: true
   },
   rules: {
      // Common js rules
      'brace-style': [
         2,
         '1tbs',
         {
            allowSingleLine: true
         }
      ],
      camelcase: 2,
      curly: 2,
      eqeqeq: 2,
      'no-extend-native': 2,
      'no-proto': 2,
      'no-caller': 2,
      'no-unused-vars': [
         2,
         {
            vars: 'all',
            args: 'none'
         }
      ],
      'new-cap': 0,
      quotes: [2, 'single'],
      'max-depth': [2, 3],
      'max-statements': [2, 45],
      'max-len': [2, 200],
      'no-eq-null': 2,
      'operator-linebreak': 2,
      'no-multiple-empty-lines': [
         2,
         {
            max: 2
         }
      ],
      'no-mixed-spaces-and-tabs': 0,
      'space-unary-ops': 2,
      'no-multi-spaces': 2,
      'space-before-blocks': 0,
      'keyword-spacing': 0,
      'space-infix-ops': 0,
      'comma-spacing': [
         0,
         {
            before: false,
            after: true
         }
      ],
      'comma-dangle': 0,
      'wrap-iife': 2,
      'no-extra-semi': 2,
      'semi-spacing': 2,
      'spaced-comment': 2,
      'func-names': 0,

      // NodeJs rules
      'block-scoped-var': 2,
      'global-require': 0,
      'no-mixed-requires': 2,
      'no-new-require': 2,

      // ES6 rules
      'arrow-spacing': 2,
      'no-const-assign': 2,
      'no-var': 2,
      'prefer-const': 0,

      // React
      'jsx-quotes': [2, 'prefer-double'],
      'react/jsx-uses-react': 1,
      'react/jsx-uses-vars': 1
   }
};
