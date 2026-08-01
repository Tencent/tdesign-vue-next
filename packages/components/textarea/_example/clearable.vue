<template>
  <div style="width: 100%; max-width: 500px">
    <t-textarea v-model="value" clearable placeholder="请输入" @clear="onClear" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TextareaProps } from 'tdesign-vue-next';

const value = ref('Hello TDesign');

const onClear: TextareaProps['onClear'] = () => {
  console.log('clear');
};
</script>
