module.exports = {
  'package.json': ['npm run check:dll'],
  'src/**/*.{css,md,html}': ['prettier --write'],
  'src/**/*.less': (fileNames) => {
    const fileStr = fileNames.join(' ');
    return [
      fileNames.length > 30 ? 'npm run lint-staged:style --fix src/' : `npm run lint-staged:style ${fileStr}`,
      `prettier --write ${fileStr}`,
    ];
  },
  'src/**/*.{js,jsx}': (fileNames) => {
    const fileStr = fileNames.join(' ');
    return [
      `prettier --write ${fileStr}`,
      fileNames.length > 30 ? 'npm run lint-staged:js src/' : `npm run lint-staged:js ${fileStr}`
    ];
  },
  'src/**/*.{ts,tsx}': (fileNames) => {
    return fileNames.length > 30
      ? 'npm run lint-staged:ts src/'
      : `npm run lint-staged:ts ${fileNames.join(' ')}`;
  },
  '**/*.{ts,tsx}': () => 'npm run check:tsc',
};
