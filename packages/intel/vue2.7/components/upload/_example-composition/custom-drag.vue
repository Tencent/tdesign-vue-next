<template>
  <div class="tdesign-demo-upload t-upload">
    <t-button variant="outline" @click="upload"> <cloud-upload-icon slot="icon" />点击上传 </t-button>
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
      @dragenter="onDrop"
    >
      <template v-slot="params">
        <ul v-if="files && files.length">
          <li v-for="file in files" :key="file.name">{{ file.name }}</li>
        </ul>
        <template v-else>
          <p v-if="params && params.dragActive">释放鼠标</p>
          <t-button v-else-if="progress < 1">自定义拖拽区域</t-button>
        </template>
        <t-button v-if="files && files.length" size="small" style="margin-top: 36px">更换文件</t-button>
        <br /><br />
        <!-- <span>数据状态：{{params}}</span> -->
      </template>
    </t-upload>
  </div>
</template>
<script setup>
import { MessagePlugin } from 'tdesign-vue';
import { ref } from 'vue';
import { CloudUploadIcon } from 'tdesign-icons-vue';

const uploadRef = ref();
const files = ref([]);
const progress = ref(0);
const onDrop = (e) => {
  const file = e.e.dataTransfer.items;
  console.log(file, 'file');
  for (let i = 0; i < file.length; i++) {
    console.log(file[i].type, 'type');
  }
};
const handleFail = ({ file }) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};
const handleSuccess = ({ file }) => {
  MessagePlugin.success(`文件 ${file.name} 上传成功`);
};
const upload = () => {
  uploadRef.value.triggerUpload();
};
const onProgress = (val) => {
  console.log(val);
  progress.value = val;
};
</script>
