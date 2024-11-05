<template>
  <t-input v-model="value" clearable placeholder="请输入" @clear="onClear" @blur="onBlur" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { InputProps } from 'tdesign-vue-next';
const value = ref('Hello TDesign');
const onClear: InputProps['onClear'] = () => {
  console.log('clear');
};
const onBlur: InputProps['onBlur'] = () => {
  console.log('blur');
};
</script>
