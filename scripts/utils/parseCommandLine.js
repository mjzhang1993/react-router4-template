const yargs = require('yargs');

function parseCommandLine() {
  const processArgvs = process.argv.slice(2);

  if (!processArgvs) return {};

  yargs(processArgvs).options({
    port: { alias: 'p', describe: '端口号' },
    report: { alias: 'r', describe: '打包后是否生成report(只适用于npm build)' },
  });

  return yargs.help().argv;
}

module.exports = { parseCommandLine };
