<template>
  <t-space break-line>
    <!-- <t-filecard v-for="(file, index) in filesList" :key="index" :item="file"></t-filecard> -->
    <t-filecard
      :item="item"
      :removable="true"
      :card-type="'image'"
      @remove="handelRemove"
      @file-click="handelFileClick"
    ></t-filecard>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';
const item = ref({
  name: 'image-file.png',
  size: 33333,
  // status: 'progress',
  // description: '',
  // percent: '50',
  url: 'https://baike-med-1256891581.file.myqcloud.com/2019123/92d11b70-164a-11ea-bc63-19adad362542_1.png',
});
const filesList = ref([
  {
    uid: '1',
    name: 'excel-file.xlsx',
    size: 111111,
  },
  {
    uid: '2',
    name: 'word-file.docx',
    size: 222222,
  },
  {
    uid: '3',
    name: 'image-file.png',
    size: 333333,
  },
  {
    uid: '4',
    name: 'pdf-file.pdf',
    size: 444444,
  },
  {
    uid: '5',
    name: 'ppt-file.pptx',
    size: 555555,
  },
  {
    uid: '6',
    name: 'video-file.mp4',
    size: 666666,
  },
  {
    uid: '7',
    name: 'audio-file.mp3',
    size: 777777,
  },
  {
    uid: '8',
    name: 'zip-file.zip',
    size: 888888,
  },
  {
    uid: '9',
    name: 'markdown-file.md',
    size: 999999,
    description: 'Custom description',
  },
  {
    uid: '10',
    name: 'word-markdown-file.doc',
    size: 99899,
    status: 'progress',
    percent: '50',
  },
]);
const handelRemove = (file) => {
  console.log('remove file:', file);
};

const handelFileClick = (item) => {
  console.log('file click:', item.detail);
};
</script>
