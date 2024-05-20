const fs = require('node:fs');
const path = require('node:path');

// 定义源文本的正则表达式
const src_regex = /from '\.\.\/type';/g;

// 定义要搜索的目录
const dirs = ['packages/components/common/src', 'packages/components/vue3/src'];

// 定义处理文件的函数
function processFiles(directory, index) {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((file) => {
    const filePath = path.join(directory, file.name);
    if (file.isDirectory()) {
      processFiles(filePath, index);
    } else if (file.isFile() && (filePath.endsWith('.js') || filePath.endsWith('.ts') || filePath.endsWith('.tsx'))) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(src_regex, (match) => {
        const relativePath = path.relative(dirs[index], filePath);
        const importPath = relativePath.split(path.sep).slice(0, 1).join('/');
        return `from '@td/intel/${importPath}/type';`;
      });
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
}

// 遍历目录并处理文件
dirs.forEach((dir, index) => processFiles(dir, index));
