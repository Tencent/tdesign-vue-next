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
            <template #icon> <t-icon-upload />选择文件 </template>
          </t-button>
          <p class="describe">请上传txt文件，大小在60M以内</p>
        </template>
      </t-upload>
    </header>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue';
import TIconUpload from 'tdesign-vue-next/icon/upload';

export default defineComponent({
  components: {
    TIconUpload,
  },
  setup() {
    const files = ref([]);

    const handleChange = (files) => {
      console.log(files);
    };

    const handlePreview = (file) => {
      console.log(file);
      window.open(file.thumbUrl);
    };

    return {
      files,
      handleChange,
      handlePreview,
    };
  },
});
</script>

<style lang="less" scoped>
.describe {
  color: rgb(153, 153, 153);
  font-size: 12px;
  margin-top: 12px;
}
</style>
