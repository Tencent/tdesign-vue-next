const fs = require('fs');
const path = require('path');

// 定义源和目标文本
const src_text = "import props from './props';";
const dst_text = "import props from '@td/intel/";

// 定义要搜索的目录
const dirs = ['packages/components/common/src', 'packages/components/vue3/src'];

// 定义处理文件的函数
function processFiles(directory) {
    fs.readdirSync(directory, { withFileTypes: true }).forEach(file => {
        const filePath = path.join(directory, file.name);
        if (file.isDirectory()) {
            processFiles(filePath);
        } else if (file.isFile() && (filePath.endsWith('.js') || filePath.endsWith('.ts') || filePath.endsWith('.tsx'))) {
            let content = fs.readFileSync(filePath, 'utf8');
            if (content.includes(src_text)) {
                const relativePath = path.relative(dirs[0], filePath);
                const importPath = relativePath.split(path.sep).slice(0, -1).join('/');
                content = content.replace(src_text, `${dst_text}${importPath}/props';`);
                fs.writeFileSync(filePath, content, 'utf8');
            }
        }
    });
}

// 遍历目录并处理文件
dirs.forEach(dir => processFiles(dir));