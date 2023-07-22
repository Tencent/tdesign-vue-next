<template>
  <t-space direction="vertical">
    <div>
      是否自动上传：
      <t-switch v-model="autoUpload" />
    </div>
    <br />

    <!-- action 上传地址，使用组件内部上传逻辑，action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo" -->
    <!-- request-method 自定义上传方法，自定义上传逻辑 -->
    <t-upload
      v-model="files"
      placeholder="支持批量上传图片文件"
      theme="image-flow"
      accept="image/*"
      multiple
      :request-method="requestMethod1"
      :auto-upload="autoUpload"
      :max="8"
      :abridge-name="[6, 6]"
    ></t-upload>

    <!-- action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo" -->
    <!-- request-method 自定义上传方法，自定义上传逻辑 -->
    <!-- <t-upload
      v-model="files"
      placeholder="支持批量上传图片文件"
      theme="image-flow"
      accept="image/*"
      multiple
      uploadAllFilesInOneRequest
      :request-method="requestMethod2"
      :auto-upload="autoUpload"
      :abridgeName="[6, 6]"
      :max="8"
    ></t-upload> -->
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const autoUpload = ref(false);
const files = ref([
  {
    url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
    name: 'loading.svg',
    status: 'success',
  },
]);

// 示例代码：自定义上传方法，一个请求上传一个文件
// eslint-disable-next-line
const requestMethod1 = () => {
  return new Promise((resolve) => {
    resolve({
      status: 'success',
      response: {
        url: 'https://tdesign.gtimg.com/site/avatar.jpg',
      },
    });
  });
};

// 示例代码：自定义上传方法，一个请求上传多个文件
// eslint-disable-next-line
const requestMethod2 = () => {
  return new Promise((resolve) => {
    resolve({
      status: 'success',
      response: {
        files: [
          { name: 'avatar1.jpg', url: 'https://tdesign.gtimg.com/site/avatar.jpg' },
          { name: 'avatar2.jpg', url: 'https://avatars.githubusercontent.com/u/11605702?v=4' },
        ],
      },
    });
  });
};
</script>
