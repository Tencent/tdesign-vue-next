<template>
  <div class="tdesign-demo-block-column-large">
    <div>
      <t-radio-group variant="default-filled" v-model="uploadMethod">
        <t-radio-button value="requestSuccessMethod">上传成功示例</t-radio-button>
        <t-radio-button value="requestFailMethod">上传失败示例</t-radio-button>
      </t-radio-group>
    </div>

    <t-upload
      ref="uploadRef"
      v-model="files"
      :requestMethod="requestMethod"
      tips="自定义上传方法需要返回成功或失败信息"
    ></t-upload>
  </div>
</template>
<script>
/* eslint-disable no-param-reassign */
export default {
  data() {
    return {
      files: [],
      uploadMethod: 'requestSuccessMethod',
    };
  },
  computed: {
    requestMethod() {
      return {
        requestSuccessMethod: this.requestSuccessMethod,
        requestFailMethod: this.requestFailMethod,
      }[this.uploadMethod];
    },
  },
  watch: {
    // 切换上传示例时，重置 files 数据
    uploadMethod() {
      this.files = [];
    },
  },
  methods: {
    // file 为等待上传的文件信息，用于提供给上传接口。file.raw 表示原始文件
    requestSuccessMethod(file /** UploadFile */) {
      console.log(file, file.raw);
      return new Promise((resolve) => {
        // 控制上传进度
        let percent = 0;
        const percentTimer = setInterval(() => {
          if (percent + 10 < 99) {
            percent += 10;
            this.$refs.uploadRef.uploadFilePercent({ file, percent });
          } else {
            clearInterval(percentTimer);
          }
        }, 100);

        const timer = setTimeout(() => {
          // resolve 参数为关键代码
          resolve({ status: 'success', response: { url: 'https://tdesign.gtimg.com/site/avatar.jpg' } });

          clearTimeout(timer);
          clearInterval(percentTimer);
        }, 800);
      });
    },
    requestFailMethod(file /** UploadFile */) {
      console.log(file);
      return new Promise((resolve) => {
        // resolve 参数为关键代码
        resolve({ status: 'fail', error: '上传失败，请检查文件是否符合规范' });
      });
    },
  },
};
</script>
