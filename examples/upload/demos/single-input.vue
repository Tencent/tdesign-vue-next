<template>
  <div class="tdesign-demo-upload">
    <div style="width: 350px">
      <t-upload
        v-model="files"
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        :tips="tips"
        theme="file-input"
        placeholder="未选择文件"
        @fail="handleFail"
        @success="onSuccess"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

export default defineComponent({
  setup() {
    const files = ref([]);
    const tips = ref('');

    const handleFail = (file) => {
      MessagePlugin.error(`文件 ${file.name} 上传失败`);
    };

    const onSuccess = () => {
      tips.value = '';
    };
    return {
      files,
      handleFail,
      onSuccess,
      tips,
    };
  },
});
</script>
