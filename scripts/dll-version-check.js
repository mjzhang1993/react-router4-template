/**
 * pre-commit 检查 DLL 的依赖是否有版本变化
 * */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const pathConfig = require('./config/paths.config');
const {findDLLFile} = require('./utils/findDLLFile');
const pkg = require('../package.json');

const prodConfig = pathConfig('production');
const dllGuide = findDLLFile(prodConfig, 'production');

if (dllGuide.hasDll) {
  const dependencies = pkg.dependencies;
  const versionChanged = [];
  dllGuide.dlls.forEach(dll => {
    if (dll.versionFile) {
      try {
        const versionTxt = fs.readFileSync(path.join(prodConfig.dllPath, dll.versionFile), 'utf8');
        const versionJson = JSON.parse(versionTxt);
        Object.keys(versionJson).forEach((packageName) => {
          if (versionJson[packageName] !== dependencies[packageName]) {
            versionChanged.push(packageName);
          }
        })
      } catch (e) {
        throw e;
      }
    }
  });
  if (versionChanged.length > 0) {
    console.log(chalk.yellow(`
      The dependent version of the DLL is updated "${versionChanged.join(', ')}"
      You need to rerun the script "npm run build:dll"
    `));
    process.exit(1);
  } else {
    console.log(chalk.yellow(`\n The DLL dependency version check passed \n`));
  }
}
