<template>
  <t-space direction="vertical">
    <t-space size="36px">
      <div>AutoUpload: <t-switch v-model="autoUpload" /></div>
      <t-checkbox v-model="showImageFileName"> Show Image Name </t-checkbox>
      <t-checkbox v-model="showUploadButton"> Show UploadButton Or CancelUploadButton </t-checkbox>
    </t-space>
    <br />
    <!-- action 上传地址，使用组件内部上传逻辑，action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo" -->
    <!-- request-method 自定义上传方法，自定义上传逻辑 -->
    <!-- auto-upload=false, `uploadButton` and `cancelUploadButton` support ButtonProps; also support slot -->
    <t-upload
      v-model="files"
      placeholder="支持批量上传图片文件"
      theme="image-flow"
      accept="image/*"
      multiple
      :request-method="requestMethod1"
      :auto-upload="autoUpload"
      :show-image-file-name="showImageFileName"
      :max="8"
      :abridge-name="[6, 6]"
      :upload-button="showUploadButton ? undefined : null"
      :cancel-upload-button="showUploadButton ? { theme: 'default', content: '取消上传' } : null"
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

    <br />
    <t-divider align="left">Different Status Images</t-divider>
    <t-upload
      :files="staticFiles"
      theme="image-flow"
      :show-image-file-name="showImageFileName"
      class="static-image-list"
    ></t-upload>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { UploadProps, CheckboxProps } from 'tdesign-vue-next';
const autoUpload = ref(false);
const showImageFileName = ref(true);
const showUploadButton = ref<CheckboxProps['value']>(true);
const files = ref<UploadProps['value']>([
  {
    url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
    name: 'loading.svg',
    status: 'success',
  },
]);
const staticFiles = ref<UploadProps['files']>([
  {
    url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
    name: 'loading.svg',
    status: 'success',
  },
  {
    url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
    name: 'loading.svg',
    status: 'waiting',
  },
  {
    // url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
    name: 'loading.svg',
    status: 'progress',
    percent: 10,
  },
  {
    url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
    name: 'loading.svg',
    status: 'fail',
  },
]);

// 示例代码：自定义上传方法，一个请求上传一个文件
// eslint-disable-next-line
const requestMethod1: UploadProps['requestMethod'] = () => {
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
// const requestMethod2 = () => {
//   return new Promise((resolve) => {
//     resolve({
//       status: 'success',
//       response: {
//         files: [
//           { name: 'avatar1.jpg', url: 'https://tdesign.gtimg.com/site/avatar.jpg' },
//           { name: 'avatar2.jpg', url: 'https://avatars.githubusercontent.com/u/11605702?v=4' },
//         ],
//       },
//     });
//   });
// };
</script>

<style>
.static-image-list {
  .t-upload__flow-op {
    display: none;
  }
}
</style>
