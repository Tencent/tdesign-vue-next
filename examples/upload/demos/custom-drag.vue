<template>
  <div class="tdesign-demo-upload t-upload">
    <t-button variant="outline" @click="upload">
      <template #icon>
        <t-icon-cloud-upload />
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
      <template #default="params">
        <ul v-if="files && files.length">
          <li v-for="file in files" :key="file.name">
            {{ file.name }}
          </li>
        </ul>
        <template v-else>
          <p v-if="params && params.dragActive">释放鼠标</p>
          <t-button v-else-if="progress < 1">自定义拖拽区域</t-button>
        </template>
        <t-button v-if="files && files.length" size="small" style="margin-top: 36px">更换文件</t-button>
        <br /><br />
      </template>
    </t-upload>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import TIconCloudUpload from 'tdesign-vue-next/icon/cloud-upload';
import { MessagePlugin } from 'tdesign-vue-next';

export default defineComponent({
  components: { TIconCloudUpload },
  setup() {
    const files = ref([]);
    const uploadRef = ref();
    const progress = ref(0);

    const handleSuccess = ({ file }) => {
      MessagePlugin.success(`文件 ${file.name} 上传成功`);
    };

    const handleFail = ({ file }) => {
      MessagePlugin.error(`文件 ${file.name} 上传失败`);
    };

    const onProgress = (val) => {
      console.log('进度：', val);
      progress.value = val;
    };

    const upload = () => {
      uploadRef.value.triggerUpload();
    };

    return {
      files,
      progress,
      upload,
      uploadRef,
      handleSuccess,
      handleFail,
      onProgress,
    };
  },
});
</script>
