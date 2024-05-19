const fs = require('fs');
const path = require('path');

const list = [];

function listFile(dir) {
  const arr = fs.readdirSync(dir);
  arr.forEach((item) => {
    const fullpath = path.join(dir, item);
    const stats = fs.statSync(fullpath);
    if (stats.isDirectory()) {
      listFile(fullpath);
    } else {
      list.push(fullpath);
    }
  });
  return list;
}

const docs = listFile(path.join(__dirname, './'));

function canmelCase(name) {
  let [str] = name.match(/[a-zA-Z]+/);
  str = str.replace(str[0], str[0].toLowerCase());
  str = str.replace(/([A-Z])/g, '-$1').toLowerCase();
  return str;
}

docs.forEach((doc) => {
  if (doc.includes('gen-design-docs.js')) return;
  const fileName = canmelCase(path.basename(doc));
  const data = fs.readFileSync(doc, 'utf-8').toString();
  let [, designContent] = data.split('## 组件设计指南');
  if (!designContent || fileName === 'gen') return;

  designContent = `${designContent}`;
  fs.writeFileSync(path.join(__dirname, `../design/${fileName}.md`), designContent);
});
