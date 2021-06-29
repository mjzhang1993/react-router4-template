/**
 * DLL 文件识别
 * */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const _ = require('lodash');

function findDLLFile(currentConfig, env) {
  const dllGuide = {
    hasDll: true,
    dlls: []
  };

  try {
    const files = fs.readdirSync(currentConfig.dllPath);
    const dllPackages = currentConfig.dllPackages;
    if (!_.isArray(dllPackages) || dllPackages.length === 0) {
      dllGuide.hasDll = false;
    } else {
      dllGuide.dlls = dllPackages.map(d => findDLLFileItem({env, entryName: d.name, files}))
    }
  } catch (e) {}

  if (!dllGuide.hasDll || dllGuide.dlls.length === 0 || dllGuide.dlls.some(d => !d.hasDll)) {
    dllGuide.hasDll = false;
    console.log(
      chalk.bgYellow.black('\n WARNING ') +
      chalk.yellow(' Can not find DLL files, please check `/dll` directory \n')
    );
  }
  return dllGuide;
}

function findDLLFileItem({env, entryName, files}) {
  const dllGuide = {
    hasDll: true,
    manifest: '',
    name: entryName,
    filename: '',
    versionFile: '',
  };

  if (Array.isArray(files)) {
    files.forEach((file) => {
      if (!file) return;
      if (env === 'production') {
        if (file === `${entryName}_manifest_production.json`) {
          return dllGuide.manifest = `${entryName}_manifest_production.json`;
        }
        const prodNameMatch = file.match(new RegExp(`^dll_${entryName}_[a-zA-Z0-9]{6}\\.production\\.js$`));
        if (Array.isArray(prodNameMatch) && prodNameMatch[0]) {
          dllGuide.filename = prodNameMatch[0];
        }
        const prodVersionMatch = file.match(new RegExp(`^dll_${entryName}_[a-zA-Z0-9]{6}\\.production\\.js\\.VERSION\\.txt$`));
        if (Array.isArray(prodVersionMatch) && prodVersionMatch[0]) {
          dllGuide.versionFile = prodVersionMatch[0];
        }
      } else {
        if (file === `${entryName}_manifest_development.json`) {
          return dllGuide.manifest = `${entryName}_manifest_development.json`;
        }
        const devNameMatch = file.match(new RegExp(`^dll_${entryName}_[a-zA-Z0-9]{6}\\.development\\.js$`));
        if (Array.isArray(devNameMatch) && devNameMatch[0]) {
          dllGuide.filename = devNameMatch[0];
        }
      }
    });
  }

  if (!dllGuide.filename || !dllGuide.manifest) {
    dllGuide.hasDll = false;
  }

  return dllGuide;
}

function writeDLLVersion(currentConfig, env, pkg) {
  const dllPackages = currentConfig.dllPackages;
  const dependencies = pkg.dependencies;
  // prodDll 顺序与 dllPackages 的顺序是一致的
  const prodDll = findDLLFile(currentConfig, env);
  if (prodDll.hasDll) {
    prodDll.dlls.forEach(({name, filename}, idx) => {
      const versions = (dllPackages[idx].packages || []).reduce((prev, p) => {
        prev[p] = dependencies[p] || '';
        return prev;
      }, {});
      fs.writeFileSync(
        path.join(currentConfig.dllPath, `${filename}.VERSION.txt`),
        JSON.stringify(versions, null, 2)
      )
    })
  }
}


module.exports = { findDLLFile, writeDLLVersion };
