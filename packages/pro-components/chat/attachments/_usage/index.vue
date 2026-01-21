<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #chat="{ configProps }">
      <div style="width: '600px'">
        <t-attachments :items="filesList" v-bind="configProps" />
      </div>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
import { ref } from 'vue';
import configJson from './props.json';
const configList = ref(configJson);
// labe:组件名  value:chat （不用chat渲染不出来todo）
const panelList = [{ label: 'Attachments', value: 'chat' }];
const filesList = [
  {
    name: 'excel-file.xlsx',
    size: 111111,
  },
  {
    name: 'word-file.docx',
    size: 222222,
  },
  {
    name: 'image-file.png',
    size: 333333,
    url: 'https://tdesign.gtimg.com/site/avatar.jpg',
  },
  {
    name: 'pdf-file.pdf',
    size: 444444,
  },
  {
    name: 'ppt-file.pptx',
    size: 555555,
  },
  {
    name: 'video-file.mp4',
    size: 666666,
  },
  {
    name: 'audio-file.mp3',
    size: 777777,
  },
  {
    name: 'zip-file.zip',
    size: 888888,
  },
  {
    name: 'markdown-file.md',
    size: 999999,
    description: 'Custom description',
  },
  {
    name: 'word-markdown-file.doc',
    size: 99899,
    status: 'progress',
    percent: 50,
  },
];
const usageCodeMap = {
  chat: ` 
    <div style="width: '600px'">
        <t-attachments :items="filesList" v-bind="configProps" />
    </div>
    `,
};
const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);
function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
