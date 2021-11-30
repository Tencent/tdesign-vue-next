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

<style></style>
