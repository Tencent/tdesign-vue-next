<template>
  <t-space direction="vertical">
    <t-space>
      <t-checkbox v-model="showImageFileName"> 显示图片名称 </t-checkbox>
      <t-checkbox v-model="disabled"> 禁用状态 </t-checkbox>
      <t-checkbox v-model="uploadAllFilesInOneRequest"> 多个文件一个请求上传 </t-checkbox>
      <t-checkbox v-model="autoUpload"> 自动上传 </t-checkbox>
      <t-button
        v-if="!autoUpload"
        variant="base"
        theme="default"
        size="small"
        style="height: 22px"
        @click="uploadFiles"
      >
        点击上传
      </t-button>
    </t-space>

    <br />

    <t-space>
      <t-upload
        ref="uploadRef1"
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        v-model="file1"
        :disabled="disabled"
        :autoUpload="autoUpload"
        :showImageFileName="showImageFileName"
        :sizeLimit="sizeLimit"
        theme="image"
        tips="请选择单张图片文件上传（上传成功状态演示）"
        accept="image/*"
        @fail="handleFail"
      >
        <!-- custom UI -->
        <!-- <template #fileListDisplay="{ files }">
          <div>{{ JSON.stringify(files) }}</div>
        </template> -->
      </t-upload>

      <t-upload
        ref="uploadRef2"
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        v-model="fileFail"
        :disabled="disabled"
        :autoUpload="autoUpload"
        theme="image"
        tips="请选择单张图片文件上传（上传失败状态演示）"
        accept="image/*"
        :formatResponse="formatResponse"
        :showImageFileName="showImageFileName"
      ></t-upload>
    </t-space>

    <t-upload
      ref="uploadRef3"
      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      v-model="file2"
      :disabled="disabled"
      :autoUpload="autoUpload"
      @fail="handleFail"
      theme="image"
      tips="请选择单张图片文件上传（自定义预览图片地址）"
      accept="image/*"
      :formatResponse="formatImgResponse"
      :imageViewerProps="imageViewerProps"
      :showImageFileName="showImageFileName"
    ></t-upload>

    <!-- if you want to hide image name, set .t-upload__card-name { display: none } -->
    <t-upload
      ref="uploadRef4"
      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      v-model="files"
      :sizeLimit="sizeLimit"
      :abridgeName="abridgeName"
      :disabled="disabled"
      :autoUpload="autoUpload"
      :uploadAllFilesInOneRequest="uploadAllFilesInOneRequest"
      :showImageFileName="showImageFileName"
      @fail="handleFail"
      theme="image"
      tips="允许选择多张图片文件上传，最多只能上传 3 张图片"
      accept="image/*"
      multiple
      :max="3"
    ></t-upload>
  </t-space>
</template>
<script setup>
import { MessagePlugin } from 'tdesign-vue';
import { ref, reactive } from 'vue';

const uploadRef1 = ref();
const uploadRef2 = ref();
const uploadRef3 = ref();
const uploadRef4 = ref();
const file1 = ref([]);
const file2 = ref([
  {
    name: 'demo-image-1.png',
    url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
  },
]);
const files = ref([]);
const fileFail = ref([]);
const disabled = ref(false);
const uploadAllFilesInOneRequest = ref(false);
const autoUpload = ref(true);
const imageViewerProps = reactive({
  closeOnEscKeydown: false,
});
const sizeLimit = reactive({
  size: 500,
  unit: 'KB',
});
const abridgeName = ref([6, 6]);
const showImageFileName = ref(true);
// formatResponse 返回后的 url 优先级高于接口返回的 url
const formatImgResponse = () => ({
  url: 'https://tdesign.gtimg.com/site/avatar.jpg',
});
// 一旦 formatResponse 返回值包含 error，便会被组件判定为上传失败
const formatResponse = () => ({
  error: '网络异常，图片上传失败',
});
const handleFail = ({ file }) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};
const uploadFiles = () => {
  uploadRef1.value.uploadFiles();
  uploadRef2.value.uploadFiles();
  uploadRef3.value.uploadFiles();
  uploadRef4.value.uploadFiles();
};
</script>

<style scoped>
.tdesign-demo-upload-item {
  display: inline-block;
  margin-right: 80px;
}
.tdesign-demo-upload-item + .tdesign-demo-upload-item {
  margin-top: 80px;
}
</style>
