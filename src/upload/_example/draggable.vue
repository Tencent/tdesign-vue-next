<template>
  <div class="tdesign-demo-block-column-large">
    <div class="tdesign-demo-block-column">
      <div>是否自动上传：<t-switch v-model="autoUpload"></t-switch></div>
      <div>
        <t-radio-group v-model="display" variant="default-filled">
          <t-radio-button value="file">文件拖拽上传</t-radio-button>
          <t-radio-button value="image">图片拖拽上传</t-radio-button>
        </t-radio-group>
      </div>
    </div>

    <!-- data 表示传递给上传接口的额外数据；如果有更复杂的数据场景传递，请使用 format 方法 -->
    <t-upload
      v-model="files"
      :auto-upload="autoUpload"
      :theme="display"
      :data="{ extra_data: 123, file_name: 'certificate' }"
      draggable
      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const autoUpload = ref(true);
const files = ref([]);
const display = ref('file');
</script>
