<template>
  <t-space direction="vertical">
    <div>
      是否自动上传：
      <t-switch v-model="autoUpload" />
    </div>
    <br />
    <t-upload
      v-model="files"
      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      placeholder="支持批量上传图片文件"
      theme="image-flow"
      accept="image/*"
      multiple
      :auto-upload="autoUpload"
      :max="8"
    ></t-upload>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const autoUpload = ref(false);
const files = ref([
  // {
  //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   name: 'loading.svg',
  // },
]);
</script>
