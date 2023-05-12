<template>
  <t-space direction="vertical">
    <t-input />
    <t-input v-model="input" placeholder="请输入内容（有默认值）" @enter="onEnter" @change="onChange" />
    <!-- label 和 suffix 支持同名插槽 -->
    <t-input label="价格：" suffix="元" />
  </t-space>
</template>
<script setup lang="ts">
import { InputValue } from 'tdesign-vue-next';
import { ref } from 'vue';

const input = ref('有默认值');
const onEnter = () => {
  console.log('trigger enter');
};
const onChange = (val: InputValue) => {
  console.log('InputValue', val);
};
</script>
