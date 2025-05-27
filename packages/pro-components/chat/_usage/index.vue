<!-- 该脚本为自动生成，如有需要请在 /script/generate-usage/index.js 中调整 -->
<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #chat="{ configProps }"
      ><t-chat
        v-bind="configProps"
        :data="[
          {
            avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
            content: '它叫 McMurdo Station ATM，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。',
            role: 'assistant',
          },
          {
            avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
            content: '南极的自动提款机叫什么名字？',
            role: 'user',
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
  chat: "\n      <t-chat v-bind=\"configProps\" :data=\"[\n        {\n        avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',\n        content: '它叫 McMurdo Station ATM，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。',\n        role: 'assistant',\n      },\n      {\n        avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',\n        content: '南极的自动提款机叫什么名字？',\n        role: 'user',\n      }]\">\n      </t-chat>\n      ",
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
