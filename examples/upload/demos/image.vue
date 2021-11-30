<template>
  <div class="tdesign-demo-upload">
    <div class="tdesign-demo-upload-item">
      <t-upload
        v-model="file1"
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        theme="image"
        tips="请选择单张图片文件上传（上传成功状态演示）"
        accept="image/*"
        @fail="handleFail"
      ></t-upload>
    </div>
    <div class="tdesign-demo-upload-item">
      <t-upload
        v-model="fileFail"
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        theme="image"
        tips="请选择单张图片文件上传（上传失败状态演示）"
        accept="image/*"
        :format-response="formatResponse"
      ></t-upload>
    </div>
    <div class="tdesign-demo-upload-item">
      <t-upload
        v-model="file2"
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        theme="image"
        tips="请选择单张图片文件上传（自定义预览图片地址）"
        accept="image/*"
        :format-response="formatImgResponse"
        @fail="handleFail"
      ></t-upload>
    </div>
    <div class="tdesign-demo-upload-item">
      <t-upload
        v-model="files"
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        theme="image"
        tips="允许选择多张图片文件上传，最多只能上传 3 张图片"
        accept="image/*"
        multiple
        :max="3"
        @fail="handleFail"
      ></t-upload>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

export default defineComponent({
  setup() {
    const file1 = ref([]);
    const file2 = ref([]);
    const files = ref([]);
    const fileFail = ref([]);

    const handleFail = ({ file }) => {
      MessagePlugin.error(`文件 ${file.name} 上传失败`);
    };

    const formatImgResponse = () => {
      return { url: 'https://img.syt5.com/2019/0912/20190912111829683.jpg.420.240.jpg' };
    };

    const formatResponse = () => {
      return { error: '网络异常，图片上传失败' };
    };

    return {
      file1,
      file2,
      files,
      fileFail,
      handleFail,
      formatImgResponse,
      formatResponse,
    };
  },
});
</script>
