<template>
  <t-upload
    theme="file-flow"
    :auto-upload="false"
    :cancel-upload-button="{
      onClick: (e) => {
        console.log('click', e);
      },
    }"
    :upload-button="{
      onClick: (e) => {
        console.log('up click', e);
      },
    }"
  />
</template>
<script setup>
import { ref, watch } from 'vue';
const files3 = ref([]);

const multiple = ref(false);

watch(multiple, (multiple) => {
  files3.value = multiple
    ? [
        {
          name: '这是一个上传成功的文件',
          status: 'success',
          url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
          size: 1000,
        },
        {
          name: '这是一个上传中的文件',
          status: 'progress',
          percent: 30,
          url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
          size: 1000,
        },
        {
          name: '这是一个上传失败的文件',
          status: 'fail',
          url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
          size: 1000,
        },
        {
          name: '这是一个等待上传的文件',
          status: 'waiting',
          url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
          size: 1000,
        },
      ]
    : [];
});
</script>
