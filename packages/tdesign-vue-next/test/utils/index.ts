import * as path from 'node:path';
import * as fs from 'node:fs';
import * as clc from 'cli-color';

function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const current = `${path}/${file}`;
      if (fs.statSync(current).isDirectory()) {
        deleteFolderRecursive(current);
      } else {
        fs.unlinkSync(current);
      }
    });
    fs.rmdirSync(path);
  }
}

/**
 * 拷贝文件
 * @param src 源文件路径
 * @param dist 目的文件路径
 */
function copyFile(src, dist) {
  fs.writeFileSync(dist, fs.readFileSync(src));
}

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
  deleteFolderRecursive,
  copyFile,
};
