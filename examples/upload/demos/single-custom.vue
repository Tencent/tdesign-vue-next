<template>
  <div class="tdesign-demo-upload">
    <div>
      <t-upload
        v-model="files"
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        :tips="tips"
        theme="custom"
        :before-upload="beforeUpload"
        multiple
        @fail="handleFail"
        @success="tips = ''"
      >
        <t-button theme="primary"> 自定义上传 </t-button>
      </t-upload>
      <div v-if="files && files.length" class="list-custom">
        <ul>
          <li v-for="(item, index) in files" :key="index">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
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

    const beforeUpload = (file) => {
      if (file.size > 5 * 1024 * 1024) {
        MessagePlugin.warning('上传的图片不能大于5M');
        return false;
      }

      return true;
    };
    return {
      files,
      handleFail,
      beforeUpload,
      tips: '上传文件大小在 5M 以内',
    };
  },
});
</script>
<style scoped>
.tdesign-demo-upload .list-custom {
  font-size: 13px;
}
.tdesign-demo-upload li {
  margin: 16px 0;
}
</style>
