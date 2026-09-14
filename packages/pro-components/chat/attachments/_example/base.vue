<template>
  <t-space>
    <t-attachments :items="filesList" @file-click="handleFileClick"></t-attachments>
  </t-space>
</template>

<script setup lang="js">
const filesList = [
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
    url:'https://tdesign.gtimg.com/site/avatar.jpg',
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
];
const handleFileClick = (e) => {
  console.log('fileClick', e.detail);
};
</script>
