<template>

  <div class="tdesign-demo-item--input__input-box">
    <h5>文本域输入框已抽离为单独组件，更多示例请参考 Textarea 组件</h5>
    <t-textarea placeholder="请输入内容" v-model="value"></t-textarea>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
    };
  },
};
</script>
<style lang="less" scoped>
.t-textarea {
    margin-top: 16px;
}
</style>
