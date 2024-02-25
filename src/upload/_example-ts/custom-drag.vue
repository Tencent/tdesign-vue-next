<template>
  <div class="tdesign-demo-upload t-upload">
    <t-button variant="outline" @click="upload">
      <template #icon>
        <cloud-upload-icon />
      </template>
      点击上传
    </t-button>
    <br /><br />
    <t-upload
      ref="uploadRef"
      v-model="files"
      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      draggable
      theme="custom"
      @fail="handleFail"
      @success="handleSuccess"
      @progress="onProgress"
    >
      <template #dragContent="params">
        <ul v-if="files && files.length" style="padding: 0">
          <li v-for="file in files" :key="file.name" style="list-style-type: none">{{ file.name }}</li>
        </ul>
        <template v-else>
          <p v-if="params && params.dragActive">释放鼠标</p>
          <t-button v-else-if="progress < 1">自定义拖拽区域</t-button>
        </template>
        <t-button v-if="files && files.length" size="small" style="margin-top: 36px">更换文件</t-button>
        <!-- <span>数据状态：{{params}}</span> -->
      </template>
    </t-upload>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { MessagePlugin, UploadInstanceFunctions, UploadProps, ButtonProps } from 'tdesign-vue-next';
import { CloudUploadIcon } from 'tdesign-icons-vue-next';
const files = ref<UploadProps['value']>([]);
const uploadRef = ref<UploadInstanceFunctions>();
const progress = ref(0);
const handleSuccess: UploadProps['onSuccess'] = ({ file }) => {
  MessagePlugin.success(`文件 ${file.name} 上传成功`);
};
const handleFail: UploadProps['onFail'] = ({ file }) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};
const onProgress: UploadProps['onProgress'] = ({ percent }) => {
  console.log('进度：', percent);
  progress.value = percent;
};
const upload: ButtonProps['onClick'] = () => {
  uploadRef.value.triggerUpload();
};
</script>
