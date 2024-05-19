<template>
  <div class="tdesign-demo-upload">
    <div style="width: 350px">
      <t-upload
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        :tips="tips"
        v-model="files"
        @fail="handleFail"
        @success="onSuccess"
        theme="file-input"
        placeholder="未选择文件"
      ></t-upload>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      files: [],
      tips: '上传文件大小在 5M 以内',
    };
  },
  methods: {
    handleFail({ file }) {
      this.$message.error(`文件 ${file.name} 上传失败`);
    },
    onSuccess() {
      this.tips = '';
    },
  },
};
</script>
