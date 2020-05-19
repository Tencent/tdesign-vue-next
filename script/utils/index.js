const path = require('path');
const clc = require('cli-color');

module.exports = {
  log(message, type = 'notice') {
    const colorMap = {
      error: clc.red.bold,
      warn: clc.yellow,
      notice: clc.blue,
      success: clc.green,
    };

    console.log(colorMap[type](`TDesign: ${message}`));
  },
  resolveCwd(...args) {
    args.unshift(process.cwd());
    return path.join(...args);
  },
};
