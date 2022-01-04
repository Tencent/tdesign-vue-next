<template>
  <div class="tdesign-demo-block-column" style="max-width: 500px">
    <h5>文本域输入框已抽离为单独组件，更多示例请参考 Textarea 组件</h5>
    <t-textarea v-model="value" placeholder="请输入内容"></t-textarea>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('');
    return {
      value,
    };
  },
});
</script>
