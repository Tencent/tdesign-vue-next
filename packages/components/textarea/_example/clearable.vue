<template>
  <t-textarea v-model="value" placeholder="请输入描述文案" clearable @clear="onClear" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TextareaProps } from 'tdesign-vue-next';

const value = ref('Hello TDesign');
const onClear: TextareaProps['onClear'] = () => {
  console.log('clear');
};
</script>
