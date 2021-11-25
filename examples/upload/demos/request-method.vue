<template>
  <div>
    <t-radio-group v-model="uploadMethod">
      <t-radio-button value="requestSuccessMethod"> 上传成功示例 </t-radio-button>
      <t-radio-button value="requestFailMethod"> 上传失败示例 </t-radio-button>
    </t-radio-group>
    <br /><br />
    <t-upload v-model="files" :request-method="requestMethod" tips="自定义上传方法需要返回成功或失败信息" />
  </div>
</template>
<script>
import { defineComponent, ref, watch, computed } from 'vue';

export default defineComponent({
  setup() {
    const files = ref([]);
    const uploadMethod = ref('requestSuccessMethod');

    const requestSuccessMethod = (val) => {
      const item = val;
      return new Promise((resolve) => {
        // file.percent 用于控制上传进度，如果不希望显示上传进度，则不对 file.percent 设置值即可。
        // 如果代码规范不能设置 file.percent，也可以设置 this.files
        item.percent = 0;
        const timer = setTimeout(() => {
          // resolve 参数为关键代码
          resolve({ status: 'success', response: { url: 'https://tdesign.gtimg.com/site/avatar.jpg' } });
          item.percent = 100;
          clearTimeout(timer);
        }, 500);
      });
    };

    const requestFailMethod = (file) => {
      console.log(file);
      return new Promise((resolve) => {
        // resolve 参数为关键代码
        resolve({ status: 'fail', error: '上传失败，请检查文件是否符合规范' });
      });
    };

    const requestMethod = computed(() =>
      uploadMethod.value === 'requestSuccessMethod' ? requestSuccessMethod : requestFailMethod,
    );

    return {
      files,
      uploadMethod,
      requestMethod,
    };
  },
});
</script>
