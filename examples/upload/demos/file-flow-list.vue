<template>
  <div class="t-upload__file-flow-demo">
    <t-upload
      v-model="files"
      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      placeholder="支持批量上传文件，文件格式不限，最多只能上传 10 份文件"
      theme="file-flow"
      multiple
      :auto-upload="false"
      :max="10"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const files = ref([]);

    return {
      files,
    };
  },
});
</script>
