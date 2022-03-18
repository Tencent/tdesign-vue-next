<template>
  <div class="t-upload__img-flow-demo">
    <t-upload
      v-model="files"
      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      placeholder="支持批量上传图片文件"
      theme="image-flow"
      accept="image/*"
      multiple
      :auto-upload="false"
      :max="8"
    ></t-upload>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const files = ref([]);
</script>
<style></style>
