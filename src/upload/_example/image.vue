<template>
  <t-space direction="vertical">
    <t-space>
      <t-upload
        v-model="file1"
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        theme="image"
        tips="单张图片文件上传（上传成功状态演示）"
        accept="image/*"
        :locale="{
          triggerUploadText: {
            image: '请选择图片',
          },
        }"
        @fail="handleFail"
      ></t-upload>

      <t-upload
        v-model="fileFail"
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        theme="image"
        tips="单张图片文件上传（上传失败状态演示）"
        accept="image/*"
        :format-response="formatResponse"
      ></t-upload>
    </t-space>

    <t-upload
      v-model="file2"
      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      theme="image"
      accept="image/*"
      :format-response="formatImgResponse"
      @fail="handleFail"
    ></t-upload>

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
  </t-space>
</template>
<script setup>
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

const file1 = ref([]);
const file2 = ref([{ name: 'demo-image-1.png', url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' }]);
const files = ref([]);
const fileFail = ref([]);

const handleFail = ({ file }) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};

const formatImgResponse = () => {
  return { name: 'FileName', url: 'https://tdesign.gtimg.com/demo/demo-image-1.png' };
};

const formatResponse = () => {
  return { name: 'FileName', error: '网络异常，图片上传失败' };
};
</script>
