<template>
  <!-- :sizeLimit="1024" 默认单位为：KB 。错误提示为 图片大小不能超过 {sizeLimit} KB-->
  <!-- :sizeLimit="{ size: 2, unit: 'MB' }" -->
  <!-- :sizeLimit="{ size: 2, unit: 'MB', message: '图片太大' }" -->
  <!-- :sizeLimit="{ size: 2, unit: 'MB', message: '图片太大，不能超过 {sizeLimit} MB' }" -->

  <!-- 上传接口默认只传一个参数，如果希望自定义参数，可以使用 format 方法格式化参数-->
  <t-upload
    v-model="files"
    :size-limit="{ size: 5, unit: 'MB' }"
    action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
    tips="上传文件大小在 5M 以内"
    :format-response="formatResponse"
    @fail="handleFail"
  />
</template>
<script>
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

export default defineComponent({
  setup() {
    const files = ref([]);

    const handleFail = ({ file }) => {
      MessagePlugin.error(`文件 ${file.name} 上传失败`);
    };

    const formatResponse = (res) => {
      if (!res.url) {
        return { error: '上传失败，请重试' };
      }
      return { ...res, url: res.url };
    };

    return {
      files,
      handleFail,
      formatResponse,
    };
  },
});
</script>
