<template>
  <div>
    <div>是否自动上传：<t-switch v-model="autoUpload" /></div>
    <br />
    <t-radio-group v-model="display">
      <t-radio-button value="file"> 文件拖拽上传 </t-radio-button>
      <t-radio-button value="image"> 图片拖拽上传 </t-radio-button>
    </t-radio-group>
    <br /><br />
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

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const autoUpload = ref(true);
    const files = ref([]);
    const display = ref('file');
    return {
      autoUpload,
      files,
      display,
    };
  },
});
</script>
