<template>
  <div class="t-upload__file-flow-demo">
    <t-upload
      v-model="files"
      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      placeholder="批量合并上传，会通过一个接口上传所有的文件"
      theme="file-flow"
      multiple
      batch-upload
      upload-all-files-in-one-request
      :auto-upload="false"
      :max="10"
      @success="handleUploadSuccess"
    ></t-upload>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const files = ref([]);
const handleUploadSuccess = (e) => {
  console.log('batch upload', e);
};
</script>
