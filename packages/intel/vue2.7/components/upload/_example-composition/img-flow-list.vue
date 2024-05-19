<template>
  <t-space direction="vertical">
    <t-space size="36px">
      <div>
        AutoUpload:
        <t-switch v-model="autoUpload" />
      </div>
      <t-checkbox v-model="showImageFileName"> Show Image Name </t-checkbox>
      <t-checkbox v-model="showUploadButton"> Show UploadButton Or CancelUploadButton </t-checkbox>
    </t-space>
    <br />
    <!-- action 上传地址，使用组件内部上传逻辑，action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo" -->
    <!-- request-method 自定义上传方法，自定义上传逻辑 -->
    <!-- auto-upload=false, `uploadButton` and `cancelUploadButton` support ButtonProps; also support slot-->
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
      :show-image-file-name="showImageFileName"
      :upload-button="showUploadButton ? {} : null"
      :cancel-upload-button="showUploadButton ? { content: '取消上传' } : null"
      @dragenter="onDragenter"
      @dragleave="onDragleave"
      @drop="onDrop"
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

<script setup>
import { ref } from 'vue';

const autoUpload = ref(false);
const showImageFileName = ref(true);
const showUploadButton = ref(true);
const files = ref([
  {
    url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
    name: 'loading.svg',
    status: 'success',
  },
]);
const staticFiles = ref([
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
const requestMethod1 = () => new Promise((resolve) => {
  resolve({
    status: 'success',
    response: {
      url: 'https://tdesign.gtimg.com/site/avatar.jpg',
    },
  });
});
// const requestMethod2 = () => {
//   return new Promise(resolve => {
//     resolve({
//       status: 'success',
//       response: {
//         files: [{
//           name: 'avatar1.jpg',
//           url: 'https://tdesign.gtimg.com/site/avatar.jpg'
//         }, {
//           name: 'avatar2.jpg',
//           url: 'https://avatars.githubusercontent.com/u/11605702?v=4'
//         }]
//       }
//     });
//   });
// };
const onDragenter = (p) => {
  console.log('dragenter', p);
};
const onDragleave = (p) => {
  console.log('dragleave', p);
};
const onDrop = (p) => {
  console.log('drop', p);
};
</script>

<style>
.static-image-list {
  .t-upload__flow-op {
    display: none;
  }
}
</style>
