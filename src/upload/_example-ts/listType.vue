<template>
  <section class="tdesign-demo-upload">
    <header class="tdesign-demo-upload-header">
      <t-upload
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        :data="{ foo: 1, bar: 2 }"
        :files="files"
        :multiple="true"
        :show-file-list="true"
        @change="handleChange"
        @preview="handlePreview"
      >
        <template #trigger>
          <t-button variant="outline">
            <template #icon> <upload-icon />选择文件 </template>
          </t-button>
          <p class="describe">请上传txt文件，大小在60M以内</p>
        </template>
      </t-upload>
    </header>
  </section>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { UploadProps } from 'tdesign-vue-next';
import { UploadIcon } from 'tdesign-icons-vue-next';
const files = ref<UploadProps['files']>([]);
const handleChange: UploadProps['onChange'] = (files) => {
  console.log(files);
};
const handlePreview: UploadProps['onPreview'] = ({ file }) => {
  console.log(file);
  window.open(file.thumbUrl);
};
</script>
<style lang="less" scoped>
.describe {
  color: rgb(153, 153, 153);
  font-size: 12px;
  margin-top: 12px;
}
</style>
