<template>
  <t-space direction="vertical">
    <div>
      <t-radio-group v-model="uploadMethod" variant="default-filled">
        <t-radio-button value="requestSuccessMethod">上传成功示例</t-radio-button>
        <t-radio-button value="requestFailMethod">上传失败示例</t-radio-button>
      </t-radio-group>
    </div>

    <t-upload
      ref="uploadRef"
      v-model="files"
      :request-method="requestMethod"
      placeholder="自定义上传方法需要返回成功或失败信息"
      :on-fail="handleRequestFail"
    ></t-upload>
  </t-space>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { UploadInstanceFunctions, UploadProps, RadioGroupProps } from 'tdesign-vue-next';
const files = ref<UploadProps['value']>([]);
const uploadRef = ref<UploadInstanceFunctions>();
const uploadMethod = ref<RadioGroupProps['value']>('requestSuccessMethod');

// file 为等待上传的文件信息，用于提供给上传接口。file.raw 表示原始文件
const requestSuccessMethod: UploadProps['requestMethod'] = (file) => {
  return new Promise((resolve) => {
    // 上传进度控制示例
    let percent = 0;
    const percentTimer = setInterval(() => {
      if (percent + 10 < 99) {
        percent += 10;
        uploadRef.value.uploadFilePercent({
          file,
          percent,
        });
      } else {
        clearInterval(percentTimer);
      }
    }, 100);
    const timer = setTimeout(() => {
      // resolve 参数为关键代码
      resolve({
        status: 'success',
        response: {
          url: 'https://tdesign.gtimg.com/site/avatar.jpg',
        },
      });
      clearTimeout(timer);
      clearInterval(percentTimer);
    }, 1000);
  });
};
const requestFailMethod: UploadProps['requestMethod'] = (file) => {
  console.log(file);
  return new Promise((resolve) => {
    // resolve 参数为关键代码
    resolve({
      status: 'fail',
      error: '上传失败，请检查文件是否符合规范',
      response: {},
    });
  });
};
const handleRequestFail: UploadProps['onFail'] = (e) => {
  console.log(e);
};
const requestMethod = computed<UploadProps['requestMethod']>(() =>
  uploadMethod.value === 'requestSuccessMethod' ? requestSuccessMethod : requestFailMethod,
);
</script>
