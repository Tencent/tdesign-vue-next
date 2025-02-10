<template>
  <t-space>
    <h5>文本域输入框已抽离为单独组件，更多示例请参考 Textarea 组件</h5>
    <t-textarea v-model="value" placeholder="请输入内容"></t-textarea>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value = ref('');
</script>
