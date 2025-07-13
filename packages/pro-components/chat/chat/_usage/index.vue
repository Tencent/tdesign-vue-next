<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #chat="{ configProps }"
      ><t-chat
        v-bind="configProps"
        :data="[
          {
            avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
            message: {
              content: [
                {
                  type: 'text',
                  data: '它叫 McMurdo Station ATM，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。',
                },
              ],
              role: 'assistant',
            },
          },
          {
            avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
            message: {
              content: [
                {
                  type: 'text',
                  data: '牛顿第一定律是否适用于所有参考系？',
                },
              ],
              role: 'user',
            },
          },
        ]"
      >
      </t-chat
    ></template>
  </base-usage>
</template>

<script setup lang="jsx">
/* eslint-disable */
import { ref, onMounted } from 'vue';
import configJson from './props.json';

const configList = ref(configJson);
const panelList = [{ label: 'chat', value: 'chat' }];

const usageCodeMap = {
  chat: "\n      <t-chat\n        v-bind=\"configProps\"\n        :data=\"[\n          {\n            avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',\n            message: {\n              content: [\n                {\n                  type: 'text',\n                  data: '它叫 McMurdo Station ATM，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。',\n                },\n              ],\n              role: 'assistant',\n            },\n          },\n          {\n            avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',\n            message: {\n              content: [\n                {\n                  type: 'text',\n                  data: '牛顿第一定律是否适用于所有参考系？',\n                },\n              ],\n              role: 'user',\n            },\n          },\n        ]\"\n      >\n      </t-chat>",
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
