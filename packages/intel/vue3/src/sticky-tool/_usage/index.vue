<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #stickyTool="{ configProps }"
      ><t-space>
        <t-sticky-tool :style="{ position: 'relative', overflow: 'hidden' }" :offset="[-300, -80]" v-bind="configProps">
          <t-sticky-item label="chat">
            <template #icon><chat-icon /></template>
          </t-sticky-item>
          <t-sticky-item label="add">
            <template #icon><add-icon /></template>
          </t-sticky-item>
          <t-sticky-item
            label="aqcode"
            :icon="renderQrIcon"
            :popup="renderPopup"
            :popup-props="{ overlayInnerStyle: { padding: '4px', height: '128px' } }"
          >
          </t-sticky-item>
        </t-sticky-tool> </t-space
    ></template>
  </base-usage>
</template>

<script setup lang="jsx">

import { ref, onMounted } from 'vue';
import configJson from './props.json';
import { ChatIcon, AddIcon, QrcodeIcon } from 'tdesign-icons-vue-next';
const renderQrIcon = () => {
  return <QrcodeIcon />;
};
const renderPopup = () => {
  return <img alt="TDesign Logo" width="120" height="120" src="https://tdesign.gtimg.com/site/site.jpg" />;
};

const configList = ref(configJson);
const panelList = [{ label: 'stickyTool', value: 'stickyTool' }];

const usageCodeMap = {
  stickyTool:
    '\n        <t-space>\n          <t-sticky-tool\n            :style="{ position: \'relative\', overflow: \'hidden\' }"\n            :offset="[-300, -80]"\n            v-bind="configProps"\n          >\n            <t-sticky-item label="chat">\n              <template #icon><chat-icon /></template>\n            </t-sticky-item>\n            <t-sticky-item label="add">\n              <template #icon><add-icon /></template>\n            </t-sticky-item>\n            <t-sticky-item\n              label="aqcode"\n              :icon="renderQrIcon"\n              :popup="renderPopup"\n              :popup-props="{ overlayInnerStyle: { padding: \'4px\', height: \'128px\' } }"\n            >\n            </t-sticky-item>\n          </t-sticky-tool>\n        </t-space>\n      ',
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
