const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const config = require('./config.js');
const prettierJson = require('../../.prettierrc.js');

const renderUsageStr = (compStrMap) => `<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    ${Object.keys(compStrMap.render)
      .map((key) => `<template #${key}="{ configProps }">${compStrMap.render[key].trim()}</template>`)
      .join('\n')}
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
${compStrMap.importStr ? compStrMap.importStr.trim() : `import configJson from './props.json';`}
${compStrMap.script ? compStrMap.script.trim() : ''}

${compStrMap.configStr ? compStrMap.configStr.trim() : `const configList = ref(configJson);`}
${compStrMap.panelStr ? compStrMap.panelStr.trim() : ''}

const usageCodeMap = ${JSON.stringify(compStrMap.render)};
const usageCode = ref(\`<template>\${usageCodeMap[panelList[0].value].trim()}</template>\`);

${
  compStrMap.panelChangeStr
    ? compStrMap.panelChangeStr.trim()
    : `
  function onPanelChange(panel) {
    usageCode.value = \`<template>\${usageCodeMap[panel].trim()}</template>\`;
  }
`
}
</script>
`;
// 自动化生成 live demo 脚本
function genUsage() {
  // eslint-disable-next-line no-restricted-syntax
  for (const name of Object.keys(config)) {
    const fileFolderPath = path.resolve(__dirname, `../../packages/components/${name}/_usage`);
    if (!fs.existsSync(fileFolderPath)) {
      fs.mkdirSync(fileFolderPath);
    }

    try {
      const data = renderUsageStr(config[name]);
      const filePath = path.resolve(__dirname, `../../packages/components/${name}/_usage/index.vue`);
      fs.writeFileSync(filePath, codeFormat(data));
    } catch (err) {
      console.error(`${name} usage 组件生成失败...`, err);
    }
    console.log(`${name} usage 组件生成成功...`);
  }
}

// 格式化vue代码
function codeFormat(code, options = {}) {
  return prettier.format(code, {
    ...prettierJson,
    parser: 'vue',
    ...options,
  });
}

genUsage();
